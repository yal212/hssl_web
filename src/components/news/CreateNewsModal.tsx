'use client'

import { useState } from 'react'
import { NewsAPI } from '@/lib/api/news'
import { CreateNewsItem } from '@/lib/types/news'
import NewsForm from './NewsForm'

interface CreateNewsModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function CreateNewsModal({ isOpen, onClose, onSuccess }: CreateNewsModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: CreateNewsItem) => {
    try {
      setIsLoading(true)
      setError(null)
      
      await NewsAPI.createNews(data)
      
      // Success - close modal and refresh data
      onSuccess()
      onClose()
    } catch (err: any) {
      console.error('Error creating news:', err)
      setError(err.message || '建立新聞時發生錯誤，請稍後再試。')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <NewsForm
        title="建立新聞"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
      
      {/* Error Display */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 max-w-md z-[60]">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                建立失敗
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
