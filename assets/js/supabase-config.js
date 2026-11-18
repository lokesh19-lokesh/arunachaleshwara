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

const PUBLIC_CACHE_TTL_MS = 5 * 60 * 1000;
function getPublicCache(key) {
  try {
    const raw = sessionStorage.getItem('arn_pub_' + key);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (p && (Date.now() - (p._ts || 0)) < PUBLIC_CACHE_TTL_MS) return p.data;
  } catch (e) {}
  return null;
}
function setPublicCache(key, data) {
  try { sessionStorage.setItem('arn_pub_' + key, JSON.stringify({ data, _ts: Date.now() })); } catch (e) {}
}

/**
 * Fetch dynamic services from Supabase (with 5-min sessionStorage cache)
 * @returns {Promise<Array|null>}
 */
async function fetchServicesFromSupabase() {
  const cached = getPublicCache('services');
  if (cached) return cached;
  if (!supabaseClient) return null;
  try {
    const { data, error } = await supabaseClient
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('order_num', { ascending: true });

    if (error) {
      console.warn('Supabase services fetch error:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      // Map DB snake_case columns to camelCase expected by frontend
      const mapped = data.map(item => ({
        id: item.id,
        title: item.title,
        category: item.category || 'Services',
        shortDesc: item.short_desc || '',
        description: item.overview || item.short_desc || '',
        features: Array.isArray(item.features) ? item.features : [],
        inclusions: Array.isArray(item.inclusions) ? item.inclusions : [],
        exclusions: Array.isArray(item.exclusions) ? item.exclusions : [],
        importantInfo: Array.isArray(item.important_info) ? item.important_info : [],
        icon: item.icon || 'bi-gear-fill',
        image: item.image || '',
        gallery: [item.image].filter(Boolean)
      }));
      setPublicCache('services', mapped);
      return mapped;
    }
    return null;
  } catch (err) {
    console.warn('Error connecting to Supabase services:', err);
    return null;
  }
}

/**
 * Fetch dynamic tour packages from Supabase (with 5-min sessionStorage cache)
 * @returns {Promise<Array|null>}
 */
async function fetchPackagesFromSupabase() {
  const cached = getPublicCache('packages');
  if (cached) return cached;
  if (!supabaseClient) return null;
  try {
    const { data, error } = await supabaseClient
      .from('tour_packages')
      .select('*')
      .eq('is_active', true)
      .order('order_num', { ascending: true });

    if (error) {
      console.warn('Supabase packages fetch error:', error.message);
      return null;
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
    return null;
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

// Expose globally
if (typeof window !== 'undefined') {
  window.SUPABASE_CONFIG = SUPABASE_CONFIG;
  window.fetchServicesFromSupabase = fetchServicesFromSupabase;
  window.fetchPackagesFromSupabase = fetchPackagesFromSupabase;
  window.submitEnquiryToSupabase = submitEnquiryToSupabase;
  window.submitContactMessageToSupabase = submitContactMessageToSupabase;
}

