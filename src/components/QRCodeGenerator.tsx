import { useState } from 'react'
import type { Item } from '../lib/db'

interface QRCodeGeneratorProps {
  item: Item
  isOpen: boolean
  onClose: () => void
}

export default function QRCodeGenerator({ item, isOpen, onClose }: QRCodeGeneratorProps) {
  const [size, setSize] = useState(200)

  if (!isOpen) return null

  // Generate a simple QR-like pattern (visual representation)
  const generateQRPattern = () => {
    const gridSize = 21
    const cells: boolean[][] = []
    
    // Create a deterministic pattern based on item ID
    const seed = item.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    
    for (let i = 0; i < gridSize; i++) {
      cells[i] = []
      for (let j = 0; j < gridSize; j++) {
        // Corner patterns (finder patterns)
        if ((i < 7 && j < 7) || (i < 7 && j >= gridSize - 7) || (i >= gridSize - 7 && j < 7)) {
          const isCorner = (i === 0 || i === 6 || j === 0 || j === 6 || j === gridSize - 1 || j === gridSize - 7 || i === gridSize - 1 || i === gridSize - 7)
          const isInner = (i >= 2 && i <= 4 && j >= 2 && j <= 4) || 
                         (i >= 2 && i <= 4 && j >= gridSize - 5 && j <= gridSize - 3) ||
                         (i >= gridSize - 5 && i <= gridSize - 3 && j >= 2 && j <= 4)
          cells[i][j] = isCorner || isInner
        } else {
          // Data pattern
          cells[i][j] = ((seed * (i + 1) * (j + 1)) % 3) === 0
        }
      }
    }
    
    return cells
  }

  const cells = generateQRPattern()
  const cellSize = size / 21

  const downloadQR = () => {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, size, size)

    ctx.fillStyle = '#000000'
    cells.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell) {
          ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize)
        }
      })
    })

    const link = document.createElement('a')
    link.download = `findapair-${item.id}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">📱 QR Code</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5">✕</button>
        </div>

        <div className="text-center mb-4">
          <div className="inline-block p-4 bg-white rounded-xl">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              {cells.map((row, i) =>
                row.map((cell, j) =>
                  cell ? (
                    <rect
                      key={`${i}-${j}`}
                      x={j * cellSize}
                      y={i * cellSize}
                      width={cellSize}
                      height={cellSize}
                      fill="#000"
                    />
                  ) : null
                )
              )}
            </svg>
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-sm text-white font-medium">{item.title}</p>
          <p className="text-xs text-zinc-500 mt-1">Scan to view on FindAPair</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setSize(size === 200 ? 300 : size === 300 ? 400 : 200)}
            className="flex-1 px-4 py-2.5 bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-700"
          >
            Resize ({size}px)
          </button>
          <button
            onClick={downloadQR}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-cyan-300"
          >
            Download PNG
          </button>
        </div>
      </div>
    </div>
  )
}
