/* [Grok-Bot] V3.07: Manuelles Weiterblaettern strophenweise in Standardansicht und Grossbild:
   Wischen hoch/runter, Mausrad, Pfeil hoch/runter, Bild hoch/runter. Geht auch ohne Ton/Mitlesen.
   Bei laufendem Mitlesen hat der manuelle Schritt Vorrang; die Automatik uebernimmt erst wieder beim naechsten Strophenwechsel laut Zeit.
   Grossbild: waagrechtes Wischen (Grok.com, v183) bleibt; senkrechtes Wischen loest das Menue nicht aus. */
window.BPP_BUILD="3.07"; window.BPP_SHOW="3.07";
(function(){
  var held=false, k0=null, lastStep=0;
  function fsOn(){ var f=document.getElementById("bppFs"); return !!(f && f.classList.contains("on")); }
  function timeK(){ try{ var p=songProgress(); return p?stanzaFromProgress(p):null; }catch(e){ return null; } }
  function hold(){ held=true; k0=timeK(); }
  function stdStep(d){
    if(typeof i==="undefined"||i<0) return;
    var gs=stanzaGroups(PRAYERS[i]); if(!gs.length) return;
    var n=currentGroupIndex(), k=Math.max(0,Math.min(gs.length-1,n+d)); if(k===n) return;
    line=gs[k].start; try{ manualShift=0; }catch(e){}
    holdLineUntil=Date.now()+864e5; hold();
    try{ persistNow(); }catch(e){} paintLyrics(); setTimeout(pinStanza,20);
  }
  function step(d){
    var now=Date.now(); if(now-lastStep<380) return; lastStep=now;
    window.bppManualAt=now; /* [Grok-Bot] V3.29: manueller Schritt -> sofort, ohne Gleiten */
    if(fsOn()){ if(window.bppFsStep && window.bppFsStep(d)) hold(); return; }
    stdStep(d);
  }
  window.bppStanzaStep=step;
  /* Freigabe: sobald die Zeit-Strophe wechselt (oder Wiedergabe neu gestartet wird) */
  setInterval(function(){
    if(!held) return;
    var playing=false; try{ playing=isPlaying(); }catch(e){}
    if(!playing) return;
    var k=timeK(); if(k0===null){ k0=k; return; }
    if(k!==null && k!==k0){ held=false; holdLineUntil=0; if(window.bppFsRelease) window.bppFsRelease(); }
  },250);
  function typing(t){ return t && (/^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName) || t.isContentEditable); }
  /* Tasten: vor den Grossbild-Tasten (v183 nutzt Bild hoch/runter zum Spulen) */
  window.addEventListener("keydown",function(e){
    if(typing(e.target)||e.altKey||e.ctrlKey||e.metaKey) return;
    if(document.getElementById("bppHelp")) return;
    var d=(e.key==="ArrowDown"||e.key==="PageDown")?1:(e.key==="ArrowUp"||e.key==="PageUp")?-1:0;
    if(!d) return;
    if(!fsOn() && (typeof i==="undefined"||i<0)) return;
    e.preventDefault(); e.stopImmediatePropagation(); step(d);
  },true);
  /* Mausrad */
  function onWheel(e){ if(Math.abs(e.deltaY)<8 || Math.abs(e.deltaY)<Math.abs(e.deltaX)) return; e.preventDefault(); step(e.deltaY>0?1:-1); }
  /* Wischen */
  function swipe(el, isFs){
    var x0=null,y0=null,t0=0,vert=false;
    el.addEventListener("touchstart",function(e){ if(e.touches.length!==1){x0=null;return;} if(isFs){var bar=document.getElementById("bppFsBar"); if(bar&&bar.contains(e.target)){x0=null;return;}} var t=e.touches[0]; x0=t.clientX; y0=t.clientY; t0=Date.now(); vert=false; },{passive:true,capture:true});
    el.addEventListener("touchmove",function(e){ if(x0===null) return; var t=e.touches[0], dx=t.clientX-x0, dy=t.clientY-y0;
      if(!vert && Math.abs(dy)>12 && Math.abs(dy)>Math.abs(dx)*1.2) vert=true; if(vert && e.cancelable) e.preventDefault(); },{passive:false,capture:true});
    el.addEventListener("touchend",function(e){ if(x0===null) return; var t=e.changedTouches[0], dx=t.clientX-x0, dy=t.clientY-y0; x0=null;
      if(vert && Math.abs(dy)>40){ if(isFs) e.stopPropagation(); step(dy<0?1:-1); } },{passive:true,capture:true});
  }
  var n=0, iv=setInterval(function(){
    var L=document.getElementById("lyrics"), F=document.getElementById("bppFs");
    if(L && !L._v307){ L._v307=1; L.addEventListener("wheel",onWheel,{passive:false}); swipe(L,false); }
    if(F && !F._v307){ F._v307=1; F.addEventListener("wheel",onWheel,{passive:false}); swipe(F,true); }
    if((L&&L._v307&&F&&F._v307)||++n>200) clearInterval(iv);
  },300);
})();
