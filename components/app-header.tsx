'use client'

import Link from 'next/link'
import { useUser } from '@stackframe/stack'
import { useState, useEffect } from 'react'

export function AppHeader() {
  const user = useUser()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md py-3' : 'bg-background/80 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-lg">🚀</span>
          </div>
          <span className="font-bold text-xl">NASA Explorer</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/learn" className="text-sm font-medium hover:text-primary transition-colors">
            Learn
          </Link>
          <Link href="/learn/planets" className="text-sm font-medium hover:text-primary transition-colors">
            Planets
          </Link>
          <Link href="/learn/missions" className="text-sm font-medium hover:text-primary transition-colors">
            Missions
          </Link>
          <Link href="/learn/news" className="text-sm font-medium hover:text-primary transition-colors">
            News
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/handler/sign-out"
                className="text-sm font-medium px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors"
              >
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth/sign-in"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className="text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
