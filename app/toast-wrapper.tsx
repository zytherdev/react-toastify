'use client'

import { ToastProvider } from "@zyther/react-toastify";
//import { ToastProvider } from './lib/components/ToastProvider'
import "@zyther/react-toastify/styles"

interface ClientWrapperProps {
  children: React.ReactNode
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <ToastProvider
      defaultPosition="top-right"
      defaultDuration={6000}
      maxToasts={5}
      theme="system"
    >
      {children}
    </ToastProvider>
  )
}