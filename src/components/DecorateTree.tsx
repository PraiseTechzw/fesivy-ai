"use client"

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"

const ornaments = [
  '🔴', '🔵', '🟡', '🟢', '🟣', '⚪', '🎄', '🎅', '🦌', '❄️', '🎁', '🔔'
]

export default function DecorateTree() {
  const [decorations, setDecorations] = useState<{ id: number; type: string; x: number; y: number }[]>([])
  const treeRef = useRef<HTMLDivElement>(null)

  const addDecoration = (type: string) => {
    if (treeRef.current) {
      const rect = treeRef.current.getBoundingClientRect()
      const x = Math.random() * (rect.width - 30)
      const y = Math.random() * (rect.height - 30)
      setDecorations([...decorations, { id: Date.now(), type, x, y }])
    }
  }

  const removeDecoration = (id: number) => {
    setDecorations(decorations.filter(d => d.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Decorate the Christmas Tree</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {ornaments.map((ornament, index) => (
            <Button key={index} onClick={() => addDecoration(ornament)}>{ornament}</Button>
          ))}
        </div>
        <div 
          ref={treeRef} 
          className="relative w-full h-96 bg-green-700 rounded-lg"
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        >
          {decorations.map((decoration) => (
            <div
              key={decoration.id}
              className="absolute cursor-pointer text-2xl"
              style={{ left: `${decoration.x}px`, top: `${decoration.y}px` }}
              onClick={() => removeDecoration(decoration.id)}
            >
              {decoration.type}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

