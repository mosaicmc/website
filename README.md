# Corporate Website (Mosaic MC)

This repository hosts the Mosaic Multicultural Connections corporate website built with React, Vite, TypeScript, and Tailwind CSS.

## Environment Variables
- Create a `.env.local` file in the project root.
- Copy from `.env.example` and fill in real values for `EH_ORG_ID` and `EH_ATS_TOKEN`.
- These variables are used only in backend/serverless code under `api/*` and are never bundled into the frontend.

### Production secrets and rotation
- Never commit secrets to the repository. Use your deploy provider’s environment management.
- Deployment is via Vercel (`vercel.json` present). Add secrets in Vercel:
  - In Vercel Dashboard > Project Settings > Environment Variables:
    - Add `STRIPE_SECRET_KEY` for Development, Preview, and Production as needed.
    - Avoid `VITE_` prefixes for secrets; access in serverless code via `process.env.STRIPE_SECRET_KEY`.
- For local production-like testing, use `.env.production.local` (gitignored). Example entries:
  ```
  STRIPE_SECRET_KEY=<set_via_local_env_not_committed>
  EH_ORG_ID=<id>
  EH_ATS_TOKEN=<token>
  ```
- Rotation playbook:
  - Generate a new secret in the provider (e.g., Stripe).
  - Update Vercel env for all scopes (Dev/Preview/Prod). Optionally use Vercel CLI:
    - `npx vercel env add STRIPE_SECRET_KEY production`
    - `npx vercel env add STRIPE_SECRET_KEY preview`
    - `npx vercel env add STRIPE_SECRET_KEY development`
  - Trigger redeploys so new env values propagate to all environments.
  - In GitHub, store a copy as an Actions secret if needed for CI (`Settings > Secrets and variables > Actions`).
  - Decommission old keys after verifying services run with the new key.

### CI integration
- CI runs on GitHub Actions (`.github/workflows/ci.yml`). It does not build with secrets by default.
- If a CI job needs secrets (e.g., serverless contract tests), add them as GitHub Actions secrets and map to env:
  ```
  - name: Use secrets
    env:
      STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY }}
    run: echo "Secrets available to this step"
  ```
- For automated rotation, prefer manual approval via a dedicated workflow using protected branch rules and an approver step, then update Vercel env via CLI before redeploy.

## Tech Stack
- React 18
- Vite 5
- TypeScript
- Tailwind CSS
- React Router
- i18next

## Requirements
- Node.js 20+ recommended (LTS). Install via Homebrew or nodejs.org.
- npm 10+

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# If dev server fails, you can preview the production build
npm run build
npm run preview
```

By default Vite serves on `http://localhost:5173/`. Preview runs on `http://127.0.0.1:4173/` when using `npm run preview`.

## Scripts
- `npm run dev`: Start Vite development server
- `npm run build`: Build production assets into `dist/`
- `npm run preview`: Preview the built site locally
- `npm run lint`: Lint source code

## Project Structure
```
src/
  components/     # UI components
  pages/          # Routed pages
  contexts/       # React context providers
  i18n/           # Translations and config
  lib/            # Utilities/helpers
  main.tsx        # App entry
  App.tsx         # Router + shell
```

## Environment
No secrets are required for local runs. If you add environment variables, place them in a `.env.local` file and ensure `.env`, `.env.local` and `.env.*.local` are ignored by git (see `.gitignore`).

## Node Version
The project was tested on Node 20+. To reduce dev environment drift, the repo includes an `.nvmrc` file. Use `nvm use` to switch.

## Contributing
1. Create a branch from `main`
2. Make changes and run `npm run lint`
3. Open a PR to `main`

## Alpha Release Process
- Versioning: bump `package.json` to an `-alpha` prerelease (e.g., `0.1.0-alpha.0`).
- Pull Request: title “everything working” and include code changes, documentation updates, and CHANGELOG entries.
- Tagging: after approval and merge, create a Git tag `alpha` pointing at the merge commit.
- Release: publish a GitHub Release named “alpha” from the `alpha` tag.
- Staging Deploy: update pipelines to deploy the merged commit to staging (e.g., Vercel Preview or a dedicated staging URL).
- Smoke Tests: run automated smoke/UI tests against staging. Configure `STAGING_URL` as a secret in GitHub Actions and set `BASE_URL` accordingly.
- Production Gate: proceed to production only after staging smoke tests pass and stakeholder sign-off is complete.

### Pipelines
- CI (`.github/workflows/ci.yml`) builds, lints, runs unit and UI tests, and validates the preview server.
- Alpha workflow (`.github/workflows/release-alpha.yml`) scaffolds release/tag creation and optional staging smoke tests using `STAGING_URL`. Add provider tokens (e.g., `VERCEL_TOKEN`) as Actions secrets to enable automatic deploys.

## License
Internal project for Mosaic MC.
