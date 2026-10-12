/* [Grok-Bot] V3.02 Musikheft-Hinweis (#hint) nur bei "Herkunft, Quellen"; beim Start AUS */
window.BPP_BUILD="3.02"; window.BPP_SHOW="3.02";
(function(){
  var st=document.createElement("style");
  st.textContent="body:not(.show-det) #hint{display:none!important}#bppL6 #hint{display:block;margin:0;font-size:.8rem;color:var(--muted)}";
  document.head.appendChild(st);
  var n=0,t=setInterval(function(){
    var b=document.getElementById("btnDet"), l6=document.getElementById("bppL6"), h=document.getElementById("hint");
    if(b&&l6&&h){
      clearInterval(t);
      if(h.parentNode!==l6) l6.insertBefore(h, document.getElementById("foot")||null);
      if(document.body.classList.contains("show-det")) b.click(); /* Start-Default AUS, Zustand im Schalter bleibt synchron */
    } else if(++n>80) clearInterval(t);
  },150);
})();
