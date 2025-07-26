'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Home, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginSuccessPage() {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!loading && !isAuthenticated) {
      router.push('/login')
      return
    }

    // If authenticated, show content after a brief delay for better UX
    if (isAuthenticated) {
      const timer = setTimeout(() => setShowContent(true), 500)
      return () => clearTimeout(timer)
    }
  }, [loading, isAuthenticated, router])

  // Show loading state while checking authentication
  if (loading || !showContent) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">驗證登入狀態...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-4">
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
          <CheckCircle className="h-16 w-16 text-green-600" />
        </motion.div>
        
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            登入成功！
          </h1>
          <p className="text-gray-600 mb-2">
            歡迎回到 High School Soap Lab
          </p>
          {user?.email && (
            <p className="text-sm text-gray-500 mb-6">
              已登入為：{user.email}
            </p>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-3"
        >
          {/* Go to Home Button */}
          <Link href="/" className="block">
            <Button variant="primary" className="w-full flex items-center justify-center">
              <Home className="h-4 w-4 mr-2" />
              前往首頁
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>

          {/* Go to Profile Button */}
          <Link href="/profile" className="block">
            <Button variant="outline" className="w-full flex items-center justify-center">
              <User className="h-4 w-4 mr-2" />
              查看個人資料
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
          <p className="text-xs text-gray-500">
            您現在可以存取所有功能，包括個人資料管理和其他會員專屬內容。
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
