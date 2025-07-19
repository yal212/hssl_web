#!/usr/bin/env node

/**
 * Test script to verify that the storage RLS fix is working correctly
 * Run this with: node test-storage-fix.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
let supabaseUrl, supabaseAnonKey, supabaseServiceKey

try {
  const envPath = path.join(__dirname, '.env.local')
  const envContent = fs.readFileSync(envPath, 'utf8')
  const envLines = envContent.split('\n')
  
  for (const line of envLines) {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
      supabaseUrl = line.split('=')[1]
    }
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
      supabaseAnonKey = line.split('=')[1]
    }
    if (line.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) {
      supabaseServiceKey = line.split('=')[1]
    }
  }
} catch (error) {
  console.error('❌ Could not read .env.local file')
  process.exit(1)
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

// Create clients
const supabase = createClient(supabaseUrl, supabaseAnonKey)
const supabaseAdmin = supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
}) : null

async function testStorageFix() {
  console.log('🧪 Testing Storage RLS Fix\n')

  // Test 1: Check RLS status
  console.log('1. Checking RLS status...')
  try {
    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('pg_tables')
        .select('schemaname, tablename, rowsecurity')
        .eq('schemaname', 'storage')
        .eq('tablename', 'objects')

      if (error) {
        console.log('⚠️  Could not check RLS status:', error.message)
      } else if (data && data.length > 0) {
        const rlsEnabled = data[0].rowsecurity
        console.log(`   RLS enabled: ${rlsEnabled ? 'YES' : 'NO'}`)
      }
    }
  } catch (e) {
    console.log('⚠️  Could not check RLS status')
  }

  // Test 2: Check storage buckets
  console.log('\n2. Checking storage buckets...')
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets()
    
    if (error) {
      console.log('❌ Could not list buckets:', error.message)
    } else {
      const requiredBuckets = ['avatars', 'news-images', 'news-videos']
      const existingBuckets = buckets.map(b => b.id)
      
      for (const bucket of requiredBuckets) {
        if (existingBuckets.includes(bucket)) {
          console.log(`   ✅ ${bucket} bucket exists`)
        } else {
          console.log(`   ❌ ${bucket} bucket missing`)
        }
      }
    }
  } catch (e) {
    console.log('❌ Error checking buckets:', e.message)
  }

  // Test 3: Check storage policies
  console.log('\n3. Checking storage policies...')
  try {
    if (supabaseAdmin) {
      const { data: policies, error } = await supabaseAdmin
        .from('pg_policies')
        .select('policyname, cmd')
        .eq('tablename', 'objects')
        .eq('schemaname', 'storage')

      if (error) {
        console.log('⚠️  Could not fetch policies:', error.message)
      } else {
        console.log(`   Found ${policies.length} storage policies:`)
        policies.forEach(policy => {
          console.log(`   - ${policy.policyname} (${policy.cmd})`)
        })
      }
    }
  } catch (e) {
    console.log('⚠️  Could not check policies')
  }

  // Test 4: Test bucket access
  console.log('\n4. Testing bucket access...')
  
  const bucketsToTest = ['avatars', 'news-images', 'news-videos']
  
  for (const bucket of bucketsToTest) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list('', { limit: 1 })
      
      if (error) {
        console.log(`   ❌ ${bucket}: ${error.message}`)
      } else {
        console.log(`   ✅ ${bucket}: accessible`)
      }
    } catch (e) {
      console.log(`   ❌ ${bucket}: ${e.message}`)
    }
  }

  // Test 5: Test upload simulation (without actual file)
  console.log('\n5. Testing upload permissions...')
  
  // Create a small test file buffer
  const testFileContent = Buffer.from('test image content')
  const testFileName = `test-${Date.now()}.txt`
  
  try {
    // Test with admin client first
    if (supabaseAdmin) {
      const { error: adminError } = await supabaseAdmin.storage
        .from('news-images')
        .upload(`test/${testFileName}`, testFileContent, {
          contentType: 'text/plain'
        })

      if (adminError) {
        console.log('   ⚠️  Admin client upload failed:', adminError.message)
      } else {
        console.log('   ✅ Admin client upload successful')
        
        // Clean up test file
        await supabaseAdmin.storage
          .from('news-images')
          .remove([`test/${testFileName}`])
      }
    }

    // Test with regular client
    const { error: regularError } = await supabase.storage
      .from('news-images')
      .upload(`test/${testFileName}`, testFileContent, {
        contentType: 'text/plain'
      })

    if (regularError) {
      console.log('   ⚠️  Regular client upload failed:', regularError.message)
      if (regularError.message.includes('row-level security policy')) {
        console.log('   🔍 RLS policy error detected - this should be fixed by running the SQL script')
      }
    } else {
      console.log('   ✅ Regular client upload successful')
      
      // Clean up test file
      await supabase.storage
        .from('news-images')
        .remove([`test/${testFileName}`])
    }
  } catch (e) {
    console.log('   ❌ Upload test failed:', e.message)
  }

  console.log('\n📋 Summary:')
  console.log('   1. Run fix-storage-rls-complete.sql in your Supabase SQL Editor')
  console.log('   2. Restart your Next.js development server')
  console.log('   3. Test image uploads in the news form')
  console.log('   4. Check browser console for any remaining RLS errors')
}

// Run the test
testStorageFix().catch(console.error)
