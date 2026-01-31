import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

// API Base URL - Change this to your Django backend URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && originalRequest) {
      const refreshToken = localStorage.getItem('refresh_token')
      
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          })
          
          const { access } = response.data
          localStorage.setItem('access_token', access)
          
          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${access}`
          return axios(originalRequest)
        } catch (refreshError) {
          // Refresh failed, logout user
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          window.location.href = '/'
          return Promise.reject(refreshError)
        }
      }
    }
    
    // Handle other errors
    const errorMessage = (error.response?.data as any)?.detail || 
                        (error.response?.data as any)?.error || 
                        'Something went wrong'
    
    if (error.response?.status !== 401) {
      toast.error(errorMessage)
    }
    
    return Promise.reject(error)
  }
)

export default api
