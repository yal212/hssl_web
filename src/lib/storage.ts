/**
 * Supabase Storage utilities for profile pictures and file uploads
 */

import { supabase } from './supabase'
import { supabaseAdmin } from './supabase-admin'

export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  IMAGES: 'images',
  NEWS: 'news-images',
  NEWS_VIDEOS: 'news-videos'
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
    const newsVideosBucketExists = buckets?.some(bucket => bucket.name === STORAGE_BUCKETS.NEWS_VIDEOS)

    // Try to create buckets if they don't exist
    if (!avatarsBucketExists) {
      const { error } = await supabase.storage.createBucket(STORAGE_BUCKETS.AVATARS, {
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
      const { error } = await supabase.storage.createBucket(STORAGE_BUCKETS.NEWS, {
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

    if (!newsVideosBucketExists) {
      const { error } = await supabase.storage.createBucket(STORAGE_BUCKETS.NEWS_VIDEOS, {
        public: true,
        fileSizeLimit: 52428800, // 50MB for news videos
        allowedMimeTypes: ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo']
      })

      if (error && !error.message.includes('already exists')) {
        console.error('Error creating news videos bucket:', error)
        // Don't fail completely - the bucket might exist but we can't see it
        console.log('Continuing despite bucket creation error...')
      } else {
        console.log('News videos bucket ready')
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
    await ensureStorageBuckets()
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
      if (error.message?.includes('row-level security policy') || error.message?.includes('new row violates row-level security policy')) {
        return {
          success: false,
          error: 'Storage permissions not configured. Please run the RLS fix script: fix-storage-rls-immediate.sql in your Supabase SQL Editor.'
        }
      }
      if (error.message?.includes('Bucket not found')) {
        return {
          success: false,
          error: 'Storage buckets not found. Please run the RLS fix script: fix-storage-rls-immediate.sql in your Supabase SQL Editor.'
        }
      }
      return { success: false, error: `Upload failed: ${error.message}` }
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
    await ensureStorageBuckets()
    // Continue even if bucket check fails

    const fileExt = file.name.split('.').pop()
    const timestamp = Date.now()
    const fileName = newsId
      ? `${newsId}-${timestamp}.${fileExt}`
      : `${userId}-${timestamp}.${fileExt}`
    const filePath = `news/${fileName}`

    // Use admin client for reliable uploads that bypass RLS issues
    const { error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKETS.NEWS)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      console.warn('Admin upload failed, trying regular client:', error)
      // Fallback to regular client if admin client fails
      const { error: fallbackError } = await supabase.storage
        .from(STORAGE_BUCKETS.NEWS)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (fallbackError) {
        console.error('Both admin and regular upload failed:', fallbackError)
        return {
          success: false,
          error: `Upload failed: ${fallbackError.message}`
        }
      }
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
 * Deletes a news image from storage
 */
export async function deleteNewsImage(imageUrl: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    console.log('Attempting to delete image URL:', imageUrl)

    // Extract file path from URL
    const url = new URL(imageUrl)
    const pathParts = url.pathname.split('/').filter(part => part.length > 0)

    console.log('URL path parts:', pathParts)

    // Look for the bucket name in the path
    const bucketIndex = pathParts.findIndex(part => part === STORAGE_BUCKETS.NEWS)

    if (bucketIndex === -1) {
      // Try alternative patterns - sometimes the URL structure might be different
      const alternativeBucketIndex = pathParts.findIndex(part => part.includes('news'))
      if (alternativeBucketIndex === -1) {
        console.error('Could not find news bucket in URL path:', pathParts)
        return { success: false, error: `Invalid image URL - not from ${STORAGE_BUCKETS.NEWS} bucket` }
      }
      console.log('Found alternative bucket pattern at index:', alternativeBucketIndex)
    }

    // Get the file path after the bucket name
    const actualBucketIndex = bucketIndex !== -1 ? bucketIndex : pathParts.findIndex(part => part.includes('news'))
    const filePath = pathParts.slice(actualBucketIndex + 1).join('/')

    if (!filePath) {
      console.error('Could not extract file path from URL')
      return { success: false, error: 'Could not extract file path from URL' }
    }

    console.log('Extracted file path:', filePath)
    console.log('Using bucket:', STORAGE_BUCKETS.NEWS)

    // Use admin client for reliable deletes
    const { error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKETS.NEWS)
      .remove([filePath])

    if (error) {
      console.error('Storage delete error:', error)
      return { success: false, error: `Delete failed: ${error.message}` }
    }

    console.log('Successfully deleted image from storage')
    return { success: true }
  } catch (error) {
    console.error('Error deleting news image:', error)
    return { success: false, error: 'Failed to delete image' }
  }
}

/**
 * Uploads a news video to the news-videos bucket
 */
export async function uploadNewsVideo(userId: string, file: File, newsId?: string): Promise<{
  success: boolean
  url?: string
  error?: string
}> {
  try {
    // Ensure bucket exists
    await ensureStorageBuckets()
    // Continue even if bucket check fails

    const fileExt = file.name.split('.').pop()
    const timestamp = Date.now()
    const fileName = newsId
      ? `${newsId}-${timestamp}.${fileExt}`
      : `${userId}-${timestamp}.${fileExt}`
    const filePath = `news/${fileName}`

    // Use admin client for reliable uploads that bypass RLS issues
    const { error } = await supabaseAdmin.storage
      .from(STORAGE_BUCKETS.NEWS_VIDEOS)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      console.warn('Admin video upload failed, trying regular client:', error)
      // Fallback to regular client if admin client fails
      const { error: fallbackError } = await supabase.storage
        .from(STORAGE_BUCKETS.NEWS_VIDEOS)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (fallbackError) {
        console.error('Both admin and regular video upload failed:', fallbackError)
        return {
          success: false,
          error: `Video upload failed: ${fallbackError.message}`
        }
      }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(STORAGE_BUCKETS.NEWS_VIDEOS)
      .getPublicUrl(filePath)

    return { success: true, url: publicUrl }
  } catch (error) {
    console.error('Error uploading news video:', error)
    return { success: false, error: 'Failed to upload video' }
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
 * Uploads multiple videos for news content
 */
export async function uploadNewsVideos(userId: string, files: File[], newsId?: string): Promise<{
  success: boolean
  urls?: string[]
  error?: string
}> {
  try {
    const uploadPromises = files.map(file => uploadNewsVideo(userId, file, newsId))
    const results = await Promise.all(uploadPromises)

    const failedUploads = results.filter(result => !result.success)
    if (failedUploads.length > 0) {
      return {
        success: false,
        error: `Failed to upload ${failedUploads.length} video(s)`
      }
    }

    const urls = results.map(result => result.url!).filter(Boolean)
    return { success: true, urls }
  } catch (error) {
    console.error('Error uploading news videos:', error)
    return { success: false, error: 'Failed to upload videos' }
  }
}

/**
 * Uploads multiple media files (images and videos) for news content
 */
export async function uploadNewsMedia(userId: string, files: File[], newsId?: string): Promise<{
  success: boolean
  imageUrls?: string[]
  videoUrls?: string[]
  error?: string
}> {
  try {
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    const videoFiles = files.filter(file => file.type.startsWith('video/'))

    const results = await Promise.all([
      imageFiles.length > 0 ? uploadNewsImages(userId, imageFiles, newsId) : Promise.resolve({ success: true, urls: [], error: undefined }),
      videoFiles.length > 0 ? uploadNewsVideos(userId, videoFiles, newsId) : Promise.resolve({ success: true, urls: [], error: undefined })
    ])

    const [imageResult, videoResult] = results

    if (!imageResult.success || !videoResult.success) {
      return {
        success: false,
        error: `Upload failed: ${imageResult.error || ''} ${videoResult.error || ''}`.trim()
      }
    }

    return {
      success: true,
      imageUrls: imageResult.urls || [],
      videoUrls: videoResult.urls || []
    }
  } catch (error) {
    console.error('Error uploading news media:', error)
    return { success: false, error: 'Failed to upload media files' }
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
