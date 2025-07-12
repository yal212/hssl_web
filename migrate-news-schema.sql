-- Migration script to add news functionality to existing posts table
-- Run this in your Supabase SQL Editor

-- Add new columns to posts table if they don't exist
DO $$ 
BEGIN
    -- Add excerpt column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'excerpt') THEN
        ALTER TABLE public.posts ADD COLUMN excerpt TEXT;
    END IF;
    
    -- Add featured column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'featured') THEN
        ALTER TABLE public.posts ADD COLUMN featured BOOLEAN DEFAULT false;
    END IF;
    
    -- Add category column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'category') THEN
        ALTER TABLE public.posts ADD COLUMN category TEXT DEFAULT 'general' CHECK (category IN ('general', 'events', 'achievements', 'announcements', 'workshops', 'partnerships'));
    END IF;
    
    -- Add tags column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'tags') THEN
        ALTER TABLE public.posts ADD COLUMN tags TEXT[];
    END IF;
    
    -- Add image_url column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'image_url') THEN
        ALTER TABLE public.posts ADD COLUMN image_url TEXT;
    END IF;
    
    -- Add published_at column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'published_at') THEN
        ALTER TABLE public.posts ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- Insert sample news data (only if posts table is empty or has no news-style posts)
INSERT INTO public.posts (title, content, excerpt, published, featured, category, tags, image_url, published_at)
SELECT * FROM (VALUES
    (
        '2024年環保手工皂工作坊圓滿結束',
        '<p>我們很高興地宣布，2024年度的環保手工皂工作坊已經圓滿結束！這次活動吸引了超過50位參與者，包括學生、家長和社區成員。</p><p>在工作坊中，參與者學習了：</p><ul><li>手工皂的基本製作原理</li><li>天然材料的選擇與應用</li><li>廢油回收再利用的環保理念</li><li>皂化反應的化學知識</li></ul><p>感謝所有參與者的熱情支持，讓我們一起為環保事業貢獻力量！</p>',
        '2024年度環保手工皂工作坊成功舉辦，超過50位參與者學習手工皂製作技術和環保理念。',
        true,
        true,
        'workshops',
        ARRAY['工作坊', '環保', '手工皂', '教育'],
        '/images/workshop-2024.jpg',
        NOW() - INTERVAL '2 days'
    ),
    (
        'HSSL 榮獲青年環保創新獎',
        '<p>High School Soap Lab 很榮幸地宣布，我們在2024年青年環保創新競賽中榮獲優秀獎！</p><p>這個獎項認可了我們在以下方面的努力：</p><ul><li>推廣環保手工皂製作</li><li>廢油回收再利用計劃</li><li>社區環保教育推廣</li><li>跨校合作環保項目</li></ul><p>感謝評審團對我們工作的肯定，這將激勵我們繼續在環保道路上前進！</p>',
        'HSSL 在2024年青年環保創新競賽中榮獲優秀獎，表彰我們在環保教育和廢油回收方面的貢獻。',
        true,
        true,
        'achievements',
        ARRAY['獲獎', '環保', '創新', '青年'],
        '/images/award-2024.jpg',
        NOW() - INTERVAL '5 days'
    ),
    (
        '新學期製皂課程開始報名',
        '<p>新學期即將開始，我們的製皂課程現在開放報名！</p><p>課程內容包括：</p><ul><li>基礎製皂理論</li><li>實際操作練習</li><li>配方設計與調整</li><li>安全操作規範</li></ul><p>上課時間：每週六下午2:00-4:00<br>課程期間：4週<br>費用：免費（材料費另計）</p><p>名額有限，請盡快報名！</p>',
        '新學期製皂課程開始報名，4週免費課程包含理論與實作，每週六下午進行。',
        true,
        false,
        'announcements',
        ARRAY['課程', '報名', '製皂', '教學'],
        '/images/course-registration.jpg',
        NOW() - INTERVAL '1 week'
    ),
    (
        '與在地農場合作推廣有機手工皂',
        '<p>我們很興奮地宣布與在地有機農場建立合作關係，共同推廣有機手工皂！</p><p>這次合作將帶來：</p><ul><li>使用農場有機植物油</li><li>添加天然草本植物</li><li>支持在地農業發展</li><li>推廣永續生活理念</li></ul><p>預計在下個月推出首批有機手工皂產品，敬請期待！</p>',
        'HSSL 與在地有機農場合作，將推出使用有機植物油和天然草本的手工皂產品。',
        true,
        false,
        'partnerships',
        ARRAY['合作', '有機', '農場', '永續'],
        '/images/organic-partnership.jpg',
        NOW() - INTERVAL '10 days'
    ),
    (
        '聖誕節特別版手工皂限量發售',
        '<p>聖誕節即將到來，我們特別推出聖誕節限量版手工皂！</p><p>特色包括：</p><ul><li>聖誕香氛配方</li><li>節慶主題包裝</li><li>限量生產100塊</li><li>收益將捐贈給慈善機構</li></ul><p>每塊售價 NT$150，現在開始預購，售完為止！</p>',
        '聖誕節限量版手工皂開始預購，特殊香氛配方搭配節慶包裝，收益將捐贈慈善機構。',
        true,
        false,
        'general',
        ARRAY['聖誕節', '限量', '慈善', '預購'],
        '/christmas_soap.png',
        NOW() - INTERVAL '2 weeks'
    )
) AS new_posts(title, content, excerpt, published, featured, category, tags, image_url, published_at)
WHERE NOT EXISTS (
    SELECT 1 FROM public.posts WHERE posts.title = new_posts.title
);

-- Update any existing posts to have default values for new columns
UPDATE public.posts 
SET 
    category = COALESCE(category, 'general'),
    featured = COALESCE(featured, false),
    tags = COALESCE(tags, ARRAY[]::TEXT[])
WHERE category IS NULL OR featured IS NULL OR tags IS NULL;

-- Set published_at for already published posts that don't have it
UPDATE public.posts 
SET published_at = created_at 
WHERE published = true AND published_at IS NULL;

COMMIT;
