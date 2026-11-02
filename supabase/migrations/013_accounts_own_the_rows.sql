-- Botsmann's people now come from its own accounts (AccountKit, in the host
-- accounts database), no longer from OrangeCat's GoTrue. Every person column
-- keeps the person's id: everyone who had rows keeps their old GoTrue id as
-- their AccountKit id (scripts/db/accountkit-import.sql), and a person who
-- signs up now gets a new uuid that is in no auth.users row. The foreign keys
-- to auth.users would refuse their first row, so they go. Nothing is deleted:
-- the columns, their values and their indexes stay.
--
-- Rollback: revert the pull request. Re-adding the keys needs every id to be
-- in auth.users again, so they are not re-added automatically.
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT c.conname, c.conrelid::regclass AS rel
    FROM pg_constraint c
    JOIN pg_namespace n ON n.oid = (SELECT relnamespace FROM pg_class WHERE oid = c.conrelid)
    WHERE c.contype = 'f'
      AND n.nspname = 'botsmann'
      AND c.confrelid = 'auth.users'::regclass
  LOOP
    EXECUTE format('ALTER TABLE %s DROP CONSTRAINT %I', r.rel, r.conname);
  END LOOP;
END $$;
