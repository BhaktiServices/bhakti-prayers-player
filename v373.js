/* [Grok-Bot] V3.73: Handy (pointer:coarse, kuerzere Bildschirmseite <= 600 px): Tipp auf "Groß" -> Vollbild (v183.js) + kurz lock("landscape").
   Nach 3 s, oder frueher sobald der Lagesensor "hochkant gehalten" meldet, wird die Sperre komplett geloest (unlock, keine Hochformat-Sperre),
   damit sich die Grossansicht frei mit dem Handy dreht. Beim Verlassen der Grossansicht ebenfalls unlock. Ersetzt v372.js; die zweite
   Sperre aus v349.js ist abgeschaltet. iOS: Sensor-Erlaubnis im selben Tipp, ohne Lock einfach aktuelle Lage. Desktop unveraendert. */
window.BPP_BUILD="3.73"; window.BPP_SHOW="3.73";
(function(){
  if(window.bppV373) return; window.bppV373=1;
  var coarse=window.matchMedia("(pointer:coarse)");
  function phone(){ return coarse.matches && Math.min(screen.width||9999, screen.height||9999)<=600; }
  var run=0;
  function so(){ return screen.orientation; }
  function free(){ try{ var o=so(); if(o && typeof o.unlock==="function") o.unlock(); }catch(e){} window.bppV373Free=(window.bppV373Free||0)+1; }
  function perm(){ [window.DeviceOrientationEvent, window.DeviceMotionEvent].forEach(function(E){
    try{ if(E && typeof E.requestPermission==="function") E.requestPermission().catch(function(){}); }catch(e){} }); }
  function start(id){
    var o=so(); if(!o || typeof o.lock!=="function") return;
    var hoch=0, done=false, t=null;
    function end(){ if(done) return; done=true; clearTimeout(t); removeEventListener("deviceorientation", onO); removeEventListener("devicemotion", onM); if(id===run) free(); }
    function onO(e){ if(e.gamma==null||e.beta==null) return; if(Math.abs(e.beta)>45&&Math.abs(e.gamma)<35&&++hoch>=3) end(); }
    function onM(e){ var a=e.accelerationIncludingGravity; if(!a||a.x==null||a.y==null) return; var x=Math.abs(a.x), y=Math.abs(a.y); if(y>6&&y>x*1.5&&++hoch>=3) end(); }
    addEventListener("deviceorientation", onO); addEventListener("devicemotion", onM);
    try{ var p=o.lock("landscape"); if(p&&p.catch) p.catch(function(){}); }catch(e){}
    t=setTimeout(end, 3000);
  }
  function hook(){
    var b=document.getElementById("btnFs"); if(!b || b._v373) return; b._v373=1;
    b.addEventListener("click", function(){ if(!phone()) return; perm(); var id=++run;
      setTimeout(function(){ var S=window.bppFsState&&window.bppFsState(); if(S&&S.on) start(id); }, 50); }, true);
  }
  setInterval(hook,1000); document.addEventListener("DOMContentLoaded", hook);
  var was=false;
  setInterval(function(){ var S=window.bppFsState&&window.bppFsState(), on=!!(S&&S.on); if(was&&!on){ run++; free(); } was=on; }, 300);
  document.addEventListener("fullscreenchange", function(){ if(!document.fullscreenElement){ run++; free(); } });
})();
