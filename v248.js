/* [Grok-Bot] V2.48: MP3 ist bei allen Gebeten mit MP3 die Standardquelle, YouTube nur ohne MP3 oder wenn der Nutzer aktiv "YT" gewaehlt hat
   (gespeichert in bpp-src). Hinweis "Standard ist YouTube ..." entfernt (alle Sprachen). */
window.BPP_BUILD="2.49"; window.BPP_SHOW="2.49";
(function(){
  if(typeof PRAYERS==="undefined") return;
  function src(){ try{ return JSON.parse(localStorage.getItem("bpp-src")||"{}")||{}; }catch(e){ return {}; } }
  function apply(){
    var ch=src();
    PRAYERS.forEach(function(P){
      if(P.audio) P.preferFile=!(ch[P.id]==="yt" && P.youtube);
      Object.keys(P).forEach(function(k){ if(/^hinweis/.test(k) && /Standard ist YouTube|YouTube is the default/.test(String(P[k]))) P[k]=""; });
    });
  }
  apply();
  document.addEventListener("DOMContentLoaded", apply);
  window.addEventListener("load", apply);
  var pl=window.play;
  if(typeof pl==="function") window.play=function(){ apply(); return pl.apply(this, arguments); };
  else document.addEventListener("DOMContentLoaded", function(){ var p2=window.play; if(typeof p2==="function") window.play=function(){ apply(); return p2.apply(this, arguments); }; });
})();
