'use client'

import React from 'react'
import { useToastStore } from '../store/toastStore'
import { ToastItem } from './ToastItem'
import { ToastPosition, ToastTheme } from '../types'

interface ToastContainerProps {
  theme: ToastTheme
}

const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'z-toast-top-right',
  'top-left': 'z-toast-top-left',
  'top-center': 'z-toast-top-center',
  'bottom-right': 'z-toast-bottom-right',
  'bottom-left': 'z-toast-bottom-left',
  'bottom-center': 'z-toast-bottom-center',
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ theme }) => {
  const { toasts, removeToast } = useToastStore()

  // agrupa toasts por posição
  const groupedToasts = toasts.reduce((acc, toast) => {
    const position = toast.position || 'bottom-right'
    if (!acc[position]) acc[position] = []
    acc[position].push(toast)
    return acc
  }, {} as Record<string, typeof toasts>)

  if (toasts.length === 0) return null

  return (
    <>
      {Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <div
          key={position}
          data-theme={theme}
          className={`z-toast-container ${positionClasses[position as ToastPosition]}`}
        >
          {positionToasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onDismiss={removeToast}
            />
          ))}
        </div>
      ))}
    </>
  )
}