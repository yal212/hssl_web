# Ultimate Storage Fix - Step by Step

The RLS policy error persists because there might be multiple issues. Let's fix them systematically.

## Step 1: Verify You're Logged In

1. **Open your browser's Developer Tools** (F12)
2. **Go to the Console tab**
3. **Copy and paste this code** to check your authentication:

```javascript
// Check if you're logged in
const checkAuth = async () => {
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session) {
    console.log('✅ Logged in as:', session.user.email)
    console.log('User ID:', session.user.id)
  } else {
    console.log('❌ Not logged in!')
  }
}

checkAuth()
```

**If you're not logged in, log in first before proceeding.**

## Step 2: Delete and Recreate Storage Policies

The policies might be conflicting. Let's start fresh:

### 2a. Delete All Existing Policies

Go to your Supabase Dashboard → Storage → Click on each bucket → Policies tab → **Delete all existing policies**

### 2b. Create New Policies (One by One)

For **each bucket** (`news-images`, `news-videos`, `avatars`), create these **exact** policies:

#### Policy 1: "Public read access"
- **Policy name**: `Public read access`
- **Allowed operation**: `SELECT`
- **Target roles**: `public`
- **USING expression**: `true`

#### Policy 2: "Authenticated users can upload"
- **Policy name**: `Authenticated users can upload`
- **Allowed operation**: `INSERT`
- **Target roles**: `authenticated`
- **WITH CHECK expression**: `true`

#### Policy 3: "Authenticated users can update"
- **Policy name**: `Authenticated users can update`
- **Allowed operation**: `UPDATE`
- **Target roles**: `authenticated`
- **USING expression**: `true`

#### Policy 4: "Authenticated users can delete"
- **Policy name**: `Authenticated users can delete`
- **Allowed operation**: `DELETE`
- **Target roles**: `authenticated`
- **USING expression**: `true`

## Step 3: Alternative - Disable RLS Temporarily

If the above doesn't work, try **temporarily disabling RLS** to test if uploads work:

```sql
-- Run this in Supabase SQL Editor
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```

**⚠️ Warning**: This makes all storage publicly writable. Only use for testing!

## Step 4: Test Upload

1. **Refresh your news page**
2. **Try uploading an image**
3. **Check browser console for any errors**

## Step 5: If Still Not Working - Nuclear Option

If nothing works, let's create a completely permissive setup:

```sql
-- Run this in Supabase SQL Editor

-- Ensure buckets exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('news-images', 'news-images', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('news-videos', 'news-videos', true, 52428800, ARRAY['video/mp4', 'video/webm', 'video/ogg']),
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Disable RLS temporarily
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Add missing column
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS content_videos TEXT[] DEFAULT '{}';

UPDATE public.posts 
SET content_videos = '{}' 
WHERE content_videos IS NULL;
```

## Step 6: Re-enable RLS Later

Once uploads work, you can re-enable RLS with proper policies:

```sql
-- Re-enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Then add the policies from Step 2b above
```

## Debug Information

If you're still having issues, run this in your browser console on the news page:

```javascript
// Debug current state
const debug = async () => {
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  
  console.log('=== DEBUG INFO ===')
  
  // Check session
  const { data: { session } } = await supabase.auth.getSession()
  console.log('Session:', !!session)
  if (session) console.log('User:', session.user.email)
  
  // Check buckets
  const { data: buckets } = await supabase.storage.listBuckets()
  console.log('Buckets:', buckets?.map(b => b.id))
  
  // Test upload
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  canvas.toBlob(async (blob) => {
    const file = new File([blob], 'test.png', { type: 'image/png' })
    const { error } = await supabase.storage
      .from('news-images')
      .upload(`test-${Date.now()}.png`, file)
    
    console.log('Upload test:', error ? 'FAILED' : 'SUCCESS')
    if (error) console.log('Error:', error.message)
  })
}

debug()
```

Try these steps in order and let me know which step resolves the issue!
