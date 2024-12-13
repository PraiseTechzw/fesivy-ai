"use client"

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { useAI } from './AIProvider'

export default function GiftRecommendations() {
  const [recipient, setRecipient] = useState('')
  const [budget, setBudget] = useState('')
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { generateGiftIdeas } = useAI()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const ideas = await generateGiftIdeas(recipient, parseFloat(budget))
      setRecommendations(ideas)
    } catch (error) {
      console.error('Error generating gift ideas:', error)
      setRecommendations(['Error generating gift ideas. Please try again.'])
    }
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Gift Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="E.g., Mom, Dad, Friend"
            />
          </div>
          <div>
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating Ideas...' : 'Get AI Recommendations'}
          </Button>
        </form>
        {recommendations.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">AI Suggested Gifts:</h3>
            <ul className="list-disc list-inside">
              {recommendations.map((gift, index) => (
                <li key={index}>{gift}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

