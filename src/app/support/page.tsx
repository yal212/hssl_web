'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Heart, ShoppingBag, Users, Megaphone, Gift, DollarSign, Handshake, Sparkles } from 'lucide-react'
import Link from 'next/link'
import {
  fadeInUp,
  fadeInDown,
  staggerContainer,
  staggerItem,
  floating,
  colorTheme
} from '@/lib/animations'

export default function SupportPage() {
  const supportWays = [
    {
      icon: ShoppingBag,
      title: '購買我們的手工皂',
      description: '每一次購買手工皂都直接支持我們的慈善使命和永續實踐。',
      action: '立即購買',
      href: 'https://famistore.famiport.com.tw/users/3278142',
      color: 'primary',
      impact: ' - %利潤捐給慈善機構'
    },
    {
      icon: DollarSign,
      title: '進行捐款',
      description: '直接捐款幫助我們擴大營運並增加慈善影響力。',
      action: '捐款',
      href: '#donate',
      color: 'secondary',
      impact: '每$ - 幫助我們製作 - 塊手工皂'
    },
    {
      icon: Users,
      title: '與我們一起當志工',
      description: '加入我們的團隊成為志工，協助生產、行銷或活動。',
      action: '參與其中',
      href: '#volunteer',
      color: 'accent',
      impact: '幫助我們觸及更多社區'
    },
    {
      icon: Megaphone,
      title: '傳播理念',
      description: '在社群媒體上分享我們的使命，幫助我們觸及更多支持者。',
      action: '分享',
      href: '#share',
      color: 'primary',
      impact: '透過提高認知擴大我們的影響力'
    }
  ]

  const impactStats = [
    { number: '$ - ', label: '慈善捐款', icon: Heart },
    { number: ' - ', label: '手工皂銷售', icon: ShoppingBag },
    { number: ' - ', label: '志工', icon: Users },
    { number: ' - ', label: '支持的慈善機構', icon: Handshake }
  ]

  const charities = [
    {
      name: '當地食物銀行',
      description: '為我們社區中有需要的家庭提供餐食',
      amount: '$ - ',
      impact: '提供 - 份餐食'
    },
    {
      name: '環境保護組織',
      description: '支持當地河川清理和植樹倡議',
      amount: '$ - ',
      impact: '種植 - 棵樹'
    },
    {
      name: '青年教育基金',
      description: '提供學校用品和教育資源',
      amount: '$ - ',
      impact: '支持 - 名學生'
    }
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-cream py-24 lg:py-32 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-green-200/20 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInDown}
            initial="initial"
            animate="animate"
            className="text-center mb-20"
          >
            <motion.div
              className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${colorTheme.primary.gradient} rounded-full mb-8 shadow-lg`}
              variants={floating}
              initial="initial"
              animate="animate"
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              支持我們的
              <motion.span
                className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent block`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                環保使命
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              幫助我們創造更清潔的地球和更強大的社區。有許多方式可以支持
              High School Soap Lab，一起創造有意義的影響。
            </motion.p>
          </motion.div>

          {/* Impact Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {impactStats.map((stat, index) => {
              const statColors = [
                'from-emerald-500 to-teal-600',
                'from-emerald-500 to-teal-600',
                'from-emerald-500 to-teal-600',
                'from-emerald-500 to-teal-600'
              ]

              return (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card hover className="h-full text-center border-0 bg-cream/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-8">
                      <motion.div
                        className={`w-20 h-20 bg-gradient-to-br ${statColors[index]} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative overflow-hidden`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <stat.icon className="w-10 h-10 text-white relative z-10" />
                      </motion.div>
                      <motion.div
                        className={`text-3xl font-bold ${colorTheme.primary.text} mb-2 group-hover:text-emerald-800 transition-colors duration-200`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {stat.number}
                      </motion.div>
                      <motion.div
                        className="text-gray-600 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {stat.label}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Ways to Support */}
      <section className={`py-24 lg:py-32 bg-gradient-to-br ${colorTheme.primary.light} via-cream to-green-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              幫助我們的
              <motion.span
                className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent block`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                方式
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            >
              選擇最適合您的方式。每一種形式的支持，
              無論大小，都對我們的使命產生真正的影響。
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {supportWays.map((way, index) => {
              const wayColors = [
                'from-green-800 to-green-600',
                'from-green-700 to-green-500',
                'from-green-600 to-green-400',
                'from-green-800 to-green-600'
              ]

              return (
                <motion.div
                  key={way.title}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                <Card hover className="h-full bg-cream/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader>
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${wayColors[index]} rounded-2xl flex items-center justify-center mb-6 shadow-lg relative overflow-hidden`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <way.icon className="w-10 h-10 text-white relative z-10" />
                    </motion.div>
                    <CardTitle className={`text-2xl mb-4 group-hover:${colorTheme.primary.text} transition-colors duration-200`}>
                      {way.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed text-lg">
                      {way.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <span className={`text-sm font-medium ${colorTheme.primary.text}`}>
                        Impact: {way.impact}
                      </span>
                    </div>
                    <Button
                      variant="primary"
                      className="w-full"
                      asChild
                    >
                      {way.href.startsWith('http') ? (
                        <a href={way.href} target="_blank" rel="noopener noreferrer">
                          {way.action}
                        </a>
                      ) : (
                        <Link href={way.href}>
                          {way.action}
                        </Link>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Charities We Support */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              您的支持去向
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我們很自豪能支持這些在我們社區和環境中
              創造真正改變的優秀組織。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {charities.map((charity, index) => (
              <motion.div
                key={charity.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${colorTheme.primary.light} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Heart className={`w-8 h-8 ${colorTheme.primary.text}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {charity.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {charity.description}
                    </p>
                    <div className={`${colorTheme.primary.light} rounded-lg p-4`}>
                      <div className={`text-2xl font-bold ${colorTheme.primary.text} mb-1`}>
                        {charity.amount}
                      </div>
                      <div className="text-sm text-gray-600">
                        {charity.impact}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-20 bg-gradient-to-r ${colorTheme.primary.gradient}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              準備好創造改變了嗎？
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              加入數百位正在幫助我們創造正面改變的支持者。
              讓我們一起建設更清潔的地球和更強大的社區。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="https://famistore.famiport.com.tw/users/3278142" target="_blank" rel="noopener noreferrer">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  購買我們的手工皂
                </a>
              </Button>
              <Button size="lg" variant="outline" className={`border-white text-white hover:bg-cream hover:${colorTheme.primary.text}`}>
                <Gift className="w-5 h-5 mr-2" />
                進行捐款
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-16 ${colorTheme.primary.light}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              有疑問嗎？
            </h3>
            <p className="text-gray-600 mb-6">
              我們很樂意聽到您的聲音！如果您對我們的使命、產品或如何參與有疑問，
              請與我們聯繫。
            </p>
            <Button variant="primary" size="lg">
              聯絡我們
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
