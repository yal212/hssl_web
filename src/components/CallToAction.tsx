'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ShoppingBag, Share2, Sparkles } from 'lucide-react'
import {
  staggerContainer,
  staggerItem,
  colorTheme
} from '@/lib/animations'

export function CallToAction() {
  const urgentActions = [
    {
      icon: ShoppingBag,
      title: '立即購買手工皂',
      description: '每一次購買都直接幫助慈善機構',
      buttonText: '馬上購買',
      href: 'https://famistore.famiport.com.tw/users/3278142',
      urgent: true,
      impact: '支持環保使命'
    },
    // {
    //   icon: Heart,
    //   title: '直接捐款支持',
    //   description: '幫助我們擴大環保教育影響力',
    //   buttonText: '了解捐款',
    //   href: '/support',
    //   urgent: true,
    //   impact: '支持更多家庭'
    // },
    {
      icon: Share2,
      title: '追蹤我們的社群',
      description: '在各大社群平台上關注我們',
      buttonText: '立即分享',
      href: '#share',
      urgent: true,
      impact: '觸及更多人'
    }
  ]

  return (
    <section className={`py-24 lg:py-32 bg-cream relative overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-green-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${colorTheme.primary.gradient} rounded-full mb-8 shadow-lg`}>
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            我現在如何
            <span className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent block`}>
              幫助？
            </span>
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            每一個行動都能創造改變。選擇最適合您的方式，立即開始幫助我們！
          </motion.p>
        </div>

        {/* Action Options */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {urgentActions.map((action, index) => {
            const cardColors = [
              'from-green-800 to-green-600',
              'from-green-700 to-green-500',
              'from-green-600 to-green-400'
            ]

            return (
              <motion.div
                key={action.title}
                variants={staggerItem}
                className={`relative bg-cream/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 group ${
                  action.urgent ? `ring-2 ring-green-600 ring-opacity-50` : ''
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
              >
              {action.urgent && action.title === '立即購買手工皂' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className={`bg-gradient-to-r ${colorTheme.primary.gradient} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                    最推薦
                  </span>
                </div>
              )}

              <div className={`w-20 h-20 mx-auto mb-8 rounded-2xl flex items-center justify-center bg-gradient-to-br ${cardColors[index]} shadow-lg relative overflow-hidden`}>
                <action.icon className="w-10 h-10 text-white relative z-10" />
              </div>

              <h3 className={`text-2xl font-bold text-green-900 mb-4 text-center group-hover:${colorTheme.primary.text} transition-colors duration-200`}>
                {action.title}
              </h3>

              <p className="text-green-700 mb-6 text-center leading-relaxed">
                {action.description}
              </p>

              <div className="text-center mb-8">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${colorTheme.primary.light} ${colorTheme.primary.text} shadow-sm`}>
                  {action.impact}
                </span>
              </div>

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
                          title: 'High School Soap Lab - 環保手工皂學生組織',
                          text: '支持高中學生製作環保手工皂！',
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
            )
          })}
        </motion.div>

        {/* Bottom Encouragement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className={`text-center bg-gradient-to-r ${colorTheme.primary.gradient} rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden`}
        >
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-24 h-24 rounded-full border-2 border-white/30"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/20"></div>
            <div className="absolute top-1/2 right-12 w-8 h-8 rounded-full bg-white/30"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              每一個小行動都很重要
            </h3>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              無論您選擇哪種方式支持我們，都在為環境保護和社會關懷貢獻力量。
              讓我們一起創造更美好的世界！
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
