/* [Grok-Bot] V5.32: Normalansicht und Groß zeigen dieselbe Strophe zur selben Medienzeit.
   Ursache: Die Groß-Anzeige rechts oben nutzte (Gruppenindex+1)/Anzahl, nicht die
   Strophennummer aus den Lyrics. Sobald ein Prayer eine Extra-Gruppe hat (Dohā,
   Refrain, Mangala, Suktam-Vorspann), weicht diese Zahl ab — nicht nur bei Hanumān
   Rec: Mtj (Gruppe 0 = Dohā, zu Strophe 19 stand „19 · 20/28“). Rec: Pbj stimmte
   bereits. Dieselbe Korrektur gilt für alle Prayers. Beide Ansichten nutzen eine
   gemeinsame Zeit-zu-Strophe-Funktion. critical=false. */
window.BPP_BUILD="5.32"; window.BPP_SHOW="5.32";
(function(){
  if(window.bppV532) return; window.bppV532=1;

  function Pcur(){
    try{ return (typeof i==="undefined"||i<0||typeof PRAYERS==="undefined")?null:PRAYERS[i]; }catch(e){ return null; }
  }
  function groupsOf(P){
    try{ return (P&&typeof stanzaGroups==="function")?stanzaGroups(P):[]; }catch(e){ return []; }
  }
  function labelOf(P, g, k){
    if(!g) return String(k+1);
    /* Dieselbe Nummer wie .vn in der Normalansicht: numerischer Gruppen-Schlüssel. */
    if(/^\d+$/.test(g.key||"")) return g.key;
    var raw="";
    try{ raw=P.zeilen&&P.zeilen[g.start]?String(P.zeilen[g.start].nr||""):""; }catch(e){}
    if(raw && !/^K[īi]rtan/i.test(raw) && /^\d+$/.test(raw)) return raw;
    return raw||g.key||String(k+1);
  }

  /* Eine Quelle: aktuelle Strophe aus der Medienzeit (dieselbe Instanz wie Mitlesen). */
  window.bppStanzaNow=function(){
    var P=Pcur(); if(!P) return null;
    var gs=groupsOf(P); if(!gs.length) return null;
    var k=0;
    try{
      if(typeof songProgress==="function" && typeof stanzaFromProgress==="function"){
        var p=songProgress();
        if(p&&p.gs) k=stanzaFromProgress(p);
      }else if(typeof currentGroupIndex==="function"){
        k=currentGroupIndex();
      }
    }catch(e){}
    if(k==null||k<0) k=0;
    if(k>gs.length-1) k=gs.length-1;
    var g=gs[k], nr=labelOf(P,g,k);
    var right=/^\d+$/.test(String(nr))?String(nr):String(k+1);
    return {k:k, nr:String(nr), right:right, n:gs.length, start:g?g.start:0, key:g?g.key:null};
  };

  window.bppFsInd532=function(pagePart){
    var s=window.bppStanzaNow(); if(!s) return null;
    var txt=s.nr+"  ·  "+s.right+"/"+s.n;
    if(pagePart) txt+=pagePart;
    return txt;
  };

  function pageSuffix(el){
    var t=el&&el.textContent||"";
    var m=t.match(/(\s+·\s+\d+\/2)\s*$/);
    return m?m[1]:"";
  }

  function paintInd(){
    try{
      var fs=document.getElementById("bppFs");
      if(!fs||!fs.classList.contains("on")) return;
      var el=document.getElementById("bppFsT2"); if(!el) return;
      var s=window.bppStanzaNow(); if(!s) return;
      var want=s.nr+"  ·  "+s.right+"/"+s.n+pageSuffix(el);
      if(el.textContent!==want) el.textContent=want;
    }catch(e){}
  }

  function followLine(){
    try{
      if(typeof autoScroll==="undefined"||!autoScroll||typeof i==="undefined"||i<0) return;
      if(typeof isPlaying==="function"&&!isPlaying()) return;
      if(typeof holdLineUntil==="number"&&Date.now()<holdLineUntil) return;
      if(window.bppSeekPending) return;
      var s=window.bppStanzaNow(); if(!s) return;
      if(typeof line!=="undefined" && s.start!==line){
        line=s.start;
        try{ if(typeof persistNow==="function") persistNow(); }catch(e){}
        try{ if(typeof paintLyrics==="function") paintLyrics(); }catch(e){}
        setTimeout(function(){ try{ if(typeof pinStanza==="function") pinStanza(); }catch(e){} }, 30);
      }
    }catch(e){}
  }

  var al=window.autoLineFromTime;
  if(typeof al==="function" && !al.__v532){
    window.autoLineFromTime=function(){
      followLine();
      return al.apply(this, arguments);
    };
    window.autoLineFromTime.__v532=1;
  }

  var mo=null;
  function hookT2(){
    var el=document.getElementById("bppFsT2");
    if(!el||el.__v532) return;
    el.__v532=1;
    try{
      mo=new MutationObserver(function(){ paintInd(); });
      mo.observe(el,{characterData:true,childList:true,subtree:true});
    }catch(e){}
    paintInd();
  }

  hookT2();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", hookT2);
  setInterval(function(){ hookT2(); paintInd(); }, 250);
})();
