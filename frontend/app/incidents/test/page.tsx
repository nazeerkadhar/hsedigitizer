'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function TestIncidentForm() {
  const [formData, setFormData] = useState({ incident_type: '', location: '', date: new Date().toISOString().split('T')[0], time: new Date().toTimeString().slice(0, 5), victim_name: '', description: '' })
  const [photos, setPhotos] = useState<File[]>([])
  const [photoPreview, setPhotoPreview] = useState<string[]>([])
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (photos.length + files.length > 5) {
      setError('Maximum 5 photos allowed')
      return
    }
    setPhotos(prev => [...prev, ...files])
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
    setPhotoPreview(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (!formData.incident_type || !formData.location || !formData.description) {
        throw new Error('All required fields must be filled')
      }
      if (photos.length === 0) {
        throw new Error('At least 1 photo required')
      }

      const { data: incident, error: incidentError } = await supabase
        .from('incidents')
        .insert([{
          incident_type: formData.incident_type,
          location: formData.location,
          date: new Date(`${formData.date}T${formData.time}`).toISOString(),
          time: formData.time,
          victim_name: formData.victim_name || null,
          description: formData.description,
          status: 'Open',
          user_id: '00000000-0000-0000-0000-000000000000'
        }])
        .select()

      if (incidentError) throw incidentError
      if (!incident || incident.length === 0) throw new Error('Failed to create incident')

      const incidentId = incident[0].id

      for (let i = 0; i < photos.length; i++) {
        const file = photos[i]
        const fileName = `incident-${incidentId}-${i}-${Date.now()}`
        
        const { error: uploadError } = await supabase.storage
          .from('incident-photos')
          .upload(`${incidentId}/${fileName}`, file)

        if (uploadError) throw uploadError

        const { data } = supabase.storage
          .from('incident-photos')
          .getPublicUrl(`${incidentId}/${fileName}`)

        await supabase
          .from('incident_photos')
          .insert([{
            incident_id: incidentId,
            photo_url: data.publicUrl,
            original_size: file.size,
            compressed_size: file.size
          }])
      }

      setSuccess(`✅ Incident Saved with ${photos.length} photo(s)`)
      
      setTimeout(() => {
        setFormData({ incident_type: '', location: '', date: new Date().toISOString().split('T')[0], time: new Date().toTimeString().slice(0, 5), victim_name: '', description: '' })
        setPhotos([])
        setPhotoPreview([])
        setSuccess('')
      }, 2000)

    } catch (err: any) {
      setError(err.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🧪 Report Incident</h1>
          <p className="text-gray-600 mb-6">With photo upload - Data saved to database</p>
          {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><p className="text-red-700">{error}</p></div>}
          {success && <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6"><p className="text-green-700">{success}</p></div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Incident Type *</label><select name="incident_type" value={formData.incident_type} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option value="">Select type</option><option>Accident</option><option>Incident</option><option>Near miss</option><option>Property damage</option><option>Fatality</option><option>Injuries</option><option>First aid</option><option>Fire</option></select></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label><input type="text" name="location" value={formData.location} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg"/></div>
            <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label><input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg"/></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Time *</label><input type="time" name="time" value={formData.time} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg"/></div></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Victim Name</label><input type="text" name="victim_name" value={formData.victim_name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg"/></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label><textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} required className="w-full px-4 py-2 border border-gray-300 rounded-lg"/></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Photos (1-5 required) *</label><input type="file" multiple accept="image/*" onChange={handlePhotoUpload} disabled={photos.length >= 5} className="w-full px-4 py-2 border border-gray-300 rounded-lg"/><p className="text-sm text-gray-500 mt-1">Uploaded: {photos.length}/5</p></div>
            {photoPreview.length > 0 && <div className="grid grid-cols-3 gap-4">{photoPreview.map((preview, index) => <div key={index} className="relative"><img src={preview} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded-lg"/><button type="button" onClick={() => removePhoto(index)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">×</button></div>)}</div>}
            <button type="submit" disabled={loading || photos.length === 0} className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg disabled:opacity-50">{loading ? '⏳ Uploading...' : '🚨 SUBMIT'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
