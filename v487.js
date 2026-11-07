/* [Grok-Bot] V4.87: Offline-Anzeige eine Quelle. Ursache: v203-Zaehler (4/38) und
   v481/v483-Toast („vollständig“) / Busy-Knopf liefen getrennt – Meldung konnte
   „fertig“ sagen, waehrend Zaehler und Knopf etwas anderes zeigten.
   final-prayers-sunday.mp3 zaehlt nicht (v391 entfernt sie absichtlich; Pflicht ist sunday2).
   Jetzt: audit() zaehlt nur same-origin-MP3 (origin+pathname, ignoreSearch),
   Status #bppOff, Toast und btnOffAll kommen aus demselben Ergebnis.
   Fertig = n>=N → N/N, Toast ok, Knopf aus (kein „Download laeuft“). critical=false. */
window.BPP_BUILD="4.87"; window.BPP_SHOW="4.87";
(function(){
  if(window.bppV487) return; window.bppV487=1;
  var AUD="bpp-audio-v2";
  var ALL_MP3=["audio/arati-cd13.mp3","audio/ashtotram-prabhus.mp3","audio/ashtotram.mp3","audio/bhajare.mp3","audio/bhu-suktam-spn-live.mp3","audio/bhu-suktam.mp3","audio/closing-morning.mp3","audio/durga-chalisa.mp3","audio/final-prayers-sunday2.mp3","audio/ganesha-mantra.mp3","audio/gayatri.mp3","audio/giridhari-arati.mp3","audio/govinda-prabhus2.mp3","audio/govinda-spn-live.mp3","audio/govinda.mp3","audio/guru-stotram-abend.mp3","audio/guru-stotram-abend2.mp3","audio/guru-stotram-abend3.mp3","audio/guru-stotram-prabhus.mp3","audio/guru-stotram-prabhus2.mp3","audio/guru-stotram.mp3","audio/guruji-gayatri.mp3","audio/hanuman-kanaka.mp3","audio/hanuman-prabhus.mp3","audio/hanuman.mp3","audio/kavacham-b.mp3","audio/kavacham.mp3","audio/lakshmi-arati-spn-live.mp3","audio/lakshmi-arati.mp3","audio/mukunda.mp3","audio/narasimha-abend.mp3","audio/narasimha-prabhus.mp3","audio/narasimha-prabhus2.mp3","audio/narasimha-spn-live.mp3","audio/narasimha.mp3","audio/narayana-suktam.mp3","audio/nila-suktam-spn-live.mp3","audio/nila-suktam.mp3","audio/panduranga-arati.mp3","audio/purusa-suktam.mp3","audio/ramanuja-prabhus.mp3","audio/ramanuja.mp3","audio/saprem.mp3","audio/sri-suktam-spn-live.mp3","audio/sri-suktam.mp3","audio/suprabhatam-prabhus.mp3","audio/suprabhatam-ra.mp3","audio/suprabhatam-spn-live.mp3","audio/suprabhatam.mp3","audio/vaishnava-mantra-mtj.mp3","audio/vaishnava-mantra.mp3","audio/vishnu-arati-spn-live.mp3","audio/vishnu-sahasranama.mp3","audio/vishwananda-chalisa.mp3"];
  var MSG={
    de:{ok:"Prayers vollständig offline verfügbar.",run:"Download läuft …",off:"Offline – Download nicht möglich",space:"Zu wenig Speicher auf dem Gerät",err:"%k/%N offline · Fehler: %e",stat:"Offline gespeichert: %k/%N",statOff:"Offline-Modus · gespeichert %k/%N",done:"Offline gespeichert: %N/%N ✓",lab:"Prayers runterladen"},
    en:{ok:"Prayers fully available offline.",run:"Downloading …",off:"Offline – download not possible",space:"Not enough storage",err:"%k/%N offline · errors: %e",stat:"Saved offline: %k/%N",statOff:"Offline mode · saved %k/%N",done:"Saved offline: %N/%N ✓",lab:"Download prayers"},
    fr:{ok:"Prières entièrement disponibles hors ligne.",run:"Téléchargement …",off:"Hors ligne – téléchargement impossible",space:"Espace insuffisant",err:"%k/%N hors ligne · erreurs : %e",stat:"Hors ligne : %k/%N",statOff:"Hors ligne · enregistré %k/%N",done:"Hors ligne : %N/%N ✓",lab:"Télécharger les prières"},
    es:{ok:"Oraciones completamente disponibles sin conexión.",run:"Descargando …",off:"Sin conexión – no se puede descargar",space:"Sin espacio",err:"%k/%N sin conexión · errores: %e",stat:"Sin conexión: %k/%N",statOff:"Sin conexión · guardado %k/%N",done:"Sin conexión: %N/%N ✓",lab:"Descargar oraciones"},
    ru:{ok:"Молитвы полностью доступны офлайн.",run:"Загрузка …",off:"Нет сети – загрузка невозможна",space:"Недостаточно памяти",err:"%k/%N офлайн · ошибки: %e",stat:"Офлайн: %k/%N",statOff:"Офлайн · сохранено %k/%N",done:"Офлайн: %N/%N ✓",lab:"Скачать молитвы"},
    hi:{ok:"प्रार्थनाएँ पूरी तरह ऑफ़लाइन उपलब्ध।",run:"डाउनलोड हो रहा है …",off:"ऑफ़लाइन – डाउनलोड संभव नहीं",space:"जगह कम है",err:"%k/%N ऑफ़लाइन · त्रुटि: %e",stat:"ऑफ़लाइन: %k/%N",statOff:"ऑफ़लाइन · सहेजा %k/%N",done:"ऑफ़लाइन: %N/%N ✓",lab:"प्रार्थनाएँ डाउनलोड करें"},
    pt:{ok:"Orações totalmente disponíveis offline.",run:"Baixando …",off:"Offline – não é possível baixar",space:"Espaço insuficiente",err:"%k/%N offline · erros: %e",stat:"Offline: %k/%N",statOff:"Offline · salvo %k/%N",done:"Offline: %N/%N ✓",lab:"Baixar orações"},
    cz:{ok:"Modlitby plně dostupné offline.",run:"Stahování …",off:"Offline – stažení není možné",space:"Nedostatek místa",err:"%k/%N offline · chyby: %e",stat:"Offline: %k/%N",statOff:"Offline · uloženo %k/%N",done:"Offline: %N/%N ✓",lab:"Stáhnout modlitby"}
  };
  function L(){ var l=(typeof lang!=="undefined"&&MSG[lang])?lang:"en"; return MSG[l]; }
  function fmt(s,k,N){ return String(s).replace(/%k/g,String(k)).replace(/%N/g,String(N)).replace(/%n/g,String(N)).replace(/%e/g,""); }
  function audioKey(p){
    try{
      var u=new URL(p, location.href);
      if(u.origin!==location.origin) return null;
      if(!/\/audio\/[^\/]+\.mp3$/i.test(u.pathname)) return null;
      return u.origin+u.pathname;
    }catch(e){ return null; }
  }
  function listMp3(){
    var seen={}, out=[];
    function add(p){ var k=audioKey(p); if(k&&!seen[k]){ seen[k]=1; out.push(k); } }
    ALL_MP3.forEach(add);
    try{ (PRAYERS||[]).forEach(function(P){ if(!P) return; add(P.audio); (P.audioAlt||[]).forEach(add); }); }catch(e){}
    return out;
  }

  var busy=false, lastAudit={have:0,total:0,complete:false,missing:[],haveKeys:[]};

  function toast(s){
    var m=document.getElementById("bppDlMsg");
    if(!m){ m=document.createElement("div"); m.id="bppDlMsg";
      m.style.cssText="position:fixed;right:10px;bottom:34px;z-index:60;max-width:80vw;background:#2a1f16;color:#e0b45a;border:1px solid #e0b45a;border-radius:10px;padding:8px 12px;font:14px/1.35 system-ui,sans-serif;box-shadow:0 4px 18px #0008";
      document.body.appendChild(m); }
    m.textContent=s; m.style.display=""; clearTimeout(toast._t); toast._t=setTimeout(function(){ m.style.display="none"; },7000);
  }

  function ensureOff(){
    var el=document.getElementById("bppOff");
    if(!el){
      el=document.createElement("div"); el.id="bppOff";
      el.style.cssText="position:static;display:inline-block;margin:0;font:11px/1.3 system-ui,sans-serif;color:#cbb89a;background:rgba(26,20,16,.85);border:1px solid #3d2f26;border-radius:8px;padding:2px 7px;pointer-events:none;opacity:.95";
      var bar=document.getElementById("bppOffBar466");
      if(bar) bar.insertBefore(el, bar.firstChild); else (document.body||document.documentElement).appendChild(el);
    }
    el.setAttribute("data-bpp487","1");
    return el;
  }

  function paintBtn(a){
    var b=document.getElementById("btnOffAll"); if(!b) return;
    if(busy){ b.classList.add("busy"); return; }
    b.classList.remove("busy");
    if(a.complete){
      b.classList.remove("busy");
      b.textContent="";
      b.setAttribute("aria-hidden","true");
      b.style.setProperty("display","none","important");
    }else{
      b.style.removeProperty("display");
      b.removeAttribute("aria-hidden");
      b.textContent=L().lab;
    }
  }

  function paintStatus(a){
    lastAudit=a;
    var el=ensureOff();
    var M=L();
    if(a.complete) el.textContent=fmt(M.done, a.have, a.total);
    else if(!navigator.onLine) el.textContent=fmt(M.statOff, a.have, a.total);
    else el.textContent=fmt(M.stat, a.have, a.total);
    el.style.display="";
    paintBtn(a);
    var S=window.bppOfflineState||(window.bppOfflineState={});
    S.n=a.have; S.total=a.total; S.complete=a.complete; S.done=!busy; S.missing=a.missing.slice();
    S.msg=el.textContent; S.owner="v487";
    try{ window.__bppAudHave=window.__bppAudHave||{}; a.haveKeys.forEach(function(k){ window.__bppAudHave[k]=1; }); }catch(e){}
  }

  function audit(){
    if(!("caches" in window)){
      var empty={have:0,total:0,complete:false,missing:[],haveKeys:[]};
      return Promise.resolve(empty);
    }
    var keys=listMp3();
    return caches.open(AUD).then(function(c){
      /* Query-Keys migrieren */
      return c.keys().then(function(ks){
        var chain=Promise.resolve();
        ks.forEach(function(req){
          chain=chain.then(function(){
            var u; try{ u=new URL(req.url); }catch(e){ return; }
            if(!/\/audio\/[^\/]+\.mp3$/i.test(u.pathname) || !u.search) return;
            var clean=u.origin+u.pathname;
            return c.match(req).then(function(res){
              if(!res) return;
              return c.match(clean).then(function(ex){
                var p=ex?Promise.resolve():c.put(clean, res.clone());
                return p.then(function(){ return c.delete(req); });
              });
            });
          });
        });
        return chain.then(function(){
          var have=0, missing=[], haveKeys=[];
          function one(i){
            if(i>=keys.length) return Promise.resolve({have:have,total:keys.length,complete:have>=keys.length&&keys.length>0,missing:missing,haveKeys:haveKeys});
            var k=keys[i];
            return c.match(k, {ignoreSearch:true}).then(function(h){
              if(!h){ missing.push(k); return one(i+1); }
              /* V4.88: keine MP3-Bodies im Status-Poll lesen (54 Dateien ~160 MB).
                 Downloads speichern eine verifizierte Content-Length; Alt-Eintraege ohne
                 Laenge werden nur beim naechsten expliziten Download erneuert. */
              var n=+(h.headers.get("Content-Length")||0);
              if(h.status===200 && n>4096){ have++; haveKeys.push(k); }
              else missing.push(k);
              return one(i+1);
            });
          }
          return one(0);
        });
      });
    }).catch(function(){ return {have:0,total:keys.length,complete:false,missing:keys.slice(),haveKeys:[]}; });
  }

  function refresh(){ return audit().then(paintStatus); }

  function putOne(c, url){
    var fetchUrl=url+(url.indexOf("?")>=0?"&":"?")+"bppdl=1";
    return fetch(fetchUrl, {cache:"no-store", credentials:"same-origin"}).then(function(r){
      if(!r.ok) throw new Error("http "+r.status);
      return r.blob().then(function(b){
        var h=new Headers();
        h.set("Content-Type", r.headers.get("Content-Type")||"audio/mpeg");
        h.set("Content-Length", String(b.size));
        h.set("Accept-Ranges", "bytes");
        return c.put(url, new Response(b, {status:200, headers:h}));
      });
    });
  }

  function estimate(cnt){
    try{ if(navigator.storage&&navigator.storage.persist) navigator.storage.persist(); }catch(e){}
    if(!(navigator.storage&&navigator.storage.estimate) || cnt===0) return Promise.resolve(true);
    return navigator.storage.estimate().then(function(q){
      var free=(q.quota||0)-(q.usage||0);
      return !q.quota || free>cnt*6*1024*1024;
    }).catch(function(){ return true; });
  }

  function runDownload(){
    var M=L();
    if(!navigator.onLine){ toast(M.off); return Promise.resolve(lastAudit); }
    if(!("caches" in window)||!navigator.serviceWorker){ toast(M.off); return Promise.resolve(lastAudit); }
    if(busy) return Promise.resolve(lastAudit);
    busy=true;
    var b=document.getElementById("btnOffAll");
    if(b){ b.classList.add("busy"); b.style.display=""; b.textContent=M.run; }
    var S=window.bppOfflineState||(window.bppOfflineState={});
    S.done=false; S.cur=""; S.err=0; S.errFiles=[]; S.owner="v487";
    return audit().then(function(a){
      paintStatus(a);
      if(a.complete){
        busy=false; paintStatus(a); toast(M.ok); return a;
      }
      return estimate(a.missing.length).then(function(okSpace){
        if(!okSpace){ busy=false; paintBtn(a); toast(M.space); S.done=true; return a; }
        return caches.open(AUD).then(function(c){
          var errFiles=[], have=a.have, total=a.total;
          var chain=Promise.resolve();
          a.missing.forEach(function(u){
            chain=chain.then(function(){
              if(!navigator.onLine) return;
              S.cur=u.replace(/^.*\//,"").replace(/\.mp3$/i,"");
              if(b) b.textContent=have+"/"+total;
              return putOne(c, u).then(function(){ have++; S.n=have; if(b) b.textContent=have+"/"+total; }).catch(function(){
                S.err=(S.err||0)+1; errFiles.push(S.cur); S.errFiles=errFiles;
              });
            });
          });
          return chain.then(function(){
            S.cur=""; S.done=true; busy=false;
            return audit().then(function(a2){
              paintStatus(a2);
              if(errFiles.length) toast(fmt(M.err, a2.have, a2.total).replace("%e", errFiles.join(", ")));
              else if(a2.complete) toast(M.ok);
              else toast(fmt(M.err, a2.have, a2.total).replace("%e","?"));
              return a2;
            });
          });
        });
      });
    }).catch(function(){ busy=false; S.done=true; refresh(); toast(M.off); });
  }

  function go(e){
    if(e){ e.preventDefault(); e.stopImmediatePropagation(); }
    runDownload();
  }

  function bind(){
    var b=document.getElementById("btnOffAll"); if(!b) return;
    if(b._bpp487) return;
    try{
      var n=b.cloneNode(true); n._bpp487=1; b.parentNode.replaceChild(n,b); b=n;
    }catch(e){ b._bpp487=1; }
    b.addEventListener("click", go, true);
  }

  /* v203-Anzeige entwaffnen: show/quick schreiben nicht mehr gegen uns */
  function muteV203(){
    try{
      if(window.bppOfflineQuick && !window.bppOfflineQuick._bpp487){
        window.bppOfflineQuick=function(){ refresh(); }; window.bppOfflineQuick._bpp487=1;
      }
    }catch(e){}
  }

  window.bppOfflineRun=function(){ runDownload(); };
  window.bppOfflineEnsure481=runDownload;
  window.bppOfflineEnsure483=runDownload;
  window.bppOfflineEnsure487=runDownload;
  window.bppDlGo481=go; window.bppDlGo483=go; window.bppDlGo487=go;
  window.bppAudit487=audit;
  window.bppOfflineRefresh487=refresh;

  bind(); muteV203(); refresh();
  setInterval(function(){ bind(); muteV203(); if(!busy) paintStatus(lastAudit); }, 800);
  /* V4.88: Cache-Audit nur Start/Download/Netzwechsel/Fokus, nicht jede 800 ms. */
  window.addEventListener("focus", function(){ if(!busy) refresh(); });
  window.addEventListener("online", function(){ if(!busy) refresh(); });
  window.addEventListener("offline", function(){ if(!busy) refresh(); });
  window.addEventListener("bpp-lang", function(){ if(!busy) refresh(); });
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ bind(); refresh(); });
})();
