'use client'

import { motion } from 'framer-motion'
import { Leaf, Heart, Users, Recycle } from 'lucide-react'

export function Mission() {
  const values = [
    {
      icon: Leaf,
      title: '環保友善',
      description: '我們所有的手工皂都使用天然、永續的成分製作，對您的肌膚和環境都很溫和。'
    },
    {
      icon: Heart,
      title: '慈善影響',
      description: '每一次購買都直接支持當地慈善機構和社區倡議，為我們的世界帶來真正的改變。'
    },
    {
      icon: Users,
      title: '學生主導',
      description: '完全由充滿熱忱的高中學生經營，學習創業精神、化學知識和社會責任。'
    },
    {
      icon: Recycle,
      title: '永續發展',
      description: '我們使用可生物分解的包裝和永續的生產方法，以減少對環境的影響。'
    }
  ]

  return (
    <section className="py-20 bg-white">
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
            我們的使命與價值觀
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我們相信創造的產品不僅能清潔您的身體，也能為清潔我們的世界做出貢獻。
            每一塊手工皂都代表著我們對永續發展、慈善事業和學生賦權的承諾。
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors"
              >
                <value.icon className="w-8 h-8 text-green-600" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            「製作清潔環保手工皂，為地球和世界創造更美好的未來。」
          </h3>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            這不僅僅是我們的標語，更是我們的承諾。我們選擇的每一種成分、
            遵循的每一個過程，以及捐贈的每一分錢，都反映了我們對創造正面改變的承諾。
            我們不只是在製作手工皂，我們正在創造改變。
          </p>
        </motion.div>
      </div>
    </section>
  )
}
