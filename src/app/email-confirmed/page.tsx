'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Mail, LogIn, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function EmailConfirmedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center py-12 px-4">
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
            <Mail className="h-16 w-16 text-green-600 mx-auto" />
            <CheckCircle className="h-8 w-8 text-green-600 absolute -bottom-1 -right-1 bg-white rounded-full" />
          </div>
        </motion.div>
        
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            電子郵件已確認！
          </h1>
          <p className="text-gray-600 mb-6">
            您的帳戶已成功驗證。現在您可以登入並享受 High School Soap Lab 的所有功能。
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
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
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 pt-6 border-t border-gray-200"
        >
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-700">
              <strong>✅ 帳戶已啟用</strong><br />
              您現在可以使用註冊時的電子郵件和密碼登入，享受完整的會員功能。
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
