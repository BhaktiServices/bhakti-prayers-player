/* [Grok.com] Pfeil links oder Wischen nach links: Strophe vorher.
   Pfeil rechts oder Wischen nach rechts: Strophe danach.
   Strg+Pfeil bleibt Spulen. */
(function(){
  function typing(t){ return t && (t.tagName==="INPUT" || t.tagName==="TEXTAREA" || t.isContentEditable); }
  function big(){ try{ var s=window.bppFsState && window.bppFsState(); return !!(s && s.on); }catch(e){ return false; } }
  function step(dir){
    if(typeof i==="undefined" || i<0 || typeof PRAYERS==="undefined" || !PRAYERS[i]) return;
    if(typeof stanzaGroups!=="function" || typeof currentGroupIndex!=="function") return;
    var gs=stanzaGroups(PRAYERS[i]);
    var n=currentGroupIndex();
    if(dir>0){ if(n>=0 && n<gs.length-1) line=gs[n+1].start; else return; }
    else { if(n>0) line=gs[n-1].start; else return; }
    if(typeof persistNow==="function") persistNow();
    if(typeof paintLyrics==="function") paintLyrics();
    if(typeof syncAutoFromLine==="function") syncAutoFromLine();
  }
  document.addEventListener("keydown", function(e){
    if(e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return;
    if(typing(e.target) || big()) return;
    if(e.code==="ArrowLeft"){ e.preventDefault(); step(-1); }
    else if(e.code==="ArrowRight"){ e.preventDefault(); step(1); }
  }, true);
  var x0=0, y0=0, t0=0, on=false;
  function start(e){
    if(big()) return;
    var p=e.touches?e.touches[0]:e;
    if(!p) return;
    x0=p.clientX; y0=p.clientY; t0=Date.now(); on=true;
  }
  function end(e){
    if(!on) return; on=false;
    if(big()) return;
    var p=e.changedTouches?e.changedTouches[0]:e;
    if(!p) return;
    var dx=p.clientX-x0, dy=p.clientY-y0;
    if(Math.abs(dx)<48 || Math.abs(dx)<Math.abs(dy)*1.4) return;
    if(Date.now()-t0>700) return;
    step(dx<0?1:-1);
  }
  var box=document.getElementById("lyrics")||document.body;
  box.addEventListener("touchstart", start, {passive:true});
  box.addEventListener("touchend", end, {passive:true});
})();
