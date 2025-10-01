import { NextRequest, NextResponse } from 'next/server'
import { stackServerApp } from '@/lib/stack'
import { prisma } from '@/lib/db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const bookmark = await prisma.bookmark.findUnique({
      where: { id: params.id },
    })

    if (!bookmark) {
      return NextResponse.json(
        { error: 'Bookmark not found' },
        { status: 404 }
      )
    }

    if (bookmark.userId !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    await prisma.bookmark.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Bookmark deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete bookmark' },
      { status: 500 }
    )
  }
}
