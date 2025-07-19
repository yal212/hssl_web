-- Debug script to check if admin authentication is working
-- Run this in Supabase SQL Editor while logged in as admin

-- Check current authentication context
SELECT 
  auth.uid() as current_user_id,
  auth.role() as current_auth_role,
  auth.email() as current_email;

-- Check if your profile exists and has admin role
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.profiles 
WHERE id = auth.uid();

-- Test the admin check that's used in RLS policies
SELECT 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  ) as is_admin_check_working;

-- List all profiles with admin role (to verify admin users exist)
SELECT 
  id,
  email,
  full_name,
  role
FROM public.profiles 
WHERE role = 'admin';
