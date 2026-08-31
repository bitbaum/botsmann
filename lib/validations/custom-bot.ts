/**
 * Custom Bot Validation Schemas
 * @module lib/validations/custom-bot
 *
 * Zod schemas for validating custom bot API inputs
 */

import { z } from 'zod';
import { CustomBotAccentColorSchema } from '@/lib/config/colors';

/**
 * Valid accent colors for bot themes
 * Re-exported from SSOT in lib/config/colors.ts
 */
export const AccentColorSchema = CustomBotAccentColorSchema;

/**
 * Bot menu item schema
 */
export const BotMenuItemSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1).max(50),
  icon: z.string().optional(),
  section: z.string().optional(),
});

/**
 * Navigation config schema
 */
export const NavConfigSchema = z.object({
  menuItems: z.array(BotMenuItemSchema).default([]),
});

/**
 * Slug validation - lowercase alphanumeric with hyphens
 */
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Schema for creating a new custom bot
 */
export const CreateCustomBotSchema = z.object({
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(50, 'Slug must be at most 50 characters')
    .regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens (e.g., "hr-advisor")'),
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),
  description: z.string().max(500, 'Description must be at most 500 characters').optional(),
  emoji: z.string().max(10, 'Emoji must be at most 10 characters').optional().default('🤖'),
  accent_color: AccentColorSchema.optional().default('blue'),
  system_prompt: z
    .string()
    .min(50, 'System prompt must be at least 50 characters')
    .max(10000, 'System prompt must be at most 10,000 characters'),
  nav_config: NavConfigSchema.optional(),
});

/**
 * Schema for updating an existing custom bot
 */
export const UpdateCustomBotSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters')
    .optional(),
  description: z
    .string()
    .max(500, 'Description must be at most 500 characters')
    .nullable()
    .optional(),
  emoji: z.string().max(10, 'Emoji must be at most 10 characters').optional(),
  accent_color: AccentColorSchema.optional(),
  system_prompt: z
    .string()
    .min(50, 'System prompt must be at least 50 characters')
    .max(10000, 'System prompt must be at most 10,000 characters')
    .optional(),
  nav_config: NavConfigSchema.optional(),
  is_published: z.boolean().optional(),
  is_public: z.boolean().optional(),
});

/**
 * Schema for creating a knowledge chunk
 */
export const CreateKnowledgeChunkSchema = z.object({
  bot_id: z.string().guid('Invalid bot ID'),
  topic: z.string().max(200, 'Topic must be at most 200 characters').optional(),
  question: z.string().max(500, 'Question must be at most 500 characters').optional(),
  content: z
    .string()
    .min(10, 'Content must be at least 10 characters')
    .max(10000, 'Content must be at most 10,000 characters'),
  keywords: z.array(z.string().max(50)).max(20, 'Maximum 20 keywords').optional(),
  source: z.string().max(500, 'Source must be at most 500 characters').optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

/**
 * Schema for updating a knowledge chunk
 */
export const UpdateKnowledgeChunkSchema = z.object({
  topic: z.string().max(200, 'Topic must be at most 200 characters').nullable().optional(),
  question: z.string().max(500, 'Question must be at most 500 characters').nullable().optional(),
  content: z
    .string()
    .min(10, 'Content must be at least 10 characters')
    .max(10000, 'Content must be at most 10,000 characters')
    .optional(),
  keywords: z.array(z.string().max(50)).max(20, 'Maximum 20 keywords').optional(),
  source: z.string().max(500, 'Source must be at most 500 characters').nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

/**
 * Schema for bulk creating knowledge chunks
 */
export const BulkCreateKnowledgeChunksSchema = z.object({
  bot_id: z.string().guid('Invalid bot ID'),
  chunks: z
    .array(
      z.object({
        topic: z.string().max(200).optional(),
        question: z.string().max(500).optional(),
        content: z.string().min(10).max(10000),
        keywords: z.array(z.string().max(50)).max(20).optional(),
        source: z.string().max(500).optional(),
      }),
    )
    .min(1, 'At least one chunk required')
    .max(100, 'Maximum 100 chunks per request'),
});

// Type exports inferred from schemas
export type CreateCustomBotInput = z.infer<typeof CreateCustomBotSchema>;
export type UpdateCustomBotInput = z.infer<typeof UpdateCustomBotSchema>;
export type CreateKnowledgeChunkInput = z.infer<typeof CreateKnowledgeChunkSchema>;
export type UpdateKnowledgeChunkInput = z.infer<typeof UpdateKnowledgeChunkSchema>;
export type BulkCreateKnowledgeChunksInput = z.infer<typeof BulkCreateKnowledgeChunksSchema>;
