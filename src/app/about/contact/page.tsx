'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  ExternalLink
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import {
  fadeInUp,
  staggerContainer,
  floating
} from '@/lib/animations'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const contactInfo = [
    {
      icon: Mail,
      title: '電子郵件',
      content: 'hssl@example.com',
      description: '我們會在24小時內回覆您的郵件',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Phone,
      title: '聯絡電話',
      content: ' - ',
      description: ' - ',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: MapPin,
      title: '地址',
      content: '台北市中正區濟南路一段71號',
      description: '臺北市立成功高級中學',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const socialMedia = [
    {
      name: 'Instagram',
      handle: '@high.school.soap.lab',
      url: 'https://www.instagram.com/high.school.soap.lab',
      color: 'text-pink-600',
      iconSrc: '/instagram_icon.png',
      iconAlt: 'Instagram'
    },
    {
      name: 'Facebook',
      handle: 'High School Soap Lab.',
      url: 'https://www.facebook.com/groups/488135418924034/',
      color: 'text-blue-600',
      iconSrc: '/facebook_icon.svg',
      iconAlt: 'Facebook'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen bg-cream"
    >
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="inline-block mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={80} className="text-green-200" />
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              variants={floating}
              initial="initial"
              animate="animate"
            >
              聯絡我們
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              有任何問題或想要了解更多？
              我們很樂意與您交流，歡迎隨時聯絡我們
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              聯絡資訊
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              多種聯絡方式，選擇最適合您的方式與我們取得聯繫
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="h-full text-center border-2 border-white shadow-lg">
                  <CardContent className="p-6">
                    <motion.div
                      className={`w-16 h-16 ${info.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 360
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <info.icon size={32} className={info.color} />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                    <p className="text-gray-900 font-medium mb-2 whitespace-nowrap">{info.content}</p>
                    <p className="text-gray-600 text-sm">{info.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              發送訊息
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              填寫下方表單，我們會盡快回覆您
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card className="border-2 border-white shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        姓名 *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="請輸入您的姓名"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        電子郵件 *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="請輸入您的電子郵件"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      主旨 *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="請輸入訊息主旨"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      訊息內容 *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-vertical"
                      placeholder="請輸入您想要傳達的訊息..."
                    />
                  </div>
                  
                  <div className="text-center">
                    <Button type="submit" size="lg" className="px-8">
                      <Send size={20} className="mr-2" />
                      發送訊息
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              社群媒體
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              關注我們的社群媒體，獲得最新消息和活動資訊
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {socialMedia.map((social) => (
              <motion.div
                key={social.name}
                variants={fadeInUp}
              >
                <Card hover className="h-full border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center">
                      <Image
                        src={social.iconSrc}
                        alt={social.iconAlt}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{social.name}</h3>
                    <p className="text-gray-600 mb-4">{social.handle}</p>
                    <Button variant="outline" size="sm" asChild>
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        關注我們
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <Card className="border-2 border-white shadow-xl bg-gradient-to-br from-green-600 to-green-700">
              <CardContent className="p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  還想了解更多嗎？
                </h3>
                <p className="text-xl text-green-100 mb-8 leading-relaxed">
                  探索我們的其他頁面，深入了解 HSSL 的各個面向
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/about/what-we-do">
                      我們在做什麼
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                    <Link href="/about/our-team">
                      我們的團隊
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                    <Link href="/about/honors">
                      榮譽榜
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
