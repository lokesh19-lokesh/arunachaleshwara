/* ============================================================
   ARUNACHALESHWARA – Dynamic Accommodation & Booking Request Engine
   100% Manual Payment Workflow (No Payment Gateway)
   ============================================================ */

let ACC_CATEGORIES = [
  {
    id: 'fallback-big2',
    slug: 'big-2-bed-room',
    name: 'Big 2-Bed Family Room',
    short_desc: 'Spacious family suite equipped with 2 large double beds, air conditioning, and attached modern bathroom.',
    base_price: 2200,
    max_guests: 4,
    default_beds: '2 Double Beds',
    facilities: ['Air Conditioning', '2 Double Beds', 'Attached Western Bathroom', '24/7 Hot Water', 'Free Wi-Fi', 'Power Backup'],
    image: 'assets/images/services/Accommodation.png',
    roomNumbers: ['101']
  },
  {
    id: 'fallback-big',
    slug: 'big-room',
    name: 'Big Deluxe Room',
    short_desc: 'Large spacious room with king bed and ample space for extra bedding, ideal for 3 to 4 guests.',
    base_price: 1800,
    max_guests: 3,
    default_beds: '1 King Bed / Extra Mattress Space',
    facilities: ['Air Conditioning', 'King Size Bed', 'Attached Western Bathroom', '24/7 Hot Water', 'Free Wi-Fi', 'Room Service'],
    image: 'assets/images/gallery/Accommodation1.jpeg',
    roomNumbers: ['109', '110', '116', '201']
  },
  {
    id: 'fallback-small',
    slug: 'small-room',
    name: 'Standard Small Room',
    short_desc: 'Cozy, hygienic, and affordable room tailored for solo pilgrims and couples visiting Arunachala.',
    base_price: 1200,
    max_guests: 2,
    default_beds: '1 Double Bed',
    facilities: ['Air Conditioning / Fan', 'Double Bed', 'Attached Clean Bathroom', 'Hot Water', 'Free Wi-Fi'],
    image: 'assets/images/gallery/Accommodation2.jpg',
    roomNumbers: ['102', '103', '104', '105', '106', '107', '108', '111', '112', '113', '114', '115']
  }
];

let ACC_ROOMS = [];
let WA_ACCOMMODATION_NUMBER = '919010515341';

async function initAccommodationPage() {
  // Set default dates (Tomorrow -> Day after)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(tomorrow);
  dayAfter.setDate(dayAfter.getDate() + 1);

  const fmt = d => d.toISOString().split('T')[0];
  const fIn = document.getElementById('filterCheckIn');
  const fOut = document.getElementById('filterCheckOut');
  if (fIn) { fIn.value = fmt(tomorrow); fIn.min = fmt(today); }
  if (fOut) { fOut.value = fmt(dayAfter); fOut.min = fmt(tomorrow); }

  // Immediate render from fallback cache (zero flicker)
  renderAccommodationCards();

  // Hydrate live from Supabase
  if (window.supabaseClient) {
    try {
      const [{ data: cats }, { data: rooms }, { data: wa }] = await Promise.all([
        window.supabaseClient.from('accommodation_categories').select('*').eq('is_active', true).order('order_num'),
        window.supabaseClient.from('accommodation_rooms').select('*').eq('is_active', true).order('room_number'),
        window.supabaseClient.from('whatsapp_settings').select('accommodation_number').maybeSingle()
      ]);

      if (wa && wa.accommodation_number) {
        WA_ACCOMMODATION_NUMBER = wa.accommodation_number;
      }

      if (rooms && rooms.length > 0) {
        ACC_ROOMS = rooms;
      }

      if (cats && cats.length > 0) {
        ACC_CATEGORIES = cats.map(c => ({
          ...c,
          roomNumbers: ACC_ROOMS.filter(r => r.category_id === c.id).map(r => r.room_number),
          availableCount: ACC_ROOMS.filter(r => r.category_id === c.id && r.status === 'Available').length
        }));
        // Keep public filterCategory dropdown synced with dynamic Admin categories
        const catFilterEl = document.getElementById('filterCategory');
        if (catFilterEl) {
          const prev = catFilterEl.value;
          catFilterEl.innerHTML = `<option value="all">All Rooms</option>` +
            ACC_CATEGORIES.map(c => `<option value="${c.slug}">${c.name}</option>`).join('');
          if (Array.from(catFilterEl.options).some(o => o.value === prev)) {
            catFilterEl.value = prev;
          }
        }
        renderAccommodationCards();
      }
    } catch (err) {
      console.warn('Supabase accommodation hydration error:', err);
    }
  }

  // Bind filter & sort listeners
  ['filterCategory', 'filterGuests', 'sortRooms'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', renderAccommodationCards);
  });

  // Bind booking modal recalculation listeners
  ['bCheckIn', 'bCheckOut', 'bCategorySelect'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', calculateBookingEstimate);
  });

  // Bind booking form submission
  const bForm = document.getElementById('accommodationBookingForm');
  if (bForm) {
    bForm.addEventListener('submit', handleBookingRequestSubmit);
  }
}

function renderAccommodationCards() {
  const container = document.getElementById('roomsCatalogGrid');
  if (!container) return;

  const catFilter = document.getElementById('filterCategory')?.value || 'all';
  const guestsFilter = parseInt(document.getElementById('filterGuests')?.value || '1');
  const sortMode = document.getElementById('sortRooms')?.value || 'default';

  let list = [...ACC_CATEGORIES];

  if (catFilter !== 'all') {
    list = list.filter(c => c.slug === catFilter || c.name.toLowerCase().includes(catFilter));
  }
  if (guestsFilter > 1) {
    list = list.filter(c => (c.max_guests || 2) >= guestsFilter);
  }

  if (sortMode === 'price-asc') list.sort((a, b) => Number(a.base_price) - Number(b.base_price));
  if (sortMode === 'price-desc') list.sort((a, b) => Number(b.base_price) - Number(a.base_price));
  if (sortMode === 'capacity') list.sort((a, b) => Number(b.max_guests) - Number(a.max_guests));

  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-building-exclamation fs-1 text-gold"></i>
        <h4 class="mt-3">No Matching Rooms Found</h4>
        <p class="text-muted">Try adjusting your guest count or room category filter.</p>
      </div>`;
    return;
  }

  container.innerHTML = list.map((cat, idx) => {
    const roomCount = cat.roomNumbers ? cat.roomNumbers.length : 1;
    const availCount = typeof cat.availableCount === 'number' ? cat.availableCount : roomCount;
    const facilitiesHtml = (cat.facilities || []).slice(0, 6).map(f =>
      `<span class="badge bg-cream text-maroon border border-gold-2 me-1 mb-1 fw-normal"><i class="bi bi-check2 text-gold me-1"></i>${f}</span>`
    ).join('');

    const roomsListText = cat.roomNumbers && cat.roomNumbers.length > 0
      ? `Rooms: ${cat.roomNumbers.join(', ')}`
      : '';

    return `
    <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="${idx * 100}">
      <div class="tour-card h-100 d-flex flex-column shadow-sm">
        <div class="tour-card-img position-relative">
          <img src="${cat.image || 'assets/images/services/Accommodation.png'}" alt="${cat.name}" style="height: 230px; width: 100%; object-fit: cover;">
          <span class="tour-card-badge" style="background: #45120E; color: #FFC908;">
            <i class="bi bi-door-open me-1"></i> ${availCount} of ${roomCount} Available
          </span>
        </div>
        <div class="tour-card-body d-flex flex-column flex-grow-1 p-4">
          <h4 class="text-maroon fw-bold mb-1">${cat.name}</h4>
          <div class="small text-muted mb-2"><i class="bi bi-hash text-gold"></i> ${roomsListText}</div>
          <p class="small text-muted mb-3">${cat.short_desc}</p>

          <div class="d-flex gap-3 mb-3 small fw-semibold text-dark bg-cream p-2 rounded">
            <span><i class="bi bi-people-fill text-gold me-1"></i> Max ${cat.max_guests} Guests</span>
            <span><i class="bi bi-moon-stars-fill text-gold me-1"></i> ${cat.default_beds}</span>
          </div>

          <div class="mb-3 flex-grow-1">
            ${facilitiesHtml}
          </div>

          <div class="pt-3 border-top d-flex align-items-center justify-content-between mt-auto">
            <div>
              <div class="fs-4 fw-bold text-maroon lh-1">₹${Number(cat.base_price).toLocaleString('en-IN')}</div>
              <small class="text-muted">per night (Est.)</small>
            </div>
            <button class="btn btn-primary-custom" onclick="openBookingRequestModal('${cat.slug}')">
              Book Now <i class="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');
}

function openBookingRequestModal(categorySlug) {
  // Reset views
  document.getElementById('bookingFormSection').classList.remove('d-none');
  document.getElementById('bookingConfirmationSection').classList.add('d-none');

  // Populate category dropdown
  const select = document.getElementById('bCategorySelect');
  select.innerHTML = ACC_CATEGORIES.map(c =>
    `<option value="${c.id}" data-slug="${c.slug}" data-name="${c.name}" data-price="${c.base_price}" ${c.slug === categorySlug ? 'selected' : ''}>${c.name} – ₹${Number(c.base_price).toLocaleString('en-IN')}/night</option>`
  ).join('');

  // Carry over filter dates & guests
  document.getElementById('bCheckIn').value = document.getElementById('filterCheckIn')?.value || '';
  document.getElementById('bCheckOut').value = document.getElementById('filterCheckOut')?.value || '';
  document.getElementById('bGuests').value = document.getElementById('filterGuests')?.value || '2';

  calculateBookingEstimate();

  const modal = new bootstrap.Modal(document.getElementById('bookingRequestModal'));
  modal.show();
}

function calculateBookingEstimate() {
  const select = document.getElementById('bCategorySelect');
  const opt = select.options[select.selectedIndex];
  const pricePerNight = parseFloat(opt?.dataset?.price || 1200);

  const checkIn = document.getElementById('bCheckIn').value;
  const checkOut = document.getElementById('bCheckOut').value;

  let nights = 1;
  if (checkIn && checkOut) {
    const diff = (new Date(checkOut) - new Date(checkIn)) / 86400000;
    nights = diff > 0 ? Math.round(diff) : 1;
  }

  const total = nights * pricePerNight;

  document.getElementById('calcNights').textContent = `${nights} Night${nights > 1 ? 's' : ''}`;
  document.getElementById('calcRate').textContent = `₹${pricePerNight.toLocaleString('en-IN')} / night`;
  document.getElementById('calcTotal').textContent = `₹${total.toLocaleString('en-IN')}`;
}

async function handleBookingRequestSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBookingBtn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting Booking Request...';

  try {
    const select = document.getElementById('bCategorySelect');
    const opt = select.options[select.selectedIndex];
    const catId = select.value;
    const catName = opt.dataset.name;
    const pricePerNight = parseFloat(opt.dataset.price || 1200);

    const fullName = document.getElementById('bFullName').value.trim();
    const mobile = document.getElementById('bMobile').value.trim();
    const whatsapp = document.getElementById('bWhatsapp').value.trim() || mobile;
    const email = document.getElementById('bEmail').value.trim();
    const guests = parseInt(document.getElementById('bGuests').value) || 2;
    const checkIn = document.getElementById('bCheckIn').value;
    const checkOut = document.getElementById('bCheckOut').value;
    const requirements = document.getElementById('bRequirements').value.trim();

    if (new Date(checkOut) <= new Date(checkIn)) {
      alert('Check-out date must be after Check-in date.');
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-send-check-fill me-1"></i> SUBMIT BOOKING REQUEST';
      return;
    }

    const nights = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000));
    const estimatedAmount = nights * pricePerNight;

    let generatedBookingId = 'ARN-2026-' + String(Math.floor(10000 + Math.random() * 90000));

    if (window.supabaseClient) {
      // 1. Upsert customer
      const { data: custData } = await window.supabaseClient
        .from('customers')
        .upsert({
          full_name: fullName,
          mobile: mobile,
          whatsapp_number: whatsapp,
          email: email || null
        }, { onConflict: 'mobile' })
        .select('id')
        .maybeSingle();

      // 2. Insert booking request (Postgres sequence generates ARN-2026-XXXXX automatically!)
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(catId);
      const { data: bookingRow, error: bookErr } = await window.supabaseClient
        .from('accommodation_bookings')
        .insert([{
          customer_id: custData ? custData.id : null,
          customer_name: fullName,
          mobile: mobile,
          whatsapp_number: whatsapp,
          email: email || null,
          category_id: isUuid ? catId : null,
          category_name: catName,
          check_in: checkIn,
          check_out: checkOut,
          nights: nights,
          guests: guests,
          estimated_amount: estimatedAmount,
          balance_amount: estimatedAmount,
          booking_status: 'Pending Request',
          payment_status: 'Not Paid',
          special_requirements: requirements || null
        }])
        .select('booking_id')
        .single();

      if (bookErr) {
        console.error('Supabase booking insert error:', bookErr);
      } else if (bookingRow && bookingRow.booking_id) {
        generatedBookingId = bookingRow.booking_id;
      }
    }

    // Build exact formatted WhatsApp Message per Section 8 specification
    const waText =
      `NEW ACCOMMODATION BOOKING REQUEST\n` +
      `Booking ID: ${generatedBookingId}\n\n` +
      `CUSTOMER DETAILS\n` +
      `Name: ${fullName}\n` +
      `Mobile: ${mobile}\n` +
      `Email: ${email || 'Not Provided'}\n\n` +
      `ACCOMMODATION DETAILS\n` +
      `Room: ${catName}\n` +
      `Check-in: ${checkIn}\n` +
      `Check-out: ${checkOut}\n` +
      `Guests: ${guests}\n` +
      `Nights: ${nights}\n\n` +
      `PAYMENT DETAILS\n` +
      `Estimated Amount: ₹${estimatedAmount.toLocaleString('en-IN')}\n` +
      `Payment Status: NOT PAID\n` +
      `Special Requirements: ${requirements || 'None'}\n\n` +
      `Please confirm availability and share payment instructions.`;

    const cleanWaNum = String(WA_ACCOMMODATION_NUMBER).replace(/[^0-9]/g, '');
    const waLink = `https://wa.me/${cleanWaNum}?text=${encodeURIComponent(waText)}`;

    // Populate confirmation view
    document.getElementById('confBookingId').textContent = generatedBookingId;
    document.getElementById('confSummaryRoom').textContent = `${catName} (${nights} Night${nights > 1 ? 's' : ''})`;
    document.getElementById('confSummaryDates').textContent = `${checkIn} to ${checkOut} • ${guests} Guests`;
    document.getElementById('confSummaryAmount').textContent = `₹${estimatedAmount.toLocaleString('en-IN')}`;
    document.getElementById('confWhatsappBtn').href = waLink;

    document.getElementById('bookingFormSection').classList.add('d-none');
    document.getElementById('bookingConfirmationSection').classList.remove('d-none');
    e.target.reset();
  } catch (err) {
    console.error('Booking submit error:', err);
    alert('An error occurred while submitting your request. Please call +91 90105 15341.');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="bi bi-send-check-fill me-1"></i> SUBMIT BOOKING REQUEST';
  }
}

window.initAccommodationPage = initAccommodationPage;
window.openBookingRequestModal = openBookingRequestModal;

