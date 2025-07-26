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
      name: '江新泉',
      role: '資訊組組長',
      color: 'bg-green-500'
    },
    {
      name: '陳宇碩',
      role: '資訊組組員',
      color: 'bg-green-600'
    },
    {
      name: '李曜安',
      role: '資訊組組員',
      color: 'bg-green-700'
    }
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 via-cream to-green-100 py-20">
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
                負責製作問卷、網站設計以及處理保險資料。
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
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-green-200">
                      <Image
                        src="/hssl_profile.jpg"
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-green-600 font-semibold mb-6">
                      {member.role}
                    </p>

                    {/* Social Links (placeholder) */}
                    <div className="flex justify-center space-x-3">
                      <button className="text-gray-400 hover:text-green-600 transition-colors p-2">
                        <Mail className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-green-600 transition-colors p-2">
                        <Linkedin className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-green-600 transition-colors p-2">
                        <Instagram className="w-5 h-5" />
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
