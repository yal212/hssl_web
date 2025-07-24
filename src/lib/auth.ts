import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // First try to get session, then user
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  let user = session?.user || null

  // Handle session errors more carefully
  if (sessionError) {
    console.log('Session error detected:', sessionError.message)

    // Only clear session for specific critical errors
    if (sessionError.message?.includes('refresh_token_not_found') ||
        sessionError.message?.includes('invalid_refresh_token') ||
        sessionError.message?.includes('refresh token is invalid')) {
      console.log('Critical session error, clearing session')
      supabaseResponse.cookies.delete('sb-access-token')
      supabaseResponse.cookies.delete('sb-refresh-token')
      user = null
    } else {
      // For other session errors, try to get user anyway
      console.log('Non-critical session error, attempting to get user')
      const { data: { user: fetchedUser } } = await supabase.auth.getUser()
      user = fetchedUser
    }
  } else if (session && !user) {
    // If we have a session but no user, try getUser
    const { data: { user: fetchedUser } } = await supabase.auth.getUser()
    user = fetchedUser
  }

  // Minimal logging for debugging (development only)
  if (process.env.NODE_ENV === 'development') {
    console.log('Auth middleware check:', {
      hasSession: !!session,
      hasUser: !!user,
      path: request.nextUrl.pathname,
      sessionError: sessionError ? 'Session error occurred' : null
    })
  }

  // Skip middleware for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return supabaseResponse
  }

  // Protect dashboard routes (profile route protection handled client-side)
  if (
    !user &&
    request.nextUrl.pathname.startsWith('/dashboard')
  ) {
    // no user, redirect to login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Protect admin routes - require authentication and admin role
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Admin route access attempt:', {
        path: request.nextUrl.pathname,
        hasUser: !!user,
        userId: user?.id,
        sessionError: sessionError ? sessionError.message : null
      })
    }

    if (!user) {
      console.log('No user found for admin route, redirecting to login')
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('next', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    // Admin routes are further protected by AdminGuard component
    // which checks for admin role in the database
    return supabaseResponse
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}

/**
 * Check if the current user has admin role
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return false
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (error || !profile) {
      return false
    }

    return profile.role === 'admin'
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

/**
 * Get current user profile with role information
 */
export async function getCurrentUserProfile() {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return null
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }

    return { user, profile }
  } catch (error) {
    console.error('Error getting current user profile:', error)
    return null
  }
}
