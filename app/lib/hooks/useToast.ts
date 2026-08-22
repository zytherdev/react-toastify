import { useCallback } from 'react';
import { useToastStore } from '../store/toastStore';
import { ToastOptions } from '../types';

export const useToast = () => {
  const { addToast, updateToast, removeToast, removeAll } = useToastStore();

  const showToast = useCallback(
    (message: string, options: ToastOptions = {}) => {
      const { type = 'info', ...rest } = options;
      return addToast({ message, type, ...rest });
    },
    [addToast]
  );

  const success = useCallback(
    (message: string, options?: Omit<ToastOptions, 'type'>) => {
      return showToast(message, { ...options, type: 'success' });
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, options?: Omit<ToastOptions, 'type'>) => {
      return showToast(message, { ...options, type: 'error' });
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, options?: Omit<ToastOptions, 'type'>) => {
      return showToast(message, { ...options, type: 'warning' });
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, options?: Omit<ToastOptions, 'type'>) => {
      return showToast(message, { ...options, type: 'info' });
    },
    [showToast]
  );

  const loading = useCallback(
    (message: string, options?: Omit<ToastOptions, 'type'>) => {
      return showToast(message, { ...options, type: 'loading' });
    },
    [showToast]
  );

  return {
    showToast,
    success,
    error,
    warning,
    info,
    loading,
    updateToast,
    dismissToast: removeToast,
    dismissAll: removeAll,
  };
};