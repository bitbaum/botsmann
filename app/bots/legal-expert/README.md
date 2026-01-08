# Lex - AI Legal Assistant

## Overview

Lex is an AI-powered legal assistant designed to democratize access to legal services. The platform combines AI-driven case analysis with lawyer matching, creating a seamless experience from initial consultation to case resolution. Lex is **not** a lawyer-finding tool; it's an AI legal advisor first, with lawyer connections as a secondary option after AI analysis.

## Core Value Proposition

**Primary Goal:** Provide AI-powered legal analysis and advice to help users understand their legal situation before connecting them with lawyers.

**Secondary Goal:** If users need human legal representation, match them with the most suitable lawyers based on their case analysis.

## Key Features

### 1. AI Case Analysis
- **Intelligent Intake**: Collects case details through a conversational interface
- **Legal Area Classification**: Automatically categorizes cases (immigration, employment, family law, etc.)
- **Jurisdiction-Aware**: Currently supports Zürich (federal + cantonal law) and California
- **AI Legal Analysis**: Provides preliminary legal assessment, relevant laws, and case strategy
- **Risk Assessment**: Identifies potential challenges and outcomes

### 2. Lawyer Matching (Secondary Feature)
- **Smart Matching Algorithm**: Connects users with lawyers based on case type, jurisdiction, and specialization
- **Transparent Pricing**: Shows consultation, hourly, and fixed-fee options
- **Urgency Handling**: Prioritizes urgent cases
- **Budget Considerations**: Matches based on user's budget preferences

### 3. Collaborative Workspace (The Botsmann Model)

**The workspace is where individuals, AI, and human experts collaborate to solve legal problems.**

#### How It Works: 80/20 Split

**AI Does (80% of the work):**
- Legal research across 40-120K legal embeddings
- Contract analysis and clause review
- Case law search and precedent identification
- Document preparation and review
- Legal calculations (damages, timelines, deadlines)
- Ongoing case monitoring and updates

**Lawyer Does (20% of the work - Liability Management):**
- Complex legal judgment and strategy
- Court representation and litigation
- Final review of critical documents
- Regulatory compliance edge cases
- Negotiation and settlement discussions
- Professional liability management

#### Workspace Lifecycle

**Phase 1: Individual + AI (Most Cases)**
1. Individual uploads contracts, documents, correspondence to their private workspace
2. AI analyzes with domain expertise (RAG with legal embeddings)
3. AI provides legal guidance with citations and confidence scores
4. AI determines if human lawyer needed

**Phase 2: Adding Lawyer (When Needed)**
1. AI identifies required expertise (e.g., "employment lawyer in Zürich")
2. Individual invites lawyer to workspace with granular access control
3. Lawyer sees all context (documents, AI analysis, questions)
4. Lawyer focuses on complex issues AI flagged (no need to start from scratch)

**Phase 3: Ongoing Collaboration**
- Individual uploads updates (new contract version, court documents)
- AI re-analyzes with new information
- Lawyer reviews changes and provides guidance
- All communication in one secure workspace

#### Privacy & Data Ownership

Individual owns all data with three deployment options:
- **Self-Hosted**: All data on individual's hardware, AI runs locally (Ollama/Llama)
- **Cloud Encrypted**: AES-256 encryption, individual holds keys, zero-knowledge architecture
- **Enterprise**: Law firms can host for clients with VPC isolation, compliance certifications

#### Cost Savings Example

**Traditional Model:** Lawyer does everything (100% of work)
- Cost: CHF 300/hr × 10 hours = CHF 3,000

**Botsmann Workspace Model:** AI does routine (80%), lawyer does judgment (20%)
- AI Cost: CHF 29/month
- Lawyer Cost: CHF 300/hr × 2 hours = CHF 600
- **Total: CHF 629 vs CHF 3,000 (79% savings)**

**Benefits:**
- 90% cost reduction for individuals
- 3x more clients for lawyers (AI does prep)
- Better outcomes (AI speed + human judgment)

## Current Jurisdictions

### Zürich, Switzerland
- **Coverage**: Federal Law + Cantonal Law (Zürich)
- **Legal Areas**: Immigration, Employment, Family Law, Business Law, Real Estate, Tax
- **Status**: Active
- **Note**: We're starting with these two jurisdictions and will expand based on demand

### California, USA
- **Coverage**: State Law + Federal Law
- **Legal Areas**: Immigration, Employment, Family Law, Business Law, Real Estate, Tax
- **Status**: Active

### Expansion
Users can request new jurisdictions through the platform. Requests are prioritized based on demand.

## Demo Flow

**Dedicated Demo Page:** `/bots/legal-expert/demo`

The demo is now on a separate page for better performance and focus. Benefits:
- **Faster main page load**: Landing page is lightweight and loads instantly
- **Focused experience**: Demo page provides distraction-free interactive experience
- **Better SEO**: Separate pages can be optimized for different keywords
- **Cleaner code**: Main page and demo page have distinct purposes

### Demo Workflow

The demo showcases the complete Lex experience in 4 steps:

1. **Case Intake** (Step 1)
   - User describes their legal situation
   - Selects case type (personal/business)
   - Chooses legal area
   - Progressive disclosure: jurisdiction, urgency, budget shown as optional next step
   - **No character limits on typing** - removed to reduce bounce rate

2. **AI Analysis** (Step 2)
   - Lex analyzes the case using AI
   - Provides legal assessment
   - Identifies relevant laws and precedents
   - Suggests case strategy
   - Shows risk factors

3. **Lawyer Matching** (Step 3)
   - Displays top 3 matched lawyers
   - Shows match reasoning
   - Displays pricing options
   - Allows user to select lawyer or continue with AI-only

4. **Workspace** (Step 4)
   - Preview of collaborative data room
   - Shows both client and lawyer perspectives
   - Demonstrates document sharing and case management

## File Structure

```
legal-expert/
├── page.tsx                          # Main landing page
├── demo/
│   └── page.tsx                      # Standalone demo page
├── styles.css                        # Custom styles
├── README.md                         # This documentation
└── components/
    ├── hero/                         # Landing section
    ├── disclaimer/                   # Legal disclaimer
    ├── demo/                         # Interactive demo components
    │   ├── DemoOrchestrator.tsx     # Main demo flow controller
    │   ├── CaseIntakeForm.tsx       # Step 1: Case details
    │   ├── AICaseAnalysis.tsx       # Step 2: AI analysis
    │   ├── LawyerMatcher.tsx        # Step 3: Lawyer matching
    │   └── WorkspaceDashboard.tsx   # Step 4: Workspace preview
    ├── features/                     # Feature highlights
    ├── testimonials/                 # User testimonials
    ├── vision/                       # Vision and roadmap
    ├── tech/                         # Technology stack
    ├── cta/                          # Call to action
    └── workspace/                    # Workspace types and constants
        ├── types.ts                  # TypeScript interfaces
        └── constants.ts              # Legal areas and jurisdictions
```

## Current Status

**⚠️ Proof of Concept Stage**

Lex is currently a UI/UX prototype demonstrating the intended user experience. The demo uses mock data and simulated AI responses to show how the system will work once fully implemented.

**What Works Now:**
- ✅ Complete UI/UX flow (intake → analysis → matching → workspace)
- ✅ Jurisdiction-aware interface (Zürich, California)
- ✅ Interactive demo showing intended functionality
- ✅ Responsive design and accessibility features

**What's Coming (Q2-Q3 2026):**
- ⏳ Real AI integration with GPT-4 API
- ⏳ Vector search over legal knowledge bases
- ⏳ RAG (Retrieval-Augmented Generation) pipeline
- ⏳ Real-time case analysis with legal citations
- ⏳ Lawyer matching algorithm based on actual case data

## Technical Implementation Plan

This section details exactly how Lex will be built as a production-ready AI legal assistant.

### AI Architecture (Planned)

```
User Query
    ↓
Intake Form → Case Data Extraction (GPT-4)
    ↓
Jurisdiction Detection → Legal Domain Classification
    ↓
Vector Embedding (text-embedding-3-large)
    ↓
Vector Search → Retrieve Relevant Legal Documents
    ↓
RAG Pipeline → GPT-4 with Legal Context
    ↓
Legal Analysis + Citations → User Response
```

### Core AI Components

#### 1. Legal Knowledge Base Construction

**Data Sources:**
- Zürich: Swiss Federal Code, Zürich Cantonal Laws, Swiss Federal Supreme Court rulings
- California: California Civil Code, California Penal Code, California case law, federal statutes

**Preprocessing Pipeline:**
```typescript
// Example: Legal document preprocessing
async function processLegalDocument(doc: LegalDocument) {
  // 1. Extract text and metadata
  const { text, statute, jurisdiction, date } = doc;

  // 2. Chunk into semantic sections (500-1000 tokens)
  const chunks = await semanticChunker.split(text, {
    maxTokens: 800,
    overlapTokens: 100,
    preserveSections: true // Keep statute sections intact
  });

  // 3. Generate embeddings
  const embeddings = await openai.embeddings.create({
    model: 'text-embedding-3-large', // 3072 dimensions
    input: chunks.map(c => c.text)
  });

  // 4. Store in vector database with metadata
  await vectorDB.upsert(
    embeddings.map((emb, i) => ({
      id: `${statute}-${i}`,
      values: emb.embedding,
      metadata: {
        statute,
        jurisdiction,
        date,
        text: chunks[i].text,
        citation: chunks[i].citation
      }
    }))
  );
}
```

**Knowledge Base Size Estimates:**
- Zürich: ~5,000 legal documents, ~2M tokens → ~40,000 embeddings
- California: ~15,000 legal documents, ~6M tokens → ~120,000 embeddings

#### 2. Case Analysis RAG Pipeline

**Step 1: Query Processing**
```typescript
async function analyzeLegalCase(caseData: CaseIntake) {
  // Extract key legal concepts using GPT-4
  const legalConcepts = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: `Extract legal concepts and key facts from this case.
                Identify: (1) legal area, (2) jurisdiction, (3) key facts,
                (4) potential claims, (5) relevant statutes.`
    }, {
      role: 'user',
      content: JSON.stringify(caseData)
    }],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(legalConcepts.choices[0].message.content);
}
```

**Step 2: Vector Search**
```typescript
async function retrieveRelevantLaw(concepts: LegalConcepts) {
  // Generate query embedding
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: `${concepts.legalArea} ${concepts.jurisdiction} ${concepts.keyClaims.join(' ')}`
  });

  // Search vector database with filters
  const results = await vectorDB.query({
    vector: queryEmbedding.data[0].embedding,
    topK: 20, // Retrieve top 20 most relevant sections
    filter: {
      jurisdiction: concepts.jurisdiction,
      legalArea: concepts.legalArea
    }
  });

  // Re-rank using cross-encoder for precision
  const reranked = await reranker.rank(
    query: concepts.description,
    documents: results.matches.map(m => m.metadata.text)
  );

  return reranked.slice(0, 10); // Top 10 after reranking
}
```

**Step 3: AI Legal Analysis**
```typescript
async function generateLegalAnalysis(
  caseData: CaseIntake,
  relevantLaw: LegalContext[]
) {
  const systemPrompt = `You are Lex, an AI legal assistant specializing in ${caseData.jurisdiction} law.

You MUST:
1. Base all analysis on provided legal sources (cite statutes and case law)
2. Identify applicable laws and how they relate to this case
3. Assess likelihood of success with reasoning
4. Identify potential risks and challenges
5. Suggest legal strategy
6. Include disclaimers about AI analysis vs human lawyer advice

You MUST NOT:
1. Make definitive legal conclusions without citing sources
2. Give advice outside the provided jurisdiction
3. Guarantee outcomes`;

  const userPrompt = `Case Details:
${JSON.stringify(caseData, null, 2)}

Relevant Legal Sources:
${relevantLaw.map(l => `
[${l.citation}]
${l.text}
`).join('\n---\n')}

Provide comprehensive legal analysis.`;

  const analysis = await openai.chat.completions.create({
    model: 'gpt-4',
    temperature: 0.1, // Low temperature for legal accuracy
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]
  });

  return analysis.choices[0].message.content;
}
```

#### 3. Lawyer Matching Algorithm

**Feature Engineering:**
```typescript
interface LawyerProfile {
  id: string;
  specializations: string[]; // ["immigration", "employment"]
  jurisdictions: string[];   // ["zurich", "switzerland-federal"]
  experienceYears: number;
  successRate: number;       // 0-1
  caseVolume: number;        // Cases handled per year
  avgCaseValue: number;      // USD
  consultationFee: number;
  hourlyRate: number;
  fixedFees: Record<string, number>; // {"visa-application": 2500}
  availability: string;      // "immediate" | "1-week" | "1-month"
  languages: string[];
}

async function matchLawyers(
  caseData: CaseIntake,
  legalAnalysis: LegalAnalysis
): Promise<LawyerMatch[]> {
  // 1. Filter by hard constraints
  let candidates = await lawyerDB.find({
    specializations: { $in: [caseData.legalArea] },
    jurisdictions: { $in: [caseData.jurisdiction] },
    availability: meetsBudget(caseData.urgency)
  });

  // 2. Score each lawyer
  const scored = candidates.map(lawyer => {
    const score = calculateMatchScore(lawyer, caseData, legalAnalysis);
    const reasoning = explainMatchScore(lawyer, caseData, score);

    return { lawyer, score, reasoning };
  });

  // 3. Return top 3 with explanations
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function calculateMatchScore(
  lawyer: LawyerProfile,
  caseData: CaseIntake,
  analysis: LegalAnalysis
): number {
  // Weighted scoring system
  const weights = {
    specialization: 0.30,
    experience: 0.20,
    successRate: 0.20,
    availability: 0.15,
    budget: 0.15
  };

  const scores = {
    specialization: lawyer.specializations.includes(caseData.legalArea) ? 1.0 : 0.5,
    experience: Math.min(lawyer.experienceYears / 15, 1.0), // Cap at 15 years
    successRate: lawyer.successRate,
    availability: getAvailabilityScore(lawyer.availability, caseData.urgency),
    budget: getBudgetScore(lawyer, caseData.budget)
  };

  return Object.entries(weights).reduce(
    (total, [key, weight]) => total + (scores[key] * weight),
    0
  );
}
```

### Vector Database Architecture

**Choice: MongoDB Atlas Vector Search**

*Rationale:* We're already using MongoDB for structured data (consultations, users, cases). MongoDB Atlas Vector Search allows us to:
1. Keep all data in one system (simplicity)
2. Use existing MongoDB expertise
3. Perform hybrid search (vector + metadata filters)
4. Scale with proven MongoDB infrastructure

**Schema:**
```typescript
// MongoDB Collection: legal_knowledge
{
  _id: ObjectId,
  statute: "Swiss Civil Code Art. 123",
  jurisdiction: "switzerland-federal",
  legalArea: "family-law",
  text: "Article 123: Marriage is a union...",
  citation: "CC Art. 123",
  effectiveDate: ISODate("2023-01-01"),
  embedding: [0.023, -0.891, ...], // 3072-dim vector
  metadata: {
    language: "en",
    officialTranslation: true,
    amendments: [...],
    relatedStatutes: [...]
  }
}

// Vector search index
db.legal_knowledge.createIndex({
  "embedding": "vectorSearch"
}, {
  "numDimensions": 3072,
  "similarity": "cosine"
});
```

**Alternative Considered: Pinecone**
- ✅ Specialized for vector search (faster)
- ✅ Better performance at scale
- ❌ Additional service to manage
- ❌ Data split across systems

**Decision:** Start with MongoDB Atlas, migrate to Pinecone if scale demands it (>1M vectors).

### API Implementation

**Endpoint Design:**
```typescript
// POST /api/legal/analyze
interface AnalyzeRequest {
  caseDescription: string;
  legalArea: string;
  jurisdiction: string;
  urgency: "immediate" | "1-week" | "1-month";
  budget?: number;
}

interface AnalyzeResponse {
  caseId: string;
  analysis: {
    summary: string;
    applicableLaws: LegalCitation[];
    successProbability: number; // 0-100
    risks: string[];
    recommendedActions: string[];
    estimatedDuration: string;
    estimatedCost: { min: number; max: number };
  };
  matchedLawyers: LawyerMatch[];
  reasoning: string; // Explain the AI's analysis process
}

// Implementation
export async function POST(req: Request) {
  const data = await req.json();

  // 1. Validate and extract legal concepts
  const concepts = await analyzeLegalCase(data);

  // 2. Retrieve relevant law
  const relevantLaw = await retrieveRelevantLaw(concepts);

  // 3. Generate AI analysis
  const analysis = await generateLegalAnalysis(data, relevantLaw);

  // 4. Match lawyers
  const lawyers = await matchLawyers(data, analysis);

  // 5. Store case in database
  const caseId = await saveCaseAnalysis({ data, concepts, analysis, lawyers });

  return Response.json({ caseId, analysis, matchedLawyers: lawyers });
}
```

### Frontend Integration

**React Hook for AI Analysis:**
```typescript
function useLegalAnalysis() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (caseData: CaseIntake) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/legal/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(caseData)
      });

      if (!response.ok) throw new Error('Analysis failed');

      const result = await response.json();
      setAnalysis(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { analyze, analysis, loading, error };
}
```

### Technical Architecture

#### Current (Proof of Concept)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Headless UI
- **State Management**: React hooks (useState, useEffect)
- **Data**: Mock data in components

#### Planned (Production)
- **Frontend**: Next.js 14 + TypeScript (same)
- **AI/ML**: OpenAI GPT-4 API + text-embedding-3-large
- **Vector DB**: MongoDB Atlas Vector Search (start) → Pinecone (scale)
- **Database**: MongoDB (structured data) + Vector indices
- **Search**: Hybrid vector + metadata filtering
- **Caching**: Redis for frequently accessed legal content
- **Queue**: Bull/BullMQ for long-running analysis jobs
- **Monitoring**: Sentry (errors) + Datadog (performance) + custom AI metrics

### Design Principles
- **Mobile-First**: Fully responsive design
- **Progressive Disclosure**: Show advanced options only when needed
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Code splitting, lazy loading, aggressive caching
- **Modularity**: Each section is a self-contained component
- **AI Transparency**: Always show sources and reasoning

### Data Flow (Production)

**Current (Mock):**
1. User inputs case details → CaseIntakeForm
2. Form data → DemoOrchestrator (state management)
3. Mock AI analysis triggered → AICaseAnalysis (hardcoded response)
4. Mock lawyer matching → LawyerMatcher (random selection)
5. Workspace preview → WorkspaceDashboard

**Planned (Real AI):**
1. User inputs case details → CaseIntakeForm
2. Form validation + submission → POST /api/legal/analyze
3. Backend: Concept extraction (GPT-4) → Vector search (MongoDB Atlas) → RAG pipeline (GPT-4 + legal context)
4. Backend: Lawyer matching algorithm → Scoring + ranking
5. Response streamed to frontend → Display analysis with citations
6. User selects lawyer → Create workspace in database
7. Real-time updates → WebSocket connection for collaboration

## UX Improvements (Latest Updates)

### Removed Friction Points
- ✅ **No character limits** on text inputs (was requiring 50+ characters)
- ✅ **Progressive disclosure** for jurisdiction, urgency, budget (not required upfront)
- ✅ **Simplified jurisdiction selection** with clear "request new" option
- ✅ **Explicit messaging** about starting with Zürich (federal + cantonal) and California

### Conversion Optimization
- Primary CTA: "Get AI Analysis" (emphasizes AI-first approach)
- Secondary CTA: "Find Lawyers" (shown after AI analysis)
- Clear value proposition: "Try AI legal advisor first, connect with lawyers later"

## Development

### Running Locally
```bash
npm run dev
```
Navigate to:
- Main page: `http://localhost:3000/bots/legal-expert`
- Demo page: `http://localhost:3000/bots/legal-expert/demo`

### Testing
```bash
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

### Building for Production
```bash
npm run build
npm start
```

## Future Roadmap

### Q1 2025
- [ ] Expand to 5 more jurisdictions (based on user requests)
- [ ] Add document upload for AI analysis
- [ ] Implement real lawyer matching algorithm
- [ ] Launch workspace with secure data room

### Q2 2025
- [ ] Multi-language support (German, French, Italian)
- [ ] Mobile apps (iOS, Android)
- [ ] Integration with law firm management systems
- [ ] Payment processing for consultations

### Q3 2025
- [ ] AI-powered contract generation
- [ ] Automated legal research updates
- [ ] Case outcome prediction models
- [ ] API for third-party integrations

## Security & Privacy

- **Data Encryption**: All data encrypted at rest and in transit
- **GDPR Compliant**: Full data privacy controls
- **Secure Authentication**: OAuth 2.0 + 2FA
- **Private AI Node**: Option to run on-premise for law firms
- **Audit Logs**: Complete activity tracking

## Contributing

See main Botsmann contributing guidelines. For Lex-specific contributions:

1. **New Jurisdictions**: Add to `workspace/constants.ts`
2. **Legal Areas**: Update `LEGAL_AREAS` array
3. **UI Components**: Follow existing component structure
4. **Testing**: Add tests for new features

## Support

- Email: legal@botsmann.com
- Documentation: https://docs.botsmann.com/lex
- Issues: https://github.com/botsmann/lex/issues

## License

MIT
