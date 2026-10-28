/**
 * Authentication Schemas
 *
 * Zod validation schemas for auth forms.
 * SSOT for auth validation rules.
 */

import { z } from 'zod';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@bitbaum/accountkit/auth/password';

/**
 * The one bitbaum password rule (@bitbaum/accountkit): not empty, at most 128
 * characters. Sign-in, sign-up and reset all use this schema.
 */
export const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, 'Password is required')
  .max(MAX_PASSWORD_LENGTH, `Password must be at most ${MAX_PASSWORD_LENGTH} characters`);

/**
 * Email schema
 */
const emailSchema = z.string().email('Please enter a valid email address');

/**
 * Sign In form schema
 */
export const SignInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignInFormData = z.infer<typeof SignInSchema>;

/**
 * Sign Up form schema
 */
export const SignUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof SignUpSchema>;

/**
 * Forgot Password form schema
 */
export const ForgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

/**
 * Reset Password form schema (setting new password)
 */
export const ResetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

/**
 * Settings update schema
 */
export const UpdateSettingsSchema = z.object({
  preferred_model: z.enum(['groq', 'openrouter', 'ollama']),
  groq_api_key: z.string().nullable().optional(),
  openrouter_api_key: z.string().nullable().optional(),
  ollama_url: z.string().url().nullable().optional().or(z.literal('')),
});

export type UpdateSettingsFormData = z.infer<typeof UpdateSettingsSchema>;

/**
 * Profile validation rules
 */
export const DISPLAY_NAME_MAX_LENGTH = 50;

/**
 * Update Profile form schema
 */
export const UpdateProfileSchema = z.object({
  display_name: z
    .string()
    .min(1, 'Display name is required')
    .max(
      DISPLAY_NAME_MAX_LENGTH,
      `Display name must be ${DISPLAY_NAME_MAX_LENGTH} characters or less`,
    )
    .regex(
      /^[a-zA-Z0-9\s\-_.]+$/,
      'Display name can only contain letters, numbers, spaces, and -_.',
    )
    .optional(),
  avatar_url: z
    .string()
    .url('Invalid avatar URL')
    .max(500, 'Avatar URL is too long')
    .optional()
    .nullable()
    .or(z.literal('')),
});

export type UpdateProfileFormData = z.infer<typeof UpdateProfileSchema>;

/**
 * User Profile type
 */
export interface UserProfile {
  id: string;
  email: string | undefined;
  display_name: string | null;
  avatar_url: string | null;
  email_verified: boolean;
  created_at: string;
}
