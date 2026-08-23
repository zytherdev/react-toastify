# React Toastify

[![npm version](https://img.shields.io/npm/v/%40zyther/react-toastify)](https://www.npmjs.com/package/@zyther/react-toastify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)

A modern, fully customizable toast notification library for **React** and **Next.js** applications.

---

## ✨ Features

- 🎨 **Beautiful & Modern** — Clean design with smooth animations
- 🌓 **Dark / Light / System** — Automatic theme support out of the box
- 🎯 **Fully Customizable** — Positions, durations, colors, icons, and actions
- 📦 **Lightweight** — Minimal bundle size with only Zustand as a dependency
- ⚡ **TypeScript** — 100% type-safe with full IntelliSense support
- 🚀 **Next.js Ready** — Works seamlessly with Server Components and the App Router
- 📱 **Responsive** — Optimized for all devices and screen sizes
- ♿ **Accessible** — ARIA-friendly with keyboard navigation support
- 🔄 **Loading States** — Built-in loading toasts with update capabilities
- 🎭 **Multiple Positions** — 6 different positions
- ⏱️ **Progress Bar** — Visual timer indicator with pause-on-hover support
- 🎪 **Smooth Animations** — Elegant enter and exit animations
- 🎨 **CSS Isolated** — Pure CSS with a `z-toast-*` prefix, so it won't conflict with your styles

---

## 📦 Installation

### npm

```bash
npm install @zyther/react-toastify
```

### Yarn

```bash
yarn add @zyther/react-toastify
```

### pnpm

```bash
pnpm add @zyther/react-toastify
```

---

## 🚀 Quick Start

### 1. Create a Client Wrapper

> [!IMPORTANT]
> Since `ToastProvider` uses client-side hooks (`useEffect`, `useState`), you need to wrap it in a Client Component before using it in your Server Component layout.

Create `app/components/ClientWrapper.tsx`:

```tsx
'use client';

import { ToastProvider } from "@zyther/react-toastify";
import "@zyther/react-toastify/styles";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <ToastProvider
      defaultPosition="bottom-right"
      defaultDuration={4000}
      maxToasts={5}
      theme="system"
    >
      {children}
    </ToastProvider>
  );
}
```

### 2. Wrap Your App in `layout.tsx`

`app/layout.tsx` (Server Component):

```tsx
import { ClientWrapper } from "@/components/ClientWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
```

### 3. Use the `useToast` Hook

> [!IMPORTANT]
> The `useToast` hook must be used in Client Components with the `"use client"` directive.

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

---

## 📖 Usage Examples

### Basic Examples

```tsx
"use client";

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

---

## 🎯 API Reference

### `ToastProvider` Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultPosition` | `ToastPosition` | `"bottom-right"` | Default position for all toasts |
| `defaultDuration` | `number` | `4000` | Default duration in milliseconds. `0` disables auto-dismiss |
| `maxToasts` | `number` | `5` | Maximum number of visible toasts |
| `theme` | `"light" \| "dark" \| "system"` | `"system"` | Theme mode |

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

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `ToastType` | `"info"` | Toast type |
| `title` | `string` | `undefined` | Optional title |
| `duration` | `number` | `4000` | Duration in milliseconds. `0` disables auto-dismiss |
| `position` | `ToastPosition` | `"bottom-right"` | Toast position |
| `icon` | `React.ReactNode` | `undefined` | Custom icon |
| `action` | `{ label: string; onClick: () => void }` | `undefined` | Action button |
| `onClose` | `() => void` | `undefined` | Callback invoked when the toast closes |

---

## 🎨 Custom Styling

### Isolated CSS

The library uses pure CSS with the `z-toast-*` prefix to avoid conflicts with your application's styles. No Tailwind CSS is required.

### Override Default Styles

You can override the default styles in your own CSS:

```css
/* Override toast item styles */
.z-toast-item {
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

/* Override success toast */
.z-toast-success {
  background-color: #dcfce7;
  border-color: #22c55e;
}
```

### Custom Icons

```tsx
toast.info("Custom icon!", {
  icon: <CustomIcon />,
});
```

---

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

---

## 🌟 Best Practices

### Next.js App Router Setup

#### 1. Create a Client Wrapper

```tsx
// app/components/ClientWrapper.tsx

'use client';

import { ToastProvider } from "@zyther/react-toastify";
import "@zyther/react-toastify/styles";

export function ClientWrapper({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}
```

#### 2. Use It in Your Layout

```tsx
// app/layout.tsx

import { ClientWrapper } from "@/components/ClientWrapper";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
```

#### 3. Use the Hook in Client Components

```tsx
// app/page.tsx

'use client';

import { useToast } from "@zyther/react-toastify";

export default function Page() {
  const toast = useToast();

  return (
    <button onClick={() => toast.success("Hello!")}>
      Click me
    </button>
  );
}
```

### Toast IDs

Store toast IDs when you need to update or dismiss a specific toast later:

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

---

## 🛠️ Troubleshooting

### `"You're importing a module that depends on useEffect" Error`

**Solution:** Create a Client Wrapper component as shown in the Quick Start section. Never import `ToastProvider` directly in a Server Component.

```tsx
// ❌ Wrong - Direct import in Server Component
// app/layout.tsx

import { ToastProvider } from "@zyther/react-toastify";

// ✅ Correct - Use Client Wrapper
// app/components/ClientWrapper.tsx

'use client';

import { ToastProvider } from "@zyther/react-toastify";
```

### Styles Not Working

**Solution:** Import the styles once in your Client Wrapper:

```tsx
import "@zyther/react-toastify/styles";
```

### `useToast` Not Working

**Solution:** Add the `"use client"` directive to your component:

```tsx
"use client";

import { useToast } from "@zyther/react-toastify";
```

---

## 🚀 Performance

- **Minimal Bundle** — Approximately 6 KB gzipped
- **Optimized Renders** — Uses Zustand for efficient state management
- **Memoized Components** — Toast items are memoized for improved performance
- **Lazy Rendering** — Only renders toast content when needed
- **No Dependencies** — Only Zustand, no other external libraries

---

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

---

## 📚 Changelog

See [`CHANGELOG.md`](CHANGELOG.md) for the version history.

---

## 🐛 Bug Reports

Found a bug or unexpected behavior?

Please report it through GitHub Issues with:

- A clear description of the problem
- Steps to reproduce it
- Your React and Next.js versions
- Your browser and operating system
- Any relevant error messages or screenshots

---

## 📝 License

MIT © **zytherdev**