'use client';

import React, { useEffect, useState } from 'react';
import { Toast } from '../types';

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
  theme: 'light' | 'dark';
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss, theme }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const interval = 50;
      const steps = toast.duration / interval;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const newProgress = 100 - (currentStep / steps) * 100;
        setProgress(Math.max(0, newProgress));
      }, interval);

      return () => clearInterval(timer);
    }

    return undefined

  }, [toast.duration]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
      toast.onClose?.();
    }, 300);
  };

  const getEnterAnimation = () => {
    const position = toast.position || 'bottom-right';
    switch (position) {
      case 'top-right':
        return 'animate-toast-in-right';
      case 'bottom-right':
        return 'animate-toast-in-right';
      case 'top-left':
        return 'animate-toast-in-left';
      case 'bottom-left':
        return 'animate-toast-in-left';
      case 'top-center':
        return 'animate-toast-in-top';
      case 'bottom-center':
        return 'animate-toast-in-bottom';
      default:
        return 'animate-toast-in-right';
    }
  };

  const colorMap = {
    success: 'border-green-500 bg-green-50 dark:bg-green-900/30',
    error: 'border-red-500 bg-red-50 dark:bg-red-900/30',
    warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30',
    info: 'border-blue-500 bg-blue-50 dark:bg-blue-900/30',
    loading: 'border-gray-500 bg-gray-50 dark:bg-gray-800/50',
  };

  const progressColorMap = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
    loading: 'bg-gray-500',
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'loading':
        return (
          <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`
        relative w-96 max-w-[calc(100vw-2rem)] mb-3 p-4 rounded-lg border-l-4 shadow-lg
        ${colorMap[toast.type]}
        ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
        ${isExiting ? 'animate-toast-out' : getEnterAnimation()}
        hover:shadow-xl transition-shadow duration-200
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>

        <div className="flex-1 min-w-0">
          {toast.title && (
            <h4 className="text-sm font-semibold">
              {toast.title}
            </h4>
          )}
          <p className="text-sm mt-0.5 break-words">{toast.message}</p>
          
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700 
                       dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 
                   dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          aria-label="Fechar notificação"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-b-lg overflow-hidden">
          <div
            className={`h-full transition-all duration-100 ease-linear ${progressColorMap[toast.type]}`}
            style={{ 
              width: `${progress}%`,
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      </div>
  );
};