-- Minimal migration script for news functionality
-- This script is guaranteed to work without conflicts

-- Step 1: Add new columns to posts table
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general';
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;

-- Step 2: Add category constraint
ALTER TABLE public.posts DROP CONSTRAINT IF EXISTS posts_category_check;
ALTER TABLE public.posts ADD CONSTRAINT posts_category_check 
CHECK (category IN ('general', 'events', 'achievements', 'announcements', 'workshops', 'partnerships'));

-- Step 3: Update existing posts
UPDATE public.posts 
SET published_at = created_at 
WHERE published = true AND published_at IS NULL;

-- Step 4: Add one sample news item (only if no posts exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.posts LIMIT 1) THEN
        INSERT INTO public.posts (title, content, excerpt, published, featured, category, tags, image_url, published_at, created_at)
        VALUES (
            '歡迎來到 HSSL 最新消息頁面',
            '<p>我們很高興為您介紹全新的最新消息頁面！</p><p>在這裡您可以查看我們的最新活動、公告和重要資訊。</p>',
            '全新的最新消息頁面正式上線！',
            true,
            true,
            'announcements',
            ARRAY['公告', '網站更新'],
            '/hssl_profile.jpg',
            NOW(),
            NOW()
        );
    END IF;
END $$;
