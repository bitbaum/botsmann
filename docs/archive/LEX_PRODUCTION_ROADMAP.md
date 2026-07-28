# Lex - Legal Bot Production Roadmap

**Goal**: Make Lex (Legal Expert) fully functional with real AI, document processing, and user interactions

**Current Status**: Polished demo with mock data → **Target**: Production-ready legal AI assistant

**Timeline**: 4-6 weeks to MVP → 8-12 weeks to full v1.0

---

## Executive Summary

### What We Have ✅

- **Beautiful UI**: 4-step wizard, data room interface, jurisdiction selector (130+ jurisdictions)
- **Core Infrastructure**: RAG system, vector search, document processing, LLM integration
- **Custom Bots API**: `/api/custom-bots/[id]/chat` with knowledge base support
- **Database**: Supabase with `custom_bots`, `bot_knowledge_chunks` tables ready
- **Mock Data**: Legal areas, lawyer profiles, file categories, sample conversations

### What We Need ❌

- **Backend Integration**: Connect frontend to real APIs
- **Legal Knowledge Base**: Seed with legal domain knowledge
- **Document Intelligence**: Legal-specific document analysis
- **Real Chat**: Replace mock responses with LLM
- **User Accounts**: Case management, document storage
- **Jurisdiction Logic**: Legal rules per region (optional for MVP)

### The Gap

**Engineering effort**: ~160-240 hours (4-6 weeks for 1 developer, 2-3 weeks for 2 developers)

---

## Phase 1: Backend Integration (MVP) - 2 weeks

**Goal**: Make Lex work end-to-end without lawyers, just AI + user

### Week 1: Core Chat Functionality

#### 1.1 Create Lex Custom Bot Instance (4 hours)

**File**: `lib/seeds/lex-bot-seed.ts`

```typescript
// Seed script to create Lex bot in database
const LEX_BOT = {
  slug: 'lex',
  title: 'Lex - AI Legal Assistant',
  description: 'Your AI-powered legal companion',
  emoji: '⚖️',
  accent_color: 'blue',
  system_prompt: `You are Lex, an AI legal assistant helping users understand their legal situations.

IMPORTANT GUIDELINES:
- You are NOT a lawyer and cannot provide legal advice
- Always recommend consulting a licensed attorney for legal decisions
- Provide general legal information and education
- Help users understand legal concepts and procedures
- Analyze documents for informational purposes only
- Be clear about limitations and disclaimers

CAPABILITIES:
- Explain legal concepts in plain language
- Identify key clauses in contracts
- Outline general procedures for common legal matters
- Help organize legal documents
- Provide information about jurisdiction-specific rules

TONE: Professional, helpful, clear. Avoid legalese. Be empathetic.`,
  is_public: true,
  is_published: true,
  nav_config: {
    /* copy from data/bots.ts */
  },
};
```

**Tasks**:

- [ ] Create migration script to seed Lex bot
- [ ] Add environment variable `LEX_BOT_ID` for reference
- [ ] Test bot creation via API

**Acceptance Criteria**:

- Lex bot exists in `custom_bots` table
- Can query via `/api/custom-bots/[lex-id]`

---

#### 1.2 Replace Mock Chat with Real API (8 hours)

**Files**:

- `app/bots/legal-expert/components/demo/DataRoomDemo.tsx`
- `app/bots/legal-expert/hooks/useLexChat.ts` (new)

**Current**: Mock responses based on keywords

```typescript
const getSmartResponse = (input: string): string => {
  if (lower.includes('contract')) {
    return "I see you're asking about..."; // HARDCODED
  }
};
```

**Target**: Real API integration

```typescript
// hooks/useLexChat.ts
export function useLexChat(botId: string) {
  const sendMessage = async (message: string) => {
    const response = await fetch(`/api/custom-bots/${botId}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, contextSize: 5 }),
    });
    return response.json();
  };

  return { sendMessage, isLoading, error };
}
```

**Tasks**:

- [ ] Create `useLexChat` React hook
- [ ] Replace mock chat logic in `DataRoomDemo.tsx`
- [ ] Add loading states (typing indicator)
- [ ] Handle errors gracefully
- [ ] Test with real LLM (Groq free tier)

**Acceptance Criteria**:

- User can type message → get real AI response
- Typing indicators work
- Error messages display properly

---

#### 1.3 Document Upload Integration (6 hours)

**Files**:

- `app/bots/legal-expert/components/demo/FileUploader.tsx`
- `app/bots/legal-expert/hooks/useDocumentUpload.ts` (new)

**Current**: Files stored in React state, not processed
**Target**: Upload to Supabase Storage → Process → Add to bot knowledge

```typescript
// Flow
User uploads PDF →
  Supabase Storage (/legal-docs/{userId}/{caseId}/{filename}) →
  POST /api/custom-bots/[lex-id]/knowledge →
  Extract text, chunk, embed →
  Store in bot_knowledge_chunks →
  Available for RAG chat
```

**Tasks**:

- [ ] Create hook for file upload to Supabase Storage
- [ ] Connect to `/api/custom-bots/[id]/knowledge` endpoint
- [ ] Show upload progress
- [ ] Display processing status
- [ ] Auto-categorize files (use LLM to suggest category)

**Acceptance Criteria**:

- User uploads PDF/DOCX → file is stored
- File content is chunked and embedded
- Lex can answer questions about uploaded document

---

### Week 2: Case Management & Workflow

#### 1.4 Case Context System (8 hours)

**File**: `app/bots/legal-expert/lib/caseContext.ts` (new)

**Problem**: Each user may have multiple legal cases
**Solution**: Create "case" concept that groups documents + chat history

```typescript
interface LegalCase {
  id: string;
  user_id: string;
  bot_id: string; // Always lex
  jurisdiction: string; // From jurisdiction selector
  legal_area: string; // From intake form
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  created_at: Date;
  updated_at: Date;
}
```

**New Table**: `legal_cases`

**Tasks**:

- [ ] Create migration for `legal_cases` table
- [ ] Add API route `POST /api/legal-cases`
- [ ] Modify intake form to create case on submit
- [ ] Associate uploaded docs with case
- [ ] Modify chat to include case context in system prompt

**Acceptance Criteria**:

- User completes intake → case created in DB
- Documents linked to case
- Chat knows case context (jurisdiction, legal area, docs)

---

#### 1.5 Jurisdiction-Aware Prompts (6 hours)

**File**: `lib/legal/jurisdictionPrompts.ts`

**Simple version**: Add jurisdiction to system prompt

```typescript
const getJurisdictionPrompt = (jurisdiction: string) => {
  // US States
  if (jurisdiction.startsWith('US/')) {
    return `Note: This case involves ${jurisdiction} law. Be aware of state-specific variations.`;
  }

  // EU Countries
  if (jurisdiction.startsWith('EU/')) {
    return `Note: This case involves EU law and ${jurisdiction} national law. EU directives and regulations may apply.`;
  }

  // Switzerland (cantons)
  if (jurisdiction.startsWith('CH/')) {
    return `Note: Swiss law applies, specifically ${jurisdiction} cantonal law. Switzerland is not in the EU.`;
  }

  return `Note: This case involves ${jurisdiction} law.`;
};
```

**Tasks**:

- [ ] Map jurisdictions to legal system types (common law, civil law, etc.)
- [ ] Add jurisdiction context to system prompt
- [ ] Simple disclaimer based on jurisdiction
- [ ] Test with different jurisdictions

**Acceptance Criteria**:

- Chat responses acknowledge jurisdiction
- Appropriate disclaimers based on region

---

#### 1.6 Authentication Integration (8 hours)

**Files**: Multiple

**Current**: Demo works without login
**Target**: Require auth for document upload, case creation

**Tasks**:

- [ ] Add auth check to legal bot page
- [ ] Redirect to login if user tries to upload docs
- [ ] Show "Sign in to save your case" message
- [ ] Allow anonymous demo chat (no doc upload)
- [ ] Associate cases with user_id after login

**Acceptance Criteria**:

- Anonymous users can chat (no memory)
- Logged-in users can upload docs and save cases
- Smooth login redirect flow

---

## Phase 2: Legal Intelligence (Weeks 3-4)

### 2.1 Legal Knowledge Base Seeding (12 hours)

**Goal**: Pre-load Lex with legal knowledge so it's useful without user documents

**Knowledge Sources** (free/public):

1. **US**: Cornell LII (Legal Information Institute) - free legal encyclopedia
2. **EU**: EUR-Lex - EU law database (public domain)
3. **Switzerland**: Federal Act Compilation (public)
4. **General**: Nolo.com legal guides (with attribution)

**Approach**:

```bash
# Create knowledge ingestion script
node scripts/seed-legal-knowledge.js

# Topics to seed (start small):
- Contract law basics
- Employment law (wrongful termination, discrimination)
- Family law (divorce, custody)
- Immigration (visa types, process)
- Landlord-tenant law
```

**Tasks**:

- [ ] Create script to fetch and chunk legal articles
- [ ] Add to `bot_knowledge_chunks` with topic tags
- [ ] Test: "What is a non-compete agreement?" should give good answer
- [ ] Seed ~50-100 high-quality chunks to start

**Acceptance Criteria**:

- Lex can answer common legal questions without user docs
- Responses cite sources (e.g., "According to [source]...")

---

### 2.2 Document Intelligence (16 hours)

**Goal**: Analyze uploaded legal documents automatically

#### Features:

1. **Key Clause Extraction**: Identify important terms (parties, dates, obligations)
2. **Document Type Detection**: Contract, complaint, motion, evidence, etc.
3. **Risk Flagging**: Unusual terms, missing clauses
4. **Auto-Categorization**: Map to FILE_CATEGORIES

**Implementation**:

```typescript
// After document upload, trigger analysis
POST / api / legal -
  cases /
    [id] /
    documents /
    [docId] /
    analyze
    // LLM prompt
    `Analyze this legal document and extract:
1. Document type (contract, complaint, motion, etc.)
2. Key parties (names, roles)
3. Important dates and deadlines
4. Financial terms (amounts, payment terms)
5. Obligations and restrictions
6. Potential risks or unusual clauses
7. Suggested category (evidence, contract, etc.)

Document text:
{document_text}`;
```

**Tasks**:

- [ ] Create document analysis API endpoint
- [ ] Design analysis prompt template
- [ ] Store analysis results in database (`document_analysis` table)
- [ ] Display in UI (replace mock "AI Insights")
- [ ] Add "Re-analyze" button

**Acceptance Criteria**:

- Upload contract → see parties, dates, key terms extracted
- Upload evidence → categorized correctly
- Analysis shown in workspace UI

---

### 2.3 Smart File Categorization (6 hours)

**Current**: Mock categories in `constants.ts`
**Target**: LLM-powered categorization

```typescript
// After upload
const category = await categorizeLegalDocument(fileText, fileName);

// Store in database
UPDATE legal_case_documents
SET category = category.id,
    category_confidence = category.confidence
WHERE id = docId;
```

**Tasks**:

- [ ] Create LLM categorization function
- [ ] Add confidence scores
- [ ] Allow manual override
- [ ] Show in file list with category badge

**Acceptance Criteria**:

- Files auto-categorized with >80% accuracy
- User can change category manually

---

## Phase 3: User Experience Polish (Weeks 5-6)

### 3.1 Case Dashboard (10 hours)

**New Page**: `/legal/cases` (or `/bots/legal-expert/cases`)

**Features**:

- List all user's legal cases
- Filter by status, legal area, jurisdiction
- Quick stats (open cases, documents uploaded, etc.)
- "Create New Case" button → intake form

**Tasks**:

- [ ] Create case list page
- [ ] API endpoint `GET /api/legal-cases` (user's cases)
- [ ] Card layout with case summary
- [ ] Click to open case → data room view

**Acceptance Criteria**:

- User sees all their cases
- Can navigate to any case
- Stats are accurate

---

### 3.2 Multi-Case Chat Context (8 hours)

**Problem**: Chat currently has no memory across sessions
**Solution**: Store chat history per case

**New Table**: `legal_case_messages`

```sql
CREATE TABLE legal_case_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES legal_cases(id),
  sender VARCHAR(10) CHECK (sender IN ('user', 'ai', 'lawyer')),
  content TEXT NOT NULL,
  metadata JSONB, -- attachments, analysis results, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Tasks**:

- [ ] Create table migration
- [ ] Save messages on send
- [ ] Load chat history when opening case
- [ ] Include recent history in LLM context (last 5 messages)

**Acceptance Criteria**:

- Close and reopen case → chat history persists
- Lex references earlier conversation

---

### 3.3 Export & Sharing (6 hours)

**Features**:

1. **Export case summary**: PDF with docs + chat transcript
2. **Share with lawyer**: Generate read-only link

**Tasks**:

- [ ] Create PDF export (use `jsPDF` or similar)
- [ ] "Export Case" button in data room
- [ ] Share link generation (UUID token)
- [ ] Public view page for shared cases

**Acceptance Criteria**:

- User can export case as PDF
- Share link works for external viewing

---

### 3.4 Mobile UX Improvements (8 hours)

**Current**: Already mobile-first, but needs testing
**Tasks**:

- [ ] Test on real devices (iOS, Android)
- [ ] Fix any layout issues
- [ ] Optimize file upload for mobile
- [ ] Add touch gestures (swipe between tabs)
- [ ] PWA configuration (manifest.json, offline support)

**Acceptance Criteria**:

- Works smoothly on iPhone/Android
- Can upload files from mobile
- Install as PWA

---

## Phase 4: Advanced Features (Weeks 7-12) - POST-MVP

### 4.1 Lawyer Integration (if desired) (20 hours)

**Two approaches**:

#### Option A: Manual Lawyer Onboarding

- Admin panel to add lawyer profiles
- Lawyers get accounts, set availability
- Manual matching or user selects from list

#### Option B: AI-Only (No Real Lawyers)

- Remove lawyer matching step
- Lex is purely AI assistant
- Recommend lawyer separately (external referral)

**Recommendation**: Start with Option B, add lawyers later if needed

---

### 4.2 Jurisdiction-Specific Rules Engine (40 hours)

**Goal**: Deep legal knowledge per jurisdiction

**Scope** (too large for MVP):

- Statutes and case law databases
- Jurisdiction-specific workflows
- Form generation (complaints, motions, etc.)
- Court filing integration

**Status**: Future roadmap

---

### 4.3 E-Signatures & Document Generation (24 hours)

**Features**:

- Generate legal documents from templates
- E-signature integration (DocuSign, HelloSign)
- Form filling assistance

**Status**: Post-MVP

---

## Implementation Strategy

### Sprint Planning

#### Sprint 1 (Week 1): Chat Works

- Day 1-2: Bot seeding, API integration setup
- Day 3-4: Real chat with LLM
- Day 5: Document upload integration

**Demo**: Upload document, ask question, get answer

---

#### Sprint 2 (Week 2): Case Management

- Day 1-2: Case creation system
- Day 3-4: Jurisdiction prompts, auth integration
- Day 5: Testing & bug fixes

**Demo**: Complete intake form → create case → chat with context

---

#### Sprint 3 (Week 3): Legal Intelligence

- Day 1-3: Knowledge base seeding
- Day 4-5: Document analysis

**Demo**: Lex answers legal Q&A, analyzes uploaded contract

---

#### Sprint 4 (Week 4): Document Intelligence

- Day 1-3: Smart categorization
- Day 4-5: Enhanced analysis features

**Demo**: Upload various doc types → auto-categorized → key info extracted

---

#### Sprint 5-6 (Weeks 5-6): UX Polish

- Case dashboard
- Chat persistence
- Export/sharing
- Mobile optimization

**Demo**: Full user journey from signup to case management

---

## Technical Debt & Risks

### 1. LLM Accuracy ⚠️

**Risk**: AI gives incorrect legal info
**Mitigation**:

- Strong disclaimers everywhere
- Cite sources when possible
- Flag low-confidence responses
- User feedback mechanism

### 2. Document Processing Performance 🐌

**Risk**: Large PDFs take too long to process
**Mitigation**:

- Async processing with status updates
- Chunk size optimization
- Warm-up endpoint (already exists)
- Consider external service (AWS Textract) for complex PDFs

### 3. Cost Control 💰

**Risk**: LLM API costs spike with usage
**Mitigation**:

- Use Groq free tier (14,400 req/day)
- Fallback to local embeddings (already using Transformers.js)
- Rate limiting per user
- Consider usage caps

### 4. Legal Liability ⚖️

**Risk**: Users rely on Lex for legal decisions
**Mitigation**:

- Prominent disclaimers
- ToS clearly states "not legal advice"
- Recommend consulting lawyer frequently
- Insurance (E&O insurance for tech companies)

---

## Definition of Done (MVP)

### Must-Have for Launch ✅

- [ ] User can create account
- [ ] User can start new legal case (intake form)
- [ ] User can upload documents (PDF, DOCX)
- [ ] Lex answers questions about uploaded docs
- [ ] Lex has pre-seeded legal knowledge
- [ ] Chat history persists per case
- [ ] Documents are analyzed (key info extracted)
- [ ] Works on mobile
- [ ] Disclaimers on every page
- [ ] Privacy policy updated for legal docs
- [ ] Terms of service clear about "not legal advice"

### Nice-to-Have for Launch ⚠️

- [ ] Case dashboard with all cases
- [ ] Export case as PDF
- [ ] Share case via link
- [ ] Multiple jurisdiction support tested
- [ ] Lawyer integration (if doing Option A)

### Post-Launch 📅

- [ ] Form generation
- [ ] E-signatures
- [ ] Court filing integration
- [ ] Multi-language support
- [ ] Blockchain audit trail

---

## Resource Requirements

### Team

**Minimum**: 1 full-stack developer + 1 designer (part-time for polish)
**Optimal**: 2 developers (1 backend-focused, 1 frontend-focused)

### Time Estimates

- **MVP (Phases 1-2)**: 4 weeks (1 dev) or 2-3 weeks (2 devs)
- **Polished v1.0 (Phases 1-3)**: 6 weeks (1 dev) or 3-4 weeks (2 devs)
- **Full Feature Set (All phases)**: 12+ weeks

### Infrastructure Costs (Monthly)

- **Supabase**: Free tier (upgrade at ~50k users)
- **Vercel**: Free tier (upgrade at scale)
- **LLM**: Groq free tier → ~$50/month at scale
- **Storage**: ~$5-20/month (depends on doc volume)

**Total**: ~$0-100/month for MVP launch

---

## Success Metrics

### Phase 1 (MVP)

- 10+ beta users testing
- 50+ documents uploaded
- 200+ chat messages exchanged
- <5s response time
- 90% uptime

### Phase 2 (3 months post-launch)

- 100+ active users
- 500+ cases created
- 80%+ user satisfaction
- 50%+ return usage rate

### Phase 3 (6 months)

- 1,000+ users
- Revenue model established (if monetizing)
- Lawyer partnerships (if going that route)
- Expansion to new jurisdictions

---

## Next Steps (This Week)

### For Engineering

1. **Read this roadmap** thoroughly
2. **Review existing code**:
   - `/app/api/custom-bots/[id]/chat/route.ts`
   - `/app/bots/legal-expert/components/demo/`
   - `/lib/embeddings.ts`, `/lib/llm-client.ts`
3. **Set up development**:
   - Ensure local dev environment works
   - Test Groq API key
   - Verify Supabase connection
4. **Create Sprint 1 tasks** in your project management tool

### For Product

1. **Prioritize features**: Review roadmap, adjust priorities
2. **Write PRD** for Phase 1 (if needed)
3. **Plan beta user recruitment**
4. **Review legal disclaimers** with legal counsel

### For Business

1. **Legal review**: ToS, Privacy Policy, Disclaimers
2. **Insurance**: Research E&O insurance for legal tech
3. **Go-to-market**: Plan beta launch strategy
4. **Partnerships**: Decide on lawyer integration (Option A vs B)

---

## Questions to Resolve

1. **Lawyer Integration**: Yes or No for MVP?
   - **Recommendation**: No. AI-only for MVP. Add lawyers in Phase 4.

2. **Monetization**: Free, Freemium, or Paid?
   - **Options**:
     - Free beta (gather feedback)
     - Freemium (3 cases free, unlimited = $9.99/mo)
     - Pay-per-case ($5-10 per case)

3. **Jurisdiction Scope**: Which regions to support first?
   - **Recommendation**: Start US-only, add EU + Switzerland in Phase 3

4. **Document Types**: Which to support?
   - **MVP**: PDF, DOCX, TXT
   - **Later**: Images (OCR), Audio (transcripts)

5. **Compliance**: GDPR? HIPAA? Attorney-client privilege?
   - **Action**: Legal review required before launch

---

## Conclusion

**Lex has incredible potential.** The UI is already polished and the backend infrastructure exists. The gap is integration work, not greenfield development.

**Realistic Timeline**:

- **4 weeks** to functional MVP (AI legal assistant with doc upload)
- **6 weeks** to polished v1.0 (case management, intelligence features)
- **12 weeks** to full vision (all advanced features)

**Critical Path**:
Week 1 → Real chat working
Week 2 → Case management
Week 3-4 → Legal intelligence
Week 5-6 → UX polish

**First Milestone**: End of Week 1, demo real chat with document upload.

---

**Ready to build?** Start with Sprint 1, Day 1: Seed Lex bot in database.

---

_Roadmap created: 2026-01-19_
_Status: Ready for development_
_Next review: After Sprint 1_
