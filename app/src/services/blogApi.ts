import api, { API_BASE_URL } from './api'
import type { Category, BlogPost, Comment, ApiResponse } from '@/types'

// Blog API Service
export const blogApi = {
  // Categories
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/blog/categories/')
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
    return response.data
  },

  getFeaturedPosts: async (): Promise<BlogPost[]> => {
    const response = await api.get('/blog/posts/featured/')
    return response.data
  },

  getPostBySlug: async (slug: string): Promise<BlogPost> => {
    const response = await api.get(`/blog/posts/${slug}/`)
    return response.data
  },

  // Comments
  getComments: async (postSlug: string): Promise<Comment[]> => {
    const response = await api.get(`/blog/posts/${postSlug}/comments/`)
    return response.data
  },

  createComment: async (postSlug: string, data: {
    author_name: string
    author_email: string
    content: string
  }): Promise<Comment> => {
    const response = await api.post(`/blog/posts/${postSlug}/comments/`, data)
    return response.data
  },

  // Newsletter
  subscribeNewsletter: async (email: string): Promise<void> => {
    await api.post('/blog/newsletter/subscribe/', { email })
  },
}

// Get full image URL
export const getImageUrl = (path: string | null): string => {
  if (!path) return '/images/placeholder.jpg'
  if (path.startsWith('http')) return path
  return `${API_BASE_URL.replace('/api', '')}${path}`
}
