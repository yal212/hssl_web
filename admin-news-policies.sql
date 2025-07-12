-- Enhanced Row Level Security policies for admin news operations
-- Run this in your Supabase SQL Editor to ensure proper admin access

-- Drop existing policies for posts table
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.posts;
DROP POLICY IF EXISTS "Users can insert their own posts" ON public.posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON public.posts;
DROP POLICY IF EXISTS "Users can delete their own posts" ON public.posts;

-- Create new comprehensive policies for posts table

-- 1. SELECT policy: Published posts are viewable by everyone, all posts viewable by admins and authors
CREATE POLICY "Posts select policy" ON public.posts
    FOR SELECT USING (
        published = true 
        OR auth.uid() = author_id 
        OR EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 2. INSERT policy: Authenticated users can insert posts, admins can insert any posts
CREATE POLICY "Posts insert policy" ON public.posts
    FOR INSERT WITH CHECK (
        auth.uid() = author_id 
        OR EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 3. UPDATE policy: Users can update their own posts, admins can update any posts
CREATE POLICY "Posts update policy" ON public.posts
    FOR UPDATE USING (
        auth.uid() = author_id 
        OR EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 4. DELETE policy: Users can delete their own posts, admins can delete any posts
CREATE POLICY "Posts delete policy" ON public.posts
    FOR DELETE USING (
        auth.uid() = author_id 
        OR EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Ensure RLS is enabled on posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create a function to check if user is admin (optional, for reusability)
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = user_id AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO authenticated;

-- Verify policies are working correctly
-- You can test these queries after running the migration:

-- Test 1: Check if admin can see all posts
-- SELECT * FROM posts; -- Should return all posts for admin users

-- Test 2: Check if regular users can only see published posts and their own
-- SELECT * FROM posts; -- Should return only published posts for non-admin users

-- Test 3: Check if admin can insert posts
-- INSERT INTO posts (title, content, published, author_id) VALUES ('Test', 'Test content', true, auth.uid());

-- Test 4: Check if admin can update any post
-- UPDATE posts SET title = 'Updated by admin' WHERE id = 'some-post-id';

-- Test 5: Check if admin can delete any post
-- DELETE FROM posts WHERE id = 'some-post-id';
