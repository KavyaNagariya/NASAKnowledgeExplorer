import Link from 'next/link'

const hubs = [
  {
    title: 'Solar System',
    description: 'Explore planets, moons, and other celestial bodies',
    icon: '🪐',
    href: '/learn/planets',
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    title: 'Missions',
    description: 'Track ongoing and upcoming space missions',
    icon: '🛰️',
    href: '/learn/missions',
    color: 'from-red-500/20 to-orange-500/20',
  },
  {
    title: 'Events',
    description: 'Upcoming celestial events and phenomena',
    icon: '🌟',
    href: '/dashboard',
    color: 'from-yellow-500/20 to-amber-500/20',
  },
  {
    title: 'Quizzes',
    description: 'Test your space knowledge',
    icon: '🎯',
    href: '/dashboard',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    title: 'News',
    description: 'Latest discoveries and announcements',
    icon: '📰',
    href: '/learn/news',
    color: 'from-indigo-500/20 to-blue-500/20',
  },
  {
    title: 'Gallery',
    description: 'Browse stunning space imagery',
    icon: '🖼️',
    href: '/learn/news',
    color: 'from-pink-500/20 to-rose-500/20',
  },
]

export function HubGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {hubs.map((hub) => (
        <Link
          key={hub.title}
          href={hub.href}
          className="group relative bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
        >
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${hub.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
          
          <div className="relative">
            <div className="text-4xl mb-4">{hub.icon}</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {hub.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {hub.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
