'use client'

import { ToastProvider } from "@zyther/react-toastify";
import "@zyther/react-toastify/styles";

interface ClientWrapperProps {
  children: React.ReactNode
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <ToastProvider
      defaultPosition="bottom-left"
      defaultDuration={0}
      maxToasts={5}
      theme="system"
    >
      {children}
    </ToastProvider>
  )
}