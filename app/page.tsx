import Link from 'next/link'
import { AppHeader } from '@/components/app-header'
import { AppFooter } from '@/components/app-footer'
import { Hero } from '@/components/hero'
import { HighlightsRow } from '@/components/highlights-row'
import { HubGrid } from '@/components/hub-grid'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Today&apos;s Highlights</h2>
            <HighlightsRow />
          </div>
        </section>

        <section className="py-16 px-4 bg-card/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Explore NASA Knowledge</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Dive into our comprehensive collection of space exploration content, missions, and educational resources.
            </p>
            <HubGrid />
          </div>
        </section>

        <section className="py-12 px-4 bg-primary/5 border-y border-primary/20">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm font-medium text-primary mb-2">TRUSTED DATA SOURCE</p>
            <h3 className="text-2xl font-bold mb-2">Powered by NASA Open APIs</h3>
            <p className="text-muted-foreground">
              All content sourced directly from NASA&apos;s official data feeds and imagery library
            </p>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Explore the Universe?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of space enthusiasts discovering the wonders of our cosmos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/handler/sign-up"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center justify-center px-8 py-3 border border-border rounded-lg font-semibold hover:bg-card transition-colors"
              >
                Browse Content
              </Link>
            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  )
}
