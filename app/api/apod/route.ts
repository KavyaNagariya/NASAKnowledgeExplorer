import { NextRequest, NextResponse } from 'next/server'
import { getAPOD } from '@/lib/nasa'
import { rateLimiter } from '@/lib/cache'

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  
  const allowed = await rateLimiter.checkLimit(ip, 60, 300)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    )
  }

  try {
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get('date') || undefined
    
    const apod = await getAPOD(date)
    
    return NextResponse.json(apod, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    })
  } catch (error) {
    console.error('APOD API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch APOD data' },
      { status: 500 }
    )
  }
}
