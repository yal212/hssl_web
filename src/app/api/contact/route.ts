import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { rateLimiters, getClientIP } from '@/lib/rate-limit'
import { sanitizeText, sanitizeEmail } from '@/lib/sanitization'
import { sendAdminNotification, sendAutoReply } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimiters.api(clientIP)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          }
        }
      )
    }

    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // Sanitize input data
    const sanitizedData = {
      name: sanitizeText(name).substring(0, 100),
      email: sanitizeEmail(email),
      subject: sanitizeText(subject).substring(0, 200),
      message: sanitizeText(message).substring(0, 2000),
      created_at: new Date().toISOString(),
      ip_address: clientIP
    }

    // Validate email format
    if (!sanitizedData.email) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Validate sanitized data
    if (!sanitizedData.name || !sanitizedData.subject || !sanitizedData.message) {
      return NextResponse.json(
        { error: 'Invalid input data. Please check your submission.' },
        { status: 400 }
      )
    }

    // Store the contact message in the database
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .insert(sanitizedData)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to submit your message. Please try again.' },
        { status: 500 }
      )
    }

    // Send email notifications (don't block the response if emails fail)
    Promise.all([
      sendAdminNotification(data),
      sendAutoReply(data)
    ]).then(([adminResult, autoReplyResult]) => {
      if (!adminResult.success) {
        console.error('Admin notification failed:', adminResult.error)
      }
      if (!autoReplyResult.success) {
        console.error('Auto-reply failed:', autoReplyResult.error)
      }
    }).catch(error => {
      console.error('Email notification error:', error)
    })

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!',
      id: data.id
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}
