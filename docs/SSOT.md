# SSOT: Single Source of Truth (Botsmann)

**Created:** 2026-01-23  
**Last modified:** 2026-08-14  
**Last modified summary:** CSP must allow `https://fleetcrown.orangecat.ch` on script-src and connect-src, and the widget token must be present at `next build`.

This document is the authoritative SSOT map for where things live and how to use them. Follow this to avoid duplication and drift.

---

## API Responses & Validation

- Source: `lib/api/responses.ts` (exported via `lib/api/index.ts`)
- Use: `import { jsonSuccess, jsonError, jsonValidationError, HTTP_STATUS } from '@/lib/api'`
- Zod helpers: `validateBody`, `formatZodErrors`, `hasValidationError`, `handleError` in `lib/api/responses.ts`
- Why: Ensures consistent payloads, status codes, and error handling across all routes.

## Auth Helpers (Server)

- Source: `lib/api-utils.ts`
- Use: `import { verifyUser, requireAuth } from '@/lib/api-utils'`
- Notes: `HTTP_STATUS` comes from `lib/api` (responses) to keep SSOT for status codes.

## Domain Constants

- Source: `lib/constants.ts`
- Includes: `DOMAIN_ERRORS`, `API_CONFIG`, `SYSTEM_PROMPTS`, validation constants, model providers.
- Use domain errors/messages from here; do not hardcode in routes or components.

## Supabase Client

- Client (browser): `createClientComponentClient` via `lib/auth.tsx`
- Server (service role): `getServiceClient()` in `lib/supabase.ts` (server-only)
- Check configured: `isSupabaseConfigured()` in `lib/supabase.ts`

## Bot Configurations

- Source: `data/bots.ts`
- Use: Import to render navigation, content sections, and metadata for each bot.

## Types

- Source: `types/`
- Rule: Prefer interfaces for objects, `type` for unions/intersections.

## Shared UI Components

- Source: `components/shared/*` (e.g., `BotPageTemplate`, `BotSection`)
- Rule: Reuse for consistent IA/UX; keep components presentational; move logic to hooks.

## Hooks

- Source: `lib/hooks/*`
- Rule: Encapsulate stateful or effectful logic; keep pure utilities in `lib/`.

## Environment Variables

- SSOT: `.env.local` (not committed) built from `.env.example`
- Never commit: any `.env*` files. `.gitignore` already ignores them.
- Rotate immediately if a secret leaks (Supabase service role, anon key, Groq, AWS, etc.).
- `FLEETCROWN_FEEDBACK_TOKEN`: public widget token. Must be present at `next build`
  (self-host CD pulls box `.env`). Runtime-only `.env` after deploy does not emit
  the script — Next tree-shakes an empty token. Production layout also has a
  public-token fallback so the FAB still ships if the env var is missing at build.
- CSP (`next.config.js`): `script-src` and `connect-src` must allow
  `https://fleetcrown.orangecat.ch` or the browser blocks `widget.js` and boot/submit.

## Testing

- Unit/integration: `jest`, `@testing-library/*` → `tests/__tests__/`
- E2E: `playwright` → `npm run test:e2e`

---

## Import Order (SSOT)

1. React/Next
2. Third-party libs
3. Local components
4. Local utilities (`lib/*`)
5. Types (`types/*`)
6. Styles

---

## Commit Discipline

- Conventional commits: `type(scope): description`
- Pre-commit: `npm run lint && npm run format:check && npm run build`
