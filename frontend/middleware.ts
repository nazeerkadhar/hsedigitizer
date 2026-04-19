import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip public & static routes
  const allowed = ['/', '/login', '/about', '/contact', '/privacy', '/terms']
  const staticPrefix = ['/_next', '/api', '/favicon.ico', '/images', '/fonts']
  
  if (allowed.includes(pathname) || staticPrefix.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Reliable Supabase cookie check
  const hasSession = [...request.cookies.getAll()].some(c => c.name.startsWith('sb-'))
  
  if (!hasSession) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}