/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-top': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-out': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'progress-shrink': {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        'toast-in-right': 'slide-in-right 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'toast-in-left': 'slide-in-left 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'toast-in-top': 'slide-in-top 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'toast-in-bottom': 'slide-in-bottom 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'toast-out': 'slide-out 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'progress': 'progress-shrink linear forwards',
      },
    },
  },
  plugins: [],
};