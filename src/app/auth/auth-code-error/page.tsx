'use client'

import { motion } from 'framer-motion'
import { XCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-4"
        >
          <XCircle className="h-12 w-12 text-red-600" />
        </motion.div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Authentication Error
        </h2>
        
        <p className="text-gray-600 mb-6">
          There was an error processing your authentication. This could happen if:
        </p>
        
        <ul className="text-left text-sm text-gray-600 mb-6 space-y-1">
          <li>• The confirmation link has expired</li>
          <li>• The link has already been used</li>
          <li>• There was a network error</li>
        </ul>
        
        <div className="space-y-3">
          <Link href="/login">
            <Button variant="primary" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </Link>
          
          <p className="text-xs text-gray-500">
            If you continue to have issues, please try requesting a new confirmation email.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
