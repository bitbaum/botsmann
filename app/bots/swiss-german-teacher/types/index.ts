/**
 * Core type definitions
 */

// Vocabulary section types
export interface VocabularyWord {
  word: string;
  translation: string;
  example: string;
  notes?: string;
}

// Grammar section types
export interface GrammarConcept {
  concept: string;
  explanation: string;
  example: string;
  notes?: string;
}

// Conversation section types
export interface ConversationExample {
  situation: string;
  standard: string;
  swiss: string;
  translation: string;
}

// Waitlist form types
export interface WaitlistPreferences {
  learningTools: boolean;
  communityFeatures: boolean;
  authenticContent: boolean;
  culturalInsights: boolean;
  earlyAccess: boolean;
  emailUpdates: boolean;
}

export interface WaitlistFormState {
  email: string;
  preferences: WaitlistPreferences;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

// Demo mode types
export interface DemoState {
  isActive: boolean;
  step: number;
  prompt: string;
  response: DemoResponse | null;
}

export interface DemoResponse {
  word: string;
  translation: string;
  example: string;
  pronunciation: string;
  notes: string;
  difficulty: string;
} 