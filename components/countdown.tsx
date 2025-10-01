'use client'

import { useState, useEffect } from 'react'

interface CountdownProps {
  targetDate: string
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return null
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!timeLeft) {
    return <div className="text-sm text-muted-foreground">Launched!</div>
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="bg-background/50 rounded-lg p-2 text-center">
        <div className="text-xl font-bold">{timeLeft.days}</div>
        <div className="text-xs text-muted-foreground">Days</div>
      </div>
      <div className="bg-background/50 rounded-lg p-2 text-center">
        <div className="text-xl font-bold">{timeLeft.hours}</div>
        <div className="text-xs text-muted-foreground">Hours</div>
      </div>
      <div className="bg-background/50 rounded-lg p-2 text-center">
        <div className="text-xl font-bold">{timeLeft.minutes}</div>
        <div className="text-xs text-muted-foreground">Mins</div>
      </div>
      <div className="bg-background/50 rounded-lg p-2 text-center">
        <div className="text-xl font-bold">{timeLeft.seconds}</div>
        <div className="text-xs text-muted-foreground">Secs</div>
      </div>
    </div>
  )
}
