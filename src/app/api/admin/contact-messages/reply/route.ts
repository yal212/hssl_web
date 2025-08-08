import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { rateLimiters, getClientIP } from '@/lib/rate-limit'
import { sendCustomReply } from '@/lib/email'

// Verify admin function (reused from contact-messages route)
async function verifyAdmin(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { error: 'Missing or invalid authorization header', status: 401 }
    }

    const token = authHeader.substring(7)
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)

    if (userError || !user) {
      return { error: 'Invalid token', status: 401 }
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role, full_name')
      .eq('id', user.id)
      .single()

    if (profileError || !profile || profile.role !== 'admin') {
      return { error: 'Admin access required', status: 403 }
    }

    return { user, profile }
  } catch (error) {
    console.error('Admin verification error:', error)
    return { error: 'Authentication failed', status: 500 }
  }
}

// POST - Send custom reply email
export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = rateLimiters.admin(clientIP)

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

    const adminCheck = await verifyAdmin(request)
    if ('error' in adminCheck) {
      return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status })
    }

    const body = await request.json()
    const { messageId, replyContent } = body

    if (!messageId || !replyContent) {
      return NextResponse.json({ error: 'Message ID and reply content are required' }, { status: 400 })
    }

    // Get the original contact message
    const { data: contactMessage, error: fetchError } = await supabaseAdmin
      .from('contact_messages')
      .select('*')
      .eq('id', messageId)
      .single()

    if (fetchError || !contactMessage) {
      return NextResponse.json({ error: 'Contact message not found' }, { status: 404 })
    }

    // Send the custom reply email
    const emailResult = await sendCustomReply(
      contactMessage,
      replyContent,
      adminCheck.profile.full_name || 'HSSL 團隊'
    )

    if (!emailResult.success) {
      return NextResponse.json({ error: 'Failed to send reply email' }, { status: 500 })
    }

    // Update the message status to 'replied' and add admin notes
    const { data: updatedMessage, error: updateError } = await supabaseAdmin
      .from('contact_messages')
      .update({
        status: 'replied',
        admin_notes: replyContent
      })
      .eq('id', messageId)
      .select()
      .single()

    if (updateError) {
      console.error('Failed to update message status:', updateError)
      // Email was sent successfully, but status update failed
      return NextResponse.json({
        success: true,
        message: 'Reply sent successfully, but failed to update message status',
        emailId: emailResult.messageId
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Reply sent successfully',
      emailId: emailResult.messageId,
      updatedMessage
    })

  } catch (error) {
    console.error('POST /api/admin/contact-messages/reply error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
