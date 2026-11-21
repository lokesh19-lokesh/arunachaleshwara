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

const RESTAURANT_CORE_SERVICE = {
  id: 'restaurant',
  title: 'Restaurant',
  category: 'Dining & Food',
  icon: 'bi-cup-hot-fill',
  shortDesc: 'Pure vegetarian South Indian meals, tiffin, degree filter kaapi, and direct room delivery.',
  description: 'Relish authentic South Indian pure vegetarian cuisine, traditional breakfast tiffin, unlimited banana leaf meals, filter coffee, and sattvic temple food prepared with sacred tradition. Enjoy cozy dining or order directly to your hotel room with swift delivery in Tiruvannamalai.',
  features: [
    '100% Pure Vegetarian & Sattvic Food',
    'Authentic South Indian & North Indian Delicacies',
    'Direct Hotel Room Service & Delivery',
    'Hygienic Traditional Kitchen & Fresh Ingredients',
    'Special Temple Prasadam & Fasting Meals',
    'Online Menu Browsing & 1-Click Ordering'
  ],
  pricing: [
    { name: 'Arunachala Special Meals (Thali)', rate: '₹140', desc: 'Unlimited rice, sambar, rasam, kootu, poriyal, appalam & payasam' },
    { name: 'Ghee Roast Masala Dosa', rate: '₹85', desc: 'Crispy golden dosa roasted in pure cow ghee with coconut & tomato chutneys' },
    { name: 'South Indian Filter Kaapi', rate: '₹30', desc: 'Freshly brewed aromatic degree filter coffee in traditional brass dabarah' }
  ],
  image: 'assets/images/services/restaurant.jpg',
  gallery: [
    'assets/images/services/restaurant.jpg',
    'assets/images/gallery/Accommodation2.jpg'
  ]
};

function getPublicCache(key) {
  try {
    const raw = localStorage.getItem('arn_pub_' + key);
    if (!raw) return null;
    const p = JSON.parse(raw);
    let data = p ? p.data : null;
    if (key === 'services' && Array.isArray(data)) {
      if (!data.some(s => s && s.id === 'restaurant')) {
        const accIdx = data.findIndex(s => s && s.id === 'accommodation');
        if (accIdx !== -1) data.splice(accIdx + 1, 0, RESTAURANT_CORE_SERVICE);
        else data.unshift(RESTAURANT_CORE_SERVICE);
      }
    }
    return data;
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

      // Ensure Restaurant service is ALWAYS positioned beside Accommodation
      if (!mapped.some(s => s.id === 'restaurant')) {
        const accIdx = mapped.findIndex(s => s.id === 'accommodation');
        if (accIdx !== -1) {
          mapped.splice(accIdx + 1, 0, RESTAURANT_CORE_SERVICE);
        } else {
          mapped.unshift(RESTAURANT_CORE_SERVICE);
        }
      }

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

/**
 * Fetch dynamic restaurant settings from Supabase / localStorage / defaults
 */
async function fetchRestaurantSettingsFromSupabase() {
  const defaultSettings = {
    restaurant_name: 'Arunachaleshwara Pure Veg Restaurant',
    tagline: '100% Traditional South Indian Pure Vegetarian Dining & Room Delivery',
    description: 'Serving hot tiffin, unlimited banana leaf meals, Kumbakonam degree filter kaapi, and sattvic temple dishes in Tiruvannamalai.',
    timings: 'Daily 06:30 AM – 10:30 PM',
    is_open: true,
    min_order_amount: 100,
    delivery_fee: 30,
    contact_phone: '9010515341',
    contact_whatsapp: '919010515341',
    hero_image: 'assets/images/services/restaurant.jpg'
  };

  try {
    const rawLocal = localStorage.getItem('arn_restaurant_settings');
    const localSettings = rawLocal ? JSON.parse(rawLocal) : defaultSettings;

    if (!supabaseClient) return localSettings;

    const { data, error } = await supabaseClient
      .from('restaurant_settings')
      .select('*')
      .order('id', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      const merged = { ...defaultSettings, ...data };
      localStorage.setItem('arn_restaurant_settings', JSON.stringify(merged));
      return merged;
    }
    return localSettings;
  } catch (err) {
    console.warn('Error fetching restaurant settings:', err);
    return defaultSettings;
  }
}

/**
 * Save restaurant settings (Admin)
 */
async function saveRestaurantSettingsToSupabase(settings) {
  try {
    localStorage.setItem('arn_restaurant_settings', JSON.stringify(settings));
    if (supabaseClient) {
      const { error } = await supabaseClient
        .from('restaurant_settings')
        .upsert([{ id: 1, ...settings, updated_at: new Date().toISOString() }]);
      if (error) console.warn('Supabase restaurant_settings upsert note:', error.message);
    }
    if (window.ArnRealtimeSync) {
      window.ArnRealtimeSync.publish('restaurant_settings', 'settings_saved', settings);
    }
    return { success: true };
  } catch (err) {
    console.error('saveRestaurantSettings error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch dynamic menu categories and menu items
 */
async function fetchRestaurantMenuFromSupabase() {
  const cached = getPublicCache('restaurant_menu');
  let fallbackCats = typeof DEFAULT_RESTAURANT_CATEGORIES !== 'undefined' ? DEFAULT_RESTAURANT_CATEGORIES : [];
  let fallbackItems = typeof DEFAULT_MENU_ITEMS !== 'undefined' ? DEFAULT_MENU_ITEMS : [];

  // Check localStorage overrides
  try {
    const localCats = localStorage.getItem('arn_restaurant_categories');
    if (localCats) fallbackCats = JSON.parse(localCats);
    const localItems = localStorage.getItem('arn_restaurant_items');
    if (localItems) fallbackItems = JSON.parse(localItems);
  } catch (e) {}

  if (!supabaseClient) {
    return cached || { categories: fallbackCats, items: fallbackItems };
  }

  try {
    const [catRes, itemRes] = await Promise.all([
      supabaseClient.from('menu_categories').select('*').order('order_num', { ascending: true }),
      supabaseClient.from('menu_items').select('*').order('order_num', { ascending: true })
    ]);

    let categories = fallbackCats;
    let items = fallbackItems;

    if (!catRes.error && catRes.data && catRes.data.length > 0) {
      categories = catRes.data;
      localStorage.setItem('arn_restaurant_categories', JSON.stringify(categories));
    }
    if (!itemRes.error && itemRes.data && itemRes.data.length > 0) {
      items = itemRes.data;
      localStorage.setItem('arn_restaurant_items', JSON.stringify(items));
    }

    const payload = { categories, items };
    setPublicCache('restaurant_menu', payload);
    return payload;
  } catch (err) {
    console.warn('Supabase restaurant menu fetch error:', err);
    return cached || { categories: fallbackCats, items: fallbackItems };
  }
}

/**
 * Save / Update a Menu Item (Admin)
 */
async function saveMenuItemToSupabase(item) {
  try {
    let items = [];
    const raw = localStorage.getItem('arn_restaurant_items');
    if (raw) items = JSON.parse(raw);
    else if (typeof DEFAULT_MENU_ITEMS !== 'undefined') items = [...DEFAULT_MENU_ITEMS];

    const existingIdx = items.findIndex(x => String(x.id) === String(item.id));
    if (existingIdx !== -1) {
      items[existingIdx] = { ...items[existingIdx], ...item };
    } else {
      if (!item.id) item.id = 'dish_' + Date.now();
      items.push(item);
    }
    localStorage.setItem('arn_restaurant_items', JSON.stringify(items));

    if (supabaseClient) {
      const { error } = await supabaseClient.from('menu_items').upsert([item]);
      if (error) console.warn('Supabase menu item upsert note:', error.message);
    }
    if (window.ArnRealtimeSync) {
      window.ArnRealtimeSync.publish('menu', 'item_saved', item);
    }
    return { success: true, item };
  } catch (err) {
    console.error('saveMenuItemToSupabase error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Delete a Menu Item (Admin)
 */
async function deleteMenuItemFromSupabase(itemId) {
  try {
    let items = [];
    const raw = localStorage.getItem('arn_restaurant_items');
    if (raw) items = JSON.parse(raw);
    else if (typeof DEFAULT_MENU_ITEMS !== 'undefined') items = [...DEFAULT_MENU_ITEMS];

    items = items.filter(x => String(x.id) !== String(itemId));
    localStorage.setItem('arn_restaurant_items', JSON.stringify(items));

    if (supabaseClient) {
      await supabaseClient.from('menu_items').delete().eq('id', itemId);
    }
    if (window.ArnRealtimeSync) {
      window.ArnRealtimeSync.publish('menu', 'item_deleted', { id: itemId });
    }
    return { success: true };
  } catch (err) {
    console.error('deleteMenuItemFromSupabase error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Save / Update a Category (Admin)
 */
async function saveMenuCategoryToSupabase(category) {
  try {
    let categories = [];
    const raw = localStorage.getItem('arn_restaurant_categories');
    if (raw) categories = JSON.parse(raw);
    else if (typeof DEFAULT_RESTAURANT_CATEGORIES !== 'undefined') categories = [...DEFAULT_RESTAURANT_CATEGORIES];

    const existingIdx = categories.findIndex(x => String(x.slug || x.id) === String(category.slug || category.id));
    if (existingIdx !== -1) {
      categories[existingIdx] = { ...categories[existingIdx], ...category };
    } else {
      if (!category.id) category.id = 'cat_' + Date.now();
      categories.push(category);
    }
    localStorage.setItem('arn_restaurant_categories', JSON.stringify(categories));

    if (supabaseClient) {
      await supabaseClient.from('menu_categories').upsert([category]);
    }
    if (window.ArnRealtimeSync) {
      window.ArnRealtimeSync.publish('menu', 'category_saved', category);
    }
    return { success: true, category };
  } catch (err) {
    console.error('saveMenuCategoryToSupabase error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Delete a Category (Admin)
 */
async function deleteMenuCategoryToSupabase(catSlugOrId) {
  try {
    let categories = [];
    const raw = localStorage.getItem('arn_restaurant_categories');
    if (raw) categories = JSON.parse(raw);
    else if (typeof DEFAULT_RESTAURANT_CATEGORIES !== 'undefined') categories = [...DEFAULT_RESTAURANT_CATEGORIES];

    categories = categories.filter(x => x.slug !== catSlugOrId && String(x.id) !== String(catSlugOrId));
    localStorage.setItem('arn_restaurant_categories', JSON.stringify(categories));

    if (supabaseClient) {
      await supabaseClient.from('menu_categories').delete().or(`slug.eq.${catSlugOrId},id.eq.${catSlugOrId}`);
    }
    if (window.ArnRealtimeSync) {
      window.ArnRealtimeSync.publish('menu', 'category_deleted', { slug: catSlugOrId });
    }
    return { success: true };
  } catch (err) {
    console.error('deleteMenuCategoryToSupabase error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Submit Food Order (Customer)
 */
async function submitFoodOrderToSupabase(orderData) {
  try {
    const orderId = `ARN-FOOD-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`;
    const nowIso = new Date().toISOString();

    const orderRecord = {
      order_id: orderId,
      customer_name: orderData.customerName || 'Devotee Guest',
      mobile: orderData.mobile || '',
      email: orderData.email || '',
      fulfillment_type: orderData.fulfillmentType || 'Room Delivery',
      room_number: orderData.roomNumber || '',
      delivery_address: orderData.deliveryAddress || (orderData.roomNumber ? `Room #${orderData.roomNumber}` : 'Restaurant Pickup / Dine-in'),
      special_instructions: orderData.specialInstructions || '',
      subtotal: parseFloat(orderData.subtotal) || 0,
      delivery_fee: parseFloat(orderData.deliveryFee) || 0,
      total_amount: parseFloat(orderData.totalAmount) || 0,
      status: 'New Order',
      payment_status: 'Pending at Delivery / Counter',
      items: orderData.items || [],
      created_at: nowIso
    };

    // Save to localStorage for instant admin & customer receipt
    try {
      const raw = localStorage.getItem('arn_food_orders');
      const orders = raw ? JSON.parse(raw) : [];
      orders.unshift(orderRecord);
      localStorage.setItem('arn_food_orders', JSON.stringify(orders));
    } catch (e) {}

    // Save to Supabase
    if (supabaseClient) {
      try {
        const { data: insertedOrder } = await supabaseClient
          .from('food_orders')
          .insert([{
            order_id: orderRecord.order_id,
            customer_name: orderRecord.customer_name,
            mobile: orderRecord.mobile,
            email: orderRecord.email,
            fulfillment_type: orderRecord.fulfillment_type,
            room_number: orderRecord.room_number,
            delivery_address: orderRecord.delivery_address,
            special_instructions: orderRecord.special_instructions,
            subtotal: orderRecord.subtotal,
            delivery_fee: orderRecord.delivery_fee,
            total_amount: orderRecord.total_amount,
            status: orderRecord.status,
            payment_status: orderRecord.payment_status
          }])
          .select()
          .maybeSingle();

        if (insertedOrder && Array.isArray(orderData.items) && orderData.items.length > 0) {
          const itemRows = orderData.items.map(it => ({
            order_id: insertedOrder.id || orderId,
            item_name: it.name,
            price: it.price,
            quantity: it.quantity,
            total_price: it.price * it.quantity
          }));
          await supabaseClient.from('food_order_items').insert(itemRows);
        }
      } catch (sbErr) {
        console.warn('Supabase food_orders insert fallback to localStorage:', sbErr);
      }
    }

    if (window.ArnRealtimeSync) {
      window.ArnRealtimeSync.publish('restaurant_orders', 'new_order', orderRecord);
    }

    return { success: true, orderId, order: orderRecord };
  } catch (err) {
    console.error('Exception in submitFoodOrderToSupabase:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch all food orders (Admin)
 */
async function fetchFoodOrdersFromSupabase() {
  let localOrders = [];
  try {
    const raw = localStorage.getItem('arn_food_orders');
    if (raw) localOrders = JSON.parse(raw);
  } catch (e) {}

  if (!supabaseClient) return localOrders;

  try {
    const { data, error } = await supabaseClient
      .from('food_orders')
      .select('*, food_order_items(*)')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const dbMapped = data.map(o => ({
        ...o,
        items: o.items || (o.food_order_items || []).map(fi => ({
          name: fi.item_name,
          price: fi.price,
          quantity: fi.quantity
        }))
      }));
      const combined = [...dbMapped];
      localOrders.forEach(lo => {
        if (!combined.some(c => c.order_id === lo.order_id)) {
          combined.push(lo);
        }
      });
      return combined;
    }
    return localOrders;
  } catch (err) {
    console.warn('fetchFoodOrdersFromSupabase error:', err);
    return localOrders;
  }
}

/**
 * Update food order status (Admin)
 */
async function updateFoodOrderStatusInSupabase(orderId, newStatus) {
  try {
    let orders = [];
    const raw = localStorage.getItem('arn_food_orders');
    if (raw) orders = JSON.parse(raw);
    const target = orders.find(o => o.order_id === orderId || String(o.id) === String(orderId));
    if (target) {
      target.status = newStatus;
      target.updated_at = new Date().toISOString();
      localStorage.setItem('arn_food_orders', JSON.stringify(orders));
    }

    if (supabaseClient) {
      await supabaseClient
        .from('food_orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .or(`order_id.eq.${orderId},id.eq.${orderId}`);
    }

    if (window.ArnRealtimeSync) {
      window.ArnRealtimeSync.publish('restaurant_orders', 'status_updated', { orderId, newStatus });
    }

    return { success: true };
  } catch (err) {
    console.error('updateFoodOrderStatusInSupabase error:', err);
    return { success: false, error: err.message };
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

  // Restaurant & Food Ordering functions
  window.fetchRestaurantSettingsFromSupabase = fetchRestaurantSettingsFromSupabase;
  window.saveRestaurantSettingsToSupabase = saveRestaurantSettingsToSupabase;
  window.fetchRestaurantMenuFromSupabase = fetchRestaurantMenuFromSupabase;
  window.saveMenuItemToSupabase = saveMenuItemToSupabase;
  window.deleteMenuItemFromSupabase = deleteMenuItemFromSupabase;
  window.saveMenuCategoryToSupabase = saveMenuCategoryToSupabase;
  window.deleteMenuCategoryToSupabase = deleteMenuCategoryToSupabase;
  window.submitFoodOrderToSupabase = submitFoodOrderToSupabase;
  window.fetchFoodOrdersFromSupabase = fetchFoodOrdersFromSupabase;
  window.updateFoodOrderStatusInSupabase = updateFoodOrderStatusInSupabase;

  // Auto-load Real-Time Sync on public pages
  (function initPublicRealtime() {
    if (typeof window.ArnRealtimeSync === 'undefined') {
      const s = document.createElement('script');
      s.src = 'assets/js/realtime-sync.js';
      s.defer = true;
      document.head.appendChild(s);
    }
  })();
}

