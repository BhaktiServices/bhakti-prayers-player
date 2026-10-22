/* [Grok-Bot] V2.03: Service Worker fuer BPPlayer, offline-faehig.
   App-Dateien (HTML/JS/CSS/JSON/Symbole): immer zuerst Netz (neue Version kommt sofort), Kopie im Cache "bpp-app-<Version>";
   ohne Netz aus dem Cache. Alte App-Caches werden beim Aktivieren geloescht.
   MP3 aus audio/: liegen im Cache "bpp-audio-v1" (laedt v203.js im Hintergrund). Abspielen aus dem Cache mit Range-Antworten (206),
   damit Spulen geht. Nicht im Cache: direkt aus dem Netz. YouTube und fremde Server laufen am Service Worker vorbei. */
var VER="392" /* [Grok-Bot] V3.92 Bhutabhrteshvaranatha */ /* [Grok-Bot] V3.91 Statistik i18n + MP3 gekuerzt */ /* [Grok-Bot] V3.90 vishnu-arati aus Menue */ /* [Grok-Bot] V3.89 Vishnu Arati mit Final Prayers */ /* [Grok-Bot] V3.88 Final Prayers Sunday */ /* [Grok-Bot] V3.87 Guru Stotram Prabhus */ /* [Grok-Bot] V3.86 Hinweis ohne Akkorde */ /* [Grok-Bot] V3.85 Ueberschrift indisch */ /* [Grok-Bot] V3.84 Gross Knoepfe nur mit Menue+ */ /* [Grok-Bot] V3.83 Gross Uebersetzung unten */ /* [Grok-Bot] V3.82 Atma Bhog unter Titel */ /* [Grok-Bot] V3.81 Gross Uebersetzung + X */ /* [Grok-Bot] V3.80 Lesbarkeit */ /* [Grok-Bot] V3.79 drei Stile */ /* [Grok-Bot] V3.78 WIP-Zeichen + Hilfe */ /* [Grok-Bot] V3.77 Bhu Schreibkorrekturen */ /* [Grok-Bot] V3.76 Gross Lage per Sensor */ /* [Grok-Bot] V3.75 Gross 6 s quer */ /* [Grok-Bot] V3.74 Orte 24 h wieder da */ /* [Grok-Bot] V3.73 Gross frei drehbar */ /* [Grok-Bot] V3.72 Gross-Tipp Querformat-Sperre */ /* [Grok-Bot] V3.71 Handy quer = Gross */ /* [Grok-Bot] V3.70 aktiv-in entfernt */ /* [Grok-Bot] V3.69 Hinweis ohne Uebersetzung */ /* [Grok-Bot] V3.68 Narayana Schlusszeile */ /* [Grok-Bot] V3.67 vier Suktam-Aufnahmen */ /* [Grok-Bot] V3.66 Offline links + Orte 24h */ /* [Grok-Bot] V3.65 hare-e nach Heft */ /* [Grok-Bot] V3.64 Kavacam 37 nach Heft */ /* [Grok-Bot] V3.63 Akkorde einheitlich */ /* [Grok-Bot] V3.62 VSN + Position */ /* [Grok-Bot] V3.61 Akkorde nach Heft */ /* [Grok-Bot] V3.60 Pfeiltasten markieren */ /* [Grok-Bot] V3.59 Leertaste+F5 */ /* [Grok-Bot] V3.55 Purusa/VSN Aufnahmen */ /* [Grok-Bot] V3.54 Portugues */ /* [Grok-Bot] V3.53 ohne Aufnahme */ /* [Grok-Bot] V3.52 Tastenkuerzel + Hanuman-Flackern */  /* [Grok-Bot] V3.51 Kavaca-Schluss + Scrollen nur Ansicht */ /* [Grok-Bot] V3.50 Nrsimha Abend Timing */ /* [Grok-Bot] V3.49 Tipp spult */ /* [Grok-Bot] V3.48 letzte Strophen */ /* [Grok-Bot] V3.47 Blaettern spult */ /* [Grok-Bot] V3.46 Chakar-Teil */ /* [Grok-Bot] V3.45 Atma-Tooltip */ /* [Grok-Bot] V3.44 Spalten */ /* [Grok-Bot] V3.43 Atma Bhog */ /* [Grok-Bot] V3.42 Hilfe neu */ /* [Grok-Bot] V3.41 Offline repariert, Schriften lokal, App installieren */ /* [Grok-Bot] V3.40 Ton aller MP3 bearbeitet, Audio-Cache v2 */ /* [Grok-Bot] V3.39 Grossbild-X */ /* [Grok-Bot] V3.38 Grossbild-Zeilenakkorde */ /* [Grok-Bot] V3.37 Kavaca Str. 43 + Timing */ /* [Grok-Bot] V3.36 Grossbild-Ueberlapp */ /* [Grok-Bot] V3.35 Kavaca-Akkorde */ /* [Grok-Bot] V3.34 Theme */ /* [Grok-Bot] V3.33 neue Prayers */ /* V3.32 Mukunda neu */ /* [Grok.com] Platzhalter-Cache weg */ /* [Grok.com] Scroll-Fix durchreichen */ /* [Grok.com] alte Abend-MP3 nicht aus dem Cache; [Grok-Bot] V2.20 nach Syntax-Korrektur */, APP="bpp-app-"+VER, AUD="bpp-audio-v2";
var CORE=["./","index.html","follow.js","v218.js","manifest.json","icon-192.svg","icon-512.svg","icon-192.png","icon-512.png","icon-maskable-192.png","icon-maskable-512.png","apple-touch-icon.png","fonts/fonts-local.css","lib/mqtt.min.js","v204.js?v=205","version.json","start.jpg"]; /* [Grok.com] */
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
    return caches.open(AUD).then(function(c){ return c.keys().then(function(keys){
      return Promise.all(keys.filter(function(q){ return /guru-stotram-abend\.mp3/.test(q.url); }).map(function(q){ return c.delete(q); }));
    }); }); /* [Grok-Bot] V2.20: eine Klammer zu viel entfernt (Skriptfehler, Service Worker liess sich nicht installieren) */
  }).then(function(){ return self.clients.claim(); }));
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
    /* [Grok.com] alte Abend-Datei mit Om nie aus dem Cache */
    if(/guru-stotram-abend\.mp3$/i.test(u.pathname)){
      e.respondWith(fetch(r, {cache:"no-store"}).catch(function(){ return caches.open(AUD).then(function(c){ return c.match(audioKey(u)); }).then(function(hit){ return hit?ranged(r, hit):Response.error(); }); }));
      return;
    }
    e.respondWith(caches.open(AUD).then(function(c){ return c.match(audioKey(u)); }).then(function(hit){
      if(hit) return ranged(r, hit);
      return fetch(r);
    }));
    return;
  }
  var nav=(r.mode==="navigate");
  var noStore=/\/version\.json$/.test(u.pathname) || u.searchParams.has("t");
  var req=nav?new Request(r, {cache:"no-store"}):r; /* [Grok.com] Startseite nie aus altem Cache */
  e.respondWith(fetch(req).then(function(res){
    if(res && res.ok && res.type==="basic"){
      var c=res.clone(), c2=res.clone(); /* [Grok-Bot] V3.41: zweite Kopie zum Speichern (die erste ist nach text() verbraucht -> put schlug bisher still fehl) */
      c.text().then(function(txt){
        if(txt && txt.indexOf("PLACEHOLDER")===0) return; /* [Grok.com] Platzhalter nicht speichern */
        caches.open(APP).then(function(ca){ ca.put(noStore?u.pathname:(nav?"./":r), c2); });
      }).catch(function(){});
    }
    return res;
  }).catch(function(){
    return caches.open(APP).then(function(ca){
      if(nav) return ca.match("./").then(function(m){ return m || ca.match("index.html"); });
      if(noStore) return ca.match(u.pathname).then(function(m){ return m || ca.match("version.json"); });
      return ca.match(r).then(function(m){ return m || ca.match(r, {ignoreSearch:true}); });
    }).then(function(m){ return m || Response.error(); });
  }));
});
self.addEventListener("message", function(e){ if(e.data==="bpp-ver" && e.source) e.source.postMessage({bppSw:VER}); });
