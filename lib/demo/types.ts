/**
 * Type definitions for the unified bot demo system
 */

// ============================================================================
// Intake/Interview Types
// ============================================================================

export type IntakeQuestionType = 'text' | 'select' | 'multiselect' | 'textarea';
export type IntakePhase = 'essential' | 'advanced';

export interface IntakeQuestion {
  id: string;
  question: string;
  type: IntakeQuestionType;
  options?: string[];
  required: boolean;
  placeholder?: string;
  phase: IntakePhase;
}

export interface IntakeResponses {
  [questionId: string]: string | string[];
}

// ============================================================================
// File Upload Types
// ============================================================================

export interface FileCategory {
  id: string;
  name: string;
  description: string;
  acceptedTypes: string[];
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  category?: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  errorMessage?: string;
  uploadedAt: Date;
}

// ============================================================================
// Chat Types
// ============================================================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: ChatSource[];
  isStreaming?: boolean;
}

export interface ChatSource {
  title: string;
  content: string;
  relevance?: number;
}

// ============================================================================
// Output Configuration
// ============================================================================

export interface DemoOutputConfig {
  showSources: boolean;
  showDisclaimer: boolean;
  disclaimerText?: string;
}

// ============================================================================
// Bot Demo Configuration
// ============================================================================

export interface BotDemoConfig {
  slug: string;

  // Theming
  icon: string;

  // Interview/Intake Questions
  intakeQuestions: IntakeQuestion[];

  // System prompt for LLM
  systemPrompt: string;

  // Welcome message in chat
  welcomeMessage: string;

  // Suggested starter questions
  starterQuestions: string[];

  // File categories for uploads
  fileCategories: FileCategory[];

  // Output formatting hints
  outputConfig: DemoOutputConfig;
}

// ============================================================================
// Demo State Types
// ============================================================================

export type DemoStep = 'intake' | 'chat';

export interface DemoState {
  // Current step
  step: DemoStep;

  // Intake responses
  intakeResponses: IntakeResponses;

  // Uploaded files
  files: UploadedFile[];

  // Chat messages
  messages: ChatMessage[];

  // Processing state
  isLoading: boolean;
  isUploading: boolean;

  // Context summary for LLM
  contextSummary: string;
}

export interface DemoActions {
  updateIntake: (questionId: string, value: string | string[]) => void;
  uploadFiles: (files: File[]) => Promise<void>;
  removeFile: (fileId: string) => void;
  sendMessage: (content: string) => Promise<void>;
  startChat: () => void;
  reset: () => void;
}

export type UseDemoStateReturn = DemoState & DemoActions;

// ============================================================================
// API Types
// ============================================================================

export interface DemoChatRequest {
  message: string;
  systemPrompt?: string;
  additionalContext?: string;
  documentId?: string;
}

export interface DemoChatResponse {
  response: string;
  sources?: ChatSource[];
  provider?: string;
}
