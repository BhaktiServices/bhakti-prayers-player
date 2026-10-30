/* [Grok-Bot] V4.71: Śrī Nṛsiṃha Kavaca Stotram Rec Mtj – Lyrics-Sync neu vermessen
   (Demucs-Gesang + Energie/Pausen; Whisper nur Kurz-Anker am Anfang – Sanskrit unzuverlässig).
   Startzeiten in sync/nrsimha-mtj.json ({file|yt}: [{verse,start},...]); Player setzt Mtj-seq/marks
   darüber (v408-Setter → Mtj-base). Pbj (v408) unverändert. Keine erfundenen Zeiten: Stellen ohne
   klaren Phrasen-Einsatz behalten den alten Wert (unsicher markiert).
   MP3↔YT: keine konstante Offset-Verschiebung (andere Tempi ~16,4 s vs ~20 s/Strophe) → getrennt gemessen.
   Fix Start: Str. 0 MP3 8,2→9,7 s (erster Gesangs-Einsatz); mehrere spätere Drifts korrigiert. */
window.BPP_BUILD="4.71"; window.BPP_SHOW="4.71";

(function(){
  if(window.bppV471) return; window.bppV471=1;
  var URL_SYNC="sync/nrsimha-mtj.json?v=471";
  /* Fallback = gemessen (identisch zur Sync-Datei, Stand V4.71) */
  var FALLBACK_FILE=[
    [9.7,0],[25.6,1],[41.5,2],[58.3,3],[75.2,4],[91.0,5],[107.3,6],[123.7,7],
    [140.0,8],[156.2,9],[172.8,10],[193.2,11],[205.6,12],[221.7,13],[237.9,14],[258.4,15],
    [270.4,16],[286.5,17],[302.6,18],[318.9,19],[335.2,20],[350.7,21],[366.4,22],[381.7,23],
    [397.2,24],[412.5,25],[426.9,26],[439.4,27],[458.6,28],[473.8,29],[519.9,30],[540.4,31],
    [551.2,32],[573.5,33],[584.9,34],[607.1,35],[624.2,36],[652.6,37],[675.5,38],[703.7,39],
    [720.6,40],[737.2,41],[764.7,42],[788.5,43],[803.8,44],[816.2,45],[829.8,46],[842.4,47],
    [846.2,48],[905.1,49],[920.4,50]
  ];
  var FALLBACK_YT=[
    [5.2,0],[25.2,1],[45.2,2],[65.3,3],[85.3,4],[105.5,5],[125.5,6],[145.5,7],
    [165.4,8],[185.6,9],[205.6,10],[225.7,11],[245.6,12],[265.4,13],[285.1,14],[304.9,15],
    [324.2,16],[341.8,17],[359.2,18],[376.3,19],[393.1,20],[409.2,21],[425.3,22],[441.0,23],
    [456.4,24],[471.4,25],[486.4,26],[501.1,27],[515.8,28],[530.5,29],[573.0,30],[593.2,31],
    [607.0,32],[631.0,33],[643.2,34],[663.1,35],[679.3,36],[713.1,37],[724.0,38],[748.4,39],
    [777.5,40],[790.3,41],[806.0,42],[812.7,43],[839.6,44],[850.4,45],[864.4,46],[878.0,47],
    [898.4,48],[928.6,49],[958.6,50]
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
  function marksOf(seq){ return seq.map(function(e){ return e[0]; }); }

  function apply(fileSeq, ytSeq){
    if(typeof PRAYERS==="undefined") return;
    var P=PRAYERS.find(function(p){ return p.id==="kavacham"; });
    if(!P) return;
    try{
      /* v408-Setter aktualisiert Mtj-base; bei Rec:Pbj liefert der Getter weiter Pbj-Marken */
      if(fileSeq&&fileSeq.length){ P.seqFile=fileSeq.slice(); P.marksFile=marksOf(fileSeq); }
      if(ytSeq&&ytSeq.length){ P.seqYt=ytSeq.slice(); P.marksYt=marksOf(ytSeq); }
      P._bppEstMarks=0; P._bppEstYt=0; P._bppEstSrc="";
    }catch(e){}
  }

  function onceClearUserMarks(){
    try{
      if(localStorage.getItem("bpp-v471-kv")==="1") return;
      var s=JSON.parse(localStorage.getItem("bpp-marks")||"{}")||{};
      var ch=0;
      ["kavacham|file","kavacham|yt"].forEach(function(k){ if(s[k]){ delete s[k]; ch=1; } });
      if(ch) localStorage.setItem("bpp-marks", JSON.stringify(s));
      localStorage.setItem("bpp-v471-kv","1");
    }catch(e){}
  }

  apply(FALLBACK_FILE.slice(), FALLBACK_YT.slice());
  onceClearUserMarks();

  function load(){
    fetch(URL_SYNC,{cache:"no-store"}).then(function(r){
      if(!r.ok) throw new Error("sync "+r.status);
      return r.json();
    }).then(function(j){
      var f=null, y=null;
      if(Array.isArray(j)){ f=toSeq(j); }
      else if(j&&typeof j==="object"){
        f=toSeq(j.file||j.mp3||j.seqFile);
        y=toSeq(j.yt||j.youtube||j.seqYt);
      }
      if(f||y) apply(f||FALLBACK_FILE.slice(), y||FALLBACK_YT.slice());
    }).catch(function(){});
  }
  load();
  document.addEventListener("DOMContentLoaded", load);
  window.addEventListener("load", function(){ onceClearUserMarks(); load(); });
  /* nach v408-Hook nochmals setzen (Setter → Mtj-base) */
  setTimeout(function(){ apply(FALLBACK_FILE.slice(), FALLBACK_YT.slice()); load(); }, 400);
  setInterval(function(){
    try{
      var P=PRAYERS&&PRAYERS.find(function(p){ return p.id==="kavacham"; });
      if(!P) return;
      var on=false; try{ on=localStorage.getItem("bpp-prabhus-kavacham")==="prabhus"; }catch(e){}
      if(on) return;
      var s0=P.seqFile&&P.seqFile[0]&&P.seqFile[0][0];
      if(s0!=null&&Math.abs(s0-9.7)>0.05) apply(FALLBACK_FILE.slice(), FALLBACK_YT.slice());
    }catch(e){}
  }, 2000);

  window.bppNrsimha471=function(){
    var P=PRAYERS&&PRAYERS.find(function(p){ return p.id==="kavacham"; });
    return {file0:P&&P.seqFile&&P.seqFile[0], yt0:P&&P.seqYt&&P.seqYt[0], nF:P&&P.seqFile&&P.seqFile.length, nY:P&&P.seqYt&&P.seqYt.length};
  };
})();
