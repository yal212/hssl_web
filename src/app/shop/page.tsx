'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Star, ShoppingCart, Search } from 'lucide-react'
import {
  fadeInUp,
  fadeInDown,
  staggerContainer,
  staggerItem,
  floating,
  colorTheme
} from '@/lib/animations'

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
      <div className={`min-h-screen ${colorTheme.primary.light} py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${colorTheme.primary.border} mx-auto`}></div>
            <p className="mt-4 text-gray-600">Loading our amazing soaps...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-green-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={fadeInDown}
          initial="initial"
          animate="animate"
          className="text-center mb-20"
        >
          <motion.div
            className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${colorTheme.primary.gradient} rounded-2xl mx-auto mb-8 shadow-lg relative overflow-hidden`}
            variants={floating}
            initial="initial"
            animate="animate"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
            <div className="w-16 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center relative z-10">
              <span className={`${colorTheme.primary.text} font-bold text-lg`}>皂</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            我們的環保
            <motion.span
              className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent block`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              手工皂
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            用愛心和天然成分手工製作。每一次購買都支持我們的慈善使命，
            幫助創造一個更清潔、更環保的世界。
          </motion.p>
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
                className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
                className={`px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
              </select>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showOutOfStock}
                  onChange={(e) => setShowOutOfStock(e.target.checked)}
                  className={`mr-2 rounded border-gray-300 ${colorTheme.primary.text} focus:ring-emerald-500`}
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
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={staggerItem}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Card hover variant="elevated" className="h-full flex flex-col group overflow-hidden bg-cream/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-0 flex-1">
                    {/* Product Image */}
                    <div className={`relative h-56 bg-gradient-to-br ${colorTheme.primary.gradient} overflow-hidden`}>
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/30"></div>
                        <div className="absolute top-8 right-6 w-4 h-4 rounded-full bg-white/40"></div>
                        <div className="absolute bottom-6 left-8 w-6 h-6 rounded-full bg-white/25"></div>
                        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20"></div>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-28 h-20 bg-white rounded-xl shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative overflow-hidden"
                          whileHover={{ rotate: 5, scale: 1.15 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          <span className={`${colorTheme.primary.text} font-bold text-lg relative z-10`}>
                            {product.name.split(' ').map(word => word[0]).join('')}
                          </span>
                        </motion.div>
                      </div>

                      <div className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-bold ${colorTheme.primary.text} shadow-lg`}>
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
                      <div className="flex items-start justify-between mb-4">
                        <h3 className={`text-xl font-bold text-gray-900 group-hover:${colorTheme.primary.text} transition-colors duration-200`}>
                          {product.name}
                        </h3>
                        <motion.div
                          className={`flex items-center ${colorTheme.accent.light} px-3 py-1.5 rounded-lg shadow-sm`}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Star className={`w-4 h-4 ${colorTheme.accent.bg} fill-current`} />
                          <span className={`text-sm font-medium ${colorTheme.accent.text} ml-1`}>4.9</span>
                        </motion.div>
                      </div>

                      <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                        {product.description}
                      </p>

                      {/* Benefits */}
                      {product.benefits && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {product.benefits.split(',').slice(0, 3).map((benefit, idx) => (
                            <motion.span
                              key={idx}
                              className={`px-3 py-1.5 ${colorTheme.primary.light} ${colorTheme.primary.text} text-xs font-medium rounded-full border ${colorTheme.primary.border} hover:bg-emerald-100 transition-colors duration-200`}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              {benefit.trim()}
                            </motion.span>
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
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          variants={fadeInDown}
          initial="initial"
          animate="animate"
          className={`mt-20 bg-gradient-to-r ${colorTheme.primary.gradient} rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden`}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-24 h-24 rounded-full border-2 border-white/30"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/20"></div>
            <div className="absolute top-1/2 right-12 w-8 h-8 rounded-full bg-white/30"></div>
          </div>

          <div className="relative z-10">
            <motion.h3
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              每一次購買都創造改變
            </motion.h3>
            <motion.p
              className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              當您購買我們的手工皂時，您不僅獲得了優質產品，更支持了學生創業家，
              並為我們社區的慈善事業做出貢獻。
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button size="lg" variant="secondary" className={`bg-white ${colorTheme.primary.text} hover:${colorTheme.primary.light}`}>
                了解我們的使命
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm">
                聯絡我們
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
