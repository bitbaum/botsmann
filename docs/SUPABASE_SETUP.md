# Botsmann's Database

## Where it is

Self-hosted. There is **no supabase.com project**, no hosted dashboard, and no
bill from Supabase. We run the open-source Supabase stack in Docker on the
Hetzner box "bitbaum", the same box that serves the app.

|            |                                                                    |
| ---------- | ------------------------------------------------------------------ |
| API URL    | `https://supabase.orangecat.ch` (Caddy → Kong on `127.0.0.1:8000`) |
| Database   | `supabase-db` container, Postgres, no published port               |
| Our schema | **`botsmann`** — not `public`                                      |
| Studio     | `https://supabase.orangecat.ch/` — behind Kong's basic auth        |
| Keys       | `/opt/botsmann/shared/.env` on the box                             |

If you find a hosted-dashboard link anywhere in this repo, it is a
leftover from before the move and it is wrong. `pnpm run check:selfhost` fails
the build on new ones.

## Why we are not in `public`

**One database backs several apps.** OrangeCat owns `public` and has ~136 tables
there. Our table names collide with theirs — `conversations`, `documents`,
`waitlist` — and our `001` defines `update_updated_at()`, a function name
`public` already holds and OrangeCat's triggers call.

So every app gets its own schema. Ours is `botsmann`, pinned in one place:

```ts
// lib/constants.ts
export const DB_SCHEMA = 'botsmann';
```

Every client in `lib/supabase.ts` passes `db: { schema: DB_SCHEMA }`. **A client
that forgets it reads `public`**, where our tables do not exist, and PostgREST
answers `PGRST205 — Could not find the table 'public.consultations'`. That looks
like a dead database but is really a missing five words of config. It is what
took the app down; `tests/__tests__/lib/supabase-schema.test.ts` now guards it.

## How migrations are applied

**Automatically, on deploy. You never paste SQL anywhere.**

Pushing to `main` runs `.github/workflows/deploy.yml`, which calls fleetcrown's
`selfhost-deploy.yml`. That pipeline runs
`scripts/hetzner/apply-schema.sh botsmann … supabase:botsmann` before restarting
the app. It:

- applies only files in `supabase/migrations/` not already recorded in
  `botsmann._deploy_schema_history`,
- runs the batch in **one transaction** — all or nothing,
- **refuses** any migration containing a destructive statement, aborting the
  deploy rather than silently dropping production data.

Current state: 11 migrations applied, 13 tables in the schema.

### Adding one

1. Add `supabase/migrations/0NN_what_it_does.sql`. Keep it forward-only and
   non-destructive, or the deploy will refuse it.
2. Open a PR. Merging deploys it and applies it.

A genuinely destructive change is applied by hand, then recorded so the
automation skips it:

```bash
ssh ubuntu@167.233.22.31 "docker exec supabase-db psql -U postgres -d postgres \
  -c \"INSERT INTO botsmann._deploy_schema_history(tag) VALUES ('0NN_what_it_does')\""
```

## Checking the database

```bash
pnpm run test:db  # connects with our schema and reports every expected table
```

Straight from the box, when you need to see the schema itself:

```bash
ssh ubuntu@167.233.22.31 \
  "docker exec supabase-db psql -U postgres -d postgres \
   -c '\\dt botsmann.*'"
```

## Storage and auth

Storage (`supabase-storage`) and auth (`supabase-auth`, GoTrue) are shared
services on the box, not per-app. Buckets and auth redirect URLs are configured
in Studio. Storage policies live on `storage.objects`, which is shared with
every other app on this stack — scope any policy you add to our bucket, and
prefer a bucket per app over a shared one.

## Resources

- [Supabase docs](https://supabase.com/docs) — the product docs are still the
  right reference; only the hosted dashboard does not apply to us.
- [pgvector](https://github.com/pgvector/pgvector)
- [PostgreSQL Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- fleetcrown: `scripts/hetzner/apply-schema.sh`, `docs/infrastructure/migration-strategy.md`
