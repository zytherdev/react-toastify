# React Toastify

[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?c=eyJhbGciOiJub25lIn0.eyJiIjp7IngiOmZhbHNlLCJ0IjoidjZlIiwibCI6Im5wbSBwYWNrYWdlIiwiciI6IjAuMS4wIn19)](https://badge.fury.io/js/%40zyther%2Freact-toastify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react\&logoColor=61DAFB)](https://react.dev/)

A modern, fully customizable toast notification library for **React** and **Next.js** applications.

## ✨ Features

* 🎨 **Beautiful & Modern** — Clean design with smooth animations
* 🌓 **Dark / Light / System** — Automatic theme support out of the box
* 🎯 **Fully Customizable** — Positions, durations, colors, icons, and actions
* 📦 **Lightweight** — Minimal bundle size with only Zustand as a dependency
* ⚡ **TypeScript** — 100% type-safe with full IntelliSense support
* 🚀 **Next.js Ready** — Works seamlessly with Server Components and the App Router
* 📱 **Responsive** — Optimized for all devices and screen sizes
* ♿ **Accessible** — ARIA-friendly with keyboard navigation support
* 🔄 **Loading States** — Built-in loading toasts with update capabilities
* 🎭 **Multiple Positions** — 6 different positions
* ⏱️ **Progress Bar** — Visual timer indicator with pause-on-hover support
* 🎪 **Smooth Animations** — Elegant enter and exit animations

## 📦 Installation

```bash
# npm
npm install @zyther/react-toastify

# yarn
yarn add @zyther/react-toastify

# pnpm
pnpm add @zyther/react-toastify
```

## 🚀 Quick Start

### 1. Wrap your app with `ToastProvider`

For a Next.js App Router application:

```tsx
// app/layout.tsx

import { ToastProvider } from "@zyther/react-toastify";
import "@zyther/react-toastify/styles";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider
          defaultPosition="bottom-right"
          defaultDuration={4000}
          maxToasts={5}
          theme="system"
        >
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
```

### 2. Use the `useToast` hook

```tsx
"use client";

import { useToast } from "@zyther/react-toastify";

export default function MyComponent() {
  const toast = useToast();

  const handleClick = () => {
    toast.success("Operation completed successfully! 🎉", {
      title: "Success",
      duration: 4000,
    });
  };

  return (
    <button onClick={handleClick}>
      Show Toast
    </button>
  );
}
```

## 📖 Usage Examples

### Basic Examples

```tsx
import { useToast } from "@zyther/react-toastify";

function Demo() {
  const toast = useToast();

  // Success toast
  toast.success("Data saved successfully!");

  // Error toast with an action button
  toast.error("Failed to save data", {
    title: "Error",
    action: {
      label: "Retry",
      onClick: () => console.log("Retrying..."),
    },
  });

  // Warning toast
  toast.warning("Please check your input fields");

  // Info toast
  toast.info("New version available", {
    duration: 5000,
  });

  // Loading toast with update
  const id = toast.loading("Processing your request...");

  setTimeout(() => {
    toast.updateToast(id, {
      type: "success",
      message: "Request completed!",
      duration: 3000,
    });
  }, 2000);
}
```

### Custom Positions

```tsx
toast.success("Top right!", {
  position: "top-right",
});

toast.info("Top left!", {
  position: "top-left",
});

toast.warning("Top center!", {
  position: "top-center",
});

toast.error("Bottom right!", {
  position: "bottom-right",
});

toast.success("Bottom left!", {
  position: "bottom-left",
});

toast.info("Bottom center!", {
  position: "bottom-center",
});
```

### Custom Duration

Disable automatic dismissal:

```tsx
toast.info("This stays until dismissed", {
  duration: 0,
});
```

Custom duration in milliseconds:

```tsx
toast.success("Short toast", {
  duration: 2000,
});

toast.success("Long toast", {
  duration: 8000,
});
```

### Actions & Interactions

```tsx
toast.error("Connection lost", {
  title: "Network Error",
  duration: 5000,

  action: {
    label: "Reconnect",
    onClick: () => {
      console.log("Reconnecting...");
    },
  },

  onClose: () => {
    console.log("Toast closed");
  },
});
```

### Dismiss Methods

```tsx
const toast = useToast();

// Dismiss a specific toast by ID
const id = toast.info("Hello!");

toast.dismissToast(id);

// Dismiss all active toasts
toast.dismissAll();
```

## 🎯 API Reference

### `ToastProvider` Props

| Prop              | Type                            | Default          | Description                                                 |
| ----------------- | ------------------------------- | ---------------- | ----------------------------------------------------------- |
| `defaultPosition` | `ToastPosition`                 | `"bottom-right"` | Default position for all toasts                             |
| `defaultDuration` | `number`                        | `4000`           | Default duration in milliseconds. `0` disables auto-dismiss |
| `maxToasts`       | `number`                        | `5`              | Maximum number of visible toasts                            |
| `theme`           | `"light" \| "dark" \| "system"` | `"system"`       | Theme mode                                                  |

### `ToastPosition`

```ts
type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";
```

### `useToast` Return Value

```ts
interface UseToastReturn {
  showToast: (
    message: string,
    options?: ToastOptions
  ) => string;

  success: (
    message: string,
    options?: Omit<ToastOptions, "type">
  ) => string;

  error: (
    message: string,
    options?: Omit<ToastOptions, "type">
  ) => string;

  warning: (
    message: string,
    options?: Omit<ToastOptions, "type">
  ) => string;

  info: (
    message: string,
    options?: Omit<ToastOptions, "type">
  ) => string;

  loading: (
    message: string,
    options?: Omit<ToastOptions, "type">
  ) => string;

  updateToast: (
    id: string,
    updates: Partial<Toast>
  ) => void;

  dismissToast: (id: string) => void;

  dismissAll: () => void;
}
```

### `ToastOptions`

| Option     | Type                                     | Default          | Description                                         |
| ---------- | ---------------------------------------- | ---------------- | --------------------------------------------------- |
| `type`     | `ToastType`                              | `"info"`         | Toast type                                          |
| `title`    | `string`                                 | `undefined`      | Optional title                                      |
| `duration` | `number`                                 | `4000`           | Duration in milliseconds. `0` disables auto-dismiss |
| `position` | `ToastPosition`                          | `"bottom-right"` | Toast position                                      |
| `icon`     | `React.ReactNode`                        | `undefined`      | Custom icon                                         |
| `action`   | `{ label: string; onClick: () => void }` | `undefined`      | Action button                                       |
| `onClose`  | `() => void`                             | `undefined`      | Callback invoked when the toast closes              |

## 🎨 Custom Styling

### Custom CSS

You can override the default styles with your own CSS:

```css
.my-toast {
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}
```

### Custom Icons

```tsx
toast.info("Custom icon!", {
  icon: <CustomIcon />,
});
```

## 🧪 TypeScript

The library is fully typed and provides complete TypeScript support.

You can import the available types directly from the package:

```ts
import type {
  Toast,
  ToastOptions,
  ToastType,
  ToastPosition,
  ToastProviderProps,
} from "@zyther/react-toastify";
```

## 🌟 Best Practices

### Provider Placement

Place `ToastProvider` at the root of your application, typically in `layout.tsx`.

### Client Components

When using the `useToast` hook in Next.js, add the `"use client"` directive to the component.

### Toast IDs

Store toast IDs when you need to update or dismiss a specific toast later.

```tsx
const id = toast.loading("Processing...");

// Later
toast.updateToast(id, {
  type: "success",
  message: "Done!",
});
```

### Duration

Use `duration: 0` for important messages that require the user to manually dismiss them.

### Actions

Keep action callbacks simple and avoid placing heavy business logic directly inside the toast action.

## 🚀 Performance

* **Minimal Bundle** — Approximately 6 KB gzipped
* **Optimized Renders** — Uses Zustand for efficient state management
* **Memoized Components** — Toast items are memoized for improved performance
* **Lazy Rendering** — Only renders toast content when needed

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create your feature branch:

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes:

```bash
git commit -m "Add some amazing feature"
```

4. Push to the branch:

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request.

## 📚 Changelog

See [`CHANGELOG.md`](CHANGELOG.md) for the version history.

## 🐛 Bug Reports

Found a bug or unexpected behavior?

Please report it through **GitHub Issues** with:

* A clear description of the problem
* Steps to reproduce it
* Your React and Next.js versions
* Your browser and operating system
* Any relevant error messages or screenshots

## 📝 License

MIT © **zytherdev**
