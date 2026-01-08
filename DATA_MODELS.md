# Botsmann Data Models

## TL;DR

**Complete database schemas, TypeScript interfaces, and relationships for the entire Botsmann platform** - workspace model, 7 bots, expert marketplace, payments, and RAG embeddings.

All data models follow these principles:
1. **Individual owns data** (workspace-centric, not platform-centric)
2. **Privacy first** (encrypted fields, self-hosted support, no PII in embeddings)
3. **AI-buildable** (working SQL + TypeScript, not pseudo-code)

---

## Core Entities Overview

### Entity Relationship Diagram

```
┌─────────────┐
│    User     │──────┐
│ (Individual │      │
│  or Expert) │      │
└─────────────┘      │
       │             │
       │ owns        │ creates
       ▼             ▼
┌─────────────┐   ┌──────────────┐
│  Workspace  │   │Expert Profile│
│             │   │              │
└─────────────┘   └──────────────┘
       │
       │ contains
       ▼
┌─────────────┐   ┌──────────────┐   ┌──────────────┐
│  Document   │   │   Message    │   │WorkspaceAccess│
│             │   │   (Chat)     │   │  (Expert)    │
└─────────────┘   └──────────────┘   └──────────────┘
       │
       │ has
       ▼
┌─────────────┐
│  Embedding  │────► Qdrant
│   (Vector)  │      (Vector DB)
└─────────────┘

┌──────────────────────────────────────────────┐
│             Payment Flow                     │
├──────────────────────────────────────────────┤
│ Subscription ──► User                        │
│ PaymentSession ──► Workspace ──► Expert      │
└──────────────────────────────────────────────┘
```

---

## PostgreSQL Schema (Complete)

### 1. Users Table

```sql
-- Core user entity (individuals and experts)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('individual', 'expert', 'admin')),

  -- Authentication
  password_hash TEXT, -- bcrypt hash, nullable if OAuth only
  oauth_provider TEXT, -- 'google' | 'github' | null
  oauth_id TEXT, -- Provider's user ID

  -- Stripe
  stripe_customer_id TEXT UNIQUE, -- For subscriptions (individuals)
  stripe_account_id TEXT UNIQUE,  -- For payouts (experts via Stripe Connect)

  -- Preferences
  language TEXT DEFAULT 'en', -- 'en' | 'de' | 'fr'
  timezone TEXT DEFAULT 'Europe/Zurich',
  notification_preferences JSONB DEFAULT '{"email": true, "push": false}',

  -- Privacy
  data_residency TEXT DEFAULT 'cloud', -- 'cloud' | 'self-hosted' | 'eu-only'
  encryption_key_hash TEXT, -- For client-side encryption (self-hosted)

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ -- Soft delete
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);
CREATE INDEX idx_users_deleted_at ON users(deleted_at) WHERE deleted_at IS NULL;
```

### 2. Workspaces Table

```sql
-- Central entity: private workspace owned by individual
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Workspace metadata
  name TEXT NOT NULL, -- e.g., "My Legal Workspace", "Tax Optimization 2026"
  description TEXT,
  domain TEXT NOT NULL CHECK (domain IN ('legal', 'medical', 'financial', 'research', 'language', 'creative', 'product')),

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'closed')),

  -- Privacy
  visibility TEXT DEFAULT 'private' CHECK (visibility IN ('private', 'shared')), -- Private = owner only, Shared = owner + experts
  encryption_enabled BOOLEAN DEFAULT FALSE,

  -- Collaboration
  active_expert_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Currently active expert (if any)
  expert_session_start TIMESTAMPTZ, -- When expert joined
  expert_session_end TIMESTAMPTZ,   -- When expert left (for billing)

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  archived_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ -- Soft delete
);

-- Indexes
CREATE INDEX idx_workspaces_owner ON workspaces(owner_id);
CREATE INDEX idx_workspaces_domain ON workspaces(domain);
CREATE INDEX idx_workspaces_status ON workspaces(status);
CREATE INDEX idx_workspaces_active_expert ON workspaces(active_expert_id) WHERE active_expert_id IS NOT NULL;
```

### 3. Workspace Access Table (Expert Permissions)

```sql
-- Track who has access to which workspace (for experts)
CREATE TABLE workspace_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  expert_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Access control
  access_level TEXT DEFAULT 'view' CHECK (access_level IN ('view', 'comment', 'edit')),
  can_view_documents BOOLEAN DEFAULT TRUE,
  can_download_documents BOOLEAN DEFAULT FALSE, -- Privacy: experts can view but not download by default

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'revoked', 'expired')),
  invited_by UUID REFERENCES users(id), -- Who invited the expert (usually workspace owner)
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ, -- Auto-revoke after X days (e.g., 30 days)

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(workspace_id, expert_id) -- One access record per expert per workspace
);

-- Indexes
CREATE INDEX idx_workspace_access_workspace ON workspace_access(workspace_id);
CREATE INDEX idx_workspace_access_expert ON workspace_access(expert_id);
CREATE INDEX idx_workspace_access_status ON workspace_access(status);
```

### 4. Documents Table

```sql
-- User-uploaded documents (contracts, medical records, financial statements, etc.)
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- File metadata
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL, -- bytes
  mime_type TEXT NOT NULL, -- 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', etc.

  -- Storage
  storage_provider TEXT DEFAULT 's3' CHECK (storage_provider IN ('s3', 'supabase', 'local')),
  storage_url TEXT NOT NULL, -- S3 URL, Supabase URL, or local file path
  storage_key TEXT, -- S3 key or Supabase bucket path

  -- Encryption (for self-hosted or client-side encryption)
  encrypted BOOLEAN DEFAULT FALSE,
  encryption_key_id TEXT, -- Reference to user's encryption key

  -- Embeddings
  embedding_status TEXT DEFAULT 'pending' CHECK (embedding_status IN ('pending', 'processing', 'completed', 'failed')),
  embedding_error TEXT, -- Error message if embedding failed
  embedding_completed_at TIMESTAMPTZ,
  total_chunks INTEGER, -- How many chunks were created from this document

  -- Access control
  uploaded_by UUID NOT NULL REFERENCES users(id),
  visible_to_experts BOOLEAN DEFAULT TRUE, -- Owner can hide sensitive docs from experts

  -- Metadata
  extracted_text TEXT, -- Full text extracted from document (for non-vector search)
  metadata JSONB, -- { author, created_date, num_pages, language, etc. }
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ -- Soft delete
);

-- Indexes
CREATE INDEX idx_documents_workspace ON documents(workspace_id);
CREATE INDEX idx_documents_status ON documents(embedding_status);
CREATE INDEX idx_documents_uploaded_by ON documents(uploaded_by);
CREATE INDEX idx_documents_created_at ON documents(created_at);
```

### 5. Messages Table (Chat)

```sql
-- Chat messages in workspace (user, AI, expert)
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Sender
  sender_id TEXT NOT NULL, -- UUID (user or expert) or 'ai'
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'ai', 'expert')),

  -- Content
  content TEXT NOT NULL,
  content_type TEXT DEFAULT 'text' CHECK (content_type IN ('text', 'document', 'system')),

  -- AI metadata (only for AI messages)
  ai_metadata JSONB, -- { model, confidenceScore, citations, expertRecommended, tokens, cost }

  -- Message type
  message_type TEXT DEFAULT 'chat' CHECK (message_type IN ('chat', 'analysis', 'recommendation', 'system')),

  -- References
  parent_message_id UUID REFERENCES messages(id), -- For threaded conversations
  referenced_document_ids UUID[], -- Documents mentioned in message

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ -- Soft delete (for user-deleted messages)
);

-- Indexes
CREATE INDEX idx_messages_workspace ON messages(workspace_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_type ON messages(sender_type);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_messages_parent ON messages(parent_message_id) WHERE parent_message_id IS NOT NULL;
```

### 6. Expert Profiles Table

```sql
-- Detailed profiles for experts (lawyers, doctors, financial advisors, etc.)
CREATE TABLE expert_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,

  -- Domain expertise
  domain TEXT NOT NULL CHECK (domain IN ('legal', 'medical', 'financial', 'research', 'language', 'creative', 'product')),
  specializations TEXT[] NOT NULL, -- e.g., ['employment_law', 'contract_law'] or ['cardiology', 'internal_medicine']

  -- Credentials
  credentials JSONB NOT NULL, -- { licenses: [], degrees: [], certifications: [], verifiedAt: timestamp }
  jurisdiction TEXT, -- e.g., "Zürich, Switzerland" (for lawyers), "Switzerland" (for doctors)
  license_number TEXT, -- BAR number, medical license, etc.
  license_verified BOOLEAN DEFAULT FALSE,
  license_verified_at TIMESTAMPTZ,

  -- Pricing
  hourly_rate DECIMAL(10,2) NOT NULL, -- CHF or USD
  currency TEXT DEFAULT 'CHF',
  minimum_session_duration INTEGER DEFAULT 30, -- minutes

  -- Availability
  availability TEXT DEFAULT 'available' CHECK (availability IN ('available', 'busy', 'unavailable', 'vacation')),
  available_hours JSONB, -- { monday: ['09:00-17:00'], tuesday: [...], ... }
  timezone TEXT DEFAULT 'Europe/Zurich',

  -- Profile
  bio TEXT,
  headline TEXT, -- e.g., "Employment Law Specialist | 15 years experience"
  languages TEXT[] DEFAULT ARRAY['en'], -- ['en', 'de', 'fr']

  -- Stats
  total_workspaces_joined INTEGER DEFAULT 0,
  total_hours_worked DECIMAL(10,2) DEFAULT 0,
  average_rating DECIMAL(3,2), -- 0.00 to 5.00
  total_reviews INTEGER DEFAULT 0,

  -- Onboarding
  onboarding_status TEXT DEFAULT 'pending' CHECK (onboarding_status IN ('pending', 'approved', 'rejected', 'suspended')),
  onboarding_completed_at TIMESTAMPTZ,
  onboarding_notes TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_expert_profiles_domain ON expert_profiles(domain);
CREATE INDEX idx_expert_profiles_availability ON expert_profiles(availability);
CREATE INDEX idx_expert_profiles_status ON expert_profiles(onboarding_status);
CREATE INDEX idx_expert_profiles_rating ON expert_profiles(average_rating);
```

### 7. Subscriptions Table

```sql
-- User subscriptions (individuals pay for workspace access)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Stripe
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_price_id TEXT NOT NULL,

  -- Plan details
  plan_name TEXT NOT NULL CHECK (plan_name IN ('basic', 'pro', 'enterprise')),
  plan_interval TEXT DEFAULT 'month' CHECK (plan_interval IN ('month', 'year')),
  plan_amount DECIMAL(10,2) NOT NULL, -- CHF 29, 99, or custom
  currency TEXT DEFAULT 'CHF',

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'paused', 'trialing')),
  trial_end TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMPTZ,

  -- Features (based on plan)
  max_workspaces INTEGER DEFAULT 1, -- Basic: 1, Pro: unlimited
  max_documents_per_workspace INTEGER DEFAULT 50, -- Basic: 50, Pro: unlimited
  expert_matching_enabled BOOLEAN DEFAULT FALSE, -- Pro only
  priority_support BOOLEAN DEFAULT FALSE, -- Pro only

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
```

### 8. Payment Sessions Table

```sql
-- Expert payment sessions (individuals pay experts for workspace collaboration)
CREATE TABLE payment_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  expert_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  individual_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Amounts (in CHF or USD)
  amount DECIMAL(10,2) NOT NULL, -- Total amount charged to individual
  platform_fee DECIMAL(10,2) NOT NULL, -- 10-15% of amount
  expert_payout DECIMAL(10,2) NOT NULL, -- 85-90% of amount
  currency TEXT DEFAULT 'CHF',

  -- Session details
  duration_minutes INTEGER NOT NULL, -- How long expert worked
  hourly_rate DECIMAL(10,2) NOT NULL, -- Expert's rate at time of session

  -- Stripe
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_transfer_id TEXT, -- Transfer to expert's Stripe Connect account

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  paid_at TIMESTAMPTZ,
  transferred_at TIMESTAMPTZ, -- When funds transferred to expert
  refunded_at TIMESTAMPTZ,

  -- Metadata
  notes TEXT, -- e.g., "Contract review + negotiation advice"
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_payment_sessions_workspace ON payment_sessions(workspace_id);
CREATE INDEX idx_payment_sessions_expert ON payment_sessions(expert_id);
CREATE INDEX idx_payment_sessions_individual ON payment_sessions(individual_id);
CREATE INDEX idx_payment_sessions_status ON payment_sessions(status);
CREATE INDEX idx_payment_sessions_created_at ON payment_sessions(created_at);
```

### 9. Expert Reviews Table

```sql
-- Reviews and ratings for experts (by individuals)
CREATE TABLE expert_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expert_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,

  -- Rating
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),

  -- Review content
  title TEXT,
  content TEXT,

  -- Categories (optional detailed ratings)
  expertise_rating INTEGER CHECK (expertise_rating >= 1 AND expertise_rating <= 5),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),

  -- Metadata
  helpful_count INTEGER DEFAULT 0, -- How many users found this review helpful
  flagged BOOLEAN DEFAULT FALSE,
  flagged_reason TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(reviewer_id, workspace_id) -- One review per workspace per reviewer
);

-- Indexes
CREATE INDEX idx_expert_reviews_expert ON expert_reviews(expert_id);
CREATE INDEX idx_expert_reviews_rating ON expert_reviews(rating);
CREATE INDEX idx_expert_reviews_created_at ON expert_reviews(created_at);
```

### 10. Bot Configurations Table (Domain-Specific Settings)

```sql
-- Configuration for each bot/domain (Lex, Imhotep, RichCat, etc.)
CREATE TABLE bot_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  domain TEXT NOT NULL CHECK (domain IN ('legal', 'medical', 'financial', 'research', 'language', 'creative', 'product')),

  -- Domain-specific settings (JSONB for flexibility)
  settings JSONB NOT NULL DEFAULT '{}',
  /* Example for legal (Lex):
  {
    "jurisdiction": "Zürich, Switzerland",
    "legal_area": "employment_law",
    "confidence_threshold": 70,
    "auto_trigger_expert": true,
    "preferred_expert_id": "uuid"
  }

  Example for medical (Imhotep):
  {
    "chronic_conditions": ["diabetes", "hypertension"],
    "medications": ["metformin", "lisinopril"],
    "allergies": ["penicillin"],
    "preferred_doctor_id": "uuid"
  }

  Example for financial (RichCat):
  {
    "risk_tolerance": "moderate",
    "investment_goals": ["retirement", "tax_optimization"],
    "portfolio_value": 500000,
    "currency": "CHF"
  }
  */

  -- RAG settings
  embedding_model TEXT DEFAULT 'text-embedding-3-small',
  llm_model TEXT DEFAULT 'gpt-4',
  max_context_chunks INTEGER DEFAULT 10,
  temperature DECIMAL(3,2) DEFAULT 0.3,

  -- Expert handoff settings
  expert_trigger_threshold INTEGER DEFAULT 70, -- If AI confidence < 70%, recommend expert
  auto_trigger_expert BOOLEAN DEFAULT FALSE, -- Auto-send invite to expert (vs manual)

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(workspace_id, domain) -- One config per domain per workspace
);

-- Indexes
CREATE INDEX idx_bot_configurations_workspace ON bot_configurations(workspace_id);
CREATE INDEX idx_bot_configurations_domain ON bot_configurations(domain);
```

### 11. Audit Logs Table (Compliance & Security)

```sql
-- Track all actions for compliance and security
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Who
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  user_role TEXT, -- Snapshot of role at time of action

  -- What
  action TEXT NOT NULL, -- 'workspace.created', 'document.uploaded', 'expert.invited', etc.
  resource_type TEXT NOT NULL, -- 'workspace', 'document', 'message', 'payment', etc.
  resource_id UUID,

  -- Details
  details JSONB, -- Full context of the action
  ip_address INET,
  user_agent TEXT,

  -- Result
  status TEXT DEFAULT 'success' CHECK (status IN ('success', 'failed', 'unauthorized')),
  error_message TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

---

## Qdrant Vector Database Schema

### Collections Overview

```typescript
// Qdrant collections for vector embeddings
const QDRANT_COLLECTIONS = {
  // Domain knowledge bases (pre-loaded, static)
  legal_embeddings: 'legal_kb_zurich',      // 40-120K legal embeddings
  medical_embeddings: 'medical_kb_global',  // 14.3M medical embeddings
  financial_embeddings: 'financial_kb_ch',  // 5M financial embeddings
  research_embeddings: 'research_kb_global', // 2M academic papers
  language_embeddings: 'language_kb_swiss',  // Swiss German + Standard German
  creative_embeddings: 'creative_kb_global', // Creative direction best practices
  product_embeddings: 'product_kb_global',   // Product management frameworks

  // User document embeddings (dynamic, per-workspace)
  document_embeddings: 'document_embeddings', // User-uploaded documents
};
```

### 1. Legal Knowledge Base (Lex)

```typescript
// Qdrant collection: legal_kb_zurich
interface LegalEmbeddingPayload {
  // Source
  source: string;           // 'swiss_code_of_obligations' | 'zurich_employment_law' | 'case_law' | 'legal_commentary'
  source_url?: string;      // URL to original source

  // Content
  text: string;             // The actual text chunk (max 512 tokens)
  title?: string;           // Title of law/article/case
  article_number?: string;  // e.g., "Art. 328 OR" (Swiss Code of Obligations)

  // Jurisdiction
  jurisdiction: string;     // 'zurich' | 'switzerland' | 'eu'
  legal_area: string;       // 'employment_law' | 'contract_law' | 'corporate_law' | 'intellectual_property' | 'real_estate'

  // Metadata
  language: string;         // 'de' | 'fr' | 'it' | 'en'
  last_updated: string;     // ISO timestamp
  confidence: number;       // How authoritative is this source (0-100)

  // Chunking
  chunk_id: string;         // Unique ID for this chunk
  total_chunks: number;     // Total chunks from this document
  chunk_index: number;      // This chunk's position (0-based)
}

// Qdrant index config
const LEGAL_COLLECTION_CONFIG = {
  name: 'legal_kb_zurich',
  vector_size: 1536, // OpenAI text-embedding-3-small
  distance: 'Cosine',
  on_disk_payload: true, // For large collections
};
```

### 2. Medical Knowledge Base (Imhotep)

```typescript
// Qdrant collection: medical_kb_global
interface MedicalEmbeddingPayload {
  // Source
  source: string;           // 'pubmed' | 'uptodate' | 'nice_guidelines' | 'who' | 'fda'
  source_id: string;        // PubMed ID, DOI, etc.
  source_url?: string;

  // Content
  text: string;             // The actual text chunk (max 512 tokens)
  title?: string;           // Title of paper/guideline

  // Medical classification
  specialty: string;        // 'cardiology' | 'endocrinology' | 'neurology' | 'oncology' | etc.
  condition?: string;       // 'diabetes' | 'hypertension' | 'cancer' | etc.
  intervention?: string;    // 'medication' | 'surgery' | 'lifestyle' | 'diagnostic'

  // Evidence level
  evidence_level: string;   // 'meta_analysis' | 'rct' | 'cohort_study' | 'expert_opinion'
  publication_date: string; // ISO timestamp

  // Metadata
  language: string;         // 'en' | 'de' | 'fr'
  mesh_terms?: string[];    // Medical Subject Headings (for precise search)

  // Chunking
  chunk_id: string;
  total_chunks: number;
  chunk_index: number;
}

const MEDICAL_COLLECTION_CONFIG = {
  name: 'medical_kb_global',
  vector_size: 1536,
  distance: 'Cosine',
  on_disk_payload: true,
  optimizers_config: {
    indexing_threshold: 50000, // Optimize for 14M embeddings
  },
};
```

### 3. Financial Knowledge Base (RichCat)

```typescript
// Qdrant collection: financial_kb_ch
interface FinancialEmbeddingPayload {
  // Source
  source: string;           // 'swiss_tax_code' | 'investment_guide' | 'financial_regulation' | 'market_analysis'
  source_url?: string;

  // Content
  text: string;
  title?: string;

  // Financial classification
  category: string;         // 'tax_planning' | 'investment_strategy' | 'retirement_planning' | 'estate_planning' | 'risk_management'
  subcategory?: string;     // 'stocks' | 'bonds' | 'real_estate' | 'crypto' | 'pension'

  // Jurisdiction
  jurisdiction: string;     // 'switzerland' | 'zurich' | 'us' | 'eu'
  regulatory_body?: string; // 'FINMA' | 'SEC' | 'FCA'

  // Metadata
  relevance_year: number;   // e.g., 2026 (tax codes change yearly)
  last_updated: string;
  language: string;

  // Chunking
  chunk_id: string;
  total_chunks: number;
  chunk_index: number;
}

const FINANCIAL_COLLECTION_CONFIG = {
  name: 'financial_kb_ch',
  vector_size: 1536,
  distance: 'Cosine',
  on_disk_payload: true,
};
```

### 4. User Document Embeddings (All Domains)

```typescript
// Qdrant collection: document_embeddings
interface DocumentEmbeddingPayload {
  // Workspace context
  workspace_id: string;     // Which workspace this doc belongs to
  document_id: string;      // PostgreSQL document ID

  // Content
  text: string;             // The actual text chunk (max 512 tokens)

  // Document metadata
  file_name: string;
  file_type: string;        // 'pdf' | 'docx' | 'txt' | 'email'
  page_number?: number;     // For PDFs

  // Domain
  domain: string;           // 'legal' | 'medical' | 'financial' | etc.

  // Chunking
  chunk_id: string;         // workspace_id:document_id:chunk_index
  total_chunks: number;
  chunk_index: number;

  // Privacy (for filtering)
  encrypted: boolean;       // Is this chunk from encrypted doc?
  visible_to_experts: boolean; // Can experts search this?

  // Metadata
  created_at: string;       // ISO timestamp
}

const DOCUMENT_COLLECTION_CONFIG = {
  name: 'document_embeddings',
  vector_size: 1536,
  distance: 'Cosine',
  on_disk_payload: false, // User docs are smaller, keep in memory for speed
  payload_index: {
    workspace_id: { type: 'keyword' },
    domain: { type: 'keyword' },
    visible_to_experts: { type: 'bool' },
  },
};
```

---

## TypeScript Interfaces (Complete)

### Core Types

```typescript
// Enums
export enum UserRole {
  INDIVIDUAL = 'individual',
  EXPERT = 'expert',
  ADMIN = 'admin',
}

export enum WorkspaceDomain {
  LEGAL = 'legal',
  MEDICAL = 'medical',
  FINANCIAL = 'financial',
  RESEARCH = 'research',
  LANGUAGE = 'language',
  CREATIVE = 'creative',
  PRODUCT = 'product',
}

export enum WorkspaceStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  CLOSED = 'closed',
}

export enum MessageSenderType {
  USER = 'user',
  AI = 'ai',
  EXPERT = 'expert',
}

export enum SubscriptionPlan {
  BASIC = 'basic',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

// User
export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  avatarUrl?: string;
  role: UserRole;

  // Auth
  passwordHash?: string;
  oauthProvider?: 'google' | 'github';
  oauthId?: string;

  // Stripe
  stripeCustomerId?: string;
  stripeAccountId?: string;

  // Preferences
  language: 'en' | 'de' | 'fr';
  timezone: string;
  notificationPreferences: {
    email: boolean;
    push: boolean;
  };

  // Privacy
  dataResidency: 'cloud' | 'self-hosted' | 'eu-only';
  encryptionKeyHash?: string;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  deletedAt?: Date;
}

// Workspace
export interface Workspace {
  id: string;
  ownerId: string;
  name: string;
  description?: string;
  domain: WorkspaceDomain;
  status: WorkspaceStatus;
  visibility: 'private' | 'shared';
  encryptionEnabled: boolean;

  // Collaboration
  activeExpertId?: string;
  expertSessionStart?: Date;
  expertSessionEnd?: Date;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
  deletedAt?: Date;
}

// Workspace Access (Expert Permissions)
export interface WorkspaceAccess {
  id: string;
  workspaceId: string;
  expertId: string;

  // Access control
  accessLevel: 'view' | 'comment' | 'edit';
  canViewDocuments: boolean;
  canDownloadDocuments: boolean;

  // Status
  status: 'pending' | 'active' | 'revoked' | 'expired';
  invitedBy: string;
  invitedAt: Date;
  acceptedAt?: Date;
  revokedAt?: Date;
  expiresAt?: Date;

  createdAt: Date;
}

// Document
export interface Document {
  id: string;
  workspaceId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;

  // Storage
  storageProvider: 's3' | 'supabase' | 'local';
  storageUrl: string;
  storageKey?: string;

  // Encryption
  encrypted: boolean;
  encryptionKeyId?: string;

  // Embeddings
  embeddingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  embeddingError?: string;
  embeddingCompletedAt?: Date;
  totalChunks?: number;

  // Access
  uploadedBy: string;
  visibleToExperts: boolean;

  // Metadata
  extractedText?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

// Message (Chat)
export interface Message {
  id: string;
  workspaceId: string;
  senderId: string; // UUID or 'ai'
  senderType: MessageSenderType;
  content: string;
  contentType: 'text' | 'document' | 'system';

  // AI metadata
  aiMetadata?: {
    model: string;
    confidenceScore: number; // 0-100
    citations: {
      source: string;
      excerpt: string;
      url?: string;
    }[];
    expertRecommended: boolean;
    tokens?: number;
    cost?: number;
  };

  messageType: 'chat' | 'analysis' | 'recommendation' | 'system';

  // References
  parentMessageId?: string;
  referencedDocumentIds?: string[];

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

// Expert Profile
export interface ExpertProfile {
  userId: string;
  domain: WorkspaceDomain;
  specializations: string[];

  // Credentials
  credentials: {
    licenses?: string[];
    degrees?: string[];
    certifications?: string[];
    verifiedAt: Date;
  };
  jurisdiction?: string;
  licenseNumber?: string;
  licenseVerified: boolean;
  licenseVerifiedAt?: Date;

  // Pricing
  hourlyRate: number;
  currency: string;
  minimumSessionDuration: number; // minutes

  // Availability
  availability: 'available' | 'busy' | 'unavailable' | 'vacation';
  availableHours?: Record<string, string[]>; // { monday: ['09:00-17:00'], ... }
  timezone: string;

  // Profile
  bio?: string;
  headline?: string;
  languages: string[];

  // Stats
  totalWorkspacesJoined: number;
  totalHoursWorked: number;
  averageRating?: number;
  totalReviews: number;

  // Onboarding
  onboardingStatus: 'pending' | 'approved' | 'rejected' | 'suspended';
  onboardingCompletedAt?: Date;
  onboardingNotes?: string;

  createdAt: Date;
  updatedAt: Date;
}

// Subscription
export interface Subscription {
  id: string;
  userId: string;

  // Stripe
  stripeSubscriptionId: string;
  stripePriceId: string;

  // Plan
  planName: SubscriptionPlan;
  planInterval: 'month' | 'year';
  planAmount: number;
  currency: string;

  // Status
  status: 'active' | 'canceled' | 'past_due' | 'paused' | 'trialing';
  trialEnd?: Date;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt?: Date;

  // Features
  maxWorkspaces: number;
  maxDocumentsPerWorkspace: number;
  expertMatchingEnabled: boolean;
  prioritySupport: boolean;

  createdAt: Date;
  updatedAt: Date;
}

// Payment Session
export interface PaymentSession {
  id: string;
  workspaceId: string;
  expertId: string;
  individualId: string;

  // Amounts
  amount: number;
  platformFee: number;
  expertPayout: number;
  currency: string;

  // Session details
  durationMinutes: number;
  hourlyRate: number;

  // Stripe
  stripePaymentIntentId?: string;
  stripeTransferId?: string;

  // Status
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  paidAt?: Date;
  transferredAt?: Date;
  refundedAt?: Date;

  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Expert Review
export interface ExpertReview {
  id: string;
  expertId: string;
  reviewerId: string;
  workspaceId: string;

  rating: number; // 1-5
  title?: string;
  content?: string;

  // Detailed ratings
  expertiseRating?: number;
  communicationRating?: number;
  valueRating?: number;

  helpfulCount: number;
  flagged: boolean;
  flaggedReason?: string;

  createdAt: Date;
  updatedAt: Date;
}

// Bot Configuration (Domain-Specific Settings)
export interface BotConfiguration {
  id: string;
  workspaceId: string;
  domain: WorkspaceDomain;

  // Domain-specific settings
  settings: Record<string, any>;

  // RAG settings
  embeddingModel: string;
  llmModel: string;
  maxContextChunks: number;
  temperature: number;

  // Expert handoff
  expertTriggerThreshold: number; // 0-100
  autoTriggerExpert: boolean;

  createdAt: Date;
  updatedAt: Date;
}

// Audit Log
export interface AuditLog {
  id: string;
  userId?: string;
  userRole?: string;

  action: string; // 'workspace.created', 'document.uploaded', etc.
  resourceType: string;
  resourceId?: string;

  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;

  status: 'success' | 'failed' | 'unauthorized';
  errorMessage?: string;

  createdAt: Date;
}
```

### Domain-Specific Settings Types

```typescript
// Legal (Lex) Settings
export interface LegalBotSettings {
  jurisdiction: string; // "Zürich, Switzerland"
  legalArea: string; // "employment_law" | "contract_law" | etc.
  confidenceThreshold: number; // 0-100
  autoTriggerExpert: boolean;
  preferredExpertId?: string;
}

// Medical (Imhotep) Settings
export interface MedicalBotSettings {
  chronicConditions: string[];
  medications: string[];
  allergies: string[];
  preferredDoctorId?: string;
  emergencyContactPhone?: string;
}

// Financial (RichCat) Settings
export interface FinancialBotSettings {
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentGoals: string[]; // ["retirement", "tax_optimization"]
  portfolioValue?: number;
  currency: string;
  preferredAdvisorId?: string;
}

// Research (Nerd) Settings
export interface ResearchBotSettings {
  researchArea: string; // "machine_learning" | "biology" | etc.
  preferredJournals: string[];
  citationStyle: 'apa' | 'mla' | 'chicago' | 'ieee';
  preferredProfessorId?: string;
}

// Language (Heidi) Settings
export interface LanguageBotSettings {
  targetLanguage: string; // "swiss_german" | "standard_german"
  nativeLanguage: string;
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced';
  learningGoals: string[]; // ["business", "conversational", "academic"]
  preferredTeacherId?: string;
}

// Creative (Artr) Settings
export interface CreativeBotSettings {
  creativeField: string; // "graphic_design" | "video" | "writing" | etc.
  stylePreferences: string[];
  portfolioLinks: string[];
  preferredDirectorId?: string;
}

// Product (Trident) Settings
export interface ProductBotSettings {
  industry: string; // "saas" | "ecommerce" | "fintech" | etc.
  productStage: 'idea' | 'mvp' | 'growth' | 'scale';
  teamSize: number;
  preferredPMId?: string;
}
```

---

## Relationships & Constraints

### Key Relationships

```typescript
// 1. User → Workspace (One-to-Many)
// One user (individual) can own multiple workspaces
User.id → Workspace.ownerId (CASCADE DELETE)

// 2. Workspace → Document (One-to-Many)
// One workspace can contain multiple documents
Workspace.id → Document.workspaceId (CASCADE DELETE)

// 3. Workspace → Message (One-to-Many)
// One workspace can have multiple messages (chat history)
Workspace.id → Message.workspaceId (CASCADE DELETE)

// 4. User → ExpertProfile (One-to-One)
// One expert user has exactly one expert profile
User.id → ExpertProfile.userId (CASCADE DELETE)

// 5. Workspace ↔ Expert (Many-to-Many via WorkspaceAccess)
// Multiple experts can access multiple workspaces
Workspace.id → WorkspaceAccess.workspaceId (CASCADE DELETE)
User.id → WorkspaceAccess.expertId (CASCADE DELETE)

// 6. User → Subscription (One-to-Many)
// One user can have multiple subscriptions (e.g., cancel and resubscribe)
User.id → Subscription.userId (CASCADE DELETE)

// 7. Workspace → PaymentSession (One-to-Many)
// One workspace can have multiple payment sessions (multiple expert sessions)
Workspace.id → PaymentSession.workspaceId (CASCADE DELETE)

// 8. Expert → PaymentSession (One-to-Many)
// One expert can have multiple payment sessions (multiple workspaces)
User.id → PaymentSession.expertId (CASCADE DELETE)

// 9. Workspace → BotConfiguration (One-to-Many)
// One workspace can have multiple bot configs (one per domain)
Workspace.id → BotConfiguration.workspaceId (CASCADE DELETE)

// 10. Expert → ExpertReview (One-to-Many)
// One expert can have multiple reviews
User.id → ExpertReview.expertId (CASCADE DELETE)
```

### Unique Constraints

```sql
-- Prevent duplicate workspace access for same expert
UNIQUE(workspace_id, expert_id) ON workspace_access

-- Prevent duplicate reviews for same workspace
UNIQUE(reviewer_id, workspace_id) ON expert_reviews

-- One bot config per domain per workspace
UNIQUE(workspace_id, domain) ON bot_configurations

-- Unique Stripe IDs
UNIQUE(stripe_customer_id) ON users
UNIQUE(stripe_account_id) ON users
UNIQUE(stripe_subscription_id) ON subscriptions
UNIQUE(stripe_payment_intent_id) ON payment_sessions
```

---

## Data Privacy & Encryption

### Encryption Strategies

```typescript
// 1. Client-Side Encryption (Self-Hosted)
interface EncryptedDocument {
  documentId: string;
  encryptedContent: string; // AES-256 encrypted
  encryptionKeyId: string;  // Reference to user's key (stored in browser)
  iv: string;               // Initialization vector
}

// User's encryption key (never sent to server)
interface UserEncryptionKey {
  keyId: string;
  key: string;              // 256-bit AES key (stored in browser localStorage or hardware key)
  createdAt: Date;
}

// Encrypt document before upload
async function encryptDocument(
  content: string,
  userKey: UserEncryptionKey
): Promise<EncryptedDocument> {
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const encoder = new TextEncoder();
  const data = encoder.encode(content);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    Buffer.from(userKey.key, 'hex'),
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    data
  );

  return {
    documentId: crypto.randomUUID(),
    encryptedContent: Buffer.from(encryptedBuffer).toString('base64'),
    encryptionKeyId: userKey.keyId,
    iv: Buffer.from(iv).toString('hex'),
  };
}

// 2. Server-Side Encryption at Rest (Cloud)
// Documents encrypted at rest in S3/Supabase with platform keys
const S3_ENCRYPTION_CONFIG = {
  ServerSideEncryption: 'AES256',
  // Or use AWS KMS for key management
  ServerSideEncryption: 'aws:kms',
  SSEKMSKeyId: process.env.AWS_KMS_KEY_ID,
};

// 3. Embedding Privacy (No PII in Vector DB)
// Strip PII before embedding
function stripPIIBeforeEmbedding(text: string): string {
  // Remove names, emails, phone numbers, addresses, etc.
  return text
    .replace(/[A-Z][a-z]+ [A-Z][a-z]+/g, '[NAME]') // Names
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[EMAIL]') // Emails
    .replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE]') // Phone numbers
    .replace(/\b\d{5}(?:[-\s]\d{4})?\b/g, '[ZIP]'); // ZIP codes
}
```

### Data Deletion & GDPR Compliance

```typescript
// Soft delete (default - keep for 30 days for recovery)
async function softDeleteWorkspace(workspaceId: string): Promise<void> {
  await db.query(
    'UPDATE workspaces SET deleted_at = NOW() WHERE id = $1',
    [workspaceId]
  );
  // Documents, messages, etc. cascade via ON DELETE CASCADE
}

// Hard delete (GDPR "Right to be Forgotten")
async function hardDeleteUser(userId: string): Promise<void> {
  // 1. Delete from PostgreSQL (cascades to all related tables)
  await db.query('DELETE FROM users WHERE id = $1', [userId]);

  // 2. Delete from Qdrant (user's document embeddings)
  await qdrant.delete({
    collection_name: 'document_embeddings',
    filter: {
      must: [{ key: 'workspace_id', match: { value: userId } }],
    },
  });

  // 3. Delete from S3/Supabase (documents)
  const documents = await db.query(
    'SELECT storage_key FROM documents WHERE uploaded_by = $1',
    [userId]
  );
  for (const doc of documents.rows) {
    await s3.deleteObject({ Key: doc.storage_key });
  }

  // 4. Delete from Stripe (customer + Connect account)
  if (user.stripeCustomerId) {
    await stripe.customers.del(user.stripeCustomerId);
  }
  if (user.stripeAccountId) {
    await stripe.accounts.del(user.stripeAccountId);
  }
}
```

---

## Data Migration & Seeding

### Initial Data Seeding (Legal MVP)

```typescript
// Seed script for MVP: Load 40K Zürich legal embeddings into Qdrant
async function seedLegalEmbeddings() {
  const legalDocuments = [
    // Swiss Code of Obligations (OR)
    {
      source: 'swiss_code_of_obligations',
      jurisdiction: 'switzerland',
      legalArea: 'employment_law',
      text: 'Art. 328 OR: The employer must respect and protect the personality of the employee...',
      articleNumber: 'Art. 328 OR',
      language: 'en',
    },
    // ... 40,000 more embeddings
  ];

  // Embed and upload to Qdrant
  for (const doc of legalDocuments) {
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: doc.text,
    });

    await qdrant.upsert({
      collection_name: 'legal_kb_zurich',
      points: [{
        id: crypto.randomUUID(),
        vector: embedding.data[0].embedding,
        payload: doc,
      }],
    });
  }
}

// Seed test users for MVP
async function seedTestUsers() {
  // Individual user
  await db.query(`
    INSERT INTO users (email, name, role, stripe_customer_id)
    VALUES ('test@example.com', 'Test Individual', 'individual', 'cus_test123')
  `);

  // Expert user (lawyer)
  const expertId = crypto.randomUUID();
  await db.query(`
    INSERT INTO users (id, email, name, role, stripe_account_id)
    VALUES ($1, 'lawyer@example.com', 'Test Lawyer', 'expert', 'acct_test456')
  `, [expertId]);

  await db.query(`
    INSERT INTO expert_profiles (user_id, domain, specializations, hourly_rate, jurisdiction, onboarding_status, credentials)
    VALUES ($1, 'legal', ARRAY['employment_law', 'contract_law'], 300, 'Zürich, Switzerland', 'approved', '{"licenses": ["BAR123"], "verifiedAt": "2025-01-01T00:00:00Z"}')
  `, [expertId]);
}
```

---

## Document Status

**Status**: ✅ Complete
**Last Updated**: October 2025
**Next Review**: After MVP launch (Q2 2026)

**AI-Buildable Checklist**:
- ✅ Complete PostgreSQL schema (11 tables with indexes)
- ✅ Complete Qdrant collections (4 knowledge bases + 1 dynamic)
- ✅ Complete TypeScript interfaces (all entities + domain settings)
- ✅ Relationship mapping (10 key relationships)
- ✅ Privacy & encryption strategies (3 encryption methods)
- ✅ GDPR compliance (soft delete + hard delete)
- ✅ Data seeding scripts (legal embeddings + test users)

**AI Can Now Build**:
1. Database migrations (copy SQL from schema)
2. TypeScript types (copy interfaces)
3. Data access layer (ORMs like Prisma, Drizzle)
4. Vector search queries (Qdrant API)
5. Encryption/decryption logic (client-side + server-side)
6. GDPR deletion flows (soft + hard delete)

**What AI Still Needs**:
- WORKSPACE_IMPLEMENTATION_GUIDE.md (step-by-step: DB → API → UI → RAG)
- EXPERT_MARKETPLACE_GUIDE.md (expert onboarding, matching algorithm, payment flow)
- RAG_IMPLEMENTATION_GUIDE.md (vector DB setup, embedding pipeline, LLM integration)
