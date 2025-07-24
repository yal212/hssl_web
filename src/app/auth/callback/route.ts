import { createClient } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const error_param = searchParams.get('error')
  const error_description = searchParams.get('error_description')

  console.log('=== AUTH CALLBACK START ===')
  console.log('Full URL:', request.url)
  console.log('All URL parameters:', Object.fromEntries(searchParams.entries()))
  console.log('Auth callback params:', {
    code: !!code,
    token_hash: !!token_hash,
    type,
    error_param,
    error_description,
    origin
  })
  console.log('Request method:', request.method)
  console.log('User-Agent:', request.headers.get('user-agent'))
  console.log('Referer:', request.headers.get('referer'))

  // Check if this is coming from Google
  const referer = request.headers.get('referer')
  if (referer && referer.includes('google')) {
    console.log('🔍 Request is coming from Google!')
  } else {
    console.log('⚠️ Request is NOT coming from Google. Referer:', referer)
  }

  // Handle OAuth errors from provider (Google, etc.)
  if (error_param) {
    console.error('OAuth provider error:', { error_param, error_description })
    return NextResponse.redirect(`${origin}/auth/auth-code-error?error=oauth_provider_error&message=${encodeURIComponent(error_description || error_param)}`)
  }

  const supabase = await createClient()

  // Handle OAuth flow (Google, etc.)
  if (code && !token_hash) {
    console.log('Processing OAuth flow with code')
    console.log('Full search params:', Object.fromEntries(searchParams.entries()))

    try {
      // For OAuth flows, we need to exchange the code for a session
      // The code verifier should be handled automatically by Supabase
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      console.log('OAuth exchangeCodeForSession result:', {
        error: error?.message,
        hasSession: !!data?.session,
        hasUser: !!data?.user,
        userEmail: data?.user?.email,
        userId: data?.user?.id
      })

      if (!error && data?.session && data?.user) {
        console.log('OAuth login successful, redirecting to login-success')
        return redirectToDestination(origin, '/login-success', request)
      } else if (error) {
        console.error('OAuth exchangeCodeForSession error:', error)

        // Check if this is a PKCE-related error
        if (error.message.includes('code verifier') || error.message.includes('PKCE')) {
          console.log('PKCE error detected, this might be a configuration issue')
          return NextResponse.redirect(`${origin}/auth/auth-code-error?error=oauth_error&message=${encodeURIComponent('OAuth configuration error: ' + error.message)}`)
        }

        return NextResponse.redirect(`${origin}/auth/auth-code-error?error=oauth_error&message=${encodeURIComponent(error.message)}`)
      } else {
        console.error('OAuth success but no session/user data')
        return NextResponse.redirect(`${origin}/auth/auth-code-error?error=oauth_error&message=${encodeURIComponent('No session or user data received')}`)
      }
    } catch (err) {
      console.error('OAuth exchangeCodeForSession exception:', err)
      const errorMessage = err instanceof Error ? err.message : String(err)
      return NextResponse.redirect(`${origin}/auth/auth-code-error?error=oauth_error&message=${encodeURIComponent('Exception during OAuth processing: ' + errorMessage)}`)
    }
  }

  // Handle email confirmation flow
  if (token_hash && type) {
    console.log('Processing email confirmation flow')

    // Determine the appropriate redirect based on the type of auth
    let defaultNext = '/login-success'
    if (type === 'signup' || type === 'email_change') {
      defaultNext = '/email-confirmed'
    }

    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? defaultNext
    // Email confirmation flow
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'signup' | 'email_change' | 'recovery' | 'invite'
    })
    console.log('Email confirmation verifyOtp result:', { error: error?.message })

    if (!error) {
      return redirectToDestination(origin, next, request)
    }

    // Handle specific email confirmation errors
    if (error) {
      console.log('Email confirmation error details:', error)

      // Check if this is an "already confirmed" or "expired token" error
      const errorMessage = error.message?.toLowerCase() || ''
      const isAlreadyConfirmed = errorMessage.includes('already') ||
                                errorMessage.includes('expired') ||
                                errorMessage.includes('invalid') ||
                                errorMessage.includes('used')

      if (isAlreadyConfirmed) {
        console.log('Token appears to be already used/expired, checking current auth state...')

        // Check if user is authenticated (email might already be confirmed)
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          console.log('User is authenticated, email was already confirmed')
          return redirectToDestination(origin, '/login-success', request)
        }

        // If not authenticated, redirect to already-confirmed page
        console.log('User not authenticated, redirecting to already-confirmed page')
        return NextResponse.redirect(`${origin}/already-confirmed`)
      }
    }
  }

  // If we get here, there was an error - but let's try to be more permissive for email confirmations
  console.log('Auth callback failed, but checking if user is now authenticated...')

  // Check if the user is actually authenticated despite the "error"
  const { data: { session } } = await supabase.auth.getSession()
  console.log('Final session check:', { hasSession: !!session, hasUser: !!session?.user })

  if (session?.user) {
    console.log('User is actually authenticated, redirecting to success')
    return redirectToDestination(origin, '/login-success', request)
  }

  console.log('=== AUTH CALLBACK FAILED ===')
  console.log('No valid authentication found, redirecting to error page')
  return NextResponse.redirect(`${origin}/auth/auth-code-error?error=unknown&message=${encodeURIComponent('Authentication failed - no valid session found')}`)
}

function redirectToDestination(origin: string, next: string, request: NextRequest) {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const isLocalEnv = process.env.NODE_ENV === 'development'

  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`)
  } else if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`)
  } else {
    return NextResponse.redirect(`${origin}${next}`)
  }
}
