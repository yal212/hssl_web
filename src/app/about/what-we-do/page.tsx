'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Recycle, 
  Users, 
  GraduationCap, 
  Heart, 
  TreePine, 
  Lightbulb,
  Target,
  Globe,
  Handshake,
  Award
} from 'lucide-react'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

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
          <motion.div {...fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              我們在做什麼
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              High School Soap Lab 致力於環保教育與實踐，
              透過廢油回收製皂，推動永續發展理念
            </p>
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
                variants={fadeInUp}
              >
                <Card hover className="h-full border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className={`p-6 bg-gradient-to-br ${activity.color} text-white`}>
                      <activity.icon size={48} className="mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
                      <p className="text-green-100">{activity.description}</p>
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
                variants={fadeInUp}
              >
                <Card hover className="h-full text-center border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <goal.icon size={32} className="text-green-600" />
                    </div>
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
          <motion.div {...fadeInUp}>
            <Card className="border-2 border-white shadow-xl bg-gradient-to-br from-green-600 to-green-700">
              <CardContent className="p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  加入我們的環保行動
                </h3>
                <p className="text-xl text-green-100 mb-8 leading-relaxed">
                  想要了解更多或參與我們的活動嗎？
                  歡迎聯絡我們，一起為地球盡一份心力！
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/about/contact">
                      聯絡我們
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                    <Link href="/support">
                      支持我們
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
