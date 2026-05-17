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
      if (!session) {
        router.replace('/login')
      }
    })
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">
              NSS HSE Portal
            </h1>
            <p className="text-lg text-green-100 mt-2">
              Cloud-Native HSE Management Dashboard
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
          >
            Sign Out
          </button>
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to NSS HSE Portal
          </h2>
          <p className="text-gray-600 mb-6">
            Cloud-Native HSE Management Platform for UAE Construction & O&G
          </p>
          
          <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg text-green-800 mb-6">
            <p className="font-semibold text-lg">✅ NSS HSE Portal Ready</p>
            <p>Phase 1 Development in Progress</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
              <div className="text-3xl mb-2">🚨</div>
              <h3 className="text-xl font-bold text-red-900 mb-2">Incident Reporting</h3>
              <p className="text-red-800 text-sm">Coming in Week 2</p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="text-xl font-bold text-orange-900 mb-2">TRA Automation</h3>
              <p className="text-orange-800 text-sm">Coming in Week 4</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <div className="text-3xl mb-2">📁</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Project Tracker</h3>
              <p className="text-blue-800 text-sm">Coming in Week 7</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">Audit Management</h3>
              <p className="text-purple-800 text-sm">Coming in Week 7</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-green-100 text-sm">
          <p>© 2025 NSS HSE Portal | Cloud-Native HSE Management Platform</p>
        </div>
      </div>
    </div>
  )
}
