'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Mail, Linkedin, Instagram } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function EquipmentGroupPage() {
  const groupMembers = [
    {
      name: '陳志明',
      role: '設備組組長',
      grade: '12年級',
      bio: '負責實驗室設備的整體管理和維護計劃制定，確保所有設備運作正常。',
      skills: ['設備維護', '安全管理', '採購規劃'],
      avatar: '陳',
      color: 'bg-green-500'
    },
    {
      name: '李美華',
      role: '安全管理員',
      grade: '11年級',
      bio: '專責實驗室安全規範制定和執行，確保所有操作符合安全標準。',
      skills: ['安全檢查', '風險評估', '緊急應變'],
      avatar: '李',
      color: 'bg-green-600'
    },
    {
      name: '王大明',
      role: '採購專員',
      grade: '11年級',
      bio: '負責設備和原料的採購協調，確保供應鏈穩定和成本控制。',
      skills: ['採購管理', '供應商聯繫', '成本控制'],
      avatar: '王',
      color: 'bg-green-700'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-100 py-20">
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
                設備組
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                負責實驗室設備維護、採購和安全管理，確保所有設備運作正常並維持安全的工作環境。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-green-50">
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
              我們的設備組成員致力於維護實驗室的安全和效率。
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
                    <p className="text-green-600 font-medium mb-1">
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
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links (placeholder) */}
                    <div className="flex justify-center space-x-3">
                      <button className="text-gray-400 hover:text-green-600 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-green-600 transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-green-600 transition-colors">
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
