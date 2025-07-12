/**
 * Supabase Storage utilities for profile pictures and file uploads
 */

import { supabase } from './supabase'

export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  IMAGES: 'images'
} as const

/**
 * Ensures that required storage buckets exist
 */
export async function ensureStorageBuckets() {
  try {
    // Check if avatars bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error('Error listing buckets:', listError)
      return { success: false, error: listError.message }
    }

    const avatarsBucketExists = buckets?.some(bucket => bucket.name === STORAGE_BUCKETS.AVATARS)

    if (!avatarsBucketExists) {
      // Create avatars bucket
      const { data, error } = await supabase.storage.createBucket(STORAGE_BUCKETS.AVATARS, {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      })

      if (error) {
        console.error('Error creating avatars bucket:', error)
        return { success: false, error: error.message }
      }

      console.log('Created avatars bucket:', data)
    }

    return { success: true }
  } catch (error) {
    console.error('Error ensuring storage buckets:', error)
    return { success: false, error: 'Failed to setup storage buckets' }
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
    if (!bucketResult.success) {
      return { success: false, error: bucketResult.error }
    }

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
      return { success: false, error: error.message }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(STORAGE_BUCKETS.AVATARS)
      .getPublicUrl(filePath)

    return { success: true, url: publicUrl }
  } catch (error) {
    console.error('Error uploading avatar:', error)
    return { success: false, error: 'Failed to upload image' }
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
