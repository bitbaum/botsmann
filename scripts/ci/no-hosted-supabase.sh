#!/usr/bin/env bash
# Fail if anything in this repo points at a HOSTED Supabase.
#
# WHY: our database is the self-hosted stack on bitbaum (supabase.orangecat.ch).
# We have no supabase.com project. The repo nevertheless carried a full setup
# doc, two migration scripts and a committed CLI cache all pointing at a hosted
# project ref — so the documented way to apply a migration was "paste this into
# a dashboard", against a dashboard that does not exist for us. Nobody pasted
# anything, the schema was never applied, and the app served PGRST205 in
# production. The instructions were not merely stale; they were the outage.
#
# Fixing those files once only clears today's copies. This gate ends the class.
#
# Allowed: supabase.com/docs — the product documentation is still correct for
# us; only the hosted control plane is not.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

# A hosted project ref is a long opaque token; `your-project.supabase.co` in an
# example file is a placeholder and stays legal.
PATTERN='supabase\.com/dashboard|app\.supabase\.com|pooler\.supabase\.com|[a-z0-9]{15,}\.supabase\.co'

# docs/archive/ is a historical record of the hosted era — it is supposed to
# describe it. Everything else is read as current instruction.
hits=$(git ls-files -z \
  | grep -zZv -e '^docs/archive/' -e '^scripts/ci/no-hosted-supabase\.sh$' \
  | xargs -0 grep -nEI "$PATTERN" 2>/dev/null || true)

if [ -n "$hits" ]; then
  echo "✗ hosted-Supabase reference(s) found — this repo is self-hosted on bitbaum:" >&2
  echo "$hits" >&2
  echo >&2
  echo "  API URL is https://supabase.orangecat.ch and migrations apply on deploy." >&2
  echo "  See docs/SUPABASE_SETUP.md. If a line is a historical record, move it" >&2
  echo "  under docs/archive/ rather than weakening this check." >&2
  exit 1
fi

echo "✓ no hosted-Supabase references"
