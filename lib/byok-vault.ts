/**
 * A reader's own provider keys (Groq, OpenRouter) at rest.
 *
 * They used to sit in `user_settings` as plaintext, and GET /api/settings sent
 * them back to the browser with the rest of the row. Now a key is sealed with
 * `@bitbaum/ai-kit/seal` (AES-256-GCM) before it is written, never leaves the
 * server again, and the settings screen only ever sees a hint ("…abcd").
 *
 * Rows written before this change still hold plaintext. They keep working —
 * `readStoredKey` reports them as `legacy` — and are sealed in place the next
 * time they are read (see `lib/chat/settings.ts`).
 *
 * Server-only: needs `BYOK_SEAL_SECRET`. Without it nothing new is stored,
 * rather than storing it in the clear.
 */
import { byokKeyHint } from '@bitbaum/ai-kit/byok';
import { openSecret, sealSecret } from '@bitbaum/ai-kit/seal';

const CONTEXT = 'botsmann-user-key';

/** `iv:tag:ciphertext`, hex — what sealSecret writes. No provider key has this shape. */
const SEALED_SHAPE = /^[0-9a-f]+:[0-9a-f]+:[0-9a-f]+$/i;

export type KeyProvider = 'groq' | 'openrouter';
export const KEY_PROVIDERS: readonly KeyProvider[] = ['groq', 'openrouter'];
export const KEY_COLUMN: Record<KeyProvider, 'groq_api_key' | 'openrouter_api_key'> = {
  groq: 'groq_api_key',
  openrouter: 'openrouter_api_key',
};

/** The sealing secret, or null when this server is not set up to store keys. */
export function sealingSecret(
  env: Record<string, string | undefined> = process.env,
): string | null {
  const secret = env.BYOK_SEAL_SECRET?.trim();
  return secret && secret.length >= 16 ? secret : null;
}

export function isSealed(stored: string): boolean {
  return SEALED_SHAPE.test(stored);
}

export function sealKey(plain: string, secret: string): string {
  return sealSecret(plain, secret, CONTEXT);
}

/**
 * The usable key from a stored column value.
 *
 * `legacy` = stored in the clear by an older version; the caller should seal
 * it. A sealed value that cannot be opened (secret rotated or missing) reads as
 * no key — the reader is asked for it again, instead of the server using garbage.
 */
export function readStoredKey(
  stored: string | null | undefined,
  secret: string | null,
): { key: string | null; legacy: boolean } {
  if (!stored) return { key: null, legacy: false };
  if (!isSealed(stored)) return { key: stored, legacy: true };
  if (!secret) return { key: null, legacy: false };
  try {
    return { key: openSecret(stored, secret, CONTEXT), legacy: false };
  } catch {
    return { key: null, legacy: false };
  }
}

/** "…abcd" for a stored value, or null when there is no usable key. */
export function storedKeyHint(
  stored: string | null | undefined,
  secret: string | null,
): string | null {
  const { key } = readStoredKey(stored, secret);
  return key ? byokKeyHint(key) : null;
}

export type KeyChange = { kind: 'keep' } | { kind: 'remove' } | { kind: 'set'; key: string };

/**
 * What a settings save does to one provider's key.
 *
 * The screen no longer holds the saved key, so an empty field means "leave it
 * alone" — the old PUT wrote `key || null`, which, once keys stopped being sent
 * to the browser, would have wiped every saved key on the next save. Removing a
 * key is an explicit request.
 */
export function planKeyChange(incoming: unknown, remove: boolean): KeyChange {
  if (remove) return { kind: 'remove' };
  if (typeof incoming !== 'string') return { kind: 'keep' };
  const key = incoming.trim();
  return key ? { kind: 'set', key } : { kind: 'keep' };
}
