/* ============================================================
   ARUNACHALESHWARA – Main Application Entry
   Global initialization and utilities
   ============================================================ */

/**
 * Run a callback once the homepage preloader is finished (or immediately if skipped)
 */
function afterPreloader(callback) {
  if (typeof callback !== 'function') return;
  if (window.__preloaderDone) {
    callback();
    return;
  }
  window.__preloaderCallbacks = window.__preloaderCallbacks || [];
  window.__preloaderCallbacks.push(callback);
}

function markPreloaderDone() {
  if (window.__preloaderDone) return;
  window.__preloaderDone = true;
  const callbacks = window.__preloaderCallbacks || [];
  window.__preloaderCallbacks = [];
  callbacks.forEach((cb) => {
    try {
      cb();
    } catch (e) {}
  });
}

/**
 * Handle homepage logo preloader (only shown on initial open or homepage reload)
 */
function initPreloader() {
  if (window.__preloaderInitialized) return;
  window.__preloaderInitialized = true;

  const preloader = document.getElementById('preloader');
  if (!preloader) {
    document.documentElement.classList.remove('show-preloader');
    markPreloaderDone();
    return;
  }

  // Only show if <head> script flagged initial website open or explicit homepage reload
  if (!document.documentElement.classList.contains('show-preloader')) {
    preloader.remove();
    markPreloaderDone();
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
      markPreloaderDone();
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
 * Feature-detect discrete display transitions (needed to avoid instant exit on Firefox)
 */
let _supportsDisplayTransition;
function canTransitionDisplay() {
  if (_supportsDisplayTransition !== undefined) return _supportsDisplayTransition;
  if (!window.CSS?.supports?.('transition-behavior', 'allow-discrete') || !document.body) {
    return false;
  }
  const probe = document.createElement('div');
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;';
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = 'none';
  _supportsDisplayTransition = getComputedStyle(probe).display === 'block';
  probe.remove();
  return _supportsDisplayTransition;
}

function supportsTopLayerExit() {
  return Boolean(window.CSS?.supports?.('overlay', 'auto') && canTransitionDisplay());
}

/**
 * Initialize homepage welcome popup modal and sacred Shiva Mantram background audio
 */
function initWelcomePopupAndAudio() {
  if (window.__welcomePopupInitialized) return;
  window.__welcomePopupInitialized = true;

  const dialog = document.getElementById('welcomePopup');
  const closeBtn = document.getElementById('welcomePopupClose');
  const audio = document.getElementById('bgMantramAudio');
  const audioBtn = document.getElementById('audioToggleBtn');
  const audioIcon = document.getElementById('audioToggleIcon');
  const audioLabel = document.getElementById('audioToggleLabel');

  if (!dialog && !audio && !audioBtn) return;

  const updateAudioUI = (isPlaying) => {
    if (!audioBtn) return;
    audioBtn.classList.toggle('is-playing', isPlaying);
    audioBtn.classList.toggle('is-muted', !isPlaying);
    audioBtn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
    audioBtn.setAttribute(
      'aria-label',
      isPlaying ? 'Mute background Shiva Mantram audio' : 'Unmute background Shiva Mantram audio'
    );
    if (audioIcon) {
      audioIcon.className = isPlaying
        ? 'bi bi-volume-up-fill audio-float-icon'
        : 'bi bi-volume-mute-fill audio-float-icon';
    }
    if (audioLabel) {
      audioLabel.textContent = isPlaying ? 'Mute' : 'Unmute';
    }
  };

  const showAudioButton = () => {
    if (audioBtn) audioBtn.classList.add('visible');
  };

  const playMantramAudio = () => {
    if (!audio) return;
    audio.muted = false;
    audio.volume = 0.7;
    try {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === 'function') {
        updateAudioUI(true);
        playPromise
          .then(() => updateAudioUI(!audio.paused && !audio.muted))
          .catch(() => updateAudioUI(false));
      } else {
        updateAudioUI(!audio.paused && !audio.muted);
      }
    } catch (e) {
      updateAudioUI(false);
    }
  };

  const muteMantramAudio = () => {
    if (!audio) return;
    audio.muted = true;
    audio.pause();
    updateAudioUI(false);
  };

  if (audio) {
    audio.addEventListener('play', () => updateAudioUI(!audio.muted));
    audio.addEventListener('pause', () => updateAudioUI(false));
    audio.addEventListener('volumechange', () => updateAudioUI(!audio.paused && !audio.muted));
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (!audio) return;
      if (audio.paused || audio.muted) {
        playMantramAudio();
      } else {
        muteMantramAudio();
      }
    });
  }

  let audioTriggeredOnClose = false;
  const triggerAudioOnPopupDismiss = () => {
    if (audioTriggeredOnClose) return;
    audioTriggeredOnClose = true;
    showAudioButton();
    playMantramAudio();
  };

  const closeWelcomePopup = async (shouldPlayAudio = true) => {
    if (shouldPlayAudio) {
      triggerAudioOnPopupDismiss();
    } else {
      showAudioButton();
    }

    if (!dialog || !dialog.open) return;
    if (dialog.hasAttribute('data-closing')) return;

    if (!supportsTopLayerExit() && typeof dialog.getAnimations === 'function') {
      dialog.setAttribute('data-closing', '');
      const animations = dialog.getAnimations({ subtree: true });
      if (animations.length > 0) {
        await Promise.race([
          Promise.allSettled(animations.map((a) => a.finished)),
          new Promise((r) => setTimeout(r, 400))
        ]);
      }
      if (!dialog.hasAttribute('data-closing')) return;
      dialog.removeAttribute('data-closing');
    }

    if (dialog.open) {
      dialog.close();
    }
  };

  if (dialog) {
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeWelcomePopup(true));
    }

    // Light-dismiss fallback for browsers without native dialog closedby="any" (e.g., Safari)
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const isOutsideDialog = (e) => {
        const rect = dialog.getBoundingClientRect();
        return (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        );
      };
      let pressedOutside = false;
      dialog.addEventListener('pointerdown', (e) => {
        pressedOutside = isOutsideDialog(e);
      });
      dialog.addEventListener('pointerup', (e) => {
        if (pressedOutside && isOutsideDialog(e)) {
          pressedOutside = false;
          closeWelcomePopup(true);
        }
      });
    }

    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      closeWelcomePopup(true);
    });

    dialog.addEventListener('close', () => {
      dialog.returnValue = '';
      dialog.removeAttribute('data-closing');
      triggerAudioOnPopupDismiss();
    });
  }

  // Only open popup on initial website open / homepage reload, never on inner-page redirect
  if (window.__shouldShowWelcomePopup && dialog && typeof dialog.showModal === 'function') {
    afterPreloader(() => {
      if (!dialog || dialog.open) return;
      try {
        dialog.showModal();
      } catch (e) {
        updateAudioUI(false);
        showAudioButton();
      }
    });
  } else {
    updateAudioUI(false);
    showAudioButton();
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
    initWelcomePopupAndAudio();
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
      const dialog = document.getElementById('welcomePopup');
      if (dialog && dialog.open) {
        dialog.removeAttribute('data-closing');
        dialog.close();
      }
    }
  });
}

// Run
initApp();

