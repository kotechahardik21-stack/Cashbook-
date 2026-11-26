const C="cashbook-v1";
const ASSETS=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png"];
const JS="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(async c=>{await c.addAll(ASSETS);try{const r=new Request(JS,{mode:"no-cors"});await c.put(r,await fetch(r))}catch(_){}}));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)))});
