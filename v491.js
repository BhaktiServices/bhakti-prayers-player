/* [Grok-Bot] V4.91: Download-Knopf aktiv (Gold) während Lauf; unten links laufende
   Datei/Prayer + Fortschritt; Fertig-/Fehler-Meldung unten links.
   Ein Besitzer: Zähler/Knopf/Meldung aus audit() (bppAudit487). Kein zweiter
   Download-Lauf, kein Body-Polling, keine neuen Playback-Wrapper. critical=false. */
window.BPP_BUILD="4.91"; window.BPP_SHOW="4.91";
(function(){
  if(window.bppV491) return; window.bppV491=1;
  var AUD="bpp-audio-v2";
  var MSG={
    de:{ok:"Prayers vollständig offline verfügbar.",run:"Download läuft …",load:"Lade %k/%N: %t",off:"Offline – Download nicht möglich",space:"Zu wenig Speicher auf dem Gerät",err:"%k/%N offline · Fehler: %e",miss:"%k/%N offline · %m fehlen",stat:"Offline gespeichert: %k/%N",statOff:"Offline-Modus · gespeichert %k/%N",done:"Offline gespeichert: %N/%N ✓",lab:"Prayers runterladen"},
    en:{ok:"Prayers fully available offline.",run:"Downloading …",load:"Loading %k/%N: %t",off:"Offline – download not possible",space:"Not enough storage",err:"%k/%N offline · errors: %e",miss:"%k/%N offline · %m missing",stat:"Saved offline: %k/%N",statOff:"Offline mode · saved %k/%N",done:"Saved offline: %N/%N ✓",lab:"Download prayers"},
    fr:{ok:"Prières entièrement disponibles hors ligne.",run:"Téléchargement …",load:"Chargement %k/%N : %t",off:"Hors ligne – téléchargement impossible",space:"Espace insuffisant",err:"%k/%N hors ligne · erreurs : %e",miss:"%k/%N hors ligne · %m manquent",stat:"Hors ligne : %k/%N",statOff:"Hors ligne · enregistré %k/%N",done:"Hors ligne : %N/%N ✓",lab:"Télécharger les prières"},
    es:{ok:"Oraciones completamente disponibles sin conexión.",run:"Descargando …",load:"Cargando %k/%N: %t",off:"Sin conexión – no se puede descargar",space:"Sin espacio",err:"%k/%N sin conexión · errores: %e",miss:"%k/%N sin conexión · faltan %m",stat:"Sin conexión: %k/%N",statOff:"Sin conexión · guardado %k/%N",done:"Sin conexión: %N/%N ✓",lab:"Descargar oraciones"},
    ru:{ok:"Молитвы полностью доступны офлайн.",run:"Загрузка …",load:"Загрузка %k/%N: %t",off:"Нет сети – загрузка невозможна",space:"Недостаточно памяти",err:"%k/%N офлайн · ошибки: %e",miss:"%k/%N офлайн · не хватает %m",stat:"Офлайн: %k/%N",statOff:"Офлайн · сохранено %k/%N",done:"Офлайн: %N/%N ✓",lab:"Скачать молитвы"},
    hi:{ok:"प्रार्थनाएँ पूरी तरह ऑफ़लाइन उपलब्ध।",run:"डाउनलोड हो रहा है …",load:"लोड हो रहा है %k/%N: %t",off:"ऑफ़लाइन – डाउनलोड संभव नहीं",space:"जगह कम है",err:"%k/%N ऑफ़लाइन · त्रुटि: %e",miss:"%k/%N ऑफ़लाइन · %m बाकी",stat:"ऑफ़लाइन: %k/%N",statOff:"ऑफ़लाइन · सहेजा %k/%N",done:"ऑफ़लाइन: %N/%N ✓",lab:"प्रार्थनाएँ डाउनलोड करें"},
    pt:{ok:"Orações totalmente disponíveis offline.",run:"Baixando …",load:"Carregando %k/%N: %t",off:"Offline – não é possível baixar",space:"Espaço insuficiente",err:"%k/%N offline · erros: %e",miss:"%k/%N offline · faltam %m",stat:"Offline: %k/%N",statOff:"Offline · salvo %k/%N",done:"Offline: %N/%N ✓",lab:"Baixar orações"},
    cz:{ok:"Modlitby plně dostupné offline.",run:"Stahování …",load:"Načítám %k/%N: %t",off:"Offline – stažení není možné",space:"Nedostatek místa",err:"%k/%N offline · chyby: %e",miss:"%k/%N offline · chybí %m",stat:"Offline: %k/%N",statOff:"Offline · uloženo %k/%N",done:"Offline: %N/%N ✓",lab:"Stáhnout modlitby"}
  };
  /* load/miss strings are V4.91 UI additions (G+) */
  function L(){ var l=(typeof lang!=="undefined"&&MSG[lang])?lang:"en"; return MSG[l]; }
  function fmt(s,k,N,t,m){
    return String(s)
      .replace(/%k/g,String(k==null?"":k))
      .replace(/%N/g,String(N==null?"":N))
      .replace(/%n/g,String(N==null?"":N))
      .replace(/%t/g,String(t==null?"":t))
      .replace(/%m/g,String(m==null?"":m))
      .replace(/%e/g,"");
  }
  function audioKey(p){
    try{
      var u=new URL(p, location.href);
      if(u.origin!==location.origin) return null;
      if(!/\/audio\/[^\/]+\.mp3$/i.test(u.pathname)) return null;
      return u.origin+u.pathname;
    }catch(e){ return null; }
  }
  function fileLabel(url){
    var short=String(url||"").replace(/^.*\//,"").replace(/\.mp3$/i,"");
    try{
      var hit=null;
      (PRAYERS||[]).forEach(function(P){
        if(hit||!P) return;
        var keys=[];
        if(P.audio) keys.push(audioKey(P.audio));
        (P.audioAlt||[]).forEach(function(a){ keys.push(audioKey(a)); });
        if(keys.indexOf(url)>=0) hit=P;
      });
      if(hit&&hit.titel) return hit.titel;
    }catch(e){}
    return short;
  }

  var busy=false, lastAudit={have:0,total:0,complete:false,missing:[],haveKeys:[]}, lastMsg="", finishHold=0;

  
  function guardOff(el){
    try{
      if(!el||el._bpp491guard) return;
      el._bpp491guard=1;
      var mo=new MutationObserver(function(){
        if(!(busy || (finishHold && Date.now()<finishHold))) return;
        if(el.textContent!==lastMsg && lastMsg) el.textContent=lastMsg;
      });
      mo.observe(el,{characterData:true,childList:true,subtree:true});
    }catch(e){}
  }

  function ensureOff(){
    var el=document.getElementById("bppOff");
    if(!el){
      el=document.createElement("div"); el.id="bppOff";
      el.style.cssText="position:static;display:inline-block;margin:0;font:11px/1.3 system-ui,sans-serif;color:#cbb89a;background:rgba(26,20,16,.85);border:1px solid #3d2f26;border-radius:8px;padding:2px 7px;pointer-events:none;opacity:.95";
      var bar=document.getElementById("bppOffBar466");
      if(bar) bar.insertBefore(el, bar.firstChild); else (document.body||document.documentElement).appendChild(el);
    }
    el.setAttribute("data-bpp491","1"); guardOff(el); return el;
  }

  function liveBtn(){ return document.getElementById("btnOffAll"); }
  function setStatus(text){
    var el=ensureOff();
    lastMsg=text||"";
    el.textContent=lastMsg;
    el.style.display="";
  }
  function setBusyUi(label){
    var b=liveBtn(); if(!b) return null;
    b._bpp491=1; b._bpp466dl=1; b._bpp311=1; b._v311=1; b._bpp487=1;
    b.classList.add("busy","gold","on");
    b.setAttribute("aria-busy","true");
    b.style.removeProperty("display");
    b.removeAttribute("aria-hidden");
    if(label!=null) b.textContent=label;
    return b;
  }

  function paintBtn(a){
    var b=liveBtn(); if(!b) return;
    if(busy){ setBusyUi(b.textContent||L().run); return; }
    b.classList.remove("busy","gold","on");
    b.removeAttribute("aria-busy");
    if(a&&a.complete){
      b.textContent="";
      b.classList.remove("busy","gold","on");
      b.setAttribute("aria-hidden","true");
      b.style.setProperty("display","none","important");
    }else{
      b.style.removeProperty("display");
      b.removeAttribute("aria-hidden");
      b.textContent=L().lab;
    }
  }

  function paintStatus(a){
    lastAudit=a||lastAudit;
    var M=L();
    if(busy){
      paintBtn(lastAudit);
      if(lastMsg) setStatus(lastMsg);
      var S=window.bppOfflineState||(window.bppOfflineState={});
      S.n=lastAudit.have; S.total=lastAudit.total; S.complete=!!lastAudit.complete; S.done=false;
      S.missing=(lastAudit.missing||[]).slice(); S.msg=lastMsg; S.owner="v491";
      return;
    }
    if(finishHold && Date.now()<finishHold){ setStatus(lastMsg); }
    else if(lastAudit.complete) setStatus(fmt(M.done, lastAudit.have, lastAudit.total));
    else if(!navigator.onLine) setStatus(fmt(M.statOff, lastAudit.have, lastAudit.total));
    else setStatus(fmt(M.stat, lastAudit.have, lastAudit.total));
    paintBtn(lastAudit);
    var S2=window.bppOfflineState||(window.bppOfflineState={});
    S2.n=lastAudit.have; S2.total=lastAudit.total; S2.complete=!!lastAudit.complete; S2.done=true;
    S2.missing=(lastAudit.missing||[]).slice(); S2.msg=lastMsg; S2.owner="v491";
    try{ window.__bppAudHave=window.__bppAudHave||{}; (lastAudit.haveKeys||[]).forEach(function(k){ window.__bppAudHave[k]=1; }); }catch(e){}
  }

  function audit(){
    if(typeof window.bppAudit487==="function") return window.bppAudit487();
    return Promise.resolve({have:0,total:0,complete:false,missing:[],haveKeys:[]});
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
    if(!navigator.onLine){ setStatus(M.off); paintBtn(lastAudit); return Promise.resolve(lastAudit); }
    if(!("caches" in window)||!navigator.serviceWorker){ setStatus(M.off); paintBtn(lastAudit); return Promise.resolve(lastAudit); }
    if(busy) return Promise.resolve(lastAudit);
    busy=true;
    setBusyUi(M.run);
    setStatus(M.run);
    var S=window.bppOfflineState||(window.bppOfflineState={});
    S.done=false; S.cur=""; S.err=0; S.errFiles=[]; S.owner="v491"; S.quick=false;
    return audit().then(function(a){
      lastAudit=a; paintBtn(a);
      if(a.complete){
        busy=false; paintStatus(a); setStatus(M.ok); finishHold=Date.now()+8000; paintBtn(a); return a;
      }
      return estimate(a.missing.length).then(function(okSpace){
        if(!okSpace){ busy=false; paintStatus(a); setStatus(M.space); S.done=true; return a; }
        return caches.open(AUD).then(function(c){
          var errFiles=[], have=a.have, total=a.total;
          var chain=Promise.resolve();
          a.missing.forEach(function(u){
            chain=chain.then(function(){
              if(!navigator.onLine) return;
              var title=fileLabel(u);
              S.cur=title; S.done=false; S.n=have; S.total=total; S.owner="v491";
              var step=Math.min(have+1, total);
              var line=fmt(M.load, step, total, title);
              setStatus(line);
              setBusyUi(step+"/"+total);
              return putOne(c, u).then(function(){
                have++; S.n=have;
                setBusyUi(have+"/"+total);
              }).catch(function(){
                S.err=(S.err||0)+1; errFiles.push(title); S.errFiles=errFiles;
              });
            });
          });
          return chain.then(function(){
            S.cur=""; S.done=true; busy=false;
            return audit().then(function(a2){
              lastAudit=a2; paintStatus(a2);
              if(errFiles.length){
                setStatus(fmt(M.err, a2.have, a2.total).replace("%e", errFiles.join(", ")));
              }else if(a2.complete){
                setStatus(M.ok); finishHold=Date.now()+8000; paintBtn(a2);
              }else{
                var miss=Math.max(0, a2.total-a2.have);
                setStatus(fmt(M.miss, a2.have, a2.total, "", miss));
              }
              return a2;
            });
          });
        });
      });
    }).catch(function(){ busy=false; S.done=true; refresh().then(function(){ setStatus(M.off); }); });
  }

  function go(e){
    if(e){ e.preventDefault(); e.stopImmediatePropagation(); }
    if(busy) return;
    runDownload();
  }

  function bind(){
    var b=document.getElementById("btnOffAll"); if(!b) return;
    if(b._bpp491) return;
    try{
      var n=b.cloneNode(true);
      n._bpp491=1; n._bpp466dl=1; n._bpp311=1; n._v311=1; n._bpp487=1;
      b.parentNode.replaceChild(n,b); b=n;
    }catch(e){ b._bpp491=1; b._bpp466dl=1; b._bpp311=1; b._v311=1; b._bpp487=1; }
    b.addEventListener("click", go, true);
  }

  function mutePrev(){
    try{
      window.bppOfflineQuick=function(){ refresh(); }; window.bppOfflineQuick._bpp487=1; window.bppOfflineQuick._bpp491=1;
    }catch(e){}
    try{
      /* v487 interval may repaint; keep owner on status text while idle via our interval */
      if(window.bppOfflineRefresh487) window.bppOfflineRefresh487=refresh;
    }catch(e){}
  }

  window.bppOfflineRun=function(){ runDownload(); };
  window.bppOfflineEnsure481=runDownload;
  window.bppOfflineEnsure483=runDownload;
  window.bppOfflineEnsure487=runDownload;
  window.bppOfflineEnsure491=runDownload;
  window.bppDlGo481=go; window.bppDlGo483=go; window.bppDlGo487=go; window.bppDlGo491=go;
  window.bppOfflineRefresh491=refresh;
  window.bppAudit491=audit;

  bind(); mutePrev(); refresh();
  setInterval(function(){ bind(); mutePrev(); if(busy){ paintBtn(lastAudit); if(lastMsg) setStatus(lastMsg); } else paintStatus(lastAudit); }, 400);
  window.addEventListener("focus", function(){ if(!busy) refresh(); });
  window.addEventListener("online", function(){ if(!busy) refresh(); });
  window.addEventListener("offline", function(){ if(!busy) refresh(); });
  window.addEventListener("bpp-lang", function(){ if(!busy) refresh(); });
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ bind(); refresh(); });
})();
