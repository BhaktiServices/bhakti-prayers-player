/* [Grok-Bot] V3.26: PV-Astottaram: Abendmenue zeigt die Abend-Fassung (ashtotram-abend) statt der Morgen-Fassung (plan-v173.js).
   Akkorde laut SVD-Heften Morning V0424K und Evening V0424J (beide gleich): 1-53 C, ab 54 D, ab 100 E - bisher fehlte das C bei 1-53.
   Abend-Fassung nutzt dieselbe MP3 (audio/ashtotram.mp3) und hatte keine Zeitmarken -> Marken der Morgen-Fassung uebernommen. */
window.BPP_BUILD="3.26"; window.BPP_SHOW="3.26";
(function(){
  function run(){
    if(typeof PRAYERS==="undefined") return;
    var M=PRAYERS.find(function(p){ return p.id==="ashtotram"; }), A=PRAYERS.find(function(p){ return p.id==="ashtotram-abend"; }), ch=false;
    [M,A].forEach(function(P){ if(!P||!P.zeilen) return; P.zeilen.forEach(function(z){ var n=+z.nr; if(n>=1&&n<54&&!z.ch){ z.ch="C"; ch=true; } }); });
    if(M&&A&&M.marksFile&&M.marksFile.length&&(!A.marksFile||!A.marksFile.length)&&A.audio===M.audio){
      A.marksFile=M.marksFile.slice(); if(M.seqFile) A.seqFile=M.seqFile.map(function(e){ return e.slice(); }); A._bppEstMarks=0; ch=true; }
    if(ch){ try{ if(typeof i!=="undefined"&&PRAYERS[i]&&/^ashtotram/.test(PRAYERS[i].id)&&typeof paintLyrics==="function") paintLyrics(); }catch(e){} }
  }
  run(); setTimeout(run,800); setInterval(run,1500);
})();
