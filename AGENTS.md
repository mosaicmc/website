# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, with `app/` for App Router routes, `screens/` for page composition, `components/` for shared UI, `locales/` for English copy, and `lib/` utilities. Static assets sit in `public/` while editorial content and briefs live under `docs/` and `QA/`. Automation and ingestion tooling is grouped in `scripts/`. Test fixtures and end-to-end specs reside in `tests/` and `test-results/`.

## Build, Test, and Development Commands
Use `npm install` once to hydrate dependencies (Node 20+). `npm run dev` starts the Next.js dev server on `http://localhost:3001`. `npm run build` creates the production build, and `npm run preview` runs it locally (port 4173). Run `npm run lint` before pushing to catch ESLint and TypeScript issues. `npm run test` executes the Vitest unit suite, while `npm run test:ui` runs Playwright E2E checks. Data helpers include `npm run scrape:reviews` (or the `:xpath`/`:custom` variants) and `npm run ingest:testimonials:md` for converting curated Markdown into JSON.

## Coding Style & Naming Conventions
This codebase follows ESLint with the TypeScript + React config defined in `eslint.config.js`; fix violations or run `npm run lint -- --fix`. Prefer functional React components with PascalCase filenames (`HeroBanner.tsx`), hooks in camelCase (`useOrgChart`). Keep Tailwind classes ordered by layout → color for readability, and colocate component styles via utility classes rather than custom CSS. Use TypeScript types/interfaces in `types.d.ts` or near usage, and place shared helper functions in `src/lib/`.

## Localization Guardrails
- English copy lives in `src/locales/en/translation.json` and is accessed via the `t()` shim.
- Google Translate handles non-English languages at runtime.
- Run `npm run i18n:check` before shipping UI copy changes.
- Do not introduce new translation systems or language files unless explicitly requested.

## Testing Guidelines
Vitest covers render logic and utilities; colocate spec files as `<Component>.test.tsx` or under `tests/unit/`. Playwright specs belong in `tests/e2e/` and should rely on `npm run preview` in CI. Maintain existing coverage by asserting critical copy, navigation, and language-switch flows. Capture new fixtures in `test-results/` but avoid committing large videos unless debugging a failure.

## Commit & Pull Request Guidelines
Recent history mixes scoped prefixes (`feat:`, `fix:`, `style:`) with descriptive summaries—follow that convention and keep subject lines under ~70 chars. One feature or fix per commit. When opening a PR, describe the motivation, list testing steps (lint, unit, UI), and link Mosaic ticket IDs. Include screenshots or GIFs for visual changes and reference any updated scripts or translations so reviewers can verify localized content.

## Security & Configuration Tips
No secrets are required locally; keep any `.env` additions in `.env.local` and never commit them. Scripts that touch Google data (scrapers, verifiers) should be run with anonymized accounts. Node and npm versions are pinned via `package.json` engines and `.nvmrc`; run `nvm use` before installing to avoid mismatched lockfiles.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
