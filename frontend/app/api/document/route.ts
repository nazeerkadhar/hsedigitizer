import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )

  const filename = request.nextUrl.searchParams.get('file')
  if (!filename) {
    return NextResponse.json({ error: 'No file specified' }, { status: 400 })
  }

  const { data, error } = await supabase.storage
    .from('hse-documents')
    .createSignedUrl(filename, 60)

  if (error || !data) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  return NextResponse.redirect(data.signedUrl)
}