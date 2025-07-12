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
      let query = supabase
        .from('posts')
        .select(`
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
        `, { count: 'exact' })

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
      const normalizedData = (data || []).map(item => ({
        ...item,
        excerpt: item.excerpt || null,
        category: item.category || 'general',
        tags: item.tags || [],
        featured: item.featured || false,
        image_url: item.image_url || null,
        published_at: item.published_at || item.created_at
      })) as NewsItem[]

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
        if (error.code === '42703') {
          throw new Error('Database schema needs to be updated. Please run the migration script.')
        }
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
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
      }

      const newsData = {
        ...newsItem,
        author_id: user.id,
        published_at: newsItem.published ? new Date().toISOString() : null
      }

      const { data, error } = await supabase
        .from('posts')
        .insert(newsData)
        .select(`
          *,
          author:profiles!posts_author_id_fkey(
            id,
            full_name,
            avatar_url
          )
        `)
        .single()

      if (error) {
        throw error
      }

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
      const { id, ...updateData } = newsItem
      
      // If publishing for the first time, set published_at
      if (updateData.published && !updateData.published_at) {
        updateData.published_at = new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('posts')
        .update(updateData)
        .eq('id', id)
        .select(`
          *,
          author:profiles!posts_author_id_fkey(
            id,
            full_name,
            avatar_url
          )
        `)
        .single()

      if (error) {
        throw error
      }

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
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deleting news item:', error)
      return false
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
