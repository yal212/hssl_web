'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Mail, Linkedin, Instagram } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AdvisorGroupPage() {
  const groupMembers = [
    {
      name: '施朱娟',
      role: '指導老師',
      grade: '',
      bio: '',
      skills: [],
      avatar: '',
      color: 'bg-green-500'
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
                指導老師
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                提供專業指導與學術支持，協助團隊發展與成長。
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
              指導老師介紹
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              我們的指導老師提供專業的學術指導和支持。
            </p>
          </motion.div>

          <div className="flex justify-center">
            <div className="w-full max-w-md">
              {groupMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card hover className="h-full border-2 border-white">
                    <CardContent className="p-8 text-center">
                      {/* Avatar */}
                      <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-green-200">
                        <Image
                          src="/hssl_profile.jpg"
                          alt={member.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-green-600 font-semibold text-lg mb-6">
                        {member.role}
                      </p>

                      {/* Social Links (placeholder) */}
                      <div className="flex justify-center space-x-4">
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
        </div>
      </section>
    </div>
  )
}
