'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Recycle,
  Users,
  GraduationCap,
  Lightbulb,
  Target,
  Globe,
  Handshake,
  Award
} from 'lucide-react'
import Link from 'next/link'
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
  floating
} from '@/lib/animations'

export default function WhatWeDoPage() {
  const activities = [
    {
      icon: Recycle,
      title: '環保手工皂製作',
      description: '回收廢食用油，製作環保手工皂，減少環境污染',
      details: ['收集廢食用油', '皂化製程教學', '環保包裝設計', '成品分享推廣'],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      icon: GraduationCap,
      title: '教育推廣',
      description: '在校園和社區推廣環保教育，培養環保意識',
      details: ['校園環保講座', '社區教學活動', '環保知識分享', '實作體驗課程'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      icon: Users,
      title: '社區服務',
      description: '深入社區，提供環保服務和教育活動',
      details: ['社區清潔活動', '環保攤位設置', '居民環保諮詢', '廢油回收服務'],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      icon: Lightbulb,
      title: '創新研發',
      description: '持續研發新的環保技術和產品',
      details: ['配方改良研究', '新產品開發', '製程優化', '品質提升'],
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ]

  const goals = [
    {
      icon: Target,
      title: '環境保護',
      description: '減少廢油對環境的污染，推動循環經濟'
    },
    {
      icon: Globe,
      title: '永續發展',
      description: '建立可持續的環保模式，影響更多人參與'
    },
    {
      icon: Handshake,
      title: '社會責任',
      description: '承擔社會責任，為下一代創造更好的環境'
    },
    {
      icon: Award,
      title: '教育價值',
      description: '培養學生環保意識和實作能力'
    }
  ]

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen bg-cream"
    >
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
              我們在做什麼
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              High School Soap Lab 致力於環保教育與實踐，
              透過廢油回收製皂，推動永續發展理念
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Activities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              主要活動
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              我們透過多元化的活動，將環保理念落實到日常生活中
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                variants={scrollReveal}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                {...cardHover}
              >
                <Card className="h-full border-2 border-white shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`p-6 bg-gradient-to-br ${activity.color} text-white relative overflow-hidden`}>
                      <motion.div
                        {...iconHover}
                        className="inline-block"
                      >
                        <activity.icon size={48} className="mb-4" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
                      <p className="text-green-100">{activity.description}</p>

                      {/* Decorative background element */}
                      <motion.div
                        className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        {activity.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center text-gray-700">
                            <div className={`w-2 h-2 rounded-full ${activity.bgColor} mr-3`}></div>
                            {detail}
                          </li>
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

      {/* Goals Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              我們的目標
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              透過具體行動，實現環保教育的多重目標
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {goals.map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                {...hoverBounce}
              >
                <Card className="h-full text-center border-2 border-white shadow-lg">
                  <CardContent className="p-6">
                    <motion.div
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{
                        scale: 1.1,
                        rotate: 360,
                        backgroundColor: "#dcfce7"
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      >
                        <goal.icon size={32} className="text-green-600" />
                      </motion.div>
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{goal.title}</h3>
                    <p className="text-gray-600">{goal.description}</p>
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
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{
              scale: 1.02,
              y: -5,
              transition: { duration: 0.3 }
            }}
          >
            <Card className="border-2 border-white shadow-xl bg-gradient-to-br from-green-600 to-green-700 overflow-hidden relative">
              <CardContent className="p-12 relative z-10">
                <motion.h3
                  className="text-3xl md:text-4xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  加入我們的環保行動
                </motion.h3>
                <motion.p
                  className="text-xl text-green-100 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  想要了解更多或參與我們的活動嗎？
                  歡迎聯絡我們，一起為地球盡一份心力！
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <motion.div {...buttonHover}>
                    <Button variant="secondary" size="lg" asChild>
                      <Link href="/about/contact">
                        聯絡我們
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div {...buttonHover}>
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                      <Link href="/support">
                        支持我們
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </CardContent>

              {/* Animated background elements */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.6, 0.3, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </Card>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
