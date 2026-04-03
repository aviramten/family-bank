const CACHE_NAME = 'family-bank-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon-192.svg',
  'icon-512.svg'
];

// התקנת ה-Service Worker ושמירת הקבצים הבסיסיים בזיכרון
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// ניהול בקשות - מאפשר לאפליקציה לעבוד גם כשאין אינטרנט
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
