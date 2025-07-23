'use client'

import { useState } from 'react'
import { clearInvalidSession } from '@/lib/auth-utils'

export function SessionCleaner() {
  const [isClearing, setIsClearing] = useState(false)
  const [message, setMessage] = useState('')

  const handleClearSession = async () => {
    setIsClearing(true)
    setMessage('')
    
    try {
      await clearInvalidSession()
      setMessage('會話已清除，請重新整理頁面')
      
      // Auto refresh after 2 seconds
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error('Error clearing session:', error)
      setMessage('清除會話時發生錯誤')
    } finally {
      setIsClearing(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          遇到登入問題？
        </h3>
        <p className="text-xs text-gray-600 mb-3">
          如果您遇到「Invalid Refresh Token」錯誤，請點擊下方按鈕清除會話。
        </p>
        <button
          onClick={handleClearSession}
          disabled={isClearing}
          className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-xs px-3 py-2 rounded-md transition-colors"
        >
          {isClearing ? '清除中...' : '清除會話'}
        </button>
        {message && (
          <p className="text-xs text-green-600 mt-2">{message}</p>
        )}
      </div>
    </div>
  )
}
