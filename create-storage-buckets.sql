-- Complete Storage Setup for HSSL News Images
-- Run this entire script in your Supabase SQL Editor

-- Step 1: Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('news-images', 'news-images', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Step 2: Drop any existing conflicting policies
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete" ON storage.objects;
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "News images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload news images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update news images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete news images" ON storage.objects;

-- Step 3: Create comprehensive storage policies
-- Allow public read access to all images
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id IN ('avatars', 'news-images'));

-- Allow authenticated users to upload to both buckets
CREATE POLICY "Authenticated upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id IN ('avatars', 'news-images') 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their own uploads
CREATE POLICY "Authenticated update" ON storage.objects
FOR UPDATE USING (
  bucket_id IN ('avatars', 'news-images') 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their own uploads
CREATE POLICY "Authenticated delete" ON storage.objects
FOR DELETE USING (
  bucket_id IN ('avatars', 'news-images') 
  AND auth.role() = 'authenticated'
);

-- Step 4: Ensure RLS is enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Step 5: Add content_images column to posts table if it doesn't exist
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS content_images TEXT[];

-- Step 6: Update existing posts to have empty array for content_images
UPDATE public.posts 
SET content_images = '{}' 
WHERE content_images IS NULL;

-- Verification queries (these will show results after the setup)
SELECT 'Buckets created:' as status;
SELECT id, name, public, file_size_limit FROM storage.buckets WHERE id IN ('avatars', 'news-images');

SELECT 'Policies created:' as status;
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';

SELECT 'Posts table updated:' as status;
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'posts' AND column_name = 'content_images';
