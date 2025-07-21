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

function LoginContent() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  // Handle URL parameters for messages
  useEffect(() => {
    const messageParam = searchParams.get('message')
    if (messageParam === 'already-confirmed') {
      setMessage('您的電子郵件已經確認過了！您現在可以使用您的帳戶登入。')
    }
  }, [searchParams])

  const createTestUser = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      // Create a test user with a known email/password
      const testEmail = 'test@hssl.com'
      const testPassword = 'testpassword123'

      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword
      })

      console.log('Test user creation result:', { data, error })

      if (error) {
        setMessage(`測試用戶創建失敗：${error.message}`)
      } else {
        // Redirect to email check page for test user
        window.location.href = `/check-email?email=${encodeURIComponent(testEmail)}`
      }
    } catch (err) {
      console.error('Test user creation error:', err)
      setMessage('創建測試用戶時發生意外錯誤')
    } finally {
      setIsLoading(false)
    }
  }

  // Test Supabase connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        console.log('Supabase connection test:', { data, error })
      } catch (err) {
        console.error('Supabase connection error:', err)
      }
    }
    testConnection()
  }, [])

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setMessage('請輸入電子郵件和密碼。')
      return
    }

    try {
      setIsLoading(true)
      setMessage('')

      if (isSignUp) {
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
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        console.log('Login attempt result:', { data, error })

        if (error) {
          console.error('Login error:', error)
          if (error.message.includes('Email not confirmed')) {
            setMessage('請檢查您的電子郵件並在登入前點擊確認連結。如果您沒有看到電子郵件，請檢查垃圾郵件資料夾。')
          } else if (error.message.includes('Invalid login credentials')) {
            setMessage('電子郵件或密碼無效。請檢查您的憑證並重試。')
          } else {
            setMessage(`登入失敗：${error.message}`)
          }
        } else if (data.user) {
          console.log('Login successful, user:', data.user)
          setMessage('登入成功！正在重新導向...')
          // Use window.location for immediate redirect to ensure session is included
          window.location.href = '/login-success'
        } else {
          console.log('Login returned no user')
          setMessage('登入失敗：未返回用戶')
        }
      }
    } catch (error) {
      setMessage('發生意外錯誤。請重試。')
      console.error('Error:', error)
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
            歡迎回來
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            登入以存取您的High School Soap Lab個人資料
          </motion.p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                {isSignUp ? '創建帳戶' : '會員登入'}
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                {isSignUp
                  ? '加入High School Soap Lab團隊'
                  : '登入以存取您的個人資料'
                }
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

            {/* Info Box */}
            {!isSignUp && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <p className="text-sm text-blue-700">
                  <strong>第一次登入？</strong> 您需要在存取儀表板之前確認您的電子郵件地址。創建帳戶後請檢查您的電子郵件中的確認連結。
                </p>
              </div>
            )}

            {/* Email/Password Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
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
                    placeholder={isSignUp ? '創建強密碼' : '輸入您的密碼'}
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

              <Button
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
                variant="primary"
                className="w-full"
              >
                {isSignUp ? '創建帳戶' : '登入'}
              </Button>
            </form>

            {/* Toggle Sign Up/Sign In */}
            <div className="text-center space-y-2">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setMessage('')
                  setEmail('')
                  setPassword('')
                }}
                className="text-sm text-green-600 hover:text-green-500 font-medium"
              >
                {isSignUp
                  ? '已經有帳戶？登入'
                  : '沒有帳戶？註冊'
                }
              </button>

              {/* Test User Button */}
              <div>
                <button
                  onClick={createTestUser}
                  disabled={isLoading}
                  className="text-xs text-blue-600 hover:text-blue-500 font-medium disabled:opacity-50"
                >
                  創建並登入測試用戶
                </button>
              </div>

              {/* Email Check Link */}
              <div>
                <Link
                  href="/check-email"
                  className="text-xs text-gray-600 hover:text-gray-500 font-medium"
                >
                  需要檢查確認郵件？
                </Link>
              </div>
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
            登入即表示您同意我們的服務條款和隱私政策。
            此登入僅供High School Soap Lab團隊成員使用。
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

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
