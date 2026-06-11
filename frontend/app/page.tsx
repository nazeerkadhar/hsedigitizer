export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation Bar */}
      <nav className="backdrop-blur-md bg-slate-950/80 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/ESS-logo.jpg" alt="ESS Logo" className="w-10 h-10 object-contain"/>
            <span className="text-sm font-semibold text-slate-300">EASY SAFETY</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-slate-300 hover:text-white transition">Home</a>
            <a href="#" className="text-slate-300 hover:text-white transition">About Us</a>
            <a href="#" className="text-slate-300 hover:text-white transition">Services</a>
            <a href="#" className="text-slate-300 hover:text-white transition">Solutions</a>
            <a href="#" className="text-slate-300 hover:text-white transition">Board</a>
            <a href="#" className="text-slate-300 hover:text-white transition">FAQ</a>
            <a href="#" className="text-slate-300 hover:text-white transition">Contact</a>
          </div>

          <a href="/incidents/test" className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden">
        {/* Background Image Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-transparent to-blue-900/20"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          {/* BY NAZEER */}
          <div className="mb-8">
            <p className="text-orange-500 font-semibold text-lg tracking-widest">BY NAZEER</p>
            <div className="w-12 h-1 bg-orange-500 mx-auto mt-2"></div>
          </div>

          {/* ESS Text */}
          <h1 className="text-8xl md:text-9xl font-black text-orange-500 mb-2 leading-none">
            ESS
          </h1>

          {/* Main Heading */}
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Easy Safety<br/>Solutions
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed">
            Digital HSE Solutions for Safer, Smarter,<br/>and Future-Ready Workplaces
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a href="/incidents/test" className="px-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-full hover:bg-orange-600 transition transform hover:scale-105">
              Report Incident
            </a>
            <a href="/tra/create" className="px-8 py-4 bg-slate-800 text-white font-bold text-lg rounded-full hover:bg-slate-700 transition border border-slate-700">
              Create TRA
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative max-w-7xl mx-auto px-8 py-24">
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">Our Platform</h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl hover:border-orange-500/50 transition">
            <div className="text-5xl mb-6">🚨</div>
            <h4 className="text-2xl font-bold text-white mb-4">Incident Reporting</h4>
            <p className="text-slate-400">Instant incident reporting with photo documentation, automatic alerts to HSE team, and real-time notifications.</p>
          </div>

          <div className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl hover:border-orange-500/50 transition">
            <div className="text-5xl mb-6">📋</div>
            <h4 className="text-2xl font-bold text-white mb-4">Risk Assessment</h4>
            <p className="text-slate-400">Automated Task Risk Assessment (TRA) with intelligent risk matrix calculation and compliance documentation.</p>
          </div>

          <div className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl hover:border-orange-500/50 transition">
            <div className="text-5xl mb-6">📊</div>
            <h4 className="text-2xl font-bold text-white mb-4">Live Dashboard</h4>
            <p className="text-slate-400">Real-time visibility into all incidents and TRAs with comprehensive reporting and audit trails.</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="relative max-w-7xl mx-auto px-8 py-24">
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">Quick Actions</h3>
        
        <div className="grid md:grid-cols-4 gap-6">
          <a href="/tra/create" className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition">📋</div>
            <h4 className="text-lg font-bold text-white mb-2">Create TRA</h4>
            <p className="text-sm text-slate-400">Task Risk Assessment</p>
          </a>

          <a href="/incidents/test" className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition">🚨</div>
            <h4 className="text-lg font-bold text-white mb-2">Report Incident</h4>
            <p className="text-sm text-slate-400">With photos & alerts</p>
          </a>

          <a href="/tra/list" className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition">📊</div>
            <h4 className="text-lg font-bold text-white mb-2">View TRAs</h4>
            <p className="text-sm text-slate-400">All assessments</p>
          </a>

          <a href="/incidents/list" className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition">📈</div>
            <h4 className="text-lg font-bold text-white mb-2">View Incidents</h4>
            <p className="text-sm text-slate-400">All reports</p>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">About ESS</h4>
              <p className="text-sm text-slate-400">Professional HSE management platform for construction and oil & gas industries with full UAE compliance.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="/tra/create" className="hover:text-orange-500 transition">Create TRA</a></li>
                <li><a href="/incidents/test" className="hover:text-orange-500 transition">Report Incident</a></li>
                <li><a href="/incidents/list" className="hover:text-orange-500 transition">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-orange-500 transition">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Contact</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <p className="text-sm text-slate-400">
                Easy Safety Solutions<br/>
                Dubai, UAE<br/>
                hse@easysafety.ae
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2026 Easy Safety Solutions by Nazeer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
