/* [Grok-Bot] V2.03: Service Worker fuer BPPlayer, offline-faehig.
   App-Dateien (HTML/JS/CSS/JSON/Symbole): online network-first, offline cache-first; Kopie im Cache "bpp-app-<Version>". V4.59/V4.86: APP/AUD, Client-Notify.
   ohne Netz aus dem Cache. Alte App-Caches werden beim Aktivieren geloescht.
   MP3 aus audio/: liegen im Cache "bpp-audio-v2" (Client v203/v481/v483). Abspielen cache-first mit Range-Antworten (206),
   damit Spulen geht; bei Treffer kein Netz (auch online). Nicht im Cache: Netz. YouTube/fremde Server am SW vorbei. V4.83: kein Sonder-Netz-First mehr fuer guru-stotram-abend. */
var VER="4880"; // [Grok-Bot] V4.87
var APP="bpp-app-"+VER; var AUD="bpp-audio-v2"; /* [Grok-Bot] V4.59: Cache-Namen wieder gesetzt (fehlten) */
var CORE=["./","index.html","follow.js","v218.js","manifest.json","icon-192.svg","icon-512.svg","icon-192.png","icon-512.png","icon-maskable-192.png","icon-maskable-512.png","apple-touch-icon.png","fonts/fonts-local.css","lib/mqtt.min.js","v204.js?v=205","version.json","sync/hanuman-mtj.json","sync/nrsimha-mtj.json","sync/vaishnava-mtj.json","start.jpg"]; /* [Grok.com] */
self.addEventListener("install", function(e){
  /* [Grok-Bot] V3.41: zusaetzlich ALLE lokalen Dateien vorab speichern: aus index.html (src/href mit ?v=), rekursiv aus nachgeladenen
     Skripten (document.write / src="...js") und die Schriften aus den CSS-Dateien (url(...woff2)) */
  e.waitUntil(caches.open(APP).then(function(c){
    var seen={};
    function abs(u, from){ try{ return new URL(u, from||self.registration.scope).href; }catch(x){ return null; } }
    function scan(u, txt){
      var L=[], m, rx;
      if(/\.css(\?|$)/.test(u)){ rx=/url\(["']?([^"')]+\.(?:woff2|png|svg|jpg))["']?\)/g; }
      else { rx=/(?:src|href)=\\?["']([^"':\\]+\.(?:js|css|json|svg|png|jpg|webp|woff2)(?:\?[^"'\\]*)?)\\?["']/g; }
      while((m=rx.exec(txt))){ var x=abs(m[1], /\.css(\?|$)/.test(u)?u:null); if(x && x.indexOf(self.registration.scope)===0) L.push(x); }
      return Promise.all(L.map(get));
    }
    function get(u){
      u=abs(u); if(!u || seen[u]) return Promise.resolve(); seen[u]=1;
      return fetch(u, {cache:"no-store"}).then(function(r){
        if(!r.ok) return;
        var keep=r.clone();
        return c.put(u, keep).then(function(){
          if(/\.(js|css|html)(\?|$)|\/$/.test(u)) return r.text().then(function(t){ return scan(u, t); });
        });
      }).catch(function(){});
    }
    return Promise.all(CORE.map(get));
  }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k!==APP && k!==AUD; }).map(function(k){ return caches.delete(k); })); }).then(function(){
    /* [Grok-Bot] V4.83: audio-Cache nicht mehr bei Activate anfassen (frueher: guru-stotram-abend loeschen → jeder Update-Zyklus erzwang Re-Download) */
    return self.clients.claim();
  }).then(function(){
    /* [Grok-Bot] V4.59: offene Fenster informieren (neuer Client-Code laedt dann neu) */
    return self.clients.matchAll({type:"window", includeUncontrolled:true}).then(function(cs){
      cs.forEach(function(c){ try{ c.postMessage({bppSwUpdate:VER}); }catch(x){} });
    });
  }));
});
function isAudio(u){ return /\/audio\/[^\/]+\.(mp3|m4a|ogg|wav)$/i.test(u.pathname); }
function audioKey(u){ return u.origin+u.pathname; }
function ranged(req, res){
  return res.blob().then(function(b){
    var size=b.size, type=res.headers.get("Content-Type")||"audio/mpeg", h=req.headers.get("range");
    var m=h && /bytes=(\d*)-(\d*)/.exec(h);
    if(!m) return new Response(b, {status:200, headers:{"Content-Type":type, "Content-Length":String(size), "Accept-Ranges":"bytes"}});
    var s=m[1]===""?NaN:+m[1], en=m[2]===""?NaN:+m[2];
    if(isNaN(s)){ s=Math.max(0, size-(isNaN(en)?0:en)); en=size-1; }
    if(isNaN(en) || en>=size) en=size-1;
    if(s>=size || s>en) return new Response("", {status:416, headers:{"Content-Range":"bytes */"+size}});
    return new Response(b.slice(s, en+1, type), {status:206, headers:{"Content-Type":type, "Content-Length":String(en-s+1),
      "Content-Range":"bytes "+s+"-"+en+"/"+size, "Accept-Ranges":"bytes"}});
  });
}
self.addEventListener("fetch", function(e){
  var r=e.request, u=new URL(r.url);
  if(r.method!=="GET" || u.origin!==self.location.origin) return;
  if(isAudio(u)){
    if(u.searchParams.has("bppdl")) return; /* Hintergrund-Download: direkt Netz */
    /* [Grok-Bot] V4.86: cache-first inkl. ignoreSearch; bei Miss Netz, offline Fehler statt Hang */
    e.respondWith(caches.open(AUD).then(function(c){
      return c.match(audioKey(u)).then(function(hit){ return hit || c.match(audioKey(u), {ignoreSearch:true}); });
    }).then(function(hit){
      if(hit) return ranged(r, hit);
      return fetch(r).catch(function(){ return Response.error(); });
    }));
    return;
  }
  var nav=(r.mode==="navigate");
  var noStore=/\/version\.json$/.test(u.pathname) || u.searchParams.has("t");
  var req=nav?new Request(r, {cache:"no-store"}):r; /* [Grok.com] Startseite nie aus altem Cache */
  function fromApp(){
    return caches.open(APP).then(function(ca){
      if(nav) return ca.match("./").then(function(m){ return m || ca.match("index.html"); });
      if(noStore) return ca.match(u.pathname).then(function(m){ return m || ca.match("version.json"); });
      return ca.match(r).then(function(m){ return m || ca.match(r, {ignoreSearch:true}); });
    }).then(function(m){ return m || Response.error(); });
  }
  /* [Grok-Bot] V4.86: offline cache-first (kein Warten auf Netz-Timeout); online weiter network-first */
  if(typeof navigator!=="undefined" && navigator.onLine===false){
    e.respondWith(fromApp().then(function(m){
      if(m && m.status!==0) return m;
      return fetch(req).then(function(res){
        if(res && res.ok && res.type==="basic"){
          var c2=res.clone();
          caches.open(APP).then(function(ca){ ca.put(noStore?u.pathname:(nav?"./":r), c2); });
        }
        return res;
      }).catch(function(){ return m || Response.error(); });
    }));
    return;
  }
  e.respondWith(fetch(req).then(function(res){
    if(res && res.ok && res.type==="basic"){
      var c=res.clone(), c2=res.clone(); /* [Grok-Bot] V3.41: zweite Kopie zum Speichern (die erste ist nach text() verbraucht -> put schlug bisher still fehl) */
      c.text().then(function(txt){
        if(txt && txt.indexOf("PLACEHOLDER")===0) return; /* [Grok.com] Platzhalter nicht speichern */
        caches.open(APP).then(function(ca){ ca.put(noStore?u.pathname:(nav?"./":r), c2); });
      }).catch(function(){});
    }
    return res;
  }).catch(function(){ return fromApp(); }));
});
self.addEventListener("message", function(e){
  var d=e.data;
  if(d==="bpp-ver" && e.source) e.source.postMessage({bppSw:VER});
  if(d && d.type==="bpp-skip-waiting") self.skipWaiting(); /* [Grok-Bot] V4.59 */
});
