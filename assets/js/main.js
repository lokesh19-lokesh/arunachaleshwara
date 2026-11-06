/* ============================================================
   ARUNACHALESHWARA – Main Application Entry
   Global initialization, preloader, and utilities
   ============================================================ */

/**
 * Initialize preloader
 */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.remove(), 400);
      }, 300);
    });
  }
}

/**
 * Page transition effect
 */
function initPageTransition() {
  document.body.classList.add('page-transition');
}

/**
 * Initialize all global components
 */
function initApp() {
  initPreloader();
  initPageTransition();

  // Wait for DOM
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    if (typeof initAOS === 'function') initAOS();
    if (typeof initSmoothScroll === 'function') initSmoothScroll();
    if (typeof initScrollReveal === 'function') initScrollReveal();
    if (typeof initLazyLoading === 'function') initLazyLoading();

    // Initialize swipers (slight delay to ensure DOM is rendered)
    setTimeout(() => {
      if (typeof initSwipers === 'function') initSwipers();
      if (typeof initLightbox === 'function') initLightbox();
    }, 100);
  });
}

// Run
initApp();

