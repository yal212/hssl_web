'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Leaf,
  Heart,
  Users,
  Award,
  Mail,
  Beaker,
  Recycle,
  Shield,
  TreePine,
  Lightbulb,
  CheckCircle,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  const advisorGroups = [
    {
      name: '指導老師',
      description: '提供專業指導與學術支持',
      responsibilities: ['學術指導', '專業諮詢'],
      avatar: '',
      color: 'bg-amber-500',
      gradientFrom: 'from-amber-500',
      gradientTo: 'to-amber-600',
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-700',
      badgeBorder: 'border-amber-200',
      ctaText: 'text-amber-600'
    }
  ]

  const studentGroups = [
    {
      name: '設備組',
      description: '負責器材準備、整理、交通運送、藥品配置以及現場場佈',
      responsibilities: ['器材管理', '藥品配置', '現場場佈'],
      avatar: '',
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
      description: '負責製作投影片設計以及配方設計',
      responsibilities: ['技術教學', '配方研發'],
      avatar: '',
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
      description: '負責經營臉書、IG帳號以及海報設計',
      responsibilities: ['社群媒體', '宣傳製作'],
      avatar: '',
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
      description: '負責餐飲安排以及原物料訂購',
      responsibilities: ['餐飲安排', '原物料訂購'],
      avatar: '',
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
      description: '負責製作問卷、網站設計以及處理保險資料',
      responsibilities: ['問卷', '網站設計', '保險資料'],
      avatar: '',
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
      description: '負責與單位合作以及Creat活動辦理',
      responsibilities: ['單位合作', '活動辦理'],
      avatar: '',
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
      description: '負責企業認購以及設計義賣文宣',
      responsibilities: ['企業認購', '義賣文宣'],
      avatar: '',
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
      title: '募款超過$ - ',
      description: '捐贈給當地食物銀行和環保組織'
    },
    {
      icon: Users,
      title: '超過 - 位顧客',
      description: '支持我們使命的滿意顧客'
    },
    {
      icon: Leaf,
      title: '超過 - 塊手工皂',
      description: '生產和銷售的環保手工皂'
    },
    {
      icon: Award,
      title: '教育部認可',
      description: '2024年青志獎'
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

      {/* HSSL Mission Section */}
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
              HSSL 的使命與活動
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              從化學學科知識出發，推廣環保手工皂，實現廢油循環再生，建立永續生活模式。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Beaker,
                title: '化學知識應用',
                description: '結合化學學科知識與技能，深入了解皂化反應原理。',
                detail: '透過科學方法製作安全有效的天然清潔產品。'
              },
              {
                icon: Recycle,
                title: '廢油循環再生',
                description: '推廣過期油與實用廢油的循環再生利用。',
                detail: '將廢棄油脂轉化為有用的清潔用品，實現零廢棄目標。'
              },
              {
                icon: Heart,
                title: '社區教育推廣',
                description: '從家庭到學校，再到社區，全面推廣環保理念。',
                detail: '透過製皂教學活動，提升民眾環保意識與實踐能力。'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <p className="text-sm text-gray-500">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              團隊核心理念
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              人文關懷與環境永續 - HSSL 致力於透過手工皂推廣實現社會責任與環境保護的雙重目標。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: '公共衛生',
                icon: Shield,
                color: 'from-blue-500 to-blue-600',
                bgColor: 'from-blue-50 to-blue-100',
                borderColor: 'border-blue-200',
                items: [
                  '健康清潔',
                  '天然無毒添加物'
                ]
              },
              {
                title: '環境永續',
                icon: TreePine,
                color: 'from-green-500 to-green-600',
                bgColor: 'from-green-50 to-green-100',
                borderColor: 'border-green-200',
                items: [
                  '100% 分解',
                  '無石化油原料',
                  '無塑化包裝',
                  '過期油的循環再生'
                ]
              },
              {
                title: '公益關懷',
                icon: Heart,
                color: 'from-red-500 to-red-600',
                bgColor: 'from-red-50 to-red-100',
                borderColor: 'border-red-200',
                items: [
                  '弱勢製皂工作坊',
                  '偏鄉與非洲肯亞送皂',
                  '募款義賣'
                ]
              },
              {
                title: '社會 ESG 合作',
                icon: Lightbulb,
                color: 'from-purple-500 to-purple-600',
                bgColor: 'from-purple-50 to-purple-100',
                borderColor: 'border-purple-200',
                items: [
                  '永續攤位',
                  '製皂工作坊'
                ]
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${value.bgColor} rounded-2xl p-8 border-2 ${value.borderColor}`}
              >
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mr-4`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{value.title}</h3>
                </div>

                <ul className="space-y-3">
                  {value.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Impact Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center text-white"
          >
            <h3 className="text-2xl font-bold mb-4">HSSL 的社會影響力</h3>
            <p className="text-lg text-green-100 max-w-4xl mx-auto leading-relaxed">
              從個人家庭到學校社區，再到國際公益合作，HSSL 透過手工皂教育推廣，
              不僅實現了環保理念的傳播，更建立了跨越地域的人文關懷網絡，
              將永續生活的種子播撒到世界各個角落。
            </p>
          </motion.div>
        </div>
      </section>

      {/* HSSL Educational Journey Section */}
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
              HSSL 的教育推廣歷程
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              從個人家庭開始，逐步擴展到學校與社區，建立完整的環保教育網絡。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: '家庭分享',
                benefits: ['個人在家實踐', '分享給家人', '建立環保習慣'],
                color: 'from-green-400 to-green-600'
              },
              {
                name: '校園推廣',
                benefits: ['分享給老師', '教導同學', '校內環保活動'],
                color: 'from-blue-400 to-blue-600'
              },
              {
                name: '社區教學',
                benefits: ['舉辦製皂教學', '回收過期油', '環保攤位互動'],
                color: 'from-purple-400 to-purple-600'
              }
            ].map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-full h-32 bg-gradient-to-br ${stage.color} rounded-xl mb-6 flex items-center justify-center`}>
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{stage.name}</h3>
                <ul className="space-y-2">
                  {stage.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
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
              我們的團隊組織
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我們的團隊由專業指導老師和不同專業組別的學生組成，每個組別都為我們的使命帶來獨特的技能和熱忱。
              我們一起證明年輕人能夠創造有意義的改變。
            </p>
          </motion.div>

          {/* Advisor Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">指導老師</h3>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                {advisorGroups.map((group, index) => {
                  const groupRoutes = {
                    '指導老師': '/about/groups/advisor'
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
                                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-white/30 group-hover:scale-110 transition-transform duration-300">
                                  <Image
                                    src="/hssl_profile.jpg"
                                    alt={group.name}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                  />
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
                                  了解指導老師
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
          </motion.div>

          {/* Student Groups Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">學生組織</h3>
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
                              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-white/30 group-hover:scale-110 transition-transform duration-300">
                                <Image
                                  src="/hssl_profile.jpg"
                                  alt={group.name}
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-cover"
                                />
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
          </motion.div>
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
                  High School Soap Lab (簡稱 HSSL) 是成立自2021年的跨校團隊，因對市售清潔劑的隱憂，結合化學學科知識與技能，推廣手工皂替代市售清潔劑，也推廣過期油與實用廢油的循環再生。
                </p>
                <p>
                  推廣與教學從個人在家分享給家人，到學校分享給老師與同學，再走出校園在社區中舉辦製皂教學，除了鼓勵民眾參加製皂活動，同步回收過期油作為推廣課的原料。
                </p>
                <p>
                  與多個環保與公益團體合作開課及參與環境永續攤位與民眾互動，致力於推廣環保理念與永續生活實踐。
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
