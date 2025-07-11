'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, User, FileText, Save, Loader2, Camera } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/supabase'
import {
  validateImageFile,
  resizeImage,
  createImagePreview,
  cleanupImagePreview,
  ImageUploadResult,
  ImageUploadError
} from '@/lib/imageUtils'
import { uploadAvatar } from '@/lib/storage'

type Profile = Database['public']['Tables']['profiles']['Row']

interface ProfileEditModalProps {
  isOpen: boolean
  onClose: () => void
  profile: Profile | null
  userId: string
  onProfileUpdate: (updatedProfile: Partial<Profile>) => void
}

interface FormData {
  full_name: string
  bio: string
}

interface FormErrors {
  full_name?: string
  bio?: string
  image?: string
  general?: string
}

export function ProfileEditModal({ 
  isOpen, 
  onClose, 
  profile, 
  userId, 
  onProfileUpdate 
}: ProfileEditModalProps) {
  const [formData, setFormData] = useState<FormData>({
    full_name: profile?.full_name || '',
    bio: profile?.bio || ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        full_name: profile?.full_name || '',
        bio: profile?.bio || ''
      })
      setErrors({})
      setImageFile(null)
      setImagePreview(null)
      setUploadProgress(0)
    } else {
      // Cleanup image preview when modal closes
      if (imagePreview) {
        cleanupImagePreview(imagePreview)
        setImagePreview(null)
      }
    }
  }, [isOpen, profile])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (formData.full_name.trim().length < 2) {
      newErrors.full_name = 'Full name must be at least 2 characters long'
    }

    if (formData.full_name.trim().length > 100) {
      newErrors.full_name = 'Full name must be less than 100 characters'
    }

    if (formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate image
    const validation = validateImageFile(file)
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, image: validation.error }))
      return
    }

    try {
      // Resize image
      const resizedFile = await resizeImage(file, {
        maxWidth: 400,
        maxHeight: 400,
        quality: 0.8
      })

      // Create preview
      if (imagePreview) {
        cleanupImagePreview(imagePreview)
      }
      const preview = createImagePreview(resizedFile)

      setImageFile(resizedFile)
      setImagePreview(preview)
      setErrors(prev => ({ ...prev, image: undefined }))
    } catch (error) {
      console.error('Error processing image:', error)
      setErrors(prev => ({ ...prev, image: 'Failed to process image. Please try again.' }))
    }
  }

  const uploadImage = async (file: File): Promise<ImageUploadResult> => {
    try {
      const result = await uploadAvatar(userId, file)

      if (!result.success) {
        return {
          success: false,
          error: result.error || 'Failed to upload image',
          errorType: ImageUploadError.UPLOAD_FAILED
        }
      }

      return {
        success: true,
        url: result.url
      }
    } catch (error) {
      console.error('Upload error:', error)
      return {
        success: false,
        error: 'Network error during upload',
        errorType: ImageUploadError.NETWORK_ERROR
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      let avatarUrl = profile?.avatar_url

      // Upload image if selected
      if (imageFile) {
        setUploadProgress(25)
        const uploadResult = await uploadImage(imageFile)
        
        if (!uploadResult.success) {
          setErrors({ image: uploadResult.error })
          setIsLoading(false)
          return
        }
        
        avatarUrl = uploadResult.url
        setUploadProgress(50)
      }

      // Update profile in database
      const updateData = {
        full_name: formData.full_name.trim(),
        bio: formData.bio.trim(),
        ...(avatarUrl && { avatar_url: avatarUrl }),
        updated_at: new Date().toISOString()
      }

      setUploadProgress(75)

      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        console.error('Profile update error:', error)
        setErrors({ general: 'Failed to update profile. Please try again.' })
        return
      }

      setUploadProgress(100)

      // Update parent component
      onProfileUpdate(data)

      // Close modal
      setTimeout(() => {
        onClose()
        setUploadProgress(0)
      }, 500)

    } catch (error) {
      console.error('Error updating profile:', error)
      setErrors({ general: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                disabled={isLoading}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="Current profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User size={32} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                    disabled={isLoading}
                  >
                    <Camera size={16} />
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Click the camera icon to upload a new profile picture
                </p>
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="inline mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.full_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
                {errors.full_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText size={16} className="inline mr-1" />
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none ${
                    errors.bio ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us about yourself..."
                  disabled={isLoading}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.bio ? (
                    <p className="text-red-500 text-sm">{errors.bio}</p>
                  ) : (
                    <div />
                  )}
                  <p className="text-sm text-gray-500">
                    {formData.bio.length}/500
                  </p>
                </div>
              </div>

              {/* General Error */}
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Upload Progress */}
              {isLoading && uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Updating profile...</span>
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

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
