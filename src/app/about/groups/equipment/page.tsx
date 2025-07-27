'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MemberModal } from '@/components/ui/MemberModal'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {
  scrollReveal,
  scrollSlideIn,
  cardHover,
  buttonHover,
  floating,
  hoverBounce
} from '@/lib/animations'

export default function EquipmentGroupPage() {
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
      name: '林秉用',
      role: '設備組組長',
      introduction: '負責設備組的整體規劃與管理，確保實驗器材的安全性與完整性。具有豐富的器材管理經驗，致力於提升團隊的工作效率。',
      color: 'bg-green-500'
    },
    {
      name: '林楷哲',
      role: '設備組組長',
      introduction: '專精於實驗器材的維護與保養，負責協調各項設備的使用與分配。擅長解決技術問題，是團隊中的技術支柱。',
      color: 'bg-green-600'
    },
    {
      name: '黃謙如',
      role: '設備組組長',
      introduction: '負責藥品配置與安全管理，具備豐富的化學知識背景。注重實驗安全，確保所有操作都符合安全標準。',
      color: 'bg-green-700'
    },
    {
      name: '林俊祥',
      role: '設備組組長',
      introduction: '專責現場場佈與器材運送，具有優秀的空間規劃能力。善於團隊協調，確保活動現場的順利進行。',
      color: 'bg-green-800'
    },
    {
      name: '賴秉宸',
      role: '設備組組員',
      introduction: '協助器材整理與維護工作，學習態度積極認真。對於新技術充滿好奇心，是團隊中的學習典範。',
      color: 'bg-green-900'
    },
    {
      name: '陳博軒',
      role: '設備組組員',
      introduction: '負責協助藥品管理與實驗準備工作。細心謹慎，確保每個實驗環節都能順利進行。',
      color: 'bg-green-950'
    },
    {
      name: '鄭嵐霙',
      role: '設備組組員',
      introduction: '協助現場佈置與器材搬運，具有良好的體力與耐力。團隊合作精神佳，是可靠的夥伴。',
      color: 'bg-emerald-500'
    },
    {
      name: '張呈瑞',
      role: '設備組組員',
      introduction: '負責器材清點與整理工作，做事有條理且負責任。善於發現問題並提出改善建議。',
      color: 'bg-emerald-600'
    }
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-cream py-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div {...buttonHover} className="inline-block mb-6">
              <Button variant="outline" asChild>
                <Link href="/about/our-team">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回我們的團隊
                </Link>
              </Button>
            </motion.div>

            <div className="text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                variants={floating}
                initial="initial"
                animate="animate"
              >
                設備組
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                負責器材準備、整理、交通運送、藥品配置以及現場場佈。
              </motion.p>
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
              我們的設備組成員致力於維護作實驗時的安全和效率。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                viewport={{ once: true }}
                {...hoverBounce}
              >
                <Card
                  className="h-full border-2 border-white cursor-pointer shadow-lg"
                  onClick={() => openMemberModal(member)}
                >
                  <CardContent className="p-6 text-center">
                    {/* Avatar */}
                    <motion.div
                      className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-green-200"
                      whileHover={{
                        scale: 1.1,
                        borderColor: "#10b981",
                        boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src="/hssl_profile.jpg"
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

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
