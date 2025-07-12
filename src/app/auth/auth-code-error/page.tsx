'use client'

import { motion } from 'framer-motion'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthCodeErrorPage() {
  const searchParams = useSearchParams()
  const [debugInfo, setDebugInfo] = useState<string>('')

  useEffect(() => {
    // Capture URL parameters for debugging
    const params = new URLSearchParams(window.location.search)
    const info = Array.from(params.entries()).map(([key, value]) => `${key}: ${value}`).join(', ')
    setDebugInfo(info)
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-4"
        >
          <XCircle className="h-12 w-12 text-red-600" />
        </motion.div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          驗證錯誤
        </h2>

        <p className="text-gray-600 mb-6">
          處理您的身份驗證時發生錯誤。這可能是因為：
        </p>

        <ul className="text-left text-sm text-gray-600 mb-6 space-y-1">
          <li>• 確認連結已過期</li>
          <li>• 連結已經被使用過</li>
          <li>• 發生網路錯誤</li>
          <li>• 您的帳戶可能已經確認過了</li>
        </ul>

        <div className="space-y-3">
          <Link href="/login">
            <Button variant="primary" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回登入頁面
            </Button>
          </Link>

          <Link href="/login">
            <Button variant="outline" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              嘗試登入現有帳戶
            </Button>
          </Link>

          <p className="text-xs text-gray-500">
            如果您持續遇到問題，請嘗試重新註冊或聯繫支援。
          </p>

          {debugInfo && (
            <details className="text-xs text-gray-400 mt-4">
              <summary className="cursor-pointer">技術資訊 (點擊展開)</summary>
              <p className="mt-2 p-2 bg-gray-50 rounded text-left break-all">
                {debugInfo || '無參數'}
              </p>
            </details>
          )}
        </div>
      </motion.div>
    </div>
  )
}
