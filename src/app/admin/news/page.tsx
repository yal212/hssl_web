'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { NewsAPI } from '@/lib/api/news'
import { NewsItem } from '@/lib/types/news'
import { formatDateTime } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import CreateNewsModal from '@/components/news/CreateNewsModal'
import EditNewsModal from '@/components/news/EditNewsModal'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import AdminGuard from '@/components/AdminGuard'
import { DatabaseMigrationChecker } from '@/components/DatabaseMigrationChecker'
import Link from 'next/link'

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletingNews, setDeletingNews] = useState<NewsItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)
      // Fetch all news (published and unpublished) for admin
      const response = await NewsAPI.getNews({ published: undefined }, 1, 50)
      setNews(response.data)
    } catch (err) {
      setError('載入新聞時發生錯誤')
      console.error('Error fetching news:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const handleTogglePublished = async (newsItem: NewsItem) => {
    try {
      await NewsAPI.updateNews({
        id: newsItem.id,
        published: !newsItem.published
      })
      fetchNews() // Refresh the list
    } catch (err) {
      console.error('Error updating news:', err)
    }
  }

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem)
    setShowEditModal(true)
  }

  const handleDelete = (newsItem: NewsItem) => {
    setDeletingNews(newsItem)
    setShowDeleteDialog(true)
  }

  const confirmDelete = async () => {
    if (!deletingNews) return

    try {
      setIsDeleting(true)
      await NewsAPI.deleteNews(deletingNews.id)
      fetchNews() // Refresh the list
      setShowDeleteDialog(false)
      setDeletingNews(null)
    } catch (err) {
      console.error('Error deleting news:', err)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleModalSuccess = () => {
    fetchNews() // Refresh the list when create/edit is successful
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center gap-4">
            <Link href="/news">
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回新聞頁面
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">新聞管理</h1>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            新增新聞
          </Button>
        </motion.div>

        {/* Database Migration Checker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <DatabaseMigrationChecker />
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8"
          >
            <p className="text-red-800 text-center">{error}</p>
            <div className="flex justify-center mt-4">
              <Button onClick={fetchNews} variant="outline">
                重新載入
              </Button>
            </div>
          </motion.div>
        )}

        {/* News List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          {news.length > 0 ? (
            news.map((newsItem, index) => (
              <motion.div
                key={newsItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`${!newsItem.published ? 'border-gray-300 bg-gray-50' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {newsItem.title}
                          </h3>
                          {newsItem.featured && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                              精選
                            </span>
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            newsItem.published 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {newsItem.published ? '已發布' : '草稿'}
                          </span>
                        </div>
                        
                        {newsItem.excerpt && (
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {newsItem.excerpt}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>分類: {newsItem.category}</span>
                          <span>建立: {formatDateTime(newsItem.created_at)}</span>
                          {newsItem.published_at && (
                            <span>發布: {formatDateTime(newsItem.published_at)}</span>
                          )}
                        </div>
                        
                        {newsItem.tags && newsItem.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {newsItem.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTogglePublished(newsItem)}
                          className="flex items-center"
                        >
                          {newsItem.published ? (
                            <>
                              <EyeOff className="w-4 h-4 mr-1" />
                              取消發布
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4 mr-1" />
                              發布
                            </>
                          )}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(newsItem)}
                          className="flex items-center"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          編輯
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(newsItem)}
                          className="flex items-center text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          刪除
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                尚無新聞項目
              </h3>
              <p className="text-gray-600 mb-6">
                開始建立您的第一篇新聞
              </p>
              <Button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center mx-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                新增新聞
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Modals */}
      <CreateNewsModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleModalSuccess}
      />

      <EditNewsModal
        isOpen={showEditModal}
        newsItem={editingNews}
        onClose={() => {
          setShowEditModal(false)
          setEditingNews(null)
        }}
        onSuccess={handleModalSuccess}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="確認刪除"
        message={`確定要刪除新聞「${deletingNews?.title}」嗎？此操作無法復原。`}
        confirmText="刪除"
        cancelText="取消"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteDialog(false)
          setDeletingNews(null)
        }}
        isLoading={isDeleting}
        variant="danger"
      />
      </div>
    </AdminGuard>
  )
}
