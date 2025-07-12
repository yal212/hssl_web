// Test and apply content_images migration
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
let supabaseUrl, supabaseServiceKey

try {
  const envPath = path.join(__dirname, '.env.local')
  const envContent = fs.readFileSync(envPath, 'utf8')
  const envLines = envContent.split('\n')

  for (const line of envLines) {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
      supabaseUrl = line.split('=')[1]
    }
    if (line.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) {
      supabaseServiceKey = line.split('=')[1]
    }
  }
} catch (error) {
  console.log('Could not read .env.local file, using environment variables')
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
}

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables (need service role key for schema changes)')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testAndMigrateContentImages() {
  console.log('🔍 Testing content_images field...\n')

  try {
    // Test if content_images field exists
    console.log('1. Checking if content_images field exists...')
    const { data: testData, error: testError } = await supabase
      .from('posts')
      .select('content_images')
      .limit(1)

    if (testError) {
      if (testError.code === '42703') {
        console.log('❌ content_images field does not exist')
        console.log('2. Adding content_images field...')
        
        // Add the content_images column
        const { error: alterError } = await supabase.rpc('exec_sql', {
          sql: 'ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS content_images TEXT[]'
        })

        if (alterError) {
          console.error('❌ Failed to add content_images column:', alterError)
          
          // Try alternative approach using direct SQL
          console.log('3. Trying alternative migration approach...')
          const { error: directError } = await supabase
            .from('posts')
            .update({ content_images: [] })
            .eq('id', 'non-existent-id') // This will fail but might create the column

          if (directError) {
            console.log('⚠️  Direct approach also failed. Manual migration may be needed.')
            console.log('Please run this SQL manually in your Supabase dashboard:')
            console.log('ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS content_images TEXT[];')
            return
          }
        } else {
          console.log('✅ content_images field added successfully')
        }
      } else {
        console.error('❌ Unexpected error:', testError)
        return
      }
    } else {
      console.log('✅ content_images field already exists')
    }

    // Test the field again
    console.log('3. Testing content_images field functionality...')
    const { data: finalTest, error: finalError } = await supabase
      .from('posts')
      .select('id, title, content_images')
      .limit(1)

    if (finalError) {
      console.error('❌ Final test failed:', finalError)
    } else {
      console.log('✅ content_images field is working correctly')
      if (finalTest.length > 0) {
        console.log(`   Sample data: ${JSON.stringify(finalTest[0], null, 2)}`)
      }
    }

    console.log('\n🎉 Migration test completed!')

  } catch (error) {
    console.error('❌ Migration test failed:', error)
  }
}

// Run the test
testAndMigrateContentImages()
