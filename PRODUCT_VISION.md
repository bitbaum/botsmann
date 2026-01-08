# Botsmann Product Vision

## TL;DR

**The workspace is the product.** Botsmann provides collaborative workspaces where individuals, AI, and human experts work together to solve complex problems in legal, medical, financial, research, creative, language, and product domains.

---

## The Big Idea

### Core Concept

Traditional expert services are broken:
- **Individuals** can't afford ongoing expert help ($200-500/hr)
- **Experts** waste 60-80% of time on routine work AI can do
- **Result**: Expertise is gatekept, expensive, and doesn't scale

**Botsmann's Solution**: Private workspaces where:
1. **Individual owns all data** (self-hosted or encrypted cloud)
2. **AI does 80% of the work** (analysis, research, calculations, documentation)
3. **Human experts do 20%** (liability management, complex judgment, edge cases)
4. **Everyone wins**: 90% cost reduction for individuals, 3x client capacity for experts

### The Value Proposition

**For Individuals:**
- **90% cost savings** vs traditional expert services
- **24/7 AI access** for routine questions (no waiting for expert)
- **Complete data ownership** (self-hosted or encrypted)
- **Expert safety net** when AI triggers handoff

**For Experts:**
- **3x more clients** (AI does prep work)
- **Focus on high-value work** (judgment, liability, complex cases)
- **Higher hourly rates** (more valuable work commands premium)
- **<5min client prep time** (AI provides full context)

**For Platform:**
- **Low platform fee** (10-15% vs 50% for competitors)
- **Network effects** (more individuals → more experts → more individuals)
- **Defensible moats** (expert network, domain knowledge, AI training data)

---

## 3-Year Vision

### Year 1 (2026): Foundation
**Milestone**: Prove the workspace model works

**Metrics:**
- 10,000 individuals creating workspaces
- 500 verified experts across 7 domains
- $1M ARR (80% subscription, 20% platform fees)
- 4.5+ star average workspace experience

**Deliverables:**
- MVP: Single workspace (legal or financial)
- 3 bots fully integrated with workspace (Lex, RichCat, Imhotep)
- Basic expert matching (manual, then automated)
- Self-hosted + cloud deployment options

### Year 2 (2027): Scale
**Milestone**: Expert marketplace at scale

**Metrics:**
- 100,000 individuals (10x growth)
- 5,000 verified experts across 7 domains
- $10M ARR (60% subscription, 40% platform fees)
- 80% workspace→expert conversion when AI triggers

**Deliverables:**
- All 7 bots integrated with workspace
- Advanced expert matching (AI-powered, instant)
- Payment processing (Stripe, escrow, platform fees)
- Enterprise white-label (law firms, hospitals, wealth mgmt firms)
- Mobile apps (iOS, Android)

### Year 3 (2028): Platform Standard
**Milestone**: The standard for AI-human expert collaboration

**Metrics:**
- 500,000 individuals
- 25,000 verified experts across 7 domains
- $50M ARR (50% subscription, 50% platform fees)
- Expansion to 3 new verticals (architecture, tax, HR)

**Deliverables:**
- API for 3rd-party integrations
- Marketplace for workspace templates
- AI model fine-tuning on proprietary data
- International expansion (EU, Asia)
- Acquisitions (domain-specific competitors)

---

## Success Metrics

### North Star Metric
**Cost reduction for individuals** (target: 80-90% vs traditional experts)

### For Individuals
- **80% of cases resolved with AI only** (no expert needed)
- **< 5min to create workspace** and get first AI analysis
- **4.5+ star average experience** (ease of use + outcomes)
- **50% refer a friend** within 30 days

### For Experts
- **3x client capacity** (AI prep reduces time per client)
- **2x hourly rate** (higher value work commands premium)
- **< 5min average client prep time** (AI provides full context)
- **90% expert retention** (love the workflow)

### For Platform
- **< 10-15% platform fee** (lower than competitors' 50%)
- **80% workspace→expert conversion** when AI triggers handoff
- **30% month-over-month growth** (network effects)
- **< 2% churn rate** (individuals love it, experts love it)

### Unit Economics (Target)
```
Individual LTV: $1,200 (2 years × $50/month avg)
Individual CAC: $100 (organic + referral)
LTV:CAC = 12:1

Expert LTV: $12,000 (2 years × $500/month avg platform fees)
Expert CAC: $500 (manual outreach + vetting)
LTV:CAC = 24:1

Blended Gross Margin: 75% (subscription) + 90% (platform fees) = 80%
```

---

## Core Principles

### 1. Individual Owns All Data
- **Self-hosted option**: All data on individual's hardware, AI runs locally (Ollama/Llama)
- **Cloud encrypted**: AES-256 encryption, individual holds keys, zero-knowledge architecture
- **Enterprise**: Organizations host for members/clients with VPC isolation

**Non-negotiable**: We never have access to unencrypted individual data.

### 2. AI Does 80%, Humans Do 20%
- **AI**: Routine work (analysis, research, calculations, documentation)
- **Humans**: Liability management (diagnosis, legal judgment, complex decisions)

**The split varies by domain:**
- Legal: AI 75%, Lawyer 25% (liability-heavy)
- Research: AI 85%, Professor 15% (validation-heavy)
- Creative: AI 70%, Director 30% (vision-heavy)

### 3. Simplicity for Everyone
- **Individuals**: One workspace for all expert help (legal, medical, financial)
- **Experts**: Client already prepped, context ready, tools provided
- **Platform**: Network effects (more individuals → more experts → more individuals)

### 4. Privacy First, Always
- **No ads, ever**: We don't sell data or attention
- **No surveillance**: We don't track behavior for monetization
- **No vendor lock-in**: Export all data, delete account, self-host option

---

## What We DON'T Do

### ❌ Replace Experts
We augment experts, not replace them. Humans handle liability, complex judgment, edge cases.

### ❌ Store Unencrypted User Data
If we can read it, it's wrong. Self-hosted or client-side encryption required.

### ❌ Generic Chatbots
We build domain-specific AI with millions of embeddings, not generic GPT wrappers.

### ❌ High Platform Fees
We charge 10-15% (vs competitors' 50%) because experts do less work (AI prepped client).

### ❌ Exploit Experts
We respect their expertise. Fair pay, fair fees, fair workload.

### ❌ Centralized Control
Individuals can self-host. Organizations can white-label. We enable, not control.

---

## The Workspace Model (How It Works)

### Phase 1: Individual + AI (Most Cases Stay Here)
1. Individual creates private workspace
2. Uploads documents/data (contracts, medical records, financial statements)
3. AI analyzes with domain expertise (RAG with millions of embeddings)
4. AI provides expert-level guidance (with citations, confidence scores)
5. **80% of cases end here** (AI fully resolves the need)

### Phase 2: Adding Expert (When Needed)
1. AI determines expert needed (liability, complexity, edge case)
2. Platform matches with qualified experts (jurisdiction, specialization, budget)
3. Individual invites expert to workspace (granular access control)
4. Expert sees all context (documents, AI analysis, individual's questions)
5. Expert focuses on judgment (no need to start from scratch)

### Phase 3: Ongoing Collaboration
1. Individual uploads updates (new docs, life changes, questions)
2. AI re-analyzes with new information
3. Expert reviews updates and provides guidance
4. All communication in one secure workspace

### When Work is Done
1. Individual closes workspace
2. Expert access revoked automatically
3. Individual keeps all records
4. Can reopen or create new workspace anytime

---

## Competitive Advantages

### 1. Expert Network (Takes Years to Build)
We don't just match experts—we build trusted relationships:
- Verified credentials (licenses, degrees, certifications)
- Peer ratings and reviews
- Quality control (performance monitoring, client feedback)
- **Moat**: Takes 2-3 years to build trust in each domain

### 2. Domain Knowledge Bases (Millions of Embeddings)
We curate massive, domain-specific knowledge bases:
- Lex: 40-120K legal embeddings (jurisdictions: Zürich, California)
- Imhotep: 14.3M medical embeddings (evidence-based medicine)
- RichCat: 5M financial embeddings (tax codes, investment strategies)
- **Moat**: Proprietary curation, jurisdiction-specific, continuously updated

### 3. Workspace Platform (Switching Cost)
Once individuals use workspace:
- All documents in one place
- AI learns their preferences
- Expert relationships established
- **Moat**: Switching cost increases with usage (data, history, relationships)

### 4. AI Training Data (Proprietary)
Every workspace interaction trains our AI:
- Individual-AI conversations
- Expert-AI collaboration patterns
- Successful handoff triggers
- **Moat**: Proprietary data no competitor has

---

## Business Model

### Revenue Streams

**1. Individual Subscriptions (60% of revenue in Year 2)**
- **Basic**: $29/month (AI only, unlimited workspaces)
- **Pro**: $99/month (AI + expert matching, priority support)
- **Enterprise**: Custom (white-label, self-hosted)

**2. Expert Platform Fees (40% of revenue in Year 2)**
- **10-15% fee** on expert sessions (vs 50% for competitors)
- Lower fee justified because AI does prep (experts earn more per hour)

**3. Enterprise White-Label (growing to 30% by Year 3)**
- **Wealth management firms**: $500/seat/month
- **Law firms**: $500/seat/month
- **Hospitals**: $1,000/seat/month (HIPAA compliance)

### Unit Economics Example (Legal Workspace)

**Traditional Model:**
```
Lawyer does everything (100% of work)
Cost: CHF 300/hr × 10 hours = CHF 3,000
Lawyer earns: CHF 3,000
```

**Botsmann Model:**
```
AI does routine (80% of work): CHF 29/month
Lawyer does judgment (20% of work): CHF 300/hr × 2 hours = CHF 600

Individual pays: CHF 629 (79% savings)
Platform fee (10%): CHF 60
Lawyer earns: CHF 540 (from 2 hours instead of 10)

Lawyer hourly rate effectively: CHF 270/hr (lower)
BUT: Can serve 5x more clients → CHF 1,350/hr effective (higher)
```

**Why Experts Join:**
- Same or higher income (5x volume compensates for AI doing prep)
- Better quality of life (focus on interesting work, not routine)
- Professional growth (AI handles grunt work, expert does judgment)

---

## Market Opportunity

### Total Addressable Market (TAM)

**Legal Services:**
- Global market: $1 trillion/year
- US alone: $350 billion/year
- Botsmann TAM: 20% (routine work AI can handle) = $70B

**Medical/Health Services:**
- Global market: $8 trillion/year
- Chronic care management alone: $500B/year
- Botsmann TAM: 15% (monitoring, non-emergency) = $75B

**Financial Advisory:**
- Global market: $500 billion/year
- US alone: $70 billion/year
- Botsmann TAM: 30% (portfolio analysis, tax optimization) = $21B

**Total 7 Verticals TAM: ~$300B/year**

### Serviceable Addressable Market (SAM)
- Individuals earning $50K-$500K/year (need experts, can afford $29-99/month)
- ~200M people globally
- SAM: $50B/year (if 10% adopt at $50/month avg)

### Serviceable Obtainable Market (SOM)
- Year 1: 0.01% of SAM = $5M/year
- Year 2: 0.1% of SAM = $50M/year
- Year 3: 0.5% of SAM = $250M/year

---

## Go-To-Market Strategy

### Phase 1: Niche Domination (Year 1)
**Target**: Tech workers in Zürich needing legal/financial help

**Why Zürich tech workers?**
- High income ($100K-$300K/year) → can afford experts but don't
- Frequent legal needs (employment contracts, work permits, stock options)
- English-speaking + tech-savvy (early adopters)
- Concentrated market (easy to reach via LinkedIn, meetups)

**Channels:**
- LinkedIn ads targeting "Software Engineer in Zürich"
- Partnerships with tech companies (Stripe, Google, Meta Zürich offices)
- Referrals (50% of growth after first 100 users)

### Phase 2: Adjacent Expansion (Year 2)
**Expand to:**
1. Other Swiss cities (Basel, Geneva)
2. Other professions (finance, consulting)
3. Other countries (Germany, California)
4. Other verticals (medical for chronic conditions)

### Phase 3: Platform Play (Year 3)
**Become the platform for AI-human expert collaboration:**
- API for 3rd-party apps
- Marketplace for workspace templates
- White-label for enterprises
- Acquisitions (domain-specific competitors)

---

## Key Risks & Mitigation

### Risk 1: Experts Don't Join
**Risk**: Experts see AI as threat, don't join platform

**Mitigation:**
- Prove AI increases income (5x clients, same or higher earnings)
- Start with progressive experts (early adopters who embrace AI)
- Show data: AI prep saves 80% of time, allows focus on high-value work

### Risk 2: AI Hallucinations
**Risk**: AI gives wrong advice, causes harm, liability

**Mitigation:**
- Always show confidence scores + citations
- Clear disclaimers (AI is not a licensed professional)
- Expert handoff triggers for liability-sensitive decisions
- Insurance for platform (errors & omissions coverage)

### Risk 3: Regulatory Compliance
**Risk**: Medical/legal/financial regulations prohibit AI advice

**Mitigation:**
- AI is "educational tool" not "licensed advisor"
- Human experts provide official advice/diagnosis/decisions
- Comply with jurisdiction-specific rules (HIPAA, BAR, SEC, FINRA)
- Legal review in every jurisdiction before launch

### Risk 4: Data Breach
**Risk**: User data leaked, massive liability and trust loss

**Mitigation:**
- Self-hosted option (data never leaves user's machine)
- Client-side encryption (we can't read data even if breached)
- Security audits (quarterly penetration testing)
- Insurance (cyber liability coverage)

### Risk 5: Incumbent Response
**Risk**: LegalZoom, UpWork, traditional firms build similar product

**Mitigation:**
- Speed (launch MVP in 6 months, iterate fast)
- Expert network (hard to replicate, takes years)
- Domain knowledge (14M medical embeddings takes time to curate)
- Culture (we're AI-first, they're AI-skeptical)

---

## The Future: 7 Expert Marketplaces

**Botsmann becomes the platform for AI-human expert collaboration across:**

1. **Legal Marketplace** (Lex) - AI + lawyers
2. **Medical Marketplace** (Imhotep) - AI + doctors
3. **Research Marketplace** (Nerd) - AI + professors
4. **Language Marketplace** (Heidi) - AI + teachers
5. **Creative Marketplace** (Artr) - AI + creative directors
6. **Product Marketplace** (Trident) - AI + senior PMs
7. **Finance Marketplace** (RichCat) - AI + financial advisors

**Network Effects:**
- More individuals → More demand for experts
- More experts → Better matching and availability
- More workspaces → Better AI (learning from interactions)
- More collaboration → Higher quality outcomes

**Exit Scenarios (if applicable):**
- Acquisition by Stripe (fintech + expert services)
- Acquisition by Microsoft/Google (AI + professional services)
- Acquisition by law/medical/financial incumbent (digital transformation)
- IPO (if we become platform standard)

---

## Key Takeaway

**Botsmann democratizes expert knowledge through collaborative workspaces where:**

1. **Individuals own their data** (self-hosted or encrypted)
2. **AI does 80% of expert work** (analysis, research, documentation)
3. **Human experts do 20%** (liability management, complex judgment)
4. **Everyone wins:**
   - Individuals: 90% cost savings, instant access to expertise
   - Experts: 3x more clients, focus on high-value work
   - Platform: Network effects in 7 expert marketplaces

**The workspace is the product. The AI is the tool. The experts are the safety net. The individual is always in control.**

---

**Document Status**: ✅ Complete
**Last Updated**: October 2025
**Next Review**: After MVP launch (Q2 2026)
