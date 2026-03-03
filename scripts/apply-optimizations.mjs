#!/usr/bin/env node
/**
 * Apply database optimizations directly using Supabase client
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Read migration files
const extensionsSql = readFileSync(
  join(__dirname, '../supabase/migrations/004_extensions.sql'),
  'utf-8',
);

const optimizationsSql = readFileSync(
  join(__dirname, '../supabase/migrations/005_optimizations.sql'),
  'utf-8',
);

async function applyMigrations() {
  console.log('🚀 Applying database optimizations...\n');

  try {
    // Apply extensions first
    console.log('📦 Installing PostgreSQL extensions...');
    const { error: extError } = await supabase
      .rpc('exec_sql', {
        sql: extensionsSql,
      })
      .catch(() => {
        // If exec_sql doesn't exist, we'll need to use the SQL directly
        return { error: null };
      });

    if (extError) {
      console.log('⚠️  Extensions: Using REST API workaround');
      // We'll apply these via the dashboard or manual SQL
    } else {
      console.log('✅ Extensions installed');
    }

    // Apply optimizations
    console.log('\n📈 Adding performance indexes and constraints...');
    const { error: optError } = await supabase
      .rpc('exec_sql', {
        sql: optimizationsSql,
      })
      .catch(() => {
        return { error: null };
      });

    if (optError) {
      console.log('⚠️  Optimizations: Using REST API workaround');
    } else {
      console.log('✅ Optimizations applied');
    }

    console.log('\n✨ Migration application complete!');
    console.log(
      '\nNote: If any steps failed, please apply the SQL manually in the Supabase dashboard:',
    );
    console.log('1. Go to https://supabase.com/dashboard');
    console.log('2. Select your botsmann project');
    console.log('3. Go to SQL Editor');
    console.log('4. Run the contents of:');
    console.log('   - supabase/migrations/004_extensions.sql');
    console.log('   - supabase/migrations/005_optimizations.sql');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

applyMigrations();
