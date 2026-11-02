-- Everyone who owns rows in the botsmann schema, as `<gotrue user id>|<OrangeCat actor id>`
-- (the actor id empty when OrangeCat has no user actor for them). Runs in the
-- supabase-db container (loki scripts/hetzner/accountkit-supabase.sh), read
-- only. OrangeCat's OIDC `sub` is the user's actor id. The person columns are
-- every uuid that referenced auth.users before migration 013.
SELECT p.user_id::text || '|' || coalesce(a.id::text, '')
FROM (
  SELECT id AS user_id FROM botsmann.user_settings
  UNION SELECT id FROM botsmann.user_profiles
  UNION SELECT user_id FROM botsmann.documents
  UNION SELECT user_id FROM botsmann.document_chunks
  UNION SELECT user_id FROM botsmann.custom_bots
  UNION SELECT user_id FROM botsmann.bot_knowledge_chunks
  UNION SELECT user_id FROM botsmann.conversations
  UNION SELECT user_id FROM botsmann.user_context
) p
LEFT JOIN LATERAL (
  SELECT id FROM public.actors
  WHERE actor_type = 'user' AND user_id = p.user_id
  ORDER BY created_at NULLS LAST, id
  LIMIT 1
) a ON true
WHERE p.user_id IS NOT NULL
ORDER BY 1;
