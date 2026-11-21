/* ============================================================
   ARUNACHALESHWARA PURE VEG RESTAURANT – FRONTEND CONTROLLER
   Menu Browsing, Cart Management, Order Submission & WhatsApp Sync
   ============================================================ */

(function() {
  'use strict';

  let currentCategory = 'all';
  let searchQuery = '';
  let restaurantSettings = {
    restaurant_name: 'Arunachaleshwara Pure Veg Restaurant',
    tagline: '100% Traditional South Indian Pure Vegetarian Dining & Room Delivery',
    timings: 'Daily 06:30 AM – 10:30 PM',
    is_open: true,
    min_order_amount: 100,
    delivery_fee: 30,
    contact_phone: '9010515341',
    contact_whatsapp: '919010515341'
  };
  let categories = [];
  let menuItems = [];

  // Cart format: [ { id, name, price, image, quantity } ]
  function getCart() {
    try {
      const raw = localStorage.getItem('arn_restaurant_cart');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem('arn_restaurant_cart', JSON.stringify(cart));
    } catch (e) {}
    updateCartUI();
  }

  function getCartItem(id) {
    const cart = getCart();
    return cart.find(x => String(x.id) === String(id));
  }

  function addToCart(dishId) {
    const dish = menuItems.find(x => String(x.id) === String(dishId));
    if (!dish) return;
    if (dish.is_available === false) {
      alert('This dish is currently unavailable / sold out for today.');
      return;
    }

    const cart = getCart();
    const existing = cart.find(x => String(x.id) === String(dishId));
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: dish.id,
        name: dish.name,
        price: Number(dish.price),
        image: dish.image || 'assets/images/services/restaurant.jpg',
        quantity: 1
      });
    }
    saveCart(cart);
    renderMenuItems();
  }

  function changeCartQty(dishId, delta) {
    let cart = getCart();
    const item = cart.find(x => String(x.id) === String(dishId));
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(x => String(x.id) !== String(dishId));
    }
    saveCart(cart);
    renderMenuItems();
  }

  function removeFromCart(dishId) {
    let cart = getCart();
    cart = cart.filter(x => String(x.id) !== String(dishId));
    saveCart(cart);
    renderMenuItems();
  }

  function clearCart() {
    saveCart([]);
    renderMenuItems();
  }

  function getCartSubtotal() {
    return getCart().reduce((acc, it) => acc + (it.price * it.quantity), 0);
  }

  function getCartTotalCount() {
    return getCart().reduce((acc, it) => acc + it.quantity, 0);
  }

  // Update Cart Floating Widget, Offcanvas & Badges
  function updateCartUI() {
    const cart = getCart();
    const totalCount = getCartTotalCount();
    const subtotal = getCartSubtotal();
    const deliveryFee = subtotal > 0 ? (restaurantSettings.delivery_fee || 30) : 0;
    const grandTotal = subtotal + deliveryFee;

    // Badges
    const badgeEls = document.querySelectorAll('.cart-badge-count');
    badgeEls.forEach(b => {
      b.textContent = totalCount;
      b.classList.toggle('d-none', totalCount === 0);
    });

    // Floating Cart Button
    const floatingBtn = document.getElementById('floatingCartBar');
    if (floatingBtn) {
      if (totalCount > 0) {
        floatingBtn.classList.remove('d-none');
        const countEl = floatingBtn.querySelector('.floating-cart-count');
        const totalEl = floatingBtn.querySelector('.floating-cart-total');
        if (countEl) countEl.textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
        if (totalEl) totalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
      } else {
        floatingBtn.classList.add('d-none');
      }
    }

    // Offcanvas Drawer List
    const drawerList = document.getElementById('cartDrawerItemsList');
    const drawerEmpty = document.getElementById('cartDrawerEmptyState');
    const drawerFooter = document.getElementById('cartDrawerFooter');
    const subtotalEl = document.getElementById('cartDrawerSubtotal');
    const deliveryEl = document.getElementById('cartDrawerDeliveryFee');
    const grandTotalEl = document.getElementById('cartDrawerGrandTotal');

    if (drawerList && drawerEmpty) {
      if (cart.length === 0) {
        drawerList.innerHTML = '';
        drawerEmpty.classList.remove('d-none');
        if (drawerFooter) drawerFooter.classList.add('d-none');
      } else {
        drawerEmpty.classList.add('d-none');
        if (drawerFooter) drawerFooter.classList.remove('d-none');

        drawerList.innerHTML = cart.map(item => `
          <div class="cart-drawer-item p-3 mb-2 rounded-3 border bg-white d-flex align-items-center justify-content-between gap-3 shadow-sm">
            <img src="${item.image}" alt="${item.name}" class="rounded-2" style="width: 52px; height: 52px; object-fit: cover; border: 1px solid #E2D9CC;">
            <div class="flex-grow-1 min-w-0">
              <h6 class="mb-1 text-truncate text-maroon fw-bold" style="font-size: 0.95rem;">${item.name}</h6>
              <div class="text-muted small">₹${item.price} × ${item.quantity} = <strong class="text-dark">₹${(item.price * item.quantity).toLocaleString('en-IN')}</strong></div>
            </div>
            <div class="d-flex align-items-center gap-1">
              <div class="btn-group btn-group-sm border rounded-pill overflow-hidden" role="group">
                <button type="button" class="btn btn-light px-2 py-1 text-maroon" onclick="window.arnRestaurant.changeCartQty('${item.id}', -1)">
                  <i class="bi bi-dash-lg"></i>
                </button>
                <span class="btn btn-light px-2 py-1 fw-bold text-dark disabled" style="opacity: 1; min-width: 28px;">${item.quantity}</span>
                <button type="button" class="btn btn-light px-2 py-1 text-maroon" onclick="window.arnRestaurant.changeCartQty('${item.id}', 1)">
                  <i class="bi bi-plus-lg"></i>
                </button>
              </div>
              <button type="button" class="btn btn-sm btn-link text-danger p-1 ms-1" onclick="window.arnRestaurant.removeFromCart('${item.id}')" title="Remove item">
                <i class="bi bi-trash3-fill"></i>
              </button>
            </div>
          </div>
        `).join('');

        if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
        if (deliveryEl) deliveryEl.textContent = `₹${deliveryFee.toLocaleString('en-IN')}`;
        if (grandTotalEl) grandTotalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
      }
    }
  }

  // Render Category Filter Pills
  function renderCategories() {
    const container = document.getElementById('restaurantCategoryPills');
    if (!container) return;

    const allPill = `
      <button type="button" class="cat-pill ${currentCategory === 'all' ? 'active' : ''}" onclick="window.arnRestaurant.filterCategory('all')">
        <i class="bi bi-grid-fill me-1"></i> All Delicacies (${menuItems.length})
      </button>
    `;

    const catPills = categories.map(cat => {
      const count = menuItems.filter(m => m.category_slug === cat.slug).length;
      const isActive = currentCategory === cat.slug;
      return `
        <button type="button" class="cat-pill ${isActive ? 'active' : ''}" onclick="window.arnRestaurant.filterCategory('${cat.slug}')">
          <i class="bi ${cat.icon || 'bi-cup-hot-fill'} me-1"></i> ${cat.name} (${count})
        </button>
      `;
    }).join('');

    container.innerHTML = allPill + catPills;
  }

  // Render Menu Items Grid
  function renderMenuItems() {
    const grid = document.getElementById('restaurantMenuGrid');
    const countEl = document.getElementById('menuDishesCount');
    if (!grid) return;

    let filtered = menuItems;

    // Filter by Category
    if (currentCategory !== 'all') {
      filtered = filtered.filter(item => item.category_slug === currentCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item => {
        return (
          (item.name && item.name.toLowerCase().includes(q)) ||
          (item.regional_name && item.regional_name.toLowerCase().includes(q)) ||
          (item.description && item.description.toLowerCase().includes(q))
        );
      });
    }

    if (countEl) {
      countEl.textContent = `${filtered.length} Dish${filtered.length !== 1 ? 'es' : ''} Available`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="mb-3">
            <i class="bi bi-search text-warning" style="font-size: 3rem;"></i>
          </div>
          <h4 class="text-maroon">No matching dishes found</h4>
          <p class="text-muted">Try clearing your search keyword or switching category tabs.</p>
          <button type="button" class="btn btn-outline-maroon btn-sm" onclick="window.arnRestaurant.filterCategory('all')">
            <i class="bi bi-arrow-repeat me-1"></i> View All Dishes
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(dish => {
      const cartItem = getCartItem(dish.id);
      const isUnavailable = dish.is_available === false;
      const isSpecial = dish.is_special === true;

      return `
      <div class="col-xl-4 col-lg-6 col-md-6 mb-4">
        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden food-menu-card ${isUnavailable ? 'food-card-unavailable' : ''}">
          <div class="position-relative food-card-image-wrap">
            <img src="${dish.image || 'assets/images/services/restaurant.jpg'}" alt="${dish.name}" class="card-img-top food-dish-img" loading="lazy">
            <div class="food-badge-overlay d-flex justify-content-between align-items-center w-100 px-3 py-2">
              <span class="badge bg-success bg-opacity-90 text-white rounded-pill px-2 py-1 small">
                <i class="bi bi-check-circle-fill me-1"></i> Pure Veg
              </span>
              ${isSpecial ? `
              <span class="badge rounded-pill px-2 py-1 small fw-bold shadow-sm" style="background: #FFC908; color: #45120E;">
                <i class="bi bi-star-fill text-danger me-1"></i> Special
              </span>` : ''}
              ${isUnavailable ? `
              <span class="badge bg-danger text-white rounded-pill px-2 py-1 small fw-bold">
                Sold Out
              </span>` : ''}
            </div>
          </div>
          <div class="card-body p-3 d-flex flex-column justify-content-between">
            <div>
              <div class="d-flex justify-content-between align-items-start gap-2 mb-1">
                <h5 class="card-title text-maroon fw-bold mb-0" style="font-family: var(--ff-heading, 'Cinzel', serif); font-size: 1.05rem;">
                  ${dish.name}
                </h5>
                <span class="food-price-tag text-maroon fw-bold fs-5 flex-shrink-0">
                  ₹${Number(dish.price).toLocaleString('en-IN')}
                </span>
              </div>
              ${dish.regional_name ? `
              <small class="d-block text-secondary mb-2 fst-italic" style="font-size: 0.8rem;">
                ${dish.regional_name}
              </small>` : ''}
              <p class="card-text text-muted small line-clamp-2 mb-3">
                ${dish.description || ''}
              </p>
            </div>

            <div class="pt-2 border-top d-flex align-items-center justify-content-between mt-auto">
              <span class="small text-muted">
                <i class="bi bi-lightning-charge-fill text-warning"></i> Fresh Kitchen
              </span>

              ${isUnavailable ? `
              <button class="btn btn-sm btn-secondary disabled rounded-pill px-3 py-1">
                Sold Out Today
              </button>
              ` : (cartItem ? `
              <div class="btn-group btn-group-sm rounded-pill overflow-hidden shadow-sm border border-warning" role="group">
                <button type="button" class="btn btn-warning px-2 py-1 fw-bold text-dark" onclick="window.arnRestaurant.changeCartQty('${dish.id}', -1)">
                  <i class="bi bi-dash-lg"></i>
                </button>
                <span class="btn btn-light px-3 py-1 fw-bold text-dark disabled" style="opacity: 1; min-width: 36px;">
                  ${cartItem.quantity}
                </span>
                <button type="button" class="btn btn-warning px-2 py-1 fw-bold text-dark" onclick="window.arnRestaurant.changeCartQty('${dish.id}', 1)">
                  <i class="bi bi-plus-lg"></i>
                </button>
              </div>
              ` : `
              <button type="button" class="btn btn-sm btn-food-add rounded-pill px-3 py-1 fw-bold" onclick="window.arnRestaurant.addToCart('${dish.id}')">
                <i class="bi bi-plus-circle-fill me-1 text-warning"></i> Add to Cart
              </button>
              `)}
            </div>
          </div>
        </div>
      </div>
      `;
    }).join('');
  }

  // Filter Handler
  function filterCategory(catSlug) {
    currentCategory = catSlug;
    renderCategories();
    renderMenuItems();
  }

  // Search Handler
  function handleSearch(val) {
    searchQuery = val;
    renderMenuItems();
  }

  // Checkout modal fulfillment switcher
  function handleFulfillmentChange() {
    const type = document.getElementById('checkoutFulfillment').value;
    const roomWrap = document.getElementById('checkoutRoomWrap');
    const roomInput = document.getElementById('checkoutRoomNo');
    const deliveryNote = document.getElementById('checkoutDeliveryNote');

    if (type === 'Room Delivery') {
      if (roomWrap) roomWrap.classList.remove('d-none');
      if (roomInput) roomInput.setAttribute('required', 'required');
      if (deliveryNote) deliveryNote.textContent = 'Prompt delivery directly to your room in Arunachaleshwara accommodation.';
    } else if (type === 'Restaurant Pickup') {
      if (roomWrap) roomWrap.classList.add('d-none');
      if (roomInput) roomInput.removeAttribute('required');
      if (deliveryNote) deliveryNote.textContent = 'Collect fresh & hot from our Restaurant counter at Avulpet Bypass, Tiruvannamalai.';
    } else {
      // Dine-In
      if (roomWrap) roomWrap.classList.add('d-none');
      if (roomInput) roomInput.removeAttribute('required');
      if (deliveryNote) deliveryNote.textContent = 'Table reserved at our dining hall upon your arrival.';
    }
  }

  // Open Checkout Modal
  function openCheckoutModal() {
    const cart = getCart();
    if (cart.length === 0) {
      alert('Your food cart is empty! Please add some delicious dishes first.');
      return;
    }

    const subtotal = getCartSubtotal();
    const minOrder = restaurantSettings.min_order_amount || 100;
    if (subtotal < minOrder) {
      alert(`Minimum food order amount is ₹${minOrder}. Please add more items to proceed.`);
      return;
    }

    // Close offcanvas if open
    const offcanvasEl = document.getElementById('cartOffcanvasDrawer');
    if (offcanvasEl && window.bootstrap && window.bootstrap.Offcanvas) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) bsOffcanvas.hide();
    }

    // Populate order summary in checkout modal
    const summaryList = document.getElementById('checkoutOrderSummaryList');
    const subtotalEl = document.getElementById('checkoutSubtotal');
    const deliveryEl = document.getElementById('checkoutDeliveryFee');
    const totalEl = document.getElementById('checkoutTotalAmount');

    const deliveryFee = restaurantSettings.delivery_fee || 30;
    const grandTotal = subtotal + deliveryFee;

    if (summaryList) {
      summaryList.innerHTML = cart.map(item => `
        <li class="list-group-item d-flex justify-content-between align-items-center py-2 px-0 border-0 border-bottom small">
          <div>
            <strong>${item.name}</strong> × ${item.quantity}
          </div>
          <span class="text-maroon fw-semibold">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
        </li>
      `).join('');
    }

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (deliveryEl) deliveryEl.textContent = `₹${deliveryFee.toLocaleString('en-IN')}`;
    if (totalEl) totalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

    const modalEl = document.getElementById('checkoutOrderModal');
    if (modalEl && window.bootstrap) {
      const modal = new window.bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  // Submit Food Order
  async function submitFoodOrder(e) {
    e.preventDefault();
    const submitBtn = document.getElementById('btnSubmitFoodOrder');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Placing Order...';
    }

    const name = document.getElementById('checkoutName').value.trim();
    const mobile = document.getElementById('checkoutMobile').value.trim();
    const email = document.getElementById('checkoutEmail').value.trim();
    const fulfillment = document.getElementById('checkoutFulfillment').value;
    const roomNo = document.getElementById('checkoutRoomNo') ? document.getElementById('checkoutRoomNo').value.trim() : '';
    const notes = document.getElementById('checkoutNotes').value.trim();

    if (!name || !mobile) {
      alert('Please enter your Name and Mobile / WhatsApp Number.');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-check2-circle me-1"></i> Confirm &amp; Place Food Order';
      }
      return;
    }

    if (fulfillment === 'Room Delivery' && !roomNo) {
      alert('Please enter your Room Number for room delivery.');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-check2-circle me-1"></i> Confirm &amp; Place Food Order';
      }
      return;
    }

    const cart = getCart();
    const subtotal = getCartSubtotal();
    const deliveryFee = restaurantSettings.delivery_fee || 30;
    const grandTotal = subtotal + deliveryFee;

    const orderPayload = {
      customerName: name,
      mobile: mobile,
      email: email,
      fulfillmentType: fulfillment,
      roomNumber: roomNo,
      deliveryAddress: fulfillment === 'Room Delivery' ? `Room #${roomNo} (Arunachaleshwara Accommodation)` : (fulfillment === 'Restaurant Pickup' ? 'Self Pickup at Restaurant Counter' : 'Dine-In Table'),
      specialInstructions: notes,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      totalAmount: grandTotal,
      items: cart
    };

    let result = null;
    if (typeof window.submitFoodOrderToSupabase === 'function') {
      result = await window.submitFoodOrderToSupabase(orderPayload);
    } else {
      // Fallback
      const orderId = `ARN-FOOD-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`;
      result = { success: true, orderId, order: { ...orderPayload, order_id: orderId, status: 'New Order' } };
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="bi bi-check2-circle me-1"></i> Confirm &amp; Place Food Order';
    }

    // Hide checkout modal
    const checkoutModalEl = document.getElementById('checkoutOrderModal');
    if (checkoutModalEl && window.bootstrap) {
      const bsModal = window.bootstrap.Modal.getInstance(checkoutModalEl);
      if (bsModal) bsModal.hide();
    }

    // Clear cart
    clearCart();

    // Show Confirmation Modal
    showOrderSuccessModal(result.orderId, orderPayload);
  }

  // Show Order Success Modal & Configure WhatsApp Message
  function showOrderSuccessModal(orderId, order) {
    const modalEl = document.getElementById('foodOrderSuccessModal');
    if (!modalEl || !window.bootstrap) return;

    document.getElementById('successFoodOrderId').textContent = orderId;
    document.getElementById('successFoodCustomer').textContent = order.customerName;
    document.getElementById('successFoodFulfillment').textContent = order.roomNumber ? `Room #${order.roomNumber}` : order.fulfillmentType;
    document.getElementById('successFoodTotal').textContent = `₹${order.totalAmount.toLocaleString('en-IN')}`;

    // Format WhatsApp Message
    const itemsText = order.items.map(it => `• ${it.name} × ${it.quantity} (₹${it.price * it.quantity})`).join('\n');
    const waMsg = `*Namaste! New Food Order Reservation*\n\n` +
      `*Order ID:* ${orderId}\n` +
      `*Customer:* ${order.customerName}\n` +
      `*Mobile:* ${order.mobile}\n` +
      `*Fulfillment:* ${order.fulfillmentType} ${order.roomNumber ? `(Room #${order.roomNumber})` : ''}\n` +
      `*Special Instructions:* ${order.specialInstructions || 'None'}\n\n` +
      `*Ordered Dishes:*\n${itemsText}\n\n` +
      `*Subtotal:* ₹${order.subtotal}\n` +
      `*Delivery Fee:* ₹${order.deliveryFee}\n` +
      `*Total Amount:* ₹${order.totalAmount}\n` +
      `*Payment:* Pending at Delivery / Counter\n\n` +
      `Please confirm my food order preparation & delivery time. Om Namah Shivaya!`;

    const waBtn = document.getElementById('btnOrderSuccessWhatsApp');
    if (waBtn) {
      waBtn.href = `https://wa.me/${restaurantSettings.contact_whatsapp || '919010515341'}?text=${encodeURIComponent(waMsg)}`;
    }

    const modal = new window.bootstrap.Modal(modalEl);
    modal.show();
  }

  // Initialize Page Data
  async function init() {
    // 1. Settings
    if (typeof window.fetchRestaurantSettingsFromSupabase === 'function') {
      restaurantSettings = await window.fetchRestaurantSettingsFromSupabase();
    }
    // 2. Menu Catalog
    if (typeof window.fetchRestaurantMenuFromSupabase === 'function') {
      const data = await window.fetchRestaurantMenuFromSupabase();
      categories = data.categories || [];
      menuItems = data.items || [];
    } else {
      categories = typeof DEFAULT_RESTAURANT_CATEGORIES !== 'undefined' ? DEFAULT_RESTAURANT_CATEGORIES : [];
      menuItems = typeof DEFAULT_MENU_ITEMS !== 'undefined' ? DEFAULT_MENU_ITEMS : [];
    }

    // Update Banner / Header Info
    const restNameEl = document.getElementById('restaurantHeroName');
    const restTimingsEl = document.getElementById('restaurantHeroTimings');
    const restPhoneEl = document.getElementById('restaurantHeroPhone');
    if (restNameEl && restaurantSettings.restaurant_name) restNameEl.textContent = restaurantSettings.restaurant_name;
    if (restTimingsEl && restaurantSettings.timings) restTimingsEl.textContent = restaurantSettings.timings;
    if (restPhoneEl && restaurantSettings.contact_phone) restPhoneEl.textContent = restaurantSettings.contact_phone;

    renderCategories();
    renderMenuItems();
    updateCartUI();

    // Subscribe to live Real-Time sync without page reload
    if (window.ArnRealtimeSync && !window.__arnRestSyncSubscribed) {
      window.__arnRestSyncSubscribed = true;
      window.ArnRealtimeSync.subscribe('menu', () => {
        init();
      });
      window.ArnRealtimeSync.subscribe('restaurant_settings', () => {
        init();
      });
      window.ArnRealtimeSync.subscribe('restaurant_orders', (action, payload) => {
        // If customer has an active order confirmation modal open, update status live
        if (payload && payload.order_id && document.getElementById('successFoodOrderId')) {
          if (document.getElementById('successFoodOrderId').textContent === payload.order_id) {
            const badge = document.querySelector('#foodOrderSuccessModal .badge');
            if (badge && payload.status) {
              badge.textContent = payload.status;
              badge.className = 'badge bg-success';
            }
          }
        }
      });
    }
  }

  // Export to window
  window.arnRestaurant = {
    addToCart,
    changeCartQty,
    removeFromCart,
    clearCart,
    getCart,
    filterCategory,
    handleSearch,
    handleFulfillmentChange,
    openCheckoutModal,
    submitFoodOrder,
    init
  };

  document.addEventListener('DOMContentLoaded', init);
})();
