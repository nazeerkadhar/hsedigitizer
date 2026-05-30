export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <img src="/ESS-logo.jpg" alt="ESS Logo" className="w-16 h-16 object-contain"/>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">HSE DIGITIZER</h1>
              <p className="text-sm text-gray-600">A Product of EASY SAFETY SOLUTIONS By Nazeer</p>
            </div>
          </div>
          <p className="text-gray-700 text-lg mb-8 border-l-4 border-green-600 pl-4">Cloud-Native HSE Management for UAE Construction & O&G</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <a href="/tra/create" className="p-6 border-2 border-green-600 rounded-lg hover:bg-green-50 transition"><h2 className="text-2xl font-bold text-green-600 mb-2">📋 Create TRA</h2><p className="text-gray-600">Task Risk Assessment</p></a>
            <a href="/incidents/test" className="p-6 border-2 border-green-600 rounded-lg hover:bg-green-50 transition"><h2 className="text-2xl font-bold text-green-600 mb-2">🚨 Report Incident</h2><p className="text-gray-600">Incident Management with Photos</p></a>
            <a href="/tra/list" className="p-6 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition"><h2 className="text-2xl font-bold text-blue-600 mb-2">📊 View TRAs</h2><p className="text-gray-600">View all Task Risk Assessments</p></a>
            <a href="/incidents/list" className="p-6 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition"><h2 className="text-2xl font-bold text-blue-600 mb-2">📈 View Incidents</h2><p className="text-gray-600">View all reported incidents</p></a>
          </div>
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400"><p className="text-sm text-gray-600"><strong>Easy Safety Solutions (ESS)</strong> - Professional HSE management platform for construction and oil & gas industries</p></div>
        </div>
      </div>
    </div>
  )
}
