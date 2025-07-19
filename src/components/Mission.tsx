'use client'

import { motion } from 'framer-motion'
import { Beaker, Recycle, Heart } from 'lucide-react'

export function Mission() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* What We Do */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            這個慈善組織做什麼？
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              High School Soap Lab (HSSL) 是由高中學生主導的環保慈善組織，
              我們製作天然手工皂並將所有收益捐贈給慈善機構。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <motion.div
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Beaker className="w-8 h-8 text-green-600" />
                </motion.div>
                <motion.h3
                  className="text-lg font-semibold text-gray-900 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  製作手工皂
                </motion.h3>
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  使用天然成分製作環保手工皂
                </motion.p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <motion.div
                  className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Recycle className="w-8 h-8 text-blue-600" />
                </motion.div>
                <motion.h3
                  className="text-lg font-semibold text-gray-900 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  回收廢油
                </motion.h3>
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  將過期油轉化為有用的清潔產品
                </motion.p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <motion.div
                  className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart className="w-8 h-8 text-red-600" />
                </motion.div>
                <motion.h3
                  className="text-lg font-semibold text-gray-900 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  慈善捐贈
                </motion.h3>
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  將所有收益捐贈給需要幫助的機構
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Why It Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            為什麼這很重要？
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              市售清潔劑含有對環境有害的化學物質，而我們的手工皂提供了天然、環保的替代方案。
              同時，我們將收益用於支持社會弱勢群體，創造雙重正面影響。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <motion.div
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <motion.h3
                  className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  環境保護
                </motion.h3>
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  減少化學污染，推廣永續生活方式
                </motion.p>
              </motion.div>
              <motion.div
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <motion.h3
                  className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  社會關懷
                </motion.h3>
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  支持弱勢群體，創造社會正面改變
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
