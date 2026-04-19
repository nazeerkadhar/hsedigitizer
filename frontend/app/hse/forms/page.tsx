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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              HSE Officer Dashboard
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Welcome! You are logged in.
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Sign Out
          </button>
        </div>
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          ✅ Authentication Successful. Role: HSE Officer.
        </div>
      </div>
    </div>
  )
}// updated
