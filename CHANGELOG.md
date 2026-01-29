# Changelog

## 0.1.0-alpha.0 — Alpha Release

### Added
- Locations page videos: responsive sizing using `aspect-video` and object cover for consistent rendering across breakpoints.
- Hover/focus/touch playback handling for reliability and accessibility on the Locations page.
- Accessibility: descriptive `alt` text for history gallery thumbnails on About page.
- CI pipeline: alpha release workflow scaffolding for tag-based release and smoke checks.

### Changed
- Locations: removed “Visit This Office” buttons to streamline actions, retained “Get Directions” with accessible focus states.
- Updated location video sources to match new filenames in `/public/Media` and posters mapped to webp assets.

### Fixed
- Prevented video edge bleed by switching from fixed height to `aspect-video`.
- Test selectors and assertions updated to reflect responsive classnames and preload behavior (`metadata`).

### Notes
- Version bumped to `0.1.0-alpha.0`. Tag `alpha` will be used for release. See README for release steps and staging verification.

## 2025-12-12

### Removed
- Breadcrumbs UI component and rendering across all routes (`src/App.tsx:60`)
- Breadcrumb JSON-LD generation and injection (`src/components/SEO.tsx:56–76,100`)

### Notes
- Component file kept returning `null` to avoid accidental usage (`src/components/ui/Breadcrumbs.tsx:1`)
- Breadcrumbs redesign will be implemented later; removed now to avoid UI clutter and stale SEO markup

## 2025-12-11

### Changed
- Replaced SETS team profile images on `SettlementSupportPage` with new 128px assets (`webp`) from `src/pages/services/SETS Team 128px` for: Mirja Colding-Moran, Madan Narayanamurthy, Basim Khudeda, Patricia Camilleri, Michael de Laroche Souvestre, Bronwyn Lin, Rose Oku, Mohammad Sami Zakhil.
- Standardized team avatar display size via `avatarSize=128` in `team-05` component usage.

### Removed
- Deleted outdated profile images from `public/images`: `Mirja.png`, `Madan Narayanamurthy.png`, `Basim Khudeda.png`, `Patricia 01.png`, `Rose.png`, `Sami.png`.

### Notes
- Maram Mohamed continues to use `public/images/Maram2.png` pending availability of a corresponding 128px asset in the SETS folder.

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
