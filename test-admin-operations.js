/**
 * Test admin operations to debug the hanging issue
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testOperations() {
  console.log('🧪 Testing Admin Operations\n')

  try {
    // Test 1: Check current RLS policies
    console.log('1️⃣ Testing current RLS policies...')
    
    // Try to read posts without auth (should work for published posts)
    const { data: publicPosts, error: publicError } = await supabase
      .from('posts')
      .select('id, title, published')
      .eq('published', true)
      .limit(1)

    if (publicError) {
      console.error('❌ Public read failed:', publicError.message)
    } else {
      console.log('✅ Public read works:', publicPosts?.length || 0, 'posts')
    }

    // Test 2: Try to update without auth (should fail)
    console.log('\n2️⃣ Testing update without auth (should fail)...')
    
    if (publicPosts && publicPosts.length > 0) {
      const testPost = publicPosts[0]
      const { data: updateData, error: updateError } = await supabase
        .from('posts')
        .update({ title: 'Test Update' })
        .eq('id', testPost.id)
        .select()

      if (updateError) {
        console.log('✅ Update correctly blocked:', updateError.message)
      } else {
        console.log('⚠️ Update unexpectedly succeeded - RLS may be disabled')
      }
    }

    // Test 3: Check if we can bypass RLS with service role key
    console.log('\n3️⃣ Checking if service role key is available...')
    
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (serviceKey) {
      console.log('✅ Service role key found - can use for admin operations')
      
      const adminSupabase = createClient(supabaseUrl, serviceKey)
      
      // Test admin operation
      const { data: adminTest, error: adminError } = await adminSupabase
        .from('posts')
        .select('count')
        .limit(1)
        
      if (adminError) {
        console.log('❌ Service role test failed:', adminError.message)
      } else {
        console.log('✅ Service role works')
      }
    } else {
      console.log('⚠️ No service role key found')
      console.log('💡 Add SUPABASE_SERVICE_ROLE_KEY to .env.local for admin operations')
    }

    // Test 4: Check current policies
    console.log('\n4️⃣ Checking current policies...')
    
    const { data: policies, error: policyError } = await supabase
      .rpc('get_policies_for_table', { table_name: 'posts' })
      .select()

    if (policyError) {
      console.log('⚠️ Could not fetch policies:', policyError.message)
    } else {
      console.log('📋 Current policies:', policies?.length || 0)
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

// Run the test
testOperations()
  .then(() => {
    console.log('\n📋 Recommendations:')
    console.log('1. Run admin-news-policies.sql in Supabase SQL Editor')
    console.log('2. Add SUPABASE_SERVICE_ROLE_KEY to .env.local')
    console.log('3. Use service role for admin operations')
    process.exit(0)
  })
  .catch(error => {
    console.error('❌ Test execution failed:', error)
    process.exit(1)
  })
