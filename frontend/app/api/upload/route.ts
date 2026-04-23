import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )

  const formData = await request.formData()
  const file = formData.get('file') as File
  const docName = formData.get('docName') as string

  if (!file || !docName) {
    return NextResponse.json({ error: 'Missing file or docName' }, { status: 400 })
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const historyPath = `history/${docName}/${timestamp}_${file.name}`
  const currentPath = docName

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Save to history
  await supabase.storage.from('hse-documents').upload(historyPath, buffer, {
    contentType: 'application/pdf',
    upsert: true
  })

  // Replace current
  await supabase.storage.from('hse-documents').upload(currentPath, buffer, {
    contentType: 'application/pdf',
    upsert: true
  })

  return NextResponse.json({ success: true })
}
