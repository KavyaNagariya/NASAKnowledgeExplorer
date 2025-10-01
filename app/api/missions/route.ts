import { NextRequest, NextResponse } from 'next/server'
import { getMissions } from '@/lib/nasa'
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
    const status = searchParams.get('status') as 'ongoing' | 'upcoming' | 'completed' | null
    
    const missions = await getMissions(status || undefined)
    
    return NextResponse.json(missions, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    })
  } catch (error) {
    console.error('Missions API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch missions data' },
      { status: 500 }
    )
  }
}
