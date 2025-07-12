import { createClient } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')

  // Determine the appropriate redirect based on the type of auth
  let defaultNext = '/login-success'
  if (type === 'signup' || type === 'email_change') {
    defaultNext = '/email-confirmed'
  }

  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? defaultNext

  console.log('Auth callback params:', { code: !!code, token_hash: !!token_hash, type, next })

  const supabase = await createClient()

  // Handle different types of auth callbacks
  if (code) {
    // OAuth flow (Google, etc.)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    console.log('OAuth exchangeCodeForSession result:', { error: error?.message })

    if (!error) {
      return redirectToDestination(origin, next, request)
    }
  } else if (token_hash && type) {
    // Email confirmation flow
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as any
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
  if (session?.user) {
    console.log('User is actually authenticated, redirecting to success')
    return redirectToDestination(origin, '/email-confirmed', request)
  }

  console.log('User is not authenticated, redirecting to error page')
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
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
