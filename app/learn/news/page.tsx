import { AppHeader } from '@/components/app-header'
import { AppFooter } from '@/components/app-footer'
import { getLatestNews } from '@/lib/nasa'
import { prisma } from '@/lib/db'
import { stackServerApp } from '@/lib/stack'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function NewsPage() {
  const articles = await getLatestNews({ pageSize: 24 })
  const user = await stackServerApp.getUser({ or: 'redirect', to: null })

  let bookmarkedIds: string[] = []
  if (user) {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: user.id },
      select: { articleId: true },
    })
    bookmarkedIds = bookmarks.map((b) => b.articleId)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4">Latest Space News</h1>
            <p className="text-xl text-muted-foreground">
              Stay updated with the latest discoveries and announcements from NASA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full aspect-video object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-primary">NASA</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(article.publishedAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {article.summary}
                  </p>

                  <div className="flex items-center gap-3">
                    <Link
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No articles available at the moment</p>
            </div>
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
