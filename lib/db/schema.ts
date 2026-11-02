/**
 * The accounts database (a host Postgres beside the `botsmann` supabase
 * schema; loki scripts/hetzner/accounts-db.conf). It holds AccountKit's tables
 * and nothing else: documents, bots, conversations and the rest stay in the
 * supabase schema, reached over PostgREST with the service-role client.
 */
export * from '@bitbaum/accountkit/auth/schema';
