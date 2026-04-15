const CACHE_NAME = "kansai-project-2-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.webmanifest",
  "./js/main.js",
  "./js/core/utils.js",
  "./js/core/storage.js",
  "./js/core/state.js",
  "./js/data/trip-data.js",
  "./js/views/dashboard.js",
  "./js/views/itinerary.js",
  "./js/views/backup.js",
  "./js/views/docs.js",
  "./js/views/checklist.js",
  "./js/views/budget.js",
  "./js/views/settings.js"
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

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
