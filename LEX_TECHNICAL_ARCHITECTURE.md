# Lex - Technical Architecture Documentation

## 📐 System Architecture

### High-Level Overview
```
┌─────────────────────────────────────────────────────────┐
│                     Client Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Web App    │  │  Mobile App  │  │   Desktop    │  │
│  │  (Next.js)   │  │(React Native)│  │   (Tauri)    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────┐
│                      API Gateway                         │
│              (GraphQL / REST / WebSocket)                │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Auth Service│    │  AI Service  │    │ File Service │
│   (Auth0)    │    │  (OpenAI)    │    │    (S3)      │
└──────────────┘    └──────────────┘    └──────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  PostgreSQL  │  │    Redis     │  │  Vector DB   │  │
│  │  (Main DB)   │  │   (Cache)    │  │  (Pinecone)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🗂️ Data Models

### Core Entities

#### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'attorney' | 'paralegal' | 'admin';
  avatar?: string;
  verified: boolean;
  createdAt: Date;
  lastLogin: Date;
}
```

#### Case
```typescript
interface Case {
  id: string;
  clientId: string;
  jurisdiction: string; // Hierarchical code (e.g., "US-CA-LA")
  legalArea: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'draft' | 'active' | 'resolved' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}
```

#### DataRoom
```typescript
interface DataRoom {
  id: string;
  caseId: string;
  name: string;
  participants: Participant[];
  files: File[];
  messages: Message[];
  timeline: TimelineEvent[];
  createdAt: Date;
}

interface Participant {
  userId: string;
  role: 'owner' | 'attorney' | 'paralegal' | 'advisor' | 'viewer';
  permissions: Permission[];
  joinedAt: Date;
}

interface Permission {
  resource: 'files' | 'messages' | 'timeline' | 'settings';
  actions: ('read' | 'write' | 'delete' | 'share')[];
}
```

#### Message
```typescript
interface Message {
  id: string;
  dataRoomId: string;
  senderId: string;
  senderType: 'user' | 'ai' | 'lawyer';
  content: string;
  encrypted: boolean;
  fileAttachments?: string[];
  metadata?: {
    citations?: string[];
    confidence?: number;
    aiGenerated?: boolean;
  };
  createdAt: Date;
  readBy: { userId: string; readAt: Date }[];
}
```

#### File
```typescript
interface File {
  id: string;
  dataRoomId: string;
  uploaderId: string;
  name: string;
  type: string;
  size: number;
  category: FileCategory;
  encrypted: boolean;
  storageUrl: string;
  aiAnalysis?: {
    summary: string;
    keyPoints: string[];
    entities: { type: string; value: string }[];
    redFlags?: string[];
  };
  annotations: Annotation[];
  uploadedAt: Date;
}

type FileCategory =
  | 'evidence'
  | 'contracts'
  | 'correspondence'
  | 'court-filings'
  | 'identification'
  | 'financial'
  | 'medical'
  | 'other';
```

#### Lawyer
```typescript
interface Lawyer {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  bio: string;
  expertise: string[];
  jurisdictions: string[];
  rating: number;
  casesHandled: number;
  responseTime: string; // "< 2 hours"
  hourlyRate: number;
  languages: string[];
  availability: 'available' | 'busy' | 'offline';
  certifications: Certification[];
  reviews: Review[];
}
```

---

## 🔐 Security Architecture

### Authentication Flow
```
1. User visits app
2. Redirect to Auth0 login
3. Auth0 validates credentials
4. Return JWT token + refresh token
5. Store tokens (httpOnly cookies)
6. Use JWT for API requests
7. Refresh token before expiry
```

### Encryption Layers

#### 1. Transport Layer (TLS)
- All connections use HTTPS/WSS
- TLS 1.3 minimum
- Perfect forward secrecy

#### 2. Application Layer (E2E)
```typescript
// Message encryption flow
async function sendMessage(content: string) {
  const publicKey = await getRecipientPublicKey();
  const encrypted = await encrypt(content, publicKey);
  await api.sendMessage({ encrypted });
}

async function receiveMessage(encrypted: string) {
  const privateKey = await getMyPrivateKey();
  const decrypted = await decrypt(encrypted, privateKey);
  return decrypted;
}
```

#### 3. Storage Layer
- Files encrypted at rest (AES-256)
- Database fields encrypted (column-level)
- Key management via AWS KMS/Azure Key Vault

### Access Control Matrix

| Role | View Files | Upload | Edit | Delete | Invite | Manage Permissions |
|------|-----------|--------|------|--------|--------|-------------------|
| Owner (Client) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Attorney | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Paralegal | 🔒* | ✅ | 🔒* | ❌ | ❌ | ❌ |
| Advisor | 🔒* | ❌ | ❌ | ❌ | ❌ | ❌ |
| Viewer | 🔒* | ❌ | ❌ | ❌ | ❌ | ❌ |

*🔒 = Based on granted permissions

---

## 🤖 AI Integration

### AI Service Architecture
```
┌─────────────┐
│   Client    │
└─────────────┘
       │
       ↓
┌─────────────────────────────────────┐
│        AI Service (FastAPI)         │
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │ OpenAI   │  │ Anthropic│        │
│  │  API     │  │  Claude  │        │
│  └──────────┘  └──────────┘        │
│                                     │
│  ┌──────────────────────────────┐  │
│  │    Vector Database           │  │
│  │    (Pinecone/Weaviate)       │  │
│  │  - Legal precedents          │  │
│  │  - Statutes                  │  │
│  │  - Case summaries            │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

### AI Capabilities

#### 1. Document Analysis
```python
async def analyze_document(file_path: str) -> Analysis:
    # Extract text
    text = extract_text(file_path)

    # NLP processing
    entities = extract_entities(text)
    key_clauses = extract_clauses(text)
    dates = extract_dates(text)

    # Legal analysis
    risk_assessment = assess_risks(text, key_clauses)
    precedents = find_precedents(text)

    return Analysis(
        summary=generate_summary(text),
        entities=entities,
        key_clauses=key_clauses,
        dates=dates,
        risks=risk_assessment,
        related_precedents=precedents
    )
```

#### 2. Smart Categorization
```python
async def categorize_file(filename: str, content: str) -> FileCategory:
    # Lightweight filename check
    category = check_filename_patterns(filename)
    if category:
        return category

    # NLP-based categorization
    embeddings = await get_embeddings(content[:1000])  # First 1000 chars
    category = classify_document(embeddings)

    return category
```

#### 3. Conversational AI
```python
async def generate_response(
    message: str,
    context: CaseContext,
    conversation_history: List[Message]
) -> str:
    # Build context
    prompt = build_prompt(
        message=message,
        case_details=context.case_details,
        jurisdiction=context.jurisdiction,
        files=context.files_summary,
        history=conversation_history[-10:]  # Last 10 messages
    )

    # Generate with citations
    response = await openai.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": LEGAL_ASSISTANT_PROMPT},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=1000
    )

    # Add citations
    cited_response = add_citations(response.content, context)

    return cited_response
```

---

## 📡 Real-Time Communication

### WebSocket Architecture
```typescript
// Server-side (Node.js + Socket.io)
io.on('connection', (socket) => {
  // Authenticate
  const user = await authenticate(socket.handshake.auth.token);

  // Join data room
  socket.join(`dataroom-${user.dataRoomId}`);

  // Handle messages
  socket.on('message', async (data) => {
    // Save to DB
    const message = await saveMessage(data);

    // Broadcast to room (except sender)
    socket.to(`dataroom-${user.dataRoomId}`).emit('message', message);

    // Trigger AI response if needed
    if (data.triggerAI) {
      const aiResponse = await generateAIResponse(data);
      io.to(`dataroom-${user.dataRoomId}`).emit('message', aiResponse);
    }
  });

  // Typing indicator
  socket.on('typing', () => {
    socket.to(`dataroom-${user.dataRoomId}`).emit('userTyping', {
      userId: user.id,
      username: user.name
    });
  });
});
```

### Message Queue (Future: Production)
```
┌─────────────┐
│   Client    │
└─────────────┘
       │
       ↓
┌─────────────────┐
│   API Server    │
└─────────────────┘
       │
       ↓
┌─────────────────┐
│  RabbitMQ/SQS   │
└─────────────────┘
       │
   ┌───┴───┐
   ↓       ↓
┌──────┐ ┌────────┐
│  AI  │ │ Email  │
│Worker│ │ Worker │
└──────┘ └────────┘
```

---

## 📊 File Processing Pipeline

### Upload Flow
```
1. Client selects file
2. Client-side validation (size, type)
3. Generate upload URL (signed S3 URL)
4. Upload directly to S3
5. Trigger processing webhook
6. AI analyzes file
7. Extract metadata
8. Categorize automatically
9. Update database
10. Notify user (WebSocket)
```

### Processing Pipeline (Detailed)
```typescript
async function processFile(fileId: string) {
  const file = await getFile(fileId);

  // Step 1: Virus scan
  await scanForVirus(file.storageUrl);

  // Step 2: Extract text
  const text = await extractText(file.storageUrl, file.type);

  // Step 3: Generate embeddings
  const embeddings = await generateEmbeddings(text);

  // Step 4: Store in vector DB
  await vectorDB.upsert({
    id: fileId,
    values: embeddings,
    metadata: {
      caseId: file.caseId,
      category: file.category
    }
  });

  // Step 5: AI analysis
  const analysis = await analyzeDocument(text);

  // Step 6: Update database
  await updateFile(fileId, {
    aiAnalysis: analysis,
    status: 'processed'
  });

  // Step 7: Notify user
  await notifyUser(file.uploaderId, {
    type: 'file_processed',
    fileId,
    summary: analysis.summary
  });
}
```

---

## 🔍 Search & Discovery

### Vector Search (Semantic)
```python
async def search_documents(query: str, case_id: str) -> List[SearchResult]:
    # Generate query embedding
    query_embedding = await get_embeddings(query)

    # Search vector database
    results = await vector_db.query(
        vector=query_embedding,
        filter={"case_id": case_id},
        top_k=10,
        include_metadata=True
    )

    # Rank by relevance
    ranked = rank_results(results, query)

    return ranked
```

### Hybrid Search (Keyword + Semantic)
```python
async def hybrid_search(
    query: str,
    case_id: str,
    filters: Dict
) -> List[SearchResult]:
    # Keyword search (Elasticsearch)
    keyword_results = await es.search(
        index="documents",
        body={
            "query": {
                "bool": {
                    "must": [
                        {"match": {"content": query}},
                        {"term": {"case_id": case_id}}
                    ],
                    "filter": filters
                }
            }
        }
    )

    # Semantic search (Vector DB)
    semantic_results = await search_documents(query, case_id)

    # Merge and re-rank
    merged = merge_results(keyword_results, semantic_results)

    return merged
```

---

## 📈 Performance Optimization

### Caching Strategy
```typescript
// Multi-layer caching
class CacheService {
  // L1: In-memory (fastest, smallest)
  private memoryCache = new Map();

  // L2: Redis (fast, shared across instances)
  private redisClient: Redis;

  // L3: Database (slowest, persistent)
  private db: Database;

  async get(key: string): Promise<any> {
    // Try L1
    if (this.memoryCache.has(key)) {
      return this.memoryCache.get(key);
    }

    // Try L2
    const redisValue = await this.redisClient.get(key);
    if (redisValue) {
      this.memoryCache.set(key, redisValue);
      return redisValue;
    }

    // Fallback to L3
    const dbValue = await this.db.get(key);
    if (dbValue) {
      await this.redisClient.set(key, dbValue, 'EX', 3600);
      this.memoryCache.set(key, dbValue);
      return dbValue;
    }

    return null;
  }
}
```

### Database Optimization
```sql
-- Indexes for fast queries
CREATE INDEX idx_cases_client_id ON cases(client_id);
CREATE INDEX idx_messages_dataroom_id ON messages(data_room_id, created_at DESC);
CREATE INDEX idx_files_category ON files(category, data_room_id);

-- Partial index for active cases
CREATE INDEX idx_active_cases ON cases(status) WHERE status = 'active';

-- Full-text search
CREATE INDEX idx_files_content_search ON files USING GIN(to_tsvector('english', content));
```

### CDN Strategy
```
Static Assets:
  - Images → CloudFlare CDN
  - JS/CSS bundles → Vercel Edge Network
  - User uploads → CloudFront (S3)

Dynamic Content:
  - API responses → Redis cache
  - Chat messages → WebSocket (no cache)
  - AI responses → Conditional cache (if deterministic)
```

---

## 🧪 Testing Strategy

### Unit Tests (Jest + React Testing Library)
```typescript
describe('JurisdictionSelector', () => {
  it('should show popular jurisdictions first', () => {
    const { getByText } = render(<JurisdictionSelector {...props} />);
    expect(getByText('United States')).toBeInTheDocument();
    expect(getByText('Dubai')).toBeInTheDocument();
  });

  it('should drill down to states when country selected', async () => {
    const { getByText, getByRole } = render(<JurisdictionSelector {...props} />);

    fireEvent.click(getByText('United States'));

    await waitFor(() => {
      expect(getByText('California')).toBeInTheDocument();
      expect(getByText('New York')).toBeInTheDocument();
    });
  });
});
```

### Integration Tests (Playwright)
```typescript
test('complete case creation flow', async ({ page }) => {
  // Step 1: Jurisdiction
  await page.goto('/demo');
  await page.click('text=United States');
  await page.click('text=California');

  // Step 2: Legal area
  await page.click('text=Immigration Law');

  // Step 3: Description
  await page.fill('textarea', 'Need help with work visa application');

  // Step 4: Find lawyer
  await page.click('button:has-text("Find Lawyers")');

  // Step 5: Select lawyer
  await page.click('.lawyer-card:first-child');

  // Step 6: Create workspace
  await page.click('button:has-text("Create Workspace")');

  // Verify data room opened
  await expect(page.locator('.data-room')).toBeVisible();
});
```

### E2E Tests (Cypress)
```typescript
describe('Data Room Chat', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/data-room/test-case-123');
  });

  it('should send message and receive AI response', () => {
    cy.get('input[placeholder="Type your message..."]')
      .type('What documents do I need?{enter}');

    // Verify message sent
    cy.contains('What documents do I need?').should('be.visible');

    // Wait for AI response
    cy.contains('Based on your case', { timeout: 5000 })
      .should('be.visible');
  });
});
```

---

## 🚀 Deployment

### CI/CD Pipeline (GitHub Actions)
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Infrastructure as Code (Terraform)
```hcl
# AWS Infrastructure
resource "aws_s3_bucket" "file_storage" {
  bucket = "lex-file-storage-${var.environment}"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  versioning {
    enabled = true
  }
}

resource "aws_rds_instance" "postgres" {
  identifier = "lex-db-${var.environment}"
  engine     = "postgres"
  engine_version = "15.3"
  instance_class = "db.t3.medium"

  encrypted = true
  backup_retention_period = 30

  multi_az = var.environment == "production"
}
```

### Monitoring & Observability
```typescript
// Sentry for error tracking
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event, hint) {
    // Filter sensitive data
    if (event.request) {
      delete event.request.headers.authorization;
    }
    return event;
  }
});

// DataDog for metrics
const StatsD = require('hot-shots');
const dogstatsd = new StatsD();

// Track API latency
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    dogstatsd.histogram('api.request.duration', duration, {
      endpoint: req.path,
      method: req.method,
      status: res.statusCode
    });
  });
  next();
});
```

---

## 📚 API Documentation

### GraphQL Schema (Future)
```graphql
type Query {
  case(id: ID!): Case
  dataRoom(id: ID!): DataRoom
  lawyers(filters: LawyerFilters): [Lawyer!]!
  searchDocuments(query: String!, caseId: ID!): [SearchResult!]!
}

type Mutation {
  createCase(input: CreateCaseInput!): Case!
  sendMessage(input: SendMessageInput!): Message!
  uploadFile(input: UploadFileInput!): File!
  inviteParticipant(dataRoomId: ID!, userId: ID!, role: ParticipantRole!): Participant!
}

type Subscription {
  messageAdded(dataRoomId: ID!): Message!
  fileProcessed(dataRoomId: ID!): File!
  userTyping(dataRoomId: ID!): TypingIndicator!
}
```

### REST API Endpoints (Current)
```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/cases
POST   /api/cases
GET    /api/cases/:id
PATCH  /api/cases/:id

GET    /api/datarooms/:id
POST   /api/datarooms/:id/messages
GET    /api/datarooms/:id/files
POST   /api/datarooms/:id/files
DELETE /api/datarooms/:id/files/:fileId

GET    /api/lawyers
GET    /api/lawyers/:id
POST   /api/lawyers/:id/book

WS     /ws/dataroom/:id
```

---

*This architecture is designed to scale from MVP to millions of users while maintaining security, performance, and developer experience.*
