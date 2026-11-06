/* ============================================================
   ARUNACHALESHWARA – Forms Validation & Handling
   ============================================================ */

const WHATSAPP_NUMBER = '919010515341';

/**
 * Initialize contact form
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateForm(form)) return;

    const formData = {
      name: form.querySelector('#contactName').value.trim(),
      mobile: form.querySelector('#contactMobile').value.trim(),
      email: form.querySelector('#contactEmail').value.trim(),
      subject: form.querySelector('#contactSubject').value.trim(),
      message: form.querySelector('#contactMessage').value.trim()
    };

    // Build WhatsApp message
    const waMessage = `*New Contact Enquiry*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Mobile:* ${formData.mobile}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Subject:* ${formData.subject}%0A` +
      `*Message:* ${formData.message}`;

    // Show success message with WhatsApp option
    showFormMessage(form, 'success',
      `Thank you, ${formData.name}! Your message has been prepared. ` +
      `Click the button below to send it via WhatsApp. ` +
      `<br><br><a href="https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm mt-2">` +
      `<i class="bi bi-whatsapp"></i> Send via WhatsApp</a>` +
      `<br><small class="text-muted d-block mt-2">Note: This form does not store your data on a server. ` +
      `Your enquiry will be sent directly via WhatsApp.</small>`
    );

    form.reset();
  });
}

/**
 * Initialize enquiry form
 */
function initEnquiryForm() {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  // Pre-fill from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const preService = urlParams.get('service');
  const preDestination = urlParams.get('destination');

  if (preService) {
    const serviceSelect = form.querySelector('#enquiryService');
    if (serviceSelect) {
      // Try to match
      for (let option of serviceSelect.options) {
        if (option.text.toLowerCase().includes(preService.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }
  }

  if (preDestination) {
    const destInput = form.querySelector('#enquiryDestination');
    if (destInput) destInput.value = preDestination;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateForm(form)) return;

    const formData = {
      name: form.querySelector('#enquiryName').value.trim(),
      mobile: form.querySelector('#enquiryMobile').value.trim(),
      email: form.querySelector('#enquiryEmail').value.trim(),
      travelDate: form.querySelector('#enquiryDate').value,
      adults: form.querySelector('#enquiryAdults').value,
      children: form.querySelector('#enquiryChildren').value,
      service: form.querySelector('#enquiryService').value,
      destination: form.querySelector('#enquiryDestination').value.trim(),
      days: form.querySelector('#enquiryDays').value,
      pickup: form.querySelector('#enquiryPickup').value.trim(),
      requirements: form.querySelector('#enquiryRequirements').value.trim()
    };

    // Show summary
    const summaryContainer = document.getElementById('enquirySummary');
    if (summaryContainer) {
      summaryContainer.style.display = 'block';
      summaryContainer.innerHTML = `
      <div class="enquiry-summary" data-aos="fade-up">
        <h5><i class="bi bi-clipboard-check text-gold me-2"></i>Enquiry Summary</h5>
        <table class="table table-borderless mb-3">
          <tbody>
            <tr><td>Name</td><td>${formData.name}</td></tr>
            <tr><td>Mobile</td><td>${formData.mobile}</td></tr>
            <tr><td>Email</td><td>${formData.email}</td></tr>
            <tr><td>Travel Date</td><td>${formData.travelDate || 'Not specified'}</td></tr>
            <tr><td>Adults</td><td>${formData.adults || '–'}</td></tr>
            <tr><td>Children</td><td>${formData.children || '0'}</td></tr>
            <tr><td>Service</td><td>${formData.service || 'Not specified'}</td></tr>
            <tr><td>Destination</td><td>${formData.destination || 'Not specified'}</td></tr>
            <tr><td>No. of Days</td><td>${formData.days || 'Not specified'}</td></tr>
            <tr><td>Pickup Location</td><td>${formData.pickup || 'Not specified'}</td></tr>
            ${formData.requirements ? `<tr><td>Requirements</td><td>${formData.requirements}</td></tr>` : ''}
          </tbody>
        </table>

        <div class="alert" style="background: rgba(22, 139, 85, 0.08); border: 1px solid var(--clr-success); border-radius: var(--border-radius);">
          <p class="mb-2" style="color: var(--clr-success); font-weight: 600;">
            <i class="bi bi-info-circle me-1"></i> How to submit your enquiry:
          </p>
          <p class="mb-0 small">Click the WhatsApp button below to send your enquiry directly to our team. WhatsApp will open with your details pre-filled. This enquiry is not stored on any server – it is sent directly to our business WhatsApp number.</p>
        </div>

        <div class="d-grid gap-2 mt-3">
          <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${buildEnquiryWhatsApp(formData)}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg justify-content-center">
            <i class="bi bi-whatsapp"></i> Send Enquiry via WhatsApp
          </a>
          <a href="tel:+91${NAV_CONFIG.phone}" class="btn btn-outline-maroon justify-content-center">
            <i class="bi bi-telephone-fill"></i> Or Call Us Directly
          </a>
        </div>
      </div>`;

      // Scroll to summary
      summaryContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

/**
 * Build WhatsApp message for enquiry
 */
function buildEnquiryWhatsApp(data) {
  let msg = `*Travel Enquiry*%0A%0A`;
  msg += `*Name:* ${data.name}%0A`;
  msg += `*Mobile:* ${data.mobile}%0A`;
  msg += `*Email:* ${data.email}%0A`;
  if (data.travelDate) msg += `*Travel Date:* ${data.travelDate}%0A`;
  if (data.adults) msg += `*Adults:* ${data.adults}%0A`;
  if (data.children) msg += `*Children:* ${data.children}%0A`;
  if (data.service) msg += `*Service:* ${data.service}%0A`;
  if (data.destination) msg += `*Destination:* ${data.destination}%0A`;
  if (data.days) msg += `*Days:* ${data.days}%0A`;
  if (data.pickup) msg += `*Pickup:* ${data.pickup}%0A`;
  if (data.requirements) msg += `*Requirements:* ${data.requirements}%0A`;
  msg += `%0APlease share details and availability. Thank you!`;
  return msg;
}

/**
 * Validate form fields
 */
function validateForm(form) {
  let isValid = true;

  // Clear previous errors
  form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
  form.querySelectorAll('.invalid-feedback').forEach(el => el.remove());

  // Check required fields
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      markInvalid(field, 'This field is required.');
      isValid = false;
    }
  });

  // Email validation
  const emailFields = form.querySelectorAll('[type="email"]');
  emailFields.forEach(field => {
    if (field.value.trim() && !isValidEmail(field.value.trim())) {
      markInvalid(field, 'Please enter a valid email address.');
      isValid = false;
    }
  });

  // Mobile validation
  const mobileFields = form.querySelectorAll('[data-validate="mobile"]');
  mobileFields.forEach(field => {
    if (field.value.trim() && !isValidMobile(field.value.trim())) {
      markInvalid(field, 'Please enter a valid 10-digit mobile number.');
      isValid = false;
    }
  });

  if (!isValid) {
    // Scroll to first error
    const firstError = form.querySelector('.is-invalid');
    if (firstError) {
      firstError.focus();
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  return isValid;
}

/**
 * Mark a field as invalid
 */
function markInvalid(field, message) {
  field.classList.add('is-invalid');
  const feedback = document.createElement('div');
  feedback.className = 'invalid-feedback';
  feedback.textContent = message;
  field.parentNode.appendChild(feedback);
}

/**
 * Show form message (success or error)
 */
function showFormMessage(form, type, message) {
  // Remove existing messages
  form.querySelectorAll('.form-message').forEach(el => el.remove());

  const msgDiv = document.createElement('div');
  msgDiv.className = `form-message ${type}`;
  msgDiv.innerHTML = message;
  form.appendChild(msgDiv);

  // Scroll to message
  msgDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Validate email
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate Indian mobile number
 */
function isValidMobile(mobile) {
  const cleaned = mobile.replace(/[\s\-\+]/g, '');
  // Accept 10-digit or with +91/91 prefix
  return /^(\+?91)?[6-9]\d{9}$/.test(cleaned);
}

// Make functions globally accessible
window.initContactForm = initContactForm;
window.initEnquiryForm = initEnquiryForm;

