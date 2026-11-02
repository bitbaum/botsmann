import { defineConfig } from 'drizzle-kit';

/** The accounts database only (lib/db/schema.ts); the supabase schema keeps supabase/migrations. */
export default defineConfig({
  dialect: 'postgresql',
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dbCredentials: { url: process.env.DATABASE_URL ?? '' },
});
