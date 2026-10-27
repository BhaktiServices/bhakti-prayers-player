/* [Grok-Bot] V4.41: (1) Ashtottaram, Aufnahme "Rec: Pbj" (v405.js): Namenmarken 13, 100-108 nachgemessen bzw. korrigiert - der Sync blieb ab Strophe 102 stehen.
   (2) Vishwananda Gayatri (guruji-gayatri) und Gayatri Mantra (gayatri): "(3×)" hinter der letzten Zeile, in allen Ansichten und Sprachen.
       Nur Anzeige (Span .x2 wie die bisherigen Wiederholungsangaben), der Liedtext selbst bleibt unveraendert -> Akkord-Positionen (v365) und CZ-Zuordnung (v432) bleiben gleich.
   (3) Krishna Suprabhatam je Rec ohne Vorlauf, (4) Govinda Mtj-Marken, (5) Durchlauf: Audio/Lyrics immer derselbe Prayer - siehe unten. */
window.BPP_BUILD="4.41"; window.BPP_SHOW="4.41";
(function(){
  if(window.bppV441) return; window.bppV441=1;
  var IDS={"guruji-gayatri":1,"gayatri":1}, TXT=" (3×)";
  function cur(){ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function deco(){ var P=cur(); if(!P||!IDS[P.id]||!P.zeilen) return; var n=P.zeilen.length-1;
    [].forEach.call(document.querySelectorAll(".rowline[data-n='"+n+"']"),function(r){
      var lns=r.querySelectorAll(".sa > .ln"); if(!lns.length) return; var ln=lns[lns.length-1];
      if(ln.querySelector(".x441")) return;
      var s=document.createElement("span"); s.className="x2 x441"; s.textContent=TXT; ln.appendChild(s); }); }
  window.bppDeco441=deco;
  function hook(){ if(typeof window.paintLyrics!=="function"||window.paintLyrics._v441) return; var o=window.paintLyrics;
    var w=function(){ var r=o.apply(this,arguments); try{ deco(); }catch(e){} return r; }; w._v441=1; window.paintLyrics=w; }
  hook(); setInterval(function(){ hook(); deco(); },400);
  window.addEventListener("load",function(){ hook(); deco(); });
})();
/* [Grok-Bot] V4.41 (3) Krishna Suprabhatam: eigene Zeitmarken je Aufnahme, gemessen an der jeweiligen Audio (Start = erster gesungener Ton;
   Chroma-Periodik + Pegel-Einsatz nach der Atempause + Whisper auf dem Demucs-Gesang). Vorher nutzte "Rec: Pbj" die Marken von Mtj,
   und die Anzeige wechselte durch Vorlauf (v187: 1,2 s bzw. Pausenanfang, follow.js +0,5 s, v434 duldet 1,6 s) zu frueh.
   Jetzt wechselt die Anzeige bei Suprabhatam genau an der Marke (letzte Marke <= Medienzeit), ohne Vorlauf. Andere Prayers unveraendert.
   Hinweis: Das Mtj-YouTube VlqY4h-B6X8 ist dieselbe (Maenner-)Aufnahme wie audio/suprabhatam-ra.mp3, das Pbj-YouTube cvc8K05QqVU dieselbe wie audio/suprabhatam-prabhus.mp3. */
(function(){
  if(window.bppV441s) return; window.bppV441s=1;
  var MF=[2.7,21.9,41.8,61.1,80.3,99.5,118.8,138.0,157.1,176.5,195.8,214.9,234.2,253.4,272.6,293.2],      /* audio/suprabhatam.mp3 (Mtj) */
      RA=[7.2,28.0,49.5,69.8,90.0,110.2,130.2,150.2,169.9,189.7,209.1,228.5,248.0,267.4,286.8,307.2],     /* audio/suprabhatam-ra.mp3 (Pbj) = YT VlqY4h-B6X8 (Mtj-YT) */
      PY=[9.2,28.9,49.0,68.5,87.8,107.0,126.2,145.4,164.6,183.9,203.1,222.4,241.8,261.1,280.4,301.2];     /* YT cvc8K05QqVU (Pbj-YT) */
  function onS(){ try{ return localStorage.getItem("bpp-prabhus-suprabhatam")==="prabhus"; }catch(e){ return false; } }
  function def(P,k,f){ var d=Object.getOwnPropertyDescriptor(P,k); if(d&&d.get&&d.get.__v441) return;
    var g=function(){ return f().slice(); }; g.__v441=1;
    Object.defineProperty(P,k,{configurable:true,enumerable:true,get:g,set:function(){}}); }
  function hook(){ if(typeof PRAYERS==="undefined") return; var P=PRAYERS.find(function(p){ return p.id==="suprabhatam"; }); if(!P) return;
    def(P,"marksFile",function(){ return onS()?RA:MF; }); def(P,"marksYt",function(){ return onS()?PY:RA; });
    ["seqFile","seqYt"].forEach(function(k){ if(P[k]) try{ delete P[k]; }catch(e){} });
    P._bppEstMarks=0; P._bppEstYt=0; }
  function mt(){ try{ if(typeof ytOn!=="undefined"&&ytOn) return typeof ytTime==="number"?ytTime:null; var a=document.getElementById("a"); return a&&a.src?a.currentTime:null; }catch(e){ return null; } }
  /* Strophe = letzte Marke <= Medienzeit (ohne Vorlauf), Nutzer-Marken (bppAnchors) eingerechnet */
  function exact(p){ if(typeof i==="undefined"||i<0) return null; var P=PRAYERS[i]; if(!P||P.id!=="suprabhatam"||!p||!p.gs) return null;
    var t=mt(); if(t==null) return null; var A=null; try{ A=(typeof bppAnchors==="function")?bppAnchors(P,p.gs):null; }catch(e){}
    if(!A){ A={}; var m=(typeof ytOn!=="undefined"&&ytOn)?P.marksYt:P.marksFile; (m||[]).forEach(function(x,g){ if(typeof x==="number") A[g]=x; }); }
    var k=0; Object.keys(A).forEach(function(g){ g=+g; if(g<p.gs.length&&A[g]<=t+0.05&&g>k) k=g; }); return k; }
  function wrap(){ var f=window.stanzaFromProgress; if(typeof f!=="function"||f.__v441) return;
    var w=function(p){ try{ var k=exact(p); if(k!=null) return k; }catch(e){} return f.apply(this,arguments); }; w.__v441=1; window.stanzaFromProgress=w; }
  hook(); wrap(); setInterval(function(){ hook(); wrap(); },300);
  document.addEventListener("DOMContentLoaded",function(){ hook(); wrap(); }); window.addEventListener("load",function(){ hook(); wrap(); });
  window.bppSupraExact441=function(){ var p=null; try{ p=songProgress(); }catch(e){} return exact(p); };
})();
/* [Grok-Bot] V4.41 (4) The Govinda Prayer, Aufnahme "Rec: Mtj" (audio/govinda.mp3): alle 29 Strophenmarken neu gemessen (Demucs-Gesang,
   Chroma-Periodik ca. 25,7 s + Pegel-Einsatz nach der Atempause, Kontrolle mit Whisper). Vorher fehlten Marken fuer Str. 1, 3-4, 7-9, 12-15, 25-26;
   Str. 12-15 ganz ohne Marke -> ab Str. 15 lief die Anzeige neben der Stimme. Str. 5/6 waren 1,4/3,0 s, der Schluss 2,1 s zu spaet.
   YouTube 3tMcSlnV_rc (Mtj-YT, andere Aufnahme): fehlende Marken aus demselben Chroma-Raster (verankert an den vorhandenen Marken) ergaenzt, Str. 6 korrigiert.
   Rec: Pbj (v408.js) unveraendert. */
(function(){
  if(window.bppV441g) return; window.bppV441g=1;
  var GF=[13.0,44.6,70.4,96.0,121.8,147.5,173.1,198.9,224.6,250.2,275.8,301.6,327.3,353.1,378.7,404.5,430.1,455.8,481.7,507.3,532.8,558.8,584.5,610.2,635.9,661.6,687.4,713.2,740.4];
  var GY=[null,34,62.2,88.9,115,142.6,169.6,196.2,223.4,251,276,302.6,328.3,353.8,379.4,404.5,430,455,480,505.5,530,554.8,579.7,605,629.8,654.4,679,704.5,733];
  function pbj(){ try{ return localStorage.getItem("bpp-prabhus-govinda")==="prabhus"; }catch(e){ return false; } }
  function def(P,k,v){ var d=Object.getOwnPropertyDescriptor(P,k); if(d&&d.get&&d.get.__v441) return;
    var prev=d&&d.get?d.get:null, base=d&&!d.get?d.value:undefined, ps=d&&d.set?d.set:null;
    var g=function(){ if(pbj()) return prev?prev.call(P):base; return v.slice(); }; g.__v441=1;
    Object.defineProperty(P,k,{configurable:true,enumerable:true,get:g,set:function(x){ if(ps) ps.call(P,x); else base=x; }}); }
  function hook(){ if(typeof PRAYERS==="undefined") return; var P=PRAYERS.find(function(p){ return p.id==="govinda"; }); if(!P) return;
    def(P,"marksFile",GF); def(P,"marksYt",GY);
    ["seqFile","seqYt"].forEach(function(k){ var d=Object.getOwnPropertyDescriptor(P,k); if(d&&d.get&&d.get.__v441) return; var prev=d&&d.get?d.get:null, base=d&&!d.get?d.value:undefined, ps=d&&d.set?d.set:null;
      var g=function(){ return pbj()?(prev?prev.call(P):base):undefined; }; g.__v441=1;
      Object.defineProperty(P,k,{configurable:true,enumerable:true,get:g,set:function(x){ if(ps) ps.call(P,x); else base=x; }}); });
    if(!pbj()){ P._bppEstMarks=0; P._bppEstYt=0; } }
  hook(); setInterval(hook,300); document.addEventListener("DOMContentLoaded",hook); window.addEventListener("load",hook);
})();
/* [Grok-Bot] V4.41 (5) Durchlauf / >| / |<: Audio, Titel, Lyrics und Marken gehoeren immer zum selben Prayer.
   - Ursache: Laeuft ein Prayer ueber YouTube (Taste YT oder MP3-Ausfall -> YouTube), gehoeren die Medientasten (Sperrbildschirm/Benachrichtigung, >|)
     und das Ende-Bild dem eingebetteten YouTube-Player. Beim Govinda-Video (Album "Bhakti Marga Music - Topic") laedt >| dort das naechste
     Album-Video "Sri Narasimha Prayer" IM SELBEN Player - die App bekam davon nichts mit: Lyrics/Titel/Marken blieben bei Govinda.
   - Fix: Meldet der YouTube-Player eine andere Video-ID als die des laufenden Prayers, wechselt die App auf den Prayer mit dieser Video-ID
     (sonst ueber den zentralen Weiter-Weg bppPrayerNav.next). Ebenso fuer MP3: gehoert die geladene Datei eindeutig zu einem anderen Prayer, folgen Lyrics/Titel.
   - Ein zentraler Weiter-/Zurueck-Weg: auch die alten Tasten (nextSong/prevSong) laufen ueber bppPrayerNav (Liste/Alle wie die Wiederholen-Taste).
   - Geprueft: ended-/timeupdate-/message-Listener werden je einmal registriert (Zaehlung ueber viele Wechsel konstant), pro Ende genau ein play(),
     kein Index-Ueberlauf am Listenende (Wrap), keine wachsenden Intervalle (follow.js loescht seinen Timer). */
(function(){
  if(window.bppV441n) return; window.bppV441n=1;
  var lastPlay=0, seen={};
  function cur(){ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function wrapPlay(){ var f=window.play; if(typeof f!=="function"||f.__v441) return; var w=function(){ lastPlay=Date.now(); seen={}; return f.apply(this,arguments); }; w.__v441=1; window.play=w; }
  function wrapSong(){ ["nextSong","prevSong"].forEach(function(n,k){ var f=window[n]; if(typeof f!=="function"||f.__v441) return;
      var w=function(){ var nv=window.bppPrayerNav; if(nv&&typeof nv.next==="function"&&cur()){ try{ return k?nv.prev():nv.next(); }catch(e){} } return f.apply(this,arguments); }; w.__v441=1; window[n]=w; }); }
  function go(j, t){ var P=PRAYERS[j]; if(!P) return; try{ putSong(P.id,{time:t||0,line:0}); }catch(e){} try{ play(j,true); }catch(e){} }
  function vidOf(info){ if(!info) return null; if(info.videoData&&info.videoData.video_id) return info.videoData.video_id;
    if(typeof info.videoUrl==="string"){ var m=info.videoUrl.match(/[?&]v=([\w-]{11})/); if(m) return m[1]; } return null; }
  window.addEventListener("message",function(e){
    var d=e.data; if(typeof d==="string"){ try{ d=JSON.parse(d); }catch(x){ return; } }
    if(!d||d.event!=="infoDelivery"||!d.info) return;
    if(typeof ytOn==="undefined"||!ytOn) return; var P=cur(); if(!P||!P.youtube) return;
    var yt=document.getElementById("yt"); if(yt&&e.source&&yt.contentWindow&&e.source!==yt.contentWindow) return;
    var v=vidOf(d.info); if(!v||v===P.youtube) { if(v) seen={}; return; }
    if(Date.now()-lastPlay<4000) return;               /* Meldungen des vorherigen Videos nach einem Wechsel ignorieren */
    seen[v]=(seen[v]||0)+1; if(seen[v]<2) return;      /* zweimal bestaetigt */
    seen={}; var j=-1; for(var k=0;k<PRAYERS.length;k++){ if(k!==i&&PRAYERS[k].youtube===v){ j=k; break; } }
    window.bpp441Log=(window.bpp441Log||[]).concat([["yt-foreign",P.id,v,j]]);
    if(j>=0) go(j,0); else { try{ window.bppPrayerNav.next(); }catch(x){} }
  });
  function base(u){ try{ return decodeURIComponent(String(u||"").split("?")[0].split("#")[0].split("/").pop()); }catch(e){ return ""; } }
  function files(P){ var L=[]; try{ L=[P.audio].concat(P.audioAlt||[]).filter(Boolean).map(base); }catch(e){} return L; }
  function check(){ try{
    if(typeof ytOn!=="undefined"&&ytOn) return; var P=cur(), a=document.getElementById("a"); if(!P||!a||!a.currentSrc||a.paused) return;
    if(Date.now()-lastPlay<3000) return; var f=base(a.currentSrc); if(!f||files(P).indexOf(f)>=0) return;
    var hit=[]; PRAYERS.forEach(function(Q,k){ if(k!==i&&files(Q).indexOf(f)>=0) hit.push(k); });
    if(hit.length!==1) return;
    window.bpp441Log=(window.bpp441Log||[]).concat([["file-foreign",P.id,f,hit[0]]]);
    go(hit[0], a.currentTime||0);
  }catch(e){} }
  wrapPlay(); wrapSong(); setInterval(function(){ wrapPlay(); wrapSong(); check(); },1000);
  document.addEventListener("DOMContentLoaded",function(){ wrapPlay(); wrapSong(); });
})();
