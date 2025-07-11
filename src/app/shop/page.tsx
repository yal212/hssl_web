'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Star, ShoppingCart, Filter, Search } from 'lucide-react'

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
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Eco-Friendly Soaps
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handcrafted with love and natural ingredients. Every purchase supports our charitable mission 
            and helps create a cleaner, greener world.
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
                <Card hover className="h-full flex flex-col">
                  <CardContent className="p-0 flex-1">
                    {/* Product Image */}
                    <div className="relative h-48 bg-gradient-to-br from-green-200 to-green-300 rounded-t-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
                          <span className="text-green-600 font-bold text-sm">
                            {product.name.split(' ').map(word => word[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-green-600">
                        ${product.price.toFixed(2)}
                      </div>
                      {!product.in_stock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {product.name}
                        </h3>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">4.9</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-sm">
                        {product.description}
                      </p>

                      {/* Benefits */}
                      {product.benefits && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {product.benefits.split(',').slice(0, 3).map((benefit, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
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
            When you buy our soaps, you're not just getting a great product—you're supporting 
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
