"use client"

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

interface BudgetItem {
  id: number;
  name: string;
  amount: number;
  category: 'gifts' | 'decorations' | 'other';
}

export default function BudgetPlanner() {
  const [items, setItems] = useState<BudgetItem[]>([])
  const [newItemName, setNewItemName] = useState('')
  const [newItemAmount, setNewItemAmount] = useState('')
  const [newItemCategory, setNewItemCategory] = useState<BudgetItem['category']>('gifts')

  const addItem = () => {
    if (newItemName.trim() && newItemAmount) {
      setItems([...items, {
        id: Date.now(),
        name: newItemName,
        amount: parseFloat(newItemAmount),
        category: newItemCategory
      }])
      setNewItemName('')
      setNewItemAmount('')
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const totalBudget = items.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Christmas Budget Planner</CardTitle>
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
              type="number"
              value={newItemAmount}
              onChange={(e) => setNewItemAmount(e.target.value)}
              placeholder="Amount"
            />
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value as BudgetItem['category'])}
              className="border rounded px-2 py-1"
            >
              <option value="gifts">Gifts</option>
              <option value="decorations">Decorations</option>
              <option value="other">Other</option>
            </select>
            <Button onClick={addItem}>Add</Button>
          </div>
          <ul className="space-y-2">
            {items.map(item => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.name} - ${item.amount.toFixed(2)} ({item.category})</span>
                <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>Remove</Button>
              </li>
            ))}
          </ul>
          <div className="font-bold text-lg">
            Total Budget: ${totalBudget.toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

