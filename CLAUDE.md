# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status: MVP

This is an MVP/hackathon build. We use **dummy auth** (no real authentication) and a **local JSON file** as the database. Firebase, PostgreSQL, and Supabase integrations exist in the code but are **dormant** — do not wire them up or depend on them for now.

## What is Vault?

Vault is a verified digital document wallet with "Traffic Stop Mode" designed to help Black civilians and immigrants safely present identification during police encounters without the life-threatening risk of reaching into pockets or gloveboxes.

**Key insight**: The most dangerous moment in a traffic stop is dynamic movement. By moving ID presentation to the phone (already visible), we convert a "dynamic, hidden" action into a "static, visible" one.

### Core Features
1. **Verified Secure Wallet** - Upload and verify IDs (Driver's License, Passport, I-20) with OCR
2. **Lockdown Mode** - Screen locks to only show ID, preventing digital searches (4th Amendment protection)
3. **Safety Trigger** - Sends location beacon to emergency contacts

### User Flow
```
Upload Doc → OCR Scans → System Verifies → Stored in Vault
Traffic Stop → Tap Button → Phone Locks & Brightens → ID Displayed → PIN to Exit
```

## Project Structure

Turborepo monorepo with npm workspaces. Requires Node.js >=20.0.0.

- **apps/frontend** — React 19 + Vite + Tailwind CSS (port 3000)
- **apps/backend** — Express + Gemini AI (port 3001)
- **packages/shared** — Shared utilities accessible via `@vault/shared`

## Commands

```bash
npm run dev          # Start all apps
npm run dev:frontend # Frontend only
npm run dev:backend  # Backend only
npm run build        # Build all apps
npm run lint         # Lint all apps
```

## Architecture

### API Communication
Frontend calls `/api/*` routes which Vite proxies to the backend (configured in `apps/frontend/vite.config.js`).

### Authentication (MVP)
Dummy auth — `dummyAuth` middleware in `apps/backend/src/middleware/auth.js` injects a hardcoded demo user into `req.user`. No tokens or login required.

### Database (MVP)
Local JSON file at `apps/backend/src/data/db.json`. No PostgreSQL or Supabase needed to run.

### AI Integration
Gemini 2.5 Flash via `apps/backend/src/config/gemini.js`. Use `analyzeDocument()` for OCR or `generateContent()` for general prompts.

### API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/documents/upload` | Upload & verify a document (multipart, field: `document` + `documentType`) |
| POST | `/api/privacy/set-pin` | Set 4-digit lockdown PIN |
| POST | `/api/privacy/exit-lockdown` | Verify PIN to exit lockdown |

## Code Conventions

- ES Modules (`import`/`export`) throughout
- Frontend uses `@/` import alias (resolves to `apps/frontend/src/`)
- Shared package: `import { ... } from '@vault/shared'`
- Tailwind CSS for styling with HSL color variables
- UI components use Radix UI primitives (shadcn/ui style)

## UX Requirements

- Tap to ID display: < 2 seconds latency
- Lockdown mode must prevent ALL app navigation/exit
- High-contrast display for officer readability
- PIN-locked exit to prove ownership

## Environment Variables

Frontend vars must be prefixed with `VITE_`. See `.env.example` files in each app for required variables.
