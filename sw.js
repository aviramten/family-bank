const CACHE_NAME = 'family-bank-v1';
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'manifest.json',
  'icon-192.svg',
  'icon-512.svg'
];

// התקנת ה-Service Worker ושמירת הקבצים בזיכרון המטמון (Cache)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // גורם ל-SW החדש להיכנס לפעולה מיד ללא צורך בסגירת האפליקציה
  self.skipWaiting();
});

// ניקוי זיכרון ישן במידה ושדרגת גרסה
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// ניהול בקשות הרשת - מאפשר לאפליקציה לעבוד Offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // אם הקובץ קיים בזיכרון, החזר אותו. אם לא, פנה לרשת.
      return response || fetch(event.request);
    })
  );
});
