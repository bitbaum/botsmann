/**
 * Document types for the RAG system
 */

import { type DocumentStatusType } from '@/lib/constants';

/**
 * Document categories that map to professionals
 */
export type DocumentCategory =
  | 'legal'
  | 'health'
  | 'research'
  | 'language'
  | 'creative'
  | 'business'
  | 'general';

export const DOCUMENT_CATEGORIES: {
  value: DocumentCategory;
  label: string;
  emoji: string;
  description: string;
}[] = [
  { value: 'general', label: 'General', emoji: '📄', description: 'Uncategorized documents' },
  { value: 'legal', label: 'Legal', emoji: '⚖️', description: 'Contracts, agreements, legal docs' },
  { value: 'health', label: 'Health', emoji: '⚕️', description: 'Medical records, health info' },
  { value: 'research', label: 'Research', emoji: '🔬', description: 'Papers, studies, data' },
  { value: 'business', label: 'Business', emoji: '🔱', description: 'Plans, financials, strategy' },
  { value: 'creative', label: 'Creative', emoji: '🎨', description: 'Art, design, portfolios' },
  {
    value: 'language',
    label: 'Language',
    emoji: '🇨🇭',
    description: 'Learning materials, translations',
  },
];

/**
 * Map professional slugs to document categories they can access
 */
export const PROFESSIONAL_DOCUMENT_ACCESS: Record<string, DocumentCategory[]> = {
  legal: ['legal', 'general'],
  health: ['health', 'general'],
  research: ['research', 'general'],
  business: ['business', 'general'],
  creative: ['creative', 'general'],
  language: ['language', 'general'],
};

export interface Document {
  id: string;
  user_id: string;
  name: string;
  type: string;
  size_bytes: number;
  storage_path: string;
  status: DocumentStatusType;
  domains: DocumentCategory[];
  /** @deprecated Use `domains` instead. Kept for backward compatibility with existing code. */
  category?: DocumentCategory;
  error_message?: string;
  chunk_count?: number;
  created_at: string;
  updated_at: string;
}

export interface DocumentChunk {
  id: string;
  document_id: string;
  user_id: string;
  content: string;
  embedding: number[];
  metadata: {
    chunk_index: number;
    start_char?: number;
    end_char?: number;
  };
  created_at: string;
}

export interface DocumentUploadResponse {
  success: boolean;
  document?: Document;
  error?: string;
}

export interface DocumentListResponse {
  success: boolean;
  documents?: Document[];
  error?: string;
}

export interface DocumentSearchResult {
  chunk_id: string;
  document_id: string;
  document_name: string;
  content: string;
  similarity: number;
}

export interface SearchResponse {
  success: boolean;
  results?: DocumentSearchResult[];
  error?: string;
}

export type SupportedFileType = 'text/plain' | 'text/markdown' | 'application/pdf';

export const SUPPORTED_FILE_TYPES: SupportedFileType[] = [
  'text/plain',
  'text/markdown',
  'application/pdf',
];

// Re-exported from SSOT for convenience
export { VALIDATION } from '@/lib/constants';
