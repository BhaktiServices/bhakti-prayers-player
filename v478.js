/* [Grok-Bot] V4.78: Buttons Versions-Historie (#bppHist421) und Quellen (#btnDet) ausblenden.
   Grok.com hatte nur h1 .ver und #bppSrcEnd #btnDet versteckt; Footer-Quellen blieb via v443 sichtbar.
   Alleinige Sichtbarkeitsquelle fuer diese beiden Elemente: v478 (critical:false). */
(function(){
  if(window.bppV478) return; window.bppV478=1;
  var st=document.createElement("style");
  st.id="bppV478css";
  st.textContent=
    "#bppHist421,#bppFoot426 #bppHist421{display:none!important}"+
    "#btnDet,#bppFoot426 #btnDet,#bppSrcEnd #btnDet,#bppL6 #btnDet{display:none!important}"+
    "body.show-det #bppSrcInfo{display:none!important}";
  document.head.appendChild(st);
  function hide(){
    ["bppHist421","btnDet"].forEach(function(id){
      var el=document.getElementById(id); if(!el) return;
      el.style.setProperty("display","none","important");
      el.setAttribute("hidden","true");
      el.setAttribute("aria-hidden","true");
    });
    try{ document.body.classList.remove("show-det"); }catch(e){}
  }
  hide();
  document.addEventListener("DOMContentLoaded", hide);
  setInterval(hide, 1500);
})();
