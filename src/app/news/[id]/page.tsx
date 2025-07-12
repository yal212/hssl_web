'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  Star,
  Tag
} from 'lucide-react'
import { NewsAPI } from '@/lib/api/news'
import { NewsItem, NEWS_CATEGORIES } from '@/lib/types/news'
import { formatDateTime } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [news, setNews] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([])

  const newsId = params.id as string

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const newsItem = await NewsAPI.getNewsById(newsId)
        if (!newsItem) {
          setError('找不到此新聞項目')
          return
        }
        
        setNews(newsItem)
        
        // Fetch related news (same category, excluding current)
        const related = await NewsAPI.getNews({
          category: newsItem.category,
          published: true
        }, 1, 4)
        
        setRelatedNews(related.data.filter(item => item.id !== newsId))
      } catch (err) {
        setError('載入新聞時發生錯誤')
        console.error('Error fetching news detail:', err)
      } finally {
        setLoading(false)
      }
    }

    if (newsId) {
      fetchNewsDetail()
    }
  }, [newsId])

  const handleShare = async () => {
    if (navigator.share && news) {
      try {
        await navigator.share({
          title: news.title,
          text: news.excerpt || news.title,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || '找不到新聞'}
          </h1>
          <Button onClick={() => router.back()} variant="outline">
            返回上一頁
          </Button>
        </div>
      </div>
    )
  }

  const categoryInfo = NEWS_CATEGORIES.find(cat => cat.value === news.category)
  const displayDate = news.published_at || news.created_at

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/news">
            <Button variant="ghost" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回新聞列表
            </Button>
          </Link>
        </motion.div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          {/* Featured Image */}
          {news.image_url && (
            <div className="relative h-96 overflow-hidden">
              <Image
                src={news.image_url}
                alt={news.title}
                fill
                className="object-cover"
              />
              {news.featured && (
                <div className="absolute top-6 left-6">
                  <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    精選新聞
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="p-8">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
              {categoryInfo && (
                <span className={`px-3 py-1 rounded-full font-medium ${categoryInfo.color}`}>
                  {categoryInfo.label}
                </span>
              )}
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDateTime(displayDate)}
              </div>
              {news.author && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {news.author.full_name || '匿名作者'}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {news.title}
            </h1>

            {/* Excerpt */}
            {news.excerpt && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {news.excerpt}
              </p>
            )}

            {/* Share Button */}
            <div className="flex justify-end mb-8">
              <Button
                onClick={handleShare}
                variant="outline"
                className="flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                分享
              </Button>
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />

            {/* Tags */}
            {news.tags && news.tags.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  {news.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.article>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">相關新聞</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedNews.slice(0, 2).map((relatedItem) => (
                <Link key={relatedItem.id} href={`/news/${relatedItem.id}`}>
                  <Card hover className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        {categoryInfo && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
                            {categoryInfo.label}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {relatedItem.title}
                      </h3>
                      {relatedItem.excerpt && (
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {relatedItem.excerpt}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
