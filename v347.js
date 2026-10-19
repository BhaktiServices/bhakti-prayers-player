/* [Grok-Bot] V3.47: Bei "Mitlesen an" spult manuelles Blaettern (Wischen, Mausrad, Pfeil-/Bildtasten aus V3.07; im Grossbild auch
   seitlich wischen / Pfeile links-rechts / Strophen-Knoepfe) die Aufnahme zur Strophe, die dann angezeigt wird.
   Ablauf: jeder manuelle Schritt haelt das Mitlesen an (V3.07-Halt) und startet einen 800-ms-Timer neu; die Zielstrophe ist dezent
   vormarkiert (gestrichelter Goldrand + Fortschrittsstrich oben). Nach 800 ms Ruhe: Zeit der Zielstrophe = erster Zeitpunkt, an dem das
   Mitlesen selbst diese Strophe zeigen wuerde (Umkehrung von stanzaFromProgress, also genau passend zu seqFile/Marken -> kein Ping-Pong);
   bei mehrfach vorkommenden Strophen in Blaetterrichtung. Dann seek (Datei oder YouTube seekTo), Mitlesen laeuft weiter; Pause bleibt Pause.
   Strophen ohne Zeit (z.B. Vishnu-Arati 10-12) und die gerade laufende Strophe: kein Spulen. Mitlesen aus: Blaettern bleibt reine Ansicht.
   Programmatisches Mitscrollen setzt bppManualAt nie -> loest kein Spulen aus. */
window.BPP_BUILD="3.48"; window.BPP_SHOW="3.48";
(function(){
  if(window.bppV347) return; window.bppV347=1;
  var DELAY=800, lastM=window.bppManualAt||0, timer=null, startK=null;
  var css=document.createElement("style");
  css.textContent="#lyrics .stanza.bppPre{outline:1.5px dashed rgba(214,191,144,.75);outline-offset:3px;border-radius:10px}"+
    "#bppPreBar{position:fixed;left:0;top:0;height:3px;width:0;background:#D6BF90;z-index:2147483646;opacity:.85;pointer-events:none}"+
    "#bppPreBar.run{transition:width "+DELAY+"ms linear;width:100%}";
  document.head.appendChild(css);
  function fsOn(){ var f=document.getElementById("bppFs"); return !!(f && f.classList.contains("on")); }
  function follow(){ return typeof autoScroll!=="undefined" && !!autoScroll; }
  function ytMode(){ return typeof ytOn!=="undefined" && !!ytOn; }
  function P(){ return (typeof i!=="undefined" && i>=0 && typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function hasMedia(){ if(ytMode()) return true; return !!(typeof a!=="undefined" && a && a.src && isFinite(a.duration) && a.duration>=8); }
  function timeK(){ try{ var p=songProgress(); return p?stanzaFromProgress(p):null; }catch(e){ return null; } }
  function shownK(){
    if(fsOn()){ try{ var s=bppFsState(); return (s && s.k>=0)?s.k:null; }catch(e){ return null; } }
    try{ var g=currentGroupIndex(); return g>=0?g:null; }catch(e){ return null; }
  }
  /* Zeitpunkte, an denen das Mitlesen in Strophe k wechselt (Scan + Feinsuche) */
  function startsOf(k){
    var p; try{ p=songProgress(); }catch(e){ return []; } if(!p || !(p.dur>0)) return [];
    var dur=p.dur, step=Math.max(0.25, dur/6000), out=[], prev=null, prevT=0;
    /* einige Mitlese-Schichten (v187) lesen die Zeit direkt vom Player -> waehrend des (synchronen) Scans Zeit vortaeuschen */
    var T=0, yt=ytMode(), saveYt=yt?ytTime:null, shadow=false;
    if(!yt && typeof a!=="undefined" && a){ try{ Object.defineProperty(a,"currentTime",{configurable:true,get:function(){ return T; },set:function(v){}}); shadow=true; }catch(e){} }
    function at(t){ T=t; if(yt){ try{ ytTime=t; }catch(e){} } var q={}; for(var x in p) q[x]=p[x]; q.t=t; try{ return stanzaFromProgress(q); }catch(e){ return null; } }
    try{
    for(var t=0; t<=dur-0.3; t+=step){
      var s=at(t);
      if(s===k && prev!==k){
        var lo=prevT, hi=t; if(t>0){ for(var n=0;n<12;n++){ var m=(lo+hi)/2; if(at(m)===k) hi=m; else lo=m; } }
        out.push(t>0?hi:0);
      }
      prev=s; prevT=t;
    }
    } finally {
      if(shadow){ try{ delete a.currentTime; }catch(e){} }
      if(yt){ try{ ytTime=saveYt; }catch(e){} }
    }
    return out;
  }
  function pick(list, d, now){
    if(!list.length) return null;
    var c=null;
    if(d>0){ for(var j=0;j<list.length;j++){ if(list[j]>now-0.5){ c=list[j]; break; } } }
    else { for(var j2=list.length-1;j2>=0;j2--){ if(list[j2]<=now+0.5){ c=list[j2]; break; } } }
    if(c===null){ var bd=1e9; list.forEach(function(x){ var dd=Math.abs(x-now); if(dd<bd){ bd=dd; c=x; } }); }
    return c;
  }
  function seek(t){
    if(ytMode()){
      try{ document.getElementById("yt").contentWindow.postMessage(JSON.stringify({event:"command",func:"seekTo",args:[Math.max(0,t),true]}),"*"); }catch(e){}
      try{ ytTime=t; }catch(e){}
    } else { try{ a.currentTime=t; }catch(e){} }
  }
  function bar(on){
    var b=document.getElementById("bppPreBar");
    if(!on){ if(b) b.remove(); return; }
    if(b) b.remove(); b=document.createElement("div"); b.id="bppPreBar"; document.body.appendChild(b);
    void b.offsetWidth; b.classList.add("run");
  }
  function pre(k){
    var L=document.getElementById("lyrics");
    if(L) Array.prototype.forEach.call(L.querySelectorAll(".stanza.bppPre"), function(e){ e.classList.remove("bppPre"); });
    if(k===null || fsOn() || !L) return;
    var st=L.querySelectorAll(".stanza"); if(st[k]) st[k].classList.add("bppPre");
  }
  function clear(){ clearTimeout(timer); timer=null; window.bppSeekPending=false; startK=null; pre(null); bar(false); }
  function release(){
    try{ holdLineUntil=0; }catch(e){}
    try{ if(window.bppFsRelease) window.bppFsRelease(); }catch(e){}
  }
  function fire(){
    var k=shownK(), s0=startK; clear();
    if(!follow() || k===null || !hasMedia()) return;
    var tk=timeK(); if(k===tk) return;           /* laufende Strophe: nicht neu starten */
    var now; try{ now=songProgress().t; }catch(e){ now=0; }
    var d=(tk===null)?1:(k>tk?1:-1);
    var t=pick(startsOf(k), d, now); if(t===null) return;   /* Strophe ohne Zeit: kein Spulen, Ansicht bleibt */
    window.bppV347Last={k:k, t:t, from:now, at:Date.now()};
    seek(t+0.15);
    release();
    try{ if(!fsOn() && typeof pinStanza==="function") setTimeout(pinStanza,30); }catch(e){}
  }
  function onManual(){
    if(!follow() || !P()){ clear(); return; }
    if(startK===null) startK=timeK();
    window.bppSeekPending=true;
    clearTimeout(timer); timer=setTimeout(fire, DELAY);
    setTimeout(function(){ if(window.bppSeekPending) pre(shownK()); }, 40);
    bar(true);
  }
  setInterval(function(){
    var m=window.bppManualAt||0;
    if(m!==lastM){ lastM=m; onManual(); }
  }, 60);
  window.bppV347Manual=function(){ window.bppManualAt=Date.now(); };
  window.bppV347Starts=startsOf;
  /* Prayer-Wechsel / Mitlesen aus waehrend der Wartezeit -> abbrechen */
  var lastP=null; setInterval(function(){ var p=P(), id=p?p.id:null; if(id!==lastP){ lastP=id; clear(); } if(timer && !follow()) clear(); }, 200);
})();
