const CACHE_NAME = "kansai-project-2-v9";

// install: ไม่ pre-cache แล้ว — network-first fetch จัดการเอง
// การ pre-cache ใน install ทำให้ JS เก่าค้างใน cache ขณะที่หน้าโหลดอยู่แล้ว
self.addEventListener("install", (event) => {
  self.skipWaiting(); // activate ทันทีโดยไม่รอ tab เก่าปิด
});

self.addEventListener("activate", (event) => {
  // ลบ cache เก่าทุก version ที่ไม่ใช่ปัจจุบัน
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  // claim ทุก client ที่เปิดอยู่ทันที → trigger controllerchange ในหน้า → auto-reload
  self.clients.claim();
});

// Network-first: ลอง network ก่อน, cache เมื่อได้ response, fallback cache เมื่อ offline
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
