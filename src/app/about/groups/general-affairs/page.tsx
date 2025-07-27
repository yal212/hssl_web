'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MemberModal } from '@/components/ui/MemberModal'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function GeneralAffairsGroupPage() {
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
      name: '謝舒安',
      role: '總務組組長',
      introduction: '2021年疫情爆發的暑假，我跟著姐姐一起學習手工皂的製作，認識了手工皂的美好，參與了HSSL皂顧醫護的送皂活動覺得非常有意義!期待跟著大家繼續皂顧地球!',
      color: 'bg-emerald-500'
    },
    {
      name: '龔昀晴',
      role: '總務組組長',
      introduction: '在疫情期間，我就有參加過HSSL舉辦的皂顧醫護的活動，也對藉由做手工皂來幫助有需要的人感興趣，在2025加入HSSL ，希望之後在這個團隊中能幫助到在社會上有需要的人。',
      color: 'bg-emerald-600'
    },
    {
      name: '劉峻成',
      role: '總務組組員',
      introduction: '我是來自康橋秀岡的劉峻成。在同學的邀請下，我加入了 High school soap lab，也了解到了這個組織成立的初衷和重要性。我希望自己可以對於皂化反應更加熟悉，並透過製作肥皂來幫助有需要的人，並在團隊中貢獻一分心力。',
      color: 'bg-teal-600'
    },
    {
      name: '黃翊棠',
      role: '總務組組員',
      introduction: ' - ',
      color: 'bg-teal-700'
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
                總務組
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                負責餐飲安排以及原物料訂購。
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
                  className="h-full border-2 border-white cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-orange-200"
                  onClick={() => openMemberModal(member)}
                >
                  <CardContent className="p-6 text-center">
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-orange-200">
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
                    <p className="text-orange-600 font-semibold mb-4">
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
          borderColor="border-orange-200"
        />
      )}
    </div>
  )
}
