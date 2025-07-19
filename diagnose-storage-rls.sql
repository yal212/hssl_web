-- Comprehensive Storage RLS Diagnostic Script
-- Run this in your Supabase SQL Editor to diagnose the current state

-- 1. Check if RLS is enabled on storage.objects
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'storage' AND tablename = 'objects';

-- 2. List all storage buckets and their configuration
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types,
  created_at
FROM storage.buckets 
ORDER BY created_at;

-- 3. List all current RLS policies on storage.objects
SELECT 
  policyname,
  cmd as operation,
  permissive,
  roles,
  qual as condition,
  with_check
FROM pg_policies 
WHERE schemaname = 'storage' AND tablename = 'objects'
ORDER BY policyname;

-- 4. Check current user authentication context
SELECT 
  auth.uid() as current_user_id,
  auth.role() as current_auth_role,
  auth.email() as current_email;

-- 5. Check if current user has admin role
SELECT 
  p.id,
  p.email,
  p.full_name,
  p.role,
  CASE 
    WHEN p.role = 'admin' THEN 'YES'
    ELSE 'NO'
  END as is_admin
FROM public.profiles p 
WHERE p.id = auth.uid();

-- 6. Test storage bucket access permissions
-- This will show if you can list files in each bucket
SELECT 'Testing avatars bucket access:' as test;
SELECT count(*) as file_count FROM storage.objects WHERE bucket_id = 'avatars';

SELECT 'Testing news-images bucket access:' as test;
SELECT count(*) as file_count FROM storage.objects WHERE bucket_id = 'news-images';

-- 7. Show recent storage operations (if any)
SELECT 
  bucket_id,
  name,
  owner,
  created_at,
  updated_at
FROM storage.objects 
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC
LIMIT 10;

-- 8. Check if there are any conflicting policies
SELECT 
  'Checking for policy conflicts:' as info;

SELECT 
  policyname,
  cmd,
  CASE 
    WHEN qual IS NULL THEN 'No condition (allows all)'
    ELSE qual
  END as condition_summary
FROM pg_policies 
WHERE schemaname = 'storage' AND tablename = 'objects'
AND cmd = 'INSERT';
