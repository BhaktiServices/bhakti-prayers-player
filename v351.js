/* [Grok-Bot] V3.51: (1) Sri Nrsimha Kavaca - Schluss neu gemessen (Kavaca-MP3, Demucs-Stimme + Whisper-Textbewertung je 0,5-3 s, Pegel/Pausen):
   Str. 50 "jaya jagadisa hare" 3x (846.2 | 861.7 | 877.2, dritter Durchgang langsamer bis ~902), Str. 51 "jaya nrsinga dev" 902.8 (bisher 903.4),
   Str. 52 "prahlad maharaj" 908.0 (bisher 920.4), Str. 53 "gurudev (3) / jaya jaya gurudev" 919.0 (bisher 937.6), neu Str. 54 "sri visvananda / gurudev gurudev gurudev /
   jaya jaya gurudev" 937.3, neu Str. 55 (schneller) "gurudev gurudev / sri visvananda gurudev" 954.0 (Gesang endet ~967 s).
   Ursache "Mitlesen folgt nicht ab 51": Timing. Bisher lag 52 bei 920.4 und 53 bei 937.6 - dort beginnen aber schon 53 bzw. 54
   (Str. 54/55 fehlten ganz); waehrend "prahlad" gesungen wurde, stand noch 51 da. Code (Standard/Gross) folgte den Marken korrekt.
   Str. 50: "(3)" am Ende -> "(3x)" (ganze Strophe dreimal). YouTube-Abfolge (seqYt) unveraendert (andere Aufnahme, nicht neu gemessen).
   (2) Scroll-Seek geaendert (v347/v348/v183): Wischen/Mausrad/Trackpad/Pfeil hoch-runter = nur Ansicht, Mitlesen pausiert, 2 s nach dem letzten
   Schritt zurueck zur laufenden Strophe; Spulen nur per Tipp/Klick auf eine Strophe (V3.49) bzw. im Grossbild mit den Knoepfen < > und
   Pfeil links/rechts (explizit, nach 800 ms); keine gestrichelte Vormarkierung mehr; Hinweis "nicht in der Aufnahme" nur bei Tipp/Klick. */
window.BPP_BUILD="3.90"; window.BPP_SHOW="3.90";
(function(){
  if(window.bppV351) return; window.bppV351=1;
  var L4=["Dm  Bb  C  Dm","Bb  C  Dm","Bb  C  Dm"], CH="Dm  Bb  C  Dm   Bb  C  Dm   Bb  C  Dm   Bb  C  Dm";
  var S54={nr:"54", ch:CH, lineCh:L4.slice(), sa:"śrī viśvānanda\ngurudev gurudev gurudev\njaya jaya gurudev (3x)",
    en:"Sri Vishwananda! Gurudeva, Gurudeva, Gurudeva – victory, victory to Gurudeva!",
    ue:"Śrī Vishwananda! Gurudeva, Gurudeva, Gurudeva – Sieg, Sieg dem Gurudeva!",
    fr:"Sri Vishwananda ! Gurudeva, Gurudeva, Gurudeva – victoire, victoire au Gurudeva !",
    es:"¡Sri Vishwananda! Gurudeva, Gurudeva, Gurudeva – ¡victoria, victoria a Gurudeva!",
    ru:"Шри Вишвананда! Гурудева, Гурудева, Гурудева – слава, слава Гурудеве!",
    hi:"श्री विश्वानन्द! गुरुदेव, गुरुदेव, गुरुदेव – गुरुदेव की जय हो, जय हो!",pt:"Sri Vishwananda! Gurudeva, Gurudeva, Gurudeva – vitória, vitória para Gurudeva!"};
  var S55={nr:"55", ch:"Dm  Bb  C  Dm   Bb  C  Dm", lineCh:["Dm  Bb  C  Dm","Bb  C  Dm"], sa:"gurudev gurudev\nśrī viśvānanda gurudev (3x)",
    en:"Gurudeva, Gurudeva – Sri Vishwananda Gurudeva!",
    ue:"Gurudeva, Gurudeva – Śrī Vishwananda Gurudeva!",
    fr:"Gurudeva, Gurudeva – Sri Vishwananda Gurudeva !",
    es:"Gurudeva, Gurudeva – ¡Sri Vishwananda Gurudeva!",
    ru:"Гурудева, Гурудева – Шри Вишвананда Гурудева!",
    hi:"गुरुदेव, गुरुदेव – श्री विश्वानन्द गुरुदेव!",pt:"Gurudeva, Gurudeva – Sri Vishwananda Gurudeva!"};
  var END=[[846.2,49],[861.7,49],[877.2,49],[902.8,50],[908.0,51],[919.0,52],[937.3,53],[954.0,54]];
  function marks(s){ var m=[]; s.forEach(function(e){ if(m[e[1]]==null) m[e[1]]=e[0]; }); return m; }
  function cp(o){ var c={}; for(var k in o) c[k]=(o[k] && o[k].slice)?o[k].slice():o[k]; return c; }
  function apply(){
    if(typeof PRAYERS==="undefined") return;
    var P=PRAYERS.find(function(p){ return p.id==="kavacham"; }); if(!P || !P.zeilen || !P.seqFile) return;
    var Z=P.zeilen, ch=false;
    var j=-1, g=-1;
    Z.forEach(function(z,n){ var s=String(z.sa||"");
      if(/^jaya jagadīśa hare\ndivya/.test(s)) j=n;
      if(/^gurudev \(3\)\njaya jaya gurudev/.test(s)) g=n; });
    if(j<0 || g<0) return;
    var s50=String(Z[j].sa); if(/\(3\)$/.test(s50)){ Z[j].sa=s50.replace(/\s*\(3\)$/," (3x)"); ch=true; }
    if(!(Z[g+1] && Z[g+1].nr==="54")){ Z.splice(g+1,0,cp(S54),cp(S55)); ch=true; }
    var base=P.seqFile.filter(function(e){ return e[1]<j; }), want=base.concat(END);
    if(JSON.stringify(P.seqFile)!==JSON.stringify(want)){ P.seqFile=want; P.marksFile=marks(want); P._bppEstMarks=0; P._bppEstSrc=""; ch=true; }
    if(P.quelle && P.quelle.indexOf("Str. 54")<0) P.quelle+=" · Str. 54–55 (Schluss gurudev / śrī viśvānanda) nach Heft und Aufnahme";
    if(ch){ try{ if(typeof i!=="undefined" && PRAYERS[i]===P && typeof paintLyrics==="function") paintLyrics(); }catch(e){} }
  }
  apply(); setTimeout(apply,700); setTimeout(apply,2000); setInterval(apply,3000);
  try{ if(!localStorage.getItem("bpp-v351-kv")){
    var s=JSON.parse(localStorage.getItem("bpp-marks")||"{}");
    if(s["kavacham|file"]){ delete s["kavacham|file"]; localStorage.setItem("bpp-marks",JSON.stringify(s)); }
    localStorage.setItem("bpp-v351-kv","1"); } }catch(e){}
})();
