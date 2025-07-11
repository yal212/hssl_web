# Supabase Storage Setup for Profile Pictures

## Overview
This guide will help you set up Supabase Storage for profile picture uploads in the High School Soap Lab application.

## 1. Create Storage Bucket

### Via Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Configure the bucket:
   - **Name**: `avatars`
   - **Public bucket**: ✅ Enabled (allows public access to profile pictures)
   - **File size limit**: `5242880` (5MB)
   - **Allowed MIME types**: `image/jpeg,image/jpg,image/png,image/webp`
5. Click **Create bucket**

### Via SQL (Alternative)
If you prefer to create the bucket via SQL, run this in the SQL Editor:

```sql
-- Create the avatars bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars', 
  true,
  5242880,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);
```

## 2. Set Up Storage Policies

Run the following SQL in your Supabase SQL Editor to create the necessary Row Level Security (RLS) policies:

```sql
-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Users can upload their own avatars
CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can update their own avatars
CREATE POLICY "Users can update their own avatar" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can delete their own avatars
CREATE POLICY "Users can delete their own avatar" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Avatar images are publicly accessible for viewing
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');
```

## 3. Verify Setup

### Test Bucket Creation
You can test if the bucket was created correctly by running:

```sql
SELECT * FROM storage.buckets WHERE id = 'avatars';
```

### Test Policies
Check if the policies were created:

```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';
```

## 4. Environment Variables

Make sure your `.env.local` file has the correct Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 5. Testing the Upload Feature

### Manual Testing Steps
1. Start your development server: `npm run dev`
2. Navigate to `/login` and sign in
3. Go to `/profile`
4. Click the **Edit Profile** button
5. Click the camera icon to upload a profile picture
6. Select an image file (JPEG, PNG, or WebP under 5MB)
7. Fill in your name and bio
8. Click **Save Changes**
9. Verify the profile picture appears correctly

### Expected File Structure
Uploaded files will be stored in the following structure:
```
avatars/
└── profiles/
    ├── user-id-1-timestamp.jpg
    ├── user-id-2-timestamp.png
    └── user-id-3-timestamp.webp
```

## 6. Troubleshooting

### Common Issues

**Issue**: "Failed to upload image" error
- **Solution**: Check that the `avatars` bucket exists and is public
- **Solution**: Verify storage policies are correctly set up
- **Solution**: Ensure the user is authenticated

**Issue**: "Permission denied" error
- **Solution**: Check RLS policies on `storage.objects`
- **Solution**: Verify the user ID matches the folder structure

**Issue**: Images not displaying
- **Solution**: Confirm the bucket is set to public
- **Solution**: Check the image URL format
- **Solution**: Verify CORS settings if needed

### Debug Commands

Check bucket configuration:
```sql
SELECT * FROM storage.buckets WHERE id = 'avatars';
```

List uploaded files:
```sql
SELECT * FROM storage.objects WHERE bucket_id = 'avatars';
```

Check user authentication:
```sql
SELECT auth.uid();
```

## 7. Security Considerations

- **File Size Limits**: Set to 5MB to prevent abuse
- **MIME Type Restrictions**: Only allow image formats
- **User Isolation**: Users can only access their own files
- **Public Access**: Profile pictures are publicly viewable (required for display)

## 8. Production Considerations

- Consider implementing image optimization/compression
- Set up CDN for better performance
- Monitor storage usage and costs
- Implement cleanup for deleted user accounts
- Consider adding virus scanning for uploaded files

## 9. Backup and Recovery

- Supabase automatically backs up your storage
- For additional safety, consider periodic exports
- Document your storage policies for disaster recovery

## Next Steps

After completing this setup:
1. Test the profile editing functionality thoroughly
2. Consider adding image cropping/editing features
3. Implement profile picture deletion when users delete accounts
4. Add analytics to monitor upload success rates
