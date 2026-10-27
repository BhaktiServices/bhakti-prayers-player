/* [Grok-Bot] V4.50: Aktiver Vers = genau eine Instanz aus der Abspielposition der gewaehlten Aufnahme.
   Ursache (Śrī Hanumān Cālīsā · Mataji Bhavani, 0:28, Mitsingen an – Knopftext "Mitsingen aus" = naechste Aktion laut v358, gold = an):
   Zwei Schreiber mit unterschiedlichen Quellen:
   (1) autoLineFromTime -> stanzaFromProgress -> seqFile (Bhavani: Str. 0 bis 32 s)
   (2) v434 fix() alle 250 ms ohne autoScroll-Pruefung -> marksFile; v187 estimate() erfand Silben-Marken
       (marks[1]≈14.6) -> Str. 1. Gold sprang Str. 1 <-> 2.
   Fix: (a) v434 fix() nur bei Mitsingen an; (b) bppStanzaAtMedia/kAtAuth: seq vor Marken (wie stanzaFromProgress);
   (c) Bhavani-seq vervollstaendigt (gemessene Zeiten v199 derselben MP3 + Mangala-Wiederholungen); marksFile aus seq,
   keine Schaetz-Marken wenn seq vorliegt. Mitsingen aus: keine automatische Markierung (manuell/letzte Position). */
window.BPP_BUILD="4.50"; window.BPP_SHOW="4.50";
(function(){
  if(window.bppV450) return; window.bppV450=1;
  function marksFromSeq(seq){
    var m=[];
    (seq||[]).forEach(function(e){ if(e&&typeof e[0]==="number"&&typeof e[1]==="number"&&m[e[1]]==null) m[e[1]]=e[0]; });
    return m;
  }
  /* Dieselbe MP3 wie v199 (audio/hanuman.mp3); oeffnung Mangala Murti mehrmals (hanuman2), danach gemessene Abfolge */
  var BHAVANI_SEQ=[[8.7,0],[16,0],[24,0],[32,0],[44.2,1],[59.8,2],[101.1,3],[115.3,4],[133.3,2],[152.9,5],[166.5,6],[183.4,2],[202.2,7],[215.1,8],[231.5,2],[249.9,9],[262.5,10],[278.5,2],[296.6,11],[309.1,12],[324.9,2],[340.3,13],[352.5,14],[366.2,2],[381.8,15],[392.4,16],[405.7,2],[421.0,17],[431.3,18],[444.5,2],[459.8,19],[470.1,20],[483.2,2],[494.0,21],[508.3,22],[521.2,2],[536.2,23],[551.3,24],[583.4,25],[616.6,2],[639.3,26]];
  function fixBhavani(){
    if(typeof PRAYERS==="undefined") return;
    var P=PRAYERS.find(function(p){ return p.id==="hanuman-bhavani"; });
    if(!P) return;
    P.seqFile=BHAVANI_SEQ.slice();
    P.marksFile=marksFromSeq(P.seqFile);
    P._bppEstMarks=0; P._bppEstSrc="";
  }
  function blockEstWhenSeq(){
    if(typeof PRAYERS==="undefined") return;
    PRAYERS.forEach(function(P){
      if(!P) return;
      var s=null;
      try{ s=(typeof window.bppSeqOf==="function")?window.bppSeqOf(P):((typeof ytOn!=="undefined"&&ytOn)?P.seqYt:P.seqFile); }catch(e){}
      if(!(s&&s.length)) return;
      if(P._bppEstMarks || !P.marksFile || !P.marksFile.length){
        P.marksFile=marksFromSeq(s);
        P._bppEstMarks=0; P._bppEstSrc="";
      }
    });
  }
  fixBhavani(); blockEstWhenSeq();
  setInterval(function(){ fixBhavani(); blockEstWhenSeq(); }, 1000);
  document.addEventListener("DOMContentLoaded", function(){ fixBhavani(); blockEstWhenSeq(); });
})();
