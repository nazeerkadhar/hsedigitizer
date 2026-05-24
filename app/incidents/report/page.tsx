'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const INCIDENT_TYPES = ['Accident', 'Incident', 'Near miss', 'Property damage', 'Fatality', 'Injuries', 'First aid', 'Fire']

export default function IncidentReportPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    incident_type: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    victim_name: '',
    description: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (!formData.incident_type) throw new Error('Incident type required')
      if (!formData.location) throw new Error('Location required')
      if (!formData.description) throw new Error('Description required')

      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error: insertError } = await supabase
        .from('incidents')
        .insert([{
          user_id: user.id,
          incident_type: formData.incident_type,
          location: formData.location,
          date: new Date(`${formData.date}T${formData.time}`).toISOString(),
          time: formData.time,
          victim_name: formData.victim_name || null,
          description: formData.description,
          status: 'Open'
        }])

      if (insertError) throw insertError
      setSuccess('Incident reported successfully!')
      setTimeout(() => router.push('/hse/forms'), 2000)

    } catch (err: any) {
      setError(err.message || 'Failed to report incident')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Incident</h1>
          <p className="text-gray-600 mb-6">Fill in the incident details</p>
          {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><p className="text-red-700 font-semibold">❌ {error}</p></div>}
          {success && <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6"><p className="text-green-700 font-semibold">✅ {success}</p></div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Incident Type *</label><select name="incident_type" value={formData.incident_type} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"><option value="">Select incident type</option>{INCIDENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}</select></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label><input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g., Site A, Building 3" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"/></div>
            <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label><input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"/></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Time *</label><input type="time" name="time" value={formData.time} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"/></div></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Victim Name (optional)</label><input type="text" name="victim_name" value={formData.victim_name} onChange={handleInputChange} placeholder="Leave blank if no victim" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"/></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label><textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe what happened..." rows={4} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"/></div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all">{loading ? '⏳ Submitting...' : '🚨 Report Incident'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
