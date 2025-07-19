'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { NewsAPI } from '@/lib/api/news'
import { NewsItem } from '@/lib/types/news'

export function ImpactSummary() {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([])
  const [newsLoading, setNewsLoading] = useState(true)


  // Fetch latest news on component mount
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setNewsLoading(true)
        const news = await NewsAPI.getRecentNews(2) // Get only 2 latest news items
        setLatestNews(news)
      } catch (error) {
        console.error('Error fetching latest news:', error)
        // Fallback to static data if API fails
        setLatestNews([
          {
            id: 'fallback-1',
            title: '溫情聖誕手工皂義賣活動',
            content: '與康橋國際學校合作，所得全數捐贈給忠義社會福利事業基金會',
            excerpt: '與康橋國際學校合作，所得全數捐贈給忠義社會福利事業基金會',
            published: true,
            created_at: '2024-12-01T00:00:00Z',
            updated_at: '2024-12-01T00:00:00Z',
            published_at: '2024-12-01T00:00:00Z',
            category: 'events',
            tags: ['義賣', '聖誕'],
            featured: false,
            image_url: undefined,
            author: undefined,
            author_id: 'fallback-author'
          } as NewsItem,
          {
            id: 'fallback-2',
            title: '環保教育推廣活動',
            content: '在社區舉辦製皂教學，推廣廢油回收再利用',
            excerpt: '在社區舉辦製皂教學，推廣廢油回收再利用',
            published: true,
            created_at: '2024-11-01T00:00:00Z',
            updated_at: '2024-11-01T00:00:00Z',
            published_at: '2024-11-01T00:00:00Z',
            category: 'workshops',
            tags: ['教育', '環保'],
            featured: false,
            image_url: undefined,
            author: undefined,
            author_id: 'fallback-author'
          } as NewsItem
        ])
      } finally {
        setNewsLoading(false)
      }
    }

    fetchLatestNews()
  }, [])

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Latest News */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              最新動態
            </h2>
            <Button variant="outline" asChild>
              <Link href="/news">
                查看所有消息
              </Link>
            </Button>
          </div>
          
          {newsLoading ? (
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {latestNews.map((news, index) => {
                const publishedDate = new Date(news.published_at || news.created_at)
                const formattedDate = publishedDate.toLocaleDateString('zh-TW', {
                  year: 'numeric',
                  month: 'long'
                })

                return (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer group"
                  >
                    <motion.div
                      className="flex-shrink-0"
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <Calendar className="w-6 h-6 text-green-600" />
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <motion.div
                        className="flex items-center space-x-3 mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-sm text-gray-500">{formattedDate}</span>
                        <motion.span
                          className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          最新消息
                        </motion.span>
                      </motion.div>
                      <motion.h3
                        className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                      >
                        {news.title}
                      </motion.h3>
                      <motion.p
                        className="text-gray-600"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                        viewport={{ once: true }}
                      >
                        {news.excerpt || news.content?.substring(0, 100) + '...'}
                      </motion.p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
