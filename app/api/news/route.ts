import { NextRequest, NextResponse } from 'next/server'
import { getLatestNews } from '@/lib/nasa'
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
    const page = parseInt(searchParams.get('page') || '1', 10)
    const pageSize = parseInt(searchParams.get('pageSize') || '12', 10)
    
    const news = await getLatestNews({ page, pageSize })
    
    return NextResponse.json(news, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    })
  } catch (error) {
    console.error('News API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news data' },
      { status: 500 }
    )
  }
}
