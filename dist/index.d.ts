import React$1 from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';
type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
interface Toast {
    id: string;
    type: ToastType;
    message: string;
    title?: string;
    duration?: number;
    position?: ToastPosition;
    icon?: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
    onClose?: () => void;
    createdAt: number;
}
interface ToastOptions {
    type?: ToastType;
    title?: string;
    duration?: number;
    position?: ToastPosition;
    icon?: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
    onClose?: () => void;
}
type ToastTheme = 'light' | 'dark' | 'system';
interface ToastProviderProps {
    children: React.ReactNode;
    defaultPosition?: ToastPosition;
    defaultDuration?: number;
    maxToasts?: number;
    theme?: ToastTheme;
}

declare const ToastProvider: React$1.FC<ToastProviderProps>;

declare const useToast: () => {
    showToast: (message: string, options?: ToastOptions) => string;
    success: (message: string, options?: Omit<ToastOptions, "type">) => string;
    error: (message: string, options?: Omit<ToastOptions, "type">) => string;
    warning: (message: string, options?: Omit<ToastOptions, "type">) => string;
    info: (message: string, options?: Omit<ToastOptions, "type">) => string;
    loading: (message: string, options?: Omit<ToastOptions, "type">) => string;
    updateToast: (id: string, updates: Partial<Toast>) => void;
    dismissToast: (id: string) => void;
    dismissAll: () => void;
};

export { type Toast, type ToastOptions, type ToastPosition, ToastProvider, type ToastProviderProps, type ToastType, useToast };
