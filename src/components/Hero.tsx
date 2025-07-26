'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Sparkles, Leaf, Heart } from 'lucide-react'
import {
  fadeInUp,
  fadeInDown,
  staggerContainer,
  staggerItem,
  floating,
  colorTheme
} from '@/lib/animations'

export function Hero() {
  return (
    <section className={`relative bg-cream py-20 lg:py-32 overflow-hidden`}>
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-green-200/20 rounded-full blur-2xl"></div>
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-200 rounded-full opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            variants={fadeInDown}
            initial="initial"
            animate="animate"
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={`inline-flex items-center px-4 py-2 ${colorTheme.primary.light} ${colorTheme.primary.text} rounded-full text-sm font-medium mb-6`}
            >
              <motion.div
                variants={floating}
                initial="initial"
                animate="animate"
              >
                <Sparkles className="w-4 h-4 mr-2" />
              </motion.div>
              學生主導計畫
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-green-900 mb-6 leading-tight text-balance"
            >
              高中學生{' '}
              <motion.span
                className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                環保慈善
              </motion.span>{' '}
              <br className="hidden sm:block" />
              改變世界
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg sm:text-xl lg:text-2xl text-green-700 mb-8 max-w-2xl leading-relaxed text-pretty"
            >
              製作天然手工皂，回收廢油，將所有收益捐贈給慈善機構。

            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center sm:items-start"
            >
              <Button size="lg" asChild>
                <a href="https://famistore.famiport.com.tw/users/3278142" target="_blank" rel="noopener noreferrer">
                  購買我們的手工皂
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">
                  認識我們的團隊
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200"
            >
              {[
                { value: '500+', label: '手工皂銷售' },
                { value: '$2,500', label: '慈善募款' },
                { value: '100%', label: '環保友善' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="text-center lg:text-left group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`text-2xl font-bold ${colorTheme.primary.text} group-hover:scale-110 transition-transform duration-200`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform rotate-3">
              <motion.div
                whileHover={{ rotate: 0, scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className={`bg-gradient-to-br ${colorTheme.primary.gradient} rounded-xl p-8 text-white relative overflow-hidden`}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                    <Image
                      src="/hssl_profile.jpg"
                      alt="High School Soap Lab"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">
                  我們的使命
                </h3>
                <p className="text-center text-white/80">
                  創造永續產品，同時支持慈善事業並學習寶貴的創業技能。
                </p>
                <div className="flex justify-center mt-6">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            </div>

            {/* Enhanced floating elements */}
            <motion.div
              className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br ${colorTheme.accent.gradient} rounded-full flex items-center justify-center shadow-lg`}
              variants={floating}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.2, rotate: 15 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>

            <motion.div
              className={`absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br ${colorTheme.primary.gradient} rounded-full flex items-center justify-center shadow-lg`}
              animate={{ y: [10, -10, 10], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.2, rotate: -15 }}
            >
              <Leaf className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
