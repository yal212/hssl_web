'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ShoppingBag, Heart, Sparkles } from 'lucide-react'
import { staggerContainer, staggerItem, colorTheme } from '@/lib/animations'

export function CTAStrip() {
  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-green-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-green-200/30 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-green-300/20 rounded-full"
          animate={{ rotate: -360, y: [0, -10, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Main CTA Message */}
          <motion.div
            variants={staggerItem}
            className="mb-12"
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-green-500 rounded-full mb-6 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            
            <h2 className="text-responsive-h3 font-bold text-green-900 mb-4">
              每一次購買 = 一塊慈善皂
            </h2>
            
            <p className="body-large text-green-700 max-w-3xl mx-auto">
              您的每一次支持都直接轉化為對社區的幫助。加入我們的環保使命，一起創造更美好的世界。
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div variants={staggerItem}>
              <Button size="lg" asChild>
                <a 
                  href="https://famistore.famiport.com.tw/users/3278142" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group"
                >
                  <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  購買手工皂
                </a>
              </Button>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Button variant="outline" size="lg" asChild>
                <Link href="/support" className="group">
                  <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  捐款我們
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Impact Stats */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-green-200"
          >
            {[
              { value: '100%', label: '收益捐贈', description: '所有利潤直接幫助慈善機構' },
              { value: '環保', label: '天然成分', description: '使用純天然、環保友善材料' },
              { value: '學生', label: '主導計畫', description: '由高中學生發起並執行' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="text-center group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl p-6 shadow-sm border border-green-200 group-hover:shadow-md group-hover:border-green-300 transition-all duration-300">
                  <div className={`text-3xl font-bold ${colorTheme.primary.text} mb-2 group-hover:scale-110 transition-transform duration-200`}>
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-green-800 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-green-600">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
