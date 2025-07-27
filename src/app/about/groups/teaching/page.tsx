'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MemberModal } from '@/components/ui/MemberModal'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function TeachingGroupPage() {
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
      name: '莊又晰',
      role: '教學組組長',
      introduction: '2021年和姊姊和朋友們一起成立HSSL,開始皂顧人&地球。至今學會了好多關於環保永續的理念，以及如何籌劃活動。希望可以把這份心帶入學校！邀約更多夥伴一起努力。',
      color: 'bg-green-500'
    },
    {
      name: '黃冠傑',
      role: '教學組組員',
      introduction: '在學校經由同學的介紹，我認識了hssl這個志工團體，由於我很少聽說有志工團體是透過製造肥皂來幫助社會，所以聽到同學的介紹就滿感興趣的，希望未來也能繼續透過作肥皂來幫助需要幫助的人。',
      color: 'bg-green-600'
    },
    {
      name: '張呈瑞',
      role: '教學組組員',
      introduction: '我是來自康橋秀岡的張呈瑞，在同學的邀請下，我加入了 High School SoaP Lab。我期許自己能夠在團隊中學習製皂技術與化學原理，積極參與公益行動，與大家一起在每一塊肥皂中實踐理念，為團隊貢獻一份心力。',
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
                教學組
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                負責製作投影片設計以及配方設計。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              組員介紹
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
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
