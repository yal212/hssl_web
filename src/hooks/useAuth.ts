'use client'

import { useState, useEffect, useCallback } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/supabase'
import { getSafeSession } from '@/lib/auth-utils'

type Profile = Database['public']['Tables']['profiles']['Row']

interface AuthState {
  user: User | null
  profile: Profile | null
  loading: boolean
  error: string | null
}

// Cache profile data to avoid repeated fetches
let profileCache: { [userId: string]: Profile | null } = {}

// Helper function to check if error is a refresh token error
const isRefreshTokenErrorLocal = (error: unknown): boolean => {
  if (!error) return false
  const message = (error as Error).message || String(error)
  return message.includes('refresh_token_not_found') ||
         message.includes('Invalid Refresh Token') ||
         message.includes('refresh token') ||
         message.includes('AuthApiError')
}

// Helper function to handle refresh token errors
const handleRefreshTokenError = async () => {
  console.log('Handling refresh token error - clearing session')
  try {
    await supabase.auth.signOut()
    profileCache = {} // Clear cache
  } catch (error) {
    console.error('Error during signOut:', error)
  }
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null
  })

  // Optimized profile fetching with caching
  const fetchProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    // Check cache first
    if (profileCache[userId]) {
      return profileCache[userId]
    }

    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError)
        return null
      }

      // Cache the result
      profileCache[userId] = profile || null
      return profile || null
    } catch (error) {
      console.error('Error in fetchProfile:', error)
      return null
    }
  }, [])

  // Clear profile cache when user changes
  const clearProfileCache = useCallback(() => {
    profileCache = {}
  }, [])

  useEffect(() => {
    let isMounted = true

    // Get initial user and profile
    const getInitialAuth = async () => {
      try {
        // Use safe session getter with error handling
        const { session, error: sessionError } = await getSafeSession()

        if (!isMounted) return

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

        if (!session?.user) {
          setAuthState({
            user: null,
            profile: null,
            loading: false,
            error: null
          })
          return
        }

        const user = session.user

        // Fetch profile in parallel, don't block on it
        const profile = await fetchProfile(user.id)

        if (!isMounted) return

        setAuthState({
          user,
          profile,
          loading: false,
          error: null
        })
      } catch (error: unknown) {
        console.error('Error in getInitialAuth:', error)

        // Handle refresh token errors
        if (isRefreshTokenErrorLocal(error)) {
          await handleRefreshTokenError()
        }

        if (isMounted) {
          setAuthState({
            user: null,
            profile: null,
            loading: false,
            error: null // Don't show token errors to user
          })
        }
      }
    }

    getInitialAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return

        console.log('Auth state change:', event, !!session)

        if (event === 'SIGNED_OUT') {
          clearProfileCache()
          setAuthState({
            user: null,
            profile: null,
            loading: false,
            error: null
          })
          return
        }

        if (event === 'TOKEN_REFRESHED' && session?.user) {
          // Update user state with refreshed session
          setAuthState(prev => ({
            ...prev,
            user: session.user,
            loading: false,
            error: null
          }))

          // Refresh profile if needed
          try {
            const profile = await fetchProfile(session.user.id)
            if (isMounted) {
              setAuthState(prev => ({
                ...prev,
                profile
              }))
            }
          } catch (error) {
            console.error('Error fetching profile after token refresh:', error)
          }
          return
        }

        if (event === 'SIGNED_IN' && session?.user) {
          // Set user immediately, fetch profile async
          setAuthState(prev => ({
            ...prev,
            user: session.user,
            loading: false,
            error: null
          }))

          // Fetch profile in background
          try {
            const profile = await fetchProfile(session.user.id)

            if (isMounted) {
              setAuthState(prev => ({
                ...prev,
                profile
              }))
            }
          } catch (error) {
            console.error('Error fetching profile after sign in:', error)
          }
        } else if (!session) {
          setAuthState({
            user: null,
            profile: null,
            loading: false,
            error: null
          })
        }
      }
    )

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [fetchProfile, clearProfileCache])

  const signOut = useCallback(async () => {
    try {
      clearProfileCache()
      await supabase.auth.signOut()
      return { error: null }
    } catch {
      const errorMessage = 'Failed to sign out'
      setAuthState(prev => ({ ...prev, error: errorMessage }))
      return { error: { message: errorMessage } }
    }
  }, [clearProfileCache])

  const refreshProfile = useCallback(async () => {
    if (!authState.user) return

    try {
      // Clear cache for this user and fetch fresh data
      delete profileCache[authState.user.id]
      const profile = await fetchProfile(authState.user.id)

      setAuthState(prev => ({ ...prev, profile }))
    } catch (error) {
      console.error('Error refreshing profile:', error)
      setAuthState(prev => ({ ...prev, error: 'Failed to refresh profile' }))
    }
  }, [authState.user, fetchProfile])

  return {
    ...authState,
    signOut,
    refreshProfile,
    isAuthenticated: !!authState.user
  }
}
