import Link from 'next/link'
import Image from 'next/image'
import { Heart, Mail, Instagram, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src="/hssl_profile.jpg"
                  alt="High School Soap Lab"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-xl">High School Soap Lab</span>
            </div>
            <p className="text-green-100 mb-4 max-w-md">
              製作清潔環保手工皂，為地球和世界創造更美好的未來。
              加入我們的使命，創造永續產品，同時支持慈善事業。
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/high.school.soap.lab/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-200 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/groups/488135418924034/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-200 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <span className="text-green-200">
                <Mail size={20} />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">快速連結</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-green-200 hover:text-white transition-colors">
                  首頁
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-green-200 hover:text-white transition-colors">
                  關於我們
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-green-200 hover:text-white transition-colors">
                  最新消息
                </Link>
              </li>
              <li>
                <Link href="/education" className="text-green-200 hover:text-white transition-colors">
                  教育中心
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-green-200 hover:text-white transition-colors">
                  支持我們
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">參與我們</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-green-200 hover:text-white transition-colors">
                  捐款
                </Link>
              </li>
              <li>
                <Link href="/about#volunteer" className="text-green-200 hover:text-white transition-colors">
                  志工
                </Link>
              </li>
              <li>
                <a href="https://famistore.famiport.com.tw/users/3278142" target="_blank" rel="noopener noreferrer" className="text-green-200 hover:text-white transition-colors">
                  購買手工皂
                </a>
              </li>
              <li>
                <a href="mailto:contact@hssoapllab.org" className="text-green-200 hover:text-white transition-colors">
                  聯絡我們
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-200 text-sm">
            © 2021 High School Soap Lab。保留所有權利。
          </p>
          <p className="text-green-200 text-sm flex items-center mt-2 md:mt-0">
            由學生用 <Heart size={16} className="mx-1 text-red-400" /> 製作，為更美好的世界
          </p>
        </div>
      </div>
    </footer>
  )
}
