/* ============================================================
   ARUNACHALESHWARA – Main Application Entry
   Global initialization and utilities
   ============================================================ */

/**
 * Handle homepage logo preloader (only shown on initial open or homepage reload)
 */
function initPreloader() {
  if (window.__preloaderInitialized) return;
  window.__preloaderInitialized = true;

  const preloader = document.getElementById('preloader');
  if (!preloader) {
    document.documentElement.classList.remove('show-preloader');
    return;
  }

  // Only show if <head> script flagged initial website open or explicit homepage reload
  if (!document.documentElement.classList.contains('show-preloader')) {
    preloader.remove();
    return;
  }

  let dismissed = false;
  const dismissPreloader = () => {
    if (dismissed) return;
    dismissed = true;
    preloader.classList.add('loaded');
    setTimeout(() => {
      document.documentElement.classList.remove('show-preloader');
      if (preloader.parentNode) preloader.remove();
    }, 450);
  };

  const minDisplayMs = 800;
  const maxWaitMs = 1500;
  const startTime = (window.performance && performance.now) ? performance.now() : Date.now();

  const scheduleDismiss = () => {
    const now = (window.performance && performance.now) ? performance.now() : Date.now();
    const elapsed = now - startTime;
    const remaining = Math.max(0, minDisplayMs - elapsed);
    setTimeout(dismissPreloader, remaining);
  };

  if (document.readyState === 'complete') {
    scheduleDismiss();
  } else {
    window.addEventListener('load', scheduleDismiss, { once: true });
    // Safety timeout so heavy external media (e.g. hero video) never stalls preloader
    setTimeout(dismissPreloader, maxWaitMs);
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
  window.addEventListener('pageshow', (event) => {
    if (event && event.persisted) {
      document.documentElement.classList.remove('show-preloader');
      const preloader = document.getElementById('preloader');
      if (preloader) preloader.remove();
    }
  });
}

// Run
initApp();

