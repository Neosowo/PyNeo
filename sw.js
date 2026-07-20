



const CACHE_NAME = 'pyneo-v2';




const SW_BASE = self.location.href.replace(/sw\.js.*$/, '');


const toUrl = (path) => SW_BASE + path;


const STATIC_ASSETS = [
    SW_BASE,                              
    toUrl('index.html'),
    toUrl('offline.html'),
    toUrl('manifest.json'),
    toUrl('js/offline.js'),
    toUrl('js/app.js'),
    toUrl('js/app.js?v=3.2'),
    toUrl('js/chat.js'),
    toUrl('js/streak.js'),
    toUrl('js/media/favicon.png'),
    toUrl('js/media/qr.png'),
    
    toUrl('js/modules/init.js'),
    toUrl('js/modules/unit_00.js'),
    toUrl('js/modules/unit_01.js'),
    toUrl('js/modules/unit_02.js'),
    toUrl('js/modules/unit_03.js'),
    toUrl('js/modules/unit_04.js'),
    toUrl('js/modules/unit_05.js'),
    toUrl('js/modules/unit_06.js'),
    toUrl('js/modules/unit_07.js'),
    toUrl('js/modules/unit_08.js'),
    toUrl('js/modules/unit_09.js'),
    toUrl('js/modules/unit_10.js'),
    toUrl('js/modules/unit_11.js'),
    toUrl('js/modules/unit_12.js'),
    toUrl('js/modules/unit_13.js'),
    toUrl('js/modules/unit_13.js?v=3.0'),
    
    toUrl('js/evaluations/init.js'),
    toUrl('js/evaluations/app_eval.js'),
    toUrl('js/evaluations/daily_retos.js'),
    toUrl('js/evaluations/eval_01.js'),
    toUrl('js/evaluations/eval_02.js'),
    toUrl('js/evaluations/eval_03.js'),
    toUrl('js/evaluations/eval_04.js'),
    toUrl('js/evaluations/eval_05.js'),
    toUrl('js/evaluations/eval_06.js'),
    toUrl('js/evaluations/eval_07.js'),
    toUrl('js/evaluations/eval_08.js'),
    toUrl('js/evaluations/eval_09.js'),
    toUrl('js/evaluations/eval_10.js'),
    toUrl('js/evaluations/eval_11.js'),
    toUrl('js/evaluations/eval_12.js'),
    toUrl('js/evaluations/eval_13.js'),
    toUrl('js/evaluations/eval_14.js'),
    toUrl('js/evaluations/eval_15.js'),
    toUrl('js/evaluations/eval_16.js'),
    toUrl('js/evaluations/eval_17.js'),
    toUrl('js/evaluations/eval_18.js'),
    toUrl('js/evaluations/eval_19.js'),
    toUrl('js/evaluations/eval_20.js'),
    toUrl('js/evaluations/eval_21.js'),
    toUrl('js/evaluations/eval_22.js'),
    toUrl('js/evaluations/eval_23.js'),
    toUrl('js/evaluations/eval_24.js'),
    toUrl('js/evaluations/eval_25.js'),
    toUrl('js/evaluations/eval_26.js'),
    toUrl('js/evaluations/eval_27.js'),
    toUrl('js/evaluations/eval_28.js'),
    toUrl('js/evaluations/eval_secret.js'),
];


const CDN_ASSETS = [
    'https://cdn.tailwindcss.com',
    'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js',
    'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            
            
            await Promise.allSettled(
                STATIC_ASSETS.map(assetUrl =>
                    cache.add(assetUrl).catch(err => {
                        console.warn('[SW] No se pudo cachear:', assetUrl, err.message);
                    })
                )
            );

            
            await Promise.allSettled(
                CDN_ASSETS.map(cdnUrl =>
                    fetch(cdnUrl, { mode: 'no-cors' })
                        .then(res => cache.put(cdnUrl, res))
                        .catch(() => console.warn('[SW] CDN no cacheado:', cdnUrl))
                )
            );
        }).then(() => self.skipWaiting())
    );
});


self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => {
                        return caches.delete(key);
                    })
            )
        ).then(() => self.clients.claim())
    );
});


self.addEventListener('fetch', (event) => {
    const { request } = event;
    const reqUrl = new URL(request.url);

    
    if (
        reqUrl.hostname.includes('firestore.googleapis.com') ||
        reqUrl.hostname.includes('firebase.googleapis.com') ||
        reqUrl.hostname.includes('firebaseio.com') ||
        reqUrl.hostname.includes('googleapis.com') ||
        reqUrl.hostname.includes('gstatic.com') ||
        reqUrl.hostname.includes('google.com') ||          
        reqUrl.hostname.endsWith('.google') ||             
        reqUrl.hostname.includes('googlesyndication.com') ||
        reqUrl.hostname.includes('googletagmanager.com') ||
        reqUrl.hostname.includes('doubleclick.net') ||
        reqUrl.hostname.includes('google-analytics.com') ||
        reqUrl.hostname.includes('pinimg.com') ||          
        reqUrl.hostname.includes('mixkit.co') ||           
        reqUrl.hostname.includes('postimg.cc') ||          
        reqUrl.hostname.includes('assets.mixkit.co')
    ) {
        return; 
    }

    
    event.respondWith(
        fetch(request)
            .then(response => {
                if (request.method === 'GET' && response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        
                        cache.put(request, responseClone.clone());
                        
                        if (reqUrl.search) {
                            const noQuery = reqUrl.origin + reqUrl.pathname;
                            cache.put(noQuery, responseClone);
                        }
                    });
                }
                return response;
            })
            .catch(async () => {
                
                let cached = await caches.match(request);
                if (cached) return cached;

                
                if (reqUrl.search) {
                    cached = await caches.match(reqUrl.origin + reqUrl.pathname);
                    if (cached) return cached;
                }

                
                if (request.mode === 'navigate') {
                    return caches.match(toUrl('offline.html')) ||
                        caches.match(toUrl('index.html'));
                }

                return new Response('', {
                    status: 503,
                    statusText: 'Offline - Not in cache'
                });
            })
    );
});


self.addEventListener('sync', (event) => {
    if (event.tag === 'pyneo-sync') {
        event.waitUntil(
            self.clients.matchAll({ type: 'window' }).then(clients => {
                clients.forEach(client =>
                    client.postMessage({ type: 'SYNC_COMPLETE' })
                );
            })
        );
    }
});


self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
