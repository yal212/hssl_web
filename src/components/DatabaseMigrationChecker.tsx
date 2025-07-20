'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Database } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface DatabaseStatus {
  hasContentImages: boolean
  hasContentVideos: boolean
  isLoading: boolean
  error?: string
}

export function DatabaseMigrationChecker() {
  const [status, setStatus] = useState<DatabaseStatus>({
    hasContentImages: false,
    hasContentVideos: false,
    isLoading: true
  })

  const checkDatabaseColumns = async () => {
    setStatus(prev => ({ ...prev, isLoading: true, error: undefined }))
    
    try {
      // Try to select the new columns to see if they exist
      const { error } = await supabase
        .from('posts')
        .select('content_images, content_videos')
        .limit(1)

      if (error) {
        // If error contains "column does not exist", the migration is needed
        const hasContentImages = !error.message.includes('content_images')
        const hasContentVideos = !error.message.includes('content_videos')
        
        setStatus({
          hasContentImages,
          hasContentVideos,
          isLoading: false,
          error: hasContentImages && hasContentVideos ? undefined : 'Database migration required'
        })
      } else {
        // No error means both columns exist
        setStatus({
          hasContentImages: true,
          hasContentVideos: true,
          isLoading: false
        })
      }
    } catch (err) {
      console.error('Error checking database columns:', err)
      setStatus({
        hasContentImages: false,
        hasContentVideos: false,
        isLoading: false,
        error: 'Failed to check database status'
      })
    }
  }

  useEffect(() => {
    checkDatabaseColumns()
  }, [])

  const needsMigration = !status.hasContentImages || !status.hasContentVideos

  if (status.isLoading) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-blue-800">Checking database status...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!needsMigration) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-green-800">Database is up to date</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const migrationSQL = `-- Add missing columns to posts table
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS content_images TEXT[] DEFAULT '{}';
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS content_videos TEXT[] DEFAULT '{}';`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-800">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Database Migration Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-orange-700">
              The database needs to be updated to support news image galleries. 
              The following columns are missing:
            </p>
            
            <div className="space-y-2">
              {!status.hasContentImages && (
                <div className="flex items-center text-orange-700">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span>content_images column</span>
                </div>
              )}
              {!status.hasContentVideos && (
                <div className="flex items-center text-orange-700">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span>content_videos column</span>
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-800 mb-2">
                Run this SQL in Supabase SQL Editor:
              </h4>
              <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
                <code>{migrationSQL}</code>
              </pre>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={checkDatabaseColumns}
                className="flex items-center"
              >
                <Database className="w-4 h-4 mr-2" />
                Recheck Database
              </Button>
              <Button
                variant="outline"
                onClick={() => navigator.clipboard.writeText(migrationSQL)}
              >
                Copy SQL
              </Button>
            </div>

            <p className="text-sm text-orange-600">
              After running the SQL, click &ldquo;Recheck Database&rdquo; to verify the migration.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
