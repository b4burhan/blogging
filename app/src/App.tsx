import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { Toaster } from '@/components/ui/sonner'
import './App.css'

// Pages
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import CheckoutPage from './pages/CheckoutPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import ShippingPage from './pages/ShippingPage'
import FAQPage from './pages/FAQPage'
import TestApiPage from './pages/TestApiPage'

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white font-['Inter']">
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:slug" element={<ProductPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/test-api" element={<TestApiPage />} />
        </Routes>
      </div>
    </CartProvider>
  )
}

export default App
