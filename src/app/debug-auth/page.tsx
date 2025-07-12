'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function DebugAuthPage() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        console.log('Session data:', sessionData)
        console.log('Session error:', sessionError)
        setSession(sessionData.session)

        // Check current user
        const { data: userData, error: userError } = await supabase.auth.getUser()
        console.log('User data:', userData)
        console.log('User error:', userError)
        setUser(userData.user)

        if (sessionError || userError) {
          setError(sessionError?.message || userError?.message || 'Unknown error')
        }
      } catch (err) {
        console.error('Auth check error:', err)
        setError('Failed to check authentication')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session)
      setSession(session)
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div className="p-8">Loading authentication state...</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Debug Page</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Authentication Status</h2>
          <p><strong>User:</strong> {user ? 'Authenticated' : 'Not authenticated'}</p>
          <p><strong>Session:</strong> {session ? 'Active' : 'No session'}</p>
          {error && <p className="text-red-600"><strong>Error:</strong> {error}</p>}
        </div>

        {user && (
          <div className="bg-green-100 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">User Details</h2>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}

        {session && (
          <div className="bg-blue-100 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">Session Details</h2>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Test Actions</h2>
          <div className="space-x-4">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Dashboard (window.location)
            </button>
            <button
              onClick={() => {
                const link = document.createElement('a')
                link.href = '/dashboard'
                link.click()
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Go to Dashboard (link click)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
