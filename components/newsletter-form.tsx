'use client'

import { useState } from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks for subscribing!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to subscribe')
    }

    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {message && (
        <p className={`text-xs ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </form>
  )
}
