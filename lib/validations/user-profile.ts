/**
 * User Profile Validation Schemas
 * @module lib/validations/user-profile
 *
 * Zod schemas for validating user profile API inputs.
 */

import { z } from 'zod';
import { DomainsArraySchema } from './domain';

/**
 * Supported languages for user preferences.
 */
export const SUPPORTED_LANGUAGES = ['en', 'de', 'fr', 'it'] as const;

/**
 * Language validation schema.
 */
export const LanguageSchema = z.enum(SUPPORTED_LANGUAGES);

/**
 * Schema for creating/initializing a user profile.
 * Called when user first authenticates.
 */
export const CreateUserProfileSchema = z.object({
  display_name: z.string().max(100, 'Display name must be at most 100 characters').optional(),
  preferred_language: LanguageSchema.optional().default('en'),
  timezone: z.string().max(50, 'Timezone must be at most 50 characters').optional(),
});

/**
 * Schema for updating an existing user profile.
 */
export const UpdateUserProfileSchema = z.object({
  display_name: z
    .string()
    .max(100, 'Display name must be at most 100 characters')
    .nullable()
    .optional(),
  preferred_language: LanguageSchema.optional(),
  timezone: z.string().max(50, 'Timezone must be at most 50 characters').nullable().optional(),
  active_domains: DomainsArraySchema.optional(),
});

/**
 * Full user profile schema (for responses).
 */
export const UserProfileSchema = z.object({
  id: z.string().guid(),
  display_name: z.string().nullable(),
  preferred_language: LanguageSchema,
  timezone: z.string().nullable(),
  active_domains: DomainsArraySchema,
  total_conversations: z.number().int().nonnegative(),
  total_documents: z.number().int().nonnegative(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  last_active_at: z.string().datetime(),
});

// Type exports
export type CreateUserProfileInput = z.infer<typeof CreateUserProfileSchema>;
export type UpdateUserProfileInput = z.infer<typeof UpdateUserProfileSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
