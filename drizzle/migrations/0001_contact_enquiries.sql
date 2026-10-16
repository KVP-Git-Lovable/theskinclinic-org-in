CREATE TABLE public.contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 5 AND 30),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 200),
  interest text CHECK (interest IS NULL OR char_length(interest) <= 100),
  source text CHECK (source IS NULL OR char_length(source) <= 100),
  message text CHECK (message IS NULL OR char_length(message) <= 2000),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'booked', 'closed'))
);
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
-- Website visitors may submit an enquiry but can never read, change or delete any.
GRANT INSERT ON public.contact_enquiries TO anon, authenticated;
GRANT ALL ON public.contact_enquiries TO service_role;
CREATE POLICY "Visitors can submit enquiries" ON public.contact_enquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'new');
COMMENT ON TABLE public.contact_enquiries IS 'Consultation enquiries from the website contact form. Contains patient contact details; insert-only for visitors.';
