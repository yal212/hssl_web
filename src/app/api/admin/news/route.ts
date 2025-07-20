import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { supabase } from '@/lib/supabase'
import { rateLimiters, getClientIP } from '@/lib/rate-limit'
import { sanitizeNewsContent } from '@/lib/sanitization'

// Helper function to verify admin access
async function verifyAdmin(request: NextRequest) {
  try {
    // Get auth header
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      console.log('Admin verification failed: No authorization header')
      return { error: 'No authorization header', status: 401 }
    }

    // Create client with user's token
    const token = authHeader.replace('Bearer ', '')

    // Verify the token with Supabase
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)

    if (userError || !user) {
      console.log('Admin verification failed: Invalid token or user not found', { userError, hasUser: !!user })
      return { error: 'Invalid token', status: 401 }
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.log('Admin verification failed: Profile error', { profileError, userId: user.id })
      return { error: 'Profile not found', status: 403 }
    }

    if (!profile) {
      console.log('Admin verification failed: No profile found', { userId: user.id })
      return { error: 'Profile not found', status: 403 }
    }

    if (profile.role !== 'admin') {
      console.log('Admin verification failed: User is not admin', { userId: user.id, role: profile.role })
      return { error: 'Admin access required', status: 403 }
    }

    console.log('Admin verification successful', { userId: user.id, email: user.email })
    return { user, profile }
  } catch (error) {
    console.error('Admin verification error:', error)
    return { error: 'Verification failed', status: 500 }
  }
}

// POST - Create news
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
    const { user } = adminCheck

    // Sanitize input data
    const sanitizedContent = sanitizeNewsContent(body)

    const newsData = {
      ...sanitizedContent,
      author_id: user.id,
      published: body.published || false,
      featured: body.featured || false,
      published_at: body.published ? new Date().toISOString() : null,
      // Ensure content_images and content_videos are included
      content_images: sanitizedContent.content_images || [],
      content_videos: sanitizedContent.content_videos || []
    }

    const { data, error } = await supabaseAdmin
      .from('posts')
      .insert(newsData)
      .select(`
        *,
        author:profiles!posts_author_id_fkey(
          id,
          full_name,
          avatar_url
        )
      `)
      .single()

    if (error) {
      console.error('Create error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('POST /api/admin/news error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update news
export async function PUT(request: NextRequest) {
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
    const { id, ...rawUpdateData } = body

    // Sanitize input data
    const sanitizedContent = sanitizeNewsContent(rawUpdateData)
    const updateData = {
      ...sanitizedContent,
      published: rawUpdateData.published,
      featured: rawUpdateData.featured,
      published_at: rawUpdateData.published_at,
      // Ensure content_images and content_videos are included
      content_images: sanitizedContent.content_images || [],
      content_videos: sanitizedContent.content_videos || []
    }



    // If publishing for the first time, set published_at
    if (updateData.published && !updateData.published_at) {
      updateData.published_at = new Date().toISOString()
    }

    const { data, error } = await supabaseAdmin
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        author:profiles!posts_author_id_fkey(
          id,
          full_name,
          avatar_url
        )
      `)
      .single()

    if (error) {
      console.error('Update error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('PUT /api/admin/news error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete news
export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'News ID required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/admin/news error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
