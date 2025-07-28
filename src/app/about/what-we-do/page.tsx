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
  Award,
  Leaf,
  Heart,
  BookOpen,
  Droplets,
  Shield,
  TrendingUp,
  Building,
  Star
} from 'lucide-react'
import Link from 'next/link'
import {
  fadeInUp,
  staggerContainer,
  floating,
  scrollReveal
} from '@/lib/animations'

export default function WhatWeDoPage() {
  // Service plan origins - three main aspects
  const serviceOrigins = [
    {
      icon: Leaf,
      title: '環境層面',
      subtitle: '解決環境污染問題',
      description: '針對市售清潔劑的疑慮與過期油的循環再生',
      details: [
        '市售清潔劑含有毒成分，對人體健康造成威脅',
        '塑膠瓶裝與添加劑造成海洋與地球污染',
        '過期食用油直接丟棄造成環境負擔',
        '透過手工皂製作實現廢油循環再生'
      ],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      icon: Heart,
      title: '社會層面',
      subtitle: '關懷弱勢與社會共好',
      description: '提供弱勢教育服務、資金籌款與企業ESG合作',
      details: [
        '為喜樂園等機構提供特殊兒教育服務',
        '透過皂顧佳工房進行弱勢義賣籌款',
        '與企業合作響應ESG精神',
        '達到有錢出錢、有力出力的服務效能'
      ],
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
    {
      icon: GraduationCap,
      title: '高中生自我成長',
      subtitle: '培養學生社會影響力',
      description: '透過服務學習實踐108課綱精神，豐富高中歷程',
      details: [
        '落實自發、互動、共好的教育精神',
        '學習化學及永續相關知識與技能',
        '培養同理心與溝通協調能力',
        '有利大學申請與未來發展'
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    }
  ]

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
      description: '減少廢油對環境的污染，推動循環經濟，實現雙重淨零減廢'
    },
    {
      icon: Globe,
      title: '永續發展',
      description: '建立可持續的環保模式，影響更多人參與SDGs全球化議題'
    },
    {
      icon: Handshake,
      title: '社會責任',
      description: '承擔社會責任，為弱勢團體提供實質幫助與教育服務'
    },
    {
      icon: Award,
      title: '教育價值',
      description: '培養學生環保意識和實作能力，落實108課綱精神'
    },
    {
      icon: Users,
      title: '團隊合作',
      description: '跨校高中生分工合作，學習溝通協調與同理心'
    },
    {
      icon: Star,
      title: '社會影響力',
      description: '將高中生科學技能轉化為具體的社會貢獻與影響力'
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
              className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              High School Soap Lab 團隊是由跨校高中生組成，自2021年以來，
              結合科學、環保與社會關懷，將高中生的科學技能發揮作為學子的社會影響力，
              營造人與地球永續共好的目標
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Service Plan Origins Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              服務方案緣起
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              我們的服務方案源於三個重要層面的考量與需求
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {serviceOrigins.map((origin, index) => (
              <motion.div
                key={origin.title}
                variants={scrollReveal}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full border-2 border-white shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`p-6 bg-gradient-to-br ${origin.color} text-white relative overflow-hidden`}>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                      >
                        <origin.icon size={48} className="mb-4" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2">{origin.title}</h3>
                      <h4 className="text-lg font-medium mb-3 text-green-100">{origin.subtitle}</h4>
                      <p className="text-green-100">{origin.description}</p>

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
                        {origin.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-gray-700">
                            <div className={`w-2 h-2 rounded-full ${origin.bgColor} mr-3 mt-2 flex-shrink-0`}></div>
                            <span className="text-sm leading-relaxed">{detail}</span>
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
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full border-2 border-white shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`p-6 bg-gradient-to-br ${activity.color} text-white relative overflow-hidden`}>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
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

      {/* Environmental Impact Details Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              環境影響與解決方案
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              深入了解我們所關注的環境問題與具體的解決方案
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Market Cleaning Products Issues */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full border-2 border-white shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <Shield size={24} className="text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">市售清潔劑的疑慮</h3>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p className="leading-relaxed">
                      生活中的方便與便宜常常隱藏著更高的成本。一瓶成分不健康的洗碗精，
                      可能有殘留有毒成分的疑慮，長期對人體健康造成威脅。
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                        <Droplets size={16} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                        <span>防腐劑、定香劑、增稠劑對皮膚造成負擔</span>
                      </li>
                      <li className="flex items-start">
                        <Globe size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>塑膠微粒流入海洋，影響生態系統</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                        <span>後續可能須支付更多的醫療與環境處理成本</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Expired Oil Recycling */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full border-2 border-white shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Recycle size={24} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">過期油的循環再生</h3>
                  </div>
                  <div className="space-y-4 text-gray-700">
                    <p className="leading-relaxed">
                      家家戶戶的櫃子裡或冰箱中藏著久放過期的老油，尤其是大台北地區的雙薪家庭，
                      仰賴外食比例高，常常添購的食用油來不及烹煮就已過期。
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                        <Droplets size={16} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                        <span>過期油直接排放下水道會間接污染水質</span>
                      </li>
                      <li className="flex items-start">
                        <Leaf size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span>植物油是一種能源，直接丟棄很浪費</span>
                      </li>
                      <li className="flex items-start">
                        <Star size={16} className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                        <span>製成手工皂實現雙重淨零減廢目標</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                whileHover={{ y: -5 }}
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

      {/* Social Impact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              社會影響與合作
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              透過多元合作模式，創造社會共好的正向循環
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Disadvantaged Education Services */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-2 border-white shadow-lg">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">弱勢教育服務</h3>
                  <div className="space-y-3 text-gray-700 text-sm">
                    <p>以喜樂園為主要服務對象，提供特殊兒童手工皂製作教學</p>
                    <ul className="space-y-2">
                      <li>• 彌平先天不平等的限制</li>
                      <li>• 體驗手作樂趣與建立自信</li>
                      <li>• 傳達環境永續教育理念</li>
                      <li>• 提供家長技能培力課程</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fundraising for Disadvantaged */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-2 border-white shadow-lg">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">弱勢資金籌款</h3>
                  <div className="space-y-3 text-gray-700 text-sm">
                    <p>透過合法商號【皂顧佳工房】進行義賣，提供實質幫助</p>
                    <ul className="space-y-2">
                      <li>• 多元方式進行手工皂義賣</li>
                      <li>• 所得作為弱勢團體資金援助</li>
                      <li>• 建立可持續的資金來源</li>
                      <li>• 達到實質幫助的效果</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ESG Cooperation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-2 border-white shadow-lg">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building size={32} className="text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">社會ESG共好</h3>
                  <div className="space-y-3 text-gray-700 text-sm">
                    <p>邀約小型企業老闆認購募款益賣皂，響應ESG精神</p>
                    <ul className="space-y-2">
                      <li>• 企業認購作為公司贈禮</li>
                      <li>• 提高義賣成效</li>
                      <li>• 有錢出錢、有力出力</li>
                      <li>• 達到三方共好效益</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button variant="secondary" size="lg" asChild>
                      <Link href="/about/contact">
                        聯絡我們
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
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
