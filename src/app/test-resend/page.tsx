'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'

export default function TestResendPage() {
  const [email, setEmail] = useState('yalee212@gmail.com')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleResendConfirmation = async () => {
    if (!email) {
      setResult({ success: false, message: 'Please enter an email address' })
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      // Resend confirmation email
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        setResult({ 
          success: false, 
          message: `Failed to send email: ${error.message}` 
        })
      } else {
        setResult({ 
          success: true, 
          message: `Confirmation email sent successfully to ${email}!` 
        })
      }
    } catch (error) {
      setResult({ 
        success: false, 
        message: `Unexpected error: ${error}` 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Test Email Confirmation
          </h1>
          <p className="text-gray-600">
            Send a new confirmation email to test the updated flow
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter email address"
          />
        </div>

        {/* Send Button */}
        <Button
          onClick={handleResendConfirmation}
          disabled={isLoading || !email}
          variant="primary"
          className="w-full flex items-center justify-center mb-4"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send Confirmation Email
            </>
          )}
        </Button>

        {/* Result Message */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border ${
              result.success 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-start">
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
              )}
              <p className={`text-sm ${
                result.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.message}
              </p>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Testing Instructions:</h3>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. Click "Send Confirmation Email" above</li>
            <li>2. Check the email inbox for yalee212@gmail.com</li>
            <li>3. Click the confirmation link in the NEW email</li>
            <li>4. Should go to the new "Email Confirmed" page</li>
            <li>5. Try clicking the same link again</li>
            <li>6. Should go to the new "Already Confirmed" page</li>
          </ol>
        </div>

        {/* Additional Info */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-xs text-yellow-800">
            <strong>Note:</strong> Old confirmation emails (sent before the changes) will still use the old flow. 
            This new email will use the updated callback logic and redirect to the new pages.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
