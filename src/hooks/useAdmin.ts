'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface AdminState {
  isAdmin: boolean
  loading: boolean
  error: string | null
}

export function useAdmin() {
  const { user, profile, loading: authLoading } = useAuth()
  const [adminState, setAdminState] = useState<AdminState>({
    isAdmin: false,
    loading: true,
    error: null
  })

  useEffect(() => {
    if (authLoading) {
      setAdminState(prev => ({ ...prev, loading: true }))
      return
    }

    if (!user || !profile) {
      setAdminState({
        isAdmin: false,
        loading: false,
        error: null
      })
      return
    }

    // Check if user has admin role
    const isAdmin = profile.role === 'admin'
    
    setAdminState({
      isAdmin,
      loading: false,
      error: null
    })
  }, [user, profile, authLoading])

  return {
    ...adminState,
    user,
    profile
  }
}
