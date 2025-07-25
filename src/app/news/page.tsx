'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Newspaper, Plus, Settings } from 'lucide-react'
import {
  fadeInUp,
  fadeInDown,
  floating,
  colorTheme
} from '@/lib/animations'
import { NewsAPI } from '@/lib/api/news'
import { NewsItem, NewsFilters, NewsResponse, DEFAULT_NEWS_FILTERS } from '@/lib/types/news'
import { NewsCard, NewsCardSkeleton } from '@/components/news/NewsCard'
import { NewsFiltersComponent } from '@/components/news/NewsFilters'
import { NewsPaginationComponent } from '@/components/news/NewsPagination'
import { DatabaseMigrationNotice } from '@/components/news/DatabaseMigrationNotice'
import CreateNewsModal from '@/components/news/CreateNewsModal'
import EditNewsModal from '@/components/news/EditNewsModal'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { Button } from '@/components/ui/Button'
import { useAdmin } from '@/hooks/useAdmin'
import Link from 'next/link'

export default function NewsPage() {
  const [newsData, setNewsData] = useState<NewsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<NewsFilters>(DEFAULT_NEWS_FILTERS)
  const [currentPage, setCurrentPage] = useState(1)
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [needsMigration, setNeedsMigration] = useState(false)

  // Admin state
  const { isAdmin, loading: adminLoading, user: adminUser, profile } = useAdmin()

  // Debug admin status
  useEffect(() => {
    console.log('Admin status:', { isAdmin, adminLoading, user: adminUser?.email, role: profile?.role })
  }, [isAdmin, adminLoading, adminUser, profile])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletingNews, setDeletingNews] = useState<NewsItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch news data
  const fetchNews = useCallback(async (newFilters: NewsFilters = filters, page: number = currentPage) => {
    try {
      setLoading(true)
      setError(null)
      const response = await NewsAPI.getNews(newFilters, page)
      setNewsData(response)
    } catch (err) {
      setError('載入新聞時發生錯誤，請稍後再試。')
      console.error('Error fetching news:', err)
    } finally {
      setLoading(false)
    }
  }, [filters, currentPage])



  // Initial load
  useEffect(() => {
    const initialFetch = async () => {
      try {
        setLoading(true)
        setError(null)
        const [newsResponse, tags] = await Promise.all([
          NewsAPI.getNews(DEFAULT_NEWS_FILTERS, 1),
          NewsAPI.getAllTags()
        ])
        setNewsData(newsResponse)
        setAvailableTags(tags)
      } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        console.error('Error fetching initial data:', err)
        if (err.message && err.message.includes('Database schema needs to be updated')) {
          setNeedsMigration(true)
        } else {
          setError('載入新聞時發生錯誤，請稍後再試。')
        }
      } finally {
        setLoading(false)
      }
    }

    initialFetch()
  }, [])

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: NewsFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    fetchNews(newFilters, 1)
  }, [fetchNews])

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchNews(filters, page)
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle retry after migration
  const handleRetryAfterMigration = () => {
    setNeedsMigration(false)
    setError(null)
    setLoading(true)
    // Re-run initial fetch
    const initialFetch = async () => {
      try {
        setLoading(true)
        setError(null)
        const [newsResponse, tags] = await Promise.all([
          NewsAPI.getNews(DEFAULT_NEWS_FILTERS, 1),
          NewsAPI.getAllTags()
        ])
        setNewsData(newsResponse)
        setAvailableTags(tags)
      } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        console.error('Error fetching initial data:', err)
        if (err.message && err.message.includes('Database schema needs to be updated')) {
          setNeedsMigration(true)
        } else {
          setError('載入新聞時發生錯誤，請稍後再試。')
        }
      } finally {
        setLoading(false)
      }
    }

    initialFetch()
  }

  // Admin action handlers
  const handleCreateNews = () => {
    setShowCreateModal(true)
  }

  const handleEditNews = (newsItem: NewsItem) => {
    setEditingNews(newsItem)
    setShowEditModal(true)
  }

  const handleDeleteNews = (newsItem: NewsItem) => {
    setDeletingNews(newsItem)
    setShowDeleteDialog(true)
  }

  const confirmDelete = async () => {
    if (!deletingNews) return

    try {
      setIsDeleting(true)
      await NewsAPI.deleteNews(deletingNews.id)

      // Refresh the news list
      fetchNews()

      // Close dialog
      setShowDeleteDialog(false)
      setDeletingNews(null)
    } catch (error) {
      console.error('Error deleting news:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleModalSuccess = () => {
    // Refresh the news list when create/edit is successful
    fetchNews()
  }

  // Show migration notice if needed
  if (needsMigration) {
    return <DatabaseMigrationNotice onRetry={handleRetryAfterMigration} />
  }

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${colorTheme.primary.light} via-white to-white py-24 lg:py-32 overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInDown}
            initial="initial"
            animate="animate"
            className="text-center"
          >
            <motion.div
              className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${colorTheme.primary.gradient} rounded-full mb-8 shadow-lg`}
              variants={floating}
              initial="initial"
              animate="animate"
            >
              <Newspaper className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              最新
              <motion.span
                className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent block`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                消息動態
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              掌握 High School Soap Lab 的最新動態、活動消息和重要公告。
              了解我們在環保手工皂推廣和慈善事業上的最新進展。
            </motion.p>
            
            {/* Admin Controls */}
            {isAdmin && (
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleCreateNews}
                  className="flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  新增新聞
                </Button>

                <Link href="/admin/news">
                  <Button variant="outline" className="flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    管理後台
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className={`bg-white rounded-2xl shadow-lg border ${colorTheme.primary.border} p-6 lg:p-8`}>
              <NewsFiltersComponent
                filters={filters}
                onFiltersChange={handleFiltersChange}
                availableTags={availableTags}
              />
            </div>
          </motion.div>

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`${colorTheme.accent.light} border ${colorTheme.accent.border} rounded-2xl p-8 mb-12 shadow-lg`}
            >
              <div className="text-center">
                <div className={`w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Newspaper className={`w-8 h-8 ${colorTheme.accent.text}`} />
                </div>
                <p className={`text-emerald-800 text-lg font-medium mb-4`}>{error}</p>
                <Button onClick={() => fetchNews()} variant="outline" size="lg">
                  重新載入
                </Button>
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {Array.from({ length: 6 }).map((_, index) => (
                <NewsCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* News Grid */}
          {!loading && newsData && (
            <>
              {newsData.data.length > 0 ? (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                  >
                    {newsData.data.map((news, index) => (
                      <motion.div
                        key={news.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <NewsCard
                          news={news}
                          featured={news.featured}
                          showAdminControls={isAdmin}
                          onEdit={handleEditNews}
                          onDelete={handleDeleteNews}
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Pagination */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <NewsPaginationComponent
                      pagination={newsData.pagination}
                      onPageChange={handlePageChange}
                    />
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className={`w-24 h-24 ${colorTheme.primary.light} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Newspaper className={`w-12 h-12 ${colorTheme.primary.text}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    沒有找到相關新聞
                  </h3>
                  <p className="text-gray-600 mb-6">
                    請嘗試調整篩選條件或搜尋關鍵字
                  </p>
                  <Button 
                    onClick={() => handleFiltersChange(DEFAULT_NEWS_FILTERS)}
                    variant="outline"
                  >
                    清除所有篩選
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Admin Modals */}
      {isAdmin && (
        <>
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
        </>
      )}
    </motion.div>
  )
}
