'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestAuthPage() {
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('testpassword123')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const createTestUser = async () => {
    setLoading(true)
    setMessage('')

    try {
      // Try to create user without email confirmation
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            email_confirm: true // Try to skip email confirmation
          }
        }
      })

      console.log('Sign up result:', { data, error })

      if (error) {
        setMessage(`Sign up error: ${error.message}`)
      } else {
        setMessage('Test user created! Now try signing in.')
        // Automatically try to sign in after signup
        setTimeout(() => {
          signInTestUser()
        }, 1000)
      }
    } catch (err) {
      console.error('Sign up error:', err)
      setMessage('Unexpected error during sign up')
    } finally {
      setLoading(false)
    }
  }

  const signInTestUser = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      console.log('Sign in result:', { data, error })
      
      if (error) {
        setMessage(`Sign in error: ${error.message}`)
      } else if (data.user) {
        setMessage('Sign in successful! User authenticated.')
        // Test navigation after successful login
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 2000)
      } else {
        setMessage('Sign in returned no user')
      }
    } catch (err) {
      console.error('Sign in error:', err)
      setMessage('Unexpected error during sign in')
    } finally {
      setLoading(false)
    }
  }

  const checkCurrentUser = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const { data: userData } = await supabase.auth.getUser()
      
      console.log('Current session:', sessionData)
      console.log('Current user:', userData)
      
      if (userData.user) {
        setMessage(`Currently signed in as: ${userData.user.email}`)
      } else {
        setMessage('No user currently signed in')
      }
    } catch (err) {
      console.error('Check user error:', err)
      setMessage('Error checking current user')
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        setMessage(`Sign out error: ${error.message}`)
      } else {
        setMessage('Signed out successfully')
      }
    } catch (err) {
      console.error('Sign out error:', err)
      setMessage('Error signing out')
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Test Page</h1>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="space-x-4 mb-6">
        <button
          onClick={createTestUser}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Create Test User
        </button>
        <button
          onClick={signInTestUser}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Sign In Test User
        </button>
        <button
          onClick={checkCurrentUser}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Check Current User
        </button>
        <button
          onClick={signOut}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>

      {message && (
        <div className="p-4 bg-gray-100 rounded">
          <p>{message}</p>
        </div>
      )}
    </div>
  )
}
