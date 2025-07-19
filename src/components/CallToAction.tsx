'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ShoppingBag, Heart, Share2 } from 'lucide-react'

export function CallToAction() {
  const urgentActions = [
    {
      icon: ShoppingBag,
      title: '立即購買手工皂',
      description: '每一次購買都直接幫助慈善機構',
      buttonText: '馬上購買',
      href: 'https://famistore.famiport.com.tw/users/3278142',
      urgent: true,
      impact: '100% 收益捐贈'
    },
    {
      icon: Heart,
      title: '直接捐款支持',
      description: '幫助我們擴大環保教育影響力',
      buttonText: '了解捐款',
      href: '/support',
      urgent: true,
      impact: '支持更多家庭'
    },
    {
      icon: Share2,
      title: '分享我們的使命',
      description: '在社群媒體分享，擴大影響力',
      buttonText: '立即分享',
      href: '#share',
      urgent: true,
      impact: '觸及更多人'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            我現在如何幫助？
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            每一個行動都能創造改變。選擇最適合您的方式，立即開始幫助我們！
          </p>
        </motion.div>

        {/* Action Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {urgentActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 ${
                action.urgent ? 'ring-2 ring-green-500 ring-opacity-50' : ''
              }`}
            >
              {action.urgent && action.title === '立即購買手工皂' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    最推薦
                  </span>
                </div>
              )}

              <motion.div
                className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  action.urgent ? 'bg-green-100' : 'bg-gray-100'
                } group-hover:scale-110 transition-transform`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <action.icon className={`w-8 h-8 ${
                  action.urgent ? 'text-green-600' : 'text-gray-600'
                }`} />
              </motion.div>

              <motion.h3
                className="text-xl font-semibold text-gray-900 mb-3 text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
              >
                {action.title}
              </motion.h3>

              <motion.p
                className="text-gray-600 mb-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                {action.description}
              </motion.p>

              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                viewport={{ once: true }}
              >
                <motion.span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    action.urgent
                      ? 'bg-green-50 text-green-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {action.impact}
                </motion.span>
              </motion.div>

              <div className="text-center">
                <Button
                  variant={action.urgent ? 'primary' : 'outline'}
                  className="w-full"
                  asChild
                >
                  {action.href.startsWith('http') ? (
                    <a href={action.href} target="_blank" rel="noopener noreferrer">
                      {action.buttonText}
                    </a>
                  ) : action.href === '#share' ? (
                    <button onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'High School Soap Lab - 環保手工皂慈善組織',
                          text: '支持高中學生製作環保手工皂，為慈善事業籌款！',
                          url: window.location.href
                        })
                      } else {
                        navigator.clipboard.writeText(window.location.href)
                        alert('網址已複製到剪貼簿！')
                      }
                    }}>
                      {action.buttonText}
                    </button>
                  ) : (
                    <Link href={action.href}>
                      {action.buttonText}
                    </Link>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Encouragement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="text-center bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <motion.h3
            className="text-2xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            每一個小行動都很重要
          </motion.h3>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            無論您選擇哪種方式支持我們，都在為環境保護和社會關懷貢獻力量。
            讓我們一起創造更美好的世界！
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
