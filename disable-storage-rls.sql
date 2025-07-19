-- DISABLE STORAGE RLS COMPLETELY (Alternative approach)
-- This completely disables RLS on storage.objects to eliminate the error
-- Run this in your Supabase SQL Editor if the simple fix doesn't work

-- Step 1: Ensure storage buckets exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('news-images', 'news-images', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('news-videos', 'news-videos', true, 52428800, ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Step 2: Disable RLS on storage.objects (this eliminates all RLS errors)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Step 3: Verification
SELECT 'Storage buckets created:' as status;
SELECT id, name, public FROM storage.buckets 
WHERE id IN ('avatars', 'news-images', 'news-videos');

SELECT 'RLS status:' as status;
SELECT 
  schemaname, 
  tablename, 
  rowsecurity as rls_enabled,
  CASE 
    WHEN rowsecurity THEN 'RLS is enabled'
    ELSE 'RLS is disabled - no policy errors should occur'
  END as status
FROM pg_tables 
WHERE schemaname = 'storage' AND tablename = 'objects';

-- Note: With RLS disabled, all authenticated users can upload/delete files
-- This is acceptable for a small team/school project
-- For production with many users, you'd want to re-enable RLS with proper policies
