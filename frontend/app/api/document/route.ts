import { createClient } from '../../../utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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
