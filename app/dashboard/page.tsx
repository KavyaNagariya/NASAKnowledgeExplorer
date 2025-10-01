import { stackServerApp } from '@/lib/stack'
import { AppHeader } from '@/components/app-header'
import { AppFooter } from '@/components/app-footer'
import { getAPOD } from '@/lib/nasa'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function DashboardPage() {
  const user = await stackServerApp.getUser()
  
  if (!user) {
    return null
  }

  const [apod, bookmarks, quizzes] = await Promise.all([
    getAPOD().catch(() => null),
    prisma.bookmark.findMany({
      where: { userId: user.id },
      include: { article: true },
      take: 6,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.quizProgress.findMany({
      where: { userId: user.id },
      take: 5,
      orderBy: { updatedAt: 'desc' },
    }),
  ])

  const greeting = `Welcome back${user.displayName ? `, ${user.displayName}` : ''}!`

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{greeting}</h1>
            <p className="text-muted-foreground">Explore your personalized space dashboard</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {apod && (
                  <>
                    {apod.media_type === 'image' ? (
                      <img
                        src={apod.hdurl || apod.url}
                        alt={apod.title}
                        className="w-full aspect-video object-cover"
                      />
                    ) : (
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <iframe
                          src={apod.url}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="text-xs font-semibold text-primary mb-2">
                        ASTRONOMY PICTURE OF THE DAY
                      </div>
                      <h2 className="text-2xl font-bold mb-3">{apod.title}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {apod.explanation}
                      </p>
                      {apod.copyright && (
                        <p className="text-xs text-muted-foreground mt-4">
                          © {apod.copyright}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link
                    href="/learn/planets"
                    className="block p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                  >
                    <div className="font-semibold text-sm">🪐 Explore Planets</div>
                    <div className="text-xs text-muted-foreground">Solar system tour</div>
                  </Link>
                  <Link
                    href="/learn/missions"
                    className="block p-3 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors"
                  >
                    <div className="font-semibold text-sm">🛰️ View Missions</div>
                    <div className="text-xs text-muted-foreground">Active and upcoming</div>
                  </Link>
                  <Link
                    href="/learn/news"
                    className="block p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
                  >
                    <div className="font-semibold text-sm">📰 Latest News</div>
                    <div className="text-xs text-muted-foreground">Space discoveries</div>
                  </Link>
                </div>
              </div>

              {quizzes.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Recent Quizzes</h3>
                  <div className="space-y-3">
                    {quizzes.map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{quiz.topic}</div>
                          <div className="text-xs text-muted-foreground">
                            {quiz.attempts} attempts
                          </div>
                        </div>
                        <div className="text-lg font-bold text-primary">{quiz.score}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {bookmarks.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Saved Bookmarks</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookmarks.map((bookmark) => (
                  <Link
                    key={bookmark.id}
                    href={bookmark.article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all"
                  >
                    {bookmark.article.imageUrl && (
                      <img
                        src={bookmark.article.imageUrl}
                        alt={bookmark.article.title}
                        className="w-full aspect-video object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 line-clamp-2">
                        {bookmark.article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {bookmark.article.summary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
