import api, { API_BASE_URL } from './api'
import type { Category, BlogPost, Comment, ApiResponse } from '@/types'

// Blog API Service
export const blogApi = {
  // Categories
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/blog/categories/')
    console.log('API Response - Categories:', response.data) // <-- log here
    return response.data
  },

  // Blog Posts
  getPosts: async (params?: {
    category_slug?: string
    search?: string
    ordering?: string
    page?: number
  }): Promise<ApiResponse<BlogPost>> => {
    const response = await api.get('/blog/posts/', { params })
    console.log('API Response - Posts:', response.data) // <-- log here
    return response.data
  },

  getFeaturedPosts: async (): Promise<BlogPost[]> => {
    const response = await api.get('/blog/posts/featured/')
    console.log('API Response - Featured Posts:', response.data) // <-- log here
    return response.data
  },

  getPostBySlug: async (slug: string): Promise<BlogPost> => {
    const response = await api.get(`/blog/posts/${slug}/`)
    console.log(`API Response - Post (${slug}):`, response.data) // <-- log here
    return response.data
  },

  // Comments
  getComments: async (postSlug: string): Promise<Comment[]> => {
    const response = await api.get(`/blog/posts/${postSlug}/comments/`)
    console.log(`API Response - Comments (${postSlug}):`, response.data) // <-- log here
    return response.data
  },

  createComment: async (postSlug: string, data: {
    author_name: string
    author_email: string
    content: string
  }): Promise<Comment> => {
    const response = await api.post(`/blog/posts/${postSlug}/comments/`, data)
    console.log(`API Response - Create Comment (${postSlug}):`, response.data) // <-- log here
    return response.data
  },

  // Newsletter
  subscribeNewsletter: async (email: string): Promise<void> => {
    const response = await api.post('/blog/newsletter/subscribe/', { email })
    console.log(`API Response - Newsletter Subscribe (${email}):`, response.data) // <-- log here
  },
}

// Get full image URL
export const getImageUrl = (path: string | null): string => {
  if (!path) return '/images/placeholder.jpg'
  if (path.startsWith('http')) return path
  return `${API_BASE_URL.replace('/api', '')}${path}`
}
