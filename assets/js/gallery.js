/* ============================================================
   ARUNACHALESHWARA TOURS & TRAVELS – Gallery Data & Rendering
   Authentic photography of Tiruvannamalai temple, Girivalam,
   accommodations, fleet, and pilgrimage experiences.
   ============================================================ */

const GALLERY_DATA = [
  // 1. Temples & Darshan
  {
    id: 1,
    categories: ['temples', 'pilgrimage'],
    categoryLabel: 'Temple & Darshan',
    title: 'Arulmigu Arunachaleswarar & Unnamalaiamman',
    description: 'Divine deity darshan of Lord Shiva & Goddess Parvati with the eternal Arunachala Jyoti.',
    image: 'assets/images/gallery/g1.jpg'
  },
  {
    id: 2,
    categories: ['temples', 'pilgrimage'],
    categoryLabel: 'Temple Darshan',
    title: 'Sacred Shiva Lingam with Deepams',
    description: 'Divinely adorned Lingam surrounded by traditional brass lamps, vibhuti, and garlands.',
    image: 'assets/images/gallery/g2.jpg'
  },
  {
    id: 3,
    categories: ['temples'],
    categoryLabel: 'Sanctum Sanctorum',
    title: 'Thiru Annamalaiyar Sannadhi',
    description: 'Sacred sanctum entrance of Lord Arunachaleswarar dating back over a thousand years.',
    image: 'assets/images/gallery/g3.jpg'
  },
  {
    id: 4,
    categories: ['temples', 'travel'],
    categoryLabel: 'Historic Heritage',
    title: 'Historic Panorama of Arunachaleswarar Temple',
    description: 'Majestic bird’s-eye perspective of the 8 Gopurams nestled beneath sacred Mount Arunachala.',
    image: 'assets/images/gallery/g5.jpg'
  },
  {
    id: 5,
    categories: ['temples'],
    categoryLabel: 'Temple Architecture',
    title: 'Ancient Shiva-Parvati Granite Relief',
    description: 'Masterfully sculpted Chola-period stone relief within the temple inner prakaram.',
    image: 'assets/images/gallery/g7.jpg'
  },
  {
    id: 6,
    categories: ['temples', 'travel'],
    categoryLabel: 'Sacred Theertham',
    title: 'Brahma Theertham & Rajagopuram Reflection',
    description: 'The sacred temple tank mirroring the towering 217-foot Eastern Rajagopuram.',
    image: 'assets/images/gallery/g8.jpg'
  },
  {
    id: 7,
    categories: ['temples', 'travel'],
    categoryLabel: 'Dawn Darshan',
    title: 'Misty Golden Dawn over Rajagopuram',
    description: 'Breathtaking sunrise casting a golden spiritual aura over the temple towers.',
    image: 'assets/images/gallery/g11.jpg'
  },
  {
    id: 8,
    categories: ['temples'],
    categoryLabel: 'Murugan Sannadhi',
    title: 'Lord Murugan Sanctum with Floral Alankaram',
    description: 'Sacred shrine of Lord Shanmuga adorned with fresh auspicious flower garlands and deepams.',
    image: 'assets/images/gallery/g12.jpg'
  },
  {
    id: 9,
    categories: ['temples', 'travel'],
    categoryLabel: 'Temple & Hill',
    title: 'Arunachaleshwara Temple & Sacred Hill',
    description: 'The holy hill of Arunachala and the magnificent temple complex.',
    image: 'assets/images/popup.png'
  },

  // 2. Travel & Route
  {
    id: 10,
    categories: ['travel', 'pilgrimage'],
    categoryLabel: 'Travel Guide',
    title: 'Girivalam 14 KM Route & Ashta Lingam Guide',
    description: 'Official route map displaying the 8 Lingams, ashrams, and distance markers along the path.',
    image: 'assets/images/gallery/travel1.jpg'
  },
  {
    id: 11,
    categories: ['travel'],
    categoryLabel: 'City Landmark',
    title: 'Namma Tiruvannamalai Welcome Monument',
    description: 'Iconic civic landmark welcoming thousands of pilgrims entering the holy city.',
    image: 'assets/images/gallery/g10.jpg'
  },

  // 3. Accommodation
  {
    id: 12,
    categories: ['accommodation'],
    categoryLabel: 'Accommodation',
    title: 'Premium Pilgrim Guest Villa',
    description: 'Modern, peaceful 2-story residence offering sanitized, comfortable family rooms in Tiruvannamalai.',
    image: 'assets/images/gallery/Accommodation1.jpeg'
  },
  {
    id: 13,
    categories: ['accommodation', 'travel'],
    categoryLabel: 'Resort Stay',
    title: 'Peaceful Heritage Ashram Cottage Stay',
    description: 'Serene courtyard cottages surrounded by lush greenery, walking distance from Ramanasramam.',
    image: 'assets/images/gallery/Accommodation2.jpg'
  },

  // 4. Vehicles & Fleet
  {
    id: 14,
    categories: ['vehicles', 'travel'],
    categoryLabel: 'Group Fleet',
    title: 'Luxury AC Bus for Group Pilgrimages',
    description: 'Spacious, push-back AC tourist coach for family get-togethers and pilgrim groups.',
    image: 'assets/images/gallery/Vehicles1.jpg'
  },
  {
    id: 15,
    categories: ['vehicles'],
    categoryLabel: 'Local Darshan',
    title: 'Dedicated Auto Fleet for Local Darshan',
    description: 'Reliable, courteous auto rickshaws for door-to-door temple visits and elder passenger support.',
    image: 'assets/images/gallery/Vehicles2.jpg'
  },
  {
    id: 16,
    categories: ['vehicles', 'travel'],
    categoryLabel: 'Tour Vehicle',
    title: 'Open Mahindra Commander for Scenic Routes',
    description: 'Rugged classic vehicle ideal for scenic spiritual trails and mountain drives.',
    image: 'assets/images/gallery/Vehicles3.jpg'
  },
  {
    id: 17,
    categories: ['vehicles'],
    categoryLabel: 'Self-Ride Rental',
    title: 'Two-Wheeler Rental for Girivalam Explorers',
    description: 'Well-maintained, economical scooters for solo devotees and serene mountain exploration.',
    image: 'assets/images/gallery/Vehicles4.jpg'
  },

  // 5. Pilgrimage Experiences & Festivals
  {
    id: 18,
    categories: ['pilgrimage', 'travel'],
    categoryLabel: 'Festival Darshan',
    title: 'Karthigai Deepam Illuminations',
    description: 'Sacred Arunachala Hill and temple gopurams illuminated with festival lighting at dusk.',
    image: 'assets/images/gallery/g4.jpg'
  },
  {
    id: 19,
    categories: ['pilgrimage', 'travel'],
    categoryLabel: 'Sacred Parikrama',
    title: 'Girivalam Sacred Parikrama & Ashta Lingam',
    description: 'Sacred aerial map highlighting the 8 cardinal Shiva Lingams encircling Mount Arunachala.',
    image: 'assets/images/gallery/g6.jpg'
  },
  {
    id: 20,
    categories: ['pilgrimage'],
    categoryLabel: 'Maha Deepam Festival',
    title: 'Karthigai Maha Deepam Holy Gathering',
    description: 'Lakhs of devotees chanting "Annamalaikku Harohara" as the holy flame is lit on the hill peak.',
    image: 'assets/images/gallery/g9.jpg'
  },
  {
    id: 21,
    categories: ['pilgrimage'],
    categoryLabel: 'Ashram Experience',
    title: 'Silent Meditation at Sri Ramanasramam',
    description: 'Pilgrims immersed in serene self-enquiry meditation around an intricate kolam in the Old Hall.',
    image: 'assets/images/gallery/Pilgrimage Experiences1.jpg'
  },
  {
    id: 22,
    categories: ['pilgrimage'],
    categoryLabel: 'Holy Shrine',
    title: 'Bhagavan Ramana Maharshi Samadhi Shrine',
    description: 'The sanctified black granite samadhi shrine radiating tranquil grace and spiritual solace.',
    image: 'assets/images/gallery/Pilgrimage Experiences2.jpg'
  }
];

const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'temples', label: 'Temple Gallery' },
  { id: 'travel', label: 'Travel Gallery' },
  { id: 'accommodation', label: 'Accommodation' },
  { id: 'vehicles', label: 'Vehicles' },
  { id: 'pilgrimage', label: 'Pilgrimage Experiences' }
];

/**
 * Render gallery filter buttons
 */
function renderGalleryFilters(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = GALLERY_CATEGORIES.map(cat => `
    <button class="filter-btn${cat.id === 'all' ? ' active' : ''}" data-filter="${cat.id}">
      ${cat.label}
    </button>
  `).join('');

  // Click handlers
  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterGallery(btn.dataset.filter);
    });
  });
}

/**
 * Filter gallery items by category
 */
function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-filter-item');
  items.forEach(item => {
    const cats = (item.dataset.category || '').split(' ');
    if (category === 'all' || cats.includes(category)) {
      item.style.display = '';
      item.style.opacity = '0';
      setTimeout(() => { item.style.opacity = '1'; }, 30);
    } else {
      item.style.display = 'none';
    }
  });

  if (typeof initLightbox === 'function') {
    setTimeout(initLightbox, 100);
  }
}

/**
 * Render main gallery masonry grid (gallery.html)
 */
function renderGalleryGrid(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = GALLERY_DATA.map((item, i) => {
    const catsStr = Array.isArray(item.categories) ? item.categories.join(' ') : (item.category || '');
    return `
    <div class="gallery-card-wrapper gallery-filter-item" data-category="${catsStr}" data-aos="fade-up" data-aos-delay="${(i % 6) * 50}">
      <div class="gallery-card">
        <a href="${item.image}" class="glightbox" data-gallery="temple-gallery" data-title="${item.title}" data-description="${item.description}">
          <div class="gallery-card-img-wrap">
            <img src="${item.image}" alt="${item.title}" class="gallery-card-img" loading="lazy">
            <div class="gallery-card-overlay">
              <span class="gallery-zoom-badge"><i class="bi bi-arrows-fullscreen"></i></span>
            </div>
            <span class="gallery-badge-top">${item.categoryLabel}</span>
          </div>
          <div class="gallery-card-caption">
            <h6 class="gallery-card-title">${item.title}</h6>
            <p class="gallery-card-desc mb-0">${item.description}</p>
          </div>
        </a>
      </div>
    </div>`;
  }).join('');

  if (typeof initLightbox === 'function') {
    setTimeout(initLightbox, 60);
  }
}

/**
 * Render homepage gallery preview carousel (Swiper slides in index.html)
 */
function renderGalleryPreview(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Curated 12 highlights showcasing temples, darshan, fleet, stays, and festivals
  const featuredIds = [1, 2, 4, 6, 7, 10, 12, 14, 15, 18, 20, 21];
  const previewItems = featuredIds
    .map(id => GALLERY_DATA.find(item => item.id === id))
    .filter(Boolean);

  container.innerHTML = previewItems.map(item => {
    return `
    <div class="swiper-slide">
      <div class="gallery-preview-card">
        <a href="${item.image}" class="glightbox" data-gallery="home-gallery" data-title="${item.title}" data-description="${item.description}">
          <div class="gallery-preview-img-wrap">
            <img src="${item.image}" alt="${item.title}" class="gallery-preview-img" loading="lazy">
            <div class="gallery-preview-overlay">
              <span class="gallery-preview-zoom"><i class="bi bi-arrows-fullscreen"></i></span>
            </div>
            <div class="gallery-preview-gradient"></div>
            <div class="gallery-preview-caption">
              <span class="gallery-preview-badge">${item.categoryLabel}</span>
              <h6 class="gallery-preview-title">${item.title}</h6>
            </div>
          </div>
        </a>
      </div>
    </div>`;
  }).join('');

  if (typeof initLightbox === 'function') {
    setTimeout(initLightbox, 60);
  }
}

// Global exports
window.GALLERY_DATA = GALLERY_DATA;
window.GALLERY_CATEGORIES = GALLERY_CATEGORIES;
window.renderGalleryGrid = renderGalleryGrid;
window.renderGalleryFilters = renderGalleryFilters;
window.renderGalleryPreview = renderGalleryPreview;
window.filterGallery = filterGallery;
