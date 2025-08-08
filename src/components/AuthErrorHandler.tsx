'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function AuthErrorHandler() {
  useEffect(() => {
    // Handle unhandled promise rejections for auth errors
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason
      
      // Check if it's a Supabase auth error
      if (error?.name === 'AuthApiError' || 
          error?.message?.includes('Invalid Refresh Token') ||
          error?.message?.includes('refresh_token_not_found') ||
          error?.message?.includes('refresh token')) {
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Caught unhandled auth error, clearing session:', error.message)
        }
        
        // Prevent the error from being logged to console
        event.preventDefault()
        
        // Clear the session silently
        supabase.auth.signOut().catch(() => {
          // Ignore errors during signout
        })
      }
    }

    // Handle global errors
    const handleError = (event: ErrorEvent) => {
      const error = event.error
      
      if (error?.name === 'AuthApiError' || 
          error?.message?.includes('Invalid Refresh Token') ||
          error?.message?.includes('refresh_token_not_found') ||
          error?.message?.includes('refresh token')) {
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Caught global auth error, clearing session:', error.message)
        }
        
        // Prevent the error from being logged to console
        event.preventDefault()
        
        // Clear the session silently
        supabase.auth.signOut().catch(() => {
          // Ignore errors during signout
        })
      }
    }

    // Add event listeners
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    window.addEventListener('error', handleError)

    // Cleanup
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('error', handleError)
    }
  }, [])

  return null // This component doesn't render anything
}
