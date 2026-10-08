CREATE TABLE public.ai_guidance_access_state (
  id text PRIMARY KEY,
  status integer NOT NULL,
  message text NOT NULL,
  blocked_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.ai_guidance_access_state TO service_role;
ALTER TABLE public.ai_guidance_access_state ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.ai_guidance_access_state IS 'Server-only AI access circuit breaker; stores no patient concerns or AI transcripts.';