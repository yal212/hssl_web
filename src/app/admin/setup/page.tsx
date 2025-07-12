'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { setupDatabase, checkDatabaseConnection } from '@/lib/database-setup'
import { Database, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function AdminSetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSetupDatabase = async () => {
    setIsLoading(true)
    setStatus('idle')
    setMessage('Setting up database...')

    try {
      // First check connection
      const connectionOk = await checkDatabaseConnection()
      if (!connectionOk) {
        setStatus('error')
        setMessage('Failed to connect to database. Please check your Supabase configuration.')
        setIsLoading(false)
        return
      }

      // Run setup
      const setupOk = await setupDatabase()
      if (setupOk) {
        setStatus('success')
        setMessage('Database setup completed successfully! Sample products have been added.')
      } else {
        setStatus('error')
        setMessage('Database setup failed. Please check the console for more details.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('An unexpected error occurred during setup.')
      console.error('Setup error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestConnection = async () => {
    setIsLoading(true)
    setStatus('idle')
    setMessage('Testing database connection...')

    try {
      const connectionOk = await checkDatabaseConnection()
      if (connectionOk) {
        setStatus('success')
        setMessage('Database connection successful!')
      } else {
        setStatus('error')
        setMessage('Failed to connect to database. Please check your Supabase configuration.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Connection test failed.')
      console.error('Connection test error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Database Setup
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Set up your Supabase database with the required tables and sample data 
            for High School Soap Lab.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Test Connection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2 text-blue-600" />
                  Test Connection
                </CardTitle>
                <CardDescription>
                  Verify that your Supabase database is properly configured and accessible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleTestConnection}
                  disabled={isLoading}
                  isLoading={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  Test Database Connection
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Setup Database */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2 text-green-600" />
                  Setup Database
                </CardTitle>
                <CardDescription>
                  Initialize your database with sample products and required data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleSetupDatabase}
                  disabled={isLoading}
                  isLoading={isLoading}
                  variant="primary"
                  className="w-full"
                >
                  Setup Database
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Status Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            <Card className={`
              ${status === 'success' ? 'border-green-200 bg-green-50' : ''}
              ${status === 'error' ? 'border-red-200 bg-red-50' : ''}
              ${status === 'idle' ? 'border-blue-200 bg-blue-50' : ''}
            `}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  {status === 'success' && <CheckCircle className="w-6 h-6 text-green-600" />}
                  {status === 'error' && <XCircle className="w-6 h-6 text-red-600" />}
                  {status === 'idle' && <AlertCircle className="w-6 h-6 text-blue-600" />}
                  <p className={`
                    ${status === 'success' ? 'text-green-800' : ''}
                    ${status === 'error' ? 'text-red-800' : ''}
                    ${status === 'idle' ? 'text-blue-800' : ''}
                  `}>
                    {message}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
              <CardDescription>
                Follow these steps to properly configure your database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>
                  Make sure you have created a Supabase project and configured your environment variables in <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>
                </li>
                <li>
                  Run the SQL schema from <code className="bg-gray-100 px-2 py-1 rounded">supabase-schema.sql</code> in your Supabase SQL Editor
                </li>
                <li>
                  Click &quot;Test Connection&quot; to verify your database is accessible
                </li>
                <li>
                  Click &quot;Setup Database&quot; to populate your database with sample products
                </li>
                <li>
                  Configure Google OAuth in your Supabase Authentication settings
                </li>
              </ol>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> Make sure to run the SQL schema in Supabase before using the setup button. 
                  The setup only adds sample data, not the table structure.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
