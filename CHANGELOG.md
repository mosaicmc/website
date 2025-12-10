# Changelog

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
