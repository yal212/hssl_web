export type NewsCategory = 
  | 'general'
  | 'events'
  | 'achievements'
  | 'announcements'
  | 'workshops'
  | 'partnerships'

export interface NewsItem {
  id: string
  title: string
  content: string
  excerpt?: string
  author_id: string
  published: boolean
  featured: boolean
  category: NewsCategory
  tags: string[]
  image_url?: string
  content_images?: string[]
  content_videos?: string[]
  published_at?: string
  created_at: string
  updated_at: string
  // Joined data from profiles table
  author?: {
    id: string
    full_name?: string
    avatar_url?: string
  }
}

export interface NewsFilters {
  category?: NewsCategory
  tags?: string[]
  featured?: boolean
  published?: boolean
  search?: string
  dateFrom?: string
  dateTo?: string
}

export interface NewsPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface NewsResponse {
  data: NewsItem[]
  pagination: NewsPagination
}

export interface CreateNewsItem {
  title: string
  content: string
  excerpt?: string
  category: NewsCategory
  tags: string[]
  image_url?: string
  content_images?: string[]
  content_videos?: string[]
  featured?: boolean
  published?: boolean
}

export interface UpdateNewsItem extends Partial<CreateNewsItem> {
  id: string
}

export const NEWS_CATEGORIES: { value: NewsCategory; label: string; color: string }[] = [
  { value: 'general', label: '一般消息', color: 'bg-gray-100 text-gray-800' },
  { value: 'events', label: '活動消息', color: 'bg-blue-100 text-blue-800' },
  { value: 'achievements', label: '成就獲獎', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'announcements', label: '重要公告', color: 'bg-red-100 text-red-800' },
  { value: 'workshops', label: '工作坊', color: 'bg-green-100 text-green-800' },
  { value: 'partnerships', label: '合作夥伴', color: 'bg-purple-100 text-purple-800' },
]

export const DEFAULT_NEWS_FILTERS: NewsFilters = {
  published: true
}

export const NEWS_PAGE_SIZE = 12
