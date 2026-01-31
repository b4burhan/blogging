import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  slug: string
  inStock: boolean
  rating: number
  reviewCount: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface Review {
  id: number
  author: string
  rating: number
  date: string
  content: string
  avatar: string
}

export interface Comment {
  id: number
  author: string
  email: string
  content: string
  date: string
  avatar: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  date: string
  readTime: string
  author: string
  authorAvatar: string
  comments: Comment[]
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Products data
export const products: Product[] = [
  { 
    id: 1, 
    name: 'Ceramic Vase with Pampas', 
    slug: 'ceramic-vase-with-pampas',
    price: 89, 
    image: '/images/product-1.jpg', 
    category: 'Home Decor', 
    description: 'Handcrafted ceramic vase with natural pampas grass. Perfect for modern minimalist interiors. Each piece is uniquely crafted by skilled artisans.',
    inStock: true,
    rating: 4.8,
    reviewCount: 124
  },
  { 
    id: 2, 
    name: 'Leather Journal', 
    slug: 'leather-journal',
    price: 45, 
    image: '/images/product-2.jpg', 
    category: 'Stationery', 
    description: 'Premium leather-bound journal with brass clasp. 200 pages of high-quality acid-free paper perfect for writing, sketching, or journaling.',
    inStock: true,
    rating: 4.9,
    reviewCount: 89
  },
  { 
    id: 3, 
    name: 'Pour-Over Coffee Set', 
    slug: 'pour-over-coffee-set',
    price: 120, 
    image: '/images/product-3.jpg', 
    category: 'Kitchen', 
    description: 'Artisan coffee dripper with wooden stand and glass carafe. Brew the perfect cup of coffee every morning with this elegant set.',
    inStock: true,
    rating: 4.7,
    reviewCount: 156
  },
  { 
    id: 4, 
    name: 'Amber Scented Candle', 
    slug: 'amber-scented-candle',
    price: 38, 
    image: '/images/product-4.jpg', 
    category: 'Home Fragrance', 
    description: 'Luxury soy wax candle with oud and amber fragrance. 50-hour burn time. Creates a warm, inviting atmosphere in any room.',
    inStock: true,
    rating: 4.6,
    reviewCount: 203
  },
  { 
    id: 5, 
    name: 'Wireless Speaker', 
    slug: 'wireless-speaker',
    price: 149, 
    image: '/images/product-5.jpg', 
    category: 'Tech', 
    description: 'Minimalist Bluetooth speaker with 360-degree sound. 12-hour battery life and premium audio quality in a compact design.',
    inStock: true,
    rating: 4.5,
    reviewCount: 78
  },
  { 
    id: 6, 
    name: 'Glass Teapot', 
    slug: 'glass-teapot',
    price: 75, 
    image: '/images/product-6.jpg', 
    category: 'Kitchen', 
    description: 'Elegant glass teapot with bamboo handle and infuser. Perfect for brewing loose leaf teas. Heat-resistant borosilicate glass.',
    inStock: true,
    rating: 4.8,
    reviewCount: 112
  },
]

// Blog posts data
export const blogPosts: BlogPost[] = [
  { 
    id: 1, 
    title: 'The Art of Slow Mornings', 
    slug: 'the-art-of-slow-mornings',
    excerpt: 'Discover how to create a mindful morning routine that sets the tone for a productive and peaceful day.',
    content: `
      <p>In our fast-paced world, the concept of slow mornings has become a revolutionary act of self-care. It's about intentionally carving out time for yourself before the demands of the day take over.</p>
      
      <h3>Why Slow Mornings Matter</h3>
      <p>Research shows that how you start your day significantly impacts your productivity, mood, and overall well-being. A rushed morning often leads to increased stress levels throughout the day.</p>
      
      <h3>Creating Your Perfect Morning Ritual</h3>
      <p>Start by waking up 30 minutes earlier than usual. This extra time isn't for checking emails or scrolling social media—it's for activities that nourish your soul.</p>
      
      <p>Consider incorporating:</p>
      <ul>
        <li>Meditation or deep breathing exercises</li>
        <li>Journaling your thoughts and intentions</li>
        <li>Enjoying a cup of coffee or tea mindfully</li>
        <li>Light stretching or yoga</li>
        <li>Reading something inspiring</li>
      </ul>
      
      <h3>The Benefits You'll Experience</h3>
      <p>After implementing a slow morning routine, many people report feeling more centered, less anxious, and better prepared to handle daily challenges. It's not about perfection—it's about presence.</p>
      
      <p>Remember, your morning routine should be personal and flexible. What works for others might not work for you. Experiment and find what brings you joy and calm.</p>
    `,
    image: '/images/blog-1.jpg', 
    category: 'Lifestyle', 
    date: 'Jan 28, 2024', 
    readTime: '5 min read',
    author: 'Sarah Mitchell',
    authorAvatar: 'SM',
    comments: [
      { id: 1, author: 'Emma Wilson', email: 'emma@example.com', content: 'This is exactly what I needed to read! I\'ve been struggling with morning anxiety.', date: 'Jan 29, 2024', avatar: 'EW' },
      { id: 2, author: 'James Chen', email: 'james@example.com', content: 'Great tips! I started waking up 30 minutes earlier and it\'s made such a difference.', date: 'Jan 30, 2024', avatar: 'JC' },
    ]
  },
  { 
    id: 2, 
    title: 'Designing Your Perfect Workspace', 
    slug: 'designing-your-perfect-workspace',
    excerpt: 'Tips and inspiration for creating a home office that boosts creativity and focus.',
    content: `
      <p>Your workspace is more than just a desk and chair—it's the environment where ideas come to life. A well-designed workspace can significantly impact your productivity and creativity.</p>
      
      <h3>The Power of Natural Light</h3>
      <p>Position your desk near a window if possible. Natural light not only reduces eye strain but also improves mood and energy levels throughout the day.</p>
      
      <h3>Declutter for Clear Thinking</h3>
      <p>A cluttered space leads to a cluttered mind. Keep only essential items on your desk. Use organizers, shelves, and drawers to maintain a clean workspace.</p>
      
      <h3>Plants: Your Productivity Partners</h3>
      <p>Adding greenery to your workspace has been proven to reduce stress and increase productivity. Low-maintenance options like succulents or snake plants are perfect for beginners.</p>
      
      <h3>Personal Touches</h3>
      <p>Include items that inspire you—a favorite quote, artwork, or photos of loved ones. These personal touches make your workspace feel uniquely yours.</p>
      
      <p>Remember, the best workspace is one that works for you. Experiment with different setups until you find what helps you do your best work.</p>
    `,
    image: '/images/blog-2.jpg', 
    category: 'Design', 
    date: 'Jan 25, 2024', 
    readTime: '7 min read',
    author: 'Michael Torres',
    authorAvatar: 'MT',
    comments: []
  },
  { 
    id: 3, 
    title: 'Finding Balance Through Meditation', 
    slug: 'finding-balance-through-meditation',
    excerpt: 'A beginners guide to meditation and mindfulness practices for modern life.',
    content: `
      <p>Meditation isn't about emptying your mind or achieving some mystical state. It's simply about being present and observing your thoughts without judgment.</p>
      
      <h3>Starting Your Practice</h3>
      <p>You don't need special equipment or hours of free time. Start with just 5 minutes a day. Find a quiet spot, sit comfortably, and focus on your breath.</p>
      
      <h3>Common Misconceptions</h3>
      <p>Many people think they're "bad" at meditation because their mind wanders. This is completely normal! The practice is in noticing when your mind wanders and gently bringing it back.</p>
      
      <h3>Different Types of Meditation</h3>
      <ul>
        <li><strong>Mindfulness:</strong> Focusing on the present moment</li>
        <li><strong>Guided:</strong> Following a recorded meditation</li>
        <li><strong>Transcendental:</strong> Using a mantra</li>
        <li><strong>Body Scan:</strong> Focusing on physical sensations</li>
      </ul>
      
      <p>The key is consistency, not perfection. Even a few minutes daily can lead to significant improvements in stress levels and overall well-being.</p>
    `,
    image: '/images/blog-3.jpg', 
    category: 'Wellness', 
    date: 'Jan 22, 2024', 
    readTime: '6 min read',
    author: 'Lisa Park',
    authorAvatar: 'LP',
    comments: [
      { id: 1, author: 'David Brown', email: 'david@example.com', content: 'I\'ve been meditating for 2 weeks now and already feel less anxious. Thank you for this guide!', date: 'Jan 23, 2024', avatar: 'DB' },
    ]
  },
  { 
    id: 4, 
    title: 'The Power of Journaling', 
    slug: 'the-power-of-journaling',
    excerpt: 'How daily writing can transform your mindset and help you achieve your goals.',
    content: `
      <p>Journaling is one of the most powerful tools for self-discovery and personal growth. Putting pen to paper helps clarify thoughts, process emotions, and track progress.</p>
      
      <h3>Getting Started</h3>
      <p>Don't worry about writing perfectly. Your journal is for your eyes only. Start by writing about your day, your feelings, or things you're grateful for.</p>
      
      <h3>Different Journaling Methods</h3>
      <p><strong>Morning Pages:</strong> Write three pages of stream-of-consciousness thoughts first thing in the morning.</p>
      <p><strong>Gratitude Journal:</strong> List three things you're grateful for each day.</p>
      <p><strong>Goal Tracking:</strong> Write down your goals and track your progress.</p>
      
      <h3>The Benefits</h3>
      <p>Regular journaling can reduce stress, improve emotional intelligence, boost creativity, and help you achieve your goals faster.</p>
      
      <p>Find a beautiful journal that inspires you to write, and make it a daily habit. Your future self will thank you.</p>
    `,
    image: '/images/blog-4.jpg', 
    category: 'Productivity', 
    date: 'Jan 18, 2024', 
    readTime: '4 min read',
    author: 'Sarah Mitchell',
    authorAvatar: 'SM',
    comments: []
  },
  { 
    id: 5, 
    title: 'Cozy Reading Nook Ideas', 
    slug: 'cozy-reading-nook-ideas',
    excerpt: 'Create the perfect sanctuary for your reading sessions with these design tips.',
    content: `
      <p>Every book lover dreams of having a dedicated reading nook—a cozy corner where you can escape into different worlds through the pages of a book.</p>
      
      <h3>Choosing the Right Spot</h3>
      <p>Look for a quiet corner with good natural light. A window seat is ideal, but any corner can be transformed with the right elements.</p>
      
      <h3>Essential Elements</h3>
      <p><strong>Comfortable Seating:</strong> A plush armchair or a window seat with cushions.</p>
      <p><strong>Good Lighting:</strong> A reading lamp for evening sessions.</p>
      <p><strong>Side Table:</strong> For your tea, reading glasses, and current book.</p>
      <p><strong>Throw Blanket:</strong> For those cozy reading sessions.</p>
      
      <h3>Personal Touches</h3>
      <p>Add a small bookshelf nearby, some plants, and artwork that inspires you. Make it a space that invites you to sit down and read.</p>
      
      <p>The best reading nook is one that feels like a warm hug every time you settle in with a good book.</p>
    `,
    image: '/images/blog-5.jpg', 
    category: 'Home', 
    date: 'Jan 15, 2024', 
    readTime: '5 min read',
    author: 'Emma Wilson',
    authorAvatar: 'EW',
    comments: []
  },
  { 
    id: 6, 
    title: 'Healthy Morning Rituals', 
    slug: 'healthy-morning-rituals',
    excerpt: 'Nutritious breakfast ideas and wellness practices to start your day right.',
    content: `
      <p>They say breakfast is the most important meal of the day, and for good reason. What you eat in the morning sets the tone for your entire day.</p>
      
      <h3>Nutritious Breakfast Ideas</h3>
      <p><strong>Overnight Oats:</strong> Prepare the night before with oats, chia seeds, and your favorite fruits.</p>
      <p><strong>Avocado Toast:</strong> Whole grain bread with smashed avocado and a poached egg.</p>
      <p><strong>Smoothie Bowl:</strong> Blend frozen fruits with yogurt and top with granola.</p>
      
      <h3>Beyond Food</h3>
      <p>A healthy morning isn't just about what you eat. It's also about:</p>
      <ul>
        <li>Hydrating with water first thing</li>
        <li>Getting some movement or stretching</li>
        <li>Setting intentions for the day</li>
        <li>Avoiding screens for the first 30 minutes</li>
      </ul>
      
      <p>Small changes to your morning routine can lead to big improvements in your energy levels and overall health.</p>
    `,
    image: '/images/blog-6.jpg', 
    category: 'Wellness', 
    date: 'Jan 12, 2024', 
    readTime: '6 min read',
    author: 'Lisa Park',
    authorAvatar: 'LP',
    comments: []
  },
]

// Product reviews
export const productReviews: Record<number, Review[]> = {
  1: [
    { id: 1, author: 'Jessica M.', rating: 5, date: 'Jan 15, 2024', content: 'Absolutely beautiful! The quality exceeded my expectations. Perfect addition to my living room.', avatar: 'JM' },
    { id: 2, author: 'Robert K.', rating: 4, date: 'Jan 10, 2024', content: 'Great vase, looks exactly like the photos. Shipping was fast too.', avatar: 'RK' },
    { id: 3, author: 'Amanda L.', rating: 5, date: 'Dec 28, 2023', content: 'Love the minimalist design. Gets so many compliments!', avatar: 'AL' },
  ],
  2: [
    { id: 1, author: 'Thomas H.', rating: 5, date: 'Jan 20, 2024', content: 'The leather quality is amazing. This journal will last for years.', avatar: 'TH' },
    { id: 2, author: 'Maria G.', rating: 5, date: 'Jan 5, 2024', content: 'Beautiful craftsmanship. Makes journaling even more enjoyable.', avatar: 'MG' },
  ],
  3: [
    { id: 1, author: 'Chris P.', rating: 5, date: 'Jan 18, 2024', content: 'Best coffee I\'ve ever made at home. The design is stunning.', avatar: 'CP' },
    { id: 2, author: 'Sophie W.', rating: 4, date: 'Jan 8, 2024', content: 'Great quality, though a bit pricey. Worth it for coffee lovers.', avatar: 'SW' },
    { id: 3, author: 'Daniel R.', rating: 5, date: 'Dec 22, 2023', content: 'Perfect gift for my wife. She uses it every morning.', avatar: 'DR' },
  ],
  4: [
    { id: 1, author: 'Laura B.', rating: 5, date: 'Jan 22, 2024', content: 'The scent is heavenly! Fills the whole room.', avatar: 'LB' },
    { id: 2, author: 'Mark S.', rating: 4, date: 'Jan 12, 2024', content: 'Long lasting and smells great. Will buy again.', avatar: 'MS' },
  ],
  5: [
    { id: 1, author: 'Kevin Y.', rating: 4, date: 'Jan 16, 2024', content: 'Good sound quality and looks great on my desk.', avatar: 'KY' },
    { id: 2, author: 'Nina F.', rating: 5, date: 'Jan 3, 2024', content: 'Amazing sound for such a compact speaker!', avatar: 'NF' },
  ],
  6: [
    { id: 1, author: 'Helen Z.', rating: 5, date: 'Jan 19, 2024', content: 'Elegant and functional. Perfect for tea time.', avatar: 'HZ' },
    { id: 2, author: 'Peter D.', rating: 5, date: 'Jan 7, 2024', content: 'Beautiful design, love watching the tea steep.', avatar: 'PD' },
  ],
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    toast.success(`${product.name} added to cart`)
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
    toast.info('Item removed from cart')
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item))
  }

  const clearCart = () => {
    setCartItems([])
    toast.info('Cart cleared')
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

// Helper functions
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug)
export const getBlogPostBySlug = (slug: string) => blogPosts.find(b => b.slug === slug)
export const getProductReviews = (productId: number) => productReviews[productId] || []

export const categories = ['All', 'Home Decor', 'Stationery', 'Kitchen', 'Home Fragrance', 'Tech']
export const blogCategories = ['All', 'Lifestyle', 'Design', 'Wellness', 'Productivity', 'Home']
