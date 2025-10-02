import { AppHeader } from '@/components/app-header'
import { AppFooter } from '@/components/app-footer'
import type { Planet } from '@/lib/types'

const planets: Planet[] = [
  {
    name: 'Mercury',
    description: 'The smallest planet and closest to the Sun',
    distanceFromSun: '57.9 million km',
    diameter: '4,879 km',
    moons: 0,
    imageUrl: 'https://unsplash.com/photos/mercury-on-a-black-background-71W3CWeZF7A',//saturn hai isme mercury laga denge
    facts: ['Shortest orbit: 88 Earth days', 'No atmosphere', 'Temperature extremes: -180°C to 430°C'],
  },
  {
    name: 'Venus',
    description: 'The hottest planet with a toxic atmosphere',
    distanceFromSun: '108.2 million km',
    diameter: '12,104 km',
    moons: 0,
    imageUrl: 'https://unsplash.com/photos/venus-on-a-black-background-88BMUbQHGlQ',
    facts: ['Hottest planet: 465°C', 'Rotates backwards', 'Thick CO2 atmosphere'],
  },
  {
    name: 'Earth',
    description: 'Our home planet, the only known world with life',
    distanceFromSun: '149.6 million km',
    diameter: '12,742 km',
    moons: 1,
    imageUrl: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800',//correct
    facts: ['70% covered by water', '1 natural satellite: the Moon', 'Only planet with liquid water'],
  },
  {
    name: 'Mars',
    description: 'The Red Planet, target for human exploration',
    distanceFromSun: '227.9 million km',
    diameter: '6,779 km',
    moons: 2,
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800',//neptune hai aur neptune me broken image hai correct image-https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800
    facts: ['Home to Olympus Mons, largest volcano', 'Evidence of ancient water', 'Day length: 24.6 hours'],
  },
  {
    name: 'Jupiter',
    description: 'The largest planet with a famous Great Red Spot',
    distanceFromSun: '778.5 million km',
    diameter: '139,820 km',
    moons: 95,
    imageUrl: 'https://unsplash.com/photos/a-close-up-of-a-planet-with-a-black-background-awYEQyYdHVE',
    facts: ['Largest planet in solar system', 'Great Red Spot storm', 'Strongest magnetic field'],
  },
  {
    name: 'Saturn',
    description: 'Known for its spectacular ring system',
    distanceFromSun: '1.4 billion km',
    diameter: '116,460 km',
    moons: 146,
    imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800',//corrected
    facts: ['Most extensive ring system', 'Least dense planet', 'Could float in water'],
  },
  {
    name: 'Uranus',
    description: 'An ice giant tilted on its side',
    distanceFromSun: '2.9 billion km',
    diameter: '50,724 km',
    moons: 27,
    imageUrl: 'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=800',
    facts: ['Rotates on its side', 'Coldest atmosphere: -224°C', 'Methane gives blue color'],
  },
  {
    name: 'Neptune',
    description: 'The windiest planet in our solar system',
    distanceFromSun: '4.5 billion km',
    diameter: '49,244 km',
    moons: 14,
    imageUrl: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800',//corrected
    facts: ['Fastest winds: 2,100 km/h', 'Furthest planet from Sun', 'Takes 165 years to orbit Sun'],
  },
]

export default function PlanetsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4">Solar System</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the eight planets orbiting our Sun, each with unique characteristics and mysteries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {planets.map((planet) => (
              <div
                key={planet.name}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className="aspect-square relative bg-muted">
                  <img
                    src={planet.imageUrl}
                    alt={planet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{planet.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{planet.description}</p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="font-medium">{planet.distanceFromSun}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Diameter:</span>
                      <span className="font-medium">{planet.diameter}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Moons:</span>
                      <span className="font-medium">{planet.moons}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-semibold text-primary mb-2">KEY FACTS</p>
                    <ul className="space-y-1">
                      {planet.facts.map((fact, index) => (
                        <li key={index} className="text-xs text-muted-foreground">
                          • {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
