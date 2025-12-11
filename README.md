# Corporate Website (Mosaic MC)

This repository hosts the Mosaic Multicultural Connections corporate website built with React, Vite, TypeScript, and Tailwind CSS.

## Environment Variables
- Create a `.env.local` file in the project root.
- Copy from `.env.example` and fill in real values for `EH_ORG_ID` and `EH_ATS_TOKEN`.
- These variables are used only in backend/serverless code under `api/*` and are never bundled into the frontend.

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

## License
Internal project for Mosaic MC.
