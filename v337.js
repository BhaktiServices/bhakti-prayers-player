/* [Grok-Bot] V3.37: Nrsimha Kavaca - Strophe 43 Zeilenumbruch wieder wie im Heft (v323-Zweig abgeschaltet)
   und MP3-AutoScroll ab Strophe 46 neu gemessen (Demucs + Whisper + Pegel/Chroma).
   Bisher lag Str. 50 "jaya jagadisa hare" bei 841.1 s (noch Str. 49), alle Marken danach um eine Strophe verschoben.
   Neu: 46 783.8 | 47 799.4 | 48 815.0 | 49 830.5 | 50 846.2 (+ Wdh. 861.7, 877.2) | 51 903.4 | 52 920.4 | 53 937.6 */
(function(){
  if(window.bppV337) return; window.bppV337=1;
  var NEW=[[783.8,45],[799.4,46],[815.0,47],[830.5,48],[846.2,49],[861.7,49],[877.2,49],[903.4,50],[920.4,51],[937.6,52]];
  function marks(s){ var m=[]; s.forEach(function(e){ if(m[e[1]]==null) m[e[1]]=e[0]; }); return m; }
  function apply(){
    if(typeof PRAYERS==="undefined") return;
    var k=PRAYERS.find(function(p){ return p.id==="kavacham"; }); if(!k||!k.seqFile) return;
    var base=k.seqFile.filter(function(e){ return e[1]<45; });
    var s=base.concat(NEW);
    if(JSON.stringify(k.seqFile)===JSON.stringify(s)) return;
    k.seqFile=s; k.marksFile=marks(s); k._bppEstMarks=0; k._bppEstSrc="";
  }
  apply(); setTimeout(apply,900); setTimeout(apply,2200); setTimeout(apply,4000);
  try{ if(!localStorage.getItem("bpp-v337-kv")){
    var s=JSON.parse(localStorage.getItem("bpp-marks")||"{}");
    if(s["kavacham|file"]){ delete s["kavacham|file"]; localStorage.setItem("bpp-marks",JSON.stringify(s)); }
    localStorage.setItem("bpp-v337-kv","1"); } }catch(e){}
})();
