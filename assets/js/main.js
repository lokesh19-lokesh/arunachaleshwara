/* ============================================================
   ARUNACHALESHWARA – Main Application Entry
   Global initialization and utilities
   ============================================================ */

/**
 * Remove any preloader immediately so navigation never blocks on white screen
 */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.remove();
  }
}

/**
 * Preload linked internal pages on hover/touch over HTTP(S) for instant transitions
 */
function initLinkPrefetch() {
  if (!window.location.protocol.startsWith('http')) return;
  const prefetched = new Set();

  const prefetchUrl = (url) => {
    if (!url || prefetched.has(url)) return;
    prefetched.add(url);
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  };

  document.addEventListener('pointerover', (e) => {
    const anchor = e.target.closest('a[href]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('http') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:') &&
      href.endsWith('.html')
    ) {
      prefetchUrl(href);
    }
  }, { passive: true });
}

/**
 * Initialize all global components
 */
function initApp() {
  initPreloader();

  const onReady = () => {
    initPreloader();
    initLinkPrefetch();

    // Initialize animations
    if (typeof initAOS === 'function') initAOS();
    if (typeof initSmoothScroll === 'function') initSmoothScroll();
    if (typeof initScrollReveal === 'function') initScrollReveal();
    if (typeof initLazyLoading === 'function') initLazyLoading();

    // Initialize swipers & lightbox right after page-specific DOMContentLoaded renderers
    setTimeout(() => {
      if (typeof initSwipers === 'function') initSwipers();
      if (typeof initLightbox === 'function') initLightbox();
      if (typeof AOS !== 'undefined') AOS.refresh();
    }, 0);
  };

  if (document.readyState === 'complete') {
    onReady();
  } else {
    document.addEventListener('DOMContentLoaded', onReady);
  }

  // Handle back/forward cache restoration cleanly
  window.addEventListener('pageshow', () => {
    initPreloader();
  });
}

// Run
initApp();

