import { useState, useEffect, useCallback } from 'react'

export interface Toast {
  id: number
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
  emoji?: string
}

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now()
    setToasts(prev => [...prev, { ...toast, id }])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}

interface ToastContainerProps {
  toasts: Toast[]
  removeToast: (id: number) => void
}

export default function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed top-20 right-4 z-[100] space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true))
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  const borderColor = {
    success: 'rgba(16, 185, 129, 0.2)',
    error: 'rgba(239, 68, 68, 0.2)',
    info: 'rgba(6, 182, 212, 0.2)',
    warning: 'rgba(245, 158, 11, 0.2)',
  }[toast.type]

  return (
    <div
      className="panel-elevated p-4 flex items-start gap-3 transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
        borderLeft: `3px solid ${borderColor}`,
      }}
    >
      {toast.emoji && <span className="text-lg flex-shrink-0">{toast.emoji}</span>}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-white">{toast.title}</p>
        <p className="text-[12px] text-zinc-500 mt-0.5">{toast.message}</p>
      </div>
      <button onClick={onClose} className="text-zinc-600 hover:text-zinc-400 text-sm flex-shrink-0">✕</button>
    </div>
  )
}
