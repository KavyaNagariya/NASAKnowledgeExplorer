import { AppHeader } from '@/components/app-header'
import { AppFooter } from '@/components/app-footer'
import Link from 'next/link'

const topics = [
  {
    title: 'Solar System',
    description: 'Explore our cosmic neighborhood with detailed information about planets, moons, and other celestial bodies.',
    icon: '🪐',
    href: '/learn/planets',
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    title: 'Space Missions',
    description: 'Track ongoing and upcoming missions, from Mars rovers to deep space telescopes.',
    icon: '🛰️',
    href: '/learn/missions',
    gradient: 'from-red-500/20 to-orange-500/20',
  },
  {
    title: 'Latest News',
    description: 'Stay updated with the latest discoveries, launches, and space exploration news.',
    icon: '📰',
    href: '/learn/news',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
]

export default function LearnPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Learning Hub</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the wonders of space through curated content, stunning imagery, and the latest NASA data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topics.map((topic) => (
              <Link
                key={topic.title}
                href={topic.href}
                className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${topic.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative">
                  <div className="text-6xl mb-6">{topic.icon}</div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {topic.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {topic.description}
                  </p>
                  <div className="mt-6 inline-flex items-center text-primary font-medium">
                    Explore →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-card border border-border rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Test Your Knowledge</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Challenge yourself with quizzes on astronomy, space missions, and cosmic phenomena
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              View Quizzes
            </Link>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
