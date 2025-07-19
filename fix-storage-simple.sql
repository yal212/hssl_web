-- SIMPLE STORAGE FIX - No special permissions required
-- Run this in your Supabase SQL Editor

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
