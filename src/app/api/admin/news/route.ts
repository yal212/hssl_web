import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { supabase } from '@/lib/supabase'

// Helper function to verify admin access
async function verifyAdmin(request: NextRequest) {
  try {
    // Get auth header
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return { error: 'No authorization header', status: 401 }
    }

    // Create client with user's token
    const token = authHeader.replace('Bearer ', '')
    const userSupabase = supabase
    
    // Set the session
    const { data: { user }, error: userError } = await userSupabase.auth.getUser(token)
    
    if (userError || !user) {
      return { error: 'Invalid token', status: 401 }
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile || profile.role !== 'admin') {
      return { error: 'Admin access required', status: 403 }
    }

    return { user, profile }
  } catch (error) {
    console.error('Admin verification error:', error)
    return { error: 'Verification failed', status: 500 }
  }
}

// POST - Create news
export async function POST(request: NextRequest) {
  try {
    const adminCheck = await verifyAdmin(request)
    if ('error' in adminCheck) {
      return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status })
    }

    const body = await request.json()
    const { user } = adminCheck

    const newsData = {
      ...body,
      author_id: user.id,
      published_at: body.published ? new Date().toISOString() : null
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
    const adminCheck = await verifyAdmin(request)
    if ('error' in adminCheck) {
      return NextResponse.json({ error: adminCheck.error }, { status: adminCheck.status })
    }

    const body = await request.json()
    const { id, ...updateData } = body

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
