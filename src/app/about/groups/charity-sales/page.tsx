'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Mail, Linkedin, Instagram } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CharitySalesGroupPage() {
  const groupMembers = [
    {
      name: '謝雅雯',
      role: '義賣規劃組長',
      grade: '12年級',
      bio: '負責義賣活動的整體規劃和慈善合作策略，確保社會影響最大化。',
      skills: ['義賣規劃', '策略制定', '影響評估'],
      avatar: '謝',
      color: 'bg-teal-500'
    },
    {
      name: '何志豪',
      role: '慈善合作專員',
      grade: '11年級',
      bio: '專責與慈善機構的聯繫合作，建立長期夥伴關係。',
      skills: ['慈善合作', '夥伴關係', '聯繫協調'],
      avatar: '何',
      color: 'bg-teal-600'
    },
    {
      name: '葉美玲',
      role: '影響評估專員',
      grade: '11年級',
      bio: '負責社會影響的評估和追蹤，確保慈善效果的可見性。',
      skills: ['影響評估', '數據分析', '報告撰寫'],
      avatar: '葉',
      color: 'bg-teal-700'
    },
    {
      name: '陳建華',
      role: '義賣執行專員',
      grade: '10年級',
      bio: '負責義賣活動的具體執行和現場管理，確保活動順利進行。',
      skills: ['活動執行', '現場管理', '志工協調'],
      avatar: '陳',
      color: 'bg-teal-800'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-teal-100 py-20">
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
                義賣規劃
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                負責義賣活動規劃、慈善合作和社會影響評估，將商業成果轉化為有意義的社會貢獻。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-teal-50">
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
              我們的義賣規劃組成員致力於創造有意義的社會影響和慈善貢獻。
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
                    <p className="text-teal-600 font-medium mb-1">
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
                          className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links (placeholder) */}
                    <div className="flex justify-center space-x-3">
                      <button className="text-gray-400 hover:text-teal-600 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-teal-600 transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-teal-600 transition-colors">
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
