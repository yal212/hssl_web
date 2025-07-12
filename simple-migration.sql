-- Simple migration to add news columns to existing posts table
-- Copy and paste this into your Supabase SQL Editor

-- Add excerpt column
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS excerpt TEXT;

-- Add featured column  
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Add category column
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general';

-- Add tags column (array of text)
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Add image_url column
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add published_at column
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;

-- Add category constraint
ALTER TABLE public.posts DROP CONSTRAINT IF EXISTS posts_category_check;
ALTER TABLE public.posts ADD CONSTRAINT posts_category_check 
CHECK (category IN ('general', 'events', 'achievements', 'announcements', 'workshops', 'partnerships'));

-- Update published_at for existing published posts
UPDATE public.posts 
SET published_at = created_at 
WHERE published = true AND published_at IS NULL;

-- Insert sample news data (only if no posts exist with these titles)
INSERT INTO public.posts (title, content, excerpt, published, featured, category, tags, image_url, published_at, created_at)
SELECT * FROM (VALUES
    (
        '歡迎來到 HSSL 最新消息頁面',
        '<p>我們很高興為您介紹全新的最新消息頁面！</p><p>在這裡您可以：</p><ul><li>查看我們的最新活動和公告</li><li>了解工作坊和課程資訊</li><li>追蹤我們的成就和合作夥伴</li><li>獲得第一手的環保手工皂資訊</li></ul><p>請定期關注我們的更新，不要錯過任何重要消息！</p>',
        '全新的最新消息頁面正式上線！在這裡您可以獲得 HSSL 的第一手資訊和重要公告。',
        true,
        true,
        'announcements',
        ARRAY['公告', '網站更新', '最新消息'],
        '/hssl_profile.jpg',
        NOW(),
        NOW()
    ),
    (
        '環保手工皂製作工作坊即將開課',
        '<p>我們即將舉辦新一期的環保手工皂製作工作坊！</p><p>課程特色：</p><ul><li>學習天然手工皂製作技術</li><li>了解環保材料的選擇</li><li>實際動手製作屬於自己的手工皂</li><li>學習廢油回收再利用</li></ul><p>時間：每週六下午 2:00-4:00<br>地點：學校實驗室<br>費用：材料費 NT$200</p><p>名額有限，歡迎報名參加！</p>',
        '新一期環保手工皂製作工作坊即將開課，學習天然製皂技術和環保理念。',
        true,
        false,
        'workshops',
        ARRAY['工作坊', '手工皂', '環保', '教學'],
        '/hssl_profile.jpg',
        NOW() - INTERVAL '1 day',
        NOW() - INTERVAL '1 day'
    ),
    (
        'HSSL 團隊介紹',
        '<p>High School Soap Lab 是由一群熱愛環保的高中學生組成的團隊。</p><p>我們的使命：</p><ul><li>推廣環保手工皂製作</li><li>教育社區環保理念</li><li>回收廢油再利用</li><li>支持慈善事業</li></ul><p>透過我們的努力，希望能為地球環境盡一份心力，同時幫助需要幫助的人。</p>',
        '認識 HSSL 團隊 - 一群致力於環保手工皂推廣和慈善事業的高中學生。',
        true,
        false,
        'general',
        ARRAY['團隊介紹', 'HSSL', '環保', '學生'],
        '/hssl_profile.jpg',
        NOW() - INTERVAL '3 days',
        NOW() - INTERVAL '3 days'
    )
) AS new_posts(title, content, excerpt, published, featured, category, tags, image_url, published_at, created_at)
WHERE NOT EXISTS (
    SELECT 1 FROM public.posts WHERE posts.title = new_posts.title
);
