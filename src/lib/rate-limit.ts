/**
 * Simple rate limiting implementation for Next.js API routes
 * Uses in-memory storage for rate limiting tracking
 */

interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
}

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory storage for rate limiting
// In production, consider using Redis or similar for distributed systems
const rateLimitStore = new Map<string, RateLimitEntry>()

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

/**
 * Rate limiting function for API routes
 */
export function rateLimit(config: RateLimitConfig) {
  return (identifier: string): { success: boolean; limit: number; remaining: number; resetTime: number } => {
    const now = Date.now()
    const windowStart = now
    const windowEnd = windowStart + config.windowMs

    const entry = rateLimitStore.get(identifier)

    if (!entry || now > entry.resetTime) {
      // First request or window expired, create new entry
      rateLimitStore.set(identifier, {
        count: 1,
        resetTime: windowEnd
      })
      
      return {
        success: true,
        limit: config.maxRequests,
        remaining: config.maxRequests - 1,
        resetTime: windowEnd
      }
    }

    if (entry.count >= config.maxRequests) {
      // Rate limit exceeded
      return {
        success: false,
        limit: config.maxRequests,
        remaining: 0,
        resetTime: entry.resetTime
      }
    }

    // Increment count
    entry.count++
    rateLimitStore.set(identifier, entry)

    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - entry.count,
      resetTime: entry.resetTime
    }
  }
}

/**
 * Get client IP address from request
 */
export function getClientIP(request: Request): string {
  // Try to get real IP from headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  // Fallback to a default identifier
  return 'unknown'
}

/**
 * Pre-configured rate limiters for different use cases
 */
export const rateLimiters = {
  // Strict rate limiting for admin operations
  admin: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 50 // 50 requests per 15 minutes
  }),
  
  // General API rate limiting
  api: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100 // 100 requests per 15 minutes
  }),
  
  // Strict rate limiting for authentication
  auth: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 10 // 10 requests per 15 minutes
  })
}
