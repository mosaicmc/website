# Secure Secrets Management

## Storage
- Use environment variables via your deploy provider (Vercel) for `Production`, `Preview`, and `Development`.
- Do not hardcode keys in source. Avoid `VITE_` prefixes for secrets; access with `process.env.*` in server-side code only.
- Local dev: use `.env.local` and `.env.production.local` (both are gitignored).

## Validation
- Runtime validation lives in `api/_env.ts`:
  - Validates `EH_ATS_TOKEN` structure and presence.
  - Warns if `STRIPE_SECRET_KEY` format is invalid.
  - Throws on missing required variables.

## Scanning
- Automated scanning via `npm run scan:secrets`:
  - Detects patterns like `sk_live_*` and common hardcoded tokens.
  - Runs in CI (`.github/workflows/ci.yml`) and fails on detection.

## Rotation
- Generate a new key in provider (e.g., Stripe).
- Update Vercel env for all scopes:
  - `npx vercel env add STRIPE_SECRET_KEY production`
  - `npx vercel env add STRIPE_SECRET_KEY preview`
  - `npx vercel env add STRIPE_SECRET_KEY development`
- Redeploy and verify functionality.
- Revoke the old key once validation passes.
- If CI requires the key, update GitHub Actions secrets (`Settings > Secrets and variables > Actions`).

## Usage
- Serverless endpoints (`api/*`) retrieve env via `getValidatedEnv()`.
- Frontend code must never read secrets; keep secrets in serverless-only modules.

## Incident Response
- If exposure is detected:
  - Invalidate the exposed key immediately.
  - Rotate keys following the steps above.
  - Audit commits and open PRs for residual references.
  - Run `npm run scan:secrets` locally to confirm no additional leaks.

