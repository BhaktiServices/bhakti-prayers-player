/* [Grok-Bot] V5.10: (1) Hanumān Mitsingen: exakte Marken (letzte Marke ≤ t), kein Vorlauf/Pausen-Flackern;
   Mtj-Strophennummern = Zeilenindex (Saba=17, nicht 16 durch Zähler-Skip an R).
   (2) Groß-Ansicht: Schrift mit Rand auf Breite fitten; bei Bedarf Zeilenumbruch; nach Silben-Akkorden (v365) nachmessen.
   (3) Groß-Strophenwechsel: Doppel-Animation v187+v195 und Index-Rücksprung unterbinden (Ursache Suprabhātam „vorherige Strophe nochmal“).
   critical=false. */
window.BPP_BUILD="5.10"; window.BPP_SHOW="5.10";

/* --- (1) Exaktes Mitlesen für alle timed Prayers + Mtj-Nummern --- */
(function(){
  if(window.bppV510f) return; window.bppV510f=1;
  function mt(){
    try{
      if(typeof ytOn!=="undefined"&&ytOn) return typeof ytTime==="number"?ytTime:null;
      var au=document.getElementById("a"); return au&&au.src&&isFinite(au.duration)&&au.duration>=8?au.currentTime:null;
    }catch(e){ return null; }
  }
  function exactK(p){
    if(typeof i==="undefined"||i<0||!p||!p.gs) return null;
    var P=PRAYERS[i]; if(!P) return null;
    var t=mt(); if(t==null) return null;
    /* Sequenz bevorzugt */
    var s=null; try{ s=(typeof bppSeqOf==="function")?bppSeqOf(P):((typeof ytOn!=="undefined"&&ytOn)?P.seqYt:P.seqFile); }catch(e){}
    if(s&&s.length){
      var k=s[0][1];
      for(var j=0;j<s.length;j++){ if(s[j][0]<=t+0.05) k=s[j][1]; else break; }
      if(k>p.gs.length-1) k=p.gs.length-1;
      return k<0?0:k;
    }
    var A=null;
    try{ A=(typeof bppAnchors==="function")?bppAnchors(P,p.gs):null; }catch(e){}
    if(!A){
      A={}; var m=(typeof ytOn!=="undefined"&&ytOn)?P.marksYt:P.marksFile;
      (m||[]).forEach(function(x,g){ if(typeof x==="number"&&g<p.gs.length) A[g]=x; });
    }
    if(!A||!Object.keys(A).length) return null;
    /* [Grok-Bot] V5.20: lückenhafte Marken (nur erste/letzte, z. B. Āratī Saprem) nicht exakt
       „letzte Marke ≤ t“ verwenden – sonst bleibt die Anzeige auf Gruppe 0. Interpolation (bppStarts). */
    var marked=0;
    Object.keys(A).forEach(function(g){ g=+g; if(g<p.gs.length&&typeof A[g]==="number") marked++; });
    if(marked<2 || marked<p.gs.length*0.5) return null;
    var best=0;
    Object.keys(A).forEach(function(g){ g=+g; if(g<p.gs.length&&A[g]<=t+0.05&&g>=best) best=g; });
    return best;
  }
  function wrapProg(){
    var f=window.stanzaFromProgress; if(typeof f!=="function"||f.__v510) return;
    var w=function(p){
      try{ var k=exactK(p); if(k!=null) return k; }catch(e){}
      return f.apply(this,arguments);
    };
    w.__v510=1; window.stanzaFromProgress=w;
  }
  /* follow.js LEAD nicht auf exakte Marken-Prayers anwenden: songProgress-t bleibt Medienzeit */
  function wrapLead(){
    var sp=window.songProgress; if(typeof sp!=="function"||sp.__v510) return;
    var w=function(){
      var p=sp.apply(this,arguments);
      if(!p) return p;
      var t=mt(); if(t!=null) p.t=t; /* Medienzeit, kein +0.5s-Vorlauf */
      return p;
    };
    w.__v510=1; window.songProgress=w;
  }
  /* Mtj: nr = Zeilenindex (R bleibt R) — behebt Off-by-one ab Jaya (war Zähler ohne R-Slot) */
  function fixMtjNr(){
    try{
      if(typeof bppHanuman453!=="function") return;
      var P=PRAYERS&&PRAYERS.find(function(p){return p.id==="hanuman";}); if(!P||!P.zeilen) return;
      /* nur wenn Mtj-Struktur (Mangala + R) */
      var z0=P.zeilen[0], z3=P.zeilen[3];
      if(!z0||!/maṅgala mūrti/.test(z0.sa||"")) return;
      if(!z3||!/rāmaji se rāma rāma kahiyo/.test(z3.sa||"")) return;
      var ch=false;
      P.zeilen.forEach(function(x,i){
        if(/rāmaji se rāma rāma kahiyo/.test(x.sa||"")){
          if(x.nr!=="R"){ x.nr="R"; ch=true; }
          x.x2=true;
        } else if(/^Kīrtan/i.test(String(x.nr||""))){ /* lassen */ }
        else {
          var want=String(i);
          if(x.nr!==want){ x.nr=want; ch=true; }
          x.x2=false;
        }
      });
      if(ch){ try{ if(PRAYERS[i]===P&&typeof paintLyrics==="function") paintLyrics(); }catch(e){} }
    }catch(e){}
  }
  wrapProg(); wrapLead(); fixMtjNr();
  setInterval(function(){ wrapProg(); wrapLead(); fixMtjNr(); },400);
})();

/* --- (3)+(2) [Grok-Bot] V5.21: Groß-Fit/Wechsel-Patches deaktiviert, Layout wie V4.91 --- */
(function(){
  return;
  if(window.bppV510a) return; window.bppV510a=1;
  var lastK=-1, lastAt=0;
  function wrapAnim(){
    /* v187 MutationObserver-Animation abschalten, solange v195 die Naht übernimmt */
    if(!window.bppPv191) return;
    var st=document.getElementById("bppFsStage"); if(!st||st.__v510anim) return;
    st.__v510anim=1;
    try{
      new MutationObserver(function(){
        /* v187-Geister ohne v195-Naht entfernen (Doppel-Slide) */
        Array.prototype.forEach.call(st.querySelectorAll(".bppGhost:not(.bppG195)"),function(n){
          try{ n.parentNode.removeChild(n); }catch(e){}
        });
      }).observe(st,{childList:true});
    }catch(e){}
  }
  /* phase()-Hold „0,8 s bei alter Strophe“ kann nach exaktem Wechsel die Vorschau der alten zeigen — dämpfen */
  function wrapFsDraw(){
    /* Monotonie: beim Abspielen keinen Rücksprung um >0 für <350 ms erlauben (Flackern) */
    if(typeof window.bppFsState!=="function"||window.bppFsState.__v510) return;
    var base=window.bppFsState;
    var w=function(){
      var s=base.apply(this,arguments); if(!s||!s.on) return s;
      try{
        var playing=(typeof ytOn!=="undefined"&&ytOn)?!!ytPlaying:!!(document.getElementById("a")&&!document.getElementById("a").paused);
        var now=Date.now();
        if(playing&&typeof s.k==="number"){
          if(lastK>=0&&s.k<lastK&&now-lastAt<400){
            s={on:s.on,k:lastK,page:s.page,pages:s.pages,fs:s.fs,timed:s.timed,cut:s.cut};
          } else {
            lastK=s.k; lastAt=now;
          }
        } else if(!playing){ lastK=typeof s.k==="number"?s.k:-1; }
      }catch(e){}
      return s;
    };
    w.__v510=1; window.bppFsState=w;
  }
  wrapAnim(); wrapFsDraw();
  setInterval(function(){ wrapAnim(); wrapFsDraw(); },600);
})();

/* --- (2) [Grok-Bot] V5.21: Groß-Fit deaktiviert --- */
(function(){ return;

  if(window.bppV510o) return; window.bppV510o=1;
  var st=document.createElement("style");
  st.id="bppFsFit510css";
  st.textContent=
    "#bppFs #bppFsStage{padding-left:10px!important;padding-right:10px!important;box-sizing:border-box!important}"+
    "#bppFsBox{max-width:100%!important;box-sizing:border-box!important}"+
    "#bppFsBox .vl{max-width:100%;overflow-wrap:anywhere;word-break:normal}"+
    "#bppFsBox.bpp-fs-wrap .vl{white-space:normal!important}"+
    "#bppFsBox:not(.bpp-fs-wrap) .vl{white-space:nowrap}"+
    "#bppFsBox .fch{max-width:100%;overflow:hidden;text-overflow:ellipsis}"+
    "#bppFsBox .k361{max-width:40vw}";
  document.head.appendChild(st);

  function stageBox(){
    return {B:document.getElementById("bppFsBox"), S:document.getElementById("bppFsStage")};
  }
  function overflows(B,S){
    if(!B||!S) return false;
    var sr=S.getBoundingClientRect(), pad=8;
    if(B.scrollWidth>S.clientWidth+pad) return true;
    var nodes=B.querySelectorAll(".vl, .fch:not(.h361), .k361");
    for(var i=0;i<nodes.length;i++){
      var el=nodes[i], cs=getComputedStyle(el);
      if(cs.display==="none"||cs.visibility==="hidden"||el.classList.contains("h361")) continue;
      var r=el.getBoundingClientRect();
      if(r.width<2||r.height<2) continue;
      if(r.right>sr.right+pad || r.left<sr.left-pad) return true;
      if(el.scrollWidth>S.clientWidth+pad) return true;
    }
    return false;
  }
  function refit(){
    var x=stageBox(), B=x.B, S=x.S; if(!B||!S) return;
    var ov=document.getElementById("bppFs"); if(!ov||!ov.classList.contains("on")) return;
    if(ov.classList.contains("bpp-notes-fs")) return;
    /* 2-Spalten: v511 ist der Owner. 1-Spalte darf umbrechen und die freie Höhe nutzen.
       Die alte Deckelung min(Breite,Höhe)*0.048 (~18,6 px bei 412 px) hat die Schrift
       alle 700 ms wieder zusammengestaucht — sichtbar als Sprung und viel Leere. */
    if(B.classList.contains("bppFsC2")) return;
    var fs=parseFloat(B.style.fontSize)||parseFloat(getComputedStyle(B).fontSize)||24;
    var guard=0;
    while((overflows(B,S) || B.scrollHeight>S.clientHeight-4) && fs>12 && guard++<36){
      fs=Math.max(12, fs-1);
      B.style.fontSize=fs.toFixed(1)+"px";
    }
    try{ [].forEach.call(B.querySelectorAll(".vl"),function(v){ v.__k361=null; }); }catch(e){}
  }
  var tmr=null;
  function schedule(){ clearTimeout(tmr); tmr=setTimeout(refit, 60); }
  function hook(){
    var B=document.getElementById("bppFsBox"); if(!B||B.__v510) return;
    B.__v510=1;
    try{ new MutationObserver(schedule).observe(B,{childList:true,subtree:true,characterData:true,attributes:true}); }catch(e){}
    schedule();
  }
  setInterval(hook,400);
  setInterval(function(){ try{ refit(); }catch(e){} },700);
  window.addEventListener("resize", schedule);
  window.addEventListener("orientationchange", function(){ setTimeout(schedule,200); });
  document.addEventListener("DOMContentLoaded", hook);
})();
