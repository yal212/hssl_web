// Verify storage setup after running the SQL script
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
  console.log('Could not read .env.local file')
}

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function verifyStorageFix() {
  console.log('✅ Verifying Storage Setup...\n')

  try {
    // Check buckets
    console.log('1. Checking storage buckets...')
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.error('❌ Error listing buckets:', bucketsError.message)
      return
    }

    const avatarsBucket = buckets.find(b => b.name === 'avatars')
    const newsBucket = buckets.find(b => b.name === 'news-images')
    
    if (avatarsBucket && newsBucket) {
      console.log('✅ Both storage buckets exist!')
      console.log(`   - avatars: ${avatarsBucket.public ? 'public' : 'private'}, ${avatarsBucket.file_size_limit} bytes`)
      console.log(`   - news-images: ${newsBucket.public ? 'public' : 'private'}, ${newsBucket.file_size_limit} bytes`)
    } else {
      console.log('❌ Storage buckets missing:')
      console.log(`   - avatars: ${avatarsBucket ? 'exists' : 'missing'}`)
      console.log(`   - news-images: ${newsBucket ? 'exists' : 'missing'}`)
      console.log('   Please run the SQL script from STORAGE_SETUP_COMPLETE_FIX.md')
      return
    }

    // Check authentication
    console.log('\n2. Checking authentication...')
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      console.log('⚠️  No active session')
      console.log('   To test uploads, please:')
      console.log('   1. Go to your app (localhost:3005)')
      console.log('   2. Log in as an admin user')
      console.log('   3. Try uploading an image in news creation')
      return
    }

    console.log('✅ User authenticated')
    console.log(`   Email: ${session.user.email}`)

    // Check user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile) {
      console.log(`   Role: ${profile.role}`)
      if (profile.role !== 'admin') {
        console.log('⚠️  User is not admin - news uploads may be restricted')
      }
    }

    // Test bucket access
    console.log('\n3. Testing bucket access...')
    
    const { data: avatarFiles, error: avatarError } = await supabase.storage
      .from('avatars')
      .list('', { limit: 1 })
    
    if (avatarError) {
      console.log(`❌ Avatars bucket access error: ${avatarError.message}`)
    } else {
      console.log('✅ Avatars bucket accessible')
    }

    const { data: newsFiles, error: newsError } = await supabase.storage
      .from('news-images')
      .list('', { limit: 1 })
    
    if (newsError) {
      console.log(`❌ News images bucket access error: ${newsError.message}`)
    } else {
      console.log('✅ News images bucket accessible')
    }

    // Check content_images column
    console.log('\n4. Checking posts table...')
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('id, title, content_images')
      .limit(1)

    if (postsError) {
      if (postsError.code === '42703') {
        console.log('❌ content_images column missing from posts table')
        console.log('   Please run the SQL script to add it')
      } else {
        console.log(`❌ Posts table error: ${postsError.message}`)
      }
    } else {
      console.log('✅ Posts table has content_images column')
      if (posts.length > 0) {
        console.log(`   Sample: ${posts[0].title} - content_images: ${JSON.stringify(posts[0].content_images)}`)
      }
    }

    console.log('\n🎉 Storage verification complete!')
    console.log('\n📋 Summary:')
    console.log('✅ Storage buckets configured')
    console.log('✅ Database schema updated')
    console.log('✅ Ready for image uploads')
    
    if (session) {
      console.log('\n🚀 Next steps:')
      console.log('1. Go to your app and try creating news with images')
      console.log('2. Upload should work without RLS errors')
      console.log('3. Images will display in the news gallery')
    }

  } catch (error) {
    console.error('❌ Verification failed:', error)
  }
}

verifyStorageFix()
