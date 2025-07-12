'use client'

import { motion } from 'framer-motion'
import { Mail, Clock, RefreshCw, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState, useEffect } from 'react'

interface EmailCheckPromptProps {
  email?: string
  onResendEmail?: () => Promise<void>
  onBackToLogin?: () => void
  showBackButton?: boolean
  title?: string
  subtitle?: string
  className?: string
}

export function EmailCheckPrompt({
  email,
  onResendEmail,
  onBackToLogin,
  showBackButton = true,
  title = "請檢查您的電子郵件",
  subtitle = "我們已發送確認連結到您的信箱",
  className = ""
}: EmailCheckPromptProps) {
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [resendSuccess, setResendSuccess] = useState(false)

  // Cooldown timer for resend button
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleResendEmail = async () => {
    if (!onResendEmail || resendCooldown > 0) return

    setIsResending(true)
    setResendSuccess(false)

    try {
      await onResendEmail()
      setResendSuccess(true)
      setResendCooldown(60) // 60 second cooldown
    } catch (error) {
      console.error('Failed to resend email:', error)
    } finally {
      setIsResending(false)
    }
  }



  return (
    <div className={`bg-white rounded-lg shadow-lg p-8 text-center ${className}`}>
      {/* Email Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mx-auto mb-6"
      >
        <div className="relative">
          <Mail className="h-16 w-16 text-blue-600 mx-auto" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1"
          >
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Title and Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h1>
        <p className="text-gray-600 mb-2">
          {subtitle}
        </p>
        {email && (
          <p className="text-sm text-blue-600 font-medium mb-6">
            📧 {email}
          </p>
        )}
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-blue-50 p-4 rounded-lg mb-6"
      >
        <h3 className="font-semibold text-blue-900 mb-2">接下來請：</h3>
        <ol className="text-left text-sm text-blue-800 space-y-1">
          <li>1. 📱 檢查您的電子郵件收件匣</li>
          <li>2. 🔍 如果沒看到，請檢查垃圾郵件資料夾</li>
          <li>3. 🔗 點擊郵件中的「確認電子郵件地址」按鈕</li>
          <li>4. ✅ 確認後即可登入使用所有功能</li>
        </ol>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="space-y-3"
      >


        {/* Resend Email Button */}
        {onResendEmail && (
          <Button
            onClick={handleResendEmail}
            variant="outline"
            disabled={isResending || resendCooldown > 0}
            className="w-full flex items-center justify-center"
          >
            {isResending ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                發送中...
              </>
            ) : resendCooldown > 0 ? (
              <>
                <Clock className="h-4 w-4 mr-2" />
                重新發送 ({resendCooldown}s)
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                重新發送確認郵件
              </>
            )}
          </Button>
        )}

        {/* Success Message */}
        {resendSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-md p-3"
          >
            <p className="text-sm text-green-700">
              ✅ 確認郵件已重新發送！請檢查您的收件匣。
            </p>
          </motion.div>
        )}

        {/* Back to Login Button */}
        {showBackButton && (
          <Button
            onClick={onBackToLogin}
            variant="ghost"
            className="w-full flex items-center justify-center text-gray-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回登入頁面
          </Button>
        )}
      </motion.div>

      {/* Additional Help */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-6 pt-6 border-t border-gray-200"
      >
        <p className="text-xs text-gray-500">
          💡 提示：確認郵件可能需要幾分鐘才能送達。如果超過 10 分鐘仍未收到，請嘗試重新發送。
        </p>
      </motion.div>
    </div>
  )
}
