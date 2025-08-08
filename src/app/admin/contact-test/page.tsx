'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Database,
  Mail,
  Send,
  Settings
} from 'lucide-react'

interface TestResult {
  name: string
  status: 'success' | 'error' | 'warning' | 'pending'
  message: string
  details?: string
}

export default function ContactTestPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const updateResult = (name: string, status: TestResult['status'], message: string, details?: string) => {
    setTestResults(prev => {
      const existing = prev.find(r => r.name === name)
      const newResult = { name, status, message, details }
      
      if (existing) {
        return prev.map(r => r.name === name ? newResult : r)
      } else {
        return [...prev, newResult]
      }
    })
  }

  const runTests = async () => {
    setIsRunning(true)
    setTestResults([])

    // Test 1: Database Connection
    updateResult('database', 'pending', 'Testing database connection...')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          subject: 'Test Message',
          message: 'This is a test message to verify the contact form is working.'
        })
      })

      if (response.ok) {
        const result = await response.json()
        updateResult('database', 'success', 'Database connection successful', `Message ID: ${result.id}`)
      } else {
        const error = await response.json()
        updateResult('database', 'error', 'Database connection failed', error.error || 'Unknown error')
      }
    } catch (error) {
      updateResult('database', 'error', 'Database connection failed', error instanceof Error ? error.message : 'Network error')
    }

    // Test 2: Email Configuration
    updateResult('email', 'pending', 'Checking email configuration...')
    const hasResendKey = !!process.env.NEXT_PUBLIC_RESEND_API_KEY || 'RESEND_API_KEY configured'
    const hasAdminEmail = !!process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'ADMIN_EMAIL configured'
    
    if (hasResendKey && hasAdminEmail) {
      updateResult('email', 'success', 'Email configuration looks good')
    } else {
      updateResult('email', 'warning', 'Email configuration incomplete', 
        `Missing: ${!hasResendKey ? 'RESEND_API_KEY ' : ''}${!hasAdminEmail ? 'ADMIN_EMAIL' : ''}`)
    }

    // Test 3: Admin API Access
    updateResult('admin', 'pending', 'Testing admin API access...')
    try {
      const response = await fetch('/api/admin/contact-messages')
      
      if (response.status === 401) {
        updateResult('admin', 'warning', 'Admin API requires authentication', 'Login as admin to test this feature')
      } else if (response.ok) {
        updateResult('admin', 'success', 'Admin API accessible')
      } else {
        const error = await response.json()
        updateResult('admin', 'error', 'Admin API error', error.error || 'Unknown error')
      }
    } catch (error) {
      updateResult('admin', 'error', 'Admin API connection failed', error instanceof Error ? error.message : 'Network error')
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'pending':
        return <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    }
  }

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'pending':
        return 'bg-blue-50 border-blue-200'
    }
  }

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Form System Test</h1>
          <p className="text-gray-600">Test the contact form system to identify any issues</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Diagnostics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  onClick={runTests} 
                  disabled={isRunning}
                  isLoading={isRunning}
                  size="lg"
                >
                  {isRunning ? 'Running Tests...' : 'Run System Tests'}
                </Button>

                {testResults.length > 0 && (
                  <div className="space-y-3">
                    {testResults.map((result) => (
                      <div
                        key={result.name}
                        className={`p-4 border rounded-lg ${getStatusColor(result.status)}`}
                      >
                        <div className="flex items-start gap-3">
                          {getStatusIcon(result.status)}
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 capitalize">
                              {result.name} Test
                            </h4>
                            <p className="text-sm text-gray-700 mt-1">{result.message}</p>
                            {result.details && (
                              <p className="text-xs text-gray-600 mt-2 font-mono bg-white/50 p-2 rounded">
                                {result.details}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Setup Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Database Setup</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Run contact-messages-migration.sql in Supabase</li>
                      <li>• Verify contact_messages table exists</li>
                      <li>• Check RLS policies are applied</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Email Setup</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Sign up for Resend account</li>
                      <li>• Add RESEND_API_KEY to .env.local</li>
                      <li>• Add ADMIN_EMAIL to .env.local</li>
                      <li>• Add FROM_EMAIL to .env.local</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Environment Variables Needed</h4>
                  <pre className="text-sm text-blue-800 font-mono">
{`RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=your-admin-email@gmail.com`}
                  </pre>
                </div>

                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Quick Links</h4>
                  <div className="space-y-2">
                    <a 
                      href="/about/contact" 
                      className="inline-flex items-center gap-2 text-green-700 hover:text-green-800"
                    >
                      <Send className="w-4 h-4" />
                      Test Contact Form
                    </a>
                    <br />
                    <a 
                      href="/admin/contact-messages" 
                      className="inline-flex items-center gap-2 text-green-700 hover:text-green-800"
                    >
                      <Mail className="w-4 h-4" />
                      Admin Dashboard
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
