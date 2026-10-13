/* [Grok-Bot] V3.16: kleine Sprechblase "Hilfe – hier klicken" neben der Hauptueberschrift, oeffnet die Hilfe (Jukebox-Overlay) */
window.BPP_BUILD="3.16"; window.BPP_SHOW="3.16";
(function(){
  var T={de:"Hilfe – hier klicken",en:"Help – click here",fr:"Aide – cliquez ici",es:"Ayuda – haz clic aquí",ru:"Помощь – нажмите здесь",hi:"सहायता – यहाँ क्लिक करें"};
  var st=document.createElement("style");
  st.textContent="#bppHelpTip{position:relative;display:inline-block;vertical-align:middle;margin-left:12px;padding:2px 8px;border:1px solid #b8955088;border-radius:10px;color:#c9a560;background:#2a1f1688;"+
    "font:400 .72rem/1.4 system-ui,sans-serif;letter-spacing:0;text-transform:none;cursor:pointer;white-space:nowrap}"+
    "#bppHelpTip:before{content:'';position:absolute;left:-6px;top:50%;margin-top:-4px;border:4px solid transparent;border-right:6px solid #b8955088;border-left:0}"+
    "#bppHelpTip:hover{color:#e0b45a;border-color:#e0b45a}"+
    "@media(max-width:600px){#bppHelpTip{display:block;width:max-content;margin:3px auto 0!important;font-size:.68rem}#bppHelpTip:before{left:50%;margin-left:-4px!important;top:-6px;margin:0;border:4px solid transparent;border-bottom:6px solid #b8955088;border-top:0}}";
  document.head.appendChild(st);
  function L(){ return (typeof lang!=="undefined"&&T[lang])?lang:"en"; }
  setInterval(function(){
    var h=document.querySelector("header h1"); if(!h) return;
    var b=document.getElementById("bppHelpTip");
    if(!b){ b=document.createElement("span"); b.id="bppHelpTip"; b.setAttribute("role","button"); b.tabIndex=0;
      b.addEventListener("click",function(e){ e.preventDefault(); e.stopPropagation(); if(typeof window.bppHelp==="function") window.bppHelp(); },true);
      b.addEventListener("keydown",function(e){ if(e.key==="Enter"){ e.preventDefault(); b.click(); } });
      var v=h.querySelector(".ver"); if(v&&v.nextSibling) h.insertBefore(b,v.nextSibling); else h.appendChild(b); }
    if(b.textContent!==T[L()]) b.textContent=T[L()];
  },400);
})();
