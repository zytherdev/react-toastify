'use client'

import React, { useEffect } from 'react'
import { ToastContainer } from './ToastContainer'
import { ToastProviderProps } from '../types'
import { useToastStore } from '../store/toastStore'

import '../styles/toast.css'

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultPosition = 'top-right',
  defaultDuration = 4000,
  maxToasts = 5,
  theme = 'system',
}) => {

  useEffect(() => {
    const store = useToastStore.getState()
    store.defaultPosition = defaultPosition
    store.defaultDuration = defaultDuration
    store.maxToasts = maxToasts
  }, [defaultPosition, defaultDuration, maxToasts])

  return (
    <>
      {children}
      <ToastContainer theme={theme} />
    </>
  )
}
