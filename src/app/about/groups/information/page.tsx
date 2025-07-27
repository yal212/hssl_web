'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MemberModal } from '@/components/ui/MemberModal'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function InformationGroupPage() {
  const [selectedMember, setSelectedMember] = useState<typeof groupMembers[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openMemberModal = (member: typeof groupMembers[0]) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const closeMemberModal = () => {
    setIsModalOpen(false)
    setSelectedMember(null)
  }
  const groupMembers = [
    {
      name: '江新泉',
      role: '資訊組組長',
      introduction: '負責資訊組的技術規劃與系統開發，具有豐富的程式設計經驗。專精於網站開發與資料庫管理，致力於提升團隊的數位化水準。',
      color: 'bg-green-500'
    },
    {
      name: '陳宇碩',
      role: '資訊組組員',
      introduction: '專責問卷設計與資料分析，具有優秀的邏輯思維能力。善於運用科技工具提升工作效率，是團隊中的技術專家。',
      color: 'bg-green-600'
    },
    {
      name: '李曜安',
      role: '資訊組組員',
      introduction: '負責保險資料處理與系統維護，做事細心且具有責任感。善於學習新技術，持續為團隊帶來創新的解決方案。',
      color: 'bg-green-700'
    }
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-cream py-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button variant="outline" className="mb-6" asChild>
              <Link href="/about/our-team">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回我們的團隊
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
      <section className="py-20 bg-cream">
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
                <Card
                  hover
                  className="h-full border-2 border-white cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-green-200"
                  onClick={() => openMemberModal(member)}
                >
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
                    <p className="text-green-600 font-semibold mb-4">
                      {member.role}
                    </p>

                    {/* Click hint */}
                    <p className="text-gray-500 text-sm">
                      查看詳細介紹
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Modal */}
      {selectedMember && (
        <MemberModal
          isOpen={isModalOpen}
          onClose={closeMemberModal}
          member={selectedMember}
          borderColor="border-green-200"
        />
      )}
    </div>
  )
}
