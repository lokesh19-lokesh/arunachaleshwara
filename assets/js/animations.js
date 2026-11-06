/* ============================================================
   ARUNACHALESHWARA – Animations (AOS, Scroll, Swiper Init)
   ============================================================ */

/**
 * Initialize AOS (Animate on Scroll)
 */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      offset: 80,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }
}

/**
 * Initialize Swiper sliders
 */
function initSwipers() {
  // Tour packages slider (homepage)
  const tourSwiperEl = document.querySelector('.tour-swiper');
  if (tourSwiperEl && typeof Swiper !== 'undefined') {
    new Swiper('.tour-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: false,
      navigation: {
        nextEl: '.tour-swiper-next',
        prevEl: '.tour-swiper-prev',
      },
      pagination: {
        el: '.tour-swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 3 }
      }
    });
  }

  // Gallery swiper (homepage)
  const gallerySwiperEl = document.querySelector('.gallery-swiper');
  if (gallerySwiperEl && typeof Swiper !== 'undefined') {
    new Swiper('.gallery-swiper', {
      slidesPerView: 1.25,
      spaceBetween: 14,
      loop: true,
      autoplay: {
        delay: 3200,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      navigation: {
        nextEl: '.gallery-swiper-next',
        prevEl: '.gallery-swiper-prev',
      },
      pagination: {
        el: '.gallery-swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        480: { slidesPerView: 2.1, spaceBetween: 16 },
        768: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 24 }
      }
    });
  }

  // Testimonial swiper
  const testimonialSwiperEl = document.querySelector('.testimonial-swiper');
  if (testimonialSwiperEl && typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.testimonial-swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }
}

let galleryLightboxInstance = null;

/**
 * Initialize GLightbox
 */
function initLightbox() {
  if (typeof GLightbox !== 'undefined') {
    if (galleryLightboxInstance && typeof galleryLightboxInstance.destroy === 'function') {
      galleryLightboxInstance.destroy();
    }
    galleryLightboxInstance = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      closeButton: true,
      svg: {
        close: '<i class="bi bi-x-lg"></i>',
        next: '<i class="bi bi-chevron-right"></i>',
        prev: '<i class="bi bi-chevron-left"></i>',
      }
    });
    window.galleryLightboxInstance = galleryLightboxInstance;
    return galleryLightboxInstance;
  }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/**
 * Initialize scroll reveal for custom animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up, .scale-in');

  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Lazy load images
 */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length === 0) return;

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          img.removeAttribute('data-src');
          img.removeAttribute('data-srcset');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// Make functions globally accessible
window.initAOS = initAOS;
window.initSwipers = initSwipers;
window.initLightbox = initLightbox;
window.initSmoothScroll = initSmoothScroll;
window.initScrollReveal = initScrollReveal;
window.initLazyLoading = initLazyLoading;

