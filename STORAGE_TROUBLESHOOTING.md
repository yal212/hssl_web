# Storage Upload Fix - Row-Level Security Policy Error

## 🚨 **IMMEDIATE FIX REQUIRED**

You're getting this error because Supabase storage buckets need proper Row-Level Security (RLS) policies to allow file uploads.

### **Error Message:**
```
StorageApiError: new row violates row-level security policy
```

## 🔧 **Quick Fix (Do This Now):**

1. **Open your Supabase Dashboard**
2. **Go to SQL Editor**
3. **Copy and paste the entire content of `fix-storage-rls-immediate.sql`**
4. **Click "Run"**

This will:
- ✅ Create all required storage buckets
- ✅ Set up proper RLS policies for uploads
- ✅ Add the content_videos column to your database
- ✅ Allow authenticated users to upload files

## 📋 **What the Fix Does:**

### Storage Buckets Created:
- `avatars` - For profile pictures (5MB limit)
- `news-images` - For news images (10MB limit) 
- `news-videos` - For news videos (50MB limit)

### RLS Policies Created:
- **Upload**: Authenticated users can upload files
- **Read**: Public can view files
- **Update**: Authenticated users can update files
- **Delete**: Authenticated users can delete files

## 🧪 **Test After Running the Fix:**

1. **Refresh your news editing page**
2. **Try uploading an image or video**
3. **Should work without errors**

## 🔍 **If Still Having Issues:**

### Check Supabase Settings:
1. **Authentication** - Make sure you're logged in as an admin
2. **Storage** - Verify buckets exist in Storage tab
3. **SQL Editor** - Check if the script ran without errors

### Common Issues:
- **Not logged in** - Make sure you're authenticated
- **Wrong permissions** - User must be admin to upload news media
- **File too large** - Check file size limits (images: 10MB, videos: 50MB)

## 📞 **Still Need Help?**

If the fix doesn't work:
1. Check the browser console for detailed error messages
2. Verify your Supabase project settings
3. Make sure your `.env.local` has correct Supabase credentials

## ✅ **Success Indicators:**

After running the fix, you should see:
- ✅ No more "row-level security policy" errors
- ✅ Upload progress bars working
- ✅ Image/video previews appearing
- ✅ Files successfully saved to Supabase storage
