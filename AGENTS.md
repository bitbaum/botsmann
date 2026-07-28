# AGENTS.md — Botsmann

Operating guide for automated agents and new contributors. Mirrors key facts from
`.claude/CLAUDE.md`. Keep this file in sync when the stack or workflow changes.

## Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Framework  | Next.js 16 (App Router)        |
| UI         | React 19                       |
| Language   | TypeScript (strict)            |
| Styling    | Tailwind CSS                   |
| Database   | Supabase (Postgres)            |
| Testing    | Jest (unit) + Playwright (e2e) |
| Deployment | Self-hosted (Hetzner + Caddy)  |

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
`.github/workflows/ci.yml`), so a local green `verify` means a green CI.

## Deployment

Botsmann is self-hosted on the Hetzner box "bitbaum" behind Caddy
(botsmann.orangecat.ch) — there is no Vercel. Deployment runs from the local
`.husky/pre-push` hook (build → rsync → systemd restart) when `main` is pushed.
The `ci.yml` workflow only validates `verify` on pushes and pull requests.
