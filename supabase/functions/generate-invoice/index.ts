import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, jsonResponse } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return jsonResponse({ error: 'Missing Authorization header' }, 401);
    }

    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user: caller }, error: authErr } = await callerClient.auth.getUser();
    if (authErr || !caller) {
      return jsonResponse({ error: 'Unauthorized' }, 401);
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Check caller is Main Admin or active Sub-Admin with invoices permission
    const { data: mainAdmin } = await adminClient
      .from('admin_users')
      .select('id, is_main_admin')
      .eq('user_id', caller.id)
      .maybeSingle();

    const { data: subAdmin } = await adminClient
      .from('sub_admins')
      .select('id, subadmin_id, is_active, assigned_modules')
      .eq('user_id', caller.id)
      .maybeSingle();

    const isAllowed =
      Boolean(mainAdmin) ||
      Boolean(
        subAdmin &&
          subAdmin.is_active &&
          Array.isArray(subAdmin.assigned_modules) &&
          (subAdmin.assigned_modules.includes('invoices') || subAdmin.assigned_modules.includes('bookings'))
      );

    if (!isAllowed) {
      return jsonResponse({ error: 'Forbidden: Not authorized to generate invoices' }, 403);
    }

    const body = await req.json();
    const { booking_id, booking_type = 'accommodation', discount = 0, tax_amount = 0, notes = '' } = body;

    if (!booking_id) {
      return jsonResponse({ error: 'booking_id (UUID) is required' }, 400);
    }

    // Prevent duplicate active invoice for same booking
    const { data: existingInv } = await adminClient
      .from('invoices')
      .select('*')
      .eq('booking_id', booking_id)
      .eq('status', 'Issued')
      .maybeSingle();

    if (existingInv) {
      return jsonResponse({ success: true, already_exists: true, invoice: existingInv });
    }

    // Load booking details
    const table = booking_type === 'service' ? 'service_bookings' : 'accommodation_bookings';
    const { data: booking, error: bErr } = await adminClient
      .from(table)
      .select('*')
      .eq('id', booking_id)
      .single();

    if (bErr || !booking) {
      return jsonResponse({ error: 'Booking not found' }, 404);
    }

    // Sum verified manual payments for this booking
    const { data: verifiedPayments } = await adminClient
      .from('payment_transactions')
      .select('*')
      .eq('booking_id', booking_id)
      .eq('status', 'Verified')
      .order('created_at', { ascending: false });

    const totalVerifiedPaid = (verifiedPayments || []).reduce(
      (sum, p) => sum + Number(p.amount || 0),
      0
    );
    const latestPay = (verifiedPayments && verifiedPayments[0]) || null;

    const subtotal = Number(booking.estimated_amount || 0);
    const totalAmount = Math.max(0, subtotal - Number(discount || 0) + Number(tax_amount || 0));
    const amountReceived = Math.max(totalVerifiedPaid, Number(booking.amount_paid || 0));
    const balanceDue = Math.max(0, totalAmount - amountReceived);
    const paymentStatus = balanceDue === 0 && amountReceived > 0 ? 'Paid' : amountReceived > 0 ? 'Partially Paid' : 'Unpaid';

    const roomDetails =
      booking_type === 'accommodation'
        ? `${booking.category_name || 'Accommodation'}${booking.allocated_room_number ? ' – Room ' + booking.allocated_room_number : ''}`
        : booking.service_title || 'Travel Service';

    const serviceDescription =
      booking_type === 'accommodation'
        ? `${roomDetails} (${booking.nights || 1} Night(s), ${booking.guests || 1} Guest(s))`
        : `${booking.service_title} (${booking.passengers || 1} Passenger(s))`;

    const { data: invoice, error: invErr } = await adminClient
      .from('invoices')
      .insert({
        booking_id: booking.id,
        booking_code: booking.booking_id,
        booking_type,
        customer_id: booking.customer_id || null,
        customer_name: booking.customer_name,
        customer_mobile: booking.mobile,
        customer_email: booking.email || null,
        service_description: serviceDescription,
        check_in: booking.check_in || null,
        check_out: booking.check_out || null,
        room_details: roomDetails,
        subtotal,
        discount: Number(discount || 0),
        tax_amount: Number(tax_amount || 0),
        total_amount: totalAmount,
        amount_received: amountReceived,
        balance_due: balanceDue,
        payment_status: paymentStatus,
        payment_method: latestPay?.payment_method || 'Manual Payment',
        transaction_reference: latestPay?.transaction_reference || null,
        notes: notes || booking.notes || null,
        status: 'Issued',
        created_by: caller.id,
      })
      .select()
      .single();

    if (invErr || !invoice) {
      return jsonResponse({ error: invErr?.message || 'Failed to create invoice' }, 500);
    }

    // Insert invoice line item
    const qty = booking_type === 'accommodation' ? Number(booking.nights || 1) : 1;
    const unitPrice = qty > 0 ? Number((subtotal / qty).toFixed(2)) : subtotal;
    await adminClient.from('invoice_items').insert({
      invoice_id: invoice.id,
      description: serviceDescription,
      quantity: qty,
      unit_price: unitPrice,
      total: subtotal,
    });

    // Audit log
    await adminClient.from('admin_activity_logs').insert({
      user_id: caller.id,
      user_email: caller.email,
      user_role: mainAdmin ? 'Super Admin' : 'Sub-Admin',
      action: 'GENERATE_INVOICE',
      entity_type: 'invoices',
      entity_id: invoice.invoice_number,
      metadata: { booking_code: booking.booking_id, total_amount: totalAmount },
    });

    // Build WhatsApp invoice message
    const customerWa = String(booking.whatsapp_number || booking.mobile || '').replace(/[^0-9]/g, '');
    const waNumber = customerWa.length === 10 ? '91' + customerWa : customerWa;
    const shareMsg = [
      `Namaskaram ${booking.customer_name} 🙏`,
      `Your booking with *Arunachaleshwara Tours & Travels* is confirmed!`,
      ``,
      `*Invoice No:* ${invoice.invoice_number}`,
      `*Booking ID:* ${booking.booking_id}`,
      `*Details:* ${roomDetails}`,
      booking.check_in ? `*Stay:* ${booking.check_in} to ${booking.check_out} (${booking.nights} nights)` : '',
      `*Total Amount:* ₹${totalAmount.toLocaleString('en-IN')}`,
      `*Amount Received:* ₹${amountReceived.toLocaleString('en-IN')}`,
      `*Balance Due:* ₹${balanceDue.toLocaleString('en-IN')}`,
      `*Status:* ${paymentStatus}`,
      ``,
      `Om Arunachaleswaraya Namah!`,
    ]
      .filter(Boolean)
      .join('\n');

    return jsonResponse({
      success: true,
      invoice,
      whatsapp_share_url: waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(shareMsg)}` : null,
      whatsapp_message: shareMsg,
    });
  } catch (err) {
    return jsonResponse({ error: err instanceof Error ? err.message : 'Internal server error' }, 500);
  }
});

