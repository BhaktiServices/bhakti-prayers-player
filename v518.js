/* [Grok-Bot] V5.18: Manuelle Sprünge (−30/−10/+10/+30, Strophe/Prayer, Leiste, Tastatur)
   und Wiederholen (Strophe/Prayer) dürfen den V5.13-Seek-Watchdog nie auslösen.
   Owner: bppAllowSeek513 setzt locked/backLog zurück; guardSet lässt Loop-Seeks zu.
   Dieses Skript ist das letzte Sicherheitsnetz (bppSkip + Klicks/Tasten nochmals armieren). */
window.BPP_BUILD="5.18";
(function(){
  if(window.bppV518) return; window.bppV518=1;

  function allow(why, ms){
    try{ if(typeof window.bppAllowSeek513==="function") window.bppAllowSeek513(why||"v518", ms==null?2500:ms); }catch(e){}
  }

  function wrapSkip(){
    var f=window.bppSkip;
    if(typeof f!=="function" || f.__bpp518) return;
    var w=function(){ allow("bppSkip", 2500); return f.apply(this, arguments); };
    w.__bpp518=1;
    if(f.__bpp513s) w.__bpp513s=1;
    if(typeof bppWrapMarkers489==="function") try{ bppWrapMarkers489(w,f); }catch(e){}
    window.bppSkip=w;
  }

  var SEL="#btnPrev,#btnNext,#btnSeek,#btnBack10,#btnFwd10,#btnBack30,#btnFwd30,.bppJmp,#btnPPrev,#btnPNext,#btnRep,#bppFsRep,#lyrics .stanza,#lyrics .line,#bppSel,.list .item,input[type=range],#a,#bppFsBar button,#bppFsSide button,[id^=bppFsJ],[id^=bppFsSt],#bppFsPrev,#bppFsNext,button.pn,button.j,button.j30,button.bppFsJ,button.bppFsSt";

  document.addEventListener("pointerdown", function(e){
    var t=e.target; if(!t||!t.closest) return;
    if(t.closest(SEL)) allow("pointer-v518", 2500);
  }, true);

  document.addEventListener("keydown", function(e){
    var k=(e.key||"").toLowerCase(), c=e.code||"";
    if(k==="n"||k==="v"||k==="j"||k==="l"||k===","||k==="."||k==="r"||
       c==="ArrowLeft"||c==="ArrowRight"||c==="ArrowUp"||c==="ArrowDown"||
       c==="PageUp"||c==="PageDown"||c==="Home"||c==="KeyJ"||c==="KeyL"||c==="Comma"||c==="Period"){
      allow("key-v518", 2500);
    }
  }, true);

  function tick(){ wrapSkip(); }
  tick();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", tick);
  window.addEventListener("load", tick);
  [200,800,2000,4000].forEach(function(d){ setTimeout(tick,d); });
  setInterval(tick, 3000);
})();
