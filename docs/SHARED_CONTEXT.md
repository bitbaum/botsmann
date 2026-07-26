# Shared Context - Botsmann Architecture

This document provides comprehensive technical context for the Botsmann project.

---

## Technology Stack

### Frontend

| Technology    | Version | Purpose                      |
| ------------- | ------- | ---------------------------- |
| Next.js       | 14.x    | React framework (App Router) |
| React         | 18.x    | UI library                   |
| TypeScript    | 5.x     | Type safety                  |
| Tailwind CSS  | 3.x     | Utility-first styling        |
| DaisyUI       | 5.x     | Component library            |
| Framer Motion | 12.x    | Animations                   |

### Backend

| Technology          | Version | Purpose                          |
| ------------------- | ------- | -------------------------------- |
| Next.js API Routes  | -       | Serverless functions             |
| Supabase (Postgres) | 15.x    | Database + Auth + Storage + RLS  |
| @supabase/\*        | 2.x     | JS client + Next.js auth helpers |
| Zod                 | 3.x     | Schema validation                |

### Infrastructure

| Service  | Purpose                          |
| -------- | -------------------------------- |
| Vercel   | Hosting & deployment             |
| Supabase | Database, Auth, Storage, SQL API |
| AWS SES  | Email delivery                   |

### Development Tools

| Tool                  | Purpose           |
| --------------------- | ----------------- |
| Jest                  | Unit testing      |
| React Testing Library | Component testing |
| ESLint                | Code linting      |
| Prettier              | Code formatting   |

---

## Project Structure

```
botsmann/
├── .claude/                # Claude Code configuration
│   └── CLAUDE.md           # Claude-specific instructions
├── .github/                # GitHub configuration
│   └── workflows/          # CI/CD workflows
├── app/                    # Next.js App Router
│   ├── api/                # API routes (serverless)
│   │   ├── auth/           # Auth endpoints
│   │   ├── chat/           # Chat API
│   │   ├── conversations/  # Conversation CRUD
│   │   ├── custom-bots/    # Custom bot management
│   │   ├── documents/      # Document management
│   │   └── ...             # Other API routes
│   ├── auth/               # Auth pages (signin, signup, etc.)
│   ├── bots/               # Bot pages
│   │   ├── [slug]/         # Dynamic bot routing
│   │   ├── create/         # Bot builder
│   │   ├── custom/         # Custom bot pages
│   │   └── mine/           # User's bots
│   ├── dashboard/          # User dashboard
│   ├── documents/          # Document management
│   ├── profile/            # User profile
│   ├── settings/           # User settings
│   ├── professionals/      # Professional bot pages
│   ├── projects/           # Projects showcase
│   ├── solutions/          # Business solutions
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # Shared UI components
│   ├── chat/               # Chat components
│   ├── dashboard/          # Dashboard components
│   ├── documents/          # Document components
│   ├── icons/              # Icon components
│   ├── navigation/         # AuthNav, MobileNav
│   ├── shared/             # Shared components
│   └── ...                 # Other component groups
├── data/                   # Static data & configuration
│   ├── bots.ts             # Bot configurations (SSOT)
│   └── professionals.ts    # Professional configurations
├── docs/                   # Documentation
│   ├── BEST_PRACTICES.md   # Coding principles
│   ├── COMMANDS.md         # npm scripts
│   ├── SSOT.md             # Single Source of Truth map
│   ├── SUPABASE_SETUP.md   # Database setup guide
│   └── SHARED_CONTEXT.md   # This file
├── lib/                    # Utilities & helpers
│   ├── config/             # Config files (colors, navigation, etc.)
│   ├── validations/        # Zod schemas (SSOT for input types)
│   └── ...                 # Domain logic, API utils, etc.
├── public/                 # Static assets
├── tests/                  # Test files
├── types/                  # TypeScript definitions
├── AGENTS.md               # AI agent instructions
├── README.md               # Project overview
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies & scripts
```

---

## Architecture Decisions

### App Router (Next.js 16)

We use the App Router for:

- Server Components by default (better performance)
- Nested layouts
- Built-in loading/error states
- Simplified data fetching

### Supabase (PostgreSQL)

Chosen for:

- Row Level Security (RLS) for multi-tenant data isolation
- pgvector for embedding-based semantic search
- Built-in Auth, Storage, and realtime subscriptions
- Strong TypeScript support via generated types

### Serverless API Routes

All backend logic runs in Vercel serverless functions:

- No server to maintain
- Auto-scaling
- Pay-per-use

---

## Environment Variables

| Variable                        | Required | Description                 |
| ------------------------------- | -------- | --------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Yes      | Supabase project URL        |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes      | Supabase anonymous key      |
| `SUPABASE_SERVICE_ROLE_KEY`     | Yes      | Supabase service role key   |
| `GROQ_API_KEY`                  | No       | Groq LLM API key            |
| `API_KEY`                       | Yes      | Internal API authentication |
| `NEXT_PUBLIC_API_KEY`           | Yes      | Client-side API key         |
| `NEXT_AWS_ACCESS_KEY_ID`        | No       | AWS SES access key          |
| `NEXT_AWS_SECRET_ACCESS_KEY`    | No       | AWS SES secret              |
| `NEXT_AWS_REGION`               | No       | AWS region                  |
| `FROM_EMAIL`                    | No       | Sender email address        |
| `ADMIN_EMAIL`                   | No       | Admin notification email    |

**Setup:** Copy `.env.example` to `.env` and fill in values.

---

## Data Flow

### Bot Page Request

```
Browser → app/bots/[slug]/page.tsx
                ↓
        data/bots.ts (config lookup)
                ↓
        components/* (UI rendering)
                ↓
        Response HTML
```

### API Request

```
Client → app/api/[route]/route.ts
                ↓
        Zod validation
                ↓
        Supabase (if needed)
                ↓
        JSON response
```

### Form Submission

```
User → components/*Form.tsx
                ↓
        react-hook-form + Zod
                ↓
        app/api/[endpoint]/route.ts
                ↓
        Supabase + Email service
                ↓
        Success/Error response
```

---

## Key Files Reference

| File                       | Purpose            | When to Modify         |
| -------------------------- | ------------------ | ---------------------- |
| `data/bots.ts`             | Bot configurations | Adding/editing bots    |
| `app/layout.tsx`           | Root layout        | Global UI changes      |
| `lib/config/navigation.ts` | Nav config (SSOT)  | Adding nav items       |
| `tailwind.config.js`       | Theme config       | Styling changes        |
| `types/*.ts`               | Type definitions   | Data structure changes |

---

## Deployment

### Automatic (Recommended)

Push to `main` branch → GitHub Actions → Vercel

### Manual

```bash
npm run build
vercel --prod
```

### Preview Deployments

Every PR gets a preview URL automatically.

---

## Performance Considerations

1. **Server Components**: Use by default, add `'use client'` only when needed
2. **Image Optimization**: Use `next/image` for all images
3. **Code Splitting**: Automatic with App Router
4. **Caching**: Vercel Edge caching for static content

---

**Last Updated:** 2026-02-10
