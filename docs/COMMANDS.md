# Commands Reference

All pnpm scripts available in the Botsmann project.

---

## Quick Reference

| Command          | Description              |
| ---------------- | ------------------------ |
| `pnpm run dev`   | Start development server |
| `pnpm run build` | Production build         |
| `pnpm run start` | Start production server  |
| `pnpm run lint`  | Run ESLint               |
| `pnpm run test`  | Run tests                |

---

## Development

### Start Dev Server

```bash
pnpm run dev
```

Starts Next.js development server on `http://localhost:3000` with:

- Hot Module Replacement (HMR)
- Fast Refresh
- Error overlay

### Run Linting

```bash
pnpm run lint
```

Runs ESLint to check for code quality issues.

---

## Building

### Production Build

```bash
pnpm run build
```

Creates optimized production build in `.next/` directory.

### CI Build

```bash
pnpm run build:ci
```

Runs `pnpm install --frozen-lockfile` (clean install) then builds. Used in CI pipelines.

### Start Production Server

```bash
pnpm run start
```

Starts the production server. Requires `pnpm run build` first.

---

## Testing

### Run All Tests

```bash
pnpm run test
```

Runs the Vitest suite once.

### Watch Mode

```bash
pnpm run test:watch
```

Runs tests in watch mode - re-runs on file changes.

---

## Common Workflows

### Before Committing

```bash
pnpm run lint && pnpm run build
```

Ensures code passes linting and builds successfully.

### Full Test Run

```bash
pnpm run lint && pnpm run test && pnpm run build
```

Complete verification before pushing.

### Fresh Start

```bash
rm -rf node_modules .next
pnpm install
pnpm run dev
```

Clean reinstall and restart.

---

## Environment Setup

### First Time Setup

```bash
# Clone repository
git clone git@github.com:bitbaum/botsmann.git
cd botsmann

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env with your values

# Start development
pnpm run dev
```

### Update Dependencies

```bash
pnpm update
```

### Check for Vulnerabilities

```bash
pnpm audit
```

### Fix Vulnerabilities

```bash
pnpm audit --fix
```

---

## Deployment

Botsmann is self-hosted on the Hetzner box "bitbaum" behind Caddy
(botsmann.orangecat.ch). There is no Vercel.

### Automatic Deploy

Push to `main` — the local `.husky/pre-push` hook runs the self-hosted deploy
script (build → rsync → systemd restart) in the background. Logs stream to
`/tmp/push-deploy-botsmann.log`.

### Manual Deploy

```bash
# Re-run the same self-hosted deploy the pre-push hook triggers
bash /home/g/dev/fleetcrown/scripts/hetzner/deploy.sh botsmann
```

---

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill it
kill -9 <PID>
```

### Clear Next.js Cache

```bash
rm -rf .next
pnpm run dev
```

### Reset Everything

```bash
rm -rf node_modules .next
pnpm install
pnpm run dev
```

---

**Last Updated:** 2026-09-04
