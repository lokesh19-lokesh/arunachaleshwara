/* ============================================================
   ARUNACHALESHWARA – REAL-TIME SYNC ENGINE (ArnRealtimeSync)
   Zero-Reload Instant Cross-Tab Broadcast & Supabase Realtime Sync
   ============================================================ */

(function() {
  'use strict';

  // Prevent multiple initializations in the same window context
  if (window.ArnRealtimeSync) return;

  const CHANNEL_NAME = 'arn_realtime_sync_bus';
  const STORAGE_KEY = 'arn_realtime_pulse';
  
  // Topic Subscribers map: topic -> Set of callbacks
  const subscribers = new Map();
  // Debounce timers map
  const debounceTimers = new Map();

  // Create BroadcastChannel for 0ms cross-tab messaging
  let broadcastChannel = null;
  if (typeof window.BroadcastChannel === 'function') {
    try {
      broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
      broadcastChannel.onmessage = (event) => {
        if (event && event.data) {
          handleIncomingEvent(event.data, 'broadcast');
        }
      };
    } catch (e) {
      console.warn('BroadcastChannel init warning:', e);
    }
  }

  // Cross-Tab storage event fallback (for browsers where BroadcastChannel is blocked or separate context)
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try {
        const payload = JSON.parse(event.newValue);
        handleIncomingEvent(payload, 'storage');
      } catch (e) {}
    }
    // Also detect direct localStorage key changes
    if (event.key === 'arn_food_orders') {
      ArnRealtimeSync.notifySubscribers('restaurant_orders', 'storage_update', null, false);
    } else if (event.key === 'arn_service_bookings' || event.key === 'arn_room_bookings') {
      ArnRealtimeSync.notifySubscribers('bookings', 'storage_update', null, false);
    } else if (event.key === 'arn_restaurant_items' || event.key === 'arn_restaurant_categories') {
      ArnRealtimeSync.notifySubscribers('menu', 'storage_update', null, false);
    } else if (event.key === 'arn_restaurant_settings') {
      ArnRealtimeSync.notifySubscribers('restaurant_settings', 'storage_update', null, false);
    } else if (event.key === 'arn_restaurants_list') {
      ArnRealtimeSync.notifySubscribers('restaurants', 'storage_update', null, false);
    } else if (event.key === 'arn_rooms_inventory') {
      ArnRealtimeSync.notifySubscribers('accommodation', 'storage_update', null, false);
    }
  });

  // Sound chime synthesizer via Web Audio API (0 external MP3 files needed)
  function playNotificationChime(type = 'success') {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'order') {
        // High, distinct double-bell sound
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880.00, now + 0.12); // A5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else {
        // Gentle confirmation chime
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {}
  }

  // Handle incoming event from any transport
  function handleIncomingEvent(eventData, source) {
    if (!eventData || !eventData.topic) return;
    // Don't echo own events if sent with unique tabId
    if (eventData.senderTabId && eventData.senderTabId === window.__arnTabId) return;

    ArnRealtimeSync.notifySubscribers(eventData.topic, eventData.action, eventData.payload, true);
  }

  // Generate unique tab ID to prevent self-echoing
  window.__arnTabId = 'tab_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();

  const ArnRealtimeSync = {
    /**
     * Subscribe to a topic without page reload
     * @param {string} topic - 'bookings', 'restaurant_orders', 'accommodation', 'menu', 'restaurant_settings', 'payments', 'services', '*'
     * @param {Function} callback - function(action, payload, isExternal)
     */
    subscribe(topic, callback) {
      if (typeof callback !== 'function') return;
      if (!subscribers.has(topic)) {
        subscribers.set(topic, new Set());
      }
      subscribers.get(topic).add(callback);
    },

    /**
     * Unsubscribe from a topic
     */
    unsubscribe(topic, callback) {
      if (subscribers.has(topic)) {
        subscribers.get(topic).delete(callback);
      }
    },

    /**
     * Publish an event across all tabs and triggers local subscribers
     */
    publish(topic, action, payload = {}) {
      const eventData = {
        topic,
        action,
        payload,
        senderTabId: window.__arnTabId,
        timestamp: Date.now()
      };

      // 1. BroadcastChannel
      if (broadcastChannel) {
        try {
          broadcastChannel.postMessage(eventData);
        } catch (e) {}
      }

      // 2. LocalStorage pulse for cross-tab storage event
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(eventData));
      } catch (e) {}

      // 3. Trigger local subscribers
      this.notifySubscribers(topic, action, payload, false);
    },

    /**
     * Notify subscribers with 200ms debounce to prevent multiple calls
     */
    notifySubscribers(topic, action, payload, isExternal = false) {
      const timerKey = `${topic}_debounce`;
      if (debounceTimers.has(timerKey)) {
        clearTimeout(debounceTimers.get(timerKey));
      }

      debounceTimers.set(timerKey, setTimeout(() => {
        debounceTimers.delete(timerKey);

        // Notify specific topic
        if (subscribers.has(topic)) {
          subscribers.get(topic).forEach(cb => {
            try { cb(action, payload, isExternal); } catch (e) { console.warn('Subscriber error:', e); }
          });
        }
        // Notify wildcard '*' subscribers
        if (subscribers.has('*')) {
          subscribers.get('*').forEach(cb => {
            try { cb(topic, action, payload, isExternal); } catch (e) { console.warn('Wildcard subscriber error:', e); }
          });
        }

        // Animate live sync badge if present
        this.flashLiveBadge();

        // If on admin and an external event arrived, push to ArnAdminNotifications (with RBAC & Bemp chime)
        if (isExternal && window.location.pathname.includes('/admin/')) {
          if (window.ArnAdminNotifications && typeof window.ArnAdminNotifications.pushNotification === 'function') {
            if (topic === 'restaurant_orders' && (action === 'new_order' || action === 'INSERT')) {
              const orderId = payload?.order_number || payload?.id || 'New';
              const itemsDesc = Array.isArray(payload?.items) 
                ? payload.items.map(i => `${i.name || i.title || 'Item'} x${i.quantity || 1}`).slice(0, 2).join(', ')
                : (payload?.fulfillment_type === 'room_delivery' ? `Room ${payload?.room_number || ''} Delivery` : 'Room Delivery / Dine-in');
              const totalAmount = payload?.total_amount ? ` • ₹${payload.total_amount}` : '';
              
              window.ArnAdminNotifications.pushNotification({
                type: 'food_order',
                modules: ['services', 'bookings'],
                title: `New Food Order #${orderId}`,
                message: `${itemsDesc}${totalAmount}`,
                link: 'restaurant.html?tab=orders'
              });
            } else if (topic === 'bookings' && (action === 'new_booking' || action === 'INSERT' || action === 'walkin_created')) {
              const bId = payload?.booking_id || payload?.id || 'New';
              const type = payload?.booking_type || 'Room';
              const name = payload?.customer_name || payload?.primary_devotee_name || 'Guest';
              const isRoom = type.toLowerCase().includes('room') || payload?.room_category;
              
              window.ArnAdminNotifications.pushNotification({
                type: isRoom ? 'room_booking' : 'service_booking',
                modules: isRoom ? ['accommodation', 'bookings'] : ['services', 'bookings'],
                title: `New ${isRoom ? 'Room Booking' : 'Service Booking'} #${bId}`,
                message: `${name} • ${payload?.room_category || payload?.service_type || type}`,
                link: isRoom ? 'bookings.html' : 'services.html'
              });
            } else if (topic === 'payments' && (action === 'payment_received' || action === 'INSERT')) {
              window.ArnAdminNotifications.pushNotification({
                type: 'payment',
                modules: ['payments', 'invoices'],
                title: `New Payment Received #${payload?.receipt_no || payload?.id || 'New'}`,
                message: `₹${payload?.amount || 0} via ${payload?.payment_method || 'UPI'} • ${payload?.customer_name || 'Guest'}`,
                link: 'payments.html'
              });
            }
          } else {
            if (topic === 'restaurant_orders' && (action === 'new_order' || action === 'INSERT')) {
              playNotificationChime('order');
              if (typeof showAdminToast === 'function') {
                showAdminToast('🔔 New Food Order Received Live! Table updated without reload.', 'success');
              }
            } else if (topic === 'bookings' && (action === 'new_booking' || action === 'INSERT')) {
              playNotificationChime('success');
              if (typeof showAdminToast === 'function') {
                showAdminToast('🔔 New Booking Received Live! Updating without reload.', 'success');
              }
            }
          }
        }
      }, 200));
    },

    /**
     * Animate live sync badge in header
     */
    flashLiveBadge() {
      const badge = document.getElementById('realtimeSyncBadge');
      if (badge) {
        badge.classList.add('bg-warning', 'text-dark');
        badge.classList.remove('bg-success', 'text-success');
        setTimeout(() => {
          badge.classList.remove('bg-warning', 'text-dark');
          badge.classList.add('bg-success', 'text-success');
        }, 800);
      }
    },

    /**
     * Setup Supabase Postgres Changes Channel
     */
    initSupabaseRealtime(client) {
      const sb = client || window.adminSupabase || window.supabaseClient;
      if (!sb || typeof sb.channel !== 'function') return;

      try {
        const channel = sb.channel('arn_db_realtime_sync');

        // Food orders & order items
        channel.on('postgres_changes', { event: '*', schema: 'public', table: 'food_orders' }, payload => {
          ArnRealtimeSync.notifySubscribers('restaurant_orders', payload.eventType, payload.new || payload.old, true);
        });

        // Service Bookings (Darshan, Taxi, Bus, Bike)
        channel.on('postgres_changes', { event: '*', schema: 'public', table: 'service_bookings' }, payload => {
          ArnRealtimeSync.notifySubscribers('bookings', payload.eventType, payload.new || payload.old, true);
        });

        // Accommodation Bookings
        channel.on('postgres_changes', { event: '*', schema: 'public', table: 'accommodation_bookings' }, payload => {
          ArnRealtimeSync.notifySubscribers('bookings', payload.eventType, payload.new || payload.old, true);
        });

        // Physical Rooms & Inventory
        channel.on('postgres_changes', { event: '*', schema: 'public', table: 'accommodation_rooms' }, payload => {
          ArnRealtimeSync.notifySubscribers('accommodation', payload.eventType, payload.new || payload.old, true);
        });

        // Menu Items & Categories
        channel.on('postgres_changes', { event: '*', schema: 'public', table: 'menu_items' }, payload => {
          ArnRealtimeSync.notifySubscribers('menu', payload.eventType, payload.new || payload.old, true);
        });
        channel.on('postgres_changes', { event: '*', schema: 'public', table: 'menu_categories' }, payload => {
          ArnRealtimeSync.notifySubscribers('menu', payload.eventType, payload.new || payload.old, true);
        });

        // Restaurant Settings & Outlets
        channel.on('postgres_changes', { event: '*', schema: 'public', table: 'restaurant_settings' }, payload => {
          ArnRealtimeSync.notifySubscribers('restaurant_settings', payload.eventType, payload.new || payload.old, true);
        });
        channel.on('postgres_changes', { event: '*', schema: 'public', table: 'restaurants' }, payload => {
          ArnRealtimeSync.notifySubscribers('restaurants', payload.eventType, payload.new || payload.old, true);
        });

        // Payments
        channel.on('postgres_changes', { event: '*', schema: 'public', table: 'payment_transactions' }, payload => {
          ArnRealtimeSync.notifySubscribers('payments', payload.eventType, payload.new || payload.old, true);
        });

        channel.subscribe((status, err) => {
          if (status === 'SUBSCRIBED') {
            console.log('⚡ Supabase Realtime Connected: Live sync active without reload.');
          } else if (status === 'CHANNEL_ERROR') {
            console.warn('Supabase Realtime Channel note:', err);
          }
        });
      } catch (err) {
        console.warn('Realtime subscription skipped:', err);
      }
    },

    /**
     * Start smart heartbeat (checks every 12 seconds when page is focused)
     */
    startHeartbeat(intervalMs = 12000) {
      setInterval(() => {
        if (document.visibilityState === 'visible') {
          // Trigger silent subscribers for active page
          this.notifySubscribers('heartbeat', 'tick', null, false);
        }
      }, intervalMs);
    }
  };

  // Expose globally
  window.ArnRealtimeSync = ArnRealtimeSync;

  // Auto-init Supabase Realtime when client is ready
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      ArnRealtimeSync.initSupabaseRealtime();
      ArnRealtimeSync.startHeartbeat();
    }, 600);
  });
})();
