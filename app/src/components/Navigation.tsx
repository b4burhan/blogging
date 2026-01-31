import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <span className="text-2xl font-bold text-black font-['Montserrat'] group-hover:text-[#007fff] transition-colors duration-300">
              Lumina
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-colors duration-300 group ${
                  isActive(link.path) ? 'text-[#007fff]' : 'text-black hover:text-[#007fff]'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#007fff] transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button 
              onClick={() => toast.info('Search coming soon!')}
              className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
            <button 
              onClick={() => toast.info('Account login coming soon!')}
              className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-[#007fff] text-white text-xs w-5 h-5 flex items-center justify-center p-0 animate-pulse">
                      {cartCount}
                    </Badge>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold font-['Montserrat']">Your Cart</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-[calc(100vh-120px)]">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center flex-1 text-center">
                      <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">Your cart is empty</p>
                      <p className="text-gray-400 text-sm mt-2">Add some items to get started</p>
                      <Button 
                        onClick={() => navigate('/shop')}
                        className="mt-6 bg-[#007fff] hover:bg-[#0066cc]"
                      >
                        Browse Shop
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-auto py-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                            <div className="flex-1">
                              <Link to={`/shop/${item.slug}`} className="font-semibold text-sm hover:text-[#007fff] transition-colors">
                                {item.name}
                              </Link>
                              <p className="text-[#007fff] font-bold">${item.price}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                                >
                                  <span className="sr-only">Decrease</span>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                                </button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                                >
                                  <span className="sr-only">Increase</span>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                </button>
                                <button 
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 pt-4 mt-auto">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="text-2xl font-bold">${cartTotal}</span>
                        </div>
                        <Button 
                          onClick={() => {
                            navigate('/checkout')
                          }}
                          className="w-full bg-[#007fff] hover:bg-[#0066cc] text-white py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-[1.02]"
                        >
                          Checkout
                        </Button>
                        <button 
                          onClick={clearCart}
                          className="w-full text-center text-gray-500 hover:text-red-500 mt-3 text-sm transition-colors"
                        >
                          Clear Cart
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-4 py-3 transition-colors duration-300 ${
                  isActive(link.path) ? 'text-[#007fff] bg-[#007fff]/5' : 'text-black hover:text-[#007fff] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
