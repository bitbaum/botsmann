-- User context table: accumulated knowledge extracted from conversations and documents
-- This is the core differentiator — professionals get smarter about each user over time

CREATE TABLE IF NOT EXISTS user_context (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  domains TEXT[] NOT NULL DEFAULT '{}',
  source_type TEXT NOT NULL CHECK (source_type IN ('conversation', 'document', 'manual')),
  source_id TEXT,
  confidence REAL NOT NULL DEFAULT 0.8 CHECK (confidence >= 0 AND confidence <= 1),
  embedding vector(384),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_user_context_user_id ON user_context (user_id);
CREATE INDEX idx_user_context_domains ON user_context USING GIN (domains);
CREATE INDEX idx_user_context_source ON user_context (source_type, source_id);

-- Embedding similarity search index (IVFFlat for performance at scale)
-- Note: requires at least some rows before creating IVFFlat, so use exact search initially
-- and switch to IVFFlat when row count justifies it
CREATE INDEX idx_user_context_embedding ON user_context
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 50);

-- RLS: users can only access their own context
ALTER TABLE user_context ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_context_select ON user_context
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY user_context_insert ON user_context
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY user_context_delete ON user_context
  FOR DELETE USING (auth.uid() = user_id);

-- Service role bypass (for async extraction from API routes)
CREATE POLICY user_context_service ON user_context
  FOR ALL USING (auth.role() = 'service_role');

-- Semantic search function: find relevant context for a user + professional domain
CREATE OR REPLACE FUNCTION get_relevant_context(
  p_user_id UUID,
  p_domains TEXT[],
  p_embedding vector(384),
  p_match_threshold REAL DEFAULT 0.3,
  p_max_results INTEGER DEFAULT 10
) RETURNS TABLE (
  id UUID,
  content TEXT,
  domains TEXT[],
  source_type TEXT,
  confidence REAL,
  similarity REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    uc.id,
    uc.content,
    uc.domains,
    uc.source_type,
    uc.confidence,
    (1 - (uc.embedding <=> p_embedding))::REAL AS similarity
  FROM user_context uc
  WHERE
    uc.user_id = p_user_id
    AND uc.embedding IS NOT NULL
    AND uc.domains && p_domains  -- array overlap: any domain matches
    AND (1 - (uc.embedding <=> p_embedding)) > p_match_threshold
  ORDER BY similarity DESC
  LIMIT p_max_results;
END;
$$ LANGUAGE plpgsql STABLE;

-- Auto-update updated_at on modification
CREATE OR REPLACE FUNCTION update_user_context_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_context_updated_at
  BEFORE UPDATE ON user_context
  FOR EACH ROW
  EXECUTE FUNCTION update_user_context_timestamp();
