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
    try { loadWaLogs(); } catch (e) {}
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
  try { sessionStorage.removeItem('arn_cache_whatsapp_templates'); } catch (e) {}
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
window.DEFAULT_WHATSAPP_TEMPLATES = DEFAULT_WHATSAPP_TEMPLATES;
window.getWhatsAppTemplates = getWhatsAppTemplates;
window.renderWhatsAppTemplate = renderWhatsAppTemplate;
window.clearWhatsAppTemplatesCache = clearWhatsAppTemplatesCache;

