import api from './api'
import type { Order, OrderItem } from '@/types'

// Order API Service
export const orderApi = {
  // Create Order (Checkout)
  createOrder: async (data: {
    first_name: string
    last_name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zip_code: string
    country: string
    card_number: string
    card_name: string
    expiry: string
    cvv: string
    items: {
      product_id: number
      product_name: string
      product_sku: string
      product_image: string
      price: number
      quantity: number
    }[]
  }): Promise<{ order: Order; message: string }> => {
    const response = await api.post('/orders/create/', data)
    return response.data
  },

  // Get User Orders
  getMyOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders/my-orders/')
    return response.data
  },

  // Get Order Details
  getOrderByNumber: async (orderNumber: string): Promise<Order> => {
    const response = await api.get(`/orders/${orderNumber}/`)
    return response.data
  },
}
