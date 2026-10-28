/* [Grok-Bot] V4.56: (1) Hilfe Offline-Tipp kurz (Text in v302h.js, Position v449 KO.offline=21) – eine Quelle.
   (2) Lautstaerke pro Stueck merken (Desktop): localStorage bpp-vol-p-<id>-<rec>-<mp3|yt>, bpp-vol-last.
   [Grok-Bot] V4.58 Fix: Werte 0 / NaN / <0.05 ungueltig (nicht speichern/nicht restore); kaputte bpp-vol-*-Keys beim Start loeschen;
   auf Mobil (iOS/Android) kein Setzen/Merken/Restore von audio.volume (Systemlautstaerke); muted nie erzwingen, bei Restore muted=false.
   YouTube setVolume nur Desktop und nur bei gueltigem Wert >=0.05. */
(function(){
  if(window.bppV456) return; window.bppV456=1;
  var MIN=0.05;
  function A(){ return document.getElementById("a"); }
  function lsGet(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function lsSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  function lsDel(k){ try{ localStorage.removeItem(k); }catch(e){} }
  function mobile(){
    try{
      var ua=navigator.userAgent||"";
      if(/iPhone|iPad|iPod|Android/i.test(ua)) return true;
      if(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1) return true; /* iPadOS */
    }catch(e){}
    return false;
  }
  function valid(x){ x=+x; if(!(x>=MIN&&x<=1)) return null; return x; }
  function scrub(){
    try{
      var rm=[], i, k, v;
      for(i=localStorage.length-1;i>=0;i--){
        k=localStorage.key(i); if(!k||k.indexOf("bpp-vol-")!==0) continue;
        v=valid(localStorage.getItem(k)); if(v==null) rm.push(k);
      }
      for(i=0;i<rm.length;i++) lsDel(rm[i]);
    }catch(e){}
  }
  function unmute(){
    var a=A(); if(!a) return;
    try{ if(a.muted) a.muted=false; }catch(e){}
    try{ if(!(a.volume>=MIN)) a.volume=1; }catch(e){}
  }
  /* Mobil: nur bereinigen + unmute, kein Merken/Restore (volume oft read-only / System) */
  if(mobile()){
    scrub();
    function mobTick(){ scrub(); unmute(); }
    setInterval(mobTick,2000);
    window.addEventListener("load",function(){ scrub(); unmute(); setTimeout(unmute,400); });
    window.bppVolKey456=function(){ return ""; };
    window.bppVolRestore456=function(){};
    window.bppVolMobile456=true;
    return;
  }
  function pid(){ try{ return (typeof i!=="undefined"&&i>=0&&PRAYERS[i])?PRAYERS[i].id:""; }catch(e){ return ""; } }
  function recOf(id){
    if(!id) return "std";
    try{
      if(lsGet("bpp-spn-"+id)==="spn") return "spn";
      var rk=id==="guru-stotram"?"bpp-gs-rec":"bpp-prabhus-"+id;
      var v=lsGet(rk);
      if(v==="prabhus") return "pbj";
      if(v!=null) return "mtj";
    }catch(e){}
    return "std";
  }
  function srcOf(){ try{ return (typeof ytOn!=="undefined"&&ytOn)?"yt":"mp3"; }catch(e){ return "mp3"; } }
  function key(id,rec,src){ return "bpp-vol-p-"+id+"-"+rec+"-"+src; }
  function ytVol(v01){
    v01=valid(v01); if(v01==null) return;
    try{
      var n=Math.round(v01*100);
      var f=document.getElementById("yt");
      if(f&&f.contentWindow) f.contentWindow.postMessage(JSON.stringify({event:"command",func:"setVolume",args:[n]}),"*");
    }catch(e){}
  }
  function apply(v01){
    v01=valid(v01); if(v01==null) return;
    var a=A(); if(a){ try{ a.muted=false; }catch(e){} try{ a.volume=v01; }catch(e){} }
    if(srcOf()==="yt") ytVol(v01);
  }
  function restore(){
    var id=pid(); if(!id) return;
    var rec=recOf(id), src=srcOf();
    var raw=lsGet(key(id,rec,src));
    if(raw==null) raw=lsGet("bpp-vol-last");
    var v=valid(raw);
    if(v==null){ unmute(); return; } /* kein 0/ungueltig wiederherstellen */
    applying=1; apply(v); setTimeout(function(){ applying=0; },80);
  }
  var applying=0, lastSig="";
  function saveFromAudio(){
    if(applying) return;
    var a=A(); if(!a) return;
    try{ if(a.muted) return; }catch(e){} /* muted nicht als 0 speichern */
    var v=valid(a.volume); if(v==null) return; /* 0/<0.05 nicht merken */
    lsSet("bpp-vol-last", String(v));
    var id=pid(); if(!id) return;
    lsSet(key(id,recOf(id),srcOf()), String(v));
    if(srcOf()==="yt") ytVol(v);
  }
  function hookAudio(){
    var a=A(); if(!a||a.__v456) return; a.__v456=1;
    a.addEventListener("volumechange", saveFromAudio);
  }
  function wrapPlay(){
    var f=window.play; if(typeof f!=="function"||f.__v456) return;
    var w=function(){ var r=f.apply(this,arguments); setTimeout(restore,30); setTimeout(restore,200); setTimeout(restore,600); return r; };
    w.__v456=1; window.play=w;
  }
  function tick(){
    hookAudio(); wrapPlay(); unmute();
    var id=pid(), sig=id+"|"+recOf(id)+"|"+srcOf();
    if(sig!==lastSig){ lastSig=sig; if(id) restore(); }
  }
  scrub();
  setInterval(tick,400);
  window.addEventListener("load", function(){ scrub(); hookAudio(); wrapPlay(); unmute(); setTimeout(restore,500); });
  window.bppVolKey456=function(){ var id=pid(); return id?key(id,recOf(id),srcOf()):""; };
  window.bppVolRestore456=restore;
  window.bppVolMobile456=false;
})();
