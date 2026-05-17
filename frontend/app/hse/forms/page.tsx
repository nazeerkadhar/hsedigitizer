'use client'
import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function HseFormsPage() {
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
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold transition-all"
          >
            Sign Out
          </button>
        </div>

        {/* Welcome Message */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome to NSS HSE Portal
              </h2>
              <p className="text-gray-600 mt-2">
                You are logged in. Ready to manage HSE operations.
              </p>
            </div>
            <div className="text-5xl">🚀</div>
          </div>

          <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg text-green-800 mb-6">
            <p className="font-semibold text-lg mb-2">✅ NSS HSE Portal Ready</p>
            <p>Your dashboard is fully operational. Phase 1 modules will be activated soon.</p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <p className="font-semibold text-blue-900 mb-2">📋 Phase 1 Roadmap</p>
            <ul className="text-blue-800 space-y-2 text-sm">
              <li>✓ Week 1: Rebrand & Authentication (COMPLETE)</li>
              <li>⏳ Week 2-3: Incident Reporting Module</li>
              <li>⏳ Week 4-5: TRA Automation</li>
              <li>⏳ Week 6: Template Engine</li>
              <li>⏳ Week 7: Project Tracker & Audit Management</li>
              <li>⏳ Week 8: User Management & Permissions</li>
              <li>⏳ Week 9-10: Testing & Deployment</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Incident Reporting */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border-2 border-red-200">
              <div className="text-3xl mb-2">🚨</div>
              <h3 className="text-xl font-bold text-red-900 mb-2">Incident Reporting</h3>
              <p className="text-red-800 text-sm mb-4">
                Report incidents, accidents, near misses with photo evidence and automatic notifications.
              </p>
              <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-semibold transition-all disabled:opacity-50" disabled>
                Coming in Week 2
              </button>
            </div>

            {/* TRA Automation */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border-2 border-orange-200">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="text-xl font-bold text-orange-900 mb-2">TRA Automation</h3>
              <p className="text-orange-800 text-sm mb-4">
                Upload Method Statement. Auto-populate TRA with hazards and risk calculations.
              </p>
              <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 font-semibold transition-all disabled:opacity-50" disabled>
                Coming in Week 4
              </button>
            </div>

            {/* Project Tracker */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200">
              <div className="text-3xl mb-2">📁</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Project Tracker</h3>
              <p className="text-blue-800 text-sm mb-4">
                Track HSE-linked projects, TRA status, incident counts, and locations.
              </p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition-all disabled:opacity-50" disabled>
                Coming in Week 7
              </button>
            </div>

            {/* Audit Management */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-2 border-purple-200">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">Audit Management</h3>
              <p className="text-purple-800 text-sm mb-4">
                Generate audit reports with incident data, TRA status, and compliance summaries.
              </p>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-semibold transition-all disabled:opacity-50" disabled>
                Coming in Week 7
              </button>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Database Status */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Database</p>
                <p className="text-2xl font-bold text-green-600">Connected</p>
              </div>
              <div className="text-4xl">🗄️</div>
            </div>
          </div>

          {/* Authentication */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Authentication</p>
                <p className="text-2xl font-bold text-green-600">Active</p>
              </div>
              <div className="text-4xl">🔐</div>
            </div>
          </div>

          {/* Deployment */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Deployment</p>
                <p className="text-2xl font-bold text-green-600">Live</p>
              </div>
              <div className="text-4xl">🚀</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-green-100 text-sm">
          <p>© 2025 NSS HSE Portal | Cloud-Native HSE Management Platform</p>
          <p className="mt-2">Phase 1 Development (Weeks 1-10)</p>
        </div>
      </div>
    </div>
  )
}
