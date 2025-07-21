'use client'

import { motion } from 'framer-motion'
import { Beaker, Recycle, Heart } from 'lucide-react'
import {
  fadeInUp,
  fadeInDown,
  staggerContainer,
  staggerItem,
  floating,
  colorTheme
} from '@/lib/animations'

export function Mission() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* What We Do */}
        <motion.div
          variants={fadeInDown}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${colorTheme.primary.gradient} rounded-full mb-8 shadow-lg`}
            variants={floating}
            initial="initial"
            animate="animate"
          >
            <Beaker className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            這個慈善組織
            <motion.span
              className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent block`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              做什麼？
            </motion.span>
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            >
              High School Soap Lab (HSSL) 是由高中學生主導的環保慈善組織，
              我們製作天然手工皂並將所有收益捐贈給慈善機構。
            </motion.p>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div
                variants={staggerItem}
                className="text-center group"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Beaker className="w-10 h-10 text-white relative z-10" />
                </motion.div>
                <motion.h3
                  className="text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-200"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  製作手工皂
                </motion.h3>
                <motion.p
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  使用天然成分製作環保手工皂
                </motion.p>
              </motion.div>
              <motion.div
                variants={staggerItem}
                className="text-center group"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Recycle className="w-10 h-10 text-white relative z-10" />
                </motion.div>
                <motion.h3
                  className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors duration-200"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  回收廢油
                </motion.h3>
                <motion.p
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  將過期油轉化為有用的清潔產品
                </motion.p>
              </motion.div>
              <motion.div
                variants={staggerItem}
                className="text-center group"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Heart className="w-10 h-10 text-white relative z-10" />
                </motion.div>
                <motion.h3
                  className="text-xl font-bold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors duration-200"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  慈善捐贈
                </motion.h3>
                <motion.p
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  將所有收益捐贈給需要幫助的機構
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Why It Matters */}
        <motion.div
          variants={fadeInDown}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className={`bg-gradient-to-r ${colorTheme.primary.light} to-emerald-50 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden`}
        >
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-24 h-24 rounded-full border-2 border-emerald-300"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-emerald-300"></div>
            <div className="absolute top-1/2 right-12 w-8 h-8 rounded-full bg-teal-300"></div>
          </div>

          <div className="relative z-10">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              為什麼這
              <motion.span
                className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent block`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                很重要？
              </motion.span>
            </motion.h2>
            <div className="max-w-4xl mx-auto">
              <motion.p
                className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                viewport={{ once: true }}
              >
                市售清潔劑含有對環境有害的化學物質，而我們的手工皂提供了天然、環保的替代方案。
                同時，我們將收益用於支持社會弱勢群體，創造雙重正面影響。
              </motion.p>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div
                  variants={staggerItem}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.h3
                    className={`text-xl font-bold text-gray-900 mb-4 group-hover:${colorTheme.primary.text} transition-colors duration-200`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    環境保護
                  </motion.h3>
                  <motion.p
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    減少化學污染，推廣永續生活方式
                  </motion.p>
                </motion.div>
                <motion.div
                  variants={staggerItem}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.h3
                    className="text-xl font-bold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors duration-200"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    社會關懷
                  </motion.h3>
                  <motion.p
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    支持弱勢群體，創造社會正面改變
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
