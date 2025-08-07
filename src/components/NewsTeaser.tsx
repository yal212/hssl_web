'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Calendar, ArrowRight, Newspaper, Tag } from 'lucide-react'
import { NewsAPI } from '@/lib/api/news'
import { NewsItem } from '@/lib/types/news'
import { staggerContainer, staggerItem, colorTheme } from '@/lib/animations'

export function NewsTeaser() {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setLoading(true)
        const news = await NewsAPI.getRecentNews(3) // Get 3 latest news items
        setLatestNews(news)
      } catch (error) {
        console.error('Error fetching latest news:', error)
        // Fallback to static data
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
            title: '環保手工皂製作工作坊',
            content: '學習如何製作天然環保手工皂，了解永續生活的重要性',
            excerpt: '學習如何製作天然環保手工皂，了解永續生活的重要性',
            published: true,
            created_at: '2024-11-15T00:00:00Z',
            updated_at: '2024-11-15T00:00:00Z',
            published_at: '2024-11-15T00:00:00Z',
            category: 'education',
            tags: ['工作坊', '環保'],
            featured: false,
            image_url: undefined,
            author: undefined,
            author_id: 'fallback-author'
          } as NewsItem,
          {
            id: 'fallback-3',
            title: '社區合作計畫啟動',
            content: '與在地社區合作，推廣環保意識與永續發展理念',
            excerpt: '與在地社區合作，推廣環保意識與永續發展理念',
            published: true,
            created_at: '2024-11-01T00:00:00Z',
            updated_at: '2024-11-01T00:00:00Z',
            published_at: '2024-11-01T00:00:00Z',
            category: 'community',
            tags: ['社區', '合作'],
            featured: false,
            image_url: undefined,
            author: undefined,
            author_id: 'fallback-author'
          } as NewsItem
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchLatestNews()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      events: 'bg-green-100 text-green-800',
      education: 'bg-blue-100 text-blue-800',
      community: 'bg-purple-100 text-purple-800',
      default: 'bg-gray-100 text-gray-800'
    }
    return colors[category as keyof typeof colors] || colors.default
  }

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-green-500 rounded-full mb-6 shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Newspaper className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-responsive-h2 font-bold text-green-900 mb-4">
            最新消息
          </h2>
          
          <p className="body-large text-green-700 max-w-3xl mx-auto">
            了解我們最新的活動、工作坊和社區合作計畫
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-green-100 rounded-lg h-48 mb-4"></div>
                <div className="bg-green-100 rounded h-4 mb-2"></div>
                <div className="bg-green-100 rounded h-4 w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {latestNews.map((news, index) => (
              <motion.div
                key={news.id}
                variants={staggerItem}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card hover className="h-full group cursor-pointer overflow-hidden">
                  <Link href={`/news/${news.id}`}>
                    {/* Image placeholder or actual image */}
                    <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
                      {news.image_url ? (
                        <Image
                          src={news.image_url}
                          alt={news.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Newspaper className="w-12 h-12 text-green-400" />
                        </div>
                      )}
                      
                      {/* Category tag */}
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(news.category)}`}>
                          <Tag className="w-3 h-3 mr-1" />
                          {news.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Date */}
                      <div className="flex items-center text-sm text-green-600 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(news.published_at || news.created_at)}
                      </div>

                      {/* Title */}
                      <h3 className="heading-6 text-green-900 mb-3 group-hover:text-green-700 transition-colors duration-200 line-clamp-2">
                        {news.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="body-small text-green-600 mb-4 line-clamp-3">
                        {news.excerpt || news.content.substring(0, 120) + '...'}
                      </p>

                      {/* Read more */}
                      <div className="flex items-center text-green-600 group-hover:text-green-700 transition-colors duration-200">
                        <span className="text-sm font-medium">閱讀更多</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* More news button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/news" className="group">
              查看所有消息
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
