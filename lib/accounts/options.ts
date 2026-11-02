import type { AuthRuntimeOptions } from '@bitbaum/accountkit/auth/next';
import type { AuthMailer, AuthSite } from '@bitbaum/accountkit/auth/server';

/** Botsmann as the account system names it in mail and passkeys. */
export function authSite(env: NodeJS.ProcessEnv = process.env): AuthSite {
  return {
    url:
      env.BETTER_AUTH_URL ||
      env.AUTH_URL ||
      env.NEXT_PUBLIC_SITE_URL ||
      'https://botsmann.orangecat.ch',
    title: 'Botsmann',
    slug: 'botsmann',
  };
}

/**
 * How Botsmann's account runtime is built: the app (./server.ts) and the
 * real-database journeys (./accounts.test.ts) use this one definition.
 *
 * `ids: "uuid"`: every person column in the botsmann schema is a uuid, so
 * every account AccountKit creates gets one. A person who signed in through
 * OrangeCat's GoTrue before keeps their old id: scripts/db/accountkit-import.sql
 * gives them an account under it, linked to OrangeCat by their actor id, so
 * their first "Continue with OrangeCat" lands on the rows that id already owns.
 */
export function botsmannAuthOptions(options: {
  mail: AuthMailer;
  getDatabase: AuthRuntimeOptions['getDatabase'];
  env?: NodeJS.ProcessEnv;
}): AuthRuntimeOptions {
  const env = options.env ?? process.env;
  return {
    site: authSite(env),
    mail: options.mail,
    env,
    isDatabaseConfigured: (e) => Boolean(e.DATABASE_URL),
    getDatabase: options.getDatabase,
    ids: 'uuid',
  };
}
