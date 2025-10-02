import { prisma } from './db'

interface CacheEntry<T> {
  data: T
  timestamp: number
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<any>>()
  private maxSize = 200 // Increased cache size

  async get<T>(key: string): Promise<T | null> {
    const entry = this.cache.get(key)
    if (!entry) return null
    
    const now = Date.now()
    // Extended cache time to 1 hour for better performance
    if (now - entry.timestamp > 60 * 60 * 1000) {
      this.cache.delete(key)
      return null
    }
    
    return entry.data as T
  }

  async set<T>(key: string, data: T, ttlSeconds: number): Promise<void> {
    // Increased cache size before eviction
    if (this.cache.size >= this.maxSize) {
      // More efficient cache eviction - remove oldest entries
      const keys = Array.from(this.cache.keys())
      const entriesToRemove = Math.max(1, Math.floor(this.maxSize * 0.1)) // Remove 10% of entries
      
      for (let i = 0; i < entriesToRemove; i++) {
        this.cache.delete(keys[i])
      }
    }
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key)
  }
}

const memoryCache = new MemoryCache()

export class CacheService {
  private useUpstash: boolean

  constructor() {
    this.useUpstash = Boolean(
      process.env.UPSTASH_REDIS_REST_URL && 
      process.env.UPSTASH_REDIS_REST_TOKEN
    )
  }

  async get<T>(key: string): Promise<T | null> {
    if (this.useUpstash) {
      return null
    }

    const memoryCached = await memoryCache.get<T>(key)
    if (memoryCached) return memoryCached

    try {
      const cached = await prisma.newsCache.findUnique({
        where: { source: key },
      })

      if (!cached) return null

      const now = Date.now()
      const cacheAge = now - cached.cachedAt.getTime()
      
      // Extended cache time to 1 hour for better performance
      if (cacheAge > 60 * 60 * 1000) {
        await prisma.newsCache.delete({ where: { id: cached.id } })
        return null
      }

      return cached.payload as T
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  async set<T>(key: string, data: T, ttlSeconds: number = 3600): Promise<void> { // Default to 1 hour
    if (this.useUpstash) {
      return
    }

    await memoryCache.set(key, data, ttlSeconds)

    try {
      await prisma.newsCache.upsert({
        where: { source: key },
        update: {
          payload: data as any,
          cachedAt: new Date(),
        },
        create: {
          source: key,
          payload: data as any,
          cachedAt: new Date(),
        },
      })
    } catch (error) {
      console.error('Cache set error:', error)
    }
  }

  async delete(key: string): Promise<void> {
    if (this.useUpstash) {
      return
    }

    await memoryCache.delete(key)

    try {
      await prisma.newsCache.deleteMany({
        where: { source: key },
      })
    } catch (error) {
      console.error('Cache delete error:', error)
    }
  }

  async getMissionCache<T>(slug: string): Promise<T | null> {
    try {
      const cached = await prisma.missionCache.findUnique({
        where: { slug },
      })

      if (!cached) return null

      const now = Date.now()
      const cacheAge = now - cached.cachedAt.getTime()
      
      // Extended cache time to 6 hours for better performance
      if (cacheAge > 6 * 60 * 60 * 1000) {
        await prisma.missionCache.delete({ where: { id: cached.id } })
        return null
      }

      return cached.payload as T
    } catch (error) {
      console.error('Mission cache get error:', error)
      return null
    }
  }

  async setMissionCache<T>(slug: string, data: T, ttlSeconds: number = 21600): Promise<void> { // Default to 6 hours
    try {
      await prisma.missionCache.upsert({
        where: { slug },
        update: {
          payload: data as any,
          cachedAt: new Date(),
        },
        create: {
          slug,
          payload: data as any,
          cachedAt: new Date(),
        },
      })
    } catch (error) {
      console.error('Mission cache set error:', error)
    }
  }
}

export const cache = new CacheService()

class RateLimiter {
  private requests = new Map<string, number[]>()
  private maxSize = 5000 // Limit memory usage

  async checkLimit(ip: string, maxRequests: number = 60, windowSeconds: number = 300): Promise<boolean> {
    const now = Date.now()
    const windowStart = now - windowSeconds * 1000
    
    const ipRequests = this.requests.get(ip) || []
    const recentRequests = ipRequests.filter(timestamp => timestamp > windowStart)
    
    if (recentRequests.length >= maxRequests) {
      return false
    }
    
    recentRequests.push(now)
    this.requests.set(ip, recentRequests)
    
    // Limit memory usage
    if (this.requests.size > this.maxSize) {
      const oldestKey = this.requests.keys().next().value
      if (oldestKey) this.requests.delete(oldestKey)
    }
    
    return true
  }
}

export const rateLimiter = new RateLimiter()