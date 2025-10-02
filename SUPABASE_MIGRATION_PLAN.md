# Migration from MongoDB to Supabase - Botsmann/Lex

## 🎯 Why Migrate to Supabase?

### Current Issues with MongoDB
- ❌ **Costs money** - MongoDB Atlas paid tier
- ❌ **Overkill** - Only storing simple contact forms
- ❌ **Exposed credentials** - Security risk
- ❌ **Extra complexity** - Mongoose, connection pooling, etc.

### Benefits of Supabase
- ✅ **FREE** - 500MB database, 1GB file storage, 2GB bandwidth
- ✅ **Already have account** - You have 2 projects already
- ✅ **PostgreSQL** - More powerful than needed, but free
- ✅ **Built-in Auth** - If you need it later for Lex
- ✅ **Real-time subscriptions** - For future features
- ✅ **Row Level Security** - Better than MongoDB
- ✅ **Automatic APIs** - REST + GraphQL auto-generated
- ✅ **File storage** - For Lex document uploads

---

## 📊 Current MongoDB Usage Analysis

### What You're Storing
**Only one model**: `Consultation`
```typescript
{
  name: string,
  email: string,
  message: string,
  status: 'new' | 'contacted' | 'resolved',
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Usage**:
- Contact form submissions
- Email notifications
- Simple status tracking

**Verdict**: MongoDB is massive overkill for this! 🎯

---

## 🚀 Migration Plan (2 Hours Total)

### Step 1: Set Up Supabase (30 minutes)

#### 1.1 Create Project
```bash
# Option A: Use existing project (recommended)
# - Go to https://supabase.com/dashboard
# - Select one of your 2 existing projects
# - Or create a 3rd project (still free tier)

# Option B: Install Supabase CLI (optional)
npm install -g supabase
supabase login
```

#### 1.2 Create Table
```sql
-- Run this in Supabase SQL Editor
-- Dashboard → SQL Editor → New Query

CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add indexes
CREATE INDEX idx_consultations_email ON consultations(email);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_created_at ON consultations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to do everything
CREATE POLICY "Service role can do everything"
  ON consultations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Public can insert (for contact form)
CREATE POLICY "Anyone can submit consultations"
  ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

---

### Step 2: Install Supabase Client (10 minutes)

```bash
# Install Supabase client
npm install @supabase/supabase-js

# Remove MongoDB dependencies (save ~50MB!)
npm uninstall mongodb mongoose
```

**Update package.json**:
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    // Remove: "mongodb": "^6.13.0",
    // Remove: "mongoose": "^8.10.0",
  }
}
```

---

### Step 3: Update Environment Variables (5 minutes)

**Get Supabase credentials**:
1. Go to Supabase Dashboard → Project Settings → API
2. Copy: `Project URL` and `anon public` key

**Update `.env.example`**:
```bash
# Replace MongoDB with Supabase
# MONGODB_URI=  ← DELETE THIS

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # For server-side only

# Email Configuration (keep existing)
EMAIL_USER=REDACTED_EMAIL
EMAIL_PASS=your-new-app-password
EMAIL_TO=REDACTED_EMAIL
```

**Update Vercel Environment Variables**:
```bash
# Remove
MONGODB_URI

# Add
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

### Step 4: Replace MongoDB Code (45 minutes)

#### 4.1 Create Supabase Client

**Create `src/lib/supabase.ts`**:
```typescript
import { createClient } from '@supabase/supabase-js';

// Client-side (browser)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-side (API routes) - has admin privileges
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Type definitions
export interface Consultation {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  created_at: string;
  updated_at: string;
}
```

#### 4.2 Update API Route

**Replace `app/api/consultations/route.ts`**:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/src/lib/supabase';
import { rateLimit } from '@/src/lib/rate-limit';
import { CustomerSchema } from '@/src/lib/schemas/customer';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    // Parse and validate
    const body = await request.json();
    const validatedData = CustomerSchema.parse(body);

    // Insert into Supabase
    const { data: consultation, error } = await supabaseAdmin
      .from('consultations')
      .insert([{
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        status: 'new'
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit consultation' },
        { status: 500 }
      );
    }

    // Send emails asynchronously (existing code - keep it)
    // ... your email sending code ...

    return NextResponse.json(
      {
        success: true,
        id: consultation.id,
        message: 'Consultation submitted successfully'
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Consultation submission error:', error);

    if (error.code === 'RATE_LIMIT') {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit consultation' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to fetch consultations
export async function GET(request: NextRequest) {
  try {
    // Only allow with service role key (add auth check here)

    const { data: consultations, error } = await supabaseAdmin
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    return NextResponse.json({ consultations });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch consultations' },
      { status: 500 }
    );
  }
}
```

#### 4.3 Update Health Check

**Replace `app/api/health/route.ts`**:
```typescript
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/src/lib/supabase';

export async function GET() {
  try {
    // Test Supabase connection
    const { error } = await supabaseAdmin
      .from('consultations')
      .select('count')
      .limit(1);

    if (error) throw error;

    return NextResponse.json(
      { status: 'healthy', database: 'supabase-connected' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { status: 'unhealthy', database: 'connection-failed' },
      { status: 503 }
    );
  }
}
```

---

### Step 5: Clean Up Old Code (15 minutes)

**Delete MongoDB files**:
```bash
# Remove MongoDB connection file
rm src/lib/mongodb.ts

# Remove Mongoose models
rm src/lib/models/consultation.ts
rm -rf src/lib/models/

# Remove old API files (if any)
rm api/consultations.js 2>/dev/null || true
```

**Update imports** (search for these and remove):
```typescript
// Remove these imports from all files
import { connectDB } from '@/src/lib/mongodb';
import { Consultation } from '@/src/lib/models/consultation';
import mongoose from 'mongoose';
```

---

### Step 6: Test Everything (15 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Test contact form
# - Go to http://localhost:3000
# - Submit a contact form
# - Check Supabase Dashboard → Table Editor → consultations

# 4. Test health check
curl http://localhost:3000/api/health
# Should return: {"status":"healthy","database":"supabase-connected"}

# 5. Check Supabase logs
# Dashboard → Logs → Select your project
```

---

## 📋 Migration Checklist

### Pre-Migration
- [ ] Create Supabase table (SQL above)
- [ ] Get Supabase credentials (URL + keys)
- [ ] Update `.env.example`

### Code Changes
- [ ] Install `@supabase/supabase-js`
- [ ] Uninstall `mongodb` and `mongoose`
- [ ] Create `src/lib/supabase.ts`
- [ ] Update `app/api/consultations/route.ts`
- [ ] Update `app/api/health/route.ts`
- [ ] Delete `src/lib/mongodb.ts`
- [ ] Delete `src/lib/models/`

### Environment Variables
- [ ] Update local `.env` with Supabase vars
- [ ] Update Vercel env vars (remove MongoDB, add Supabase)
- [ ] Remove `MONGODB_URI` everywhere

### Testing
- [ ] Test contact form submission
- [ ] Test health check endpoint
- [ ] Verify data in Supabase dashboard
- [ ] Test email notifications still work

### Deployment
- [ ] Commit changes
- [ ] Push to GitHub
- [ ] Verify Vercel deployment
- [ ] Test production contact form

---

## 🎁 Bonus: Supabase Features for Future Lex Platform

Since you're using Supabase, here's what you get **for free** for the Lex platform:

### 1. **File Storage** (1GB free)
```typescript
// Upload legal documents
const { data, error } = await supabase.storage
  .from('legal-documents')
  .upload('contracts/contract-123.pdf', file);
```

### 2. **Authentication** (Built-in)
```typescript
// User signup/login for Lex platform
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password'
});
```

### 3. **Real-time Chat** (WebSocket included)
```typescript
// Live chat for data room
supabase
  .channel('room:123')
  .on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'messages' },
    (payload) => console.log('New message:', payload)
  )
  .subscribe();
```

### 4. **Edge Functions** (Serverless)
```typescript
// Process documents, send emails, etc.
// Alternative to Vercel API routes
```

### 5. **Row Level Security**
```sql
-- Users can only see their own cases
CREATE POLICY "Users see own cases"
  ON cases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
```

---

## 💰 Cost Comparison

### MongoDB Atlas
- **Free Tier**: 512MB (very limited)
- **Shared Tier**: $9/month (what you likely need)
- **Dedicated**: $57+/month

### Supabase
- **Free Tier**:
  - 500MB database ✅
  - 1GB file storage ✅
  - 2GB bandwidth ✅
  - Unlimited API requests ✅
  - 50,000 monthly active users ✅
- **Pro**: $25/month (8GB database, 100GB storage)

**For your use case**: Supabase Free Tier is perfect! 💰

---

## 🚨 Important Notes

### Data Migration (if you have existing data)
If you already have consultations in MongoDB:

```typescript
// Migration script: migrate-to-supabase.ts
import { connectDB } from './src/lib/mongodb';
import { Consultation as MongoConsultation } from './src/lib/models/consultation';
import { supabaseAdmin } from './src/lib/supabase';

async function migrate() {
  // Connect to MongoDB
  await connectDB();

  // Get all consultations
  const consultations = await MongoConsultation.find({});

  // Insert into Supabase
  for (const consultation of consultations) {
    const { error } = await supabaseAdmin
      .from('consultations')
      .insert([{
        name: consultation.name,
        email: consultation.email,
        message: consultation.message,
        status: consultation.status,
        created_at: consultation.createdAt,
        updated_at: consultation.updatedAt
      }]);

    if (error) console.error('Migration error:', error);
  }

  console.log(`Migrated ${consultations.length} consultations`);
}

migrate();
```

### Security
```typescript
// Add email validation
const { data, error } = await supabaseAdmin
  .from('consultations')
  .insert([{
    name: validatedData.name,
    email: validatedData.email.toLowerCase(), // Normalize
    message: validatedData.message.trim(),
    status: 'new'
  }]);
```

---

## ✅ Final Result

**Before (MongoDB)**:
- Costs: $9/month
- Setup: Complex (Mongoose, connection pooling)
- Security: Exposed credentials
- Features: Just database

**After (Supabase)**:
- Costs: $0/month ✅
- Setup: Simple (one client)
- Security: Row Level Security built-in ✅
- Features: DB + Auth + Storage + Realtime ✅

---

## 🚀 Quick Start (Copy-Paste)

```bash
# 1. Install Supabase
npm install @supabase/supabase-js
npm uninstall mongodb mongoose

# 2. Create table (copy SQL from Step 1.2 above)

# 3. Update .env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# 4. Replace code (copy from Step 4 above)

# 5. Test
npm run dev
```

**Estimated time**: 2 hours
**Cost savings**: $9/month → $0/month
**Added features**: Auth, Storage, Realtime (for future Lex platform)

---

*Migration Guide Version: 1.0*
*Last Updated: January 2025*
*Recommended: ✅ YES - Migrate to Supabase immediately*
