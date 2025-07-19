# Manual Storage Fix for RLS Policy Error

## The Problem
You're getting this error: `StorageApiError: new row violates row-level security policy`

This happens because the storage buckets either don't exist or don't have proper permissions set up.

## Solution: Manual Setup via Supabase Dashboard

### Step 1: Create Storage Buckets Manually

1. **Go to your Supabase Dashboard**
2. **Navigate to Storage** (in the left sidebar)
3. **Create the following buckets:**

#### Bucket 1: `news-images`
- **Name**: `news-images`
- **Public**: ✅ Yes (checked)
- **File size limit**: `10 MB`
- **Allowed MIME types**: `image/jpeg,image/jpg,image/png,image/webp`

#### Bucket 2: `news-videos`
- **Name**: `news-videos`
- **Public**: ✅ Yes (checked)
- **File size limit**: `50 MB`
- **Allowed MIME types**: `video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo`

#### Bucket 3: `avatars`
- **Name**: `avatars`
- **Public**: ✅ Yes (checked)
- **File size limit**: `5 MB`
- **Allowed MIME types**: `image/jpeg,image/jpg,image/png,image/webp`

### Step 2: Set Up RLS Policies (Manual)

For each bucket you created, you need to add policies:

1. **Click on the bucket name** (e.g., `news-images`)
2. **Go to the "Policies" tab**
3. **Click "New Policy"**
4. **Create these 4 policies for EACH bucket:**

#### Policy 1: Allow Public Read
- **Policy Name**: `Allow public read`
- **Allowed Operation**: `SELECT`
- **Target Roles**: `public`
- **USING Expression**: `true`

#### Policy 2: Allow Authenticated Upload
- **Policy Name**: `Allow authenticated upload`
- **Allowed Operation**: `INSERT`
- **Target Roles**: `authenticated`
- **WITH CHECK Expression**: `true`

#### Policy 3: Allow Authenticated Update
- **Policy Name**: `Allow authenticated update`
- **Allowed Operation**: `UPDATE`
- **Target Roles**: `authenticated`
- **USING Expression**: `true`

#### Policy 4: Allow Authenticated Delete
- **Policy Name**: `Allow authenticated delete`
- **Allowed Operation**: `DELETE`
- **Target Roles**: `authenticated`
- **USING Expression**: `true`

### Step 3: Run Simple SQL Script

Run this simple script in your Supabase SQL Editor (this should work without permission issues):

```sql
-- Add content_videos column if it doesn't exist
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS content_videos TEXT[] DEFAULT '{}';

-- Update existing posts
UPDATE public.posts 
SET content_videos = '{}' 
WHERE content_videos IS NULL;
```

### Step 4: Test the Fix

1. **Refresh your news page**
2. **Try uploading an image**
3. **The upload should now work!**

## Alternative: Use the Simple SQL Script

If the manual setup is too tedious, try running just the bucket creation part:

```sql
-- Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('news-images', 'news-images', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('news-videos', 'news-videos', true, 52428800, ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo'])
ON CONFLICT (id) DO NOTHING;

-- Add content_videos column if it doesn't exist
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS content_videos TEXT[] DEFAULT '{}';

-- Update existing posts
UPDATE public.posts 
SET content_videos = '{}' 
WHERE content_videos IS NULL;
```

Then set up the RLS policies manually through the dashboard as described above.

## Why This Happens

The RLS (Row Level Security) policies control who can access what data. Without proper policies, Supabase blocks all operations to protect your data. The manual setup ensures you have the right permissions without needing database owner privileges.
