# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Next.js dev server on port 3001
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Start Next.js production server on port 4173
- `npm run i18n:check` - Verify translation keys (usage + duplicates)

## Project Architecture

This is a React/TypeScript web application for Mosaic Multicultural Connections, a community organization providing services to multicultural communities.

### Tech Stack
- **Frontend Framework**: Next.js 15 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS with custom color scheme and animations
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge for conditional styling

### Application Structure

**Main App Flow**:
- App Router pages live in `src/app/`
- Page composition lives in `src/screens/`
- Shared UI in `src/components/`

**Theme System**:
- Custom theme context (`ThemeContext.tsx`) with light/dark mode support
- Theme persisted to localStorage, defaults to dark mode
- Theme toggle component integrated in header
- CSS class-based theme switching using Tailwind's dark mode

**Routing Architecture**:
- Main pages: Home, About, Services, Locations, Get Involved, Resources, Stories, Contact
- Nested service pages under `/services/`: settlement-support, aged-care, family-support, community-engagement
- Header component handles navigation with dropdown for services

**Component Organization**:
- `app/` - App Router routes
- `screens/` - Full page compositions
- `components/` - Reusable UI components (Header, Footer, Hero, ServiceCards, etc.)
- `components/ui/` - Low-level UI components (theme-toggle, features, testimonials)

**Styling System**:
- Custom Tailwind config with Mosaic MC corporate brand colors:
  - **Primary Colors:**
    - Ocean: #28367f (Deep blue, primary brand color)
    - Sky: #60c7cc (Light blue-green, accent color)  
    - Sand: #f3ede7 (Warm beige, background/neutral)
  - **Secondary Colors:**
    - Sun: #fcb73d (Golden yellow, highlighting)
    - Earth: #f37a60 (Coral orange, warm accent)
    - Leaf: #b4d785 (Fresh green, success/growth)
- Extensive custom animations and keyframes for enhanced UX
- Dark mode support with custom dark color palette
- Responsive design with mobile-first approach

**Key Features**:
- Responsive navigation with mobile menu and service dropdown
- Smooth scrolling and scroll-based header effects
- Theme persistence and toggle functionality
- Corporate branding with logo that changes based on theme
- Animated UI elements using custom Tailwind animations

## Localization (Google Translate First)

- We do not maintain multi-language translation files.
- English copy lives in `src/locales/en/translation.json` and is accessed via the `t()` shim.
- Google Translate handles non-English languages at runtime.
- Run `npm run i18n:check` before shipping UI copy changes.
- Do not introduce new translation systems or language files unless explicitly requested.
