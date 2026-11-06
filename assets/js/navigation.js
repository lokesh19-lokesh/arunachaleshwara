/* ============================================================
   ARUNACHALESHWARA – Navigation Component
   Injects shared header & footer into every page
   ============================================================ */

const NAV_CONFIG = {
  phone: '9010515341',
  phoneFormatted: '+91 90105 15341',
  email: 'arunachalatoursandtravels@gmail.com',
  whatsapp: '919010515341',
  location: 'Avulpet Bypass, Tiruvannamalai',
  facebook: '#',
  instagram: '#',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.0!2d79.0747!3d12.2253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTiruvannamalai!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin'
};

const NAV_LINKS = [
  { text: 'Home', href: 'index.html', id: 'home' },
  { text: 'About Us', href: 'about.html', id: 'about' },
  { text: 'Services', href: 'services.html', id: 'services' },
  { text: 'Tour Packages', href: 'tour-packages.html', id: 'tour-packages' },
  { text: 'Gallery', href: 'gallery.html', id: 'gallery' },
  { text: 'Contact Us', href: 'contact.html', id: 'contact' }
];

/**
 * Get the current page identifier from the filename
 */
function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  if (filename === 'index.html' || filename === '') return 'home';
  if (filename.startsWith('service-details')) return 'services';
  if (filename.startsWith('tour-details')) return 'tour-packages';
  if (filename.startsWith('enquiry')) return 'contact';
  return filename.replace('.html', '');
}

/**
 * Generate the top information bar HTML
 */
function getTopBarHTML() {
  return `
  <div class="top-bar">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-8 col-md-7">
          <div class="top-info">
            <span class="top-info-item">
              <i class="bi bi-geo-alt-fill"></i>
              <span>${NAV_CONFIG.location}</span>
            </span>
            <a href="tel:+91${NAV_CONFIG.phone}" class="top-info-item">
              <i class="bi bi-telephone-fill"></i>
              <span>${NAV_CONFIG.phoneFormatted}</span>
            </a>
            <a href="mailto:${NAV_CONFIG.email}" class="top-info-item d-none-mobile d-none d-md-flex">
              <i class="bi bi-envelope-fill"></i>
              <span>${NAV_CONFIG.email}</span>
            </a>
          </div>
        </div>
        <div class="col-lg-4 col-md-5">
          <div class="social-links justify-content-md-end justify-content-center d-flex">
            <a href="${NAV_CONFIG.facebook}" aria-label="Facebook" target="_blank" rel="noopener"><i class="bi bi-facebook"></i></a>
            <a href="${NAV_CONFIG.instagram}" aria-label="Instagram" target="_blank" rel="noopener"><i class="bi bi-instagram"></i></a>
            <a href="https://wa.me/${NAV_CONFIG.whatsapp}" aria-label="WhatsApp" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * Generate the main navbar HTML
 */
function getNavbarHTML() {
  const currentPage = getCurrentPage();
  const navLinksHTML = NAV_LINKS.map(link => {
    const activeClass = link.id === currentPage ? ' active' : '';
    return `<li class="nav-item">
      <a class="nav-link${activeClass}" href="${link.href}">${link.text}</a>
    </li>`;
  }).join('');

  return `
  <nav class="navbar navbar-expand-lg main-navbar" id="mainNavbar">
    <div class="container">
      <a class="navbar-brand-wrapper" href="index.html">
        <img src="assets/logo.png" alt="Arunachaleshwara Tours & Travels Logo" class="brand-logo-img">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav align-items-lg-center gap-lg-1">
          ${navLinksHTML}
          <li class="nav-item">
            <a class="nav-link btn-enquire-nav" href="enquiry.html">
              <i class="bi bi-send-fill"></i> Enquire Now
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>`;
}

/**
 * Generate the footer HTML
 */
function getFooterHTML() {
  const currentYear = new Date().getFullYear();
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="row g-4">
        <!-- Brand Column -->
        <div class="col-lg-4 col-md-6">
          <div class="footer-brand">
            <a href="index.html">
              <img src="assets/logo.png" alt="Arunachaleshwara Tours & Travels" class="footer-logo-img">
            </a>
            <p>Your trusted pilgrimage travel partner in Tiruvannamalai. We provide comfortable accommodation, temple darshan services, transportation, and customized tour packages for a peaceful spiritual journey.</p>
            <div class="footer-social">
              <a href="${NAV_CONFIG.facebook}" aria-label="Facebook" target="_blank" rel="noopener"><i class="bi bi-facebook"></i></a>
              <a href="${NAV_CONFIG.instagram}" aria-label="Instagram" target="_blank" rel="noopener"><i class="bi bi-instagram"></i></a>
              <a href="https://wa.me/${NAV_CONFIG.whatsapp}" aria-label="WhatsApp" target="_blank" rel="noopener"><i class="bi bi-whatsapp"></i></a>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-lg-2 col-md-6 col-6">
          <h5 class="footer-heading">Quick Links</h5>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="tour-packages.html">Tour Packages</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="enquiry.html">Travel Enquiry</a></li>
          </ul>
        </div>

        <!-- Our Services -->
        <div class="col-lg-3 col-md-6 col-6">
          <h5 class="footer-heading">Our Services</h5>
          <ul class="footer-links">
            <li><a href="service-details.html?id=accommodation">Accommodation</a></li>
            <li><a href="service-details.html?id=temple-darshan">Temple Darshan</a></li>
            <li><a href="service-details.html?id=taxi-car-rentals">Taxi & Car Rentals</a></li>
            <li><a href="service-details.html?id=bus-ticket-booking">Bus Tickets</a></li>
            <li><a href="service-details.html?id=train-ticket-booking">Train Tickets</a></li>
            <li><a href="service-details.html?id=temple-tour-packages">Tour Packages</a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="col-lg-3 col-md-6">
          <h5 class="footer-heading">Contact Info</h5>
          <ul class="footer-contact">
            <li>
              <i class="bi bi-geo-alt-fill"></i>
              <span>${NAV_CONFIG.location}, Tamil Nadu, India</span>
            </li>
            <li>
              <i class="bi bi-telephone-fill"></i>
              <a href="tel:+91${NAV_CONFIG.phone}">${NAV_CONFIG.phoneFormatted}</a>
            </li>
            <li>
              <i class="bi bi-envelope-fill"></i>
              <a href="mailto:${NAV_CONFIG.email}">${NAV_CONFIG.email}</a>
            </li>
            <li>
              <i class="bi bi-whatsapp"></i>
              <a href="https://wa.me/${NAV_CONFIG.whatsapp}" target="_blank" rel="noopener">Chat on WhatsApp</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="row align-items-center">
          <div class="col-lg-7 text-center text-lg-start mb-2 mb-lg-0">
            <p class="mb-0">
              &copy; ${currentYear} Arunachaleshwara Tours &amp; Travels. All rights reserved.
              <span class="d-inline-block ms-1">
                | Design by <a href="https://thebubblesmedia.com/" target="_blank" rel="noopener" class="bubbles-media-link" title="The Bubbles Media">
                  <span class="bubbles-text">The Bubbles Media</span>
                  <span class="bubbles-container" aria-hidden="true">
                    <span class="bubble b1"></span>
                    <span class="bubble b2"></span>
                    <span class="bubble b3"></span>
                    <span class="bubble b4"></span>
                    <span class="bubble b5"></span>
                    <span class="bubble b6"></span>
                    <span class="bubble b7"></span>
                    <span class="bubble b8"></span>
                  </span>
                </a>
              </span>
            </p>
          </div>
          <div class="col-lg-5 text-center text-lg-end">
            <p class="mb-0">
              <a href="privacy-policy.html">Privacy Policy</a>
              <span class="mx-2">|</span>
              <a href="terms-and-conditions.html">Terms &amp; Conditions</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp Button -->
  <a href="https://wa.me/${NAV_CONFIG.whatsapp}?text=Hello!%20I%20would%20like%20to%20enquire%20about%20your%20travel%20services." class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
    <i class="bi bi-whatsapp"></i>
  </a>

  <!-- Back to Top -->
  <button class="back-to-top" id="backToTop" aria-label="Back to top">
    <i class="bi bi-arrow-up"></i>
  </button>`;
}

/**
 * Initialize navigation - inject header and footer
 */
function initNavigation() {
  // Ensure header has sticky-top & site-header class
  const header = document.querySelector('header');
  if (header) {
    header.classList.add('site-header', 'sticky-top');
  }

  // Inject top bar
  const topBarTarget = document.getElementById('topBar');
  if (topBarTarget) {
    topBarTarget.innerHTML = getTopBarHTML();
  }

  // Inject navbar
  const navbarTarget = document.getElementById('mainNav');
  if (navbarTarget) {
    navbarTarget.innerHTML = getNavbarHTML();
  }

  // Inject footer
  const footerTarget = document.getElementById('siteFooter');
  if (footerTarget) {
    footerTarget.innerHTML = getFooterHTML();
  }

  // Initialize sticky navbar
  initStickyNavbar();

  // Initialize back to top
  initBackToTop();

  // Initialize bubbles animation on footer branding
  initBubbleEffect();
}

/**
 * Sticky navbar on scroll (always visible & never hidden)
 */
function initStickyNavbar() {
  const header = document.querySelector('header') || document.querySelector('.site-header');
  const navbar = document.getElementById('mainNavbar');
  if (!navbar && !header) return;

  const handleScroll = () => {
    const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    if (scrollPos > 25) {
      if (header) header.classList.add('scrolled');
      if (navbar) navbar.classList.add('scrolled');
    } else {
      if (header) header.classList.remove('scrolled');
      if (navbar) navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run immediately in case page reloads mid-scroll
}

/**
 * Back to top button
 */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Interactive bubble animation on hover for The Bubbles Media link
 */
function initBubbleEffect() {
  const links = document.querySelectorAll('.bubbles-media-link');
  if (!links.length) return;

  links.forEach(link => {
    let spawnInterval = null;

    const createDynamicBubble = (clientX, clientY) => {
      const rect = link.getBoundingClientRect();
      const bubble = document.createElement('span');
      bubble.className = 'dynamic-bubble';

      // Randomize size between 7px and 20px
      const size = Math.floor(Math.random() * 14) + 7;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;

      // Horizontal position
      let x;
      if (typeof clientX === 'number' && clientX >= rect.left && clientX <= rect.right) {
        x = clientX - rect.left + (Math.random() * 16 - 8);
      } else {
        x = Math.random() * rect.width;
      }
      x = Math.max(2, Math.min(rect.width - 2, x));

      bubble.style.left = `${x}px`;
      bubble.style.bottom = `${rect.height * 0.3}px`;

      // Randomize drift, rise and duration
      const drift = (Math.random() * 36 - 18).toFixed(1);
      const rise = (Math.random() * 40 + 45).toFixed(1);
      const duration = (Math.random() * 0.6 + 1.2).toFixed(2);

      bubble.style.setProperty('--drift', `${drift}px`);
      bubble.style.setProperty('--rise', `-${rise}px`);
      bubble.style.animation = `dynamicBubbleRise ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;

      link.appendChild(bubble);

      setTimeout(() => {
        if (bubble && bubble.parentNode) {
          bubble.remove();
        }
      }, duration * 1000 + 50);
    };

    link.addEventListener('mouseenter', (e) => {
      // Spawn burst of initial bubbles
      for (let i = 0; i < 3; i++) {
        setTimeout(() => createDynamicBubble(e.clientX, e.clientY), i * 70);
      }
      // Continue spawning while hovered
      if (!spawnInterval) {
        spawnInterval = setInterval(() => {
          createDynamicBubble();
        }, 150);
      }
    });

    link.addEventListener('mousemove', (e) => {
      if (Math.random() > 0.45) {
        createDynamicBubble(e.clientX, e.clientY);
      }
    });

    link.addEventListener('mouseleave', () => {
      if (spawnInterval) {
        clearInterval(spawnInterval);
        spawnInterval = null;
      }
    });

    // Touch support for mobile devices
    link.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createDynamicBubble(touch ? touch.clientX : undefined, touch ? touch.clientY : undefined);
        }, i * 80);
      }
    }, { passive: true });
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initNavigation);

