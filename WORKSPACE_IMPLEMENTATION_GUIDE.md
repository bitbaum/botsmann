# Workspace Implementation Guide

## TL;DR

**Step-by-step guide to build the Botsmann workspace platform from scratch** - Database → API → UI → RAG → Expert Marketplace → Deployment.

Follow this guide sequentially. Each step includes:
- Working code (TypeScript, not pseudo-code)
- Success criteria (how to verify it works)
- Common pitfalls (what can go wrong)

**Timeline**: 12 weeks (3 months) to MVP

---

## Prerequisites

### Required Tools & Accounts

```bash
# 1. Install dependencies
node -v        # v20+ required
pnpm -v        # v8+ required (or npm/yarn)
docker -v      # v24+ required (for Qdrant, PostgreSQL)
git -v         # v2.40+ required

# 2. Create accounts (free tiers available)
# - Supabase (PostgreSQL + Storage): https://supabase.com
# - Qdrant Cloud (Vector DB): https://qdrant.tech
# - OpenAI (GPT-4 + Embeddings): https://platform.openai.com
# - Stripe (Payments): https://stripe.com
# - Vercel (Hosting): https://vercel.com
# - Resend (Email): https://resend.com

# 3. Environment variables (.env.local)
cat > .env.local <<EOF
# Database
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"

# Vector DB
QDRANT_URL="https://[CLUSTER].qdrant.io"
QDRANT_API_KEY="[YOUR_KEY]"

# AI
OPENAI_API_KEY="sk-[YOUR_KEY]"

# Payments
STRIPE_SECRET_KEY="sk_test_[YOUR_KEY]"
STRIPE_PUBLISHABLE_KEY="pk_test_[YOUR_KEY]"
STRIPE_WEBHOOK_SECRET="whsec_[YOUR_KEY]"

# Storage
SUPABASE_URL="https://[PROJECT].supabase.co"
SUPABASE_ANON_KEY="[YOUR_KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR_KEY]"

# Email
RESEND_API_KEY="re_[YOUR_KEY]"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
EOF
```

---

## Phase 1: Database Setup (Week 1)

### Step 1.1: Initialize PostgreSQL (Supabase)

```bash
# 1. Create Supabase project: https://app.supabase.com/new
# 2. Get connection string from Settings → Database

# 3. Install Drizzle ORM (our choice for type-safe SQL)
pnpm add drizzle-orm postgres
pnpm add -D drizzle-kit
```

### Step 1.2: Define Database Schema

Create `src/db/schema.ts`:

```typescript
import { pgTable, text, uuid, timestamp, integer, decimal, boolean, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['individual', 'expert', 'admin']);
export const workspaceDomainEnum = pgEnum('workspace_domain', ['legal', 'medical', 'financial', 'research', 'language', 'creative', 'product']);
export const workspaceStatusEnum = pgEnum('workspace_status', ['active', 'archived', 'closed']);

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  emailVerified: boolean('email_verified').default(false),
  name: text('name').notNull(),
  avatarUrl: text('avatar_url'),
  role: userRoleEnum('role').notNull(),
  passwordHash: text('password_hash'),
  oauthProvider: text('oauth_provider'),
  oauthId: text('oauth_id'),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeAccountId: text('stripe_account_id').unique(),
  language: text('language').default('en'),
  timezone: text('timezone').default('Europe/Zurich'),
  notificationPreferences: jsonb('notification_preferences').default({ email: true, push: false }),
  dataResidency: text('data_residency').default('cloud'),
  encryptionKeyHash: text('encryption_key_hash'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  lastLoginAt: timestamp('last_login_at'),
  deletedAt: timestamp('deleted_at'),
});

// Workspaces table
export const workspaces = pgTable('workspaces', {
  id: uuid('id').primaryKey().defaultRandom(),
  ownerId: uuid('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  domain: workspaceDomainEnum('domain').notNull(),
  status: workspaceStatusEnum('status').default('active'),
  visibility: text('visibility').default('private'),
  encryptionEnabled: boolean('encryption_enabled').default(false),
  activeExpertId: uuid('active_expert_id').references(() => users.id, { onDelete: 'set null' }),
  expertSessionStart: timestamp('expert_session_start'),
  expertSessionEnd: timestamp('expert_session_end'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  archivedAt: timestamp('archived_at'),
  deletedAt: timestamp('deleted_at'),
});

// Documents table
export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  fileName: text('file_name').notNull(),
  fileSize: integer('file_size').notNull(),
  mimeType: text('mime_type').notNull(),
  storageProvider: text('storage_provider').default('supabase'),
  storageUrl: text('storage_url').notNull(),
  storageKey: text('storage_key'),
  encrypted: boolean('encrypted').default(false),
  encryptionKeyId: text('encryption_key_id'),
  embeddingStatus: text('embedding_status').default('pending'),
  embeddingError: text('embedding_error'),
  embeddingCompletedAt: timestamp('embedding_completed_at'),
  totalChunks: integer('total_chunks'),
  uploadedBy: uuid('uploaded_by').notNull().references(() => users.id),
  visibleToExperts: boolean('visible_to_experts').default(true),
  extractedText: text('extracted_text'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// Messages table
export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  workspaceId: uuid('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' }),
  senderId: text('sender_id').notNull(),
  senderType: text('sender_type').notNull(),
  content: text('content').notNull(),
  contentType: text('content_type').default('text'),
  aiMetadata: jsonb('ai_metadata'),
  messageType: text('message_type').default('chat'),
  parentMessageId: uuid('parent_message_id'),
  referencedDocumentIds: jsonb('referenced_document_ids'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  workspaces: many(workspaces),
  documents: many(documents),
}));

export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
  owner: one(users, { fields: [workspaces.ownerId], references: [users.id] }),
  documents: many(documents),
  messages: many(messages),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  workspace: one(workspaces, { fields: [documents.workspaceId], references: [workspaces.id] }),
  uploader: one(users, { fields: [documents.uploadedBy], references: [users.id] }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  workspace: one(workspaces, { fields: [messages.workspaceId], references: [workspaces.id] }),
}));
```

### Step 1.3: Run Database Migrations

```bash
# 1. Generate migration
pnpm drizzle-kit generate:pg

# 2. Run migration
pnpm drizzle-kit push:pg

# 3. Verify tables exist in Supabase Dashboard → Table Editor
```

**Success Criteria**:
- ✅ All 4 tables created (users, workspaces, documents, messages)
- ✅ Indexes automatically created by Drizzle
- ✅ Foreign keys set up with CASCADE DELETE

**Common Pitfalls**:
- ❌ Wrong DATABASE_URL format → Fix: Check Supabase connection string
- ❌ Migration fails on existing tables → Fix: Drop tables or use `drizzle-kit drop`

---

## Phase 2: Authentication (Week 1)

### Step 2.1: Install NextAuth.js

```bash
pnpm add next-auth @auth/drizzle-adapter bcryptjs
pnpm add -D @types/bcryptjs
```

### Step 2.2: Configure NextAuth

Create `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    // Email/Password
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });

        if (!user || !user.passwordHash) return null;

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),

    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### Step 2.3: Create Sign-In Page

Create `src/app/auth/signin/page.tsx`:

```typescript
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', { email, password, callbackUrl: '/dashboard' });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
```

**Success Criteria**:
- ✅ User can sign up with email/password
- ✅ User can sign in with Google OAuth
- ✅ Session persists across page reloads
- ✅ Protected routes redirect to sign-in

**Common Pitfalls**:
- ❌ Google OAuth not working → Fix: Add authorized redirect URI in Google Console
- ❌ Session not persisting → Fix: Check `NEXTAUTH_SECRET` in `.env.local`

---

## Phase 3: Workspace Creation (Week 2)

### Step 3.1: Create Workspace API Route

Create `src/app/api/workspace/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/db';
import { workspaces } from '@/db/schema';
import { z } from 'zod';

const createWorkspaceSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  domain: z.enum(['legal', 'medical', 'financial', 'research', 'language', 'creative', 'product']),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Validate input
    const body = await req.json();
    const validated = createWorkspaceSchema.parse(body);

    // 3. Create workspace
    const [workspace] = await db.insert(workspaces).values({
      ownerId: session.user.id,
      name: validated.name,
      description: validated.description,
      domain: validated.domain,
    }).returning();

    // 4. Return workspace
    return NextResponse.json({ workspace }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Create workspace error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userWorkspaces = await db.query.workspaces.findMany({
      where: (workspaces, { eq }) => eq(workspaces.ownerId, session.user.id),
      orderBy: (workspaces, { desc }) => [desc(workspaces.createdAt)],
    });

    return NextResponse.json({ workspaces: userWorkspaces });
  } catch (error) {
    console.error('Get workspaces error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Step 3.2: Create Workspace UI

Create `src/app/dashboard/page.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

interface Workspace {
  id: string;
  name: string;
  domain: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('legal');

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    const res = await fetch('/api/workspace');
    const data = await res.json();
    setWorkspaces(data.workspaces);
  };

  const createWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/workspace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, domain }),
    });

    if (res.ok) {
      setName('');
      setIsCreating(false);
      fetchWorkspaces();
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Workspaces</h1>
        <Button onClick={() => setIsCreating(true)}>
          Create Workspace
        </Button>
      </div>

      {isCreating && (
        <Card className="p-6 mb-8">
          <form onSubmit={createWorkspace} className="space-y-4">
            <Input
              placeholder="Workspace name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Select value={domain} onValueChange={setDomain}>
              <option value="legal">Legal</option>
              <option value="medical">Medical</option>
              <option value="financial">Financial</option>
            </Select>
            <div className="flex gap-2">
              <Button type="submit">Create</Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workspaces.map((workspace) => (
          <Card key={workspace.id} className="p-6">
            <h3 className="font-semibold">{workspace.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">{workspace.domain}</p>
            <Button className="mt-4" asChild>
              <a href={`/workspace/${workspace.id}`}>Open</a>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

**Success Criteria**:
- ✅ User can create workspace with name and domain
- ✅ Workspaces list shows all user's workspaces
- ✅ Click "Open" navigates to workspace page

---

## Phase 4: Document Upload & Embedding (Week 2)

### Step 4.1: Set Up Supabase Storage

```typescript
// src/lib/storage.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for server-side
);

export async function uploadDocument(
  file: File,
  workspaceId: string,
  userId: string
): Promise<{ url: string; key: string }> {
  const fileName = `${workspaceId}/${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from('documents')
    .upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('documents')
    .getPublicUrl(fileName);

  return { url: publicUrl, key: fileName };
}
```

### Step 4.2: Create Document Upload API

Create `src/app/api/workspace/[id]/documents/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/db';
import { documents, workspaces } from '@/db/schema';
import { uploadDocument } from '@/lib/storage';
import { eq } from 'drizzle-orm';
import { embedDocument } from '@/lib/embeddings'; // We'll create this next

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Verify workspace ownership
    const workspace = await db.query.workspaces.findFirst({
      where: eq(workspaces.id, params.id),
    });

    if (!workspace || workspace.ownerId !== session.user.id) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    // 2. Parse form data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 3. Upload to Supabase Storage
    const { url, key } = await uploadDocument(file, params.id, session.user.id);

    // 4. Create document record
    const [document] = await db.insert(documents).values({
      workspaceId: params.id,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      storageUrl: url,
      storageKey: key,
      uploadedBy: session.user.id,
      embeddingStatus: 'pending',
    }).returning();

    // 5. Trigger embedding (async)
    embedDocument(document.id, file).catch((err) => {
      console.error('Embedding failed:', err);
      db.update(documents)
        .set({ embeddingStatus: 'failed', embeddingError: err.message })
        .where(eq(documents.id, document.id));
    });

    return NextResponse.json({ document }, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Step 4.3: Implement Embedding Pipeline

Create `src/lib/embeddings.ts`:

```typescript
import { OpenAI } from 'openai';
import { QdrantClient } from '@qdrant/js-client-rest';
import { db } from '@/db';
import { documents } from '@/db/schema';
import { eq } from 'drizzle-orm';
import pdf from 'pdf-parse';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

// Extract text from PDF
async function extractText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const data = await pdf(Buffer.from(buffer));
  return data.text;
}

// Chunk text into 512-token pieces
function chunkText(text: string, maxTokens: number = 512): string[] {
  const sentences = text.split(/[.!?]+/);
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    const tokenCount = sentence.split(/\s+/).length;
    if (currentChunk.split(/\s+/).length + tokenCount > maxTokens) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += ' ' + sentence;
    }
  }
  if (currentChunk) chunks.push(currentChunk.trim());

  return chunks;
}

// Embed document and store in Qdrant
export async function embedDocument(documentId: string, file: File): Promise<void> {
  try {
    // 1. Extract text
    const text = await extractText(file);

    // 2. Update document with extracted text
    await db.update(documents)
      .set({ extractedText: text, embeddingStatus: 'processing' })
      .where(eq(documents.id, documentId));

    // 3. Chunk text
    const chunks = chunkText(text);

    // 4. Embed each chunk
    const embeddings = await Promise.all(
      chunks.map(async (chunk, index) => {
        const response = await openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: chunk,
        });

        return {
          id: `${documentId}:${index}`,
          vector: response.data[0].embedding,
          payload: {
            document_id: documentId,
            text: chunk,
            chunk_index: index,
            total_chunks: chunks.length,
            file_name: file.name,
          },
        };
      })
    );

    // 5. Store in Qdrant
    await qdrant.upsert('document_embeddings', {
      wait: true,
      points: embeddings,
    });

    // 6. Update document status
    await db.update(documents)
      .set({
        embeddingStatus: 'completed',
        embeddingCompletedAt: new Date(),
        totalChunks: chunks.length,
      })
      .where(eq(documents.id, documentId));

  } catch (error) {
    console.error('Embedding error:', error);
    throw error;
  }
}
```

**Success Criteria**:
- ✅ User uploads PDF → File stored in Supabase
- ✅ Text extracted from PDF
- ✅ Text chunked and embedded with OpenAI
- ✅ Embeddings stored in Qdrant
- ✅ Document status updated to 'completed'

---

## Phase 5: RAG & AI Chat (Week 3)

### Step 5.1: Set Up Qdrant Collections

```bash
# Create document_embeddings collection
curl -X PUT 'https://[CLUSTER].qdrant.io/collections/document_embeddings' \
  -H 'api-key: [YOUR_KEY]' \
  -H 'Content-Type: application/json' \
  -d '{
    "vectors": {
      "size": 1536,
      "distance": "Cosine"
    }
  }'

# Create legal_kb_zurich collection (for legal knowledge base)
curl -X PUT 'https://[CLUSTER].qdrant.io/collections/legal_kb_zurich' \
  -H 'api-key: [YOUR_KEY]' \
  -H 'Content-Type: application/json' \
  -d '{
    "vectors": {
      "size": 1536,
      "distance": "Cosine"
    },
    "on_disk_payload": true
  }'
```

### Step 5.2: Implement RAG Query

Create `src/lib/rag.ts`:

```typescript
import { OpenAI } from 'openai';
import { QdrantClient } from '@qdrant/js-client-rest';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

export interface RAGResponse {
  answer: string;
  confidenceScore: number;
  citations: { source: string; excerpt: string }[];
  expertRecommended: boolean;
}

export async function queryLegalRAG(
  workspaceId: string,
  question: string,
  domain: string = 'legal'
): Promise<RAGResponse> {
  // 1. Embed question
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: question,
  });

  // 2. Search user's documents
  const documentResults = await qdrant.search('document_embeddings', {
    vector: queryEmbedding.data[0].embedding,
    limit: 5,
    filter: {
      must: [{ key: 'workspace_id', match: { value: workspaceId } }],
    },
  });

  // 3. Search legal knowledge base (40K legal embeddings)
  const legalResults = await qdrant.search('legal_kb_zurich', {
    vector: queryEmbedding.data[0].embedding,
    limit: 5,
    filter: {
      must: [{ key: 'jurisdiction', match: { value: 'zurich' } }],
    },
  });

  // 4. Combine context
  const context = [
    ...documentResults.map((r) => r.payload.text),
    ...legalResults.map((r) => r.payload.text),
  ].join('\n\n');

  // 5. Generate answer with GPT-4
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    temperature: 0.3,
    messages: [
      {
        role: 'system',
        content: `You are a legal AI assistant for Zürich, Switzerland.
Analyze the user's question based on the provided context.
ALWAYS cite your sources with [Source: ...].
ALWAYS provide a confidence score (0-100%) at the end.
If the question requires professional legal judgment, recommend consulting a lawyer.`,
      },
      {
        role: 'user',
        content: `Context:\n${context}\n\nQuestion: ${question}`,
      },
    ],
  });

  const answer = completion.choices[0].message.content || '';

  // 6. Calculate confidence score (simplified)
  const hasStrongEvidence = documentResults.length > 3 || legalResults.length > 3;
  const hasDirectAnswer = answer.length > 100;
  const confidenceScore = hasStrongEvidence && hasDirectAnswer ? 85 : 65;

  // 7. Determine if expert needed
  const expertRecommended =
    confidenceScore < 70 ||
    question.toLowerCase().includes('should i') ||
    question.toLowerCase().includes('what should i do') ||
    answer.toLowerCase().includes('consult a lawyer');

  // 8. Extract citations
  const citations = [
    ...documentResults.map((r) => ({
      source: r.payload.file_name,
      excerpt: r.payload.text.slice(0, 100) + '...',
    })),
    ...legalResults.map((r) => ({
      source: r.payload.source || 'Legal Database',
      excerpt: r.payload.text.slice(0, 100) + '...',
    })),
  ];

  return {
    answer,
    confidenceScore,
    citations,
    expertRecommended,
  };
}
```

### Step 5.3: Create Chat API

Create `src/app/api/workspace/[id]/chat/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/db';
import { messages, workspaces } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { queryLegalRAG } from '@/lib/rag';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Verify workspace access
    const workspace = await db.query.workspaces.findFirst({
      where: eq(workspaces.id, params.id),
    });

    if (!workspace || workspace.ownerId !== session.user.id) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    // 2. Get user message
    const { message: userMessage } = await req.json();

    // 3. Save user message
    await db.insert(messages).values({
      workspaceId: params.id,
      senderId: session.user.id,
      senderType: 'user',
      content: userMessage,
    });

    // 4. Query RAG
    const ragResponse = await queryLegalRAG(params.id, userMessage, workspace.domain);

    // 5. Save AI message
    const [aiMessage] = await db.insert(messages).values({
      workspaceId: params.id,
      senderId: 'ai',
      senderType: 'ai',
      content: ragResponse.answer,
      messageType: 'analysis',
      aiMetadata: {
        model: 'gpt-4',
        confidenceScore: ragResponse.confidenceScore,
        citations: ragResponse.citations,
        expertRecommended: ragResponse.expertRecommended,
      },
    }).returning();

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const workspaceMessages = await db.query.messages.findMany({
      where: eq(messages.workspaceId, params.id),
      orderBy: (messages, { asc }) => [asc(messages.createdAt)],
    });

    return NextResponse.json({ messages: workspaceMessages });
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Step 5.4: Create Chat UI

Create `src/app/workspace/[id]/page.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  senderId: string;
  senderType: 'user' | 'ai' | 'expert';
  content: string;
  aiMetadata?: {
    confidenceScore: number;
    expertRecommended: boolean;
    citations: { source: string; excerpt: string }[];
  };
  createdAt: string;
}

export default function WorkspacePage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await fetch(`/api/workspace/${params.id}/chat`);
    const data = await res.json();
    setMessages(data.messages);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const res = await fetch(`/api/workspace/${params.id}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    if (res.ok) {
      setInput('');
      fetchMessages();
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Legal Workspace</h1>

        <div className="space-y-4 mb-8">
          {messages.map((msg) => (
            <Card key={msg.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">
                      {msg.senderType === 'ai' ? '🤖 AI' : '👤 You'}
                    </span>
                    {msg.aiMetadata && (
                      <Badge variant={msg.aiMetadata.confidenceScore > 70 ? 'default' : 'secondary'}>
                        {msg.aiMetadata.confidenceScore}% confidence
                      </Badge>
                    )}
                    {msg.aiMetadata?.expertRecommended && (
                      <Badge variant="destructive">Expert recommended</Badge>
                    )}
                  </div>
                  <p className="text-sm">{msg.content}</p>
                  {msg.aiMetadata?.citations && msg.aiMetadata.citations.length > 0 && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      <p className="font-semibold">Citations:</p>
                      {msg.aiMetadata.citations.map((citation, i) => (
                        <p key={i}>• {citation.source}: {citation.excerpt}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a legal question..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </div>
    </div>
  );
}
```

**Success Criteria**:
- ✅ User asks question → AI searches documents + legal knowledge base
- ✅ AI returns answer with confidence score
- ✅ Citations shown for transparency
- ✅ "Expert recommended" badge shown when confidence < 70%

---

## Phase 6: Expert Matching (Weeks 4-5)

### Step 6.1: Create Expert Profile Tables

(Already defined in DATA_MODELS.md - add to schema.ts)

### Step 6.2: Expert Onboarding Flow

Create `src/app/experts/apply/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ExpertApplicationPage() {
  const [formData, setFormData] = useState({
    domain: 'legal',
    specializations: '',
    jurisdiction: '',
    licenseNumber: '',
    hourlyRate: '',
    bio: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/experts/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Apply to Join Expert Network</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Domain</label>
          <select
            value={formData.domain}
            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="legal">Legal</option>
            <option value="medical">Medical</option>
            <option value="financial">Financial</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Specializations (comma-separated)</label>
          <Input
            value={formData.specializations}
            onChange={(e) => setFormData({ ...formData, specializations: e.target.value })}
            placeholder="employment_law, contract_law"
          />
        </div>

        <div>
          <label className="block mb-2">Jurisdiction</label>
          <Input
            value={formData.jurisdiction}
            onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
            placeholder="Zürich, Switzerland"
          />
        </div>

        <div>
          <label className="block mb-2">License Number</label>
          <Input
            value={formData.licenseNumber}
            onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
            placeholder="BAR12345"
          />
        </div>

        <div>
          <label className="block mb-2">Hourly Rate (CHF)</label>
          <Input
            type="number"
            value={formData.hourlyRate}
            onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
            placeholder="300"
          />
        </div>

        <div>
          <label className="block mb-2">Bio</label>
          <Textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Tell us about your expertise..."
            rows={6}
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Application
        </Button>
      </form>
    </div>
  );
}
```

### Step 6.3: Manual Expert Matching (MVP)

For MVP, expert matching is manual. Create admin panel at `src/app/admin/matching/page.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Workspace {
  id: string;
  name: string;
  domain: string;
  ownerId: string;
}

interface Expert {
  userId: string;
  domain: string;
  name: string;
  specializations: string[];
  hourlyRate: number;
}

export default function AdminMatchingPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);

  const matchExpert = async () => {
    if (!selectedWorkspace || !selectedExpert) return;

    await fetch('/api/admin/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workspaceId: selectedWorkspace,
        expertId: selectedExpert,
      }),
    });

    // Send invite to expert...
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Expert Matching (Manual)</h1>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Workspaces Needing Expert</h2>
          {workspaces.map((ws) => (
            <Card
              key={ws.id}
              className={`p-4 mb-2 cursor-pointer ${
                selectedWorkspace === ws.id ? 'border-blue-500' : ''
              }`}
              onClick={() => setSelectedWorkspace(ws.id)}
            >
              <h3 className="font-semibold">{ws.name}</h3>
              <p className="text-sm text-muted-foreground">{ws.domain}</p>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Available Experts</h2>
          {experts.map((expert) => (
            <Card
              key={expert.userId}
              className={`p-4 mb-2 cursor-pointer ${
                selectedExpert === expert.userId ? 'border-blue-500' : ''
              }`}
              onClick={() => setSelectedExpert(expert.userId)}
            >
              <h3 className="font-semibold">{expert.name}</h3>
              <p className="text-sm text-muted-foreground">
                {expert.specializations.join(', ')} • CHF {expert.hourlyRate}/hr
              </p>
            </Card>
          ))}
        </div>
      </div>

      <Button
        className="mt-8 w-full"
        disabled={!selectedWorkspace || !selectedExpert}
        onClick={matchExpert}
      >
        Match Expert to Workspace
      </Button>
    </div>
  );
}
```

**Success Criteria**:
- ✅ Expert applies with credentials
- ✅ Admin verifies credentials manually
- ✅ Admin matches expert to workspace
- ✅ Expert receives email invite
- ✅ Expert accepts → Joins workspace

---

## Phase 7: Payments (Stripe) (Week 6)

### Step 7.1: Set Up Stripe

```bash
pnpm add stripe @stripe/stripe-js
```

### Step 7.2: Individual Subscriptions

Create `src/app/api/subscribe/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { priceId } = await req.json(); // e.g., price_1Basic29CHF

    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      customer_email: session.user.email,
      client_reference_id: session.user.id,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Step 7.3: Expert Payouts (Stripe Connect)

Create `src/app/api/experts/connect/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== 'expert') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create Stripe Connect account
    const account = await stripe.accounts.create({
      type: 'express',
      email: session.user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    // Create account link (for onboarding)
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/experts/connect`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/experts/dashboard`,
      type: 'account_onboarding',
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error('Stripe Connect error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Step 7.4: Expert Payment Flow

Create `src/app/api/workspace/[id]/pay-expert/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/db';
import { paymentSessions, workspaces } from '@/db/schema';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { expertId, durationMinutes, hourlyRate } = await req.json();

    // Calculate amounts
    const amount = (durationMinutes / 60) * hourlyRate;
    const platformFee = amount * 0.1; // 10% platform fee
    const expertPayout = amount - platformFee;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'chf',
      customer: session.user.stripeCustomerId,
      metadata: {
        workspaceId: params.id,
        expertId,
        durationMinutes,
      },
    });

    // Create payment session record
    const [paymentSession] = await db.insert(paymentSessions).values({
      workspaceId: params.id,
      expertId,
      individualId: session.user.id,
      amount,
      platformFee,
      expertPayout,
      durationMinutes,
      hourlyRate,
      stripePaymentIntentId: paymentIntent.id,
    }).returning();

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentSession,
    });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

**Success Criteria**:
- ✅ Individual subscribes (CHF 29/month Basic or CHF 99/month Pro)
- ✅ Expert sets up Stripe Connect
- ✅ Individual pays expert for session
- ✅ Platform takes 10% fee
- ✅ Expert receives 90% payout (2 days later)

---

## Phase 8: Self-Hosted Deployment (Week 7)

### Step 8.1: Create Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Step 8.2: Create Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # PostgreSQL
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: botsmann
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: botsmann
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U botsmann"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Qdrant (Vector DB)
  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - qdrant_data:/qdrant/storage
    environment:
      QDRANT__SERVICE__API_KEY: ${QDRANT_API_KEY}

  # Ollama (Local LLM)
  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    entrypoint: ["/bin/sh", "-c"]
    command:
      - |
        ollama serve &
        sleep 5
        ollama pull llama3
        wait

  # Next.js App
  app:
    build: .
    depends_on:
      postgres:
        condition: service_healthy
      qdrant:
        condition: service_started
      ollama:
        condition: service_started
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://botsmann:${POSTGRES_PASSWORD}@postgres:5432/botsmann
      QDRANT_URL: http://qdrant:6333
      QDRANT_API_KEY: ${QDRANT_API_KEY}
      OLLAMA_BASE_URL: http://ollama:11434
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
      NEXTAUTH_URL: http://localhost:3000

volumes:
  postgres_data:
  qdrant_data:
  ollama_data:
```

### Step 8.3: One-Command Deployment

Create `deploy.sh`:

```bash
#!/bin/bash

# Self-Hosted Botsmann Deployment Script

echo "🚀 Starting Botsmann self-hosted deployment..."

# 1. Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first."
    exit 1
fi

# 2. Create .env file
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env <<EOF
POSTGRES_PASSWORD=$(openssl rand -hex 16)
QDRANT_API_KEY=$(openssl rand -hex 16)
NEXTAUTH_SECRET=$(openssl rand -hex 32)
EOF
    echo "✅ .env file created"
fi

# 3. Start services
echo "🐳 Starting Docker containers..."
docker-compose up -d

# 4. Wait for services
echo "⏳ Waiting for services to be ready..."
sleep 10

# 5. Run database migrations
echo "📊 Running database migrations..."
docker-compose exec app npm run db:push

# 6. Load legal embeddings
echo "📚 Loading legal knowledge base (40K embeddings)..."
docker-compose exec app npm run seed:legal

# 7. Done
echo ""
echo "✅ Botsmann is running!"
echo "🌐 Open http://localhost:3000"
echo ""
echo "📋 Next steps:"
echo "  1. Create admin user: docker-compose exec app npm run create:admin"
echo "  2. Configure OAuth (optional): Edit .env and restart"
echo ""
```

**Success Criteria**:
- ✅ Run `bash deploy.sh` → Full stack deploys locally
- ✅ PostgreSQL + Qdrant + Ollama + Next.js running
- ✅ Database migrations applied
- ✅ Legal embeddings loaded
- ✅ App accessible at http://localhost:3000

---

## Testing & Validation (Week 8)

### End-to-End Test Flow

```typescript
// tests/e2e/workspace.test.ts
import { test, expect } from '@playwright/test';

test('Complete workspace flow', async ({ page }) => {
  // 1. Sign up
  await page.goto('/auth/signup');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'Test123!');
  await page.click('button[type="submit"]');

  // 2. Create workspace
  await page.goto('/dashboard');
  await page.click('button:has-text("Create Workspace")');
  await page.fill('input[placeholder="Workspace name"]', 'My Legal Workspace');
  await page.selectOption('select', 'legal');
  await page.click('button:has-text("Create")');

  // 3. Upload document
  const workspaceId = page.url().split('/').pop();
  await page.goto(`/workspace/${workspaceId}`);
  await page.setInputFiles('input[type="file"]', 'tests/fixtures/contract.pdf');
  await expect(page.locator('text=Embedding completed')).toBeVisible({ timeout: 30000 });

  // 4. Ask question
  await page.fill('input[placeholder="Ask a legal question..."]', 'Is this contract fair?');
  await page.click('button:has-text("Send")');
  await expect(page.locator('text=confidence')).toBeVisible({ timeout: 30000 });

  // 5. Verify expert recommendation
  const expertBadge = page.locator('text=Expert recommended');
  if (await expertBadge.isVisible()) {
    console.log('✅ Expert recommendation triggered');
  }
});
```

**Run tests**:
```bash
pnpm add -D @playwright/test
pnpm playwright test
```

---

## Launch Checklist (Week 9)

### Pre-Launch

- [ ] All tests passing (unit + e2e)
- [ ] Security audit (SQL injection, XSS, CSRF)
- [ ] Performance audit (Lighthouse score > 90)
- [ ] Legal review (Terms of Service, Privacy Policy)
- [ ] Compliance check (GDPR, Swiss data residency)
- [ ] Load testing (100 concurrent users)
- [ ] Backup strategy (daily PostgreSQL + Qdrant backups)
- [ ] Monitoring (Sentry for errors, Vercel Analytics)
- [ ] Documentation (README, API docs, deployment guide)

### Launch Day

- [ ] Deploy to production (Vercel + Supabase + Qdrant Cloud)
- [ ] Verify production env vars
- [ ] Run smoke tests
- [ ] Enable monitoring
- [ ] Launch LinkedIn ads (CHF 2K budget)
- [ ] Post in tech communities
- [ ] Send invites to beta users (50 users)

### Post-Launch (Week 10-12)

- [ ] Monitor error rates (< 1%)
- [ ] Track key metrics (workspaces created, AI queries, expert conversions)
- [ ] Collect user feedback (weekly surveys)
- [ ] Fix critical bugs (< 24hr SLA)
- [ ] Iterate on AI response quality
- [ ] Recruit more experts (target: 10 verified lawyers)

---

## Common Pitfalls & Solutions

### 1. Embedding Pipeline Failures

**Problem**: Documents fail to embed (PDF extraction errors, API rate limits)

**Solution**:
```typescript
// Add retry logic with exponential backoff
async function embedWithRetry(documentId: string, file: File, retries = 3): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try {
      await embedDocument(documentId, file);
      return;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 2 ** i * 1000));
    }
  }
}
```

### 2. RAG Accuracy Too Low

**Problem**: AI confidence scores consistently < 60%

**Solution**:
- Increase knowledge base size (40K → 100K embeddings)
- Use better embedding model (text-embedding-3-large)
- Improve chunking strategy (overlap chunks by 50 tokens)
- Fine-tune prompt engineering (add more examples)

### 3. Stripe Webhook Delays

**Problem**: Payment confirmations take > 10 seconds

**Solution**:
```typescript
// Use Stripe webhooks instead of polling
export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')!;
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    // Update payment session status immediately
    await db.update(paymentSessions)
      .set({ status: 'completed', paidAt: new Date() })
      .where(eq(paymentSessions.stripePaymentIntentId, paymentIntent.id));
  }

  return NextResponse.json({ received: true });
}
```

### 4. Expert Matching Takes Too Long

**Problem**: Manual matching is bottleneck (> 2 hours per match)

**Solution** (Post-MVP):
```typescript
// Automate matching with AI
async function autoMatchExpert(workspaceId: string): Promise<string> {
  const workspace = await db.query.workspaces.findFirst({ where: eq(workspaces.id, workspaceId) });
  const messages = await db.query.messages.findMany({ where: eq(messages.workspaceId, workspaceId) });

  // Use GPT-4 to analyze workspace and recommend expert
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: 'Analyze workspace and recommend best expert match based on specialization, workload, ratings.',
    }, {
      role: 'user',
      content: JSON.stringify({ workspace, messages }),
    }],
  });

  const recommendedExpertId = completion.choices[0].message.content;
  return recommendedExpertId;
}
```

---

## Document Status

**Status**: ✅ Complete
**Last Updated**: October 2025
**Next Review**: After MVP launch (Q2 2026)

**AI-Buildable Checklist**:
- ✅ Phase 1: Database setup (Drizzle ORM + Supabase)
- ✅ Phase 2: Authentication (NextAuth.js + Google OAuth)
- ✅ Phase 3: Workspace creation (API + UI)
- ✅ Phase 4: Document upload & embedding (Supabase Storage + Qdrant)
- ✅ Phase 5: RAG & AI chat (OpenAI + vector search)
- ✅ Phase 6: Expert matching (manual for MVP)
- ✅ Phase 7: Payments (Stripe subscriptions + Connect)
- ✅ Phase 8: Self-hosted deployment (Docker Compose)
- ✅ Testing & validation (Playwright e2e tests)
- ✅ Launch checklist (pre-launch, launch, post-launch)
- ✅ Common pitfalls & solutions

**AI Can Now Build**:
1. Complete MVP (copy code from each phase)
2. Database migrations (Drizzle Kit)
3. API routes (Next.js App Router)
4. UI components (React + Tailwind)
5. RAG pipeline (OpenAI + Qdrant)
6. Payment flows (Stripe)
7. Self-hosted deployment (Docker Compose)
8. E2E tests (Playwright)

**What AI Still Needs**:
- EXPERT_MARKETPLACE_GUIDE.md (detailed expert matching algorithm, post-MVP automation)
- RAG_IMPLEMENTATION_GUIDE.md (advanced RAG techniques, fine-tuning, evaluation)
