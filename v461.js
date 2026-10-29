/* [Grok-Bot] V4.65: Menue+-Duplikate "Prayers runterladen" / "Als App installieren" entfernt
   (nur noch unten in der Fusszeile; Positionsquelle Fusszeile = v463). Support oben neben Hilfe
   und Fokus-Reclaim fuer + nach Pause bleiben. */
window.BPP_BUILD="4.65"; window.BPP_SHOW="4.65";
(function(){
  if(window.bppV461) return; window.bppV461=1;

  var LAB={
    de:{sup:"Support",supT:"Support – Anregung oder Frage senden"},
    en:{sup:"Support",supT:"Support – send a suggestion or question"},
    fr:{sup:"Support",supT:"Support – envoyer une suggestion ou une question"},
    es:{sup:"Soporte",supT:"Soporte – enviar sugerencia o pregunta"},
    ru:{sup:"Поддержка",supT:"Поддержка – отправить пожелание или вопрос"},
    hi:{sup:"सपोर्ट",supT:"सपोर्ट – सुझाव या प्रश्न भेजें"},
    pt:{sup:"Suporte",supT:"Suporte – enviar sugestão ou pergunta"},
    cz:{sup:"Podpora",supT:"Podpora – poslat podnět nebo otázku"}
  };
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return LAB[l]?l:"en"; }
  function L(){ return LAB[lg()]; }

  var st=document.createElement("style");
  st.id="bppSt461";
  st.textContent=
    /* alte Menue+-Duplikate entfernen/verstecken falls noch im DOM */
    "#btnOffMenu461,#btnInstMenu461{display:none!important}"+
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

  function removeMenuDupes(){
    ["btnOffMenu461","btnInstMenu461"].forEach(function(id){
      var el=document.getElementById(id); if(el&&el.parentNode) el.parentNode.removeChild(el);
    });
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
    try{ removeMenuDupes(); ensureTopSupport(); }catch(e){}
  }
  setInterval(tick, 400);
  window.addEventListener("load", tick);
})();
