/**
 * Domain Validation Schemas
 * @module lib/validations/domain
 *
 * Zod schemas for validating domain-related inputs.
 * Imports from lib/domains.ts (SSOT) - never hardcode domain values here.
 */

import { z } from 'zod';
import { DOMAINS } from '@/lib/domains';

/**
 * Single domain validation schema.
 * Validates that a string is a valid domain from DOMAINS constant.
 */
export const DomainSchema = z.enum(DOMAINS);

/**
 * Array of domains validation schema.
 * Validates each domain in the array.
 */
export const DomainsArraySchema = z
  .array(DomainSchema)
  .max(7, 'Maximum 7 domains allowed')
  .default([]);

/**
 * Schema for updating document domains
 */
export const UpdateDocumentDomainsSchema = z.object({
  domains: DomainsArraySchema,
});

/**
 * Schema for filtering by domains
 */
export const DomainFilterSchema = z.object({
  domains: z.array(DomainSchema).optional(),
  include_general: z.boolean().optional().default(true),
});

// Type exports
export type DomainInput = z.infer<typeof DomainSchema>;
export type DomainsArrayInput = z.infer<typeof DomainsArraySchema>;
export type UpdateDocumentDomainsInput = z.infer<typeof UpdateDocumentDomainsSchema>;
export type DomainFilterInput = z.infer<typeof DomainFilterSchema>;
