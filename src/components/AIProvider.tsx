"use client"

import React, { createContext, useContext, useState } from 'react'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

interface AIContextType {
  generateGiftIdeas: (recipient: string, budget: number) => Promise<string[]>
  generateStory: (theme: string) => Promise<string>
  generateRecipe: (ingredients: string[]) => Promise<string>
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export const useAI = () => {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error('useAI must be used within an AIProvider')
  }
  return context
}

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const generateGiftIdeas = async (recipient: string, budget: number): Promise<string[]> => {
    const prompt = `Generate 5 gift ideas for ${recipient} with a budget of $${budget}. Format the response as a JSON array of strings.`
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: prompt,
    })
    return JSON.parse(text)
  }

  const generateStory = async (theme: string): Promise<string> => {
    const prompt = `Write a short Christmas story (about 200 words) with the theme: ${theme}`
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: prompt,
    })
    return text
  }

  const generateRecipe = async (ingredients: string[]): Promise<string> => {
    const prompt = `Create a Christmas recipe using some or all of these ingredients: ${ingredients.join(', ')}. Format the response with a title, ingredients list, and step-by-step instructions.`
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: prompt,
    })
    return text
  }

  return (
    <AIContext.Provider value={{ generateGiftIdeas, generateStory, generateRecipe }}>
      {children}
    </AIContext.Provider>
  )
}

