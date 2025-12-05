# CreativeGroup Holding Website

## Overview
This project is a modern React + Vite frontend application for CreativeGroup, a technology holding company. Its main purpose is to serve as a multi-page corporate website featuring an AI-powered chat widget and a robust authentication system (CreativeID) supporting username/password and Passkey (WebAuthn) logins. All content is in Russian.

## User Preferences
I prefer detailed explanations. Ask before making major changes.

## System Architecture

### Project Structure
```
/                   # Root - Frontend (React + Vite)
├── public/         # Static assets (sitemap.xml, robots.txt, favicon.svg)
├── server/         # Backend (Express.js)
└── src/            # Frontend source code
```

### UI/UX Decisions
The website is built with React 19 and TypeScript, styled using TailwindCSS v4 for a modern and responsive design. Animations are handled by Framer Motion, and smooth scrolling is implemented with Lenis.

### Technical Implementations
- **Frontend**: React 19, TypeScript, Vite 6, TailwindCSS v4 (via @tailwindcss/vite + @tailwindcss/postcss), Framer Motion, Recharts, Zustand for state management, @dnd-kit for drag & drop, TipTap for rich text editing, React Hook Form + Zod for forms.
- **Backend**: Express.js with TypeScript (port 3001).
- **AI Integration**: Google's Gemini API is used for the AI-powered chat widget.
- **Authentication**: CreativeID system with `bcryptjs` for password hashing, `jsonwebtoken` for session management, and `@simplewebauthn/server` for Passkey (WebAuthn) support.

### SEO Configuration
- Meta tags for Russian language with Open Graph and Twitter cards
- JSON-LD structured data for organization
- Sitemap.xml with all pages
- Robots.txt for crawlers
- Favicon.svg

### Workflows
1. **Frontend** - `npm run dev` - Vite dev server on port 5000
2. **Backend** - `npm run server` - Express server on port 3001

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Backend JWT secret

### Database
- **PostgreSQL** database (Neon)
- Tables managed by backend: `users`, `passkeys`, `sessions`, `passkey_challenges`

### Production Deployment
- Static deployment configured
- Build command: `npm run build`
- Public directory: `dist`
- Vite optimized with terser minification and code splitting

## External Dependencies
- **Database**: PostgreSQL (Neon)
- **AI Service**: Google Gemini API (`@google/genai`)
- **Authentication Libraries**: `bcryptjs`, `jsonwebtoken`, `@simplewebauthn/server`
- **Frontend Libraries**: TailwindCSS v4, Framer Motion, Recharts, Lenis, `@dnd-kit/core`, TipTap, React Hook Form, Zod
