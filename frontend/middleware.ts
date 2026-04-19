import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/', '/login', '/about', '/contact', '/privacy', '/terms']
const SKIP_AUTH = ['/api/', '/_next/', '/favicon.ico', '/images/', '/fonts/', '/icons/']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_ROUTES.includes(pathname) || SKIP_AUTH.some(r => pathname.startsWith(r))) {
    return NextResponse.next()
  }

  // Reliable Supabase cookie check
  const hasAuthToken = request.cookies.has('sb-xzwrpkfinerkcxaeiakv-auth-token') ||
                       [...request.cookies.getAll()].some(c => c.name.startsWith('sb-'))

  if (!hasAuthToken) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}