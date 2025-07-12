/**
 * Supabase Storage utilities for profile pictures and file uploads
 */

import { supabase } from './supabase'

export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  IMAGES: 'images',
  NEWS: 'news-images'
} as const

/**
 * Ensures that required storage buckets exist
 */
export async function ensureStorageBuckets() {
  try {
    // Check if buckets exist
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()

    if (listError) {
      console.error('Error listing buckets:', listError)
      // Return success anyway - buckets might exist but we can't list them due to permissions
      return { success: true, error: 'Could not verify buckets, but continuing...' }
    }

    const avatarsBucketExists = buckets?.some(bucket => bucket.name === STORAGE_BUCKETS.AVATARS)
    const newsBucketExists = buckets?.some(bucket => bucket.name === STORAGE_BUCKETS.NEWS)

    // Try to create buckets if they don't exist
    if (!avatarsBucketExists) {
      const { data, error } = await supabase.storage.createBucket(STORAGE_BUCKETS.AVATARS, {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      })

      if (error && !error.message.includes('already exists')) {
        console.error('Error creating avatars bucket:', error)
        // Don't fail completely - the bucket might exist but we can't see it
        console.log('Continuing despite bucket creation error...')
      } else {
        console.log('Avatars bucket ready')
      }
    }

    if (!newsBucketExists) {
      const { data, error } = await supabase.storage.createBucket(STORAGE_BUCKETS.NEWS, {
        public: true,
        fileSizeLimit: 10485760, // 10MB for news images
        allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      })

      if (error && !error.message.includes('already exists')) {
        console.error('Error creating news bucket:', error)
        // Don't fail completely - the bucket might exist but we can't see it
        console.log('Continuing despite bucket creation error...')
      } else {
        console.log('News images bucket ready')
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Error ensuring storage buckets:', error)
    // Return success anyway to prevent blocking the app
    return { success: true, error: 'Storage setup incomplete, but app will continue' }
  }
}

/**
 * Uploads a file to the avatars bucket
 */
export async function uploadAvatar(userId: string, file: File): Promise<{
  success: boolean
  url?: string
  error?: string
}> {
  try {
    // Ensure bucket exists
    const bucketResult = await ensureStorageBuckets()
    // Continue even if bucket check fails

    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${Date.now()}.${fileExt}`
    const filePath = `profiles/${fileName}`

    // Upload file
    const { error } = await supabase.storage
      .from(STORAGE_BUCKETS.AVATARS)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      console.error('Upload error:', error)
      if (error.message?.includes('row-level security policy')) {
        return {
          success: false,
          error: 'Storage not configured. Please run the storage setup SQL script in your Supabase dashboard.'
        }
      }
      if (error.message?.includes('Bucket not found')) {
        return {
          success: false,
          error: 'Storage buckets not found. Please run the storage setup SQL script in your Supabase dashboard.'
        }
      }
      return { success: false, error: error.message }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(STORAGE_BUCKETS.AVATARS)
      .getPublicUrl(filePath)

    return { success: true, url: publicUrl }
  } catch (error) {
    console.error('Error uploading avatar:', error)
    return { success: false, error: 'Failed to upload image. Please check storage configuration.' }
  }
}

/**
 * Deletes an avatar file from storage
 */
export async function deleteAvatar(filePath: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKETS.AVATARS)
      .remove([filePath])

    if (error) {
      console.error('Delete error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error deleting avatar:', error)
    return { success: false, error: 'Failed to delete image' }
  }
}

/**
 * Uploads a news image to the news-images bucket
 */
export async function uploadNewsImage(userId: string, file: File, newsId?: string): Promise<{
  success: boolean
  url?: string
  error?: string
}> {
  try {
    // Ensure bucket exists
    const bucketResult = await ensureStorageBuckets()
    // Continue even if bucket check fails

    const fileExt = file.name.split('.').pop()
    const timestamp = Date.now()
    const fileName = newsId
      ? `${newsId}-${timestamp}.${fileExt}`
      : `${userId}-${timestamp}.${fileExt}`
    const filePath = `news/${fileName}`

    // Upload file
    const { error } = await supabase.storage
      .from(STORAGE_BUCKETS.NEWS)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      console.error('Upload error:', error)
      if (error.message?.includes('row-level security policy')) {
        return {
          success: false,
          error: 'Storage not configured. Please run the storage setup SQL script in your Supabase dashboard.'
        }
      }
      if (error.message?.includes('Bucket not found')) {
        return {
          success: false,
          error: 'Storage buckets not found. Please run the storage setup SQL script in your Supabase dashboard.'
        }
      }
      return { success: false, error: error.message }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(STORAGE_BUCKETS.NEWS)
      .getPublicUrl(filePath)

    return { success: true, url: publicUrl }
  } catch (error) {
    console.error('Error uploading news image:', error)
    return { success: false, error: 'Failed to upload image. Please check storage configuration.' }
  }
}

/**
 * Uploads multiple images for news content
 */
export async function uploadNewsImages(userId: string, files: File[], newsId?: string): Promise<{
  success: boolean
  urls?: string[]
  error?: string
}> {
  try {
    const uploadPromises = files.map(file => uploadNewsImage(userId, file, newsId))
    const results = await Promise.all(uploadPromises)

    const failedUploads = results.filter(result => !result.success)
    if (failedUploads.length > 0) {
      return {
        success: false,
        error: `Failed to upload ${failedUploads.length} image(s)`
      }
    }

    const urls = results.map(result => result.url!).filter(Boolean)
    return { success: true, urls }
  } catch (error) {
    console.error('Error uploading news images:', error)
    return { success: false, error: 'Failed to upload images' }
  }
}

/**
 * Deletes a news image from storage
 */
export async function deleteNewsImage(filePath: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKETS.NEWS)
      .remove([filePath])

    if (error) {
      console.error('Delete error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error deleting news image:', error)
    return { success: false, error: 'Failed to delete image' }
  }
}

/**
 * Gets the file path from a Supabase storage URL
 */
export function getFilePathFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)
    const pathMatch = urlObj.pathname.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)$/)
    return pathMatch ? pathMatch[1] : null
  } catch {
    return null
  }
}

/**
 * Validates if a URL is a valid Supabase storage URL
 */
export function isValidStorageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.pathname.includes('/storage/v1/object/public/')
  } catch {
    return false
  }
}

/**
 * Creates storage policies for the avatars bucket
 * This should be run once during setup
 */
export async function createStoragePolicies() {
  // Note: This would typically be done via SQL in the Supabase dashboard
  // or through the management API, not the client library
  console.log('Storage policies should be created in Supabase dashboard:')
  console.log(`
    -- Allow authenticated users to upload their own avatars
    CREATE POLICY "Users can upload their own avatar" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

    -- Allow authenticated users to update their own avatars
    CREATE POLICY "Users can update their own avatar" ON storage.objects
    FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

    -- Allow authenticated users to delete their own avatars
    CREATE POLICY "Users can delete their own avatar" ON storage.objects
    FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

    -- Allow public access to view avatars
    CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');
  `)
}
