import { NextResponse } from 'next/server';
import docs from '@/_lib/api/documents/docs.json'

export async function GET(request: Request) {
  let documents = docs
  documents.forEach(e => {
    e.company_id = ''
  })
  return new NextResponse(JSON.stringify(documents), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}