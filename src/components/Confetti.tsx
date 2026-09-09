import { useState, useEffect } from 'react'

interface ConfettiPiece {
  id: number
  x: number
  color: string
  delay: number
  size: number
  rotation: number
}

export function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (!active) { setPieces([]); return }
    const colors = ['#06b6d4', '#22d3ee', '#a855f7', '#ec4899', '#10b981', '#f59e0b']
    const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i, x: Math.random() * 100, color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2, size: Math.random() * 8 + 4, rotation: Math.random() * 360,
    }))
    setPieces(newPieces)
    const timer = setTimeout(() => setPieces([]), 4000)
    return () => clearTimeout(timer)
  }, [active])

  if (!pieces.length) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {pieces.map((piece) => (
        <div key={piece.id} className="confetti-piece" style={{
          left: `${piece.x}%`, backgroundColor: piece.color, width: `${piece.size}px`, height: `${piece.size}px`,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px', animationDelay: `${piece.delay}s`, transform: `rotate(${piece.rotation}deg)`,
        }} />
      ))}
    </div>
  )
}
