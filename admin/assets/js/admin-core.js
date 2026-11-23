/* ============================================================
   ARUNACHALESHWARA ADMIN – Shared Core UI & Helpers
   Sidebar Navigation (with RBAC), Header, Toasts, Formatters
   ============================================================ */

/**
 * Render the complete Sidebar with RBAC Module filtering
 */
function renderAdminSidebar(activePage) {
  const sidebarEl = document.getElementById('adminSidebar');
  if (!sidebarEl) return;

  const user = window.CURRENT_ADMIN_USER || { fullName: 'Admin', role: 'Staff', isMainAdmin: false, assignedModules: [] };
  const initials = (user.fullName || 'A').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const navItems = [
    { header: 'CORE' },
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-grid-1x2-fill', href: 'dashboard.html', module: 'dashboard' },

    { header: 'BOOKING MANAGEMENT' },
    { id: 'bookings', label: 'All Bookings', icon: 'bi-calendar-check-fill', href: 'bookings.html', module: 'bookings' },
    { id: 'operations', label: 'Room Operations', icon: 'bi-door-open-fill', href: 'operations.html', module: 'accommodation' },
    { id: 'restaurant-orders', label: 'Food Orders', icon: 'bi-bag-check-fill', href: 'restaurant.html?tab=orders', module: 'bookings' },

    { header: 'INVENTORY & CATALOG' },
    { id: 'accommodation', label: 'Rooms (17 Rooms)', icon: 'bi-building-fill', href: 'accommodation.html', module: 'accommodation' },
    { id: 'restaurant-menu', label: 'Food & Menu', icon: 'bi-cup-hot-fill', href: 'restaurant.html', module: 'services' },
    { id: 'darshan', label: 'Temple Darshan Catalog', icon: 'bi-flower1', href: 'services.html?tab=darshan', module: 'services' },
    { id: 'bus', label: 'Bus Ticket Routes', icon: 'bi-bus-front-fill', href: 'services.html?tab=bus', module: 'services' },
    { id: 'bikes', label: 'Bike Rentals Fleet', icon: 'bi-bicycle', href: 'services.html?tab=bikes', module: 'services' },
    { id: 'taxi', label: 'Taxi & Car Rentals Fleet', icon: 'bi-car-front-fill', href: 'services.html?tab=taxi', module: 'services' },
    { id: 'services', label: 'Tour Packages & Services', icon: 'bi-compass-fill', href: 'services.html?tab=packages', module: 'services' },

    { header: 'FINANCE (MANUAL)' },
    { id: 'payments', label: 'Manual Payments', icon: 'bi-cash-stack', href: 'payments.html', module: 'payments' },
    { id: 'invoices', label: 'Invoices & PDFs', icon: 'bi-file-earmark-pdf-fill', href: 'invoices.html', module: 'invoices' },
    { id: 'reports', label: 'Reports & Revenue', icon: 'bi-bar-chart-line-fill', href: 'reports.html', module: 'reports' },

    { header: 'CRM & WEBSITE CMS' },
    { id: 'customers', label: 'Customers', icon: 'bi-people-fill', href: 'customers.html', module: 'customers' },
    { id: 'cms', label: 'Website CMS & Media', icon: 'bi-palette-fill', href: 'cms.html', module: 'cms' },
    { id: 'whatsapp', label: 'WhatsApp Settings', icon: 'bi-whatsapp', href: 'whatsapp.html', module: 'whatsapp' },

    { header: 'SECURITY & SYSTEM' },
    { id: 'sub-admins', label: 'Sub-Admins & RBAC', icon: 'bi-shield-lock-fill', href: 'sub-admins.html', module: 'subadmins', mainOnly: true },
    { id: 'audit-logs', label: 'Audit Logs', icon: 'bi-journal-text', href: 'audit-logs.html', module: 'audit', mainOnly: true }
  ];

  let navHtml = '';
  let lastHeader = null;

  navItems.forEach(item => {
    if (item.header) {
      lastHeader = item.header;
      return;
    }

    // RBAC Check
    if (item.mainOnly && !user.isMainAdmin) return;
    if (typeof canAccessModule === 'function' && !canAccessModule(item.module)) return;

    if (lastHeader) {
      navHtml += `<div class="admin-nav-header">${lastHeader}</div>`;
      lastHeader = null;
    }

    const isActive = activePage === item.id ? 'active' : '';
    navHtml += `
      <a href="${item.href}" class="admin-nav-item ${isActive}">
        <i class="bi ${item.icon}"></i>
        <span>${item.label}</span>
      </a>`;
  });

  sidebarEl.innerHTML = `
    <a href="dashboard.html" class="admin-sidebar-brand" title="Arunachaleshwara Admin Portal">
      <img src="../assets/images/logo/logo.png" alt="Arunachaleshwara Tours & Travels">
    </a>
    <nav class="admin-nav">
      ${navHtml}
      <div class="admin-nav-header">QUICK LINKS</div>
      <a href="../index.html" target="_blank" class="admin-nav-item">
        <i class="bi bi-box-arrow-up-right"></i>
        <span>View Live Website</span>
      </a>
      <a href="javascript:void(0)" onclick="logoutAdmin()" class="admin-nav-item text-danger fw-bold">
        <i class="bi bi-box-arrow-left text-danger"></i>
        <span>Sign Out</span>
      </a>
    </nav>
    <div class="admin-sidebar-user">
      <div class="admin-user-avatar">${initials}</div>
      <div class="admin-user-info">
        <div class="admin-user-name">${user.fullName}</div>
        <span class="admin-user-role">${user.role}</span>
      </div>
    </div>
  `;
}

/**
 * Render Top Header Bar with Live Sync, Role-Based Notification Bell, and Actions
 */
function renderAdminHeader(pageTitle, subtitle = '') {
  const headerEl = document.getElementById('adminHeader');
  if (!headerEl) return;

  headerEl.innerHTML = `
    <div class="d-flex align-items-center gap-3">
      <button class="btn btn-sm btn-outline-secondary d-lg-none" onclick="document.getElementById('adminSidebar').classList.toggle('show')">
        <i class="bi bi-list fs-5"></i>
      </button>
      <div class="admin-header-title">
        <h4>${pageTitle}</h4>
        ${subtitle ? `<span class="badge d-none d-md-inline-block">${subtitle}</span>` : ''}
      </div>
    </div>
    <div class="admin-header-actions d-flex align-items-center gap-2">
      <span class="badge bg-success bg-opacity-10 text-success border border-success d-inline-flex align-items-center gap-1 py-1 px-2" id="realtimeSyncBadge" title="Real-Time Sync Active - Updates automatically without reloading" style="font-size: 0.78rem; font-weight: 600;">
        <span class="spinner-grow spinner-grow-sm text-success" style="width: 7px; height: 7px;" role="status"></span> Live Sync
      </span>

      <!-- Role-Based Notification Bell with Dropdown -->
      <div class="dropdown notification-dropdown-wrapper position-relative" id="adminNotifWrapper">
        <button type="button" class="btn btn-sm btn-outline-secondary position-relative d-inline-flex align-items-center justify-content-center notification-bell-btn" id="adminNotifBellBtn" onclick="window.ArnAdminNotifications && window.ArnAdminNotifications.toggleDropdown(event)" aria-expanded="false" title="Notifications">
          <i class="bi bi-bell-fill fs-6" id="adminNotifBellIcon" style="color: #45120E;"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-none notification-badge" id="adminNotifBadge">0</span>
        </button>
        <div class="dropdown-menu dropdown-menu-end shadow-lg notification-dropdown-menu p-0 border-0" id="adminNotifDropdown">
          <!-- Dropdown Header -->
          <div class="p-3 bg-white border-bottom d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-2">
              <span class="fw-bold text-dark fs-6"><i class="bi bi-bell-fill me-1 text-warning"></i>Notifications</span>
              <span class="badge bg-danger rounded-pill px-2 py-1" id="adminNotifUnreadCountBadge" style="font-size: 0.72rem;">0 unread</span>
            </div>
            <div class="d-flex align-items-center gap-1">
              <!-- Sound Mute/Unmute Toggle -->
              <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2 d-inline-flex align-items-center gap-1" id="adminNotifSoundToggle" onclick="window.ArnAdminNotifications && window.ArnAdminNotifications.toggleSound()" title="Toggle Notification Sound ('Bemp' alert)" style="font-size: 0.75rem; height: 26px;">
                <i class="bi bi-volume-up-fill text-success" id="adminNotifSoundIcon"></i>
                <span id="adminNotifSoundLabel" class="d-none d-sm-inline">Sound</span>
              </button>
              <!-- Test Loud "Bemp" Sound -->
              <button type="button" class="btn btn-sm btn-light border py-0 px-2" onclick="window.ArnAdminNotifications && window.ArnAdminNotifications.playBempSound(true)" title="Test Loud 'Bemp' Chime" style="font-size: 0.75rem; height: 26px;">
                <i class="bi bi-music-note-beamed text-primary"></i>
              </button>
              <!-- Clear / Mark All Read -->
              <button type="button" class="btn btn-sm btn-light border py-0 px-2 text-muted" onclick="window.ArnAdminNotifications && window.ArnAdminNotifications.clearAll()" title="Clear All" style="font-size: 0.75rem; height: 26px;">
                <i class="bi bi-check2-all"></i>
              </button>
            </div>
          </div>

          <!-- RBAC Filter Indicator & Real-time Status -->
          <div class="px-3 py-1 bg-light border-bottom d-flex align-items-center justify-content-between" style="font-size: 0.72rem;">
            <div class="d-flex align-items-center gap-1 text-muted">
              <i class="bi bi-shield-check text-primary"></i>
              <span>Role:</span>
              <span class="badge bg-secondary bg-opacity-10 text-secondary" id="adminNotifRoleBadge">Loading RBAC...</span>
            </div>
            <span class="text-success d-inline-flex align-items-center gap-1" style="font-size: 0.68rem; font-weight: 600;" title="Real-Time Data Sync Active">
              <span class="spinner-grow spinner-grow-sm text-success" style="width: 5px; height: 5px;" role="status"></span> Live Sync
            </span>
          </div>

          <!-- Notification Items List -->
          <div class="notification-list-container" id="adminNotifList" style="max-height: 380px; overflow-y: auto;">
            <!-- Rendered dynamically by ArnAdminNotifications -->
          </div>

          <!-- Dropdown Footer -->
          <div class="p-2 bg-light border-top text-center">
            <a href="restaurant.html?tab=orders" class="small text-decoration-none fw-semibold text-primary d-inline-block py-1" id="adminNotifFooterLink">
              View All Orders &amp; Activity &rarr;
            </a>
          </div>
        </div>
      </div>

      <a href="../accommodation.html" target="_blank" class="btn btn-sm btn-outline-secondary d-none d-sm-inline-flex align-items-center gap-1">
        <i class="bi bi-globe"></i> Website
      </a>
      <button class="btn btn-sm btn-admin-yellow d-inline-flex align-items-center gap-1" onclick="if (window.ArnRealtimeSync) { window.ArnRealtimeSync.publish('*', 'manual_refresh', {}); if (typeof showAdminToast === 'function') showAdminToast('Live data refreshed!', 'info'); } else { location.reload(); }" title="Refresh Live Data Without Reload">
        <i class="bi bi-arrow-clockwise"></i> Live Refresh
      </button>
    </div>
  `;

  // Auto-init notifications
  if (window.ArnAdminNotifications && typeof window.ArnAdminNotifications.init === 'function') {
    window.ArnAdminNotifications.init();
  }
}

/**
 * Role-Based Admin Notification Engine with Audible "Bemp" Alert Chime & Real-Time Sync
 */
const ArnAdminNotifications = {
  STORAGE_KEY: 'arn_admin_notifications',
  SOUND_MUTED_KEY: 'arn_admin_sound_muted',
  _audioCtx: null,
  _initialized: false,
  _syncInterval: null,

  isSoundMuted() {
    try {
      return localStorage.getItem(this.SOUND_MUTED_KEY) === 'true';
    } catch (e) {
      return false;
    }
  },

  setSoundMuted(muted) {
    try {
      localStorage.setItem(this.SOUND_MUTED_KEY, muted ? 'true' : 'false');
    } catch (e) {}
    this.updateSoundButtonUI();
  },

  toggleSound() {
    const next = !this.isSoundMuted();
    this.setSoundMuted(next);
    if (!next) {
      this.playBempSound(true);
      if (typeof showAdminToast === 'function') {
        showAdminToast('Notification sound enabled ("Bemp" chime)', 'info');
      }
    } else {
      if (typeof showAdminToast === 'function') {
        showAdminToast('Notification sound muted', 'warning');
      }
    }
  },

  updateSoundButtonUI() {
    const icon = document.getElementById('adminNotifSoundIcon');
    const label = document.getElementById('adminNotifSoundLabel');
    const muted = this.isSoundMuted();
    if (icon) {
      icon.className = muted ? 'bi bi-volume-mute-fill text-danger' : 'bi bi-volume-up-fill text-success';
    }
    if (label) {
      label.textContent = muted ? 'Muted' : 'Sound';
    }
  },

  /**
   * Toggle dropdown open/close reliably
   */
  toggleDropdown(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Resume audio context on interaction if suspended
    if (this._audioCtx && this._audioCtx.state === 'suspended') {
      this._audioCtx.resume().catch(() => {});
    }

    const dropdown = document.getElementById('adminNotifDropdown');
    const bellBtn = document.getElementById('adminNotifBellBtn');
    if (!dropdown) return;

    const isShowing = dropdown.classList.contains('show');
    if (isShowing) {
      dropdown.classList.remove('show');
      if (bellBtn) bellBtn.setAttribute('aria-expanded', 'false');
    } else {
      dropdown.classList.add('show');
      if (bellBtn) bellBtn.setAttribute('aria-expanded', 'true');
      this.render();
    }
  },

  closeDropdown() {
    const dropdown = document.getElementById('adminNotifDropdown');
    const bellBtn = document.getElementById('adminNotifBellBtn');
    if (dropdown) dropdown.classList.remove('show');
    if (bellBtn) bellBtn.setAttribute('aria-expanded', 'false');
  },

  /**
   * Synthesize LOUD, punchy, dual-tone "Bemp" alert sound via Web Audio API
   */
  playBempSound(force = false) {
    try {
      if (this.isSoundMuted() && !force) return;

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!this._audioCtx || this._audioCtx.state === 'closed') {
        this._audioCtx = new AudioCtx();
      }
      const ctx = this._audioCtx;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      // Dynamics Compressor to maximize loudness and punch without clipping
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-14, now);
      compressor.knee.setValueAtTime(8, now);
      compressor.ratio.setValueAtTime(4, now);
      compressor.attack.setValueAtTime(0.002, now);
      compressor.release.setValueAtTime(0.2, now);
      compressor.connect(ctx.destination);

      // Loud Master Gain (92% volume)
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.92, now);
      master.connect(compressor);

      // Tone 1: Low-Mid Punchy "Bem" (520Hz ramping to 660Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(520.0, now);
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.09); // Glides from C#5 to E5
      gain1.gain.setValueAtTime(0.85, now);
      gain1.gain.exponentialRampToValueAtTime(0.005, now + 0.14);
      osc1.connect(gain1);
      gain1.connect(master);
      osc1.start(now);
      osc1.stop(now + 0.15);

      // Tone 2: Loud High Resonant Bell "-p!" (880Hz peaking at 1046.5Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880.00, now + 0.08); // A5
      osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.18); // Glides to C6
      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.setValueAtTime(0.95, now + 0.08); // Full loud peak
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
      osc2.connect(gain2);
      gain2.connect(master);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.50);

      // Tone 3: Bright High Sparkle (1318.5Hz / E6)
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(1318.51, now + 0.09);
      gain3.gain.setValueAtTime(0.001, now);
      gain3.gain.setValueAtTime(0.55, now + 0.09);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
      osc3.connect(gain3);
      gain3.connect(master);
      osc3.start(now + 0.09);
      osc3.stop(now + 0.40);
    } catch (e) {
      console.warn('Notification audio playback note:', e);
    }
  },

  /**
   * Check if current admin user has RBAC permission for a notification
   */
  canUserAccessNotification(notif) {
    if (!notif) return false;
    const user = window.CURRENT_ADMIN_USER;

    // If no user context loaded yet or Main Admin -> full access to all notifications
    if (!user || user.isMainAdmin) return true;

    // Check modules required by this notification
    const rawModules = Array.isArray(notif.modules)
      ? notif.modules
      : [notif.module || notif.targetModule];
    const requiredModules = rawModules.filter(Boolean);

    // If notification has no specific module restrictions, allow
    if (!requiredModules.length) return true;

    // Sub-Admin assigned modules check
    const userModules = Array.isArray(user.assignedModules) ? user.assignedModules : [];
    return requiredModules.some(m => {
      if (userModules.includes(m)) return true;
      if (typeof window.canAccessModule === 'function' && window.canAccessModule(m)) return true;
      return false;
    });
  },

  /**
   * Load stored notifications from localStorage
   */
  getAllNotifications() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}

    // Initial seed notifications if none exist
    const defaultSeeds = [
      {
        id: 'notif_seed_food_1',
        type: 'food_order',
        modules: ['services', 'bookings'],
        title: 'New Food Order #ARN-FD-1002',
        message: 'Ghee Roast Dosa x 2, Degree Filter Kaapi x 1 • ₹240',
        timestamp: Date.now() - 10 * 60 * 1000,
        link: 'restaurant.html?tab=orders',
        read: false
      },
      {
        id: 'notif_seed_room_2',
        type: 'room_booking',
        modules: ['accommodation', 'bookings'],
        title: 'New Room Booking #ARN-BK-2026',
        message: 'Deluxe Temple View Room (Room 104) • 2 Nights',
        timestamp: Date.now() - 35 * 60 * 1000,
        link: 'bookings.html',
        read: false
      },
      {
        id: 'notif_seed_pay_3',
        type: 'payment',
        modules: ['payments', 'invoices'],
        title: 'Manual Payment Verified #ARN-PAY-501',
        message: 'UPI ₹2,500 advance verified for Room 104',
        timestamp: Date.now() - 80 * 60 * 1000,
        link: 'payments.html',
        read: true
      }
    ];

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(defaultSeeds));
    } catch (e) {}
    return defaultSeeds;
  },

  /**
   * Save notifications to localStorage
   */
  saveNotifications(notifs) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notifs.slice(0, 40)));
    } catch (e) {}
  },

  /**
   * Get notifications visible to current admin user (filtered strictly by RBAC)
   */
  getAccessibleNotifications() {
    const all = this.getAllNotifications();
    return all.filter(n => this.canUserAccessNotification(n));
  },

  /**
   * Sync Real-Time Data from localStorage and Supabase
   */
  syncRealtimeData() {
    try {
      let changed = false;
      const allNotifs = this.getAllNotifications();

      // 1. Sync recent real food orders
      const rawFood = localStorage.getItem('arn_food_orders');
      if (rawFood) {
        try {
          const foodOrders = JSON.parse(rawFood);
          if (Array.isArray(foodOrders)) {
            foodOrders.slice(0, 6).forEach(order => {
              const orderId = order.order_id || order.id || order.order_number;
              if (!orderId) return;
              const notifId = `notif_order_${orderId}`;
              if (!allNotifs.some(n => n.id === notifId)) {
                const itemsSummary = Array.isArray(order.items)
                  ? order.items.map(i => `${i.name || i.title || 'Item'} x${i.quantity || 1}`).slice(0, 2).join(', ')
                  : (order.fulfillment_type === 'room_delivery' ? `Room ${order.room_number || ''} Delivery` : 'Room Delivery / Dine-in');
                const amtStr = order.total_amount ? ` • ₹${order.total_amount}` : '';
                allNotifs.unshift({
                  id: notifId,
                  type: 'food_order',
                  modules: ['services', 'bookings'],
                  title: `New Food Order #${orderId}`,
                  message: `${itemsSummary}${amtStr}`,
                  link: 'restaurant.html?tab=orders',
                  timestamp: order.timestamp || Date.now(),
                  read: false
                });
                changed = true;
              }
            });
          }
        } catch (e) {}
      }

      // 2. Sync recent real room bookings
      const rawRooms = localStorage.getItem('arn_room_bookings');
      if (rawRooms) {
        try {
          const roomBookings = JSON.parse(rawRooms);
          if (Array.isArray(roomBookings)) {
            roomBookings.slice(0, 6).forEach(b => {
              const bId = b.booking_id || b.id;
              if (!bId) return;
              const notifId = `notif_booking_${bId}`;
              if (!allNotifs.some(n => n.id === notifId)) {
                allNotifs.unshift({
                  id: notifId,
                  type: 'room_booking',
                  modules: ['accommodation', 'bookings'],
                  title: `New Room Booking #${bId}`,
                  message: `${b.customer_name || 'Guest'} • ${b.room_category || 'Room Booking'}`,
                  link: 'bookings.html',
                  timestamp: b.timestamp || Date.now(),
                  read: false
                });
                changed = true;
              }
            });
          }
        } catch (e) {}
      }

      if (changed) {
        this.saveNotifications(allNotifs);
        this.render();
      }
    } catch (err) {
      console.warn('Realtime sync check note:', err);
    }
  },

  /**
   * Push incoming notification with RBAC filtering, LOUD "bemp" sound, bell shake & badge
   */
  pushNotification(notif) {
    if (!notif) return false;

    // Strict RBAC gate: Do not record, do not sound, do not show if user lacks module access
    if (!this.canUserAccessNotification(notif)) {
      return false;
    }

    const item = {
      id: notif.id || `notif_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      type: notif.type || 'general',
      modules: Array.isArray(notif.modules) ? notif.modules : [notif.module || 'dashboard'],
      title: notif.title || 'New Notification',
      message: notif.message || '',
      link: notif.link || 'dashboard.html',
      timestamp: notif.timestamp || Date.now(),
      read: false
    };

    const all = this.getAllNotifications();
    all.unshift(item);
    this.saveNotifications(all);

    // Play loud audible "bemp" sound
    this.playBempSound();

    // Trigger bell shake animation
    this.shakeBell();

    // Re-render UI
    this.render();

    // Show toast
    if (typeof showAdminToast === 'function') {
      showAdminToast(`🔔 ${item.title}: ${item.message}`, 'info');
    }

    return true;
  },

  shakeBell() {
    const bell = document.getElementById('adminNotifBellIcon');
    if (bell) {
      bell.classList.remove('bell-ring');
      void bell.offsetWidth; // trigger reflow
      bell.classList.add('bell-ring');
      setTimeout(() => bell.classList.remove('bell-ring'), 900);
    }
  },

  markAsRead(id, navigateUrl = null) {
    const all = this.getAllNotifications();
    const target = all.find(n => n.id === id);
    if (target) {
      target.read = true;
      this.saveNotifications(all);
      this.render();
    }
    if (navigateUrl && navigateUrl !== '#') {
      window.location.href = navigateUrl;
    }
  },

  clearAll() {
    // Clear only accessible notifications
    const all = this.getAllNotifications();
    const remaining = all.filter(n => !this.canUserAccessNotification(n));
    this.saveNotifications(remaining);
    this.render();
    if (typeof showAdminToast === 'function') {
      showAdminToast('All notifications marked as read / cleared', 'info');
    }
  },

  formatTimeAgo(timestamp) {
    if (!timestamp) return 'Just now';
    const diff = Math.max(0, Math.floor((Date.now() - Number(timestamp)) / 1000));
    if (diff < 45) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  },

  getIconInfo(type) {
    switch (type) {
      case 'food_order':
        return { icon: 'bi-cup-hot-fill', bg: '#FEF3C7', color: '#D97706', label: 'Food Order' };
      case 'room_booking':
        return { icon: 'bi-door-open-fill', bg: '#DBEAFE', color: '#2563EB', label: 'Room Booking' };
      case 'service_booking':
        return { icon: 'bi-compass-fill', bg: '#F3E8FF', color: '#7C3AED', label: 'Tour Service' };
      case 'payment':
        return { icon: 'bi-cash-stack', bg: '#D1FAE5', color: '#059669', label: 'Payment' };
      case 'enquiry':
      case 'customer':
        return { icon: 'bi-chat-dots-fill', bg: '#E0E7FF', color: '#4F46E5', label: 'Devotee Enquiry' };
      default:
        return { icon: 'bi-bell-fill', bg: '#F1F5F9', color: '#475569', label: 'Alert' };
    }
  },

  updateRoleFilter() {
    const badge = document.getElementById('adminNotifRoleBadge');
    if (!badge) return;
    const user = window.CURRENT_ADMIN_USER;
    if (!user) {
      badge.textContent = 'Admin';
      badge.className = 'badge bg-secondary bg-opacity-10 text-secondary';
      return;
    }

    if (user.isMainAdmin) {
      badge.textContent = 'Super Admin (All Modules)';
      badge.className = 'badge bg-warning bg-opacity-25 text-dark fw-bold border border-warning';
    } else {
      const mods = Array.isArray(user.assignedModules) ? user.assignedModules : [];
      const roleName = user.role || 'Sub-Admin';
      badge.textContent = `${roleName}: [${mods.join(', ') || 'None'}]`;
      badge.className = 'badge bg-primary bg-opacity-10 text-primary border border-primary';
    }

    // Refresh rendering with new RBAC context
    this.render();
  },

  render() {
    const listEl = document.getElementById('adminNotifList');
    const badgeEl = document.getElementById('adminNotifBadge');
    const unreadCountBadge = document.getElementById('adminNotifUnreadCountBadge');
    if (!listEl) return;

    const accessible = this.getAccessibleNotifications();
    const unreadCount = accessible.filter(n => !n.read).length;

    // Update bell badges
    if (badgeEl) {
      if (unreadCount > 0) {
        badgeEl.textContent = unreadCount > 99 ? '99+' : unreadCount;
        badgeEl.classList.remove('d-none');
        badgeEl.classList.add('badge-pulse');
        setTimeout(() => badgeEl.classList.remove('badge-pulse'), 500);
      } else {
        badgeEl.classList.add('d-none');
      }
    }

    if (unreadCountBadge) {
      unreadCountBadge.textContent = `${unreadCount} unread`;
      unreadCountBadge.className = unreadCount > 0 ? 'badge bg-danger rounded-pill px-2 py-1' : 'badge bg-secondary rounded-pill px-2 py-1';
    }

    this.updateSoundButtonUI();

    if (accessible.length === 0) {
      listEl.innerHTML = `
        <div class="text-center py-5 px-3">
          <i class="bi bi-bell-slash text-muted" style="font-size: 2.2rem; opacity: 0.5;"></i>
          <p class="text-muted small mt-2 mb-0 fw-semibold">No notifications for your role</p>
          <span class="text-muted" style="font-size: 0.72rem;">New updates for your assigned modules will show here</span>
        </div>
      `;
      return;
    }

    listEl.innerHTML = accessible.map(item => {
      const icon = this.getIconInfo(item.type);
      const timeStr = this.formatTimeAgo(item.timestamp);
      const isUnread = !item.read;

      return `
        <div class="notification-item ${isUnread ? 'unread' : ''}" onclick="window.ArnAdminNotifications.markAsRead('${item.id}', '${item.link || '#'}')">
          <div class="notification-icon-box" style="background-color: ${icon.bg}; color: ${icon.color};">
            <i class="bi ${icon.icon}"></i>
          </div>
          <div class="flex-grow-1" style="min-width: 0;">
            <div class="d-flex align-items-center justify-content-between gap-2 mb-1">
              <span class="fw-bold text-dark text-truncate" style="font-size: 0.82rem;">${escapeHtml(item.title)}</span>
              <span class="text-muted text-nowrap" style="font-size: 0.70rem;">${timeStr}</span>
            </div>
            <p class="text-muted mb-1 text-truncate" style="font-size: 0.76rem; max-width: 260px;" title="${escapeHtml(item.message)}">
              ${escapeHtml(item.message)}
            </p>
            <div class="d-flex align-items-center gap-1">
              <span class="badge bg-light text-secondary border py-0 px-1" style="font-size: 0.65rem;">${icon.label}</span>
              ${isUnread ? '<span class="badge bg-danger bg-opacity-10 text-danger py-0 px-1" style="font-size: 0.65rem;">New</span>' : ''}
            </div>
          </div>
          ${isUnread ? '<span class="notif-unread-dot" title="Unread"></span>' : ''}
        </div>
      `;
    }).join('');
  },

  init() {
    this.render();
    this.updateRoleFilter();
    this.syncRealtimeData();

    // Audio unlock listener for browser autoplay policy
    const unlockAudio = () => {
      if (this._audioCtx && this._audioCtx.state === 'suspended') {
        this._audioCtx.resume().catch(() => {});
      }
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    // Global click listener to close dropdown when clicking outside
    if (!this._hasClickOutsideListener) {
      document.addEventListener('click', (e) => {
        const wrapper = document.getElementById('adminNotifWrapper');
        const dropdown = document.getElementById('adminNotifDropdown');
        if (dropdown && dropdown.classList.contains('show')) {
          if (wrapper && !wrapper.contains(e.target)) {
            dropdown.classList.remove('show');
            const bell = document.getElementById('adminNotifBellBtn');
            if (bell) bell.setAttribute('aria-expanded', 'false');
          }
        }
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeDropdown();
        }
      });
      this._hasClickOutsideListener = true;
    }

    // Subscribe to cross-tab storage changes for real-time sync
    window.addEventListener('storage', (e) => {
      if (e.key === this.STORAGE_KEY) {
        this.render();
      } else if (e.key === 'arn_food_orders' || e.key === 'arn_room_bookings') {
        this.syncRealtimeData();
      }
    });

    // Subscribe to ArnRealtimeSync bus events
    if (window.ArnRealtimeSync && typeof window.ArnRealtimeSync.subscribe === 'function') {
      window.ArnRealtimeSync.subscribe('*', (topic, action, payload, isExternal) => {
        if (topic === 'restaurant_orders' || topic === 'bookings' || topic === 'payments') {
          this.syncRealtimeData();
        }
      });
    }

    // Periodic real-time background polling (every 6 seconds)
    if (!this._syncInterval) {
      this._syncInterval = setInterval(() => {
        this.syncRealtimeData();
      }, 6000);
    }

    this._initialized = true;
  }
};

window.ArnAdminNotifications = ArnAdminNotifications;

/**
 * Toast Notifications
 */
function showAdminToast(message, type = 'success') {
  let container = document.getElementById('adminToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'adminToastContainer';
    container.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; max-width: 380px;';
    document.body.appendChild(container);
  }

  const bgClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-warning text-dark';
  const icon = type === 'success' ? 'bi-check-circle-fill' : type === 'error' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill';

  const toast = document.createElement('div');
  toast.className = `toast show align-items-center text-white ${bgClass} border-0 mb-2 shadow-lg`;
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body d-flex align-items-center gap-2">
        <i class="bi ${icon}"></i>
        <span>${message}</span>
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="this.parentElement.parentElement.remove()"></button>
    </div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4500);
}

/**
 * Format Currency (INR)
 */
function formatINR(amount) {
  const num = parseFloat(amount) || 0;
  return '₹' + num.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

/**
 * Format Date nicely
 */
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

/**
 * Get Status Badge HTML
 */
function getStatusBadge(status) {
  if (!status) return '<span class="badge-status pending">Unknown</span>';
  const s = status.toLowerCase();
  if (s.includes('confirmed') || s.includes('verified') || s.includes('fully paid') || s === 'available' || s === 'issued') {
    return `<span class="badge-status confirmed"><i class="bi bi-check-circle-fill"></i> ${status}</span>`;
  }
  if (s.includes('checked in') || s === 'occupied') {
    return `<span class="badge-status checked-in"><i class="bi bi-door-open-fill"></i> ${status}</span>`;
  }
  if (s.includes('checked out') || s.includes('completed')) {
    return `<span class="badge-status checked-out"><i class="bi bi-check-all"></i> ${status}</span>`;
  }
  if (s.includes('cancel') || s.includes('not paid') || s.includes('reject') || s === 'blocked') {
    return `<span class="badge-status cancelled"><i class="bi bi-x-circle-fill"></i> ${status}</span>`;
  }
  if (s.includes('verification') || s.includes('awaiting') || s.includes('partial')) {
    return `<span class="badge-status awaiting-payment"><i class="bi bi-hourglass-split"></i> ${status}</span>`;
  }
  return `<span class="badge-status pending"><i class="bi bi-clock-fill"></i> ${status}</span>`;
}

/**
 * Open WhatsApp Deep Link and log attempt
 */
async function openWhatsAppShare(phone, message, bookingCode = null, messageType = 'Custom') {
  const cleanPhone = String(phone || '').replace(/[^0-9]/g, '');
  const finalPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
  const nowIso = new Date().toISOString();

  // Create standardized log record
  const logRecord = {
    id: 'wa_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    booking_code: bookingCode || '—',
    recipient: finalPhone,
    message_type: messageType || 'Direct Message',
    message_content: message,
    status: 'Sent / Opened',
    sent_at: nowIso,
    created_at: nowIso
  };

  // 1. Immediately persist to localStorage for instant local history availability
  try {
    const raw = localStorage.getItem('arn_whatsapp_logs');
    const logs = raw ? JSON.parse(raw) : [];
    logs.unshift(logRecord);
    if (logs.length > 100) logs.length = 100;
    localStorage.setItem('arn_whatsapp_logs', JSON.stringify(logs));
  } catch (err) {
    console.warn('Local WhatsApp log storage warning:', err);
  }

  // 2. If on the WhatsApp settings page, refresh the logs table live in real time
  if (typeof loadWaLogs === 'function') {
    try { loadWaLogs(); } catch (e) { }
  }

  // 3. Log message attempt to Supabase whatsapp_messages table
  if (window.adminSupabase) {
    try {
      await window.adminSupabase.from('whatsapp_messages').insert([{
        booking_code: bookingCode,
        recipient: finalPhone,
        message_type: messageType,
        message_content: message,
        status: 'WhatsApp Link Opened'
      }]);
    } catch (e) {
      console.warn('Supabase WhatsApp log error:', e);
    }
  }

  const url = `https://wa.me/${finalPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
}

/**
 * Fast Stale-While-Revalidate Cache Helpers (sessionStorage)
 * Enables instant 0ms UI rendering while fresh Supabase data loads in background
 */
function adminCacheGet(key, maxAgeMs = 5 * 60 * 1000) {
  try {
    const raw = sessionStorage.getItem('arn_cache_' + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && (Date.now() - (parsed._ts || 0)) < maxAgeMs) {
      return parsed.data;
    }
  } catch (e) { }
  return null;
}

function adminCacheSet(key, data) {
  try {
    sessionStorage.setItem('arn_cache_' + key, JSON.stringify({ data, _ts: Date.now() }));
  } catch (e) { }
}

/**
 * Resolve image URL for preview inside /admin/ pages
 */
function resolveAdminImgSrc(src) {
  if (!src) return '../assets/images/popup.png';
  const s = String(src).trim();
  if (/^(https?:|data:|blob:|\.\.\/|\/)/i.test(s)) return s;
  return '../' + s;
}

/**
 * Upload an image file to Supabase Storage (public 'media' bucket)
 * Also logs into media_library and returns the permanent public URL.
 */
async function uploadAdminImage(file, folder = 'general') {
  const sb = window.adminSupabase || window.supabaseClient;
  if (!sb) throw new Error('Supabase client not initialized');
  if (!file) throw new Error('No file selected');
  if (file.size > 10 * 1024 * 1024) throw new Error('Image must be smaller than 10 MB');

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `${folder}/${Date.now()}-${safeName}`;

  const { error: uploadErr } = await sb.storage
    .from('media')
    .upload(storagePath, file, { cacheControl: '3600', upsert: true, contentType: file.type });

  if (uploadErr) throw uploadErr;

  const { data: pubData } = sb.storage.from('media').getPublicUrl(storagePath);
  const publicUrl = pubData && pubData.publicUrl;
  if (!publicUrl) throw new Error('Failed to generate public image URL');

  // Record in media_library (non-blocking)
  sb.from('media_library').insert([{
    title: file.name,
    filename: safeName,
    file_url: publicUrl,
    file_type: 'image',
    category: folder,
    uploaded_by: window.CURRENT_ADMIN_USER?.id || null
  }]).then(() => { }).catch(() => { });

  return publicUrl;
}

/**
 * Master WhatsApp Template Library & Dynamic Formatter
 */
const DEFAULT_WHATSAPP_TEMPLATES = {
  payment_instructions: `Namaste {customer_name},
Greetings from Arunachaleshwara Tours & Travels, Tiruvannamalai.

Regarding your booking *{booking_id}*:
Total Estimated: {estimated_amount}
Suggested Advance: {advance_amount}

Please transfer via UPI / Bank Transfer:
*UPI / GPay / PhonePe:* {upi_id}
*Name:* {account_name}

Once paid, kindly share the payment screenshot or UTR number on this WhatsApp chat so we can verify and confirm your room immediately. Om Namah Shivaya!`,

  booking_confirmed: `*BOOKING CONFIRMED - ARUNACHALESHWARA TOURS & TRAVELS*

Namaste {customer_name},
Your booking has been officially CONFIRMED!

*Booking ID:* {booking_id}
{booking_details}
*Amount Paid:* {amount_paid}
*Balance Due:* {balance_due}

Location: {location}
We look forward to serving you. Om Namah Shivaya!`,

  invoice_delivery: `Dear {customer_name},
Thank you for choosing Arunachaleshwara Tours & Travels.

Your booking has been confirmed.
*Booking ID:* {booking_id}
*Invoice Number:* {invoice_number}
*Total Amount:* {total_amount}
*Amount Paid:* {amount_paid}
*Balance Due:* {balance_due}

Please reply if you need the PDF copy re-attached. Om Namah Shivaya!`,

  enquiry_reply: `Namaste {customer_name}! Thank you for enquiring about {service_type} at Arunachaleshwara Tours & Travels. How can we help you plan your sacred journey?`,

  customer_outreach: `Namaste {customer_name}! Greetings from Arunachaleshwara Tours & Travels, Tiruvannamalai. How may we assist you today?`
};

let _cachedWhatsAppTemplates = null;

async function getWhatsAppTemplates(forceRefresh = false) {
  if (!forceRefresh && _cachedWhatsAppTemplates) return _cachedWhatsAppTemplates;
  if (!forceRefresh) {
    const cached = adminCacheGet('whatsapp_templates', 60 * 1000);
    if (cached) {
      _cachedWhatsAppTemplates = cached;
      return cached;
    }
  }
  if (!window.adminSupabase) return DEFAULT_WHATSAPP_TEMPLATES;
  try {
    const { data } = await window.adminSupabase
      .from('whatsapp_settings')
      .select('templates')
      .maybeSingle();
    const custom = (data && data.templates) || {};
    const merged = { ...DEFAULT_WHATSAPP_TEMPLATES };
    for (const [k, v] of Object.entries(custom)) {
      if (v && String(v).trim().length > 0) {
        merged[k] = v;
      }
    }
    _cachedWhatsAppTemplates = merged;
    adminCacheSet('whatsapp_templates', _cachedWhatsAppTemplates);
    return _cachedWhatsAppTemplates;
  } catch (e) {
    console.warn('Error loading whatsapp templates:', e);
    return DEFAULT_WHATSAPP_TEMPLATES;
  }
}

function renderWhatsAppTemplate(templateStr, vars = {}) {
  let out = String(templateStr || '');
  for (const [k, v] of Object.entries(vars)) {
    const safeVal = v !== undefined && v !== null ? String(v) : '';
    out = out.split(`{${k}}`).join(safeVal);
  }
  return out;
}

function clearWhatsAppTemplatesCache() {
  _cachedWhatsAppTemplates = null;
  try { sessionStorage.removeItem('arn_cache_whatsapp_templates'); } catch (e) { }
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

window.escapeHtml = escapeHtml;
window.renderAdminSidebar = renderAdminSidebar;
window.renderAdminHeader = renderAdminHeader;
window.showAdminToast = showAdminToast;
window.formatINR = formatINR;
window.formatDate = formatDate;
window.getStatusBadge = getStatusBadge;
window.openWhatsAppShare = openWhatsAppShare;
window.adminCacheGet = adminCacheGet;
window.adminCacheSet = adminCacheSet;
window.resolveAdminImgSrc = resolveAdminImgSrc;
window.uploadAdminImage = uploadAdminImage;
window.DEFAULT_WHATSAPP_TEMPLATES = DEFAULT_WHATSAPP_TEMPLATES;
window.getWhatsAppTemplates = getWhatsAppTemplates;
window.renderWhatsAppTemplate = renderWhatsAppTemplate;
window.clearWhatsAppTemplatesCache = clearWhatsAppTemplatesCache;

// Auto-load Real-Time Sync in Admin
(function initAdminRealtime() {
  if (typeof window !== 'undefined' && typeof window.ArnRealtimeSync === 'undefined') {
    const s = document.createElement('script');
    s.src = 'assets/js/realtime-sync.js';
    s.defer = true;
    document.head.appendChild(s);
  }
})();

