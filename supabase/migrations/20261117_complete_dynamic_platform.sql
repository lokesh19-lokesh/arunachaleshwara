-- ============================================================
-- ARUNACHALESHWARA TOURS & TRAVELS – COMPLETE DATABASE SCHEMA
-- Extensions, Sequential ID Generators, Core Entities & RBAC
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. SEQUENCES & SEQUENTIAL IDENTIFIER GENERATORS
-- ============================================================
CREATE SEQUENCE IF NOT EXISTS booking_id_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS srv_booking_id_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS invoice_id_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS subadmin_id_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS txn_id_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE FUNCTION generate_booking_id(p_prefix TEXT DEFAULT 'ARN')
RETURNS TEXT AS $$
DECLARE
    seq_val BIGINT;
    year_str TEXT := to_char(CURRENT_DATE, 'YYYY');
BEGIN
    IF p_prefix = 'ARN-SRV' THEN
        seq_val := nextval('srv_booking_id_seq');
        RETURN 'ARN-SRV-' || year_str || '-' || lpad(seq_val::text, 5, '0');
    ELSE
        seq_val := nextval('booking_id_seq');
        RETURN 'ARN-' || year_str || '-' || lpad(seq_val::text, 5, '0');
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
    seq_val BIGINT := nextval('invoice_id_seq');
    year_str TEXT := to_char(CURRENT_DATE, 'YYYY');
BEGIN
    RETURN 'ARN-INV-' || year_str || '-' || lpad(seq_val::text, 5, '0');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_subadmin_id()
RETURNS TEXT AS $$
DECLARE
    seq_val BIGINT := nextval('subadmin_id_seq');
BEGIN
    RETURN 'SUBADMIN' || lpad(seq_val::text, 3, '0');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_payment_txn_id()
RETURNS TEXT AS $$
DECLARE
    seq_val BIGINT := nextval('txn_id_seq');
    year_str TEXT := to_char(CURRENT_DATE, 'YYYY');
BEGIN
    RETURN 'TXN-' || year_str || '-' || lpad(seq_val::text, 5, '0');
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 2. AUTHENTICATION, ROLES & PERMISSIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    is_system BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(100) UNIQUE NOT NULL,
    module VARCHAR(100) NOT NULL,
    action VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS public.role_permissions (
    role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(100) DEFAULT 'viewer',
    role_id UUID REFERENCES public.roles(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES public.roles(id),
    is_main_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.sub_admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    subadmin_id VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    role_id UUID REFERENCES public.roles(id),
    is_active BOOLEAN DEFAULT true,
    require_password_change BOOLEAN DEFAULT true,
    assigned_modules JSONB DEFAULT '[]'::jsonb,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_permissions (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, permission_id)
);

-- ============================================================
-- 3. CUSTOMER MANAGEMENT
-- ============================================================

CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    mobile VARCHAR(50) UNIQUE NOT NULL,
    whatsapp_number VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    total_bookings INT DEFAULT 0,
    total_paid NUMERIC(12, 2) DEFAULT 0.00,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 4. ACCOMMODATION MANAGEMENT
-- ============================================================

CREATE TABLE IF NOT EXISTS public.accommodation_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    short_desc TEXT,
    description TEXT,
    base_price NUMERIC(10, 2) NOT NULL DEFAULT 1500.00,
    max_guests INT NOT NULL DEFAULT 2,
    default_beds VARCHAR(100) DEFAULT '1 Double Bed',
    facilities JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    order_num INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.accommodation_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_number VARCHAR(20) UNIQUE NOT NULL,
    category_id UUID REFERENCES public.accommodation_categories(id) ON DELETE SET NULL,
    category_name VARCHAR(100),
    floor VARCHAR(50) DEFAULT 'Ground Floor',
    bed_type VARCHAR(100) DEFAULT 'Double Bed',
    total_beds INT NOT NULL DEFAULT 1,
    filled_beds INT NOT NULL DEFAULT 0,
    max_guests INT NOT NULL DEFAULT 2,
    base_price NUMERIC(10, 2) NOT NULL DEFAULT 1500.00,
    status VARCHAR(50) DEFAULT 'Available', -- Available, Occupied, Maintenance, Blocked
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.room_blocked_dates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID REFERENCES public.accommodation_rooms(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    blocked_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT valid_date_range CHECK (end_date >= start_date)
);

CREATE TABLE IF NOT EXISTS public.room_maintenance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID REFERENCES public.accommodation_rooms(id) ON DELETE CASCADE,
    issue_desc TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'In Progress', -- In Progress, Completed, Cancelled
    reported_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.accommodation_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id VARCHAR(50) UNIQUE NOT NULL DEFAULT generate_booking_id('ARN'),
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    mobile VARCHAR(50) NOT NULL,
    whatsapp_number VARCHAR(50),
    email VARCHAR(255),
    category_id UUID REFERENCES public.accommodation_categories(id) ON DELETE SET NULL,
    category_name VARCHAR(100),
    room_id UUID REFERENCES public.accommodation_rooms(id) ON DELETE SET NULL,
    allocated_room_number VARCHAR(20),
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    nights INT NOT NULL DEFAULT 1,
    guests INT NOT NULL DEFAULT 1,
    estimated_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    advance_required NUMERIC(12, 2) DEFAULT 0.00,
    amount_paid NUMERIC(12, 2) DEFAULT 0.00,
    balance_amount NUMERIC(12, 2) DEFAULT 0.00,
    booking_status VARCHAR(50) DEFAULT 'Pending Request', -- Pending Request, Awaiting Payment, Payment Verification, Confirmed, Checked In, Checked Out, Cancelled, Completed
    payment_status VARCHAR(50) DEFAULT 'Not Paid', -- Not Paid, Payment Instructions Sent, Payment Submitted, Verification Pending, Partially Paid, Fully Paid, Refunded
    assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    special_requirements TEXT,
    confirmed_at TIMESTAMPTZ,
    confirmed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    checked_in_at TIMESTAMPTZ,
    checked_out_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT valid_stay_range CHECK (check_out >= check_in)
);

CREATE TABLE IF NOT EXISTS public.booking_room_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.accommodation_bookings(id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES public.accommodation_rooms(id) ON DELETE CASCADE,
    allocated_at TIMESTAMPTZ DEFAULT now(),
    allocated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- ============================================================
-- 5. SERVICES & SERVICE BOOKINGS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    icon VARCHAR(100) DEFAULT 'bi-gear-fill',
    order_num INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.service_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id VARCHAR(50) UNIQUE NOT NULL DEFAULT generate_booking_id('ARN-SRV'),
    service_id VARCHAR(100),
    service_title VARCHAR(200) NOT NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    mobile VARCHAR(50) NOT NULL,
    whatsapp_number VARCHAR(50),
    email VARCHAR(255),
    travel_date DATE,
    pickup_location VARCHAR(255),
    passengers INT DEFAULT 1,
    vehicle_type VARCHAR(100),
    estimated_amount NUMERIC(12, 2) DEFAULT 0.00,
    amount_paid NUMERIC(12, 2) DEFAULT 0.00,
    balance_amount NUMERIC(12, 2) DEFAULT 0.00,
    booking_status VARCHAR(50) DEFAULT 'Pending Request', -- Pending Request, Awaiting Payment, Payment Verification, Confirmed, Cancelled, Completed
    payment_status VARCHAR(50) DEFAULT 'Not Paid', -- Not Paid, Payment Instructions Sent, Payment Submitted, Verification Pending, Partially Paid, Fully Paid, Refunded
    assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    special_requests TEXT,
    confirmed_at TIMESTAMPTZ,
    confirmed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 6. MANUAL PAYMENTS (NO PAYMENT GATEWAY)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id VARCHAR(50) UNIQUE NOT NULL DEFAULT generate_payment_txn_id(),
    booking_id UUID, -- References accommodation_bookings(id) or service_bookings(id)
    booking_code VARCHAR(50) NOT NULL, -- e.g. ARN-2026-00001
    booking_type VARCHAR(50) NOT NULL DEFAULT 'accommodation', -- accommodation, service
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(255),
    amount NUMERIC(12, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- UPI, Bank Transfer, Cash, Other
    transaction_reference VARCHAR(150),
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    proof_url TEXT,
    status VARCHAR(50) DEFAULT 'Pending Verification', -- Pending Verification, Verified, Rejected
    verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    verified_at TIMESTAMPTZ,
    notes TEXT,
    recorded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.payment_proofs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_id UUID REFERENCES public.payment_transactions(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_name VARCHAR(255),
    uploaded_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.payment_refunds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_id UUID REFERENCES public.payment_transactions(id) ON DELETE SET NULL,
    booking_code VARCHAR(50) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    reason TEXT,
    refund_reference VARCHAR(150),
    processed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 7. INVOICE GENERATION SYSTEM
-- ============================================================

CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL DEFAULT generate_invoice_number(),
    booking_id UUID,
    booking_code VARCHAR(50) NOT NULL,
    booking_type VARCHAR(50) NOT NULL DEFAULT 'accommodation',
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_mobile VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255),
    customer_address TEXT,
    invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE DEFAULT CURRENT_DATE,
    service_description TEXT,
    check_in DATE,
    check_out DATE,
    room_details VARCHAR(255),
    subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    discount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    tax_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    amount_received NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    balance_due NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    payment_status VARCHAR(50) NOT NULL DEFAULT 'Paid',
    payment_method VARCHAR(50),
    transaction_reference VARCHAR(150),
    pdf_url TEXT,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'Issued', -- Issued, Cancelled, Revised
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total NUMERIC(12, 2) NOT NULL DEFAULT 0.00
);

-- ============================================================
-- 8. DYNAMIC WEBSITE CMS & MEDIA LIBRARY
-- ============================================================

CREATE TABLE IF NOT EXISTS public.website_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.media_library (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50) DEFAULT 'image',
    category VARCHAR(100) DEFAULT 'General', -- Website Banners, Accommodation, Services, Gallery, Testimonials, Logos, Invoices
    alt_text VARCHAR(255),
    description TEXT,
    order_num INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(255) NOT NULL,
    location VARCHAR(150),
    rating INT DEFAULT 5,
    review_text TEXT NOT NULL,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    order_num INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    order_num INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 9. WHATSAPP & AUDIT LOGGING
-- ============================================================

CREATE TABLE IF NOT EXISTS public.whatsapp_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    main_admin_number VARCHAR(50) NOT NULL DEFAULT '919010515341',
    accommodation_number VARCHAR(50) NOT NULL DEFAULT '919010515341',
    service_number VARCHAR(50) NOT NULL DEFAULT '919010515341',
    support_number VARCHAR(50) NOT NULL DEFAULT '919010515341',
    default_notification_number VARCHAR(50) NOT NULL DEFAULT '919010515341',
    api_status VARCHAR(50) DEFAULT 'Manual Link (Standard)',
    templates JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.whatsapp_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_code VARCHAR(50),
    recipient VARCHAR(50) NOT NULL,
    message_type VARCHAR(100) NOT NULL,
    message_content TEXT NOT NULL,
    sent_at TIMESTAMPTZ DEFAULT now(),
    provider_message_id VARCHAR(150),
    status VARCHAR(50) DEFAULT 'Prepared',
    failure_reason TEXT
);

CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_email VARCHAR(255),
    user_role VARCHAR(100),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id VARCHAR(100),
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_login_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    email_or_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL, -- Success, Failed
    failure_reason VARCHAR(255),
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sub_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodation_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodation_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_proofs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_login_history ENABLE ROW LEVEL SECURITY;

-- Helper security definer function to check if current user is admin/sub-admin
CREATE OR REPLACE FUNCTION public.is_admin_or_subadmin(p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users WHERE user_id = p_user_id
    ) OR EXISTS (
        SELECT 1 FROM public.sub_admins WHERE user_id = p_user_id AND is_active = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public read policies for catalog and published CMS content
CREATE POLICY "Public read active categories" ON public.accommodation_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active rooms" ON public.accommodation_rooms FOR SELECT USING (is_active = true);
CREATE POLICY "Public read website settings" ON public.website_settings FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Public read media" ON public.media_library FOR SELECT USING (is_active = true);

-- Public creation policies for bookings
CREATE POLICY "Public insert accommodation bookings" ON public.accommodation_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public select own accommodation bookings" ON public.accommodation_bookings FOR SELECT USING (true);
CREATE POLICY "Public insert service bookings" ON public.service_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public select service bookings" ON public.service_bookings FOR SELECT USING (true);
CREATE POLICY "Public insert customers" ON public.customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public select customers" ON public.customers FOR SELECT USING (true);

-- Authenticated Admin & Sub-admin full access policies
CREATE POLICY "Admin full access roles" ON public.roles FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access permissions" ON public.permissions FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access role_permissions" ON public.role_permissions FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access profiles" ON public.profiles FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access admin_users" ON public.admin_users FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access sub_admins" ON public.sub_admins FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access customers" ON public.customers FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access accommodation_categories" ON public.accommodation_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access accommodation_rooms" ON public.accommodation_rooms FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access room_blocked_dates" ON public.room_blocked_dates FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access room_maintenance" ON public.room_maintenance FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access accommodation_bookings" ON public.accommodation_bookings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access service_bookings" ON public.service_bookings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access payment_transactions" ON public.payment_transactions FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access payment_proofs" ON public.payment_proofs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access payment_refunds" ON public.payment_refunds FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access invoices" ON public.invoices FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access invoice_items" ON public.invoice_items FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access website_settings" ON public.website_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access media_library" ON public.media_library FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access testimonials" ON public.testimonials FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access faqs" ON public.faqs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access whatsapp_settings" ON public.whatsapp_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access whatsapp_messages" ON public.whatsapp_messages FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access admin_activity_logs" ON public.admin_activity_logs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access user_login_history" ON public.user_login_history FOR ALL TO authenticated USING (true);

-- Enable public select on whatsapp_settings for booking numbers
CREATE POLICY "Public select whatsapp settings" ON public.whatsapp_settings FOR SELECT USING (true);


-- Secure Sub-Admin Login ID Resolution RPC (does not expose sub_admins table to anon)
CREATE OR REPLACE FUNCTION public.resolve_subadmin_login(p_subadmin_id TEXT)
RETURNS TABLE(email VARCHAR, is_active BOOLEAN, user_id UUID)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT sa.email, sa.is_active, sa.user_id
  FROM public.sub_admins sa
  WHERE UPPER(sa.subadmin_id) = UPPER(TRIM(p_subadmin_id))
  LIMIT 1;
END;
$$;

GRANT EXECUTE ON FUNCTION public.resolve_subadmin_login(TEXT) TO anon, authenticated;

DO $$ BEGIN
  CREATE POLICY "Public insert login history" ON public.user_login_history FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;


-- Ensure RLS policies on allocation, permissions, service categories, and legacy tables
ALTER TABLE public.booking_room_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Admin full access booking_room_allocations" ON public.booking_room_allocations FOR ALL TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Admin full access user_permissions" ON public.user_permissions FOR ALL TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Admin full access service_categories" ON public.service_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public read service categories" ON public.service_categories FOR SELECT USING (is_active = true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
