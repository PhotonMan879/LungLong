const CACHE_NAME = "kansai-project-2-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.webmanifest",
  "./js/main.js",
  "./js/core/map.js",
  "./js/core/utils.js",
  "./js/core/storage.js",
  "./js/core/state.js",
  "./js/core/supabase.js",
  "./js/core/supabase-config.js",
  "./js/data/trip-data.js",
  "./js/views/dashboard.js",
  "./js/views/itinerary.js",
  "./js/views/places.js",
  "./js/views/backup.js",
  "./js/views/docs.js",
  "./js/views/checklist.js",
  "./js/views/budget.js",
  "./js/views/settings.js",
  "./js/views/auth.js",
  "./js/views/assist.js",
  "./js/views/prep.js",
  "./js/views/transport.js",
  "./js/views/template-picker.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Network-first: always try network, fall back to cache (works offline)
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
