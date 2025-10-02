// Workspace Types - Production Ready

export type CountryCode = 'CH' | 'US';
export type CaseType = 'personal' | 'business';
export type CaseStatus = 'intake' | 'assigned' | 'active' | 'resolved' | 'closed';
export type UrgencyLevel = 'standard' | 'urgent';
export type BillingType = 'fixed' | 'hourly' | 'consultation';

export type Role = 'client' | 'lawyer' | 'paralegal' | 'expert' | 'admin';

export type Permission =
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

export type FileCategory =
  | 'contract'
  | 'evidence'
  | 'correspondence'
  | 'court-filing'
  | 'identification'
  | 'financial'
  | 'other';

export type FileVisibility = 'private' | 'lawyer-only' | 'team' | 'all-participants';

export type MessageSender = 'client' | 'lawyer' | 'ai';

export interface Jurisdiction {
  country: CountryCode;
  region?: string; // Canton (CH) or State (US)
  specificLocation?: string; // City (optional)
}

export interface CaseIntake {
  // Phase 1: Basic (always visible)
  caseType: CaseType;
  legalArea: string;
  description: string;

  // Phase 2: Location (progressive)
  jurisdiction: Jurisdiction;

  // Phase 3: Details (optional, collapsed)
  urgency?: UrgencyLevel;
  budget?: BillingType;
  files?: File[];
}

export interface Case {
  id: string;
  clientId: string;
  lawyerId?: string;
  firmId?: string;

  // Case Details
  type: CaseType;
  legalArea: string;
  jurisdiction: Jurisdiction;
  description: string;
  status: CaseStatus;

  // Participants
  participants: Participant[];

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  urgency: UrgencyLevel;
}

export interface Participant {
  id: string;
  role: Role;
  userId: string;
  permissions: Permission[];
  addedAt: Date;
  addedBy: string;
}

export interface CaseFile {
  id: string;
  caseId: string;
  name: string;
  type: string; // MIME type
  size: number;
  uploadedBy: string;
  uploadedAt: Date;

  // AI Analysis
  category?: FileCategory;
  aiSummary?: string;
  extractedEntities?: Entity[];

  // Access Control
  visibility: FileVisibility;
  accessLog: AccessLog[];

  // Storage
  storageUrl: string;
  encryptionKey?: string;
}

export interface Entity {
  type: 'person' | 'organization' | 'date' | 'amount' | 'location';
  value: string;
  confidence: number; // 0-1
}

export interface AccessLog {
  userId: string;
  action: 'view' | 'download' | 'edit' | 'delete' | 'share';
  timestamp: Date;
  ipAddress?: string;
}

export interface Message {
  id: string;
  caseId: string;
  senderId: string;
  senderRole: MessageSender;

  content: string;
  attachments?: string[]; // File IDs

  // AI Specific
  aiModel?: string;
  aiConfidence?: number;
  needsHumanReview?: boolean;

  // Visibility
  visibleTo: string[]; // User IDs

  // Metadata
  timestamp: Date;
  edited?: boolean;
  editedAt?: Date;
}

export interface LawyerMatch {
  id: string;
  name: string;
  specialty: string[];
  jurisdiction: Jurisdiction;
  experience: number; // years
  rating: number; // 1-5
  matchScore: number; // 0-100 (AI calculated)
  matchReasons: string[]; // Why this lawyer?
  availability: 'immediate' | 'this-week' | '1-2-weeks';
  consultationFee?: number;
  profileImage?: string;
  bio?: string;
}

export interface Task {
  id: string;
  caseId: string;
  title: string;
  description?: string;
  assignedTo: string; // User ID
  assignedBy: string; // User ID
  dueDate?: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  completedAt?: Date;
}

export interface BillingEntry {
  id: string;
  caseId: string;
  date: Date;
  description: string;
  type: 'hourly' | 'fixed' | 'expense';
  hours?: number;
  rate?: number;
  amount: number;
  billedBy: string; // User ID
  status: 'draft' | 'sent' | 'paid';
}

export interface CaseTimeline {
  id: string;
  caseId: string;
  timestamp: Date;
  actor: string; // User ID
  actorRole: Role;
  action: string;
  details?: Record<string, any>;
}

// Portal-specific types
export interface ClientPortalProps {
  caseId: string;
  case: Case;
  onClose?: () => void;
}

export interface LawyerPortalProps {
  caseId: string;
  case: Case;
  onClose?: () => void;
}
