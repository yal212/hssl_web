import Link from 'next/link'
import Image from 'next/image'
import { Heart, Mail, Instagram, Facebook, MapPin, Phone, ExternalLink, Accessibility } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-green-600">
                <Image
                  src="/hssl_profile.jpg"
                  alt="High School Soap Lab | 高中生手工皂實驗室"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-xl">High School Soap Lab</div>
                <div className="text-green-200 text-sm">高中生手工皂實驗室</div>
              </div>
            </div>
            <p className="text-green-100 mb-6 max-w-md leading-relaxed">
              推廣清潔環保手工皂，為地球和世界創造更美好的未來。由高中學生發起的環保教育計畫，致力於永續發展與社會關懷。
            </p>

            {/* Social Media */}
            <div className="mb-6">
              <h4 className="font-semibold text-lg mb-3">追蹤我們</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/high.school.soap.lab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-200 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="Instagram (在新視窗開啟)"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://www.facebook.com/groups/488135418924034/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-200 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="Facebook (在新視窗開啟)"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="mailto:contact@hssoapllab.org"
                  className="text-green-200 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="發送電子郵件"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Site Map */}
          <div>
            <h3 className="font-semibold text-lg mb-4">網站導覽</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-green-200 hover:text-white transition-colors duration-200 hover:underline">
                  首頁
                </Link>
              </li>
              <li>
                <Link href="/about/what-we-do" className="text-green-200 hover:text-white transition-colors duration-200 hover:underline">
                  我們在做什麼
                </Link>
              </li>
              <li>
                <Link href="/about/our-team" className="text-green-200 hover:text-white transition-colors duration-200 hover:underline">
                  我們的團隊
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-green-200 hover:text-white transition-colors duration-200 hover:underline">
                  最新消息
                </Link>
              </li>
              <li>
                <Link href="/education" className="text-green-200 hover:text-white transition-colors duration-200 hover:underline">
                  教育中心
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-green-200 hover:text-white transition-colors duration-200 hover:underline">
                  支持我們
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">參與支持</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://famistore.famiport.com.tw/users/3278142"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-200 hover:text-white transition-colors duration-200 hover:underline flex items-center"
                >
                  購買手工皂
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </li>
              <li>
                <Link href="/support" className="text-green-200 hover:text-white transition-colors duration-200 hover:underline">
                  慈善捐款
                </Link>
              </li>
              <li>
                <Link href="/about/contact" className="text-green-200 hover:text-white transition-colors duration-200 hover:underline">
                  志工參與
                </Link>
              </li>
              <li>
                <a
                  href="https://linktr.ee/hsslforms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-200 hover:text-white transition-colors duration-200 hover:underline flex items-center"
                >
                  表單連結
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@hssoapllab.org"
                  className="text-green-200 hover:text-white transition-colors duration-200 hover:underline"
                >
                  聯絡我們
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-200 text-sm">
            © 2021-2025 High School Soap Lab。保留所有權利。
          </p>
          <p className="text-green-200 text-sm flex items-center mt-2 md:mt-0">
            由學生用 <Heart size={16} className="mx-1 text-red-400" /> 製作，為更美好的世界
          </p>
        </div>
      </div>
    </footer>
  )
}
