/* [Grok-Bot] V3.98: Tasten in der Grossansicht wie in der Standardansicht.
   Vorher (v183): Pfeil links/rechts blaetterte im Gross eine Strophe, in der Standardansicht nichts;
   Strg(+Umschalt)+Pfeil spulte im Gross 10/30 s UND blaetterte zusaetzlich eine Strophe.
   Jetzt: Pfeil links/rechts allein tut auch im Gross nichts, Strg(+Umschalt)+Pfeil spult nur (v226).
   Bild auf/ab, Pfeil hoch/runter+Enter, Leertaste, Esc unveraendert. Wischen unveraendert. */
// build via v399
(function(){
  if(window.bppV398) return; window.bppV398=1;
  function fsOn(){ var f=document.getElementById("bppFs"); return !!(f&&f.classList.contains("on")); }
  function typing(t){ return t&&(/^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName)||t.isContentEditable); }
  window.addEventListener("keydown",function(e){
    if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight") return;
    if(!fsOn()||typing(e.target)||e.altKey||e.metaKey) return;
    e.preventDefault(); e.stopImmediatePropagation(); e.stopPropagation();
    if(!e.ctrlKey) return;
    var id=(e.key==="ArrowLeft"?"btnBack":"btnFwd")+(e.shiftKey?"30":"10"), b=document.getElementById(id);
    if(b&&!b.disabled) b.click();
  },true);
})();
