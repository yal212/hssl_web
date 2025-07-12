// Debug script to check Supabase connection and database schema
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables manually
let supabaseUrl, supabaseKey

try {
  const envPath = path.join(__dirname, '.env.local')
  const envContent = fs.readFileSync(envPath, 'utf8')
  const envLines = envContent.split('\n')
  
  for (const line of envLines) {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
      supabaseUrl = line.split('=')[1]
    }
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
      supabaseKey = line.split('=')[1]
    }
  }
} catch (error) {
  console.log('Could not read .env.local file')
  process.exit(1)
}

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  console.log('supabaseUrl:', supabaseUrl ? 'Found' : 'Missing')
  console.log('supabaseKey:', supabaseKey ? 'Found' : 'Missing')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugSupabase() {
  console.log('🔍 Debugging Supabase Connection and Schema...\n')

  try {
    // Test 1: Basic connection
    console.log('1. Testing basic Supabase connection...')
    const { data: connectionTest, error: connectionError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)

    if (connectionError) {
      console.error('❌ Connection failed:', connectionError)
      return
    } else {
      console.log('✅ Supabase connection successful')
    }

    // Test 2: Check if posts table exists
    console.log('\n2. Checking posts table...')
    const { data: postsTest, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .limit(1)

    if (postsError) {
      console.error('❌ Posts table error:', postsError)
      if (postsError.code === '42P01') {
        console.log('   The posts table does not exist. You need to run the database schema.')
      }
    } else {
      console.log('✅ Posts table exists')
      console.log('   Sample data:', postsTest)
    }

    // Test 3: Check posts table schema
    console.log('\n3. Checking posts table columns...')
    const { data: schemaData, error: schemaError } = await supabase
      .rpc('get_table_columns', { table_name: 'posts' })
      .single()

    if (schemaError) {
      console.log('   Cannot check schema via RPC, trying direct query...')
      
      // Try to select specific columns to see which exist
      const testColumns = ['id', 'title', 'content', 'excerpt', 'category', 'tags', 'featured', 'published', 'image_url', 'published_at', 'created_at', 'updated_at']
      const existingColumns = []
      
      for (const column of testColumns) {
        try {
          const { error } = await supabase
            .from('posts')
            .select(column)
            .limit(1)
          
          if (!error) {
            existingColumns.push(column)
          }
        } catch (e) {
          // Column doesn't exist
        }
      }
      
      console.log('   Existing columns:', existingColumns.join(', '))
      
      const missingColumns = testColumns.filter(col => !existingColumns.includes(col))
      if (missingColumns.length > 0) {
        console.log('   Missing columns:', missingColumns.join(', '))
        console.log('   ⚠️  You need to run the database migration!')
      }
    }

    // Test 4: Check authentication
    console.log('\n4. Testing authentication...')
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      console.log('   No authenticated user (this is normal for anonymous access)')
    } else if (user) {
      console.log('✅ User authenticated:', user.email)
    } else {
      console.log('   No user session (anonymous access)')
    }

    // Test 5: Test RLS policies
    console.log('\n5. Testing Row Level Security...')
    const { data: rlsTest, error: rlsError } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .limit(1)

    if (rlsError) {
      console.error('❌ RLS test failed:', rlsError)
      if (rlsError.code === '42703') {
        console.log('   This confirms the posts table needs to be migrated')
      }
    } else {
      console.log('✅ RLS policies working')
      console.log('   Published posts accessible:', rlsTest.length)
    }

    // Test 6: Check if we can create a test post (if authenticated)
    console.log('\n6. Testing write permissions...')
    const { data: writeTest, error: writeError } = await supabase
      .from('posts')
      .insert({
        title: 'Test Post',
        content: 'This is a test post',
        published: false
      })
      .select()

    if (writeError) {
      console.log('   Cannot write (expected for anonymous users):', writeError.message)
    } else {
      console.log('✅ Write test successful')
      // Clean up test post
      if (writeTest && writeTest[0]) {
        await supabase.from('posts').delete().eq('id', writeTest[0].id)
        console.log('   Test post cleaned up')
      }
    }

  } catch (error) {
    console.error('❌ Debug failed with error:', error)
  }
}

// Run the debug
debugSupabase()
