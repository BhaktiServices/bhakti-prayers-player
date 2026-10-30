/* [Grok-Bot] V4.66: Eine Positionsquelle fuer die Fusszeile.
   Offline-Zeile (#bppOffBar466): Status (#bppOff) → Prayers runterladen (#btnOffAll) → Als App installieren (#btnInstall)
   (Buttons NICHT in #bppOff – das hat pointer-events:none; Fix V4.66).
   → darunter Fuss (#bppFoot426): Versions-Historie (#bppHist421) → Quellen (#btnDet) → Support (#bppWishBtn447)
     → Statistik zeigen/ausblenden (#bppStats457)
   → darunter Statistik-Box (#bppStatsBox457) mit #bpp-stats / #bpp-orte24 / #bppAbc443.
   Andere Skripte duerfen diese Knoten nicht umhaengen, solange window.bppFootOrder463 gesetzt ist. */
window.BPP_BUILD="4.66"; window.BPP_SHOW="4.66";
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
  function ensureBar(){
    var bar=document.getElementById("bppOffBar466");
    if(!bar){
      bar=document.createElement("div"); bar.id="bppOffBar466";
      var foot=document.getElementById("bppFoot426");
      var host=document.getElementById("bppSrcEnd")||document.body;
      if(foot&&foot.parentNode) foot.parentNode.insertBefore(bar, foot);
      else host.appendChild(bar);
    }
    return bar;
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
    var bar=document.getElementById("bppOffBar466");
    var off=document.getElementById("bppOff");
    var foot=document.getElementById("bppFoot426");
    var box=document.getElementById("bppStatsBox457");
    /* Buttons duerfen NICHT in #bppOff liegen */
    var dl=document.getElementById("btnOffAll"), inst=document.getElementById("btnInstall");
    if(dl && off && dl.parentNode===off) return true;
    if(inst && off && inst.parentNode===off) return true;
    if(bar && orderWrong(bar, ["bppOff","btnOffAll","btnInstall"])) return true;
    if(!bar && (dl||inst||off)) return true;
    if(foot && orderWrong(foot, ["bppHist421","btnDet","bppWishBtn447","bppStats457"])) return true;
    if(box && orderWrong(box, ["bpp-stats","bpp-orte24","bppAbc443"])) return true;
    var btn=document.getElementById("bppStats457");
    if(btn && box && btn.parentNode===box) return true;
    if(btn && foot && btn.parentNode!==foot) return true;
    if(foot && box && foot.nextElementSibling!==box){
      var s=document.getElementById("bpp-stats");
      if(s && s.parentNode===box) return true;
    }
    if(bar && foot && bar.nextElementSibling!==foot) return true;
    return false;
  }
  function apply(){
    if(!needed()) return false;
    var bar=ensureBar();
    var foot=document.getElementById("bppFoot426");
    var box=ensureBox();
    placeSeq(bar, ["bppOff","btnOffAll","btnInstall"]);
    placeSeq(foot, ["bppHist421","btnDet","bppWishBtn447","bppStats457"]);
    if(box){
      placeSeq(box, ["bpp-stats","bpp-orte24","bppAbc443"]);
      if(foot && foot.parentNode && foot.nextElementSibling!==box){
        foot.parentNode.insertBefore(box, foot.nextSibling);
      }
    }
    if(bar && foot && foot.parentNode && bar.nextElementSibling!==foot){
      foot.parentNode.insertBefore(foot, bar.nextSibling);
    }
    return true;
  }

  var st=document.createElement("style");
  st.id="bppSt463";
  st.textContent=
    "#bppOffBar466{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;margin:4px 0 0;width:100%}"+
    "#bppOffBar466 #bppOff{order:1}#bppOffBar466 #btnOffAll{order:2}#bppOffBar466 #btnInstall{order:3}"+
    "#bppOffBar466 #btnOffAll,#bppOffBar466 #btnInstall{pointer-events:auto!important}"+
    "#bppFoot426{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;margin:4px 0 0}"+
    "#bppFoot426 #bppHist421{order:1}#bppFoot426 #btnDet{order:2}"+
    "#bppFoot426 #bppWishBtn447{order:3}#bppFoot426 #bppStats457{order:4}"+
    "#bppFoot426 #bppSrcInfo{order:9;flex:1 1 100%}"+
    "#bppStatsBox457{display:block;width:100%}"+
    "#bppStatsBox457 #bpp-stats{order:1}#bppStatsBox457 #bpp-orte24{order:2}"+
    "#bppStatsBox457 #bppAbc443{order:3;margin:2px 12px 0 0!important}";
  document.head.appendChild(st);

  function tick(){ if(window.bppFootOrder475) return; try{ apply(); }catch(e){} }
  setInterval(tick, 200);
  window.addEventListener("load", tick);
})();
