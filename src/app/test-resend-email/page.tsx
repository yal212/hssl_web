'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'

export default function TestResendEmailPage() {
  const [email, setEmail] = useState('yalee212@gmail.com')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleResendConfirmation = async () => {
    if (!email) {
      setMessage('請輸入電子郵件地址')
      return
    }

    setIsLoading(true)
    setMessage('')
    setSuccess(false)

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        setMessage(`發送失敗：${error.message}`)
        setSuccess(false)
      } else {
        setMessage(`確認郵件已發送到 ${email}！請檢查您的收件匣。`)
        setSuccess(true)
      }
    } catch (error) {
      setMessage('發生意外錯誤，請重試。')
      setSuccess(false)
      console.error('Resend error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            測試確認郵件
          </h1>
          <p className="text-gray-600 text-sm">
            重新發送確認郵件以測試新的流程
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              電子郵件地址
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <Button
            onClick={handleResendConfirmation}
            disabled={isLoading || !email}
            variant="primary"
            className="w-full flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Send className="h-4 w-4 mr-2 animate-pulse" />
                發送中...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                重新發送確認郵件
              </>
            )}
          </Button>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-md flex items-start space-x-2 ${
                success 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              {success ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              )}
              <p className={`text-sm ${success ? 'text-green-700' : 'text-red-700'}`}>
                {message}
              </p>
            </motion.div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">測試步驟：</h3>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. 點擊「重新發送確認郵件」</li>
            <li>2. 檢查 {email} 的收件匣</li>
            <li>3. 點擊新的確認連結</li>
            <li>4. 應該會看到新的確認頁面</li>
            <li>5. 再次點擊同一個連結測試「已確認」頁面</li>
          </ol>
        </div>

        {/* Warning */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-md p-3">
          <p className="text-xs text-yellow-700">
            ⚠️ 注意：這個頁面僅用於測試目的。舊的確認郵件不會使用新的流程，只有新發送的郵件才會。
          </p>
        </div>
      </motion.div>
    </div>
  )
}
