/* [Grok-Bot] V4.86: Nach „Prayers runterladen“ naechstes Stueck ohne Netz.
   Ursache: v248/v470 setzen vor play() preferFile aus bpp-src zurueck (YT) – trotz Cache
   startet YouTube (braucht Internet). Fix: bei Cache-Treffer oder offline immer MP3
   (showYt abfangen, play nachziehen); SW App bei offline cache-first; version.json
   offline nicht blockieren. critical=false. */
window.BPP_BUILD="4.86"; window.BPP_SHOW="4.86";
(function(){
  if(window.bppV486) return; window.bppV486=1;
  var AUD="bpp-audio-v2";
  function audioKey(p){
    try{
      var u=new URL(p, location.href);
      if(u.origin!==location.origin) return null;
      if(!/\/audio\/[^\/]+\.mp3$/i.test(u.pathname)) return null;
      return u.origin+u.pathname;
    }catch(e){ return null; }
  }
  function hasAud(P){
    if(!P||!P.audio) return false;
    var k=audioKey(P.audio);
    return !!(k && window.__bppAudHave && window.__bppAudHave[k]);
  }
  function refreshHave(){
    if(!("caches" in window)) return Promise.resolve();
    return caches.open(AUD).then(function(c){ return c.keys(); }).then(function(ks){
      var H=window.__bppAudHave||{};
      ks.forEach(function(q){
        try{ var u=new URL(q.url); if(/\/audio\/[^\/]+\.mp3$/i.test(u.pathname)) H[u.origin+u.pathname]=1; }catch(e){}
      });
      window.__bppAudHave=H;
    }).catch(function(){});
  }
  function forceMp3(P){
    if(!P||!P.audio) return false;
    if(!navigator.onLine || hasAud(P)){
      try{ P.preferFile=true; }catch(e){}
      return true;
    }
    return false;
  }
  function useFile(P, pos){
    if(!P||!P.audio) return;
    forceMp3(P);
    try{ if(typeof pendingSeek==="number" && pos!=null) pendingSeek=pos; }catch(e){}
    try{ if(typeof showFile==="function") showFile(P); }catch(e){}
  }

  /* showYt: bei Offline oder Cache-Treffer nie YouTube */
  function wrapShowYt(){
    var names=["showYt"];
    names.forEach(function(){});
    function install(fn, assign){
      if(!fn||fn._bpp486) return fn;
      var orig=fn._bpp486Orig||fn;
      function wrapped(P, startSec){
        P=P||(typeof PRAYERS!=="undefined"&&typeof i==="number"&&PRAYERS[i]);
        if(P && P.audio && (!navigator.onLine || hasAud(P))){
          useFile(P, startSec);
          return;
        }
        return orig.apply(this, arguments);
      }
      wrapped._bpp486=1; wrapped._bpp486Orig=orig;
      assign(wrapped);
      return wrapped;
    }
    try{ if(typeof showYt==="function") install(showYt, function(w){ showYt=w; }); }catch(e){}
    try{ if(typeof window.showYt==="function") install(window.showYt, function(w){ window.showYt=w; }); }catch(e){}
  }

  /* play: NACH inneren apply()-Resets erneut MP3 erzwingen */
  function wrapPlay(){
    var op=window.play;
    if(typeof op!=="function") return;
    if(op._bpp486outer) return;
    var w=function(idx, resume, auto){
      var P=(typeof PRAYERS!=="undefined")?PRAYERS[idx]:null;
      forceMp3(P);
      var r=op.apply(this, arguments);
      try{
        P=PRAYERS[idx]||P;
        if(auto!==false && P && P.audio && (!navigator.onLine || hasAud(P))){
          forceMp3(P);
          var yt=false; try{ yt=!!ytOn; }catch(e){}
          var a=document.getElementById("a");
          var src=(a&&(a.getAttribute("src")||a.currentSrc))||"";
          if(yt || !src || /youtube/i.test(src)) useFile(P, null);
          else {
            /* preferFile konnte von v248 zurueckgesetzt worden sein – Datei trotzdem halten */
            try{ if(a && P.audio && a.getAttribute("src")!==String(P.audio).split("?")[0] && !/\/audio\//.test(src)) useFile(P, null); }catch(e){}
          }
        }
      }catch(e){}
      return r;
    };
    w._bpp486outer=1;
    /* innere Kette behalten */
    window.play=w;
  }

  /* showFile.onerror: offline/cached nicht zu YouTube */
  function patchShowFile(){
    if(typeof showFile!=="function" || showFile._bpp486) return;
    var orig=showFile;
    function wrapped(P){
      var a=document.getElementById("a");
      var r=orig.apply(this, arguments);
      try{
        if(a){
          a.onerror=function(){
            if(!navigator.onLine || hasAud(P)){
              try{ if(window.bppToast470){/*noop*/} }catch(e){}
              return;
            }
            try{ if(P&&P.youtube && typeof showYt==="function") showYt(P, (typeof pendingSeek==="number"?pendingSeek:0)||P.youtubeStart); }catch(e){}
          };
        }
      }catch(e){}
      return r;
    }
    wrapped._bpp486=1;
    try{ showFile=wrapped; }catch(e){}
    try{ window.showFile=wrapped; }catch(e){}
  }

  /* version.json-Check offline still */
  function quietUpdate(){
    try{
      if(typeof window.bppCheckUpdate459==="function" && !window.bppCheckUpdate459._bpp486){
        var c=window.bppCheckUpdate459;
        window.bppCheckUpdate459=function(){ if(!navigator.onLine) return; return c.apply(this, arguments); };
        window.bppCheckUpdate459._bpp486=1;
      }
    }catch(e){}
  }

  function onOffline(){
    try{
      if(typeof PRAYERS!=="undefined") PRAYERS.forEach(function(P){ if(P.audio) try{ P.preferFile=true; }catch(e){} });
    }catch(e){}
    try{
      if(typeof ytOn!=="undefined" && ytOn){
        var P=(typeof i==="number"&&PRAYERS)?PRAYERS[i]:null;
        if(P&&P.audio) useFile(P, null);
      }
    }catch(e){}
  }

  function boot(){
    refreshHave();
    wrapShowYt();
    wrapPlay();
    patchShowFile();
    quietUpdate();
  }
  boot();
  setInterval(function(){ wrapShowYt(); wrapPlay(); patchShowFile(); quietUpdate(); refreshHave(); }, 700);
  window.addEventListener("offline", onOffline);
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", boot);
  window.addEventListener("bpp-lang", refreshHave);
  /* nach Download-Status */
  setInterval(function(){
    try{
      var S=window.bppOfflineState;
      if(S&&S.complete) refreshHave();
    }catch(e){}
  }, 2000);
})();
