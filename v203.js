/* [Grok-Bot] V2.03: Offline. Der Service Worker (sw.js?v=203) speichert die App-Dateien; v203.js laedt im Hintergrund alle MP3 aus audio/
   in den Cache (dezente Anzeige "Offline: 12/20" unten rechts), prueft vorher den Speicher (navigator.storage.estimate) und bittet um
   dauerhaften Speicher (persist). Geaenderte MP3 (anderes ETag/Groesse) werden neu geladen. Auf mobilen Daten / Datensparen wird nicht
   geladen (Anzeige "wartet auf WLAN"). Ohne Netz: Prayers mit MP3 spielen die MP3, YouTube geht nur online. */
/* V2.05: Laden auch ueber mobile Daten (keine WLAN-Sperre mehr), Anzeige "Offline gespeichert: n/20 - laedt ...", Fehlerzahl). */
/* V2.07: Ladefehler mit Datei-Kurznamen ("Fehler: govinda, kavacham-b"), Liste in bppOfflineState.errFiles. */
/* V2.08: Neustart laedt nur fehlende/geaenderte MP3 (Groessenvergleich per HEAD statt ETag), Stand sofort aus dem Cache. */
window.BPP_BUILD="2.03";
window.BPP_SW="sw.js?v=203";
(function(){
  if(window.bppV203) return; window.bppV203=1;
  var AUD="bpp-audio-v1";
  var FILES=["arati-cd13","ashtotram","bhajare","closing-morning","ganesha-mantra","gayatri","giridhari-arati","govinda","guru-stotram-abend3" /* [Grok.com] ohne Om, ersetzt guru-stotram-abend; [Grok-Bot] V2.20: abend3 wie order.js */,
    "guru-stotram","guruji-gayatri","hanuman","kavacham-b","kavacham","lakshmi-arati","mukunda","narasimha","ramanuja","suprabhatam","vaishnava-mantra"]
    .map(function(n){ return "audio/"+n+".mp3"; });
  var base=location.href.replace(/[?#].*$/,"").replace(/[^\/]*$/,"");
  function abs(p){ return new URL(p, base); }
  function list(){
    var seen={}, out=[];
    function add(p){ if(!p) return; var u; try{ u=abs(p); }catch(e){ return; }
      if(u.origin!==location.origin || !/\/audio\/[^\/]+\.mp3$/i.test(u.pathname)) return;
      var k=u.origin+u.pathname; if(!seen[k]){ seen[k]=1; out.push(k); } }
    FILES.forEach(add);
    try{ PRAYERS.forEach(function(P){ add(P.audio); (P.audioAlt||[]).forEach(add); }); }catch(e){}
    return out;
  }
  /* Anzeige */
  var el=null;
  function show(t, done){
    if(!document.body) return;
    if(!el){ el=document.createElement("div"); el.id="bppOff";
      el.style.cssText="position:fixed;right:6px;bottom:6px;z-index:30;font:11px/1.3 system-ui,sans-serif;color:#cbb89a;background:rgba(26,20,16,.85);border:1px solid #3d2f26;border-radius:8px;padding:2px 7px;pointer-events:none;opacity:.85";
      document.body.appendChild(el); }
    el.textContent=t; el.style.display="";
    if(done) setTimeout(function(){ if(el && el.textContent===t) el.style.display="none"; }, 6000);
  }
  window.bppOfflineState={n:0, total:0, done:false, msg:""};
  function cellular(){ var c=navigator.connection; return !!(c && (c.saveData || c.type==="cellular")); }
  function head(u){ return fetch(u+"?bppdl=1", {method:"HEAD", cache:"no-store"}).then(function(r){ return r.ok?r:null; }).catch(function(){ return null; }); }
  function sig(h){ return (h.get("ETag")||"")+"|"+(h.get("Content-Length")||""); }
  function run(){
    if(!("caches" in window) || !navigator.serviceWorker) return;
    if(!navigator.onLine){ quick(); return; }
    /* App-Dateien dieser Seite einmal ueber den Service Worker holen, damit sie im App-Cache liegen (erster Besuch lief ohne SW) */
    try{
      var R=[location.href].concat(performance.getEntriesByType("resource").map(function(x){ return x.name; }));
      R.forEach(function(x){ try{ var u=new URL(x); if(u.origin!==location.origin || /\/audio\//.test(u.pathname) || u.searchParams.has("t") || u.searchParams.has("bppdl")) return;
        fetch(u.href, {cache:"no-cache", mode:"same-origin", credentials:"same-origin"}).catch(function(){}); }catch(e){} });
    }catch(e){}
    var L=list(), S=window.bppOfflineState; S.total=L.length;
    caches.open(AUD).then(function(c){
      return c.keys().then(function(ks){
        var have={}; ks.forEach(function(q){ have[q.url.replace(/[?#].*$/,"")]=q; });
        /* Dateien, die nicht mehr in der Liste stehen, entfernen */
        ks.forEach(function(q){ var k=q.url.replace(/[?#].*$/,""); if(L.indexOf(k)<0) c.delete(q); });
        /* V2.08: nur fehlende oder auf dem Server geaenderte MP3 laden. Aenderung = andere Groesse (HEAD Content-Length gegen gespeicherte Groesse).
           Das ETag von GitHub Pages enthaelt die Deploy-Zeit und aendert sich bei jedem Push - deshalb nicht mehr verwenden (sonst 126 MB nach jedem Update). */
        var n=0, need=[], todo=L.filter(function(u){ if(!have[u]){ need.push(u); return false; } return true; }), q=todo.slice();
        function one(){ var u=q.shift(); if(!u) return Promise.resolve();
          return Promise.all([c.match(u), head(u)]).then(function(v){
            var a=v[0] && +(v[0].headers.get("Content-Length")||0), b=v[1] && +(v[1].headers.get("Content-Length")||0);
            if(!v[0]) need.push(u); else if(a && b && a!==b) need.push(u); else n++;
          }).then(one); }
        return Promise.all([one(), one(), one(), one()]).then(function(){
          S.n=n; if(!need.length){ S.done=true; if(!S.quick) show("Offline gespeichert: "+n+"/"+L.length+" \u2713", true); return; }
          return estimate(need.length).then(function(ok){
            if(!ok){ show("Offline gespeichert: "+n+"/"+L.length+" \u00b7 zu wenig Speicher"); return; }
            S.err=0; S.errFiles=[];
            /* V2.07: Fehler mit Datei-Kurznamen, z. B. "Fehler: govinda, kavacham-b" */
            var lab=function(end){ var t="Offline gespeichert: "+n+"/"+L.length, ef=S.errFiles||[];
              if(n>=L.length) return t+" \u2713";
              if(!end) t+=" \u00b7 l\u00e4dt \u2026";
              if(ef.length) t+=" \u00b7 Fehler: "+ef.join(", ")+(end?" (neuer Versuch beim n\u00e4chsten Start)":"");
              return t; };
            show(lab());
            return need.reduce(function(p, u){ return p.then(function(){
              if(!navigator.onLine) return;
              S.cur=u.replace(/^.*\//,"").replace(/\.mp3$/i,"");
              return fetch(u+"?bppdl=1", {cache:"no-store"}).then(function(r){
                if(!r.ok){ S.err=(S.err||0)+1; (S.errFiles=S.errFiles||[]).push(S.cur); show(lab()); return; }
                return r.blob().then(function(b){
                  var h=new Headers(); h.set("Content-Type", r.headers.get("Content-Type")||"audio/mpeg"); h.set("Content-Length", String(b.size));
                  h.set("X-BPP-Sig", String(b.size)); h.set("X-BPP-Time", new Date().toISOString());
                  return c.put(u, new Response(b, {status:200, headers:h}));
                }).then(function(){ n++; S.n=n; show(lab()); });
              }).catch(function(){ S.err=(S.err||0)+1; (S.errFiles=S.errFiles||[]).push(S.cur); show(lab()); });
            }); }, Promise.resolve()).then(function(){ S.cur=""; S.done=(n>=L.length); show(lab(true), S.done); });
          });
        });
      });
    }).catch(function(){});
  }
  function estimate(cnt){
    try{ if(navigator.storage && navigator.storage.persist) navigator.storage.persist().then(function(p){ window.bppOfflineState.persist=p; }); }catch(e){}
    if(!(navigator.storage && navigator.storage.estimate)) return Promise.resolve(true);
    return navigator.storage.estimate().then(function(q){
      var free=(q.quota||0)-(q.usage||0), want=cnt*8*1024*1024; /* ca. 6 MB je MP3 + Reserve */
      window.bppOfflineState.free=free; return !q.quota || free>want;
    }).catch(function(){ return true; });
  }
  /* V2.08: Stand sofort beim Start aus dem Cache anzeigen (z. B. gleich "20/20 \u2713"), Pruefung laeuft danach still im Hintergrund */
  function quick(){
    if(!("caches" in window)) return;
    var L=list(), S=window.bppOfflineState;
    caches.open(AUD).then(function(c){ return c.keys(); }).then(function(ks){
      if(S.cur) return;
      var have={}; ks.forEach(function(q){ have[q.url.replace(/[?#].*$/,"")]=1; });
      var n=L.filter(function(u){ return have[u]; }).length; S.total=L.length; S.n=n; S.quick=true;
      if(!navigator.onLine) show("Offline-Modus \u00b7 gespeichert "+n+"/"+L.length);
      else show("Offline gespeichert: "+n+"/"+L.length+(n>=L.length?" \u2713":""), n>=L.length);
    }).catch(function(){});
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", quick); else quick();
  window.bppOfflineQuick=quick;
  /* ohne Netz: MP3 statt YouTube */
  function offlinePrefs(){ if(navigator.onLine) return; try{ PRAYERS.forEach(function(P){ if(P.audio) P.preferFile=true; }); }catch(e){} }
  offlinePrefs();
  window.addEventListener("offline", function(){ offlinePrefs(); quick(); });
  /* [Grok.com] nicht mehr alles beim Start. Nur der laufende Gesang, alle auf den Knopf. */
  window.bppOfflineRun=run;
  function cacheOne(url){
    if(!url || !navigator.onLine || !("caches" in window)) return;
    var u; try{ u=abs(url); }catch(e){ return; }
    if(u.origin!==location.origin || !/\/audio\/[^/]+\.mp3$/i.test(u.pathname)) return;
    var key=u.origin+u.pathname;
    caches.open(AUD).then(function(c){ return c.match(key).then(function(hit){
      if(hit) return;
      return fetch(key+"?bppdl=1", {cache:"no-store"}).then(function(r){
        if(!r.ok) return;
        return r.blob().then(function(b){
          var h=new Headers(); h.set("Content-Type", r.headers.get("Content-Type")||"audio/mpeg"); h.set("Content-Length", String(b.size));
          return c.put(key, new Response(b, {status:200, headers:h}));
        });
      }).then(function(){ quick(); });
    }); }).catch(function(){});
  }
  window.bppCacheSong=cacheOne;
  var oldPlay=window.play;
  if(typeof oldPlay==="function" && !oldPlay._bppOff){
    var w=function(idx){ var r=oldPlay.apply(this, arguments); try{ var P=PRAYERS[idx]; if(P && P.audio) cacheOne(P.audio); }catch(e){} return r; };
    w._bppOff=1; window.play=w;
  }
  function btn(){
    if(document.getElementById("btnOffAll")) return;
    var b=document.createElement("button");
    b.id="btnOffAll"; b.type="button"; b.textContent="Alle offline";
    b.title="Alle Gesänge für offline laden";
    b.style.cssText="margin-left:8px;font:12px system-ui,sans-serif;color:#1a120c;background:#e6c07b;border:0;border-radius:8px;padding:4px 8px;cursor:pointer";
    b.onclick=function(){ run(); };
    var bar=document.querySelector(".bar .row")||document.querySelector(".bar");
    if(bar) bar.appendChild(b); else document.body.appendChild(b); /* [Grok.com] sichtbar in der Leiste */
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", btn); else btn();
  function showV(){ var s="V"+(window.BPP_SHOW||"2.03"), v=document.querySelector("h1 .ver"); if(v) v.textContent=s; document.title="Bhakti Prayers Player "+s; } /* V2.20: folgt BPP_SHOW */
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", showV); else showV();
  setTimeout(showV, 900); setTimeout(showV, 1500);
})();
