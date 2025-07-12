-- Fix Storage RLS Policies for News Images
-- This script creates the necessary RLS policies for image uploads

-- First, ensure the storage buckets exist and are properly configured
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('news-images', 'news-images', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;

DROP POLICY IF EXISTS "News images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload news images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update news images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete news images" ON storage.objects;

-- Create policies for avatars bucket
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = 'profiles'
);

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = 'profiles'
);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] = 'profiles'
);

-- Create policies for news-images bucket
CREATE POLICY "News images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-images');

CREATE POLICY "Admins can upload news images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'news-images' 
  AND auth.role() = 'authenticated'
  AND (
    -- Allow if user is admin
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
    OR
    -- Allow if uploading to news folder
    (storage.foldername(name))[1] = 'news'
  )
);

CREATE POLICY "Admins can update news images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'news-images' 
  AND auth.role() = 'authenticated'
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete news images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'news-images' 
  AND auth.role() = 'authenticated'
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Alternative: More permissive policies for development/testing
-- Uncomment these if the above policies are too restrictive

/*
-- More permissive avatar policies
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.role() = 'authenticated'
);

-- More permissive news image policies  
DROP POLICY IF EXISTS "Admins can upload news images" ON storage.objects;
CREATE POLICY "Authenticated users can upload news images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'news-images' 
  AND auth.role() = 'authenticated'
);
*/

-- Ensure RLS is enabled on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
