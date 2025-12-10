# Changelog

## 2025-11-13

### Added
- Implemented Playwright UI test suite `tests/ui/home-about.spec.ts`:
  - Validates Home Google Reviews section rendering and interactions (load more).
  - Visual snapshots for Home Google Reviews: mobile, tablet, desktop.
  - Validates About Values grid (4 cards) and Leadership grid (3 cards with Avatars).
  - Visual snapshots for About Leadership: mobile, tablet, desktop.
- Scoped Playwright config to UI specs only (`playwright.config.ts`):
  - `testDir: './tests/ui'`
  - `testMatch: /.*\\.spec\\.ts/`
  - Ensures Vitest unit tests do not run under Playwright.
- QA report added at `QA/QA-Report.md` with results and screenshot locations.

### Changed
- Confirmed Home page integrates `GoogleReviews` with accessible selectors, and About page redesigned using ShadCN `Card` and `Avatar` components for Values and Leadership.

### Notes
- Breakpoint screenshots generated under `tests/ui/home-about.spec.ts-snapshots/` for all three browsers.
- Preview servers available at `http://localhost:4173/` and `http://localhost:4174/` during validation.
# Changelog

## 2025-12-10

### Changed
- Breadcrumbs: color now inherits from hero via `--hero-foreground`; added optional translucent background (`bg-background/40 dark:bg-background/20 backdrop-blur-sm`) to improve readability while preserving layout and accessibility.
- Service pages: hero sections extend upward to visually cover breadcrumb area without navbar overlap (`-mt-6 pt-6 md:-mt-8 md:pt-8`).
- Dark theme: added navigation theme variables `--nav-header-bg` and `--nav-header-foreground`; applied `bg-nav-header text-nav-header` to NavBar and Breadcrumbs for consistent blue header background and readable text across pages.

### Removed
- Settlement Support crisis banner (“Need Settlement Support Now?”) removed across service pages; no backend endpoints were involved.

### Notes
- Accessibility: maintained WCAG 2.1 AA contrast; focus-visible rings retained.
- Cross-browser: verified in Chrome, Firefox, Safari, Edge.
- ESLint: added test override to relax `no-explicit-any` in `tests/`.
