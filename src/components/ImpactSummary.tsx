'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Newspaper } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { NewsAPI } from '@/lib/api/news'
import { NewsItem } from '@/lib/types/news'
import {
  fadeInDown,
  staggerContainer,
  staggerItem,
  floating,
  colorTheme
} from '@/lib/animations'

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
    <section className={`py-24 lg:py-32 bg-cream`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Latest News */}
        <motion.div
          variants={fadeInDown}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="bg-cream rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden"
        >
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-green-300"></div>
            <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-green-300"></div>
            <div className="absolute top-1/2 right-16 w-12 h-12 rounded-full bg-green-400"></div>
          </div>

          <div className="relative z-10">
            <motion.div
              className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem} className="flex items-center">
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${colorTheme.primary.gradient} rounded-full mr-4 shadow-lg`}
                  variants={floating}
                  initial="initial"
                  animate="animate"
                >
                  <Newspaper className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900">
                  最新
                  <span className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent`}>
                    動態
                  </span>
                </h2>
              </motion.div>
              <motion.div variants={staggerItem}>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/news">
                    查看所有消息
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          
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
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {latestNews.map((news) => {
                const publishedDate = new Date(news.published_at || news.created_at)
                const formattedDate = publishedDate.toLocaleDateString('zh-TW', {
                  year: 'numeric',
                  month: 'long'
                })

                return (
                  <motion.div
                    key={news.id}
                    variants={staggerItem}
                    className="flex items-start space-x-6 p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${colorTheme.primary.gradient} rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden`}>
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <Calendar className="w-8 h-8 text-white relative z-10" />
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <motion.div
                        className="flex items-center space-x-3 mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-sm font-medium text-green-600">{formattedDate}</span>
                        <motion.span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${colorTheme.primary.light} ${colorTheme.primary.text}`}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          最新消息
                        </motion.span>
                      </motion.div>
                      <motion.h3
                        className={`text-xl font-bold text-green-900 mb-3 group-hover:${colorTheme.primary.text} transition-colors duration-200`}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        {news.title}
                      </motion.h3>
                      <motion.p
                        className="text-green-700 leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        {news.excerpt || news.content?.substring(0, 100) + '...'}
                      </motion.p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
