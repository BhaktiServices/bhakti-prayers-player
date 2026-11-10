/* [Grok-Bot] V5.22: Seeks und Play an der nativen <audio controls>-Leiste sind manuelle Aktionen.
   Ursache: Der V5.13-Watchdog verwirft currentTime-Sets ohne bppAllowSeek513, sobald ein Resume
   gelaufen ist. Die native Leiste setzt currentTime direkt; pointerdown aus dem UA-Schatten der
   Controls trifft #a nicht immer, und 2,5 s Freigabe reichen beim Ziehen einer langen Seekbar nicht.
   Dann bleibt die App z. B. auf Strophe 10 stehen, während die Leiste 18:07 zeigt; bei Pause folgt
   Mitlesen nicht, weil autoLineFromTime nur bei isPlaying() läuft. Fix: Interaktion mit #a und eine
   Nutzer-Geste an der Audio-Leiste gelten als manuelle Seeks; Mitlesen folgt currentTime auch nach
   einem Seek in Pause; der Play-Knopf spiegelt den echten Audio-Zustand. Automatische Seeks ohne
   Geste bleiben vom Watchdog gesperrt. critical=true. */
window.BPP_BUILD="5.22"; window.BPP_SHOW="5.22";
(function(){
  if(window.bppV522) return; window.bppV522=1;

  function now(){ return Date.now(); }
  var down=false;
  var audioUntil=0;
  var audioTouched=false;

  function allow(why, ms){
    try{ if(typeof window.bppAllowSeek513==="function") window.bppAllowSeek513(why||"native-audio", ms==null?8000:ms); }catch(e){}
    audioUntil=now()+(ms==null?8000:ms);
    audioTouched=true;
  }

  /* Nur Gesten an der Audio-Leiste (nicht jeder beliebige Klick auf der Seite). */
  window.bppUserSeekOk513=function(){
    try{
      if(down) return true;
      if(now()<audioUntil) return true;
    }catch(e){}
    return false;
  };

  function onAudio(t, ev){
    var a=document.getElementById("a"); if(!a||!t) return false;
    if(t===a) return true;
    try{ if(t.closest && t.closest("#a")) return true; }catch(e){}
    try{ if(ev && ev.composedPath && ev.composedPath().indexOf(a)>=0) return true; }catch(e){}
    return false;
  }

  function onDown(e){
    if(onAudio(e.target, e)){ down=true; allow("native-audio", 8000); }
  }
  function onMove(){
    if(down) allow("native-audio-drag", 8000);
  }
  function onUp(){
    if(!down) return;
    down=false;
    allow("native-audio-up", 3000);
  }
  ["pointerdown","mousedown","touchstart"].forEach(function(n){ document.addEventListener(n, onDown, true); });
  ["pointermove","mousemove"].forEach(function(n){ document.addEventListener(n, onMove, true); });
  ["pointerup","mouseup","touchend","pointercancel","lostpointercapture"].forEach(function(n){ document.addEventListener(n, onUp, true); });

  function followNow(){
    try{
      if(typeof autoScroll==="undefined"||!autoScroll||typeof i==="undefined"||i<0) return;
      var held=0, hadHold=false;
      try{ if(typeof holdLineUntil!=="undefined"){ hadHold=true; held=holdLineUntil; holdLineUntil=0; } }catch(e){}
      var p=typeof songProgress==="function"?songProgress():null;
      if(!p||!p.gs||!p.gs.length) return;
      var k=typeof stanzaFromProgress==="function"?stanzaFromProgress(p):null;
      if(k==null||k<0) return;
      if(k>p.gs.length-1) k=p.gs.length-1;
      if(!p.gs[k]) return;
      var start=p.gs[k].start;
      if(typeof line!=="undefined" && start!==line){
        line=start;
        try{ if(typeof persistNow==="function") persistNow(); }catch(e){}
        if(typeof paintLyrics==="function") paintLyrics();
        setTimeout(function(){ try{ if(typeof pinStanza==="function") pinStanza(); }catch(e){} }, 30);
      }
      if(hadHold){ try{ holdLineUntil=held; }catch(e){} }
    }catch(e){}
  }

  function syncBtn(){
    try{ if(typeof syncPlayBtn==="function") syncPlayBtn(); }catch(e){}
    try{ if(window.bppV358) bppV358(); }catch(e){}
  }

  function hookAudio(){
    var a=document.getElementById("a"); if(!a||a.__bpp522) return;
    a.__bpp522=1;
    /* seeking nur dann als manuell werten, wenn gerade eine Nutzer-Geste aktiv ist
       (native Leiste). Kein pauschales bppAllowSeek513 – das würde den Watchdog aushebeln. */
    a.addEventListener("pointerdown", function(){ down=true; allow("native-audio-el", 8000); }, true);
    a.addEventListener("pointerup", function(){ if(down){ down=false; allow("native-audio-el-up", 3000); } }, true);
    a.addEventListener("seeking", function(){
      try{
        if(down || now()<audioUntil) allow("audio-user-seeking", 4000);
      }catch(e){}
    }, true);
    a.addEventListener("seeked", function(){
      syncBtn();
      followNow();
      try{ if(typeof bppFixStanza==="function") bppFixStanza(); }catch(e){}
    }, true);
    ["play","pause","playing","ended"].forEach(function(ev){
      a.addEventListener(ev, syncBtn, true);
    });
  }
  hookAudio();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", hookAudio);
  setInterval(hookAudio, 1200);
})();
