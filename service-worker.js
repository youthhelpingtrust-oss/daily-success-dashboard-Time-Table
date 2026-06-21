/* ==========================================================================
   Daily Success Dashboard — service-worker.js
   Caches the app shell so the dashboard works offline and installs as a PWA.

   IMPORTANT: bump CACHE_VERSION every time you redeploy changed files.
   Visitors keep using the old cached version until the version string
   changes here — that's what tells their browser a new copy is available.
   ========================================================================== */

var CACHE_VERSION = 'dsd-cache-v1';

var ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function (cache) { return cache.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
      .catch(function (err) { console.error('Service worker install failed', err); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(
          keys.filter(function (k) { return k !== CACHE_VERSION; })
              .map(function (k) { return caches.delete(k); })
        );
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // let cross-origin requests pass through untouched

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var networkFetch = fetch(event.request)
        .then(function (response) {
          if (response && response.status === 200) {
            var copy = response.clone();
            caches.open(CACHE_VERSION).then(function (cache) { cache.put(event.request, copy); });
          }
          return response;
        })
        .catch(function () {
          // offline and not cached — for page navigations, fall back to the app shell
          if (event.request.mode === 'navigate') return caches.match('./index.html');
          return cached;
        });
      return cached || networkFetch;
    })
  );
});
