'use client'

import { motion } from 'framer-motion'
import {
  Heart,
  Leaf,
  GraduationCap,
  Users,
  Shield,
  Building,
  BookOpen
} from 'lucide-react'
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
    <section className="py-20 bg-cream">
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
            <Leaf className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            這個學生團體
            <motion.span
              className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent block`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              在做什麼？
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
              High School Soap Lab 團隊是由跨校高中生組成，自2021年以來，
              結合科學、環保與社會關懷，將高中生的科學技能發揮作為學子的社會影響力，
              營造人與地球永續共好的目標
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
                  className={`w-20 h-20 bg-gradient-to-br ${colorTheme.primary.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative overflow-hidden`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Leaf className="w-10 h-10 text-white relative z-10" />
                </motion.div>
                <motion.h3
                  className={`text-xl font-bold text-gray-900 mb-4 group-hover:${colorTheme.primary.text} transition-colors duration-200`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  環境層面
                </motion.h3>
                <motion.p
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  解決市售清潔劑疑慮與過期油循環再生，實現雙重淨零減廢
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
                  <Heart className="w-10 h-10 text-white relative z-10" />
                </motion.div>
                <motion.h3
                  className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors duration-200"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  社會層面
                </motion.h3>
                <motion.p
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  弱勢教育服務、資金籌款與企業ESG合作，創造社會共好
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
                  className={`w-20 h-20 bg-gradient-to-br ${colorTheme.accent.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative overflow-hidden`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <GraduationCap className="w-10 h-10 text-white relative z-10" />
                </motion.div>
                <motion.h3
                  className={`text-xl font-bold text-gray-900 mb-4 group-hover:${colorTheme.accent.text} transition-colors duration-200`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  高中生自我成長
                </motion.h3>
                <motion.p
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  落實108課綱精神，培養社會影響力與豐富高中歷程
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
          className="bg-cream rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-24 h-24 rounded-full border-2 border-emerald-300"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-emerald-300"></div>
            <div className="absolute top-1/2 right-12 w-8 h-8 rounded-full bg-teal-300"></div>
          </div>

          <div className="relative z-10">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-green-900 mb-6 leading-tight"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              為什麼這很重要？
              <motion.span
                className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent block`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                
              </motion.span>
            </motion.h2>
            <div className="max-w-4xl mx-auto">
              <motion.p
                className="text-xl md:text-2xl text-green-800 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                viewport={{ once: true }}
              >
                生活中的方便與便宜常常隱藏著更高的成本。市售清潔劑含有對環境有害的化學物質，
                而我們透過廢油回收製皂，提供天然環保的替代方案，同時創造社會正面影響。
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
                  className="bg-cream/90 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <motion.h3
                      className={`text-xl font-bold text-green-900 group-hover:${colorTheme.primary.text} transition-colors duration-200`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      環境保護
                    </motion.h3>
                  </div>
                  <motion.p
                    className="text-green-700 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    減少塑膠微粒與化學污染，推動循環經濟與永續生活方式
                  </motion.p>
                </motion.div>
                <motion.div
                  variants={staggerItem}
                  className="bg-cream/90 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-red-600" />
                    </div>
                    <motion.h3
                      className={`text-xl font-bold text-green-900 group-hover:${colorTheme.accent.text} transition-colors duration-200`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      社會關懷
                    </motion.h3>
                  </div>
                  <motion.p
                    className="text-green-700 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    為喜樂園等弱勢機構提供教育服務與資金援助，創造社會正面改變
                  </motion.p>
                </motion.div>
                <motion.div
                  variants={staggerItem}
                  className="bg-cream/90 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <motion.h3
                      className={`text-xl font-bold text-green-900 group-hover:${colorTheme.accent.text} transition-colors duration-200`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      教育價值
                    </motion.h3>
                  </div>
                  <motion.p
                    className="text-green-700 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    落實108課綱自發、互動、共好精神，培養學生環保意識與實作能力
                  </motion.p>
                </motion.div>
                <motion.div
                  variants={staggerItem}
                  className="bg-cream/90 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Building className="w-6 h-6 text-purple-600" />
                    </div>
                    <motion.h3
                      className={`text-xl font-bold text-green-900 group-hover:${colorTheme.accent.text} transition-colors duration-200`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      ESG合作
                    </motion.h3>
                  </div>
                  <motion.p
                    className="text-green-700 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    與企業合作響應ESG精神，透過皂顧佳工房進行義賣，達到三方共好
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
