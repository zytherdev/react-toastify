import { create } from 'zustand';
import { Toast, ToastPosition } from '../types';

interface ToastStore {
  toasts: Toast[];
  defaultPosition: ToastPosition;
  defaultDuration: number;
  maxToasts: number;
  addToast: (toast: Omit<Toast, 'id' | 'createdAt'>) => string;
  updateToast: (id: string, updates: Partial<Toast>) => void;
  removeToast: (id: string) => void;
  removeAll: () => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  defaultPosition: 'bottom-right',
  defaultDuration: 4000,
  maxToasts: 5,

  addToast: (toast) => {
    const id = crypto.randomUUID?.() || Math.random().toString(36).substring(7);
    const newToast: Toast = {
      ...toast,
      id,
      createdAt: Date.now(),
      duration: toast.duration ?? get().defaultDuration,
      position: toast.position ?? get().defaultPosition,
    };

    set((state) => {
      const newToasts = [newToast, ...state.toasts];
      if (newToasts.length > state.maxToasts) {
        newToasts.pop();
      }
      return { toasts: newToasts };
    });

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, newToast.duration);
    }

    return id;
  },

  updateToast: (id, updates) => {
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === id ? { ...toast, ...updates } : toast
      ),
    }));
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  removeAll: () => {
    set({ toasts: [] });
  },
}));