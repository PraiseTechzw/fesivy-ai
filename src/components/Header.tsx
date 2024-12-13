import Link from 'next/link'
import { ModeToggle } from './ModeToggle'

export default function Header() {
  return (
    <header className="bg-red-600 dark:bg-green-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Christmas Joy</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/gifts">Gifts</Link></li>
            <li><Link href="/wishlist">Wishlist</Link></li>
            <li><Link href="/budget">Budget</Link></li>
            <li><Link href="/story">Story</Link></li>
            <li><Link href="/recipe">Recipe</Link></li>
            <li><Link href="/decorate">Decorate Tree</Link></li>
            <li><ModeToggle /></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

