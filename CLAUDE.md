# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- **apps/backend** — Express + Firebase Admin + PostgreSQL + Gemini AI (port 3001)
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

### Authentication Flow
1. Frontend uses Firebase client SDK for user auth
2. Frontend sends Firebase ID token in `Authorization: Bearer <token>` header
3. Backend `verifyToken` middleware (`apps/backend/src/middleware/auth.js`) validates via Firebase Admin SDK
4. Authenticated user available as `req.user`

### Database
PostgreSQL via connection pool in `apps/backend/src/config/database.js`. Use `pool.query()` with parameterized queries.

### AI Integration
Gemini 1.5 Flash via `apps/backend/src/config/gemini.js`. Use `generateContent()` helper.

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

### Document Card Specifications

- **Aspect Ratio**: Document cards MUST maintain a Height:Width ratio of **1.586:1** (portrait orientation - cards are taller than wide)
- **CSS Implementation**: Use `aspect-ratio: 1.586 / 1` in `.document-card-vibrant` class
- **Responsive Design**: When working on responsiveness, ensure this aspect ratio is preserved across all breakpoints
- **Color Variance**: Cards alternate between pale and solid color variants for visual dynamics

## Environment Variables

Frontend vars must be prefixed with `VITE_`. See `.env.example` files in each app for required variables.
