/* [Grok-Bot] V3.27: Guru Stotram Morgen-Akkorde laut SVD Morning V0424K: Zeilen a/c "C G", b/d "G C" (vorher b/d nur "C", c nur "G").
   Abend-Fassung (Am G / F G / Am G / F E) stimmt mit Evening V0424J und bleibt; Om-Handling und Timing unveraendert. */
(function(){
  window.BPP_BUILD="3.27"; window.BPP_SHOW="3.27";
  function fix(){
    if(typeof PRAYERS==="undefined") return false;
    var P=PRAYERS.find(function(p){return p.id==="guru-stotram";}); if(!P||!P.zeilen) return false;
    var ch=false;
    P.zeilen.forEach(function(z){
      var m=/([a-d])$/.exec(String(z.nr||"")); if(!m) return;
      var w=(m[1]==="a"||m[1]==="c")?"C                    G":"G                    C";
      if(z.ch!==w){ z.ch=w; ch=true; }
    });
    return ch;
  }
  function go(){ if(fix()){ try{ if(typeof i!=="undefined"&&PRAYERS[i]&&PRAYERS[i].id==="guru-stotram"&&typeof paintLyrics==="function") paintLyrics(); }catch(e){} } }
  go(); setTimeout(go,800); setInterval(go,1500);
})();
