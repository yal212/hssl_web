'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Mail, Linkedin, Instagram } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function InformationGroupPage() {
  const groupMembers = [
    {
      name: '周建華',
      role: '資訊組組長',
      grade: '12年級',
      bio: '負責網站維護和數位系統的整體規劃，確保技術架構穩定。',
      skills: ['系統架構', '專案管理', '技術規劃'],
      avatar: '周',
      color: 'bg-indigo-500'
    },
    {
      name: '鄭雅玲',
      role: '前端開發者',
      grade: '11年級',
      bio: '專責網站前端開發和使用者介面設計，提升使用者體驗。',
      skills: ['前端開發', 'UI/UX設計', '響應式設計'],
      avatar: '鄭',
      color: 'bg-indigo-600'
    },
    {
      name: '王志豪',
      role: '後端開發者',
      grade: '11年級',
      bio: '負責伺服器端開發和資料庫管理，確保系統穩定運行。',
      skills: ['後端開發', '資料庫管理', '系統維護'],
      avatar: '王',
      color: 'bg-indigo-700'
    },
    {
      name: '林美慧',
      role: '數位營運專員',
      grade: '10年級',
      bio: '負責線上平台管理和數位工具應用，優化營運效率。',
      skills: ['平台管理', '數位工具', '營運優化'],
      avatar: '林',
      color: 'bg-indigo-800'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button variant="outline" className="mb-6" asChild>
              <Link href="/about">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回關於我們
              </Link>
            </Button>
            
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                資訊組
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                負責網站維護、數位系統和線上平台管理，運用科技提升組織效率和服務品質。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              組員介紹
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我們的資訊組成員致力於運用科技創新提升組織效率。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="h-full">
                  <CardContent className="p-6 text-center">
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                      <Image
                        src="/hssl_profile.jpg"
                        alt={member.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-indigo-600 font-medium mb-1">
                      {member.role}
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      {member.grade}
                    </p>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {member.bio}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links (placeholder) */}
                    <div className="flex justify-center space-x-3">
                      <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                        <Instagram className="w-4 h-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
