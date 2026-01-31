import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { products, categories, useCart } from '@/context/CartContext'

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [showFilters, setShowFilters] = useState(false)
  const { addToCart } = useCart()

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesCategory && matchesSearch && matchesPrice
  })

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#007fff]/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-black font-['Montserrat'] mb-4">
              Shop Our Collection
            </h1>
            <p className="text-xl text-[#5c5c5c] max-w-2xl mx-auto">
              Curated products for modern living
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#007fff] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Search and Filter Toggle */}
            <div className="flex gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-[#007fff] focus:ring-[#007fff] transition-all"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={`rounded-full px-4 ${showFilters ? 'bg-[#007fff] text-white border-[#007fff]' : ''}`}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Price Filter */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-2xl animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Price Range</span>
                <button 
                  onClick={() => setPriceRange([0, 200])}
                  className="text-sm text-[#007fff] hover:underline"
                >
                  Reset
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-500">Min: ${priceRange[0]}</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-[#007fff]"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-500">Max: ${priceRange[1]}</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#007fff]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-500">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            {(selectedCategory !== 'All' || searchQuery || priceRange[0] > 0 || priceRange[1] < 200) && (
              <button
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                  setPriceRange([0, 200])
                }}
                className="text-sm text-[#007fff] hover:underline flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear all filters
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No products found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                  setPriceRange([0, 200])
                }}
                variant="outline" 
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                  <Link to={`/shop/${product.slug}`}>
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge className="bg-white text-black text-lg px-4 py-2">Out of Stock</Badge>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-6">
                    <span className="text-sm text-[#007fff] font-medium">{product.category}</span>
                    <Link to={`/shop/${product.slug}`}>
                      <h3 className="text-lg font-bold text-black mt-1 hover:text-[#007fff] transition-colors">
                        {product.name}
                      </h3>
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
                        disabled={!product.inStock}
                        size="sm"
                        className="bg-[#007fff] hover:bg-[#0066cc] text-white rounded-full disabled:opacity-50"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ShopPage
