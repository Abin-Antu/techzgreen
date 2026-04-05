-- =============================================
-- ORDER TRACKING MIGRATION
-- Run this in Supabase SQL Editor
-- =============================================

-- Add tracking fields to orders table
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS shipped BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS expected_delivery DATE,
  ADD COLUMN IF NOT EXISTS admin_notes TEXT,
  ADD COLUMN IF NOT EXISTS shipped_at TIMESTAMPTZ;

-- Auto-set shipped_at when order is marked shipped
CREATE OR REPLACE FUNCTION set_shipped_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.shipped = true AND (OLD.shipped = false OR OLD.shipped IS NULL) THEN
    NEW.shipped_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_shipped_at ON public.orders;
CREATE TRIGGER trg_set_shipped_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION set_shipped_at();

-- Ensure users can read their own orders (including new columns)
-- (These policies should already exist, but just in case)
CREATE POLICY IF NOT EXISTS "Users can view their orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Admins can update orders"
  ON public.orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
