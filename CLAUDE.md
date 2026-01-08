# CLAUDE.md - AI Assistant Guidelines for Botsmann

## Project Overview

Botsmann is a Next.js application providing AI-powered domain-specific workspaces where individuals collaborate with AI and human experts.

**Philosophy:** AI does 80% (routine work), Human experts do 20% (liability/complex decisions)

**Status:** Proof-of-concept with interactive demos. Full AI integration planned Q2-Q3 2026.

```
┌─────────────────────────────────────────────────────────────────┐
│                         BOTSMANN                                │
├─────────────────────────────────────────────────────────────────┤
│  User → Bot Page → AI Analysis → Expert Review → Workspace      │
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │   Lex    │    │  Heidi   │    │   Nerd   │    │ Imhotep  │  │
│  │  Legal   │    │ Language │    │ Research │    │ Medical  │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference

```bash
# Development
npm run dev           # Start dev server (localhost:3000)
npm run build         # Production build
npm run lint          # Run ESLint (errors only)
npm run lint:fix      # Auto-fix linting issues
npm run test          # Run Jest tests
npm run test:watch    # Tests in watch mode
npx tsc --noEmit      # Type check without emit
```

---

## Architecture

### Directory Structure

```
/
├── app/                        # Next.js App Router
│   ├── bots/                   # Bot-specific pages
│   │   ├── [slug]/             # Dynamic bot routing
│   │   ├── legal-expert/       # Lex - each bot has own folder
│   │   └── ...
│   ├── api/                    # API routes
│   │   ├── consultations/      # Form submissions
│   │   ├── health/             # Health check
│   │   └── waitlist/           # Waitlist management
│   ├── layout.tsx              # Root layout (SSOT for providers)
│   └── page.tsx                # Homepage
│
├── components/                 # Shared React components
│   ├── Header.tsx              # Global header
│   ├── Footer.tsx              # Global footer
│   └── blog/                   # Blog-specific components
│
├── src/lib/                    # Core utilities (SSOT)
│   ├── mongodb.ts              # DB connection singleton
│   ├── rate-limit.ts           # Rate limiting
│   ├── email/                  # Email service
│   ├── models/                 # Mongoose schemas
│   ├── schemas/                # Zod validation schemas
│   └── middleware/             # API middleware
│
├── data/                       # Static data (SSOT)
│   ├── bots.ts                 # Bot definitions
│   └── menuItems.ts            # Navigation items
│
├── types/                      # Shared TypeScript types
└── tests/__tests__/            # Test files
```

### Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      layout.tsx                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    Header                             │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │                                                       │  │
│  │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │  │
│  │   │  HeroSection │  │  Features   │  │    CTA      │  │  │
│  │   │  (per bot)   │  │  (shared)   │  │  (shared)   │  │  │
│  │   └─────────────┘  └─────────────┘  └─────────────┘  │  │
│  │                                                       │  │
│  ├───────────────────────────────────────────────────────┤  │
│  │                    Footer                             │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Best Practices

### DRY (Don't Repeat Yourself)

```typescript
// BAD: Duplicated validation logic
const validateEmail1 = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateEmail2 = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// GOOD: Single source of truth in src/lib/schemas/
import { emailSchema } from '@/src/lib/schemas/customer';
```

### SSOT (Single Source of Truth)

| Data | Location | Usage |
|------|----------|-------|
| Bot definitions | `data/bots.ts` | Import everywhere |
| Menu items | `data/menuItems.ts` | Navigation components |
| Validation schemas | `src/lib/schemas/` | Forms and API routes |
| Types | `types/` or co-located | Import, never duplicate |
| Theme colors | `tailwind.config.js` | Use Tailwind classes |

```typescript
// BAD: Hardcoded bot data
const bots = [{ slug: 'legal-expert', title: 'Lex' }];

// GOOD: Import from SSOT
import { bots } from '@/data/bots';
```

### Separation of Concerns

```
┌────────────────┐   ┌────────────────┐   ┌────────────────┐
│   Presentation │   │    Business    │   │      Data      │
│    (UI only)   │   │    (Logic)     │   │   (Fetching)   │
├────────────────┤   ├────────────────┤   ├────────────────┤
│ components/    │   │ src/lib/       │   │ src/lib/       │
│ - Display data │   │ - Validation   │   │ - mongodb.ts   │
│ - Handle UI    │   │ - Transform    │   │ - models/      │
│ - Styling      │   │ - Business     │   │ - API calls    │
└────────────────┘   └────────────────┘   └────────────────┘
```

```typescript
// BAD: Mixed concerns in component
function ContactForm() {
  const validateEmail = (e) => { /* validation logic */ };
  const sendToDb = async () => { /* db logic */ };
  return <form>...</form>;
}

// GOOD: Separated concerns
// src/lib/schemas/contact.ts - validation
// src/lib/services/contact.ts - business logic
// components/ContactForm.tsx - UI only
```

### Modularity

```typescript
// BAD: Monolithic component
function BotPage() {
  // 500 lines of mixed code
}

// GOOD: Modular composition
function BotPage() {
  return (
    <>
      <HeroSection bot={bot} />
      <FeaturesSection features={bot.features} />
      <DemoSection />
      <CallToAction />
    </>
  );
}
```

---

## Code Style Guide

### TypeScript Patterns

```typescript
// ✅ Use interfaces for objects
interface Bot {
  slug: string;
  title: string;
  emoji: string;
  status: 'live' | 'beta' | 'soon';
}

// ✅ Use type for unions/primitives
type BotStatus = 'live' | 'beta' | 'soon';

// ✅ Explicit return types for exports
export function getBotBySlug(slug: string): Bot | undefined {
  return bots.find(bot => bot.slug === slug);
}

// ❌ Never use `any`
function bad(data: any) { }

// ✅ Use `unknown` with type guards
function good(data: unknown) {
  if (isBot(data)) {
    // data is now Bot type
  }
}

// ✅ Use Zod for runtime validation
import { z } from 'zod';
const BotSchema = z.object({
  slug: z.string(),
  title: z.string(),
  status: z.enum(['live', 'beta', 'soon']),
});
```

### React Patterns

```typescript
// ✅ Server Components by default (no directive)
export default function BotList() {
  const bots = getBots(); // Can fetch directly
  return <ul>{bots.map(b => <li key={b.slug}>{b.title}</li>)}</ul>;
}

// ✅ Client Components only when needed
'use client';
export function InteractiveDemo() {
  const [state, setState] = useState();
  return <div onClick={() => setState(!state)}>...</div>;
}

// ✅ Composition over props drilling
<BotProvider bot={bot}>
  <HeroSection />      {/* Uses useBotContext() */}
  <FeaturesSection />  {/* Uses useBotContext() */}
</BotProvider>

// ✅ Extract reusable logic to hooks
function useBotAnalysis(botId: string) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  // ... logic
  return { analysis, loading };
}
```

### Component Structure

```typescript
// components/BotCard.tsx

// 1. Imports (external, then internal, then types)
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Bot } from '@/types';

// 2. Types/Interfaces (if not imported)
interface BotCardProps {
  bot: Bot;
  variant?: 'default' | 'compact';
}

// 3. Component
export function BotCard({ bot, variant = 'default' }: BotCardProps) {
  // Hooks first
  const [isHovered, setIsHovered] = useState(false);

  // Derived state
  const isLive = bot.status === 'live';

  // Handlers
  const handleClick = () => { /* ... */ };

  // Render
  return (
    <Link href={`/bots/${bot.slug}`}>
      {/* JSX */}
    </Link>
  );
}
```

### State Management

```typescript
// ✅ Local state for UI-only concerns
const [isOpen, setIsOpen] = useState(false);

// ✅ URL state for shareable state
import { useSearchParams } from 'next/navigation';
const searchParams = useSearchParams();
const tab = searchParams.get('tab') ?? 'overview';

// ✅ Server state with fetch + cache
async function getBots() {
  const res = await fetch('/api/bots', { next: { revalidate: 3600 } });
  return res.json();
}

// ✅ Form state with React Hook Form
const { register, handleSubmit, formState } = useForm<FormData>({
  resolver: zodResolver(FormSchema),
});
```

### Styling with Tailwind

```typescript
// ✅ Use design tokens from tailwind.config.js
className="text-openai-green bg-openai-gray"

// ✅ Mobile-first responsive
className="text-sm md:text-base lg:text-lg"

// ✅ Extract repeated patterns
// In globals.css or as component
const buttonStyles = "px-4 py-2 rounded-lg bg-openai-green text-white hover:bg-green-700 transition-colors";

// ❌ Avoid inline styles
style={{ color: '#10a37f' }}

// ✅ Use CSS variables for dynamic values
style={{ '--progress': `${percentage}%` } as React.CSSProperties}
```

---

## API Routes

### Structure

```typescript
// app/api/[resource]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/src/lib/rate-limit';

// 1. Schema definition
const RequestSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
});

// 2. Rate limiter
const limiter = rateLimit({ limit: 5, interval: 60000 });

// 3. Handler
export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
    const { isRateLimited } = limiter.check(ip);
    if (isRateLimited) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    // Validation
    const body = await req.json();
    const data = RequestSchema.parse(body);

    // Business logic
    const result = await processData(data);

    // Success response
    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    // Error handling
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## Development Workflow

### Adding a New Feature

```
1. Plan
   └── Identify affected files
   └── Check for existing patterns to follow
   └── Check data/types for SSOT

2. Implement
   └── Create types first (if new)
   └── Add to SSOT (data/, types/)
   └── Implement logic (src/lib/)
   └── Build UI (components/)
   └── Wire up (app/)

3. Validate
   └── npm run lint
   └── npm run test
   └── npm run build
   └── Manual testing

4. Document
   └── Update relevant README
   └── Add JSDoc for public APIs
```

### Adding a New Bot

```bash
# 1. Create directory structure
mkdir -p app/bots/[new-bot]/components/{hero,features,demo}

# 2. Add to SSOT
# data/bots.ts - add bot definition

# 3. Create page
# app/bots/[new-bot]/page.tsx

# 4. Follow existing bot patterns
# Look at app/bots/legal-expert/ for reference
```

### Adding an API Endpoint

```bash
# 1. Create route file
touch app/api/[endpoint]/route.ts

# 2. Add schema to src/lib/schemas/

# 3. Implement with pattern above

# 4. Add tests
touch tests/__tests__/api/[endpoint].test.ts
```

---

## Common Patterns

### Forms

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactSchema, type ContactData } from '@/src/lib/schemas/contact';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactData>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed');
      reset();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
```

### Dynamic Imports

```typescript
import dynamic from 'next/dynamic';

// Heavy components
const DemoSection = dynamic(
  () => import('./components/DemoSection'),
  {
    loading: () => <DemoSkeleton />,
    ssr: false  // If client-only
  }
);

// Conditional loading
const AdminPanel = dynamic(() => import('./AdminPanel'));
{isAdmin && <AdminPanel />}
```

### Error Boundaries

```typescript
'use client';

import { Component, ReactNode } from 'react';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Error caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
```

---

## Testing

```typescript
// tests/__tests__/components/BotCard.test.tsx

import { render, screen } from '@testing-library/react';
import { BotCard } from '@/components/BotCard';

const mockBot = {
  slug: 'legal-expert',
  title: 'Lex',
  emoji: '⚖️',
  status: 'live' as const,
};

describe('BotCard', () => {
  it('renders bot title', () => {
    render(<BotCard bot={mockBot} />);
    expect(screen.getByText('Lex')).toBeInTheDocument();
  });

  it('links to bot page', () => {
    render(<BotCard bot={mockBot} />);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/bots/legal-expert'
    );
  });
});
```

---

## Troubleshooting

### ESLint Errors

```bash
# "Module not found" in ESLint
npm run lint:fix  # Often fixes import issues

# Unused variable
const _unused = value;  # Prefix with _ if intentional
```

### Build Failures

```bash
# Type errors
npx tsc --noEmit  # Check types first

# Missing env vars
cp .env.example .env.local  # Ensure env is set
```

### MongoDB Connection

```bash
# Connection timeout
# Check MONGODB_URI format: mongodb+srv://user:pass@cluster/db

# In development without DB
# Routes handle missing MONGODB_URI gracefully
```

---

## Security Checklist

- [ ] All API routes validate input with Zod
- [ ] Rate limiting on public endpoints
- [ ] No secrets in client code (use NEXT_PUBLIC_ only for public)
- [ ] API key validation for protected routes
- [ ] Error messages don't leak internal details
- [ ] User input sanitized before display

---

## What NOT to Do

| Don't | Do Instead |
|-------|-----------|
| `console.log()` | `console.error()` or `console.info()` |
| `var` | `const` or `let` |
| `: any` type | Proper type or `unknown` |
| Duplicate data | Import from SSOT |
| Inline styles | Tailwind classes |
| Hardcoded strings | Constants or config |
| Skip validation | Always use Zod |
| `.env` in git | `.env.local` (gitignored) |

---

## Environment Variables

```env
# Required
MONGODB_URI=mongodb+srv://...

# Email (pick one provider)
SENDGRID_API_KEY=SG...
# or
AWS_SES_ACCESS_KEY=...
AWS_SES_SECRET_KEY=...

# Optional
SENTRY_DSN=https://...
API_KEY=your-api-key
```

---

## Bot Reference

| Bot | Slug | Domain | Status |
|-----|------|--------|--------|
| Lex | `legal-expert` | Legal | Live |
| Heidi | `swiss-german-teacher` | Language | Live |
| Nerd | `research-assistant` | Research | Soon |
| Imhotep | `medical-expert` | Medical | Soon |
| Artr | `artistic-advisor` | Creative | Soon |
| PM | `product-manager` | Business | Coming |
| Finance | `financial-advisor` | Finance | Coming |

---

## Related Documentation

- `docs/API.md` - API endpoint documentation
- `docs/CODE_REVIEW_FINDINGS.md` - Code review findings
- `ARCHITECTURE.md` - System architecture
- `CONTRIBUTING.md` - Contribution guidelines
- Each bot has its own `README.md` in `app/bots/[slug]/`
