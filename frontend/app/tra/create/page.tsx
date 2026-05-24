'use client'
import { useState } from 'react'

const RISK_MATRIX = {
  'High': { 'High': 'Extreme', 'Medium': 'High', 'Low': 'Medium' },
  'Medium': { 'High': 'High', 'Medium': 'Medium', 'Low': 'Low' },
  'Low': { 'High': 'Medium', 'Medium': 'Low', 'Low': 'Low' }
}

export default function TRAForm() {
  const [formData, setFormData] = useState({
    project_name: '',
    activity_description: '',
    probability: 'Medium',
    severity: 'Medium'
  })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const calculateRisk = () => {
    return RISK_MATRIX[formData.probability as keyof typeof RISK_MATRIX]?.[formData.severity as keyof typeof RISK_MATRIX['High']] || 'Medium'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.project_name || !formData.activity_description) {
      setError('All fields required')
      return
    }
    setSuccess(`✅ TRA Created: ${formData.project_name} - Risk: ${calculateRisk()}`)
    console.log('TRA Data:', { ...formData, risk_level: calculateRisk() })
    setTimeout(() => setSuccess(''), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create TRA</h1>
          <p className="text-gray-600 mb-6">Task Risk Assessment Form</p>

          {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><p className="text-red-700">{error}</p></div>}
          {success && <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6"><p className="text-green-700">{success}</p></div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name *</label>
              <input type="text" name="project_name" value={formData.project_name} onChange={handleChange} placeholder="e.g., Construction Site A" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"/>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Activity Description *</label>
              <textarea name="activity_description" value={formData.activity_description} onChange={handleChange} placeholder="Describe the work activity..." rows={4} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"/>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Probability *</label>
                <select name="probability" value={formData.probability} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Severity *</label>
                <select name="severity" value={formData.severity} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-sm font-semibold text-gray-700">Calculated Risk Level:</p>
              <p className="text-2xl font-bold text-blue-600">{calculateRisk()}</p>
            </div>

            <button type="submit" className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800">
              📋 Create TRA
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
