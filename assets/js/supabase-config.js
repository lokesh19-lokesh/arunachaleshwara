/* ============================================================
   ARUNACHALESHWARA – Supabase Client & Dynamic Data Layer
   Provides real-time dynamic loading and form submissions
   ============================================================ */

const SUPABASE_CONFIG = {
  url: 'https://zifacvpvdrsylgijtfti.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppZmFjdnB2ZHJzeWxnaWp0ZnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ4OTkyMzIsImV4cCI6MjExMDQ3NTIzMn0.4xPpoPrsE0vnL_tvC_xRqJPFf8ulltN4ZbdgU6fncV8'
};

// Initialize Supabase client if SDK is loaded
let supabaseClient = null;
if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    window.supabaseClient = supabaseClient;
  } catch (err) {
    console.warn('Supabase initialization warning:', err);
  }
}

function getPublicCache(key) {
  try {
    const raw = localStorage.getItem('arn_pub_' + key);
    if (!raw) return null;
    const p = JSON.parse(raw);
    return p ? p.data : null;
  } catch (e) {}
  return null;
}
function setPublicCache(key, data) {
  try { localStorage.setItem('arn_pub_' + key, JSON.stringify({ data, _ts: Date.now() })); } catch (e) {}
}

/**
 * Fetch fresh dynamic services from Supabase (always fetches latest & updates localStorage cache)
 * @returns {Promise<Array|null>}
 */
async function fetchServicesFromSupabase() {
  if (!supabaseClient) return getPublicCache('services');
  try {
    const { data, error } = await supabaseClient
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('order_num', { ascending: true });

    if (error) {
      console.warn('Supabase services fetch error:', error.message);
      return getPublicCache('services');
    }

    if (data && data.length > 0) {
      // Map DB snake_case columns to camelCase expected by frontend
      const mapped = data.map(item => {
        const staticMatch = (typeof SERVICES_DATA !== 'undefined' && Array.isArray(SERVICES_DATA))
          ? SERVICES_DATA.find(s => s.id === item.id)
          : null;

        const effectiveImage = item.image || (staticMatch && staticMatch.image) || '';
        return {
          id: item.id,
          title: item.title,
          category: item.category || (staticMatch && staticMatch.category) || 'Services',
          shortDesc: item.short_desc || (staticMatch && staticMatch.shortDesc) || '',
          description: item.overview || item.short_desc || (staticMatch && staticMatch.description) || '',
          features: Array.isArray(item.features) && item.features.length > 0
            ? item.features
            : (staticMatch && staticMatch.features) || [],
          pricing: Array.isArray(item.pricing) && item.pricing.length > 0
            ? item.pricing
            : (item.pricing_json || (staticMatch && staticMatch.pricing) || []),
          routes: Array.isArray(item.routes) && item.routes.length > 0
            ? item.routes
            : (staticMatch && staticMatch.routes) || [],
          inclusions: Array.isArray(item.inclusions) ? item.inclusions : [],
          exclusions: Array.isArray(item.exclusions) ? item.exclusions : [],
          importantInfo: Array.isArray(item.important_info) ? item.important_info : [],
          icon: item.icon || (staticMatch && staticMatch.icon) || 'bi-gear-fill',
          image: effectiveImage,
          imageFit: item.image_fit || (staticMatch && staticMatch.imageFit) || '',
          gallery: Array.isArray(item.gallery) && item.gallery.length > 0
            ? item.gallery
            : (staticMatch && staticMatch.gallery) || [effectiveImage].filter(Boolean)
        };
      });
      setPublicCache('services', mapped);
      return mapped;
    }
    return null;
  } catch (err) {
    console.warn('Error connecting to Supabase services:', err);
    return getPublicCache('services');
  }
}

/**
 * Fetch fresh dynamic tour packages from Supabase (always fetches latest & updates localStorage cache)
 * @returns {Promise<Array|null>}
 */
async function fetchPackagesFromSupabase() {
  if (!supabaseClient) return getPublicCache('packages');
  try {
    const { data, error } = await supabaseClient
      .from('tour_packages')
      .select('*')
      .eq('is_active', true)
      .order('order_num', { ascending: true });

    if (error) {
      console.warn('Supabase packages fetch error:', error.message);
      return getPublicCache('packages');
    }

    if (data && data.length > 0) {
      // Map DB snake_case columns to camelCase expected by frontend
      const mapped = data.map(item => ({
        id: item.id,
        title: item.title,
        teluguTitle: item.telugu_title || '',
        badge: item.badge || '',
        category: item.category || 'Temple Tours',
        duration: item.duration || '1 Day',
        durationDays: item.duration_days || 1,
        departureTime: item.departure_time || '',
        returnTime: item.return_time || '',
        image: item.image || '',
        shortDesc: item.short_desc || '',
        overview: item.overview || item.short_desc || '',
        routeFlow: Array.isArray(item.route_flow) ? item.route_flow : [],
        posterHighlights: Array.isArray(item.poster_highlights) ? item.poster_highlights : [],
        places: Array.isArray(item.places) ? item.places : [],
        itinerary: Array.isArray(item.itinerary) ? item.itinerary : [],
        inclusions: Array.isArray(item.inclusions) ? item.inclusions : [],
        exclusions: Array.isArray(item.exclusions) ? item.exclusions : [],
        importantInfo: Array.isArray(item.important_info) ? item.important_info : [],
        featured: !!item.featured
      }));
      setPublicCache('packages', mapped);
      return mapped;
    }
    return null;
  } catch (err) {
    console.warn('Error connecting to Supabase packages:', err);
    return getPublicCache('packages');
  }
}

/**
 * Submit customer enquiry to Supabase enquiries table
 * @param {Object} enquiry
 * @returns {Promise<{success: boolean, data?: Object, error?: any}>}
 */
async function submitEnquiryToSupabase(enquiry) {
  if (!supabaseClient) {
    console.warn('Supabase client not initialized; skipping DB record');
    return { success: false, error: 'Database client not initialized' };
  }
  try {
    const record = {
      service_type: enquiry.serviceType || enquiry.service || null,
      destination: enquiry.destination || null,
      customer_name: enquiry.customerName || enquiry.name || 'Anonymous Devotee',
      phone: enquiry.phone || '',
      email: enquiry.email || null,
      travel_date: enquiry.travelDate || enquiry.date || null,
      pickup_location: enquiry.pickupLocation || enquiry.pickup || null,
      passengers: parseInt(enquiry.passengers) || 1,
      vehicle_type: enquiry.vehicleType || enquiry.vehicle || null,
      special_requests: enquiry.specialRequests || enquiry.message || null,
      status: 'New'
    };

    const { data, error } = await supabaseClient
      .from('enquiries')
      .insert([record])
      .select();

    if (error) {
      console.error('Supabase enquiry insert error:', error);
      return { success: false, error: error.message };
    }
    return { success: true, data: data && data[0] };
  } catch (err) {
    console.error('Exception submitting enquiry to Supabase:', err);
    return { success: false, error: err.message || err };
  }
}

/**
 * Submit contact message to Supabase contact_messages table
 * @param {Object} contact
 * @returns {Promise<{success: boolean, data?: Object, error?: any}>}
 */
async function submitContactMessageToSupabase(contact) {
  if (!supabaseClient) {
    console.warn('Supabase client not initialized; skipping DB record');
    return { success: false, error: 'Database client not initialized' };
  }
  try {
    const record = {
      name: contact.name || 'Devotee',
      phone: contact.phone || '',
      email: contact.email || null,
      subject: contact.subject || 'Website Contact Form',
      message: contact.message || '',
      status: 'New'
    };

    const { data, error } = await supabaseClient
      .from('contact_messages')
      .insert([record])
      .select();

    if (error) {
      console.error('Supabase contact message insert error:', error);
      return { success: false, error: error.message };
    }
    return { success: true, data: data && data[0] };
  } catch (err) {
    console.error('Exception submitting contact message to Supabase:', err);
    return { success: false, error: err.message || err };
  }
}

/**
 * Fetch dynamic popup banner configuration from Supabase website_settings
 * @returns {Promise<{isActive: boolean, image: string, altText: string, linkUrl: string, aspectRatio: string}|null>}
 */
async function fetchPopupBannerFromSupabase() {
  const cached = getPublicCache('popup_banner');
  if (!supabaseClient) return cached;
  try {
    const { data, error } = await supabaseClient
      .from('website_settings')
      .select('value')
      .eq('key', 'popup_banner')
      .maybeSingle();

    if (error) {
      console.warn('Supabase popup banner fetch error:', error.message);
      return cached;
    }

    if (data && data.value) {
      const val = data.value;
      const banner = {
        isActive: val.is_active !== false,
        image: val.image || 'assets/images/popup.png',
        altText: val.alt_text || 'Welcome to Arunachaleshwara Tours & Travels – Your Spiritual Journey Begins Here.',
        linkUrl: val.link_url || '',
        aspectRatio: val.aspect_ratio || '3:2'
      };
      setPublicCache('popup_banner', banner);
      return banner;
    }
    return cached;
  } catch (err) {
    console.warn('Error fetching popup banner from Supabase:', err);
    return cached;
  }
}

/**
 * Fetch fresh dynamic gallery items from Supabase (with public caching)
 * @returns {Promise<Array|null>}
 */
async function fetchGalleryFromSupabase() {
  const cached = getPublicCache('gallery');
  if (!supabaseClient) return cached;
  try {
    // 1. Try dedicated gallery_items table
    const { data, error } = await supabaseClient
      .from('gallery_items')
      .select('*')
      .eq('is_active', true)
      .order('order_num', { ascending: true });

    if (!error && data && data.length > 0) {
      const mapped = data.map(item => ({
        id: item.id,
        title: item.title,
        category: item.category || 'temples',
        categoryLabel: item.category_label || 'Gallery',
        categories: Array.isArray(item.categories) && item.categories.length > 0
          ? item.categories
          : [item.category || 'temples'],
        description: item.description || '',
        image: item.image || '',
        orderNum: item.order_num || 1
      }));
      setPublicCache('gallery', mapped);
      return mapped;
    }

    // 2. Fallback to website_settings key 'gallery_items'
    const { data: wsData, error: wsError } = await supabaseClient
      .from('website_settings')
      .select('value')
      .eq('key', 'gallery_items')
      .maybeSingle();

    if (!wsError && wsData && Array.isArray(wsData.value) && wsData.value.length > 0) {
      const activeItems = wsData.value.filter(x => x.is_active !== false);
      setPublicCache('gallery', activeItems);
      return activeItems;
    }

    return cached;
  } catch (err) {
    console.warn('Error fetching gallery from Supabase:', err);
    return cached;
  }
}

// Expose globally
if (typeof window !== 'undefined') {
  window.SUPABASE_CONFIG = SUPABASE_CONFIG;
  window.getPublicCache = getPublicCache;
  window.fetchServicesFromSupabase = fetchServicesFromSupabase;
  window.fetchPackagesFromSupabase = fetchPackagesFromSupabase;
  window.fetchPopupBannerFromSupabase = fetchPopupBannerFromSupabase;
  window.fetchGalleryFromSupabase = fetchGalleryFromSupabase;
  window.submitEnquiryToSupabase = submitEnquiryToSupabase;
  window.submitContactMessageToSupabase = submitContactMessageToSupabase;
}

