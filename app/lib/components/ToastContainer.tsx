import React from 'react';
import { useToastStore } from '../store/toastStore';
import { ToastItem } from './ToastItem';
import { ToastPosition } from '../types';

interface ToastContainerProps {
  theme: 'light' | 'dark';
}

const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export const ToastContainer: React.FC<ToastContainerProps> = ({ theme }) => {
  const { toasts, removeToast } = useToastStore();

  // agrupa toasts por posição
  const groupedToasts = toasts.reduce((acc, toast) => {
    const position = toast.position || 'bottom-right';
    if (!acc[position]) acc[position] = [];
    acc[position].push(toast);
    return acc;
  }, {} as Record<string, typeof toasts>);

  return (
    <>
      {Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <div
          key={position}
          className={`fixed z-50 flex flex-col gap-2 ${positionClasses[position as ToastPosition]}`}
        >
          {positionToasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onDismiss={removeToast}
              theme={theme}
            />
          ))}
        </div>
      ))}
    </>
  );
};