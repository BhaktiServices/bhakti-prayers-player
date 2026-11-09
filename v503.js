/* [Grok-Bot] V5.03: MMS-Notation – Rahmen füllt verfügbare Lyrics-Höhe bis Viewport-Unterkante;
   Stage fixed unter Titel / über kompakter Steuerleiste; absolute Shell (kein Flex-Schrumpf);
   contain; Liste ausgeblendet; Titel/Cap kompakt. Owner: bppPaintNotes503. critical=false. */
window.BPP_BUILD="5.03"; window.BPP_SHOW="5.03";
(function(){
  if(window.bppV503) return; window.bppV503=1;
  var PID="mukunda", LS="bpp-mms-notes", MAN="assets/mms-notes/manifest.json";
  var man=null, manP=null, ro=null, fitT=0, pageIdx=0;

  function on(){ try{ return localStorage.getItem(LS)==="1"; }catch(e){ return false; } }
  function curP(){ try{ return (typeof i!=="undefined"&&i>=0&&PRAYERS[i])?PRAYERS[i]:null; }catch(e){ return null; } }
  function isMms(){ var P=curP(); return !!(P&&P.id===PID); }
  function loadMan(){
    if(man) return Promise.resolve(man);
    if(manP) return manP;
    manP=fetch(MAN,{cache:"force-cache"}).then(function(r){ return r.ok?r.json():null; })
      .then(function(j){ man=j; return j; }).catch(function(){ return null; });
    return manP;
  }
  function stanzaKeyNow(){
    try{
      if(!isMms()) return "";
      var P=curP(), gs=typeof stanzaGroups==="function"?stanzaGroups(P):[];
      var g=(typeof currentGroupIndex==="function")?currentGroupIndex():0;
      if(g<0) g=0;
      if(gs[g]&&gs[g].key) return String(gs[g].key);
      if(P&&P.zeilen&&typeof line!=="undefined"&&P.zeilen[line]) return String(P.zeilen[line].nr||"");
    }catch(e){}
    return "Mangala";
  }
  function idxForKey(key){
    if(!man||!man.pages) return 0;
    var k=String(key||"Mangala");
    if(/^Mangala/i.test(k)||k==="0") return 0;
    for(var n=0;n<man.pages.length;n++) if(String(man.pages[n].stanza)===k) return n;
    return 0;
  }

  var st=document.createElement("style");
  st.id="bppNotesFit503css";
  st.textContent=
    "body.bpp-notes-on503 #list, body.bpp-notes-on503 .listbar, body.bpp-notes-on503 #hint{display:none!important}"+
    "body.bpp-notes-on503 #lyrTitle{margin:4px 12px 2px!important}"+
    /* Short / landscape: reclaim vertical chrome so the stanza fits */
    "@media (max-height:520px){"+
      "body.bpp-notes-on503 #lyrTitle,body.bpp-notes-on503 #bppL1{display:none!important}"+
      "body.bpp-notes-on503 header{max-height:72px;overflow:hidden}"+
      "body.bpp-notes-on503 header .legend{display:none!important}"+
      "body.bpp-notes-on503 .bar{max-height:56px}"+
      "body.bpp-notes-on503 .bar audio{display:none!important}"+
    "}"+
    "@media (max-height:400px){"+
      "body.bpp-notes-on503 header{max-height:52px}"+
      "body.bpp-notes-on503 .bar{max-height:48px;padding:2px 6px 4px!important}"+
    "}"+
    /* Compact transport bar pinned to bottom so stage can use the middle */
    "body.bpp-notes-on503 .bar{position:fixed!important;left:0;right:0;bottom:0;z-index:60;"+
      "margin:0!important;padding:4px 8px 6px!important;max-height:64px;overflow:hidden;"+
      "background:rgba(26,18,12,.96)!important;border-top:1px solid #6b5340;box-sizing:border-box}"+
    "body.bpp-notes-on503 .bar #now{display:none!important}"+
    "body.bpp-notes-on503 .bar audio{height:28px!important;max-height:28px;width:100%;margin:0 0 2px}"+
    "body.bpp-notes-on503 .bar .row{margin:0!important;gap:4px!important}"+
    "body.bpp-notes-on503 #stage{position:fixed!important;left:6px;right:6px;z-index:55;"+
      "margin:0!important;padding:0!important;height:auto!important;max-height:none!important;"+
      "display:block!important;grid-template-columns:none!important;gap:0!important}"+
    "body.bpp-notes-on503 #ytBox{display:none!important}"+
    "body.bpp-notes-on503 #lyrics.bpp-notes-mode, body.bpp-notes-on503 #lyrics{"+
      "position:relative!important;column-count:1!important;columns:auto!important;"+
      "overflow:hidden!important;padding:6px!important;box-sizing:border-box!important;"+
      "max-height:none!important;height:100%!important;width:100%!important;margin:0!important}"+
    "#lyrics .bppNotesShell503{position:absolute;left:6px;right:6px;top:6px;bottom:6px;"+
      "display:block;overflow:hidden;box-sizing:border-box}"+
    /* Title+cap as thin overlay on the frame – frame fills nearly 100% of shell */
    "#lyrics .bppNotesTitle503{position:absolute;left:0;right:0;top:0;height:22px;line-height:22px;z-index:2;"+
      "color:var(--gold);font-family:'Gentium Book Plus',Georgia,serif;font-size:.95rem;"+
      "padding:0 6px;box-sizing:border-box;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"+
      "background:linear-gradient(180deg,rgba(26,18,12,.92),rgba(26,18,12,.55) 70%,transparent);pointer-events:none}"+
    "#lyrics .bppNotesCap503{position:absolute;left:0;right:0;top:22px;height:16px;line-height:16px;text-align:center;z-index:2;"+
      "font:600 .7rem/16px system-ui,sans-serif;color:#e0b45a;pointer-events:none;"+
      "text-shadow:0 1px 2px #1a120c}"+
    "#lyrics .bppNotesFrame503{position:absolute;left:0;right:0;top:0;bottom:0;"+
      "background:#fff;border:2px solid #e0b45a;border-radius:10px;overflow:hidden;box-sizing:border-box;padding:4px}"+
    "#lyrics .bppNotesFrame503 img{display:block;width:100%;height:100%;object-fit:contain;object-position:center;background:#fff;border:0}"+
    /* Gross / fullscreen: notes fill #bppFsStage (keep stage absolute inset from v183) */
    "#bppFs.bpp-notes-fs #bppFsBox{visibility:hidden!important;position:absolute!important;width:0!important;height:0!important;overflow:hidden!important}"+
    "#bppFs.bpp-notes-fs #bppFsStage{position:absolute!important;left:2vw!important;right:2vw!important;top:4vh!important;bottom:12vh!important;"+
      "display:block!important;overflow:hidden!important;z-index:2}"+
    "#bppFs.bpp-notes-fs .bppNotesShell503{position:absolute!important;left:8px!important;right:8px!important;top:8px!important;bottom:8px!important;z-index:5}"+
    "#bppFs .bppNotesTitle503{position:absolute;left:0;right:0;top:0;height:22px;line-height:22px;z-index:2;"+
      "color:var(--gold);font-family:'Gentium Book Plus',Georgia,serif;font-size:.95rem;"+
      "padding:0 6px;box-sizing:border-box;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"+
      "background:linear-gradient(180deg,rgba(26,18,12,.92),rgba(26,18,12,.55) 70%,transparent);pointer-events:none}"+
    "#bppFs .bppNotesCap503{position:absolute;left:0;right:0;top:22px;height:16px;line-height:16px;text-align:center;z-index:2;"+
      "font:600 .7rem/16px system-ui,sans-serif;color:#e0b45a;pointer-events:none;text-shadow:0 1px 2px #1a120c}"+
    "#bppFs .bppNotesFrame503{position:absolute;left:0;right:0;top:0;bottom:0;"+
      "background:#fff;border:2px solid #e0b45a;border-radius:10px;overflow:hidden;box-sizing:border-box;padding:4px}"+
    "#bppFs .bppNotesFrame503 img{display:block;width:100%;height:100%;object-fit:contain;object-position:center;background:#fff;border:0}";
  document.head.appendChild(st);

  function barReserve(){
    var vh=window.innerHeight||800;
    if(vh<=400) return 48;
    if(vh<=520) return 56;
    return 64;
  }

  function notesTop(){
    var vh=window.innerHeight||800;
    var top=8;
    try{
      var hdr=document.querySelector("header");
      var l1=document.getElementById("bppL1");
      var ly=document.getElementById("lyrTitle");
      function visibleBottom(el){
        if(!el) return 0;
        var cs=getComputedStyle(el);
        if(cs.display==="none"||cs.visibility==="hidden") return 0;
        var r=el.getBoundingClientRect();
        return r.height>2 ? r.bottom : 0;
      }
      var bHdr=visibleBottom(hdr), bL1=visibleBottom(l1), bLy=visibleBottom(ly);
      /* Prefer below lyrTitle; if that leaves too little free height, climb up */
      var reserve=barReserve();
      var need=vh<=400?150: (vh<=520?180:240);
      if(bLy>20) top=Math.ceil(bLy+4);
      else if(bL1>20) top=Math.ceil(bL1+4);
      else if(bHdr>20) top=Math.ceil(bHdr+4);
      if((vh-top-reserve)<need){
        if(bL1>20 && (vh-Math.ceil(bL1+4)-reserve)>=need) top=Math.ceil(bL1+4);
        else if(bHdr>20) top=Math.ceil(bHdr+4);
        else top=8;
      }
      /* hard cap: never start past 40% of short viewports */
      if(vh<=520) top=Math.min(top, Math.floor(vh*0.28));
    }catch(e){}
    return Math.max(4, top);
  }

  function freeGeom(){
    var vh=window.innerHeight||800;
    var top=notesTop();
    var bot=vh - barReserve();
    /* respect bottom foot only if it sits in lower band and above our bar reserve */
    try{
      ["bppSrcEnd","bppOffBar466","bppFoot426","foot"].forEach(function(id){
        var el=document.getElementById(id);
        if(!el) return;
        var cs=getComputedStyle(el);
        if(cs.display==="none"||cs.visibility==="hidden") return;
        var fr=el.getBoundingClientRect();
        if(fr.height<8) return;
        if(fr.top>top+60 && fr.top>vh*0.55 && fr.top<bot) bot=Math.min(bot, Math.floor(fr.top-4));
      });
    }catch(e){}
    var h=Math.max(120, Math.floor(bot-top));
    var w=Math.max(80, Math.floor((window.innerWidth||360)-12));
    return {top:top,bot:bot,w:w,h:h,freeH:h};
  }

  function setListHidden(hide){
    try{
      if(hide) document.body.classList.add("bpp-notes-on503");
      else document.body.classList.remove("bpp-notes-on503");
    }catch(e){}
  }

  function fsOn(){
    var f=document.getElementById("bppFs");
    return !!(f && f.classList.contains("on"));
  }

  function ensureFsNotes(){
    var fs=document.getElementById("bppFs");
    var stage=document.getElementById("bppFsStage");
    if(!fs||!stage) return null;
    if(!(isMms()&&on())){
      fs.classList.remove("bpp-notes-fs");
      var old=stage.querySelector(".bppNotesShell503");
      if(old) old.remove();
      return null;
    }
    fs.classList.add("bpp-notes-fs");
    var shell=stage.querySelector(".bppNotesShell503");
    if(!shell){
      shell=document.createElement("div");
      shell.className="bppNotesShell503";
      shell.innerHTML="<div class='bppNotesTitle503'></div><div class='bppNotesCap503'></div><div class='bppNotesFrame503'><img alt='' decoding='async'></div>";
      stage.appendChild(shell);
      var img=shell.querySelector("img");
      if(img) img.addEventListener("load", function(){ schedule(); });
    }
    var title=shell.querySelector(".bppNotesTitle503");
    if(title) title.textContent=(curP()&&curP().titel)||"Mukunda Mala Stotram";
    return shell;
  }

  function applyFsGeom(){
    if(!fsOn()) return null;
    var shell=ensureFsNotes();
    if(!shell) return null;
    var stage=document.getElementById("bppFsStage");
    if(stage){
      stage.style.left="2vw"; stage.style.right="2vw";
      stage.style.top="4vh"; stage.style.bottom="12vh";
      stage.style.display="block";
    }
    shell.style.left="8px"; shell.style.right="8px";
    shell.style.top="8px"; shell.style.bottom="8px";
    if(man&&man.pages&&man.pages[pageIdx]){
      var p=man.pages[pageIdx];
      var cap=shell.querySelector(".bppNotesCap503");
      var img=shell.querySelector(".bppNotesFrame503 img");
      if(cap) cap.textContent=String(p.label||p.stanza);
      if(img && img.getAttribute("src")!==p.file){
        img.setAttribute("src", p.file);
        img.setAttribute("alt", String(p.label||p.stanza));
      }
    }
    var fr=shell.querySelector(".bppNotesFrame503");
    var frR=fr&&fr.getBoundingClientRect();
    var sr=stage&&stage.getBoundingClientRect();
    return {freeH:sr?sr.height:(frR?frR.height:0), frameH:frR?frR.height:0, frameW:frR?frR.width:0};
  }

  function applyGeom(){
    var box=document.getElementById("lyrics");
    var stage=document.getElementById("stage");
    if(!box||!box.classList.contains("bpp-notes-mode")) return null;
    var g=freeGeom();
    if(stage){
      stage.style.top=g.top+"px";
      stage.style.bottom=(window.innerHeight-g.bot)+"px";
      stage.style.left="6px";
      stage.style.right="6px";
      stage.style.height="auto";
      stage.style.maxHeight="none";
    }
    box.style.height="100%";
    box.style.maxHeight="none";
    box.style.minHeight="0";
    var shell=box.querySelector(".bppNotesShell503");
    var frame=box.querySelector(".bppNotesFrame503");
    var img=frame&&frame.querySelector("img");
    if(shell){ shell.style.left="6px"; shell.style.right="6px"; shell.style.top="6px"; shell.style.bottom="6px"; }
    if(frame){ frame.style.top="0"; frame.style.bottom="0"; frame.style.left="0"; frame.style.right="0"; }
    if(img){
      img.style.width="100%"; img.style.height="100%";
      img.style.objectFit="contain"; img.style.objectPosition="center";
    }
    /* expose measured free area on box for tests */
    box.dataset.bppFreeH=String(g.h);
    box.dataset.bppFreeTop=String(g.top);
    try{ applyFsGeom(); }catch(e){}
    return g;
  }

  function showPage(idx){
    if(!man||!man.pages||!man.pages.length) return;
    idx=Math.max(0, Math.min(man.pages.length-1, idx|0));
    pageIdx=idx;
    var p=man.pages[idx];
    var box=document.getElementById("lyrics"); if(!box) return;
    var cap=box.querySelector(".bppNotesCap503");
    var img=box.querySelector(".bppNotesFrame503 img");
    if(cap) cap.textContent=String(p.label||p.stanza);
    if(img){
      var need=p.file;
      if(img.getAttribute("src")!==need){
        img.setAttribute("src", need);
        img.setAttribute("alt", String(p.label||p.stanza));
      }
    }
    applyGeom();
  }

  function paint(){
    var box=document.getElementById("lyrics");
    if(!box||!isMms()||!on()){ setListHidden(false); clearStagePos(); return; }
    setListHidden(true);
    loadMan().then(function(m){
      if(!m||!m.pages||!isMms()||!on()) return;
      var key=stanzaKeyNow();
      pageIdx=idxForKey(key);
      box.classList.add("bpp-notes-mode");
      box.classList.remove("cols-2","cols-3","fitwrap");
      box.innerHTML=
        "<div class='bppNotesShell503'>"+
          "<div class='bppNotesTitle503'></div>"+
          "<div class='bppNotesCap503'></div>"+
          "<div class='bppNotesFrame503'><img alt='' decoding='async'></div>"+
        "</div>";
      var title=box.querySelector(".bppNotesTitle503");
      if(title) title.textContent=(curP()&&curP().titel)||"Mukunda Mala Stotram";
      var img=box.querySelector(".bppNotesFrame503 img");
      if(img) img.addEventListener("load", function(){ schedule(); });
      showPage(pageIdx);
      ensureRO(box);
      requestAnimationFrame(function(){
        applyGeom();
        requestAnimationFrame(function(){ applyGeom(); showPage(pageIdx); });
      });
    });
  }

  function clearStagePos(){
    var stage=document.getElementById("stage");
    if(stage){
      stage.style.top=""; stage.style.bottom=""; stage.style.left=""; stage.style.right="";
      stage.style.height=""; stage.style.maxHeight="";
    }
  }

  function schedule(){
    clearTimeout(fitT);
    fitT=setTimeout(function(){ if(isMms()&&on()) applyGeom(); }, 40);
  }

  function ensureRO(box){
    if(typeof ResizeObserver==="undefined") return;
    if(ro) try{ ro.disconnect(); }catch(e){}
    ro=new ResizeObserver(function(){ schedule(); });
    if(box) ro.observe(box);
    if(document.body) ro.observe(document.body);
    var stage=document.getElementById("stage");
    if(stage) ro.observe(stage);
  }

  function follow(k){
    if(!man){ loadMan().then(function(){ follow(k); }); return; }
    showPage(idxForKey(k));
  }

  function clear(){
    setListHidden(false);
    clearStagePos();
    var box=document.getElementById("lyrics");
    if(box){
      box.style.height=""; box.style.maxHeight=""; box.style.minHeight="";
      box.classList.remove("bpp-notes-mode");
      delete box.dataset.bppFreeH; delete box.dataset.bppFreeTop;
    }
    try{
      var fs=document.getElementById("bppFs");
      if(fs) fs.classList.remove("bpp-notes-fs");
      var stage=document.getElementById("bppFsStage");
      var sh=stage&&stage.querySelector(".bppNotesShell503");
      if(sh) sh.remove();
    }catch(e){}
  }

  window.bppPaintNotes503=paint;
  window.bppNotesFollow503=follow;
  window.bppFitNotes503=schedule;
  window.bppClearNotes503=clear;
  window.bppNotesFreeGeom503=freeGeom;

  /* Prefer 503 over 502 */
  window.bppPaintNotes502=function(){ return paint(); };
  window.bppNotesFollow502=function(k){ return follow(k); };
  window.bppFitNotes502=function(){ return schedule(); };
  window.bppClearNotes502=function(){ return clear(); };

  function wrapPaint(){
    if(typeof paintLyrics!=="function" || paintLyrics._bpp503) return;
    var o=paintLyrics;
    window.paintLyrics=function(){
      var r=o.apply(this, arguments);
      try{ if(!(isMms()&&on())) clear(); }catch(e){}
      return r;
    };
    window.paintLyrics._bpp503=1;
  }

  function boot(){
    wrapPaint();
    if(isMms()&&on()) paint();
    try{
      var fs=document.getElementById("bppFs");
      if(fs && !fs._bpp503mo){
        fs._bpp503mo=1;
        new MutationObserver(function(){ schedule(); if(fsOn()&&isMms()&&on()) applyFsGeom(); }).observe(fs,{attributes:true,attributeFilter:["class"]});
      }
    }catch(e){}
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(boot, 350); });
  else setTimeout(boot, 350);

  var rt=0;
  window.addEventListener("resize", function(){ clearTimeout(rt); rt=setTimeout(schedule, 60); });
  window.addEventListener("orientationchange", function(){ setTimeout(schedule, 200); });
  document.addEventListener("visibilitychange", function(){ if(!document.hidden) schedule(); });
})();
