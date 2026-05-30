'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function TRAListPage() {
  const [tras, setTras] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTRAs()
  }, [])

  const fetchTRAs = async () => {
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('tras')
        .select('*')
        .order('created_at', { ascending: false })
      if (fetchError) throw fetchError
      setTras(data || [])
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch TRAs')
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'Extreme': return 'bg-red-600'
      case 'High': return 'bg-orange-600'
      case 'Medium': return 'bg-yellow-600'
      case 'Low': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">TRA List</h1>
            <a href="/tra/create" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">+ New TRA</a>
          </div>
          {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><p className="text-red-700">{error}</p></div>}
          {loading && <div className="text-center py-12"><p className="text-gray-600">Loading...</p></div>}
          {!loading && tras.length === 0 && <div className="text-center py-12"><p className="text-gray-600">No TRAs created yet</p></div>}
          {!loading && tras.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="px-4 py-3 text-left text-sm font-semibold">Project</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Activity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Probability</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Severity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Risk Level</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tras.map((tra) => (
                    <tr key={tra.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{tra.project_name}</td>
                      <td className="px-4 py-3 text-sm truncate max-w-xs">{tra.activity_description}</td>
                      <td className="px-4 py-3 text-sm">{tra.probability}</td>
                      <td className="px-4 py-3 text-sm">{tra.severity}</td>
                      <td className="px-4 py-3 text-sm"><span className={`px-3 py-1 rounded text-white text-xs font-semibold ${getRiskColor(tra.risk_level)}`}>{tra.risk_level}</span></td>
                      <td className="px-4 py-3 text-sm"><span className="px-3 py-1 rounded text-white text-xs bg-blue-600">{tra.status}</span></td>
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
