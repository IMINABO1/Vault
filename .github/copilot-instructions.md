# Vault - Copilot Instructions

## What is Vault?

Vault is a verified digital document wallet with "Traffic Stop Mode" designed to help Black civilians and immigrants safely present identification during police encounters without the life-threatening risk of reaching into pockets or gloveboxes.

Key insight: The most dangerous moment in a traffic stop is dynamic movement. By moving ID presentation to the phone (already visible), we convert a "dynamic, hidden" action into a "static, visible" one.

## Core Features

1. **Verified Secure Wallet** - Store and verify IDs (Driver's License, Passport, I-20)
2. **Lockdown Mode** - Locks screen to only show ID, preventing digital searches (4th Amendment protection)
3. **Safety Trigger** - Sends location beacon to emergency contacts

## Project Structure

Turborepo monorepo with npm workspaces:
- `apps/frontend` — React 19 + Vite + Tailwind CSS (port 3000)
- `apps/backend` — Express + Firebase Admin + PostgreSQL + Gemini AI (port 3001)
- `packages/shared` — Shared utilities via `@vault/shared`

## Code Guidelines

Use ES Modules (`import`/`export`) in all JavaScript files.

Frontend uses `@/` import alias resolving to `apps/frontend/src/`. Style with Tailwind CSS utility classes. Use functional React components with hooks.

Backend uses Express middleware patterns. Authentication via Firebase Admin SDK token verification. Database queries use PostgreSQL connection pool with parameterized queries.

## API Communication

Frontend calls `/api/*` which Vite proxies to backend on port 3001.

## Environment Variables

Frontend vars must be prefixed with `VITE_`. Backend uses standard env vars via dotenv. See `.env.example` files in each app.

## User Experience Priorities

- Latency: "Tap to ID Displayed" must be < 2 seconds
- Safety: Lockdown mode must prevent app navigation/exit
- Accessibility: High-contrast, easy-to-read document display
