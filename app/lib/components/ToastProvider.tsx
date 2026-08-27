/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import React, { useEffect, useState } from 'react'
import { ToastContainer } from './ToastContainer'
import { ToastProviderProps } from '../types'
import { useToastStore } from '../store/toastStore'

import '../styles/toast.css'

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultPosition = 'top-right',
  defaultDuration = 4000,
  maxToasts = 5,
  theme = 'light',
}) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const store = useToastStore.getState()
    store.defaultPosition = defaultPosition
    store.defaultDuration = defaultDuration
    store.maxToasts = maxToasts
  }, [defaultPosition, defaultDuration, maxToasts])

  useEffect(() => {
    setIsMounted(true)

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      setCurrentTheme(mediaQuery.matches ? 'dark' : 'light')

      const handler = (e: MediaQueryListEvent) => {
        setCurrentTheme(e.matches ? 'dark' : 'light')
      }
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }

    setCurrentTheme(theme)

    return undefined
  }, [theme])

  if (!isMounted) {
    return <>{children}</>
  }

  return (
    <>
      {children}
      <ToastContainer theme={currentTheme} />
    </>
  )
}
