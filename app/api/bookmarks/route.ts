import { NextRequest, NextResponse } from 'next/server'
import { stackServerApp } from '@/lib/stack'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const bookmarkSchema = z.object({
  articleId: z.string(),
  articleData: z.object({
    sourceId: z.string(),
    title: z.string(),
    summary: z.string(),
    url: z.string(),
    imageUrl: z.string().nullable(),
    publishedAt: z.string(),
    tags: z.array(z.string()),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = bookmarkSchema.parse(body)

    let article = await prisma.article.findUnique({
      where: { sourceId: validatedData.articleData.sourceId },
    })

    if (!article) {
      article = await prisma.article.create({
        data: {
          sourceId: validatedData.articleData.sourceId,
          title: validatedData.articleData.title,
          summary: validatedData.articleData.summary,
          url: validatedData.articleData.url,
          imageUrl: validatedData.articleData.imageUrl,
          publishedAt: new Date(validatedData.articleData.publishedAt),
          tags: validatedData.articleData.tags,
        },
      })
    }

    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_articleId: {
          userId: user.id,
          articleId: article.id,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Already bookmarked' },
        { status: 400 }
      )
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        userId: user.id,
        articleId: article.id,
      },
    })

    return NextResponse.json(bookmark, { status: 201 })
  } catch (error) {
    console.error('Bookmark creation error:', error)
    if (error instanceof z.ZodError) {
      // Fix the Zod error issue by properly accessing the error details
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: error.issues // ZodError has an 'issues' property, not 'errors'
        },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create bookmark' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: user.id },
      include: { article: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(bookmarks)
  } catch (error) {
    console.error('Bookmarks fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookmarks' },
      { status: 500 }
    )
  }
}