'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function IncidentsListPage() {
  const [incidents, setIncidents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchIncidents()
  }, [])

  const fetchIncidents = async () => {
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('incidents')
        .select('*')
        .order('created_at', { ascending: false })
      if (fetchError) throw fetchError
      setIncidents(data || [])
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch incidents')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Incidents List</h1>
            <a href="/incidents/test" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ New</a>
          </div>
          {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><p className="text-red-700">{error}</p></div>}
          {loading && <div className="text-center py-12"><p className="text-gray-600">Loading...</p></div>}
          {!loading && incidents.length === 0 && <div className="text-center py-12"><p className="text-gray-600">No incidents yet</p></div>}
          {!loading && incidents.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Victim</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident) => (
                    <tr key={incident.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{incident.incident_type}</td>
                      <td className="px-4 py-3 text-sm">{incident.location}</td>
                      <td className="px-4 py-3 text-sm">{formatDate(incident.date)}</td>
                      <td className="px-4 py-3 text-sm">{incident.victim_name || '-'}</td>
                      <td className="px-4 py-3 text-sm"><span className="px-3 py-1 rounded text-white text-xs bg-red-600">{incident.status}</span></td>
                      <td className="px-4 py-3 text-sm truncate">{incident.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-8 text-center">
            <a href="/" className="text-green-600 hover:underline">← Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  )
}
