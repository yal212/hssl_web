'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, LogOut, Edit, Shield } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { ProfileEditModal } from '@/components/ProfileEditModal'
import { Database } from '@/lib/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']

export default function ProfilePage() {
  const { user, profile, loading, isAuthenticated, signOut, refreshProfile } = useAuth()
  const router = useRouter()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [localProfile, setLocalProfile] = useState<Profile | null>(profile)

  useEffect(() => {
    console.log('Profile page - Auth state:', { loading, isAuthenticated, user: !!user, profile: !!profile })
    if (!loading && !isAuthenticated) {
      console.log('Profile page - Redirecting to login (not authenticated)')
      router.push('/login')
    }
  }, [loading, isAuthenticated, router, user, profile])

  // Update local profile when auth profile changes
  useEffect(() => {
    setLocalProfile(profile)
  }, [profile])

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (!error) {
      router.push('/')
    }
  }

  const handleProfileUpdate = async (updatedProfile: Partial<Profile>) => {
    // Optimistically update local state
    setLocalProfile(prev => prev ? { ...prev, ...updatedProfile } : null)

    // Refresh the profile from the server to ensure consistency
    await refreshProfile()

    // Close the modal
    setIsEditModalOpen(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-12 text-white">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white/20 rounded-full overflow-hidden flex items-center justify-center">
                {localProfile?.avatar_url ? (
                  <img
                    src={localProfile.avatar_url}
                    alt="Profile picture"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={48} className="text-white" />
                )}
              </div>
              <div>
                <h2 className="text-3xl font-bold">
                  {localProfile?.full_name || user?.email?.split('@')[0] || 'User'}
                </h2>
                <p className="text-green-100 text-lg">{user?.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Shield size={16} className="text-green-200" />
                  <span className="text-green-200 text-sm">
                    {localProfile?.role || 'Member'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Account Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <User className="mr-2 text-green-600" size={20} />
                  Account Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Mail className="text-gray-500" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-900">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <User className="text-gray-500" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900">
                        {localProfile?.full_name || 'Not provided'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="text-gray-500" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium text-gray-900">
                        {user?.created_at ? formatDate(user.created_at) : 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Edit className="mr-2 text-green-600" size={20} />
                  About
                </h3>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    {localProfile?.bio || 'No bio provided yet. Tell us about yourself!'}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {localProfile?.role === 'admin' ? '∞' : '1'}
                    </p>
                    <p className="text-sm text-gray-600">Access Level</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {user?.email_confirmed_at ? '✓' : '?'}
                    </p>
                    <p className="text-sm text-gray-600">Email Verified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                  >
                    <Edit size={20} className="mr-2" />
                    Edit Profile
                  </button>
                </div>
                
                <button
                  onClick={handleSignOut}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center"
                >
                  <LogOut size={20} className="mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Account Security & Privacy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <Shield className="mx-auto text-green-600 mb-2" size={24} />
              <p className="text-sm font-medium text-gray-900">Secure Authentication</p>
              <p className="text-xs text-gray-600 mt-1">Your account is protected</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <Mail className="mx-auto text-blue-600 mb-2" size={24} />
              <p className="text-sm font-medium text-gray-900">Email Notifications</p>
              <p className="text-xs text-gray-600 mt-1">Stay updated with our news</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <User className="mx-auto text-purple-600 mb-2" size={24} />
              <p className="text-sm font-medium text-gray-900">Privacy Controls</p>
              <p className="text-xs text-gray-600 mt-1">Manage your data preferences</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={localProfile}
        userId={user?.id || ''}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  )
}
