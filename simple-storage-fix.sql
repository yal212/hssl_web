-- Simple Storage Fix for News Images
-- Run this in your Supabase SQL Editor

-- Create buckets if they don't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('news-images', 'news-images', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Simple permissive policies for development
-- You can make these more restrictive later

-- Allow public read access to all images
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id IN ('avatars', 'news-images'));

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id IN ('avatars', 'news-images') 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated update" ON storage.objects
FOR UPDATE USING (
  bucket_id IN ('avatars', 'news-images') 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated delete" ON storage.objects
FOR DELETE USING (
  bucket_id IN ('avatars', 'news-images') 
  AND auth.role() = 'authenticated'
);
