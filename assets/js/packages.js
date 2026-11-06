/* ============================================================
   ARUNACHALESHWARA – Tour Packages Data & Rendering
   ============================================================ */

const PACKAGES_DATA = [
  {
    id: 'tiruvannamalai-local',
    title: 'Tiruvannamalai Local Temples',
    category: 'Local Temple Tours',
    duration: '1 Day',
    durationDays: 1,
    image: 'assets/images/popup.png',
    shortDesc: 'Visit the sacred Arunachaleswarar Temple and other prominent temples in and around Tiruvannamalai.',
    overview: 'Explore the spiritual heart of Tiruvannamalai with our local temple tour. Visit the magnificent Arunachaleswarar Temple, one of the Pancha Bhootha Sthalams, along with other ancient and revered temples in the area. Experience the divine atmosphere and rich heritage of this holy city.',
    places: [
      'Arunachaleswarar Temple',
      'Ramana Maharshi Ashram',
      'Seshadri Swamigal Ashram',
      'Skandashramam',
      'Virupaksha Cave',
      'Sathanur Dam (Optional)',
      'Girivalam Path'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Tiruvannamalai Temple Tour',
        description: 'Morning visit to Arunachaleswarar Temple for darshan. Proceed to Ramana Maharshi Ashram and Seshadri Swamigal Ashram. After lunch, visit Skandashramam and Virupaksha Cave on Arunachala Hill. Evening Girivalam (optional) or visit to nearby attractions.'
      }
    ],
    inclusions: [
      'Local transportation (Auto/Car)',
      'Temple visit guidance',
      'Pickup and drop from your accommodation',
      'Route planning and scheduling'
    ],
    exclusions: [
      'Accommodation',
      'Meals and refreshments',
      'Temple donation and pooja charges',
      'Personal expenses',
      'Special darshan tickets (if applicable)'
    ],
    importantInfo: [
      'Temple timings may vary on festival days',
      'Dress code applies at temples – modest traditional attire recommended',
      'Photography may be restricted inside temple sanctums',
      'Comfortable walking shoes recommended for hill visits'
    ],
    featured: true
  },
  {
    id: 'kanchipuram-temple-tour',
    title: 'Kanchipuram Temple Tour',
    category: 'Tamil Nadu Temple Tours',
    duration: '1–2 Days',
    durationDays: 2,
    image: 'assets/images/packages/kanchipuram.jpg',
    shortDesc: 'Explore the ancient temples of Kanchipuram, the City of Thousand Temples and one of India\'s seven sacred cities.',
    overview: 'Kanchipuram, known as the City of Thousand Temples, is one of the seven sacred cities of India. This tour takes you through the magnificent Pallava and Chola-era temples, including the famous Ekambareswarar Temple and Kailasanathar Temple. Experience the architectural grandeur and spiritual significance of this ancient city.',
    places: [
      'Ekambareswarar Temple',
      'Kailasanathar Temple',
      'Kamakshi Amman Temple',
      'Varadharaja Perumal Temple',
      'Devarajaswami Temple',
      'Kanchi Kudil Heritage House'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Kanchipuram Temples',
        description: 'Depart from Tiruvannamalai early morning. Visit Ekambareswarar Temple (Pancha Bhootha Sthalam – Earth element). Proceed to Kailasanathar Temple and Kamakshi Amman Temple. After lunch, visit Varadharaja Perumal Temple and explore the silk weaving heritage.'
      },
      {
        day: 'Day 2',
        title: 'Extended Exploration (Optional)',
        description: 'Visit remaining temples and explore the city at a leisurely pace. Visit Kanchi Kudil heritage house. Shop for the famous Kanchipuram silk sarees. Return to Tiruvannamalai.'
      }
    ],
    inclusions: [
      'Comfortable vehicle (Ertiga/Innova)',
      'Experienced driver',
      'Pickup and drop from Tiruvannamalai',
      'Route planning and temple visit schedule'
    ],
    exclusions: [
      'Accommodation in Kanchipuram',
      'Meals and refreshments',
      'Temple donations and pooja charges',
      'Shopping expenses',
      'Personal expenses'
    ],
    importantInfo: [
      'Distance from Tiruvannamalai: Approximately 140 km',
      'Travel time: About 3–3.5 hours one way',
      'Early morning departure recommended',
      'Comfortable walking shoes advised'
    ],
    featured: true
  },
  {
    id: 'vellore-temple-tour',
    title: 'Vellore Temple Tour',
    category: 'Tamil Nadu Temple Tours',
    duration: '1 Day',
    durationDays: 1,
    image: 'assets/images/packages/vellore.jpg',
    shortDesc: 'Visit the stunning Golden Temple (Sripuram) and the historic Jalakandeswarar Temple in Vellore.',
    overview: 'Discover the spiritual splendor of Vellore with visits to the world-famous Sripuram Golden Temple, one of the most magnificent temples in India, and the historic Jalakandeswarar Temple inside Vellore Fort. This day trip offers a perfect blend of modern grandeur and ancient heritage.',
    places: [
      'Sripuram Golden Temple',
      'Jalakandeswarar Temple (Vellore Fort)',
      'Vellore Fort & Museum',
      'Assumption Cathedral Church'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Vellore Sightseeing',
        description: 'Morning departure from Tiruvannamalai. Visit the magnificent Sripuram Golden Temple – walk through the beautifully landscaped pathway to the golden-covered shrine. After lunch, visit Vellore Fort and the ancient Jalakandeswarar Temple inside the fort complex. Return to Tiruvannamalai by evening.'
      }
    ],
    inclusions: [
      'Comfortable vehicle for the trip',
      'Experienced driver',
      'Pickup and drop from your location in Tiruvannamalai',
      'Route guidance'
    ],
    exclusions: [
      'Meals and refreshments',
      'Temple donations',
      'Entry fees (if any)',
      'Personal expenses'
    ],
    importantInfo: [
      'Distance from Tiruvannamalai: Approximately 80 km',
      'Travel time: About 2 hours one way',
      'Sripuram Golden Temple has specific visiting hours – check before visit',
      'Mobile phones and cameras may be restricted inside some temple areas'
    ],
    featured: true
  },
  {
    id: 'pancha-bhootha-linga-yatra',
    title: 'Pancha Bhootha Linga Yatra',
    category: 'Pancha Bhootha Linga Yatra',
    duration: '5–7 Days',
    durationDays: 7,
    image: 'assets/images/packages/pancha-bhootha.jpg',
    shortDesc: 'The sacred pilgrimage to all five Pancha Bhootha Sthalams representing the five elements of nature.',
    overview: 'Embark on one of the most sacred Shaivite pilgrimages – the Pancha Bhootha Linga Yatra. Visit all five ancient temples representing the five elements of nature: Earth, Water, Fire, Air, and Space. This comprehensive tour covers temples across Tamil Nadu and Andhra Pradesh, offering a deeply spiritual and transformative experience.',
    places: [
      'Ekambareswarar Temple, Kanchipuram (Earth – Prithvi)',
      'Jambukeswarar Temple, Thiruvanaikaval (Water – Appu)',
      'Arunachaleswarar Temple, Tiruvannamalai (Fire – Agni)',
      'Srikalahasti Temple, Srikalahasti (Air – Vayu)',
      'Chidambaram Nataraja Temple, Chidambaram (Space – Akasha)'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Tiruvannamalai – Fire Element',
        description: 'Begin the yatra at Arunachaleswarar Temple in Tiruvannamalai, representing the Fire element (Agni Lingam). Special darshan and pooja. Evening Girivalam (optional).'
      },
      {
        day: 'Day 2',
        title: 'Kanchipuram – Earth Element',
        description: 'Travel to Kanchipuram. Visit Ekambareswarar Temple representing the Earth element (Prithvi Lingam). Explore other temples in Kanchipuram.'
      },
      {
        day: 'Day 3',
        title: 'Thiruvanaikaval – Water Element',
        description: 'Travel to Thiruvanaikaval near Trichy. Visit Jambukeswarar Temple representing the Water element (Appu Lingam). The natural spring inside the sanctum is a unique sight.'
      },
      {
        day: 'Day 4',
        title: 'Chidambaram – Space Element',
        description: 'Travel to Chidambaram. Visit the Nataraja Temple representing the Space element (Akasha Lingam). Witness the famous Chidambaram Rahasyam.'
      },
      {
        day: 'Day 5',
        title: 'Srikalahasti – Air Element',
        description: 'Travel to Srikalahasti in Andhra Pradesh. Visit the Srikalahasti Temple representing the Air element (Vayu Lingam). The flickering lamp inside the sanctum, unaffected by wind, is the evidence of the Air element. Return journey.'
      }
    ],
    inclusions: [
      'Comfortable A/C vehicle throughout the tour',
      'Experienced driver familiar with temple routes',
      'Pickup and drop from Tiruvannamalai',
      'Tour planning and scheduling assistance',
      'Basic travel guidance at each temple'
    ],
    exclusions: [
      'Accommodation at each destination',
      'Meals and refreshments',
      'Temple donations and special pooja charges',
      'Entry fees or special darshan tickets',
      'Personal expenses and shopping',
      'Interstate toll charges (shared or additional)'
    ],
    importantInfo: [
      'This is a multi-day pilgrimage covering approximately 1200+ km',
      'Accommodation can be arranged at each stop upon request',
      'Flexible itinerary – can be customized based on your schedule',
      'Early morning departures recommended for temple timings',
      'Modest traditional attire required at all temples',
      'The yatra can be completed in 5–7 days depending on pace'
    ],
    featured: true
  },
  {
    id: 'tamil-nadu-temple-tours',
    title: 'Tamil Nadu Temple Tours',
    category: 'Tamil Nadu Temple Tours',
    duration: '3–5 Days',
    durationDays: 5,
    image: 'assets/images/packages/tamilnadu-temples.jpg',
    shortDesc: 'Comprehensive temple tours across Tamil Nadu covering major pilgrim centers and heritage sites.',
    overview: 'Explore the magnificent temple heritage of Tamil Nadu with our comprehensive temple tours. Visit iconic temples in Madurai, Rameswaram, Thanjavur, Trichy, and more. Each tour can be customized based on your interests, time, and the temples you wish to visit.',
    places: [
      'Meenakshi Amman Temple, Madurai',
      'Ramanathaswamy Temple, Rameswaram',
      'Brihadeeswarar Temple, Thanjavur',
      'Ranganathaswamy Temple, Srirangam',
      'Rock Fort Temple, Trichy',
      'Shore Temple, Mahabalipuram',
      'And many more sacred sites'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Departure & First Destination',
        description: 'Depart from Tiruvannamalai. The itinerary will be customized based on the selected temples and route. Our team will help plan the optimal route for your pilgrimage.'
      },
      {
        day: 'Day 2–4',
        title: 'Temple Visits',
        description: 'Visit temples as per the customized schedule. Each day planned with comfortable travel, temple darshan time, and rest. Accommodation arranged at each stopover.'
      },
      {
        day: 'Day 5',
        title: 'Return Journey',
        description: 'Final temple visits and return journey to Tiruvannamalai. The tour can be extended or shortened based on your requirements.'
      }
    ],
    inclusions: [
      'Comfortable A/C vehicle for the entire tour',
      'Professional and experienced driver',
      'Pickup and drop from Tiruvannamalai',
      'Customized route planning',
      'Travel guidance and temple information'
    ],
    exclusions: [
      'Accommodation',
      'Meals and refreshments',
      'Temple donations and pooja charges',
      'Special darshan tickets',
      'Toll charges and parking fees',
      'Personal expenses'
    ],
    importantInfo: [
      'Tour duration and route are fully customizable',
      'Contact us to discuss your preferred temples and schedule',
      'Accommodation can be arranged at each destination',
      'Group discounts available for larger parties',
      'Comfortable vehicles with experienced drivers provided'
    ],
    featured: true
  },
  {
    id: 'weekend-pilgrimage',
    title: 'Weekend Pilgrimage Special',
    category: 'Weekend Pilgrimage',
    duration: '2 Days',
    durationDays: 2,
    image: 'assets/images/packages/weekend.jpg',
    shortDesc: 'A short weekend pilgrimage covering Tiruvannamalai and nearby sacred temples.',
    overview: 'Perfect for those with limited time, our weekend pilgrimage package covers the most important temples in and around Tiruvannamalai. Spend a spiritually enriching weekend visiting ancient temples, performing Girivalam, and soaking in the divine atmosphere of this holy town.',
    places: [
      'Arunachaleswarar Temple',
      'Girivalam Path',
      'Ramana Maharshi Ashram',
      'Sathanur Dam',
      'Nearby Temples'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival & Temple Darshan',
        description: 'Arrive in Tiruvannamalai. Visit Arunachaleswarar Temple for darshan. Explore the ashrams. Evening – Girivalam (circumambulation of Arunachala Hill).'
      },
      {
        day: 'Day 2',
        title: 'Exploration & Departure',
        description: 'Morning temple visit. Explore nearby attractions like Sathanur Dam. Visit additional temples as per interest. Departure by evening.'
      }
    ],
    inclusions: [
      'Local transportation',
      'Temple visit guidance',
      'Pickup from bus stand/railway station',
      'Sightseeing arrangements'
    ],
    exclusions: [
      'Accommodation',
      'Meals',
      'Temple donations',
      'Personal expenses'
    ],
    importantInfo: [
      'Ideal for Friday evening to Sunday evening trips',
      'Accommodation can be arranged separately',
      'Best during Pournami (Full Moon) for Girivalam',
      'Customizable based on interests'
    ],
    featured: false
  },
  {
    id: 'customized-pilgrimage',
    title: 'Customized Pilgrimage',
    category: 'Customized Pilgrimage',
    duration: 'Flexible',
    durationDays: 0,
    image: 'assets/images/packages/custom.jpg',
    shortDesc: 'Create your own personalized pilgrimage itinerary. We plan everything according to your preferences.',
    overview: 'Every pilgrim\'s journey is unique. Our customized pilgrimage service lets you design your own spiritual tour. Tell us which temples you want to visit, your preferred dates, group size, and budget, and we will create a tailor-made itinerary with all travel and accommodation arrangements.',
    places: [
      'Any temples of your choice across South India',
      'Jyotirlinga temples',
      'Divya Desam temples',
      'Shakti Peetha temples',
      'Navagraha temples',
      'And any other sacred destinations'
    ],
    itinerary: [
      {
        day: 'Step 1',
        title: 'Share Your Requirements',
        description: 'Tell us your preferred temples, travel dates, group size, and any special requirements. We will create a customized itinerary for you.'
      },
      {
        day: 'Step 2',
        title: 'Review & Confirm',
        description: 'Review the proposed itinerary, travel arrangements, and accommodation options. Suggest any changes until you are satisfied.'
      },
      {
        day: 'Step 3',
        title: 'Enjoy Your Pilgrimage',
        description: 'Sit back and enjoy a hassle-free spiritual journey while we take care of all the logistics.'
      }
    ],
    inclusions: [
      'Customized route planning',
      'Vehicle as per group size and preference',
      'Experienced driver',
      'Pickup and drop service',
      'Travel assistance throughout the trip'
    ],
    exclusions: [
      'Accommodation (can be arranged on request)',
      'Meals',
      'Temple donations and pooja expenses',
      'Personal expenses',
      'Entry fees and special darshan charges'
    ],
    importantInfo: [
      'Contact us at least 3–5 days before your planned travel date',
      'Share your complete requirements for the best itinerary',
      'Flexible pricing based on destinations and duration',
      'Special arrangements for elderly and differently-abled pilgrims',
      'Group packages available with discounted rates'
    ],
    featured: false
  }
];

const PACKAGE_CATEGORIES = [
  'All',
  'Local Temple Tours',
  'Tamil Nadu Temple Tours',
  'Pancha Bhootha Linga Yatra',
  'Weekend Pilgrimage',
  'Customized Pilgrimage'
];

/**
 * Render a single tour card (grid view)
 */
function renderTourCard(pkg, index) {
  const delay = (index % 4) * 100;
  const imageMarkup = (pkg.image && pkg.image.includes('popup.png'))
    ? `<img src="${pkg.image}" alt="${pkg.title}" style="height: 220px; width: 100%; object-fit: cover;">`
    : `<div class="placeholder-img" style="height: 220px; background: linear-gradient(135deg, #F5EBDD 0%, #FFF9EF 50%, #F5EBDD 100%);">
         <i class="bi bi-geo-alt-fill" style="font-size: 3rem; color: var(--clr-primary); opacity: 0.3;"></i>
       </div>`;

  return `
  <div class="col-lg-4 col-md-6 mb-4 tour-card-wrapper" data-category="${pkg.category}" data-duration="${pkg.durationDays}" data-aos="fade-up" data-aos-delay="${delay}">
    <div class="tour-card">
      <div class="tour-card-img">
        ${imageMarkup}
        <span class="tour-card-badge">${pkg.category}</span>
      </div>
      <div class="tour-card-body">
        <h5>${pkg.title}</h5>
        <p>${pkg.shortDesc}</p>
        <div class="tour-card-meta">
          <span><i class="bi bi-clock"></i> ${pkg.duration}</span>
          <span><i class="bi bi-geo-alt"></i> ${pkg.places.length} Places</span>
        </div>
        <div class="tour-card-footer">
          <span class="tour-card-price">
            <small>Contact for pricing</small>
          </span>
          <a href="tour-details.html?id=${pkg.id}" class="btn btn-primary-custom btn-sm">
            View Details <i class="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * Render tour list item (list view)
 */
function renderTourListItem(pkg, index) {
  const imageMarkup = (pkg.image && pkg.image.includes('popup.png'))
    ? `<img src="${pkg.image}" alt="${pkg.title}" style="height: 100%; min-height: 200px; width: 100%; object-fit: cover;">`
    : `<div class="placeholder-img" style="height: 100%; min-height: 200px; background: linear-gradient(135deg, #F5EBDD 0%, #FFF9EF 50%, #F5EBDD 100%);">
        <i class="bi bi-geo-alt-fill" style="font-size: 3rem; color: var(--clr-primary); opacity: 0.3;"></i>
      </div>`;

  return `
  <div class="tour-list-item tour-card-wrapper" data-category="${pkg.category}" data-duration="${pkg.durationDays}" data-aos="fade-up">
    <div class="tour-list-item-img">
      ${imageMarkup}
    </div>
    <div class="tour-list-item-body">
      <span class="tour-card-badge d-inline-block mb-2" style="position: static;">${pkg.category}</span>
      <h5>${pkg.title}</h5>
      <p>${pkg.shortDesc}</p>
      <div class="tour-card-meta">
        <span><i class="bi bi-clock"></i> ${pkg.duration}</span>
        <span><i class="bi bi-geo-alt"></i> ${pkg.places.length} Places</span>
      </div>
      <a href="tour-details.html?id=${pkg.id}" class="btn btn-primary-custom btn-sm">
        View Details <i class="bi bi-arrow-right"></i>
      </a>
    </div>
  </div>`;
}

/**
 * Render all packages with filtering
 */
function renderPackagesPage() {
  const gridContainer = document.getElementById('packagesGrid');
  const listContainer = document.getElementById('packagesList');
  if (!gridContainer) return;

  // Render grid view
  gridContainer.innerHTML = `<div class="row">${PACKAGES_DATA.map((p, i) => renderTourCard(p, i)).join('')}</div>`;

  // Render list view
  if (listContainer) {
    listContainer.innerHTML = PACKAGES_DATA.map((p, i) => renderTourListItem(p, i)).join('');
  }

  // Initialize filters
  initPackageFilters();
}

/**
 * Initialize package filtering
 */
function initPackageFilters() {
  // Category filter buttons
  const filterBtns = document.querySelectorAll('.pkg-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterPackages();
    });
  });

  // Search input
  const searchInput = document.getElementById('packageSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => filterPackages());
  }

  // Duration filter
  const durationFilter = document.getElementById('durationFilter');
  if (durationFilter) {
    durationFilter.addEventListener('change', () => filterPackages());
  }

  // View toggle
  const gridViewBtn = document.getElementById('gridViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');
  const gridContainer = document.getElementById('packagesGrid');
  const listContainer = document.getElementById('packagesList');

  if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener('click', () => {
      gridViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
      if (gridContainer) gridContainer.style.display = 'block';
      if (listContainer) listContainer.style.display = 'none';
    });

    listViewBtn.addEventListener('click', () => {
      listViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
      if (gridContainer) gridContainer.style.display = 'none';
      if (listContainer) listContainer.style.display = 'block';
    });
  }
}

/**
 * Filter packages based on current selections
 */
function filterPackages() {
  const activeFilter = document.querySelector('.pkg-filter-btn.active');
  const category = activeFilter ? activeFilter.dataset.category : 'All';
  const searchTerm = (document.getElementById('packageSearch')?.value || '').toLowerCase();
  const durationValue = document.getElementById('durationFilter')?.value || 'all';

  const allCards = document.querySelectorAll('.tour-card-wrapper');
  let visibleCount = 0;

  allCards.forEach(card => {
    const cardCategory = card.dataset.category;
    const cardDuration = parseInt(card.dataset.duration) || 0;
    const cardText = card.textContent.toLowerCase();

    let show = true;

    // Category filter
    if (category !== 'All' && cardCategory !== category) show = false;

    // Search filter
    if (searchTerm && !cardText.includes(searchTerm)) show = false;

    // Duration filter
    if (durationValue !== 'all') {
      if (durationValue === '1' && cardDuration !== 1) show = false;
      if (durationValue === '2-3' && (cardDuration < 2 || cardDuration > 3)) show = false;
      if (durationValue === '5+' && cardDuration < 5) show = false;
    }

    card.style.display = show ? '' : 'none';
    if (show) visibleCount++;
  });

  // Show no results message
  const noResults = document.getElementById('noResultsMsg');
  if (noResults) {
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

/**
 * Render tour details page
 */
function renderTourDetails() {
  const container = document.getElementById('tourDetailContent');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const tourId = urlParams.get('id');

  const tour = PACKAGES_DATA.find(p => p.id === tourId);

  if (!tour) {
    container.innerHTML = `
    <div class="text-center py-5">
      <div class="mb-4">
        <i class="bi bi-exclamation-circle" style="font-size: 4rem; color: var(--clr-gold);"></i>
      </div>
      <h2>Tour Package Not Found</h2>
      <p class="lead-text">The tour package you are looking for does not exist or the link may be incorrect.</p>
      <a href="tour-packages.html" class="btn btn-primary-custom mt-3">
        <i class="bi bi-arrow-left"></i> View All Packages
      </a>
    </div>`;
    document.title = 'Package Not Found – Arunachaleshwara Tours & Travels';
    return;
  }

  // Update page title
  document.title = `${tour.title} – Arunachaleshwara Tours & Travels`;

  // Update hero
  const heroTitle = document.getElementById('tourHeroTitle');
  const heroBreadcrumb = document.getElementById('tourBreadcrumb');
  if (heroTitle) heroTitle.textContent = tour.title;
  if (heroBreadcrumb) heroBreadcrumb.textContent = tour.title;

  container.innerHTML = `
  <div class="row g-4">
    <div class="col-lg-8">
      <!-- Tour Image -->
      <div class="img-overlay-zoom mb-4">
        ${(tour.image && tour.image.includes('popup.png'))
          ? `<img src="${tour.image}" alt="${tour.title}" style="height: 400px; width: 100%; object-fit: cover; border-radius: var(--border-radius-lg);">`
          : `<div class="placeholder-img" style="height: 400px; border-radius: var(--border-radius-lg); background: linear-gradient(135deg, #F5EBDD 0%, #FFF9EF 50%, #F5EBDD 100%);">
              <i class="bi bi-geo-alt-fill" style="font-size: 5rem; color: var(--clr-primary); opacity: 0.3;"></i>
            </div>`
        }
      </div>

      <!-- Tour Meta -->
      <div class="d-flex flex-wrap gap-3 mb-4" data-aos="fade-up">
        <span class="badge bg-cream text-maroon px-3 py-2 rounded-pill" style="font-size: 0.85rem;">
          <i class="bi bi-clock text-gold me-1"></i> ${tour.duration}
        </span>
        <span class="badge bg-cream text-maroon px-3 py-2 rounded-pill" style="font-size: 0.85rem;">
          <i class="bi bi-geo-alt text-gold me-1"></i> ${tour.places.length} Places
        </span>
        <span class="badge bg-cream text-maroon px-3 py-2 rounded-pill" style="font-size: 0.85rem;">
          <i class="bi bi-tag text-gold me-1"></i> ${tour.category}
        </span>
      </div>

      <!-- Overview -->
      <div class="mb-4" data-aos="fade-up">
        <h3 class="mb-3">Overview</h3>
        <div class="gold-divider gold-divider-left"></div>
        <p class="lead-text mt-3">${tour.overview}</p>
      </div>

      <!-- Places Covered -->
      <div class="mb-4" data-aos="fade-up" data-aos-delay="100">
        <h4 class="mb-3"><i class="bi bi-geo-alt text-gold me-2"></i>Places Covered</h4>
        <div class="row g-2">
          ${tour.places.map(place => `
          <div class="col-md-6">
            <div class="d-flex align-items-start gap-2 p-2 bg-cream rounded">
              <i class="bi bi-check-circle-fill text-gold mt-1"></i>
              <span>${place}</span>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Itinerary -->
      <div class="mb-4" data-aos="fade-up" data-aos-delay="200">
        <h4 class="mb-3"><i class="bi bi-calendar-event text-gold me-2"></i>Itinerary</h4>
        <div class="ps-2">
          ${tour.itinerary.map(day => `
          <div class="itinerary-day">
            <h6>${day.day}: ${day.title}</h6>
            <p>${day.description}</p>
          </div>`).join('')}
        </div>
      </div>

      <!-- Inclusions & Exclusions -->
      <div class="row g-4 mb-4" data-aos="fade-up" data-aos-delay="300">
        <div class="col-md-6">
          <div class="p-3 bg-cream rounded-3">
            <h5 class="text-success mb-3"><i class="bi bi-check-circle me-2"></i>Inclusions</h5>
            <ul class="inclusion-list list-unstyled mb-0">
              ${tour.inclusions.map(item => `
              <li><i class="bi bi-check-circle-fill"></i> ${item}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <div class="p-3 bg-cream rounded-3">
            <h5 class="text-maroon mb-3"><i class="bi bi-x-circle me-2"></i>Exclusions</h5>
            <ul class="exclusion-list list-unstyled mb-0">
              ${tour.exclusions.map(item => `
              <li><i class="bi bi-x-circle-fill"></i> ${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>

      <!-- Important Info -->
      <div class="mb-4" data-aos="fade-up" data-aos-delay="400">
        <h4 class="mb-3"><i class="bi bi-info-circle text-gold me-2"></i>Important Information</h4>
        <div class="alert" style="background: var(--clr-cream); border: 1px solid var(--clr-gold); border-radius: var(--border-radius-lg);">
          <ul class="mb-0 ps-3">
            ${tour.importantInfo.map(info => `<li class="mb-1">${info}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="col-lg-4">
      <!-- Booking CTA -->
      <div class="info-card mb-4" data-aos="fade-left" style="position: sticky; top: 100px;">
        <div class="info-card-icon">
          <i class="bi bi-send-fill"></i>
        </div>
        <h5>Book This Tour</h5>
        <p>Interested in the <strong>${tour.title}</strong>? Send us an enquiry for pricing and availability.</p>
        <div class="d-grid gap-2">
          <a href="enquiry.html?destination=${encodeURIComponent(tour.title)}" class="btn btn-primary-custom justify-content-center">
            <i class="bi bi-pencil-square"></i> Send Enquiry
          </a>
          <a href="https://wa.me/${NAV_CONFIG.whatsapp}?text=Hello!%20I%20am%20interested%20in%20the%20${encodeURIComponent(tour.title)}%20package.%20Please%20share%20pricing%20and%20details." class="btn btn-whatsapp justify-content-center" target="_blank" rel="noopener">
            <i class="bi bi-whatsapp"></i> WhatsApp Enquiry
          </a>
          <a href="tel:+91${NAV_CONFIG.phone}" class="btn btn-outline-maroon justify-content-center">
            <i class="bi bi-telephone-fill"></i> Call Now
          </a>
        </div>
      </div>

      <!-- Other Packages -->
      <div class="info-card" data-aos="fade-left" data-aos-delay="100">
        <h5 class="text-start mb-3">Other Packages</h5>
        <ul class="list-unstyled text-start">
          ${PACKAGES_DATA.filter(p => p.id !== tour.id).slice(0, 5).map(p => `
          <li class="mb-2">
            <a href="tour-details.html?id=${p.id}" class="d-flex align-items-center gap-2" style="color: var(--clr-text); font-size: 0.9rem;">
              <i class="bi bi-geo-alt text-gold"></i>
              ${p.title}
            </a>
          </li>`).join('')}
        </ul>
        <a href="tour-packages.html" class="btn btn-outline-gold btn-sm mt-2 w-100 justify-content-center">View All Packages</a>
      </div>
    </div>
  </div>`;
}

/**
 * Render featured packages for homepage (Swiper)
 */
function renderFeaturedPackages(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const featured = PACKAGES_DATA.filter(p => p.featured);
  container.innerHTML = featured.map(pkg => {
    const imageMarkup = (pkg.image && pkg.image.includes('popup.png'))
      ? `<img src="${pkg.image}" alt="${pkg.title}" style="height: 220px; width: 100%; object-fit: cover;">`
      : `<div class="placeholder-img" style="height: 220px; background: linear-gradient(135deg, #F5EBDD 0%, #FFF9EF 50%, #F5EBDD 100%);">
           <i class="bi bi-geo-alt-fill" style="font-size: 3rem; color: var(--clr-primary); opacity: 0.3;"></i>
         </div>`;

    return `
    <div class="swiper-slide">
      <div class="tour-card">
        <div class="tour-card-img">
          ${imageMarkup}
          <span class="tour-card-badge">${pkg.category}</span>
        </div>
        <div class="tour-card-body">
          <h5>${pkg.title}</h5>
          <p>${pkg.shortDesc}</p>
          <div class="tour-card-meta">
            <span><i class="bi bi-clock"></i> ${pkg.duration}</span>
            <span><i class="bi bi-geo-alt"></i> ${pkg.places.length} Places</span>
          </div>
          <div class="tour-card-footer">
            <span class="tour-card-price"><small>Contact for pricing</small></span>
            <a href="tour-details.html?id=${pkg.id}" class="btn btn-primary-custom btn-sm">
              View Details <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
}

// Make functions globally accessible
window.PACKAGES_DATA = PACKAGES_DATA;
window.PACKAGE_CATEGORIES = PACKAGE_CATEGORIES;
window.renderPackagesPage = renderPackagesPage;
window.renderTourDetails = renderTourDetails;
window.renderFeaturedPackages = renderFeaturedPackages;

