'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MemberModal } from '@/components/ui/MemberModal'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'


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
      introduction: '我是林秉用，2024年高一升高二 成功高中的學生，參加社團的目的在於製作肥皂以供自己使用，能夠盡微薄之力為團隊獻上一份力，也是我的榮幸。',
      color: 'bg-green-500'
    },
    {
      name: '林楷哲',
      role: '設備組組長',
      introduction: '一年級在林秉用的介紹下接觸了High school soap lab，認識了很多很有能力的學長姐和學弟妹，希望我在未來能持續進步，為這個團隊貢獻、付出，讓更多人知道如何守護我們僅有的地球，皂顧全世界！',
      color: 'bg-green-600'
    },
    {
      name: '黃謙如',
      role: '設備組組長',
      introduction: '小時候有做過肥皂，但不算有太多經驗，是因為喜歡手作所以決定加入這個社團。希望可以透過這個社團能夠發揮自己身為社會一分子的影響力，幫助更多人，也保護大自然的生態。',
      color: 'bg-green-700'
    },
    {
      name: '林俊祥',
      role: '設備組組長',
      introduction: '我從高一加入HSSL,到現在過了一年，我參加過喜樂園活動還有大大小小的義賣活動，對於製作肥皂有一定的熟練度，對於任何新事物具有好奇心，有意願挑戰。',
      color: 'bg-green-800'
    },
    {
      name: '賴秉宸',
      role: '設備組組員',
      introduction: '經過我高一的班導介紹HSSL後，就有興趣參加這個團隊，一部份是為了充實高中生活，也是希望透過這個志工團體認識到不同領域的人。期望透過這一次次的付出累積自己的經驗。',
      color: 'bg-green-900'
    },
    {
      name: '陳博軒',
      role: '設備組組員',
      introduction: '我從國小時就非常喜歡自然科學也喜歡動手做小實驗，尤其是觀察化學變化在2025的6月我加入了HSSL 這個團隊，希望可以做環保貢獻社會，也希望能學習到化學方面的知識。',
      color: 'bg-green-950'
    },
    {
      name: '鄭嵐霙',
      role: '設備組組員',
      introduction: '加入hssl是因為對化學以及實作製作肥皂的過程很感興趣，也希望能將這份興趣應用在服務社區的行動中。很期待能和大家一起學習、合作，在這段過程中成長、累積經驗！',
      color: 'bg-emerald-500'
    },
    {
      name: '張呈瑞',
      role: '設備組組員',
      introduction: '我是來自康橋秀岡的張呈瑞，在同學的邀請下，我加入了 High School SoaP Lab。我期許自己能夠在團隊中學習製皂技術與化學原理，積極參與公益行動，與大家一起在每一塊肥皂中實踐理念，為團隊貢獻一份心力。',
      color: 'bg-emerald-600'
    }
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-cream py-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-block mb-6">
              <Button variant="outline" asChild>
                <Link href="/about/our-team">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回我們的團隊
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                設備組
              </h1>
              <motion.p
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
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
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{
                  scale: 0.99,
                  transition: { duration: 0.1 }
                }}
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
                        scale: 1.05,
                        borderColor: "#10b981",
                        boxShadow: "0 5px 15px rgba(16, 185, 129, 0.2)"
                      }}
                      transition={{ duration: 0.2 }}
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
