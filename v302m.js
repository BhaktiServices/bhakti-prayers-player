/* [Grok-Bot] V3.02: Menue+/Menue- wie vor V3.01 (kleines Menue blendet Zusatztasten aus), Reihenfolge aus V3.01 bleibt */
(function(){
  var ids=["btnRep","btnPrev","btnNext","selRate","bppSrc195","btnSrc189","btnScDown","scLab","btnScUp","btnDe","xpBox","capoBox","btnBack10","btnFwd10"];
  var st=document.createElement("style");
  st.textContent=ids.map(function(i){return "body:not(.menu-full) .bar .r301 #"+i;}).join(",")+",body:not(.menu-full) .bar .r301>.sep{display:none!important}";
  document.head.appendChild(st);
})();
