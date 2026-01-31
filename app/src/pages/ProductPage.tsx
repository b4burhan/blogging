import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, ShoppingCart, Check, Truck, Shield, RotateCcw, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getProductBySlug, getProductReviews, products, type Review, useCart } from '@/context/CartContext'
import { toast } from 'sonner'

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const product = getProductBySlug(slug || '')
  const reviews = getProductReviews(product?.id || 0)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  
  // Review form state
  const [newReview, setNewReview] = useState('')
  const [reviewerName, setReviewerName] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [allReviews, setAllReviews] = useState<Review[]>(reviews)

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Product Not Found</h1>
          <p className="text-gray-500 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/shop">
            <Button className="bg-[#007fff] hover:bg-[#0066cc]">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Shop
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  // Get related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReview.trim() || !reviewerName.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    const review: Review = {
      id: Date.now(),
      author: reviewerName,
      rating: reviewRating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      content: newReview,
      avatar: reviewerName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
    }

    setAllReviews([review, ...allReviews])
    setNewReview('')
    setReviewerName('')
    setReviewRating(5)
    toast.success('Review submitted successfully!')
  }

  const averageRating = allReviews.length > 0 
    ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
    : product.rating

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Breadcrumb */}
      <section className="pt-28 pb-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#007fff]">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-[#007fff]">Shop</Link>
            <span>/</span>
            <span className="text-black">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <Badge className="absolute top-4 left-4 bg-[#007fff]">{product.category}</Badge>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-black font-['Montserrat'] mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(Number(averageRating)) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-gray-500">{averageRating} ({allReviews.length || product.reviewCount} reviews)</span>
                </div>
              </div>

              <p className="text-4xl font-bold text-[#007fff]">${product.price}</p>

              <p className="text-lg text-[#5c5c5c] leading-relaxed">{product.description}</p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Truck className="w-6 h-6 text-[#007fff]" />
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-sm text-gray-500">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Shield className="w-6 h-6 text-[#007fff]" />
                  <div>
                    <p className="font-medium">2 Year Warranty</p>
                    <p className="text-sm text-gray-500">Full coverage</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <RotateCcw className="w-6 h-6 text-[#007fff]" />
                  <div>
                    <p className="font-medium">30 Day Returns</p>
                    <p className="text-sm text-gray-500">Hassle-free</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Check className="w-6 h-6 text-[#007fff]" />
                  <div>
                    <p className="font-medium">In Stock</p>
                    <p className="text-sm text-gray-500">Ready to ship</p>
                  </div>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center border-2 border-gray-200 rounded-full">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-l-full transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-r-full transition-colors"
                  >
                    +
                  </button>
                </div>
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#007fff] hover:bg-[#0066cc] text-white py-6 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#007fff]/30"
                >
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  Add to Cart - ${product.price * quantity}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-[#f4f4f4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black font-['Montserrat'] mb-8">
            Customer Reviews ({allReviews.length})
          </h2>

          {/* Review Stats */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-5xl font-bold text-black">{averageRating}</p>
                <div className="flex text-yellow-400 justify-center my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(Number(averageRating)) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <p className="text-gray-500">{allReviews.length} reviews</p>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = allReviews.filter(r => r.rating === star).length
                  const percentage = allReviews.length > 0 ? (count / allReviews.length) * 100 : 0
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="w-8 text-sm">{star}★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-sm text-gray-500">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Write a Review */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
            <h3 className="text-xl font-bold text-black mb-4">Write a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center transition-all hover:border-[#007fff]"
                    >
                      <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <Textarea
                  placeholder="Share your experience with this product..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className="w-full min-h-[120px]"
                />
              </div>
              <Button type="submit" className="bg-[#007fff] hover:bg-[#0066cc] text-white px-6 py-3 rounded-full">
                <Send className="mr-2 w-4 h-4" />
                Submit Review
              </Button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {allReviews.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review!</p>
            ) : (
              allReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#007fff] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-bold text-black">{review.author}</span>
                          <span className="text-sm text-gray-500 ml-3">{review.date}</span>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-[#5c5c5c]">{review.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black font-['Montserrat'] mb-8">
              You May Also Like
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                  <Link to={`/shop/${relatedProduct.slug}`}>
                    <div className="relative overflow-hidden">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name} 
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <span className="text-sm text-[#007fff] font-medium">{relatedProduct.category}</span>
                    <Link to={`/shop/${relatedProduct.slug}`}>
                      <h3 className="text-lg font-bold text-black mt-1 hover:text-[#007fff] transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(relatedProduct.rating) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({relatedProduct.reviewCount})</span>
                    </div>
                    <p className="text-2xl font-bold text-black mt-4">${relatedProduct.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

export default ProductPage
