'use client'

import { motion } from 'framer-motion'
import { Mail, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

interface InlineEmailCheckProps {
  email: string
  onResendEmail?: () => Promise<void>
  className?: string
}

export function InlineEmailCheck({
  email,
  onResendEmail,
  className = ""
}: InlineEmailCheckProps) {
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  const handleResendEmail = async () => {
    if (!onResendEmail) return

    setIsResending(true)
    setResendSuccess(false)

    try {
      await onResendEmail()
      setResendSuccess(true)
    } catch (error) {
      console.error('Failed to resend email:', error)
    } finally {
      setIsResending(false)
    }
  }



  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-start space-x-3">
        <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-medium text-blue-900 mb-1">
            請檢查您的電子郵件
          </h4>
          <p className="text-sm text-blue-800 mb-2">
            我們已發送確認連結到：<br />
            <span className="font-medium">{email}</span>
          </p>
          <p className="text-xs text-blue-700 mb-3">
            請點擊郵件中的確認連結來啟用您的帳戶。如果沒看到郵件，請檢查垃圾郵件資料夾。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            {onResendEmail && (
              <Button
                onClick={handleResendEmail}
                variant="ghost"
                size="sm"
                disabled={isResending}
                className="flex items-center justify-center text-blue-700 hover:bg-blue-100"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                    發送中...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-3 w-3 mr-1" />
                    重新發送
                  </>
                )}
              </Button>
            )}
          </div>

          {resendSuccess && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-green-700 mt-2 font-medium"
            >
              ✅ 確認郵件已重新發送！
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
