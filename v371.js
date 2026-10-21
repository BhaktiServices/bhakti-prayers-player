/* [Grok-Bot] V3.71: Handy (pointer:coarse, kleine Bildschirmseite <= 600 px): Drehen ins Querformat schaltet automatisch in die Grossansicht.
   Drehen ins Hochformat schaltet nicht zurueck (Gross im Hochformat ist erwuenscht); Wechsel per Knopf wie bisher. Groß-Knopf bleibt ueberall.
   Wiedergabe und Mitlesen laufen beim Drehen weiter (nur das Overlay geht auf). */
window.BPP_BUILD="3.71"; window.BPP_SHOW="3.71";
(function(){
  if(window.bppV371) return; window.bppV371=1;
  var coarse=window.matchMedia("(pointer:coarse)"), land=window.matchMedia("(orientation:landscape)");
  function phone(){ var s=Math.min(screen.width||9999, screen.height||9999); return coarse.matches && s<=600; }
  var last=land.matches, pend=false;
  function sync(){
    var q=land.matches;
    if(q!==last){ last=q; pend=q; }
    if(!pend) return;
    if(!phone()){ pend=false; return; }
    var S=window.bppFsState?window.bppFsState():null; if(!S) return;
    if(S.on){ pend=false; return; }
    if(window.bppFsOpen){ window.bppFsOpen(); if(window.bppFsState().on) pend=false; }
  }
  function soon(){ setTimeout(sync,60); setTimeout(sync,400); }
  try{ land.addEventListener("change", soon); }catch(e){ land.addListener(soon); }
  addEventListener("orientationchange", soon);
  setInterval(sync,1000);
})();
