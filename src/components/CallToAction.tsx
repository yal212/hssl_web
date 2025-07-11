'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Heart, Users, ShoppingBag } from 'lucide-react'

export function CallToAction() {
  const actions = [
    {
      icon: ShoppingBag,
      title: '購買我們的手工皂',
      description: '購買手工製作的環保肥皂，直接支持我們的慈善使命。',
      buttonText: '立即購買',
      href: 'https://famistore.famiport.com.tw/users/3278142',
      color: 'green'
    },
    {
      icon: Heart,
      title: '進行捐款',
      description: '直接捐款支持我們的事業，幫助我們擴大影響力。',
      buttonText: '捐款',
      href: '/support',
      color: 'red'
    },
    {
      icon: Users,
      title: '加入我們的團隊',
      description: '了解更多關於我們學生主導的倡議以及您如何參與其中。',
      buttonText: '了解更多',
      href: '/about',
      color: 'blue'
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
            您可以如何幫助我們
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            有許多方式可以支持我們創造更清潔、更環保世界的使命，
            同時幫助慈善事業。選擇最適合您的方式！
          </p>
        </motion.div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
                className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center
                  ${action.color === 'green' ? 'bg-green-100 group-hover:bg-green-200' : ''}
                  ${action.color === 'red' ? 'bg-red-100 group-hover:bg-red-200' : ''}
                  ${action.color === 'blue' ? 'bg-blue-100 group-hover:bg-blue-200' : ''}
                  transition-colors
                `}
              >
                <action.icon 
                  className={`w-10 h-10
                    ${action.color === 'green' ? 'text-green-600' : ''}
                    ${action.color === 'red' ? 'text-red-600' : ''}
                    ${action.color === 'blue' ? 'text-blue-600' : ''}
                  `} 
                />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {action.title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {action.description}
              </p>
              
              <Button
                variant={action.color === 'green' ? 'primary' : 'outline'}
                asChild
              >
                {action.href.startsWith('http') ? (
                  <a href={action.href} target="_blank" rel="noopener noreferrer">
                    {action.buttonText}
                  </a>
                ) : (
                  <Link href={action.href}>
                    {action.buttonText}
                  </Link>
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            準備好創造改變了嗎？
          </h3>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            加入數百位已經支持我們使命的顧客行列。
            讓我們一起創造更清潔的地球和更強大的社區。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="https://famistore.famiport.com.tw/users/3278142" target="_blank" rel="noopener noreferrer">
                開始購物
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600" asChild>
              <Link href="/about">
                我們的故事
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
