/* [Grok-Bot] V4.65: Eine Positionsquelle fuer die Fusszeile.
   Offline-Zeile (#bppOff): Prayers runterladen (#btnOffAll) → Als App installieren (#btnInstall)
   → darunter Fuss (#bppFoot426): Versions-Historie (#bppHist421) → Quellen (#btnDet) → Support (#bppWishBtn447)
     → Statistik zeigen/ausblenden (#bppStats457)
   → darunter Statistik-Box (#bppStatsBox457) mit #bpp-stats / #bpp-orte24 / #bppAbc443
     (Inhalt sichtbar wenn body.bpp-st-on; Default ein = v457).
   Andere Skripte duerfen diese Knoten nicht umhaengen, solange window.bppFootOrder463 gesetzt ist. */
window.BPP_BUILD="4.65"; window.BPP_SHOW="4.65";
(function(){
  if(window.bppV463) return; window.bppV463=1;
  window.bppFootOrder463=1;

  function kids(p){ return p ? [].slice.call(p.children) : []; }
  function orderWrong(parent, ids){
    if(!parent) return false;
    var nodes=[], i, el;
    for(i=0;i<ids.length;i++){ el=document.getElementById(ids[i]); if(el) nodes.push(el); }
    if(nodes.length<2) return false;
    for(i=0;i<nodes.length;i++){
      if(nodes[i].parentNode!==parent) return true;
    }
    for(i=0;i<nodes.length-1;i++){
      if(nodes[i].nextElementSibling!==nodes[i+1]){
        /* erlauben, dass dazwischen andere Knoten stehen, solange Reihenfolge der bekannten stimmt */
        var k=kids(parent);
        var idxs=nodes.map(function(n){ return k.indexOf(n); });
        for(var j=1;j<idxs.length;j++) if(idxs[j]<0||idxs[j]<idxs[j-1]) return true;
        return false;
      }
    }
    return false;
  }
  function placeSeq(parent, ids){
    if(!parent) return;
    var nodes=[], i, el;
    for(i=0;i<ids.length;i++){ el=document.getElementById(ids[i]); if(el) nodes.push(el); }
    for(i=0;i<nodes.length;i++){
      if(nodes[i].parentNode!==parent || (i&&nodes[i-1].nextElementSibling!==nodes[i])){
        parent.appendChild(nodes[i]);
      }
    }
  }
  function ensureBox(){
    var box=document.getElementById("bppStatsBox457");
    var s=document.getElementById("bpp-stats");
    if(!box && s){
      box=document.createElement("div"); box.id="bppStatsBox457";
      var foot=document.getElementById("bppFoot426");
      if(foot&&foot.parentNode) foot.parentNode.insertBefore(box, foot.nextSibling);
      else if(s.parentNode) s.parentNode.insertBefore(box, s);
    }
    return box;
  }
  function needed(){
    var off=document.getElementById("bppOff");
    var foot=document.getElementById("bppFoot426");
    var box=document.getElementById("bppStatsBox457");
    if(off && orderWrong(off, ["btnOffAll","btnInstall"])) return true;
    if(foot && orderWrong(foot, ["bppHist421","btnDet","bppWishBtn447","bppStats457"])) return true;
    if(box && orderWrong(box, ["bpp-stats","bpp-orte24","bppAbc443"])) return true;
    /* Knopf darf nicht in der Stats-Box liegen */
    var btn=document.getElementById("bppStats457");
    if(btn && box && btn.parentNode===box) return true;
    if(btn && foot && btn.parentNode!==foot) return true;
    /* Box soll direkt nach Foot stehen */
    if(foot && box && foot.nextElementSibling!==box){
      var s=document.getElementById("bpp-stats");
      if(s && s.parentNode===box) return true;
    }
    return false;
  }
  function apply(){
    if(!needed()) return false;
    var off=document.getElementById("bppOff");
    var foot=document.getElementById("bppFoot426");
    var box=ensureBox();
    placeSeq(off, ["btnOffAll","btnInstall"]);
    placeSeq(foot, ["bppHist421","btnDet","bppWishBtn447","bppStats457"]);
    if(box){
      placeSeq(box, ["bpp-stats","bpp-orte24","bppAbc443"]);
      if(foot && foot.parentNode && foot.nextElementSibling!==box){
        foot.parentNode.insertBefore(box, foot.nextSibling);
      }
    }
    return true;
  }

  var st=document.createElement("style");
  st.id="bppSt463";
  st.textContent=
    "#bppOff{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:4px 0 0}"+
    "#bppOff #btnOffAll{order:1}#bppOff #btnInstall{order:2}"+
    "#bppFoot426{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;margin:4px 0 0}"+
    "#bppFoot426 #bppHist421{order:1}#bppFoot426 #btnDet{order:2}"+
    "#bppFoot426 #bppWishBtn447{order:3}#bppFoot426 #bppStats457{order:4}"+
    "#bppFoot426 #bppSrcInfo{order:9;flex:1 1 100%}"+
    "#bppStatsBox457{display:block;width:100%}"+
    "#bppStatsBox457 #bpp-stats{order:1}#bppStatsBox457 #bpp-orte24{order:2}"+
    "#bppStatsBox457 #bppAbc443{order:3;margin:2px 12px 0 0!important}";
  document.head.appendChild(st);

  function tick(){ try{ apply(); }catch(e){} }
  setInterval(tick, 200);
  window.addEventListener("load", tick);
})();
