'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Eye, EyeOff, Sparkles } from 'lucide-react'
import Link from 'next/link'
import {
  fadeInUp,
  fadeInDown,
  floating,
  colorTheme
} from '@/lib/animations'

function SignUpContent() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Handle URL parameters for messages
  useEffect(() => {
    const messageParam = searchParams.get('message')
    if (messageParam === 'already-confirmed') {
      setMessage('您的電子郵件已經確認過了！您現在可以使用您的帳戶登入。')
    }
  }, [searchParams])

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true)
      setMessage('')

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        console.error('Google auth error:', error)
        setMessage(`Google註冊失敗：${error.message}`)
      }
      // Note: If successful, user will be redirected to Google, so no success handling needed here
    } catch (error: unknown) {
      console.error('Google auth error:', error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      setMessage(`Google註冊發生錯誤：${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setMessage('請輸入電子郵件和密碼。')
      return
    }

    try {
      setIsLoading(true)
      setMessage('')

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        setMessage(error.message)
      } else {
        // Redirect to email check page with the email address
        window.location.href = `/check-email?email=${encodeURIComponent(email)}`
      }
    } catch (error: unknown) {
      console.error('Error:', error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      setMessage(`註冊發生錯誤：${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colorTheme.primary.light} via-white to-emerald-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-green-200/20 rounded-full blur-2xl"></div>
      </div>

      <motion.div
        variants={fadeInDown}
        initial="initial"
        animate="animate"
        className="relative max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            className={`mx-auto h-20 w-20 bg-gradient-to-r ${colorTheme.primary.gradient} rounded-full flex items-center justify-center mb-6 shadow-lg`}
            variants={floating}
            initial="initial"
            animate="animate"
          >
            <Sparkles className="h-10 w-10 text-white" />
          </motion.div>
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-3"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            加入我們
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            創建您的High School Soap Lab帳戶
          </motion.p>
        </div>

        {/* Sign Up Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                創建帳戶
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                加入High School Soap Lab團隊
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {message && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-md border ${
                    message.includes('Check your email') || message.includes('Test user created')
                      ? 'bg-green-50 border-green-200'
                      : message.includes('successful')
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <pre className={`text-sm whitespace-pre-wrap ${
                    message.includes('Check your email') || message.includes('Test user created')
                      ? 'text-green-600'
                      : message.includes('successful')
                      ? 'text-blue-600'
                      : 'text-red-600'
                  }`}>
                    {message}
                  </pre>
                </motion.div>
              )}

              {/* Google Sign Up Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  variant="outline"
                  className="flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-50 px-6 py-2.5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>使用Google註冊</span>
                </Button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">或</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleEmailSignUp} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    電子郵件
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    密碼
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="創建強密碼"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    isLoading={isLoading}
                    variant="primary"
                    className="px-8 py-2.5"
                  >
                    創建帳戶
                  </Button>
                </div>
              </form>

              {/* Sign In Link */}
              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-green-600 hover:text-green-500 font-medium"
                >
                  已經有帳戶？登入
                </Link>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  需要幫助？{' '}
                  <Link href="/about" className="text-green-600 hover:text-green-500 font-medium">
                    了解如何加入我們的團隊
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs text-gray-500">
            註冊即表示您同意我們的服務條款和隱私政策。
            此註冊僅供High School Soap Lab團隊成員使用。
          </p>
        </motion.div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-green-600 hover:text-green-500 font-medium"
          >
            ← 返回首頁
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    }>
      <SignUpContent />
    </Suspense>
  )
}
