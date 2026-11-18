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

    // Verify caller identity using their JWT
    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user: caller }, error: authErr } = await callerClient.auth.getUser();
    if (authErr || !caller) {
      return jsonResponse({ error: 'Unauthorized caller' }, 401);
    }

    // Admin service-role client (strictly server-side)
    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Enforce Main Admin privilege
    const { data: mainAdmin } = await adminClient
      .from('admin_users')
      .select('id, is_main_admin')
      .eq('user_id', caller.id)
      .eq('is_main_admin', true)
      .maybeSingle();

    if (!mainAdmin) {
      return jsonResponse({ error: 'Forbidden: Only Main Admin can manage Sub-Admins' }, 403);
    }

    const body = await req.json();
    const action = body.action || 'create';

    if (action === 'create') {
      const { full_name, email, phone, password, role_id, assigned_modules } = body;
      if (!full_name || !email || !password) {
        return jsonResponse({ error: 'full_name, email, and password are required' }, 400);
      }

      // Generate sequential Sub-Admin ID (e.g. SUBADMIN002)
      const { data: subadminId, error: seqErr } = await adminClient.rpc('generate_subadmin_id');
      if (seqErr || !subadminId) {
        return jsonResponse({ error: seqErr?.message || 'Failed to generate Sub-Admin ID' }, 500);
      }

      // Create auto-confirmed Supabase Auth user
      const { data: created, error: createErr } = await adminClient.auth.admin.createUser({
        email: email.trim().toLowerCase(),
        password,
        email_confirm: true,
        user_metadata: { full_name, role: 'sub_admin', subadmin_id: subadminId },
      });

      if (createErr || !created.user) {
        return jsonResponse({ error: createErr?.message || 'Failed to create Auth user' }, 400);
      }

      const newUserId = created.user.id;

      await adminClient.from('profiles').upsert({
        id: newUserId,
        full_name,
        email: email.trim().toLowerCase(),
        phone: phone || null,
        is_active: true,
      });

      const { data: subRow, error: subErr } = await adminClient
        .from('sub_admins')
        .insert({
          user_id: newUserId,
          subadmin_id: subadminId,
          full_name,
          email: email.trim().toLowerCase(),
          phone: phone || null,
          role_id: role_id || null,
          is_active: true,
          require_password_change: true,
          assigned_modules: Array.isArray(assigned_modules) ? assigned_modules : ['dashboard'],
        })
        .select()
        .single();

      if (subErr) {
        await adminClient.auth.admin.deleteUser(newUserId);
        return jsonResponse({ error: subErr.message }, 400);
      }

      await adminClient.from('admin_activity_logs').insert({
        user_id: caller.id,
        user_email: caller.email,
        user_role: 'Super Admin',
        action: 'CREATE_SUBADMIN',
        entity_type: 'sub_admins',
        entity_id: subadminId,
        metadata: { email: subRow.email, modules: subRow.assigned_modules },
      });

      return jsonResponse({ success: true, subadmin: subRow });
    }

    if (action === 'toggle_status') {
      const { subadmin_record_id, is_active } = body;
      if (!subadmin_record_id || typeof is_active !== 'boolean') {
        return jsonResponse({ error: 'subadmin_record_id and boolean is_active required' }, 400);
      }

      const { data: updated, error: updErr } = await adminClient
        .from('sub_admins')
        .update({ is_active, updated_at: new Date().toISOString() })
        .eq('id', subadmin_record_id)
        .select()
        .single();

      if (updErr) return jsonResponse({ error: updErr.message }, 400);

      await adminClient.from('admin_activity_logs').insert({
        user_id: caller.id,
        user_email: caller.email,
        user_role: 'Super Admin',
        action: is_active ? 'ACTIVATE_SUBADMIN' : 'DEACTIVATE_SUBADMIN',
        entity_type: 'sub_admins',
        entity_id: updated.subadmin_id,
      });

      return jsonResponse({ success: true, subadmin: updated });
    }

    if (action === 'reset_password') {
      const { user_id, new_password } = body;
      if (!user_id || !new_password || new_password.length < 8) {
        return jsonResponse({ error: 'user_id and new_password (min 8 chars) required' }, 400);
      }

      const { error: pwErr } = await adminClient.auth.admin.updateUserById(user_id, {
        password: new_password,
      });
      if (pwErr) return jsonResponse({ error: pwErr.message }, 400);

      await adminClient
        .from('sub_admins')
        .update({ require_password_change: true, updated_at: new Date().toISOString() })
        .eq('user_id', user_id);

      await adminClient.from('admin_activity_logs').insert({
        user_id: caller.id,
        user_email: caller.email,
        user_role: 'Super Admin',
        action: 'RESET_SUBADMIN_PASSWORD',
        entity_type: 'sub_admins',
        entity_id: user_id,
      });

      return jsonResponse({ success: true });
    }

    if (action === 'delete') {
      const { subadmin_record_id, user_id } = body;
      if (!subadmin_record_id) {
        return jsonResponse({ error: 'subadmin_record_id is required' }, 400);
      }

      // Fetch record before deleting for audit & auth cleanup
      const { data: targetRow } = await adminClient
        .from('sub_admins')
        .select('id, user_id, subadmin_id, email')
        .eq('id', subadmin_record_id)
        .maybeSingle();

      const targetUserId = user_id || targetRow?.user_id;

      const { error: delSubErr } = await adminClient
        .from('sub_admins')
        .delete()
        .eq('id', subadmin_record_id);

      if (delSubErr) return jsonResponse({ error: delSubErr.message }, 400);

      if (targetUserId) {
        await adminClient.from('profiles').delete().eq('id', targetUserId);
        await adminClient.auth.admin.deleteUser(targetUserId).catch(() => {});
      }

      await adminClient.from('admin_activity_logs').insert({
        user_id: caller.id,
        user_email: caller.email,
        user_role: 'Super Admin',
        action: 'DELETE_SUBADMIN',
        entity_type: 'sub_admins',
        entity_id: targetRow?.subadmin_id || subadmin_record_id,
        metadata: { email: targetRow?.email || null },
      });

      return jsonResponse({ success: true });
    }

    return jsonResponse({ error: `Unsupported action: ${action}` }, 400);
  } catch (err) {
    return jsonResponse({ error: err instanceof Error ? err.message : 'Internal server error' }, 500);
  }
});

