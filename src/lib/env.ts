// Environment variable validation for Botsmann
import { z } from 'zod';

const envSchema = z.object({
  // Database
  MONGODB_URI: z.string().url('MONGODB_URI must be a valid URL'),

  // Email configuration
  EMAIL_USER: z.string().email('EMAIL_USER must be a valid email address'),
  EMAIL_PASS: z.string().min(8, 'EMAIL_PASS must be at least 8 characters'),
  EMAIL_TO: z.string().email('EMAIL_TO must be a valid email address'),

  // API keys
  NEXT_PUBLIC_API_KEY: z.string().min(32, 'API key must be at least 32 characters'),

  // Optional: Supabase (if using)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // Optional: Redis (if using)
  REDIS_URL: z.string().url().optional(),

  // Optional: Sentry DSN
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),

  // Git commit SHA for releases
  VERCEL_GIT_COMMIT_SHA: z.string().optional(),
  GIT_COMMIT_SHA: z.string().optional(),

  // Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
});

// Validate environment variables
let env: z.infer<typeof envSchema>;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Environment validation failed:');
    error.errors.forEach((err) => {
      console.error(`  ${err.path.join('.')}: ${err.message}`);
    });
    process.exit(1);
  }
  throw error;
}

// Export validated environment
export { env };

// Export individual variables for convenience
export const {
  MONGODB_URI,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_TO,
  NEXT_PUBLIC_API_KEY,
  NODE_ENV,
  PORT,
} = env;
