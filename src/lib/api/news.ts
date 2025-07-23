import { supabase } from '@/lib/supabase'
import {
  NewsItem,
  NewsFilters,
  NewsResponse,
  CreateNewsItem,
  UpdateNewsItem,
  NEWS_PAGE_SIZE,
  DEFAULT_NEWS_FILTERS
} from '@/lib/types/news'
import { getSafeSession } from '@/lib/auth-utils'

export class NewsAPI {
  /**
   * Fetch news items with filtering and pagination
   */
  static async getNews(
    filters: NewsFilters = DEFAULT_NEWS_FILTERS,
    page: number = 1,
    limit: number = NEWS_PAGE_SIZE
  ): Promise<NewsResponse> {
    try {
      // Try to select with content_images, fallback if column doesn't exist
      let selectFields = `
        id,
        title,
        content,
        published,
        created_at,
        updated_at,
        excerpt,
        category,
        tags,
        featured,
        image_url,
        published_at,
        author:profiles!posts_author_id_fkey(
          id,
          full_name,
          avatar_url
        )
      `

      // Try to include content_images and content_videos if they exist
      try {
        const testQuery = await supabase
          .from('posts')
          .select('content_images, content_videos')
          .limit(1)

        if (!testQuery.error) {
          selectFields = `
            id,
            title,
            content,
            published,
            created_at,
            updated_at,
            excerpt,
            category,
            tags,
            featured,
            image_url,
            content_images,
            content_videos,
            published_at,
            author:profiles!posts_author_id_fkey(
              id,
              full_name,
              avatar_url
            )
          `
        }
      } catch {
        // Try just content_images if content_videos doesn't exist
        try {
          const testQuery2 = await supabase
            .from('posts')
            .select('content_images')
            .limit(1)

          if (!testQuery2.error) {
            selectFields = `
              id,
              title,
              content,
              published,
              created_at,
              updated_at,
              excerpt,
              category,
              tags,
              featured,
              image_url,
              content_images,
              published_at,
              author:profiles!posts_author_id_fkey(
                id,
                full_name,
                avatar_url
              )
            `
          }
        } catch {
          // Neither column exists, use basic fields
        }
      }

      let query = supabase
        .from('posts')
        .select(selectFields, { count: 'exact' })

      // Apply filters
      if (filters.published !== undefined) {
        query = query.eq('published', filters.published)
      }

      if (filters.category) {
        query = query.eq('category', filters.category)
      }

      if (filters.featured !== undefined) {
        query = query.eq('featured', filters.featured)
      }

      if (filters.tags && filters.tags.length > 0) {
        query = query.overlaps('tags', filters.tags)
      }

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`)
      }

      if (filters.dateFrom) {
        query = query.gte('published_at', filters.dateFrom)
      }

      if (filters.dateTo) {
        query = query.lte('published_at', filters.dateTo)
      }

      // Apply pagination and ordering
      const from = (page - 1) * limit
      const to = from + limit - 1

      query = query
        .order('featured', { ascending: false })
        .order('published_at', { ascending: false })
        .order('created_at', { ascending: false })
        .range(from, to)

      const { data, error, count } = await query

      if (error) {
        console.error('Supabase error:', error)
        if (error.code === '42703') {
          throw new Error('Database schema needs to be updated. Please run the migration script.')
        }
        throw error
      }

      const totalPages = Math.ceil((count || 0) / limit)

      // Ensure all news items have required fields with defaults
      const normalizedData = (data || []).map((item) => {
        const newsItem = item as unknown as NewsItem
        return {
          id: newsItem.id,
          title: newsItem.title,
          content: newsItem.content,
          author_id: newsItem.author_id || null,
          excerpt: newsItem.excerpt || null,
          category: newsItem.category || 'general',
          tags: newsItem.tags || [],
          featured: newsItem.featured || false,
          image_url: newsItem.image_url || null,
          content_images: newsItem.content_images || [],
          published_at: newsItem.published_at || newsItem.created_at,
          created_at: newsItem.created_at,
          updated_at: newsItem.updated_at,
          published: newsItem.published,
          author: Array.isArray(newsItem.author) && newsItem.author.length > 0 ? newsItem.author[0] : null
        }
      }) as NewsItem[]

      return {
        data: normalizedData,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages
        }
      }
    } catch (error) {
      console.error('Error fetching news:', error)
      throw error
    }
  }

  /**
   * Get a single news item by ID
   */
  static async getNewsById(id: string): Promise<NewsItem | null> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:profiles!posts_author_id_fkey(
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('id', id)
        .single()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      if (!data) return null

      // Normalize the data with defaults
      const normalizedItem = {
        ...data,
        excerpt: data.excerpt || null,
        category: data.category || 'general',
        tags: data.tags || [],
        featured: data.featured || false,
        image_url: data.image_url || null,
        content_images: data.content_images || [], // Will be undefined if column doesn't exist
        content_videos: data.content_videos || [], // Will be undefined if column doesn't exist
        published_at: data.published_at || data.created_at
      } as NewsItem

      return normalizedItem
    } catch (error) {
      console.error('Error fetching news item:', error)
      return null
    }
  }

  /**
   * Get featured news items
   */
  static async getFeaturedNews(limit: number = 3): Promise<NewsItem[]> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:profiles!posts_author_id_fkey(
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('published', true)
        .eq('featured', true)
        .order('published_at', { ascending: false })
        .limit(limit)

      if (error) {
        throw error
      }

      return data as NewsItem[]
    } catch (error) {
      console.error('Error fetching featured news:', error)
      return []
    }
  }

  /**
   * Get recent news items
   */
  static async getRecentNews(limit: number = 5): Promise<NewsItem[]> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          author:profiles!posts_author_id_fkey(
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(limit)

      if (error) {
        throw error
      }

      return data as NewsItem[]
    } catch (error) {
      console.error('Error fetching recent news:', error)
      return []
    }
  }

  /**
   * Create a new news item (admin only)
   */
  static async createNews(newsItem: CreateNewsItem): Promise<NewsItem | null> {
    try {
      // Get user session for auth with safe session handling
      const { session, error: sessionError } = await getSafeSession()

      if (sessionError) {
        throw new Error('會話錯誤，請重新登入')
      }

      if (!session?.access_token) {
        throw new Error('用戶未登入或會話已過期，請重新登入')
      }

      // Use API route for reliable admin operations
      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(newsItem)
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 401) {
          throw new Error('認證失敗，請重新登入')
        } else if (response.status === 403) {
          throw new Error('權限不足，需要管理員權限')
        }
        throw new Error(errorData.error || 'Create failed')
      }

      const data = await response.json()
      return data as NewsItem
    } catch (error) {
      console.error('Error creating news item:', error)
      throw error
    }
  }

  /**
   * Update a news item (admin only)
   */
  static async updateNews(newsItem: UpdateNewsItem): Promise<NewsItem | null> {
    try {
      // Get user session for auth with safe session handling
      const { session, error: sessionError } = await getSafeSession()

      if (sessionError) {
        throw new Error('會話錯誤，請重新登入')
      }

      if (!session?.access_token) {
        throw new Error('用戶未登入或會話已過期，請重新登入')
      }

      // Use API route for reliable admin operations
      const response = await fetch('/api/admin/news', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(newsItem)
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 401) {
          throw new Error('認證失敗，請重新登入')
        } else if (response.status === 403) {
          throw new Error('權限不足，需要管理員權限')
        }
        throw new Error(errorData.error || 'Update failed')
      }

      const data = await response.json()
      return data as NewsItem
    } catch (error) {
      console.error('Error updating news item:', error)
      throw error
    }
  }

  /**
   * Delete a news item (admin only)
   */
  static async deleteNews(id: string): Promise<boolean> {
    try {

      // Add timeout to prevent hanging
      const deletePromise = supabase
        .from('posts')
        .delete()
        .eq('id', id)

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Delete operation timed out after 10 seconds')), 10000)
      )

      const { error } = await Promise.race([deletePromise, timeoutPromise]) as { error: Error | null }

      if (error) {
        throw new Error(`Delete failed: ${error.message}`)
      }

      return true
    } catch (error) {
      console.error('Error deleting news item:', error)
      throw error
    }
  }

  /**
   * Get all unique tags
   */
  static async getAllTags(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('tags')
        .eq('published', true)

      if (error) {
        throw error
      }

      const allTags = new Set<string>()
      data.forEach(item => {
        if (item.tags) {
          item.tags.forEach((tag: string) => allTags.add(tag))
        }
      })

      return Array.from(allTags).sort()
    } catch (error) {
      console.error('Error fetching tags:', error)
      return []
    }
  }
}
