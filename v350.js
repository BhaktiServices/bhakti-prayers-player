/* [Grok-Bot] V3.50: Sri Nrsimha Prayer (Abend, "tava kara kamala ...") - Mitlesen neu gegen die MP3 gemessen (Whisper small/medium mit Wortzeiten,
   Methode V1.96). Bisher nur Marken 2 s und 410 s, alles dazwischen geschaetzt ueber alle 19 Strophen - die Aufnahme ("Narasimha Prayer classic")
   singt aber die Mantra-Strophen 5-17 des Hefts gar nicht, sondern wiederholt: namaste/ito 3x, tava kara/kesava 2x (kesava mehrfach),
   dann jaya nrsinga dev/prahlad (Str. 18) und gurudev (Str. 19). Dadurch lag das Mitlesen ab ca. 1 min falsch und am Ende voellig daneben.
   Neu als Abfolge (seqFile): 0 2.0 | 1 44.8 | 0 89.5 | 1 132.2 | 0 173.0 | 1 206.6 | 2 244.0 | 3 262.3 | 2 279.6 | 3 297.3 | 17 346.5 | 18 379.9.
   Str. 5-17 bleiben als Text ohne Zeitmarke (kein Spulen, Hinweis wie V3.48). Gemerkte alte Selbstkorrektur-Marken dieses Prayers werden einmal geloescht. */
window.BPP_BUILD="3.88"; window.BPP_SHOW="3.88";
(function(){
  if(window.bppV350) return; window.bppV350=1;
  var SEQ=[[2.0,0],[44.8,1],[89.5,0],[132.2,1],[173.0,0],[206.6,1],[244.0,2],[262.3,3],[279.6,2],[297.3,3],[346.5,17],[379.9,18]];
  function marks(s){ var m=[]; s.forEach(function(e){ if(m[e[1]]==null) m[e[1]]=e[0]; }); return m; }
  function apply(){
    if(typeof PRAYERS==="undefined") return;
    var P=PRAYERS.find(function(p){ return p.id==="narasimha-abend"; }); if(!P) return;
    if(P._v350===P.seqFile && JSON.stringify(P.seqFile)===JSON.stringify(SEQ)) return;
    P.seqFile=SEQ.map(function(e){ return e.slice(); }); P._v350=P.seqFile;
    P.marksFile=marks(SEQ); P._bppEstMarks=0; P._bppEstSrc="";
  }
  apply(); setTimeout(apply,600); setTimeout(apply,2000); setInterval(apply,3000);
  try{ if(!localStorage.getItem("bpp-v350-na")){
    var s=JSON.parse(localStorage.getItem("bpp-marks")||"{}");
    if(s["narasimha-abend|file"]){ delete s["narasimha-abend|file"]; localStorage.setItem("bpp-marks",JSON.stringify(s)); }
    localStorage.setItem("bpp-v350-na","1"); } }catch(e){}
})();
