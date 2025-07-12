// Test storage setup and RLS policies
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
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
  console.log('Could not read .env.local file, using environment variables')
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testStorageSetup() {
  console.log('🧪 Testing Storage Setup and RLS Policies...\n')

  try {
    // Test 1: Check if buckets exist
    console.log('1. Checking storage buckets...')
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.error('❌ Error listing buckets:', bucketsError.message)
      return
    }

    const avatarsBucket = buckets.find(b => b.name === 'avatars')
    const newsBucket = buckets.find(b => b.name === 'news-images')
    
    console.log(`${avatarsBucket ? '✅' : '❌'} Avatars bucket: ${avatarsBucket ? 'exists' : 'missing'}`)
    console.log(`${newsBucket ? '✅' : '❌'} News images bucket: ${newsBucket ? 'exists' : 'missing'}`)
    
    if (avatarsBucket) {
      console.log(`   - Public: ${avatarsBucket.public}`)
      console.log(`   - Size limit: ${avatarsBucket.file_size_limit} bytes`)
    }
    
    if (newsBucket) {
      console.log(`   - Public: ${newsBucket.public}`)
      console.log(`   - Size limit: ${newsBucket.file_size_limit} bytes`)
    }

    // Test 2: Check authentication status
    console.log('\n2. Checking authentication...')
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      console.error('❌ Session error:', sessionError.message)
    } else if (!session) {
      console.log('⚠️  No active session (not logged in)')
      console.log('   Note: You need to be logged in to test upload permissions')
    } else {
      console.log('✅ User authenticated')
      console.log(`   User ID: ${session.user.id}`)
      console.log(`   Email: ${session.user.email}`)
    }

    // Test 3: Test bucket access (read permissions)
    console.log('\n3. Testing bucket read access...')
    
    if (avatarsBucket) {
      const { data: avatarFiles, error: avatarError } = await supabase.storage
        .from('avatars')
        .list('', { limit: 1 })
      
      if (avatarError) {
        console.log(`❌ Avatars bucket read error: ${avatarError.message}`)
      } else {
        console.log('✅ Avatars bucket readable')
      }
    }
    
    if (newsBucket) {
      const { data: newsFiles, error: newsError } = await supabase.storage
        .from('news-images')
        .list('', { limit: 1 })
      
      if (newsError) {
        console.log(`❌ News images bucket read error: ${newsError.message}`)
      } else {
        console.log('✅ News images bucket readable')
      }
    }

    // Test 4: Test upload permissions (if authenticated)
    if (session && avatarsBucket) {
      console.log('\n4. Testing upload permissions...')
      
      // Create a small test file
      const testContent = 'test file content'
      const testFile = new File([testContent], 'test.txt', { type: 'text/plain' })
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(`test/${Date.now()}-test.txt`, testFile)
      
      if (uploadError) {
        console.log(`❌ Upload test failed: ${uploadError.message}`)
        if (uploadError.message.includes('row-level security policy')) {
          console.log('   🔧 This indicates RLS policies need to be configured')
          console.log('   📋 Please run the SQL script from STORAGE_RLS_FIX_GUIDE.md')
        }
      } else {
        console.log('✅ Upload test successful')
        
        // Clean up test file
        const { error: deleteError } = await supabase.storage
          .from('avatars')
          .remove([uploadData.path])
        
        if (!deleteError) {
          console.log('✅ Test file cleaned up')
        }
      }
    }

    console.log('\n📋 Summary:')
    if (!avatarsBucket || !newsBucket) {
      console.log('❌ Storage buckets missing - run the SQL script to create them')
    } else if (!session) {
      console.log('⚠️  Cannot test upload permissions without authentication')
      console.log('   Log in to your app and try uploading an image')
    } else {
      console.log('✅ Storage setup appears to be working')
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error)
  }
}

// Run the test
testStorageSetup()
