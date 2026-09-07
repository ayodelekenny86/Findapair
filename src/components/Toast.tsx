import { useState, useEffect, useCallback } from 'react'

export interface Toast {
  id: number
  type: 'success' | 'info' | 'warning' | 'match'
  title: string
  message: string
  emoji: string
}

interface ToastContainerProps {
  toasts: Toast[]
  removeToast: (id: number) => void
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 5000)
    return () => clearTimeout(timer)
  }, [toast.id, onRemove])

  const bgColor = {
    success: 'border-green-500/30 bg-green-500/10',
    info: 'border-cyan-500/30 bg-cyan-500/10',
    warning: 'border-amber-500/30 bg-amber-500/10',
    match: 'border-purple-500/30 bg-purple-500/10',
  }[toast.type]

  return (
    <div className={`glass rounded-xl p-4 border ${bgColor} animate-toast-in shadow-2xl`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{toast.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-100">{toast.title}</p>
          <p className="text-xs text-slate-400 mt-0.5">{toast.message}</p>
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="text-slate-500 hover:text-slate-300 text-sm"
        >
          ✕
        </button>
      </div>
      {/* Progress bar */}
      <div className="mt-3 h-0.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-cyan-500/50 rounded-full animate-shrink" style={{ animation: 'shrink 5s linear forwards' }}></div>
      </div>
    </div>
  )
}

// Hook for managing toasts
export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { ...toast, id }])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}
