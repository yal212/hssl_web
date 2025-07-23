import { supabase } from './supabase'

/**
 * Safely get the current session with error handling for refresh token issues
 */
export async function getSafeSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Session error:', error)
      
      // Handle refresh token errors
      if (isRefreshTokenError(error)) {
        console.log('Refresh token invalid, clearing session')
        await supabase.auth.signOut()
        return { session: null, error: null }
      }
      
      return { session: null, error }
    }
    
    return { session, error: null }
  } catch (error: unknown) {
    console.error('Error getting session:', error)

    // Handle refresh token errors
    if (isRefreshTokenError(error)) {
      console.log('Refresh token error in catch, clearing session')
      await supabase.auth.signOut()
      return { session: null, error: null }
    }

    return { session: null, error: error as Error }
  }
}

/**
 * Check if an error is related to refresh tokens
 */
export function isRefreshTokenError(error: unknown): boolean {
  if (!error) return false

  const errorObj = error as Error
  const message = errorObj.message || String(error)
  const name = errorObj.name || ''

  return name === 'AuthApiError' ||
         message.includes('refresh_token_not_found') ||
         message.includes('Invalid Refresh Token') ||
         message.includes('refresh token') ||
         message.includes('AuthApiError')
}

/**
 * Safely refresh the session with error handling
 */
export async function safeRefreshSession() {
  try {
    const { data, error } = await supabase.auth.refreshSession()
    
    if (error) {
      console.error('Refresh session error:', error)
      
      if (isRefreshTokenError(error)) {
        console.log('Refresh token invalid during refresh, clearing session')
        await supabase.auth.signOut()
        return { session: null, error: null }
      }
      
      return { session: null, error }
    }
    
    return { session: data.session, error: null }
  } catch (error: unknown) {
    console.error('Error refreshing session:', error)

    if (isRefreshTokenError(error)) {
      console.log('Refresh token error during refresh, clearing session')
      await supabase.auth.signOut()
      return { session: null, error: null }
    }

    return { session: null, error: error as Error }
  }
}

/**
 * Clear invalid session and cache
 */
export async function clearInvalidSession() {
  try {
    await supabase.auth.signOut()
    
    // Clear any cached data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('supabase.auth.token')
      sessionStorage.clear()
    }
  } catch (error) {
    console.error('Error clearing session:', error)
  }
}
