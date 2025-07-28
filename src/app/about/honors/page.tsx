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
      year: '2022',
      title: '高中生皂顧疫起來',
      award: '第一屆十大傑出青年基金會創新提案計畫優良獎',
      category: '社會共融',
      description: '透過手工皂製作推廣防疫觀念，獲得社會共融類別優良獎',
      videoUrl: 'https://youtu.be/Bo24U8TGVZw?si=JWqjXxgtmjM7tgM7',
      icon: Trophy,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      year: '2022',
      title: '高中生打皂淨水減碳',
      award: '第三屆CSR@天下U20國際青年論壇入選',
      category: '環境永續',
      description: '以環保手工皂製作推動淨水減碳理念，入選國際青年論壇',
      icon: Award,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      year: '2022',
      title: '高中生打皂愛地球',
      award: '第七屆綠獎青少年環境行動獎優選',
      category: '環境保護',
      description: '透過手工皂製作推廣環保理念，榮獲青少年環境行動獎優選',
      icon: Medal,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      year: '2022',
      title: '百人攔油打皂',
      award: '教育部青年署青年志工團隊競賽服務創新獎',
      category: '志工服務',
      description: '組織百人規模的廢油回收手工皂製作活動，獲得服務創新獎',
      icon: Star,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      year: '2023',
      title: '高中生環保行動皂得住',
      award: '荒野協會青少年環境論壇第三名',
      category: '環境教育',
      description: '在青少年環境論壇中展現環保手工皂推廣成果，榮獲第三名',
      videoUrl: 'https://www.youtube.com/live/kiamBSIOCBo?si=QPlmXE7Ut1D8tqAa',
      icon: Crown,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      year: '2023',
      title: '皂癒地球',
      award: '拓凱青少年環境論壇第一名',
      category: '環境教育',
      description: '以「皂癒地球」為主題，在拓凱青少年環境論壇中榮獲第一名',
      icon: Trophy,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      year: '2024',
      title: '環境友善傳給人',
      award: '教育部青年署青志工獎競賽志能運用獎',
      category: '志工服務',
      description: '榮獲2024年教育部青年署青志工獎競賽志能運用獎，展現環境友善理念的傳承與推廣',
      icon: Award,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    }
  ]

  const internationalActivities = [
    {
      year: '2023',
      title: '台中教育大學環境教育國際研討會',
      award: '受邀參與國際研討會',
      category: '國際交流',
      description: '團隊受邀參與台中教育大學舉辦的環境教育國際研討會，分享環保教育經驗',
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      year: '2023',
      title: '韓國參訪學習交流',
      award: '績優青年志工團隊國際交流',
      category: '國際服務',
      description: '參與112年績優青年志工團隊韓國參訪學習交流活動，促進國際青年志工經驗分享',
      videoUrl: 'https://youtu.be/BHpyAA092M8?si=BsqGh7EmZlPJnU8b',
      icon: Star,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      year: '2023',
      title: '非洲肯亞愛心手工皂捐贈',
      award: '國際人道服務',
      category: '國際援助',
      description: '攜帶團隊研發的苦楝油手工皂前往非洲肯亞，與舊鞋救命醫療團隊合作進行清沙蚤服務',
      videoUrl: 'https://youtu.be/6JdLNHeJLWI?si=QnGfb9NbfTnoTY0t',
      icon: Medal,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    }
  ]

  const mediaExposure = [
    {
      title: '電視媒體',
      items: [
        {
          name: '鏡電視台《少年新聞週記》訪談',
          date: '2023年8月',
          description: '小小的手工肥皂可以為環境做到什麼？高中生遠赴非洲對抗吸血蟲？'
        },
        {
          name: '第八屆《總統與高中生面對面論壇》',
          date: '2023年5月',
          description: '環境永續主題論壇'
        }
      ],
      icon: ExternalLink,
      color: 'text-blue-600'
    },
    {
      title: '廣播媒體',
      items: [
        {
          name: '寰宇電台專訪（第一次）',
          date: '2022年11月',
          description: '分享回收油的循環再生與團隊服務經驗',
          url: 'https://open.spotify.com/episode/4ImZeoevFzSsGBAzpGWAR2?si=eBftRKs7Qu6zMyCosQAEsA'
        },
        {
          name: '寰宇電台專訪（第二次）',
          date: '2023年6月',
          description: '持續分享環保教育推廣經驗',
          url: 'https://open.spotify.com/episode/4ImZeoevFzSsGBAzpGWAR2?si=7kgkgd3uT3ivmEUTjDJZAw'
        }
      ],
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: '文字媒體',
      items: [
        {
          name: '中時新聞網校園版報導',
          date: '2022年',
          description: '高中生跨校組社群舉辦『百人攔油打皂』推動環保公益'
        },
        {
          name: '自由時報生活新聞',
          date: '2022年',
          description: '高中生用回收油「皂」環保 永慶房屋全力相挺！'
        },
        {
          name: 'CSR@天下報導',
          date: '2022年',
          description: '第三屆U20促進環境永續工作坊青年行動'
        }
      ],
      icon: Target,
      color: 'text-orange-600'
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
                <Card hover className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
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
                      <p className="text-gray-700 mb-4">{achievement.description}</p>
                      {achievement.videoUrl && (
                        <a
                          href={achievement.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                        >
                          <ExternalLink size={16} />
                          觀看影片
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* International Activities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              國際服務行動交流
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              跨越國界的環保教育推廣與國際交流活動
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {internationalActivities.map((activity) => (
              <motion.div
                key={`${activity.year}-${activity.title}`}
                variants={fadeInUp}
              >
                <Card hover className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className={`p-6 bg-gradient-to-br ${activity.color} text-white`}>
                      <div className="flex items-center justify-between mb-4">
                        <activity.icon size={48} />
                        <span className="text-2xl font-bold">{activity.year}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                          {activity.award}
                        </span>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                          {activity.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-4">{activity.description}</p>
                      {activity.videoUrl && (
                        <a
                          href={activity.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                        >
                          <ExternalLink size={16} />
                          觀看影片
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Media Exposure Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              媒體曝光與報導
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              各大媒體對我們環保教育行動的關注與報導
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {mediaExposure.map((media) => (
              <motion.div
                key={media.title}
                variants={fadeInUp}
              >
                <Card className="h-full border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <media.icon size={24} className={media.color} />
                      <h3 className="text-xl font-bold text-gray-900 ml-3">{media.title}</h3>
                    </div>
                    <div className="space-y-4">
                      {media.items.map((item, idx) => (
                        <div key={idx} className="border-l-4 border-green-200 pl-4">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600 mb-1">{item.date}</p>
                          {item.description && (
                            <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                          )}
                          {'url' in item && item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
                            >
                              <ExternalLink size={14} />
                              收聽節目
                            </a>
                          )}
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



      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-600 to-green-700">
              <CardContent className="p-12">
                <Trophy size={64} className="mx-auto text-yellow-300 mb-6" />
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  與我們一起創造更多榮耀
                </h3>
                <p className="text-xl text-green-100 mb-8 leading-relaxed">
                  加入我們的環保教育行列，一起為地球的未來努力，創造更多有意義的成就與榮耀
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
