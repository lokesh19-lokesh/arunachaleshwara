/* ============================================================
   ARUNACHALESHWARA – Forms Validation & Handling
   ============================================================ */

const WHATSAPP_NUMBER = '919010515341';
const CONTACT_EMAIL = 'arunachalaeswara2025@gmail.com';

function safeEscape(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

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
      name: (form.querySelector('#contactName')?.value || '').trim(),
      mobile: (form.querySelector('#contactMobile')?.value || '').trim(),
      email: (form.querySelector('#contactEmail')?.value || '').trim(),
      subject: (form.querySelector('#contactSubject')?.value || 'General Enquiry').trim(),
      message: (form.querySelector('#contactMessage')?.value || '').trim()
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<i class="bi bi-send-fill"></i> Prepare &amp; Send Message';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending to ' + CONTACT_EMAIL + '...';
    }

    // 1. Submit to Supabase asynchronously
    if (typeof submitContactMessageToSupabase === 'function') {
      submitContactMessageToSupabase({
        name: formData.name,
        phone: formData.mobile,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      }).catch(err => console.warn('Supabase contact submission error:', err));
    }

    // 2. Prepare Direct Mailto URL
    const mailSubject = encodeURIComponent(`[Arunachaleshwara Enquiry] ${formData.subject}`);
    const mailBody = encodeURIComponent(
      `Devotee Name: ${formData.name}\n` +
      `Mobile Number: ${formData.mobile}\n` +
      `Email Address: ${formData.email}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Travel Requirement / Message:\n${formData.message}\n\n` +
      `---\nSent from Arunachaleshwara Tours & Travels Website (contact.html)`
    );
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

    // 3. Build WhatsApp message
    const waMessage = encodeURIComponent(
      `*New Contact Enquiry*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Mobile:* ${formData.mobile}\n` +
      `*Email:* ${formData.email}\n` +
      `*Subject:* ${formData.subject}\n` +
      `*Message:* ${formData.message}`
    );

    // 4. Send email directly to arunachalaeswara2025@gmail.com via FormSubmit AJAX
    fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New Travel Message: ${formData.subject} - ${formData.name}`,
        _template: 'table',
        _captcha: 'false',
        "Devotee Name": formData.name,
        "Mobile Number": formData.mobile,
        "Email Address": formData.email,
        "Subject": formData.subject,
        "Travel Requirement / Message": formData.message,
        "Submission Time": new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    }).then(res => res.json()).then(data => {
      console.log('FormSubmit email delivered:', data);
    }).catch(err => {
      console.warn('FormSubmit background notification notice:', err);
    }).finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });

    // 5. Show prominent confirmation message
    showFormMessage(form, 'success',
      `<div class="p-3 bg-light rounded-3 border border-success">` +
      `<h6 class="text-success fw-bold mb-2"><i class="bi bi-check-circle-fill me-1"></i> Data Delivered to ${CONTACT_EMAIL}</h6>` +
      `<p class="small mb-2">Thank you, <strong>${safeEscape(formData.name)}</strong>! Your details have been sent to <strong>${CONTACT_EMAIL}</strong> and logged in our system.</p>` +
      `<div class="d-flex flex-wrap gap-2 mt-3">` +
      `<a href="${mailtoUrl}" class="btn btn-outline-dark btn-sm"><i class="bi bi-envelope-fill me-1"></i> Open Mail Client</a>` +
      `<a href="https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm"><i class="bi bi-whatsapp me-1"></i> Instant WhatsApp Reply</a>` +
      `</div>` +
      `</div>`
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

    // Save enquiry to Supabase asynchronously
    if (typeof submitEnquiryToSupabase === 'function') {
      submitEnquiryToSupabase({
        serviceType: formData.service,
        destination: formData.destination,
        customerName: formData.name,
        phone: formData.mobile,
        email: formData.email,
        travelDate: formData.travelDate,
        pickupLocation: formData.pickup,
        passengers: (parseInt(formData.adults) || 1) + (parseInt(formData.children) || 0),
        vehicleType: formData.service && formData.service.includes('Taxi') ? 'Taxi / Car' : null,
        specialRequests: formData.requirements || null
      }).catch(err => console.warn('Supabase enquiry submit error:', err));
    }

    // Forward detailed enquiry email to arunachalaeswara2025@gmail.com
    fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New Detailed Pilgrimage Enquiry: ${formData.service || 'Travel'} - ${formData.name}`,
        _template: 'table',
        _captcha: 'false',
        "Devotee Name": formData.name,
        "Mobile Number": formData.mobile,
        "Email Address": formData.email,
        "Travel Date": formData.travelDate || 'Not specified',
        "Group Size": `${formData.adults || 1} Adults, ${formData.children || 0} Children`,
        "Service Type": formData.service || 'Not specified',
        "Destination": formData.destination || 'Tiruvannamalai',
        "Duration": formData.days ? `${formData.days} Days` : 'Not specified',
        "Pickup Location": formData.pickup || 'Not specified',
        "Special Requirements": formData.requirements || 'None',
        "Submission Time": new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      })
    }).catch(err => console.warn('Enquiry email delivery note:', err));

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
          <p class="mb-0 small">Your enquiry details have been recorded in our system. Click the WhatsApp button below to instantly connect with our pilgrimage coordinator with your pre-filled travel details.</p>
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

