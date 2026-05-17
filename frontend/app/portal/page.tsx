'use client'
import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function PortalPage() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then((response) => {
      const session = response.data?.session
      if (!session) router.replace('/login')
    })
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">NSS HSE Portal</h1>
            <p className="text-lg text-green-100 mt-2">Cloud-Native HSE Management</p>
          </div>
          <button onClick={handleSignOut} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold">
            Sign Out
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to NSS HSE Portal</h2>
          <p className="text-gray-600 mb-6">Cloud-Native HSE Management Platform for UAE Construction & O&G</p>
          <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg text-green-800">
            <p className="font-semibold">✅ NSS HSE Portal Ready</p>
            <p>Phase 1 Development in Progress - Week 1 Complete</p>
          </div>
        </div>
        <div className="mt-8 text-center text-green-100 text-sm">
          <p>© 2025 NSS HSE Portal</p>
        </div>
      </div>
    </div>
  )
}
