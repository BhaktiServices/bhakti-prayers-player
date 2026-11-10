/* [Grok-Bot] V5.21: Groß und Standard-Anzeige wieder wie V4.91 (letzte Version vor der
   Notenansicht, Commit 785185a). Noten-Knopf, Notenansicht, Taste E und Zoom sind aus;
   Groß-Layout-Änderungen v508/v509/v510-Fit/v511/v515/v516/v517/v519 deaktiviert;
   keine Geister-Elemente. Behalten: Watchdog+manuelle/Repeat-Seeks (V5.13/V5.18),
   Mitsingen-Interpolation (V5.20), Prayer-Wechsel-Paint-Token (V5.13), YT aus,
   Themes Swami/Rishi/Brahmachari + Kontrast, Kopf ≤430 px, Standard-Spalten nach
   Breite (V5.11) mit Knopf „Spalten“ + S, Mtj-Nummern, Spalten-Label. Groß: 1 Spalte.
   critical=true. */
window.BPP_BUILD="5.21"; window.BPP_SHOW="5.21";

(function(){
  if(window.bppV521) return; window.bppV521=1;

  var st=document.createElement("style");
  st.id="bppV521css";
  st.textContent=
    /* Noten-UI aus Standard und Groß */
    "#bppNotes501,#bppNotesFs508,#bppNotesFrame503,#bppNotesShell503,#bppNotesViewport502,"+
    "#bppNotesZoom,#bppNotesPlus,#bppNotesMinus,.bppNotesCap503,.bppNotesFrame503,"+
    ".bppNotesShell503,.bpp-notes-btn,button#bppNotes501,button#bppNotesFs508{"+
      "display:none!important;visibility:hidden!important;pointer-events:none!important}"+
    "#bppFs.bpp-notes-fs #bppNotesFs508{display:none!important}"+
    /* Groß-Spalten-Knopf bleibt weg */
    "#bppFs #bppFsCols515, html body #bppFs #bppFsBar #bppFsCols515{display:none!important}"+
    /* Nur Altlast-Geister (2-Spalten/Noten), nicht die V4.91-v195-Strophennaht */
    "#bppFs .bppGhost:not(.bppG195){display:none!important}"+
    /* Bühne wie V4.91 (v183: top 5vh, bottom 4vh), keine späteren Variablen/Overrides */
    "#bppFs.on #bppFsStage{"+
      "top:5vh!important;bottom:4vh!important;left:3vw!important;right:3vw!important;"+
      "padding-bottom:0!important;display:flex!important;align-items:center!important;justify-content:center!important"+
    "}"+
    "#bppFs.on #bppFsBox{display:inline-block!important;max-width:100%;max-height:none!important;overflow:visible!important}"+
    "#bppFs.on #bppFsBox .vl{white-space:nowrap!important}";
  document.head.appendChild(st);

  function killNotes(){
    try{ if(document.getElementById("bppFs")) document.getElementById("bppFs").classList.remove("bpp-notes-fs"); }catch(e){}
    ["bppNotes501","bppNotesFs508","bppNotesFrame503","bppNotesShell503","bppNotesViewport502","bppNotesZoom"].forEach(function(id){
      var e=document.getElementById(id);
      if(e&&e.parentNode) try{ e.parentNode.removeChild(e); }catch(x){}
    });
    try{
      Array.prototype.forEach.call(document.querySelectorAll(".bppNotesFrame503,.bppNotesShell503,.bppNotesViewport502,.bpp-notes-btn"), function(n){
        if(n&&n.parentNode) n.parentNode.removeChild(n);
      });
    }catch(e){}
  }

  function killGhosts(){
    try{
      Array.prototype.forEach.call(document.querySelectorAll("#bppFs .bppGhost:not(.bppG195)"), function(n){
        if(n&&n.parentNode) n.parentNode.removeChild(n);
      });
    }catch(e){}
  }

  function undoTwo(){
    var B=document.getElementById("bppFsBox");
    if(!B) return;
    if(!B.classList.contains("bppFsC2")) return;
    try{ B.classList.remove("bppFsC2"); }catch(e){}
    try{
      ["bppFsC2L","bppFsC2R","bppFsC2Head","bppFsC2Foot"].forEach(function(c){
        var el=B.querySelector("."+c);
        if(!el) return;
        while(el.firstChild) B.insertBefore(el.firstChild, el);
        if(el.parentNode) el.parentNode.removeChild(el);
      });
    }catch(e){}
  }

  function dropFsColsPref(){
    try{ localStorage.removeItem("bpp-fs-cols"); }catch(e){}
    try{ localStorage.removeItem("bpp-fs-cols-mig519"); }catch(e){}
  }

  /* Taste E (Noten) ohne Wirkung; S in Groß bleibt ohne Spalten-Wirkung (v515/v520). */
  window.addEventListener("keydown", function(e){
    if(e.ctrlKey||e.altKey||e.metaKey||e.shiftKey) return;
    var k=e.key||"";
    if(k!=="e"&&k!=="E") return;
    var t=e.target, n=t&&t.tagName;
    if(n==="INPUT"||n==="TEXTAREA"||n==="SELECT"||(t&&t.isContentEditable)) return;
    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
  }, true);

  function tick(){
    dropFsColsPref();
    killNotes();
    killGhosts();
    undoTwo();
    var b=document.getElementById("bppFsCols515");
    if(b&&b.parentNode) try{ b.parentNode.removeChild(b); }catch(e){}
  }
  tick();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", tick);
  setInterval(tick, 500);
})();
