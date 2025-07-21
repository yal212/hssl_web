'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']

interface AuthState {
  user: User | null
  profile: Profile | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    // Get initial user and profile
    const getInitialAuth = async () => {
      try {
        // First check if we have a session before trying to get user
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('Session error:', sessionError)
          setAuthState({
            user: null,
            profile: null,
            loading: false,
            error: null
          })
          return
        }

        // Only try to get user if we have a valid session
        if (!session) {
          setAuthState({
            user: null,
            profile: null,
            loading: false,
            error: null
          })
          return
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError) {
          console.error('Error getting user:', userError)
          // If it's an auth session missing error, just set no user
          if (userError.message.includes('session') || userError.message.includes('token')) {
            console.log('Auth session missing, clearing state')
            await supabase.auth.signOut()
          }
          setAuthState({
            user: null,
            profile: null,
            loading: false,
            error: null // Don't show token errors to user
          })
          return
        }

        if (user) {
          // Fetch user profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (profileError && profileError.code !== 'PGRST116') {
            // PGRST116 is "not found" error, which is okay for new users
            console.error('Error fetching profile:', profileError)
          }

          setAuthState({
            user,
            profile: profile || null,
            loading: false,
            error: null
          })
        } else {
          setAuthState({
            user: null,
            profile: null,
            loading: false,
            error: null
          })
        }
      } catch (error) {
        console.error('Error in getInitialAuth:', error)
        setAuthState(prev => ({ 
          ...prev, 
          error: 'Failed to load authentication state', 
          loading: false 
        }))
      }
    }

    getInitialAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Fetch user profile when user signs in
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Error fetching profile:', profileError)
          }

          setAuthState({
            user: session.user,
            profile: profile || null,
            loading: false,
            error: null
          })
        } else {
          setAuthState({
            user: null,
            profile: null,
            loading: false,
            error: null
          })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      return { error: null }
    } catch {
      const errorMessage = 'Failed to sign out'
      setAuthState(prev => ({ ...prev, error: errorMessage }))
      return { error: { message: errorMessage } }
    }
  }

  const refreshProfile = async () => {
    if (!authState.user) return

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authState.user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error refreshing profile:', error)
        setAuthState(prev => ({ ...prev, error: error.message }))
        return
      }

      setAuthState(prev => ({ ...prev, profile: profile || null }))
    } catch (error) {
      console.error('Error refreshing profile:', error)
      setAuthState(prev => ({ ...prev, error: 'Failed to refresh profile' }))
    }
  }

  return {
    ...authState,
    signOut,
    refreshProfile,
    isAuthenticated: !!authState.user
  }
}
