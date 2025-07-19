# Storage RLS Permission Fix Guide

You encountered the error `ERROR: 42501: must be owner of table objects` because the previous script tried to perform operations requiring table ownership. Here are three working solutions in order of preference:

## 🎯 Solution 1: Simple RLS Fix (Recommended)

This approach works with standard Supabase permissions and should resolve your RLS errors.

### Step 1: Run the Simple Fix Script

In your Supabase SQL Editor, run:

```sql
-- Copy and paste the contents of fix-storage-rls-simple.sql
```

This script:
- ✅ Creates storage buckets if they don't exist
- ✅ Drops existing conflicting policies
- ✅ Creates simple, working policies for authenticated users
- ✅ Works with standard Supabase project permissions

### Step 2: Test the Fix

1. Restart your Next.js development server
2. Try uploading an image in the news form
3. Check browser console for RLS errors

## 🎯 Solution 2: Disable RLS Completely (If Solution 1 Fails)

If the simple fix doesn't work, you can disable RLS entirely on storage objects.

### Run the Disable Script

In your Supabase SQL Editor, run:

```sql
-- Copy and paste the contents of disable-storage-rls.sql
```

This approach:
- ✅ Completely eliminates RLS errors
- ✅ Works for small teams/school projects
- ⚠️ Less secure for large production apps

## 🎯 Solution 3: Use Admin Client Only (Code-Only Fix)

If SQL fixes don't work, the admin client in your code should handle uploads reliably.

### Current Code Status

Your code has been updated to:
- ✅ Use admin client for uploads (bypasses RLS)
- ✅ Fallback to regular client if admin fails
- ✅ Improved error handling

The admin client uses the service role key which bypasses RLS policies entirely.

## 🔧 Troubleshooting Steps

### 1. Verify Environment Variables

Check your `.env.local` file has:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Check Service Role Key

The service role key should:
- Start with `eyJ`
- Be different from the anon key
- Have `"role":"service_role"` when decoded

### 3. Test Admin Client

Create a simple test to verify admin client works:

```javascript
// Test in browser console or create a test file
import { supabaseAdmin } from './src/lib/supabase-admin'

// This should work without RLS errors
supabaseAdmin.storage.from('news-images').list('', { limit: 1 })
  .then(result => console.log('Admin client test:', result))
```

## 🚀 Quick Implementation

### Option A: Try Simple SQL Fix First

1. Run `fix-storage-rls-simple.sql` in Supabase SQL Editor
2. Restart your dev server
3. Test image upload

### Option B: If SQL Fails, Use Disable RLS

1. Run `disable-storage-rls.sql` in Supabase SQL Editor
2. Restart your dev server
3. Test image upload

### Option C: Code-Only Solution

If both SQL approaches fail, your current code should still work because:
- Admin client bypasses RLS entirely
- Service role has full permissions
- Fallback to regular client provides redundancy

## 📋 Expected Results

After implementing any of these solutions:

### ✅ What Should Work
- Image uploads complete without console errors
- No "row-level security policy" errors
- Clean user experience in news form

### ✅ Browser Console Should Show
```
✅ Admin client upload successful
✅ Image uploaded: [URL]
```

Instead of:
```
❌ StorageApiError: new row violates row-level security policy
```

## 🔍 Verification Commands

Run these in Supabase SQL Editor to verify your fix:

```sql
-- Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'storage' AND tablename = 'objects';

-- Check storage policies
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';

-- Check buckets
SELECT id, name, public 
FROM storage.buckets 
WHERE id IN ('avatars', 'news-images', 'news-videos');
```

## 🎯 Recommendation

1. **Start with Solution 1** (Simple RLS Fix) - most secure
2. **If that fails, use Solution 2** (Disable RLS) - simpler but less secure
3. **Solution 3** (Code-only) should work regardless of SQL changes

The admin client approach in your code provides a reliable fallback that should eliminate RLS errors even if the database policies aren't perfect.
