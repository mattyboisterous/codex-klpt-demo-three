const CACHE_NAME = "codex-klpt-demo-three-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./dist/styles.css",
  "./src/app.js",
  "./data/domains.json",
  "./data/avatars.json",
  "./data/navigation.json",
  "./img/klpt-logo.png",
  "./img/bulb.png",
  "./img/avatars/planet-preview.png",
  "./img/avatars/mercury.png",
  "./img/avatars/venus.png",
  "./img/avatars/earth.png",
  "./img/avatars/mars.png",
  "./img/avatars/jupiter.png",
  "./img/avatars/saturn.png",
  "./img/avatars/uranus.png",
  "./img/avatars/neptune.png",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached ?? fetch(event.request);
    })
  );
});

