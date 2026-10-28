# Agents — Botsmann

<!-- fleet:rules:begin — generated from bitbaum/fleet templates/agent-rules.md; edit it there, not here -->

## Org rules

Read `bitbaum/fleet` `AGENTS.md`, `SHARED.md` and the registers it names before
inventing a host, a name, a page or a shared behaviour. Do not copy their facts
into this file.

- **Packages first.** If a `@bitbaum/*` package (or `bip-kit`, `limitkit`,
  `threadkit`, `ai-forms`) already does it, use it and fix a defect in the
  package, not in this app. Every chat is `@bitbaum/chatkit`, every search box
  `@bitbaum/searchkit`, every chart `@bitbaum/chartkit`, accounts
  `@bitbaum/accountkit`, model calls `@bitbaum/ai-kit`. Review this product's
  `package-plan.json` before building anything.
- **One shape per kind.** Things of the same kind look the same and sit in the
  same place (fleet `AGENTS.md`, "One shape per kind").
- **Finished work ships by itself.** Open a non-draft pull request; the fleet
  auto-merge sweep is the only merge path. Never merge by hand, through the
  merge API, with `--auto` or with an admin bypass, and never force-push a
  shared branch.
- **Nothing made up.** A fact on a page or in a doc needs a source that was
  opened; where there is none, the line is removed or softened.
- **Bitcoin orange is for Bitcoin and top-of-funnel actions only.**
- **No model identifier** in anything pushed to a repository.
- Before you finish, run `node <fleet>/scripts/ci/docs-truth-audit.mjs --dir .`:
  the same check the sweep runs on every pull request.

<!-- fleet:rules:end -->

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
