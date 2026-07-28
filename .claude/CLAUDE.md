# Botsmann

@~/.claude/CLAUDE.md

---

## Overview

**Botsmann** is a modern AI bot platform featuring intelligent assistants for legal, medical, research, and language learning. Built with Next.js 16 and React 19, self-hosted on the Hetzner box "bitbaum" behind Caddy (botsmann.orangecat.ch).

---

## Tech Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Framework  | Next.js 16 (App Router)       |
| UI         | React 19                      |
| Language   | TypeScript                    |
| Styling    | Tailwind CSS                  |
| Testing    | Jest                          |
| Deployment | Self-hosted (Hetzner + Caddy) |

---

## Quick Start

```bash
cd /home/g/botsmann
npm install
npm run dev          # Port 3000
npm run build        # Production build
npm run lint         # ESLint check
npm run test         # Jest tests
```

---

## Project Structure

```
app/                  # Next.js App Router pages
  api/                # API routes
  bots/               # Bot-specific pages
components/           # Shared UI components
lib/                  # Utilities and helpers
types/                # TypeScript type definitions
data/                 # Static data and configuration
```

---

## Domain-Specific Rules

### Bot Types

Each bot has a specific domain:

- Legal assistant
- Medical assistant
- Research assistant
- Language learning

### Component Pattern

```typescript
import { type FC } from 'react';

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export const Component: FC<ComponentProps> = ({ title, onAction }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
};
```

---

## Key Documentation

| Document                 | Purpose                   |
| ------------------------ | ------------------------- |
| `docs/BEST_PRACTICES.md` | DRY, SSOT, SoC principles |
| `docs/SHARED_CONTEXT.md` | Tech stack, architecture  |
| `docs/COMMANDS.md`       | npm scripts reference     |
| `README.md`              | Project overview          |

---

## Don't

- Use `console.log` in production (use proper error handling)
- Hardcode API keys or secrets
- Use `any` type without justification
- Use inline styles (use Tailwind classes)

---

**Last Updated**: 2026-07-26
