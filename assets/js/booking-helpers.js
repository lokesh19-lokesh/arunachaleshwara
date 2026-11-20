/* ============================================================
   ARUNACHALESHWARA – Dynamic Guest Manager & Secure Document Uploader
   Universal Helper for Accommodation & All 4 Travel Services
   ============================================================ */

/**
 * Dynamically render individual Adult and Child guest information fields
 * Preserves already entered names & ages when counts increase or decrease.
 *
 * @param {string} containerId - Target element ID
 * @param {number} numAdults - Total adults
 * @param {number} numChildren - Total children
 * @param {object} [options] - Custom labels, etc.
 */
function renderDynamicGuests(containerId, numAdults, numChildren = 0, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 1. Capture existing input values so user data is never lost when changing counts
  const previousValues = {};
  container.querySelectorAll('[data-guest-field]').forEach(input => {
    const key = input.dataset.guestField; // e.g. "adult-1-name", "adult-1-age"
    previousValues[key] = input.value;
  });

  const adultLabel = options.adultLabel || 'Adult';
  const childLabel = options.childLabel || 'Child';
  const showGender = options.showGender || false;

  let html = '';

  // Render Adults
  if (numAdults > 0) {
    html += `
      <div class="col-12 mt-2 mb-1">
        <h6 class="fw-bold text-maroon mb-1 d-flex align-items-center gap-2">
          <i class="bi bi-people-fill text-gold"></i> ${adultLabel} Guest Details (${numAdults})
        </h6>
        <div class="small text-muted">Please provide the full name and age for every ${adultLabel.toLowerCase()} guest.</div>
      </div>
    `;

    for (let i = 1; i <= numAdults; i++) {
      const nameKey = `adult-${i}-name`;
      const ageKey = `adult-${i}-age`;
      const genderKey = `adult-${i}-gender`;

      const prevName = previousValues[nameKey] || '';
      const prevAge = previousValues[ageKey] || '';
      const prevGender = previousValues[genderKey] || 'Male';

      html += `
        <div class="col-12">
          <div class="p-3 rounded-3 border bg-light guest-card-item">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-maroon text-white fw-bold px-2 py-1">${adultLabel} ${i}</span>
              ${i === 1 ? '<span class="badge bg-warning text-dark"><i class="bi bi-star-fill me-1"></i>Primary Guest</span>' : ''}
            </div>
            <div class="row g-2">
              <div class="${showGender ? 'col-md-6' : 'col-md-8'}">
                <label class="form-label small fw-bold text-dark mb-1">${adultLabel} ${i} Full Name *</label>
                <input type="text" class="form-control form-control-sm guest-input"
                  data-guest-type="adult" data-guest-index="${i}" data-field="name" data-guest-field="${nameKey}"
                  placeholder="Enter full name as per Govt ID" value="${escapeHtml(prevName)}" required>
              </div>
              <div class="col-md-3 col-6">
                <label class="form-label small fw-bold text-dark mb-1">Age *</label>
                <input type="number" class="form-control form-control-sm guest-input"
                  data-guest-type="adult" data-guest-index="${i}" data-field="age" data-guest-field="${ageKey}"
                  placeholder="Age" min="12" max="110" value="${escapeHtml(prevAge)}" required>
              </div>
              ${showGender ? `
              <div class="col-md-3 col-6">
                <label class="form-label small fw-bold text-dark mb-1">Gender</label>
                <select class="form-select form-select-sm guest-input"
                  data-guest-type="adult" data-guest-index="${i}" data-field="gender" data-guest-field="${genderKey}">
                  <option value="Male" ${prevGender === 'Male' ? 'selected' : ''}>Male</option>
                  <option value="Female" ${prevGender === 'Female' ? 'selected' : ''}>Female</option>
                  <option value="Other" ${prevGender === 'Other' ? 'selected' : ''}>Other</option>
                </select>
              </div>` : ''}
            </div>
          </div>
        </div>
      `;
    }
  }

  // Render Children
  if (numChildren > 0) {
    html += `
      <div class="col-12 mt-3 mb-1">
        <h6 class="fw-bold text-maroon mb-1 d-flex align-items-center gap-2">
          <i class="bi bi-person-hearts text-gold"></i> ${childLabel} Details (${numChildren})
        </h6>
        <div class="small text-muted">Please provide the name and age for every accompanying child (below 12 yrs).</div>
      </div>
    `;

    for (let j = 1; j <= numChildren; j++) {
      const nameKey = `child-${j}-name`;
      const ageKey = `child-${j}-age`;
      const prevName = previousValues[nameKey] || '';
      const prevAge = previousValues[ageKey] || '';

      html += `
        <div class="col-12">
          <div class="p-3 rounded-3 border bg-light guest-card-item">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-secondary text-white fw-bold px-2 py-1">${childLabel} ${j}</span>
              <span class="small text-muted">Child (Age &lt; 12)</span>
            </div>
            <div class="row g-2">
              <div class="col-md-8 col-7">
                <label class="form-label small fw-bold text-dark mb-1">${childLabel} ${j} Full Name *</label>
                <input type="text" class="form-control form-control-sm guest-input"
                  data-guest-type="child" data-guest-index="${j}" data-field="name" data-guest-field="${nameKey}"
                  placeholder="Enter child's full name" value="${escapeHtml(prevName)}" required>
              </div>
              <div class="col-md-4 col-5">
                <label class="form-label small fw-bold text-dark mb-1">Age *</label>
                <input type="number" class="form-control form-control-sm guest-input"
                  data-guest-type="child" data-guest-index="${j}" data-field="age" data-guest-field="${ageKey}"
                  placeholder="Age" min="0" max="11" value="${escapeHtml(prevAge)}" required>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  container.innerHTML = html;
}

/**
 * Validate and collect structured guest records from dynamic container
 * @param {string} containerId
 * @returns {Array<{guest_type: string, guest_index: number, full_name: string, age: number, gender?: string}>}
 */
function collectDynamicGuests(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];

  const guestsMap = {};
  container.querySelectorAll('.guest-input').forEach(input => {
    const type = input.dataset.guestType;
    const index = parseInt(input.dataset.guestIndex) || 1;
    const field = input.dataset.field;
    const key = `${type}-${index}`;

    if (!guestsMap[key]) {
      guestsMap[key] = {
        guest_type: type,
        guest_index: index,
        full_name: '',
        age: 0,
        gender: 'Male'
      };
    }

    if (field === 'name') {
      guestsMap[key].full_name = input.value.trim();
    } else if (field === 'age') {
      guestsMap[key].age = parseInt(input.value) || 0;
    } else if (field === 'gender') {
      guestsMap[key].gender = input.value;
    }
  });

  return Object.values(guestsMap);
}

/**
 * Common Identification Document Uploader Controller
 */
class BookingDocUploader {
  constructor(containerId, serviceType, options = {}) {
    this.containerId = containerId;
    this.serviceType = serviceType;
    this.options = options;
    this.uploadedDocs = []; // Array of { document_type, file_name, file_url, file_size, file_type }
    this.init();
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    const docTypes = this.options.docTypes || [
      'Aadhaar Card',
      'Driving Licence',
      'Passport',
      'PAN Card',
      'Voter ID',
      'Other Govt ID'
    ];

    const isMandatory = this.options.mandatory || false;
    const mandatoryLabel = isMandatory ? '<span class="text-danger">* (Required)</span>' : '<span class="text-muted fw-normal">(Optional but recommended)</span>';

    container.innerHTML = `
      <div class="p-3 rounded-3 border" style="background: #FFFDF9; border-color: #E2D9CC !important;">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
          <div>
            <label class="form-label small fw-bold text-maroon mb-0">
              <i class="bi bi-file-earmark-person-fill text-gold me-1"></i>
              ${this.options.title || 'Identification Document Upload'} ${mandatoryLabel}
            </label>
            <div class="small text-muted" style="font-size: 0.76rem;">
              ${this.options.description || 'Upload Govt ID proof (Aadhaar, Driving Licence, Passport). Max 5 MB. PDF, JPG, or PNG.'}
            </div>
          </div>
          <span class="badge bg-light text-dark border"><i class="bi bi-shield-lock-fill text-success me-1"></i>Secure &amp; Encrypted</span>
        </div>

        <div class="row g-2 align-items-center mb-2">
          <div class="col-md-5 col-12">
            <select class="form-select form-select-sm" id="${this.containerId}_docType">
              ${docTypes.map((dt, idx) => `<option value="${dt}" ${idx === 0 ? 'selected' : ''}>${dt}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-7 col-12 d-flex gap-2">
            <input type="file" id="${this.containerId}_fileInput" class="d-none" accept=".pdf,image/png,image/jpeg,image/jpg">
            <button type="button" class="btn btn-sm btn-outline-maroon flex-grow-1" onclick="document.getElementById('${this.containerId}_fileInput').click()">
              <i class="bi bi-cloud-arrow-up-fill me-1"></i> Choose Document File
            </button>
          </div>
        </div>

        <!-- Upload Status Indicator -->
        <div id="${this.containerId}_status" class="small text-muted mb-2"></div>

        <!-- Uploaded Documents List Container -->
        <div id="${this.containerId}_list" class="d-flex flex-column gap-2 mt-2"></div>
      </div>
    `;

    const fileInput = document.getElementById(`${this.containerId}_fileInput`);
    if (fileInput) {
      fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    }
  }

  async handleFileSelect(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById(`${this.containerId}_status`);
    const docTypeSelect = document.getElementById(`${this.containerId}_docType`);
    const docType = docTypeSelect ? docTypeSelect.value : 'Govt ID';

    // File type and size validations
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only PDF, JPG, and PNG files are accepted.');
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Document file size must be less than 5 MB.');
      e.target.value = '';
      return;
    }

    if (statusEl) {
      statusEl.innerHTML = '<span class="spinner-border spinner-border-sm text-warning me-1"></span>Processing document...';
    }

    try {
      // 1. Generate local preview / base64 for reliable instant viewing
      const dataUrl = await this.readFileAsDataURL(file);

      let publicUrl = dataUrl;

      // 2. Upload to Supabase Storage if available
      if (window.supabaseClient && window.supabaseClient.storage) {
        try {
          const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
          const storagePath = `documents/${this.serviceType}/${Date.now()}-${safeName}`;
          const { data: upData, error: upErr } = await window.supabaseClient.storage
            .from('media')
            .upload(storagePath, file, { cacheControl: '3600', upsert: true, contentType: file.type });

          if (!upErr && upData) {
            const { data: pubData } = window.supabaseClient.storage.from('media').getPublicUrl(storagePath);
            if (pubData && pubData.publicUrl) {
              publicUrl = pubData.publicUrl;
            }
          }
        } catch (storageErr) {
          console.warn('Storage bucket upload fallback to data URL:', storageErr);
        }
      }

      // Add to uploaded docs
      this.uploadedDocs.push({
        document_type: docType,
        file_name: file.name,
        file_url: publicUrl,
        file_size: file.size,
        file_type: file.type
      });

      if (statusEl) {
        statusEl.innerHTML = `<span class="text-success"><i class="bi bi-check-circle-fill me-1"></i>Document "${escapeHtml(file.name)}" attached successfully!</span>`;
      }
      this.renderDocsList();
    } catch (err) {
      console.error('File reading error:', err);
      if (statusEl) statusEl.innerHTML = '<span class="text-danger">Failed to process document file.</span>';
    } finally {
      e.target.value = '';
    }
  }

  readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  renderDocsList() {
    const listEl = document.getElementById(`${this.containerId}_list`);
    if (!listEl) return;

    if (this.uploadedDocs.length === 0) {
      listEl.innerHTML = '';
      return;
    }

    listEl.innerHTML = this.uploadedDocs.map((doc, idx) => {
      const isPdf = (doc.file_type || '').includes('pdf') || (doc.file_name || '').endsWith('.pdf');
      const icon = isPdf ? 'bi-file-earmark-pdf-fill text-danger' : 'bi-file-earmark-image-fill text-primary';
      const sizeKb = Math.round(doc.file_size / 1024) || '—';

      return `
        <div class="d-flex justify-content-between align-items-center p-2 rounded-2 border bg-white shadow-sm">
          <div class="d-flex align-items-center gap-2 overflow-hidden me-2">
            <i class="bi ${icon} fs-5 flex-shrink-0"></i>
            <div class="text-truncate">
              <span class="badge bg-light text-dark border me-1">${escapeHtml(doc.document_type)}</span>
              <span class="small fw-semibold text-dark text-truncate">${escapeHtml(doc.file_name)}</span>
              <span class="small text-muted ms-1">(${sizeKb} KB)</span>
            </div>
          </div>
          <div class="flex-shrink-0 d-flex gap-1">
            <a href="${doc.file_url}" target="_blank" class="btn btn-xs btn-outline-secondary py-1 px-2 small" title="Preview Document">
              <i class="bi bi-eye"></i> View
            </a>
            <button type="button" class="btn btn-xs btn-outline-danger py-1 px-2 small" onclick="window['${this.containerId}_uploader'].removeDoc(${idx})" title="Remove">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  removeDoc(idx) {
    this.uploadedDocs.splice(idx, 1);
    this.renderDocsList();
    const statusEl = document.getElementById(`${this.containerId}_status`);
    if (statusEl) statusEl.textContent = '';
  }

  getDocuments() {
    return this.uploadedDocs;
  }
}

/**
 * Escape HTML to prevent XSS in dynamic templates
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Global exports
window.renderDynamicGuests = renderDynamicGuests;
window.collectDynamicGuests = collectDynamicGuests;
window.BookingDocUploader = BookingDocUploader;
window.escapeHtml = escapeHtml;
