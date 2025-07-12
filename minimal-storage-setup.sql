-- Minimal Storage Setup (Limited Permissions)
-- Run this if you get permission errors with the full script

-- Create storage buckets (this should work)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('news-images', 'news-images', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Add content_images column to posts table (this should work)
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS content_images TEXT[];

-- Update existing posts (this should work)
UPDATE public.posts 
SET content_images = '{}' 
WHERE content_images IS NULL;

-- Temporarily disable RLS for testing (use with caution)
-- Uncomment the next line if you're still getting RLS errors
-- ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Check what was created
SELECT 'Buckets created:' as info;
SELECT id, name, public, file_size_limit FROM storage.buckets WHERE id IN ('avatars', 'news-images');

SELECT 'Posts table updated:' as info;
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'posts' AND column_name = 'content_images';
