'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import {
  Users,
  GraduationCap,
  Settings,
  FileText,
  Calculator,
  Monitor,
  Calendar,
  ShoppingCart,
  Star,
  Award,
  UserCheck
} from 'lucide-react'
import {
  fadeInUp,
  staggerContainer,
  hoverScale,
  hoverBounce,
  scrollReveal,
  scrollSlideIn,
  cardHover,
  iconHover,
  buttonHover,
  floating,
  hoverTilt
} from '@/lib/animations'

export default function OurTeamPage() {
  const advisor = {
    name: '施朱娟',
    title: '指導老師',
    description: '提供專業指導與學術支持，引領團隊朝向永續發展目標前進',
    image: '/hssl_profile.jpg',
    responsibilities: ['學術指導', '專業諮詢']
  }

  const studentGroups = [
    {
      name: '設備組',
      icon: Settings,
      description: '負責器材準備、整理、交通運送、藥品配置以及現場場佈',
      responsibilities: ['器材管理', '藥品配置', '現場場佈'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      name: '教學組',
      icon: GraduationCap,
      description: '負責製作投影片設計以及配方設計',
      responsibilities: ['技術教學', '配方研發'],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      name: '文書美宣組',
      icon: FileText,
      description: '負責經營臉書、IG帳號以及海報設計',
      responsibilities: ['社群媒體', '宣傳製作'],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      name: '總務組',
      icon: Calculator,
      description: '負責餐飲安排以及原物料訂購',
      responsibilities: ['餐飲安排', '原物料訂購'],
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      name: '資訊組',
      icon: Monitor,
      description: '負責製作問卷、網站設計以及處理保險資料',
      responsibilities: ['問卷', '網站設計', '保險資料'],
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700'
    },
    {
      name: '活動公關',
      icon: Calendar,
      description: '負責與單位合作以及Creat活動辦理',
      responsibilities: ['單位合作', '活動辦理'],
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700'
    },
    {
      name: '義賣規劃',
      icon: ShoppingCart,
      description: '負責企業認購以及設計義賣文宣',
      responsibilities: ['企業認購', '義賣文宣'],
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-700'
    }
  ]

  const teamValues = [
    {
      icon: Star,
      title: '團隊合作',
      description: '各組別密切配合，共同完成目標'
    },
    {
      icon: Award,
      title: '專業分工',
      description: '每個組別都有專業的職責分工'
    },
    {
      icon: Users,
      title: '學習成長',
      description: '在團隊中學習並共同成長'
    },
    {
      icon: GraduationCap,
      title: '知識傳承',
      description: '經驗與知識的傳承與分享'
    }
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              variants={floating}
              initial="initial"
              animate="animate"
            >
              我們的團隊
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              組織架構
            </motion.p>
            <motion.p
              className="text-lg md:text-xl text-green-100 max-w-4xl mx-auto mt-4 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              我們的團隊由專業指導老師和不同專業組別的學生組成，每個組別都為我們的使命帶來獨特的技能和熱忱。我們一起證明年輕人能夠創造有意義的改變。
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Advisor Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">指導老師</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                提供專業指導與學術支持，引領團隊朝向永續發展目標前進
              </p>
            </div>
            <div className="flex justify-center">
              <motion.div
                className="w-full max-w-lg"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 25 }}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/about/groups/advisor">
                  <Card className="h-full cursor-pointer group relative overflow-hidden border-2 border-white shadow-lg bg-gradient-to-br from-cream to-green-50">
                    <CardContent className="p-0">
                      {/* Header with gradient background */}
                      <div className="relative px-6 pt-8 pb-6 bg-gradient-to-br from-emerald-500 to-emerald-600">
                        {/* Decorative pattern overlay */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-0 left-0 w-full h-full"></div>
                        </div>

                        {/* Content */}
                        <div className="relative text-center">
                          <motion.div
                            className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "rgba(255, 255, 255, 0.3)"
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <UserCheck className="w-8 h-8 text-white" />
                          </motion.div>
                          <h4 className="text-xl font-bold text-white mb-2">{advisor.title}</h4>
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-white/30">
                            <span className="text-sm font-medium text-emerald-700">{advisor.title}</span>
                          </div>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-6">
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {advisor.description}
                        </p>

                        <div className="mb-6">
                          <h5 className="text-sm font-semibold text-gray-900 mb-3">主要職責</h5>
                          <div className="flex flex-wrap gap-2">
                            {advisor.responsibilities.map((responsibility, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                              >
                                {responsibility}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 shadow-inner">
                          <span className="text-sm text-gray-500">了解指導老師</span>
                          <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 p-2">
                            探索更多
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Student Groups Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">學生組織</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                七個組別分工合作，共同推動 HSSL 的環保教育使命
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href={groupRoutes[group.name as keyof typeof groupRoutes]}>
                      <Card className="h-full cursor-pointer group relative overflow-hidden border-2 border-white shadow-lg bg-gradient-to-br from-cream to-green-50">
                        <CardContent className="p-0">
                          {/* Header with gradient background */}
                          <div className={`relative px-6 pt-8 pb-6 bg-gradient-to-br ${group.color}`}>
                            {/* Decorative pattern overlay */}
                            <div className="absolute inset-0 opacity-10">
                              <div className="absolute top-0 left-0 w-full h-full"></div>
                            </div>

                            {/* Content */}
                            <div className="relative text-center">
                              <motion.div
                                className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                                whileHover={{
                                  scale: 1.05,
                                  backgroundColor: "rgba(255, 255, 255, 0.3)"
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <group.icon className="w-8 h-8 text-white" />
                              </motion.div>
                              <h4 className="text-xl font-bold text-white mb-2">{group.name}</h4>
                              <div className={`inline-flex items-center px-3 py-1 rounded-full ${group.bgColor} border border-white/30`}>
                                <span className={`text-sm font-medium ${group.textColor}`}>{group.name}</span>
                              </div>
                            </div>
                          </div>

                          {/* Body */}
                          <div className="p-6">
                            <p className="text-gray-600 mb-4 leading-relaxed">
                              {group.description}
                            </p>

                            <div className="mb-6">
                              <h5 className="text-sm font-semibold text-gray-900 mb-3">主要職責</h5>
                              <div className="flex flex-wrap gap-2">
                                {group.responsibilities.map((responsibility, idx) => (
                                  <span
                                    key={idx}
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${group.bgColor} ${group.textColor} border`}
                                  >
                                    {responsibility}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 shadow-inner">
                              <span className="text-sm text-gray-500">了解團隊成員</span>
                              <Button variant="ghost" size="sm" className={`${group.textColor} hover:${group.bgColor} p-2`}>
                                探索更多
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">團隊核心價值</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              我們的團隊建立在這些核心價值之上，共同推動 HSSL 的使命
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {teamValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <Card className="h-full text-center border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-600 to-green-700">
              <CardContent className="p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                   - 
                </h3>
                <p className="text-xl text-green-100 mb-8 leading-relaxed">
                   - 
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/about/contact">
                      聯絡我們
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                    <Link href="/about/what-we-do">
                      了解更多
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
