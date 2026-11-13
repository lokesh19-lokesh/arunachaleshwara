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

  let autoStopActive = false;
  let autoStopTimeout = null;

  const clearAutoStop = () => {
    autoStopActive = false;
    if (autoStopTimeout) {
      clearTimeout(autoStopTimeout);
      autoStopTimeout = null;
    }
  };

  const stopAudioAfterTenSeconds = () => {
    clearAutoStop();
    if (!audio) return;
    audio.pause();
    try {
      audio.currentTime = 0;
    } catch (e) {}
    audio.volume = 0.7;
    updateAudioUI(false);
  };

  const playMantramAudio = () => {
    if (!audio) return;
    clearAutoStop();
    audio.muted = false;
    audio.volume = 0.7;
    autoStopActive = true;

    try {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === 'function') {
        updateAudioUI(true);
        playPromise
          .then(() => updateAudioUI(!audio.paused && !audio.muted))
          .catch(() => {
            clearAutoStop();
            updateAudioUI(false);
          });
      } else {
        updateAudioUI(!audio.paused && !audio.muted);
      }
    } catch (e) {
      clearAutoStop();
      updateAudioUI(false);
    }

    // Safety fallback timeout ensuring audio turns off after 10.5 seconds
    autoStopTimeout = setTimeout(() => {
      if (autoStopActive && !audio.paused) {
        stopAudioAfterTenSeconds();
      }
    }, 10500);
  };

  const muteMantramAudio = () => {
    if (!audio) return;
    clearAutoStop();
    audio.muted = true;
    audio.pause();
    updateAudioUI(false);
  };

  if (audio) {
    audio.addEventListener('play', () => updateAudioUI(!audio.muted));
    audio.addEventListener('pause', () => updateAudioUI(false));
    audio.addEventListener('volumechange', () => updateAudioUI(!audio.paused && !audio.muted));

    // Monitor playback: gentle fade-out during 9th-10th second, then auto turn off
    audio.addEventListener('timeupdate', () => {
      if (!autoStopActive) return;
      if (audio.currentTime >= 9.0 && audio.currentTime < 10.0) {
        const remaining = 10.0 - audio.currentTime; // 1.0 down to 0.0
        audio.volume = Math.max(0, Math.min(0.7, 0.7 * remaining));
      } else if (audio.currentTime >= 10.0) {
        stopAudioAfterTenSeconds();
      }
    });

    audio.addEventListener('ended', () => {
      clearAutoStop();
      updateAudioUI(false);
    });
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
 * Interactive Animated Tour Bus Scroll Progress Indicator
 * Moves down and up along the vertical road track mirroring scroll position
 */
function initScrollBus() {
  let track = document.getElementById('scrollBusTrack');
  if (!track && document.body) {
    const aside = document.createElement('aside');
    aside.className = 'scroll-bus-track';
    aside.id = 'scrollBusTrack';
    aside.setAttribute('aria-hidden', 'true');
    aside.title = 'Page Scroll Progress';
    aside.innerHTML = `
      <div class="scroll-bus-road">
        <div class="scroll-bus-road-fill" id="scrollBusRoadFill"></div>
        <div class="scroll-bus-road-line"></div>
      </div>
      <div class="scroll-bus-vehicle" id="scrollBusVehicle">
        <div class="scroll-bus-beam"></div>
        <svg class="scroll-bus-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 46" width="28" height="46" aria-hidden="true">
          <rect x="0" y="8" width="2.2" height="6" rx="1" fill="#0F172A"/>
          <rect x="25.8" y="8" width="2.2" height="6" rx="1" fill="#0F172A"/>
          <rect x="0" y="32" width="2.2" height="6" rx="1" fill="#0F172A"/>
          <rect x="25.8" y="32" width="2.2" height="6" rx="1" fill="#0F172A"/>
          <rect x="0.5" y="6" width="2" height="2" rx="0.5" fill="#FFC908"/>
          <rect x="25.5" y="6" width="2" height="2" rx="0.5" fill="#FFC908"/>
          <rect x="2" y="2" width="24" height="42" rx="6" fill="#45120E" stroke="#FFC908" stroke-width="1.3"/>
          <rect x="6" y="3" width="16" height="3" rx="1" fill="#FFC908"/>
          <text x="14" y="5.2" font-size="2" font-family="sans-serif" font-weight="bold" fill="#45120E" text-anchor="middle">ARUNACHALA</text>
          <path d="M5 8 Q14 5 23 8 L22 13 Q14 10 6 13 Z" fill="#60A5FA"/>
          <rect x="6.5" y="16" width="15" height="14" rx="2" fill="#681D17" stroke="#FFC908" stroke-width="0.8"/>
          <line x1="9" y1="19" x2="19" y2="19" stroke="#FFC908" stroke-width="0.6"/>
          <line x1="9" y1="23" x2="19" y2="23" stroke="#FFC908" stroke-width="0.6"/>
          <line x1="9" y1="27" x2="19" y2="27" stroke="#FFC908" stroke-width="0.6"/>
          <rect x="3.5" y="15" width="2" height="5" rx="0.5" fill="#93C5FD" opacity="0.9"/>
          <rect x="3.5" y="23" width="2" height="5" rx="0.5" fill="#93C5FD" opacity="0.9"/>
          <rect x="22.5" y="15" width="2" height="5" rx="0.5" fill="#93C5FD" opacity="0.9"/>
          <rect x="22.5" y="23" width="2" height="5" rx="0.5" fill="#93C5FD" opacity="0.9"/>
          <rect x="6" y="38" width="16" height="2.5" rx="1" fill="#1E293B"/>
          <circle cx="5" cy="42" r="1.5" fill="#EF4444"/>
          <circle cx="23" cy="42" r="1.5" fill="#EF4444"/>
          <circle cx="5" cy="4.5" r="1.8" fill="#FFF9C4" stroke="#FFC908" stroke-width="0.6"/>
          <circle cx="23" cy="4.5" r="1.8" fill="#FFF9C4" stroke="#FFC908" stroke-width="0.6"/>
        </svg>
      </div>`;
    document.body.appendChild(aside);
    track = aside;
  }

  const vehicle = document.getElementById('scrollBusVehicle');
  const roadFill = document.getElementById('scrollBusRoadFill');
  if (!track || !vehicle) return;

  let lastScrollY = window.scrollY;
  let scrollTimeout = null;
  let currentDirection = 'down';
  let isDragging = false;

  const updateBusPosition = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 30) {
      track.classList.remove('is-visible');
      return;
    }
    track.classList.add('is-visible');

    const progress = Math.min(1, Math.max(0, scrollY / docHeight));
    const trackHeight = track.clientHeight || (window.innerHeight - 190);
    const busHeight = vehicle.clientHeight || 46;
    const maxTravel = Math.max(0, trackHeight - busHeight);
    const busY = progress * maxTravel;

    if (roadFill) {
      roadFill.style.height = `${(progress * 100).toFixed(1)}%`;
    }

    if (scrollY > lastScrollY + 2) {
      currentDirection = 'down';
    } else if (scrollY < lastScrollY - 2) {
      currentDirection = 'up';
    }
    lastScrollY = scrollY;

    // 180deg = nose pointing down towards destination; 0deg = nose pointing up towards top
    const rotation = currentDirection === 'down' ? 180 : 0;
    vehicle.style.transform = `translateY(${busY.toFixed(1)}px) rotate(${rotation}deg)`;

    vehicle.classList.add('is-driving');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      vehicle.classList.remove('is-driving');
    }, 180);
  };

  // Jump to position on road click
  track.addEventListener('click', (e) => {
    if (isDragging) return;
    const rect = track.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = Math.min(1, Math.max(0, clickY / rect.height));
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: ratio * docHeight,
      behavior: 'smooth'
    });
  });

  // Dragging the bus up or down
  vehicle.addEventListener('pointerdown', (e) => {
    isDragging = true;
    try {
      vehicle.setPointerCapture(e.pointerId);
    } catch (err) {}
    e.preventDefault();
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const rect = track.getBoundingClientRect();
    const currentY = e.clientY - rect.top;
    const ratio = Math.min(1, Math.max(0, currentY / rect.height));
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: ratio * docHeight,
      behavior: 'auto'
    });
  });

  const stopDragging = () => {
    isDragging = false;
  };
  window.addEventListener('pointerup', stopDragging);
  window.addEventListener('pointercancel', stopDragging);

  // Throttled scroll listener
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(() => {
        updateBusPosition();
        ticking = false;
      });
    }
  }, { passive: true });

  window.addEventListener('resize', updateBusPosition, { passive: true });

  // Initial call
  setTimeout(updateBusPosition, 60);
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
    initScrollBus();

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

