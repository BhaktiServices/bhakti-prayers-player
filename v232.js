/* [Grok-Bot] V2.32: Guru Stotram – Autoscroll-Timing für MP3 und YouTube neu gesetzt.
   MP3-Marken bleiben die gemessenen aus v220 (Whisper + Demucs, Strophenanfänge).
   YouTube-Marken proportional skaliert auf die tatsächlichen Videolängen
   (morgens ~4:33 / 273 s, abends ~4:19 / 259 s). Om bleibt keine Strophe.
   Alte Nutzer-Marken für guru-stotram werden einmalig gelöscht. */
window.BPP_BUILD="3.36"; window.BPP_SHOW="3.36"; /* [Grok.com] alle 3 Aenderungen +1 */
(function(){
  if(window.bppV232) return; window.bppV232=1;
  var SEQ_FILE={
    "guru-stotram-abend":[[0,0],[31.2,1],[44.3,2],[58.0,3],[71.5,4],[85.2,5],[98.9,6],[112.8,7],[126.7,8],[140.6,9],[154.5,10],[168.5,11],[182.3,12],[196.1,13],[209.9,13],[224.3,13]],
    "guru-stotram":[[0,0],[18.7,1],[33.5,2],[48.2,3],[62.7,4],[77.7,5],[92.4,6],[107.2,7],[121.9,8],[136.6,9],[151.4,10],[166.1,11],[181.0,12],[195.7,13]]
  };
  // Skalierte YouTube-Sequenzen (auf gemessene Videolängen)
  var SEQ_YT={
    "guru-stotram-abend":[[0,0],[32.1,1],[45.5,2],[59.6,3],[73.5,4],[87.6,5],[101.6,6],[115.9,7],[130.2,8],[144.5,9],[158.8,10],[173.2,11],[187.4,12],[201.6,13],[215.7,13],[230.5,13]],
    "guru-stotram":[[0,0],[22.5,1],[40.4,2],[58.1,3],[75.5,4],[93.6,5],[111.3,6],[129.1,7],[146.9,8],[164.6,9],[182.4,10],[200.1,11],[218.1,12],[235.8,13]]
  };
  function by(id){ return (typeof PRAYERS!=="undefined")?PRAYERS.find(function(p){ return p.id===id; }):null; }
  function marksOf(seq){ var m=[]; seq.forEach(function(e){ if(m[e[1]]==null) m[e[1]]=e[0]; }); return m; }
  function apply(){
    Object.keys(SEQ_FILE).forEach(function(id){
      var P=by(id); if(!P) return;
      // File / MP3
      var sF=SEQ_FILE[id];
      if(!P.seqFile || JSON.stringify(P.seqFile)!==JSON.stringify(sF)) P.seqFile=sF;
      var mF=marksOf(sF);
      if(!P.marksFile || P.marksFile.join()!==mF.join()) P.marksFile=mF;
      // YouTube
      var sY=SEQ_YT[id];
      if(!P.seqYt || JSON.stringify(P.seqYt)!==JSON.stringify(sY)) P.seqYt=sY;
      var mY=marksOf(sY);
      if(!P.marksYt || P.marksYt.join()!==mY.join()) P.marksYt=mY;
      P._bppEstMarks=0; P._bppEstSrc="";
    });
  }
  window.bppV232Apply=apply;
  apply();
  // Alte gespeicherte Tipps einmalig löschen
  try{ if(!localStorage.getItem("bpp-v232-gs")){
    var s=JSON.parse(localStorage.getItem("bpp-marks")||"{}"), ch=0;
    Object.keys(s).forEach(function(k){ if(/^guru-stotram/.test(k)){ delete s[k]; ch=1; } });
    if(ch) localStorage.setItem("bpp-marks", JSON.stringify(s));
    localStorage.setItem("bpp-v232-gs","1");
  } }catch(e){}
  function ver(){
    window.BPP_SHOW="3.36"; window.BPP_BUILD="3.36";
    var v=document.querySelector("h1 .ver"); if(v && v.textContent!=="V3.36") v.textContent="V3.36";
    if(document.title!=="Bhakti Prayers Player V3.36") document.title="Bhakti Prayers Player V3.36";
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ apply(); ver(); }); else ver();
  window.addEventListener("load", function(){ apply(); ver(); });
  setInterval(function(){ apply(); if(window.BPP_BUILD!=="3.36") window.BPP_BUILD="3.36"; }, 800);
})();
