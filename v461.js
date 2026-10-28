/* [Grok-Bot] V4.61: (1) Bei Menue+ zusaetzliche Knoepfe "Prayers runterladen" und "Als App installieren"
   (gleiche Funktion/Optik wie unten) – nur solange nicht erledigt: Download nur wenn Offline unvollstaendig
   (bppOfflineState.n < total), Install nur wenn nicht standalone/installiert (wie v341; iOS/Hinweis bleibt).
   (2) Support-Knopf oben neben Hilfe (?) oeffnet dasselbe Overlay wie die Fusszeile (bppWishOpen447).
   Umbenennung Fusszeile/Overlay-Titel: v447 (eine Label-Quelle). Hier nur Lage des oberen Knopfes + Menue+-Duplikate.
   (3) Taste "+"/NumpadAdd/"=" oeffnet Menue+ auch nach Play->Pause (Fokus von Play-Knopf/Audio/YT-iframe
   holen; v352 mappt zusaetzlich "=" / NumpadAdd). Taste G bleibt Grossansicht (btnFs) – nicht umbelegt.
   Kein Doppel-Overwrite der Positionsquellen v460/v341. */
window.BPP_BUILD="4.61"; window.BPP_SHOW="4.61";
(function(){
  if(window.bppV461) return; window.bppV461=1;

  var LAB={
    de:{dl:"Prayers runterladen",inst:"Als App installieren",sup:"Support",supT:"Support – Anregung oder Frage senden"},
    en:{dl:"Download prayers",inst:"Install as app",sup:"Support",supT:"Support – send a suggestion or question"},
    fr:{dl:"Télécharger les prières",inst:"Installer comme app",sup:"Support",supT:"Support – envoyer une suggestion ou une question"},
    es:{dl:"Descargar oraciones",inst:"Instalar como app",sup:"Soporte",supT:"Soporte – enviar sugerencia o pregunta"},
    ru:{dl:"Скачать молитвы",inst:"Установить как приложение",sup:"Поддержка",supT:"Поддержка – отправить пожелание или вопрос"},
    hi:{dl:"प्रार्थनाएँ डाउनलोड करें",inst:"ऐप के रूप में इंस्टॉल करें",sup:"सपोर्ट",supT:"सपोर्ट – सुझाव या प्रश्न भेजें"},
    pt:{dl:"Baixar orações",inst:"Instalar como app",sup:"Suporte",supT:"Suporte – enviar sugestão ou pergunta"},
    cz:{dl:"Stáhnout modlitby",inst:"Instalovat jako aplikaci",sup:"Podpora",supT:"Podpora – poslat podnět nebo otázku"}
  };
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return LAB[l]?l:"en"; }
  function L(){ return LAB[lg()]; }

  function offlineDone(){
    var S=window.bppOfflineState; if(!S) return false;
    var tot=+S.total||0, n=+S.n||0;
    if(tot>0 && n>=tot) return true;
    if(S.done && tot>0) return true;
    return false;
  }
  function appInstalled(){
    try{
      if(window.matchMedia("(display-mode: standalone)").matches) return true;
      if(window.matchMedia("(display-mode: fullscreen)").matches) return true;
      if(window.navigator.standalone===true) return true;
    }catch(e){}
    var b=document.getElementById("btnInstall");
    if(b && b.style.display==="none") return true;
    return false;
  }

  var st=document.createElement("style");
  st.id="bppSt461";
  st.textContent=
    /* Menue+ Duplikate: Optik wie unten, nur bei menu-full und wenn sichtbar */
    "body:not(.menu-full) #btnOffMenu461,body:not(.menu-full) #btnInstMenu461{display:none!important}"+
    "#btnOffMenu461,#btnInstMenu461{display:none;align-items:center;gap:6px;margin:0;font:inherit;font-size:.9rem;padding:6px 12px;min-height:32px;cursor:pointer;order:18}"+
    "body.menu-full #btnOffMenu461.show461,body.menu-full #btnInstMenu461.show461{display:inline-flex!important}"+
    "#btnOffMenu461.busy{background:#e0b45a!important;color:#1a1208!important;font-weight:700}"+
    /* Support oben neben Hilfe: eigene Spalte links (v321 erzeugt bppHelpCol nicht mehr) */
    "#bppHelpCol{position:absolute;left:8px;top:12px;z-index:12;display:inline-flex;align-items:center;gap:6px;"+
      "flex-wrap:nowrap;pointer-events:auto;max-width:calc(50vw - 8px)}"+
    "#bppHelpCol #bppHelpTip{position:relative!important;left:auto!important;top:auto!important;"+
      "display:inline-flex!important;align-items:center;justify-content:center;"+
      "width:22px;height:22px;margin:0!important;flex:0 0 auto}"+
    "#bppHelpCol #bppHelpTip:before{display:none!important}"+
    "#bppSup461{display:inline-flex;align-items:center;justify-content:center;"+
      "margin:0;padding:1px 8px;min-height:22px;font:600 .68rem/1.2 system-ui,sans-serif;"+
      "color:#c9a560;background:#4a372b;border:1px solid #6b5340;border-radius:999px;cursor:pointer;"+
      "white-space:nowrap;z-index:10;vertical-align:middle;flex:0 0 auto}"+
    "#bppSup461:hover{color:#e0b45a;border-color:#e0b45a}"+
    "html.th-morgen #bppSup461{background:#efe6d2;color:#5e420c;border-color:#a88b4a}"+
    "html.th-abend #bppSup461{background:#2a1a10;color:#e0b45a;border-color:#6b5340}"+
    "@media(max-width:400px){#bppHelpCol{left:6px;top:10px;gap:4px;max-width:calc(100vw - 72px)}"+
      "#bppSup461{font-size:.62rem;padding:1px 6px;min-height:20px}"+
      "#bppHelpCol #bppHelpTip{width:20px;height:20px;font-size:.7rem!important}}"+
    "header h1{padding-left:var(--bpp-hl461,56px)!important;box-sizing:border-box}";
  document.head.appendChild(st);

  function clickDl(e){
    e.preventDefault(); e.stopPropagation();
    var o=document.getElementById("btnOffAll");
    if(o){ o.click(); return; }
    if(typeof window.bppOfflineRun==="function") window.bppOfflineRun();
  }
  function clickInst(e){
    e.preventDefault(); e.stopPropagation();
    var o=document.getElementById("btnInstall");
    if(o){ o.click(); return; }
  }

  function ensureMenuBtns(){
    var row=document.getElementById("bppL5")||document.querySelector(".bar .r301");
    var menu=document.getElementById("btnMenu");
    if(!row||!menu) return;
    var dl=document.getElementById("btnOffMenu461");
    if(!dl){
      dl=document.createElement("button"); dl.type="button"; dl.id="btnOffMenu461";
      dl.addEventListener("click",clickDl,true);
      row.insertBefore(dl, menu);
    } else if(dl.parentNode!==row){
      row.insertBefore(dl, menu);
    }
    var inst=document.getElementById("btnInstMenu461");
    if(!inst){
      inst=document.createElement("button"); inst.type="button"; inst.id="btnInstMenu461";
      inst.addEventListener("click",clickInst,true);
      row.insertBefore(inst, menu);
    } else if(inst.parentNode!==row){
      row.insertBefore(inst, menu);
    }
    /* Reihenfolge: … dl, inst, menu */
    if(dl.nextSibling!==inst) row.insertBefore(dl, inst);
    if(inst.nextSibling!==menu) row.insertBefore(inst, menu);

    var lab=L();
    if(!dl.classList.contains("busy") && dl.textContent!==lab.dl){ dl.textContent=lab.dl; }
    if(inst.textContent!==lab.inst){ inst.textContent=lab.inst; }
    dl.title=lab.dl; inst.title=lab.inst;

    var showDl=!offlineDone();
    var showInst=!appInstalled();
    dl.classList.toggle("show461", showDl);
    inst.classList.toggle("show461", showInst);
    var o=document.getElementById("btnOffAll");
    if(o){ dl.classList.toggle("busy", o.classList.contains("busy")); if(o.classList.contains("busy")&&o.textContent) dl.textContent=o.textContent; }
  }

  function ensureTopSupport(){
    var tip=document.getElementById("bppHelpTip");
    var header=document.querySelector("header");
    if(!tip||!header) return;
    var col=document.getElementById("bppHelpCol");
    if(!col){
      col=document.createElement("span"); col.id="bppHelpCol";
      header.appendChild(col);
    } else if(col.parentNode!==header){
      header.appendChild(col);
    }
    if(tip.parentNode!==col) col.insertBefore(tip, col.firstChild);
    var b=document.getElementById("bppSup461");
    if(!b){
      b=document.createElement("button"); b.type="button"; b.id="bppSup461";
      b.addEventListener("click",function(e){
        e.preventDefault(); e.stopPropagation();
        if(typeof window.bppWishOpen447==="function") window.bppWishOpen447();
      },true);
      col.appendChild(b);
    } else if(b.parentNode!==col){
      col.appendChild(b);
    }
    if(tip.nextSibling!==b) col.insertBefore(b, tip.nextSibling);
    var lab=L();
    if(b.textContent!==lab.sup) b.textContent=lab.sup;
    if(b.title!==lab.supT){ b.title=lab.supT; b.setAttribute("aria-label",lab.supT); }
    try{
      var w=Math.ceil(col.getBoundingClientRect().width)+10;
      if(w<56) w=56;
      document.documentElement.style.setProperty("--bpp-hl461", w+"px");
    }catch(e){}
  }

  /* Fokus nach Play/Pause von Knopf/Audio/YT-iframe nehmen, damit + / andere Kuerzel ankommen */
  function reclaimFocus(){
    try{
      var ae=document.activeElement;
      if(!ae||ae===document.body||ae===document.documentElement) return;
      var tag=ae.tagName;
      if(tag==="BUTTON"||tag==="AUDIO"||tag==="VIDEO"||tag==="IFRAME"||(ae.closest&&ae.closest("#btnPlay,.yt,#yt,iframe"))){
        try{ ae.blur(); }catch(x){}
        try{ window.focus(); document.body.focus(); }catch(x){}
      }
    }catch(e){}
  }
  document.addEventListener("click",function(e){
    var t=e.target&&e.target.closest&&e.target.closest("#btnPlay,#bppFsPlay");
    if(t) setTimeout(reclaimFocus, 0);
  },true);
  try{
    var a=document.querySelector("audio");
    if(a){ a.addEventListener("play",function(){ setTimeout(reclaimFocus,0); });
      a.addEventListener("pause",function(){ setTimeout(reclaimFocus,0); }); }
  }catch(e){}
  window.addEventListener("blur",function(){
    setTimeout(function(){
      var ae=document.activeElement;
      if(ae&&ae.tagName==="IFRAME") reclaimFocus();
    },0);
  });

  function tick(){
    try{ ensureMenuBtns(); ensureTopSupport(); }catch(e){}
  }
  setInterval(tick, 400);
  window.addEventListener("load", tick);
  setInterval(function(){ try{ if(window.bppOfflineQuick) bppOfflineQuick(); }catch(e){} }, 8000);
})();
