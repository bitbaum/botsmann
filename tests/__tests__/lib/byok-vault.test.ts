/**
 * A reader's provider keys at rest: sealed, readable, legacy plaintext still
 * served, and an empty field never wiping a saved key.
 */
import {
  isSealed,
  planKeyChange,
  readStoredKey,
  sealKey,
  sealingSecret,
  storedKeyHint,
} from '@/lib/byok-vault';

const SECRET = 'test-seal-secret-0123456789';
const KEY = 'gsk_not_a_real_key_abcd1234';

describe('byok vault', () => {
  it('seals a key so the stored value is not the key, and reads it back', () => {
    const sealed = sealKey(KEY, SECRET);
    expect(sealed).not.toContain(KEY);
    expect(isSealed(sealed)).toBe(true);
    expect(readStoredKey(sealed, SECRET)).toEqual({ key: KEY, legacy: false });
  });

  it('serves a plaintext key stored by an older version, flagged for sealing', () => {
    expect(isSealed(KEY)).toBe(false);
    expect(readStoredKey(KEY, SECRET)).toEqual({ key: KEY, legacy: true });
  });

  it('reads a sealed value it cannot open as no key, never as garbage', () => {
    const sealed = sealKey(KEY, SECRET);
    expect(readStoredKey(sealed, 'a-different-secret-987654').key).toBeNull();
    expect(readStoredKey(sealed, null).key).toBeNull();
  });

  it('hints the last four characters only', () => {
    const hint = storedKeyHint(sealKey(KEY, SECRET), SECRET);
    expect(hint).toContain('1234');
    expect(hint).not.toContain('gsk_');
    expect(storedKeyHint(null, SECRET)).toBeNull();
  });

  it('needs a real secret before anything is stored', () => {
    expect(sealingSecret({})).toBeNull();
    expect(sealingSecret({ BYOK_SEAL_SECRET: 'short' })).toBeNull();
    expect(sealingSecret({ BYOK_SEAL_SECRET: SECRET })).toBe(SECRET);
  });

  it('keeps a saved key when the field is empty or absent — removing is explicit', () => {
    expect(planKeyChange(undefined, false)).toEqual({ kind: 'keep' });
    expect(planKeyChange(null, false)).toEqual({ kind: 'keep' });
    expect(planKeyChange('   ', false)).toEqual({ kind: 'keep' });
    expect(planKeyChange(undefined, true)).toEqual({ kind: 'remove' });
    expect(planKeyChange(` ${KEY} `, false)).toEqual({ kind: 'set', key: KEY });
  });
});
