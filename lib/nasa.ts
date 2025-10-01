import { cache } from './cache'
import { truncateSummary } from './utils'
import type { APOD, Article, Mission, NASAImageSearchResponse } from './types'

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY'
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod'
const NASA_IMAGE_SEARCH_URL = 'https://images-api.nasa.gov/search'

async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries: number = 2
): Promise<Response> {
  const timeout = 10000
  
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      
      if (response.ok) {
        return response
      }
      
      if (response.status === 429 && i < retries) {
        const backoff = Math.pow(2, i) * 1000
        await new Promise(resolve => setTimeout(resolve, backoff))
        continue
      }
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    } catch (error) {
      if (i === retries) {
        throw error
      }
      
      const backoff = Math.pow(2, i) * 1000
      await new Promise(resolve => setTimeout(resolve, backoff))
    }
  }
  
  throw new Error('Max retries exceeded')
}

export async function getAPOD(date?: string): Promise<APOD> {
  const cacheKey = `apod:${date || 'today'}`
  
  const cached = await cache.get<APOD>(cacheKey)
  if (cached) {
    return cached
  }
  
  const params = new URLSearchParams({
    api_key: NASA_API_KEY,
  })
  
  if (date) {
    params.append('date', date)
  }
  
  const url = `${NASA_APOD_URL}?${params.toString()}`
  
  try {
    const response = await fetchWithRetry(url)
    const data: APOD = await response.json()
    
    await cache.set(cacheKey, data, 3600)
    
    return data
  } catch (error) {
    console.error('Error fetching APOD:', error)
    throw new Error('Failed to fetch Astronomy Picture of the Day')
  }
}

export async function getLatestNews(params?: {
  page?: number
  pageSize?: number
}): Promise<Article[]> {
  const page = params?.page || 1
  const pageSize = params?.pageSize || 12
  
  const cacheKey = `news:${page}:${pageSize}`
  
  const cached = await cache.get<Article[]>(cacheKey)
  if (cached) {
    return cached
  }
  
  const searchParams = new URLSearchParams({
    q: 'space exploration',
    media_type: 'image',
    page: page.toString(),
    page_size: pageSize.toString(),
  })
  
  const url = `${NASA_IMAGE_SEARCH_URL}?${searchParams.toString()}`
  
  try {
    const response = await fetchWithRetry(url)
    const data: NASAImageSearchResponse = await response.json()
    
    const articles: Article[] = data.collection.items
      .filter(item => item.data && item.data.length > 0)
      .map(item => {
        const newsItem = item.data[0]
        const imageUrl = item.links && item.links[0] ? item.links[0].href : null
        
        return {
          id: newsItem.nasa_id,
          sourceId: newsItem.nasa_id,
          title: newsItem.title,
          summary: truncateSummary(newsItem.description || 'No description available'),
          url: `https://images.nasa.gov/details/${newsItem.nasa_id}`,
          imageUrl,
          publishedAt: new Date(newsItem.date_created),
          tags: newsItem.keywords || [],
        }
      })
    
    await cache.set(cacheKey, articles, 1800)
    
    return articles
  } catch (error) {
    console.error('Error fetching NASA news:', error)
    return []
  }
}

export async function getMissions(filter?: 'ongoing' | 'upcoming' | 'completed'): Promise<Mission[]> {
  const cacheKey = `missions:${filter || 'all'}`
  
  const cached = await cache.getMissionCache<Mission[]>(cacheKey)
  if (cached) {
    return cached
  }
  
  const allMissions: Mission[] = [
    {
      id: 'artemis-1',
      name: 'Artemis I',
      description: 'Uncrewed test flight of the Orion spacecraft and Space Launch System rocket, paving the way for crewed missions to the Moon.',
      status: 'completed',
      launchDate: '2022-11-16',
      endDate: '2022-12-11',
      imageUrl: 'https://www.nasa.gov/wp-content/uploads/2023/03/artemis-i-liftoff.jpg',
      agency: 'NASA',
      target: 'Moon',
    },
    {
      id: 'artemis-2',
      name: 'Artemis II',
      description: 'First crewed flight test of the Orion spacecraft, featuring a flyby of the Moon with four astronauts.',
      status: 'upcoming',
      launchDate: '2025-09-01',
      imageUrl: 'https://www.nasa.gov/wp-content/uploads/2023/03/artemis-ii-crew.jpg',
      agency: 'NASA',
      target: 'Moon',
    },
    {
      id: 'artemis-3',
      name: 'Artemis III',
      description: 'First crewed Moon landing since Apollo 17, including the first woman and person of color on the lunar surface.',
      status: 'upcoming',
      launchDate: '2026-09-01',
      imageUrl: 'https://www.nasa.gov/wp-content/uploads/2023/03/artemis-iii-lunar-surface.jpg',
      agency: 'NASA',
      target: 'Moon',
    },
    {
      id: 'jwst',
      name: 'James Webb Space Telescope',
      description: 'Revolutionary space telescope observing the universe in infrared, revealing the earliest galaxies and studying exoplanet atmospheres.',
      status: 'ongoing',
      launchDate: '2021-12-25',
      imageUrl: 'https://www.nasa.gov/wp-content/uploads/2023/03/jwst-first-deep-field.jpg',
      agency: 'NASA/ESA/CSA',
      target: 'Deep Space',
    },
    {
      id: 'perseverance',
      name: 'Mars Perseverance Rover',
      description: 'Exploring Mars\' Jezero Crater, searching for signs of ancient microbial life and collecting samples for future return to Earth.',
      status: 'ongoing',
      launchDate: '2020-07-30',
      imageUrl: 'https://www.nasa.gov/wp-content/uploads/2023/03/perseverance-selfie.jpg',
      agency: 'NASA',
      target: 'Mars',
    },
    {
      id: 'europa-clipper',
      name: 'Europa Clipper',
      description: 'Mission to Jupiter\'s moon Europa to investigate its subsurface ocean and assess its potential habitability.',
      status: 'upcoming',
      launchDate: '2024-10-10',
      imageUrl: 'https://www.nasa.gov/wp-content/uploads/2023/03/europa-clipper-concept.jpg',
      agency: 'NASA',
      target: 'Jupiter\'s Moon Europa',
    },
    {
      id: 'psyche',
      name: 'Psyche Mission',
      description: 'Journey to a unique metal-rich asteroid, potentially the exposed core of an early planet.',
      status: 'ongoing',
      launchDate: '2023-10-13',
      imageUrl: 'https://www.nasa.gov/wp-content/uploads/2023/03/psyche-asteroid.jpg',
      agency: 'NASA',
      target: 'Asteroid Psyche',
    },
    {
      id: 'dragonfly',
      name: 'Dragonfly',
      description: 'Rotorcraft lander mission to Titan, Saturn\'s largest moon, to study prebiotic chemistry and search for signs of life.',
      status: 'upcoming',
      launchDate: '2028-07-01',
      imageUrl: 'https://www.nasa.gov/wp-content/uploads/2023/03/dragonfly-titan.jpg',
      agency: 'NASA',
      target: 'Saturn\'s Moon Titan',
    },
  ]
  
  let missions = allMissions
  
  if (filter) {
    missions = allMissions.filter(m => m.status === filter)
  }
  
  await cache.setMissionCache(cacheKey, missions)
  
  return missions
}
