'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MemberModal } from '@/components/ui/MemberModal'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CharitySalesGroupPage() {
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
      name: '蔡昕恩',
      role: '義賣規劃組員',
      introduction: '負責企業認購聯繫與合作洽談，具有優秀的商業溝通能力。善於建立長期合作關係，為義賣活動爭取更多支持。',
      color: 'bg-teal-500'
    },
    {
      name: '陳語欣',
      role: '義賣規劃組員',
      introduction: '專責義賣文宣設計與宣傳策略，具有創意思維與美感。能夠製作出吸引人的宣傳素材，提升義賣活動的知名度。',
      color: 'bg-teal-600'
    },
    {
      name: '蔡昀恩',
      role: '義賣規劃組員',
      introduction: '負責義賣活動規劃與執行，具有豐富的活動辦理經驗。注重細節與品質，確保每個義賣活動都能達到預期效果。',
      color: 'bg-teal-700'
    },
    {
      name: '林祖妤',
      role: '義賣規劃組員',
      introduction: '協助各項義賣工作與客戶服務，具有親和力與服務熱忱。善於與人溝通，為義賣活動帶來正面的形象與口碑。',
      color: 'bg-teal-800'
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
                義賣規劃
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                負責企業認購以及義賣文宣。
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
                <Card
                  hover
                  className="h-full border-2 border-white cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-teal-200"
                  onClick={() => openMemberModal(member)}
                >
                  <CardContent className="p-6 text-center">
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-teal-200">
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
                    <p className="text-teal-600 font-semibold mb-4">
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
          borderColor="border-teal-200"
        />
      )}
    </div>
  )
}
