-- Migration: Add content_images column to posts table
-- This allows storing multiple images for news content

-- Add content_images column to posts table
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS content_images TEXT[];

-- Add comment for documentation
COMMENT ON COLUMN public.posts.content_images IS 'Array of image URLs for news content gallery';

-- Update existing posts to have empty array for content_images if null
UPDATE public.posts 
SET content_images = '{}' 
WHERE content_images IS NULL;
