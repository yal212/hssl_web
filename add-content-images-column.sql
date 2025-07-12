-- Add content_images column to posts table
-- This should work since it's your own table, not storage.objects

ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS content_images TEXT[];

-- Update existing posts to have empty array for content_images
UPDATE public.posts 
SET content_images = '{}' 
WHERE content_images IS NULL;

-- Verify the column was added
SELECT 'Column added successfully:' as status;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'posts' AND column_name = 'content_images';

-- Show sample data
SELECT 'Sample posts data:' as status;
SELECT id, title, 
       CASE WHEN image_url IS NOT NULL THEN 'has image' ELSE 'no image' END as main_image,
       CASE WHEN content_images IS NOT NULL THEN array_length(content_images, 1) ELSE 0 END as content_image_count
FROM public.posts 
LIMIT 3;
