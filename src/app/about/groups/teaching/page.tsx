'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Mail, Linkedin, Instagram } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function TeachingGroupPage() {
  const groupMembers = [
    {
      name: '張雅婷',
      role: '教學組組長',
      grade: '12年級',
      bio: '負責手工皂製作技術的教學規劃和課程設計，確保知識有效傳承。',
      skills: ['技術教學', '課程設計', '知識管理'],
      avatar: '張',
      color: 'bg-blue-500'
    },
    {
      name: '林志豪',
      role: '配方研發員',
      grade: '11年級',
      bio: '專責手工皂配方的研發和改良，確保產品品質和創新。',
      skills: ['配方研發', '化學分析', '產品創新'],
      avatar: '林',
      color: 'bg-blue-600'
    },
    {
      name: '黃淑芬',
      role: '品質控制員',
      grade: '11年級',
      bio: '負責產品品質檢測和標準制定，確保每批產品符合品質要求。',
      skills: ['品質檢測', '標準制定', '流程監控'],
      avatar: '黃',
      color: 'bg-blue-700'
    },
    {
      name: '劉建國',
      role: '技術指導員',
      grade: '10年級',
      bio: '協助新成員學習手工皂製作技術，提供技術支援和指導。',
      skills: ['技術指導', '新人培訓', '操作示範'],
      avatar: '劉',
      color: 'bg-blue-800'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20">
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
                教學組
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                負責手工皂製作技術教學和知識傳承，確保技術標準和產品品質的持續提升。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-blue-50">
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
              我們的教學組成員致力於技術傳承和品質提升。
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
                    <p className="text-blue-600 font-medium mb-1">
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
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links (placeholder) */}
                    <div className="flex justify-center space-x-3">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-600 transition-colors">
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
