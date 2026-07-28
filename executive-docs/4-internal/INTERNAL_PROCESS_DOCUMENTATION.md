# Botsmann Internal Process Documentation

## Development, Operations & Team Workflows

**For Internal Team Use Only**

**Version:** 1.0
**Last Updated:** January 16, 2026
**Maintained By:** Engineering Team

---

## Table of Contents

1. [Development Workflow](#1-development-workflow)
2. [Coding Standards](#2-coding-standards)
3. [Testing Procedures](#3-testing-procedures)
4. [Deployment Process](#4-deployment-process)
5. [Task Management](#5-task-management)
6. [Code Review Process](#6-code-review-process)
7. [Documentation Standards](#7-documentation-standards)
8. [Incident Response](#8-incident-response)
9. [Security Protocols](#9-security-protocols)
10. [Team Communication](#10-team-communication)

---

## 1. Development Workflow

### 1.1 Local Development Setup

**Prerequisites:**

```bash
# Required
Node.js >= 18.x
npm >= 9.x
Git

# Optional
Docker (for local Supabase)
Ollama (for local LLM testing)
```

**Initial Setup:**

```bash
# 1. Clone repository
git clone https://github.com/yourorg/botsmann.git
cd botsmann

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env.local

# 4. Configure environment variables
# Edit .env.local with your Supabase credentials

# 5. Run development server
npm run dev

# 6. Open http://localhost:3000
```

**Environment Variables (.env.local):**

```bash
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# LLM Providers (Optional - fallback keys)
GROQ_API_KEY=your-groq-key
OPENAI_API_KEY=your-openai-key

# Email (Optional - testing)
AWS_SES_REGION=eu-central-1
AWS_SES_ACCESS_KEY=your-access-key
AWS_SES_SECRET_KEY=your-secret-key
```

### 1.2 Git Workflow

**Branch Strategy:**

```
main (production)
 ├── develop (staging)
 │    ├── feature/bot-analytics
 │    ├── feature/mobile-responsive
 │    ├── bugfix/embedding-timeout
 │    └── hotfix/security-patch
```

**Branch Naming Conventions:**

- `feature/descriptive-name` - New features
- `bugfix/descriptive-name` - Bug fixes
- `hotfix/critical-fix` - Production hotfixes
- `refactor/component-name` - Code refactoring
- `docs/update-readme` - Documentation only

**Workflow:**

1. **Create Feature Branch**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/my-new-feature
   ```

2. **Develop & Commit**

   ```bash
   # Make changes
   git add .
   git commit -m "feat: add user analytics dashboard"

   # Commit message format (Conventional Commits)
   # - feat: New feature
   # - fix: Bug fix
   # - docs: Documentation
   # - style: Formatting
   # - refactor: Code restructuring
   # - test: Adding tests
   # - chore: Build tasks, etc.
   ```

3. **Push & Create PR**

   ```bash
   git push origin feature/my-new-feature

   # Create Pull Request on GitHub
   # - Title: Clear description
   # - Description: What, why, how
   # - Link to issue/task
   # - Request reviewers
   ```

4. **Code Review**
   - At least 1 approval required
   - All CI checks must pass
   - Address review comments

5. **Merge**

   ```bash
   # Squash merge to develop
   git checkout develop
   git merge --squash feature/my-new-feature
   git push origin develop
   ```

6. **Deploy to Production**
   ```bash
   # After testing on develop/staging
   git checkout main
   git merge develop
   git push origin main
   # Vercel auto-deploys
   ```

### 1.3 Local Testing

**Run Development Server:**

```bash
npm run dev
# Open http://localhost:3000
```

**Run Tests:**

```bash
# All tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

**Run Linter:**

```bash
# Check for errors
npm run lint

# Auto-fix
npm run lint:fix
```

**Type Checking:**

```bash
# TypeScript type check
npx tsc --noEmit
```

**Build Production:**

```bash
# Build for production
npm run build

# Test production build locally
npm start
```

---

## 2. Coding Standards

### 2.1 Code Style

**General Principles:**

1. **SSOT (Single Source of Truth):** No duplication of data
2. **DRY (Don't Repeat Yourself):** Extract reusable functions
3. **SoC (Separation of Concerns):** Clear folder structure
4. **KISS (Keep It Simple, Stupid):** Avoid over-engineering

**File Organization:**

```
botsmann/
├── app/                    # Next.js 14 App Router
│   ├── (pages)/            # Route groups
│   │   ├── page.tsx        # Homepage
│   │   ├── layout.tsx      # Root layout
│   │   └── error.tsx       # Error boundary
│   ├── api/                # API routes
│   │   ├── chat/route.ts
│   │   └── documents/route.ts
│   └── bots/               # Bot pages
│       └── [slug]/page.tsx
├── components/             # React components
│   ├── shared/             # Reusable components
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── layouts/            # Layout components
│   └── features/           # Feature-specific components
├── lib/                    # Utility functions
│   ├── api-utils.ts        # API helpers
│   ├── constants.ts        # Constants
│   ├── embeddings/         # Embedding generation
│   ├── llm/                # LLM client
│   ├── rag/                # RAG utilities
│   └── supabase/           # Supabase clients
├── types/                  # TypeScript types
│   ├── index.ts            # Exported types
│   └── supabase.ts         # Database types
├── data/                   # Static data
│   ├── bots.ts             # Bot configurations (SSOT)
│   └── menuItems.ts        # Menu items (SSOT)
└── public/                 # Static assets
    └── bot-icons/
```

### 2.2 TypeScript Standards

**Always Use Types:**

```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
  createdAt: Date;
}

function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Bad
function getUser(id: any): any {
  // ...
}
```

**Use Type Inference When Obvious:**

```typescript
// ✅ Good
const count = 5; // Type inferred as number
const users = await fetchUsers(); // Type from return value

// ❌ Bad (unnecessary)
const count: number = 5;
```

**Avoid `any`:**

```typescript
// ✅ Good
function processData(data: unknown) {
  if (typeof data === 'string') {
    // Now TypeScript knows it's a string
    return data.toUpperCase();
  }
}

// ❌ Bad
function processData(data: any) {
  return data.toUpperCase(); // Runtime error if not string
}
```

### 2.3 React Component Standards

**Server Components by Default:**

```typescript
// ✅ Good (Server Component)
// app/bots/page.tsx
import { getBots } from '@/lib/data/bots'

export default async function BotsPage() {
  const bots = await getBots()
  return <BotGrid bots={bots} />
}

// Only use 'use client' when needed
// components/ChatInterface.tsx
'use client'

export default function ChatInterface() {
  const [messages, setMessages] = useState([])
  // Interactive features here
}
```

**Component Structure:**

```typescript
// 1. Imports
import { useState } from 'react'
import { Button } from '@/components/shared/Button'

// 2. Types
interface Props {
  userId: string
  onSave: (data: UserData) => void
}

// 3. Component
export default function UserProfile({ userId, onSave }: Props) {
  // 4. State & hooks
  const [name, setName] = useState('')

  // 5. Event handlers
  const handleSubmit = () => {
    onSave({ name })
  }

  // 6. Render
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <Button onClick={handleSubmit}>Save</Button>
    </div>
  )
}
```

**Props Destructuring:**

```typescript
// ✅ Good
function UserCard({ name, email, avatar }: UserCardProps) {
  return <div>{name}</div>
}

// ❌ Bad
function UserCard(props: UserCardProps) {
  return <div>{props.name}</div>
}
```

### 2.4 API Route Standards

**Structure:**

```typescript
// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

// 1. Define request schema
const ChatRequestSchema = z.object({
  message: z.string().min(1).max(10000),
  botId: z.string().uuid(),
});

// 2. POST handler
export async function POST(req: NextRequest) {
  try {
    // 3. Validate request
    const body = await req.json();
    const { message, botId } = ChatRequestSchema.parse(body);

    // 4. Authenticate
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 5. Business logic
    const response = await processChat(message, botId, user.id);

    // 6. Return response
    return NextResponse.json({ response });
  } catch (error) {
    // 7. Error handling
    console.error('Chat API error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### 2.5 Naming Conventions

**Files:**

- Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- Utilities: `kebab-case.ts` (e.g., `api-utils.ts`)
- Constants: `UPPER_SNAKE_CASE.ts` (e.g., `MAX_FILE_SIZE`)
- Types: `PascalCase.ts` (e.g., `UserTypes.ts`)

**Variables:**

- Variables: `camelCase` (e.g., `userId`, `apiKey`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`)
- Components: `PascalCase` (e.g., `UserProfile`)
- Functions: `camelCase` (e.g., `getUserById`)

**Boolean Variables:**

```typescript
// ✅ Good (prefix with is/has/should/can)
const isLoading = true;
const hasPermission = false;
const shouldRefetch = true;
const canEdit = false;

// ❌ Bad
const loading = true;
const permission = false;
```

---

## 3. Testing Procedures

### 3.1 Testing Strategy

**Testing Pyramid:**

```
        /\
       /E2E\       (Few - Critical user flows)
      /------\
     /Integration\  (Some - API + DB interactions)
    /------------\
   /  Unit Tests  \  (Many - Pure functions)
  /----------------\
```

### 3.2 Unit Testing

**What to Test:**

- Pure functions (utilities, helpers)
- Component logic (not UI)
- Edge cases and error handling

**Example:**

```typescript
// lib/rag/chunker.test.ts
import { chunkText } from './chunker';

describe('chunkText', () => {
  it('should chunk text into ~512 token segments', () => {
    const text = 'Lorem ipsum...'.repeat(1000); // Long text
    const chunks = chunkText(text, 512);

    expect(chunks.length).toBeGreaterThan(1);
    chunks.forEach((chunk) => {
      const tokens = estimateTokens(chunk);
      expect(tokens).toBeLessThanOrEqual(600); // Some tolerance
    });
  });

  it('should handle empty text', () => {
    const chunks = chunkText('');
    expect(chunks).toEqual([]);
  });

  it('should preserve sentence boundaries', () => {
    const text = 'First sentence. Second sentence. Third sentence.';
    const chunks = chunkText(text, 10); // Force multiple chunks

    chunks.forEach((chunk) => {
      // Should not split mid-sentence
      expect(chunk.match(/\.\s*$/)).toBeTruthy();
    });
  });
});
```

### 3.3 Component Testing

**React Testing Library:**

```typescript
// components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('should render with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByText('Click me')).toBeDisabled()
  })
})
```

### 3.4 Integration Testing

**API Route Testing:**

```typescript
// app/api/chat/route.test.ts
import { POST } from './route';

describe('POST /api/chat', () => {
  it('should return chat response', async () => {
    const req = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: 'Hello',
        botId: 'test-bot-id',
      }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.response).toBeDefined();
  });

  it('should return 401 for unauthenticated request', async () => {
    const req = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: 'Hello',
        botId: 'test-bot-id',
      }),
      // No auth header
    });

    const response = await POST(req);
    expect(response.status).toBe(401);
  });
});
```

### 3.5 Manual Testing Checklist

**Before Each PR:**

- [ ] Run `npm run build` - builds successfully
- [ ] Run `npm run lint` - no errors
- [ ] Run `npm test` - all tests pass
- [ ] Test in Chrome (primary browser)
- [ ] Test in Safari (if UI changes)
- [ ] Test mobile responsive (if UI changes)
- [ ] Check console for errors
- [ ] Check network tab for failed requests

**Before Production Deploy:**

- [ ] Full smoke test on staging
- [ ] Test all critical user flows
- [ ] Check error monitoring (Sentry)
- [ ] Review deployment logs
- [ ] Verify environment variables
- [ ] Test rollback procedure

---

## 4. Deployment Process

### 4.1 Deployment Pipeline

```
Developer Push
      ↓
GitHub (main branch)
      ↓
Vercel Auto-Deploy
      ↓
Build & Test
      ↓
Production (live in ~2 min)
```

### 4.2 Deployment Checklist

**Pre-Deployment:**

1. [ ] All tests pass (`npm test`)
2. [ ] Build succeeds (`npm run build`)
3. [ ] Code reviewed and approved
4. [ ] CHANGELOG.md updated
5. [ ] Breaking changes documented
6. [ ] Database migrations tested (if any)

**During Deployment:**

1. [ ] Monitor Vercel deployment logs
2. [ ] Check build duration (<5 min normal)
3. [ ] Verify no errors in build output

**Post-Deployment:**

1. [ ] Smoke test production (https://botsmann.com)
2. [ ] Check error monitoring (Sentry)
3. [ ] Verify analytics tracking
4. [ ] Test critical user flows:
   - [ ] Sign up
   - [ ] Upload document
   - [ ] Chat with bot
   - [ ] Settings update
5. [ ] Monitor for 30 minutes
6. [ ] Notify team in Slack: "#deploys"

### 4.3 Rollback Procedure

**If deployment fails:**

1. **Immediate Rollback (Vercel):**

   ```bash
   # Option 1: Vercel CLI
   vercel rollback

   # Option 2: Vercel Dashboard
   # Go to Deployments → Click previous working deployment → Promote to Production
   ```

2. **Verify Rollback:**
   - Check production URL
   - Test critical flows
   - Confirm in #deploys channel

3. **Post-Mortem:**
   - Document what went wrong
   - Create GitHub issue
   - Plan fix
   - Re-deploy when ready

### 4.4 Database Migrations

**Process:**

1. **Write Migration:**

   ```sql
   -- migrations/2026-01-16-add-bot-analytics.sql
   CREATE TABLE bot_analytics (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     bot_id UUID REFERENCES custom_bots(id),
     user_id UUID REFERENCES users(id),
     query TEXT,
     response_time INTEGER,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

2. **Test Locally:**

   ```bash
   # Apply to local Supabase
   psql -h localhost -U postgres -d botsmann -f migrations/2026-01-16-add-bot-analytics.sql
   ```

3. **Apply to Production:**
   - Run in Supabase SQL Editor (staging first)
   - Verify no errors
   - Test queries
   - Apply to production
   - Update application code
   - Deploy

---

## 5. Task Management

### 5.1 Task Organization

**Tools:**

- **GitHub Issues:** Bug tracking, feature requests
- **Project Board:** Sprint planning
- **@fix_plan.md:** Priority queue (P0-P6)
- **PROMPT.md:** Current task context

**Priority Levels:**

- **P0:** Analysis & planning
- **P1:** Critical bugs, core features
- **P2:** Refactoring, optimization
- **P3:** Code deduplication
- **P4:** Nice-to-have features
- **P5:** Documentation updates
- **P6:** Future ideas

### 5.2 Sprint Process

**2-Week Sprints:**

**Monday (Sprint Planning):**

1. Review @fix_plan.md
2. Select P1-P2 tasks for sprint
3. Estimate effort (T-shirt sizes: S/M/L/XL)
4. Assign tasks to team members
5. Update GitHub project board

**Daily (Standup - Async in Slack):**

- What did you do yesterday?
- What will you do today?
- Any blockers?

**Friday (Sprint Review):**

1. Demo completed features
2. Review metrics (velocity, burn-down)
3. Retrospective:
   - What went well?
   - What didn't?
   - Action items for next sprint

### 5.3 Task Workflow

```
To Do → In Progress → Review → Testing → Done
```

**Labels:**

- `bug` - Something broken
- `feature` - New functionality
- `refactor` - Code improvement
- `docs` - Documentation
- `p1-critical` - Drop everything
- `p2-high` - Next sprint
- `p3-medium` - Future sprint
- `good-first-issue` - For new contributors

---

## 6. Code Review Process

### 6.1 Creating a Pull Request

**PR Template:**

```markdown
## Description

[Clear description of what this PR does]

## Related Issues

Closes #123

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Refactor
- [ ] Documentation

## How to Test

1. Step 1
2. Step 2
3. Expected result

## Checklist

- [ ] Tests added/updated
- [ ] Lint passes
- [ ] Build succeeds
- [ ] Documentation updated
- [ ] Manually tested

## Screenshots (if UI change)

[Add screenshots]
```

### 6.2 Reviewing Code

**What to Look For:**

1. **Functionality:**
   - Does it solve the problem?
   - Are there edge cases not handled?
   - Are there potential bugs?

2. **Code Quality:**
   - Is it readable and maintainable?
   - Does it follow coding standards?
   - Is there unnecessary complexity?

3. **Performance:**
   - Are there performance issues?
   - Are database queries optimized?
   - Is caching used appropriately?

4. **Security:**
   - Are inputs validated?
   - Is authentication checked?
   - Are SQL injections prevented?

5. **Testing:**
   - Are there adequate tests?
   - Do tests cover edge cases?
   - Are tests meaningful?

**Review Comments:**

```markdown
# ✅ Approval Comment

LGTM! Great work on the error handling. Just one minor suggestion below.

# 💡 Suggestion

Consider extracting this logic into a separate function for reusability:
[code snippet]

# ❓ Question

Why did you choose approach X over approach Y? Just curious about the trade-offs.

# ⚠️ Issue (Request Changes)

This looks like it could cause a memory leak. The event listener isn't cleaned up. Please add cleanup in useEffect return.
```

---

## 7. Documentation Standards

### 7.1 Code Documentation

**When to Comment:**

- ✅ Complex algorithms
- ✅ Non-obvious business logic
- ✅ Workarounds for bugs
- ✅ TODO items
- ❌ Obvious code (self-documenting)

**Examples:**

```typescript
// ✅ Good (explains why)
// We use a 50-token overlap to preserve context across chunk boundaries
const OVERLAP_TOKENS = 50;

// ❌ Bad (explains what - code already shows this)
// Set overlap tokens to 50
const OVERLAP_TOKENS = 50;

// ✅ Good (complex logic)
/**
 * Chunks text into ~512 token segments with overlap.
 *
 * We preserve sentence boundaries to maintain semantic coherence.
 * Overlap helps ensure context isn't lost at chunk edges.
 *
 * @param text - Input text to chunk
 * @param targetTokens - Target size per chunk (default 512)
 * @returns Array of text chunks
 */
function chunkText(text: string, targetTokens: number = 512): string[] {
  // Implementation
}
```

### 7.2 README Files

**Structure:**

```markdown
# Component/Module Name

## Purpose

[1-2 sentence description]

## Usage

[Code example]

## API

[Function signatures, parameters, return values]

## Examples

[More detailed examples]

## Testing

[How to run tests]

## Notes

[Important details, gotchas, etc.]
```

### 7.3 CHANGELOG

**Keep Updated:**

```markdown
# Changelog

## [Unreleased]

### Added

- User analytics dashboard

### Changed

- Improved embedding generation speed

### Fixed

- Chat timeout issue

## [1.0.0] - 2026-01-16

### Added

- Initial production release
- 6 specialized bots
- RAG implementation
```

---

## 8. Incident Response

### 8.1 Severity Levels

**P0 - Critical (< 15 min response)**

- Production completely down
- Data loss or corruption
- Security breach

**P1 - High (< 1 hour response)**

- Major feature broken
- Significant performance degradation
- Widespread user impact

**P2 - Medium (< 4 hours response)**

- Minor feature broken
- Limited user impact
- Workaround available

**P3 - Low (< 1 day response)**

- Cosmetic issues
- Minimal user impact
- No urgency

### 8.2 Incident Process

**1. Detection:**

- Error monitoring alert (Sentry)
- User report
- Monitoring dashboard

**2. Triage:**

- Assess severity
- Notify team (#incidents channel)
- Assign incident commander

**3. Investigation:**

- Check error logs
- Review recent deployments
- Reproduce issue

**4. Mitigation:**

- Immediate fix (if simple)
- Rollback (if recent deploy)
- Disable feature (if isolated)

**5. Resolution:**

- Deploy fix
- Verify resolution
- Monitor for 30 minutes

**6. Post-Mortem:**

- Document timeline
- Root cause analysis
- Prevention measures
- Update runbooks

---

## 9. Security Protocols

### 9.1 Credential Management

**Never Commit:**

- ❌ API keys
- ❌ Database passwords
- ❌ Secret tokens
- ❌ .env files (use .env.example)

**Use:**

- ✅ Vercel environment variables
- ✅ GitHub Secrets (for CI/CD)
- ✅ .env.local (gitignored)

**Rotation:**

- API keys: Every 90 days
- Database passwords: Every 180 days
- Service accounts: Every year

### 9.2 Access Control

**Who Has Access:**

| Resource        | Developers | Admins  | CI/CD  |
| --------------- | ---------- | ------- | ------ |
| **GitHub Repo** | ✅         | ✅      | ✅     |
| **Vercel**      | Read       | Full    | Deploy |
| **Supabase**    | Dev DB     | Prod DB | None   |
| **AWS SES**     | No         | Yes     | No     |

**Principle of Least Privilege:**

- Give minimum access needed
- Review access quarterly
- Revoke on offboarding

### 9.3 Security Checklist

**Every PR:**

- [ ] No hardcoded secrets
- [ ] Input validation (Zod schemas)
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (React escaping)
- [ ] Authentication checks on API routes
- [ ] HTTPS only (no HTTP)

**Monthly:**

- [ ] Run `npm audit`
- [ ] Review Dependabot alerts
- [ ] Check for outdated dependencies
- [ ] Review access logs

---

## 10. Team Communication

### 10.1 Communication Channels

**Slack Channels:**

- `#general` - Team announcements
- `#dev` - Development discussions
- `#deploys` - Deployment notifications
- `#incidents` - Production issues
- `#random` - Non-work chat

**Email:**

- Team-wide announcements
- External communications
- Formal documentation

**GitHub:**

- Code reviews
- Issue discussions
- Technical decisions

### 10.2 Meetings

**Daily Standup (Async in Slack):**

- Post by 10am
- 3 questions (yesterday, today, blockers)

**Sprint Planning (Every 2 weeks, Monday):**

- 1 hour
- Review backlog
- Plan sprint
- Assign tasks

**Sprint Review (Every 2 weeks, Friday):**

- 1 hour
- Demo completed work
- Retrospective
- Celebrate wins

**All-Hands (Monthly):**

- 1 hour
- Company updates
- Roadmap review
- Q&A

### 10.3 Decision Making

**RFC (Request for Comments) Process:**

1. **Author RFC:**

   ```markdown
   # RFC: Add Real-time Collaboration

   ## Summary

   [1-2 paragraphs]

   ## Motivation

   [Why we need this]

   ## Proposed Solution

   [Technical details]

   ## Alternatives Considered

   [Other options]

   ## Open Questions

   [What we're unsure about]
   ```

2. **Share for Feedback:**
   - Post in #dev
   - Tag relevant people
   - Allow 3-5 days for comments

3. **Discuss:**
   - Async comments
   - Optional sync meeting

4. **Decide:**
   - Author incorporates feedback
   - Final decision by tech lead
   - Document in GitHub

---

## Appendix

### A1: Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production build locally

# Testing
npm test             # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report

# Code Quality
npm run lint         # Check code style
npm run lint:fix     # Auto-fix issues
npx tsc --noEmit     # Type check

# Database
supabase start       # Start local Supabase
supabase stop        # Stop local Supabase
supabase db reset    # Reset database

# Deployment
vercel               # Deploy to preview
vercel --prod        # Deploy to production
vercel rollback      # Rollback last deployment
```

### A2: Troubleshooting

**Issue:** Build fails with module not found
**Solution:** `rm -rf node_modules && npm install`

**Issue:** Supabase connection error
**Solution:** Check .env.local credentials, restart dev server

**Issue:** Embedding generation times out
**Solution:** Increase Vercel function timeout (Pro plan) or optimize chunks

**Issue:** Tests failing locally but passing in CI
**Solution:** Check Node version matches CI (18.x)

---

**Document Maintained By:** Engineering Team
**Questions?** Ask in #dev on Slack

**Last Updated:** January 16, 2026
