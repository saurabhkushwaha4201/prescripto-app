# Prescripto — Frontend (React + Vite + TailwindCSS)

> Modular, production-minded frontend for a doctor appointment system.

---

## Table of contents

1. [Project overview](#project-overview)
2. [Key features](#key-features)
3. [Tech stack & versions](#tech-stack--versions)
4. [Repository structure](#repository-structure)
5. [Quick start — copy & paste](#quick-start--copy--paste)
6. [Environment variables](#environment-variables)
7. [Development workflow](#development-workflow)
8. [Backend integration guide (API contract)](#backend-integration-guide-api-contract)
9. [Production build & deployment](#production-build--deployment)
10. [Testing, linting & CI recommendations](#testing-linting--ci-recommendations)
11. [Roadmap / future improvements](#roadmap--future-improvements)
12. [Contributing](#contributing)
13. [Author & license](#author--license)

---

## Project overview

**Prescripto** is the frontend module for a doctor appointment system. It is implemented with React (Vite + JSX), TailwindCSS and the Context API for light global state. The codebase is organized for maintainability and fast iteration while being ready to integrate with a REST or GraphQL backend.

This README is written to be copy-paste ready for a professional repository — it contains run scripts, example env variables, API contract notes, and developer workflow recommendations.

---

## Key features

* Responsive, accessible patient UI
* Browse doctors by specialty and search/filter doctors
* Book and manage appointments
* User profile (view / edit) and simple auth-ready flows
* TailwindCSS component-driven styling
* Context API for auth and application state

---

## Tech stack & versions

* Node >= 18
* npm (or yarn / pnpm) — examples use `npm`
* React 18+
* Vite 5+
* TailwindCSS 4+

> Pin exact versions in `package.json` for production projects.

---

## Repository structure

```
frontend/
├── public/                 # static assets served by Vite
├── src/
│   ├── assets/             # logos, images, icons
│   ├── components/         # reusable UI components
│   ├── context/            # React Context providers (Auth, AppState)
│   ├── hooks/              # custom hooks (useAuth, useApi)
│   ├── pages/              # route pages (Home, Doctors, Appointment...)
│   ├── services/           # API client, API wrappers
│   ├── styles/             # global styles, tailwind config usage
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── tailwind.config.cjs
├── postcss.config.cjs
└── vite.config.js
```

---

## Quick start — copy & paste

### 1. Clone and install

```bash
# clone repository (example)
git clone https://github.com/USERNAME/prescripto-frontend.git
cd prescripto-frontend

# install deps
npm ci
# OR
# npm install
```

### 2. Development server

```bash
# start development server (hot reload)
npm run dev

# default: http://localhost:5173 (Vite prints the exact URL)
```

### 3. Build for production

```bash
npm run build
# preview production build locally
npm run preview
```

### Example `package.json` scripts (recommended)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 5174",
    "lint": "eslint './src/**/*.{js,jsx,ts,tsx}' --fix",
    "format": "prettier --write './src/**/*.{js,jsx,ts,tsx,css,md}'",
    "typecheck": "tsc --noEmit"
  }
}
```

---

## Environment variables

Create a `.env.local` (ignored by git) to hold runtime configuration. Example variables:

```
VITE_API_BASE_URL=https://api.example.com
VITE_AUTH_REDIRECT_URL=http://localhost:5173/auth/callback
VITE_MAPS_API_KEY=your_maps_key_if_used
```

**Notes:**

* Vite requires `VITE_` prefix for env vars used in the client.
* Never commit secrets or long-lived tokens to the repository.

---

## Development workflow

### Recommended local workflow

1. Create a feature branch: `git checkout -b feature/<short-description>`
2. Implement incremental commits with atomic changes
3. Run lint and tests before opening a PR
4. Use a PR template describing behavior, screenshots, and migrations (if any)

### Component and state guidelines

* Keep components small and focused; prefer composition over large monolith components
* UI components that do not depend on context should be pure and testable
* Keep API calls in `services/` and call them via hooks (e.g., `useDoctors`, `useAppointments`)

---

## Backend integration guide (API contract)

Below are suggested endpoints and request/response shapes. Confirm exact contract with backend team; adapt to GraphQL if required.

**Base URL**: `{{ VITE_API_BASE_URL }}`

### Authentication

* `POST /auth/login`

  * Request body: `{ "email": string, "password": string }`
  * Response: `{ "token": string, "user": { id, name, email, role } }`

* `POST /auth/register`

  * Request body: `{ name, email, password }`
  * Response: `{ user, token }`

### Doctors

* `GET /doctors?specialty={slug}&q={query}&page={n}`

  * Response: `{ data: Doctor[], meta: { page, perPage, total } }`

* `GET /doctors/{id}`

  * Response: `Doctor` object with `availability` slots

### Appointments

* `POST /appointments`

  * Request body: `{ doctorId, patientId, startAt, endAt, reason }`
  * Response: created appointment object

* `GET /appointments?userId={id}`

  * Response: list of appointments

### Profiles

* `GET /users/me`

  * Response: current user object

* `PUT /users/me`

  * Request body: partial user updates

**Client-side considerations**

* Send JWT via `Authorization: Bearer <token>` header
* Implement optimistic updates for appointment booking UX where appropriate
* Handle 401/403 centrally in an API client to trigger re-auth flows

---

## Production build & deployment

### Static hosting (recommended)

* Build: `npm run build` → `dist/`
* Host on Netlify, Vercel, Cloudflare Pages, or S3 + CloudFront
* Configure redirects/rewrite rules so client-side routing works (single-page app fallback to `index.html`)

### Containerized workflow

* Build static assets and serve via a minimal server (nginx / node static)
* Keep build reproducible by using `node:18-alpine` base and running `npm ci && npm run build`

---

## Testing, linting & CI recommendations

* Add unit tests with React Testing Library and Jest
* Add E2E tests with Playwright or Cypress for booking flow
* Run `lint`, `format`, and `test` in CI (GitHub Actions recommended)

Example GitHub Actions steps:

* `checkout`, `setup-node`, `install`, `run lint`, `run test`, `build`.

---

## Roadmap / future improvements

* Full Admin and Doctor dashboards
* Role-based access control (RBAC)
* Payment gateway integration (Razorpay / Stripe)
* Webhooks for appointment events (reminders, cancellations)
* Internationalization (i18n) and accessibility audit
* Replace Context API with React Query + Zustand (or Redux Toolkit) for larger scale

---

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repo and create a feature branch
2. Keep changes small and focused
3. Provide unit tests for new logic
4. Run `npm run lint` and `npm run format` before opening a PR
5. Use clear commit messages: `type(scope): short summary` e.g., `feat(appointments): add optimistic booking`.

---

## Author & license

**Author:** Your Name — Solo Developer

This repository is intended as a learning / portfolio project. Choose an appropriate license (e.g., MIT) and add a `LICENSE` file.

---

If you want, I can also:

* Generate a `PR` template and `ISSUE_TEMPLATE`
* Provide initial ESLint, Prettier, and GitHub Actions files
* Convert this README to another language (Hindi) or a shorter README for a GitHub repo homepage
