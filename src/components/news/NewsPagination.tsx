'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NewsPagination } from '@/lib/types/news'

interface NewsPaginationProps {
  pagination: NewsPagination
  onPageChange: (page: number) => void
  className?: string
}

export function NewsPaginationComponent({ 
  pagination, 
  onPageChange, 
  className = '' 
}: NewsPaginationProps) {
  const { page, totalPages, total } = pagination

  if (totalPages <= 1) {
    return null
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 7

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (page > 4) {
        pages.push('...')
      }

      // Show pages around current page
      const start = Math.max(2, page - 1)
      const end = Math.min(totalPages - 1, page + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (page < totalPages - 3) {
        pages.push('...')
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Results info */}
      <div className="text-sm text-gray-600">
        顯示第 {((page - 1) * pagination.limit) + 1} - {Math.min(page * pagination.limit, total)} 項，
        共 {total} 項結果
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-1">
        {/* Previous button */}
        <Button
          variant="outline"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="flex items-center px-3 py-2"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          上一頁
        </Button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {pageNumbers.map((pageNum, index) => (
            <div key={index}>
              {pageNum === '...' ? (
                <span className="px-3 py-2 text-gray-500">...</span>
              ) : (
                <Button
                  variant={pageNum === page ? 'default' : 'outline'}
                  onClick={() => onPageChange(pageNum as number)}
                  className={`px-3 py-2 min-w-[40px] ${
                    pageNum === page 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Next button */}
        <Button
          variant="outline"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="flex items-center px-3 py-2"
        >
          下一頁
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}

// Simple pagination for mobile
export function SimplePagination({ 
  pagination, 
  onPageChange, 
  className = '' 
}: NewsPaginationProps) {
  const { page, totalPages } = pagination

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Button
        variant="outline"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="flex items-center"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        上一頁
      </Button>

      <span className="text-sm text-gray-600">
        第 {page} 頁，共 {totalPages} 頁
      </span>

      <Button
        variant="outline"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="flex items-center"
      >
        下一頁
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  )
}
