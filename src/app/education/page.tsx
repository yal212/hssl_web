'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Accordion } from '@/components/ui/Accordion'
import {
  Beaker,
  Droplets,
  Shield,
  Factory,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Leaf,
  Heart,
  Recycle,
  BookOpen,
  Users,
  Calendar
} from 'lucide-react'
import {
  colorTheme,
  staggerContainer,
  staggerItem
} from '@/lib/animations'

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-cream py-20 lg:py-32 relative overflow-hidden texture-overlay">
        {/* Enhanced nature-inspired background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200/20 organic-shape blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-300/20 leaf-shape blur-3xl"></div>
          <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-green-200/20 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-600 to-green-500 rounded-full mb-8 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Beaker className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-responsive-h1 font-bold text-green-900 mb-6">
              教育中心
            </h1>
            
            <h2 className="text-responsive-h3 font-semibold text-green-700 mb-6">
              科學知識與環保實踐
            </h2>
            
            <p className="body-large text-green-600 max-w-4xl mx-auto">
              深入了解手工皂製作的科學原理、市售清潔劑分析，以及安全製作指南。
              從化學知識到實際操作，一步步學習環保清潔用品的製作方法。
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-cream rounded-2xl p-8 border border-green-200">
              <div className="text-center">
                <h3 className="heading-5 text-green-900 mb-4">HSSL 教育使命</h3>
                <p className="body-base text-green-700 mb-6">
                  High School Soap Lab 成立自2021年，是由跨校高中學生組成的環保教育團隊。
                  我們結合化學學科知識與技能，推廣手工皂替代市售清潔劑，同時推廣廢油循環再生的永續理念。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {[
                    { icon: BookOpen, title: '科學教育', desc: '化學知識與實作結合' },
                    { icon: Users, title: '社區推廣', desc: '從校園走向社區教學' },
                    { icon: Recycle, title: '永續發展', desc: '廢油回收與循環利用' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      className="text-center"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-full mb-3">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-green-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-green-600">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Educational Content with Accordion */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-responsive-h2 font-bold text-green-900 mb-4">
              學習內容
            </h2>
            <p className="body-large text-green-700 max-w-3xl mx-auto">
              透過互動式學習模組，深入了解清潔劑成分、手工皂製作與安全須知
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Accordion allowMultiple className="max-w-5xl mx-auto">
              {/* 成分解說 Section */}
              <Accordion.Item
                title="成分解說 - 市售清潔劑分析"
                icon={<Lightbulb className="w-6 h-6" />}
                variant="default"
                defaultOpen={true}
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="heading-6 text-green-900 mb-4">典型市售沐浴乳成分清單</h4>
                    <div className="bg-cream rounded-xl p-6 border border-green-200">
                      <p className="text-sm text-green-700 mb-4">以下為典型市售沐浴乳的完整成分清單：</p>
                      <div className="bg-cream rounded-lg p-4 border border-green-300">
                        <div className="text-sm text-green-800 leading-relaxed font-mono select-all">
                          Water, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Sodium Chloride,
                          Cocamide Methyl MEA, Fragrance, Polyquaternium-7, Citric Acid,
                          Methylchloroisothiazolinone, Methylisothiazolinone, Phenoxyethanol,
                          Benzyl Alcohol, Disodium EDTA, Sodium Benzoate, CI 19140, CI 42090
                        </div>
                      </div>
                      <p className="text-xs text-green-600 mt-4">
                        * 此成分清單僅供教育用途，不針對特定品牌。點擊上方文字可選取複製。
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="heading-6 text-green-900 mb-4">潛在過敏或刺激性成分</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          name: 'Fragrance（香料）',
                          function: '香味',
                          reactions: '皮膚刺激、接觸性皮膚炎、氣喘誘發',
                          risk: 'medium'
                        },
                        {
                          name: 'MIT/MI 防腐劑',
                          function: '防腐劑',
                          reactions: '強烈過敏、紅疹、搔癢、濕疹',
                          risk: 'high'
                        },
                        {
                          name: 'Cocamidopropyl Betaine',
                          function: '起泡',
                          reactions: '接觸性皮膚炎',
                          risk: 'low'
                        },
                        {
                          name: 'Phenoxyethanol',
                          function: '防腐劑',
                          reactions: '眼睛與皮膚刺激',
                          risk: 'low'
                        }
                      ].map((ingredient, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-l-4 ${
                            ingredient.risk === 'high' ? 'bg-cream border-green-600' :
                            ingredient.risk === 'medium' ? 'bg-cream border-green-500' :
                            'bg-cream border-green-400'
                          }`}
                        >
                          <h5 className="font-semibold text-green-900 mb-2 text-sm">{ingredient.name}</h5>
                          <div className="space-y-1 text-xs">
                            <div><span className="font-medium">功能：</span>{ingredient.function}</div>
                            <div><span className="font-medium">反應：</span>{ingredient.reactions}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Accordion.Item>

              {/* 製皂指南 Section */}
              <Accordion.Item
                title="製皂指南 - 手工皂製作流程"
                icon={<Factory className="w-6 h-6" />}
                variant="success"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="heading-6 text-green-900 mb-4">基本油脂特性</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: '椰子油', desc: '洗淨力強，泡沫豐富，但過多會使皮膚乾澀' },
                        { name: '棕櫚油', desc: '溫和基礎油，增加硬度，泡沫較少' },
                        { name: '橄欖油', desc: '保濕滋潤，細緻泡沫，適合乾性肌膚' },
                        { name: '芥花油', desc: '保濕強，軟化肌膚，持久泡沫' },
                        { name: '乳油木果脂', desc: '增加滋潤度與硬度' }
                      ].map((oil, index) => (
                        <div key={index} className="bg-cream rounded-lg p-4 border border-green-200">
                          <h5 className="font-semibold text-green-900 mb-2">{oil.name}</h5>
                          <p className="text-sm text-green-700">{oil.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="heading-6 text-green-900 mb-4">Cold Process 製作流程</h4>
                    <div className="space-y-4">
                      {[
                        { step: 1, title: '安全防護', desc: '穿戴手套、護目鏡、實驗衣', icon: Shield },
                        { step: 2, title: '鹼水配製', desc: '依皂化價計算，降溫至45°C', icon: Beaker },
                        { step: 3, title: '油脂準備', desc: '量測混合油脂，加熱至45°C', icon: Droplets },
                        { step: 4, title: '混合攪拌', desc: '鹼水倒入油脂，攪拌至trace狀態', icon: Recycle },
                        { step: 5, title: '入模保溫', desc: '加入添加物，倒入皂模保溫24-48小時', icon: Heart },
                        { step: 6, title: '脫模晾皂', desc: '脫模切皂，晾皂4周以上熟成', icon: Leaf }
                      ].map((process, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-cream rounded-lg border border-green-200">
                          <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                            {process.step}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <process.icon className="w-5 h-5 text-green-600 mr-2" />
                              <h5 className="font-semibold text-green-900">{process.title}</h5>
                            </div>
                            <p className="text-sm text-green-700">{process.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Accordion.Item>

              {/* 安全須知 Section */}
              <Accordion.Item
                title="安全須知 - 重要安全指南"
                icon={<AlertTriangle className="w-6 h-6" />}
                variant="warning"
              >
                <div className="space-y-6">
                  <div className="bg-cream border border-green-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <AlertTriangle className="w-6 h-6 text-green-600 mr-2" />
                      <h4 className="heading-6 text-green-900">重要安全提醒</h4>
                    </div>
                    <p className="text-green-800 mb-4">
                      氫氧化鈉具有強腐蝕性，製作過程中務必嚴格遵守安全規範，確保人身安全。
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: '防護裝備',
                        items: ['護目鏡或安全眼鏡', '耐鹼手套', '實驗衣或圍裙', '口罩'],
                        icon: Shield,
                        color: 'text-green-600'
                      },
                      {
                        title: '化學安全',
                        items: ['氫氧化鈉具腐蝕性', '避免直接接觸皮膚', '遠離兒童寵物', '通風良好環境'],
                        icon: Beaker,
                        color: 'text-green-600'
                      },
                      {
                        title: '精確測量',
                        items: ['使用精密天平', '正確歸零操作', '按配方比例', '記錄製作過程'],
                        icon: CheckCircle,
                        color: 'text-green-600'
                      }
                    ].map((safety, index) => (
                      <div key={index} className="bg-cream rounded-lg p-6 border border-green-200">
                        <div className="flex items-center mb-4">
                          <safety.icon className={`w-6 h-6 ${safety.color} mr-2`} />
                          <h5 className="font-semibold text-green-900">{safety.title}</h5>
                        </div>
                        <ul className="space-y-2">
                          {safety.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-sm text-green-800 flex items-center">
                              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </Accordion.Item>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Workshop & Engagement Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-responsive-h2 font-bold text-green-900 mb-4">
              參與學習
            </h2>
            <p className="body-large text-green-700 max-w-3xl mx-auto">
              加入我們的工作坊，親身體驗手工皂製作的樂趣與科學原理
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: BookOpen,
                title: '下次工作坊',
                description: '報名參加我們的手工皂製作工作坊',
                action: '立即報名',
                href: '/support',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: Users,
                title: '學校合作',
                description: '邀請我們到您的學校進行教學分享',
                action: '聯絡我們',
                href: '/about/contact',
                color: 'from-green-600 to-green-700'
              },
              {
                icon: Calendar,
                title: '活動通知',
                description: '訂閱我們的活動通知，不錯過任何學習機會',
                action: '訂閱通知',
                href: '/news',
                color: 'from-green-700 to-green-800'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="bg-cream rounded-xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${item.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="heading-5 text-green-900 mb-4">{item.title}</h3>
                <p className="body-small text-green-600 mb-6">{item.description}</p>
                <Button variant="outline" asChild className="w-full">
                  <a href={item.href}>{item.action}</a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-20 bg-gradient-to-r ${colorTheme.primary.gradient}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-responsive-h2 font-bold text-white mb-6">
              加入 HSSL 的環保行動
            </h2>
            <p className="body-large text-white/90 max-w-3xl mx-auto mb-8">
              與多個環保與公益團體合作，參與環境永續攤位與民眾互動。
              一起推廣手工皂替代市售清潔劑，實現廢油循環再生的永續目標。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="https://famistore.famiport.com.tw/users/3278142" target="_blank" rel="noopener noreferrer">
                  購買環保手工皂
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/support" className="text-white border-white hover:bg-white hover:text-green-800">
                  參與 HSSL 活動
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
