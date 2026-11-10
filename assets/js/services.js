/* ============================================================
   ARUNACHALESHWARA – Services Data & Rendering
   ============================================================ */

const SERVICES_DATA = [
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
    id: 'temple-darshan',
    title: 'Temple Darshan Services',
    icon: 'bi-building',
    shortDesc: 'Arunachaleswarar Temple darshan assistance, Girivalam trips, and nearby temple visits.',
    description: 'Experience a hassle-free darshan at the sacred Arunachaleswarar Temple with our dedicated assistance. We help you plan your visit, guide you through the temple complex, and arrange Girivalam (circumambulation of Arunachala Hill) and trips to nearby temples.',
    features: [
      'Arunachaleswarar Temple Darshan',
      'Special Darshan Assistance',
      'Girivalam & Nearby Temple Trips',
      'Temple Visit Planning',
      'Local Guide Assistance',
      'Festival & Special Occasion Visits'
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
    shortDesc: 'All types of bus ticket reservations including sleeper and seater services.',
    description: 'Book your bus tickets easily through our service. We handle reservations for all types of bus services including government and private operators, sleeper coaches, and seater buses to and from Tiruvannamalai.',
    features: [
      'All Types of Bus Tickets',
      'Sleeper & Seater Bus Reservations',
      'Government & Private Bus Bookings',
      'Interstate Bus Services',
      'Advance Booking Assistance',
      'Travel Schedule Information'
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
    shortDesc: 'Two-wheeler rental services for convenient local sightseeing and exploration.',
    description: 'Explore Tiruvannamalai at your own pace with our bike rental service. Rent a two-wheeler for local sightseeing, temple hopping, and exploring the scenic beauty of Arunachala Hills and surrounding areas.',
    features: [
      'Two-Wheeler Rental Services',
      'Local Sightseeing',
      'Self-Ride Options',
      'Well-Maintained Bikes',
      'Flexible Rental Duration',
      'Helmet Provided'
    ],
    image: 'assets/images/gallery/Vehicles4.jpg',
    gallery: [
      'assets/images/gallery/Vehicles4.jpg',
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

  return `
  <div class="col-lg-3 col-md-6 col-sm-6 mb-4" data-aos="fade-up" data-aos-delay="${delay}">
    <div class="service-card">
      <div class="service-card-media">
        <div class="${imgWrapClass}">
          ${imageMarkup}
        </div>
        <div class="service-card-icon">
          <i class="bi ${service.icon}"></i>
        </div>
      </div>
      <div class="service-card-body">
        <h5>${service.title}</h5>
        <p>${service.shortDesc}</p>
        <a href="service-details.html?id=${service.id}" class="btn btn-outline-maroon btn-sm">
          View Details <i class="bi bi-arrow-right"></i>
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

  container.innerHTML = SERVICES_DATA.map((s, i) => renderServiceCard(s, i)).join('');
}

/**
 * Render full service details page content
 */
function renderServiceDetails() {
  const container = document.getElementById('serviceDetailContent');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('id');

  const service = SERVICES_DATA.find(s => s.id === serviceId);

  if (!service) {
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
    // Update page title
    document.title = 'Service Not Found – Arunachaleshwara Tours & Travels';
    return;
  }

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
          ${service.features.map(f => `
          <div class="col-md-6">
            <div class="d-flex align-items-start gap-2">
              <i class="bi bi-check-circle-fill text-gold mt-1"></i>
              <span>${f}</span>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Gallery -->
      <div class="mb-4" data-aos="fade-up" data-aos-delay="200">
        <h4 class="mb-3">Gallery</h4>
        <div class="row g-3">
          ${(service.gallery || []).map(imgSrc => {
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
      </div>
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

// Global exports
window.SERVICES_DATA = SERVICES_DATA;
window.renderServiceCard = renderServiceCard;
window.renderServicesGrid = renderServicesGrid;
window.renderServiceDetails = renderServiceDetails;
