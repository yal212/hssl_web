'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Leaf, Heart, Users, Award, Mail } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const studentGroups = [
    {
      name: '設備組',
      description: '負責實驗室設備維護、採購和安全管理',
      responsibilities: ['設備維護', '安全管理', '採購協調'],
      avatar: '設',
      color: 'bg-green-500',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-green-600',
      badgeBg: 'bg-green-50',
      badgeText: 'text-green-700',
      badgeBorder: 'border-green-200',
      ctaText: 'text-green-600'
    },
    {
      name: '教學組',
      description: '負責手工皂製作技術教學和知識傳承',
      responsibilities: ['技術教學', '配方研發', '品質控制'],
      avatar: '教',
      color: 'bg-blue-500',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-600',
      badgeBg: 'bg-blue-50',
      badgeText: 'text-blue-700',
      badgeBorder: 'border-blue-200',
      ctaText: 'text-blue-600'
    },
    {
      name: '文書美宣組',
      description: '負責文件管理、視覺設計和宣傳材料製作',
      responsibilities: ['文件管理', '視覺設計', '宣傳製作'],
      avatar: '文',
      color: 'bg-purple-500',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-purple-600',
      badgeBg: 'bg-purple-50',
      badgeText: 'text-purple-700',
      badgeBorder: 'border-purple-200',
      ctaText: 'text-purple-600'
    },
    {
      name: '總務組',
      description: '負責財務管理、庫存控制和日常營運',
      responsibilities: ['財務管理', '庫存控制', '營運協調'],
      avatar: '總',
      color: 'bg-orange-500',
      gradientFrom: 'from-orange-500',
      gradientTo: 'to-orange-600',
      badgeBg: 'bg-orange-50',
      badgeText: 'text-orange-700',
      badgeBorder: 'border-orange-200',
      ctaText: 'text-orange-600'
    },
    {
      name: '資訊組',
      description: '負責網站維護、數位系統和線上平台管理',
      responsibilities: ['網站維護', '系統管理', '數位營運'],
      avatar: '資',
      color: 'bg-indigo-500',
      gradientFrom: 'from-indigo-500',
      gradientTo: 'to-indigo-600',
      badgeBg: 'bg-indigo-50',
      badgeText: 'text-indigo-700',
      badgeBorder: 'border-indigo-200',
      ctaText: 'text-indigo-600'
    },
    {
      name: '活動公關',
      description: '負責對外聯繫、活動策劃和公共關係維護',
      responsibilities: ['活動策劃', '對外聯繫', '公關維護'],
      avatar: '活',
      color: 'bg-pink-500',
      gradientFrom: 'from-pink-500',
      gradientTo: 'to-pink-600',
      badgeBg: 'bg-pink-50',
      badgeText: 'text-pink-700',
      badgeBorder: 'border-pink-200',
      ctaText: 'text-pink-600'
    },
    {
      name: '義賣規劃',
      description: '負責義賣活動規劃、慈善合作和社會影響評估',
      responsibilities: ['義賣規劃', '慈善合作', '影響評估'],
      avatar: '義',
      color: 'bg-teal-500',
      gradientFrom: 'from-teal-500',
      gradientTo: 'to-teal-600',
      badgeBg: 'bg-teal-50',
      badgeText: 'text-teal-700',
      badgeBorder: 'border-teal-200',
      ctaText: 'text-teal-600'
    }
  ]

  const achievements = [
    {
      icon: Heart,
      title: '募款超過$0',
      description: '捐贈給當地食物銀行和環保組織'
    },
    {
      icon: Users,
      title: '超過0位顧客',
      description: '支持我們使命的滿意顧客'
    },
    {
      icon: Leaf,
      title: '超過0塊手工皂',
      description: '生產和銷售的環保手工皂'
    },
    {
      icon: Award,
      title: '教育部認可',
      description: '2024年青年創業家獎得主'
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
              認識我們的優秀團隊
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我們是一群充滿熱忱的高中學生，相信能夠創造改變。
              透過我們的手工皂事業，我們在學習創業精神的同時支持慈善事業並推廣永續發展。
            </p>
          </motion.div>

          {/* Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
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
              我們的學生組織
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我們的團隊分為不同的專業組別，每個組別都為我們的使命帶來獨特的技能和熱忱。
              我們一起證明年輕人能夠創造有意義的改變。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {studentGroups.map((group, index) => {
              const groupRoutes = {
                '設備組': '/about/groups/equipment',
                '教學組': '/about/groups/teaching',
                '文書美宣組': '/about/groups/documentation',
                '總務組': '/about/groups/general-affairs',
                '資訊組': '/about/groups/information',
                '活動公關': '/about/groups/events-pr',
                '義賣規劃': '/about/groups/charity-sales'
              }

              return (
                <motion.div
                  key={group.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={groupRoutes[group.name as keyof typeof groupRoutes]}>
                    <Card hover className="h-full cursor-pointer group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                      <CardContent className="p-0">
                        {/* Header with gradient background */}
                        <div className={`relative px-6 pt-8 pb-6 bg-gradient-to-br ${group.gradientFrom} ${group.gradientTo}`}>
                          {/* Decorative pattern overlay */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-2 right-2 w-16 h-16 rounded-full border-2 border-white/30"></div>
                            <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-white/20"></div>
                            <div className="absolute top-1/2 right-6 w-4 h-4 rounded-full bg-white/30"></div>
                          </div>

                          {/* Avatar */}
                          <div className="relative z-10 text-center">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30 group-hover:scale-110 transition-transform duration-300">
                              <span className="text-white font-bold text-2xl drop-shadow-sm">
                                {group.avatar}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 drop-shadow-sm">
                              {group.name}
                            </h3>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="px-6 py-6">
                          <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-2">
                            {group.description}
                          </p>

                          {/* Responsibilities */}
                          <div className="mb-6">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                              主要職責
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {group.responsibilities.map((responsibility, idx) => (
                                <span
                                  key={idx}
                                  className={`px-3 py-1 text-xs font-medium rounded-full ${group.badgeBg} ${group.badgeText} border ${group.badgeBorder}`}
                                >
                                  {responsibility}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Call to action */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              了解團隊成員
                            </span>
                            <div className={`flex items-center ${group.ctaText} font-medium text-sm group-hover:translate-x-1 transition-transform duration-200`}>
                              <span>探索更多</span>
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                我們的故事
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  High School Soap Lab始於2021年，當時我們的創辦人艾瑪在化學課專題中發現了
                  商業肥皂對環境的影響。她意識到許多肥皂含有有害化學物質，
                  會污染水道並破壞生態系統。
                </p>
                <p>
                  原本只是學校專題的計畫很快演變成一個使命導向的事業。
                  艾瑪聚集了一群志同道合的學生，他們分享她對永續發展和社會影響的熱忱。
                  我們一起學習使用天然、環保成分製作手工皂的藝術。
                </p>
                <p>
                  今天，我們自豪地已向當地慈善機構捐贈超過$0，
                  同時為客戶提供高品質、永續的產品。我們的旅程教會了我們
                  關於創業精神、團隊合作以及年輕人創造正面改變的力量的寶貴課程。
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6">加入我們的使命</h3>
              <p className="mb-6">
                想要參與嗎？我們一直在尋找充滿熱忱的學生、志工和支持者，
                他們分享我們對更清潔、更環保世界的願景。
              </p>
              <div className="space-y-3">
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/support">
                    支持我們的事業
                  </Link>
                </Button>
                <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-green-600">
                  <Mail className="w-4 h-4 mr-2" />
                  聯絡我們
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
