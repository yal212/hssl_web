'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function DebugCallbackPage() {
  const searchParams = useSearchParams()
  const [params, setParams] = useState<Record<string, string>>({})
  const [authState, setAuthState] = useState<any>(null)

  useEffect(() => {
    // Capture all URL parameters
    const allParams: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      allParams[key] = value
    })
    setParams(allParams)

    // Check current auth state
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      setAuthState({ session: !!session, user: session?.user?.email, error: error?.message })
    }
    checkAuth()
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Debug Auth Callback</h1>
        
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">URL Parameters</h2>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
              {JSON.stringify(params, null, 2)}
            </pre>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Current Auth State</h2>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
              {JSON.stringify(authState, null, 2)}
            </pre>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Instructions</h2>
            <p className="text-sm text-gray-600 mb-3">
              This page helps debug authentication callback issues.
              When you click an email confirmation link, you can temporarily change the redirect URL to come here first to see what parameters are being sent.
            </p>
            <div className="space-y-2">
              <a
                href="/auth/callback"
                className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Test Auth Callback
              </a>
              <a
                href="/already-confirmed"
                className="inline-block bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 ml-2"
              >
                Test Already Confirmed
              </a>
              <a
                href="/email-confirmed"
                className="inline-block bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 ml-2"
              >
                Test Email Confirmed
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
