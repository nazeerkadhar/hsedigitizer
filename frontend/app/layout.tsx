import type { Metadata } from 'next'
import './globals.css'
import { createClient } from '../utils/supabase/server'
import LogoutButton from './LogoutButton'

export const metadata: Metadata = {
  title: 'HSE Digitizer',
  description: 'HSE Digitizer Platform',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAdmin = user?.email === 'test1@lmedubai.ae'

  return (
    <html lang="en">
      <body>
        {user && (
          <header className="w-full bg-white border-b px-6 py-3 flex justify-between items-center">
            <span className="text-sm text-gray-600 font-medium">{user.email}</span>
            <LogoutButton />
          </header>
        )}
        {isAdmin && (
          <script dangerouslySetInnerHTML={{ __html: `window.__isAdmin = true;` }} />
        )}
        {children}
      </body>
    </html>
  )
}