-- ============================================================
-- ARUNACHALESHWARA TOURS & TRAVELS – DYNAMIC GALLERY SCHEMA
-- Dynamic Photo & Media Gallery with Category Filtering & Admin Control
-- ============================================================

CREATE TABLE IF NOT EXISTS public.gallery_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- temples, travel, accommodation, vehicles, pilgrimage
    category_label VARCHAR(100),
    categories JSONB DEFAULT '[]'::jsonb, -- ['temples', 'pilgrimage']
    description TEXT,
    image TEXT NOT NULL,
    order_num INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for ordering and category filtering
CREATE INDEX IF NOT EXISTS idx_gallery_items_cat ON public.gallery_items(category, is_active, order_num);

-- Enable RLS
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Public read policy (anyone can view active photos on gallery.html & index.html)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'gallery_items' AND policyname = 'Public read active gallery'
    ) THEN
        CREATE POLICY "Public read active gallery" ON public.gallery_items
            FOR SELECT USING (is_active = true);
    END IF;
END $$;

-- Admin full access policy
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'gallery_items' AND policyname = 'Admin full control gallery'
    ) THEN
        CREATE POLICY "Admin full control gallery" ON public.gallery_items
            FOR ALL USING (true) WITH CHECK (true);
    END IF;
END $$;

-- Initial Seed of the Authentic Photo Gallery
INSERT INTO public.gallery_items (title, category, category_label, categories, description, image, order_num, is_active)
VALUES
  ('Arulmigu Arunachaleswarar & Unnamalaiamman', 'temples', 'Temple & Darshan', '["temples", "pilgrimage"]'::jsonb, 'Divine deity darshan of Lord Shiva & Goddess Parvati with the eternal Arunachala Jyoti.', 'assets/images/gallery/g1.jpg', 1, true),
  ('Sacred Shiva Lingam with Deepams', 'temples', 'Temple Darshan', '["temples", "pilgrimage"]'::jsonb, 'Divinely adorned Lingam surrounded by traditional brass lamps, vibhuti, and garlands.', 'assets/images/gallery/g2.jpg', 2, true),
  ('Thiru Annamalaiyar Sannadhi', 'temples', 'Sanctum Sanctorum', '["temples"]'::jsonb, 'Sacred sanctum entrance of Lord Arunachaleswarar dating back over a thousand years.', 'assets/images/gallery/g3.jpg', 3, true),
  ('Historic Panorama of Arunachaleswarar Temple', 'temples', 'Historic Heritage', '["temples", "travel"]'::jsonb, 'Majestic bird’s-eye perspective of the 8 Gopurams nestled beneath sacred Mount Arunachala.', 'assets/images/gallery/g5.jpg', 4, true),
  ('Ancient Shiva-Parvati Granite Relief', 'temples', 'Temple Architecture', '["temples"]'::jsonb, 'Masterfully sculpted Chola-period stone relief within the temple inner prakaram.', 'assets/images/gallery/g7.jpg', 5, true),
  ('Brahma Theertham & Rajagopuram Reflection', 'temples', 'Sacred Theertham', '["temples", "travel"]'::jsonb, 'The sacred temple tank mirroring the towering 217-foot Eastern Rajagopuram.', 'assets/images/gallery/g8.jpg', 6, true),
  ('Misty Golden Dawn over Rajagopuram', 'temples', 'Dawn Darshan', '["temples", "travel"]'::jsonb, 'Breathtaking sunrise casting a golden spiritual aura over the temple towers.', 'assets/images/gallery/g11.jpg', 7, true),
  ('Lord Murugan Sanctum with Floral Alankaram', 'temples', 'Murugan Sannadhi', '["temples"]'::jsonb, 'Sacred shrine of Lord Shanmuga adorned with fresh auspicious flower garlands and deepams.', 'assets/images/gallery/g12.jpg', 8, true),
  ('Arunachaleshwara Temple & Sacred Hill', 'temples', 'Temple & Hill', '["temples", "travel"]'::jsonb, 'The holy hill of Arunachala and the magnificent temple complex.', 'assets/images/popup.png', 9, true),
  ('Girivalam 14 KM Route & Ashta Lingam Guide', 'travel', 'Travel Guide', '["travel", "pilgrimage"]'::jsonb, 'Official route map displaying the 8 Lingams, ashrams, and distance markers along the path.', 'assets/images/gallery/travel1.jpg', 10, true),
  ('Namma Tiruvannamalai Welcome Monument', 'travel', 'City Landmark', '["travel"]'::jsonb, 'Iconic civic landmark welcoming thousands of pilgrims entering the holy city.', 'assets/images/gallery/g10.jpg', 11, true),
  ('Premium Pilgrim Guest Villa', 'accommodation', 'Accommodation', '["accommodation"]'::jsonb, 'Modern, peaceful 2-story residence offering sanitized, comfortable family rooms in Tiruvannamalai.', 'assets/images/gallery/Accommodation1.jpeg', 12, true),
  ('Peaceful Heritage Ashram Cottage Stay', 'accommodation', 'Resort Stay', '["accommodation", "travel"]'::jsonb, 'Serene courtyard cottages surrounded by lush greenery, walking distance from Ramanasramam.', 'assets/images/gallery/Accommodation2.jpg', 13, true),
  ('Luxury AC Bus for Group Pilgrimages', 'vehicles', 'Group Fleet', '["vehicles", "travel"]'::jsonb, 'Spacious, push-back AC tourist coach for family get-togethers and pilgrim groups.', 'assets/images/gallery/Vehicles1.jpg', 14, true),
  ('Dedicated Auto Fleet for Local Darshan', 'vehicles', 'Local Darshan', '["vehicles"]'::jsonb, 'Reliable, courteous auto rickshaws for door-to-door temple visits and elder passenger support.', 'assets/images/gallery/Vehicles2.jpg', 15, true),
  ('Open Mahindra Commander for Scenic Routes', 'vehicles', 'Tour Vehicle', '["vehicles", "travel"]'::jsonb, 'Rugged classic vehicle ideal for scenic spiritual trails and mountain drives.', 'assets/images/gallery/Vehicles3.jpg', 16, true),
  ('Two-Wheeler Rental for Girivalam Explorers', 'vehicles', 'Self-Ride Rental', '["vehicles"]'::jsonb, 'Well-maintained, economical scooters for solo devotees and serene mountain exploration.', 'assets/images/services/bike-rentals.jpg', 17, true),
  ('Karthigai Deepam Illuminations', 'pilgrimage', 'Festival Darshan', '["pilgrimage", "travel"]'::jsonb, 'Sacred Arunachala Hill and temple gopurams illuminated with festival lighting at dusk.', 'assets/images/gallery/g4.jpg', 18, true),
  ('Girivalam Sacred Parikrama & Ashta Lingam', 'pilgrimage', 'Sacred Parikrama', '["pilgrimage", "travel"]'::jsonb, 'Sacred aerial map highlighting the 8 cardinal Shiva Lingams encircling Mount Arunachala.', 'assets/images/gallery/g6.jpg', 19, true),
  ('Karthigai Maha Deepam Holy Gathering', 'pilgrimage', 'Maha Deepam Festival', '["pilgrimage"]'::jsonb, 'Lakhs of devotees chanting "Annamalaikku Harohara" as the holy flame is lit on the hill peak.', 'assets/images/gallery/g9.jpg', 20, true),
  ('Silent Meditation at Sri Ramanasramam', 'pilgrimage', 'Ashram Experience', '["pilgrimage"]'::jsonb, 'Pilgrims immersed in serene self-enquiry meditation around an intricate kolam in the Old Hall.', 'assets/images/gallery/Pilgrimage Experiences1.jpg', 21, true),
  ('Bhagavan Ramana Maharshi Samadhi Shrine', 'pilgrimage', 'Holy Shrine', '["pilgrimage"]'::jsonb, 'The sanctified black granite samadhi shrine radiating tranquil grace and spiritual solace.', 'assets/images/gallery/Pilgrimage Experiences2.jpg', 22, true)
ON CONFLICT DO NOTHING;
