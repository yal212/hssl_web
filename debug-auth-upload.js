/**
 * Debug script to test authentication and storage upload
 * Run this in browser console on your news page
 */

// Test current authentication state
async function debugAuthAndUpload() {
  console.log('🔍 Debugging Authentication and Storage Upload...\n')
  
  // Import Supabase client (adjust path if needed)
  const { createClient } = await import('@supabase/supabase-js')
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY'
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  try {
    // 1. Check current session
    console.log('1. Checking current session...')
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      console.error('❌ Session error:', sessionError)
      return
    }
    
    if (!session) {
      console.log('❌ No active session - user is not logged in!')
      console.log('   Please log in first and try again.')
      return
    }
    
    console.log('✅ User is authenticated')
    console.log(`   User ID: ${session.user.id}`)
    console.log(`   Email: ${session.user.email}`)
    console.log(`   Role: ${session.user.role || 'authenticated'}`)
    
    // 2. Check user profile
    console.log('\n2. Checking user profile...')
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()
    
    if (profileError) {
      console.error('❌ Profile error:', profileError)
    } else {
      console.log('✅ Profile found')
      console.log(`   Role: ${profile.role}`)
      console.log(`   Name: ${profile.full_name}`)
    }
    
    // 3. Check storage buckets
    console.log('\n3. Checking storage buckets...')
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.error('❌ Buckets error:', bucketsError)
    } else {
      console.log('✅ Buckets accessible')
      const newsBucket = buckets.find(b => b.id === 'news-images')
      if (newsBucket) {
        console.log(`   news-images bucket: Public=${newsBucket.public}`)
      } else {
        console.log('❌ news-images bucket not found!')
      }
    }
    
    // 4. Test upload permissions
    console.log('\n4. Testing upload permissions...')
    
    // Create a tiny test image file
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'red'
    ctx.fillRect(0, 0, 1, 1)
    
    canvas.toBlob(async (blob) => {
      const testFile = new File([blob], 'test.png', { type: 'image/png' })
      const testPath = `test/${session.user.id}-${Date.now()}.png`
      
      console.log(`   Attempting upload to: news-images/${testPath}`)
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(testPath, testFile)
      
      if (uploadError) {
        console.error('❌ Upload failed:', uploadError)
        console.log('\n🔧 Possible solutions:')
        console.log('   1. Check if RLS policies are correctly set up')
        console.log('   2. Verify bucket permissions in Supabase dashboard')
        console.log('   3. Make sure you are logged in as an admin user')
      } else {
        console.log('✅ Upload successful!')
        console.log(`   File path: ${uploadData.path}`)
        
        // Clean up test file
        await supabase.storage.from('news-images').remove([testPath])
        console.log('   Test file cleaned up')
      }
    }, 'image/png')
    
  } catch (error) {
    console.error('❌ Debug script error:', error)
  }
}

// Run the debug
debugAuthAndUpload()
