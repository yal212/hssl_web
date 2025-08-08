-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member', 'volunteer')),
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    ingredients TEXT,
    benefits TEXT,
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table (enhanced for news functionality)
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT, -- Brief summary for news listings
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    published BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false, -- For highlighting important news
    category TEXT DEFAULT 'general' CHECK (category IN ('general', 'events', 'achievements', 'announcements', 'workshops', 'partnerships')),
    tags TEXT[], -- Array of tags for better categorization
    image_url TEXT, -- Featured image for news items
    content_images TEXT[], -- Array of image URLs for news content galleries
    content_videos TEXT[], -- Array of video URLs for news content
    published_at TIMESTAMP WITH TIME ZONE, -- When the post was published
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    organizer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    max_participants INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    ip_address TEXT,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    ip_address TEXT,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Products policies
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
CREATE POLICY "Products are viewable by everyone" ON public.products
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Only admins can insert products" ON public.products;
CREATE POLICY "Only admins can insert products" ON public.products
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

DROP POLICY IF EXISTS "Only admins can update products" ON public.products;
CREATE POLICY "Only admins can update products" ON public.products
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

DROP POLICY IF EXISTS "Only admins can delete products" ON public.products;
CREATE POLICY "Only admins can delete products" ON public.products
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Posts policies
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.posts;
CREATE POLICY "Published posts are viewable by everyone" ON public.posts
    FOR SELECT USING (published = true OR auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can insert their own posts" ON public.posts;
CREATE POLICY "Users can insert their own posts" ON public.posts
    FOR INSERT WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can update their own posts" ON public.posts;
CREATE POLICY "Users can update their own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can delete their own posts" ON public.posts;
CREATE POLICY "Users can delete their own posts" ON public.posts
    FOR DELETE USING (auth.uid() = author_id);

-- Events policies
DROP POLICY IF EXISTS "Events are viewable by everyone" ON public.events;
CREATE POLICY "Events are viewable by everyone" ON public.events
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Members can insert events" ON public.events;
CREATE POLICY "Members can insert events" ON public.events
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can update their own events" ON public.events;
CREATE POLICY "Users can update their own events" ON public.events
    FOR UPDATE USING (auth.uid() = organizer_id);

DROP POLICY IF EXISTS "Users can delete their own events" ON public.events;
CREATE POLICY "Users can delete their own events" ON public.events
    FOR DELETE USING (auth.uid() = organizer_id);

-- Contact messages policies
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Only admins can view contact messages" ON public.contact_messages;
CREATE POLICY "Only admins can view contact messages" ON public.contact_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

DROP POLICY IF EXISTS "Only admins can update contact messages" ON public.contact_messages;
CREATE POLICY "Only admins can update contact messages" ON public.contact_messages
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

DROP POLICY IF EXISTS "Only admins can delete contact messages" ON public.contact_messages;
CREATE POLICY "Only admins can delete contact messages" ON public.contact_messages
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS handle_updated_at_profiles ON public.profiles;
CREATE TRIGGER handle_updated_at_profiles
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_updated_at_products ON public.products;
CREATE TRIGGER handle_updated_at_products
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_updated_at_posts ON public.posts;
CREATE TRIGGER handle_updated_at_posts
    BEFORE UPDATE ON public.posts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_updated_at_events ON public.events;
CREATE TRIGGER handle_updated_at_events
    BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_updated_at_contact_messages ON public.contact_messages;
CREATE TRIGGER handle_updated_at_contact_messages
    BEFORE UPDATE ON public.contact_messages
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert some sample data (only if products don't already exist)
INSERT INTO public.products (name, description, price, ingredients, benefits, image_url)
SELECT * FROM (VALUES
    ('Lavender Dreams', 'Relaxing lavender soap perfect for evening routines', 8.99, 'Olive oil, coconut oil, lavender essential oil, shea butter', 'Moisturizing, calming, aromatherapy benefits', '/images/lavender-soap.jpg'),
    ('Citrus Burst', 'Energizing citrus soap to start your day right', 7.99, 'Olive oil, coconut oil, orange essential oil, lemon essential oil', 'Energizing, vitamin C, natural exfoliation', '/images/citrus-soap.jpg'),
    ('Oatmeal Honey', 'Gentle exfoliating soap with natural oatmeal and honey', 9.99, 'Olive oil, coconut oil, oatmeal, honey, vanilla extract', 'Gentle exfoliation, moisturizing, suitable for sensitive skin', '/images/oatmeal-soap.jpg'),
    ('Tea Tree Fresh', 'Purifying tea tree soap for problem skin', 8.49, 'Olive oil, coconut oil, tea tree essential oil, charcoal', 'Antibacterial, purifying, acne-fighting', '/images/teatree-soap.jpg')
) AS new_products(name, description, price, ingredients, benefits, image_url)
WHERE NOT EXISTS (
    SELECT 1 FROM public.products WHERE products.name = new_products.name
);

-- Insert sample news data (only if posts don't already exist)
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

-- ADMIN USER SETUP
-- To create an admin user, run the following SQL commands manually in Supabase SQL Editor:

/*
-- Example: Create admin user manually (replace with your details)
-- First, create the user in Supabase Auth (do this in the Auth section of Supabase dashboard)
-- Then update their profile role:

UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your-admin-email@example.com';

-- Or if you know the user ID:
UPDATE public.profiles
SET role = 'admin'
WHERE id = 'your-user-uuid-here';

-- To check existing admin users:
SELECT id, email, full_name, role, created_at
FROM public.profiles
WHERE role = 'admin';
*/
