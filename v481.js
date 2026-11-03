/* [Grok-Bot] V4.81: Footer „Prayers runterladen“ – pro Prayer MP3 + Lyrics (App-Skripte) + Sync
   im Cache prüfen, nur Fehlendes laden. Wenn alles da (frisch oder schon vorhanden):
   „Prayers vollständig offline verfügbar.“ in allen UI-Sprachen. critical=false.
   Eine Owner-Stelle; ersetzt den Download-Klick (Capture), ruft v203-Logik nicht blind
   nochmals auf. Audio-Cache bpp-audio-v2 (wie v203); SW liest ab V4.81 ebenfalls v2. */
window.BPP_BUILD="4.81"; window.BPP_SHOW="4.81";
(function(){
  if(window.bppV481) return; window.bppV481=1;
  var AUD="bpp-audio-v2";
  var SYNC_FILES=["sync/hanuman-mtj.json","sync/nrsimha-mtj.json","sync/vaishnava-mtj.json"];
  var SYNC_BY_ID={
    "hanuman":"sync/hanuman-mtj.json",
    "kavacham":"sync/nrsimha-mtj.json",
    "vaishnava-mantra":"sync/vaishnava-mtj.json"
  };
  /* Alle Repo-MP3 (inkl. Rec-Varianten), damit nicht nur die gerade gewählte Aufnahme landet */
  var ALL_MP3=["audio/arati-cd13.mp3","audio/ashtotram-prabhus.mp3","audio/ashtotram.mp3","audio/bhajare.mp3","audio/bhu-suktam-spn-live.mp3","audio/bhu-suktam.mp3","audio/closing-morning.mp3","audio/durga-chalisa.mp3","audio/final-prayers-sunday.mp3","audio/final-prayers-sunday2.mp3","audio/ganesha-mantra.mp3","audio/gayatri.mp3","audio/giridhari-arati.mp3","audio/govinda-prabhus2.mp3","audio/govinda-spn-live.mp3","audio/govinda.mp3","audio/guru-stotram-abend.mp3","audio/guru-stotram-abend2.mp3","audio/guru-stotram-abend3.mp3","audio/guru-stotram-prabhus.mp3","audio/guru-stotram-prabhus2.mp3","audio/guru-stotram.mp3","audio/guruji-gayatri.mp3","audio/hanuman-kanaka.mp3","audio/hanuman-prabhus.mp3","audio/hanuman.mp3","audio/kavacham-b.mp3","audio/kavacham.mp3","audio/lakshmi-arati-spn-live.mp3","audio/lakshmi-arati.mp3","audio/mukunda.mp3","audio/narasimha-abend.mp3","audio/narasimha-prabhus.mp3","audio/narasimha-prabhus2.mp3","audio/narasimha-spn-live.mp3","audio/narasimha.mp3","audio/narayana-suktam.mp3","audio/nila-suktam-spn-live.mp3","audio/nila-suktam.mp3","audio/panduranga-arati.mp3","audio/purusa-suktam.mp3","audio/ramanuja-prabhus.mp3","audio/ramanuja.mp3","audio/saprem.mp3","audio/sri-suktam-spn-live.mp3","audio/sri-suktam.mp3","audio/suprabhatam-prabhus.mp3","audio/suprabhatam-ra.mp3","audio/suprabhatam-spn-live.mp3","audio/suprabhatam.mp3","audio/vaishnava-mantra-mtj.mp3","audio/vaishnava-mantra.mp3","audio/vishnu-arati-spn-live.mp3","audio/vishnu-sahasranama.mp3","audio/vishwananda-chalisa.mp3"];
  var MSG={
    de:{ok:"Prayers vollständig offline verfügbar.",run:"Download läuft …",off:"Offline – Download nicht möglich",space:"Zu wenig Speicher auf dem Gerät",err:"%k/%n offline · Fehler: %e"},
    en:{ok:"Prayers fully available offline.",run:"Downloading …",off:"Offline – download not possible",space:"Not enough storage on this device",err:"%k/%n offline · errors: %e"},
    fr:{ok:"Prières entièrement disponibles hors ligne.",run:"Téléchargement …",off:"Hors ligne – téléchargement impossible",space:"Espace de stockage insuffisant",err:"%k/%n hors ligne · erreurs : %e"},
    es:{ok:"Oraciones completamente disponibles sin conexión.",run:"Descargando …",off:"Sin conexión – no se puede descargar",space:"No hay espacio suficiente",err:"%k/%n sin conexión · errores: %e"},
    ru:{ok:"Молитвы полностью доступны офлайн.",run:"Загрузка …",off:"Нет сети – загрузка невозможна",space:"Недостаточно памяти",err:"%k/%n офлайн · ошибки: %e"},
    hi:{ok:"प्रार्थनाएँ पूरी तरह ऑफ़लाइन उपलब्ध।",run:"डाउनलोड हो रहा है …",off:"ऑफ़लाइन – डाउनलोड संभव नहीं",space:"डिवाइस में जगह कम है",err:"%k/%n ऑफ़लाइन · त्रुटि: %e"},
    pt:{ok:"Orações totalmente disponíveis offline.",run:"Baixando …",off:"Offline – não é possível baixar",space:"Espaço insuficiente neste aparelho",err:"%k/%n offline · erros: %e"},
    cz:{ok:"Modlitby plně dostupné offline.",run:"Stahování …",off:"Offline – stažení není možné",space:"Nedostatek místa v zařízení",err:"%k/%n offline · chyby: %e"}
  };
  function L(){ var l=(typeof lang!=="undefined"&&MSG[lang])?lang:"en"; return MSG[l]; }
  function abs(p){ try{ return new URL(p, location.href); }catch(e){ return null; } }
  function keyOf(u){ return (u.origin+u.pathname).replace(/\/$/,"/") ; }
  function sameOriginAudio(p){
    var u=abs(p); if(!u) return null;
    if(u.origin!==location.origin) return null;
    if(!/\/audio\/[^\/]+\.mp3$/i.test(u.pathname)) return null;
    return u.origin+u.pathname;
  }
  function sameOriginApp(p){
    var u=abs(p); if(!u) return null;
    if(u.origin!==location.origin) return null;
    if(/\/audio\//i.test(u.pathname)) return null;
    return u.href.replace(/#.*$/,"");
  }
  function msg(s){
    var m=document.getElementById("bppDlMsg");
    if(!m){ m=document.createElement("div"); m.id="bppDlMsg";
      m.style.cssText="position:fixed;right:10px;bottom:34px;z-index:60;max-width:80vw;background:#2a1f16;color:#e0b45a;border:1px solid #e0b45a;border-radius:10px;padding:8px 12px;font:14px/1.35 system-ui,sans-serif;box-shadow:0 4px 18px #0008";
      document.body.appendChild(m); }
    m.textContent=s; m.style.display=""; clearTimeout(msg._t); msg._t=setTimeout(function(){ m.style.display="none"; },7000);
  }
  function appName(){
    return caches.keys().then(function(ks){
      var hit=ks.filter(function(k){ return /^bpp-app-/.test(k); }).sort();
      return hit.length?hit[hit.length-1]:("bpp-app-"+(window.BPP_VERSION||"4.81").replace(/\./g,""));
    });
  }
  function collect(){
    var mp3={}, sync={}, app={}, prayers=[];
    ALL_MP3.forEach(function(p){ var k=sameOriginAudio(p); if(k) mp3[k]=1; });
    try{
      (PRAYERS||[]).forEach(function(P){
        if(!P||!P.id) return;
        var row={id:P.id, mp3:[], sync:[], lyrics:!!(P.zeilen&&P.zeilen.length)};
        function addA(p){ var k=sameOriginAudio(p); if(k){ mp3[k]=1; row.mp3.push(k); } }
        addA(P.audio);
        (P.audioAlt||[]).forEach(addA);
        var sf=SYNC_BY_ID[P.id];
        if(sf){ var sk=sameOriginApp(sf); if(sk){ sync[sk]=1; row.sync.push(sk); } }
        prayers.push(row);
      });
    }catch(e){}
    SYNC_FILES.forEach(function(p){ var k=sameOriginApp(p); if(k) sync[k]=1; });
    try{
      app[location.href.split("#")[0]]=1;
      document.querySelectorAll("script[src],link[href],img[src]").forEach(function(el){
        var p=el.getAttribute("src")||el.getAttribute("href"); var k=sameOriginApp(p); if(k) app[k]=1;
      });
      ["version.json","manifest.json","./","index.html"].forEach(function(p){ var k=sameOriginApp(p); if(k) app[k]=1; });
    }catch(e){}
    return {
      mp3:Object.keys(mp3),
      sync:Object.keys(sync),
      app:Object.keys(app),
      prayers:prayers
    };
  }
  function matchIn(c, url){
    return c.match(url).then(function(h){ return !!h; }).catch(function(){ return false; });
  }
  function putFetch(c, url, asAudio){
    var fetchUrl=url+(url.indexOf("?")>=0?"&":"?")+"bppdl=1";
    return fetch(asAudio?fetchUrl:url, {cache:"no-store", credentials:"same-origin"}).then(function(r){
      if(!r.ok) throw new Error("http "+r.status);
      if(!asAudio) return c.put(url, r.clone()).then(function(){ return true; });
      return r.blob().then(function(b){
        var h=new Headers();
        h.set("Content-Type", r.headers.get("Content-Type")||"audio/mpeg");
        h.set("Content-Length", String(b.size));
        h.set("X-BPP-Sig", String(b.size));
        h.set("X-BPP-Time", new Date().toISOString());
        return c.put(url, new Response(b, {status:200, headers:h})).then(function(){ return true; });
      });
    });
  }
  function estimate(cnt){
    try{ if(navigator.storage&&navigator.storage.persist) navigator.storage.persist(); }catch(e){}
    if(!(navigator.storage&&navigator.storage.estimate)) return Promise.resolve(true);
    return navigator.storage.estimate().then(function(q){
      var free=(q.quota||0)-(q.usage||0), want=cnt*6*1024*1024;
      var S=window.bppOfflineState||(window.bppOfflineState={});
      S.free=free; return !q.quota || free>want || cnt===0;
    }).catch(function(){ return true; });
  }

  var busy=false;
  function finishBtn(b){
    busy=false;
    if(b){ b.classList.remove("busy"); b.textContent=""; }
    try{ window.dispatchEvent(new Event("bpp-lang")); }catch(e){}
  }

  function run(opts){
    opts=opts||{};
    var S=window.bppOfflineState||(window.bppOfflineState={});
    S.done=false; S.cur=""; S.errFiles=[]; S.err=0; S.quick=false; delete S.free;
    if(!("caches" in window)){ S.done=true; return Promise.resolve({ok:false, reason:"no-cache"}); }
    var assets=collect();
    var mp3=assets.mp3, sync=assets.sync, app=assets.app;
    var allApp=sync.concat(app);
    var total=mp3.length+allApp.length;
    S.total=total; S.n=0;
    var needMp3=[], needApp=[], have=0, errFiles=[];

    return Promise.all([caches.open(AUD), appName().then(function(n){ return caches.open(n); })]).then(function(cs){
      var cAud=cs[0], cApp=cs[1];
      function checkMp3(i){
        if(i>=mp3.length) return Promise.resolve();
        return matchIn(cAud, mp3[i]).then(function(ok){
          if(ok) have++; else needMp3.push(mp3[i]);
          return checkMp3(i+1);
        });
      }
      function checkApp(i){
        if(i>=allApp.length) return Promise.resolve();
        var u=allApp[i];
        return matchIn(cApp, u).then(function(ok){
          if(ok) have++; else needApp.push(u);
          return checkApp(i+1);
        });
      }
      return checkMp3(0).then(function(){ return checkApp(0); }).then(function(){
        S.n=have;
        var need=needMp3.length+needApp.length;
        if(!need){
          S.n=total; S.done=true; S.cur=""; S.complete=true;
          return {ok:true, skipped:true, total:total, have:have, prayers:assets.prayers};
        }
        if(!navigator.onLine && !opts.allowOfflineCheck){
          S.done=true; return {ok:false, reason:"offline", need:need, have:have, total:total};
        }
        return estimate(needMp3.length).then(function(okSpace){
          if(!okSpace){ S.done=true; return {ok:false, reason:"space", need:need, have:have, total:total}; }
          var chain=Promise.resolve();
          needMp3.forEach(function(u){
            chain=chain.then(function(){
              if(!navigator.onLine) return;
              S.cur=u.replace(/^.*\//,"").replace(/\.mp3$/i,"");
              return putFetch(cAud, u, true).then(function(){ have++; S.n=have; }).catch(function(){
                S.err=(S.err||0)+1; errFiles.push(S.cur); S.errFiles=errFiles;
              });
            });
          });
          needApp.forEach(function(u){
            chain=chain.then(function(){
              if(!navigator.onLine) return;
              S.cur=u.replace(/^.*\//,"").slice(0,24);
              return putFetch(cApp, u, false).then(function(){ have++; S.n=have; }).catch(function(){
                S.err=(S.err||0)+1; errFiles.push(S.cur||"app"); S.errFiles=errFiles;
              });
            });
          });
          return chain.then(function(){
            S.cur=""; S.n=have; S.done=true; S.complete=(have>=total && !errFiles.length);
            return {ok:S.complete, total:total, have:have, errFiles:errFiles.slice(), prayers:assets.prayers};
          });
        });
      });
    }).catch(function(e){
      S.done=true; return {ok:false, reason:String(e)};
    });
  }

  function go(e){
    if(e){ e.preventDefault(); e.stopImmediatePropagation(); }
    var b=document.getElementById("btnOffAll"); if(busy||!b) return;
    if(!navigator.onLine){ msg(L().off); return; }
    if(!("caches" in window)||!navigator.serviceWorker){ msg(L().off); return; }
    busy=true; b.classList.add("busy"); b.textContent=L().run;
    var t0=Date.now();
    var iv=setInterval(function(){
      var S=window.bppOfflineState||{};
      if(S.cur) b.textContent=(S.n||0)+"/"+(S.total||"?");
    },300);
    run().then(function(r){
      clearInterval(iv);
      finishBtn(b);
      var M=L();
      if(!r){ msg(M.off); return; }
      if(r.reason==="offline"){ msg(M.off); return; }
      if(r.reason==="space"){ msg(M.space); return; }
      if(r.errFiles&&r.errFiles.length){
        msg(M.err.replace("%k",r.have||0).replace("%n",r.total||0).replace("%e",r.errFiles.join(", ")));
        return;
      }
      if(r.ok || (r.have!=null && r.total!=null && r.have>=r.total)) msg(M.ok);
      else msg(M.err.replace("%k",r.have||0).replace("%n",r.total||0).replace("%e","?"));
    }).catch(function(){ clearInterval(iv); finishBtn(b); msg(L().off); });
    /* Safety timeout */
    setTimeout(function(){ if(busy && Date.now()-t0>15*60000){ busy=false; finishBtn(b); } }, 15*60000+100);
  }

  function bind(){
    var b=document.getElementById("btnOffAll"); if(!b) return;
    if(b._bpp481) return;
    /* Clone entfernt alte Capture-Listener (v311/v466), damit nur V4.81 den Download steuert */
    try{
      var n=b.cloneNode(true); n._bpp481=1; b.parentNode.replaceChild(n,b); b=n;
    }catch(e){ b._bpp481=1; }
    b.addEventListener("click", go, true);
  }
  setInterval(bind, 400);
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", bind); else bind();

  /* bppOfflineRun auf V4.81 umbiegen (falls anderer Code ihn ruft) */
  window.bppOfflineRun=function(){ run(); };
  window.bppOfflineEnsure481=run;
  window.bppDlGo481=go;
  window.bppMsg481=function(){ return L().ok; };
  window.bppCollect481=collect;
})();
