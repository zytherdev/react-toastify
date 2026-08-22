
## 📄 CHANGELOG.md

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-08-22

### Added
- 🎉 Initial release
- Support for 5 toast types: success, error, warning, info, loading
- 6 positions: top/bottom + left/center/right
- Dark/light/system theme support
- Progress bar with timer
- Smooth enter/exit animations
- Action buttons on toasts
- TypeScript support with full types
- Zustand state management
- Zero dependencies (except Zustand)
- Next.js App Router compatibility
- Responsive design
- ARIA accessibility support

### Features
- `ToastProvider` component for app-wide configuration
- `useToast` hook with success, error, warning, info, loading methods
- Toast dismissal methods: single and all
- Toast update capability for loading states
- Customizable duration per toast
- Custom icons support
- Auto-dismiss with configurable duration
- Max toast limit to prevent overflow