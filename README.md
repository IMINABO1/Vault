
# Vault

Vault is a secure digital document wallet that allows users to store, manage, and access their important documents from anywhere. It also provides safety features like emergency contacts and location sharing.

## Features

- **Document Management:** Upload, view, and manage your important documents like passports, driver's licenses, and more.
- **OCR:** Extract information from your documents for easy access and management.
- **Emergency Contacts:** Add and manage emergency contacts who can be notified in case of an emergency.
- **Location Sharing:** Share your location with your emergency contacts.
- **Privacy Control:** Control who can access your information.
- **Secure:** Your data is secured with Firebase authentication and authorization.

## Technologies Used

- **Frontend:**
  - React
  - Vite
  - React Router
  - Tailwind CSS
  - Radix UI
- **Backend:**
  - Node.js
  - Express
  - Firebase (Authentication, Storage)
  - PostgreSQL (optional, for user data)
  - Google Gemini API (for OCR)
- **Shared:**
  - A shared package for constants and utility functions.
- **Monorepo:**
  - Turborepo

## Getting Started

### Prerequisites

- Node.js (v20.0.0 or higher)
- npm (v10.8.2 or higher)
- Firebase Account
- Google Cloud Platform Account

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/vault.git
   cd vault
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - **Backend:** Create a `.env` file in `apps/backend` by copying `.env.example`.
   - **Frontend:** Create a `.env` file in `apps/frontend` by copying `.env.example`.

   You will need to add your Firebase and Google Cloud credentials to these files.

### Running the application

- **Development:**

  ```bash
  npm run dev
  ```

  This will start both the frontend and backend servers in development mode.

- **Frontend only:**

  ```bash
  npm run dev:frontend
  ```

- **Backend only:**

  ```bash
  npm run dev:backend
  ```

- **Production Build:**

  ```bash
  npm run build
  ```

## Project Structure

The project is a monorepo using Turborepo.

- `apps/frontend`: The React frontend application.
- `apps/backend`: The Node.js backend application.
- `packages/shared`: A shared package with constants and utility functions.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.
