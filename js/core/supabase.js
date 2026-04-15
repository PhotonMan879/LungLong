import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase-config.js";

// window.supabase is loaded via UMD <script> in index.html
// In check.mjs (Node): window.supabase is mocked
const { createClient } = window.supabase;
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function signInWithEmail(email) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.href }
  });
  return error;
}

export async function signOut() {
  await supabase.auth.signOut();
}

// ── Trip sync ─────────────────────────────────────

export async function loadTripsFromCloud(userId) {
  const { data, error } = await supabase
    .from("trips")
    .select("id, data")
    .eq("user_id", userId);
  if (error) throw error;
  return data || [];
}

export async function saveTripToCloud(userId, trip) {
  const { error } = await supabase.from("trips").upsert(
    { id: trip.id, user_id: userId, data: trip, updated_at: new Date().toISOString() },
    { onConflict: "id" }
  );
  if (error) console.warn("[sync] trip:", error.message);
}

// ── Doc storage ───────────────────────────────────

export async function uploadDocToCloud(userId, docId, blob) {
  const { error } = await supabase.storage
    .from("docs")
    .upload(`${userId}/${docId}`, blob, { upsert: true });
  if (error) console.warn("[sync] doc upload:", error.message);
}

export async function downloadDocFromCloud(userId, docId) {
  const { data, error } = await supabase.storage
    .from("docs")
    .download(`${userId}/${docId}`);
  if (error) return null;
  return data;
}

export async function deleteDocFromCloud(userId, docId) {
  const { error } = await supabase.storage
    .from("docs")
    .remove([`${userId}/${docId}`]);
  if (error) console.warn("[sync] doc delete:", error.message);
}
