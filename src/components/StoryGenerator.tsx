"use client"

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { useAI } from './AIProvider'

export default function StoryGenerator() {
  const [theme, setTheme] = useState('')
  const [story, setStory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { generateStory } = useAI()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const generatedStory = await generateStory(theme)
      setStory(generatedStory)
    } catch (error) {
      console.error('Error generating story:', error)
      setStory('Error generating story. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Holiday Story Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="theme">Story Theme</Label>
            <Input
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="E.g., Magical snowman, Santa's workshop"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating Story...' : 'Generate AI Story'}
          </Button>
        </form>
        {story && (
          <div className="mt-4">
            <h3 className="font-semibold">Your Custom Holiday Story:</h3>
            <p className="mt-2 whitespace-pre-wrap">{story}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

