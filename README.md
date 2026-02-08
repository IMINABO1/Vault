# Vault

### A Verified Digital Document Wallet with Traffic Stop Mode

**Code2040 Tech For Resistance Hackathon 2026 | Track: Respond**

---

## The Problem

In the United States, a routine traffic stop can become fatal in seconds. The most dangerous moment? **Reaching for your ID.** When a driver reaches into a pocket, glovebox, or bag, that movement — hidden from the officer's view — can be misinterpreted as reaching for a weapon. For Black civilians and immigrants, implicit bias makes this moment disproportionately deadly.

**Philando Castile** was shot reaching for his wallet. **Daunte Wright** was killed during a traffic stop. These aren't edge cases — they represent a systemic pattern where ordinary compliance becomes life-threatening.

## The Solution

Vault eliminates the reach entirely.

By moving ID presentation to a phone — already visible on the dashboard or in hand — Vault converts a **"dynamic, hidden"** action into a **"static, visible"** one. No reaching. No sudden movements. Just a tap, and your verified ID is on screen.

### How It Works

```
Upload Doc → AI Verifies via OCR → Stored in Vault
                                        ↓
Traffic Stop → Tap Lockdown → Screen Locks → ID Displayed → PIN to Exit
                                        ↓
                         Emergency contacts receive location beacon
```

## Core Features

### 1. Verified Digital Wallet
Upload your documents and Vault's AI (Google Gemini) automatically extracts and verifies the information — name, document number, expiry, issuing country, and more. No manual data entry. Supports:

- Driver's Licenses
- Passports
- Immigration Documents (I-20, Visas)
- Vehicle Registration
- National IDs

### 2. Lockdown Mode (4th Amendment Shield)
One tap activates **Lockdown Mode**: the screen locks to display only your ID cards. The officer can see your documents, but **cannot navigate your phone, open apps, or access personal data**. This is your 4th Amendment right against unreasonable search — enforced by design.

- Full-screen, high-contrast display for officer readability
- Swipeable carousel for multiple documents
- Blocks back button, escape key, and all navigation
- **PIN-locked exit** — only you can unlock it, proving ownership

### 3. Safety Trigger
When Lockdown activates, Vault silently sends a **location beacon** to your emergency contacts. If something goes wrong, your people already know where you are.

## Why Not Just Use a Photo?

| | Photo on Phone | Apple/Google Wallet | **Vault** |
|---|---|---|---|
| Verified by AI | No | Yes | **Yes** |
| Supports immigration docs (I-20, visas) | No | No | **Yes** |
| Prevents phone search | No | No | **Yes (Lockdown)** |
| Emergency beacon | No | No | **Yes** |
| Works for all states | Yes | Limited | **Yes** |

**Apple and Google Wallet only support Driver's Licenses in select states.** Vault fills the critical gap for the most vulnerable: immigrants carrying I-20s, foreign passports, and work visas — documents that, if unavailable, can lead to 48-hour detention or deportation.

## Impact

- **Safety**: Eliminates the "reaching paradox" — the most dangerous moment in a traffic stop
- **Legal Protection**: Lockdown Mode prevents unconstitutional digital searches
- **Accessibility**: Immigration documents always available, preventing wrongful detention
- **Equity**: Designed specifically for the communities most affected by police violence

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Monorepo** | Turborepo + npm workspaces |
| **Frontend** | React 19, Vite 6, Tailwind CSS, Framer Motion, Radix UI |
| **Backend** | Node.js, Express |
| **AI/OCR** | Google Gemini 2.5 Flash |
| **Fraud Detection** | Python, PyTorch |
| **Auth** | Firebase Authentication |
| **Database** | PostgreSQL |

## Project Structure

```
Vault/
├── apps/
│   ├── frontend/          # React + Vite (port 3000)
│   │   └── src/
│   │       ├── pages/     # Landing, Login, Signup, DocumentWallet, Documents, Verification, Settings
│   │       └── components/# DocumentCard, CardCarousel, LockdownScreen, SafetyPanel, NavigationSidebar
│   ├── backend/           # Express API (port 3001)
│   │   └── src/
│   │       ├── routes/    # documents, privacy, safety, emergency contacts
│   │       ├── config/    # Gemini AI, Firebase, PostgreSQL
│   │       └── middleware/ # Auth (Firebase)
│   └── ml/                # Fraud detection models (Python + PyTorch)
│       ├── models/        # Trained model weights
│       └── src/           # Training & inference scripts
└── packages/
    └── shared/            # Shared utilities (@vault/shared)
```

## Getting Started

### Prerequisites

- Node.js v20.0.0+
- A [Google Gemini API key](https://ai.google.dev/) (for document OCR)

### Installation

```bash
# Clone the repo
git clone https://github.com/IMINABO1/Vault.git
cd Vault

# Install dependencies
npm install

# Set up environment variables
cp apps/backend/.env.example apps/backend/.env
# Add your GEMINI_API_KEY to apps/backend/.env

# Start development servers
npm run dev
```

Frontend runs on `http://localhost:3000` | Backend on `http://localhost:3001`

### Commands

```bash
npm run dev            # Start all apps
npm run dev:frontend   # Frontend only
npm run dev:backend    # Backend only
npm run build          # Production build
npm run lint           # Lint all apps
```

## User Flow

1. **Sign up / Log in** via Firebase Authentication
2. **Upload documents** — Select type, snap a photo, AI extracts & verifies
3. **View your vault** — Swipe through verified document cards
4. **Set your PIN** — 4-digit code to exit lockdown mode
5. **Traffic stop?** — Tap "Activate Lockdown" in the Safety Panel
6. **Phone locks** — Only your IDs are visible, high-contrast for readability
7. **Emergency contacts notified** — Location beacon sent automatically
8. **Enter PIN to exit** — Only you can unlock your phone

## Design Decisions

- **< 2 second latency** from tap to ID display — speed saves lives
- **Document cards use 1.586:1 aspect ratio** (portrait) matching real ID proportions
- **Dark mode support** throughout the app
- **High-contrast lockdown screen** (black background, white text) for outdoor/nighttime readability
- **Cards flip to reveal key fields** — officer can see extracted data without touching the phone

---

*Built with urgency. Because reaching for your wallet shouldn't be a death sentence.*
