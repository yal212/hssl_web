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
import {
  fadeInUp,
  fadeInDown,
  staggerContainer,
  staggerItem,
  floating,
  colorTheme
} from '@/lib/animations'

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
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-100 py-24 lg:py-32 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
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
              <Users className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              認識我們的
              <motion.span
                className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent block`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                優秀團隊
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              我們是一群充滿熱忱的高中學生，相信能夠創造改變。
              透過我們的手工皂事業，我們在學習創業精神的同時支持慈善事業並推廣永續發展。
            </motion.p>
          </motion.div>

          {/* Achievements */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                variants={staggerItem}
                className="group"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Card hover className="h-full text-center border-0 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-emerald-50/50">
                  <CardContent className="p-8 relative">
                    {/* Subtle decorative element */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-100/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${colorTheme.primary.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative overflow-hidden`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <achievement.icon className="w-10 h-10 text-white relative z-10" />
                    </motion.div>
                    <motion.h3
                      className={`text-xl font-bold text-gray-900 mb-4 group-hover:${colorTheme.primary.text} transition-colors duration-200`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {achievement.title}
                    </motion.h3>
                    <motion.p
                      className="text-gray-600 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {achievement.description}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HSSL Mission Section */}
      <section className={`py-24 lg:py-32 bg-gradient-to-br ${colorTheme.primary.light} to-white`}>
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
              <Lightbulb className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              HSSL 的使命與
              <motion.span
                className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent block`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                核心活動
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            >
              從化學學科知識出發，推廣環保手工皂，實現廢油循環再生，建立永續生活模式。
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Beaker,
                title: '化學知識應用',
                description: '結合化學學科知識與技能，深入了解皂化反應原理。',
                detail: '透過科學方法製作安全有效的天然清潔產品。',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: Recycle,
                title: '廢油循環再生',
                description: '推廣過期油與實用廢油的循環再生利用。',
                detail: '將廢棄油脂轉化為有用的清潔用品，實現零廢棄目標。',
                color: 'from-emerald-500 to-emerald-600'
              },
              {
                icon: Heart,
                title: '社區教育推廣',
                description: '從家庭到學校，再到社區，全面推廣環保理念。',
                detail: '透過製皂教學活動，提升民眾環保意識與實踐能力。',
                color: 'from-pink-500 to-pink-600'
              }
            ].map((step, index) => {
              // Enhanced color palette for mission cards
              const enhancedColors = [
                'from-indigo-500 to-purple-600', // Science/Chemistry
                'from-emerald-500 to-teal-600',  // Environment/Recycling
                'from-rose-500 to-pink-600'      // Community/Heart
              ]

              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card hover className="h-full text-center border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8 lg:p-10">
                      <motion.div
                        className={`w-20 h-20 bg-gradient-to-br ${enhancedColors[index]} rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg relative overflow-hidden`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <step.icon className="w-10 h-10 text-white relative z-10" />
                      </motion.div>
                    <motion.h3
                      className={`text-2xl font-bold text-gray-900 mb-4 group-hover:${colorTheme.primary.text} transition-colors duration-200`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p
                      className="text-gray-600 mb-6 leading-relaxed text-lg"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                    >
                      {step.description}
                    </motion.p>
                    <motion.p
                      className="text-gray-500 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                      viewport={{ once: true }}
                    >
                      {step.detail}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInDown}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full mb-8 shadow-lg"
              variants={floating}
              initial="initial"
              animate="animate"
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              團隊核心
              <motion.span
                className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              >
                理念價值
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            >
              人文關懷與環境永續 - HSSL 致力於透過手工皂推廣實現社會責任與環境保護的雙重目標。
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: '公共衛生',
                icon: Shield,
                color: 'from-cyan-500 to-blue-600',
                bgColor: 'bg-cyan-50',
                textColor: 'text-cyan-700',
                items: [
                  '健康清潔',
                  '天然無毒添加物'
                ]
              },
              {
                title: '環境永續',
                icon: TreePine,
                color: 'from-emerald-500 to-green-600',
                bgColor: 'bg-emerald-50',
                textColor: 'text-emerald-700',
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
                color: 'from-rose-500 to-pink-600',
                bgColor: 'bg-rose-50',
                textColor: 'text-rose-700',
                items: [
                  '弱勢製皂工作坊',
                  '偏鄉與非洲肯亞送皂',
                  '募款義賣'
                ]
              },
              {
                title: '社會 ESG 合作',
                icon: Lightbulb,
                color: 'from-violet-500 to-purple-600',
                bgColor: 'bg-violet-50',
                textColor: 'text-violet-700',
                items: [
                  '永續攤位',
                  '製皂工作坊'
                ]
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Card hover className={`h-full border-0 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group-hover:${value.bgColor}/50`}>
                  <CardContent className="p-8 lg:p-10 relative">
                    {/* Subtle decorative element */}
                    <div className={`absolute top-4 right-4 w-8 h-8 ${value.bgColor} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                    <div className="flex items-center mb-8">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mr-6 shadow-lg relative overflow-hidden`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <value.icon className="w-8 h-8 text-white relative z-10" />
                      </motion.div>
                      <motion.h3
                        className={`text-2xl font-bold text-gray-900 group-hover:${value.textColor} transition-colors duration-200`}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                      >
                        {value.title}
                      </motion.h3>
                    </div>

                    <ul className="space-y-4">
                      {value.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 mr-4 flex-shrink-0" />
                          <span className="text-gray-700 text-lg leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Impact Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white relative overflow-hidden"
          >
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-24 h-24 rounded-full border-2 border-white/30"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/20"></div>
              <div className="absolute top-1/2 right-12 w-8 h-8 rounded-full bg-white/30"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">HSSL 的社會影響力</h3>
              <p className="text-lg text-emerald-100 max-w-4xl mx-auto leading-relaxed">
                從個人家庭到學校社區，再到國際公益合作，HSSL 透過手工皂教育推廣，
                不僅實現了環保理念的傳播，更建立了跨越地域的人文關懷網絡，
                將永續生活的種子播撒到世界各個角落。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HSSL Educational Journey Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full mb-8 shadow-lg"
              variants={floating}
              initial="initial"
              animate="animate"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              HSSL 的教育
              <motion.span
                className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                推廣歷程
              </motion.span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              從個人家庭開始，逐步擴展到學校與社區，再到企業合作，建立完整的環保教育生態系統。
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: '家庭分享',
                description: '從個人實踐開始，將環保理念帶入家庭生活',
                benefits: ['個人在家實踐', '分享給家人', '建立環保習慣'],
                color: 'from-rose-400 to-pink-600',
                bgColor: 'bg-rose-50',
                textColor: 'text-rose-700',
                icon: Heart
              },
              {
                name: '校園推廣',
                description: '在學校環境中推廣環保教育與實踐',
                benefits: ['分享給老師', '教導同學', '校內環保活動'],
                color: 'from-indigo-400 to-blue-600',
                bgColor: 'bg-indigo-50',
                textColor: 'text-indigo-700',
                icon: Users
              },
              {
                name: '社區教學',
                description: '走入社區，舉辦實作教學與環保推廣',
                benefits: ['舉辦製皂教學', '回收過期油', '環保攤位互動'],
                color: 'from-emerald-400 to-teal-600',
                bgColor: 'bg-emerald-50',
                textColor: 'text-emerald-700',
                icon: TreePine
              },
              {
                name: '企業合作',
                description: '與企業攜手推動永續發展與社會責任',
                benefits: [
                  'ESG 永續發展合作夥伴',
                  '綠色供應鏈循環經濟',
                  '品牌永續形象提升',
                ],
                color: 'from-amber-400 to-orange-600',
                bgColor: 'bg-amber-50',
                textColor: 'text-amber-700',
                icon: Lightbulb
              }
            ].map((stage, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Card hover className={`h-full border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:${stage.bgColor}/30`}>
                  <CardContent className="p-0">
                    {/* Header with gradient background */}
                    <div className={`relative px-8 py-10 bg-gradient-to-br ${stage.color}`}>
                      {/* Enhanced decorative elements */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-white/30"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/20"></div>
                        <div className="absolute top-1/2 right-8 w-6 h-6 rounded-full bg-white/30"></div>
                        <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-white/20"></div>
                      </div>

                      <div className="relative z-10 text-center">
                        <motion.div
                          className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30 relative overflow-hidden"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          <stage.icon className="w-10 h-10 text-white relative z-10" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-sm">
                          {stage.name}
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-8 py-8">
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                        主要特色
                      </h4>
                      <ul className="space-y-3">
                        {stage.benefits.map((benefit, benefitIndex) => (
                          <motion.li
                            key={benefitIndex}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: benefitIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 leading-relaxed">{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${colorTheme.primary.gradient} rounded-full mb-8 shadow-lg`}
              variants={floating}
              initial="initial"
              animate="animate"
            >
              <Users className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              我們的團隊
              <motion.span
                className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent block`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                組織架構
              </motion.span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
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
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">指導老師</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                提供專業指導與學術支持，引領團隊朝向永續發展目標前進
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
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
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">學生組織</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                七個專業組別分工合作，各司其職，共同推動 HSSL 的環保教育使命
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
      <section className="py-24 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${colorTheme.primary.gradient} rounded-full mb-8 shadow-lg`}
              variants={floating}
              initial="initial"
              animate="animate"
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              我們的
              <motion.span
                className={`bg-gradient-to-r ${colorTheme.primary.gradient} bg-clip-text text-transparent block`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                創立故事
              </motion.span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
                <CardContent className="p-8 lg:p-10">
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      <strong className="text-green-600">High School Soap Lab (簡稱 HSSL)</strong> 是成立自2021年的跨校團隊，因對市售清潔劑的隱憂，結合化學學科知識與技能，推廣手工皂替代市售清潔劑，也推廣過期油與實用廢油的循環再生。
                    </p>
                    <p className="text-lg">
                      推廣與教學從個人在家分享給家人，到學校分享給老師與同學，再走出校園在社區中舉辦製皂教學，除了鼓勵民眾參加製皂活動，同步回收過期油作為推廣課的原料。
                    </p>
                    <p className="text-lg">
                      與多個環保與公益團體合作開課及參與環境永續攤位與民眾互動，致力於推廣環保理念與永續生活實踐。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className={`border-0 bg-gradient-to-br ${colorTheme.primary.gradient} text-white shadow-2xl overflow-hidden`}>
                <CardContent className="p-0">
                  {/* Decorative background */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white/30"></div>
                    <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-white/20"></div>
                    <div className="absolute top-1/2 right-8 w-12 h-12 rounded-full bg-white/30"></div>
                  </div>

                  <div className="relative z-10 p-8 lg:p-10">
                    <motion.div
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Users className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-6">加入我們的使命</h3>
                    <p className="mb-8 text-emerald-100 text-lg leading-relaxed">
                      想要參與嗎？我們一直在尋找充滿熱忱的學生、志工和支持者，
                      他們分享我們對更清潔、更環保世界的願景。
                    </p>
                    <div className="space-y-4">
                      <Button variant="secondary" className="w-full bg-white text-emerald-600 hover:bg-gray-100 font-semibold py-3" asChild>
                        <Link href="/support">
                          支持我們的事業
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold py-3">
                        <Mail className="w-5 h-5 mr-2" />
                        聯絡我們
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
