import api from './api'
import type { ProductCategory, Product, ProductReview, ApiResponse } from '@/types'

// Shop API Service
export const shopApi = {
  // Categories
  getCategories: async (): Promise<ProductCategory[]> => {
    const response = await api.get('/shop/categories/')
    console.log("Categories response:", response.data)
    return response.data

  },

  // Products
  getProducts: async (params?: {
    category_slug?: string
    min_price?: number
    max_price?: number
    in_stock?: boolean
    search?: string
    ordering?: string
    page?: number
  }): Promise<ApiResponse<Product>> => {
    const response = await api.get('/shop/products/', { params })
    return response.data
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    const response = await api.get('/shop/products/featured/')
    return response.data
  },

  getProductBySlug: async (slug: string): Promise<Product> => {
    const response = await api.get(`/shop/products/${slug}/`)
    return response.data
  },

  // Reviews
  getReviews: async (productSlug: string): Promise<ProductReview[]> => {
    const response = await api.get(`/shop/products/${productSlug}/reviews/`)
    return response.data
  },

  createReview: async (productSlug: string, data: {
    author_name: string
    rating: number
    title: string
    content: string
  }): Promise<ProductReview> => {
    const response = await api.post(`/shop/products/${productSlug}/reviews/`, data)
    return response.data
  },
}
