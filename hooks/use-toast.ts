"use client"

// This is a simplified version of the toast hook
// In a real project, you would use a proper toast library like react-hot-toast or sonner

import { useState } from "react"

type ToastProps = {
  title: string
  description?: string
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = ({ title, description, duration = 3000 }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)

    // Add toast to state
    setToasts((prev) => [...prev, { title, description, duration }])

    // Remove toast after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.title !== title))
    }, duration)

    // In a real implementation, you would return methods to dismiss the toast
    return {
      id,
      dismiss: () => {
        setToasts((prev) => prev.filter((toast) => toast.title !== title))
      },
    }
  }

  return { toast, toasts }
}
