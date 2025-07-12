'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { NewsCategory, CreateNewsItem, UpdateNewsItem, NewsItem, NEWS_CATEGORIES } from '@/lib/types/news'
import { X, Plus, Trash2, Camera, Upload, Image as ImageIcon } from 'lucide-react'
import {
  validateImageFile,
  resizeImage,
  createImagePreview,
  cleanupImagePreview
} from '@/lib/imageUtils'
import { uploadNewsImage, uploadNewsImages } from '@/lib/storage'
import { useAdmin } from '@/hooks/useAdmin'

interface NewsFormProps {
  initialData?: NewsItem | null
  onSubmit: (data: CreateNewsItem | UpdateNewsItem) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  title: string
}

export default function NewsForm({ initialData, onSubmit, onCancel, isLoading = false, title }: NewsFormProps) {
  const { user } = useAdmin()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'general' as NewsCategory,
    tags: [] as string[],
    featured: false,
    published: false,
    image_url: ''
  })
  const [newTag, setNewTag] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Image upload states
  const [mainImageFile, setMainImageFile] = useState<File | null>(null)
  const [mainImagePreview, setMainImagePreview] = useState<string>('')
  const [contentImages, setContentImages] = useState<File[]>([])
  const [contentImagePreviews, setContentImagePreviews] = useState<string[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  // File input refs
  const mainImageInputRef = useRef<HTMLInputElement>(null)
  const contentImagesInputRef = useRef<HTMLInputElement>(null)

  // Initialize form with existing data if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        excerpt: initialData.excerpt || '',
        category: initialData.category || 'general',
        tags: initialData.tags || [],
        featured: initialData.featured || false,
        published: initialData.published || false,
        image_url: initialData.image_url || ''
      })

      // Set main image preview if editing
      if (initialData.image_url) {
        setMainImagePreview(initialData.image_url)
      }
    }
  }, [initialData])

  // Cleanup image previews on unmount
  useEffect(() => {
    return () => {
      if (mainImagePreview && !mainImagePreview.startsWith('http')) {
        cleanupImagePreview(mainImagePreview)
      }
      contentImagePreviews.forEach(preview => {
        if (!preview.startsWith('http')) {
          cleanupImagePreview(preview)
        }
      })
    }
  }, [mainImagePreview, contentImagePreviews])

  // Handle main image selection
  const handleMainImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const validation = validateImageFile(file)
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, mainImage: validation.error }))
      return
    }

    try {
      const resizedFile = await resizeImage(file, {
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.8
      })

      if (mainImagePreview && !mainImagePreview.startsWith('http')) {
        cleanupImagePreview(mainImagePreview)
      }

      const preview = createImagePreview(resizedFile)
      setMainImageFile(resizedFile)
      setMainImagePreview(preview)
      setErrors(prev => ({ ...prev, mainImage: undefined }))
    } catch (error) {
      console.error('Error processing main image:', error)
      setErrors(prev => ({ ...prev, mainImage: '圖片處理失敗，請重試。' }))
    }
  }

  // Handle content images selection
  const handleContentImagesSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    const validFiles: File[] = []
    const newPreviews: string[] = []

    for (const file of files) {
      const validation = validateImageFile(file)
      if (validation.isValid) {
        try {
          const resizedFile = await resizeImage(file, {
            maxWidth: 800,
            maxHeight: 600,
            quality: 0.8
          })
          validFiles.push(resizedFile)
          newPreviews.push(createImagePreview(resizedFile))
        } catch (error) {
          console.error('Error processing content image:', error)
        }
      }
    }

    setContentImages(prev => [...prev, ...validFiles])
    setContentImagePreviews(prev => [...prev, ...newPreviews])
  }

  // Remove content image
  const removeContentImage = (index: number) => {
    const preview = contentImagePreviews[index]
    if (preview && !preview.startsWith('http')) {
      cleanupImagePreview(preview)
    }

    setContentImages(prev => prev.filter((_, i) => i !== index))
    setContentImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  // Remove main image
  const removeMainImage = () => {
    if (mainImagePreview && !mainImagePreview.startsWith('http')) {
      cleanupImagePreview(mainImagePreview)
    }
    setMainImageFile(null)
    setMainImagePreview('')
    setFormData(prev => ({ ...prev, image_url: '' }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = '標題為必填項目'
    }

    if (!formData.content.trim()) {
      newErrors.content = '內容為必填項目'
    }

    if (formData.content.length < 50) {
      newErrors.content = '內容至少需要50個字符'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!user?.id) {
      setErrors({ general: '用戶未登入' })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      let finalImageUrl = formData.image_url

      // Try to upload main image if selected, but continue if it fails
      if (mainImageFile) {
        setUploadProgress(25)
        try {
          const uploadResult = await uploadNewsImage(user.id, mainImageFile, initialData?.id)

          if (uploadResult.success) {
            finalImageUrl = uploadResult.url || ''
          } else {
            // Upload failed, but continue with URL or default
            console.warn('Image upload failed, using URL or default:', uploadResult.error)
            setErrors({
              mainImage: '圖片上傳失敗，將使用網址或預設圖片。如需上傳功能請聯繫管理員設定儲存空間。'
            })
          }
        } catch (uploadError) {
          console.warn('Image upload error:', uploadError)
          setErrors({
            mainImage: '圖片上傳功能暫時無法使用，將使用網址或預設圖片。'
          })
        }
        setUploadProgress(50)
      }

      // Use default HSSL profile picture if no image URL is provided
      if (!finalImageUrl || finalImageUrl.trim() === '') {
        finalImageUrl = '/hssl_profile.jpg'
      }

      // Handle content images - use URLs from previews
      let contentImageUrls: string[] = []

      // First, try to upload any file-based content images
      if (contentImages.length > 0) {
        setUploadProgress(75)
        try {
          const contentUploadResult = await uploadNewsImages(user.id, contentImages, initialData?.id)

          if (contentUploadResult.success) {
            contentImageUrls = contentUploadResult.urls || []
          } else {
            console.warn('Content images upload failed:', contentUploadResult.error)
            setErrors({
              contentImages: '內容圖片上傳失敗，將僅使用網址圖片。'
            })
          }
        } catch (uploadError) {
          console.warn('Content images upload error:', uploadError)
        }
      }

      // Add URL-based content images from previews
      const urlBasedImages = contentImagePreviews.filter(url =>
        url.startsWith('http') && !contentImageUrls.includes(url)
      )
      contentImageUrls = [...contentImageUrls, ...urlBasedImages]

      setUploadProgress(90)

      const submitData = {
        ...(initialData ? { id: initialData.id } : {}),
        ...formData,
        image_url: finalImageUrl,
        // Store content image URLs
        ...(contentImageUrls.length > 0 && { content_images: contentImageUrls })
      } as CreateNewsItem | UpdateNewsItem

      setUploadProgress(100)
      await onSubmit(submitData)
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ general: '提交失敗，請重試' })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                標題 *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="輸入新聞標題"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                摘要
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="輸入新聞摘要（可選）"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                內容 *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={10}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.content ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="輸入新聞內容（支援HTML標籤）"
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
              <p className="text-gray-500 text-sm mt-1">
                字符數: {formData.content.length} (最少50個字符)
              </p>
            </div>

            {/* Main Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                主要圖片
              </label>
              <div className="space-y-4">
                {/* Image URL Input */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    圖片網址 (或上傳圖片)
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="https://example.com/image.jpg 或上傳圖片"
                  />
                </div>

                {/* Current/Preview Image */}
                {(mainImagePreview || formData.image_url) && (
                  <div className="relative inline-block">
                    <div className="relative w-48 h-32 rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={mainImagePreview || formData.image_url || '/hssl_profile.jpg'}
                        alt="主要圖片預覽"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeMainImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => mainImageInputRef.current?.click()}
                    className="flex items-center"
                    disabled={isUploading}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    {mainImagePreview ? '更換圖片' : '上傳圖片 (暫時功能)'}
                  </Button>
                  <span className="text-sm text-gray-500">
                    暫時請使用圖片網址，或聯繫管理員設定儲存空間
                  </span>
                </div>

                <input
                  ref={mainImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageSelect}
                  className="hidden"
                />

                {errors.mainImage && (
                  <p className="text-red-500 text-sm">{errors.mainImage}</p>
                )}

                <p className="text-sm text-gray-500">
                  💡 提示：您可以使用 <a href="https://imgur.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Imgur</a> 或 <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Cloudinary</a> 等服務上傳圖片並獲取網址
                </p>
              </div>
            </div>

            {/* Content Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                內容圖片 (圖片庫)
              </label>
              <div className="space-y-4">
                {/* Add Image URL */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="輸入圖片網址並按 Enter 添加"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        const url = e.currentTarget.value.trim()
                        if (url) {
                          setContentImagePreviews(prev => [...prev, url])
                          e.currentTarget.value = ''
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => contentImagesInputRef.current?.click()}
                    className="flex items-center"
                    disabled={isUploading}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    上傳
                  </Button>
                </div>

                {/* Preview Grid */}
                {contentImagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {contentImagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <div className="relative w-full h-24 rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={preview}
                            alt={`內容圖片 ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeContentImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  ref={contentImagesInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleContentImagesSelect}
                  className="hidden"
                />

                <p className="text-sm text-gray-500">
                  💡 輸入圖片網址並按 Enter 添加到圖片庫，或使用上傳按鈕 (需要儲存設定)
                </p>

                {errors.contentImages && (
                  <p className="text-red-500 text-sm">{errors.contentImages}</p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分類
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as NewsCategory }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {NEWS_CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                標籤
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="輸入標籤並按Enter"
                />
                <Button type="button" onClick={addTag} variant="outline" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">設為精選新聞</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">立即發布</span>
              </label>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>上傳進度</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onCancel} disabled={isUploading}>
                取消
              </Button>
              <Button type="submit" disabled={isLoading || isUploading}>
                {isUploading ? '上傳中...' : isLoading ? '處理中...' : (initialData ? '更新' : '建立')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
