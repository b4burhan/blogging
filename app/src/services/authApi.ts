import api, { API_BASE_URL } from './api'
import type { User } from '@/types'

// Auth API Service
export const authApi = {
  // Login
  login: async (email: string, password: string): Promise<{
    access: string
    refresh: string
    user: User
  }> => {
    // Get tokens
    const tokenResponse = await api.post('/auth/token/', { email, password })
    const { access, refresh } = tokenResponse.data
    
    // Store tokens
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
    
    // Get user profile
    const userResponse = await api.get('/auth/profile/', {
      headers: { Authorization: `Bearer ${access}` }
    })
    
    return {
      access,
      refresh,
      user: userResponse.data
    }
  },

  // Register
  register: async (data: {
    username: string
    email: string
    password: string
    password_confirm: string
    first_name?: string
    last_name?: string
  }): Promise<{ user: User; message: string }> => {
    const response = await api.post('/auth/register/', data)
    return response.data
  },

  // Get Profile
  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile/')
    return response.data
  },

  // Update Profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.patch('/auth/profile/', data)
    return response.data
  },

  // Change Password
  changePassword: async (data: {
    old_password: string
    new_password: string
    new_password_confirm: string
  }): Promise<{ message: string }> => {
    const response = await api.post('/auth/change-password/', data)
    return response.data
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  },

  // Check if authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('access_token')
  },
}
