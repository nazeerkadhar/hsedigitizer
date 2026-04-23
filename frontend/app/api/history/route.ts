import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )

  const docName = request.nextUrl.searchParams.get('docName')
  if (!docName) {
    return NextResponse.json({ error: 'No docName specified' }, { status: 400 })
  }

  const { data, error } = await supabase.storage
    .from('hse-documents')
    .list(`history/${docName}`, {
      sortBy: { column: 'created_at', order: 'desc' }
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const files = await Promise.all(
    (data || []).map(async (file) => {
      const { data: urlData } = await supabase.storage
        .from('hse-documents')
        .createSignedUrl(`history/${docName}/${file.name}`, 3600)
      return {
        name: file.name,
        created_at: file.created_at,
        url: urlData?.signedUrl
      }
    })
  )

  return NextResponse.json({ files })
}