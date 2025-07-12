'use client'

import { motion } from 'framer-motion'
import { CheckCircle, LogIn, Home, Info } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function AlreadyConfirmedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6"
        >
          <div className="relative">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <Info className="h-6 w-6 text-blue-600 absolute -bottom-1 -right-1 bg-white rounded-full" />
          </div>
        </motion.div>
        
        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            電子郵件已確認過了
          </h1>
          <p className="text-gray-600 mb-6">
            您的帳戶已經成功驗證過了。您現在可以直接登入使用 High School Soap Lab 的所有功能。
          </p>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
        >
          <h3 className="font-semibold text-blue-900 mb-2">為什麼看到這個頁面？</h3>
          <p className="text-sm text-blue-800">
            您點擊了一個已經使用過的確認連結。這是正常的 - 每個確認連結只能使用一次，以確保您的帳戶安全。
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-3"
        >
          {/* Login Button */}
          <Link href="/login" className="block">
            <Button variant="primary" className="w-full flex items-center justify-center">
              <LogIn className="h-4 w-4 mr-2" />
              立即登入
            </Button>
          </Link>

          {/* Go to Home Button */}
          <Link href="/" className="block">
            <Button variant="outline" className="w-full flex items-center justify-center">
              <Home className="h-4 w-4 mr-2" />
              返回首頁
            </Button>
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-6 pt-6 border-t border-gray-200"
        >
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-700">
              <strong>✅ 您的帳戶狀態：已啟用</strong><br />
              您可以使用註冊時的電子郵件和密碼正常登入。
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
