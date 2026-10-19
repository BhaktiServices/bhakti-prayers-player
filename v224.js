/* [Grok.com] Hanuman Chalisa wieder die vorherige YouTube-Aufnahme fBw-BSoZGgM.
   Ton ist die Dropbox-MP3 Hanuman Chalisa - Kanaka Dasananda. YouTube bleibt Ersatz. */
(function(){
  function apply(){
    if(typeof PRAYERS==="undefined") return;
    var h=PRAYERS.find(function(p){ return p.id==="hanuman"; });
    if(!h) return;
    h.youtube="fBw-BSoZGgM";
    h.audio="audio/hanuman-kanaka.mp3?v=234";
    h.preferFile=true;
    /* [Grok.com] Autoscroll am 8:55-Video. Anker sind die gemessenen Pausen, die Verse dazwischen gleichmaessig. */
    var seq=[[26,0],[47.4,1],[69.3,2]]; /* [Grok.com] Siya vara bleibt, nicht sofort weiter */
    var a=96, b=452, n=20;
    for(var i=0;i<n;i++) seq.push([Math.round((a+(b-a)*i/n)*10)/10, 3+i]);
    seq.push([454.5,23],[508,24]);
    /* [Grok-Bot] V3.52: nicht mehr alle 1,5 s die alten linearen Marken setzen, wenn v306 (gemessen) schon gilt -
       sonst kurzes Zurueckspringen auf die Vorstrophe (Mitlesen flackerte z.B. Str. 5/6 bei 2 Spalten) */
    if(!(h.marksFile && h.marksFile[6]===139.5)){
    h.seqYt=seq; h.seqFile=seq;
    var m=[]; seq.forEach(function(e){ if(m[e[1]]==null) m[e[1]]=e[0]; });
    h.marksYt=m; h.marksFile=m;
    }
    if(h.zeilen.some(function(z){ return /rāmaji se rāma/.test(z.sa||""); }))
    h.zeilen=h.zeilen.filter(function(z){ return !/rāmaji se rāma/.test(z.sa||""); });
    h.zeilen.forEach(function(z,i){ z.nr=String(i+1); z.x2=false; }); /* [Grok.com] Kanakadas ohne Ramaji-Refrain */
    try{
      var ch=JSON.parse(localStorage.getItem("bpp-src")||"{}")||{};
      ch.hanuman="file"; localStorage.setItem("bpp-src", JSON.stringify(ch));
    }catch(e){}
  }
  apply();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", apply);
  setTimeout(apply, 500);
  setInterval(apply, 1500);
})();
