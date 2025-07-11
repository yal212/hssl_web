/**
 * Image handling utilities for profile picture uploads
 */

export interface ImageValidationResult {
  isValid: boolean
  error?: string
  file?: File
}

export interface ImageResizeOptions {
  maxWidth: number
  maxHeight: number
  quality: number
}

/**
 * Validates an image file for profile picture upload
 */
export function validateImageFile(file: File): ImageValidationResult {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Please upload a JPEG, PNG, or WebP image file.'
    }
  }

  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024 // 5MB in bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Image file size must be less than 5MB.'
    }
  }

  return {
    isValid: true,
    file
  }
}

/**
 * Resizes an image file to specified dimensions
 */
export function resizeImage(
  file: File, 
  options: ImageResizeOptions = { maxWidth: 400, maxHeight: 400, quality: 0.8 }
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img
      const { maxWidth, maxHeight } = options

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }

      // Set canvas dimensions
      canvas.width = width
      canvas.height = height

      // Draw and resize image
      ctx?.drawImage(img, 0, 0, width, height)

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            })
            resolve(resizedFile)
          } else {
            reject(new Error('Failed to resize image'))
          }
        },
        file.type,
        options.quality
      )
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    img.src = URL.createObjectURL(file)
  })
}

/**
 * Generates a unique filename for uploaded images
 */
export function generateImageFilename(userId: string, originalFilename: string): string {
  const timestamp = Date.now()
  const extension = originalFilename.split('.').pop()
  return `profile-${userId}-${timestamp}.${extension}`
}

/**
 * Creates a preview URL for an image file
 */
export function createImagePreview(file: File): string {
  return URL.createObjectURL(file)
}

/**
 * Cleans up a preview URL to prevent memory leaks
 */
export function cleanupImagePreview(previewUrl: string): void {
  URL.revokeObjectURL(previewUrl)
}

/**
 * Converts a file to base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to convert file to base64'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
  })
}

/**
 * Gets the public URL for a Supabase storage file
 */
export function getSupabaseImageUrl(bucketName: string, filePath: string, supabaseUrl: string): string {
  return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${filePath}`
}

/**
 * Extracts file path from a Supabase storage URL
 */
export function extractFilePathFromUrl(url: string): string | null {
  const match = url.match(/\/storage\/v1\/object\/public\/[^/]+\/(.+)$/)
  return match ? match[1] : null
}

/**
 * Image upload progress callback type
 */
export type UploadProgressCallback = (progress: number) => void

/**
 * Image upload error types
 */
export enum ImageUploadError {
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  RESIZE_FAILED = 'RESIZE_FAILED',
  UPLOAD_FAILED = 'UPLOAD_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR'
}

/**
 * Image upload result
 */
export interface ImageUploadResult {
  success: boolean
  url?: string
  error?: string
  errorType?: ImageUploadError
}
