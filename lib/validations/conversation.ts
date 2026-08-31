/**
 * Conversation Validation Schemas
 * @module lib/validations/conversation
 *
 * Zod schemas for validating conversation API inputs
 */

import { z } from 'zod';
import { getAllProfessionalSlugs } from '@/data/professionals';

/**
 * Valid bot types for conversations
 */
export const ConversationBotTypeSchema = z.enum([
  'documents',
  'custom_bot',
  'demo',
  'professional',
]);

/**
 * Valid professional slugs (derived from SSOT in professionals.ts)
 */
const professionalSlugs = getAllProfessionalSlugs();
export const ProfessionalSlugSchema = z.enum(professionalSlugs as [string, ...string[]]);

/**
 * Message source schema
 */
export const MessageSourceSchema = z.object({
  document_name: z.string(),
  preview: z.string(),
  chunk_id: z.string().guid().optional(),
  document_id: z.string().guid().optional(),
  similarity: z.number().min(0).max(1).optional(),
});

/**
 * Schema for creating a new conversation
 */
export const CreateConversationSchema = z.object({
  title: z.string().max(200, 'Title must be at most 200 characters').optional(),
  bot_type: ConversationBotTypeSchema.optional().default('documents'),
  bot_id: z.string().guid('Invalid bot ID').optional(),
  document_id: z.string().guid('Invalid document ID').optional(),
  professional_slug: ProfessionalSlugSchema.optional(),
});

/**
 * Schema for updating a conversation
 */
export const UpdateConversationSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be at most 200 characters'),
});

/**
 * Schema for adding a message to a conversation
 */
export const AddMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1, 'Message content is required').max(50000, 'Message too long'),
  sources: z.array(MessageSourceSchema).optional(),
});

/**
 * Schema for onboarding step completion
 */
export const OnboardingStepSchema = z.object({
  step_id: z.string().min(1, 'Step ID is required'),
});

/**
 * Schema for completing onboarding
 */
export const CompleteOnboardingSchema = z.object({
  completed: z.boolean(),
});

// Type exports inferred from schemas
export type CreateConversationInput = z.infer<typeof CreateConversationSchema>;
export type UpdateConversationInput = z.infer<typeof UpdateConversationSchema>;
export type AddMessageInput = z.infer<typeof AddMessageSchema>;
export type OnboardingStepInput = z.infer<typeof OnboardingStepSchema>;
export type CompleteOnboardingInput = z.infer<typeof CompleteOnboardingSchema>;
