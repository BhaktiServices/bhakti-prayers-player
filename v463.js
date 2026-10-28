/* [Grok-Bot] V4.63: Eine Positionsquelle fuer die Fusszeile.
   Reihenfolge: Offline-Status (#bppOff) · Prayers runterladen (#btnOffAll) · Als App installieren (#btnInstall)
   → Versions-Historie (#bppHist421) · Quellen (#btnDet) · Support (#bppWishBtn447)
   → darunter Statistik-Knopf (#bppStats457) in #bppStatsBox457 (mit #bpp-stats / #bpp-orte24 / #bppAbc443).
   Deaktiviert konkurrierende Umhaenger (v366/v446/v421/v443/v447/v457-Reparent).
   Kein MutationObserver; nur umhaengen wenn Reihenfolge falsch. */
window.BPP_BUILD="4.63"; window.BPP_SHOW="4.63";
(function(){
  if(window.bppV463) return; window.bppV463=1;
  window.bppFootOrder463=1;

  function $(id){ return document.getElementById(id); }
  function srcEnd(){ return $("bppSrcEnd"); }

  function ensureBtns(){
    var w=srcEnd(); if(!w) return null;
    var row=$("bppFootBtns463");
    if(!row){
      row=w.querySelector(":scope>.btns");
      if(!row){ row=document.createElement("div"); row.className="btns"; w.insertBefore(row, w.firstChild); }
      row.id="bppFootBtns463";
    }
    return row;
  }

  function ensureFoot(){
    var r=$("bppFoot426");
    if(!r){
      r=document.createElement("div"); r.id="bppFoot426";
      r.style.cssText="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:6px 10px;padding:0 0 8px";
    }
    return r;
  }

  function ensureStatsBox(){
    var box=$("bppStatsBox457");
    if(!box){ box=document.createElement("div"); box.id="bppStatsBox457"; }
    return box;
  }

  /* true wenn die bekannten Kinder in ids-Reihenfolge direkte Geschwister in parent sind (andere IDs dazwischen ok, ausser verbotene) */
  function orderWrong(parent, ids){
    if(!parent) return true;
    var present=[], i, el;
    for(i=0;i<ids.length;i++){ el=$(ids[i]); if(el) present.push(el); }
    if(present.length<2){
      for(i=0;i<present.length;i++) if(present[i].parentNode!==parent) return true;
      return false;
    }
    for(i=0;i<present.length;i++) if(present[i].parentNode!==parent) return true;
    var kids=[].slice.call(parent.children);
    var idxs=present.map(function(n){ return kids.indexOf(n); });
    for(i=1;i<idxs.length;i++) if(idxs[i]<idxs[i-1]) return true;
    return false;
  }

  function placeSeq(parent, ids){
    var i, el, last=null;
    for(i=0;i<ids.length;i++){
      el=$(ids[i]); if(!el) continue;
      if(last){
        if(el.parentNode!==parent || last.nextElementSibling!==el){
          if(last.nextSibling) parent.insertBefore(el, last.nextSibling);
          else parent.appendChild(el);
        }
      } else if(el.parentNode!==parent){
        parent.insertBefore(el, parent.firstChild);
      }
      last=el;
    }
  }

  function wrong(){
    var w=srcEnd(); if(!w) return false;
    var row=$("bppFootBtns463")||w.querySelector(":scope>.btns");
    var foot=$("bppFoot426");
    var box=$("bppStatsBox457");
    if(!row||!foot) return true;
    if(orderWrong(row, ["bppOff","btnOffAll","btnInstall"])) return true;
    if(foot.parentNode===box) return true;
    if(orderWrong(foot, ["bppHist421","btnDet","bppWishBtn447"])) return true;
    var inf=$("bppSrcInfo"), wish=$("bppWishBtn447");
    if(inf && wish && inf.parentNode===foot && wish.parentNode===foot){
      var fk=[].slice.call(foot.children);
      if(fk.indexOf(inf)<fk.indexOf(wish)) return true; /* SrcInfo muss hinter Support */
    }
    if(box){
      if(foot.parentNode && box.parentNode && foot.parentNode===box.parentNode){
        /* box muss nach foot kommen */
        var kids=[].slice.call(foot.parentNode.children);
        if(kids.indexOf(box)<kids.indexOf(foot)) return true;
      } else if(box.parentNode!==foot.parentNode) return true;
      if(orderWrong(box, ["bppStats457","bpp-stats","bpp-orte24","bppAbc443"])) return true;
      var o=$("bpp-orte24"); if(o&&o.parentNode && o.parentNode!==box) return true;
    }
    /* Off-Zeile vor Foot, beide unter bppSrcEnd wenn moeglich */
    if(row.parentNode===w && foot.parentNode===w){
      var kids2=[].slice.call(w.children);
      if(kids2.indexOf(foot)<kids2.indexOf(row)) return true;
    }
    return false;
  }

  function apply(){
    var w=srcEnd(); if(!w) return false;
    if(!wrong()) return false;

    var row=ensureBtns();
    var foot=ensureFoot();
    var box=ensureStatsBox();

    /* Off-Zeile */
    placeSeq(row, ["bppOff","btnOffAll","btnInstall"]);
    if(row.parentNode!==w) w.insertBefore(row, w.firstChild);
    else if(w.firstElementChild!==row && !w.querySelector(":scope>#bppFootBtns463")) w.insertBefore(row, w.firstChild);

    /* Foot aus Stats-Box */
    if(foot.parentNode===box){
      if(box.parentNode) box.parentNode.insertBefore(foot, box);
      else w.appendChild(foot);
    }
    placeSeq(foot, ["bppHist421","btnDet","bppWishBtn447"]);
    var inf=$("bppSrcInfo");
    if(inf && (inf.parentNode!==foot || foot.lastElementChild!==inf)){
      /* Quellen-Text immer ans Ende der Foot-Zeile (Buttons: Hist/Det/Wish davor) */
      foot.appendChild(inf);
    }

    /* Foot nach Off-Zeile in bppSrcEnd */
    if(foot.parentNode!==w || (row.parentNode===w && row.nextElementSibling!==foot && ![].slice.call(w.children).indexOf(foot)>[].slice.call(w.children).indexOf(row))){
      if(row.parentNode===w){
        if(row.nextSibling) w.insertBefore(foot, row.nextSibling);
        else w.appendChild(foot);
      } else if(!foot.parentNode){
        w.appendChild(foot);
      }
    }
    /* Fein: Foot soll nach row stehen */
    if(row.parentNode===w && foot.parentNode===w){
      var a=[].slice.call(w.children);
      if(a.indexOf(foot)<a.indexOf(row)){
        if(row.nextSibling) w.insertBefore(foot, row.nextSibling);
        else w.appendChild(foot);
      }
    }

    /* Stats-Box unter Foot */
    placeSeq(box, ["bppStats457","bpp-stats","bpp-orte24","bppAbc443"]);
    var host=foot.parentNode||w;
    if(box.parentNode!==host || foot.nextElementSibling!==box){
      if(foot.nextSibling) host.insertBefore(box, foot.nextSibling);
      else host.appendChild(box);
    }
    return true;
  }

  var st=document.createElement("style");
  st.id="bppSt463";
  st.textContent=
    "#bppFootBtns463,#bppSrcEnd>.btns{display:flex;flex-wrap:wrap;gap:8px;align-items:center}"+
    "#bppOff.in366,#bppFootBtns463 #bppOff{order:10!important}"+
    "#bppFootBtns463 #btnOffAll,#bppSrcEnd .btns #btnOffAll{order:11!important}"+
    "#bppFootBtns463 #btnInstall,#bppSrcEnd .btns #btnInstall{order:12!important}"+
    "#bppFoot426{display:flex!important;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:6px 10px;padding:0 0 8px}"+
    "#bppFoot426 #bppHist421{order:20!important;flex:0 1 auto}"+
    "#bppFoot426 #btnDet{order:21!important;display:inline-flex!important}"+
    "#bppFoot426 #bppWishBtn447{order:22!important}"+
    "#bppFoot426 #bppSrcInfo{order:29!important;flex:1 1 100%}"+
    "#bppFoot426 #bppAbc443{display:none!important}"+
    "#bppStatsBox457 #bppStats457{display:inline-flex}";
  document.head.appendChild(st);

  function tick(){ try{ apply(); }catch(e){} }
  setInterval(tick, 250);
  window.addEventListener("load", tick);
  setTimeout(tick, 0);
  setTimeout(tick, 500);
  setTimeout(tick, 1500);
})();
