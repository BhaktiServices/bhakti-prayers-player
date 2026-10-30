/* [Grok-Bot] V4.66: Fusszeilen-Buttons "Prayers runterladen" / "Als App installieren" unter Windows tot.
   Ursache: v463 haengte die Buttons als Kinder in #bppOff. #bppOff ist die Status-Anzeige aus v203 und hat
   inline pointer-events:none (nur Text, kein Klickziel). Dadurch bekamen auch die Buttons pe:none –
   echte Mausklicks (Chrome/Edge Desktop) gingen ins Leere. Zusaetzlich loeschte show() per textContent=
   alle Kinder von #bppOff und zerstoerte die Buttons.
   Fix: eigene Zeile #bppOffBar466 – Status #bppOff und die beiden Buttons als Geschwister; pe:auto auf Buttons.
   Handler werden dauerhaft nachgebunden (v311 nur einmal ~30s). Install: beforeinstallprompt oder Anleitung
   inkl. Chrome/Edge Adressleisten-Symbol. */
window.BPP_BUILD="4.66"; window.BPP_SHOW="4.66";
(function(){
  if(window.bppV466) return; window.bppV466=1;

  var st=document.createElement("style");
  st.id="bppSt466";
  st.textContent=
    "#bppOffBar466{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;margin:4px 0 0;width:100%}"+
    "#bppOffBar466>#bppOff{position:static!important;display:inline-block!important;margin:0!important;"+
      "right:auto!important;bottom:auto!important;pointer-events:none!important;opacity:.9;flex:0 1 auto;"+
      "font:11px/1.3 system-ui,sans-serif;color:#cbb89a;background:rgba(26,20,16,.85);border:1px solid #3d2f26;"+
      "border-radius:8px;padding:2px 7px;z-index:auto}"+
    "#bppOffBar466>#btnOffAll,#bppOffBar466>#btnInstall{"+
      "pointer-events:auto!important;position:relative;z-index:2;cursor:pointer;"+
      "display:inline-flex!important;align-items:center;gap:6px;margin:0;font:inherit;font-size:.9rem;"+
      "padding:6px 12px;min-height:32px}"+
    "#bppOffBar466>#btnOffAll.busy{background:#e0b45a!important;color:#1a1208!important;font-weight:700}";
  document.head.appendChild(st);

  function bar(){
    var b=document.getElementById("bppOffBar466");
    if(b) return b;
    b=document.createElement("div"); b.id="bppOffBar466";
    var host=document.getElementById("bppSrcEnd")||document.getElementById("foot")||document.body;
    var foot=document.getElementById("bppFoot426");
    if(foot && foot.parentNode) foot.parentNode.insertBefore(b, foot);
    else host.appendChild(b);
    return b;
  }

  function rescueFromOff(){
    var off=document.getElementById("bppOff");
    if(!off) return;
    /* Textknoten behalten; Buttons/Elemente herausziehen */
    var kids=[].slice.call(off.childNodes), i, n, t="";
    for(i=0;i<kids.length;i++){
      n=kids[i];
      if(n.nodeType===1){ /* Element (Button etc.) -> raus */
        if(n.id==="btnOffAll"||n.id==="btnInstall"){ /* move later via place */ }
        else { try{ off.removeChild(n); }catch(e){} }
      } else if(n.nodeType===3){ t+=n.textContent; }
    }
    /* Falls show() Buttons schon zerstoert hat: nichts zu retten */
    /* Status-Text normalisieren: nur Text, keine Element-Kinder ausser wir ziehen Buttons erst raus */
    var btns=[];
    ["btnOffAll","btnInstall"].forEach(function(id){
      var el=document.getElementById(id);
      if(el && el.parentNode===off) btns.push(el);
    });
    btns.forEach(function(el){ /* temporary park on body so textContent wipe is safe */ document.body.appendChild(el); });
    if(btns.length && off.childNodes.length){
      /* keep existing text */
    }
  }

  function place(){
    rescueFromOff();
    var row=bar();
    var off=document.getElementById("bppOff");
    var dl=document.getElementById("btnOffAll");
    var inst=document.getElementById("btnInstall");
    if(off && off.parentNode!==row) row.appendChild(off);
    if(dl && dl.parentNode!==row) row.appendChild(dl);
    if(inst && inst.parentNode!==row) row.appendChild(inst);
    /* Reihenfolge: Status, Download, Install */
    if(off && row.firstChild!==off) row.insertBefore(off, row.firstChild);
    if(dl && off && off.nextSibling!==dl) row.insertBefore(dl, off.nextSibling);
    if(inst && dl && dl.nextSibling!==inst) row.insertBefore(inst, dl.nextSibling);
    else if(inst && !dl && off && off.nextSibling!==inst) row.insertBefore(inst, off.nextSibling);
    /* Foot darunter – ab V4.75 Positionsquelle v475 (bar→stats→box→foot) */
    if(!window.bppFootOrder475){
      var foot=document.getElementById("bppFoot426");
      if(foot && row.parentNode && row.nextSibling!==foot){
        row.parentNode.insertBefore(foot, row.nextSibling);
      }
    }
    /* pointer-events haerten (inline von v203 ueberschreiben fuer den Fall, dass jemand wieder Kinder setzt) */
    if(dl){ dl.style.pointerEvents="auto"; }
    if(inst){ inst.style.pointerEvents="auto"; }
  }

  /* --- Download-Handler dauerhaft --- */
  var busy=false;
  var T={de:["Alle %n Prayers offline gespeichert","%k/%n offline gespeichert · Fehler: %e","Offline – Download nicht möglich","Zu wenig Speicher auf dem Gerät","Download läuft …"],
    en:["All %n prayers saved offline","%k/%n saved offline · errors: %e","Offline – download not possible","Not enough storage on this device","Downloading …"],
    fr:["Les %n prières sont enregistrées hors ligne","%k/%n hors ligne · erreurs : %e","Hors ligne – téléchargement impossible","Espace de stockage insuffisant","Téléchargement …"],
    es:["Las %n oraciones guardadas sin conexión","%k/%n sin conexión · errores: %e","Sin conexión – no se puede descargar","No hay espacio suficiente","Descargando …"],
    ru:["Все %n молитв сохранены офлайн","%k/%n офлайн · ошибки: %e","Нет сети – загрузка невозможна","Недостаточно памяти","Загрузка …"],
    hi:["सभी %n प्रार्थनाएँ ऑफ़लाइन सहेजी गईं","%k/%n ऑफ़लाइन · त्रुटि: %e","ऑफ़लाइन – डाउनलोड संभव नहीं","डिवाइस में जगह कम है","डाउनलोड हो रहा है …"],
    pt:["Todas as %n orações salvas offline","%k/%n salvas offline · erros: %e","Offline – não é possível baixar","Espaço insuficiente neste aparelho","Baixando …"]};
  function t(k){ var l=(typeof lang!=="undefined"&&T[lang])?lang:"en"; return T[l][k]; }
  function msg(s){ var m=document.getElementById("bppDlMsg"); if(!m){ m=document.createElement("div"); m.id="bppDlMsg";
    m.style.cssText="position:fixed;right:10px;bottom:34px;z-index:60;max-width:80vw;background:#2a1f16;color:#e0b45a;border:1px solid #e0b45a;border-radius:10px;padding:8px 12px;font:14px/1.35 system-ui,sans-serif;box-shadow:0 4px 18px #0008";
    document.body.appendChild(m); }
    m.textContent=s; m.style.display=""; clearTimeout(msg._t); msg._t=setTimeout(function(){ m.style.display="none"; },6000); }

  function goDl(e){
    if(e){ e.preventDefault(); e.stopImmediatePropagation(); }
    window.__bppDl466 = (window.__bppDl466||0)+1;
    var b=document.getElementById("btnOffAll"); if(busy||!b) return;
    if(!navigator.onLine){ msg(t(2)); return; }
    if(!("caches" in window)||!navigator.serviceWorker||typeof window.bppOfflineRun!=="function"){ msg(t(2)); return; }
    var S=window.bppOfflineState||{}; S.done=false; S.cur=""; S.errFiles=[]; S.err=0; S.quick=true; delete S.free;
    busy=true; b.classList.add("busy"); b.textContent=t(4);
    var t0=Date.now(), seenCur=false;
    try{ window.bppOfflineRun(); }catch(err){}
    var iv=setInterval(function(){
      b=document.getElementById("btnOffAll"); if(!b){ clearInterval(iv); busy=false; return; }
      var tot=S.total||22, n=S.n||0;
      if(S.cur){ seenCur=true; b.textContent=n+"/"+tot; }
      var fin=(S.done && !S.cur) || (seenCur && !S.cur) || Date.now()-t0>15*60000;
      var noSpace=(typeof S.free==="number" && !seenCur && Date.now()-t0>4000 && !S.done);
      if(!fin && !noSpace) return;
      clearInterval(iv); busy=false; b.classList.remove("busy");
      b.textContent=""; try{ window.dispatchEvent(new Event("bpp-lang")); }catch(err){}
      var ef=S.errFiles||[];
      if(noSpace) msg(t(3));
      else if(ef.length) msg(t(1).replace("%k",n).replace("%n",tot).replace("%e",ef.join(", ")));
      else if(n>=tot) msg(t(0).replace("%n",tot));
      else msg(t(1).replace("%k",n).replace("%n",tot).replace("%e","?"));
      place(); /* Buttons nach show()-Wipe wieder einsammeln */
    },400);
  }

  /* --- Install: deferred prompt + Desktop-Anleitung --- */
  var deferred=null, installed=false;
  var HI={
    de:{ios:"iPhone/iPad: In Safari auf <b>Teilen</b> tippen, dann <b>„Zum Home-Bildschirm“</b>.",
        desk:"Kein Installations-Dialog verfügbar. In <b>Chrome</b> oder <b>Edge</b>: rechts in der Adressleiste auf das Symbol <b>„App installieren“</b> (Monitor mit Pfeil / ⊕) klicken. Oder Menü ⋮ → <b>App installieren</b> / <b>Apps</b> → <b>Diese Website als App installieren</b>.",
        oth:"Im Browser-Menü <b>„App installieren“</b> bzw. <b>„Zum Startbildschirm hinzufügen“</b> wählen.",
        ok:"OK"},
    en:{ios:"iPhone/iPad: in Safari tap <b>Share</b>, then <b>“Add to Home Screen”</b>.",
        desk:"No install dialog available. In <b>Chrome</b> or <b>Edge</b>: click the <b>“Install app”</b> icon in the address bar (monitor with arrow / ⊕). Or menu ⋮ → <b>Install app</b> / <b>Apps</b> → <b>Install this site as an app</b>.",
        oth:"Use the browser menu: <b>“Install app”</b> or <b>“Add to Home screen”</b>.",
        ok:"OK"}
  };
  function HL(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return HI[l]?HI[l]:HI.en; }
  function isIOS(){ var u=navigator.userAgent||""; return /iPad|iPhone|iPod/.test(u) || (navigator.platform==="MacIntel" && navigator.maxTouchPoints>1); }
  function isDeskChromium(){ var u=navigator.userAgent||""; return /Windows|Linux|CrOS|Macintosh/.test(u) && /Chrome|Edg|Chromium/.test(u) && !/Mobile|Android/.test(u); }
  function standalone(){ try{ return window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: fullscreen)").matches || window.navigator.standalone===true; }catch(e){ return false; } }

  window.addEventListener("beforeinstallprompt", function(e){
    e.preventDefault(); deferred=e; window.__bppDeferredInstall466=e; syncInst();
  });
  window.addEventListener("appinstalled", function(){ installed=true; deferred=null; window.__bppDeferredInstall466=null; syncInst(); });

  function hint(html){
    var h=document.getElementById("bppInstHint"); if(h) h.remove();
    h=document.createElement("div"); h.id="bppInstHint"; h.setAttribute("role","dialog");
    h.style.cssText="position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:99999;width:min(92vw,460px);box-sizing:border-box;padding:14px 16px;border-radius:14px;background:#16254C;color:#fff;border:1px solid rgba(255,255,255,.18);box-shadow:0 8px 30px rgba(0,0,0,.45);font-size:.95rem;line-height:1.45";
    h.innerHTML="<div>"+html+"</div><button type='button' style='margin-top:10px;float:right;padding:4px 16px;min-height:30px;cursor:pointer'>"+HL().ok+"</button><div style='clear:both'></div>";
    h.querySelector("button").onclick=function(){ h.remove(); };
    document.body.appendChild(h); setTimeout(function(){ if(h.parentNode) h.remove(); }, 20000);
  }

  function goInst(e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    window.__bppInst466 = (window.__bppInst466||0)+1;
    var d=deferred||window.__bppDeferredInstall466;
    if(d){ deferred=null; window.__bppDeferredInstall466=null;
      try{ d.prompt(); }catch(err){}
      (d.userChoice||Promise.resolve()).then(function(c){ if(c&&c.outcome==="accepted") installed=true; syncInst(); });
      return;
    }
    var L=HL();
    if(isIOS()) hint(L.ios);
    else if(isDeskChromium()) hint(L.desk);
    else hint(L.oth);
  }

  function syncInst(){
    var b=document.getElementById("btnInstall"); if(!b) return;
    var hide=standalone()||installed;
    b.style.display=hide?"none":"";
    b.style.pointerEvents="auto";
  }

  function bind(){
    var dl=document.getElementById("btnOffAll");
    var inst=document.getElementById("btnInstall");
    if(dl && !dl._bpp466dl){
      dl._bpp466dl=1; dl.onclick=null;
      /* capture: vor alten Handlern; stopImmediate in goDl verhindert Doppelstart */
      dl.addEventListener("click", goDl, true);
    }
    if(inst && !inst._bpp466in){
      inst._bpp466in=1; inst.onclick=null;
      inst.addEventListener("click", goInst, true);
    }
    syncInst();
  }

  /* show() in v203 setzt textContent auf #bppOff – wenn Buttons noch drin waren, weg.
     Patch: show-Text nur in Textknoten / ohne Kinder-Elemente. */
  function patchShow(){
    var off=document.getElementById("bppOff");
    if(!off || off._bpp466show) return;
    off._bpp466show=1;
    /* MutationObserver: wenn Buttons wieder als Kinder landen, sofort raus */
    try{
      var mo=new MutationObserver(function(){
        var moved=false;
        ["btnOffAll","btnInstall"].forEach(function(id){
          var el=document.getElementById(id);
          if(el && el.parentNode===off){ bar().appendChild(el); moved=true; }
        });
        if(moved) place();
      });
      mo.observe(off, {childList:true});
    }catch(e){}
  }

  function tick(){
    try{ place(); patchShow(); bind(); }catch(e){}
  }
  setInterval(tick, 250);
  window.addEventListener("load", tick);
  tick();

  /* Expose for tests */
  window.bppDlGo466=goDl;
  window.bppInstGo466=goInst;
})();
