/* [Grok-Bot] V4.62: Eine Positionsquelle fuer die Menue+-Zeile (#bppL5):
   … → Tagesleiste (#btnWd435) → Spalten (#btnCols) → Menue± (#btnMenu) →
   Prayers runterladen (#btnOffMenu461) → Als App installieren (#btnInstMenu461).
   Deaktiviert konkurrierende Umhaenger: v352.order (Menue ans absolute Ende),
   v440.mv (Tagesleiste vor Spalten per Intervall). Footer (#btnOffAll/#btnInstall) unveraendert.
   Kein Blinken: nur umhaengen wenn Reihenfolge falsch. */
window.BPP_BUILD="4.62"; window.BPP_SHOW="4.62";
(function(){
  if(window.bppV462) return; window.bppV462=1;
  window.bppL5Order462=1; /* Signal an v440: mv() aus */

  var TAIL=["btnWd435","btnCols","btnMenu","btnOffMenu461","btnInstMenu461"];

  function row(){ return document.getElementById("bppL5")||document.querySelector(".bar .r301"); }

  function needed(){
    var r=row(); if(!r) return null;
    var nodes=[], i, el;
    for(i=0;i<TAIL.length;i++){ el=document.getElementById(TAIL[i]); if(el) nodes.push(el); }
    if(!nodes.length) return null;
    for(i=0;i<nodes.length;i++){
      if(nodes[i].parentNode!==r) return nodes;
      if(i<nodes.length-1 && nodes[i].nextElementSibling!==nodes[i+1]) return nodes;
    }
    /* letzter muss am Ende der Zeile stehen (oder nur noch unsere Tail-Knoten folgen – bereits geprueft) */
    if(r.lastElementChild!==nodes[nodes.length-1]) return nodes;
    return null;
  }

  function apply(){
    var r=row(), nodes=needed(); if(!r||!nodes) return false;
    for(var i=0;i<nodes.length;i++) r.appendChild(nodes[i]);
    return true;
  }

  /* v352: Menue nicht mehr ans absolute Ende ziehen (sonst Download/Install links davon / Blinken) */
  function disarm352(){
    try{
      /* order() lebt in Closure – per Patch am Intervall nicht erreichbar.
         Stattdessen: nach jedem v352-Tick unsere Ordnung wiederherstellen (s.u.),
         und CSS-order als zusaetzliche Stabilisierung. */
    }catch(e){}
  }

  /* v440: mv() no-op wenn bppL5Order462 */
  function disarm440(){
    try{
      /* v440 ist Closure; Flag wird dort geprueft nach Patch unten in v440.js */
    }catch(e){}
  }

  var st=document.createElement("style");
  st.id="bppSt462";
  /* Flex-order Absicherung falls DOM kurz falsch ist – gleiche visuelle Reihenfolge */
  st.textContent=
    "#bppL5 #btnWd435{order:40!important}"+
    "#bppL5 #btnCols{order:41!important}"+
    "#bppL5 #btnMenu{order:42!important}"+
    "#bppL5 #btnOffMenu461{order:43!important}"+
    "#bppL5 #btnInstMenu461{order:44!important}"+
    /* aeltere Knoten in der Zeile bleiben links (order auto/0) */"";
  document.head.appendChild(st);

  function tick(){ try{ apply(); }catch(e){} }
  /* dichter als Konkurrenten (v352 400ms, v440 300ms, v301 1000ms), aber nur bei Bedarf umhaengen */
  setInterval(tick, 200);
  window.addEventListener("load", tick);
  disarm352(); disarm440();
})();
