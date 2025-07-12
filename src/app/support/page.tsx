'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Heart, ShoppingBag, Users, Megaphone, Gift, DollarSign, Handshake } from 'lucide-react'
import Link from 'next/link'

export default function SupportPage() {
  const supportWays = [
    {
      icon: ShoppingBag,
      title: '購買我們的手工皂',
      description: '每一次購買手工皂都直接支持我們的慈善使命和永續實踐。',
      action: '立即購買',
      href: 'https://famistore.famiport.com.tw/users/3278142',
      color: 'green',
      impact: '100%利潤捐給慈善機構'
    },
    {
      icon: DollarSign,
      title: '進行捐款',
      description: '直接捐款幫助我們擴大營運並增加慈善影響力。',
      action: '捐款',
      href: '#donate',
      color: 'blue',
      impact: '每$10幫助我們製作5塊手工皂'
    },
    {
      icon: Users,
      title: '與我們一起當志工',
      description: '加入我們的團隊成為志工，協助生產、行銷或活動。',
      action: '參與其中',
      href: '#volunteer',
      color: 'purple',
      impact: '幫助我們觸及更多社區'
    },
    {
      icon: Megaphone,
      title: '傳播理念',
      description: '在社群媒體上分享我們的使命，幫助我們觸及更多支持者。',
      action: '分享',
      href: '#share',
      color: 'orange',
      impact: '透過提高認知擴大我們的影響力'
    }
  ]

  const impactStats = [
    { number: '$5,000+', label: '慈善捐款', icon: Heart },
    { number: '500+', label: '手工皂銷售', icon: ShoppingBag },
    { number: '15+', label: '志工', icon: Users },
    { number: '3', label: '支持的慈善機構', icon: Handshake }
  ]

  const charities = [
    {
      name: '當地食物銀行',
      description: '為我們社區中有需要的家庭提供餐食',
      amount: '$2,000',
      impact: '提供400份餐食'
    },
    {
      name: '環境保護組織',
      description: '支持當地河川清理和植樹倡議',
      amount: '$1,500',
      impact: '種植50棵樹'
    },
    {
      name: '青年教育基金',
      description: '提供學校用品和教育資源',
      amount: '$1,500',
      impact: '支持30名學生'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              支持我們的使命
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              幫助我們創造更清潔的地球和更強大的社區。有許多方式可以支持
              High School Soap Lab，一起創造有意義的影響。
            </p>
          </motion.div>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Support */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              幫助我們的方式
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              選擇最適合您的方式。每一種形式的支持，
              無論大小，都對我們的使命產生真正的影響。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportWays.map((way, index) => (
              <motion.div
                key={way.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4
                      ${way.color === 'green' ? 'bg-green-100' : ''}
                      ${way.color === 'blue' ? 'bg-blue-100' : ''}
                      ${way.color === 'purple' ? 'bg-purple-100' : ''}
                      ${way.color === 'orange' ? 'bg-orange-100' : ''}
                    `}>
                      <way.icon className={`w-6 h-6
                        ${way.color === 'green' ? 'text-green-600' : ''}
                        ${way.color === 'blue' ? 'text-blue-600' : ''}
                        ${way.color === 'purple' ? 'text-purple-600' : ''}
                        ${way.color === 'orange' ? 'text-orange-600' : ''}
                      `} />
                    </div>
                    <CardTitle>{way.title}</CardTitle>
                    <CardDescription>{way.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="text-sm font-medium text-green-600">
                        Impact: {way.impact}
                      </span>
                    </div>
                    <Button
                      variant={way.color === 'green' ? 'primary' : 'outline'}
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
            ))}
          </div>
        </div>
      </section>

      {/* Charities We Support */}
      <section className="py-20 bg-white">
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
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {charity.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {charity.description}
                    </p>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600 mb-1">
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
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
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
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
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
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                <Gift className="w-5 h-5 mr-2" />
                進行捐款
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
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
