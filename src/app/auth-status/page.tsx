'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function AuthStatusPage() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        console.log('Session check:', { sessionData, sessionError })
        setSession(sessionData.session)

        // Check current user
        const { data: userData, error: userError } = await supabase.auth.getUser()
        console.log('User check:', { userData, userError })
        setUser(userData.user)
      } catch (err) {
        console.error('Auth check error:', err)
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

  const testDashboard = () => {
    window.location.href = '/dashboard'
  }

  const testProfile = () => {
    window.location.href = '/profile'
  }

  if (loading) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Checking Authentication Status...</h1>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Status</h1>
      
      <div className="space-y-6">
        {/* Current Status */}
        <div className={`p-4 rounded-lg border-2 ${
          user ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}>
          <h2 className="text-lg font-semibold mb-2">
            {user ? '✅ Authenticated' : '❌ Not Authenticated'}
          </h2>
          {user ? (
            <div>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Email Confirmed:</strong> {user.email_confirmed_at ? '✅ Yes' : '❌ No'}</p>
              <p><strong>Created:</strong> {new Date(user.created_at).toLocaleString()}</p>
            </div>
          ) : (
            <p>No user session found. You need to sign in.</p>
          )}
        </div>

        {/* Session Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Session Info</h2>
          <p><strong>Session:</strong> {session ? 'Active' : 'None'}</p>
          {session && (
            <div className="mt-2">
              <p><strong>Access Token:</strong> {session.access_token ? 'Present' : 'Missing'}</p>
              <p><strong>Expires:</strong> {new Date(session.expires_at * 1000).toLocaleString()}</p>
            </div>
          )}
        </div>

        {/* Test Navigation */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Test Navigation</h2>
          <div className="space-x-4">
            <button
              onClick={testDashboard}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Test Dashboard Access
            </button>
            <button
              onClick={testProfile}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Test Profile Access
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {user 
              ? "You should be able to access both pages." 
              : "These will redirect to login since you're not authenticated."
            }
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Next Steps</h2>
          {!user ? (
            <div>
              <p className="mb-2">You&apos;re not currently signed in. To test the profile page:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Go to the <a href="/login" className="text-blue-600 hover:underline">login page</a></li>
                <li>Click &quot;Create &amp; Sign In Test User&quot; to create a test account</li>
                <li><strong>Check your email</strong> for a confirmation link</li>
                <li><strong>Click the confirmation link</strong> in the email</li>
                <li>Return to the login page and sign in with the test credentials</li>
                <li>Come back to this page to verify authentication</li>
              </ol>
            </div>
          ) : !user.email_confirmed_at ? (
            <div>
              <p className="mb-2">Your email is not confirmed yet:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li><strong>Check your email</strong> for a confirmation link</li>
                <li><strong>Click the confirmation link</strong> in the email</li>
                <li>Refresh this page to see updated status</li>
              </ol>
            </div>
          ) : (
            <div>
              <p className="text-green-600 font-medium">✅ You&apos;re fully authenticated! You should be able to access both dashboard and profile pages.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
