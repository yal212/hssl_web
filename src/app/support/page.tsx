'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Heart, ShoppingBag, Users, Gift, DollarSign, Handshake } from 'lucide-react'
import {
  fadeInUp,
  fadeInDown,
  staggerContainer,
  staggerItem,
  floating,
  colorTheme
} from '@/lib/animations'

export default function SupportPage() {

  const impactStats = [
    { number: '$ - ', label: '慈善捐款', icon: Heart },
    { number: ' - ', label: '手工皂銷售', icon: ShoppingBag },
    { number: ' - ', label: '志工', icon: Users },
    { number: ' - ', label: '支持的慈善機構', icon: Handshake }
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
              className="text-responsive-h1 font-bold text-green-900 mb-8"
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
              className="body-large text-green-700 max-w-4xl mx-auto"
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

      {/* Three-Column Support Grid */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-green-50 via-cream to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-responsive-h2 font-bold text-green-900 mb-4">
              支持我們的方式
            </h2>
            <p className="body-large text-green-700 max-w-3xl mx-auto">
              選擇最適合您的方式。每一種形式的支持，無論大小，都對我們的使命產生真正的影響。
            </p>
          </motion.div>

          {/* Three-Column Grid Layout */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Column 1: Donate (Charity) */}
            <motion.div
              variants={staggerItem}
              className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8 border border-green-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-300/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="heading-4 text-green-900 mb-4"> - </h3>
                <p className="body-base text-green-700 mb-6">
                   - 
                </p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-green-800">本月目標</span>
                    <span className="text-sm font-bold text-green-900">NT$  -  / NT$  - </span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: ' 100%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    ></motion.div>
                  </div>
                  <p className="text-xs text-green-600 mt-2"> - % 完成 - 還需要 NT$  - 0</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    每 NT$  -  = 製作  -  塊手工皂
                  </div>
                  <div className="flex items-center text-sm text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    - 
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <a href="#donate"> - </a>
                </Button>
              </div>
            </motion.div>

            {/* Column 2: Buy Soap (Product) */}
            <motion.div
              variants={staggerItem}
              className="bg-white rounded-2xl p-8 border border-green-200 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/50 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-green-700 rounded-full mb-6">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <h3 className="heading-4 text-green-900 mb-4">購買手工皂</h3>
                <p className="body-base text-green-700 mb-6">
                購買環保手工皂，就是對我們最好的支持。
                </p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-green-800">本月銷售</span>
                    <span className="text-sm font-bold text-green-900"> -  /  -  皂</span>
                  </div>
                  <div className="w-full bg-green-100 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-green-600 to-green-700 h-3 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                      viewport={{ once: true }}
                    ></motion.div>
                  </div>
                  <p className="text-xs text-green-600 mt-2"> - % 完成 - 還需要  -  塊</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-green-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    天然環保成分製作
                  </div>
                  <div className="flex items-center text-sm text-green-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    高中學生親手製作
                  </div>
                </div>

                <Button variant="outline" className="w-full border-green-600 text-green-700 hover:bg-green-50" asChild>
                  <a href="https://famistore.famiport.com.tw/users/3278142" target="_blank" rel="noopener noreferrer">
                    前往購買
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Column 3: Volunteer (Visits/Demos) */}
            <motion.div
              variants={staggerItem}
              className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 border border-amber-200 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/30 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-amber-600 rounded-full mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="heading-4 text-amber-900 mb-4"> - </h3>
                <p className="body-base text-amber-700 mb-6">
                - 
                </p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-amber-800"> - </span>
                    <span className="text-sm font-bold text-amber-900"> - </span>
                  </div>
                  <div className="w-full bg-amber-200 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                      viewport={{ once: true }}
                    ></motion.div>
                  </div>
                  <p className="text-xs text-amber-600 mt-2"> - </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-amber-700">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                    - 
                  </div>
                  <div className="flex items-center text-sm text-amber-700">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                    - 
                  </div>
                </div>

                <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
                  <a href="#volunteer"> - </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
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
