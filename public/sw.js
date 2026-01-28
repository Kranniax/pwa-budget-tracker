const APP_PREFIX = "Budget_Tracker-";
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
  "./index.html",
  "./manifest.json",
  "./css/styles.css",
  "./icons/icon-72x72.png",
  "./icons/icon-96x96.png",
  "./icons/icon-128x128.png",
  "./icons/icon-144x144.png",
  "./icons/icon-152x152.png",
  "./icons/icon-192x192.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png",
  "./js/idb.js",
  "./js/index.js",
];

// Installation of the service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Installing cache: " + CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
    }),
  );
});

// Activation of service worker and removal of old cache data.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheName.includes(VERSION)) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
          return undefined;
        }),
      ),
    ),
  );
});
// Intercept fetch request when network fails.
self.addEventListener("fetch", (event) => {
  console.log(`Handling fetch event for ${event.request.url}`);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log("Found response in cache:", cachedResponse);
        return cachedResponse;
      } else {
        console.log("Falling back to network");
        return fetch(event.request);
      }
    }),
  );
});
