'use client'

//import { ToastProvider } from "@zyther/react-toastify";
import { ToastProvider } from './lib/components/ToastProvider.tsx'
//import "@zyther/react-toastify/styles";

interface ClientWrapperProps {
  children: React.ReactNode
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <ToastProvider
      defaultPosition="top-right"
      defaultDuration={0}
      maxToasts={5}
      theme="light"
    >
      {children}
    </ToastProvider>
  )
}