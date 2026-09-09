import { useState, useEffect } from 'react'
import type { Item } from '../lib/db'

interface Version {
  id: string
  timestamp: number
  changes: string[]
  snapshot: Partial<Item>
}

interface ItemVersionHistoryProps {
  item: Item
}

export default function ItemVersionHistory({ item }: ItemVersionHistoryProps) {
  const [versions, setVersions] = useState<Version[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(`versions_${item.id}`)
    if (stored) {
      setVersions(JSON.parse(stored))
    } else {
      // Initialize with creation version
      const initial: Version = {
        id: '1',
        timestamp: item.postedAt,
        changes: ['Item created'],
        snapshot: { ...item },
      }
      setVersions([initial])
      localStorage.setItem(`versions_${item.id}`, JSON.stringify([initial]))
    }
  }, [item.id])

  const addVersion = (changes: string[]) => {
    const newVersion: Version = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      changes,
      snapshot: { ...item },
    }
    const updated = [newVersion, ...versions]
    setVersions(updated)
    localStorage.setItem(`versions_${item.id}`, JSON.stringify(updated))
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-zinc-400 mb-3">📜 Version History</h3>
      
      <div className="space-y-2">
        {versions.map((version, index) => (
          <div key={version.id} className="bg-zinc-800/30 border border-zinc-800 rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-cyan-400">v{versions.length - index}</span>
                <span className="text-xs text-zinc-500">{formatTime(version.timestamp)}</span>
              </div>
              {index === 0 && (
                <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-[10px] rounded">Current</span>
              )}
            </div>
            <ul className="space-y-1">
              {version.changes.map((change, i) => (
                <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                  <span className="text-zinc-600">•</span>
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export const versionHistoryUtils = {
  addVersion: (itemId: string, changes: string[], item: any) => {
    const stored = localStorage.getItem(`versions_${itemId}`)
    const versions: Version[] = stored ? JSON.parse(stored) : []
    
    const newVersion: Version = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      changes,
      snapshot: { ...item },
    }
    
    const updated = [newVersion, ...versions]
    localStorage.setItem(`versions_${itemId}`, JSON.stringify(updated))
  },
}
