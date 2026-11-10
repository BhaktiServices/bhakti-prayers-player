/* [Grok-Bot] V5.11: (1) Standard-Spalten: ein Owner, nach verfügbarer Inhaltsbreite (#lyrics),
   nicht nach Gerätetyp (kein pointer:coarse / UA / max-height / kürzere Seite). 2 Spalten ab 700 px,
   3 ab 1100 px. Gewünschter Modus bleibt beim Drehen erhalten (localStorage bpp-cols), wird nur
   auf das gerade Machbare begrenzt. (2) Groß: im Querformat bei ausreichender Breite die aktuelle
   Strophe automatisch auf 2 Spalten (nie 3) – links erste Hälfte, rechts zweite, Akkorde an der
   Silbe, Übersetzung darunter; Schrift-Fit ohne Überlauf; nur wenn die Schrift dadurch nicht
   kleiner wird. Noten-Modus unverändert. Strophenwechsel ohne zusätzliche Ghosts. critical=false. */
window.BPP_BUILD="5.11"; window.BPP_SHOW="5.11";

/* --- Ein Owner für die Spaltenzahl --- */
(function(){
  if(window.bppV511c) return; window.bppV511c=1;
  var KEY="bpp-cols", W2=700, W3=1100;
  function lyricsW(){
    var L=document.getElementById("lyrics");
    var w=0;
    if(L){
      w=L.clientWidth||0;
      try{ var r=L.getBoundingClientRect(); if(r.width>w) w=r.width; }catch(e){}
    }
    var iw=window.innerWidth||0;
    var vv=0; try{ if(window.visualViewport&&visualViewport.width) vv=visualViewport.width; }catch(e){}
    /* Inhaltsbreite der Lyrics, sonst Fensterbreite; max(), falls eine Messung zu klein ist */
    return Math.max(w, 0) || Math.max(iw, vv, 0) || 1000;
  }
  function maxCols(){
    var w=lyricsW();
    if(!(w>0)){ w=window.innerWidth||1000; }
    /* bewusst keine Geräteabfrage */
    return w<W2?1:(w<W3?2:3);
  }
  function want(){ var v=parseInt(localStorage.getItem(KEY)||"1",10); return v>=1&&v<=3?v:1; }
  function eff(){ return Math.min(want(), maxCols()); }
  window.bppMaxCols=maxCols;
  window.bppColsWant=want;
  window.bppColsEff=eff;
  function relayout(){
    try{ if(typeof window.bppCols==="function") window.bppCols(want()); }
    catch(e){ try{ if(typeof layoutLyrics==="function") layoutLyrics(); }catch(x){} }
  }
  var rt=null;
  function onSize(){ clearTimeout(rt); rt=setTimeout(relayout,120); }
  window.addEventListener("resize", onSize);
  window.addEventListener("orientationchange", function(){ setTimeout(onSize,80); setTimeout(onSize,320); });
  try{ if(window.visualViewport) visualViewport.addEventListener("resize", onSize); }catch(e){}
  try{ new ResizeObserver(onSize).observe(document.getElementById("lyrics")||document.body); }catch(e){}
})();

/* --- Groß: 2 Spalten (automatisch nach Breite), nicht im Noten-Modus --- */
(function(){
  if(window.bppV511f) return; window.bppV511f=1;
  var W2=680, lastApplied="";
  var css=document.createElement("style");
  css.id="bppFsC2511";
  css.textContent=
    "#bppFsBox.bppFsC2{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:28px;row-gap:8px;align-items:start;width:100%!important;max-width:100%!important;box-sizing:border-box;justify-items:stretch;overflow:visible}"+
    "#bppFsBox.bppFsC2 .bppFsC2Head,#bppFsBox.bppFsC2 .bppFsC2Foot{grid-column:1/-1;max-width:100%;min-width:0}"+
    "#bppFsBox.bppFsC2 .bppFsC2L,#bppFsBox.bppFsC2 .bppFsC2R{min-width:0;max-width:100%;padding:1.1em 12px 0;box-sizing:border-box;overflow:visible;text-align:left}"+
    "#bppFsBox.bppFsC2 .vl,#bppFsBox.bppFsC2 .fch,#bppFsBox.bppFsC2 .ftr{max-width:100%;box-sizing:border-box}"+
    "#bppFsBox.bppFsC2 .vl.c361{line-height:2.55!important;padding-top:.05em}"+
    "#bppFsBox.bppFsC2 .vl{white-space:normal!important;overflow-wrap:break-word;word-break:normal}"+
    "#bppFsBox.bppFsC2 .bppFsC2Head .fch{margin-bottom:.15em}"+
    "#bppFsBox.bppFsC2 .bppFsC2Foot .ftr{margin-top:.35em;white-space:normal!important;max-width:100%!important;text-align:center;overflow-wrap:break-word}";
  document.head.appendChild(css);

  function notesOn(){
    var fs=document.getElementById("bppFs");
    if(fs&&(fs.classList.contains("bpp-notes-fs")||fs.querySelector(".bppNotesFrame503,.bppNotesShell503,.bppNotesViewport502"))) return true;
    if(document.body.classList.contains("bpp-notes-on503")) return true;
    return false;
  }
  function fsOn(){
    var fs=document.getElementById("bppFs");
    return !!(fs&&fs.classList.contains("on"));
  }
  var forcedCh={};
  function ensureZeile(){
    try{
      if(typeof chMode==="undefined" || chMode!=="zeile") return false;
      if(document.body.classList.contains("ch-line")) return false;
      document.body.classList.add("ch-line");
      try{ if(typeof applyCh==="function") applyCh(); }catch(e){}
      return true;
    }catch(e){ return false; }
  }
  function isBlockChords(B){
    if(!B) return false;
    var block=0, per=0, fchs=B.querySelectorAll(".fch");
    for(var i=0;i<fchs.length;i++){
      if(fchs[i].classList.contains("vl")) per++; else block++;
    }
    return block>0 && per===0;
  }
  function stageW(){
    var S=document.getElementById("bppFsStage");
    if(S&&S.clientWidth) return S.clientWidth;
    return window.innerWidth||0;
  }
  function wantTwo(){
    if(!fsOn()||notesOn()) return false;
    var w=stageW();
    /* Breite entscheidet, nicht Gerät; typisch Querformat ab ~700 px Stage */
    return w>=W2;
  }

  /* Keine Seiten-Teilung, wenn 2 Spalten die ganze Strophe gleichzeitig zeigen */
  function wrapSplit(){
    var prev=window.bppFsSplitOk;
    if(prev&&prev.__v511) return;
    var w=function(f,fa,fb,n,cut){
      if(wantTwo()) return false;
      return typeof prev==="function"?prev.apply(this,arguments):true;
    };
    w.__v511=1; window.bppFsSplitOk=w;
  }

  function verseRows(B){
    var kids=[], i, el;
    for(i=0;i<B.childNodes.length;i++){
      el=B.childNodes[i];
      if(el.nodeType===1 && !/bppFsC2L|bppFsC2R|bppFsC2Head|bppFsC2Foot|bppGhost/.test(el.className||"")) kids.push(el);
    }
    var head=[], rows=[], foot=[], j=0;
    while(j<kids.length && kids[j].classList.contains("fch") && !kids[j].classList.contains("vl")){ head.push(kids[j]); j++; }
    while(j<kids.length){
      if(kids[j].classList.contains("ftr")){ foot.push(kids[j]); j++; continue; }
      var u=[];
      if(kids[j].classList.contains("fch") && kids[j].classList.contains("vl")){ u.push(kids[j]); j++; }
      /* folgende Akkordzeile (.fch.vl) ist NICHT die Textzeile */
      if(j<kids.length && kids[j].classList.contains("vl") && !kids[j].classList.contains("fch") && !kids[j].classList.contains("ftr")){ u.push(kids[j]); j++; }
      else if(!u.length){ u.push(kids[j]); j++; }
      rows.push(u);
    }
    return {head:head, rows:rows, foot:foot};
  }

  function barVisible(bar){
    if(!bar) return false;
    if(bar.classList.contains("hid")) return false;
    var cs=getComputedStyle(bar);
    if(cs.display==="none"||cs.visibility==="hidden"||parseFloat(cs.opacity||"1")<0.2) return false;
    return true;
  }
  /* Bühne ist bereits über der kompakten Leiste eingeschnitten.
     Nur die tatsächliche Überlappung einer sichtbaren, ggf. ausgeklappten Leiste abziehen.
     .hid (Auto-Hide) zählt nicht. */
  function availRect(S){
    var sr=S.getBoundingClientRect();
    var a={left:sr.left,right:sr.right,top:sr.top,bottom:sr.bottom,width:S.clientWidth,height:S.clientHeight};
    var bar=document.getElementById("bppFsBar");
    if(!barVisible(bar)) return a;
    var br=bar.getBoundingClientRect();
    if(br.height<8) return a;
    if(br.top<a.bottom && br.bottom>a.top){
      if(br.top>a.top+40) a.bottom=Math.min(a.bottom, br.top-8);
      else if(br.bottom<a.bottom-40) a.top=Math.max(a.top, br.bottom+8);
    }
    return a;
  }
  function syncStagePad(S){
    if(!S) return;
    var sr=S.getBoundingClientRect(), a=availRect(S);
    var pad=Math.max(0, Math.round(sr.bottom-a.bottom));
    S.style.boxSizing="border-box";
    S.style.paddingBottom=pad?pad+"px":"";
  }
  function overflows(B,S){
    if(!B||!S) return false;
    var a=availRect(S), pad=8;
    if(B.scrollWidth>S.clientWidth+12) return true;
    var ah=Math.max(40, a.bottom-a.top);
    if(B.scrollHeight>ah+12) return true;
    var nodes=B.querySelectorAll(".vl, .fch:not(.h361), .ftr, .bppFsC2L, .bppFsC2R");
    for(var i=0;i<nodes.length;i++){
      var el=nodes[i], cs=getComputedStyle(el);
      if(cs.display==="none"||cs.visibility==="hidden"||el.classList.contains("h361")) continue;
      var r=el.getBoundingClientRect();
      if(r.width<2||r.height<2) continue;
      if(r.right>a.right+pad || r.left<a.left-pad) return true;
      if(r.bottom>a.bottom+pad || r.top<a.top-pad) return true;
      /* Text kann innerhalb der Box abgeschnitten sein, ohne dass die Border-Box übersteht */
      if((el.classList.contains("vl")||el.classList.contains("ftr")) && el.scrollWidth>el.clientWidth+1) return true;
    }
    return false;
  }

  function fitBox(B,S){
    var lo=18;
    var hi=Math.max(lo+4, Math.min(200, (S.clientHeight||200)*0.20, (S.clientWidth||400)*0.085));
    var best=lo, g;
    /* immer von einer großzügigen Größe heruntertasten, nicht von einem zuvor verkleinerten Wert */
    B.style.fontSize=hi.toFixed(1)+"px";
    if(overflows(B,S)){
      for(g=0;g<16 && hi-lo>0.4;g++){
        var mid=(lo+hi)/2;
        B.style.fontSize=mid.toFixed(1)+"px";
        if(overflows(B,S)) hi=mid; else { best=mid; lo=mid; }
      }
      B.style.fontSize=best.toFixed(1)+"px";
    }else{
      best=hi; B.style.fontSize=best.toFixed(1)+"px";
    }
    var tr=B.querySelectorAll(".ftr");
    for(g=0;g<tr.length;g++){ tr[g].style.fontSize=Math.max(13, best*0.38).toFixed(1)+"px"; tr[g].style.maxWidth="100%"; tr[g].style.whiteSpace="normal"; }
    var ch=B.querySelectorAll(".fch");
    for(g=0;g<ch.length;g++){ if(!ch[g].classList.contains("h361")) ch[g].style.fontSize=Math.max(12, best*0.42).toFixed(1)+"px"; }
    return best;
  }

  function undo(B){
    if(!B||!B.classList.contains("bppFsC2")) return;
    var L=B.querySelector(".bppFsC2L"), R=B.querySelector(".bppFsC2R");
    var H=B.querySelector(".bppFsC2Head"), F=B.querySelector(".bppFsC2Foot");
    var host=B, keep=[];
    function dump(p){ if(!p) return; while(p.firstChild) host.insertBefore(p.firstChild, p); }
    dump(H); dump(L); dump(R); dump(F);
    if(H&&H.parentNode) H.parentNode.removeChild(H);
    if(L&&L.parentNode) L.parentNode.removeChild(L);
    if(R&&R.parentNode) R.parentNode.removeChild(R);
    if(F&&F.parentNode) F.parentNode.removeChild(F);
    B.classList.remove("bppFsC2");
    try{ var S0=document.getElementById("bppFsStage"); if(S0&&!wantTwo()) S0.style.paddingBottom=""; }catch(e){}
  }

  function apply(){
    if(!fsOn()){ lastApplied=""; return; }
    var B=document.getElementById("bppFsBox"), S=document.getElementById("bppFsStage");
    if(!B||!S) return;
    if(B.__v511busyApply) return;
    B.__v511busyApply=1;
    try{ applyWork(B,S); } finally { B.__v511busyApply=0; }
  }
  function applyWork(B,S){
    if(notesOn()){
      if(B.classList.contains("bppFsC2")) undo(B);
      if(S) S.style.paddingBottom="";
      lastApplied="notes";
      return;
    }
    syncStagePad(S);
    var added=ensureZeile();
    if(added || (wantTwo() && isBlockChords(B) && document.body.classList.contains("ch-line"))){
      var fk="ch|"+(typeof stageW==="function"?stageW():0)+"|"+(S.clientHeight||0);
      if(!forcedCh[fk]){
        forcedCh[fk]=1;
        lastApplied="";
        try{ window.dispatchEvent(new Event("resize")); }catch(e){}
        return;
      }
    }
    /* v250 teilt die Strophen-Akkordzeile auf die Verszeilen auf und sieht nur direkte Kinder von #bppFsBox.
       Erst nach der Teilung (Klasse v250 oder eine Akkordzeile je Vers) in Spalten legen. */
    if(wantTwo() && (typeof chMode==="undefined" || chMode==="zeile")){
      var dFch=0,dVl=0,dV250=0, ci, ch;
      for(ci=0;ci<B.children.length;ci++){
        ch=B.children[ci];
        if(!ch.classList) continue;
        if(ch.classList.contains("v250")) dV250++;
        if(ch.classList.contains("fch") && ch.classList.contains("vl")) dFch++;
        if(ch.classList.contains("vl") && !ch.classList.contains("fch")) dVl++;
      }
      var pending=(dVl>=2 && dFch<=1 && !dV250) || (B.classList.contains("bppFsC2") && B.querySelectorAll(".fch.vl").length<=1 && B.querySelectorAll(".vl:not(.fch)").length>=3);
      if(pending){
        if(!B.__v511wait250) B.__v511wait250=Date.now();
        if(Date.now()-B.__v511wait250<1100){
          if(B.classList.contains("bppFsC2")) undo(B);
          lastApplied="";
          return;
        }
        /* nach 1,1 s ohne Teilung trotzdem weiter (kein lineCh) */
      }else{
        B.__v511wait250=0;
      }
    }
    var st=null; try{ st=typeof bppFsState==="function"?bppFsState():null; }catch(e){}
    var k=st&&typeof st.k==="number"?st.k:-1;
    var geo=k+"|"+stageW()+"x"+(S.clientHeight||0)+"|"+(wantTwo()?"2":"1");
    /* Schon 2-spaltig und gleiche Strophe/Größe: nicht neu zerlegen.
       draw() setzt innerHTML neu und lässt die Klasse bppFsC2 stehen – dann neu aufbauen. */
    var hasCols=!!B.querySelector(".bppFsC2L");
    if(B.classList.contains("bppFsC2") && hasCols){
      if(!wantTwo()){ undo(B); lastApplied="1|"+geo; return; }
      if(lastApplied==="2|"+geo){
        syncStagePad(S);
        /* Schrift nach Auto-Hide der Leiste oder k361 noch einmal einpassen, DOM nicht anfassen */
        B.classList.add("bpp-fs-wrap");
        var fsKeep=fitBox(B,S);
        if(!(fsKeep>0)) B.classList.remove("bpp-fs-wrap");
        return;
      }
      undo(B);
    } else if(B.classList.contains("bppFsC2") && !hasCols){
      B.classList.remove("bppFsC2");
      lastApplied="";
    }
    var parts=verseRows(B);
    var rowsN=parts.rows.length;
    var can=wantTwo() && rowsN>=2;
    var key=(can?"2":"1")+"|"+geo;
    if(key===lastApplied) return;

    if(!can){
      if(B.classList.contains("bppFsC2")) undo(B);
      lastApplied=key;
      return;
    }

    var fs1=parseFloat(B.style.fontSize)||parseFloat(getComputedStyle(B).fontSize)||24;

    /* explizite Teilung: erste Hälfte links, zweite rechts */
    var mid=Math.ceil(parts.rows.length/2);
    if(mid<1) mid=1;
    if(mid>=parts.rows.length) mid=parts.rows.length-1;
    var head=document.createElement("div"); head.className="bppFsC2Head";
    var L=document.createElement("div"); L.className="bppFsC2L";
    var R=document.createElement("div"); R.className="bppFsC2R";
    var foot=document.createElement("div"); foot.className="bppFsC2Foot";
    var i;
    for(i=0;i<parts.head.length;i++) head.appendChild(parts.head[i]);
    for(i=0;i<mid;i++){ for(var a=0;a<parts.rows[i].length;a++) L.appendChild(parts.rows[i][a]); }
    for(i=mid;i<parts.rows.length;i++){ for(var b=0;b<parts.rows[i].length;b++) R.appendChild(parts.rows[i][b]); }
    for(i=0;i<parts.foot.length;i++) foot.appendChild(parts.foot[i]);
    B.appendChild(head); B.appendChild(L); B.appendChild(R); B.appendChild(foot);
    if(!head.childNodes.length) B.removeChild(head);
    if(!foot.childNodes.length) B.removeChild(foot);
    B.classList.add("bppFsC2");

    /* In 2 Spalten immer umbrechen, damit lange Zeilen nicht abgeschnitten werden und die Schrift wachsen kann */
    B.classList.add("bpp-fs-wrap");
    fitBox(B,S);
    lastApplied=key;
    try{ [].forEach.call(B.querySelectorAll(".vl"),function(v){ v.__k361=null; if(v.classList.contains("c361")){ /* k361 baut nach Tick neu */ } }); }catch(e){}
    function refit(){ try{ if(B.classList.contains("bppFsC2")) fitBox(B,S); }catch(e){} }
    setTimeout(refit, 400);
    setTimeout(refit, 750);
  }

  function bustAndApply(){
    wrapSplit();
    try{ window.dispatchEvent(new Event("resize")); }catch(e){}
    setTimeout(apply, 80);
    setTimeout(apply, 280);
  }

  wrapSplit();
  var mo=null;
  function hook(){
    wrapSplit();
    var B=document.getElementById("bppFsBox"); if(!B||B.__v511mo) return;
    B.__v511mo=1;
    try{
      mo=new MutationObserver(function(){
        if(B.__v511busy) return;
        B.__v511busy=1;
        try{ apply(); }catch(e){}
        setTimeout(function(){ B.__v511busy=0; },0);
      });
      mo.observe(B,{childList:true,subtree:false});
    }catch(e){}
  }
  hook();
  setInterval(function(){ hook(); wrapSplit(); try{ if(fsOn()) apply(); }catch(e){} }, 400);
  window.addEventListener("orientationchange", bustAndApply);
  window.addEventListener("resize", function(){ clearTimeout(window.__v511rt); window.__v511rt=setTimeout(apply,150); });
  document.addEventListener("DOMContentLoaded", hook);
})();
