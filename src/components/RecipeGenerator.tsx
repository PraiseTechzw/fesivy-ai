"use client"

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { useAI } from './AIProvider'

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('')
  const [recipe, setRecipe] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { generateRecipe } = useAI()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const generatedRecipe = await generateRecipe(ingredients.split(',').map(i => i.trim()))
      setRecipe(generatedRecipe)
    } catch (error) {
      console.error('Error generating recipe:', error)
      setRecipe('Error generating recipe. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Christmas Recipe Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="ingredients">Ingredients (comma-separated)</Label>
            <Input
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="E.g., turkey, cranberries, potatoes"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating Recipe...' : 'Generate AI Recipe'}
          </Button>
        </form>
        {recipe && (
          <div className="mt-4">
            <h3 className="font-semibold">Your Custom Christmas Recipe:</h3>
            <pre className="mt-2 whitespace-pre-wrap">{recipe}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

