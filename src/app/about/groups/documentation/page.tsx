'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MemberModal } from '@/components/ui/MemberModal'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function DocumentationGroupPage() {
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
      name: '饒子儀',
      role: '文書美宣組組長',
      introduction: '2024年寒假的時候接觸到了 High school soap lab ，體驗了做肥皂也解了這個社團的初衷。我非常享受做肥皂的過程也很開心可以做公益幫助更多人，希望之後能在這個社團學習到更多東西。',
      color: 'bg-green-500'
    },
    {
      name: '張育瑄',
      role: '文書美宣組組長',
      introduction: '國一時因為姊姊加入這個團隊  我也跟著接觸打皂，覺得很有趣，也因看著姐姐跟著這個團體學到很多東西，就希望自也能在高中加入，一起學習透過手工皂做公益，並豐富我的高中生活。',
      color: 'bg-green-600'
    },
    {
      name: '林芸安',
      role: '文書美宣組組長',
      introduction: '寒假的時候在Anna的帶領下認識了High SCHOOL SOAP LAB並實際體驗了製作肥皂的過程。也因此希望能夠在這段時間透過做工藝的方式幫助更多需要的人並且也了解更多關於肥皂的意義!',
      color: 'bg-green-700'
    },
    {
      name: '林祐安',
      role: '文書美宣組組長',
      introduction: '身位一位對插畫非常有興趣的人，我很高興能被邀請參與此社團的繪本製作。在製作繪本的過程中，我不僅學到了製作肥皂的步驟，更被這個社團的環保精神打動，意識到了愛護地球的重要性！',
      color: 'bg-green-800'
    },
    {
      name: '郭芃妘',
      role: '文書美宣組組員',
      introduction: '由家人在網路上發現這個志工團體，加入團隊後希望能透過自己小小的力量幫助到需要的人，並在其中學習、累積各種經驗。',
      color: 'bg-green-900'
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
            <Button variant="outline" className="mb-6" asChild>
              <Link href="/about/our-team">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回我們的團隊
              </Link>
            </Button>
            
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                文書美宣組
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                負責經營臉書、IG帳號以及海報設計。
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
                  className="h-full border-2 border-white cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-purple-200"
                  onClick={() => openMemberModal(member)}
                >
                  <CardContent className="p-6 text-center">
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-purple-200">
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
                    <p className="text-purple-600 font-semibold mb-4">
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
          borderColor="border-purple-200"
        />
      )}
    </div>
  )
}
