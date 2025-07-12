# Storage RLS Policy Fix Guide

## Problem
You're getting a `StorageApiError: new row violates row-level security policy` error when trying to upload images. This happens because Supabase Storage has Row Level Security (RLS) enabled but no policies are configured to allow image uploads.

## Quick Fix (Recommended)

### Step 1: Go to Supabase Dashboard
1. Open your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**

### Step 2: Run the Simple Storage Fix
Copy and paste this SQL code and click **Run**:

```sql
-- Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('news-images', 'news-images', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to all images
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id IN ('avatars', 'news-images'));

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id IN ('avatars', 'news-images') 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated update" ON storage.objects
FOR UPDATE USING (
  bucket_id IN ('avatars', 'news-images') 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated delete" ON storage.objects
FOR DELETE USING (
  bucket_id IN ('avatars', 'news-images') 
  AND auth.role() = 'authenticated'
);
```

### Step 3: Verify Storage Setup
1. Go to **Storage** in the left sidebar
2. You should see two buckets: `avatars` and `news-images`
3. Both should be marked as **Public**

## Alternative: Manual Bucket Creation

If the SQL approach doesn't work, create buckets manually:

### Create Avatars Bucket:
1. Go to **Storage** → **Create a new bucket**
2. **Name**: `avatars`
3. **Public bucket**: ✅ Enabled
4. **File size limit**: `5242880` (5MB)
5. **Allowed MIME types**: `image/jpeg,image/jpg,image/png,image/webp`

### Create News Images Bucket:
1. Go to **Storage** → **Create a new bucket**
2. **Name**: `news-images`
3. **Public bucket**: ✅ Enabled
4. **File size limit**: `10485760` (10MB)
5. **Allowed MIME types**: `image/jpeg,image/jpg,image/png,image/webp`

### Then Add Policies:
Go to **Authentication** → **Policies** → **storage.objects** and add these policies:

**Policy 1: Public Read**
- Policy name: `Public read access`
- Allowed operation: `SELECT`
- Target roles: `public`
- USING expression: `bucket_id IN ('avatars', 'news-images')`

**Policy 2: Authenticated Upload**
- Policy name: `Authenticated upload`
- Allowed operation: `INSERT`
- Target roles: `authenticated`
- WITH CHECK expression: `bucket_id IN ('avatars', 'news-images') AND auth.role() = 'authenticated'`

**Policy 3: Authenticated Update**
- Policy name: `Authenticated update`
- Allowed operation: `UPDATE`
- Target roles: `authenticated`
- USING expression: `bucket_id IN ('avatars', 'news-images') AND auth.role() = 'authenticated'`

**Policy 4: Authenticated Delete**
- Policy name: `Authenticated delete`
- Allowed operation: `DELETE`
- Target roles: `authenticated`
- USING expression: `bucket_id IN ('avatars', 'news-images') AND auth.role() = 'authenticated'`

## Testing the Fix

After applying the fix:

1. **Refresh your application** (the one running on localhost:3005)
2. **Log in as an admin user**
3. **Try creating a news item** with image upload
4. **The upload should now work** without RLS errors

## Security Notes

The policies above are permissive for development. For production, you might want to:

1. **Restrict news image uploads to admins only**
2. **Add file path restrictions** (e.g., users can only upload to their own folders)
3. **Add additional validation** for file types and sizes

## Troubleshooting

If you still get errors:

1. **Check Authentication**: Make sure you're logged in as an authenticated user
2. **Check User Role**: For news uploads, make sure your user has `admin` role in the `profiles` table
3. **Check Browser Console**: Look for more detailed error messages
4. **Check Supabase Logs**: Go to Logs in your Supabase dashboard to see detailed error information

## Files Updated

I've also updated the storage utilities to provide better error messages:
- `src/lib/storage.ts` - Now shows user-friendly messages for RLS errors

The application will now show "Storage permission denied" instead of the raw RLS error, making it easier to understand what's wrong.
