

const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./style.css",
    "./components/Contador.js",
];


const CACHE_NAME = "v3ContadorReact";

//1.-Instalar el service worker
self.addEventListener('install', (e) =>{
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(CACHE_ELEMENTS)
            .then(() =>{
                self.skipWaiting()
                console.log('ya quede');
            } )
            .catch(err => {throw new Error(err)});
        })
        );
} );

//2.- activate service worker && reclamar
self.addEventListener('activate', (e) =>{

    const cacheWitheList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
                                .then(chachesNames => {
                                    return Promise.all(
                                            chachesNames.map(cacheName => {
                                                cacheWitheList.indexOf(cacheName) === -1 && caches.delete(cacheName);
                                            }))
                                }).then(() => self.clients.claim())
        )
} );


//3.- fetch al service worker
self.addEventListener('fetch', (e) => {
    //console.log(e.request); 
    e.respondWith(
        caches.match(e.request)
                                                .then(resp => resp ? resp:fetch(e.request))
    )
});
