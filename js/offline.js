(function () {
    'use strict';
    // Desregistro inmediato de Service Workers y purga de CacheStorage
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (var i = 0; i < registrations.length; i++) {
                registrations[i].unregister();
            }
        }).catch(function () {});
    }
    if (typeof window !== 'undefined' && 'caches' in window) {
        window.caches.keys().then(function (keys) {
            keys.forEach(function (k) {
                window.caches.delete(k);
            });
        }).catch(function () {});
    }
})();
