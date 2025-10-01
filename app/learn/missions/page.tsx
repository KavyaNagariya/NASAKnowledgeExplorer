'use client'

import { useEffect, useState } from 'react'
import { AppHeader } from '@/components/app-header'
import { AppFooter } from '@/components/app-footer'
import type { Mission } from '@/lib/types'

type FilterStatus = 'all' | 'ongoing' | 'upcoming' | 'completed'

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMissions = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (filter !== 'all') {
          params.append('status', filter)
        }
        const response = await fetch(`/api/missions?${params.toString()}`)
        const data = await response.json()
        setMissions(data)
      } catch (error) {
        console.error('Failed to fetch missions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMissions()
  }, [filter])

  const filterChips: { label: string; value: FilterStatus; color: string }[] = [
    { label: 'All Missions', value: 'all', color: 'primary' },
    { label: 'Ongoing', value: 'ongoing', color: 'green' },
    { label: 'Upcoming', value: 'upcoming', color: 'blue' },
    { label: 'Completed', value: 'completed', color: 'gray' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4">Space Missions</h1>
            <p className="text-xl text-muted-foreground">
              Explore NASA&apos;s ongoing and upcoming missions to explore our universe
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {filterChips.map((chip) => (
              <button
                key={chip.value}
                onClick={() => setFilter(chip.value)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  filter === chip.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border hover:border-primary/50'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading missions...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {missions.map((mission) => (
                <div
                  key={mission.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="md:flex">
                    {mission.imageUrl && (
                      <div className="md:w-1/3 aspect-video md:aspect-auto bg-muted">
                        <img
                          src={mission.imageUrl}
                          alt={mission.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h2 className="text-2xl font-bold mb-2">{mission.name}</h2>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                mission.status === 'ongoing'
                                  ? 'bg-green-500/20 text-green-500'
                                  : mission.status === 'upcoming'
                                  ? 'bg-blue-500/20 text-blue-500'
                                  : 'bg-gray-500/20 text-gray-500'
                              }`}
                            >
                              {mission.status.charAt(0).toUpperCase() + mission.status.slice(1)}
                            </span>
                            {mission.agency && (
                              <span className="text-sm text-muted-foreground">{mission.agency}</span>
                            )}
                            {mission.target && (
                              <span className="text-sm text-muted-foreground">→ {mission.target}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{mission.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm">
                        {mission.launchDate && (
                          <div>
                            <span className="text-muted-foreground">Launch: </span>
                            <span className="font-medium">
                              {new Date(mission.launchDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        )}
                        {mission.endDate && (
                          <div>
                            <span className="text-muted-foreground">End: </span>
                            <span className="font-medium">
                              {new Date(mission.endDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && missions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No missions found for this filter</p>
            </div>
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  )
}
