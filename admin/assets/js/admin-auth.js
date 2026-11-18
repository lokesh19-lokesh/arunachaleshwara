/* ============================================================
   ARUNACHALESHWARA ADMIN – Authentication & RBAC Engine
   Never stores plaintext passwords or service_role keys.
   Uses Supabase Auth exclusively.
   ============================================================ */

const ADMIN_SUPABASE_URL = 'https://zifacvpvdrsylgijtfti.supabase.co';
const ADMIN_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppZmFjdnB2ZHJzeWxnaWp0ZnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ4OTkyMzIsImV4cCI6MjExMDQ3NTIzMn0.4xPpoPrsE0vnL_tvC_xRqJPFf8ulltN4ZbdgU6fncV8';

let adminSupabase = null;
if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
  adminSupabase = window.supabase.createClient(ADMIN_SUPABASE_URL, ADMIN_SUPABASE_ANON_KEY);
  window.adminSupabase = adminSupabase;
}

window.CURRENT_ADMIN_USER = null;

/**
 * Record login attempt into user_login_history
 */
async function logLoginAttempt(emailOrId, status, failureReason = null, userId = null) {
  if (!adminSupabase) return;
  try {
    await adminSupabase.from('user_login_history').insert([{
      user_id: userId,
      email_or_id: emailOrId,
      status: status,
      failure_reason: failureReason,
      user_agent: navigator.userAgent
    }]);
  } catch (e) {
    console.warn('Login logging skipped:', e);
  }
}

/**
 * Record administrative activity in audit logs
 */
async function logAdminActivity(action, entityType, entityId, metadata = {}) {
  if (!adminSupabase || !window.CURRENT_ADMIN_USER) return;
  try {
    await adminSupabase.from('admin_activity_logs').insert([{
      user_id: window.CURRENT_ADMIN_USER.id,
      user_email: window.CURRENT_ADMIN_USER.email,
      user_role: window.CURRENT_ADMIN_USER.role,
      action: action,
      entity_type: entityType,
      entity_id: String(entityId || ''),
      metadata: metadata
    }]);
  } catch (e) {
    console.warn('Activity log error:', e);
  }
}

/**
 * Main Admin Login (Email + Password)
 */
async function loginMainAdmin(email, password) {
  if (!adminSupabase) throw new Error('Supabase SDK not loaded');

  const { data, error } = await adminSupabase.auth.signInWithPassword({
    email: email.trim(),
    password: password
  });

  if (error) {
    await logLoginAttempt(email, 'Failed', error.message);
    throw error;
  }

  // Verify user is an active admin
  const { data: adminRecord, error: adminErr } = await adminSupabase
    .from('admin_users')
    .select('*, roles(name)')
    .eq('user_id', data.user.id)
    .maybeSingle();

  if (adminErr || !adminRecord) {
    // Check if subadmin tried main login
    const { data: subRec } = await adminSupabase
      .from('sub_admins')
      .select('id, is_active')
      .eq('user_id', data.user.id)
      .maybeSingle();

    if (!subRec || !subRec.is_active) {
      await adminSupabase.auth.signOut();
      await logLoginAttempt(email, 'Failed', 'Unauthorised account or deactivated', data.user.id);
      throw new Error('This account does not have active Administrative privileges.');
    }
  }

  await logLoginAttempt(email, 'Success', null, data.user.id);
  return data.user;
}

/**
 * Sub-Admin Login (Unique Sub-Admin ID + Password)
 * Resolves SUBADMIN001 -> Supabase Auth account securely
 */
async function loginSubAdmin(subadminId, password) {
  if (!adminSupabase) throw new Error('Supabase SDK not loaded');

  const cleanId = subadminId.trim().toUpperCase();

  // Resolve subadmin email securely via RPC
  const { data: subRows, error: lookupErr } = await adminSupabase
    .rpc('resolve_subadmin_login', { p_subadmin_id: cleanId });

  const subRecord = subRows && subRows[0];

  if (lookupErr || !subRecord) {
    await logLoginAttempt(cleanId, 'Failed', 'Invalid Sub-Admin ID');
    throw new Error(`Sub-Admin ID "${cleanId}" not found.`);
  }

  if (!subRecord.is_active) {
    await logLoginAttempt(cleanId, 'Failed', 'Account deactivated', subRecord.user_id);
    throw new Error('Your Sub-Admin account has been deactivated. Contact Main Admin.');
  }

  // Authenticate via Supabase Auth
  const { data, error } = await adminSupabase.auth.signInWithPassword({
    email: subRecord.email,
    password: password
  });

  if (error) {
    await logLoginAttempt(cleanId, 'Failed', error.message, subRecord.user_id);
    throw new Error('Invalid password for Sub-Admin ID ' + cleanId);
  }

  // Update last_login timestamp
  await adminSupabase
    .from('sub_admins')
    .update({ last_login: new Date().toISOString() })
    .eq('user_id', data.user.id);

  await logLoginAttempt(cleanId, 'Success', null, data.user.id);
  return data.user;
}

const ADMIN_PROFILE_CACHE_KEY = 'arn_admin_profile_v1';
const ADMIN_PROFILE_TTL_MS = 15 * 60 * 1000; // 15 minutes

function getCachedAdminProfile(userId) {
  try {
    const raw = sessionStorage.getItem(ADMIN_PROFILE_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.id === userId && (Date.now() - (parsed._ts || 0)) < ADMIN_PROFILE_TTL_MS) {
      return parsed;
    }
  } catch (e) {}
  return null;
}

function setCachedAdminProfile(profile) {
  try {
    sessionStorage.setItem(ADMIN_PROFILE_CACHE_KEY, JSON.stringify({ ...profile, _ts: Date.now() }));
  } catch (e) {}
}

function clearCachedAdminProfile() {
  try { sessionStorage.removeItem(ADMIN_PROFILE_CACHE_KEY); } catch (e) {}
}

/**
 * Fetch fresh RBAC profile from Supabase in ONE parallel round-trip
 */
async function fetchFreshAdminProfile(user) {
  const [{ data: adminData }, { data: prof }, { data: subData }] = await Promise.all([
    adminSupabase.from('admin_users').select('*, roles(name)').eq('user_id', user.id).maybeSingle(),
    adminSupabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle(),
    adminSupabase.from('sub_admins').select('*, roles(name)').eq('user_id', user.id).maybeSingle()
  ]);

  if (adminData) {
    const profile = {
      id: user.id,
      email: user.email,
      fullName: (prof && prof.full_name) || 'Main Admin',
      role: (adminData.roles && adminData.roles.name) || 'Super Admin',
      isMainAdmin: true,
      subadminId: 'ADMIN',
      assignedModules: ['all']
    };
    setCachedAdminProfile(profile);
    return profile;
  }

  if (subData && subData.is_active) {
    const profile = {
      id: user.id,
      email: user.email,
      fullName: subData.full_name,
      role: (subData.roles && subData.roles.name) || 'Sub-Admin',
      isMainAdmin: false,
      subadminId: subData.subadmin_id,
      assignedModules: Array.isArray(subData.assigned_modules) ? subData.assigned_modules : []
    };
    setCachedAdminProfile(profile);
    return profile;
  }

  return null;
}

/**
 * Verify Active Session & Load RBAC Profile (Instant via sessionStorage + background revalidation)
 * Must be called at the top of every protected admin page
 */
async function requireAdminAuth() {
  if (!adminSupabase) {
    window.location.href = 'login.html';
    return null;
  }

  const { data: { session }, error } = await adminSupabase.auth.getSession();

  if (error || !session || !session.user) {
    clearCachedAdminProfile();
    window.location.href = 'login.html';
    return null;
  }

  const user = session.user;

  // Fast path: return cached RBAC profile in < 2ms & revalidate silently in background
  const cached = getCachedAdminProfile(user.id);
  if (cached) {
    window.CURRENT_ADMIN_USER = cached;
    fetchFreshAdminProfile(user).then(fresh => {
      if (!fresh) {
        clearCachedAdminProfile();
        adminSupabase.auth.signOut().finally(() => { window.location.href = 'login.html'; });
      } else {
        window.CURRENT_ADMIN_USER = fresh;
      }
    }).catch(() => {});
    return cached;
  }

  // Cold path: single parallel round-trip
  const fresh = await fetchFreshAdminProfile(user);
  if (fresh) {
    window.CURRENT_ADMIN_USER = fresh;
    return fresh;
  }

  // Not authorised
  clearCachedAdminProfile();
  await adminSupabase.auth.signOut();
  window.location.href = 'login.html';
  return null;
}

/**
 * Check if current user has permission to access a module
 */
function canAccessModule(moduleName) {
  if (!window.CURRENT_ADMIN_USER) return false;
  if (window.CURRENT_ADMIN_USER.isMainAdmin) return true;
  if (moduleName === 'dashboard') return true;
  return window.CURRENT_ADMIN_USER.assignedModules.includes(moduleName);
}

/**
 * Logout Admin
 */
async function logoutAdmin() {
  clearCachedAdminProfile();
  try {
    Object.keys(sessionStorage).forEach(k => {
      if (k.startsWith('arn_cache_')) sessionStorage.removeItem(k);
    });
  } catch (e) {}
  if (adminSupabase) {
    logAdminActivity('LOGOUT', 'auth', window.CURRENT_ADMIN_USER?.id || '');
    await adminSupabase.auth.signOut();
  }
  window.CURRENT_ADMIN_USER = null;
  window.location.href = 'login.html';
}

window.loginMainAdmin = loginMainAdmin;
window.loginSubAdmin = loginSubAdmin;
window.requireAdminAuth = requireAdminAuth;
window.canAccessModule = canAccessModule;
window.logoutAdmin = logoutAdmin;
window.logAdminActivity = logAdminActivity;
