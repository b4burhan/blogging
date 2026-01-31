import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Check, Mail, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { products, blogPosts, useCart } from '@/context/CartContext'
import { toast } from 'sonner'

const testimonials = [
  { id: 1, name: 'Sarah Mitchell', role: 'Interior Designer', quote: 'Lumina has become my go-to for both inspiration and quality products. The attention to detail is remarkable.', avatar: 'SM' },
  { id: 2, name: 'James Chen', role: 'Creative Director', quote: 'The blog content is thoughtfully curated, and the shop products never disappoint. A truly premium experience.', avatar: 'JC' },
  { id: 3, name: 'Emma Wilson', role: 'Lifestyle Blogger', quote: 'I love how Lumina combines beautiful storytelling with products that actually enhance daily life.', avatar: 'EW' },
]

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [email, setEmail] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    setIsVisible(true)
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success('Welcome to the family! Check your inbox for a confirmation.')
      setEmail('')
    }
  }

  const featuredProducts = products.slice(0, 4)
  const featuredPosts = blogPosts.slice(0, 3)

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#f4f4f4]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className={`space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black font-['Montserrat'] leading-tight">
                  Welcome to <span className="text-[#007fff]">Lumina</span>
                </h1>
              </div>
              <p className={`text-xl text-[#5c5c5c] max-w-lg transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Discover stories that inspire, products that elevate your everyday life. Curated content and quality goods for modern living.
              </p>
              <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Link to="/blog">
                  <Button className="bg-[#007fff] hover:bg-[#0066cc] text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#007fff]/30">
                    Explore Blog
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
                    Visit Shop
                  </Button>
                </Link>
              </div>
            </div>
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src="/images/hero-image.jpg" alt="Lumina Lifestyle" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#007fff]/10 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-[#007fff]" />
                  </div>
                  <div>
                    <p className="font-bold text-black">4.9/5</p>
                    <p className="text-sm text-gray-500">Customer Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#f4f4f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img src="/images/hero-image.jpg" alt="Why Choose Us" className="w-full h-auto object-cover" />
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-black font-['Montserrat'] mb-4">Why Choose Us</h2>
                <p className="text-lg text-[#5c5c5c]">We're committed to delivering excellence in every story we tell and every product we create.</p>
              </div>
              <div className="space-y-6">
                {[
                  { icon: Check, title: 'Curated Content', description: 'Handpicked stories that matter to you' },
                  { icon: Check, title: 'Quality Products', description: 'Crafted with attention to every detail' },
                  { icon: Check, title: 'Fast Shipping', description: 'Delivered to your door in 2-3 days' },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-500 hover:translate-x-2">
                    <div className="w-10 h-10 bg-[#007fff]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-[#007fff]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black mb-1">{feature.title}</h3>
                      <p className="text-[#5c5c5c]">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black font-['Montserrat'] mb-4">Latest from the Blog</h2>
            <p className="text-lg text-[#5c5c5c] max-w-2xl mx-auto">Stories, insights, and inspiration for modern living</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                <Link to={`/blog/${post.slug}`}>
                  <div className="relative overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-black hover:bg-[#007fff] hover:text-white transition-colors">{post.category}</Badge>
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#007fff] transition-colors line-clamp-2">{post.title}</h3>
                  </Link>
                  <p className="text-[#5c5c5c] line-clamp-2 mb-4">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-[#007fff] font-semibold group-hover:gap-3 transition-all">
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/blog">
              <Button variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
                View All Posts
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-[#f4f4f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black font-['Montserrat'] mb-4">Shop Our Collection</h2>
            <p className="text-lg text-[#5c5c5c] max-w-2xl mx-auto">Curated products for modern living</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                <Link to={`/shop/${product.slug}`}>
                  <div className="relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </Link>
                <div className="p-6">
                  <span className="text-sm text-[#007fff] font-medium">{product.category}</span>
                  <Link to={`/shop/${product.slug}`}>
                    <h3 className="text-lg font-bold text-black mt-1 hover:text-[#007fff] transition-colors">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-2xl font-bold text-black">${product.price}</p>
                    <Button 
                      onClick={() => addToCart(product)}
                      size="sm"
                      className="bg-[#007fff] hover:bg-[#0066cc] text-white rounded-full"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="outline" className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black font-['Montserrat'] mb-4">What Our Readers Say</h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-600 ease-out" style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-[#f4f4f4] rounded-3xl p-8 md:p-12 text-center">
                      <div className="w-16 h-16 bg-[#007fff] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                        {testimonial.avatar}
                      </div>
                      <p className="text-xl md:text-2xl text-black mb-6 italic">"{testimonial.quote}"</p>
                      <p className="font-bold text-black">{testimonial.name}</p>
                      <p className="text-[#5c5c5c]">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button 
              onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#007fff] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#007fff] hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === testimonialIndex ? 'bg-[#007fff] w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-[#f4f4f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-black font-['Montserrat'] mb-4">Stay in the Loop</h2>
            <p className="text-lg text-[#5c5c5c] mb-8">Subscribe to our newsletter for the latest stories, product drops, and exclusive offers.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-[#007fff] focus:ring-[#007fff] transition-all"
                  required
                />
              </div>
              <Button type="submit" className="bg-[#007fff] hover:bg-[#0066cc] text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#007fff]/30">
                Subscribe
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
            <p className="text-sm text-gray-500 mt-4">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage
