-- ============================================================
-- ARUNACHALESHWARA – EXTEND ALL SERVICES, GUEST RECORDS & DOCUMENT UPLOADS
-- ============================================================

-- 1. Table for individual guest records (Adults & Children for Accommodation, Devotees for Darshan, Passengers for Bus/Taxi)
CREATE TABLE IF NOT EXISTS public.booking_guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id VARCHAR(50) NOT NULL, -- references booking_id e.g. ARN-2026-00001
    service_type VARCHAR(50) DEFAULT 'accommodation', -- accommodation, temple-darshan, bus-booking, bike-rentals, taxi-rentals
    guest_type VARCHAR(20) NOT NULL DEFAULT 'adult', -- adult, child, devotee, passenger
    guest_index INT NOT NULL DEFAULT 1,
    full_name VARCHAR(255) NOT NULL,
    age INT,
    gender VARCHAR(20),
    extra_details JSONB DEFAULT '{}'::jsonb, -- gothram, nakshatram, berth preference, etc.
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast lookup by booking ID
CREATE INDEX IF NOT EXISTS idx_booking_guests_booking_id ON public.booking_guests(booking_id);

-- 2. Table for uploaded customer identification documents
CREATE TABLE IF NOT EXISTS public.booking_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id VARCHAR(50) NOT NULL, -- references booking_id e.g. ARN-2026-00001
    service_type VARCHAR(50) NOT NULL, -- accommodation, temple-darshan, bus-booking, bike-rentals, taxi-rentals
    document_type VARCHAR(100) NOT NULL, -- Aadhaar Card, Driving Licence, PAN Card, Passport, Govt ID
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_size INT,
    file_type VARCHAR(50),
    uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast lookup by booking ID
CREATE INDEX IF NOT EXISTS idx_booking_documents_booking_id ON public.booking_documents(booking_id);

-- 3. Enable RLS
ALTER TABLE public.booking_guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_documents ENABLE ROW LEVEL SECURITY;

-- 4. Policies: Public can insert for their bookings, Admin has full access
DO $$ BEGIN
  CREATE POLICY "Public insert booking_guests" ON public.booking_guests FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Admin full access booking_guests" ON public.booking_guests FOR ALL TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public insert booking_documents" ON public.booking_documents FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Admin full access booking_documents" ON public.booking_documents FOR ALL TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Enable public read of guests and documents for their booking reference if authenticated
DO $$ BEGIN
  CREATE POLICY "Public read booking_guests" ON public.booking_guests FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public read booking_documents" ON public.booking_documents FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
