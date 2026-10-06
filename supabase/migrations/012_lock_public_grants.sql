-- The public (anon) role could read every contact submission.
--
-- Found 2026-10-06: this app's schema is served by PostgREST
-- (PGRST_DB_SCHEMAS includes botsmann), the anon key ships in the browser
-- bundle (NEXT_PUBLIC_SUPABASE_ANON_KEY), and the deploy tooling grants ALL on
-- every table in the schema to anon/authenticated by default. consultations
-- has no row-level security, so anyone holding the public key could list every
-- visitor's name, email and message over https://supabase.orangecat.ch.
-- The gateway log (back to 2026-08-02) shows only the health check reading
-- `id`; no read of the personal columns was recorded.
--
-- Applied by hand on the live database the same day; this migration makes it
-- part of the schema so a rebuilt database gets the same.
--
-- What the app still needs, and keeps:
--   consultations  INSERT, and SELECT of `id` alone — the contact routes insert
--                  with the anon key and read the new id back.
--   rate_limits    nothing — rate limiting is in-process (limitkit); the table
--                  and check_rate_limit() are no longer called.

REVOKE ALL ON consultations FROM anon, authenticated;
GRANT INSERT ON consultations TO anon, authenticated;
GRANT SELECT (id) ON consultations TO anon, authenticated;

REVOKE ALL ON rate_limits FROM anon, authenticated;
