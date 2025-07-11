'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Mail, Linkedin, Instagram } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function GeneralAffairsGroupPage() {
  const groupMembers = [
    {
      name: '趙文傑',
      role: '總務組組長',
      grade: '12年級',
      bio: '負責財務管理和營運協調的整體規劃，確保組織運作順暢。',
      skills: ['財務管理', '營運協調', '策略規劃'],
      avatar: '趙',
      color: 'bg-orange-500'
    },
    {
      name: '錢淑惠',
      role: '財務管理員',
      grade: '11年級',
      bio: '專責帳務處理和財務報表製作，確保財務透明度。',
      skills: ['帳務處理', '財務報表', '預算控制'],
      avatar: '錢',
      color: 'bg-orange-600'
    },
    {
      name: '孫志明',
      role: '庫存管理員',
      grade: '11年級',
      bio: '負責原料和成品的庫存控制，確保供應鏈穩定。',
      skills: ['庫存控制', '供應管理', '數據分析'],
      avatar: '孫',
      color: 'bg-orange-700'
    },
    {
      name: '李雅芳',
      role: '營運助理',
      grade: '10年級',
      bio: '協助日常營運事務處理和跨組溝通協調。',
      skills: ['營運支援', '溝通協調', '行政處理'],
      avatar: '李',
      color: 'bg-orange-800'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-orange-100 py-20">
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
                總務組
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                負責財務管理、庫存控制和日常營運，確保組織的穩定運作和資源有效利用。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-orange-50">
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
              我們的總務組成員致力於維護組織的穩定運作和財務健康。
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
                    <p className="text-orange-600 font-medium mb-1">
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
                          className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links (placeholder) */}
                    <div className="flex justify-center space-x-3">
                      <button className="text-gray-400 hover:text-orange-600 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-orange-600 transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-orange-600 transition-colors">
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
