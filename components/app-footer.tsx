import Link from 'next/link'
import { NewsletterForm } from './newsletter-form'

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              NASA Explorer
            </h3>
            <p className="text-sm text-muted-foreground">
              Exploring the universe through NASA&apos;s open data and imagery
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learn" className="text-muted-foreground hover:text-primary transition-colors">
                  Learning Hub
                </Link>
              </li>
              <li>
                <Link href="/learn/planets" className="text-muted-foreground hover:text-primary transition-colors">
                  Planets
                </Link>
              </li>
              <li>
                <Link href="/learn/missions" className="text-muted-foreground hover:text-primary transition-colors">
                  Missions
                </Link>
              </li>
              <li>
                <Link href="/learn/news" className="text-muted-foreground hover:text-primary transition-colors">
                  Latest News
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/auth/sign-in" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/sign-up" className="text-muted-foreground hover:text-primary transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get weekly space updates
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            Data sourced from NASA Open APIs. Not affiliated with NASA.
          </p>
        </div>
      </div>
    </footer>
  )
}
