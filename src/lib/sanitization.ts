/**
 * Input sanitization utilities for user-generated content
 */

import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHTML(html: string): string {
  if (!html || typeof html !== 'string') {
    return ''
  }

  // Configure DOMPurify for safe HTML
  const config = {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'a', 'img'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'target', 'rel'
    ],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'textarea'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style'],
    KEEP_CONTENT: true,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    RETURN_DOM_IMPORT: false,
    SANITIZE_DOM: true,
    WHOLE_DOCUMENT: false,
    IN_PLACE: false
  }

  return DOMPurify.sanitize(html, config)
}

/**
 * Sanitize plain text input
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== 'string') {
    return ''
  }

  // Remove any HTML tags and decode HTML entities
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .trim()
}

/**
 * Validate and sanitize email addresses
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return ''
  }

  // Basic email validation and sanitization
  const sanitized = email.toLowerCase().trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  return emailRegex.test(sanitized) ? sanitized : ''
}

/**
 * Validate and sanitize URLs
 */
export function sanitizeURL(url: string): string {
  if (!url || typeof url !== 'string') {
    return ''
  }

  try {
    const urlObj = new URL(url)
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return ''
    }
    
    return urlObj.toString()
  } catch {
    return ''
  }
}

/**
 * Sanitize file names
 */
export function sanitizeFileName(fileName: string): string {
  if (!fileName || typeof fileName !== 'string') {
    return ''
  }

  // Remove dangerous characters and normalize
  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace unsafe chars with underscore
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .replace(/^_+|_+$/g, '') // Remove leading/trailing underscores
    .substring(0, 255) // Limit length
}

/**
 * Validate and sanitize numeric input
 */
export function sanitizeNumber(value: unknown, min?: number, max?: number): number | null {
  const num = Number(value)
  
  if (isNaN(num) || !isFinite(num)) {
    return null
  }
  
  if (min !== undefined && num < min) {
    return null
  }
  
  if (max !== undefined && num > max) {
    return null
  }
  
  return num
}

/**
 * Comprehensive input sanitization for news content
 */
export function sanitizeNewsContent(content: {
  title?: string
  content?: string
  excerpt?: string
  category?: string
  tags?: string[]
  image_url?: string
  content_images?: string[]
  content_videos?: string[]
}): {
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  image_url: string
  content_images: string[]
  content_videos: string[]
} {
  return {
    title: sanitizeText(content.title || '').substring(0, 200),
    content: sanitizeHTML(content.content || ''),
    excerpt: sanitizeText(content.excerpt || '').substring(0, 500),
    category: sanitizeText(content.category || '').substring(0, 50),
    tags: Array.isArray(content.tags)
      ? content.tags.map(tag => sanitizeText(tag).substring(0, 30)).filter(Boolean)
      : [],
    image_url: sanitizeURL(content.image_url || ''),
    content_images: Array.isArray(content.content_images)
      ? content.content_images.map(url => sanitizeURL(url)).filter(Boolean)
      : [],
    content_videos: Array.isArray(content.content_videos)
      ? content.content_videos.map(url => sanitizeURL(url)).filter(Boolean)
      : []
  }
}

/**
 * Sanitize user profile data
 */
export function sanitizeUserProfile(profile: {
  full_name?: string
  bio?: string
  avatar_url?: string
}): {
  full_name: string
  bio: string
  avatar_url: string
} {
  return {
    full_name: sanitizeText(profile.full_name || '').substring(0, 100),
    bio: sanitizeText(profile.bio || '').substring(0, 500),
    avatar_url: sanitizeURL(profile.avatar_url || '')
  }
}
