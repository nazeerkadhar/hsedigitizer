export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation Bar */}
      <nav className="backdrop-blur-md bg-slate-900/80 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/ESS-logo.jpg" alt="ESS Logo" className="w-10 h-10 object-contain"/>
            <div>
              <h1 className="text-xl font-bold text-white">HSE DIGITIZER</h1>
              <p className="text-xs text-emerald-400">by Easy Safety Solutions</p>
            </div>
          </div>
          <div className="text-sm text-slate-300">Cloud-Native HSE Platform</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
              Professional HSE Management for UAE
            </h2>
            <p className="text-xl text-slate-300 mb-6">
              Digitize safety, secure lives. Cloud-native platform for construction & oil & gas industries with full UAE regulatory compliance.
            </p>
            <div className="flex gap-4">
              <a href="/incidents/test" className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition">
                Report Incident
              </a>
              <a href="/tra/create" className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition">
                Create TRA
              </a>
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-900/20 to-blue-900/20 border border-slate-700 rounded-2xl p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                <span className="text-3xl">📋</span>
                <div>
                  <p className="font-semibold text-white">Task Risk Assessment</p>
                  <p className="text-sm text-slate-400">Automated TRA management</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                <span className="text-3xl">🚨</span>
                <div>
                  <p className="font-semibold text-white">Incident Reporting</p>
                  <p className="text-sm text-slate-400">Photo documentation & alerts</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg">
                <span className="text-3xl">📊</span>
                <div>
                  <p className="font-semibold text-white">Real-time Dashboard</p>
                  <p className="text-sm text-slate-400">View all incidents & TRAs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Cards */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-white mb-12 text-center">Quick Actions</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <a href="/tra/create" className="group p-6 bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-xl hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 transition">
            <div className="text-4xl mb-4">📋</div>
            <h4 className="text-lg font-semibold text-white mb-2">Create TRA</h4>
            <p className="text-sm text-slate-400">Task Risk Assessment</p>
          </a>

          <a href="/incidents/test" className="group p-6 bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-xl hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 transition">
            <div className="text-4xl mb-4">🚨</div>
            <h4 className="text-lg font-semibold text-white mb-2">Report Incident</h4>
            <p className="text-sm text-slate-400">With photo documentation</p>
          </a>

          <a href="/tra/list" className="group p-6 bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-xl hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition">
            <div className="text-4xl mb-4">📊</div>
            <h4 className="text-lg font-semibold text-white mb-2">View TRAs</h4>
            <p className="text-sm text-slate-400">All assessments</p>
          </a>

          <a href="/incidents/list" className="group p-6 bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-xl hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition">
            <div className="text-4xl mb-4">📈</div>
            <h4 className="text-lg font-semibold text-white mb-2">View Incidents</h4>
            <p className="text-sm text-slate-400">All reports</p>
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-white mb-12 text-center">Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl">
            <div className="text-4xl mb-4">🔒</div>
            <h4 className="text-xl font-semibold text-white mb-3">Secure & Compliant</h4>
            <p className="text-slate-400">Full UAE regulatory compliance including MoHRE heat protection rules and federal safety standards.</p>
          </div>
          <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl">
            <div className="text-4xl mb-4">☁️</div>
            <h4 className="text-xl font-semibold text-white mb-3">Cloud-Native</h4>
            <p className="text-slate-400">Hosted on secure cloud infrastructure. Access from anywhere, anytime with automatic backups.</p>
          </div>
          <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-xl font-semibold text-white mb-3">Real-time Alerts</h4>
            <p className="text-slate-400">Instant email notifications to HSE teams when incidents are reported.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">About</h4>
              <p className="text-sm text-slate-400">HSE DIGITIZER by Easy Safety Solutions - Professional health, safety & environment management platform.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="/tra/create" className="hover:text-emerald-400">Create TRA</a></li>
                <li><a href="/incidents/test" className="hover:text-emerald-400">Report Incident</a></li>
                <li><a href="/incidents/list" className="hover:text-emerald-400">View Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <p className="text-sm text-slate-400">Easy Safety Solutions<br/>Dubai, UAE<br/>hse@easysafety.ae</p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2026 Easy Safety Solutions. All rights reserved. HSE DIGITIZER v1.0</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
