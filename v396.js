/* [Grok-Bot] V3.96: Gross am Handy wieder quer. v373.js ruft lock("landscape") 50 ms nach dem Tipp auf; ist das Vollbild dann noch nicht aktiv
   (echtes Android braucht laenger), lehnt der Browser ab und es gab keinen zweiten Versuch. Jetzt: nach Eintritt ins Vollbild bis ca. 1,5 s
   mehrfach lock("landscape"), bis es klappt. Sensor-Logik aus v373.js bleibt unveraendert. */
window.BPP_BUILD="3.96"; window.BPP_SHOW="3.96";
(function(){
  if(window.bppV396) return; window.bppV396=1;
  var coarse=window.matchMedia("(pointer:coarse)"), t=0;
  function phone(){ return coarse.matches && Math.min(screen.width||9999, screen.height||9999)<=600; }
  function go(){ var o=screen.orientation; if(!o||typeof o.lock!=="function"||!document.fullscreenElement) return;
    var n=0, ok=false; (function k(){ if(ok||n++>5||!document.fullscreenElement) return;
      try{ var p=o.lock("landscape"); if(p&&p.then) p.then(function(){ ok=true; window.bppV396Ok=1; },function(){ setTimeout(k,250); }); else ok=true; }catch(e){ setTimeout(k,250); } })(); }
  document.addEventListener("click",function(e){ if(e.target&&e.target.closest&&e.target.closest("#btnFs")&&phone()){ t=Date.now(); setTimeout(go,300); } },true);
  document.addEventListener("fullscreenchange",function(){ if(document.fullscreenElement&&Date.now()-t<2000) go(); });
})();
