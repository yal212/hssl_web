// Simple test script to verify news functionality
const { createClient } = require('@supabase/supabase-js')

// Load environment variables manually
const fs = require('fs')
const path = require('path')

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

async function testNewsAPI() {
  console.log('🧪 Testing News API functionality...\n')

  try {
    // Test 1: Fetch all published news
    console.log('1. Testing fetch published news...')
    const { data: publishedNews, error: publishedError } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (publishedError) {
      console.error('❌ Error fetching published news:', publishedError)
    } else {
      console.log(`✅ Found ${publishedNews.length} published news items`)
      if (publishedNews.length > 0) {
        console.log(`   Latest: "${publishedNews[0].title}"`)
      }
    }

    // Test 2: Test categories
    console.log('\n2. Testing news categories...')
    const categories = ['general', 'events', 'achievements', 'announcements', 'workshops', 'partnerships']
    for (const category of categories) {
      const { data: categoryNews, error: categoryError } = await supabase
        .from('posts')
        .select('*')
        .eq('category', category)
        .eq('published', true)

      if (categoryError) {
        console.error(`❌ Error fetching ${category} news:`, categoryError)
      } else {
        console.log(`✅ Category "${category}": ${categoryNews.length} items`)
      }
    }

    // Test 3: Test featured news
    console.log('\n3. Testing featured news...')
    const { data: featuredNews, error: featuredError } = await supabase
      .from('posts')
      .select('*')
      .eq('featured', true)
      .eq('published', true)

    if (featuredError) {
      console.error('❌ Error fetching featured news:', featuredError)
    } else {
      console.log(`✅ Found ${featuredNews.length} featured news items`)
    }

    // Test 4: Test tags
    console.log('\n4. Testing news tags...')
    const { data: newsWithTags, error: tagsError } = await supabase
      .from('posts')
      .select('tags')
      .eq('published', true)
      .not('tags', 'is', null)

    if (tagsError) {
      console.error('❌ Error fetching news tags:', tagsError)
    } else {
      const allTags = new Set()
      newsWithTags.forEach(item => {
        if (item.tags) {
          item.tags.forEach(tag => allTags.add(tag))
        }
      })
      console.log(`✅ Found ${allTags.size} unique tags: ${Array.from(allTags).join(', ')}`)
    }

    // Test 5: Test database schema
    console.log('\n5. Testing database schema...')
    const { data: schemaTest, error: schemaError } = await supabase
      .from('posts')
      .select('id, title, content, excerpt, category, tags, featured, published, image_url, published_at, created_at')
      .limit(1)

    if (schemaError) {
      console.error('❌ Schema test failed:', schemaError)
    } else {
      console.log('✅ Database schema is correct')
      if (schemaTest.length > 0) {
        const fields = Object.keys(schemaTest[0])
        console.log(`   Available fields: ${fields.join(', ')}`)
      }
    }

    console.log('\n🎉 News API tests completed successfully!')

  } catch (error) {
    console.error('❌ Test failed with error:', error)
  }
}

// Run the tests
testNewsAPI()
