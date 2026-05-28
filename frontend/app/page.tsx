export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">NSS HSE Portal</h1>
          <p className="text-gray-600 text-lg mb-8">Cloud-Native HSE Management for UAE Construction & O&G</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="/tra/create" className="p-6 border-2 border-green-600 rounded-lg hover:bg-green-50">
              <h2 className="text-2xl font-bold text-green-600 mb-2">📋 Create TRA</h2>
              <p className="text-gray-600">Task Risk Assessment</p>
            </a>
            
            <a href="/incidents/test" className="p-6 border-2 border-green-600 rounded-lg hover:bg-green-50">
              <h2 className="text-2xl font-bold text-green-600 mb-2">🚨 Report Incident</h2>
              <p className="text-gray-600">Incident Management</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
