# Botsmann Platform Architecture

## System Overview

Botsmann is a **collaborative workspace platform** where individuals work with AI and human experts to solve complex problems in legal, medical, financial, research, creative, and other professional domains.

**Current Status:** Early proof-of-concept with demonstration UIs. The advanced AI capabilities described in this document represent our technical roadmap and are actively being built through distributed development.

### The Workspace Model

**Core Concept:** Each Botsmann bot provides a **private workspace** where:

1. **Individual owns the data** - All information stays in their workspace (self-hosted or encrypted cloud)
2. **AI does 80% of the work** - Expert-level analysis, research, calculations, documentation
3. **Human experts handle 20%** - Complex judgment, liability management, edge cases
4. **Seamless collaboration** - AI prepares everything so experts can help efficiently

**The Value Proposition:**
- **For Individuals:** Get expert-level AI help immediately, then add human experts only when needed
- **For Experts:** AI does the hard/tedious work, you focus on high-value judgment and client relationships
- **For Both:** Workspace makes collaboration simple - all context, data, and AI analysis in one place

### Core Philosophy

1. **User Data Ownership**: Individuals own their workspace data completely
2. **AI-First, Human-When-Needed**: AI handles routine work, humans manage liability and complexity
3. **Workspace Collaboration**: All parties (individual, AI, experts) work in shared secure environment
4. **Domain Specialization**: Each bot optimized for specific professional use cases
5. **Privacy & Security**: Self-hosted or encrypted cloud, granular access control
6. **Distributed Development**: Comprehensive documentation enables parallel development by humans and AI

---

## Workspace Architecture

### The Universal Workspace Pattern

Every Botsmann bot follows the same workspace collaboration model:

```
┌─────────────────────────────────────────────────────────────────┐
│                      INDIVIDUAL'S WORKSPACE                      │
│                     (User owns all data)                         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │                    Data Storage                         │   │
│  │  • Case files (legal docs, medical records, etc.)      │   │
│  │  • AI analysis history                                  │   │
│  │  • Communication logs                                   │   │
│  │  • Shared notes and documents                          │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │                  AI Assistant (80% of work)             │   │
│  │  • Analyzes data with domain expertise                 │   │
│  │  • Performs calculations and research                  │   │
│  │  • Generates documentation and summaries               │   │
│  │  • Identifies when human expert is needed              │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │         Human Expert Access (20% of work)               │   │
│  │  • Invited by individual when needed                    │   │
│  │  • Sees all AI analysis and context                    │   │
│  │  • Provides judgment on complex issues                 │   │
│  │  • Manages liability and edge cases                    │   │
│  │  • Access revoked when work is done                    │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Why This Works

**Problem Solved:**
- Getting expert help is **expensive** (lawyers, doctors, financial advisors charge $200-500/hour)
- Experts spend **60-80% of time** on routine analysis that AI can do
- Individuals can't afford experts for ongoing guidance
- Experts can't scale to serve everyone who needs help

**Botsmann Solution:**
1. **AI does the routine work** → Individual gets expert-level analysis instantly
2. **Individual invites expert when needed** → Only for complex judgment, liability management
3. **Expert sees all AI work** → No need to start from scratch, context is ready
4. **Workspace is secure** → Individual controls access, data stays private

**Result:**
- **90% cost reduction** for individuals (AI handles most work)
- **3x more clients** for experts (AI does prep work)
- **Better outcomes** for everyone (AI + human expertise combined)

### Workspace Lifecycle

#### Phase 1: Individual + AI
```typescript
// Individual creates workspace and works with AI
const workspace = await createWorkspace({
  type: 'legal' | 'medical' | 'financial' | 'research' | 'creative' | 'language',
  owner: userId,
  privacy: 'self_hosted' | 'cloud_encrypted',
  data: initialDocuments
});

// AI analyzes and provides guidance
const aiAnalysis = await workspace.ai.analyze({
  documents: workspace.data,
  userQuery: "Should I accept this job offer in Switzerland?",
  domain: 'legal' // Lex bot
});

// AI identifies if human expert needed
if (aiAnalysis.requiresHumanExpert) {
  // Proceed to Phase 2
}
```

#### Phase 2: Adding Human Expert
```typescript
// Individual invites expert to workspace
const expertInvite = await workspace.inviteExpert({
  expertise: 'employment_lawyer', // or 'cardiologist', 'financial_advisor', etc.
  jurisdiction: 'Switzerland:Zurich',
  access_level: 'read_write', // Can add notes, documents
  scope: ['employment_contract', 'visa_implications'] // What they can see
});

// Expert accepts and joins workspace
// They see:
// - All uploaded documents
// - Complete AI analysis
// - Individual's questions and concerns
// - AI's preliminary recommendations

// Expert provides judgment
await workspace.expert.addGuidance({
  review: "AI analysis is correct on all points except...",
  recommendation: "Given Swiss employment law, I suggest...",
  liability_note: "As your attorney, I advise that..."
});
```

#### Phase 3: Ongoing Collaboration
```typescript
// Individual, AI, and expert work together
const collaboration = {
  // Individual uploads new info
  individual: workspace.upload(newDocument),

  // AI updates analysis
  ai: workspace.ai.reanalyze(),

  // Expert reviews changes
  expert: workspace.expert.review(),

  // All parties can communicate
  chat: workspace.chat.send({
    from: 'individual',
    to: ['ai', 'expert'],
    message: "Contract has been updated, please review"
  })
};

// When work is complete
await workspace.closeCase({
  expertPayment: calculateFee(hoursWorked),
  exportData: true, // Individual keeps all records
  revokeExpertAccess: true
});
```

### Access Control & Privacy

**Individual Controls Everything:**
```typescript
interface WorkspacePermissions {
  owner: {
    can: ['read', 'write', 'delete', 'invite_experts', 'revoke_access', 'export_data', 'delete_workspace']
  },
  ai: {
    can: ['read', 'analyze', 'suggest'],
    cannot: ['share_externally', 'store_without_permission']
  },
  expert: {
    can: ['read_assigned_data', 'write_notes', 'communicate'],
    cannot: ['access_other_workspaces', 'export_without_permission', 'retain_after_revoked'],
    scope: granularPermissions // Only sees what individual grants
  }
}
```

**Data Ownership:**
- **Self-Hosted**: All data on individual's hardware, never leaves
- **Cloud Encrypted**: Individual holds encryption keys, Botsmann cannot read
- **Export Anytime**: Individual can download all workspace data
- **Right to Delete**: Individual can permanently delete workspace

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         User Interface Layer                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │   Lex    │  │ Imhotep  │  │   Nerd   │  │   Heidi  │  ...      │
│  │ (Legal)  │  │(Medical) │  │(Research)│  │(Language)│           │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘           │
└───────┼─────────────┼─────────────┼─────────────┼──────────────────┘
        │             │             │             │
┌───────┼─────────────┼─────────────┼─────────────┼──────────────────┐
│       │        Next.js Application Layer         │                  │
│       │                                          │                  │
│  ┌────▼─────────────────────────────────────────▼─────┐            │
│  │           Shared Components & Utilities             │            │
│  │  • BotPageHeader  • Navigation  • Forms             │            │
│  │  • ConditionalHeader  • Footer  • Layouts           │            │
│  └──────────────────────────┬──────────────────────────┘            │
│                             │                                        │
│  ┌──────────────────────────▼──────────────────────────┐            │
│  │              API Routes & Server Logic               │            │
│  │  • /api/consultation  • /api/health                  │            │
│  │  • Bot-specific endpoints                            │            │
│  └──────────────────────────┬──────────────────────────┘            │
└─────────────────────────────┼───────────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────────┐
│                      AI & Data Layer (PLANNED)                       │
│  ┌────────────┐  ┌─────────────┐  ┌──────────────┐                 │
│  │  OpenAI    │  │  Anthropic  │  │ Vector DBs   │                 │
│  │  GPT-4     │  │  Claude     │  │ Multi-vendor │                 │
│  │  GPT-4V    │  │  xAI Grok   │  │ Strategy     │                 │
│  └────────────┘  └─────────────┘  └──────────────┘                 │
│                                                                       │
│  ┌────────────────────────────────────────────────────┐             │
│  │      Domain-Specific Knowledge Bases (Planned)     │             │
│  │  • Legal: Case law (40-120K embeddings)           │             │
│  │  • Medical: PubMed + guidelines (14.3M emb)       │             │
│  │  • Research: Academic papers (50M emb)            │             │
│  │  • Language: Swiss German corpus (7M emb)         │             │
│  │  • Art: Museum collections (1.5M emb)             │             │
│  │  • PM: Best practices corpus (17K emb)            │             │
│  └────────────────────────────────────────────────────┘             │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components + Headless UI
- **State Management**: React hooks (useState, useEffect, useContext)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Heroicons, custom SVGs

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Next.js API Routes (serverless functions)
- **Database**: MongoDB (Atlas for production)
- **Email**: Nodemailer (SMTP)
- **File Storage**: Local (development), Cloud storage (production)

### AI & ML (Planned)
- **Text Generation**: OpenAI GPT-4, Anthropic Claude 3.5 Sonnet, xAI Grok 2
- **Vision Models**: GPT-4 Vision (for Artr art analysis)
- **Speech**: OpenAI Whisper (for Heidi language learning)
- **Image Generation**: DALL-E 3 (for Artr style demonstrations)
- **Vector Databases**:
  - MongoDB Atlas Vector Search (Lex, Heidi) - simplicity, unified storage
  - Pinecone (Imhotep, Artr) - multi-namespace, massive scale
  - Qdrant (Nerd, Trident) - open-source, self-hosting capability
- **Embeddings**: OpenAI text-embedding-3-large (3072 dimensions)

### Infrastructure
- **Hosting**: Vercel (serverless)
- **CDN**: Vercel Edge Network
- **Container**: Docker (local development)
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry (errors), Vercel Analytics (performance)

### Security
- **Secrets Detection**: Gitleaks
- **Vulnerability Scanning**: Trivy, npm audit
- **Environment Variables**: Vercel + GitHub Secrets
- **Authentication**: NextAuth.js (planned)
- **Data Encryption**: AES-256 (at rest), TLS 1.3 (in transit)

---

## Bot Architecture

### Individual Bot Structure

Each bot follows a consistent architecture:

```
app/bots/{bot-slug}/
├── page.tsx                    # Main bot page (entry point)
├── README.md                   # Bot-specific documentation
├── styles.css                  # Bot-specific styles (if needed)
└── components/
    ├── hero/                   # Hero/landing section
    ├── features/               # Feature showcase
    ├── demo/                   # Interactive demo (if applicable)
    ├── vision/                 # Vision and roadmap
    └── shared/                 # Bot-specific shared components
```

### Bot Capabilities

Each bot implements:

1. **Domain-Specific UI**: Tailored interface for specific use cases
2. **Specialized AI Prompts**: Custom system prompts and context
3. **Domain Knowledge**: Curated datasets and knowledge bases
4. **Workflow Automation**: Task-specific automation logic
5. **Integrations**: External APIs and services relevant to the domain

### Current Bots

All bots provide **collaborative workspaces** where individuals work with AI (80% of work) and invite human experts when needed (20% liability management):

| Bot | Domain | Workspace For | AI Does | Human Expert Does |
|-----|--------|---------------|---------|-------------------|
| **Lex** | Legal | Case analysis & lawyer collaboration | Legal research, contract analysis, case law retrieval (40-120K embeddings) | Complex legal judgment, liability management, court representation |
| **Imhotep** | Medical | Health management & doctor collaboration | Symptom analysis, research synthesis, drug interactions (14.3M embeddings) | Diagnosis, treatment decisions, prescriptions, emergency care |
| **Nerd** | Research | Academic research & collaboration | Literature review, citation graphs, research gaps (50M embeddings) | Hypothesis validation, methodology design, peer review |
| **Heidi** | Language | Swiss German learning & teacher collaboration | Dialect lessons, spaced repetition, cultural context (7M embeddings) | Pronunciation feedback, cultural nuances, conversation practice |
| **Artr** | Creative | Art projects & creative advisor collaboration | Style analysis, composition feedback, art history (1.5M embeddings) | Artistic judgment, portfolio curation, career guidance |
| **Trident** | Business | Product development & PM collaboration | Multi-AI analysis, specs, diagrams (GPT-4 + Claude + Grok, 17K embeddings) | Strategic decisions, stakeholder management, roadmap prioritization |
| **RichCat** | Finance | Wealth management & advisor collaboration | Portfolio analysis, tax optimization, Monte Carlo projections (5M embeddings) | Complex estate planning, international tax, investment decisions |

**Current Status:** All bots have demonstration UIs. The workspace collaboration features and AI capabilities are documented in detailed technical implementation plans in each bot's README and are being actively developed.

**Key Insight:** The workspace is the product. Individuals own their data, AI does the heavy lifting, human experts manage liability and provide judgment—all in one secure, collaborative environment.

---

## Data Flow

### User Interaction Flow (Planned Architecture)

```
┌─────────────┐
│    User     │
└──────┬──────┘
       │ (1) Interacts with bot UI
       ▼
┌─────────────────────────────┐
│   Bot Page Component        │
│   (React Client Component)  │
└──────┬──────────────────────┘
       │ (2) Submits form/query
       ▼
┌─────────────────────────────┐
│   API Route Handler         │
│   (Next.js Server Function) │
└──────┬──────────────────────┘
       │ (3) Validates input & analyzes intent
       ▼
┌─────────────────────────────┐
│   RAG Pipeline              │
│   • Vector search (top-k)   │
│   • Metadata filtering      │
│   • Context assembly        │
└──────┬──────────────────────┘
       │ (4) Retrieves domain context
       ▼
┌─────────────────────────────┐
│   AI Service                │
│   • GPT-4 / Claude / Grok   │
│   • Domain-specific prompt  │
│   • Context + user query    │
└──────┬──────────────────────┘
       │ (5) Generates response
       ▼
┌─────────────────────────────┐
│   Response Processing       │
│   • Validation               │
│   • Logging                  │
│   • Analytics                │
└──────┬──────────────────────┘
       │ (6) Returns to client
       ▼
┌─────────────────────────────┐
│   UI Updates                │
│   (Display response to user)│
└─────────────────────────────┘
```

**Current Implementation:** Steps 1-2 and 6-7 are functional (demo UI). Steps 3-5 (RAG pipeline and AI processing) are documented in bot READMEs and under active development.

### Data Storage Patterns (Planned)

#### User Data
- **Consultation Forms**: MongoDB with AES-256 encryption
- **Bot Interactions**: Logged with anonymized PII for analytics
- **User Preferences**: localStorage (client) + MongoDB (persistent)
- **Session Management**: JWT tokens with secure cookies
- **Conversation History**: Per-session context (sliding window)

#### AI Knowledge Bases
- **Vector Embeddings**: Domain-specific databases
  - Lex: MongoDB Atlas (40-120K legal document chunks)
  - Imhotep: Pinecone (14.3M medical literature chunks)
  - Nerd: Qdrant (50M research paper chunks)
  - Heidi: MongoDB Atlas (7M Swiss German phrase pairs)
  - Artr: Pinecone (1.5M artwork descriptions)
  - Trident: Qdrant (17K PM best practice chunks)
- **Metadata**: Structured fields for filtering (jurisdiction, date, source, etc.)
- **Raw Source Documents**: S3/Cloud Storage with references in vector DB

---

## Integration Architecture (Planned)

### External Service Integration

```
┌──────────────────────────────────────────────────────────────┐
│                    Botsmann Platform                          │
│                                                               │
│  ┌─────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐  │
│  │   Lex   │   │ Imhotep  │   │   Nerd   │   │  Heidi   │  │
│  └────┬────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘  │
└───────┼─────────────┼──────────────┼──────────────┼─────────┘
        │             │              │              │
        ▼             ▼              ▼              ▼
┌───────────┐  ┌────────────┐  ┌──────────┐  ┌─────────────┐
│ Legal DBs │  │ PubMed API │  │ arXiv API│  │ Events APIs │
│ Lawyer    │  │ FDA DB     │  │ Semantic │  │ Swiss Media │
│ Matching  │  │ OpenFDA    │  │ Scholar  │  │ ArchiMob    │
└───────────┘  └────────────┘  └──────────┘  └─────────────┘
        ▼             ▼              ▼              ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
    │   Artr   │  │ Trident  │  │ AI APIs  │  │  Storage │
    └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘
         │             │              │              │
         ▼             ▼              ▼              ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ Museum   │  │ Jira API │  │ GPT-4    │  │ S3/Cloud │
    │ APIs     │  │ GitHub   │  │ Claude   │  │ Storage  │
    │ WikiArt  │  │ Confluence│  │ Grok     │  │          │
    └──────────┘  └──────────┘  └──────────┘  └──────────┘
```

### Integration Patterns (To Be Implemented)

1. **REST API Integration**: HTTP requests to external data sources
2. **Web Scraping**: Playwright for dynamic content (legal docs, Swiss media)
3. **API Authentication**: API keys, OAuth 2.0 where required
4. **Rate Limiting**: Respect API limits, implement exponential backoff
5. **Caching**: Redis for frequently accessed external data
6. **Real-time Updates**: Webhook listeners for live data feeds (planned)

---

## Shared Infrastructure

### Common Components

#### Navigation & Layout
- **Header**: Main site navigation (Home, Bots, Projects, About)
- **BotPageHeader**: Bot-specific navigation with accent colors
- **ConditionalHeader**: Shows/hides main header based on route
- **ConditionalMain**: Adjusts padding based on header visibility
- **Footer**: Site-wide footer with links and info

#### Forms & Input
- **ConsultationForm**: Email contact form (shared across bots)
- **WaitlistForm**: Beta signup form
- **SearchBar**: Global search (planned)

#### Utilities
- **API Client**: Centralized API request handling
- **Error Handling**: Consistent error messages and logging
- **Analytics**: Track user interactions and bot performance
- **Monitoring**: Sentry integration for error tracking

### Shared Services

#### API Routes
```
/api/
├── consultation         # Contact form submission
├── health              # Health check endpoint
├── bots/
│   ├── legal/          # Lex-specific endpoints
│   ├── medical/        # Imhotep-specific endpoints
│   ├── research/       # Nerd-specific endpoints
│   └── ...
```

#### Database Schema (Planned)

**MongoDB Collections:**
- `consultations`: Contact form submissions (currently functional)
- `bot_interactions`: Conversation logs with anonymized PII
- `user_profiles`: User preferences and learning progress
- `user_feedback`: Ratings and improvement suggestions

**Vector Database Schemas:**
Each bot has domain-specific vector DB schema documented in its README:
- Lex: Legal documents with jurisdiction metadata (MongoDB Atlas)
- Imhotep: Medical literature with evidence level metadata (Pinecone)
- Nerd: Research papers with citation graph (Qdrant)
- Heidi: Swiss German phrases with dialect metadata (MongoDB Atlas)
- Artr: Artworks with style/period metadata (Pinecone)
- Trident: PM best practices with category metadata (Qdrant)
- RichCat: Financial knowledge with jurisdiction/asset class metadata (Qdrant)

---

## Deployment Architecture

### Local Development

```
┌──────────────────────────────────────┐
│      Docker Compose Environment      │
│                                      │
│  ┌────────────┐    ┌─────────────┐  │
│  │  Next.js   │◄───┤  MongoDB    │  │
│  │  (port     │    │  (port      │  │
│  │   3000)    │    │   27017)    │  │
│  └────────────┘    └─────────────┘  │
│                                      │
│  ┌─────────────────────────────────┐│
│  │   Hot Reload   │   Live DB      ││
│  │   Volumes      │   Seed Data    ││
│  └─────────────────────────────────┘│
└──────────────────────────────────────┘
```

### Production Deployment (Vercel)

```
┌────────────────────────────────────────────────────┐
│                GitHub Repository                    │
└──────────────────┬─────────────────────────────────┘
                   │ (1) Push to main
                   ▼
┌────────────────────────────────────────────────────┐
│              GitHub Actions CI/CD                   │
│  • Gitleaks (secrets)                              │
│  • Trivy (vulnerabilities)                         │
│  • ESLint + TypeScript                             │
│  • Tests                                           │
└──────────────────┬─────────────────────────────────┘
                   │ (2) All checks pass
                   ▼
┌────────────────────────────────────────────────────┐
│           Vercel Build & Deploy                    │
│  • Install dependencies                            │
│  • Build Next.js (SSR + static)                    │
│  • Deploy to Edge Network                          │
│  • Run health checks                               │
└──────────────────┬─────────────────────────────────┘
                   │ (3) Deployment successful
                   ▼
┌────────────────────────────────────────────────────┐
│            Production Environment                   │
│                                                     │
│  ┌──────────────┐        ┌──────────────────────┐ │
│  │  Vercel Edge │◄──────►│  MongoDB Atlas       │ │
│  │  Functions   │        │  (Managed DB)        │ │
│  └──────────────┘        └──────────────────────┘ │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │  CDN: Global edge caching for static assets │  │
│  │  SSL: Automatic HTTPS with auto-renewal     │  │
│  │  Monitoring: Real-time error tracking       │  │
│  └─────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

### Environment Variables

#### Required (All Environments)
- `MONGODB_URI`: Database connection string
- `EMAIL_USER`: SMTP email address
- `EMAIL_PASS`: SMTP password
- `EMAIL_TO`: Recipient email for forms
- `NEXT_PUBLIC_API_KEY`: API authentication key

#### Optional (Production)
- `NEXT_PUBLIC_SENTRY_DSN`: Error tracking
- `OPENAI_API_KEY`: AI model access
- `VERCEL_TOKEN`: Deployment automation
- `NODE_ENV`: Environment flag (production/development)

---

## Security Architecture

### Threat Model

**Protected Assets:**
1. User personal data (PII)
2. Bot conversation history
3. Domain-specific knowledge bases
4. API keys and credentials
5. AI model prompts and responses

**Threat Vectors:**
1. Unauthorized data access
2. API abuse and rate limiting
3. Injection attacks (SQL, XSS, prompt injection)
4. Secret leakage in code
5. DDoS and resource exhaustion

### Security Measures

#### Application Security
- **Input Validation**: Zod schemas for all user inputs
- **Output Sanitization**: XSS prevention in rendered content
- **CSRF Protection**: Next.js built-in CSRF tokens
- **Rate Limiting**: API endpoint throttling
- **Prompt Injection Defense**: Sanitize AI inputs, constrain outputs

#### Infrastructure Security
- **Secrets Management**: Environment variables (no hardcoded secrets)
- **Dependency Scanning**: npm audit + Dependabot
- **Container Security**: Non-root user, minimal base image
- **HTTPS Enforcement**: TLS 1.3 for all connections
- **Access Control**: Role-based permissions (planned)

#### Data Security
- **Encryption at Rest**: AES-256 for database
- **Encryption in Transit**: TLS 1.3 for all connections
- **Data Anonymization**: Remove PII from logs
- **Backup Strategy**: Daily MongoDB backups
- **GDPR Compliance**: Data deletion and export capabilities

---

## Monitoring & Observability

### Application Monitoring

**Metrics Tracked:**
- Response times (API, page load)
- Error rates (5xx, 4xx by endpoint)
- Bot usage statistics (interactions per bot)
- AI model performance (latency, token usage)
- User engagement (session duration, conversion)

**Tools:**
- **Sentry**: Real-time error tracking and alerting
- **Vercel Analytics**: Performance metrics and Web Vitals
- **Custom Logging**: Winston for structured logging
- **Health Endpoints**: `/api/health` for uptime monitoring

### Alerting Rules

**Critical Alerts (Immediate Response):**
- Error rate > 5% for 5 minutes
- API response time > 10 seconds
- Database connection failures
- Security incidents (secrets leaked)

**Warning Alerts (24hr Response):**
- Error rate > 1% for 30 minutes
- Slow API responses (> 3 seconds)
- High token usage (cost monitoring)
- Dependency vulnerabilities found

---

## Scalability Considerations

### Current Limitations
- **Serverless Functions**: 10-second timeout (Vercel)
- **Database**: MongoDB Atlas shared cluster (development)
- **API Rate Limits**: OpenAI API rate limits
- **File Storage**: Limited to Vercel blob storage

### Scaling Strategy

#### Phase 1: Current (100-1,000 users)
- Vercel serverless (auto-scaling)
- MongoDB Atlas M10 cluster
- CDN caching for static assets
- API rate limiting per user

#### Phase 2: Growth (1,000-10,000 users)
- Dedicated backend servers (AWS/GCP)
- MongoDB Atlas M30 cluster with sharding
- Redis for session management
- Microservices architecture for bots

#### Phase 3: Scale (10,000+ users)
- Kubernetes cluster for container orchestration
- Multi-region deployment
- Load balancing and auto-scaling
- Dedicated AI inference servers
- Read replicas for database

---

## Development Roadmap

### Implementation Strategy

**Distributed Development Approach:**
- Comprehensive technical specifications in each bot's README enable parallel development
- Machine-readable documentation allows AI agents to contribute to implementation
- Clear architecture and data flow diagrams guide both human and AI developers
- Code examples provide implementation templates

### Phase 1: Core AI Infrastructure (In Progress)

**Priority 1: RAG Pipeline Foundation**
- [ ] Vector database setup (MongoDB Atlas, Pinecone, Qdrant)
- [ ] Knowledge base ingestion pipelines for each domain
- [ ] Embedding generation and storage
- [ ] Vector search with metadata filtering
- [ ] Context assembly and prompt engineering

**Priority 2: Bot-Specific AI Features**
- [ ] Lex: Legal corpus ingestion (Zürich/California laws)
- [ ] Imhotep: Medical literature indexing (PubMed, guidelines)
- [ ] Nerd: Research paper database and citation graph
- [ ] Heidi: Swiss German corpus and spaced repetition
- [ ] Artr: Art museum collections and GPT-4V integration
- [ ] Trident: Multi-AI orchestration and fusion engine
- [ ] RichCat: Financial knowledge base, tax optimization, portfolio analysis

### Phase 2: Production Features (Q2-Q3 2025)
- [ ] User authentication (NextAuth.js)
- [ ] Conversation history and user profiles
- [ ] API rate limiting and usage tracking
- [ ] Advanced analytics and feedback loops
- [ ] Mobile-responsive optimizations

### Phase 3: Advanced Capabilities (Q4 2025+)
- [ ] Real-time collaboration features
- [ ] Multi-language support beyond Swiss German
- [ ] Custom fine-tuned models for specific domains
- [ ] Advanced security (HIPAA for Imhotep, confidentiality for Lex)
- [ ] Integration marketplace for third-party tools

---

## Development Best Practices

### Code Organization
1. **Component Structure**: Modular, reusable components
2. **Type Safety**: TypeScript for all code
3. **Documentation**: JSDoc for all functions
4. **Testing**: Unit tests for business logic, E2E for critical flows
5. **Code Reviews**: All changes reviewed before merge

### Bot Development Workflow

**Adding a New Bot:**
1. Create bot directory: `app/bots/new-bot-slug/`
2. Write comprehensive README first (see existing bot READMEs as templates)
3. Implement page.tsx with bot-specific components
4. Add bot metadata to `data/bots.ts`
5. Create domain-specific API routes (when AI features are ready)
6. Implement RAG pipeline and vector database integration
7. Add tests for bot-specific logic
8. Update main navigation and homepage

**Bot Documentation Requirements:**
Each bot README must include:
- [ ] Problem statement and target users
- [ ] Current Status (honest about what's implemented)
- [ ] AI Architecture diagram showing data flow
- [ ] Core AI Components with implementation code
- [ ] Vector Database Architecture (schema, rationale, scale estimates)
- [ ] API Implementation specifications
- [ ] Technical Architecture (current vs planned)
- [ ] Development Roadmap with realistic timelines

**Bot Quality Checklist:**
- [ ] Comprehensive README (500+ lines with technical specs)
- [ ] Responsive demo UI (mobile-first)
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] SEO optimization (meta tags, structured data)
- [ ] Security review (input validation, planned auth)

---

## Architecture Decision Records (ADRs)

### ADR-001: Next.js App Router
- **Decision**: Use Next.js App Router instead of Pages Router
- **Rationale**: Better performance (server components), improved routing, streaming
- **Trade-offs**: Newer, fewer examples, learning curve

### ADR-002: MongoDB over PostgreSQL
- **Decision**: MongoDB for primary database
- **Rationale**: Flexible schema for diverse bot data, vector search support
- **Trade-offs**: Less strict data consistency, NoSQL complexity

### ADR-003: Vercel Deployment
- **Decision**: Deploy on Vercel instead of AWS/GCP
- **Rationale**: Simplified CI/CD, automatic scaling, excellent Next.js integration
- **Trade-offs**: Vendor lock-in, function timeout limits, higher cost at scale

### ADR-004: Multi-Vendor AI Strategy
- **Decision**: Use multiple AI providers (OpenAI, Anthropic, xAI) based on use case
- **Rationale**:
  - Different models excel at different tasks
  - Reduces vendor lock-in and rate limit issues
  - Trident can synthesize multiple perspectives
- **Implementation**:
  - OpenAI GPT-4: General text generation, embeddings
  - GPT-4 Vision: Image analysis for Artr
  - Anthropic Claude: Long-context analysis, safety-critical domains
  - xAI Grok: Real-time information, diverse perspectives
- **Trade-offs**: API costs, complexity of managing multiple providers

### ADR-005: Multi-Vector Database Strategy
- **Decision**: Use different vector databases optimized for each bot's needs
- **Rationale**:
  - MongoDB Atlas (Lex, Heidi): Simplicity, unified storage with relational data
  - Pinecone (Imhotep, Artr): Massive scale (14M+ embeddings), multi-namespace
  - Qdrant (Nerd, Trident): Open-source, self-hosting, research transparency
- **Trade-offs**: More operational complexity, but better performance per use case

### ADR-006: Documentation-Driven Development
- **Decision**: Write comprehensive technical specs before implementation
- **Rationale**:
  - Enables distributed development (humans + AI)
  - Forces clear thinking about architecture
  - Creates machine-readable blueprints
  - Allows parallel development across all 6 bots
- **Implementation**: Each bot has 500+ line README with code examples, schemas, diagrams
- **Trade-offs**: Upfront time investment, but massive parallelization benefit

---

## Glossary

### Core Concepts
- **Bot**: Domain-specific AI assistant (Lex, Imhotep, Nerd, Heidi, Artr, Trident)
- **RAG**: Retrieval-Augmented Generation - AI technique combining vector search with LLMs
- **Vector Embeddings**: Numerical representations of text/images for semantic search
- **Knowledge Base**: Domain-specific corpus processed into vector embeddings

### AI/ML Terms
- **LLM**: Large Language Model (GPT-4, Claude, Grok)
- **Prompt Engineering**: Crafting instructions to optimize AI responses
- **Context Window**: Amount of text an AI model can process at once
- **Fine-tuning**: Training a model on domain-specific data (planned)
- **Multi-modal**: AI processing multiple data types (text + images)

### Architecture Terms
- **Edge Function**: Serverless function running close to users (Vercel Edge Network)
- **SSR**: Server-Side Rendering (Next.js renders pages on server)
- **CSR**: Client-Side Rendering (React renders in browser)
- **Vector Database**: Specialized database for storing and querying embeddings

### Bot-Specific
- **Lex**: Legal Expert bot for case analysis
- **Imhotep**: Medical Expert bot for health information
- **Nerd**: Research Assistant bot for academic literature
- **Heidi**: Swiss German language teacher bot
- **Artr**: Artistic Advisor bot for creative guidance
- **Trident**: Product Manager bot using multi-AI synthesis
- **RichCat**: Financial Advisor bot for wealth management

---

**Last Updated**: October 2025
**Version**: 2.0
**Status**: 🚧 **Active Development** - Foundation complete, AI features in progress
**Maintained By**: Botsmann Engineering Team

---

## Quick Links

- **Bot Technical Specs**: See individual bot READMEs for detailed implementation plans
  - [Lex Legal Expert](./app/bots/legal-expert/README.md)
  - [Imhotep Medical Expert](./app/bots/medical-expert/README.md)
  - [Nerd Research Assistant](./app/bots/research-assistant/README.md)
  - [Heidi Swiss German Teacher](./app/bots/swiss-german-teacher/README.md)
  - [Artr Artistic Advisor](./app/bots/artistic-advisor/README.md)
  - [Trident Product Manager](./app/bots/product-manager/README.md)
  - [RichCat Financial Advisor](./app/bots/financial-advisor/README.md)

- **Development Guides**:
  - Deployment: See [DEVOPS_DEPLOYMENT_GUIDE.md](./DEVOPS_DEPLOYMENT_GUIDE.md)
  - Cleanup Progress: See [CLEANUP-SUMMARY.md](./CLEANUP-SUMMARY.md)
  - Recent Changes: See [CHANGELOG-botsmann-improvements.md](./CHANGELOG-botsmann-improvements.md)
