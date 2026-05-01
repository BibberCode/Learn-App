const CACHE_NAME = "lernapp-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/code/home/frontend/style.css",
  "/code/home/frontend/app.js",
  "/icon-192.png"
];

// Installieren (Dateien speichern)
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Aktivieren (alte Caches löschen)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch (offline fallback)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});