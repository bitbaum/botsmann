# Nerd - AI Research Assistant

## Overview

Nerd is an AI-powered research assistant designed to enhance research workflows by organizing data, providing real-time updates, generating content, posing thought-provoking questions, facilitating collaboration, and aiming for breakthrough discoveries. The platform supports academics, scientists, journalists, students, and industry professionals in their research endeavors.

## Philosophy & Vision

Nerd envisions a future where humans and machines collaborate fluidly in pursuit of truth and knowledge. The platform is built on three core principles:

1. **Human-AI Symbiosis**: Developing intelligent systems that enhance human creativity and analytical capabilities, creating a relationship that elevates research beyond current limitations.

2. **Decentralized Access**: Democratizing research through alternative systems and removing institutional barriers that prevent brilliant minds from contributing, regardless of formal credentials.

3. **Accelerated Discovery**: Creating systems that identify promising connections across disciplines, surface overlooked research, and generate novel hypotheses—dramatically speeding the path to breakthrough discoveries.

Our platform embodies principles of Decentralized Science (DeSci), contributing to a future where scientific progress is driven by merit and collaboration rather than credentials and institutional affiliations.

## Core Features

### 1. Research Organization
- **Automated Systematization**: Organize uploaded research materials (PDFs, texts, notes) with AI-powered categorization
- **Smart Tagging**: Automatically extract and organize key concepts, authors, and methodologies
- **Knowledge Graph**: Visualize connections between research elements

### 2. Real-time Updates
- **Literature Monitoring**: Track new publications in your field from sources like arXiv and academic journals
- **News & Trends**: Stay informed about relevant developments in your research area
- **Custom Alerts**: Receive notifications for research that matches specific criteria

### 3. Content Creation
- **Research Drafts**: Generate structured content like abstracts, literature reviews, and methodology sections
- **Citation Management**: Automatic formatting of citations in various styles
- **Social Media Content**: Create shareable summaries of your research for broader audiences

### 4. Research Engagement
- **Research Rabbit Holes**: Explore thought-provoking questions related to your field
- **Discovery Mode**: Identify research gaps and suggest novel connections between concepts
- **Hypothesis Generation**: Propose testable hypotheses based on existing literature

### 5. Collaboration
- **Tool Integration**: Seamless workflows with Zotero, Notion, Google Drive, and GitHub
- **Peer Connections**: Find researchers working in similar areas
- **Resource Sharing**: Access shared datasets, code, and methodologies

### 6. Independent Research
- **Decentralized Funding**: Access alternative funding mechanisms for research projects
- **Anonymous Contributions**: Contribute to research without institutional constraints
- **Community Governance**: Participate in decision-making through decentralized structures

### 7. Collaborative Research Workspace (The Botsmann Model)

**The workspace is where researchers, AI, and academic experts collaborate on research projects.**

#### How It Works: 80/20 Split

**AI Does (80% of the work):**
- Literature review across 50M research paper embeddings
- Citation analysis and research gap identification
- Paper summarization and synthesis
- Methodology extraction and comparison
- Data analysis and visualization
- Bibliography generation and formatting

**Professor/Academic Expert Does (20% of the work - Liability Management):**
- Hypothesis validation and research direction
- Methodology critique and improvement
- Academic writing refinement
- Grant proposal strategy
- Publication guidance and peer review
- Domain expertise and theoretical grounding

#### Workspace Lifecycle

**Phase 1: Researcher + AI (Most Cases)**
1. Researcher uploads research topic, papers, notes to private workspace
2. AI analyzes with research expertise (RAG with 50M paper embeddings)
3. AI provides literature review, gap analysis, methodology suggestions
4. AI determines if academic expert needed

**Phase 2: Adding Academic Expert (When Needed)**
1. AI identifies required expertise (e.g., "quantum physics professor for methodology review")
2. Researcher invites expert to workspace with granular access control
3. Expert sees all context (literature review, AI analysis, research gaps)
4. Expert focuses on hypothesis validation and methodology (no need to re-read literature)

**Phase 3: Ongoing Collaboration**
- Researcher uploads new papers, experimental data, draft sections
- AI monitors new publications in the field
- Expert reviews progress and provides guidance
- All research materials in one secure workspace

#### Privacy & Data Ownership

Researcher owns all research data with three deployment options:
- **Self-Hosted**: All data on researcher's hardware, AI runs locally (Ollama/Llama)
- **Cloud Encrypted**: AES-256 encryption, researcher holds keys, zero-knowledge architecture
- **Enterprise**: Universities can host for researchers with compliance, VPC isolation

#### Cost Savings Example

**Traditional Model:** Professor does everything (100% of work)
- Cost: $150/hr × 20 hours = $3,000 (PhD literature review)

**Botsmann Workspace Model:** AI does literature review (80%), professor does validation (20%)
- AI Cost: $29/month
- Professor Cost: $150/hr × 4 hours = $600
- **Total: $629 vs $3,000 (79% savings)**

**Benefits:**
- 90% cost reduction for researchers
- 3x more students for professors (AI does prep)
- Better research (AI breadth + human depth)

## Component Architecture

```
research-assistant/
├── page.tsx                  # Main bot page component
├── styles.css                # Global styles
├── styles.module.css         # Component-specific styles
├── README.md                 # This documentation
├── components/               # UI components organized by feature
│   ├── navigation/           # Navigation menu components
│   │   └── Navigation.tsx    # Main navigation bar
│   ├── hero/                 # Hero section components
│   │   └── HeroSection.tsx   # Main hero introduction
│   ├── features/             # Core feature display components
│   │   ├── FeaturesSection.tsx         # Overview of all features
│   │   ├── ResearchSystemSection.tsx   # Research organization component
│   │   ├── WebScrapingSection.tsx      # Real-time updates component
│   │   └── DraftGenerationSection.tsx  # Content creation component
│   ├── questions/            # Research engagement components
│   │   ├── QuestionsSection.tsx        # Main questions container
│   │   └── DailyQuestionsSection.tsx   # Research Rabbit Holes component
│   ├── discovery/            # Discovery mode components
│   │   └── DiscoverySection.tsx        # Discovery mode interface
│   └── integration/          # Integration and collaboration components
│       ├── IntegrationSection.tsx      # Tool integration component
│       └── DevelopmentRoadmap.tsx      # Timeline and vision component
```

## Current Status

**⚠️ Proof of Concept Stage**

Nerd is currently a UI/UX concept demonstrating the vision for AI-powered research assistance. The current implementation showcases the intended user experience with static examples.

**What Works Now:**
- ✅ Complete feature showcase and UI design
- ✅ Research workflow visualization
- ✅ Interactive feature demonstrations
- ✅ DeSci philosophy and vision documentation
- ✅ Mobile-responsive design

**What's Coming (Q2-Q3 2026):**
- ⏳ Real AI integration for literature analysis
- ⏳ Vector search over academic papers (arXiv, PubMed, IEEE)
- ⏳ RAG pipeline for research synthesis
- ⏳ Real-time literature monitoring with web scraping
- ⏳ Automated citation extraction and knowledge graph generation

## Technical Implementation Plan

This section details exactly how Nerd will be built as a production-ready AI research assistant.

### AI Architecture (Planned)

```
Research Query/Upload
    ↓
Document Type Detection (Paper/Note/Question) → GPT-4
    ↓
Content Extraction (text, citations, figures, code)
    ↓
Entity Extraction (authors, institutions, concepts, methodologies)
    ↓
Vector Embedding (text-embedding-3-large)
    ↓
Multi-Source Vector Search:
  ├─ User's Research Library
  ├─ arXiv Preprints
  ├─ PubMed/PMC
  ├─ Semantic Scholar
  └─ GitHub Repositories
    ↓
Knowledge Graph Construction (concepts → papers → citations)
    ↓
RAG Pipeline → GPT-4 with Research Context
    ↓
Research Synthesis + Citations → User
```

### Core AI Components

#### 1. Research Document Processing Pipeline

**Data Sources:**
- **arXiv**: 2.3M+ preprints across STEM fields
- **Semantic Scholar**: 200M+ academic papers
- **PubMed Central**: 7M+ biomedical articles
- **IEEE Xplore**: 5M+ technical papers
- **User Uploads**: PDFs, notes, web clippings

**Document Processing:**
```typescript
// Research paper preprocessing and indexing
async function processResearchPaper(paper: ResearchDocument) {
  // 1. Extract metadata and content
  const { pdf, url, userUpload } = paper;

  let extracted;
  if (pdf) {
    extracted = await extractPDFContent(pdf);
  } else if (url) {
    extracted = await fetchAndExtractPaper(url);
  }

  const {
    title,
    authors,
    abstract,
    sections, // Introduction, Methods, Results, Discussion
    citations,
    figures,
    tables,
    codeBlocks
  } = extracted;

  // 2. Extract academic entities
  const entities = await extractAcademicEntities(extracted.fullText, {
    extractAuthors: true,
    extractInstitutions: true,
    extractConcepts: true, // Using AI to extract research concepts
    extractMethodologies: true,
    extractDatasets: true,
    extractMetrics: true
  });

  // 3. Build knowledge graph nodes
  const graphNodes = {
    paper: {
      id: paper.id,
      title,
      authors,
      year: extracted.publicationYear,
      venue: extracted.journal || extracted.conference
    },
    concepts: entities.concepts.map(c => ({ id: c.id, label: c.name })),
    citations: citations.map(c => ({ id: c.paperId, title: c.title })),
    authors: authors.map(a => ({ id: a.id, name: a.name, institution: a.affiliation }))
  };

  // 4. Semantic chunking (preserve academic structure)
  const chunks = [];

  // Abstract as standalone chunk (high importance)
  chunks.push({
    text: abstract,
    type: 'abstract',
    importance: 1.0
  });

  // Section-based chunking
  for (const section of sections) {
    const sectionChunks = await semanticChunker.split(section.text, {
      maxTokens: 800,
      overlapTokens: 100,
      respectHeadings: true,
      preserveCodeBlocks: true
    });

    chunks.push(...sectionChunks.map(c => ({
      text: c.text,
      type: section.heading.toLowerCase(), // introduction, methods, results, discussion
      importance: section.heading === 'Results' || section.heading === 'Discussion' ? 0.9 : 0.7
    })));
  }

  // 5. Generate embeddings
  const embeddings = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: chunks.map(c => c.text),
    dimensions: 3072
  });

  // 6. Store in vector database with rich metadata
  await vectorDB.upsert(
    embeddings.data.map((emb, i) => ({
      id: `${paper.id}-chunk-${i}`,
      values: emb.embedding,
      metadata: {
        paperId: paper.id,
        title,
        authors: authors.map(a => a.name).join(', '),
        year: extracted.publicationYear,
        venue: extracted.journal || extracted.conference,
        chunkType: chunks[i].type,
        chunkText: chunks[i].text,
        importance: chunks[i].importance,
        citations: citations.map(c => c.paperId),
        concepts: entities.concepts.map(c => c.name),
        methodologies: entities.methodologies,
        citationCount: extracted.citationCount || 0,
        hasCode: codeBlocks.length > 0,
        datasets: entities.datasets
      }
    }))
  );

  // 7. Update knowledge graph
  await knowledgeGraph.addNodes(graphNodes);
  await knowledgeGraph.addEdges([
    ...citations.map(c => ({ from: paper.id, to: c.paperId, type: 'cites' })),
    ...entities.concepts.map(c => ({ from: paper.id, to: c.id, type: 'studies' }))
  ]);

  return {
    paperId: paper.id,
    chunks: chunks.length,
    entities: entities.concepts.length,
    citations: citations.length
  };
}
```

**Knowledge Base Size Estimates (Per User):**
- Personal library: ~100-1000 papers → ~5K-50K embeddings
- Global research databases (shared): ~10M papers → ~50M embeddings
- Knowledge graph: ~10M nodes, ~50M edges

#### 2. Literature Discovery & Monitoring

**Real-time Literature Monitoring:**
```typescript
// Monitor new publications matching user's research interests
async function monitorLiterature(userProfile: ResearchProfile) {
  const { researchFields, keywords, followedAuthors } = userProfile;

  // 1. Build monitoring query from user profile
  const monitoringQuery = {
    fields: researchFields, // ["machine learning", "computer vision"]
    keywords, // ["object detection", "transformer models"]
    authors: followedAuthors // ["Yann LeCun", "Geoffrey Hinton"]
  };

  // 2. Scrape recent papers from sources
  const sources = [
    { name: 'arXiv', scraper: arXivScraper },
    { name: 'PubMed', scraper: pubmedScraper },
    { name: 'Semantic Scholar', scraper: semanticScholarAPI },
    { name: 'Google Scholar', scraper: googleScholarScraper } // Limited
  ];

  const newPapers = [];

  for (const source of sources) {
    const papers = await source.scraper.search({
      query: keywords.join(' OR '),
      dateFrom: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
      limit: 50
    });

    newPapers.push(...papers.map(p => ({ ...p, source: source.name })));
  }

  // 3. Filter by relevance using embeddings
  const userInterestEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: `${researchFields.join(' ')} ${keywords.join(' ')}`
  });

  const paperEmbeddings = await Promise.all(
    newPapers.map(p =>
      openai.embeddings.create({
        model: 'text-embedding-3-large',
        input: `${p.title} ${p.abstract}`
      })
    )
  );

  const rankedPapers = newPapers.map((paper, i) => ({
    ...paper,
    relevanceScore: cosineSimilarity(
      userInterestEmbedding.data[0].embedding,
      paperEmbeddings[i].data[0].embedding
    )
  })).filter(p => p.relevanceScore > 0.75) // Only highly relevant
    .sort((a, b) => b.relevanceScore - a.relevanceScore);

  // 4. Send notifications
  if (rankedPapers.length > 0) {
    await sendNotification(userProfile.userId, {
      type: 'new-papers',
      count: rankedPapers.length,
      topPapers: rankedPapers.slice(0, 5),
      summary: `${rankedPapers.length} new papers in your research area`
    });
  }

  return rankedPapers;
}
```

#### 3. Research Synthesis & Content Generation

**Literature Review Generation:**
```typescript
async function generateLiteratureReview(
  topic: string,
  userLibrary: string[], // Paper IDs
  options: {
    includeExternalPapers?: boolean;
    maxPapers?: number;
    reviewType?: 'narrative' | 'systematic' | 'meta-analysis';
  }
) {
  // 1. Find relevant papers
  const topicEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: topic
  });

  // Search user's library + external databases
  const relevantPapers = await vectorDB.query({
    vector: topicEmbedding.data[0].embedding,
    topK: options.maxPapers || 30,
    filter: options.includeExternalPapers
      ? {} // Search everything
      : { userId: userLibrary.userId } // Only user's papers
  });

  // 2. Organize papers by themes
  const paperTexts = relevantPapers.matches.map(m => ({
    id: m.metadata.paperId,
    title: m.metadata.title,
    authors: m.metadata.authors,
    year: m.metadata.year,
    abstract: m.metadata.chunkText,
    citationCount: m.metadata.citationCount
  }));

  const themes = await openai.chat.completions.create({
    model: 'gpt-4',
    temperature: 0.3,
    messages: [{
      role: 'system',
      content: 'Analyze research papers and identify 3-5 major themes or research directions.'
    }, {
      role: 'user',
      content: JSON.stringify(paperTexts.slice(0, 20)) // Top 20 papers
    }],
    response_format: { type: 'json_object' }
  });

  const identifiedThemes = JSON.parse(themes.choices[0].message.content);

  // 3. Generate review structured by themes
  const reviewSections = [];

  for (const theme of identifiedThemes.themes) {
    // Find papers related to this theme
    const themePapers = paperTexts.filter(p =>
      theme.keywords.some(k => p.title.toLowerCase().includes(k.toLowerCase()) ||
                               p.abstract.toLowerCase().includes(k.toLowerCase()))
    );

    // Generate narrative for this theme
    const narrative = await openai.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.5,
      messages: [{
        role: 'system',
        content: `You are a research assistant writing a literature review section.
                  Synthesize the provided papers into a coherent narrative.
                  Focus on: key findings, methodologies, trends, and gaps.
                  Use academic tone and proper citations.`
      }, {
        role: 'user',
        content: `Theme: ${theme.name}\n\nPapers:\n${JSON.stringify(themePapers, null, 2)}`
      }]
    });

    reviewSections.push({
      theme: theme.name,
      content: narrative.choices[0].message.content,
      papers: themePapers
    });
  }

  // 4. Generate introduction and conclusion
  const introduction = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: 'Write an introduction for a literature review that outlines the themes covered.'
    }, {
      role: 'user',
      content: `Topic: ${topic}\n\nThemes: ${identifiedThemes.themes.map(t => t.name).join(', ')}`
    }]
  });

  const conclusion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: 'Write a conclusion summarizing key insights and identifying research gaps.'
    }, {
      role: 'user',
      content: JSON.stringify(reviewSections)
    }]
  });

  return {
    title: `Literature Review: ${topic}`,
    introduction: introduction.choices[0].message.content,
    sections: reviewSections,
    conclusion: conclusion.choices[0].message.content,
    references: paperTexts,
    generatedAt: new Date()
  };
}
```

#### 4. Knowledge Graph & Research Gaps

**Research Gap Identification:**
```typescript
async function identifyResearchGaps(researchArea: string) {
  // 1. Build knowledge graph for the research area
  const areaEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: researchArea
  });

  const papers = await vectorDB.query({
    vector: areaEmbedding.data[0].embedding,
    topK: 100
  });

  // 2. Analyze citation patterns
  const citationNetwork = await knowledgeGraph.getCitationNetwork(
    papers.matches.map(p => p.metadata.paperId)
  );

  // 3. Identify under-explored connections
  const concepts = await knowledgeGraph.getConceptsInArea(researchArea);
  const underconnectedConcepts = concepts.filter(c => c.connectionCount < 5);

  // 4. Use GPT-4 to generate gap hypotheses
  const gaps = await openai.chat.completions.create({
    model: 'gpt-4',
    temperature: 0.7,
    messages: [{
      role: 'system',
      content: `You are a research strategist identifying research gaps.
                Analyze the provided research landscape and suggest:
                1. Underexplored connections between concepts
                2. Missing methodological approaches
                3. Novel research questions
                4. Interdisciplinary opportunities`
    }, {
      role: 'user',
      content: `Research Area: ${researchArea}\n\nUnderconnected Concepts: ${JSON.stringify(underconnectedConcepts)}\n\nCitation Network Summary: ${JSON.stringify(citationNetwork.summary)}`
    }],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(gaps.choices[0].message.content);
}
```

### Vector Database Architecture

**Choice: Qdrant (Research-Specific)**

*Rationale:* Academic research requires:
1. **Open Source**: Important for research transparency
2. **Advanced Filtering**: Complex metadata queries (year, venue, author, citation count)
3. **Knowledge Graph Support**: Native graph capabilities for citation networks
4. **Self-Hostable**: Control over sensitive research data

**Schema:**
```typescript
// Qdrant Collection: research-papers
{
  id: "arxiv-2304.12345-chunk-3",
  vector: [0.023, -0.891, ...], // 3072-dim
  payload: {
    paperId: "arxiv-2304.12345",
    title: "Attention Is All You Need",
    authors: ["Vaswani et al."],
    year: 2017,
    venue: "NeurIPS",
    chunkType: "results", // abstract, intro, methods, results, discussion
    chunkText: "...",
    importance: 0.9,
    citations: ["arxiv-1706.03762", ...],
    citationCount: 15234,
    concepts: ["transformer", "attention mechanism", "neural networks"],
    methodologies: ["deep learning", "sequence-to-sequence"],
    datasets: ["WMT2014"],
    hasCode: true,
    codeUrl: "https://github.com/...",
    userId: "user-123" // For personal library
  }
}
```

### API Implementation

**Endpoint: Research Query**
```typescript
// POST /api/research/query
interface ResearchQueryRequest {
  query: string;
  searchScope: 'my-library' | 'global' | 'both';
  filters?: {
    years?: [number, number];
    venues?: string[];
    authors?: string[];
    minCitations?: number;
  };
}

interface ResearchQueryResponse {
  papers: ResearchPaper[];
  synthesis: string; // AI-generated summary
  gaps: ResearchGap[];
  relatedConcepts: string[];
}

export async function POST(req: Request) {
  const data: ResearchQueryRequest = await req.json();

  // 1. Generate query embedding
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: data.query
  });

  // 2. Search vector database
  const results = await vectorDB.query({
    vector: queryEmbedding.data[0].embedding,
    topK: 20,
    filter: buildFilter(data.searchScope, data.filters)
  });

  // 3. Synthesize findings
  const synthesis = await synthesizeResearch(data.query, results.matches);

  // 4. Identify gaps
  const gaps = await identifyResearchGaps(data.query);

  return Response.json({
    papers: results.matches,
    synthesis,
    gaps,
    relatedConcepts: extractConcepts(results.matches)
  });
}
```

### State Management

#### Current (Proof of Concept)
Nerd uses React's built-in state management with hooks for component-level state. Components that need to share state use prop-drilling or context where appropriate. The primary state elements include:

- **User Preferences**: Research fields, notification settings, tool connections
- **Content State**: Active sections, selected research materials, draft progress
- **UI State**: Navigation state, active tabs, mobile responsiveness

#### Planned (Production)
- **Frontend**: Next.js 14 + TypeScript + Zustand (global state)
- **AI/ML**: OpenAI GPT-4 + text-embedding-3-large
- **Vector DB**: Qdrant (self-hosted for privacy)
- **Knowledge Graph**: Neo4j for citation networks
- **Document Processing**: PyMuPDF, GROBID for PDF parsing
- **Web Scraping**: Playwright for literature monitoring
- **Search APIs**: arXiv API, Semantic Scholar API, PubMed E-utilities
- **Integrations**: Zotero, Notion, Google Drive, GitHub APIs
- **Caching**: Redis for frequently accessed papers
- **Queue**: BullMQ for background paper processing

### Technical Implementation Details

#### Component Documentation

##### Navigation Component
The `Navigation` component provides a responsive menu that highlights the six core functions of Nerd. It implements scroll-based appearance/disappearance and smooth scrolling to sections.

##### Hero Section
The `HeroSection` component introduces users to Nerd with a compelling value proposition and call-to-action. It animates key features and provides a visually engaging introduction.

##### Feature Components
- `ResearchSystemSection`: Demonstrates how Nerd organizes research with interactive visualization
- `WebScrapingSection`: Shows real-time update capabilities with example feeds
- `DraftGenerationSection`: Showcases content creation with interactive examples of different document types

##### Research Engagement Components
- `QuestionsSection`: Provides the container for research questions
- `DailyQuestionsSection`: Implements the Research Rabbit Holes feature with customizable questions by research field

##### Discovery Component
The `DiscoverySection` demonstrates how Nerd identifies research gaps and suggests novel connections with interactive examples across different research domains.

##### Integration Components
- `IntegrationSection`: Shows tool integration capabilities and collaboration features
- `DevelopmentRoadmap`: Displays development timeline, vision, and collaboration opportunities

#### Adding New Features

To add new features to Nerd:

1. Create a new component in the appropriate subdirectory of `components/`
2. Document the component with JSDoc comments
3. Update the relevant section in `page.tsx` to include your new component
4. If needed, add new styles in `styles.module.css`

## Development Timeline

Nerd is under active development with a planned launch in Q3 2027. Key milestones include:

- **2025 Q1**: Concept Development (Complete)
- **2025 Q3**: Alpha Research Organizer
- **2026 Q1**: Beta Testing Program
- **2026 Q3**: Content Creation Engine
- **2026 Q4**: Engagement & Discovery Mode
- **2027 Q1**: Collaboration Platform
- **2027 Q2**: Independent Research Features
- **2027 Q3**: Full Launch

## Integration with External Tools

Nerd is designed to integrate with popular research tools:

- **Zotero**: Reference management and paper organization
- **Notion**: Project management and collaborative notes
- **Google Drive**: Document storage and collaboration
- **GitHub**: Code management and version control

## Contributing

Nerd is developed by a team of engineers, researchers, and domain experts. If you're interested in contributing, please contact us at collaborate@nerd.ai.

## License

Nerd is proprietary software. All rights reserved. 