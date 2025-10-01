export interface APOD {
  date: string
  title: string
  explanation: string
  url: string
  hdurl?: string
  media_type: 'image' | 'video'
  copyright?: string
}

export interface Article {
  id: string
  sourceId: string
  title: string
  summary: string
  url: string
  imageUrl: string | null
  publishedAt: Date
  tags: string[]
}

export interface Mission {
  id: string
  name: string
  description: string
  status: 'ongoing' | 'upcoming' | 'completed'
  launchDate?: string
  endDate?: string
  imageUrl?: string
  agency: string
  target?: string
}

export interface Planet {
  name: string
  description: string
  distanceFromSun: string
  diameter: string
  moons: number
  imageUrl: string
  facts: string[]
}

export interface NewsItem {
  nasa_id: string
  title: string
  description: string
  date_created: string
  keywords?: string[]
  media_type: string
  center?: string
  photographer?: string
}

export interface NASAImageSearchResponse {
  collection: {
    version: string
    href: string
    items: {
      href: string
      data: NewsItem[]
      links?: {
        href: string
        rel: string
        render?: string
      }[]
    }[]
    metadata: {
      total_hits: number
    }
  }
}
