-- SIMPLE STORAGE RLS FIX (No special permissions required)
-- This script works with standard Supabase project permissions
-- Run this in your Supabase SQL Editor

-- Step 1: Ensure storage buckets exist with correct configuration
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('news-images', 'news-images', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('news-videos', 'news-videos', true, 52428800, ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Step 2: Drop existing policies (only if they exist)
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
DROP POLICY IF EXISTS "Authenticated users can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload news images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to all storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete" ON storage.objects;

-- Step 3: Create simple, working policies

-- Allow public read access to all storage objects
CREATE POLICY "Public read access to storage"
ON storage.objects FOR SELECT
USING (true);

-- Allow authenticated users to upload to any bucket
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (auth.role() = 'authenticated');

-- Step 4: Verification queries
SELECT 'Storage buckets status:' as info;
SELECT id, name, public, file_size_limit FROM storage.buckets 
WHERE id IN ('avatars', 'news-images', 'news-videos');

SELECT 'Storage policies status:' as info;
SELECT policyname, cmd FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';

SELECT 'Current user context:' as info;
SELECT 
  auth.uid() as user_id,
  auth.role() as auth_role,
  CASE 
    WHEN auth.role() = 'authenticated' THEN 'Should be able to upload'
    ELSE 'May have upload restrictions'
  END as upload_permission;
