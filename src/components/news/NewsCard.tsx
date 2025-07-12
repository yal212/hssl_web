'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { NewsItem, NEWS_CATEGORIES } from '@/lib/types/news'
import { formatDate } from '@/lib/utils'

interface NewsCardProps {
  news: NewsItem
  featured?: boolean
  className?: string
}

export function NewsCard({ news, featured = false, className = '' }: NewsCardProps) {
  const categoryInfo = NEWS_CATEGORIES.find(cat => cat.value === news.category)
  const displayDate = news.published_at || news.created_at

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Link href={`/news/${news.id}`}>
        <Card hover className={`h-full overflow-hidden ${featured ? 'border-green-200 shadow-lg' : ''}`}>
          <CardContent className="p-0">
            {/* Featured Badge */}
            {news.featured && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Star className="w-3 h-3 mr-1" />
                  精選
                </div>
              </div>
            )}

            {/* Image */}
            {news.image_url && (
              <div className={`relative ${featured ? 'h-64' : 'h-48'} overflow-hidden`}>
                <Image
                  src={news.image_url}
                  alt={news.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Category and Date */}
              <div className="flex items-center justify-between mb-3">
                {categoryInfo && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
                    {categoryInfo.label}
                  </span>
                )}
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(displayDate)}
                </div>
              </div>

              {/* Title */}
              <h3 className={`font-bold text-gray-900 mb-3 line-clamp-2 ${featured ? 'text-xl' : 'text-lg'}`}>
                {news.title}
              </h3>

              {/* Excerpt */}
              {news.excerpt && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {news.excerpt}
                </p>
              )}

              {/* Tags */}
              {news.tags && news.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {news.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {news.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{news.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Author */}
              {news.author && (
                <div className="flex items-center text-gray-500 text-sm">
                  <User className="w-4 h-4 mr-1" />
                  <span>{news.author.full_name || '匿名作者'}</span>
                </div>
              )}

              {/* Read More */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-green-600 font-medium text-sm hover:text-green-700 transition-colors">
                  閱讀更多 →
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

// Skeleton loader for news cards
export function NewsCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <Card className="h-full overflow-hidden animate-pulse">
      <CardContent className="p-0">
        {/* Image skeleton */}
        <div className={`bg-gray-200 ${featured ? 'h-64' : 'h-48'}`} />
        
        {/* Content skeleton */}
        <div className="p-6">
          {/* Category and date skeleton */}
          <div className="flex items-center justify-between mb-3">
            <div className="bg-gray-200 h-6 w-16 rounded-full" />
            <div className="bg-gray-200 h-4 w-20 rounded" />
          </div>
          
          {/* Title skeleton */}
          <div className="space-y-2 mb-3">
            <div className="bg-gray-200 h-6 w-full rounded" />
            <div className="bg-gray-200 h-6 w-3/4 rounded" />
          </div>
          
          {/* Excerpt skeleton */}
          <div className="space-y-2 mb-4">
            <div className="bg-gray-200 h-4 w-full rounded" />
            <div className="bg-gray-200 h-4 w-5/6 rounded" />
            <div className="bg-gray-200 h-4 w-2/3 rounded" />
          </div>
          
          {/* Tags skeleton */}
          <div className="flex gap-1 mb-4">
            <div className="bg-gray-200 h-6 w-12 rounded" />
            <div className="bg-gray-200 h-6 w-16 rounded" />
            <div className="bg-gray-200 h-6 w-14 rounded" />
          </div>
          
          {/* Author skeleton */}
          <div className="bg-gray-200 h-4 w-24 rounded" />
        </div>
      </CardContent>
    </Card>
  )
}
