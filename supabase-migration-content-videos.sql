-- Migration to add content_videos column and fix storage RLS policies
-- Run this in your Supabase SQL Editor

-- Add content_videos column to posts table
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS content_videos TEXT[] DEFAULT '{}';

-- Update existing posts to have empty array for content_videos if null
UPDATE public.posts
SET content_videos = '{}'
WHERE content_videos IS NULL;

-- Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('news-images', 'news-images', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('news-videos', 'news-videos', true, 52428800, ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow authenticated users to upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update avatars" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete avatars" ON storage.objects;

DROP POLICY IF EXISTS "Allow authenticated users to upload news images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to news images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update news images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete news images" ON storage.objects;

DROP POLICY IF EXISTS "Allow authenticated users to upload news videos" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to news videos" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update news videos" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete news videos" ON storage.objects;

-- Create comprehensive RLS policies for all storage buckets

-- AVATARS BUCKET POLICIES
CREATE POLICY "Allow authenticated users to upload avatars" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow public read access to avatars" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Allow authenticated users to update avatars" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow authenticated users to delete avatars" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
);

-- NEWS IMAGES BUCKET POLICIES
CREATE POLICY "Allow authenticated users to upload news images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'news-images'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow public read access to news images" ON storage.objects
FOR SELECT USING (bucket_id = 'news-images');

CREATE POLICY "Allow authenticated users to update news images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'news-images'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow authenticated users to delete news images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'news-images'
  AND auth.role() = 'authenticated'
);

-- NEWS VIDEOS BUCKET POLICIES
CREATE POLICY "Allow authenticated users to upload news videos" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'news-videos'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow public read access to news videos" ON storage.objects
FOR SELECT USING (bucket_id = 'news-videos');

CREATE POLICY "Allow authenticated users to update news videos" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'news-videos'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow authenticated users to delete news videos" ON storage.objects
FOR DELETE USING (
  bucket_id = 'news-videos'
  AND auth.role() = 'authenticated'
);
