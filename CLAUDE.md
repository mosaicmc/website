# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server using Vite
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Project Architecture

This is a React/TypeScript web application for Mosaic Multicultural Connections, a community organization providing services to multicultural communities.

### Tech Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with custom color scheme and animations
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge for conditional styling

### Application Structure

**Main App Flow**: 
- `main.tsx` renders the App component wrapped in StrictMode
- `App.tsx` sets up the main application shell with ThemeProvider, Router, Header, main content area with Routes, and Footer
- Uses React Router for client-side routing with nested service pages

**Theme System**:
- Custom theme context (`ThemeContext.tsx`) with light/dark mode support
- Theme persisted to localStorage, defaults to dark mode
- Theme toggle component integrated in header
- CSS class-based theme switching using Tailwind's dark mode

**Routing Architecture**:
- Main pages: Home, About, Services, Locations, Get Involved, Resources, Stories, Contact
- Nested service pages under `/services/`: settlement-support, aged-care, family-support, community-engagement
- Header component handles navigation with dropdown for services
- Automatic scroll-to-top on route changes

**Component Organization**:
- `pages/` - Full page components
- `components/` - Reusable UI components (Header, Footer, Hero, ServiceCards, etc.)
- `components/ui/` - Low-level UI components (theme-toggle, features, testimonials)
- `contexts/` - React contexts for global state

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