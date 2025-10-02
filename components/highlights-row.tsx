'use client'

import { getAPOD, getLatestNews, getMissions } from '@/lib/nasa'
import { Countdown } from './countdown'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { SkeletonLoader } from './skeleton-loader'
import type { APOD, Article, Mission } from '@/lib/types'

export function HighlightsRow() {
  const [data, setData] = useState<{ apod: APOD | null; news: Article[]; missions: Mission[] } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apod, news, missions] = await Promise.all([
          getAPOD().catch(() => null),
          getLatestNews({ pageSize: 3 }).catch(() => []),
          getMissions('upcoming').catch(() => []),
        ])
        
        setData({ apod, news, missions })
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <SkeletonLoader />
  }

  if (!data) {
    return <div className="text-center py-8">Failed to load data</div>
  }

  const { apod, news, missions } = data
  const upcomingMission = missions[0]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
        <div className="aspect-video relative bg-muted">
          {apod?.media_type === 'image' && apod.url && (
            <Image
              src={apod.url}
              alt={apod.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

      {/* News Section - Show multiple news items */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6">
          <div className="text-xs font-semibold text-primary mb-4">LATEST NEWS</div>
          
          {/* Show up to 3 news items */}
          <div className="space-y-4">
            {news.slice(0, 3).map((article) => (
              <div key={article.id} className="pb-4 last:pb-0 last:border-0 border-b border-border">
                {article.imageUrl && (
                  <div className="aspect-video relative bg-muted rounded-md mb-3">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover rounded-md"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <h3 className="text-sm font-bold mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {article.summary}
                </p>
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
          
          {news.length === 0 && (
            <p className="text-muted-foreground text-sm">No news available at the moment</p>
          )}
          
          <Link
            href="/learn/news"
            className="text-sm font-medium text-primary hover:underline mt-4 inline-block"
          >
            View All News →
          </Link>
        </div>
      </div>
    </div>
  )
}