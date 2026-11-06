/* ============================================================
   ARUNACHALESHWARA – Gallery Data & Rendering
   ============================================================ */

const GALLERY_DATA = [
  { id: 1, category: 'temples', title: 'Arunachaleswarar Temple Gopuram', icon: 'bi-building' },
  { id: 2, category: 'temples', title: 'Arunachaleswarar Temple Entrance', icon: 'bi-building' },
  { id: 3, category: 'temples', title: 'Temple Corridor', icon: 'bi-building' },
  { id: 4, category: 'temples', title: 'Sacred Nandi Statue', icon: 'bi-building' },
  { id: 5, category: 'temples', title: 'Girivalam Path', icon: 'bi-building' },
  { id: 6, category: 'temples', title: 'Temple Festival', icon: 'bi-building' },
  { id: 7, category: 'travel', title: 'Arunachala Hills Sunrise', icon: 'bi-sunrise' },
  { id: 8, category: 'travel', title: 'Pilgrims on Girivalam', icon: 'bi-people' },
  { id: 9, category: 'travel', title: 'Scenic Route to Kanchipuram', icon: 'bi-signpost' },
  { id: 10, category: 'travel', title: 'Arunachala Hill View', icon: 'bi-mountain' },
  { id: 11, category: 'accommodation', title: 'Comfortable Guest Room', icon: 'bi-house-door' },
  { id: 12, category: 'accommodation', title: 'Family Room Setup', icon: 'bi-house-door' },
  { id: 13, category: 'accommodation', title: 'Clean & Hygienic Facilities', icon: 'bi-house-door' },
  { id: 14, category: 'vehicles', title: 'Toyota Innova for Tours', icon: 'bi-car-front' },
  { id: 15, category: 'vehicles', title: 'Maruti Ertiga Rental', icon: 'bi-car-front' },
  { id: 16, category: 'vehicles', title: 'Comfortable Bus Service', icon: 'bi-bus-front' },
  { id: 17, category: 'vehicles', title: 'Local Auto Service', icon: 'bi-truck' },
  { id: 18, category: 'pilgrimage', title: 'Devotees at Temple', icon: 'bi-people' },
  { id: 19, category: 'pilgrimage', title: 'Evening Aarti Ceremony', icon: 'bi-lamp' },
  { id: 20, category: 'pilgrimage', title: 'Full Moon Girivalam', icon: 'bi-moon' },
  { id: 21, category: 'pilgrimage', title: 'Karthigai Deepam Festival', icon: 'bi-fire' },
  { id: 22, category: 'temples', title: 'Kanchipuram Temple Visit', icon: 'bi-building' },
  { id: 23, category: 'temples', title: 'Sripuram Golden Temple', icon: 'bi-building' },
  { id: 24, category: 'travel', title: 'Group Tour in Progress', icon: 'bi-people' }
];

const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'temples', label: 'Temple Gallery' },
  { id: 'travel', label: 'Travel Gallery' },
  { id: 'accommodation', label: 'Accommodation' },
  { id: 'vehicles', label: 'Vehicles' },
  { id: 'pilgrimage', label: 'Pilgrimage Experiences' }
];

// Height variations for masonry
const heightVariations = [220, 260, 200, 280, 240, 220, 260, 200, 250, 230, 270, 210];

/**
 * Render gallery items
 */
function renderGalleryGrid(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = GALLERY_DATA.map((item, i) => {
    const height = heightVariations[i % heightVariations.length];
    return `
    <div class="gallery-item gallery-filter-item" data-category="${item.category}" data-aos="fade-up" data-aos-delay="${(i % 6) * 50}">
      <a href="javascript:void(0)" class="glightbox" data-gallery="gallery" data-title="${item.title}">
        <div class="placeholder-img" style="height: ${height}px; background: linear-gradient(${135 + i * 15}deg, #F5EBDD 0%, #FFF9EF 50%, #F5EBDD 100%); border-radius: var(--border-radius-lg);">
          <i class="bi ${item.icon}" style="font-size: 2.5rem; color: var(--clr-primary); opacity: 0.3;"></i>
        </div>
        <div class="gallery-item-overlay">
          <i class="bi bi-zoom-in"></i>
        </div>
      </a>
      <div class="mt-2 px-1">
        <small class="text-muted">${item.title}</small>
      </div>
    </div>`;
  }).join('');
}

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

  // Initialize filter click handlers
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
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = '';
      item.style.opacity = '0';
      setTimeout(() => { item.style.opacity = '1'; }, 50);
    } else {
      item.style.display = 'none';
    }
  });
}

/**
 * Render homepage gallery preview (Swiper slides)
 */
function renderGalleryPreview(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const previewItems = GALLERY_DATA.slice(0, 10);
  container.innerHTML = previewItems.map((item, i) => `
  <div class="swiper-slide">
    <div class="gallery-item" style="margin-bottom: 0;">
      <a href="javascript:void(0)" class="glightbox" data-gallery="home-gallery" data-title="${item.title}">
        <div class="placeholder-img" style="height: 280px; background: linear-gradient(${135 + i * 20}deg, #F5EBDD 0%, #FFF9EF 50%, #F5EBDD 100%); border-radius: var(--border-radius-lg);">
          <i class="bi ${item.icon}" style="font-size: 2.5rem; color: var(--clr-primary); opacity: 0.3;"></i>
        </div>
        <div class="gallery-item-overlay">
          <i class="bi bi-zoom-in"></i>
        </div>
      </a>
    </div>
  </div>`).join('');
}

// Make functions globally accessible
window.GALLERY_DATA = GALLERY_DATA;
window.renderGalleryGrid = renderGalleryGrid;
window.renderGalleryFilters = renderGalleryFilters;
window.renderGalleryPreview = renderGalleryPreview;

