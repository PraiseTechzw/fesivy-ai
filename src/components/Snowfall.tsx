"use client"

import { useEffect, useState } from 'react'

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<JSX.Element[]>([])

  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = (
        <div
          key={Math.random()}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 3 + 5}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          ❄
        </div>
      )
      setSnowflakes(prev => [...prev, snowflake])
    }

    const interval = setInterval(createSnowflake, 200)
    return () => clearInterval(interval)
  }, [])

  return <>{snowflakes}</>
}

