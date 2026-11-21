/* ============================================================
   ARUNACHALESHWARA – Services Data & Rendering
   ============================================================ */

let SERVICES_DATA = [
  {
    id: 'accommodation',
    title: 'Accommodation',
    icon: 'bi-house-door-fill',
    shortDesc: 'Comfortable rooms and hotel bookings for pilgrims and families visiting Tiruvannamalai.',
    description: 'We provide comfortable and clean accommodation options for pilgrims and families visiting Tiruvannamalai. From budget-friendly rooms to premium hotel bookings, we ensure your stay is peaceful and convenient, located close to the Arunachaleswarar Temple.',
    features: [
      'Comfortable Rooms & Hotel Bookings',
      'Family Rooms & Group Accommodation',
      'Rooms Near Arunachaleswarar Temple',
      'Clean & Hygienic Facilities',
      'Affordable Daily & Weekly Rates',
      'Check-in/Check-out Assistance'
    ],
    image: 'assets/images/services/Accommodation.png',
    gallery: [
      'assets/images/services/Accommodation.png',
      'assets/images/gallery/Accommodation1.jpeg',
      'assets/images/gallery/Accommodation2.jpg'
    ]
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
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
  },
  {
    id: 'temple-darshan',
    title: 'Temple Darshan Services',
    icon: 'bi-building',
    shortDesc: 'Abhishekam, Archana, and Quick Darshan assistance at Arunachaleswarar Temple & Girivalam.',
    description: 'Experience a blessed and peaceful darshan at the sacred Arunachaleswarar Temple with our dedicated seva assistance. We facilitate Abhishekam, Archana rituals, Quick Darshan access, Girivalam (circumambulation of Arunachala Hill), and nearby holy temple visits.',
    features: [
      'Abhishekam Seva (Holy Bathing & Priest Assistance)',
      'Archana Seva (108 & 1008 Divine Names Chanting)',
      'Quick Darshan Assistance for Devotees & Families',
      'Girivalam (14 km Sacred Path) Guidance & Transport',
      'Special Entry & Festival Day Support',
      'Local Spiritual Guide & Ritual Assistance'
    ],
    pricing: [
      { name: 'Abhishekam Seva', rate: '₹1,500', desc: 'Special morning holy bathing ritual with priest' },
      { name: 'Archana Seva', rate: '₹250', desc: 'Archana ritual with holy prasad blessing' },
      { name: 'Quick Darshan Assistance', rate: '₹500', desc: 'Priority entrance assistance for devotees & seniors' }
    ],
    image: 'assets/images/services/temple-darshan.png',
    gallery: [
      'assets/images/services/temple-darshan.png',
      'assets/images/gallery/g1.jpg',
      'assets/images/gallery/g8.jpg',
      'assets/images/gallery/g11.jpg'
    ]
  },
  {
    id: 'bus-ticket-booking',
    title: 'Bus Ticket Booking',
    icon: 'bi-bus-front-fill',
    shortDesc: 'Direct AC Sleeper & Seater bus tickets: Hyderabad ↔ Arunachalam & Vijayawada ↔ Arunachalam.',
    description: 'Direct and comfortable bus ticket reservations between Hyderabad / Vijayawada and Arunachalam (Tiruvannamalai). We offer multiple daily departures throughout the day and evening in AC Sleeper and Non-AC coaches with confirmed seat allocation.',
    features: [
      'Hyderabad ↔ Arunachalam (10 Daily Departures)',
      'Vijayawada ↔ Arunachalam (6 Daily Departures)',
      'AC Sleeper, Non-AC Sleeper & Seater Buses',
      'Convenient Pickup & Boarding Points',
      'Instant Ticket Confirmation & Seat Selection',
      '24/7 Journey & WhatsApp Helpline Support'
    ],
    routes: [
      {
        route: 'Hyderabad ↔ Arunachalam (Round Trip)',
        timings: ['03:20 PM', '04:00 PM', '05:10 PM', '05:30 PM', '06:00 PM', '06:40 PM', '07:00 PM', '08:20 PM', '09:10 PM', '10:00 PM']
      },
      {
        route: 'Vijayawada ↔ Arunachalam (Round Trip)',
        timings: ['06:30 PM', '07:00 PM', '07:30 PM', '08:40 PM', '10:00 PM', '11:00 PM']
      }
    ],
    image: 'assets/images/services/bus-booking.png',
    gallery: [
      'assets/images/services/bus-booking.png',
      'assets/images/gallery/Vehicles1.jpg'
    ]
  },
  {
    id: 'train-ticket-booking',
    title: 'Train Ticket Booking',
    icon: 'bi-train-front-fill',
    shortDesc: 'Train ticket reservations and travel assistance for your pilgrimage journey.',
    description: 'We assist with train ticket reservations to help you plan your journey to Tiruvannamalai conveniently. Our team helps with booking, scheduling, and travel planning so you can focus on your spiritual experience.',
    features: [
      'Train Ticket Reservations',
      'Travel Assistance & Planning',
      'Route & Schedule Information',
      'Advance Booking Support',
      'Tatkal & General Bookings',
      'Return Journey Reservations'
    ],
    image: 'assets/images/services/Train Ticket Booking.png',
    imageFit: 'contain',
    gallery: [
      'assets/images/services/Train Ticket Booking.png',
      'assets/images/gallery/g10.jpg'
    ]
  },
  {
    id: 'taxi-car-rentals',
    title: 'Taxi & Car Rentals',
    icon: 'bi-car-front-fill',
    shortDesc: 'Local and outstation taxi services with Ertiga, Innova, and other comfortable vehicles.',
    description: 'Travel comfortably with our taxi and car rental services. We offer a range of well-maintained vehicles including Ertiga, Innova, and other models for local sightseeing, temple visits, and outstation trips from Tiruvannamalai.',
    features: [
      'Local Trips & Outstation Trips',
      'Ertiga, Innova & Other Vehicles',
      'Airport & Railway Station Transfers',
      'Well-Maintained & Clean Vehicles',
      'Experienced & Safe Drivers',
      'Flexible Rental Options'
    ],
    pricing: [
      { name: 'Maruti Suzuki Ertiga (6+1 Seater AC)', rate: '₹2,800', desc: 'Local 8h/80km • Outstation: ₹15/km • Clean AC MPV for family' },
      { name: 'Toyota Innova Crysta (7+1 Seater AC)', rate: '₹3,600', desc: 'Local 8h/80km • Outstation: ₹18/km • Premium luxury pilgrimage ride' },
      { name: 'Swift Dzire / Sedan (4+1 Seater AC)', rate: '₹2,200', desc: 'Local 8h/80km • Outstation: ₹12/km • Quick temple trips & couples' },
      { name: 'Tempo Traveller (12/14 Seater AC)', rate: '₹4,800', desc: 'Local 8h/80km • Outstation: ₹24/km • Group pilgrimage & joint families' },
      { name: 'Chennai Airport (MAA) Transfer', rate: '₹4,800', desc: 'Door-to-door transfer in Innova (Sedan available at ₹3,800)' },
      { name: 'Bengaluru Airport (BLR) Transfer', rate: '₹6,200', desc: 'Door-to-door transfer in Innova (Sedan available at ₹4,800)' }
    ],
    image: 'assets/images/services/Taxi & Car Rentals.png',
    gallery: [
      'assets/images/services/Taxi & Car Rentals.png',
      'assets/images/gallery/Vehicles1.jpg'
    ]
  },
  {
    id: 'auto-services',
    title: 'Auto Services',
    icon: 'bi-truck',
    shortDesc: 'Local auto rickshaw services for temple visits, pickup, and drop facilities.',
    description: 'Our local auto rickshaw services are perfect for short trips around Tiruvannamalai. Whether you need a ride to the temple, pickup from the bus stand, or a quick trip around town, our reliable auto services have you covered.',
    features: [
      'Local Auto Trips',
      'Temple Visits & Pickup/Drop',
      'Bus Stand & Railway Station Transfers',
      'Girivalam Path Rides',
      'Affordable Local Transport',
      'Available Day & Night'
    ],
    image: 'assets/images/gallery/Vehicles2.jpg',
    gallery: [
      'assets/images/gallery/Vehicles2.jpg',
      'assets/images/gallery/travel1.jpg'
    ]
  },
  {
    id: 'bike-rentals',
    title: 'Bike Rentals',
    icon: 'bi-bicycle',
    shortDesc: 'Two-wheeler rentals: 6 Hours for ₹300, 12 Hours for ₹600 with clean helmets included.',
    description: 'Explore Tiruvannamalai, visit holy ashrams, and complete your sacred Girivalam at your own relaxed pace with our reliable two-wheeler bike rental service. Clean, well-maintained automatic scooters and geared motorcycles available at transparent hourly rates.',
    features: [
      '6 Hours Rental Package — ₹300',
      '12 Hours Rental Package — ₹600',
      '24 Hours / Full Day Option — ₹1,000',
      'Honda Activa 6G, TVS Jupiter & Motorcycles',
      'Sanitized Helmets Included for Rider & Pillion',
      'Minimal Documentation & Instant Handover'
    ],
    pricing: [
      { duration: '6 Hours', rate: '₹300', desc: 'Ideal for Temple visits & quick Girivalam' },
      { duration: '12 Hours', rate: '₹600', desc: 'Full day sightseeing & ashram exploration' },
      { duration: '24 Hours', rate: '₹1,000', desc: 'Overnight & extended sacred pilgrimage stay' }
    ],
    image: 'assets/images/services/bike-rentals.jpg',
    gallery: [
      'assets/images/services/bike-rentals.jpg',
      'assets/images/gallery/travel1.jpg'
    ]
  },
  {
    id: 'temple-tour-packages',
    title: 'Temple Tour Packages',
    icon: 'bi-map-fill',
    shortDesc: 'Customized temple tour packages covering Tiruvannamalai, Kanchipuram, Vellore, and more.',
    description: 'Discover the rich temple heritage of Tamil Nadu with our carefully curated tour packages. From local Tiruvannamalai temples to the famous Pancha Bhootha Linga Yatra, we organize memorable pilgrimage tours with comfortable travel and accommodation.',
    features: [
      'Tiruvannamalai Local Temples',
      'Kanchipuram & Vellore Temple Tours',
      'Pancha Bhootha Linga Yatra',
      'Tamil Nadu Temple Tours',
      'Customized Itineraries',
      'Group & Family Packages'
    ],
    image: 'assets/images/popup.png',
    gallery: [
      'assets/images/popup.png',
      'assets/images/gallery/g5.jpg',
      'assets/images/gallery/g9.jpg'
    ]
  }
];

var RESTAURANT_CORE_SERVICE = (typeof window !== 'undefined' && window.RESTAURANT_CORE_SERVICE) ? window.RESTAURANT_CORE_SERVICE : {
  id: 'restaurant',
  title: 'Restaurant',
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
if (typeof window !== 'undefined') window.RESTAURANT_CORE_SERVICE = RESTAURANT_CORE_SERVICE;

/**
 * Render a service card (used on homepage & services page)
 */
function renderServiceCard(service, index) {
  const delay = (index % 4) * 100;
  const imgWrapClass = service.imageFit === 'contain' ? 'service-card-img service-card-img--contain' : 'service-card-img';
  const imageMarkup = service.image
    ? `<img src="${service.image}" alt="${service.title}" class="service-card-thumbnail">`
    : `<div class="placeholder-img" style="height: 100%; min-height: 100%; background: linear-gradient(135deg, #F5EBDD 0%, #FFF9EF 50%, #F5EBDD 100%);">
        <i class="bi ${service.icon}" style="font-size: 3rem; color: var(--clr-primary); opacity: 0.4;"></i>
      </div>`;

  const isRestaurant = service.id === 'restaurant';
  const isAccommodation = service.id === 'accommodation';

  return `
  <div class="col-lg-3 col-md-6 col-sm-6 mb-4" data-aos="fade-up" data-aos-delay="${delay}">
    <div class="service-card ${isRestaurant ? 'border-warning shadow-sm' : ''}">
      <div class="service-card-media">
        <div class="${imgWrapClass}">
          ${imageMarkup}
        </div>
        <div class="service-card-icon" style="${isRestaurant ? 'background: #FFC908; color: #45120E;' : ''}">
          <i class="bi ${service.icon}"></i>
        </div>
      </div>
      <div class="service-card-body">
        <h5>${service.title}</h5>
        <p>${service.shortDesc}</p>
        <a href="${isAccommodation ? 'accommodation.html' : (isRestaurant ? 'restaurant.html' : 'service-details.html?id=' + service.id)}" class="btn ${isRestaurant ? 'btn-warning fw-bold text-dark' : 'btn-outline-maroon'} btn-sm">
          ${isAccommodation ? 'Browse Rooms' : (isRestaurant ? '<i class="bi bi-cup-hot-fill me-1"></i> Order Food Online' : 'View Details')} <i class="bi bi-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>`;
}

/**
 * Render all service cards into a container
 */
function renderServicesGrid(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  function ensureRestaurantInList(arr) {
    if (!arr || !Array.isArray(arr)) return arr;
    if (!arr.some(s => s && s.id === 'restaurant')) {
      const restObj = RESTAURANT_CORE_SERVICE;
      const accIdx = arr.findIndex(s => s && s.id === 'accommodation');
      if (accIdx !== -1) arr.splice(accIdx + 1, 0, restObj);
      else arr.unshift(restObj);
    }
    return arr;
  }

  // Immediate render from latest cached DB data (if any) or static defaults (0ms instant paint)
  if (typeof getPublicCache === 'function') {
    let cached = getPublicCache('services');
    if (cached && Array.isArray(cached) && cached.length > 0) {
      SERVICES_DATA = ensureRestaurantInList(cached);
      window.SERVICES_DATA = SERVICES_DATA;
    }
  }
  SERVICES_DATA = ensureRestaurantInList(SERVICES_DATA);
  container.innerHTML = SERVICES_DATA.map((s, i) => renderServiceCard(s, i)).join('');

  // Always fetch fresh data from Supabase in background so Admin edits reflect immediately
  if (typeof fetchServicesFromSupabase === 'function') {
    fetchServicesFromSupabase().then(dbServices => {
      if (dbServices && dbServices.length > 0) {
        SERVICES_DATA = ensureRestaurantInList(dbServices);
        window.SERVICES_DATA = SERVICES_DATA;
        container.innerHTML = SERVICES_DATA.map((s, i) => renderServiceCard(s, i)).join('');
        if (typeof AOS !== 'undefined') AOS.refresh();
      }
    }).catch(err => {
      console.warn('Supabase dynamic services fetch error:', err);
    });
  }
}

/**
 * Helper to populate service details DOM
 */
function populateServiceDetailsDOM(service, container) {
  // Update page title
  document.title = `${service.title} – Arunachaleshwara Tours & Travels`;

  // Update hero
  const heroTitle = document.getElementById('serviceHeroTitle');
  const heroBreadcrumb = document.getElementById('serviceBreadcrumb');
  if (heroTitle) heroTitle.textContent = service.title;
  if (heroBreadcrumb) heroBreadcrumb.textContent = service.title;

  const heroMediaClass = service.imageFit === 'contain' ? 'img-overlay-zoom detail-hero-media detail-hero-media--contain mb-4' : 'img-overlay-zoom detail-hero-media mb-4';

  container.innerHTML = `
  <div class="row g-4">
    <div class="col-lg-8">
      <!-- Service Image -->
      <div class="${heroMediaClass}">
        <img src="${service.image || 'assets/images/popup.png'}" alt="${service.title}" class="detail-hero-img">
      </div>

      <!-- Description -->
      <div class="mb-4" data-aos="fade-up">
        <h3 class="mb-3">${service.title}</h3>
        <div class="gold-divider gold-divider-left"></div>
        <p class="lead-text mt-3">${service.description}</p>
      </div>

      <!-- Features -->
      <div class="mb-4" data-aos="fade-up" data-aos-delay="100">
        <h4 class="mb-3">Features & Benefits</h4>
        <div class="row g-3">
          ${(service.features || []).map(f => `
          <div class="col-md-6">
            <div class="d-flex align-items-start gap-2">
              <i class="bi bi-check-circle-fill text-gold mt-1"></i>
              <span>${f}</span>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Pricing / Tariff (if configured) -->
      ${service.pricing && service.pricing.length > 0 ? `
      <div class="mb-4" data-aos="fade-up" data-aos-delay="150">
        <h4 class="mb-3"><i class="bi bi-tag-fill text-gold me-2"></i>Tariff & Pricing</h4>
        <div class="row g-3">
          ${service.pricing.map(p => `
          <div class="col-md-6 col-12">
            <div class="p-3 bg-light rounded-3 border h-100 d-flex flex-column justify-content-between">
              <div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <strong class="text-maroon">${p.name || p.duration}</strong>
                  <span class="badge bg-warning text-dark fs-6">${p.rate}</span>
                </div>
                <small class="text-muted d-block mb-2">${p.desc || ''}</small>
              </div>
              ${service.id === 'taxi-car-rentals' ? `
              <div class="mt-2 pt-2 border-top text-end">
                <button type="button" class="btn btn-sm btn-outline-maroon fw-semibold" onclick="openTaxiBookingModal('${String(p.name || '').replace(/'/g, "\\'")}')">
                  <i class="bi bi-car-front-fill me-1"></i> Book This Cab
                </button>
              </div>` : ''}
              ${service.id === 'temple-darshan' ? `
              <div class="mt-2 pt-2 border-top text-end">
                <button type="button" class="btn btn-sm btn-outline-maroon fw-semibold" onclick="openDarshanBookingModal('${String(p.name || '').replace(/'/g, "\\'")}')">
                  <i class="bi bi-flower1 me-1"></i> Book This Seva
                </button>
              </div>` : ''}
              ${service.id === 'bike-rentals' ? `
              <div class="mt-2 pt-2 border-top text-end">
                <button type="button" class="btn btn-sm btn-outline-maroon fw-semibold" onclick="openBikeBookingModal('${String(p.duration || p.name || '').replace(/'/g, "\\'")}')">
                  <i class="bi bi-bicycle me-1"></i> Book This Package
                </button>
              </div>` : ''}
            </div>
          </div>`).join('')}
        </div>
      </div>` : ''}

      <!-- Bus Routes & Departure Timings (if configured) -->
      ${service.routes && service.routes.length > 0 ? `
      <div class="mb-4" data-aos="fade-up" data-aos-delay="150">
        <h4 class="mb-3"><i class="bi bi-clock-history text-gold me-2"></i>Daily Bus Schedules & Departures</h4>
        <div class="row g-3">
          ${service.routes.map(r => `
          <div class="col-12">
            <div class="p-3 bg-light rounded-3 border">
              <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                <strong class="text-maroon fs-6"><i class="bi bi-arrow-left-right text-gold me-2"></i>${r.route}</strong>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-success-subtle text-success border border-success-subtle">${r.timings.length} Daily Trips</span>
                  <button type="button" class="btn btn-sm btn-outline-maroon fw-semibold" onclick="openBusBookingModal('${String(r.route || '').replace(/'/g, "\\'")}')">
                    <i class="bi bi-bus-front me-1"></i> Book This Route
                  </button>
                </div>
              </div>
              <div class="d-flex flex-wrap gap-2">
                ${r.timings.map(t => `<span class="badge bg-white text-dark border px-2 py-1"><i class="bi bi-clock me-1 text-gold"></i>${t}</span>`).join('')}
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>` : ''}

      <!-- Pricing / Tariff (if configured) -->
      ${service.pricing && service.pricing.length > 0 ? `
      <div class="mb-4" data-aos="fade-up" data-aos-delay="150">
        <h4 class="mb-3"><i class="bi bi-tag-fill text-gold me-2"></i>Tariff & Pricing</h4>
        <div class="row g-3">
          ${service.pricing.map(p => `
          <div class="col-md-6 col-12">
            <div class="p-3 bg-light rounded-3 border h-100 d-flex flex-column justify-content-between">
              <div>
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <strong class="text-maroon">${p.name || p.duration}</strong>
                  <span class="badge bg-warning text-dark fs-6">${p.rate}</span>
                </div>
                <small class="text-muted d-block mb-2">${p.desc || ''}</small>
              </div>
              ${service.id === 'taxi-car-rentals' ? `
              <div class="mt-2 pt-2 border-top text-end">
                <button type="button" class="btn btn-sm btn-outline-maroon fw-semibold" onclick="openTaxiBookingModal('${String(p.name || '').replace(/'/g, "\\'")}')">
                  <i class="bi bi-car-front-fill me-1"></i> Book This Cab
                </button>
              </div>` : ''}
            </div>
          </div>`).join('')}
        </div>
      </div>` : ''}

      <!-- Bus Routes & Departure Timings (if configured) -->
      ${service.routes && service.routes.length > 0 ? `
      <div class="mb-4" data-aos="fade-up" data-aos-delay="150">
        <h4 class="mb-3"><i class="bi bi-clock-history text-gold me-2"></i>Daily Bus Schedules & Departures</h4>
        <div class="row g-3">
          ${service.routes.map(r => `
          <div class="col-12">
            <div class="p-3 bg-light rounded-3 border">
              <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                <strong class="text-maroon fs-6"><i class="bi bi-arrow-left-right text-gold me-2"></i>${r.route}</strong>
                <span class="badge bg-success-subtle text-success border border-success-subtle">${r.timings.length} Daily Trips</span>
              </div>
              <div class="d-flex flex-wrap gap-2">
                ${r.timings.map(t => `<span class="badge bg-white text-dark border px-2 py-1"><i class="bi bi-clock me-1 text-gold"></i>${t}</span>`).join('')}
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>` : ''}

      <!-- Gallery -->
      ${service.gallery && service.gallery.length > 0 ? `
      <div class="mb-4" data-aos="fade-up" data-aos-delay="200">
        <h4 class="mb-3">Gallery</h4>
        <div class="row g-3">
          ${service.gallery.map(imgSrc => {
    const isContainThumb = service.imageFit === 'contain' && imgSrc === service.image;
    const thumbClass = isContainThumb ? 'service-gallery-thumb service-gallery-thumb--contain' : 'service-gallery-thumb';
    return `
          <div class="col-md-4 col-6">
            <div class="gallery-item" style="border-radius: var(--border-radius-lg); overflow: hidden; border: 1px solid rgba(201, 149, 53, 0.3); margin-bottom: 0;">
              <a href="${imgSrc}" class="glightbox" data-gallery="service-gallery" data-title="${service.title}">
                <img src="${imgSrc}" alt="${service.title}" class="${thumbClass}">
                <div class="gallery-item-overlay">
                  <i class="bi bi-zoom-in"></i>
                </div>
              </a>
            </div>
          </div>`;
  }).join('')}
        </div>
      </div>` : ''}
    </div>

    <!-- Sidebar -->
    <div class="col-lg-4">
      <div class="detail-sidebar">
        <!-- Enquiry CTA -->
        <div class="info-card" data-aos="fade-up">
          <div class="info-card-icon">
            <i class="bi bi-send-fill"></i>
          </div>
          <h5>Interested in this Service?</h5>
          <p>Send us an enquiry and we will get back to you with details.</p>
          <div class="d-grid gap-2">
            ${service.id === 'accommodation' ? `
            <a href="accommodation.html" class="btn justify-content-center fw-bold" style="background:#FFC908;color:#45120E;border:none;">
              <i class="bi bi-door-open-fill"></i> Browse All 17 Rooms &amp; Book
            </a>` : ''}
            ${service.id === 'restaurant' ? `
            <a href="restaurant.html" class="btn justify-content-center fw-bold fs-6 py-2 shadow-sm" style="background:#FFC908;color:#45120E;border:none;">
              <i class="bi bi-cup-hot-fill me-1"></i> Order Food Online Now
            </a>` : ''}
            ${service.id === 'taxi-car-rentals' ? `
            <button type="button" class="btn justify-content-center fw-bold fs-6 py-2 shadow-sm" style="background:#FFC908;color:#45120E;border:none;" onclick="openTaxiBookingModal()">
              <i class="bi bi-car-front-fill me-1"></i> Book Taxi / Car Now
            </button>` : ''}
            ${service.id === 'temple-darshan' ? `
            <button type="button" class="btn justify-content-center fw-bold fs-6 py-2 shadow-sm" style="background:#FFC908;color:#45120E;border:none;" onclick="openDarshanBookingModal()">
              <i class="bi bi-flower1 me-1"></i> Book Darshan Now
            </button>` : ''}
            ${service.id === 'bus-ticket-booking' ? `
            <button type="button" class="btn justify-content-center fw-bold fs-6 py-2 shadow-sm" style="background:#FFC908;color:#45120E;border:none;" onclick="openBusBookingModal()">
              <i class="bi bi-bus-front me-1"></i> Book Bus Tickets Now
            </button>` : ''}
            ${service.id === 'bike-rentals' ? `
            <button type="button" class="btn justify-content-center fw-bold fs-6 py-2 shadow-sm" style="background:#FFC908;color:#45120E;border:none;" onclick="openBikeBookingModal()">
              <i class="bi bi-bicycle me-1"></i> Book Bike Rental Now
            </button>` : ''}
            <a href="enquiry.html?service=${encodeURIComponent(service.title)}" class="btn btn-primary-custom justify-content-center">
              <i class="bi bi-pencil-square"></i> Send Enquiry
            </a>
            <a href="https://wa.me/${NAV_CONFIG.whatsapp}?text=Hello!%20I%20am%20interested%20in%20your%20${encodeURIComponent(service.title)}%20service.%20Please%20share%20more%20details." class="btn btn-whatsapp justify-content-center" target="_blank" rel="noopener">
              <i class="bi bi-whatsapp"></i> WhatsApp Enquiry
            </a>
            <a href="tel:+91${NAV_CONFIG.phone}" class="btn btn-outline-maroon justify-content-center">
              <i class="bi bi-telephone-fill"></i> Call Now
            </a>
          </div>
        </div>

        <!-- Quick Contact Card -->
        <div class="info-card text-start" data-aos="fade-up" data-aos-delay="100">
          <h5>Need Immediate Help?</h5>
          <p>Our pilgrimage coordinators are available 24/7 to assist you.</p>
          <div class="detail-contact-item mb-3">
            <i class="bi bi-telephone text-gold"></i>
            <div class="detail-contact-body">
              <small class="text-muted d-block">Call Us</small>
              <a href="tel:+91${NAV_CONFIG.phone}">+91 ${NAV_CONFIG.phone}</a>
            </div>
          </div>
          <div class="detail-contact-item mb-3">
            <i class="bi bi-whatsapp text-success"></i>
            <div class="detail-contact-body">
              <small class="text-muted d-block">WhatsApp</small>
              <a href="https://wa.me/${NAV_CONFIG.whatsapp}" target="_blank" rel="noopener">+91 ${NAV_CONFIG.phone}</a>
            </div>
          </div>
          <div class="detail-contact-item">
            <i class="bi bi-envelope text-gold"></i>
            <div class="detail-contact-body">
              <small class="text-muted d-block">Email</small>
              <a href="mailto:${NAV_CONFIG.email}">${NAV_CONFIG.email}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  if (typeof initLightbox === 'function') {
    setTimeout(initLightbox, 60);
  }
  if (typeof AOS !== 'undefined') {
    setTimeout(() => AOS.refresh(), 80);
  }
}

/**
 * Overlay custom admin-edited catalog data (tariffs, routes, sevas)
 */
function overlayCustomCatalogData(service) {
  if (!service) return service;
  try {
    if (service.id === 'temple-darshan') {
      const rawSevas = localStorage.getItem('arn_custom_darshan_sevas');
      if (rawSevas) {
        const sevas = JSON.parse(rawSevas).filter(x => x.is_active !== false);
        if (sevas.length > 0) {
          service.pricing = sevas.map(s => ({
            name: s.title,
            rate: '₹' + Number(s.price || 0).toLocaleString('en-IN'),
            desc: `${s.timing || 'Daily'}${s.inclusions ? ' • ' + s.inclusions : ''}`
          }));
        }
      }
    } else if (service.id === 'bus-ticket-booking') {
      const rawRoutes = localStorage.getItem('arn_custom_bus_routes');
      if (rawRoutes) {
        const routes = JSON.parse(rawRoutes).filter(x => x.is_active !== false);
        if (routes.length > 0) {
          service.routes = routes.map(r => ({
            route: r.title,
            timings: r.timings || []
          }));
        }
      }
    } else if (service.id === 'bike-rentals') {
      const rawTariffs = localStorage.getItem('arn_custom_bike_tariffs');
      if (rawTariffs) {
        const t = JSON.parse(rawTariffs);
        service.pricing = [
          { duration: '6 Hours', rate: '₹' + Number(t.rate_6h || 300).toLocaleString('en-IN'), desc: 'Ideal for Temple visits & quick Girivalam' },
          { duration: '12 Hours', rate: '₹' + Number(t.rate_12h || 600).toLocaleString('en-IN'), desc: 'Ideal for full Girivalam & nearby sacred ashrams' },
          { duration: '24 Hours / Full Day', rate: '₹' + Number(t.rate_24h || 1000).toLocaleString('en-IN'), desc: 'Overnight stay pilgrims & spiritual shrines' }
        ];
      }
    } else if (service.id === 'taxi-car-rentals') {
      const rawTaxiTariffs = localStorage.getItem('arn_custom_taxi_tariffs');
      if (rawTaxiTariffs) {
        const t = JSON.parse(rawTaxiTariffs);
        service.pricing = [
          { name: 'Maruti Suzuki Ertiga (6+1 Seater AC)', rate: '₹' + Number(t.ertiga_local || 2800).toLocaleString('en-IN'), desc: `Local 8h/80km • Outstation: ₹${t.ertiga_km || 15}/km • Clean AC MPV for family` },
          { name: 'Toyota Innova Crysta (7+1 Seater AC)', rate: '₹' + Number(t.innova_local || 3600).toLocaleString('en-IN'), desc: `Local 8h/80km • Outstation: ₹${t.innova_km || 18}/km • Premium luxury pilgrimage ride` },
          { name: 'Swift Dzire / Sedan (4+1 Seater AC)', rate: '₹' + Number(t.sedan_local || 2200).toLocaleString('en-IN'), desc: `Local 8h/80km • Outstation: ₹${t.sedan_km || 12}/km • Quick temple trips & couples` },
          { name: 'Tempo Traveller (12/14 Seater AC)', rate: '₹' + Number(t.tempo_local || 4800).toLocaleString('en-IN'), desc: `Local 8h/80km • Outstation: ₹${t.tempo_km || 24}/km • Group pilgrimage & joint families` },
          { name: 'Chennai Airport (MAA) Transfer', rate: '₹' + Number(t.chennai_airport || 4800).toLocaleString('en-IN'), desc: 'Door-to-door transfer in Innova (Sedan available at ₹3,800)' },
          { name: 'Bengaluru Airport (BLR) Transfer', rate: '₹' + Number(t.blr_airport || 6200).toLocaleString('en-IN'), desc: 'Door-to-door transfer in Innova (Sedan available at ₹4,800)' }
        ];
      }
    }
  } catch (e) {
    console.warn('Could not overlay custom catalog settings:', e);
  }
  return service;
}

/**
 * Render full service details page content
 */
function renderServiceDetails() {
  const container = document.getElementById('serviceDetailContent');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('id');

  // Immediate render from latest cached DB services (0ms instant paint of latest DB data on reload)
  if (typeof getPublicCache === 'function') {
    const cached = getPublicCache('services');
    if (cached && cached.length > 0) {
      SERVICES_DATA = cached;
      window.SERVICES_DATA = SERVICES_DATA;
    }
  }

  let service = SERVICES_DATA.find(s => s.id === serviceId);

  if (service) {
    service = overlayCustomCatalogData(service);
    populateServiceDetailsDOM(service, container);
  } else {
    container.innerHTML = `
    <div class="text-center py-5">
      <div class="mb-4">
        <i class="bi bi-exclamation-circle" style="font-size: 4rem; color: var(--clr-gold);"></i>
      </div>
      <h2>Service Not Found</h2>
      <p class="lead-text">The service you are looking for does not exist or the link may be incorrect.</p>
      <a href="services.html" class="btn btn-primary-custom mt-3">
        <i class="bi bi-arrow-left"></i> View All Services
      </a>
    </div>`;
    document.title = 'Service Not Found – Arunachaleshwara Tours & Travels';
  }

  // Hydrate live from Supabase (fetches latest dynamic updates from DB in background)
  if (typeof fetchServicesFromSupabase === 'function') {
    fetchServicesFromSupabase().then(dbServices => {
      if (dbServices && dbServices.length > 0) {
        SERVICES_DATA = dbServices;
        window.SERVICES_DATA = SERVICES_DATA;
        let freshService = SERVICES_DATA.find(s => s.id === serviceId);
        if (freshService) {
          freshService = overlayCustomCatalogData(freshService);
          populateServiceDetailsDOM(freshService, container);
        }
      }
    }).catch(err => {
      console.warn('Supabase dynamic service detail load error:', err);
    });
  }
}

// Global exports
window.SERVICES_DATA = SERVICES_DATA;
window.renderServiceCard = renderServiceCard;
window.renderServicesGrid = renderServicesGrid;
window.renderServiceDetails = renderServiceDetails;

// Real-Time Sync without page reload
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      if (window.ArnRealtimeSync) {
        window.ArnRealtimeSync.subscribe('services', () => {
          if (typeof renderServiceDetails === 'function' && document.getElementById('serviceDetailContent')) {
            renderServiceDetails();
          }
          if (typeof renderServicesGrid === 'function') {
            if (document.getElementById('servicesGrid')) renderServicesGrid('servicesGrid');
            if (document.getElementById('servicesPageGrid')) renderServicesGrid('servicesPageGrid');
          }
        });
      }
    }, 800);
  });
}

/* ==========================================================================
   PUBLIC MODAL BOOKING HANDLERS & PERSISTENCE
   1. Temple Darshan Services
   2. Bus Ticket Booking
   3. Bike Rentals
   4. Taxi & Car Rentals
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. TEMPLE DARSHAN BOOKING HANDLERS
   -------------------------------------------------------------------------- */
window.darshanDocUploaderInstance = null;

function openDarshanBookingModal(preferredSeva = '') {
  const modalEl = document.getElementById('darshanBookingModal');
  if (!modalEl) {
    window.location.href = `enquiry.html?service=Temple%20Darshan%20Services${preferredSeva ? '&seva=' + encodeURIComponent(preferredSeva) : ''}`;
    return;
  }

  const form = document.getElementById('darshanBookingForm');
  const successBox = document.getElementById('darshanSuccessBox');
  if (form) {
    form.reset();
    form.classList.remove('d-none');
  }
  if (successBox) successBox.classList.add('d-none');

  // Set default date to tomorrow
  const dateInput = document.getElementById('darshanDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  // Preselect seva if matching
  if (preferredSeva) {
    const sSelect = document.getElementById('darshanSevaSelect');
    if (sSelect) {
      for (let i = 0; i < sSelect.options.length; i++) {
        if (sSelect.options[i].value.toLowerCase().includes(preferredSeva.toLowerCase()) ||
          preferredSeva.toLowerCase().includes(sSelect.options[i].value.toLowerCase())) {
          sSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  // Initialize dynamic devotees (2 adults, 0 children default)
  const numAdults = parseInt(document.getElementById('darshanAdultsCount')?.value) || 2;
  const numChildren = parseInt(document.getElementById('darshanChildrenCount')?.value) || 0;
  if (typeof renderDynamicGuests === 'function') {
    renderDynamicGuests('darshanDynamicDevoteesContainer', numAdults, numChildren, {
      adultLabel: 'Devotee',
      childLabel: 'Child Devotee',
      showGender: true
    });
  }

  // Initialize secure document uploader
  if (typeof BookingDocUploader === 'function') {
    window.darshanDocContainer_uploader = new BookingDocUploader('darshanDocContainer', 'temple-darshan', {
      title: 'Devotee Identification Document',
      description: 'Mandatory: Upload Govt ID proof (Aadhaar / Voter ID / Passport) for temple entry verification. Max 5 MB.',
      mandatory: true,
      docTypes: ['Aadhaar Card', 'Voter ID', 'Passport', 'PAN Card', 'Other Govt ID']
    });
  }

  calculateDarshanFare();

  const bsModal = (typeof bootstrap !== 'undefined' && bootstrap.Modal)
    ? (bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl))
    : null;
  if (bsModal) bsModal.show();
}

function onDarshanCountsChanged() {
  const numAdults = parseInt(document.getElementById('darshanAdultsCount')?.value) || 1;
  const numChildren = parseInt(document.getElementById('darshanChildrenCount')?.value) || 0;
  if (typeof renderDynamicGuests === 'function') {
    renderDynamicGuests('darshanDynamicDevoteesContainer', numAdults, numChildren, {
      adultLabel: 'Devotee',
      childLabel: 'Child Devotee',
      showGender: true
    });
  }
  calculateDarshanFare();
}

function calculateDarshanFare() {
  const sSelect = document.getElementById('darshanSevaSelect');
  const fareEl = document.getElementById('darshanEstAmount');
  if (!sSelect || !fareEl) return;

  const opt = sSelect.options[sSelect.selectedIndex];
  const baseRate = parseFloat(opt?.dataset.rate || 1500);

  // Group rituals vs per-head rituals
  let total = baseRate;
  if (opt.value.includes('Archana') || opt.value.includes('Quick Darshan')) {
    const numAdults = parseInt(document.getElementById('darshanAdultsCount')?.value) || 1;
    total = baseRate * numAdults;
  }

  fareEl.textContent = '₹' + total.toLocaleString('en-IN');
}

function copyDevotee1ToContact() {
  const chk = document.getElementById('darshanSameAsDevotee1');
  if (!chk) return;
  const nameInput = document.getElementById('darshanContactName');
  if (chk.checked) {
    const firstDevoteeInput = document.querySelector('#darshanDynamicDevoteesContainer [data-guest-type="adult"][data-guest-index="1"][data-field="name"]');
    if (firstDevoteeInput && nameInput) {
      nameInput.value = firstDevoteeInput.value.trim();
    }
  }
}

async function submitDarshanBooking(e) {
  e.preventDefault();
  const seva = document.getElementById('darshanSevaSelect').value;
  const date = document.getElementById('darshanDate').value;
  const slot = document.getElementById('darshanSlot').value;
  const adults = parseInt(document.getElementById('darshanAdultsCount').value) || 1;
  const children = parseInt(document.getElementById('darshanChildrenCount').value) || 0;
  const name = document.getElementById('darshanContactName').value.trim();
  const mobile = document.getElementById('darshanContactMobile').value.trim();
  const email = document.getElementById('darshanContactEmail').value.trim();
  const city = document.getElementById('darshanContactCity').value.trim();
  const notes = document.getElementById('darshanNotes').value.trim();
  const estAmount = parseFloat(document.getElementById('darshanEstAmount').textContent.replace(/[^0-9]/g, '')) || 1500;

  if (!name || !mobile || !date) {
    alert('Please fill in required fields: Darshan Date, Contact Name, and Mobile Number.');
    return;
  }

  // Validate dynamic devotees
  const guests = typeof collectDynamicGuests === 'function' ? collectDynamicGuests('darshanDynamicDevoteesContainer') : [];
  for (let g of guests) {
    if (!g.full_name) {
      alert(`Please provide the full name for ${g.guest_type === 'adult' ? 'Devotee ' + g.guest_index : 'Child ' + g.guest_index}.`);
      return;
    }
    if (isNaN(g.age) || g.age < 0) {
      alert(`Please enter a valid age for ${g.full_name}.`);
      return;
    }
  }

  // Validate identification documents (Mandatory)
  if (window.darshanDocContainer_uploader && !window.darshanDocContainer_uploader.validate()) {
    alert('Devotee Identification Document is mandatory. Please choose and upload your Govt ID proof (Aadhaar / Voter ID / Passport) before proceeding.');
    return;
  }

  // Collect documents
  const docs = window.darshanDocContainer_uploader ? window.darshanDocContainer_uploader.getDocuments() : [];

  const bookingId = `ARN-DARSHAN-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`;
  const totalDevotees = adults + children;

  const bookingRecord = {
    id: 'darshan-web-' + Date.now(),
    booking_id: bookingId,
    service_id: 'temple-darshan',
    service_title: seva,
    customer_name: name,
    mobile: mobile,
    email: email,
    whatsapp_number: mobile,
    travel_date: date,
    pickup_location: `Arunachaleswarar Temple | ${slot}`,
    passengers: totalDevotees,
    vehicle_type: slot,
    estimated_amount: estAmount,
    amount_paid: 0,
    balance_amount: estAmount,
    booking_status: 'Under Review',
    payment_status: 'Not Paid',
    special_requirements: `${notes ? notes + ' | ' : ''}Devotees: ${adults} Adults, ${children} Children. Native: ${city || 'N/A'}`,
    created_at: new Date().toISOString()
  };

  // Persist locally
  try {
    const rawB = localStorage.getItem('arn_service_bookings');
    const existingB = rawB ? JSON.parse(rawB) : [];
    existingB.unshift(bookingRecord);
    localStorage.setItem('arn_service_bookings', JSON.stringify(existingB));

    // Save individual guests
    const rawG = localStorage.getItem('arn_booking_guests');
    const existingG = rawG ? JSON.parse(rawG) : [];
    guests.forEach(g => {
      existingG.push({
        id: 'guest-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        booking_id: bookingId,
        guest_type: g.guest_type,
        guest_index: g.guest_index,
        full_name: g.full_name,
        age: g.age,
        gender: g.gender || 'Male'
      });
    });
    localStorage.setItem('arn_booking_guests', JSON.stringify(existingG));

    // Save documents
    if (docs.length > 0) {
      const rawD = localStorage.getItem('arn_booking_documents');
      const existingD = rawD ? JSON.parse(rawD) : [];
      docs.forEach(d => {
        existingD.push({
          id: 'doc-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
          booking_id: bookingId,
          document_type: d.document_type,
          file_name: d.file_name,
          file_url: d.file_url,
          file_size: d.file_size
        });
      });
      localStorage.setItem('arn_booking_documents', JSON.stringify(existingD));
    }
  } catch (err) {
    console.warn('Local storage darshan save error:', err);
  }

  // Sync to Supabase
  try {
    if (window.supabaseClient) {
      await window.supabaseClient.from('service_bookings').insert([bookingRecord]);
      if (guests.length > 0) {
        await window.supabaseClient.from('booking_guests').insert(
          guests.map(g => ({
            booking_id: bookingId,
            guest_type: g.guest_type,
            guest_index: g.guest_index,
            full_name: g.full_name,
            age: g.age,
            gender: g.gender || 'Male'
          }))
        );
      }
      if (docs.length > 0) {
        await window.supabaseClient.from('booking_documents').insert(
          docs.map(d => ({
            booking_id: bookingId,
            document_type: d.document_type,
            file_name: d.file_name,
            file_url: d.file_url,
            file_size: d.file_size
          }))
        );
      }
    }
  } catch (dbErr) {
    console.warn('Supabase darshan sync fallback to local storage:', dbErr);
  }

  if (window.ArnRealtimeSync) {
    window.ArnRealtimeSync.publish('bookings', 'new_booking', bookingRecord);
  }

  // Show Success Box
  document.getElementById('darshanBookingForm').classList.add('d-none');
  const sBox = document.getElementById('darshanSuccessBox');
  sBox.classList.remove('d-none');

  document.getElementById('darshanSuccessBookingId').textContent = bookingId;
  document.getElementById('darshanSuccessSeva').textContent = seva;
  document.getElementById('darshanSuccessDate').textContent = `${date} (${slot.split(' ')[0]})`;
  document.getElementById('darshanSuccessDevotees').textContent = `${totalDevotees} (${adults} Adults, ${children} Children)`;

  // Build WhatsApp message
  let devoteeDetailsText = guests.map(g => `• ${g.guest_type.toUpperCase()} ${g.guest_index}: ${g.full_name} (${g.age} yrs${g.gender ? ', ' + g.gender : ''})`).join('\n');
  const waMsg = `*Namaste! New Temple Darshan Booking*\n\n*Booking ID:* ${bookingId}\n*Devotee Name:* ${name}\n*Mobile:* ${mobile}\n*Seva / Ritual:* ${seva}\n*Darshan Date:* ${date}\n*Time Slot:* ${slot}\n*Devotees Count:* ${totalDevotees} (${adults} Adults, ${children} Children)\n\n*Devotee Names & Ages:*\n${devoteeDetailsText}\n\n*Est. Contribution:* ₹${estAmount.toLocaleString('en-IN')}\n*Notes:* ${notes || 'None'}\n\nPlease confirm our seva timing and guide coordination. Om Namah Shivaya!`;
  document.getElementById('darshanSuccessWaBtn').href = `https://wa.me/919010515341?text=${encodeURIComponent(waMsg)}`;
}

function sendDarshanBookingViaWhatsApp() {
  const seva = document.getElementById('darshanSevaSelect')?.value || 'Abhishekam Seva';
  const date = document.getElementById('darshanDate')?.value || 'Upcoming Date';
  const slot = document.getElementById('darshanSlot')?.value || 'Morning Slot';
  const name = document.getElementById('darshanContactName')?.value.trim() || 'Devotee';
  const mobile = document.getElementById('darshanContactMobile')?.value.trim() || '';
  const adults = document.getElementById('darshanAdultsCount')?.value || 2;
  const children = document.getElementById('darshanChildrenCount')?.value || 0;

  const waMsg = `*Namaste! Temple Darshan Booking Enquiry*\n\n*Name:* ${name}\n*Mobile:* ${mobile}\n*Seva:* ${seva}\n*Preferred Date:* ${date}\n*Slot:* ${slot}\n*Devotees:* ${adults} Adults, ${children} Children\n\nPlease share availability, puja timing, and guidelines.`;
  window.open(`https://wa.me/919010515341?text=${encodeURIComponent(waMsg)}`, '_blank');
}

/* --------------------------------------------------------------------------
   2. BUS TICKET BOOKING HANDLERS
   -------------------------------------------------------------------------- */
const BUS_SCHEDULES = {
  hyd: [
    '03:20 PM - Daily Express',
    '04:00 PM - AC Sleeper',
    '05:10 PM - Semi-Sleeper AC',
    '05:30 PM - Multi-Axle AC Sleeper',
    '06:00 PM - Super Luxury AC',
    '06:40 PM - High-Deck Sleeper',
    '07:00 PM - Volvo Multi-Axle',
    '08:20 PM - Night AC Sleeper',
    '09:10 PM - Overnight Direct Sleeper',
    '10:00 PM - Late Night Pilgrim Express'
  ],
  vja: [
    '06:30 PM - Evening Express',
    '07:00 PM - AC Sleeper Direct',
    '07:30 PM - Multi-Axle Volvo AC',
    '08:40 PM - Deluxe Sleeper Coach',
    '10:00 PM - Night AC Sleeper',
    '11:00 PM - Overnight Direct Pilgrim Coach'
  ],
  other: [
    '07:00 AM - Morning Return Journey',
    '02:00 PM - Afternoon Coach',
    '08:00 PM - Night AC Sleeper Return'
  ]
};

function openBusBookingModal(preferredRoute = '') {
  const modalEl = document.getElementById('busBookingModal');
  if (!modalEl) {
    window.location.href = `enquiry.html?service=Bus%20Ticket%20Booking${preferredRoute ? '&route=' + encodeURIComponent(preferredRoute) : ''}`;
    return;
  }

  const form = document.getElementById('busBookingForm');
  const successBox = document.getElementById('busSuccessBox');
  if (form) {
    form.reset();
    form.classList.remove('d-none');
  }
  if (successBox) successBox.classList.add('d-none');

  const dateInput = document.getElementById('busTravelDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  // Preselect route
  const rSelect = document.getElementById('busRouteSelect');
  if (preferredRoute && rSelect) {
    for (let i = 0; i < rSelect.options.length; i++) {
      if (rSelect.options[i].value.toLowerCase().includes(preferredRoute.toLowerCase()) ||
        preferredRoute.toLowerCase().includes(rSelect.options[i].value.toLowerCase())) {
        rSelect.selectedIndex = i;
        break;
      }
    }
  }

  onBusRouteChange();

  // Dynamic passengers
  const numAdults = parseInt(document.getElementById('busAdultsCount')?.value) || 2;
  const numChildren = parseInt(document.getElementById('busChildrenCount')?.value) || 0;
  if (typeof renderDynamicGuests === 'function') {
    renderDynamicGuests('busDynamicPassengersContainer', numAdults, numChildren, {
      adultLabel: 'Passenger',
      childLabel: 'Child Passenger',
      showGender: true
    });
  }

  // Document uploader
  if (typeof BookingDocUploader === 'function') {
    window.busDocContainer_uploader = new BookingDocUploader('busDocContainer', 'bus-booking', {
      title: 'Passenger ID Proof Upload',
      description: 'Mandatory: Upload passenger identification proof (Aadhaar / Voter ID / Passport / Driving Licence). Max 5 MB.',
      mandatory: true,
      docTypes: ['Aadhaar Card', 'Voter ID', 'Passport', 'Driving Licence', 'Other Govt ID']
    });
  }

  calculateBusFare();

  const bsModal = (typeof bootstrap !== 'undefined' && bootstrap.Modal)
    ? (bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl))
    : null;
  if (bsModal) bsModal.show();
}

function onBusRouteChange() {
  const rSelect = document.getElementById('busRouteSelect');
  const tSelect = document.getElementById('busTimingSelect');
  if (!rSelect || !tSelect) return;

  const opt = rSelect.options[rSelect.selectedIndex];
  const routeKey = opt?.dataset.route || 'hyd';
  const timings = BUS_SCHEDULES[routeKey] || BUS_SCHEDULES.hyd;

  tSelect.innerHTML = timings.map(t => `<option value="${t}">${t}</option>`).join('');
}

function onBusCountsChanged() {
  const numAdults = parseInt(document.getElementById('busAdultsCount')?.value) || 1;
  const numChildren = parseInt(document.getElementById('busChildrenCount')?.value) || 0;
  if (typeof renderDynamicGuests === 'function') {
    renderDynamicGuests('busDynamicPassengersContainer', numAdults, numChildren, {
      adultLabel: 'Passenger',
      childLabel: 'Child Passenger',
      showGender: true
    });
  }
  calculateBusFare();
}

function calculateBusFare() {
  const coachSelect = document.getElementById('busCoachType');
  const fareEl = document.getElementById('busEstFare');
  if (!coachSelect || !fareEl) return;

  const opt = coachSelect.options[coachSelect.selectedIndex];
  const rate = parseFloat(opt?.dataset.rate || 1250);
  const adults = parseInt(document.getElementById('busAdultsCount')?.value) || 1;
  const children = parseInt(document.getElementById('busChildrenCount')?.value) || 0;
  const totalSeats = adults + children;

  const total = rate * totalSeats;
  fareEl.textContent = '₹' + total.toLocaleString('en-IN');
}

function copyPassenger1ToContact() {
  const chk = document.getElementById('busSameAsPassenger1');
  if (!chk) return;
  const nameInput = document.getElementById('busContactName');
  if (chk.checked) {
    const firstPassengerInput = document.querySelector('#busDynamicPassengersContainer [data-guest-type="adult"][data-guest-index="1"][data-field="name"]');
    if (firstPassengerInput && nameInput) {
      nameInput.value = firstPassengerInput.value.trim();
    }
  }
}

async function submitBusBooking(e) {
  e.preventDefault();
  const route = document.getElementById('busRouteSelect').value;
  const date = document.getElementById('busTravelDate').value;
  const timing = document.getElementById('busTimingSelect').value;
  const coach = document.getElementById('busCoachType').value;
  const boarding = document.getElementById('busBoardingPoint').value.trim();
  const adults = parseInt(document.getElementById('busAdultsCount').value) || 1;
  const children = parseInt(document.getElementById('busChildrenCount').value) || 0;
  const name = document.getElementById('busContactName').value.trim();
  const mobile = document.getElementById('busContactMobile').value.trim();
  const email = document.getElementById('busContactEmail').value.trim();
  const address = document.getElementById('busContactAddress').value.trim();
  const notes = document.getElementById('busNotes').value.trim();
  const estFare = parseFloat(document.getElementById('busEstFare').textContent.replace(/[^0-9]/g, '')) || 2500;

  if (!name || !mobile || !date || !boarding) {
    alert('Please fill in required fields: Journey Date, Boarding Point, Contact Name, and Mobile Number.');
    return;
  }

  const passengers = typeof collectDynamicGuests === 'function' ? collectDynamicGuests('busDynamicPassengersContainer') : [];
  for (let p of passengers) {
    if (!p.full_name) {
      alert(`Please provide the name for Passenger ${p.guest_index}.`);
      return;
    }
    if (isNaN(p.age) || p.age < 0) {
      alert(`Please enter a valid age for ${p.full_name}.`);
      return;
    }
  }

  // Validate identification documents (Mandatory)
  if (window.busDocContainer_uploader && !window.busDocContainer_uploader.validate()) {
    alert('Passenger Identification Document is mandatory. Please upload valid ID proof before proceeding.');
    return;
  }

  const docs = window.busDocContainer_uploader ? window.busDocContainer_uploader.getDocuments() : [];
  const bookingId = `ARN-BUS-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`;
  const totalPax = adults + children;

  const bookingRecord = {
    id: 'bus-web-' + Date.now(),
    booking_id: bookingId,
    service_id: 'bus-ticket-booking',
    service_title: `Bus: ${route}`,
    customer_name: name,
    mobile: mobile,
    email: email,
    whatsapp_number: mobile,
    travel_date: date,
    pickup_location: `${boarding} | Timing: ${timing}`,
    passengers: totalPax,
    vehicle_type: `${coach} | Departure: ${timing}`,
    estimated_amount: estFare,
    amount_paid: 0,
    balance_amount: estFare,
    booking_status: 'Under Review',
    payment_status: 'Not Paid',
    special_requirements: `${notes ? notes + ' | ' : ''}Seats: ${totalPax} (${adults} Adults, ${children} Children). Address: ${address || 'N/A'}`,
    created_at: new Date().toISOString()
  };

  try {
    const rawB = localStorage.getItem('arn_service_bookings');
    const existingB = rawB ? JSON.parse(rawB) : [];
    existingB.unshift(bookingRecord);
    localStorage.setItem('arn_service_bookings', JSON.stringify(existingB));

    const rawG = localStorage.getItem('arn_booking_guests');
    const existingG = rawG ? JSON.parse(rawG) : [];
    passengers.forEach(p => {
      existingG.push({
        id: 'pax-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        booking_id: bookingId,
        guest_type: p.guest_type,
        guest_index: p.guest_index,
        full_name: p.full_name,
        age: p.age,
        gender: p.gender || 'Male'
      });
    });
    localStorage.setItem('arn_booking_guests', JSON.stringify(existingG));

    if (docs.length > 0) {
      const rawD = localStorage.getItem('arn_booking_documents');
      const existingD = rawD ? JSON.parse(rawD) : [];
      docs.forEach(d => {
        existingD.push({
          id: 'doc-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
          booking_id: bookingId,
          document_type: d.document_type,
          file_name: d.file_name,
          file_url: d.file_url,
          file_size: d.file_size
        });
      });
      localStorage.setItem('arn_booking_documents', JSON.stringify(existingD));
    }
  } catch (err) { }

  try {
    if (window.supabaseClient) {
      await window.supabaseClient.from('service_bookings').insert([bookingRecord]);
      if (passengers.length > 0) {
        await window.supabaseClient.from('booking_guests').insert(
          passengers.map(p => ({
            booking_id: bookingId,
            guest_type: p.guest_type,
            guest_index: p.guest_index,
            full_name: p.full_name,
            age: p.age,
            gender: p.gender || 'Male'
          }))
        );
      }
      if (docs.length > 0) {
        await window.supabaseClient.from('booking_documents').insert(
          docs.map(d => ({
            booking_id: bookingId,
            document_type: d.document_type,
            file_name: d.file_name,
            file_url: d.file_url,
            file_size: d.file_size
          }))
        );
      }
    }
  } catch (dbErr) { }

  if (window.ArnRealtimeSync) {
    window.ArnRealtimeSync.publish('bookings', 'new_booking', bookingRecord);
  }

  document.getElementById('busBookingForm').classList.add('d-none');
  const sBox = document.getElementById('busSuccessBox');
  sBox.classList.remove('d-none');

  document.getElementById('busSuccessBookingId').textContent = bookingId;
  document.getElementById('busSuccessRoute').textContent = route;
  document.getElementById('busSuccessTiming').textContent = `${date} at ${timing}`;
  document.getElementById('busSuccessPax').textContent = `${totalPax} Seats (${coach})`;

  let paxListText = passengers.map(p => `• PAX ${p.guest_index}: ${p.full_name} (${p.age} yrs${p.gender ? ', ' + p.gender : ''})`).join('\n');
  const waMsg = `*Namaste! New Bus Ticket Reservation*\n\n*Booking ID:* ${bookingId}\n*Customer:* ${name}\n*Mobile:* ${mobile}\n*Route:* ${route}\n*Journey Date:* ${date}\n*Departure Timing:* ${timing}\n*Coach Type:* ${coach}\n*Boarding Point:* ${boarding}\n*Seats Count:* ${totalPax}\n\n*Passenger Names:*\n${paxListText}\n\n*Total Amount:* ₹${estFare.toLocaleString('en-IN')}\n*Notes:* ${notes || 'None'}\n\nPlease confirm seat numbers and ticket boarding pass.`;
  document.getElementById('busSuccessWaBtn').href = `https://wa.me/919010515341?text=${encodeURIComponent(waMsg)}`;
}

function sendBusBookingViaWhatsApp() {
  const route = document.getElementById('busRouteSelect')?.value || 'Hyderabad ↔ Arunachalam';
  const date = document.getElementById('busTravelDate')?.value || 'Upcoming Date';
  const timing = document.getElementById('busTimingSelect')?.value || 'Evening Trip';
  const coach = document.getElementById('busCoachType')?.value || 'AC Sleeper';
  const name = document.getElementById('busContactName')?.value.trim() || 'Passenger';
  const mobile = document.getElementById('busContactMobile')?.value.trim() || '';
  const adults = document.getElementById('busAdultsCount')?.value || 2;

  const waMsg = `*Namaste! Bus Ticket Booking Enquiry*\n\n*Name:* ${name}\n*Mobile:* ${mobile}\n*Route:* ${route}\n*Date:* ${date}\n*Timing:* ${timing}\n*Coach:* ${coach}\n*Seats:* ${adults}\n\nPlease share available seats and ticket pricing.`;
  window.open(`https://wa.me/919010515341?text=${encodeURIComponent(waMsg)}`, '_blank');
}

/* --------------------------------------------------------------------------
   3. BIKE RENTAL BOOKING HANDLERS
   -------------------------------------------------------------------------- */
function openBikeBookingModal(preferredPackage = '') {
  const modalEl = document.getElementById('bikeBookingModal');
  if (!modalEl) {
    window.location.href = `enquiry.html?service=Bike%20Rentals${preferredPackage ? '&package=' + encodeURIComponent(preferredPackage) : ''}`;
    return;
  }

  const form = document.getElementById('bikeBookingForm');
  const successBox = document.getElementById('bikeSuccessBox');
  if (form) {
    form.reset();
    form.classList.remove('d-none');
  }
  if (successBox) successBox.classList.add('d-none');

  // Set default pickup datetime to tomorrow 7:00 AM
  const pInput = document.getElementById('bikePickupDateTime');
  if (pInput) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(7, 0, 0, 0);
    pInput.value = d.toISOString().slice(0, 16);
  }

  // Preselect package if matching
  if (preferredPackage) {
    const pSelect = document.getElementById('bikePackageSelect');
    if (pSelect) {
      for (let i = 0; i < pSelect.options.length; i++) {
        if (pSelect.options[i].value.toLowerCase().includes(preferredPackage.toLowerCase()) ||
          preferredPackage.toLowerCase().includes(pSelect.options[i].value.toLowerCase())) {
          pSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  autoCalculateBikeReturn();
  calculateBikeFare();

  // Initialize document uploader with mandatory Driving Licence
  if (typeof BookingDocUploader === 'function') {
    window.bikeDocContainer_uploader = new BookingDocUploader('bikeDocContainer', 'bike-rentals', {
      title: 'Rider Driving Licence & ID Proof',
      description: 'Mandatory: Upload valid Driving Licence (required for handover) & Govt ID. Max 5 MB.',
      mandatory: true,
      docTypes: ['Driving Licence', 'Aadhaar Card', 'Passport', 'Voter ID']
    });
  }

  const bsModal = (typeof bootstrap !== 'undefined' && bootstrap.Modal)
    ? (bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl))
    : null;
  if (bsModal) bsModal.show();
}

function autoCalculateBikeReturn() {
  const pInput = document.getElementById('bikePickupDateTime');
  const rInput = document.getElementById('bikeReturnDateTime');
  const pSelect = document.getElementById('bikePackageSelect');
  if (!pInput || !rInput || !pInput.value) return;

  const dt = new Date(pInput.value);
  if (isNaN(dt.getTime())) return;

  const pkgVal = pSelect ? pSelect.value : '';
  let addHours = 6;
  if (pkgVal.includes('12 Hours')) addHours = 12;
  else if (pkgVal.includes('24 Hours') || pkgVal.includes('Full Day')) addHours = 24;

  dt.setHours(dt.getHours() + addHours);
  rInput.value = dt.toISOString().slice(0, 16);
}

function calculateBikeFare() {
  const pSelect = document.getElementById('bikePackageSelect');
  const cInput = document.getElementById('bikeCount');
  const fareEl = document.getElementById('bikeEstTotal');
  if (!pSelect || !fareEl) return;

  const opt = pSelect.options[pSelect.selectedIndex];
  const rate = parseFloat(opt?.dataset.rate || 300);
  const count = parseInt(cInput?.value) || 1;

  const total = rate * count;
  fareEl.textContent = '₹' + total.toLocaleString('en-IN');
}

async function submitBikeBooking(e) {
  e.preventDefault();
  const pkg = document.getElementById('bikePackageSelect').value;
  const model = document.getElementById('bikeModelSelect').value;
  const count = parseInt(document.getElementById('bikeCount').value) || 1;
  const pickupDt = document.getElementById('bikePickupDateTime').value;
  const returnDt = document.getElementById('bikeReturnDateTime').value;
  const pickupLoc = document.getElementById('bikePickupLocation').value;
  const returnLoc = document.getElementById('bikeReturnLocation').value;
  const riderName = document.getElementById('bikeRiderName').value.trim();
  const riderAge = parseInt(document.getElementById('bikeRiderAge').value) || 25;
  const helmets = document.getElementById('bikeHelmets').value;
  const mobile = document.getElementById('bikeRiderMobile').value.trim();
  const email = document.getElementById('bikeRiderEmail').value.trim();
  const address = document.getElementById('bikeRiderAddress').value.trim();
  const notes = document.getElementById('bikeNotes').value.trim();
  const estTotal = parseFloat(document.getElementById('bikeEstTotal').textContent.replace(/[^0-9]/g, '')) || 300;

  if (!riderName || !mobile || !pickupDt) {
    alert('Please fill in Rider Full Name, Mobile Number, and Pickup Date & Time.');
    return;
  }

  if (riderAge < 18) {
    alert('Rider must be at least 18 years old to rent a two-wheeler.');
    return;
  }

  // Validate identification documents (Mandatory)
  if (window.bikeDocContainer_uploader && !window.bikeDocContainer_uploader.validate()) {
    alert('Driving Licence / Identification Document is mandatory. Please upload your Driving Licence before proceeding.');
    return;
  }

  const docs = window.bikeDocContainer_uploader ? window.bikeDocContainer_uploader.getDocuments() : [];
  const hasDL = docs.some(d => (d.document_type || '').toLowerCase().includes('licen'));
  if (!hasDL) {
    alert('A valid Driving Licence is mandatory for two-wheeler rentals. Please select "Driving Licence" as document type and upload your DL.');
    return;
  }

  const bookingId = `ARN-BIKE-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`;

  const bookingRecord = {
    id: 'bike-web-' + Date.now(),
    booking_id: bookingId,
    service_id: 'bike-rentals',
    service_title: `Bike Rental: ${model} (${pkg})`,
    customer_name: riderName,
    mobile: mobile,
    email: email,
    whatsapp_number: mobile,
    travel_date: pickupDt ? pickupDt.slice(0, 10) : new Date().toISOString().split('T')[0],
    pickup_location: `${pickupLoc} → ${returnLoc}`,
    passengers: count,
    vehicle_type: `${model} | ${pkg} | Helmets: ${helmets}`,
    estimated_amount: estTotal,
    amount_paid: 0,
    balance_amount: estTotal,
    booking_status: 'Confirmed',
    payment_status: 'Pending',
    special_requirements: `${notes ? notes + ' | ' : ''}Pickup: ${pickupDt} | Return: ${returnDt} | Rider Age: ${riderAge} | Address: ${address || 'N/A'}`,
    created_at: new Date().toISOString()
  };

  try {
    const rawB = localStorage.getItem('arn_service_bookings');
    const existingB = rawB ? JSON.parse(rawB) : [];
    existingB.unshift(bookingRecord);
    localStorage.setItem('arn_service_bookings', JSON.stringify(existingB));

    // Save rider guest record
    const rawG = localStorage.getItem('arn_booking_guests');
    const existingG = rawG ? JSON.parse(rawG) : [];
    existingG.push({
      id: 'rider-' + Date.now(),
      booking_id: bookingId,
      guest_type: 'adult',
      guest_index: 1,
      full_name: riderName,
      age: riderAge,
      gender: 'Male'
    });
    localStorage.setItem('arn_booking_guests', JSON.stringify(existingG));

    if (docs.length > 0) {
      const rawD = localStorage.getItem('arn_booking_documents');
      const existingD = rawD ? JSON.parse(rawD) : [];
      docs.forEach(d => {
        existingD.push({
          id: 'doc-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
          booking_id: bookingId,
          document_type: d.document_type,
          file_name: d.file_name,
          file_url: d.file_url,
          file_size: d.file_size
        });
      });
      localStorage.setItem('arn_booking_documents', JSON.stringify(existingD));
    }
  } catch (err) { }

  try {
    if (window.supabaseClient) {
      await window.supabaseClient.from('service_bookings').insert([bookingRecord]);
      await window.supabaseClient.from('booking_guests').insert([{
        booking_id: bookingId,
        guest_type: 'adult',
        guest_index: 1,
        full_name: riderName,
        age: riderAge,
        gender: 'Male'
      }]);
      if (docs.length > 0) {
        await window.supabaseClient.from('booking_documents').insert(
          docs.map(d => ({
            booking_id: bookingId,
            document_type: d.document_type,
            file_name: d.file_name,
            file_url: d.file_url,
            file_size: d.file_size
          }))
        );
      }
    }
  } catch (dbErr) { }

  if (window.ArnRealtimeSync) {
    window.ArnRealtimeSync.publish('bookings', 'new_booking', bookingRecord);
  }

  document.getElementById('bikeBookingForm').classList.add('d-none');
  const sBox = document.getElementById('bikeSuccessBox');
  sBox.classList.remove('d-none');

  document.getElementById('bikeSuccessBookingId').textContent = bookingId;
  document.getElementById('bikeSuccessModel').textContent = `${count} x ${model}`;
  document.getElementById('bikeSuccessDuration').textContent = pkg;
  document.getElementById('bikeSuccessPickup').textContent = `${pickupDt.replace('T', ' ')} at ${pickupLoc}`;

  const waMsg = `*Namaste! New Bike Rental Reservation*\n\n*Booking ID:* ${bookingId}\n*Rider:* ${riderName} (${riderAge} yrs)\n*Mobile:* ${mobile}\n*Vehicle:* ${count} x ${model}\n*Package:* ${pkg}\n*Pickup Time:* ${pickupDt}\n*Return Time:* ${returnDt}\n*Pickup Spot:* ${pickupLoc}\n*Helmets:* ${helmets}\n*Total Fare:* ₹${estTotal.toLocaleString('en-IN')}\n\nPlease keep the bike ready with helmets. Om Namah Shivaya!`;
  document.getElementById('bikeSuccessWaBtn').href = `https://wa.me/919010515341?text=${encodeURIComponent(waMsg)}`;
}

function sendBikeBookingViaWhatsApp() {
  const pkg = document.getElementById('bikePackageSelect')?.value || '6 Hours Rental (₹300)';
  const model = document.getElementById('bikeModelSelect')?.value || 'Honda Activa 6G';
  const pickupDt = document.getElementById('bikePickupDateTime')?.value || 'Tomorrow Morning';
  const riderName = document.getElementById('bikeRiderName')?.value.trim() || 'Rider';
  const mobile = document.getElementById('bikeRiderMobile')?.value.trim() || '';

  const waMsg = `*Namaste! Bike Rental Booking Enquiry*\n\n*Name:* ${riderName}\n*Mobile:* ${mobile}\n*Bike Model:* ${model}\n*Package:* ${pkg}\n*Pickup Time:* ${pickupDt}\n\nPlease confirm bike availability and rental booking.`;
  window.open(`https://wa.me/919010515341?text=${encodeURIComponent(waMsg)}`, '_blank');
}

/* --------------------------------------------------------------------------
   4. TAXI & CAR RENTAL BOOKING HANDLERS
   -------------------------------------------------------------------------- */
function openTaxiBookingModal(preferredVehicle = '') {
  const modalEl = document.getElementById('taxiBookingModal');
  if (!modalEl) {
    window.location.href = `enquiry.html?service=Taxi%20%26%20Car%20Rentals${preferredVehicle ? '&vehicle=' + encodeURIComponent(preferredVehicle) : ''}`;
    return;
  }

  const form = document.getElementById('publicTaxiBookingForm');
  const successBox = document.getElementById('pubTaxiSuccessBox');
  if (form) {
    form.reset();
    form.classList.remove('d-none');
  }
  if (successBox) successBox.classList.add('d-none');

  const dtInput = document.getElementById('pubTaxiDateTime');
  if (dtInput) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(7, 0, 0, 0);
    dtInput.value = d.toISOString().slice(0, 16);
  }

  if (preferredVehicle) {
    const vSelect = document.getElementById('pubTaxiVehicle');
    if (vSelect) {
      for (let i = 0; i < vSelect.options.length; i++) {
        if (vSelect.options[i].value.toLowerCase().includes(preferredVehicle.toLowerCase()) ||
          preferredVehicle.toLowerCase().includes(vSelect.options[i].value.toLowerCase())) {
          vSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  updatePubTaxiFare();

  // Document uploader
  if (typeof BookingDocUploader === 'function') {
    window.taxiDocContainer_uploader = new BookingDocUploader('taxiDocContainer', 'taxi-car-rentals', {
      title: 'Passenger Identification Document',
      description: 'Mandatory: Upload Govt ID for driver verification & passenger trip manifest. Max 5 MB.',
      mandatory: true,
      docTypes: ['Aadhaar Card', 'Driving Licence', 'Passport', 'PAN Card', 'Other Govt ID']
    });
  }

  const bsModal = (typeof bootstrap !== 'undefined' && bootstrap.Modal)
    ? (bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl))
    : null;
  if (bsModal) bsModal.show();
}

function updatePubTaxiFare() {
  const vSelect = document.getElementById('pubTaxiVehicle');
  const tSelect = document.getElementById('pubTaxiTripType');
  const fareEl = document.getElementById('pubTaxiEstFare');
  if (!vSelect || !fareEl) return;

  const vOpt = vSelect.options[vSelect.selectedIndex];
  const tOpt = tSelect ? tSelect.options[tSelect.selectedIndex] : null;

  let baseRate = parseFloat(vOpt?.dataset.rate || 2800);
  let fare = baseRate;

  if (tOpt) {
    if (tOpt.dataset.fixed) {
      fare = parseFloat(tOpt.dataset.fixed);
      if (vOpt.value.includes('Sedan')) fare -= 1000;
      if (vOpt.value.includes('Tempo')) fare += 2000;
    } else if (tOpt.dataset.mul) {
      fare = Math.round(baseRate * parseFloat(tOpt.dataset.mul));
    }
  }

  fareEl.textContent = '₹' + fare.toLocaleString('en-IN');
}

async function submitPublicTaxiBooking(e) {
  e.preventDefault();
  const name = document.getElementById('pubTaxiName').value.trim();
  const mobile = document.getElementById('pubTaxiMobile').value.trim();
  const email = document.getElementById('pubTaxiEmail')?.value.trim() || '';
  const address = document.getElementById('pubTaxiAddress')?.value.trim() || '';
  const vehicle = document.getElementById('pubTaxiVehicle').value;
  const tripType = document.getElementById('pubTaxiTripType').value;
  const dateTime = document.getElementById('pubTaxiDateTime').value;
  const pax = parseInt(document.getElementById('pubTaxiPax').value) || 4;
  const pickup = document.getElementById('pubTaxiPickup').value.trim();
  const drop = document.getElementById('pubTaxiDrop').value.trim();
  const notes = document.getElementById('pubTaxiNotes').value.trim();
  const estFare = document.getElementById('pubTaxiEstFare').textContent.replace(/[^0-9]/g, '') || '2800';

  if (!name || !mobile) {
    alert('Please enter your Name and Mobile Number.');
    return;
  }

  // Validate identification documents (Mandatory)
  if (window.taxiDocContainer_uploader && !window.taxiDocContainer_uploader.validate()) {
    alert('Passenger Identification Document is mandatory. Please upload valid Govt ID proof before proceeding.');
    return;
  }

  const docs = window.taxiDocContainer_uploader ? window.taxiDocContainer_uploader.getDocuments() : [];
  const bookingId = `ARN-TAXI-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`;
  const travelDate = dateTime ? dateTime.slice(0, 10) : new Date().toISOString().split('T')[0];

  const bookingRecord = {
    id: 'taxi-web-' + Date.now(),
    booking_id: bookingId,
    service_id: 'taxi-car-rentals',
    service_title: `Taxi: ${vehicle}`,
    customer_name: name,
    mobile: mobile,
    email: email,
    whatsapp_number: mobile,
    travel_date: travelDate,
    pickup_location: drop ? `${pickup} → ${drop}` : pickup,
    passengers: pax,
    vehicle_type: `${tripType} | ${vehicle}`,
    estimated_amount: parseFloat(estFare) || 2800,
    amount_paid: 0,
    balance_amount: parseFloat(estFare) || 2800,
    booking_status: 'Confirmed',
    payment_status: 'Pending',
    special_requirements: `${notes ? notes + ' | ' : ''}Address: ${address || 'N/A'}`,
    created_at: new Date().toISOString()
  };

  try {
    const raw = localStorage.getItem('arn_service_bookings');
    const existing = raw ? JSON.parse(raw) : [];
    existing.unshift(bookingRecord);
    localStorage.setItem('arn_service_bookings', JSON.stringify(existing));

    const rawG = localStorage.getItem('arn_booking_guests');
    const existingG = rawG ? JSON.parse(rawG) : [];
    existingG.push({
      id: 'taxi-lead-' + Date.now(),
      booking_id: bookingId,
      guest_type: 'adult',
      guest_index: 1,
      full_name: name,
      age: 30,
      gender: 'Male'
    });
    localStorage.setItem('arn_booking_guests', JSON.stringify(existingG));

    if (docs.length > 0) {
      const rawD = localStorage.getItem('arn_booking_documents');
      const existingD = rawD ? JSON.parse(rawD) : [];
      docs.forEach(d => {
        existingD.push({
          id: 'doc-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
          booking_id: bookingId,
          document_type: d.document_type,
          file_name: d.file_name,
          file_url: d.file_url,
          file_size: d.file_size
        });
      });
      localStorage.setItem('arn_booking_documents', JSON.stringify(existingD));
    }
  } catch (err) { }

  try {
    if (window.supabaseClient) {
      await window.supabaseClient.from('service_bookings').insert([bookingRecord]);
      await window.supabaseClient.from('booking_guests').insert([{
        booking_id: bookingId,
        guest_type: 'adult',
        guest_index: 1,
        full_name: name,
        age: 30,
        gender: 'Male'
      }]);
      if (docs.length > 0) {
        await window.supabaseClient.from('booking_documents').insert(
          docs.map(d => ({
            booking_id: bookingId,
            document_type: d.document_type,
            file_name: d.file_name,
            file_url: d.file_url,
            file_size: d.file_size
          }))
        );
      }
    }
  } catch (err) {
    console.warn('Supabase taxi booking sync fallback to local storage:', err);
  }

  if (window.ArnRealtimeSync) {
    window.ArnRealtimeSync.publish('bookings', 'new_booking', bookingRecord);
  }

  document.getElementById('publicTaxiBookingForm').classList.add('d-none');
  const sBox = document.getElementById('pubTaxiSuccessBox');
  sBox.classList.remove('d-none');

  document.getElementById('pubSuccessBookingId').textContent = bookingId;
  document.getElementById('pubSuccessVehicle').textContent = vehicle;
  document.getElementById('pubSuccessDate').textContent = dateTime ? dateTime.replace('T', ' ') : travelDate;

  const waMsg = `*Namaste! New Taxi Booking Reservation*\n\n*Booking ID:* ${bookingId}\n*Customer:* ${name}\n*Mobile:* ${mobile}\n*Vehicle:* ${vehicle}\n*Trip:* ${tripType}\n*Date & Time:* ${dateTime}\n*Pickup:* ${pickup}\n*Drop:* ${drop || 'As discussed'}\n*Passengers:* ${pax}\n*Est. Fare:* ₹${estFare}\n\nPlease confirm my vehicle and driver details. Om Namah Shivaya!`;
  document.getElementById('pubSuccessWaBtn').href = `https://wa.me/919010515341?text=${encodeURIComponent(waMsg)}`;
}

function sendTaxiBookingViaWhatsApp() {
  const name = document.getElementById('pubTaxiName')?.value.trim() || 'Devotee';
  const mobile = document.getElementById('pubTaxiMobile')?.value.trim() || '';
  const vehicle = document.getElementById('pubTaxiVehicle')?.value || 'Ertiga';
  const tripType = document.getElementById('pubTaxiTripType')?.value || 'Local Trip';
  const dateTime = document.getElementById('pubTaxiDateTime')?.value || '';
  const pickup = document.getElementById('pubTaxiPickup')?.value.trim() || 'Tiruvannamalai';
  const drop = document.getElementById('pubTaxiDrop')?.value.trim() || '';
  const estFare = document.getElementById('pubTaxiEstFare')?.textContent || '₹2,800';

  const waMsg = `*Namaste! Taxi Booking Enquiry*\n\n*Name:* ${name}\n*Mobile:* ${mobile}\n*Vehicle:* ${vehicle}\n*Trip:* ${tripType}\n*Pickup Time:* ${dateTime}\n*Pickup Location:* ${pickup}\n*Drop Location:* ${drop}\n*Tariff:* ${estFare}\n\nPlease confirm availability and details.`;
  window.open(`https://wa.me/919010515341?text=${encodeURIComponent(waMsg)}`, '_blank');
}

// Global exports
window.openDarshanBookingModal = openDarshanBookingModal;
window.onDarshanCountsChanged = onDarshanCountsChanged;
window.calculateDarshanFare = calculateDarshanFare;
window.copyDevotee1ToContact = copyDevotee1ToContact;
window.submitDarshanBooking = submitDarshanBooking;
window.sendDarshanBookingViaWhatsApp = sendDarshanBookingViaWhatsApp;

window.openBusBookingModal = openBusBookingModal;
window.onBusRouteChange = onBusRouteChange;
window.onBusCountsChanged = onBusCountsChanged;
window.calculateBusFare = calculateBusFare;
window.copyPassenger1ToContact = copyPassenger1ToContact;
window.submitBusBooking = submitBusBooking;
window.sendBusBookingViaWhatsApp = sendBusBookingViaWhatsApp;

window.openBikeBookingModal = openBikeBookingModal;
window.autoCalculateBikeReturn = autoCalculateBikeReturn;
window.calculateBikeFare = calculateBikeFare;
window.submitBikeBooking = submitBikeBooking;
window.sendBikeBookingViaWhatsApp = sendBikeBookingViaWhatsApp;

window.openTaxiBookingModal = openTaxiBookingModal;
window.updatePubTaxiFare = updatePubTaxiFare;
window.submitPublicTaxiBooking = submitPublicTaxiBooking;
window.sendTaxiBookingViaWhatsApp = sendTaxiBookingViaWhatsApp;

