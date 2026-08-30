'use client';

import React, { useEffect, useState } from 'react'
import { Toast } from '../types'

interface ToastItemProps {
  toast: Toast
  onDismiss: (id: string) => void
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const interval = 50
      const steps = toast.duration / interval
      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++;
        setProgress(Math.max(0, 100 - (currentStep / steps) * 100))
      }, interval);

      return () => clearInterval(timer)

    }
    
    return undefined
  }, [toast.duration])

  const handleDismiss = () => {
    setIsExiting(true)
    setTimeout(() => {
      onDismiss(toast.id)
      toast.onClose?.()
    }, 300)
  }

  const getAnimationClass = () => {
    if (isExiting) return 'z-animate-out'
    const position = toast.position || 'bottom-right'
    switch (position) {
      case 'top-right':
      case 'bottom-right':
        return 'z-animate-in-right'
      case 'top-left':
      case 'bottom-left':
        return 'z-animate-in-left'
      case 'top-center':
        return 'z-animate-in-top'
      case 'bottom-center':
        return 'z-animate-in-bottom'
      default:
        return 'z-animate-in-right'
    }
  }

  const getTypeClass = () => {
    switch (toast.type) {
      case 'success': return 'z-toast-success'
      case 'error': return 'z-toast-error'
      case 'warning': return 'z-toast-warning'
      case 'info': return 'z-toast-info'
      case 'loading': return 'z-toast-loading'
      default: return ''
    }
  }

  const getProgressClass = () => {
    switch (toast.type) {
      case 'success': return 'z-toast-progress-success'
      case 'error': return 'z-toast-progress-error'
      case 'warning': return 'z-toast-progress-warning'
      case 'info': return 'z-toast-progress-info'
      case 'loading': return 'z-toast-progress-loading'
      default: return ''
    }
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <svg className="z-icon-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )
      case 'error':
        return (
          <svg className="z-icon-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="z-icon-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      case 'info':
        return (
          <svg className="z-icon-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'loading':
        return (
          <svg className="z-icon-loading" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={`z-toast-item ${getTypeClass()} ${getAnimationClass()}`}
      role="alert"
      aria-live="polite"
    >
      <div className="z-toast-content">
        <div className="z-toast-icon">{getIcon()}</div>

        <div className="z-toast-body">
          {toast.title && <div className="z-toast-title">{toast.title}</div>}
          <div className="z-toast-message">{toast.message}</div>

          {toast.action && (
            <button className="z-toast-action" onClick={toast.action.onClick}>
              {toast.action.label}
            </button>
          )}
        </div>

        <button className="z-toast-close" onClick={handleDismiss} aria-label="Fechar notificação">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className={`z-toast-progress ${getProgressClass()}`}>
          <div className="z-toast-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
  );
};