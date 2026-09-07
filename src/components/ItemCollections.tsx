import { useState, useEffect } from 'react'
import type { Item } from '../lib/db'

interface Collection {
  id: string
  name: string
  icon: string
  itemIds: string[]
  createdAt: number
}

interface ItemCollectionsProps {
  isOpen: boolean
  onClose: () => void
  allItems: Item[]
  onSelectItem: (item: Item) => void
}

export default function ItemCollections({ isOpen, onClose, allItems, onSelectItem }: ItemCollectionsProps) {
  const [collections, setCollections] = useState<Collection[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newIcon, setNewIcon] = useState('📁')

  useEffect(() => {
    if (isOpen) {
      loadCollections()
    }
  }, [isOpen])

  const loadCollections = () => {
    const stored = localStorage.getItem('itemCollections')
    if (stored) {
      setCollections(JSON.parse(stored))
    }
  }

  const saveCollections = (updated: Collection[]) => {
    setCollections(updated)
    localStorage.setItem('itemCollections', JSON.stringify(updated))
  }

  const createCollection = () => {
    if (!newName.trim()) return

    const newCollection: Collection = {
      id: Date.now().toString(),
      name: newName,
      icon: newIcon,
      itemIds: [],
      createdAt: Date.now(),
    }

    saveCollections([newCollection, ...collections])
    setNewName('')
    setNewIcon('📁')
    setShowCreateForm(false)
  }

  const deleteCollection = (id: string) => {
    saveCollections(collections.filter(c => c.id !== id))
  }

  const addToCollection = (collectionId: string, itemId: string) => {
    const updated = collections.map(c => {
      if (c.id === collectionId && !c.itemIds.includes(itemId)) {
        return { ...c, itemIds: [...c.itemIds, itemId] }
      }
      return c
    })
    saveCollections(updated)
  }

  const removeFromCollection = (collectionId: string, itemId: string) => {
    const updated = collections.map(c => {
      if (c.id === collectionId) {
        return { ...c, itemIds: c.itemIds.filter(id => id !== itemId) }
      }
      return c
    })
    saveCollections(updated)
  }

  if (!isOpen) return null

  const icons = ['📁', '💎', '👟', '🧤', '⌚', '👓', '✨', '🎁', '📚', '🎨']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">📂 Collections</h3>
            <p className="text-xs text-zinc-500">Organize your saved items</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="text-xs text-cyan-400 hover:text-cyan-300"
            >
              + New Collection
            </button>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5">
              ✕
            </button>
          </div>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="p-6 border-b border-zinc-800 bg-zinc-800/30">
            <div className="flex gap-3">
              <select
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm"
              >
                {icons.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Collection name..."
                className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={createCollection}
                className="px-4 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400"
              >
                Create
              </button>
            </div>
          </div>
        )}

        {/* Collections List */}
        <div className="flex-1 overflow-y-auto p-6">
          {collections.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">📂</div>
              <p className="text-sm text-zinc-500">No collections yet</p>
              <p className="text-xs text-zinc-600 mt-1">Create a collection to organize your items</p>
            </div>
          ) : (
            <div className="space-y-4">
              {collections.map((collection) => {
                const collectionItems = collection.itemIds
                  .map(id => allItems.find(i => i.id === id))
                  .filter((item): item is Item => item !== undefined)

                return (
                  <div key={collection.id} className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{collection.icon}</span>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{collection.name}</h4>
                          <p className="text-xs text-zinc-500">{collectionItems.length} items</p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteCollection(collection.id)}
                        className="text-xs text-zinc-500 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>

                    {collectionItems.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {collectionItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => onSelectItem(item)}
                            className="flex-shrink-0 w-20 bg-zinc-900/50 border border-zinc-700 rounded p-2 hover:border-cyan-500/30 transition-all"
                          >
                            <div className="text-xl mb-1">{item.emoji}</div>
                            <div className="text-[10px] text-zinc-400 truncate">{item.title}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
