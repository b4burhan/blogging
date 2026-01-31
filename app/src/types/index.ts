// Blog Types
export interface Category {
  id: number
  name: string
  slug: string
  description: string
  post_count: number
}

export interface Comment {
  id: number
  author_name: string
  content: string
  created_at: string
  initials: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  category: number
  category_name: string
  author_name: string
  author_avatar: string
  read_time: number
  comment_count: number
  views: number
  created_at: string
  published_at: string
  comments: Comment[]
}

// Shop Types
export interface ProductCategory {
  id: number
  name: string
  slug: string
  description: string
  image: string
  product_count: number
}

export interface ProductReview {
  id: number
  author_name: string
  rating: number
  title: string
  content: string
  created_at: string
  initials: string
}

export interface Product {
  id: number
  name: string
  slug: string
  short_description: string
  description: string
  price: number
  compare_price: number | null
  discount_percentage: number
  category: number
  category_name: string
  image: string
  images: { url: string; alt: string }[]
  sku: string
  weight: number | null
  in_stock: boolean
  stock_quantity: number
  average_rating: number
  review_count: number
  reviews: ProductReview[]
  is_featured: boolean
  created_at: string
}

// Order Types
export interface OrderItem {
  id: number
  product_name: string
  product_sku: string
  product_image: string
  price: number
  quantity: number
  total: number
}

export interface Order {
  id: number
  order_number: string
  full_name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip_code: string
  country: string
  status: string
  payment_status: string
  subtotal: number
  shipping_cost: number
  tax: number
  discount: number
  total: number
  items: OrderItem[]
  item_count: number
  created_at: string
  shipped_at: string | null
  delivered_at: string | null
}

// User Types
export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  phone: string
  avatar: string
  bio: string
  initials: string
  address: string
  city: string
  state: string
  zip_code: string
  country: string
  is_newsletter_subscribed: boolean
  created_at: string
}

// Cart Types
export interface CartItem extends Product {
  quantity: number
}

// API Response Types
export interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
