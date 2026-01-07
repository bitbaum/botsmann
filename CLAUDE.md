# CLAUDE.md - AI Assistant Guide for Botsmann

This document provides essential context for AI assistants working with the Botsmann codebase.

## Project Overview

Botsmann is a modern AI-powered bot platform built with Next.js 14. It features multiple specialized AI assistants (bots) for legal, medical, language learning, research, and other domains. The platform uses a modular architecture with React components, TailwindCSS styling, and MongoDB for persistence.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14.0.4 (App Router) |
| Language | TypeScript 5.7.3 (strict mode) |
| UI | React 18.2, TailwindCSS 3.4.1, DaisyUI 5.0.43 |
| Components | Headless UI 2.2.0, Heroicons, Framer Motion |
| Forms | React Hook Form 7.54, Zod 3.24 (validation) |
| Database | MongoDB 6.13, Mongoose 8.10 |
| Email | AWS SES |
| Content | MDX with next-mdx-remote |
| Testing | Jest 29.7, React Testing Library |
| Deployment | Vercel with GitHub Actions CI/CD |

## Directory Structure

```
botsmann/
├── app/                      # Next.js 14 App Router
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── api/                  # API routes
│   │   ├── consultations/    # Consultation form API
│   │   ├── products/search/  # Product search API
│   │   ├── health/           # Health check endpoint
│   │   └── waitlist/         # Waitlist management
│   ├── bots/                 # Individual bot pages
│   │   ├── legal-expert/     # LEX - Legal Assistant (flagship)
│   │   ├── medical-expert/   # Imhotep - Medical Expert
│   │   ├── swiss-german-teacher/  # Heidi - Language Learning
│   │   ├── research-assistant/    # Research tools
│   │   ├── product-manager/  # Trident - PM tool
│   │   └── artistic-advisor/ # Art assistance
│   ├── projects/             # Special project pages
│   ├── solutions/            # Solution pages by audience
│   ├── blog/                 # MDX-based blog system
│   └── about/, contact/      # Static pages
├── components/               # Shared React components
│   ├── Header.tsx, Footer.tsx
│   ├── Navigation.tsx        # Main nav with Headless UI
│   ├── MegaMenu.tsx          # Mega menu component
│   ├── ConsultationForm.tsx  # Consultation form
│   └── blog/                 # Blog components
├── src/                      # Shared utilities
│   └── lib/
│       ├── mongodb.ts        # DB connection with pooling
│       ├── middleware/auth.ts # API key validation
│       ├── email/service.ts  # AWS SES email service
│       ├── models/           # Mongoose schemas
│       ├── schemas/          # Zod validation schemas
│       └── platforms/        # External integrations
├── data/                     # Static data
│   ├── bots.ts               # Bot registry with metadata
│   ├── menuItems.ts          # Navigation structure
│   └── solutions.json        # Solution templates
├── lib/                      # Root-level utilities
│   ├── blog.ts               # Blog processing
│   └── nlp.ts                # NLP utilities
├── tests/                    # Test files
│   └── __tests__/            # Jest test suites
└── public/images/            # Static assets
```

## Key Files

| File | Purpose |
|------|---------|
| `data/bots.ts` | Bot registry - add new bots here |
| `src/lib/mongodb.ts` | Database connection with pooling |
| `src/lib/middleware/auth.ts` | API authentication middleware |
| `components/Navigation.tsx` | Main navigation component |
| `app/globals.css` | Global styles and Tailwind config |

## Code Conventions

### TypeScript
- Strict mode is enabled - always provide proper types
- Use interfaces for object shapes, types for unions
- Path alias `@/*` maps to project root

### React Components
- Use functional components with hooks
- Export default for page components
- Keep components in feature-specific directories
- Use Headless UI for accessible interactive elements

### Styling
- TailwindCSS for all styling
- Custom colors: `openai-green`, `openai-gray` defined in tailwind.config.js
- Mobile-first responsive design
- DaisyUI components available for rapid prototyping

### API Routes
```typescript
// Pattern: app/api/[resource]/route.ts
import { NextRequest } from 'next/server';
import { connectDB } from '@/src/lib/mongodb';
import { validateApiKey } from '@/src/lib/middleware/auth';

export async function POST(req: NextRequest) {
  // 1. Validate API key
  // 2. Validate input with Zod
  // 3. Connect to MongoDB
  // 4. Process request
  // 5. Return NextResponse.json()
}
```

### Bot Structure
Each bot follows this pattern:
```
app/bots/[bot-name]/
├── page.tsx              # Main entry point
├── README.md             # Bot documentation
├── styles.css            # Bot-specific styles (optional)
└── components/           # Feature components
    ├── hero/
    ├── features/
    ├── demo/
    └── cta/
```

## Development Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run build:ci     # CI build (npm ci + build)
npm run start        # Start production server
npm test             # Run Jest tests
npm run test:watch   # Jest watch mode
npm run lint         # Run ESLint
```

## Testing

- Tests live in `tests/__tests__/`
- Use Jest + React Testing Library
- Mock fetch globally in `jest.setup.ts`
- Test patterns: `**/__tests__/**/*.test.{ts,tsx}`

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
```

## Environment Variables

Required variables (see `.env.example`):
```
MONGODB_URI=          # MongoDB connection string
API_KEY=              # API key for auth
NEXT_PUBLIC_API_KEY=  # Client-side API key
NEXT_AWS_ACCESS_KEY_ID=    # AWS SES
NEXT_AWS_SECRET_ACCESS_KEY=
NEXT_AWS_REGION=
FROM_EMAIL=           # Sender email
ADMIN_EMAIL=          # Admin notifications
```

## Adding a New Bot

1. Create directory: `app/bots/[bot-slug]/`
2. Add `page.tsx` with bot UI
3. Register in `data/bots.ts`:
```typescript
{
  slug: 'your-bot',
  title: 'Your Bot Title',
  description: 'Short description',
  overview: 'Detailed overview',
  features: ['Feature 1', 'Feature 2'],
  details: 'Extended description',
  tryLink: 'https://...'  // Optional external link
}
```
4. Add README.md for bot-specific docs
5. Create components in `components/` subdirectory

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. Triggers on push to `main` and PRs
2. Uses Node.js 18
3. Runs: build:ci → lint → test
4. Deploys to Vercel (preview for PRs, production for main)

## Common Tasks

### Adding a new API endpoint
1. Create `app/api/[name]/route.ts`
2. Use `validateApiKey()` for auth
3. Use Zod schemas for input validation
4. Connect to MongoDB with `connectDB()`

### Adding a new page
1. Create `app/[path]/page.tsx`
2. Export default function component
3. Add to navigation in `data/menuItems.ts` if needed

### Modifying navigation
Edit `data/menuItems.ts` and `components/Navigation.tsx`

### Adding blog content
1. Create MDX file in `app/blog/posts/`
2. Use frontmatter for metadata
3. Blog system auto-generates routes

## Architecture Notes

- **Standalone output**: Optimized for Vercel serverless
- **MongoDB pooling**: Max 5 connections, cached in dev
- **Rate limiting**: LRU-based in `src/lib/rate-limit.ts`
- **Caching**: 1hr browser, 24hr CDN, 60s stale-while-revalidate
- **Image optimization**: Remote patterns for GitHub CDN

## Code Quality

- TypeScript strict mode enforced
- ESLint via Next.js config
- No console.log in production code
- Use proper error handling with try-catch
- Validate all user inputs with Zod

## Important Patterns

### Error Handling
```typescript
import { createErrorResponse } from '@/src/lib/schemas/errors';

// In API routes
if (!valid) {
  return createErrorResponse('Invalid input', 400);
}
```

### Database Models
```typescript
// src/lib/models/[name].ts
import mongoose from 'mongoose';

const schema = new mongoose.Schema({...});
export default mongoose.models.Name || mongoose.model('Name', schema);
```

### Form Validation
```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2)
});
```

## Existing Bots

| Slug | Name | Purpose |
|------|------|---------|
| swiss-german-teacher | Heidi | Swiss German/High German learning |
| research-assistant | Nerd | Research organization and insights |
| medical-expert | Imhotep | Medical knowledge support |
| legal-expert | LEX | Legal research and analysis |
| artistic-advisor | - | Art and creative guidance |
| product-manager | Trident | Product management for devs |

## Related Documentation

- `README.md` - Project overview and setup
- `PROJECT_STRUCTURE.md` - Detailed file organization
- `LEX_TECHNICAL_ARCHITECTURE.md` - Legal bot architecture
- Bot READMEs in `app/bots/[name]/README.md`
