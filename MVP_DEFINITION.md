# Botsmann MVP Definition

## TL;DR

**MVP = Legal Workspace (Lex) + Basic Expert Matching + Self-Hosted Option**

Build the smallest possible workspace that proves the core value proposition:
- Individual uploads legal documents → AI analyzes (Lex) → AI determines if expert needed → Individual invites lawyer → Collaboration happens in workspace

**Timeline**: 3 months to launch MVP
**Success Metric**: 100 workspaces created, 20% convert to expert collaboration
**Investment**: $50K (2 engineers × 3 months)

---

## Why This MVP?

### The Core Hypothesis to Validate

**Hypothesis**: Individuals will pay $29-99/month for a private workspace where AI does 80% of legal work and lawyers do 20%, resulting in 79% cost savings.

**What We Must Prove**:
1. ✅ **Individuals create workspaces** (people understand and adopt the workspace model)
2. ✅ **AI provides value without expert** (80% of cases don't need lawyer)
3. ✅ **Expert handoff works** (when AI triggers, lawyers join workspace seamlessly)
4. ✅ **Both sides pay** (individuals pay subscription, lawyers accept 10-15% platform fee)

**Why Legal (Lex) First?**
- **Highest pain point**: Legal help costs CHF 300-500/hr (prohibitively expensive)
- **Clear liability boundary**: AI researches, lawyer advises (regulatory-compliant)
- **Frequent need**: Zürich tech workers need legal help 2-3x/year (contracts, permits, stock options)
- **Quantifiable value**: Cost savings are obvious (CHF 3,000 → CHF 629)

### What Happens After MVP?

**If MVP succeeds** (100 workspaces, 20% expert conversion):
- Add Financial Workspace (RichCat) - Q2 2026
- Add Medical Workspace (Imhotep) - Q3 2026
- Scale expert marketplace - Q4 2026

**If MVP fails**:
- Pivot to B2B (law firms buy workspace for clients)
- Pivot to expert-only (no AI, just workspace for collaboration)
- Shut down and return remaining capital

---

## MVP Scope: What's IN

### 1. Legal Workspace (Lex Only)

**Individual Experience:**
```
1. Sign up → Create workspace → Name it ("My Legal Workspace")
2. Upload documents (PDFs, contracts, emails)
3. Ask questions ("Is this employment contract fair?")
4. Get AI analysis with:
   - Answer with confidence score (0-100%)
   - Citations from documents + legal embeddings
   - "Do you need a lawyer?" recommendation
5. If lawyer needed → See expert matching UI
6. Invite lawyer → Lawyer joins workspace
7. Collaborate with lawyer (chat, document review, AI assists)
```

**Lawyer Experience:**
```
1. Apply to be expert → Platform verifies credentials → Approved
2. Get matched with individual → Accept/decline workspace invite
3. Join workspace → See all context:
   - Documents uploaded by individual
   - AI analysis and recommendations
   - Individual's questions and concerns
4. Provide legal advice (chat, document annotations, video call)
5. Get paid → 90% to lawyer, 10% platform fee
```

**Core Features (MUST HAVE)**:
- ✅ User authentication (email/password, Google OAuth)
- ✅ Workspace creation (one workspace per individual for MVP)
- ✅ Document upload (PDFs, DOCX, TXT - max 10MB per file)
- ✅ AI legal analysis (RAG with 40K Zürich legal embeddings)
- ✅ Confidence scoring (0-100% with citation sources)
- ✅ Expert handoff trigger (AI determines when lawyer needed)
- ✅ Expert matching (manual for MVP - platform admin matches)
- ✅ Workspace collaboration (real-time chat, document annotations)
- ✅ Payment processing (Stripe for subscriptions + expert sessions)

### 2. Self-Hosted Deployment Option

**Why Critical for MVP?**
- **Data ownership proof**: Shows we're serious about privacy
- **Enterprise seed**: Law firms will test self-hosted before cloud
- **Regulatory compliance**: Swiss data residency laws

**Self-Hosted Features (MUST HAVE)**:
- ✅ Docker Compose deployment (runs on any Linux machine)
- ✅ Local Ollama/Llama for AI (no external API calls)
- ✅ Local Qdrant for vector DB (40K embeddings included)
- ✅ All data stays on user's hardware (no cloud dependency)
- ✅ One-command setup: `docker-compose up -d`

**Not Required for Self-Hosted MVP**:
- ❌ Kubernetes deployment (too complex for MVP)
- ❌ Multi-instance scaling (single machine is fine)
- ❌ Enterprise SSO (manual user creation is fine)

### 3. Basic Expert Marketplace

**For MVP, Expert Matching is MANUAL**:
- Platform admin reviews individual's workspace
- Admin manually matches with qualified lawyer
- Admin sends invite to both parties
- Future: AI-powered matching (post-MVP)

**Expert Onboarding (MUST HAVE)**:
- ✅ Lawyer application form (credentials, jurisdiction, specialization)
- ✅ Credential verification (manual check of BAR license, degrees)
- ✅ Profile creation (bio, hourly rate, availability)
- ✅ Payment setup (Stripe Connect for payouts)

**Expert Discovery (FUTURE - NOT MVP)**:
- ❌ Public expert directory (not needed, matching is manual)
- ❌ Reviews and ratings (too early, need volume first)
- ❌ Advanced filters (jurisdiction, specialization, budget)

### 4. Tech Stack (Locked for MVP)

**Frontend:**
- Next.js 14 (App Router) - ✅ Already using
- TypeScript - ✅ Already using
- Tailwind CSS - ✅ Already using
- Shadcn UI components - ✅ Already using

**Backend:**
- Next.js API routes - ✅ Already using
- PostgreSQL (Supabase) - ✅ Need to set up
- Qdrant (vector DB) - ✅ Need to set up

**AI/ML:**
- OpenAI GPT-4 (cloud) - ✅ Already using
- Ollama + Llama 3 (self-hosted) - ✅ Need to set up
- LangChain (RAG orchestration) - ✅ Need to add

**Payments:**
- Stripe (subscriptions + Connect for experts) - ✅ Need to set up

**Deployment:**
- Vercel (cloud) - ✅ Already using
- Docker Compose (self-hosted) - ✅ Need to create

---

## MVP Scope: What's OUT

### 1. Other Bots (Post-MVP)

**NOT in MVP:**
- ❌ Imhotep (medical) - Launch Q3 2026
- ❌ RichCat (financial) - Launch Q2 2026
- ❌ Nerd (research) - Launch Q4 2026
- ❌ Heidi (language) - Launch Q4 2026
- ❌ Artr (creative) - Launch Q4 2026
- ❌ Trident (product) - Launch Q4 2026

**Why?** Focus on proving ONE workspace works before scaling to 7.

### 2. Advanced AI Features (Post-MVP)

**NOT in MVP:**
- ❌ Multi-document cross-referencing (just analyze each doc separately)
- ❌ Legal document generation (AI drafts contracts - too risky for MVP)
- ❌ Case law prediction (AI predicts case outcomes - too complex)
- ❌ Multi-language support (English + German only for MVP)
- ❌ Voice input/output (text-only for MVP)

### 3. Advanced Expert Features (Post-MVP)

**NOT in MVP:**
- ❌ Video calls (use Zoom/Google Meet externally)
- ❌ Scheduling/calendar (experts coordinate manually)
- ❌ Invoicing (Stripe handles payments automatically)
- ❌ Expert analytics (track performance, earnings, ratings - future)
- ❌ Expert marketplace (public directory - manual matching for MVP)

### 4. Enterprise Features (Post-MVP)

**NOT in MVP:**
- ❌ White-label deployment (law firms rebrand as theirs)
- ❌ SSO/SAML integration (manual user creation for MVP)
- ❌ Advanced permissioning (workspace owner + one expert is enough)
- ❌ Audit logs (track all actions - compliance feature for later)
- ❌ Compliance certifications (SOC 2, ISO 27001 - post-revenue)

### 5. Mobile Apps (Post-MVP)

**NOT in MVP:**
- ❌ iOS app (web works on mobile for MVP)
- ❌ Android app (web works on mobile for MVP)
- ❌ Push notifications (email notifications are fine)

**Why?** Responsive web app is sufficient for MVP. Build native apps when we have product-market fit.

---

## MVP User Stories

### Individual User Stories (MUST HAVE)

**Story 1: Create Workspace and Get AI Analysis**
```
AS AN individual (Zürich tech worker)
I WANT TO create a legal workspace and upload my employment contract
SO THAT I can get AI analysis of whether the contract is fair

Acceptance Criteria:
✅ User signs up with email or Google
✅ User creates workspace with name "Employment Contract Review"
✅ User uploads PDF contract (< 10MB)
✅ AI analyzes contract and provides:
   - Summary of key terms (salary, benefits, notice period)
   - Fairness assessment with confidence score (e.g., 85%)
   - Red flags (e.g., "Non-compete clause is overly broad")
   - Citations from contract + legal embeddings
✅ AI recommends: "Consider consulting a lawyer for the non-compete clause"
```

**Story 2: Invite Expert When Needed**
```
AS AN individual who received AI recommendation to consult lawyer
I WANT TO see matched lawyers and invite one to my workspace
SO THAT I can get professional legal advice on complex issues

Acceptance Criteria:
✅ AI triggers "Lawyer recommended" in workspace
✅ User sees matched lawyer profile (bio, rate, specialization)
✅ User sends invite to lawyer
✅ Lawyer receives email notification
✅ Lawyer accepts → Joins workspace
✅ User sees "Lawyer joined workspace" notification
```

**Story 3: Collaborate with Expert**
```
AS AN individual working with a lawyer in workspace
I WANT TO chat, share documents, and get advice
SO THAT we can resolve my legal issue efficiently

Acceptance Criteria:
✅ User sends message to lawyer in workspace chat
✅ Lawyer responds with advice
✅ User uploads new document (counter-offer contract)
✅ AI re-analyzes with new context
✅ Lawyer reviews AI analysis and provides final recommendation
✅ User marks issue as resolved
✅ Lawyer access is revoked (workspace becomes private again)
```

### Expert (Lawyer) User Stories (MUST HAVE)

**Story 4: Apply and Get Verified**
```
AS A lawyer
I WANT TO apply to join Botsmann expert network
SO THAT I can serve clients who need legal help

Acceptance Criteria:
✅ Lawyer fills application form (credentials, jurisdiction, specialization)
✅ Platform admin verifies BAR license (manual check)
✅ Lawyer receives approval email
✅ Lawyer sets up Stripe Connect for payouts
✅ Lawyer profile is created (bio, rate, availability)
```

**Story 5: Get Matched and Join Workspace**
```
AS AN approved lawyer
I WANT TO receive workspace invites from individuals who need my help
SO THAT I can provide legal services efficiently

Acceptance Criteria:
✅ Platform admin matches lawyer with individual's workspace
✅ Lawyer receives email: "New workspace invite: Employment contract review"
✅ Lawyer reviews workspace context (documents, AI analysis, questions)
✅ Lawyer accepts invite → Joins workspace
✅ Individual is notified: "Lawyer joined your workspace"
```

**Story 6: Provide Advice and Get Paid**
```
AS A lawyer working in a workspace
I WANT TO provide legal advice and get paid automatically
SO THAT I can focus on the work, not admin

Acceptance Criteria:
✅ Lawyer reviews AI analysis (already done 80% of research)
✅ Lawyer provides advice via chat (5 messages)
✅ Lawyer marks work as complete
✅ Individual is charged (e.g., CHF 600 for 2 hours)
✅ Platform takes 10% fee (CHF 60)
✅ Lawyer receives CHF 540 via Stripe Connect (payout in 2 days)
```

---

## MVP Data Models (Simplified)

### Core Entities (TypeScript Interfaces)

```typescript
// User (Individual or Expert)
interface User {
  id: string;
  email: string;
  name: string;
  role: 'individual' | 'expert';
  stripeCustomerId?: string; // For subscriptions
  stripeAccountId?: string; // For experts (Stripe Connect)
  createdAt: Date;
}

// Workspace
interface Workspace {
  id: string;
  ownerId: string; // User.id
  name: string;
  domain: 'legal'; // Only legal for MVP
  status: 'active' | 'closed';
  expertId?: string; // User.id of invited expert
  createdAt: Date;
  updatedAt: Date;
}

// Document
interface Document {
  id: string;
  workspaceId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  storageUrl: string; // S3 or local path
  uploadedBy: string; // User.id
  embeddingStatus: 'pending' | 'completed' | 'failed';
  uploadedAt: Date;
}

// Message (Chat)
interface Message {
  id: string;
  workspaceId: string;
  senderId: string; // User.id or 'ai'
  content: string;
  type: 'user' | 'ai' | 'expert';
  aiMetadata?: {
    confidenceScore: number; // 0-100
    citations: { source: string; excerpt: string }[];
    expertRecommended: boolean;
  };
  createdAt: Date;
}

// Expert Profile
interface ExpertProfile {
  userId: string;
  jurisdiction: string; // e.g., "Zürich, Switzerland"
  specialization: string[]; // e.g., ["Employment Law", "Contract Law"]
  hourlyRate: number; // CHF
  credentials: {
    barLicense?: string;
    degrees?: string[];
    verifiedAt: Date;
  };
  availability: 'available' | 'busy' | 'unavailable';
  bio: string;
}

// Payment Session
interface PaymentSession {
  id: string;
  workspaceId: string;
  expertId: string;
  individualId: string;
  amount: number; // CHF
  platformFee: number; // 10% of amount
  expertPayout: number; // 90% of amount
  status: 'pending' | 'completed' | 'failed';
  stripePaymentIntentId: string;
  createdAt: Date;
}
```

### Database Schema (PostgreSQL)

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('individual', 'expert')),
  stripe_customer_id TEXT,
  stripe_account_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workspaces table
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  domain TEXT DEFAULT 'legal',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  expert_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  storage_url TEXT NOT NULL,
  uploaded_by UUID REFERENCES users(id),
  embedding_status TEXT DEFAULT 'pending' CHECK (embedding_status IN ('pending', 'completed', 'failed')),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  sender_id TEXT NOT NULL, -- UUID or 'ai'
  content TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('user', 'ai', 'expert')),
  ai_metadata JSONB, -- { confidenceScore, citations, expertRecommended }
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expert profiles table
CREATE TABLE expert_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  jurisdiction TEXT NOT NULL,
  specialization TEXT[] NOT NULL,
  hourly_rate DECIMAL(10,2) NOT NULL,
  credentials JSONB NOT NULL, -- { barLicense, degrees, verifiedAt }
  availability TEXT DEFAULT 'available' CHECK (availability IN ('available', 'busy', 'unavailable')),
  bio TEXT
);

-- Payment sessions table
CREATE TABLE payment_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  expert_id UUID REFERENCES users(id) ON DELETE CASCADE,
  individual_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,
  expert_payout DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## MVP Technical Architecture

### System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│  Next.js 14 (App Router) + TypeScript + Tailwind + Shadcn  │
│                                                             │
│  Pages:                                                     │
│  - /workspace/[id] (main workspace UI)                     │
│  - /workspace/[id]/documents                               │
│  - /workspace/[id]/chat                                    │
│  - /experts (expert discovery - manual matching)           │
│  - /dashboard (user's workspaces list)                     │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Layer                              │
│              Next.js API Routes (/api/...)                  │
│                                                             │
│  Routes:                                                    │
│  - POST /api/workspace (create workspace)                  │
│  - POST /api/workspace/[id]/documents (upload doc)         │
│  - POST /api/workspace/[id]/chat (send message to AI)      │
│  - POST /api/workspace/[id]/invite-expert                  │
│  - POST /api/experts/apply (expert application)            │
│  - POST /api/payments/create-session (Stripe payment)      │
└─────────────────────────────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
┌───────────────────────────┐   ┌──────────────────────────┐
│    PostgreSQL (Supabase)  │   │   Qdrant (Vector DB)     │
│                           │   │                          │
│  Tables:                  │   │  Collections:            │
│  - users                  │   │  - legal_embeddings      │
│  - workspaces             │   │    (40K Zürich legal)    │
│  - documents              │   │                          │
│  - messages               │   │  - document_embeddings   │
│  - expert_profiles        │   │    (user's uploaded docs)│
│  - payment_sessions       │   │                          │
└───────────────────────────┘   └──────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      AI/RAG Layer                           │
│           LangChain + OpenAI GPT-4 (cloud)                  │
│           LangChain + Ollama Llama 3 (self-hosted)          │
│                                                             │
│  Flow:                                                      │
│  1. User uploads doc → Extract text → Embed with OpenAI    │
│  2. Store embeddings in Qdrant                             │
│  3. User asks question → Embed query → Vector search       │
│  4. Retrieve top 10 chunks (doc + legal embeddings)        │
│  5. LLM generates answer with citations                    │
│  6. Calculate confidence score (0-100%)                    │
│  7. Return answer + score + "expert recommended?" flag     │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                   External Services                         │
│                                                             │
│  - Stripe (subscriptions + Connect for expert payouts)     │
│  - Supabase Storage (document storage)                     │
│  - Resend (email notifications)                            │
└─────────────────────────────────────────────────────────────┘
```

### RAG Pipeline (Legal Analysis)

```typescript
// Simplified RAG flow for MVP
async function analyzeLegalDocument(
  workspaceId: string,
  documentId: string,
  question: string
): Promise<AIResponse> {

  // 1. Embed the question
  const queryEmbedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: question
  });

  // 2. Vector search in Qdrant
  const relevantChunks = await qdrant.search({
    collection_name: "legal_embeddings",
    vector: queryEmbedding.data[0].embedding,
    limit: 5, // Top 5 from legal knowledge base
    filter: {
      must: [{ key: "jurisdiction", match: { value: "Zürich" } }]
    }
  });

  // Also search user's uploaded documents
  const documentChunks = await qdrant.search({
    collection_name: "document_embeddings",
    vector: queryEmbedding.data[0].embedding,
    limit: 5,
    filter: {
      must: [{ key: "workspace_id", match: { value: workspaceId } }]
    }
  });

  // 3. Combine context
  const context = [
    ...relevantChunks.map(c => c.payload.text),
    ...documentChunks.map(c => c.payload.text)
  ].join("\n\n");

  // 4. Generate answer with LLM
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a legal AI assistant for Zürich, Switzerland.
        Analyze the user's question based on the provided context.
        ALWAYS cite your sources.
        ALWAYS provide a confidence score (0-100%).
        If the question requires professional legal judgment, recommend consulting a lawyer.`
      },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion: ${question}`
      }
    ]
  });

  // 5. Calculate confidence score (simplified)
  const confidenceScore = calculateConfidence(
    relevantChunks,
    documentChunks,
    completion.choices[0].message.content
  );

  // 6. Determine if expert needed
  const expertRecommended = confidenceScore < 70 ||
    question.toLowerCase().includes("should i") ||
    question.toLowerCase().includes("what should i do");

  return {
    answer: completion.choices[0].message.content,
    confidenceScore,
    citations: [
      ...relevantChunks.map(c => ({ source: c.payload.source, excerpt: c.payload.text.slice(0, 100) })),
      ...documentChunks.map(c => ({ source: c.payload.fileName, excerpt: c.payload.text.slice(0, 100) }))
    ],
    expertRecommended
  };
}
```

---

## MVP Development Timeline (3 Months)

### Month 1: Foundation (Weeks 1-4)

**Week 1: Setup & Auth**
- Set up PostgreSQL (Supabase)
- Set up Qdrant (vector DB)
- Implement authentication (email + Google OAuth)
- Create user and workspace tables
- **Deliverable**: User can sign up and create workspace

**Week 2: Document Upload & Embedding**
- Implement document upload (S3/Supabase Storage)
- Build embedding pipeline (extract text → embed → store in Qdrant)
- Create documents table
- **Deliverable**: User can upload documents and they get embedded

**Week 3: RAG Pipeline**
- Load 40K Zürich legal embeddings into Qdrant
- Implement vector search logic
- Build LLM response generation with citations
- Calculate confidence scores
- **Deliverable**: User can ask questions and get AI answers with citations

**Week 4: AI Analysis UI**
- Build workspace chat interface
- Display AI responses with confidence scores
- Show "Expert recommended" flag
- **Deliverable**: User can interact with AI in workspace

### Month 2: Expert Marketplace (Weeks 5-8)

**Week 5: Expert Onboarding**
- Build expert application form
- Create expert_profiles table
- Implement credential verification (manual)
- Set up Stripe Connect for experts
- **Deliverable**: Lawyers can apply and get verified

**Week 6: Expert Matching (Manual)**
- Build admin panel for manual matching
- Implement workspace invite system
- Build expert notification emails
- **Deliverable**: Admin can match expert with workspace

**Week 7: Workspace Collaboration**
- Build real-time chat (expert + individual)
- Implement document annotations
- Add expert access controls (view only vs edit)
- **Deliverable**: Expert and individual can collaborate in workspace

**Week 8: Payments**
- Integrate Stripe (subscriptions for individuals)
- Implement Stripe Connect payouts (for experts)
- Build payment session creation
- **Deliverable**: Individuals pay subscription, experts get paid

### Month 3: Self-Hosted & Launch (Weeks 9-12)

**Week 9: Self-Hosted Deployment**
- Create Dockerfile (Next.js + PostgreSQL + Qdrant)
- Create docker-compose.yml
- Set up Ollama/Llama 3 integration
- **Deliverable**: One-command self-hosted deployment

**Week 10: Testing & Bug Fixes**
- End-to-end testing (individual flow + expert flow)
- Load testing (100 concurrent users)
- Security audit (basic SQL injection, XSS checks)
- **Deliverable**: Stable MVP ready for beta users

**Week 11: Beta Launch (Zürich Tech Workers)**
- Launch to 50 beta users (LinkedIn ads targeting)
- Monitor usage (workspaces created, AI queries, expert conversions)
- Collect feedback (user interviews, surveys)
- **Deliverable**: 50 beta users actively using MVP

**Week 12: Iterate & Prepare Scale**
- Fix critical bugs from beta
- Improve AI response quality (based on feedback)
- Optimize expert matching (reduce manual work)
- **Deliverable**: MVP ready for public launch

---

## Success Criteria (How to Know MVP Succeeded)

### Quantitative Metrics (MUST HIT)

**Primary Metrics:**
- ✅ **100 workspaces created** (proves individuals understand workspace model)
- ✅ **20% expert conversion rate** (20 workspaces → expert collaboration)
- ✅ **80% AI-only resolution** (80 workspaces resolved without expert)
- ✅ **4.0+ average workspace rating** (individuals love it)

**Secondary Metrics:**
- ✅ **50 expert applications** (lawyers want to join)
- ✅ **10 verified experts** (enough supply for 20% conversion)
- ✅ **$5K MRR** (100 users × $29/month + expert fees)
- ✅ **< 10% churn** (users stay subscribed)

### Qualitative Signals (MUST SEE)

**Individual Feedback:**
- "This is so much cheaper than hiring a lawyer!"
- "I got my answer in 5 minutes instead of waiting days."
- "The AI actually understood my contract."
- "I only needed a lawyer for 30 minutes, saved me CHF 2,000."

**Expert Feedback:**
- "The client was already prepped, I saved 2 hours of research."
- "I can take on 3x more clients now."
- "The AI does the boring stuff, I focus on judgment."
- "This is the future of legal practice."

**Platform Validation:**
- Experts apply WITHOUT cold outreach (organic growth)
- Individuals refer friends (50% come from referrals)
- Both sides renew subscriptions (< 10% churn)

### Failure Signals (RED FLAGS)

**If We See This, MVP Failed:**
- ❌ < 50 workspaces created (no product-market fit)
- ❌ < 5% expert conversion (AI not triggering handoff correctly)
- ❌ > 50% AI-only resolution (experts needed MORE than expected)
- ❌ < 3.0 average rating (poor user experience)
- ❌ No expert applications (lawyers don't see value)
- ❌ > 30% churn (users cancel after 1 month)

---

## MVP Go-to-Market (How to Get First 100 Users)

### Target Audience (Hyper-Specific for MVP)

**Who**: Tech workers in Zürich, Switzerland earning CHF 100K-300K/year

**Why This Niche?**
- High income → Can afford CHF 29-99/month
- Frequent legal needs → Employment contracts, work permits, stock options
- English-speaking → No translation needed for MVP
- Tech-savvy → Early adopters, comfortable with AI
- Concentrated → Easy to reach via LinkedIn, meetups

**Persona: "Alex the Software Engineer"**
- Age: 28-40
- Job: Software Engineer at Google/Stripe/Meta Zürich
- Salary: CHF 150K/year + stock options
- Pain: Just received complex stock option grant, doesn't understand tax implications
- Current Solution: Pays CHF 500/hr lawyer (too expensive) OR ignores problem (risky)
- Botsmann Value: CHF 29/month AI analysis + CHF 300 lawyer consult (2 hours) = CHF 629 (79% savings)

### Launch Channels (Where to Find Alex)

**Channel 1: LinkedIn Ads (Primary)**
- Target: "Software Engineer" + "Zürich" + "Google/Stripe/Meta/Tech Company"
- Budget: CHF 2,000/month
- Ad: "Got a complex employment contract? AI analyzes it in 5 min. Lawyer consults if needed. 79% cheaper than traditional legal help."
- Expected CAC: CHF 50/user
- Goal: 50 users in Month 1

**Channel 2: Tech Meetups/Slack Communities (Secondary)**
- Zürich tech meetups (react-zurich, zurich-js, google-zurich-tech-talks)
- Post in #jobs channels: "Legal help for stock options/contracts - 79% cheaper"
- Expected CAC: CHF 20/user (organic)
- Goal: 30 users in Month 1

**Channel 3: Referrals (Tertiary)**
- Referral bonus: "Refer a friend, both get 1 month free"
- Expected referral rate: 50% (every 2 users refer 1 friend)
- Expected CAC: CHF 0/user
- Goal: 20 users in Month 1

### Launch Sequence (12-Week Plan)

**Weeks 1-4: Pre-Launch (Build MVP)**
- Week 1-2: Build core workspace + AI
- Week 3-4: Build expert matching + payments

**Weeks 5-6: Private Beta (50 Users)**
- Invite 50 beta users (LinkedIn outreach)
- Offer free for 3 months
- Collect feedback via weekly surveys
- Goal: 4.0+ average rating

**Weeks 7-8: Public Launch (100 Users)**
- Launch LinkedIn ads (CHF 2,000/month)
- Post in tech communities
- Enable referral program
- Goal: 50 new users

**Weeks 9-10: Optimize & Scale**
- Fix top 5 issues from beta
- Improve AI response quality
- Optimize expert matching (reduce manual work)
- Goal: Hit 100 total users

**Weeks 11-12: Expand Expert Network**
- Recruit 10 more lawyers (manual outreach)
- Set up expert onboarding automation
- Prepare for scaling to 500 users in Q2 2026

---

## MVP Investment & Budget

### Team (3 Months)

**Engineer 1 (Fullstack - Frontend Focus)**: CHF 15K/month × 3 = CHF 45K
- Responsibilities: Workspace UI, document upload, chat interface, expert collaboration

**Engineer 2 (Fullstack - Backend Focus)**: CHF 15K/month × 3 = CHF 45K
- Responsibilities: RAG pipeline, vector DB, API, payments, self-hosted deployment

**Founder (You)**: CHF 0 (sweat equity)
- Responsibilities: Product, expert recruitment, customer support, manual matching

**Total Team Cost**: CHF 90K

### Infrastructure (3 Months)

- Vercel Pro: CHF 60/month × 3 = CHF 180
- Supabase Pro: CHF 75/month × 3 = CHF 225
- Qdrant Cloud: CHF 150/month × 3 = CHF 450
- OpenAI API: CHF 500/month × 3 = CHF 1,500
- Stripe fees: 2.9% + CHF 0.30 per transaction = ~CHF 500
- Domain + SSL: CHF 50

**Total Infra Cost**: CHF 2,905

### Marketing (3 Months)

- LinkedIn Ads: CHF 2,000/month × 3 = CHF 6,000
- Meetup sponsorships: CHF 500
- Referral bonuses: CHF 1,000
- Landing page copy/design: CHF 1,500

**Total Marketing Cost**: CHF 9,000

### Legal & Compliance (One-Time)

- Terms of Service + Privacy Policy: CHF 3,000
- Lawyer consultation (compliance review): CHF 2,000
- Business registration (Zürich): CHF 500

**Total Legal Cost**: CHF 5,500

### Total MVP Investment: CHF 107,405 (~CHF 110K)

**Runway**: 3 months to launch + 3 months to iterate = 6 months total
**Adjusted Budget**: CHF 150K (includes 40% buffer for unknowns)

---

## MVP Risks & Mitigation

### Risk 1: Not Enough Users (< 100 Workspaces)

**Probability**: Medium (30%)

**Mitigation**:
- Start outreach BEFORE MVP is done (build waitlist)
- Offer 3 months free to first 100 users
- Partner with tech companies (Google/Stripe Zürich) for distribution
- If < 50 users by Week 10 → Pivot to B2B (sell to law firms for their clients)

### Risk 2: AI Quality Too Low (< 70% Confidence)

**Probability**: Medium (30%)

**Mitigation**:
- Use GPT-4 (not GPT-3.5) for higher accuracy
- Curate 40K high-quality Zürich legal embeddings (not just scrape internet)
- Implement human-in-the-loop (lawyer reviews AI responses in beta)
- If AI quality < 70% → Reduce AI scope (only answer simple questions, trigger expert for everything else)

### Risk 3: Experts Don't Join (< 10 Verified Lawyers)

**Probability**: Low (20%)

**Mitigation**:
- Start recruiting lawyers in Week 1 (before MVP is done)
- Offer CHF 1,000 bonus to first 10 experts who join
- Show data: "Serve 3x more clients, earn same income"
- If < 5 experts by Week 8 → Pivot to expert-only (no AI, just workspace collaboration tool for lawyers)

### Risk 4: Regulatory Issues (Switzerland Prohibits AI Legal Advice)

**Probability**: Low (10%)

**Mitigation**:
- Legal review BEFORE launch (Week 1)
- Position AI as "educational tool" not "legal advisor"
- Always require human lawyer for final advice
- If regulations prohibit → Pivot to B2B (law firms use AI internally, not end-users)

### Risk 5: Self-Hosted Deployment Too Complex

**Probability**: Medium (30%)

**Mitigation**:
- Simplify to `docker-compose up -d` (one command)
- Provide video walkthrough for setup
- Offer managed self-hosted (we deploy on their hardware for CHF 500/month)
- If too complex → Drop self-hosted for MVP, add post-launch

---

## Post-MVP Roadmap (If MVP Succeeds)

### Q2 2026: Add Financial Workspace (RichCat)

**Why Next?**
- Same target audience (Zürich tech workers need tax/investment help)
- 5M financial embeddings already curated
- Higher AOV (financial advice worth more than legal)

**Metrics**:
- 500 total workspaces (400 legal + 100 financial)
- 50 experts (30 lawyers + 20 financial advisors)
- $50K MRR

### Q3 2026: Add Medical Workspace (Imhotep)

**Why Next?**
- Different audience (chronic condition patients)
- 14.3M medical embeddings (largest knowledge base)
- Recurring revenue (chronic care = ongoing need)

**Metrics**:
- 2,000 total workspaces (400 legal + 100 financial + 1,500 medical)
- 200 experts (30 lawyers + 20 advisors + 150 doctors)
- $150K MRR

### Q4 2026: Scale Expert Marketplace

**Features**:
- AI-powered expert matching (no manual admin)
- Public expert directory (users browse and choose)
- Reviews and ratings (social proof)
- Advanced filters (jurisdiction, specialization, budget, availability)

**Metrics**:
- 10,000 total workspaces
- 500 experts across 7 domains
- $1M ARR (Year 1 target hit)

---

## Key Decisions Log (Why We Chose This Approach)

### Decision 1: Why Legal First (Not Medical or Financial)?

**Options Considered**:
1. Legal (Lex)
2. Medical (Imhotep)
3. Financial (RichCat)

**Decision**: Legal (Lex)

**Rationale**:
- **Highest pain point**: Legal costs CHF 300-500/hr (vs medical CHF 200/hr, financial CHF 150/hr)
- **Clear liability boundary**: AI researches, lawyer advises (regulatory-compliant)
- **Target audience fit**: Zürich tech workers need legal help 2-3x/year (contracts, permits, stock options)
- **Proof of concept**: If we can do legal (highest risk), we can do all domains

### Decision 2: Why Manual Expert Matching (Not AI-Powered)?

**Options Considered**:
1. AI-powered matching (algorithm matches individual with best expert)
2. Manual matching (admin reviews and matches)
3. Self-serve (individual browses expert directory and chooses)

**Decision**: Manual matching for MVP

**Rationale**:
- **Speed to market**: Manual matching takes 1 week to build, AI matching takes 4 weeks
- **Quality control**: Human ensures good matches (critical for first 100 users)
- **Learn patterns**: Manual matching teaches us what "good match" means → Train AI later
- **Low volume**: 20 expert conversions in MVP = 20 manual matches (manageable)

**Post-MVP**: Switch to AI-powered matching when we hit 100+ matches/month.

### Decision 3: Why Self-Hosted Option (Not Cloud-Only)?

**Options Considered**:
1. Cloud-only (Vercel + Supabase + Qdrant Cloud)
2. Self-hosted only (Docker Compose, all local)
3. Both (cloud + self-hosted)

**Decision**: Both (cloud + self-hosted)

**Rationale**:
- **Enterprise seed**: Law firms will ONLY test if self-hosted (data residency laws)
- **Privacy proof**: Shows we're serious about data ownership
- **Differentiation**: No competitor offers both (Clio = cloud-only, LawLytics = self-hosted only)
- **Revenue**: Self-hosted opens B2B revenue (white-label for law firms at CHF 500/seat/month)

**Trade-off**: More engineering work (2 deployment models), but worth it for enterprise market.

### Decision 4: Why 10% Platform Fee (Not 20% or 50%)?

**Options Considered**:
1. 50% (UpWork model)
2. 20% (Stripe model)
3. 10% (Botsmann model)

**Decision**: 10% platform fee

**Rationale**:
- **Expert value prop**: AI does 80% of work → Experts earn more per hour → Lower fee justified
- **Competitive**: 10% vs 50% (UpWork) = 5x better for experts → Network effects
- **Volume play**: Lower fee → More experts join → More individuals → More revenue
- **Math works**: 10% of CHF 600 = CHF 60 per session × 1,000 sessions/month = CHF 60K/month

**Post-MVP**: May increase to 15% if unit economics don't work, but 10% is our target.

---

## Document Status

**Status**: ✅ Complete
**Last Updated**: October 2025
**Next Review**: After MVP launch (Q2 2026)

**AI-Buildable Checklist**:
- ✅ Clear scope (what's in MVP, what's out)
- ✅ User stories with acceptance criteria
- ✅ Data models (TypeScript interfaces + SQL schema)
- ✅ Technical architecture (system diagram + RAG pipeline)
- ✅ Development timeline (12-week plan with deliverables)
- ✅ Success criteria (quantitative + qualitative)
- ✅ Go-to-market plan (target audience, channels, launch sequence)
- ✅ Budget breakdown (team, infra, marketing, legal)
- ✅ Risk mitigation (5 key risks with plans)
- ✅ Post-MVP roadmap (Q2-Q4 2026)
- ✅ Decision log (why we chose this approach)

**AI Can Now Build**:
1. Database schema (copy SQL from "MVP Data Models")
2. API endpoints (follow architecture diagram)
3. RAG pipeline (copy TypeScript from "RAG Pipeline")
4. Frontend UI (follow user stories for acceptance criteria)
5. Self-hosted deployment (Docker Compose with Postgres + Qdrant + Ollama)

**What AI Still Needs**:
- DATA_MODELS.md (complete schemas for all 7 bots - not just legal)
- WORKSPACE_IMPLEMENTATION_GUIDE.md (step-by-step: DB → API → UI → RAG)
- EXPERT_MARKETPLACE_GUIDE.md (expert onboarding, matching algorithm, payment flow)
- RAG_IMPLEMENTATION_GUIDE.md (vector DB setup, embedding pipeline, LLM integration)
