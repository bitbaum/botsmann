import 'server-only';
import { getServiceClient } from '@/lib/supabase';
import { logger } from '@/lib/logger';

/**
 * Every row in the botsmann schema that belongs to a person, keyed by their
 * id. When their row in auth.users went, these went with it (ON DELETE
 * CASCADE); since accounts are AccountKit's, deleting an account
 * (AccountPanel → /api/auth/delete-user) calls this instead. Children that
 * cascade from these (document_chunks from documents, bot_knowledge_chunks
 * from custom_bots, conversation_messages from conversations) go with them;
 * they are deleted by person too, in case a row was written without its
 * parent.
 */
export const PERSON_ROWS: ReadonlyArray<{ table: string; column: 'id' | 'user_id' }> = [
  { table: 'document_chunks', column: 'user_id' },
  { table: 'bot_knowledge_chunks', column: 'user_id' },
  { table: 'conversations', column: 'user_id' },
  { table: 'documents', column: 'user_id' },
  { table: 'custom_bots', column: 'user_id' },
  { table: 'user_context', column: 'user_id' },
  { table: 'user_settings', column: 'id' },
  { table: 'user_profiles', column: 'id' },
];

const BUCKET = 'documents';

/** Remove a deleted person's files and rows. Logs failures; never throws. */
export async function removePersonData(userId: string): Promise<void> {
  const supabase = getServiceClient();
  try {
    const { data: docs } = await supabase
      .from('documents')
      .select('storage_path')
      .eq('user_id', userId);
    const paths = (docs ?? [])
      .map((d: { storage_path: string | null }) => d.storage_path)
      .filter((p): p is string => Boolean(p));
    if (paths.length) await supabase.storage.from(BUCKET).remove(paths);
  } catch (error) {
    logger.error('[accounts] removing a deleted person’s files failed', {
      error: (error as Error).name,
    });
  }
  for (const { table, column } of PERSON_ROWS) {
    const { error } = await supabase.from(table).delete().eq(column, userId);
    if (error)
      logger.error(`[accounts] removing a deleted person’s ${table} failed`, { code: error.code });
  }
}
