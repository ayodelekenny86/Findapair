import { useEffect, useState } from 'react'
import { db } from '../lib/db'
import type { Item } from '../lib/db'

interface SimilarItemsProps {
  currentItem: Item
  onSelectItem: (item: Item) => void
}

export default function SimilarItems({ currentItem, onSelectItem }: SimilarItemsProps) {
  const [similarItems, setSimilarItems] = useState<Item[]>([])

  useEffect(() => {
    const allItems = db.getItems()
    
    // Find similar items based on category and other attributes
    const similar = allItems
      .filter(item => 
        item.id !== currentItem.id &&
        (item.category === currentItem.category || 
         item.title.toLowerCase().includes(currentItem.title.toLowerCase().split(' ')[0]) ||
         item.condition === currentItem.condition)
      )
      .slice(0, 4)
    
    setSimilarItems(similar)
  }, [currentItem])

  if (similarItems.length === 0) return null

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-zinc-400 mb-3">Similar Items</h3>
      <div className="grid grid-cols-2 gap-3">
        {similarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 hover:border-cyan-500/30 transition-all text-left"
          >
            <div className="text-2xl mb-2">{item.emoji}</div>
            <div className="text-xs font-medium text-white truncate">{item.title}</div>
            <div className="text-[10px] text-zinc-500 mt-1">
              {item.type === 'pair' ? `$${item.price}` : 'FREE'}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
