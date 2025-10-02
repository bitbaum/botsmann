# Lex Platform Redesign - System Architecture

## 🎯 Objectives

1. **Simplicity**: Only Switzerland + US jurisdictions
2. **Progressive Disclosure**: Don't overwhelm users with icons/complexity
3. **Modular Engineering**: Foundation for actual product
4. **Dual Portals**: Separate client and lawyer/firm views
5. **Immaculate System Design**: Clean architecture, scalable, maintainable

---

## 📐 System Architecture

### Core Modules

```
/app/bots/legal-expert/
├── components/
│   ├── demo/                    # Demo-specific (will evolve to real product)
│   │   ├── DemoSection.tsx      # Main demo orchestrator (simplified)
│   │   ├── CaseIntakeForm.tsx   # Step 1: Simple case intake
│   │   └── LawyerMatch.tsx      # Step 2: AI-powered matching
│   │
│   ├── workspace/               # Shared workspace components (production-ready)
│   │   ├── types.ts             # Shared TypeScript types
│   │   ├── ClientPortal.tsx     # Client-facing portal
│   │   ├── LawyerPortal.tsx     # Lawyer-facing portal
│   │   ├── DataRoom/
│   │   │   ├── FileManager.tsx
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── AccessControl.tsx
│   │   │   └── AuditLog.tsx
│   │   └── shared/
│   │       ├── Navigation.tsx
│   │       ├── FileUpload.tsx
│   │       └── StatusIndicator.tsx
│   │
│   └── [other sections remain as is]
│
├── portal/                      # Dedicated portal pages (future routing)
│   ├── client/
│   │   └── [caseId]/
│   │       └── page.tsx         # /portal/client/[caseId]
│   └── lawyer/
│       └── [caseId]/
│           └── page.tsx         # /portal/lawyer/[caseId]
```

---

## 🔄 Redesigned Demo Flow (Simplified)

### Step 1: Case Intake (Progressive Disclosure)
**Focus**: Gather essential info without overwhelming

```typescript
interface CaseIntake {
  // Phase 1: Basic (always visible)
  caseType: 'personal' | 'business';
  legalArea: string;        // Immigration, Employment, etc.
  description: string;      // Minimum 50 chars

  // Phase 2: Location (progressive)
  jurisdiction: 'CH' | 'US';
  subJurisdiction?: string; // Canton (CH) or State (US)

  // Phase 3: Details (optional, collapsed)
  urgency?: 'standard' | 'urgent';
  budget?: 'fixed' | 'hourly' | 'consultation';
  files?: File[];
}
```

**UI Pattern**:
- Start with 3 fields (type, area, description)
- "Show more options" expands jurisdiction/urgency
- File upload at the end (optional)
- NO overwhelming icons, clean minimal design

### Step 2: AI Lawyer Matching
**Focus**: Show 2-3 top matches, explain matching logic

```typescript
interface LawyerMatch {
  id: string;
  name: string;
  specialty: string[];
  jurisdiction: string;
  experience: number;      // years
  rating: number;          // 1-5
  matchScore: number;      // 0-100 (AI calculated)
  matchReasons: string[];  // Why this lawyer?
  availability: 'immediate' | 'this-week' | '1-2-weeks';
  consultationFee?: number;
}
```

**UI Pattern**:
- Show top 3 matches with match score
- Explain WHY each lawyer was matched
- Simple selection (no complex filters in demo)
- "View more lawyers" loads additional (progressive)

### Step 3: Portal Preview
**Show portal creation** → User chooses perspective:
- "View as Client" → ClientPortal
- "View as Lawyer" → LawyerPortal

---

## 🏛️ Portal Architecture

### Client Portal (`/workspace/ClientPortal.tsx`)

**Core Views**:
1. **Overview** - Case status, next steps, timeline
2. **Files** - Upload, organize, share with lawyer
3. **Messages** - AI + human lawyer chat (unified)
4. **Tasks** - Action items from lawyer
5. **Billing** - Transparent cost tracking

**Key Features**:
- Simple file upload with auto-categorization
- Real-time chat (AI answers instantly, lawyer when available)
- Permission controls (who sees what files)
- Activity feed (audit log for transparency)

### Lawyer Portal (`/workspace/LawyerPortal.tsx`)

**Core Views**:
1. **Dashboard** - All active cases, priorities
2. **Case Details** - Deep dive into specific case
3. **Document Review** - AI-assisted analysis
4. **Client Communication** - Manage all client interactions
5. **Team Collaboration** - Assign to paralegals, experts
6. **Billing & Time Tracking** - Track hours, generate invoices

**Key Features**:
- AI case summarization
- Suggested next actions based on case type
- Multi-level access (assign to team members)
- Client permission requests (e.g., "Can I share X with expert witness?")

---

## 🗂️ Data Models (Production-Ready)

### Case Model
```typescript
interface Case {
  id: string;
  clientId: string;
  lawyerId?: string;
  firmId?: string;

  // Case Details
  type: 'personal' | 'business';
  legalArea: string;
  jurisdiction: Jurisdiction;
  description: string;
  status: 'intake' | 'assigned' | 'active' | 'resolved' | 'closed';

  // Participants
  participants: Participant[];

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  urgency: 'standard' | 'urgent';
}

interface Jurisdiction {
  country: 'CH' | 'US';
  region?: string;        // Canton or State
  specificLocation?: string;  // City (optional)
}

interface Participant {
  id: string;
  role: 'client' | 'lawyer' | 'paralegal' | 'expert' | 'admin';
  userId: string;
  permissions: Permission[];
  addedAt: Date;
  addedBy: string;
}
```

### File Model
```typescript
interface CaseFile {
  id: string;
  caseId: string;
  name: string;
  type: string;          // MIME type
  size: number;
  uploadedBy: string;
  uploadedAt: Date;

  // AI Analysis
  category?: FileCategory;  // contract, evidence, correspondence, etc.
  aiSummary?: string;
  extractedEntities?: Entity[];  // dates, people, amounts

  // Access Control
  visibility: 'private' | 'lawyer-only' | 'team' | 'all-participants';
  accessLog: AccessLog[];

  // Storage
  storageUrl: string;
  encryptionKey?: string;
}

type FileCategory =
  | 'contract'
  | 'evidence'
  | 'correspondence'
  | 'court-filing'
  | 'identification'
  | 'financial'
  | 'other';
```

### Message Model
```typescript
interface Message {
  id: string;
  caseId: string;
  senderId: string;
  senderRole: 'client' | 'lawyer' | 'ai';

  content: string;
  attachments?: string[];  // File IDs

  // AI Specific
  aiModel?: string;        // If AI generated
  aiConfidence?: number;   // Confidence score
  needsHumanReview?: boolean;

  // Visibility
  visibleTo: string[];     // User IDs

  // Metadata
  timestamp: Date;
  edited?: boolean;
  editedAt?: Date;
}
```

---

## 🎨 UI/UX Principles

### Progressive Disclosure
1. **Start Simple**: Show only essential fields
2. **Reveal on Demand**: "Show more options" for advanced features
3. **Smart Defaults**: Pre-select common choices
4. **Contextual Help**: Tooltips on hover, not always visible

### Minimal Icons
- Use icons ONLY when they add clarity
- Prefer text labels for primary actions
- Icons for secondary/tertiary actions (edit, delete)
- Emoji sparingly for delight, not information

### Clean Design
- White space is good
- Clear visual hierarchy
- Focus on one primary action per screen
- Mobile-first responsive

---

## 🔐 Security & Permissions

### Access Levels
```typescript
type Permission =
  | 'view-case'
  | 'edit-case'
  | 'view-files'
  | 'upload-files'
  | 'delete-files'
  | 'view-messages'
  | 'send-messages'
  | 'invite-participants'
  | 'view-billing'
  | 'manage-billing';

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  client: ['view-case', 'view-files', 'upload-files', 'view-messages', 'send-messages', 'view-billing'],
  lawyer: ['*'], // All permissions
  paralegal: ['view-case', 'view-files', 'upload-files', 'view-messages', 'send-messages'],
  expert: ['view-files'], // Only files shared with them
  admin: ['view-case', 'view-files', 'view-messages'] // Law firm admin
};
```

### File Sharing Workflow
1. Client uploads file → default "private" (only client + lawyer)
2. Lawyer can request to share: "Can I share this with paralegal X?"
3. Client approves/denies
4. All sharing actions logged in audit trail

---

## 🚀 Implementation Plan

### Phase 1: Simplify Demo (Week 1)
- [ ] Reduce jurisdictions to CH + US only
- [ ] Redesign Step 1: Progressive case intake form
- [ ] Redesign Step 2: Simple lawyer matching (top 3)
- [ ] Create portal preview (choose perspective)

### Phase 2: Build Client Portal (Week 2)
- [ ] Create `/workspace/ClientPortal.tsx`
- [ ] Implement 5 core views (Overview, Files, Messages, Tasks, Billing)
- [ ] File upload with categorization
- [ ] Real-time chat interface (AI + lawyer)

### Phase 3: Build Lawyer Portal (Week 3)
- [ ] Create `/workspace/LawyerPortal.tsx`
- [ ] Implement dashboard (all cases)
- [ ] Case detail view with AI insights
- [ ] Team collaboration (assign tasks)
- [ ] Client permission requests

### Phase 4: Shared Components (Week 4)
- [ ] Extract common components to `/workspace/shared/`
- [ ] Unified file manager
- [ ] Unified chat interface (used by both portals)
- [ ] Access control component
- [ ] Audit log component

### Phase 5: Polish & Integration (Week 5)
- [ ] Mobile responsiveness
- [ ] Loading states, error handling
- [ ] Animations (subtle, not overwhelming)
- [ ] Documentation for future engineers

---

## 📊 Success Metrics

### Demo Effectiveness
- User completes intake in < 2 minutes
- Match understanding (user knows WHY lawyer was matched)
- Portal clarity (user understands dual perspectives)

### Code Quality
- < 500 lines per component (modular)
- 90%+ TypeScript coverage
- Reusable components (DRY)
- Clear separation of concerns

### Production Readiness
- All data models defined
- Security/permissions implemented
- Audit trail working
- Can add real backend without major refactor

---

## 🏗️ Directory Structure (Final)

```
/app/bots/legal-expert/
├── components/
│   ├── demo/
│   │   ├── DemoSection.tsx           # Demo orchestrator
│   │   ├── CaseIntakeForm.tsx        # Step 1
│   │   └── LawyerMatcher.tsx         # Step 2
│   │
│   ├── workspace/
│   │   ├── types.ts                  # Shared types
│   │   ├── constants.ts              # Shared constants
│   │   ├── ClientPortal.tsx          # Client view
│   │   ├── LawyerPortal.tsx          # Lawyer view
│   │   │
│   │   ├── data-room/
│   │   │   ├── FileManager.tsx
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── AccessControl.tsx
│   │   │   └── AuditLog.tsx
│   │   │
│   │   └── shared/
│   │       ├── Navigation.tsx
│   │       ├── FileUpload.tsx
│   │       ├── StatusBadge.tsx
│   │       └── LoadingState.tsx
│   │
│   ├── cta/
│   ├── tech/
│   └── ... (other sections)
│
├── hooks/
│   ├── useCase.ts                    # Case management
│   ├── useFiles.ts                   # File operations
│   └── useChat.ts                    # Chat/messaging
│
├── utils/
│   ├── permissions.ts                # Permission checks
│   ├── fileHelpers.ts                # File utils
│   └── validators.ts                 # Input validation
│
└── page.tsx
```

---

## 💡 Key Decisions

1. **Jurisdictions**: Only CH + US
   - Switzerland: All 26 cantons selectable
   - US: All 50 states selectable
   - Clean dropdown, no complex hierarchy initially

2. **Icons**: Minimal use
   - Only for file types (PDF, DOCX, etc.)
   - Status indicators (active, pending, etc.)
   - NO decorative icons in primary UI

3. **Progressive Disclosure**: Core principle
   - Start with 3 fields in intake
   - Expand to 5-7 with "Show more"
   - File upload last (optional)

4. **Dual Portals**: Separate but shared components
   - ClientPortal.tsx - client perspective
   - LawyerPortal.tsx - lawyer perspective
   - Shared: FileManager, ChatInterface, etc.

5. **Production Foundation**: Build for real
   - All types defined for future backend
   - Permission system ready
   - Audit logging in place

---

## 🔄 Next Steps

1. **Immediate**: Simplify demo (jurisdictions, intake form)
2. **This Week**: Build ClientPortal (MVP)
3. **Next Week**: Build LawyerPortal (MVP)
4. **Following**: Extract shared components, polish

---

*Last Updated: 2025-10-02*
*Status: Ready for implementation*
