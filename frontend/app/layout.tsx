import { createServerClient } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get('next-url')?.replace(/^https?:\/\/[^/]+/, '') || '/'

  // Allow /login to render without redirecting to itself
  if (pathname === '/login') {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  // FIXED: Correct destructuring syntax (resolves all 6 errors)
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}