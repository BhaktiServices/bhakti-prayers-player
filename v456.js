/* [Grok-Bot] V4.56: (1) Hilfe Offline-Tipp kurz (Text in v302h.js, Position v449 KO.offline=21) – eine Quelle, kein Doppel-Overwrite.
   (2) Lautstaerke pro Stueck merken: localStorage bpp-vol-p-<id>-<rec>-<mp3|yt>, allgemein bpp-vol-last.
   Beim erneuten Abspielen wiederherstellen; ohne Eintrag = zuletzt allgemein gesetzte Lautstaerke.
   Auch bei Durchlauf / >| und Rec-Wechsel. YouTube: postMessage setVolume. */
(function(){
  if(window.bppV456) return; window.bppV456=1;
  function A(){ return document.getElementById("a"); }
  function lsGet(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function lsSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
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
  function clamp01(x){ x=+x; if(!(x>=0&&x<=1)) return null; return x; }
  function ytVol(v01){
    try{
      var n=Math.round(Math.max(0,Math.min(1,v01))*100);
      var f=document.getElementById("yt");
      if(f&&f.contentWindow) f.contentWindow.postMessage(JSON.stringify({event:"command",func:"setVolume",args:[n]}),"*");
    }catch(e){}
  }
  function apply(v01){
    v01=clamp01(v01); if(v01==null) return;
    var a=A(); if(a) try{ a.volume=v01; }catch(e){}
    if(srcOf()==="yt") ytVol(v01);
  }
  function restore(){
    var id=pid(); if(!id) return;
    var rec=recOf(id), src=srcOf();
    var raw=lsGet(key(id,rec,src));
    if(raw==null) raw=lsGet("bpp-vol-last");
    var v=clamp01(raw); if(v==null) return;
    applying=1; apply(v); setTimeout(function(){ applying=0; },80);
  }
  var applying=0, lastSig="";
  function saveFromAudio(){
    if(applying) return;
    var a=A(); if(!a) return;
    var v=clamp01(a.volume); if(v==null) return;
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
    hookAudio(); wrapPlay();
    var id=pid(), sig=id+"|"+recOf(id)+"|"+srcOf();
    if(sig!==lastSig){ lastSig=sig; if(id) restore(); }
  }
  setInterval(tick,400);
  window.addEventListener("load", function(){ hookAudio(); wrapPlay(); setTimeout(restore,500); });
  window.bppVolKey456=function(){ var id=pid(); return id?key(id,recOf(id),srcOf()):""; };
  window.bppVolRestore456=restore;
})();
