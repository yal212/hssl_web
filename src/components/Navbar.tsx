'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()
  const aboutDropdownRef = useRef<HTMLDivElement>(null)

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  // Handle scroll for sticky shrinking header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const navItems = [
    { href: '/', label: '首頁' },
    {
      href: '/about',
      label: '關於我們',
      hasDropdown: true,
      dropdownItems: [
        { href: '/about/what-we-do', label: '我們在做什麼' },
        { href: '/about/our-team', label: '我們的團隊' },
        { href: '/about/honors', label: '榮譽榜' },
        { href: '/about/contact', label: '聯絡我們' },
      ]
    },
    { href: '/news', label: '最新消息' },
    { href: '/education', label: '教育中心' },
    { href: '/support', label: '支持我們' },
    { href: 'https://linktr.ee/hsslforms', label: '表單', external: true },
  ]

  return (
    <nav className={`bg-cream/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-green-100 transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between transition-all duration-300 ${isScrolled ? 'h-14' : 'h-16'}`}>
          {/* Logo with Bilingual Branding */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                className={`rounded-full overflow-hidden ring-2 ring-green-100 group-hover:ring-green-200 transition-all duration-200 ${
                  isScrolled ? 'w-8 h-8' : 'w-10 h-10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/hssl_profile.jpg"
                  alt="High School Soap Lab | 高中生手工皂實驗室"
                  width={isScrolled ? 32 : 40}
                  height={isScrolled ? 32 : 40}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                />
              </motion.div>
              <div className="hidden sm:block">
                <div className={`font-bold text-green-800 group-hover:text-green-700 transition-all duration-200 ${
                  isScrolled ? 'text-lg' : 'text-xl'
                }`}>
                  High School Soap Lab
                </div>
                <div className={`text-green-600 transition-all duration-200 ${
                  isScrolled ? 'text-xs' : 'text-sm'
                }`}>
                  高中生手工皂實驗室
                </div>
              </div>
              <span className={`font-bold text-green-800 group-hover:text-green-700 transition-all duration-200 sm:hidden ${
                isScrolled ? 'text-base' : 'text-lg'
              }`}>
                HSSL
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              item.external ? (
                <motion.a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`${item.label} (在新視窗開啟)`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-200"></span>
                </motion.a>
              ) : item.hasDropdown ? (
                <div
                  key={item.href}
                  className="relative"
                  ref={item.label === '關於我們' ? aboutDropdownRef : undefined}
                >
                  <motion.button
                    onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                    onMouseEnter={() => setAboutDropdownOpen(true)}
                    className="text-green-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group flex items-center focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    aria-expanded={aboutDropdownOpen}
                    aria-haspopup="true"
                    aria-label={`${item.label} 選單`}
                  >
                    {item.label}
                    <motion.div
                      animate={{ rotate: aboutDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} className="ml-1" />
                    </motion.div>
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-200"></span>
                  </motion.button>

                  <AnimatePresence>
                    {aboutDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-green-100 py-2 z-50"
                        onMouseLeave={() => setAboutDropdownOpen(false)}
                      >
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
                            onClick={() => setAboutDropdownOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  key={item.href}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={item.href}
                    className="text-green-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-200"></span>
                  </Link>
                </motion.div>
              )
            ))}

            {/* User Authentication Section */}
            {user ? (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-green-200">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/profile"
                    className="text-green-700 hover:text-green-600 hover:bg-green-50 p-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                    title="個人資料"
                    aria-label="個人資料"
                  >
                    <User size={isScrolled ? 16 : 18} />
                  </Link>
                </motion.div>
                <motion.button
                  onClick={handleSignOut}
                  className="text-green-700 hover:text-red-600 hover:bg-red-50 p-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                  title="登出"
                  aria-label="登出"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut size={isScrolled ? 16 : 18} />
                </motion.button>
              </div>
            ) : (
              <div className="ml-4 pl-4 border-l border-green-200 flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/signup"
                    className="text-green-600 hover:text-green-700 px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 rounded-md"
                  >
                    註冊
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/login"
                    className="bg-green-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
                  >
                    登入
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-700 hover:text-green-600 hover:bg-green-50 p-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              whileTap={{ scale: 0.95 }}
              aria-expanded={isOpen}
              aria-label={isOpen ? '關閉選單' : '開啟選單'}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={isScrolled ? 20 : 24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={isScrolled ? 20 : 24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-cream/95 backdrop-blur-md border-t border-green-100 shadow-lg"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-green-100"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : item.hasDropdown ? (
                    <div className="space-y-1">
                      <div className="px-4 py-3 text-gray-700 text-base font-medium">
                        {item.label}
                      </div>
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className="block px-8 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg text-sm transition-all duration-200 border border-transparent hover:border-green-100"
                          onClick={() => setIsOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-green-100"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* User Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 + 0.1, duration: 0.3 }}
                className="pt-4 mt-4 border-t border-gray-100"
              >
                {user ? (
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-green-100"
                      onClick={() => setIsOpen(false)}
                    >
                      <User size={18} className="mr-3" />
                      個人資料
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg text-base font-medium transition-all duration-200 border border-transparent hover:border-red-100"
                    >
                      <LogOut size={18} className="mr-3" />
                      登出
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/signup"
                      className="block px-4 py-3 text-center border border-green-600 text-green-600 hover:bg-green-50 rounded-lg text-base font-medium transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      註冊
                    </Link>
                    <Link
                      href="/login"
                      className="block px-4 py-3 text-center bg-green-600 text-white hover:bg-green-700 rounded-lg text-base font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                      onClick={() => setIsOpen(false)}
                    >
                      登入
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
