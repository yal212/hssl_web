'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NewsFilters, NewsCategory, NEWS_CATEGORIES } from '@/lib/types/news'

interface NewsFiltersProps {
  filters: NewsFilters
  onFiltersChange: (filters: NewsFilters) => void
  availableTags: string[]
  className?: string
}

export function NewsFiltersComponent({ 
  filters, 
  onFiltersChange, 
  availableTags,
  className = '' 
}: NewsFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchInput, setSearchInput] = useState(filters.search || '')

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== (filters.search || '')) {
        onFiltersChange({ ...filters, search: searchInput || undefined })
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchInput, filters, onFiltersChange])

  const handleCategoryChange = (category: NewsCategory | undefined) => {
    onFiltersChange({ ...filters, category })
  }

  const handleTagToggle = (tag: string) => {
    const currentTags = filters.tags || []
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag]
    
    onFiltersChange({ 
      ...filters, 
      tags: newTags.length > 0 ? newTags : undefined 
    })
  }

  const handleFeaturedToggle = () => {
    onFiltersChange({ 
      ...filters, 
      featured: filters.featured === true ? undefined : true 
    })
  }

  const clearFilters = () => {
    setSearchInput('')
    onFiltersChange({ published: true })
  }

  const hasActiveFilters = !!(
    filters.search || 
    filters.category || 
    filters.tags?.length || 
    filters.featured
  )

  return (
    <div className={`bg-cream rounded-lg shadow-sm border border-green-200 p-6 ${className}`}>
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="搜尋新聞標題或內容..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center"
        >
          <Filter className="w-4 h-4 mr-2" />
          進階篩選
          {hasActiveFilters && (
            <span className="ml-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              !
            </span>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4 mr-1" />
            清除篩選
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-6 pt-4 border-t border-gray-200">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">分類</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange(undefined)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  !filters.category
                    ? 'bg-green-500 text-white'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                全部
              </button>
              {NEWS_CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.category === category.value
                      ? 'bg-green-500 text-white'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Toggle */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">特殊篩選</h3>
            <button
              onClick={handleFeaturedToggle}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filters.featured
                  ? 'bg-yellow-500 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              僅顯示精選
            </button>
          </div>

          {/* Tags */}
          {availableTags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">標籤</h3>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filters.tags?.includes(tag)
                        ? 'bg-blue-500 text-white'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {NEWS_CATEGORIES.find(c => c.value === filters.category)?.label}
                <button
                  onClick={() => handleCategoryChange(undefined)}
                  className="ml-1 hover:text-green-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.featured && (
              <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                精選
                <button
                  onClick={handleFeaturedToggle}
                  className="ml-1 hover:text-yellow-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                #{tag}
                <button
                  onClick={() => handleTagToggle(tag)}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
