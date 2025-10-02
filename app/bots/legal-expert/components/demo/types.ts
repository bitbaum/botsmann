// Core types for the legal assistant demo
export interface LegalArea {
  id: string;
  name: string;
  icon: string;
  description: string;
  demandLevel: 'high' | 'medium' | 'low';
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  category?: string;
  status: 'uploading' | 'processing' | 'completed';
  visibility?: 'private' | 'lawyer' | 'team' | 'public';
  timestamp?: Date;
}

export interface LawyerProfile {
  id: string;
  username: string;
  avatar: string;
  expertise: string[];
  rating: number;
  casesHandled: number;
  responseTime: string;
  availability: 'available' | 'busy' | 'offline';
  hourlyRate?: number;
  languages: string[];
}

export interface CaseContext {
  jurisdiction: string;
  legalArea: string;
  description: string;
  files: UploadedFile[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

export interface WorkspaceSection {
  id: string;
  title: string;
  icon: string;
  files: UploadedFile[];
  aiSuggestion?: string;
}
