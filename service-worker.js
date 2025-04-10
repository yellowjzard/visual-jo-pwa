self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/script.js',
          '/images/icon-192x192.png',
          '/images/icon-512x512.png',
          // Aggiungi qui altre risorse che vuoi siano disponibili offline
          'https://docs.google.com/spreadsheets/d/e/2PACX-1vRI6DEc11YtMUXUjD3abMAhxtD6Iojb6Ca1UAAClYzu4UnB-J81YrltciK9ixN-FCeLhGkMz9ftmWz4/pub?output=csv'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });