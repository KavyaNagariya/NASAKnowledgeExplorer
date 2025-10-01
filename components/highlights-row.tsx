import { getAPOD, getLatestNews, getMissions } from '@/lib/nasa'
import { Countdown } from './countdown'
import Link from 'next/link'

export async function HighlightsRow() {
  const [apod, news, missions] = await Promise.all([
    getAPOD().catch(() => null),
    getLatestNews({ pageSize: 3 }).catch(() => []),
    getMissions('upcoming').catch(() => []),
  ])

  const latestNews = news[0]
  const upcomingMission = missions[0]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
        <div className="aspect-video relative bg-muted">
          {apod?.media_type === 'image' && apod.url && (
            <img
              src={apod.url}
              alt={apod.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="p-6">
          <div className="text-xs font-semibold text-primary mb-2">ASTRONOMY PICTURE</div>
          <h3 className="text-xl font-bold mb-2">{apod?.title || 'Featured Planet'}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {apod?.explanation || 'Discover today\'s featured astronomy image'}
          </p>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-primary hover:underline"
          >
            View Details →
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10">
        <div className="p-6 h-full flex flex-col">
          <div className="text-xs font-semibold text-accent mb-2">UPCOMING LAUNCH</div>
          <h3 className="text-xl font-bold mb-2">{upcomingMission?.name || 'Next Mission'}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {upcomingMission?.description || 'Stay tuned for the next exciting space mission'}
          </p>
          {upcomingMission?.launchDate && (
            <div className="mt-auto">
              <Countdown targetDate={upcomingMission.launchDate} />
            </div>
          )}
          <Link
            href="/learn/missions"
            className="text-sm font-medium text-accent hover:underline mt-4"
          >
            All Missions →
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
        {latestNews?.imageUrl && (
          <div className="aspect-video relative bg-muted">
            <img
              src={latestNews.imageUrl}
              alt={latestNews.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="text-xs font-semibold text-primary mb-2">LATEST NEWS</div>
          <h3 className="text-xl font-bold mb-2 line-clamp-2">
            {latestNews?.title || 'Space Discovery'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {latestNews?.summary || 'Read the latest news from NASA'}
          </p>
          <Link
            href="/learn/news"
            className="text-sm font-medium text-primary hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  )
}
