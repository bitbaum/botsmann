# AGENTS.md — Botsmann

Operating guide for automated agents and new contributors. Mirrors key facts from
`.claude/CLAUDE.md`. Keep this file in sync when the stack or workflow changes.

## Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Framework  | Next.js 14 (App Router)        |
| Language   | TypeScript (strict)            |
| Styling    | Tailwind CSS                   |
| Database   | Supabase (Postgres)            |
| Testing    | Jest (unit) + Playwright (e2e) |
| Deployment | Vercel                         |

## Everyday commands

```bash
npm install        # install deps
npm run dev        # local dev server, port 3000
npm run build      # production build (also type-checks)
npm run test       # Jest unit tests
npm run test:e2e   # Playwright end-to-end tests
```

## verify — the single gate (SSOT)

```bash
npm run verify     # format:check → lint → test → build
```

`verify` is the one definition of "green". CI runs it verbatim (see
`.github/workflows/deploy.yml`), so a local green `verify` means a green CI.
Run it before declaring any change done. The gate uses explicit script names
(no `--if-present`): a missing or renamed gate script fails loudly instead of
silently passing.

## Supabase migrations — MANUAL

Migrations live in `supabase/migrations/` (`NNN_description.sql`, sequential).
They are **applied manually** — CI and the Vercel deploy do **not** run them.
Never edit an already-applied migration; always add a new numbered file.
Helper scripts live in `scripts/` (e.g. `run-migration.ts`, `test-db-connection.ts`).

## Deploy path

- Push / merge to `main` → GitHub Actions runs `npm run verify`, then deploys to
  **Vercel production**.
- Pull requests → `verify` runs and a Vercel **preview** deploy is created.
- Prod only receives commits that passed CI (the local `.husky/pre-push` hook is
  CI-gated for the parallel Hetzner mirror).

## Security

This repo has a history of leaked keys. Never commit real secrets. Only
`.env.example` holds placeholder values; real values live in Vercel env settings
and local `.env*` files (git-ignored). Do not print secret values in logs or PRs.

## Conventions

Follow `.claude/CLAUDE.md` and the imported global standards: SSOT, DRY, SoC,
TypeScript strict, no hardcoded secrets, no `console.log` in production, semantic
Tailwind classes over inline styles.
