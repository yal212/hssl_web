// Debug storage RLS issues
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
let supabaseUrl, supabaseKey, serviceKey

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
    if (line.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) {
      serviceKey = line.split('=')[1]
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
const supabaseAdmin = serviceKey ? createClient(supabaseUrl, serviceKey) : null

async function debugStorageRLS() {
  console.log('🔍 Debugging Storage RLS Issues...\n')

  try {
    // Check current buckets
    console.log('1. Checking existing buckets...')
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.error('❌ Error listing buckets:', bucketsError)
      return
    }

    console.log(`Found ${buckets.length} buckets:`)
    buckets.forEach(bucket => {
      console.log(`  - ${bucket.name} (public: ${bucket.public}, size_limit: ${bucket.file_size_limit})`)
    })

    // Check if our required buckets exist
    const avatarsBucket = buckets.find(b => b.name === 'avatars')
    const newsBucket = buckets.find(b => b.name === 'news-images')

    if (!avatarsBucket) {
      console.log('\n❌ avatars bucket missing')
    }
    if (!newsBucket) {
      console.log('❌ news-images bucket missing')
    }

    // Check authentication
    console.log('\n2. Checking authentication...')
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      console.log('❌ No active session - you need to be logged in')
      console.log('Please log in to your app first, then run this test')
      return
    }

    console.log('✅ Authenticated as:', session.user.email)

    // Check user profile and role
    console.log('\n3. Checking user profile...')
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (profileError) {
      console.error('❌ Error fetching profile:', profileError)
    } else {
      console.log('✅ User profile found')
      console.log(`   Role: ${profile.role}`)
      console.log(`   ID: ${profile.id}`)
    }

    // Test storage policies with admin client if available
    if (supabaseAdmin) {
      console.log('\n4. Checking storage policies (admin)...')
      
      try {
        const { data: policies, error: policiesError } = await supabaseAdmin
          .from('pg_policies')
          .select('*')
          .eq('tablename', 'objects')
          .eq('schemaname', 'storage')

        if (policiesError) {
          console.log('⚠️  Could not fetch policies:', policiesError.message)
        } else {
          console.log(`Found ${policies.length} storage policies:`)
          policies.forEach(policy => {
            console.log(`  - ${policy.policyname} (${policy.cmd})`)
          })
        }
      } catch (e) {
        console.log('⚠️  Could not check policies (may need different permissions)')
      }
    }

    // Test actual upload
    console.log('\n5. Testing actual upload...')
    
    if (avatarsBucket) {
      console.log('Testing avatars bucket upload...')
      
      // Create a tiny test file
      const testContent = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]) // PNG header
      const testFile = new File([testContent], 'test.png', { type: 'image/png' })
      
      const testPath = `test/${session.user.id}-${Date.now()}.png`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(testPath, testFile)
      
      if (uploadError) {
        console.log('❌ Upload failed:', uploadError.message)
        console.log('   Error details:', JSON.stringify(uploadError, null, 2))
        
        if (uploadError.message.includes('row-level security policy')) {
          console.log('\n🔧 RLS Policy Issue Detected!')
          console.log('The storage.objects table has RLS enabled but no policies allow your upload.')
          console.log('\nTo fix this, run this SQL in your Supabase dashboard:')
          console.log(`
-- Drop any conflicting policies first
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete" ON storage.objects;

-- Create new policies
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id IN ('avatars', 'news-images'));

CREATE POLICY "Authenticated upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id IN ('avatars', 'news-images') 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated update" ON storage.objects
FOR UPDATE USING (
  bucket_id IN ('avatars', 'news-images') 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated delete" ON storage.objects
FOR DELETE USING (
  bucket_id IN ('avatars', 'news-images') 
  AND auth.role() = 'authenticated'
);
          `)
        }
      } else {
        console.log('✅ Upload successful!')
        console.log('   Path:', uploadData.path)
        
        // Clean up
        await supabase.storage.from('avatars').remove([uploadData.path])
        console.log('✅ Test file cleaned up')
      }
    }

  } catch (error) {
    console.error('❌ Debug failed:', error)
  }
}

debugStorageRLS()
