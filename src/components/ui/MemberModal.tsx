'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'

interface MemberModalProps {
  isOpen: boolean
  onClose: () => void
  member: {
    name: string
    role?: string
    introduction?: string
    bio?: string
    skills?: string[]
    color: string
    profileImage?: string
  }
  borderColor?: string
}

export function MemberModal({ isOpen, onClose, member, borderColor = 'border-green-200' }: MemberModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-cream rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-gray-200">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Avatar */}
            <div className={`w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 ${borderColor}`}>
              <Image
                src={member.profileImage || "/hssl_profile.jpg"}
                alt={member.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Basic Info */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {member.name}
              </h2>
              {member.role && (
                <p className="text-green-600 font-semibold text-lg">
                  {member.role}
                </p>
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Introduction or Bio */}
            {(member.introduction || member.bio) && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">個人介紹</h3>
                <p className="text-gray-600 leading-relaxed">
                  {member.introduction || member.bio}
                </p>
              </div>
            )}
            
            {/* Skills */}
            {member.skills && member.skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">專業領域</h3>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
