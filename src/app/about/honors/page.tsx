'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { 
  Award, 
  Trophy, 
  Medal, 
  Star, 
  Crown, 
  Target,
  Users,
  Calendar,

  ExternalLink
} from 'lucide-react'

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

export default function HonorsPage() {
  const achievements = [
    {
      year: '20xx',
      title: ' - ',
      award: ' - ',
      category: ' - ',
      description: ' - ',
      icon: Trophy,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      year: 'example year',
      title: 'example title',
      award: 'example award',
      category: 'example category',
      description: 'example description',
      icon: Award,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      year: 'example year.',
      title: 'example title.',
      award: 'example award.',
      category: 'example category.',
      description: 'example description.',
      icon: Medal,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      year: 'example year..',
      title: 'example title..',
      award: 'example award..',
      category: 'example category..',
      description: 'example description..',
      icon: Star,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ]

  const recognitions = [
    {
      title: '媒體報導',
      items: [
        { name: ' - ', date: '2024年x月' },
        { name: ' . ', date: '2024年xx月' },
        { name: ' x ', date: '2023年x月' }
      ],
      icon: ExternalLink,
      color: 'text-blue-600'
    },
    {
      title: '合作夥伴',
      items: [
        { name: ' . ', date: '2024年' },
        { name: ' .. ', date: '2023年起' },
        { name: ' ... ', date: '2023年起' }
      ],
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: '活動成果',
      items: [
        { name: '累計製作手工皂 - 塊', date: '2023-2024' },
        { name: '回收廢油 - 公升', date: '2023-2024' },
        { name: '服務 - 人次', date: '2023-2024' }
      ],
      icon: Target,
      color: 'text-orange-600'
    }
  ]

  const milestones = [
    {
      year: '2021',
      month: 'x月',
      title: 'HSSL 正式成立',
      description: '高中手工皂實驗室正式成立，開始環保教育推廣'
    },
    {
      year: '202x',
      month: 'x月',
      title: ' - ',
      description: ' - '
    },
    {
      year: '20xx',
      month: 'xx月',
      title: ' -- ',
      description: ' -- '
    },
    {
      year: '2xxx',
      month: 'xxx月',
      title: ' --- ',
      description: ' --- '
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
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <Crown size={80} className="mx-auto text-yellow-200 mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              榮譽榜
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100 max-w-3xl mx-auto leading-relaxed">
              記錄 HSSL 的成長足跡與榮耀時刻，
              見證我們在環保教育路上的每一步
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              獲獎紀錄
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              我們在環保教育領域獲得的各項殊榮與肯定
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {achievements.map((achievement) => (
              <motion.div
                key={`${achievement.year}-${achievement.title}`}
                variants={fadeInUp}
              >
                <Card hover className="h-full border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className={`p-6 bg-gradient-to-br ${achievement.color} text-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <achievement.icon size={48} />
                        <span className="text-2xl font-bold">{achievement.year}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                          {achievement.award}
                        </span>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                          {achievement.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700">{achievement.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              社會肯定
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              來自社會各界的認可與支持
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {recognitions.map((recognition) => (
              <motion.div
                key={recognition.title}
                variants={fadeInUp}
              >
                <Card className="h-full border-2 border-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <recognition.icon size={24} className={recognition.color} />
                      <h3 className="text-xl font-bold text-gray-900 ml-3">{recognition.title}</h3>
                    </div>
                    <div className="space-y-3">
                      {recognition.items.map((item, idx) => (
                        <div key={idx} className="border-l-4 border-green-200 pl-4">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.date}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              重要里程碑
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              HSSL 發展歷程中的重要時刻
            </p>
          </motion.div>

          <motion.div
            className="relative"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-200"></div>
            
            {milestones.map((milestone) => (
              <motion.div
                key={`${milestone.year}-${milestone.month}`}
                variants={fadeInUp}
                className="relative flex items-start mb-8"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                  <Calendar size={24} />
                </div>
                <div className="ml-6 flex-1">
                  <Card className="border-2 border-white shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          {milestone.year}
                        </span>
                        <span className="text-gray-600 text-sm">{milestone.month}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-700">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
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
                <Trophy size={64} className="mx-auto text-yellow-300 mb-6" />
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  與我們一起創造更多榮耀
                </h3>
                <p className="text-xl text-green-100 mb-8 leading-relaxed">
                  加入 HSSL，一起為環保教育努力，創造更多值得驕傲的成就
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/about/contact">
                      聯絡我們
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                    <Link href="/about/our-team">
                      認識團隊
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
