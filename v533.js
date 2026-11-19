/* [Grok-Bot] V5.33: Mitsingen bleibt nach Ruhemodus/Standby an der Aufnahme.
   Ursache (nachgestellt): Nach dem Aufwachen ist das Netz kurz weg oder langsam. Der Service Worker
   lieferte dann Skripte aus dem Cache per ignoreSearch – auch ALTE Fassungen (v307.js ohne V5.30-Fix)
   oder gar keine (v530–v532 fehlten). index.html war neu, der Rest alt → dieselbe Hängepartie wie vor
   V5.30 (Normalansicht bleibt stehen, Groß läuft weiter). sw.js V5.33 behebt die Ursache, index.html
   heilt einen schon geladenen Mischstand einmalig.
   Dieses Modul ist das Sicherheitsnetz: Die Markierung richtet sich immer nach audio.currentTime.
   - Aufwachen erkennen (Zeitlücke im Takt, visibilitychange, pageshow, resume, focus, online):
     veraltete Sperren lösen (holdLineUntil, v307-Hold, bppSeekPending, manualShift) und neu ausrichten.
   - Bei playing/seeked/play neu ausrichten.
   - Wächter: Weicht die markierte Strophe beim Abspielen länger als 1,2 s von der Strophe zur
     Medienzeit ab und gibt es keine frische Handbedienung, wird neu ausgerichtet. Manuelles Blättern
     behält Vorrang, bis die Zeit-Strophe wechselt (wie V3.07).
   - Netzfehler der Aufnahme nach dem Aufwachen: Quelle an derselben Stelle neu laden.
   Keine Daten/Timings geändert, kein Layout, keine Knopffarben. critical=true. */
window.BPP_BUILD="5.33"; window.BPP_SHOW="5.33";
(function(){
  if(window.bppV533) return; window.bppV533=1;

  var lastTick=Date.now(), hiddenAt=0, mismatchSince=0, manualSeen=0, manualK=null, pendSince=0, lastGoodT=0, lastWake=0;

  function now(){ return Date.now(); }
  function media(){ return document.getElementById("a"); }
  function ready(){
    try{ return typeof PRAYERS!=="undefined" && typeof i!=="undefined" && i>=0 && typeof line!=="undefined"; }catch(e){ return false; }
  }
  function playing(){ try{ return typeof isPlaying==="function" && !!isPlaying(); }catch(e){ return false; } }
  function autoOn(){ try{ return typeof autoScroll!=="undefined" && !!autoScroll; }catch(e){ return false; } }

  /* Strophe zur Medienzeit – dieselbe Quelle wie V5.32 (bppStanzaNow), sonst songProgress */
  function target(){
    try{
      if(typeof window.bppStanzaNow==="function"){
        var s=window.bppStanzaNow();
        if(s) return {k:s.k, start:s.start};
      }
      var p=songProgress(); if(!p||!p.gs||!p.gs.length) return null;
      var k=stanzaFromProgress(p); if(k==null||k<0) k=0; if(k>p.gs.length-1) k=p.gs.length-1;
      return {k:k, start:p.gs[k]?p.gs[k].start:0};
    }catch(e){ return null; }
  }
  function curK(){ try{ return currentGroupIndex(); }catch(e){ return null; } }

  function releaseHolds(){
    try{ holdLineUntil=0; }catch(e){}
    try{ if(typeof window.bppReleaseHold307==="function") window.bppReleaseHold307(); }catch(e){}
    try{ window.bppSeekPending=false; }catch(e){}
    try{ manualShift=0; }catch(e){}
    try{ if(window.bppFsRelease) window.bppFsRelease(); }catch(e){}
    pendSince=0;
  }

  function align(why){
    if(!ready()||!autoOn()) return false;
    var tg=target(); if(!tg) return false;
    if(typeof line!=="undefined" && line!==tg.start){
      line=tg.start;
      try{ if(typeof persistNow==="function") persistNow(); }catch(e){}
      try{ if(typeof paintLyrics==="function") paintLyrics(); }catch(e){}
      setTimeout(function(){ try{ if(typeof pinStanza==="function") pinStanza(); }catch(e){} }, 30);
      try{ window.bppAlign533={why:why, at:now(), k:tg.k}; }catch(e){}
      return true;
    }
    return false;
  }

  /* frische Handbedienung? (Blättern, Pfeile, Tipp). Vorrang, bis die Zeit-Strophe wechselt. */
  function manualActive(tg){
    var m=+window.bppManualAt||0;
    if(m && m!==manualSeen){ manualSeen=m; manualK=tg?tg.k:null; }
    if(!m) return false;
    if(now()-m<4000) return true;
    if(manualK!=null && tg && tg.k===manualK && now()-m<120000) return true;
    return false;
  }
  function seekPendingActive(){
    if(!window.bppSeekPending){ pendSince=0; return false; }
    if(!pendSince) pendSince=now();
    return now()-pendSince<5000; /* v347 hält höchstens ~2 s */
  }

  function recoverMedia(){
    var a=media(); if(!a) return;
    try{
      if(!a.error || a.error.code!==2 || !a.getAttribute("src")) return; /* nur Netzfehler */
      var t=a.currentTime||lastGoodT||0;
      a.load();
      a.addEventListener("loadedmetadata", function(){
        try{ if(typeof window.bppAllowSeek513==="function") window.bppAllowSeek513("wake-recover", 3000); }catch(e){}
        try{ if(t>1 && isFinite(a.duration) && t<a.duration-1) a.currentTime=t; }catch(e){}
        try{ if(typeof syncPlayBtn==="function") syncPlayBtn(); }catch(e){}
      }, {once:true});
    }catch(e){}
  }

  function wake(why){
    if(now()-lastWake<800) return;
    lastWake=now();
    /* Sperren aus der Zeit vor dem Schlaf sind veraltet – außer der Nutzer hat gerade selbst geblättert */
    var m=+window.bppManualAt||0;
    if(!(m && now()-m<3000)) releaseHolds();
    recoverMedia();
    align("wake:"+why);
    setTimeout(function(){ if(playing()) align("wake2:"+why); }, 700);
  }
  window.bppWake533=wake;

  function soon(why){
    setTimeout(function(){
      var tg=target();
      if(manualActive(tg)||seekPendingActive()) return;
      if(playing()) align(why);
    }, 150);
  }

  /* Takt: erkennt Ruhemodus an der Zeitlücke und wacht über die Markierung */
  setInterval(function(){
    var t=now(), gap=t-lastTick; lastTick=t;
    if(gap>4000) wake("gap");
    try{ var a=media(); if(a && !a.error && isFinite(a.currentTime) && a.currentTime>0) lastGoodT=a.currentTime; }catch(e){}
    if(!ready()||!autoOn()||!playing()){ mismatchSince=0; return; }
    var tg=target(); if(!tg){ mismatchSince=0; return; }
    var ck=curK();
    if(ck==null || ck===tg.k){ mismatchSince=0; return; }
    if(manualActive(tg) || seekPendingActive()){ mismatchSince=0; return; }
    if(!mismatchSince){ mismatchSince=t; return; }
    if(t-mismatchSince>=1200){
      mismatchSince=0;
      releaseHolds();
      align("watch");
    }
  }, 400);

  /* Tab nur kurz weg: nichts lösen; länger verdeckt (Deckel zu, Standby): wie Aufwachen */
  document.addEventListener("visibilitychange", function(){
    if(document.hidden){ hiddenAt=now(); return; }
    var away=hiddenAt?now()-hiddenAt:0; hiddenAt=0;
    if(away>30000) wake("visible"); else soon("visible");
  });
  window.addEventListener("pageshow", function(e){ if(e && e.persisted) wake("pageshow"); });
  document.addEventListener("resume", function(){ wake("resume"); });
  window.addEventListener("online", function(){ wake("online"); });
  window.addEventListener("focus", function(){ soon("focus"); });

  function hook(){
    var a=media(); if(!a||a.__bpp533) return;
    a.__bpp533=1;
    ["playing","seeked","play"].forEach(function(n){ a.addEventListener(n, function(){ soon(n); }); });
  }
  hook();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", hook);
  setInterval(hook, 1500);
})();
