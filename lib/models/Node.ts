import mongoose, { Schema, Document, Model } from 'mongoose';
import type {
  PrivateAINode,
  NodePersonality,
  KnowledgeSource,
  NodeCapability,
  NodePrivacy,
  NodeDeployment,
  NodeUsage,
  NodeLimits,
  NodeStatus
} from '@/types/node';
import { DEFAULT_NODE_LIMITS, DEFAULT_NODE_PRIVACY, BUILT_IN_CAPABILITIES } from '@/types/node';

// ============================================
// MONGOOSE DOCUMENT INTERFACE
// ============================================

export interface NodeDocument extends Omit<PrivateAINode, 'id'>, Document {
  _id: mongoose.Types.ObjectId;
}

// ============================================
// SUB-SCHEMAS
// ============================================

const ExampleMessageSchema = new Schema({
  user: { type: String, required: true },
  assistant: { type: String, required: true }
}, { _id: false });

const PersonalitySchema = new Schema<NodePersonality>({
  name: { type: String, required: true, maxlength: 50 },
  tagline: { type: String, maxlength: 100, default: '' },
  description: { type: String, maxlength: 500, default: '' },
  tone: {
    type: String,
    enum: ['professional', 'friendly', 'casual', 'formal', 'playful', 'custom'],
    default: 'professional'
  },
  customToneDescription: { type: String, maxlength: 200 },
  avatar: { type: String, default: '🤖' },
  accentColor: { type: String, default: '#3B82F6' },
  systemPrompt: { type: String, required: true, maxlength: 4000 },
  exampleMessages: [ExampleMessageSchema]
}, { _id: false });

const KnowledgeSourceSchema = new Schema<KnowledgeSource>({
  id: { type: String, required: true },
  type: {
    type: String,
    enum: ['document', 'url', 'api', 'database', 'manual'],
    required: true
  },
  name: { type: String, required: true, maxlength: 100 },
  content: String,
  url: String,
  connectionString: String,
  lastSynced: Date,
  status: {
    type: String,
    enum: ['pending', 'indexing', 'ready', 'error'],
    default: 'pending'
  },
  errorMessage: String,
  metadata: Schema.Types.Mixed
}, { _id: false });

const CapabilitySchema = new Schema<NodeCapability>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  enabled: { type: Boolean, default: false },
  config: Schema.Types.Mixed
}, { _id: false });

const PrivacySchema = new Schema<NodePrivacy>({
  visibility: {
    type: String,
    enum: ['private', 'unlisted', 'public'],
    default: 'private'
  },
  requireAuth: { type: Boolean, default: true },
  allowedDomains: [String],
  allowedUsers: [String],
  dataRetention: {
    type: String,
    enum: ['none', '24h', '7d', '30d', 'forever'],
    default: '30d'
  },
  encryptionEnabled: { type: Boolean, default: true },
  auditLogging: { type: Boolean, default: true }
}, { _id: false });

const DeploymentSchema = new Schema<NodeDeployment>({
  type: {
    type: String,
    enum: ['managed', 'self-hosted', 'hybrid'],
    default: 'managed'
  },
  provider: {
    type: String,
    enum: ['openai', 'anthropic', 'mistral', 'local', 'custom'],
    default: 'openai'
  },
  modelId: { type: String, required: true },
  region: String,
  customEndpoint: String,
  apiKeyEncrypted: String,
  temperature: { type: Number, default: 0.7, min: 0, max: 2 },
  maxTokens: { type: Number, default: 4096, min: 100, max: 128000 },
  webhookUrl: String
}, { _id: false });

const UsageSchema = new Schema<NodeUsage>({
  messagesThisMonth: { type: Number, default: 0 },
  tokensThisMonth: { type: Number, default: 0 },
  knowledgeStorageMB: { type: Number, default: 0 },
  lastActive: Date
}, { _id: false });

const LimitsSchema = new Schema<NodeLimits>({
  maxMessagesPerMonth: { type: Number, default: DEFAULT_NODE_LIMITS.maxMessagesPerMonth },
  maxTokensPerMonth: { type: Number, default: DEFAULT_NODE_LIMITS.maxTokensPerMonth },
  maxKnowledgeStorageMB: { type: Number, default: DEFAULT_NODE_LIMITS.maxKnowledgeStorageMB },
  maxKnowledgeSources: { type: Number, default: DEFAULT_NODE_LIMITS.maxKnowledgeSources },
  rateLimitPerMinute: { type: Number, default: DEFAULT_NODE_LIMITS.rateLimitPerMinute }
}, { _id: false });

// ============================================
// MAIN NODE SCHEMA
// ============================================

const NodeSchema = new Schema<NodeDocument>({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[a-z0-9-]+$/
  },
  ownerId: { type: String, required: true, index: true },

  personality: { type: PersonalitySchema, required: true },
  knowledge: { type: [KnowledgeSourceSchema], default: [] },
  capabilities: {
    type: [CapabilitySchema],
    default: () => BUILT_IN_CAPABILITIES.map(cap => ({ ...cap }))
  },
  privacy: { type: PrivacySchema, default: () => ({ ...DEFAULT_NODE_PRIVACY }) },
  deployment: { type: DeploymentSchema, required: true },

  status: {
    type: String,
    enum: ['draft', 'deploying', 'active', 'paused', 'archived'],
    default: 'draft'
  },
  usage: { type: UsageSchema, default: () => ({}) },
  limits: { type: LimitsSchema, default: () => ({ ...DEFAULT_NODE_LIMITS }) },

  tags: [String],
  category: String,
  version: { type: Number, default: 1 },

  deployedAt: Date,
  lastActiveAt: Date
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// ============================================
// INDEXES
// ============================================

NodeSchema.index({ ownerId: 1, status: 1 });
NodeSchema.index({ status: 1, 'privacy.visibility': 1 });
NodeSchema.index({ tags: 1 });
NodeSchema.index({ createdAt: -1 });

// ============================================
// STATIC METHODS
// ============================================

NodeSchema.statics.findByOwner = function(ownerId: string, status?: NodeStatus) {
  const query: Record<string, unknown> = { ownerId };
  if (status) query.status = status;
  return this.find(query).sort({ updatedAt: -1 });
};

NodeSchema.statics.findPublicNodes = function(limit = 20) {
  return this.find({
    status: 'active',
    'privacy.visibility': 'public'
  }).sort({ lastActiveAt: -1 }).limit(limit);
};

// ============================================
// INSTANCE METHODS
// ============================================

NodeSchema.methods.activate = async function() {
  this.status = 'active';
  this.deployedAt = new Date();
  return this.save();
};

NodeSchema.methods.pause = async function() {
  this.status = 'paused';
  return this.save();
};

NodeSchema.methods.archive = async function() {
  this.status = 'archived';
  return this.save();
};

NodeSchema.methods.incrementUsage = async function(messages: number, tokens: number) {
  this.usage.messagesThisMonth += messages;
  this.usage.tokensThisMonth += tokens;
  this.usage.lastActive = new Date();
  this.lastActiveAt = new Date();
  return this.save();
};

// ============================================
// MODEL EXPORT
// ============================================

// Prevent model recompilation in development
const Node: Model<NodeDocument> =
  mongoose.models.Node || mongoose.model<NodeDocument>('Node', NodeSchema);

export default Node;
