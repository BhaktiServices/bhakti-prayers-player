/* [Grok-Bot] V4.59: Auto-Update fuer offene Player.
   version.json (cache:no-store) pruefen: Start, visibilitychange/focus, alle ~5 min.
   Bei neuerer Version: serviceWorker.update(), skipWaiting, clients.claim (SW), dann Reload.
   Sofort wenn nicht abgespielt wird; sonst nach pause/ended. critical:true -> sofort auch beim Spielen
   (nach kurzem Persist). Position/Prayer via persistNow + bpp-mem und optional Share-URL.
   Eine Quelle; ersetzt den deaktivierten Hinweis in v177.js. */
window.BPP_BUILD="4.59"; window.BPP_SHOW="4.59";
(function(){
  if(window.bppV459) return; window.bppV459=1;
  var pending=null, reloading=0, timer=null;
  function verParts(s){ return String(s||"0").split(".").map(function(x){ return parseInt(x,10)||0; }); }
  function newer(a,b){
    var A=verParts(a), B=verParts(b), i, n=Math.max(A.length,B.length);
    for(i=0;i<n;i++){ var x=A[i]||0, y=B[i]||0; if(x>y) return true; if(x<y) return false; }
    return false;
  }
  function playing(){
    try{
      if(typeof isPlaying==="function") return !!isPlaying();
      if(typeof ytOn!=="undefined"&&ytOn) return !!ytPlaying;
      var a=document.getElementById("a");
      return !!(a&&a.src&&!a.paused&&!a.ended);
    }catch(e){ return false; }
  }
  function keepState(){
    try{ if(typeof persistNow==="function") persistNow(); }catch(e){}
    try{
      var u=window.bppShareLink420&&bppShareLink420();
      if(u&&u.indexOf("?")>=0) history.replaceState(null,"",u);
    }catch(e){}
  }
  function doReload(){
    if(reloading) return; reloading=1;
    keepState();
    try{
      if(navigator.serviceWorker&&navigator.serviceWorker.controller){
        navigator.serviceWorker.controller.postMessage({type:"bpp-skip-waiting"});
      }
    }catch(e){}
    setTimeout(function(){ location.reload(); }, 120);
  }
  function armWait(){
    if(!pending||pending.waitBound) return;
    pending.waitBound=1;
    function tryGo(){ if(!playing()) doReload(); }
    document.addEventListener("visibilitychange", function(){ if(!document.hidden) tryGo(); });
    var a=document.getElementById("a");
    if(a){ a.addEventListener("pause", tryGo); a.addEventListener("ended", tryGo); }
    window.addEventListener("bpp-yt-pause", tryGo);
    window.addEventListener("bpp-yt-ended", tryGo);
    /* Fallback: alle 15 s erneut pruefen */
    setInterval(tryGo, 15000);
  }
  function applyUpdate(j){
    if(!j||!j.v||!newer(j.v, window.BPP_VERSION)) return;
    if(pending&&pending.v===j.v) return;
    pending={v:j.v, critical:!!j.critical};
    try{
      if(navigator.serviceWorker){
        navigator.serviceWorker.getRegistration().then(function(reg){
          if(!reg) return;
          try{ reg.update(); }catch(e){}
          if(reg.waiting) try{ reg.waiting.postMessage({type:"bpp-skip-waiting"}); }catch(e){}
        }).catch(function(){});
      }
    }catch(e){}
    if(pending.critical || !playing()){ doReload(); return; }
    armWait();
    /* dezenter Hinweis, falls Reload wartet */
    if(!document.getElementById("bppNew459")){
      var d=document.createElement("div"); d.id="bppNew459";
      d.style.cssText="position:fixed;left:50%;top:10px;transform:translateX(-50%);z-index:10000;background:#e8c57a;color:#222;padding:7px 12px;border-radius:8px;font-size:.9rem;box-shadow:0 2px 8px rgba(0,0,0,.4)";
      d.textContent="Neue Version V"+j.v+" – lädt nach Pause";
      var b=document.createElement("button"); b.type="button"; b.textContent="Jetzt";
      b.style.cssText="margin-left:10px;font:inherit;font-weight:600;padding:2px 9px;border-radius:6px;border:1px solid #222;background:#222;color:#e8c57a;cursor:pointer";
      b.onclick=function(){ doReload(); };
      d.appendChild(b); (document.body||document.documentElement).appendChild(d);
    }
  }
  function check(){
    if(reloading) return;
    fetch("version.json?t="+Date.now(), {cache:"no-store"}).then(function(r){ return r.ok?r.json():null; }).then(applyUpdate).catch(function(){});
  }
  function onVis(){ if(!document.hidden) check(); }
  window.addEventListener("focus", check);
  document.addEventListener("visibilitychange", onVis);
  if(navigator.serviceWorker){
    navigator.serviceWorker.addEventListener("controllerchange", function(){
      if(reloading) return;
      /* neuer SW aktiv – wenn Version schon erkannt, reload; sonst check */
      if(pending) doReload(); else check();
    });
    navigator.serviceWorker.addEventListener("message", function(e){
      if(e.data&&e.data.bppSwUpdate) check();
    });
  }
  window.addEventListener("load", function(){ setTimeout(check, 800); });
  if(document.readyState!=="loading") setTimeout(check, 800);
  timer=setInterval(check, 5*60*1000);
  window.bppCheckUpdate459=check;
})();
