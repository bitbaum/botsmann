#!/bin/bash
set -e
PR_NUMBER=$1
supabase branch create pr-$PR_NUMBER
supabase db push
SUPABASE_URL=$(supabase status --project-ref | grep "API URL" | awk '{print $3}')
SUPABASE_ANON_KEY=$(supabase status --project-ref | grep "anon" | awk '{print $3}')
vercel deploy --env SUPABASE_URL=$SUPABASE_URL,SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
