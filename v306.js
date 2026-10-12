/* [Grok-Bot] V3.06: Hanuman Chalisa (audio/hanuman-kanaka.mp3, 534.6 s) Zeitmarken neu gemessen:
   Demucs-Vocals, Atempausen, Whisper-Wortzeiten. Strophe wechselt am Ende der letzten gesungenen Zeile.
   Ersetzt die gleichmaessig verteilten Werte aus v224.js (96..452 linear). Kein Refrain zwischen den Strophen in dieser Aufnahme. */
window.BPP_BUILD="3.06"; window.BPP_SHOW="3.06";
(function(){
  var M=[24.8,46.8,68.9,76.0,99.5,119.8,139.5,159.1,178.4,197.9,217.6,237.1,256.6,275.8,293.4,311.1,328.1,344.9,361.0,377.1,392.3,407.0,421.9,435.9,451.6,481.8,507.6];
  function apply(){
    if(typeof PRAYERS==="undefined") return;
    var h=PRAYERS.find(function(p){ return p.id==="hanuman"; }); if(!h||!h.zeilen||h.zeilen.length!==M.length) return;
    if(h._m306===h.zeilen) return;
    var seq=M.map(function(t,k){ return [t,k]; });
    h.seqFile=seq; h.seqYt=seq.map(function(e){return e.slice();}); h.marksFile=M.slice(); h.marksYt=M.slice();
    h._m306=h.zeilen;
  }
  apply(); setTimeout(apply,600);
  setInterval(function(){ var h=(typeof PRAYERS!=="undefined")&&PRAYERS.find(function(p){return p.id==="hanuman";}); if(h&&h.marksFile&&h.marksFile[6]!==139.5) h._m306=null; apply(); },300);
})();
