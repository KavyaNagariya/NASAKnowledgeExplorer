import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import { rateLimiter } from '@/lib/cache'

const subscribeSchema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  
  const allowed = await rateLimiter.checkLimit(ip, 10, 300)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()
    const validatedData = subscribeSchema.parse(body)

    const existing = await prisma.subscriber.findUnique({
      where: { email: validatedData.email },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      )
    }

    const subscriber = await prisma.subscriber.create({
      data: {
        email: validatedData.email,
      },
    })

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Subscribe error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
