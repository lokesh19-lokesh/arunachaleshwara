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

  const user = window.CURRENT_ADMIN_USER || { fullName: 'Admin', role: 'Super Admin', isMainAdmin: true };
  const initials = (user.fullName || 'A').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const navItems = [
    { header: 'CORE' },
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-grid-1x2-fill', href: 'dashboard.html', module: 'dashboard' },

    { header: 'BOOKING MANAGEMENT' },
    { id: 'bookings', label: 'All Bookings', icon: 'bi-calendar-check-fill', href: 'bookings.html', module: 'bookings' },
    { id: 'operations', label: 'Room Operations', icon: 'bi-door-open-fill', href: 'operations.html', module: 'accommodation' },

    { header: 'INVENTORY & CATALOG' },
    { id: 'accommodation', label: 'Accommodation (17 Rooms)', icon: 'bi-building-fill', href: 'accommodation.html', module: 'accommodation' },
    { id: 'services', label: 'Services & Tours', icon: 'bi-compass-fill', href: 'services.html', module: 'services' },

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
    if (!canAccessModule(item.module)) return;

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
    <a href="dashboard.html" class="admin-sidebar-brand">
      <img src="../assets/images/logo/logo.png" alt="Arunachaleshwara">
      <div class="admin-sidebar-brand-text">
        ARUNACHALESHWARA
        <span>ADMIN PORTAL</span>
      </div>
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
 * Render Top Header Bar
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
    <div class="admin-header-actions">
      <a href="../accommodation.html" target="_blank" class="btn btn-sm btn-outline-secondary d-none d-sm-inline-flex align-items-center gap-1">
        <i class="bi bi-globe"></i> Website
      </a>
      <button class="btn btn-sm btn-admin-yellow" onclick="location.reload()">
        <i class="bi bi-arrow-clockwise"></i> Refresh
      </button>
    </div>
  `;
}

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
  const cleanPhone = String(phone).replace(/[^0-9]/g, '');
  const finalPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;

  // Log message attempt to whatsapp_messages
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
      console.warn('WhatsApp log error:', e);
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
  } catch (e) {}
  return null;
}

function adminCacheSet(key, data) {
  try {
    sessionStorage.setItem('arn_cache_' + key, JSON.stringify({ data, _ts: Date.now() }));
  } catch (e) {}
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
  if (!window.adminSupabase) throw new Error('Supabase client not initialized');
  if (!file) throw new Error('No file selected');
  if (file.size > 10 * 1024 * 1024) throw new Error('Image must be smaller than 10 MB');

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `${folder}/${Date.now()}-${safeName}`;

  const { error: uploadErr } = await window.adminSupabase.storage
    .from('media')
    .upload(storagePath, file, { cacheControl: '3600', upsert: true, contentType: file.type });

  if (uploadErr) throw uploadErr;

  const { data: pubData } = window.adminSupabase.storage.from('media').getPublicUrl(storagePath);
  const publicUrl = pubData && pubData.publicUrl;
  if (!publicUrl) throw new Error('Failed to generate public image URL');

  // Record in media_library (non-blocking)
  window.adminSupabase.from('media_library').insert([{
    title: file.name,
    filename: safeName,
    file_url: publicUrl,
    file_type: 'image',
    category: folder,
    uploaded_by: window.CURRENT_ADMIN_USER ? window.CURRENT_ADMIN_USER.id : null
  }]).then(() => {}).catch(() => {});

  return publicUrl;
}

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

