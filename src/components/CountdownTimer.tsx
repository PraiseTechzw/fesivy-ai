"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilChristmas())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilChristmas())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function getTimeUntilChristmas() {
    const christmas = new Date(new Date().getFullYear(), 11, 25)
    if (christmas.getTime() < Date.now()) {
      christmas.setFullYear(christmas.getFullYear() + 1)
    }
    const difference = christmas.getTime() - Date.now()

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  return (
    <Card className="bg-red-100 dark:bg-green-900 text-red-800 dark:text-green-100">
      <CardHeader>
        <CardTitle className="text-center">Countdown to Christmas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-4xl font-bold">{timeLeft.days}</div>
            <div className="text-sm">Days</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{timeLeft.hours}</div>
            <div className="text-sm">Hours</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{timeLeft.minutes}</div>
            <div className="text-sm">Minutes</div>
          </div>
          <div>
            <div className="text-4xl font-bold">{timeLeft.seconds}</div>
            <div className="text-sm">Seconds</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

