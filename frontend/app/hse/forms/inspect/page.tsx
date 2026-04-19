'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function InspectionFormPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  const [formData, setFormData] = useState({
    site_name: '',
    inspection_date: new Date().toISOString().split('T')[0],
    inspection_type: 'routine',
    inspector_name: '',
    hazards_found: '',
    corrective_actions: '',
    follow_up_required: false,
    follow_up_date: '',
    status: 'draft' as const
  })

  // Check auth on mount
  useEffect(() => {
    supabase.auth.getSession().then((response) => {
      const session = response.data?.session
      if (!session) {
        router.replace('/')
      } else if (session.user) {
        // Pre-fill inspector name
        supabase.from('users').select('full_name').eq('id', session.user.id).single()
          .then(({ data }) => {
            if (data?.full_name) {
              setFormData(prev => ({ ...prev, inspector_name: data.full_name }))
            }
          })
      }
    })
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // Simple session check - NO complex destructuring
      const response = await supabase.auth.getSession()
      const session = response.data?.session
      
      if (!session?.user) throw new Error('Session expired. Please log in again.')

      console.log('📤 Submitting to Supabase...', { user_id: session.user.id, ...formData })

      const { error } = await supabase.from('inspections').insert({
        user_id: session.user.id,
        ...formData,
        checklist: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

      if (error) throw error

      setMessage({ type: 'success', text: '✅ Inspection saved successfully!' })
      
      // Reset key fields
      setFormData(prev => ({
        ...prev,
        site_name: '',
        hazards_found: '',
        corrective_actions: '',
        follow_up_date: ''
      }))

    } catch (err: any) {
      console.error('❌ Submission failed:', err)
      setMessage({ type: 'error', text: `❌ ${err.message || 'Network error. Check console for details.'}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">📋 New HSE Inspection</h1>
          <button onClick={() => router.push('/hse/forms')} className="px-4 py-2 text-gray-600 hover:text-gray-900">← Back</button>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Name *</label>
              <input name="site_name" value={formData.site_name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., LMED Building A" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Inspection Date *</label>
              <input name="inspection_date" type="date" value={formData.inspection_date} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Inspection Type *</label>
              <select name="inspection_type" value={formData.inspection_type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="routine">Routine</option>
                <option value="incident">Incident Follow-up</option>
                <option value="audit">Compliance Audit</option>
                <option value="special">Special Inspection</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Inspector Name *</label>
              <input name="inspector_name" value={formData.inspector_name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Your name" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hazards / Observations</label>
            <textarea name="hazards_found" value={formData.hazards_found} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Describe hazards..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Corrective Actions</label>
            <textarea name="corrective_actions" value={formData.corrective_actions} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Recommended actions..." />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input name="follow_up_required" type="checkbox" checked={formData.follow_up_required} onChange={handleChange} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm font-medium text-gray-700">Follow-up Required</span>
            </label>
            {formData.follow_up_required && (
              <input name="follow_up_date" type="date" value={formData.follow_up_date} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            )}
          </div>

          <button type="submit" disabled={loading} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
            {loading ? 'Saving...' : '💾 Save Inspection'}
          </button>
        </form>
      </div>
    </div>
  )
}