'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ShoppingCart } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Product {
  id: string
  name: string
  description: string
  price: number
  benefits: string | null
  in_stock: boolean
}

export function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('in_stock', true)
        .limit(1)

      if (error) {
        console.error('Error fetching products:', error)
        // Fallback to static data - Christmas soap
        setFeaturedProducts([
          {
            id: '1',
            name: '溫情聖誕手工皂（隨機出貨）',
            description: '商品詳情\n這些聖誕手工皂是有由康橋國際學校秀岡校區以及林口校區的師生製作的。手工皂義賣的所得將全數捐贈給財團法人忠義社會福利事業基金會\n助養勸募字號： 衛部救字第1121364529號\n\n商品成分\n橄欖油、椰子油、棕櫚油、甜杏仁油、芥花油、精油、NaOH',
            price: 175, // Average of $150-$200 range
            benefits: '天然成分, 手工製作',
            in_stock: true
          }
        ])
      } else {
        // If we have data from database, still show Christmas soap for now
        setFeaturedProducts([
          {
            id: '1',
            name: '溫情聖誕手工皂（隨機出貨）',
            description: '商品詳情\n這些聖誕手工皂是有由康橋國際學校秀岡校區以及林口校區的師生製作的。手工皂義賣的所得將全數捐贈給財團法人忠義社會福利事業基金會\n助養勸募字號： 衛部救字第1121364529號\n\n商品成分\n橄欖油、椰子油、棕櫚油、甜杏仁油、芥花油、精油、NaOH',
            price: 175, // Average of $150-$200 range
            benefits: '天然成分, 手工製作',
            in_stock: true
          }
        ])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            精選手工皂
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            探索我們最受歡迎的手工製作肥皂，每一塊都是用愛心和天然成分製作。
            每一次購買都支持我們的慈善使命。
          </p>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">載入精選產品中...</p>
          </div>
        ) : (
          <div className="flex justify-center mb-12">
            <div className="max-w-md w-full">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="h-full">
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative h-48 bg-gradient-to-br from-red-100 to-green-100 rounded-t-lg overflow-hidden">
                    <Image
                      src="/christmas_soap.png"
                      alt="溫情聖誕手工皂"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-green-600 shadow-lg">
                      $150-$200
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {product.name}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4 whitespace-pre-line text-sm">
                      {product.description}
                    </p>

                    {/* Benefits */}
                    {product.benefits && (
                      <div className="flex flex-wrap gap-2 mb-4">
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
                  <Button className="w-full" variant="primary" asChild>
                    <a href="https://famistore.famiport.com.tw/users/3278142" target="_blank" rel="noopener noreferrer">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      加入購物車
                    </a>
                  </Button>
                </CardFooter>
                </Card>
              </motion.div>
            ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" asChild>
            <a href="https://famistore.famiport.com.tw/users/3278142" target="_blank" rel="noopener noreferrer">
              查看所有產品
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
