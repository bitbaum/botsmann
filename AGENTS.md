# Agents — Botsmann

Organization rules and package ownership are maintained in
[bitbaum/fleet AGENTS.md](https://github.com/bitbaum/fleet/blob/main/AGENTS.md).
Use the owning shared package for reusable behavior; document justified exceptions.

Botsmann is a Next.js App Router / React / TypeScript application with Supabase
and domain-specific legal, medical, research and teaching assistants. Stack and
package versions are in `package.json` and `pnpm-lock.yaml`.

Use `pnpm install --frozen-lockfile`, `pnpm dev` and `pnpm verify`. The verify
script in `package.json` defines format, lint, typecheck, self-host guards, unit
tests and build. Unit tests use Vitest. The separate browser journey command is
`pnpm exec playwright test --config=playwright.shared.config.ts`; see
[its coverage and limits](docs/shared-package-browser-tests.md).

Deployment is `.github/workflows/deploy.yml`, using Loki's shared pipeline after
CI passes. Open ready PRs and let the checked Fleet merge sweep ship them.
Never report a contact request as received unless its API confirms persistence.
