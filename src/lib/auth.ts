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

  // If we have a session but no user, try getUser
  if (session && !user) {
    const { data: { user: fetchedUser } } = await supabase.auth.getUser()
    user = fetchedUser
  }

  // Debug logging
  console.log('Auth middleware check:', {
    hasSession: !!session,
    hasUser: !!user,
    userEmail: user?.email,
    sessionError: sessionError?.message,
    cookieCount: request.cookies.getAll().length
  })

  // Debug logging for protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/profile') || request.nextUrl.pathname.startsWith('/admin')) {
    console.log('Middleware auth check:', {
      path: request.nextUrl.pathname,
      user: user ? { id: user.id, email: user.email } : null,
      cookies: request.cookies.getAll().map(c => ({ name: c.name, hasValue: !!c.value }))
    })
  }

  // Skip middleware for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return supabaseResponse
  }

  // Protect dashboard and profile routes
  if (
    !user &&
    (request.nextUrl.pathname.startsWith('/dashboard'))
    // Temporarily disable profile protection to test client-side auth
    // || request.nextUrl.pathname.startsWith('/profile'))
  ) {
    // no user, redirect to login page
    console.log('Redirecting to login - no user found in middleware')
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // TEMPORARY: Disable admin route protection for debugging
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('Admin route accessed:', request.nextUrl.pathname, 'User:', user ? user.email : 'none')
    console.log('TEMPORARILY ALLOWING ALL ADMIN ACCESS - REMOVE IN PRODUCTION')
    // Let AdminGuard component handle the protection
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
