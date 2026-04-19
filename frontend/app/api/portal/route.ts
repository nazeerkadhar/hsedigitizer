import { createClient } from '../../../utils/supabase/server'
import { redirect } from 'next/navigation'
import { readFileSync } from 'fs'
import { join } from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', 'https://hsedigitizer.vercel.app'))
  }

  const html = readFileSync(join(process.cwd(), 'app/api/portal/content.html'), 'utf-8')
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  })
}
