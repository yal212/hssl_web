'use client'

import { motion } from 'framer-motion'
import { Database, AlertTriangle, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

interface DatabaseMigrationNoticeProps {
  onRetry?: () => void
}

export function DatabaseMigrationNotice({ onRetry }: DatabaseMigrationNoticeProps) {
  const [copied, setCopied] = useState(false)

  const migrationSQL = `-- Add news columns to posts table
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general';
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS content_images TEXT[] DEFAULT '{}';
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS content_videos TEXT[] DEFAULT '{}';
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;

-- Add category constraint
ALTER TABLE public.posts DROP CONSTRAINT IF EXISTS posts_category_check;
ALTER TABLE public.posts ADD CONSTRAINT posts_category_check
CHECK (category IN ('general', 'events', 'achievements', 'announcements', 'workshops', 'partnerships'));

-- Update published_at for existing posts
UPDATE public.posts SET published_at = created_at WHERE published = true AND published_at IS NULL;

-- Add sample news (optional - you can skip this part if you prefer)
INSERT INTO public.posts (title, content, excerpt, published, featured, category, tags, image_url, published_at, created_at)
SELECT * FROM (VALUES
    ('歡迎來到 HSSL 最新消息頁面', '<p>我們很高興為您介紹全新的最新消息頁面！</p>', '全新的最新消息頁面正式上線！', true, true, 'announcements', ARRAY['公告', '網站更新'], '/hssl_profile.jpg', NOW(), NOW())
) AS new_posts(title, content, excerpt, published, featured, category, tags, image_url, published_at, created_at)
WHERE NOT EXISTS (SELECT 1 FROM public.posts WHERE posts.title = new_posts.title);`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(migrationSQL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                資料庫需要更新
              </h1>
              <p className="text-gray-600">
                新聞功能需要額外的資料庫欄位。請執行以下遷移腳本來啟用完整功能。
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 mb-6 border border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-emerald-500" />
                  遷移步驟
                </h3>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>登入您的 Supabase 控制台</li>
                <li>前往 SQL Editor</li>
                <li>複製下方的 SQL 腳本</li>
                <li>貼上並執行腳本</li>
                <li>重新整理此頁面</li>
              </ol>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-sm font-medium">SQL 遷移腳本</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      已複製
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      複製
                    </>
                  )}
                </Button>
              </div>
              <pre className="text-gray-300 text-xs overflow-x-auto whitespace-pre-wrap">
                {migrationSQL}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={onRetry}
                className="flex-1"
              >
                重新檢查
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                className="flex-1"
              >
                開啟 Supabase 控制台
              </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">需要幫助？</h4>
              <p className="text-blue-800 text-sm">
                如果您在執行遷移時遇到問題，請檢查：
              </p>
              <ul className="list-disc list-inside text-blue-800 text-sm mt-2 space-y-1">
                <li>確保您有資料庫的寫入權限</li>
                <li>檢查 Supabase 專案是否正常運作</li>
                <li>確認環境變數設定正確</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
