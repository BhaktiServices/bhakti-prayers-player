/* [Grok-Bot] V4.67: Hanumān Cālīsā Rec Mtj – Sync neu vermessen (Energie/Pausen + Whisper-Wortzeiten).
   Startzeiten in sync/hanuman-mtj.json (Liste {verse,start}); Player liest Mtj-seq/marks daraus (v453 via BPP_MTJ_SEQ).
   Pbj unverändert. Refrain „Rāmajī“ erstmals @79.4 s (Whisper); Strophe 0 = Maṅgala.
   Fix: alter Sprung 2→3 (52.3→59.8) war zu früh – Strophe 2 = buddhi @59.8, Refrain @79.4. */
window.BPP_BUILD="4.67"; window.BPP_SHOW="4.67";

(function(){
  if(window.bppV467) return; window.bppV467=1;
  var URL_SYNC="sync/hanuman-mtj.json?v=467";
  /* Fallback = gemessene Sequenz (identisch zur Sync-Datei) */
  var FALLBACK=[
    [7.9,0],[15.9,0],[24.4,0],[30.0,0],
    [44.0,1],[59.8,2],[79.4,3],
    [100.0,4],[115.1,5],[132.6,3],
    [152.0,6],[166.4,7],[182.9,3],
    [201.6,8],[214.8,9],[230.9,3],
    [249.6,10],[261.5,11],[278.0,3],
    [296.4,12],[308.4,13],[324.7,3],
    [340.7,14],[352.0,15],[365.8,3],
    [381.3,16],[392.0,17],[404.9,3],
    [421.0,18],[431.0,19],[443.6,3],
    [459.2,20],[469.4,21],[482.5,3],
    [494.0,22],[508.2,23],[520.7,3],
    [536.0,24],[551.6,25],[583.4,26],[616.1,3],
    [639.5,27]
  ];

  function toSeq(list){
    if(!list||!list.length) return null;
    var out=[], i, e, v, s;
    for(i=0;i<list.length;i++){
      e=list[i];
      if(Array.isArray(e)){ s=+e[0]; v=+e[1]; }
      else { s=+e.start; v=+e.verse; }
      if(isFinite(s)&&isFinite(v)) out.push([s, v|0]);
    }
    out.sort(function(a,b){ return a[0]-b[0]; });
    return out.length?out:null;
  }

  function apply(seq){
    if(!seq||!seq.length) return;
    window.BPP_MTJ_SEQ=seq;
    try{
      if(typeof PRAYERS==="undefined") return;
      var P=PRAYERS.find(function(p){ return p.id==="hanuman"; });
      if(P){ P._bppEstMarks=0; P._bppEstSrc=""; }
    }catch(e){}
  }

  apply(FALLBACK.slice());
  function load(){
    fetch(URL_SYNC,{cache:"no-store"}).then(function(r){
      if(!r.ok) throw new Error("sync "+r.status);
      return r.json();
    }).then(function(j){
      var seq=toSeq(j);
      if(seq) apply(seq);
    }).catch(function(){});
  }
  load();
  document.addEventListener("DOMContentLoaded", load);
})();
