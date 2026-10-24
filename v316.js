/* [Grok.com] Help-Icon links, Hover erklärt, Titel zentriert. */
window.BPP_BUILD="3.16"; window.BPP_SHOW="3.16";
(function(){
  var T={de:"Hilfe",en:"Help",fr:"Aide",es:"Ayuda",ru:"Помощь",hi:"सहायता",pt:"Ajuda"};
  var st=document.createElement("style");
  st.textContent="header{position:relative}"+
    "header h1{text-align:center!important;margin:0;display:block!important}"+
    "#bppHelpTip{position:absolute;left:8px;top:14px;width:22px;height:22px;border:1px solid #6b5340;border-radius:50%;background:#4a372b;color:#c9a560;font:600 .75rem/22px system-ui,sans-serif;text-align:center;cursor:pointer;z-index:10}"+
    "#bppHelpTip:hover{color:#e0b45a;border-color:#e0b45a}";
  document.head.appendChild(st);
  function L(){ return (typeof lang!=="undefined"&&T[lang])?lang:"en"; }
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
