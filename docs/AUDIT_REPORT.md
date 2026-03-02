# Codebase Audit Report

**Date**: 2026-03-02
**Auditor**: Claude Code
**Branch**: main
**Commit**: 56cdbd6

## Executive Summary

Botsmann is a well-architected Next.js 14 AI platform with 33 API routes, 90 components, and 7,378 lines of core library/API code. The codebase demonstrates strong engineering fundamentals: TypeScript strict mode, Zod validation, centralized configuration, consistent API response format, and comprehensive rate limiting. All 138 tests pass, and ESLint reports zero warnings.

The platform successfully delivers on its core promise — 6 specialized AI professionals (legal, health, research, language, creative, business) accessible without authentication, with accumulated user context as the core differentiator. This differentiator is fully implemented at the database and API level.

Key areas for improvement: production console.log statements (110 across API routes), remaining god components (12 pages >300 lines), a few SSOT violations in status/color mappings, and accessibility gaps in touch targets and aria-labels.

## Health Score

| Area                   | Score      | Notes                                                                                             |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| First Principles       | 7.5/10     | Strong SSOT foundation; 5 color/status duplication patterns remain; 12 god components             |
| Best Practices         | 8/10       | Zero lint errors, strict TS, consistent API format; 110 console.log calls bypass ESLint           |
| Mission Alignment      | 9/10       | All 6 professionals implemented; core differentiator (user context) live; no placeholder features |
| Functional Correctness | 9/10       | Comprehensive auth, rate limiting, validation; 1 unprotected endpoint (`/api/rebuild`)            |
| UI/UX & Responsive     | 8/10       | Mobile-first, excellent loading/empty/error states; touch targets and a11y need work              |
| **Overall**            | **8.3/10** | Production-ready with targeted improvements needed                                                |

---

## Phase 1: First Principles

### Ground Truth #1: Software Serves Humans — GOOD

- Code is readable with clear naming and JSDoc comments
- Error messages are contextual and user-friendly
- No dead features found — all advertised functionality works
- One TODO: `components/shared/ProfessionalDemo.tsx:149` — model switching persistence deferred

### Ground Truth #2: SSOT — VIOLATIONS FOUND

**Excellent SSOT foundation:**

- `lib/config/colors.ts` — canonical color SSOT with types derived from arrays, Zod schemas from same source, 10+ mapping tables
- `lib/domains.ts` — `DOMAINS` array → `Domain` type → validation schema → `DOMAIN_INFO` metadata
- `lib/api/responses.ts` — HTTP status codes, error codes, response helpers all centralized

**Remaining violations (5 patterns):**

| Location                                                 | Issue                                    | Severity |
| -------------------------------------------------------- | ---------------------------------------- | -------- |
| `components/infrastructure/StatusBadge.tsx:12-36, 81-86` | Status colors defined twice in same file | HIGH     |
| `components/infrastructure/ProviderCard.tsx:162-169`     | Duplicate status config from StatusBadge | HIGH     |
| `components/shared/sections/VisionSection.tsx:12-24`     | Hardcoded status colors/labels           | MEDIUM   |
| `components/navigation/BotSwitcher.tsx:16-37`            | Color mapping duplicated from config     | MEDIUM   |
| `components/shared/BotStepsSection.tsx:34-67`            | Step color schemes hardcoded             | MEDIUM   |

**Fix:** Extract to `lib/config/connection-status.ts` following the existing colors.ts pattern.

### Ground Truth #3: Design for Change — GOOD

- Modular component structure with clear separation
- Configuration in dedicated `lib/config/` folder
- Data models in `data/` folder (bots.ts, professionals.ts)
- Zod schemas centralized in `lib/validations/`
- **Issue:** Changing status colors requires editing 3+ component files

### Ground Truth #4: Automate the Mechanical — GOOD

- 138 tests across 13 test suites
- ESLint with strict rules (no-console, no-explicit-any)
- TypeScript strict mode
- **Missing:** No `typecheck` npm script (only `lint` and `test`)

### Ground Truth #5: Simplicity — VIOLATIONS FOUND

**God components (>300 lines):**

| File                                                                 | Lines |
| -------------------------------------------------------------------- | ----- |
| `app/projects/governance/open-law/page.tsx`                          | 644   |
| `app/projects/governance/open-vote/page.tsx`                         | 536   |
| `app/knowledge/infrastructure/page.tsx`                              | 534   |
| `app/projects/governance/open-service/page.tsx`                      | 526   |
| `app/projects/governance/components/TransactionWithTraceability.tsx` | 493   |
| `app/dashboard/page.tsx`                                             | 453   |
| `components/documents/DocumentChatPanel.tsx`                         | 302   |

Governance pages define types inline (e.g., `open-law/page.tsx:15-45` has 5 local type definitions that should be in `types/governance.ts`).

### Ground Truth #6: Correctness — GOOD

- Zod validation at API boundaries
- Standardized error responses via `lib/api/responses.ts`
- Minimal unsafe type casts:
  - `lib/validations/domain.ts:16` — `as unknown as` cast
  - `components/try/TryChatPanel.tsx` — `as unknown as FormEvent`
- Only 5 files with `@ts-ignore` or `eslint-disable` (low)

---

## Phase 2: Best Practices

### Console.log in Production — WARNING

**110 console.log statements across 28 API route files.** ESLint rule `no-console` is configured but bypassed.

Top violators:

- `app/api/chat/route.ts` — 17 calls
- `app/api/professional-chat/route.ts` — 14 calls
- `app/api/custom-bots/[id]/chat/route.ts` — 13 calls
- `app/api/quick-chat/route.ts` — 7 calls

**Action:** Replace with structured logging or remove. Performance logging (`Time: X ms`) is useful but should use a logger utility.

### Naming Conventions — PASSING

- Components: PascalCase.tsx consistently
- Utilities: camelCase.ts consistently
- Config: kebab-case.ts in `lib/config/`
- Constants: UPPER_SNAKE_CASE

### Error Handling — PASSING

All API routes use standardized utilities from `lib/api/responses.ts`:

- `jsonSuccess()`, `jsonError()`, `jsonUnauthorized()`, `jsonNotFound()`
- `jsonValidationError()`, `jsonServiceUnavailable()`, `handleError()`

**Exception:** `app/api/auth/signup/route.ts` uses raw `NextResponse.json()` instead of utilities.

### Auth Checks — PASSING

- All user-data endpoints require `verifyUser()`
- Public endpoints correctly identified (demo, health, contact, auth)
- User data always filtered by `user_id` at query level

### TypeScript — PASSING

- `strict: true` in tsconfig.json
- `@typescript-eslint/no-explicit-any: "warn"`
- `forceConsistentCasingInFileNames: true`

### Security — PASSING

- No hardcoded secrets found
- All queries use parameterized Supabase client (no SQL injection risk)
- Prompt injection prevention via `lib/prompt-sanitizer.ts`
- Input validation with Zod on most routes

---

## Phase 3: Mission Alignment

### All 6 Professional Domains — FULLY IMPLEMENTED

| Professional       | Slug                      | Status                                                |
| ------------------ | ------------------------- | ----------------------------------------------------- |
| Lex (Legal)        | `/professionals/legal`    | Complete with system prompt, disclaimer, capabilities |
| Imhotep (Health)   | `/professionals/health`   | Complete                                              |
| Nerd (Research)    | `/professionals/research` | Complete                                              |
| Heidi (Language)   | `/professionals/language` | Complete                                              |
| Muse (Creative)    | `/professionals/creative` | Complete                                              |
| Trident (Business) | `/professionals/business` | Complete                                              |

Each has: profile in `data/professionals.ts`, dynamic route, interactive demo, domain-specific disclaimer, welcome message, example questions.

### Accessibility Without Auth — IMPLEMENTED

User journey: Homepage → `/try` (full demo, no signup) → Professional pages with embedded chat demo → Sign up for persistent features. Demo uses `/api/quick-chat` (rate-limited, no auth required).

### Core Differentiator (Accumulated Context) — FULLY IMPLEMENTED

- `user_context` table with vector embeddings (migration 011)
- `get_relevant_context()` RPC for semantic search by domain
- Async fact extraction after each conversation (`lib/context/extractor.ts`)
- Context injected into professional chat system prompts
- Domain-aware: legal facts only shown to Lex, health facts only to Imhotep

### No Placeholder Features Found

- All advertised features functional
- One disabled filter UI on `/professionals` page (not advertised as working)
- Payment integration not yet present (expected for MVP stage)

### Documentation — EXCELLENT

- `README.md`: Clear overview, quick start, tech stack
- `docs/`: BEST_PRACTICES, COMMANDS, SHARED_CONTEXT, SSOT, SUPABASE_SETUP
- `executive-docs/`: Investor pitch deck, technical whitepaper, customer presentations
- Code comments: JSDoc on key functions, system prompts documented

---

## Phase 4: Improvement Roadmap

### Quick Wins (< 1 hour each)

1. **Add `typecheck` script** — Add `"typecheck": "tsc --noEmit"` to package.json
2. **Fix `/api/rebuild` endpoint** — Add rate limiting or token-based auth (`app/api/rebuild/route.ts`)
3. **Fix Ollama detection bug** — `const hasOllama = process.env.OLLAMA_URL || 'http://localhost:11434'` always truthy (`app/api/demo/chat/route.ts`)
4. **Fix auth/signup response format** — Use `jsonError()` utilities instead of raw `NextResponse.json()`
5. **Fix type casts** — Replace `as unknown as` in `lib/validations/domain.ts:16` and `components/try/TryChatPanel.tsx`
6. **Fix touch target** — ConversationList "New conversation" button `p-1` → `p-2` (`components/conversations/ConversationList.tsx:97`)
7. **Fix hardcoded chat height** — `h-[600px]` → `min-h-[400px] md:h-[600px]` (`components/try/TryChatPanel.tsx:80`)

### Medium Effort (1-5 hours)

8. **Extract status config SSOT** — Create `lib/config/connection-status.ts`, update StatusBadge, ProviderCard, VisionSection
9. **Replace console.log with logger** — Create `lib/logger.ts` utility, update 28 API route files
10. **Add missing aria-labels** — ConversationList buttons, MobileNav close button, emoji aria-hidden
11. **Use `Promise.allSettled` for bulk embeddings** — `app/api/custom-bots/[id]/knowledge/route.ts` to handle partial failures
12. **Add intermediate breakpoint** — DemoSection grid `md:grid-cols-2` for tablet

### Strategic (5+ hours)

13. **Refactor dashboard page** — Extract StatsGrid, RecentDocuments, RecentBots from 453-line `app/dashboard/page.tsx`
14. **Extract governance types** — Move inline types from 3 governance pages to `types/governance.ts`
15. **Extract shared chat handler** — All 3 chat routes follow identical pipeline; extract to `lib/chat/handler.ts`

---

## Phase 5: Functional Correctness

### Authentication — STRONG

- `verifyUser()` in `lib/api-utils.ts`: dual-layer (cookie + Bearer token fallback)
- All user-data endpoints verified
- Public endpoints appropriately unprotected

### Rate Limiting — EXCELLENT

Supabase-based distributed rate limiting covers all public endpoints:

| Route                 | Limit     | Purpose                |
| --------------------- | --------- | ---------------------- |
| Auth routes           | 2-5/min   | Brute force prevention |
| Chat routes           | 10-20/min | DoS protection         |
| Demo routes           | 3-15/min  | Abuse prevention       |
| Contact/Consultations | 5/10min   | Spam prevention        |

Fail-open design: if Supabase is unavailable, requests are allowed (availability over strictness).

### Input Validation — STRONG

Zod schemas on most routes. Manual validation where Zod not used is adequate. File type/size validation on uploads.

### Critical Paths — ALL VERIFIED

1. **Chat flow:** rate limit → auth → validate → embed query → vector search → context build → LLM → response
2. **Document flow:** auth → validate file → upload to storage → create DB record → parse → chunk → embed → store chunks → update status
3. **Context accumulation:** chat → async extract facts → embed → store → retrieve in future chats

### Issues Found

| Issue                                              | Severity | Location                                      |
| -------------------------------------------------- | -------- | --------------------------------------------- |
| `/api/rebuild` has no auth or rate limiting        | MEDIUM   | `app/api/rebuild/route.ts`                    |
| Bulk embedding uses `Promise.all` (all-or-nothing) | MEDIUM   | `app/api/custom-bots/[id]/knowledge/route.ts` |
| `hasOllama` always truthy (diagnostic only)        | LOW      | `app/api/demo/chat/route.ts`                  |
| Demo doc-chat doesn't indicate LLM failure         | LOW      | `app/api/demo/document-chat/route.ts`         |

### TODO/FIXME Comments

Only 1 found: `components/shared/ProfessionalDemo.tsx:149` — model switching persistence (non-blocking).

---

## Phase 6: UI/UX & Responsive Design

### Mobile-First — STRONG (9/10)

Proper Tailwind mobile-first pattern throughout. Base styles = mobile, responsive prefixes for larger screens.

Examples: `text-3xl sm:text-4xl lg:text-5xl`, `flex flex-col sm:flex-row`, `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`.

### Loading States — EXCELLENT (10/10)

`LoadingSpinner` component as SSOT with size variants. `PageLoading`, `InlineLoading` for different contexts. All async operations have loading indicators.

### Empty States — EXCELLENT (10/10)

`DashboardEmptyState` with gradient card, capabilities showcase, and social proof. ConversationList shows helpful message with action button.

### Error States — STRONG (9/10)

React `ErrorBoundary` with user-friendly fallback, dev-only error details, reset/recovery actions. Toast notifications for async errors.

### Issues Found

| Issue                                               | Score Impact | Location                                           |
| --------------------------------------------------- | ------------ | -------------------------------------------------- |
| Chat panel `h-[600px]` hardcoded                    | -1           | `components/try/TryChatPanel.tsx:80`               |
| "New conversation" button `p-1` (24px touch target) | -1           | `components/conversations/ConversationList.tsx:97` |
| Missing `md:grid-cols-2` breakpoint in DemoSection  | -0.5         | `components/shared/demo/DemoSection.tsx:61`        |
| Missing aria-labels on interactive elements         | -0.5         | ConversationList, MobileNav                        |
| Emojis not marked `aria-hidden`                     | -0.5         | `app/page.tsx:90-99`                               |

### Positive Highlights

- `sr-only` used in 37 instances across components
- Focus states (`focus:ring-2`) consistently applied
- `prefers-reduced-motion` respected in `globals.css`
- Semantic HTML (`header`, `footer`, `main`, `nav`) used throughout
- No hardcoded pixel widths (except the one chat panel)

---

## Action Items

### Priority 1 — Fix Now (security/correctness)

- [ ] Add rate limiting to `/api/rebuild` endpoint
- [ ] Fix Ollama detection: `!!process.env.OLLAMA_URL` not `|| fallback`
- [ ] Switch bulk embedding to `Promise.allSettled` for partial failure handling

### Priority 2 — This Sprint (code quality)

- [ ] Add `"typecheck": "tsc --noEmit"` to package.json scripts
- [ ] Extract connection status config to `lib/config/connection-status.ts` (eliminates 3 SSOT violations)
- [ ] Normalize `auth/signup` route to use `jsonError()` utilities
- [ ] Fix type casts: `as unknown as` in `lib/validations/domain.ts` and `TryChatPanel.tsx`

### Priority 3 — Next Sprint (UX/a11y)

- [ ] Fix touch target: ConversationList button `p-1` → `p-2`
- [ ] Fix hardcoded height: `TryChatPanel.tsx h-[600px]` → responsive
- [ ] Add missing aria-labels (ConversationList, MobileNav)
- [ ] Add `md:grid-cols-2` to DemoSection grid
- [ ] Mark decorative emojis with `aria-hidden="true"`

### Priority 4 — Backlog (architecture)

- [ ] Create `lib/logger.ts`, replace 110 console.log calls across API routes
- [ ] Refactor `app/dashboard/page.tsx` (453 lines) into sub-components
- [ ] Extract governance page inline types to `types/governance.ts`
- [ ] Extract shared chat handler from 3 duplicate chat route pipelines
