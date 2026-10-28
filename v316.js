/* [Grok.com] Help-Icon links, Hover erklärt, Titel zentriert. */
window.BPP_BUILD="3.16"; window.BPP_SHOW="3.16";
(function(){
  var T={de:"Hilfe",en:"Help",fr:"Aide",es:"Ayuda",ru:"Помощь",hi:"सहायता",pt:"Ajuda",cz:"Nápověda"};
  var st=document.createElement("style");
  /* [Grok-Bot] V4.60: #bppTheme-Position nur noch in v460.js (unter Sprachwahl) */
  st.textContent="header{position:relative}"+
    "header h1{text-align:center!important;margin:0;display:block!important}"+
    "#bppHelpTip{position:absolute;left:8px;top:14px;width:22px;height:22px;border:1px solid #6b5340;border-radius:50%;background:#4a372b;color:#c9a560;font:600 .75rem/22px system-ui,sans-serif;text-align:center;cursor:pointer;z-index:10}"+
    "#bppHelpTip:hover{color:#e0b45a;border-color:#e0b45a}"+
    "h1 .lang.l307{position:absolute!important;top:8px!important;right:8px!important;transform:none!important;z-index:10}";
  document.head.appendChild(st);
  function L(){ return (typeof lang!=="undefined"&&T[lang])?lang:"en"; }
  function pos(){
    /* [Grok-Bot] V4.60: Top-rechts-Stack (Sprache+Stil) steuert v460.js allein */
    if(document.getElementById("bppTopRight460")) return;
    var lang=document.querySelector(".lang.l307");
    if(lang){ lang.style.cssText="position:fixed!important;top:8px!important;right:8px!important;z-index:100"; }
  }
  setInterval(pos,200);
  setInterval(function(){
    var h=document.querySelector("header h1"); if(!h) return;
    var b=document.getElementById("bppHelpTip");
    if(!b){ b=document.createElement("span"); b.id="bppHelpTip"; b.setAttribute("role","button"); b.tabIndex=0; b.textContent="?";
      b.addEventListener("click",function(e){ e.preventDefault(); e.stopPropagation(); if(typeof window.bppHelp==="function") window.bppHelp(); },true);
      b.addEventListener("keydown",function(e){ if(e.key==="Enter"){ e.preventDefault(); b.click(); } });
      h.parentNode.insertBefore(b,h); }
    b.title=T[L()];
  },400);
})();
