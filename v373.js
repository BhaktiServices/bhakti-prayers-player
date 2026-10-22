/* [Grok-Bot] V3.73: Handy (pointer:coarse, kuerzere Bildschirmseite <= 600 px): Tipp auf "Groß" -> Vollbild (v183.js) + kurz lock("landscape").
   Nach 3 s, oder frueher sobald der Lagesensor "hochkant gehalten" meldet, wird die Sperre komplett geloest (unlock, keine Hochformat-Sperre),
   damit sich die Grossansicht frei mit dem Handy dreht. Beim Verlassen der Grossansicht ebenfalls unlock. Ersetzt v372.js; die zweite
   Sperre aus v349.js ist abgeschaltet. iOS: Sensor-Erlaubnis im selben Tipp, ohne Lock einfach aktuelle Lage. Desktop unveraendert. */
/* [Grok-Bot] V3.75: Sperrdauer 6 s, Sensor-Freigabe entfernt. */
(function(){
  if(window.bppV373) return; window.bppV373=1;
  var coarse=window.matchMedia("(pointer:coarse)");
  function phone(){ return coarse.matches && Math.min(screen.width||9999, screen.height||9999)<=600; }
  var run=0;
  function so(){ return screen.orientation; }
  function free(){ try{ var o=so(); if(o && typeof o.unlock==="function") o.unlock(); }catch(e){} window.bppV373Free=(window.bppV373Free||0)+1; }
  function perm(){ [window.DeviceOrientationEvent, window.DeviceMotionEvent].forEach(function(E){
    try{ if(E && typeof E.requestPermission==="function") E.requestPermission().catch(function(){}); }catch(e){} }); }
  /* [Grok-Bot] V3.76: kein unlock() mehr in der Grossansicht (folgt bei ausgeschalteter Autorotation der Systemsperre -> Hochkant).
     6 s quer gesperrt, danach Lage per Sensor (devicemotion Schwerkraft bzw. deviceorientation) auswerten und mit Hysterese
     (neue Lage >= 0,8 s stabil) selbst lock("landscape") / lock("portrait") setzen. Ohne Sensordaten bleibt Querformat gesperrt. */
  function start(id){
    var o=so(); if(!o || typeof o.lock!=="function") return;
    var cur="landscape", cand=null, since=0, live=false;
    function lk(x){ try{ var p=o.lock(x); if(p&&p.catch) p.catch(function(){}); }catch(e){} cur=x; window.bppV376Cur=x; }
    function seen(x){ if(!live||id!==run||!x) return; if(x===cur){ cand=null; return; }
      var n=Date.now(); if(cand!==x){ cand=x; since=n; return; } if(n-since>=800){ cand=null; lk(x); } }
    function onM(e){ var a=e.accelerationIncludingGravity; if(!a||a.x==null||a.y==null) return; var x=Math.abs(a.x), y=Math.abs(a.y);
      seen(x>6&&x>y*1.5?"landscape":(y>6&&y>x*1.5?"portrait":null)); }
    function onO(e){ if(e.gamma==null||e.beta==null) return; var g=Math.abs(e.gamma), bt=Math.abs(e.beta);
      seen(g>60&&bt<35?"landscape":(bt>55&&g<30?"portrait":null)); }
    addEventListener("devicemotion", onM); addEventListener("deviceorientation", onO);
    lk("landscape");
    setTimeout(function(){ live=true; }, 6000);
    var w=setInterval(function(){ if(id!==run){ clearInterval(w); removeEventListener("devicemotion", onM); removeEventListener("deviceorientation", onO); }
      else if(cand && Date.now()-since>=800){ var c=cand; cand=null; lk(c); } }, 200);
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
