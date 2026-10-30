/* [Grok-Bot] V4.72: Positionen an einer Stelle (kein Positionskampf):
   (1) Support (#bppSup461) oben links unter dem Hilfe-Knopf '?' (#bppHelpTip) – Spalte #bppHelpCol.
   (2) Atma Bhog (#bppAtma) rechts unter Stil (#bppTheme) im Stack #bppTopRight460, zweizeilig „Atma“ / „Bhog ↗“.
   Neutralisiert v343/v382 (Atma unter Titel) und die Neben-einander-Lage von Support (v461). */
window.BPP_BUILD="4.72"; window.BPP_SHOW="4.72";
(function(){
  if(window.bppV472) return; window.bppV472=1;

  var st=document.createElement("style");
  st.id="bppSt472";
  st.textContent=
    /* Links: ? oben, Support darunter – eine Spalte */
    "#bppHelpCol{position:absolute!important;left:8px!important;top:12px!important;z-index:12!important;"+
      "display:inline-flex!important;flex-direction:column!important;align-items:flex-start!important;"+
      "justify-content:flex-start!important;gap:4px!important;flex-wrap:nowrap!important;"+
      "pointer-events:auto;max-width:calc(50vw - 8px)}"+
    "#bppHelpCol #bppHelpTip{position:relative!important;left:auto!important;top:auto!important;"+
      "order:0!important;margin:0!important;flex:0 0 auto}"+
    "#bppHelpCol #bppSup461{order:1!important;margin:0!important;align-self:flex-start!important}"+
    "@media(max-width:400px){#bppHelpCol{left:6px!important;top:10px!important;gap:3px!important}}"+
    /* Rechts: Sprache → Stil → Atma (CSS-order; DOM: Atma vor Stil, damit v460 theme=last belässt) */
    "#bppTopRight460{gap:4px!important}"+
    "#bppTopRight460 .lang.l307,#bppTopRight460 .lang{order:0!important}"+
    "#bppTopRight460 #bppTheme{order:1!important}"+
    "#bppTopRight460 #bppAtma,#bppAtma{order:2!important;position:static!important;top:auto!important;right:auto!important;"+
      "left:auto!important;transform:none!important;margin:0!important;"+
      "display:inline-flex!important;flex-direction:column!important;align-items:flex-end!important;"+
      "justify-content:center;gap:0!important;align-self:flex-end!important;"+
      "padding:3px 9px!important;border:1px solid #D6BF90!important;border-radius:10px!important;"+
      "background:#041236!important;color:#D6BF90!important;"+
      "font:600 .68rem/1.15 Figtree,'Source Sans 3',sans-serif!important;"+
      "letter-spacing:.05em;text-transform:uppercase;text-decoration:none!important;"+
      "white-space:normal!important;z-index:110;cursor:pointer;-webkit-tap-highlight-color:transparent}"+
    "#bppAtma:hover,#bppAtma:focus-visible{background:#D6BF90!important;color:#041236!important;outline:none}"+
    "#bppAtma .bppAtmaL1,#bppAtma .bppAtmaL2{display:block;line-height:1.15}"+
    "#bppAtma svg{display:none!important}"+
    "header h1 #bppAtma{position:static!important}"+
    "@media(max-width:400px){#bppAtma{font-size:.62rem!important;padding:2px 7px!important}}"+
    "header h1{padding-left:var(--bpp-hl472,var(--bpp-hl461,56px))!important;"+
      "padding-right:var(--bpp-tr472,var(--bpp-tr460,56px))!important;padding-bottom:0!important}";
  document.head.appendChild(st);

  var ATMA_HTML="<span class='bppAtmaL1'>Atma</span><span class='bppAtmaL2'>Bhog ↗</span>";

  function ensureAtma(){
    var a=document.getElementById("bppAtma");
    if(!a){
      a=document.createElement("a"); a.id="bppAtma";
      a.href="https://www.atmabhog.org"; a.target="_blank"; a.rel="noopener";
      ["click","pointerdown","touchstart"].forEach(function(ev){
        a.addEventListener(ev,function(e){ e.stopPropagation(); },{passive:true});
      });
    }
    if(a.innerHTML!==ATMA_HTML) a.innerHTML=ATMA_HTML;
    a.style.cssText="position:static;top:auto;right:auto;left:auto;transform:none;margin:0;"+
      "display:inline-flex;flex-direction:column;align-items:flex-end;align-self:flex-end";
    return a;
  }

  function paint(){
    /* --- Links: ? / Support untereinander --- */
    var tip=document.getElementById("bppHelpTip");
    var sup=document.getElementById("bppSup461");
    var header=document.querySelector("header");
    if(tip&&header){
      var col=document.getElementById("bppHelpCol");
      if(!col){ col=document.createElement("span"); col.id="bppHelpCol"; header.appendChild(col); }
      else if(col.parentNode!==header) header.appendChild(col);
      if(tip.parentNode!==col) col.insertBefore(tip, col.firstChild);
      if(sup){
        if(sup.parentNode!==col) col.appendChild(sup);
        /* feste Reihenfolge: tip, dann Support */
        if(col.firstElementChild!==tip) col.insertBefore(tip, col.firstChild);
        if(tip.nextElementSibling!==sup) col.insertBefore(sup, tip.nextSibling);
      }
      try{
        var wL=Math.ceil(col.getBoundingClientRect().width)+10;
        if(wL<40) wL=40;
        document.documentElement.style.setProperty("--bpp-hl472", wL+"px");
      }catch(e){}
    }

    /* --- Rechts: Sprache / Stil / Atma (DOM: Atma vor Stil → v460 last=theme) --- */
    var theme=document.getElementById("bppTheme");
    var langBox=document.querySelector("#bppTopRight460 .lang")||document.querySelector("header .lang")||document.querySelector(".lang.l307");
    var wrap=document.getElementById("bppTopRight460");
    if(theme&&langBox){
      if(!wrap){
        wrap=document.createElement("div"); wrap.id="bppTopRight460";
        (document.body||document.documentElement).appendChild(wrap);
      }
      if(langBox.parentNode!==wrap || wrap.firstElementChild!==langBox){
        wrap.insertBefore(langBox, wrap.firstChild);
      }
      var a=ensureAtma();
      /* theme muss lastElementChild bleiben (v460); Atma davor, optisch order:2 darunter */
      if(theme.parentNode!==wrap) wrap.appendChild(theme);
      if(a.parentNode!==wrap || a.nextElementSibling!==theme){
        wrap.insertBefore(a, theme);
      }
      if(wrap.lastElementChild!==theme) wrap.appendChild(theme);
      try{
        var wR=Math.ceil(wrap.getBoundingClientRect().width)+14;
        if(wR<56) wR=56;
        document.documentElement.style.setProperty("--bpp-tr472", wR+"px");
        document.documentElement.style.setProperty("--bpp-tr460", wR+"px");
      }catch(e){}
    }
  }

  setInterval(function(){ try{ paint(); }catch(e){} },200);
  window.addEventListener("load", function(){ try{ paint(); }catch(e){} });
  try{ paint(); }catch(e){}
})();
