-- ============================================================
-- ARUNACHALESHWARA TOURS & TRAVELS – RESTAURANT & FOOD ORDERING
-- Menu Categories, Dishes, Online Cart, Orders & Order Items
-- ============================================================

-- 1. Restaurant Settings
CREATE TABLE IF NOT EXISTS public.restaurant_settings (
    id INT PRIMARY KEY DEFAULT 1,
    name VARCHAR(255) NOT NULL DEFAULT 'Arunachaleshwara Annapoorani Pure Veg Restaurant',
    tagline VARCHAR(255) DEFAULT 'Authentic South & North Indian Pure Vegetarian Dining & Room Delivery',
    description TEXT DEFAULT 'Wholesome, hygienic, and divine vegetarian meals, traditional breakfast tiffin, and Kumbakonam degree filter coffee prepared with utmost devotion for temple pilgrims and visiting families.',
    phone VARCHAR(50) DEFAULT '9010515341',
    whatsapp_number VARCHAR(50) DEFAULT '919010515341',
    timings VARCHAR(255) DEFAULT 'Breakfast: 7:00 AM - 10:30 AM | Lunch: 12:00 PM - 3:30 PM | Dinner: 7:00 PM - 10:30 PM',
    is_open BOOLEAN DEFAULT TRUE,
    delivery_enabled BOOLEAN DEFAULT TRUE,
    room_service_enabled BOOLEAN DEFAULT TRUE,
    min_order_amount NUMERIC DEFAULT 100,
    delivery_fee NUMERIC DEFAULT 0,
    banner_image TEXT DEFAULT 'assets/images/services/restaurant.jpg',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default restaurant settings row
INSERT INTO public.restaurant_settings (id, name, tagline, description, phone, whatsapp_number, timings, is_open, delivery_enabled, room_service_enabled, min_order_amount, delivery_fee)
VALUES (1, 'Arunachaleshwara Annapoorani Pure Veg Restaurant', 'Authentic South & North Indian Pure Vegetarian Dining & Room Delivery', 'Wholesome, hygienic, and divine vegetarian meals, traditional breakfast tiffin, and Kumbakonam degree filter coffee prepared with utmost devotion for temple pilgrims and visiting families.', '9010515341', '919010515341', 'Breakfast: 7:00 AM - 10:30 AM | Lunch: 12:00 PM - 3:30 PM | Dinner: 7:00 PM - 10:30 PM', true, true, true, 100, 0)
ON CONFLICT (id) DO NOTHING;

-- 2. Menu Categories
CREATE TABLE IF NOT EXISTS public.menu_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50) DEFAULT 'bi-cup-hot',
    order_num INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Initial Categories
INSERT INTO public.menu_categories (name, slug, description, icon, order_num, is_active)
VALUES
  ('South Indian Breakfast', 'breakfast', 'Steaming hot idlis, crispy dosas, vadas, and pongal served with fresh coconut chutney & sambar', 'bi-sun-fill', 1, true),
  ('Traditional Meals & Thali', 'meals', 'Authentic temple style Bhojanam, South Indian full meals, and curd rice served fresh', 'bi-circle-fill', 2, true),
  ('North Indian Specialties', 'north-indian', 'Rich curries, fresh paneer gravy, butter roti, naan, and flavorful biryani', 'bi-fire', 3, true),
  ('Evening Snacks & Tiffin', 'snacks', 'Hot crispy pakodas, bondas, samosas, and evening tiffin combos', 'bi-cup-straw', 4, true),
  ('Beverages & Kaapi', 'beverages', 'Aromatic Kumbakonam degree filter coffee, ginger tea, and fresh fruit juices', 'bi-cup-hot-fill', 5, true),
  ('Desserts & Prasadam', 'desserts', 'Divine ghee kesari, sakkarai pongal, and authentic sweets', 'bi-stars', 6, true)
ON CONFLICT (slug) DO NOTHING;

-- 3. Menu Items
CREATE TABLE IF NOT EXISTS public.menu_items (
    id SERIAL PRIMARY KEY,
    category_slug VARCHAR(50) NOT NULL REFERENCES public.menu_categories(slug) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    regional_name VARCHAR(255),
    description TEXT,
    price NUMERIC NOT NULL DEFAULT 0,
    image TEXT,
    is_veg BOOLEAN DEFAULT TRUE,
    is_special BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    order_num INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for category lookups
CREATE INDEX IF NOT EXISTS idx_menu_items_cat ON public.menu_items(category_slug, is_available, order_num);

-- 4. Food Orders
CREATE TABLE IF NOT EXISTS public.food_orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL, -- e.g. ARN-FOOD-2026-00001
    customer_name VARCHAR(255) NOT NULL,
    mobile VARCHAR(30) NOT NULL,
    email VARCHAR(100),
    fulfillment_type VARCHAR(50) NOT NULL DEFAULT 'room_delivery', -- room_delivery, dine_in, pickup
    room_number VARCHAR(50),
    delivery_address TEXT,
    special_instructions TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    delivery_fee NUMERIC NOT NULL DEFAULT 0,
    total_amount NUMERIC NOT NULL DEFAULT 0,
    order_status VARCHAR(50) NOT NULL DEFAULT 'New Order', -- New Order, Accepted, Preparing, Ready for Pickup, Out for Delivery, Delivered, Completed, Cancelled
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for order lookups
CREATE INDEX IF NOT EXISTS idx_food_orders_status ON public.food_orders(order_status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_food_orders_mobile ON public.food_orders(mobile);

-- 5. Food Order Items (Normalized relational line items)
CREATE TABLE IF NOT EXISTS public.food_order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    item_id INT,
    item_name VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    total_price NUMERIC NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_food_order_items_order ON public.food_order_items(order_id);

-- Enable RLS
ALTER TABLE public.restaurant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_order_items ENABLE ROW LEVEL SECURITY;

-- Public read policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'restaurant_settings' AND policyname = 'Public read restaurant settings') THEN
        CREATE POLICY "Public read restaurant settings" ON public.restaurant_settings FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'menu_categories' AND policyname = 'Public read menu categories') THEN
        CREATE POLICY "Public read menu categories" ON public.menu_categories FOR SELECT USING (is_active = true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'menu_items' AND policyname = 'Public read menu items') THEN
        CREATE POLICY "Public read menu items" ON public.menu_items FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'food_orders' AND policyname = 'Public create food orders') THEN
        CREATE POLICY "Public create food orders" ON public.food_orders FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'food_order_items' AND policyname = 'Public create food order items') THEN
        CREATE POLICY "Public create food order items" ON public.food_order_items FOR INSERT WITH CHECK (true);
    END IF;
END $$;

-- Admin full access policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'restaurant_settings' AND policyname = 'Admin full restaurant settings') THEN
        CREATE POLICY "Admin full restaurant settings" ON public.restaurant_settings FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'menu_categories' AND policyname = 'Admin full menu categories') THEN
        CREATE POLICY "Admin full menu categories" ON public.menu_categories FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'menu_items' AND policyname = 'Admin full menu items') THEN
        CREATE POLICY "Admin full menu items" ON public.menu_items FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'food_orders' AND policyname = 'Admin full food orders') THEN
        CREATE POLICY "Admin full food orders" ON public.food_orders FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'food_order_items' AND policyname = 'Admin full food order items') THEN
        CREATE POLICY "Admin full food order items" ON public.food_order_items FOR ALL USING (true) WITH CHECK (true);
    END IF;
END $$;
