import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const publicRoutes = ['/', '/login']
  
  if (publicRoutes.includes(pathname)) return NextResponse.next()

  const hasSession = [...request.cookies.getAll()].some(c => c.name.includes('auth-token'))

  if (!hasSession) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'] }