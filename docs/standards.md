# Frontend Standards and Best Practices

## UI and Responsiveness
- Use `doc-container`, `section-spacing`, and `subsection-break` for widescreen layout.
- Build responsive grids with Tailwind breakpoints: `sm`, `lg`, `xl`.
- Maintain accessible focus styles: `focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background`.

## Security and Errors
- Avoid unsafe HTML; sanitize any external content.
- Use `ErrorBoundary` for page-level fallback.
- Initialize monitoring via `initMonitoring`.

## Performance
- Lazy-load routes, avoid heavy client effects, prefer CSS tokens.
- Use Vite optimizations and keep dependencies minimal.

## Accessibility
- Provide `aria` attributes and landmarks; preserve contrast tokens.
- Keep headings and lists semantic; ensure keyboard navigability.

## Testing and CI/CD
- Unit tests with Vitest; UI tests with Playwright.
- CI runs lint, coverage, build, and E2E against preview.

## Logging and Monitoring
- Client errors captured and reported via `src/lib/logger.ts`.

