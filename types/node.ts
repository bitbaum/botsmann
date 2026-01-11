import { z } from 'zod';

// ============================================
// PRIVATE AI NODE - Core Type Definitions
// ============================================

/**
 * Node Status - lifecycle of a private AI node
 */
export type NodeStatus =
  | 'draft'        // Being configured
  | 'deploying'    // Spinning up
  | 'active'       // Running and available
  | 'paused'       // Temporarily stopped
  | 'archived';    // Soft deleted

/**
 * Deployment Type - where the node runs
 */
export type DeploymentType =
  | 'managed'      // Hosted by Botsmann
  | 'self-hosted'  // User's infrastructure
  | 'hybrid';      // Core on Botsmann, extensions self-hosted

/**
 * Model Provider - which AI backend powers the node
 */
export type ModelProvider =
  | 'openai'
  | 'anthropic'
  | 'mistral'
  | 'local'        // Self-hosted models (Ollama, etc.)
  | 'custom';      // Custom API endpoint

/**
 * Node Personality Configuration
 */
export interface NodePersonality {
  name: string;
  tagline: string;
  description: string;
  tone: 'professional' | 'friendly' | 'casual' | 'formal' | 'playful' | 'custom';
  customToneDescription?: string;
  avatar: string;           // URL or emoji
  accentColor: string;      // Hex color
  systemPrompt: string;     // Core personality prompt
  exampleMessages?: {
    user: string;
    assistant: string;
  }[];
}

/**
 * Knowledge Source - what the node knows
 */
export interface KnowledgeSource {
  id: string;
  type: 'document' | 'url' | 'api' | 'database' | 'manual';
  name: string;
  content?: string;         // For manual entries
  url?: string;             // For URL/API sources
  connectionString?: string; // For database sources
  lastSynced?: Date;
  status: 'pending' | 'indexing' | 'ready' | 'error';
  errorMessage?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Node Capability - what the node can do
 */
export interface NodeCapability {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  config?: Record<string, unknown>;
}

/**
 * Built-in capabilities available to all nodes
 */
export const BUILT_IN_CAPABILITIES: NodeCapability[] = [
  {
    id: 'chat',
    name: 'Conversational Chat',
    description: 'Natural language conversations with context memory',
    enabled: true
  },
  {
    id: 'rag',
    name: 'Knowledge Retrieval',
    description: 'Answer questions from your uploaded documents and sources',
    enabled: true
  },
  {
    id: 'code',
    name: 'Code Generation',
    description: 'Write, explain, and debug code',
    enabled: false
  },
  {
    id: 'web-search',
    name: 'Web Search',
    description: 'Search the internet for current information',
    enabled: false
  },
  {
    id: 'image-gen',
    name: 'Image Generation',
    description: 'Create images from text descriptions',
    enabled: false
  },
  {
    id: 'voice',
    name: 'Voice Interface',
    description: 'Speech-to-text and text-to-speech',
    enabled: false
  },
  {
    id: 'api-actions',
    name: 'API Actions',
    description: 'Call external APIs and services',
    enabled: false
  },
  {
    id: 'memory',
    name: 'Long-term Memory',
    description: 'Remember information across conversations',
    enabled: false
  }
];

/**
 * Privacy & Access Settings
 */
export interface NodePrivacy {
  visibility: 'private' | 'unlisted' | 'public';
  requireAuth: boolean;
  allowedDomains?: string[];      // For embedding
  allowedUsers?: string[];        // User IDs with access
  dataRetention: 'none' | '24h' | '7d' | '30d' | 'forever';
  encryptionEnabled: boolean;
  auditLogging: boolean;
}

/**
 * Node Usage & Limits
 */
export interface NodeUsage {
  messagesThisMonth: number;
  tokensThisMonth: number;
  knowledgeStorageMB: number;
  lastActive?: Date;
}

export interface NodeLimits {
  maxMessagesPerMonth: number;
  maxTokensPerMonth: number;
  maxKnowledgeStorageMB: number;
  maxKnowledgeSources: number;
  rateLimitPerMinute: number;
}

/**
 * Deployment Configuration
 */
export interface NodeDeployment {
  type: DeploymentType;
  provider: ModelProvider;
  modelId: string;              // e.g., 'gpt-4', 'claude-3-opus'
  region?: string;              // For managed deployments
  customEndpoint?: string;      // For self-hosted/custom
  apiKeyEncrypted?: string;     // User's API key (encrypted)
  temperature: number;          // 0-2
  maxTokens: number;
  webhookUrl?: string;          // For events
}

/**
 * Main Private AI Node Interface
 */
export interface PrivateAINode {
  // Identity
  id: string;
  slug: string;                 // URL-friendly identifier
  ownerId: string;              // User who created it

  // Configuration
  personality: NodePersonality;
  knowledge: KnowledgeSource[];
  capabilities: NodeCapability[];
  privacy: NodePrivacy;
  deployment: NodeDeployment;

  // Status & Metadata
  status: NodeStatus;
  usage: NodeUsage;
  limits: NodeLimits;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  deployedAt?: Date;
  lastActiveAt?: Date;

  // Optional
  tags?: string[];
  category?: string;
  version: number;
}

// ============================================
// ZOD VALIDATION SCHEMAS
// ============================================

export const NodePersonalitySchema = z.object({
  name: z.string().min(1).max(50),
  tagline: z.string().max(100),
  description: z.string().max(500),
  tone: z.enum(['professional', 'friendly', 'casual', 'formal', 'playful', 'custom']),
  customToneDescription: z.string().max(200).optional(),
  avatar: z.string(),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  systemPrompt: z.string().min(10).max(4000),
  exampleMessages: z.array(z.object({
    user: z.string(),
    assistant: z.string()
  })).optional()
});

export const KnowledgeSourceSchema = z.object({
  id: z.string(),
  type: z.enum(['document', 'url', 'api', 'database', 'manual']),
  name: z.string().min(1).max(100),
  content: z.string().optional(),
  url: z.string().url().optional(),
  connectionString: z.string().optional(),
  status: z.enum(['pending', 'indexing', 'ready', 'error']),
  errorMessage: z.string().optional(),
  metadata: z.record(z.unknown()).optional()
});

export const NodePrivacySchema = z.object({
  visibility: z.enum(['private', 'unlisted', 'public']),
  requireAuth: z.boolean(),
  allowedDomains: z.array(z.string()).optional(),
  allowedUsers: z.array(z.string()).optional(),
  dataRetention: z.enum(['none', '24h', '7d', '30d', 'forever']),
  encryptionEnabled: z.boolean(),
  auditLogging: z.boolean()
});

export const NodeDeploymentSchema = z.object({
  type: z.enum(['managed', 'self-hosted', 'hybrid']),
  provider: z.enum(['openai', 'anthropic', 'mistral', 'local', 'custom']),
  modelId: z.string(),
  region: z.string().optional(),
  customEndpoint: z.string().url().optional(),
  temperature: z.number().min(0).max(2),
  maxTokens: z.number().min(100).max(128000),
  webhookUrl: z.string().url().optional()
});

export const CreateNodeSchema = z.object({
  personality: NodePersonalitySchema,
  deployment: NodeDeploymentSchema,
  privacy: NodePrivacySchema.optional()
});

// ============================================
// DEFAULT NODE CONFIGURATION
// ============================================

export const DEFAULT_NODE_LIMITS: NodeLimits = {
  maxMessagesPerMonth: 1000,
  maxTokensPerMonth: 500000,
  maxKnowledgeStorageMB: 100,
  maxKnowledgeSources: 10,
  rateLimitPerMinute: 20
};

export const DEFAULT_NODE_PRIVACY: NodePrivacy = {
  visibility: 'private',
  requireAuth: true,
  dataRetention: '30d',
  encryptionEnabled: true,
  auditLogging: true
};

export const DEFAULT_NODE_DEPLOYMENT: Partial<NodeDeployment> = {
  type: 'managed',
  provider: 'openai',
  modelId: 'gpt-4o',
  temperature: 0.7,
  maxTokens: 4096
};

// ============================================
// NODE TEMPLATES
// ============================================

export interface NodeTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  personality: Partial<NodePersonality>;
  capabilities: string[];  // Capability IDs to enable
  tags: string[];
}

export const NODE_TEMPLATES: NodeTemplate[] = [
  {
    id: 'customer-support',
    name: 'Customer Support Agent',
    description: 'Friendly support bot that answers questions from your knowledge base',
    icon: '🎧',
    category: 'business',
    personality: {
      tone: 'friendly',
      systemPrompt: 'You are a helpful customer support agent. Be friendly, patient, and solution-oriented. If you don\'t know something, say so and offer to connect the user with a human agent.'
    },
    capabilities: ['chat', 'rag', 'memory'],
    tags: ['support', 'customer-service', 'helpdesk']
  },
  {
    id: 'research-assistant',
    name: 'Research Assistant',
    description: 'Analyzes documents and helps synthesize information',
    icon: '🔬',
    category: 'productivity',
    personality: {
      tone: 'professional',
      systemPrompt: 'You are a research assistant. Help users analyze documents, find patterns, and synthesize information. Be thorough and cite your sources when referencing uploaded materials.'
    },
    capabilities: ['chat', 'rag', 'web-search'],
    tags: ['research', 'analysis', 'academic']
  },
  {
    id: 'coding-mentor',
    name: 'Coding Mentor',
    description: 'Helps write, review, and explain code',
    icon: '👨‍💻',
    category: 'developer',
    personality: {
      tone: 'friendly',
      systemPrompt: 'You are an experienced software developer and mentor. Help users write clean code, debug issues, and learn programming concepts. Explain things clearly and suggest best practices.'
    },
    capabilities: ['chat', 'code', 'rag'],
    tags: ['coding', 'programming', 'developer']
  },
  {
    id: 'creative-writer',
    name: 'Creative Writer',
    description: 'Helps with creative writing, storytelling, and content creation',
    icon: '✍️',
    category: 'creative',
    personality: {
      tone: 'playful',
      systemPrompt: 'You are a creative writing assistant with a flair for storytelling. Help users brainstorm ideas, develop characters, improve their prose, and overcome writer\'s block. Be imaginative and encouraging.'
    },
    capabilities: ['chat', 'image-gen'],
    tags: ['writing', 'creative', 'content']
  },
  {
    id: 'personal-assistant',
    name: 'Personal Assistant',
    description: 'General-purpose assistant tailored to your preferences',
    icon: '🤖',
    category: 'personal',
    personality: {
      tone: 'casual',
      systemPrompt: 'You are a personal AI assistant. Be helpful, remember user preferences, and adapt your style to match theirs. You can help with tasks, answer questions, and provide recommendations.'
    },
    capabilities: ['chat', 'memory', 'web-search'],
    tags: ['personal', 'general', 'assistant']
  },
  {
    id: 'blank',
    name: 'Start from Scratch',
    description: 'Build your node exactly how you want it',
    icon: '⚡',
    category: 'custom',
    personality: {
      tone: 'professional',
      systemPrompt: ''
    },
    capabilities: ['chat'],
    tags: ['custom', 'blank']
  }
];
