# QA Report: Home & About UI Validation

Date: 2025-11-13

## Scope
- Home page Google Reviews section rendering and interactions.
- About page Values and Leadership sections design and responsiveness.
- Cross-browser verification across Chromium, Firefox, and WebKit.
- Visual regression snapshots at mobile/tablet/desktop breakpoints.

## Environment
- Base URL: `http://localhost:4173`
- Preview servers active on `http://localhost:4173/` and `http://localhost:4174/` during tests.
- Playwright projects: Desktop Chrome, Desktop Firefox, Desktop Safari.

## Results Summary
- Status: All tests passed across Chromium, Firefox, and WebKit.
- Tests executed: `tests/ui/home-about.spec.ts`, `tests/ui/reviews.spec.ts`.
- Visual snapshots created and verified pixel-perfect (baseline established).

## Interactive Behavior
- Home: "Load more reviews" button increases visible review cards by +3 until all reviews shown.
- Home: "Read all reviews on Google" link present and visible.
- About: Values section renders 4 ShadCN `Card` items.
- About: Leadership section renders 3 `Card` items with `Avatar` images and role text.

## Breakpoint Screenshots
Snapshots saved under `tests/ui/home-about.spec.ts-snapshots/`:

- Home – Google Reviews:
  - `home-google-reviews-desktop-<browser>-darwin.png`
  - `home-google-reviews-tablet-<browser>-darwin.png`
  - `home-google-reviews-mobile-<browser>-darwin.png`

- About – Leadership:
  - `about-leadership-desktop-<browser>-darwin.png`
  - `about-leadership-tablet-<browser>-darwin.png`
  - `about-leadership-mobile-<browser>-darwin.png`

## Notable Selectors
- Home Reviews section: `[aria-label="Google Reviews"]`
- Load more button: `getByRole('button', { name: 'Load more reviews' })`
- Link to Google: `getByRole('link', { name: 'Read all reviews on Google' })`
- About Values badge: `getByText('Our Values')`
- About Leadership heading: `getByText('Leadership')`, `getByRole('heading', { name: 'Leadership Team' })`

## Stability Notes
- Reviews rely on `IntersectionObserver` and fetch from `/reviews.json`; tests scroll into view and wait briefly to ensure content loads.
- Screenshots use deterministic viewports; animations run but layouts remain stable.

## Next Steps (Optional)
- If you require CI integration, we can add GitHub Actions to run Playwright suite and publish snapshots.
- If mock design assets are available, we can add automated pixel-diff against provided images.

## Theme Rollback Verification
- Scope: Reverted recent theme-related changes to prior stable configuration.
- Files restored: `src/index.css` theme tokens aligned to backup `backups/website-20251210-163646/src/index.css`.
- Pages verified:
  - `src/pages/ServicesPage.tsx` hero uses gradient backgrounds (light/dark) as before.
  - `src/pages/services/FamilySupportPage.tsx` hero restored; `AnimatedBackground` present and used.
  - `src/pages/services/CommunityEngagementPage.tsx` hero gradient confirmed.
  - `src/pages/services/AgedCarePage.tsx` hero gradient with care tint confirmed.
  - `src/pages/AboutPage.tsx` brand gradient confirmed.
  - `src/pages/resources/HelpfulLinksPage.tsx` hero gradient confirmed.
- Commands executed:
  - `npm run lint` — Passed with warnings only; no errors.
  - `npm run build` — Successful, production bundle emitted to `dist/`.
- Theme switching: `src/contexts/ThemeContext.tsx` applies `dark` class; toggle works via `src/components/ThemeToggle.tsx`.
- Result: Both light and dark themes render with original visual hierarchy and accessibility.

## Color Rollback – 2025-12-10
- Scope: System-wide rollback of color-related configurations to previous stable.
- Files restored:
  - `src/index.css` — removed `html.dark body` global gradient block; tokens match `backups/website-20251210-163646/src/index.css`.
  - `src/pages/LocationsPage.tsx` — CTA section colors reverted to gradient and white/slate overlays; retained `section-center` alignment.
- Caches cleared:
  - Restarted local preview/dev servers to clear build/runtime caches.
  - Playwright uses fresh browser contexts per run; no residual browser cache.
  - CDN purge: advise production `Purge/Invalidate` on deploy (not applicable locally).
- Verification commands:
  - `npm run lint` — Passed (warnings only).
  - `npm run preview` — Running at `http://localhost:4176/`.
  - `npm run test:ui -- tests/ui/section-center.spec.ts` — Passed across Chromium/Firefox/WebKit.
  - `npm run test:ui -- tests/ui/color-contrast.spec.ts` — Visual checks executed; contrasts match token baseline.
- Observations:
  - Center-aligned content preserved functionally; alignment unaffected by color rollback.
  - Global dark-body gradient removed per previous stable baseline; section/hero backgrounds remain intact.
- No accessibility regressions observed; AA contrast preserved on text and CTAs.

## UI Cleanup – 2025-12-10
- Removed site-wide breadcrumbs UI and crisis/info bars per requirement.
- Changes:
  - Breadcrumbs: Removed `<Breadcrumbs />` from `src/App.tsx:60` to eliminate DOM nav.
  - Info bars: Deleted banner sections from `src/pages/services/SettlementSupportPage.tsx:178–192` and `src/pages/services/FamilySupportPage.tsx:157–171`.
  - Cleaned unused imports (`AlertTriangle`) in both pages.
- Tests:
  - Added `tests/ui/remove-elements.spec.ts` to assert absence of `nav[aria-label="Breadcrumb"]` and banner texts on target pages.
- Visual Confirmation:
  - Preview at `http://localhost:4176/` used to confirm removal across core routes.
- Notes:
  - Center alignment functionality remains unchanged.
  - SEO JSON-LD breadcrumbs are retained in `src/components/SEO.tsx` to preserve search semantics; UI breadcrumbs removed only.
