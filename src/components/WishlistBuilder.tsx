"use client"

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

interface WishlistItem {
  id: number;
  name: string;
  link?: string;
}

export default function WishlistBuilder() {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [newItemName, setNewItemName] = useState('')
  const [newItemLink, setNewItemLink] = useState('')

  const addItem = () => {
    if (newItemName.trim()) {
      setItems([...items, { id: Date.now(), name: newItemName, link: newItemLink }])
      setNewItemName('')
      setNewItemLink('')
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Christmas Wishlist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Item name"
            />
            <Input
              value={newItemLink}
              onChange={(e) => setNewItemLink(e.target.value)}
              placeholder="Item link (optional)"
            />
            <Button onClick={addItem}>Add</Button>
          </div>
          <ul className="space-y-2">
            {items.map(item => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.name}</span>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Link
                  </a>
                )}
                <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>Remove</Button>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

