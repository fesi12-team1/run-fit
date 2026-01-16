# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RunFit - 러닝 매칭 플랫폼. 지역/날짜/페이스 기반으로 러닝 모임(세션)과 크루를 찾는 서비스.

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, Shadcn UI (Radix UI)
- **State**: Zustand (UI state), Tanstack Query 5 (server state)
- **Forms**: React Hook Form + Zod
- **Testing**: Jest, React Testing Library, Playwright, MSW
- **Package Manager**: pnpm

## Commands

```bash
pnpm dev              # Dev server (localhost:3000)
pnpm build            # Production build
pnpm lint             # ESLint
pnpm test             # Jest tests
pnpm e2e              # Playwright E2E tests
pnpm e2e:ui           # Playwright UI mode
pnpm storybook        # Storybook (port 6006)
```

## Architecture

### Data Flow
- **API Layer**: `src/api/fetch/` → direct API calls
- **Query Layer**: `src/api/queries/` → React Query options, `src/api/mutations/` → mutations
- **Server State**: React Query with placeholder data (prevents UI flicker on filter changes)
- **Client State**: stores in `src/store/`

### Auth & Middleware
- JWT-based auth (refreshToken in cookies)
- Route protection via `src/proxy.ts`:
  - Protected: `/my/*`, `/crews/[id]/create-session`, `/sessions/likes`
  - Auth-only (redirect if logged in): `/signin`, `/signup`

### Component Organization
- `src/components/ui/` - Atomic UI (domain-agnostic)
- `src/components/composite/` - Composed UI components
- `src/components/{domain}/` - Domain components (crew, session, my, user)
- `src/components/layout/` - Layout components

### Other Directories
- `src/assets/icons/` - SVG icons (imported as modules)
- `src/contexts/` - React Context providers
- `public/images/` - Static images (direct URL access)
- `public/fonts/` - Font files

### External APIs
- Kakao Maps API - location display
- Daum Postcode API - Korean address search
- AWS S3 - image storage

## Code Conventions

### TypeScript
- Use `interface` (not `type`)
- Props: `interface ComponentNameProps {}`

### Components
```tsx
// Function declaration (not arrow functions)
export default function Button({ children }: ButtonProps) {
  return <button>{children}</button>
}

// Compound components - attach to default export
export default function Modal() {}
function ModalHeader() {}
Modal.Header = ModalHeader
```

### Imports
- Path alias (`@/`) for files outside current directory
- Relative paths for same/child directories
- Order: third-party → builtins → aliases → relative

### Naming
| Target | Rule | Example |
|--------|------|---------|
| Folders | kebab-case | `item-list` |
| Variables/functions | camelCase | `itemList`, `getUserData` |
| Constants | SCREAMING_SNAKE_CASE | `VERCEL_URL` |
| Components | PascalCase | `UserProfile` |
| Page components | PascalCase + Page | `LoginPage` |
| Custom hooks | camelCase | `useDebounce.ts` |
| Static files | kebab-case | `icon-heart.png` |

### Files
- `Button.tsx` (not `Button/index.tsx`)

### Style
```tsx
// Single-line if - no braces
if (condition) doSomething();
```

### Custom Hooks
- JSDoc comments required

## Git Conventions

See `.agents/skills/` for `commit-convention` and `git-workflow` skills.

## Environment Variables

```
API_URL=                              # Backend API
NEXT_PUBLIC_APP_URL=                  # App URL
NEXT_PUBLIC_KAKAO_JS_KEY=             # Kakao Map API
NEXT_PUBLIC_KAKAO_MAP_URL=            # Kakao Map library
NEXT_PUBLIC_DAUM_POSTCODE_URL=        # Daum Postcode library
NEXT_PUBLIC_USE_MSW=false             # Enable MSW mocking
```
