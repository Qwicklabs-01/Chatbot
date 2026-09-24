const CACHE_NAME = 'aura-ai-cache-v18';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './icon.svg',
  './aura-icon-192.png',
  './aura-icon-512.png',
  './manifest.json',
  './libs/pdf-lib.min.js',
  './libs/pdf.min.js',
  './libs/pdf.worker.min.js',
  './libs/mammoth.browser.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS.map(asset => cache.add(asset).catch(err => console.warn(`Failed to cache asset: ${asset}`, err)))
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First Strategy for Online Speed & Zero-Latency Updates, with Instant Cache Fallback when Offline
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  // Do not intercept API requests
  if (url.pathname.startsWith('/api/')) return;

  e.respondWith(
    fetch(e.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache when offline
        return caches.match(e.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (e.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
