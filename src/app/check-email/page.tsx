'use client'

import { motion } from 'framer-motion'
import { useSearchParams, useRouter } from 'next/navigation'
import { EmailCheckPrompt } from '@/components/EmailCheckPrompt'
import { supabase } from '@/lib/supabase'
import { useState, useEffect, Suspense } from 'react'

function CheckEmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    // Get email from URL params or session
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    } else {
      // Try to get email from current session if available
      const getSessionEmail = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user?.email) {
          setEmail(session.user.email)
        }
      }
      getSessionEmail()
    }
  }, [searchParams])

  const handleResendEmail = async () => {
    if (!email) {
      throw new Error('No email address available')
    }

    // Resend confirmation email
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      throw error
    }
  }

  const handleBackToLogin = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <EmailCheckPrompt
          email={email}
          onResendEmail={handleResendEmail}
          onBackToLogin={handleBackToLogin}
          title="請檢查您的電子郵件"
          subtitle="我們已發送確認連結到您的信箱"
        />

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 bg-cream rounded-lg shadow-sm p-6"
        >
          <h3 className="font-semibold text-gray-900 mb-3">為什麼需要確認電子郵件？</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">🔒</span>
              確保您的帳戶安全
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">📧</span>
              接收重要的產品更新和通知
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">🛡️</span>
              防止他人使用您的電子郵件註冊
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✨</span>
              享受完整的 High School Soap Lab 功能
            </li>
          </ul>
        </motion.div>

        {/* Troubleshooting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        >
          <h4 className="font-medium text-yellow-800 mb-2">沒有收到郵件？</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 檢查垃圾郵件或促銷郵件資料夾</li>
            <li>• 確認電子郵件地址拼寫正確</li>
            <li>• 等待幾分鐘，有時郵件會延遲送達</li>
            <li>• 點擊上方「重新發送確認郵件」按鈕</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    }>
      <CheckEmailContent />
    </Suspense>
  )
}
