/* [Grok-Bot] V5.20: (1) Mitsingen folgt wieder der Medienzeit, auch wenn marksFile lückenhaft
   ist (Āratī Saprem: nur erste/letzte Marke, dazwischen Silbengewicht wie v333 vorgesehen).
   V5.10 exactK („letzte Marke ≤ t“) ließ die Hervorhebung auf dem ersten Refrain stehen,
   weil die Schlussmarke außerhalb der Gruppen lag und Zwischenmarken fehlen – das war schon
   in V5.17 so, keine Regression von V5.18/V5.19.
   (2) Groß immer genau 1 Spalte: kein Spalten-Knopf, Taste S ohne Wirkung, bpp-fs-cols
   wird ignoriert und gelöscht. 2-Spalten-Zweige (v511/v515/v516/v519) laufen nicht mehr.
   Spalten in der Standardansicht (Knopf + S, bpp-cols) bleiben unverändert. critical=true. */
window.BPP_BUILD="5.20"; window.BPP_SHOW="5.20";

/* --- (1) Lückenhafte Marken: Zeilen→Gruppen, dann Interpolation statt exactK --- */
(function(){
  if(window.bppV520m) return; window.bppV520m=1;

  function remapToGroups(marks, gs){
    if(!marks||!marks.length||!gs||!gs.length) return marks||[];
    if(marks.length<=gs.length) return marks;
    var A=[];
    for(var g=0;g<gs.length;g++) A[g]=null;
    marks.forEach(function(t,n){
      if(typeof t!=="number") return;
      for(var g=0;g<gs.length;g++){
        if(gs[g].idx&&gs[g].idx.indexOf(n)>=0){
          if(A[g]==null) A[g]=t;
          break;
        }
      }
    });
    return A;
  }

  function wrapAnchors(){
    var f=window.bppAnchors;
    if(typeof f!=="function"){ try{ f=bppAnchors; }catch(e){ f=null; } }
    if(typeof f!=="function"||f.__v520) return;
    var w=function(P,gs){
      try{
        if(P&&gs&&gs.length){
          var yt=typeof ytOn!=="undefined"&&ytOn;
          var raw=yt?P.marksYt:P.marksFile;
          if(raw&&raw.length>gs.length){
            var mapped=remapToGroups(raw,gs), A={};
            mapped.forEach(function(t,g){ if(typeof t==="number") A[g]=t; });
            try{
              if(typeof bppUserMarks==="function"){
                var u=bppUserMarks(P.id);
                Object.keys(u||{}).forEach(function(k){ var g=+k; if(g<gs.length) A[g]=u[k]; });
              }
            }catch(e){}
            if(A[0]==null) A[0]=(yt?P.youtubeStart:0)||0;
            return A;
          }
        }
      }catch(e){}
      return f.apply(this,arguments);
    };
    w.__v520=1;
    window.bppAnchors=w;
    try{ bppAnchors=w; }catch(e){}
  }

  function markCount(A, gs){
    var n=0;
    if(!A||!gs) return 0;
    Object.keys(A).forEach(function(g){
      g=+g;
      if(g>=0&&g<gs.length&&typeof A[g]==="number") n++;
    });
    return n;
  }

  function isSparse(P, gs){
    if(!P||!gs||!gs.length) return false;
    try{
      var s=(typeof bppSeqOf==="function")?bppSeqOf(P):((typeof ytOn!=="undefined"&&ytOn)?P.seqYt:P.seqFile);
      if(s&&s.length) return false;
    }catch(e){}
    var A=null;
    try{ A=(typeof bppAnchors==="function")?bppAnchors(P,gs):null; }catch(e){}
    var n=markCount(A,gs);
    return n<2 || n<gs.length*0.5;
  }

  function fromStarts(p){
    var st=bppStarts(p), k=0, t=(p&&p.t||0)+0.05;
    for(var g=0;g<st.length;g++){ if(st[g]<=t) k=g; }
    return k;
  }

  function wrapProg(){
    var f=window.stanzaFromProgress;
    if(typeof f!=="function"||f.__v520) return;
    var w=function(p){
      try{
        if(p&&p.gs&&typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined"){
          var P=PRAYERS[i];
          if(isSparse(P,p.gs) && typeof bppStarts==="function") return fromStarts(p);
        }
      }catch(e){}
      return f.apply(this,arguments);
    };
    w.__v520=1;
    w.__v510=1; /* v510 soll uns nicht wieder nach außen wrappen */
    window.stanzaFromProgress=w;
    try{ stanzaFromProgress=w; }catch(e){}
  }

  wrapAnchors(); wrapProg();
  setInterval(function(){ wrapAnchors(); wrapProg(); }, 400);
  window.bppSparseMarks520=isSparse;
  window.bppRemapMarks520=remapToGroups;
})();

/* --- (2) Groß: immer 1 Spalte, kein Spalten-Knopf, S ohne Wirkung --- */
(function(){
  if(window.bppV520c) return; window.bppV520c=1;

  var st=document.createElement("style");
  st.id="bppV520c";
  st.textContent=
    "#bppFs #bppFsCols515, html body #bppFs #bppFsBar #bppFsCols515,"+
    "html body #bppFs #bppFsBar .row>#bppFsCols515,"+
    "#bppFs.bpp-notes-fs #bppFsCols515{display:none!important}";
  document.head.appendChild(st);

  function dropFsColsPref(){
    try{ localStorage.removeItem(window.bppFsColsKey||"bpp-fs-cols"); }catch(e){}
    try{ localStorage.removeItem("bpp-fs-cols"); }catch(e){}
    try{ localStorage.removeItem("bpp-fs-cols-mig519"); }catch(e){}
  }
  dropFsColsPref();

  function fsOn(){
    var f=document.getElementById("bppFs");
    return !!(f&&f.classList.contains("on"));
  }

  function killFsColsBtn(){
    var b=document.getElementById("bppFsCols515");
    if(b&&b.parentNode) try{ b.parentNode.removeChild(b); }catch(e){}
  }

  function undoTwo(){
    var B=document.getElementById("bppFsBox");
    if(!B||!B.classList.contains("bppFsC2")) return;
    try{
      if(typeof window.bppFsApplyCols==="function") window.bppFsApplyCols();
    }catch(e){}
    /* Falls apply nicht rückgängig macht: Klasse und Split-Knoten entfernen */
    if(!B.classList.contains("bppFsC2")) return;
    try{
      var L=B.querySelector(".bppFsC2L"), R=B.querySelector(".bppFsC2R");
      var H=B.querySelector(".bppFsC2Head"), F=B.querySelector(".bppFsC2Foot");
      function unwrap(el){
        if(!el) return;
        while(el.firstChild) B.insertBefore(el.firstChild, el);
        if(el.parentNode) el.parentNode.removeChild(el);
      }
      unwrap(H); unwrap(L); unwrap(R); unwrap(F);
      B.classList.remove("bppFsC2");
    }catch(e){ try{ B.classList.remove("bppFsC2"); }catch(x){} }
  }

  function wrapWant(){
    var prev=window.bppFsWantTwo;
    if(typeof prev==="function"&&prev.__v520) return;
    var w=function(){ return false; };
    w.__v520=1;
    window.bppFsWantTwo=w;
  }

  function wrapToggle(){
    var prev=window.bppFsColsToggle;
    var w=function(){ dropFsColsPref(); killFsColsBtn(); return; };
    w.__v520=1;
    window.bppFsColsToggle=w;
  }

  function wrapUserCols(){
    var w=function(){ return 1; };
    w.__v520=1;
    window.bppFsUserCols=w;
  }

  /* Taste S in Groß schlucken, damit sie nicht die Standard-Spalten ändert.
     In der Standardansicht bleibt S unverändert (v352/btnCols). */
  window.addEventListener("keydown", function(e){
    if(e.ctrlKey||e.altKey||e.metaKey||e.shiftKey) return;
    var k=e.key||"";
    if(k!=="s"&&k!=="S") return;
    var t=e.target, n=t&&t.tagName;
    if(n==="INPUT"||n==="TEXTAREA"||n==="SELECT"||(t&&t.isContentEditable)) return;
    if(!fsOn()) return;
    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
  }, true);

  function tick(){
    dropFsColsPref();
    killFsColsBtn();
    wrapWant();
    wrapToggle();
    wrapUserCols();
    if(fsOn()) undoTwo();
  }
  tick();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", tick);
  setInterval(tick, 400);
})();
