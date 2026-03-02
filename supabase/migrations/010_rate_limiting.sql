-- Rate limiting table for distributed rate limiting across serverless instances
CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  window_seconds INTEGER NOT NULL
);

-- Index for cleanup of expired entries
CREATE INDEX idx_rate_limits_window ON rate_limits (window_start);

-- Atomic check-and-increment rate limit function
-- Returns JSON: { allowed: bool, remaining: int, reset_at: timestamptz }
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_key TEXT,
  p_max_requests INTEGER,
  p_window_seconds INTEGER
) RETURNS JSONB AS $$
DECLARE
  v_now TIMESTAMPTZ := NOW();
  v_count INTEGER;
  v_window_start TIMESTAMPTZ;
BEGIN
  INSERT INTO rate_limits (key, count, window_start, window_seconds)
  VALUES (p_key, 1, v_now, p_window_seconds)
  ON CONFLICT (key) DO UPDATE
  SET
    count = CASE
      WHEN rate_limits.window_start + (rate_limits.window_seconds * INTERVAL '1 second') < v_now
      THEN 1
      ELSE rate_limits.count + 1
    END,
    window_start = CASE
      WHEN rate_limits.window_start + (rate_limits.window_seconds * INTERVAL '1 second') < v_now
      THEN v_now
      ELSE rate_limits.window_start
    END,
    window_seconds = p_window_seconds
  RETURNING count, window_start INTO v_count, v_window_start;

  RETURN jsonb_build_object(
    'allowed', v_count <= p_max_requests,
    'remaining', GREATEST(0, p_max_requests - v_count),
    'reset_at', v_window_start + (p_window_seconds * INTERVAL '1 second')
  );
END;
$$ LANGUAGE plpgsql;

-- Cleanup function: delete entries older than their window
-- Call periodically via pg_cron or application-side
CREATE OR REPLACE FUNCTION cleanup_rate_limits() RETURNS INTEGER AS $$
DECLARE
  v_deleted INTEGER;
BEGIN
  DELETE FROM rate_limits
  WHERE window_start + (window_seconds * INTERVAL '1 second') < NOW();
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted;
END;
$$ LANGUAGE plpgsql;
