'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/hooks/useAdmin'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface AdminGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function AdminGuard({ children, fallback }: AdminGuardProps) {
  const { isAdmin, loading, user, profile } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    // If not loading and user is not admin, redirect to home
    if (!loading && user && !isAdmin) {
      router.push('/')
    }
  }, [isAdmin, loading, user, router])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-96">
            <CardContent className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">驗證管理員權限中...</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Show unauthorized state if user is not admin
  if (!loading && (!user || !isAdmin)) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-96">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-red-600">
                <AlertTriangle className="w-6 h-6" />
                存取被拒絕
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                您沒有權限存取此頁面。只有管理員可以存取此功能。
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  返回上頁
                </Button>
                <Button 
                  onClick={() => router.push('/')}
                  className="flex-1"
                >
                  回到首頁
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Show admin content if user is admin
  if (isAdmin) {
    return (
      <div className="relative">
        {/* Admin indicator */}
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-lg">
            <Shield className="w-4 h-4 mr-2" />
            管理員模式
          </div>
        </div>
        {children}
      </div>
    )
  }

  return null
}
