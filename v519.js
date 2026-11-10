/* [Grok-Bot] V5.19: Groß Default immer 1 Spalte (kein Auto-2, auch nicht quer).
   2 Spalten nur per Knopf „Spalten“ oder Taste S, Wahl in bpp-fs-cols.
   Alte Auto-Werte (0/auto und bpp-fs-cols=2 aus Auto) einmalig auf 1.
   Bei 2 Spalten: Größe einmal pro Strophe/Fenster einpassen (ein Owner, kein Pumpen). */
window.BPP_BUILD="5.19";
(function(){
  if(window.bppV519) return; window.bppV519=1;

  var MIG="bpp-fs-cols-mig519", KEY=window.bppFsColsKey||"bpp-fs-cols";
  try{
    if(localStorage.getItem(MIG)!=="1"){
      var old=localStorage.getItem(KEY);
      if(old==null || old==="" || old==="0" || old==="auto" || old==="2"){
        localStorage.setItem(KEY, "1");
      }
      localStorage.setItem(MIG, "1");
    }
  }catch(e){}

  var st=document.createElement("style");
  st.id="bppFs519css";
  st.textContent=
    "#bppFs:has(#bppFsBox.bppFsC2) .bppGhost,"+
    "#bppFs:has(#bppFsBox.bppFsC2) #bppFsPv,"+
    "#bppFs:has(#bppFsBox.bppFsC2) #bppFsPv191,"+
    "#bppFs:has(#bppFsBox.bppFsC2) #bppFsScr{display:none!important;visibility:hidden!important;opacity:0!important}";
  document.documentElement.appendChild(st);

  function killGhosts(){
    try{
      var S=document.getElementById("bppFsStage"); if(!S) return;
      [].forEach.call(S.querySelectorAll(".bppGhost,#bppFsPv,#bppFsPv191"), function(n){
        if(n && n.parentNode) n.parentNode.removeChild(n);
      });
    }catch(e){}
  }

  function fsOn(){ var f=document.getElementById("bppFs"); return !!(f&&f.classList.contains("on")&&!f.classList.contains("bpp-notes-fs")); }
  function box(){ return document.getElementById("bppFsBox"); }
  function stage(){ return document.getElementById("bppFsStage"); }
  function userCols(){
    try{ var v=localStorage.getItem(KEY); if(v==="1"||v==="2") return +v; }catch(e){}
    return 1;
  }

  /* Stabile Bühnenhöhe: Leiste immer einrechnen, damit Ein-/Ausblenden die Schrift nicht ändert */
  function avail(){
    var S=stage(); if(!S) return {w:0,h:0};
    /* v515 hält bei 2 Spalten den Leisten-Platz in der Bühne fest – hier nicht nochmal abziehen */
    return {w:S.clientWidth||0, h:S.clientHeight||0};
  }

  function headerMinTop(){
    var top=document.getElementById("bppFsTop");
    if(!top) return 8;
    var r=top.getBoundingClientRect();
    return r.height>=8?r.bottom+12:8;
  }
  function chordHitsHeader(B){
    var minTop=headerMinTop(), nodes=B.querySelectorAll(".k361,.fch"), i, r;
    for(i=0;i<nodes.length;i++){
      r=nodes[i].getBoundingClientRect();
      if(r.height<1) continue;
      if(r.top<minTop-0.5) return true;
    }
    var sb=document.getElementById("bppFsStage");
    if(sb){
      var sr=sb.getBoundingClientRect();
      for(i=0;i<nodes.length;i++){
        r=nodes[i].getBoundingClientRect();
        if(r.height<1) continue;
        if(r.top<sr.top+12) return true;
      }
    }
    return false;
  }
  function overflows(B,S,h){
    if(!B||!S) return false;
    var limitH=(h!=null?h:avail().h);
    if(B.scrollHeight>limitH+4) return true;
    var bar=document.getElementById("bppFsBar");
    var limit=S.getBoundingClientRect().top+limitH;
    if(bar && !bar.classList.contains("hid")){
      var br=bar.getBoundingClientRect();
      if(br.height>=8) limit=Math.min(limit, br.top-8);
    }
    if(B.getBoundingClientRect().bottom>limit) return true;
    var nodes=B.querySelectorAll(".vl:not(.h361),.ftr,.fch:not(.h361),.k361,.bppFsC2Foot"), i, r;
    for(i=0;i<nodes.length;i++){
      r=nodes[i].getBoundingClientRect();
      if(r.height<1) continue;
      if(r.bottom>limit) return true;
    }
    return false;
  }
  function layoutReady(B){
    var L=B.querySelector(".bppFsC2L");
    return !!(L && L.clientWidth>40);
  }
  function linesOverflow(B){
    if(!layoutReady(B)) return false; /* noch kein Spaltenmaß – nicht auf Mindestschrift zwingen */
    var nodes=B.querySelectorAll(".vl:not(.fch)"), i, el, cs;
    for(i=0;i<nodes.length;i++){
      el=nodes[i];
      if(el.classList.contains("h361")) continue;
      cs=getComputedStyle(el);
      if(cs.display==="none"||cs.visibility==="hidden") continue;
      if(el.scrollWidth>el.clientWidth+1) return true;
    }
    return false;
  }
  function applySize(B,size){
    B.style.fontSize=size.toFixed(1)+"px";
    var ftrs=B.querySelectorAll(".ftr"), fchs=B.querySelectorAll(".fch"), i, el;
    for(i=0;i<ftrs.length;i++){ ftrs[i].style.fontSize=Math.max(13, size*0.38).toFixed(1)+"px"; ftrs[i].style.maxWidth="100%"; ftrs[i].style.whiteSpace="normal"; }
    for(i=0;i<fchs.length;i++){ el=fchs[i]; if(!el.classList.contains("h361")) el.style.fontSize=Math.max(12, size*0.42).toFixed(1)+"px"; }
  }
  function bad(B,S,h){
    return overflows(B,S,h) || chordHitsHeader(B);
  }

  var lastKey="", lastSize=0;
  function fitKey(){
    var st=null; try{ st=typeof bppFsState==="function"?bppFsState():null; }catch(e){}
    var k=st&&typeof st.k==="number"?st.k:-1;
    var pid=""; try{ if(typeof i==="number"&&PRAYERS[i]) pid=PRAYERS[i].id; }catch(e){}
    var ch=(typeof chMode!=="undefined"?chMode:"");
    /* Fenstermaß, nicht Bühnenhöhe: Leisten-Hide ändert avail().h und darf den Lock nicht lösen */
    return pid+"|"+k+"|"+userCols()+"|"+ch+"|"+(window.innerWidth||0)+"x"+(window.innerHeight||0);
  }

  function fitOnce(B,S){
    if(!B||!S||!B.classList.contains("bppFsC2")) return;
    killGhosts();
    var key=fitKey(), a=avail();
    if(lastKey===key && lastSize>0){
      applySize(B, lastSize);
      window.bppFsFitLocked519=1;
      return lastSize;
    }
    window.bppFsFitLocked519=0;
    if(!layoutReady(B)){
      setTimeout(function(){
        try{
          if(fitKey()!==key) return;
          var B2=box(), S2=stage();
          if(B2&&S2) fitOnce(B2,S2);
        }catch(e){}
      }, 80);
      return parseFloat(B.style.fontSize)||lastSize||0;
    }
    B.classList.remove("bpp-fs-wrap");
    var lo=16, hi=Math.max(lo+4, Math.min(180, a.h*0.34, a.w*0.13)), best=lo, g, mid;
    applySize(B, hi);
    if(bad(B,S,a.h) || linesOverflow(B)){
      for(g=0;g<18 && hi-lo>0.4;g++){
        mid=(lo+hi)/2;
        applySize(B, mid);
        if(bad(B,S,a.h) || linesOverflow(B)) hi=mid;
        else { best=mid; lo=mid; }
      }
      applySize(B, best);
      if(linesOverflow(B)){
        B.classList.add("bpp-fs-wrap");
        lo=16; hi=best; best=16;
        applySize(B, hi);
        if(bad(B,S,a.h)){
          for(g=0;g<16 && hi-lo>0.4;g++){
            mid=(lo+hi)/2;
            applySize(B, mid);
            if(bad(B,S,a.h)) hi=mid;
            else { best=mid; lo=mid; }
          }
        } else best=hi;
        applySize(B, best);
      }
    } else {
      best=hi; applySize(B, best);
    }
    lastKey=key; lastSize=parseFloat(B.style.fontSize)||best;
    window.bppFsFitLocked519=1;
    window.bppFsFitInfo519={ key:lastKey, size:lastSize, t:Date.now() };
    /* Nachmessung, sobald die Spalten Breite haben; danach fest */
    if(!layoutReady(B) || (lastSize<=16.2 && (window.__v519retry||0)<3)){
      window.__v519retry=(window.__v519retry||0)+1;
      window.bppFsFitLocked519=0;
      lastKey="";
      setTimeout(function(){
        try{
          if(fitKey()!==key) return;
          var B2=box(), S2=stage();
          if(B2&&S2) fitOnce(B2,S2);
        }catch(e){}
      }, 80);
    } else {
      window.__v519retry=0;
    }
    return lastSize;
  }

  window.bppFsFit2Col519=fitOnce;
  window.bppFsFitReset519=function(){ lastKey=""; lastSize=0; window.bppFsFitLocked519=0; };

  var prevGrow=window.bppFsAllowGrow;
  window.bppFsAllowGrow=function(B,S,next){
    if(window.bppFsFitLocked519 && B && B.classList.contains("bppFsC2")) return false;
    return typeof prevGrow==="function"?prevGrow(B,S,next):true;
  };

  /* Nach Spalten-Umschalten Lock lösen, damit einmal neu gemessen wird */
  var prevToggle=window.bppFsColsToggle;
  if(typeof prevToggle==="function" && !prevToggle.__v519){
    var t=function(){
      window.bppFsFitReset519();
      killGhosts();
      var r=prevToggle.apply(this, arguments);
      setTimeout(killGhosts, 0);
      setTimeout(killGhosts, 40);
      setTimeout(killGhosts, 120);
      return r;
    };
    t.__v519=1;
    window.bppFsColsToggle=t;
  }

  setInterval(function(){
    try{
      var B=document.getElementById("bppFsBox");
      if(B && B.classList.contains("bppFsC2")) killGhosts();
    }catch(e){}
  }, 300);

  window.addEventListener("resize", function(){
    /* Nur echte Fensteränderung: Lock für neue Geometrie freigeben */
    clearTimeout(window.__v519rz);
    window.__v519rz=setTimeout(function(){
      var k=fitKey();
      if(k!==lastKey){ window.bppFsFitReset519(); }
    }, 60);
  });
})();
