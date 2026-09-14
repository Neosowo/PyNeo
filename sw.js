// Desinstalador de Service Worker para PyNeo
// Desregistra cualquier worker activo, purga todas las caches y recarga hacia el servidor.

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
            .then(() => self.registration.unregister())
    );
});

self.addEventListener('fetch', (event) => {
    // No interceptar peticiones; permitir paso directo a la red
    return;
});
