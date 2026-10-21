/* [Grok-Bot] V3.72: Handy (pointer:coarse, kuerzere Bildschirmseite <= 600 px): Tipp auf "Groß" oeffnet die Grossansicht im Vollbild
   (v183.js, requestFullscreen) und sperrt per screen.orientation.lock("landscape") ins Querformat. 3 s lang Lagesensor pruefen
   (deviceorientation |gamma|>60 bzw. devicemotion: Schwerkraft ueberwiegend auf der x-Achse). Haelt der Nutzer das Handy quer: Querformat bleibt.
   Sonst lock("portrait") (falls nicht moeglich: unlock) -> Grossansicht im Hochformat. Ohne Lock (iOS Safari): Grossansicht in aktueller Lage.
   iOS: DeviceOrientationEvent/DeviceMotionEvent.requestPermission im selben Tipp. Auto-Umschalten beim Drehen (V3.71) entfernt. Desktop unveraendert. */
window.BPP_BUILD="3.72"; window.BPP_SHOW="3.72";
(function(){
  if(window.bppV372) return; window.bppV372=1;
  var coarse=window.matchMedia("(pointer:coarse)");
  function phone(){ return coarse.matches && Math.min(screen.width||9999, screen.height||9999)<=600; }
  var run=0;
  function perm(){ [window.DeviceOrientationEvent, window.DeviceMotionEvent].forEach(function(E){
    try{ if(E && typeof E.requestPermission==="function") E.requestPermission().catch(function(){}); }catch(e){} }); }
  function decide(id){
    var so=screen.orientation; if(!so || typeof so.lock!=="function") return; /* iOS Safari: aktuelle Lage */
    var quer=0, hoch=0;
    function vote(q){ if(q===true) quer++; else if(q===false) hoch++; }
    function onO(e){ if(e.gamma==null||e.beta==null) return; var g=Math.abs(e.gamma), b=Math.abs(e.beta); vote(g>60?true:(b>45&&g<35?false:null)); }
    function onM(e){ var a=e.accelerationIncludingGravity; if(!a||a.x==null||a.y==null) return; var x=Math.abs(a.x), y=Math.abs(a.y);
      vote(x>6&&x>y*1.5?true:(y>6&&y>x*1.5?false:null)); }
    addEventListener("deviceorientation", onO); addEventListener("devicemotion", onM);
    so.lock("landscape").catch(function(){});
    setTimeout(function(){
      removeEventListener("deviceorientation", onO); removeEventListener("devicemotion", onM);
      if(id!==run) return;
      var S=window.bppFsState&&window.bppFsState(); if(!S||!S.on) return;
      window.bppV372Last={quer:quer, hoch:hoch};
      if(quer>0 && quer>=hoch) return; /* wirklich quer gehalten */
      so.lock("portrait").catch(function(){ try{ so.unlock(); }catch(e){} });
    }, 3000);
  }
  function hook(){
    var b=document.getElementById("btnFs"); if(!b || b._v372) return; b._v372=1;
    b.addEventListener("click", function(){ if(!phone()) return; perm(); var id=++run;
      setTimeout(function(){ var S=window.bppFsState&&window.bppFsState(); if(S&&S.on) decide(id); }, 50); }, true);
  }
  setInterval(hook,1000); document.addEventListener("DOMContentLoaded", hook);
  /* Beim Schliessen der Grossansicht Sperre loesen */
  document.addEventListener("fullscreenchange", function(){ if(!document.fullscreenElement){ run++; try{ screen.orientation && screen.orientation.unlock && screen.orientation.unlock(); }catch(e){} } });
  setInterval(function(){ var S=window.bppFsState&&window.bppFsState(); if(S&&!S.on&&window.bppV372Locked){ window.bppV372Locked=0; } },2000);
})();
