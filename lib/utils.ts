import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateSummary(text: string, minLength = 180, maxLength = 220): string {
  if (text.length <= maxLength) {
    return text
  }
  
  const truncated = text.slice(0, maxLength)
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf('.'),
    truncated.lastIndexOf('!'),
    truncated.lastIndexOf('?')
  )
  
  if (lastSentenceEnd > minLength) {
    return truncated.slice(0, lastSentenceEnd + 1)
  }
  
  const lastSpace = truncated.lastIndexOf(' ')
  if (lastSpace > minLength) {
    return truncated.slice(0, lastSpace) + '...'
  }
  
  return truncated + '...'
}

export function getAbsoluteUrl(path: string, req?: { headers: Headers }): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  
  if (baseUrl) {
    return `${baseUrl}${path}`
  }
  
  if (req) {
    const protocol = req.headers.get('x-forwarded-proto') || 'http'
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'localhost:3000'
    return `${protocol}://${host}${path}`
  }
  
  return path
}

export function generateEncryptionKey(): string {
  const existingKey = process.env.ENCRYPTION_KEY
  if (existingKey && existingKey.length === 64) {
    return existingKey
  }
  
  const array = new Uint8Array(32)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array)
  } else {
    for (let i = 0; i < 32; i++) {
      array[i] = Math.floor(Math.random() * 256)
    }
  }
  
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
