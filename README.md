# Botsmann

Domain-specialized AI professionals, not another generic chatbot wrapper.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000.svg)](https://nextjs.org/)
[![Live](https://img.shields.io/badge/Live-botsmann.vercel.app-brightgreen.svg)](https://botsmann.vercel.app)

---

## The Professionals

Six built-in specialists. Each with scoped knowledge, calibrated personality, and domain-specific system prompts.

| Professional | Domain | Specialty |
|---|---|---|
| **Lex** | Legal | Contract review, case analysis, regulatory compliance |
| **Imhotep** | Health | Evidence-based insights, research assistance |
| **Nerd** | Research | Systematization, web scraping, discovery |
| **Heidi** | Language | German/Swiss German, translation, culture |
| **Muse** | Art | Style analysis, composition, art history |
| **Trident** | Business | Project management, technical guidance |

SSOT: `data/bots.ts`. Each bot defines `system_prompt`, `expertise[]`, `interests[]`, `communicationStyle` (formality/verbosity/empathy), `navConfig`, and display metadata. Document access is scoped per professional -- Lex sees legal, business, and general docs only.

---

## Architecture

### Multi-LLM Routing

Three-tier provider strategy with graceful fallback:

| Priority | Provider | Model | Cost |
|---|---|---|---|
| 1 | Ollama (local) | llama3.2:latest | Free, self-hosted |
| 2 | Groq (cloud) | llama-3.1-8b-instant | Free tier |
| 3 | OpenRouter (cloud) | Claude 3.5 Sonnet, GPT-4, Gemini, Grok, Llama, Mistral | Paid |

Local first, free cloud second, paid cloud last. Users can override via settings. If a provider key is invalid, the system falls back silently to the next tier.

Entry point: `lib/llm-client.ts` -- `generateWithBestProvider()` handles selection, timeout (30s), and fallback logic.

### RAG Knowledge Retrieval

Zero-cost client-side embeddings with server-side semantic search.

- **Embeddings**: Xenova/all-MiniLM-L6-v2 (384-dimensional) via Transformers.js -- runs entirely in the browser, no API calls
- **Chunking**: 500-token chunks, 50-token overlap, sentence-aligned boundaries
- **Search**: `supabase.rpc('match_documents')` using pgvector cosine similarity
- **Context limits**: 8000 chars for RAG chat, 4000 for professional chat
- **Sources**: Returned with document name, preview snippet, and similarity score
- **Timeout**: 8s for embedding generation

### Privacy Model

Every table enforces Row Level Security. No exceptions.

- User documents isolated by `user_id` -- no cross-user data leakage
- API keys stored encrypted per-user
- Four-layer prompt injection defense:
  1. `sanitizeSystemPrompt()` -- prevents instruction override
  2. `sanitizeUserMessage()` -- removes malicious payloads
  3. `sanitizeConversationHistory()` -- validates message format
  4. `wrapUserContext()` -- XML-like delimiters separate data from instructions

### Custom Bot Creation

Users build their own specialists:

- **Templates**: Memorial, historical, functional, magical, helper
- **Personality**: Big Five trait sliders with full editor
- **Knowledge**: Upload text, audio, video, images as a custom knowledge base
- **System prompts**: Fully user-defined
- **Entity levels**: Spark, Aware, Learned, Wise, Evolved, Transcendent

### API Design

Standardized response format (SSOT: `lib/api/responses.ts`):

```typescript
// Success
{ success: true, data: {...}, meta?: { total, page } }

// Error
{ success: false, error: "Message", details?: [...] }
```

Rate limits: 20 req/60s for chat, 15 req/60s for professional chat.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React 18, TypeScript 5, Tailwind CSS + DaisyUI 5 |
| LLM | Groq, OpenRouter (100+ models), Ollama (local) |
| Database | Supabase PostgreSQL 15 + pgvector |
| Embeddings | Transformers.js (all-MiniLM-L6-v2, 384d) |
| Auth | Supabase Auth + Row Level Security |
| Email | AWS SES |
| Deployment | Vercel, GitHub Actions CI/CD |

---

<details>
<summary><strong>Quick Start</strong></summary>

### Prerequisites

- Node.js 18+
- A Supabase project with pgvector enabled
- At least one LLM provider key (Groq is free)

### Setup

```bash
git clone https://github.com/your-org/botsmann.git
cd botsmann
npm install
```

### Environment

```bash
cp .env.example .env.local
```

Required variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GROQ_API_KEY=your-groq-key
```

Optional (for multi-model support):

```
OPENROUTER_API_KEY=your-openrouter-key
OLLAMA_BASE_URL=http://localhost:11434
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

</details>

---

## Project Structure

```
botsmann/
  app/                    # Next.js 14 app router
    api/                  # API routes (thin HTTP layer)
    (routes)/             # Page routes
  components/             # UI components (no business logic)
  data/
    bots.ts               # SSOT: professional definitions
  hooks/                  # Data fetching, state management
  lib/
    api/
      responses.ts        # SSOT: API response format
    llm-client.ts         # Multi-provider LLM routing
    embeddings/           # Transformers.js integration
    security/             # Prompt injection defense layers
  public/                 # Static assets
  supabase/
    migrations/           # Database schema + pgvector setup
```

---

## License

MIT
