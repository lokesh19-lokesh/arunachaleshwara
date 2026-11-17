import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, jsonResponse } from '../_shared/cors.ts';

function normalizePhone(raw: string): string {
  const digits = String(raw || '').replace(/[^0-9]/g, '');
  if (digits.length === 10) return '91' + digits;
  return digits;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const waToken = Deno.env.get('WHATSAPP_ACCESS_TOKEN');
    const waPhoneId = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID');

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const body = await req.json();
    const {
      booking_code = null,
      recipient,
      message_type = 'booking_notification',
      message_content,
      route_category = 'accommodation', // accommodation | service | support | main
    } = body;

    if (!message_content) {
      return jsonResponse({ error: 'message_content is required' }, 400);
    }

    // Determine recipient number (fallback to configured WhatsApp routing settings)
    let targetPhone = recipient ? normalizePhone(recipient) : '';
    if (!targetPhone) {
      const { data: settings } = await adminClient
        .from('whatsapp_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (settings) {
        if (route_category === 'accommodation') targetPhone = normalizePhone(settings.accommodation_number);
        else if (route_category === 'service') targetPhone = normalizePhone(settings.service_number);
        else if (route_category === 'support') targetPhone = normalizePhone(settings.support_number);
        else targetPhone = normalizePhone(settings.main_admin_number);
      }
      if (!targetPhone) targetPhone = '919010515341';
    }

    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message_content)}`;
    let status = 'Prepared (Deep Link)';
    let providerMessageId: string | null = null;
    let failureReason: string | null = null;

    // If WhatsApp Business Cloud API credentials are configured in Supabase Secrets, send directly
    if (waToken && waPhoneId) {
      try {
        const apiRes = await fetch(`https://graph.facebook.com/v20.0/${waPhoneId}/messages`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${waToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: targetPhone,
            type: 'text',
            text: { preview_url: false, body: message_content },
          }),
        });

        const apiJson = await apiRes.json();
        if (apiRes.ok && apiJson?.messages?.[0]?.id) {
          status = 'Sent via Cloud API';
          providerMessageId = apiJson.messages[0].id;
        } else {
          status = 'Fallback to Deep Link';
          failureReason = apiJson?.error?.message || `HTTP ${apiRes.status}`;
        }
      } catch (apiErr) {
        status = 'Fallback to Deep Link';
        failureReason = apiErr instanceof Error ? apiErr.message : 'Cloud API request failed';
      }
    }

    // Persist audit log in whatsapp_messages
    const { data: logRow } = await adminClient
      .from('whatsapp_messages')
      .insert({
        booking_code,
        recipient: targetPhone,
        message_type,
        message_content,
        provider_message_id: providerMessageId,
        status,
        failure_reason: failureReason,
      })
      .select()
      .single();

    return jsonResponse({
      success: true,
      mode: providerMessageId ? 'cloud_api' : 'deep_link',
      recipient: targetPhone,
      whatsapp_url: waUrl,
      status,
      provider_message_id: providerMessageId,
      log_id: logRow?.id || null,
    });
  } catch (err) {
    return jsonResponse({ error: err instanceof Error ? err.message : 'Internal server error' }, 500);
  }
});

