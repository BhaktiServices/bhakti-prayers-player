/* [Grok-Bot] V5.30: Nach Wiederholen desselben Prayers (↻1 Prayer: ended → currentTime=0 → play)
   folgt die Normalansicht wieder den Lyrics. Ursache: Dieser Pfad ruft play(idx) nicht auf.
   Eine offene Hold-Sperre (holdLineUntil, oft aus manuellem Blättern) und der V5.22-Seek-Handler,
   der die Sperre nach dem Rücksprung wiederherstellt, lassen autoLineFromTime auf Strophe 1
   stehen, während Groß autoK() die Zeit direkt liest und weiter mitläuft.
   Fix: Rücksprung an den Anfang erkennt, Sperre lösen, line an die Medienzeit binden, Mitlesen
   neu anstoßen. Auch bei „Alle“/Listen-Wechsel unschädlich. critical=true. */
window.BPP_BUILD="5.30"; window.BPP_SHOW="5.30";
(function(){
  if(window.bppV530) return; window.bppV530=1;

  var lastT=0, loopAt=0, rebindBusy=0;

  function media(){ return document.getElementById("a"); }
  function now(){ return Date.now(); }
  function isLoopJump(from, to, dur){
    if(!(from>2) || !(to<1.5)) return false;
    if(from-to<5) return false;
    if(from>10) return true;
    return !!(dur && isFinite(dur) && from>dur-8);
  }

  function releaseHolds(){
    try{ holdLineUntil=0; }catch(e){}
    try{ window.bppSeekPending=false; }catch(e){}
    try{ if(typeof window.bppReleaseHold307==="function") window.bppReleaseHold307(); }catch(e){}
    try{ manualShift=0; }catch(e){}
    try{ if(window.bppFsRelease) window.bppFsRelease(); }catch(e){}
  }

  window.bppRebindFollow530=function(why){
    if(rebindBusy && now()-rebindBusy<200) return;
    rebindBusy=now();
    loopAt=now();
    releaseHolds();
    try{
      if(typeof autoScroll==="undefined"||!autoScroll||typeof i==="undefined"||i<0) {
        /* auch ohne Mitsingen line an den Start setzen, sobald Zeit vorn ist */
      }
      var p=(typeof songProgress==="function")?songProgress():null;
      var st=0, k=0;
      if(p&&p.gs&&p.gs.length){
        k=(typeof stanzaFromProgress==="function")?stanzaFromProgress(p):0;
        if(k==null||k<0) k=0;
        if(k>p.gs.length-1) k=p.gs.length-1;
        st=p.gs[k]?p.gs[k].start:0;
      }
      if(typeof line!=="undefined") line=st;
      try{ if(typeof persistNow==="function") persistNow(); }catch(e){}
      try{ if(typeof paintLyrics==="function") paintLyrics(); }catch(e){}
      setTimeout(function(){ try{ if(typeof pinStanza==="function") pinStanza(); }catch(e){} }, 30);
      setTimeout(function(){ try{ if(typeof autoLineFromTime==="function") autoLineFromTime(); }catch(e){} }, 80);
    }catch(e){}
    /* V5.22 followNow stellt eine lange Hold-Sperre nach seeked wieder her – danach nochmal lösen */
    setTimeout(releaseHolds, 0);
    setTimeout(releaseHolds, 60);
    setTimeout(releaseHolds, 250);
  };

  function hook(a){
    if(!a||a.__bpp530) return;
    a.__bpp530=1;
    lastT=a.currentTime||0;
    function check(ev){
      var t=0, d=0;
      try{ t=a.currentTime||0; d=a.duration||0; }catch(e){}
      if(isLoopJump(lastT, t, d)){
        try{ if(typeof window.bppAllowSeek513==="function") window.bppAllowSeek513("prayer-loop", 2500); }catch(e){}
        window.bppRebindFollow530(ev||"jump");
      }
      lastT=t;
    }
    a.addEventListener("timeupdate", function(){ check("timeupdate"); });
    a.addEventListener("seeked", function(){ check("seeked"); });
    a.addEventListener("play", function(){ check("play"); });
    a.addEventListener("ended", function(){
      try{ lastT=a.currentTime||lastT; }catch(e){}
      setTimeout(function(){
        try{
          var t=a.currentTime||0;
          if(t<2 || (a.paused===false && t<5)) window.bppRebindFollow530("ended-loop");
        }catch(e){}
      }, 700);
    });
  }

  function hookAll(){ hook(media()); }

  /* Sicherheitsnetz: nach erkanntem Loop, wenn Mitsingen läuft, line an die Zeit koppeln */
  setInterval(function(){
    try{
      if(!loopAt || now()-loopAt>20000) return;
      if(typeof autoScroll==="undefined"||!autoScroll||typeof i==="undefined"||i<0) return;
      if(typeof isPlaying==="function"&&!isPlaying()) return;
      var p=(typeof songProgress==="function")?songProgress():null;
      if(!p||!p.gs||!p.gs.length) return;
      var k=(typeof stanzaFromProgress==="function")?stanzaFromProgress(p):null;
      if(k==null||k<0) return;
      if(k>p.gs.length-1) k=p.gs.length-1;
      var st=p.gs[k]&&p.gs[k].start;
      if(typeof st!=="number") return;
      if(typeof line!=="undefined" && st!==line){
        releaseHolds();
        line=st;
        try{ if(typeof persistNow==="function") persistNow(); }catch(e){}
        try{ if(typeof paintLyrics==="function") paintLyrics(); }catch(e){}
        setTimeout(function(){ try{ if(typeof pinStanza==="function") pinStanza(); }catch(e){} }, 30);
      }
    }catch(e){}
  }, 400);

  hookAll();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", hookAll);
  setInterval(hookAll, 1500);
})();
