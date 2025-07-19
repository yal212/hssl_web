'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Star, ShoppingCart, Search } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string | null
  ingredients: string | null
  benefits: string | null
  in_stock: boolean
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name')
  const [showOutOfStock, setShowOutOfStock] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name')

      if (error) {
        console.error('Error fetching products:', error)
      } else {
        setProducts(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => showOutOfStock || product.in_stock)
    .sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price
      }
      return a.name.localeCompare(b.name)
    })

  const handleAddToCart = (product: Product) => {
    // For now, just show an alert. In a real app, this would add to cart
    alert(`Added ${product.name} to cart! (This is a demo - no actual cart functionality yet)`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading our amazing soaps...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <div className="w-12 h-8 bg-white rounded-lg shadow-md flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">皂</span>
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance">
            我們的環保手工皂
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed text-pretty">
            用愛心和天然成分手工製作。每一次購買都支持我們的慈善使命，
            幫助創造一個更清潔、更環保的世界。
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search soaps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
              </select>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showOutOfStock}
                  onChange={(e) => setShowOutOfStock(e.target.checked)}
                  className="mr-2 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Show out of stock</span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">
              {searchTerm ? 'No products found matching your search.' : 'No products available at the moment.'}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover variant="elevated" className="h-full flex flex-col group overflow-hidden">
                  <CardContent className="p-0 flex-1">
                    {/* Product Image */}
                    <div className="relative h-56 bg-gradient-to-br from-green-200 via-green-300 to-green-400 overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/30"></div>
                        <div className="absolute top-8 right-6 w-4 h-4 rounded-full bg-white/40"></div>
                        <div className="absolute bottom-6 left-8 w-6 h-6 rounded-full bg-white/25"></div>
                        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20"></div>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-28 h-20 bg-white rounded-xl shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          whileHover={{ rotate: 5 }}
                        >
                          <span className="text-green-600 font-bold text-lg">
                            {product.name.split(' ').map(word => word[0]).join('')}
                          </span>
                        </motion.div>
                      </div>

                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-bold text-green-600 shadow-lg">
                        NT${product.price.toFixed(0)}
                      </div>

                      {!product.in_stock && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                          <div className="bg-white rounded-lg px-4 py-2">
                            <span className="text-gray-900 font-semibold">暫時缺貨</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200">
                          {product.name}
                        </h3>
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-yellow-700 ml-1">4.9</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                        {product.description}
                      </p>

                      {/* Benefits */}
                      {product.benefits && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {product.benefits.split(',').slice(0, 3).map((benefit, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200 hover:bg-green-200 transition-colors duration-200"
                            >
                              {benefit.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <Button 
                      className="w-full" 
                      variant="primary"
                      disabled={!product.in_stock}
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Every Purchase Makes a Difference
          </h3>
          <p className="text-xl text-green-100 mb-6 max-w-3xl mx-auto">
            When you buy our soaps, you&apos;re not just getting a great product—you&apos;re supporting
            student entrepreneurs and contributing to charitable causes in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Learn About Our Mission
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
