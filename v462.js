/* [Grok-Bot] V4.65: Menue+-Zeile ohne Download/Install (nur noch unten).
   Reihenfolge: … → Tagesleiste (#btnWd435) → Spalten (#btnCols) → Menue± (#btnMenu).
   Eine Positionsquelle; v461 erzeugt keine Menu+-Duplikate mehr. */
window.BPP_BUILD="4.65"; window.BPP_SHOW="4.65";
(function(){
  if(window.bppV462) return; window.bppV462=1;
  window.bppL5Order462=1;

  var TAIL=["btnWd435","btnCols","btnMenu"];

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
    if(r.lastElementChild!==nodes[nodes.length-1]){
      /* erlauben, dass nach Menue noch andere Knoten stehen, solange Tail-Reihenfolge stimmt */
      var kids=[].slice.call(r.children);
      var idxs=nodes.map(function(n){ return kids.indexOf(n); });
      for(i=1;i<idxs.length;i++) if(idxs[i]<idxs[i-1]) return nodes;
      return null;
    }
    return null;
  }

  function apply(){
    var r=row(), nodes=needed(); if(!r||!nodes) return false;
    /* Duplikate aus alter V4.61 entfernen */
    ["btnOffMenu461","btnInstMenu461"].forEach(function(id){
      var el=document.getElementById(id); if(el&&el.parentNode) el.parentNode.removeChild(el);
    });
    for(var i=0;i<nodes.length;i++) r.appendChild(nodes[i]);
    return true;
  }

  var st=document.createElement("style");
  st.id="bppSt462";
  st.textContent=
    "#bppL5 #btnWd435{order:40!important}"+
    "#bppL5 #btnCols{order:41!important}"+
    "#bppL5 #btnMenu{order:42!important}"+
    "#bppL5 #btnOffMenu461,#bppL5 #btnInstMenu461{display:none!important}";
  document.head.appendChild(st);

  function tick(){ try{ apply(); }catch(e){} }
  setInterval(tick, 200);
  window.addEventListener("load", tick);
})();
