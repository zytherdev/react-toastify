/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useState } from 'react';
import { ToastContainer } from './ToastContainer';
import { ToastProviderProps } from '../types';
import { useToastStore } from '../store/toastStore';

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  defaultPosition = 'bottom-right',
  defaultDuration = 4000,
  maxToasts = 5,
  theme = 'system',
}) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  // cfg o store
  useEffect(() => {
    const store = useToastStore.getState();
    store.defaultPosition = defaultPosition;
    store.defaultDuration = defaultDuration;
    store.maxToasts = maxToasts;
  }, [defaultPosition, defaultDuration, maxToasts]);

  // detectar tema do sistema
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setCurrentTheme(mediaQuery.matches ? 'dark' : 'light');

      const handler = (e: MediaQueryListEvent) => {
        setCurrentTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
    setCurrentTheme(theme);

    return undefined
  }, [theme]);

  return (
    <>
      {children}
      <ToastContainer theme={currentTheme} />
    </>
  );
};