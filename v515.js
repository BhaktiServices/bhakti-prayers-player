/* [Grok-Bot] V5.15: YT-Knopf bleibt aus (auch #btnSrcYt/#bppSrc195 bei Menü+); Kontrast Stil-Knopf,
   Tonart/Tonhöhe und weitere Chrom-Texte in Swami/Rishi/Brahmachari (inkl. Groß-Noten vs. v509).
   Noten-Toggle Android (pointerup + Entprellung, kein clone mid-tap: v507);
   Kopfzeile 360–412px: #bppTopRight460 absolut statt fixed.
   Groß: Strophe zentriert im Spalt Kopf–Leiste (kein stehenbleibendes padding-bottom);
   2-Spalten robust (Höhe/Mindestschrift, bpp-fs-cols, Taste S, Knopf „Spalten“). critical=false. */
window.BPP_BUILD="5.15"; window.BPP_SHOW="5.15";
(function(){
  if(window.bppV515) return; window.bppV515=1;
  if(!document.querySelector('link[href^="theme-v515.css"]')){
    var l=document.createElement("link"); l.rel="stylesheet"; l.href="theme-v515.css?v=7"; document.head.appendChild(l);
  }

  var FS_CSS=
    "html body #bppTopRight460{}"+
    "@media(max-width:430px){"+
      "html body #bppTopRight460{"+
        "position:absolute!important;top:8px!important;right:8px!important;"+
        "z-index:130!important;max-width:96px"+
      "}"+
    "}"+
    "#bppNotes501,#bppNotesFs508{touch-action:manipulation;-webkit-tap-highlight-color:transparent}"+
    /* Groß-Lyrics: Bühne = freier Spalt zwischen Kopf und sichtbarer Leiste */
    "#bppFs.on:not(.bpp-notes-fs) #bppFsStage{"+
      "top:var(--bpp-fs-top,5vh)!important;"+
      "bottom:var(--bpp-fs-bot,4vh)!important;"+
      "padding-bottom:0!important;"+
      "box-sizing:border-box!important;"+
      "display:flex!important;align-items:center!important;justify-content:center!important"+
    "}"+
    "#bppFs.on:not(.bpp-notes-fs) #bppFsBox:not(.bppFsC2){"+
      "display:inline-block!important;max-width:100%;max-height:100%;box-sizing:border-box;overflow:hidden"+
    "}"+
    "#bppFs.on:not(.bpp-notes-fs) #bppFsBox.bppFsC2:not(:has(.bppFsC2L)){"+
      "display:inline-block!important;max-width:100%;max-height:100%;box-sizing:border-box;overflow:hidden"+
    "}"+
    "#bppFs.on:not(.bpp-notes-fs) #bppFsBox.bppFsC2:has(.bppFsC2L){"+
      "display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);"+
      "max-width:100%;max-height:100%;box-sizing:border-box;width:100%!important;overflow:hidden"+
    "}"+
    "#bppFs.on:not(.bpp-notes-fs) #bppFsBox:not(.bppFsC2) .vl:not(.fch){"+
      "white-space:normal!important;overflow-wrap:break-word;word-break:normal"+
    "}"+
    "html body #bppFs #bppFsBar #bppFsCols515,"+
    "html body #bppFs #bppFsBar .row>#bppFsCols515{"+
      "display:inline-flex!important;align-items:center;justify-content:center;"+
      "visibility:visible!important;font:600 15px/1.1 system-ui,sans-serif!important;"+
      "white-space:nowrap;padding:0 10px!important"+
    "}"+
    "#bppFs.bpp-notes-fs #bppFsCols515,"+
    "html body #bppFs.bpp-notes-fs #bppFsBar #bppFsCols515{display:none!important}"+
    "@media (orientation:landscape) and (max-height:500px){"+
      "#bppFs.on:not(.bpp-notes-fs) #bppFsBar{gap:4px!important;padding:4px 6px!important}"+
      "#bppFs.on:not(.bpp-notes-fs) #bppFsBar button#bppFsPlay{width:52px!important;height:52px!important;min-width:52px!important}"+
      "#bppFs.on:not(.bpp-notes-fs) #bppFsPlay i.pl{border-width:11px 0 11px 18px!important;margin-left:5px!important}"+
      "#bppFs.on:not(.bpp-notes-fs) #bppFsPlay i.pa{width:18px!important;height:22px!important;border-left-width:6px!important;border-right-width:6px!important}"+
      "#bppFs.on:not(.bpp-notes-fs) #bppFsBar button{min-height:34px!important;font-size:15px!important}"+
    "}"+
    /* Groß-Noten-Kontrast: v509 setzt #e0b45a/#a9a39a !important auf hellen Stilen */
    "html.th-swami #bppFs.bpp-notes-fs #bppFsT1,"+
    "html.th-swami #bppFs.bpp-notes-fs .bppNotesCap503{color:#7A1F00!important}"+
    "html.th-swami #bppFs.bpp-notes-fs #bppFsT2{color:#5A3518!important}"+
    "html.th-brahmachari #bppFs.bpp-notes-fs #bppFsT1,"+
    "html.th-brahmachari #bppFs.bpp-notes-fs .bppNotesCap503{color:#5C3200!important}"+
    "html.th-brahmachari #bppFs.bpp-notes-fs #bppFsT2{color:#4A3800!important}"+
    "html.th-rishi #bppFs.bpp-notes-fs #bppFsT1,"+
    "html.th-rishi #bppFs.bpp-notes-fs .bppNotesCap503{color:#F0C9A0!important}"+
    "html.th-rishi #bppFs.bpp-notes-fs #bppFsT2{color:#E8C8CC!important}"+
    "html.th-swami #bppFs.bpp-notes-fs #bppNotesFs508.on,"+
    "html.th-swami #bppFs.bpp-notes-fs #bppNotesFs508.gold,"+
    "html.th-swami #bppFs.bpp-notes-fs #bppNotesFs508.on *,"+
    "html.th-swami #bppFs.bpp-notes-fs #bppNotesFs508.gold *,"+
    "html.th-brahmachari #bppFs.bpp-notes-fs #bppNotesFs508.on,"+
    "html.th-brahmachari #bppFs.bpp-notes-fs #bppNotesFs508.gold,"+
    "html.th-brahmachari #bppFs.bpp-notes-fs #bppNotesFs508.on *,"+
    "html.th-brahmachari #bppFs.bpp-notes-fs #bppNotesFs508.gold *,"+
    "html.th-rishi #bppFs.bpp-notes-fs #bppNotesFs508.on,"+
    "html.th-rishi #bppFs.bpp-notes-fs #bppNotesFs508.gold,"+
    "html.th-rishi #bppFs.bpp-notes-fs #bppNotesFs508.on *,"+
    "html.th-rishi #bppFs.bpp-notes-fs #bppNotesFs508.gold *{color:#1a1208!important}";

  function ensureCss(){
    var st=document.getElementById("bppV515css");
    if(!st){ st=document.createElement("style"); st.id="bppV515css"; }
    if(st.getAttribute("data-v")!=="7"){
      st.setAttribute("data-v","7");
      st.textContent=FS_CSS;
    }
    (document.head||document.documentElement).appendChild(st);
  }

  function hookFsNotesBtn(){
    var b=document.getElementById("bppNotesFs508");
    if(!b||b._bpp515pu) return;
    b._bpp515pu=1;
    b.addEventListener("pointerup", function(e){
      if(!e||e.pointerType!=="touch") return;
      if(typeof window.bppToggleNotes507==="function") window.bppToggleNotes507(e);
    }, true);
  }

  function hideYt(){
    if(window.BPP_YT_ENABLED!==false) return;
    try{
      document.documentElement.classList.add("bpp-yt-off");
      if(document.body) document.body.classList.add("bpp-yt-off");
      ["btnSrc","btnSrc189","btnSrcYt","btnSrcMp3","bppSrc195","ytBox"].forEach(function(id){
        var e=document.getElementById(id); if(e) e.style.setProperty("display","none","important");
      });
    }catch(e){}
  }

  /* ---- Groß: freier Spalt Kopf–Leiste, kein stehenbleibendes padding-bottom ---- */
  var lastGeom="", geomT=0;
  function barVisible(bar){
    if(!bar) return false;
    if(bar.classList.contains("hid")) return false;
    var cs=getComputedStyle(bar);
    if(cs.display==="none"||cs.visibility==="hidden"||parseFloat(cs.opacity||"1")<0.2) return false;
    return true;
  }
  function syncFsGeom(){
    var fs=document.getElementById("bppFs");
    var stage=document.getElementById("bppFsStage");
    if(!fs||!stage||!fs.classList.contains("on")) return;
    if(fs.classList.contains("bpp-notes-fs")){
      try{ stage.style.paddingBottom=""; }catch(e){}
      return;
    }
    var vh=window.innerHeight||800;
    var topEl=document.getElementById("bppFsTop");
    var bar=document.getElementById("bppFsBar");
    var topPx=Math.round(vh*0.05);
    if(topEl){
      var tr=topEl.getBoundingClientRect();
      if(tr.height>=8) topPx=Math.max(topPx, Math.round(tr.bottom+12));
    }
    var botPx=Math.round(vh*0.04);
    if(barVisible(bar)){
      var br=bar.getBoundingClientRect();
      if(br.height>=8) botPx=Math.max(botPx, Math.round(vh-br.top+18));
    }
    /* Mindestens etwas Bühnenhöhe lassen (kurze Landscape-Leiste) */
    if(vh-topPx-botPx<80) botPx=Math.max(8, vh-topPx-80);
    var geo=topPx+"|"+botPx;
    fs.style.setProperty("--bpp-fs-top", topPx+"px");
    fs.style.setProperty("--bpp-fs-bot", botPx+"px");
    try{ stage.style.paddingBottom=""; }catch(e){}
    if(geo!==lastGeom){
      lastGeom=geo;
      clearTimeout(geomT);
      /* Erst einpassen (v183/v511, Schrift darf wieder wachsen), Clamp nur falls wirklich über der Leiste. */
      geomT=setTimeout(function(){
        try{ window.dispatchEvent(new Event("resize")); }catch(e){}
        setTimeout(clampBoxToGap, 120);
      }, 60);
    }
  }
  function clampBoxToGap(){
    var B=document.getElementById("bppFsBox");
    var bar=document.getElementById("bppFsBar");
    var fs=document.getElementById("bppFs");
    if(!B||!fs||fs.classList.contains("bpp-notes-fs")) return;
    var limit=window.innerHeight-8;
    if(barVisible(bar)){
      var br=bar.getBoundingClientRect();
      if(br.height>=8) limit=br.top-10;
    }
    var top=document.getElementById("bppFsTop");
    var minTop=8;
    if(top){ var tr=top.getBoundingClientRect(); if(tr.height>=8) minTop=tr.bottom+12; }
    function bot(){
      var bb=B.getBoundingClientRect(), lo=bb.bottom;
      var nodes=B.querySelectorAll(".ftr,.vl,.bppFsC2Foot");
      for(var i=0;i<nodes.length;i++){
        var r=nodes[i].getBoundingClientRect();
        if(r.height>=2) lo=Math.max(lo,r.bottom);
      }
      return lo;
    }
    var size=parseFloat(B.style.fontSize)||parseFloat(getComputedStyle(B).fontSize)||20;
    var guard=0;
    while(bot()>limit && size>16 && guard++<16){
      size=Math.max(16, size-1);
      B.style.fontSize=size.toFixed(1)+"px";
    }
    if(bot()>limit){
      var ftrs=B.querySelectorAll(".ftr"), i, fs2;
      for(i=0;i<ftrs.length;i++){
        fs2=parseFloat(ftrs[i].style.fontSize)||parseFloat(getComputedStyle(ftrs[i]).fontSize)||13;
        var g2=0;
        while(bot()>limit && fs2>10 && g2++<12){
          fs2-=1;
          ftrs[i].style.fontSize=fs2.toFixed(1)+"px";
        }
      }
    }
  }
  function hookBar(){
    var bar=document.getElementById("bppFsBar");
    if(!bar||bar._bpp515mo) return;
    bar._bpp515mo=1;
    try{
      new MutationObserver(function(){ syncFsGeom(); })
        .observe(bar,{attributes:true,attributeFilter:["class","style"]});
    }catch(e){}
  }

  /* ---- Groß-Spalten-Knopf + Taste S ---- */
  var COL_LAB={de:"Spalten",en:"Columns",fr:"Colonnes",es:"Columnas",ru:"Колонки",hi:"कॉलम",pt:"Colunas",cz:"Sloupce"};
  var COL_TIP={
    de:function(n){ return "Spalten: "+n+" (S)"; },
    en:function(n){ return "Columns: "+n+" (S)"; },
    fr:function(n){ return "Colonnes : "+n+" (S)"; },
    es:function(n){ return "Columnas: "+n+" (S)"; },
    ru:function(n){ return "Колонки: "+n+" (S)"; },
    hi:function(n){ return "कॉलम: "+n+" (S)"; },
    pt:function(n){ return "Colunas: "+n+" (S)"; },
    cz:function(n){ return "Sloupce: "+n+" (S)"; }
  };
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"de"; return COL_LAB[l]?l:"de"; }
  function fsOn(){ var f=document.getElementById("bppFs"); return !!(f&&f.classList.contains("on")); }
  function notesFs(){
    var f=document.getElementById("bppFs");
    return !!(f&&f.classList.contains("bpp-notes-fs"));
  }
  function twoActive(){
    var B=document.getElementById("bppFsBox");
    return !!(B&&B.classList.contains("bppFsC2")&&B.querySelector(".bppFsC2L"));
  }
  function setUserCols(n){
    try{ localStorage.setItem(window.bppFsColsKey||"bpp-fs-cols", String(n)); }catch(e){}
  }
  function toggleFsCols(){
    if(!fsOn()||notesFs()) return;
    var u=0;
    try{ u=parseInt(localStorage.getItem(window.bppFsColsKey||"bpp-fs-cols")||"0",10); }catch(e){}
    /* Im Hochkant bleibt die Anzeige 1-spaltig; der Knopf merkt die Vorliebe fürs Querformat. */
    var next=(u===2)?1:2;
    setUserCols(next);
    try{ if(typeof window.bppFsApplyCols==="function") window.bppFsApplyCols(); }catch(e){}
    try{ window.dispatchEvent(new Event("resize")); }catch(e){}
    setTimeout(paintFsCols, 80);
    setTimeout(paintFsCols, 280);
  }
  window.bppFsColsToggle=toggleFsCols;
  function paintFsCols(){
    var b=document.getElementById("bppFsCols515"); if(!b) return;
    var on=fsOn()&&!notesFs();
    b.style.setProperty("display", on?"inline-flex":"none", "important");
    if(!on) return;
    var n=twoActive()?2:1;
    var l=lg();
    if(b.textContent!==COL_LAB[l]) b.textContent=COL_LAB[l];
    var tip=(COL_TIP[l]||COL_TIP.de)(n);
    if(b.title!==tip){ b.title=tip; b.setAttribute("aria-label", tip); }
    b.classList.toggle("on", n===2);
    b.classList.toggle("gold", n===2);
    b.setAttribute("aria-pressed", n===2?"true":"false");
  }
  function ensureFsColsBtn(){
    var bar=document.getElementById("bppFsBar"); if(!bar) return;
    var b=document.getElementById("bppFsCols515");
    if(!b){
      b=document.createElement("button");
      b.type="button"; b.id="bppFsCols515";
      b.addEventListener("click", function(e){
        e.preventDefault(); e.stopPropagation();
        toggleFsCols();
        try{ bar.classList.remove("hid"); }catch(x){}
      });
    }
    var menu=document.getElementById("bppFsMenu");
    var row=menu&&menu.parentNode;
    if(row){
      if(b.parentNode!==row) row.insertBefore(b, menu);
      else if(b.nextSibling!==menu) row.insertBefore(b, menu);
    }else if(b.parentNode!==bar){
      bar.appendChild(b);
    }
    paintFsCols();
  }

  window.addEventListener("keydown", function(e){
    if(e.ctrlKey||e.altKey||e.metaKey||e.shiftKey) return;
    var k=e.key||"";
    if(k!=="s"&&k!=="S") return;
    var t=e.target, n=t&&t.tagName;
    if(n==="INPUT"||n==="TEXTAREA"||n==="SELECT"||(t&&t.isContentEditable)) return;
    if(!fsOn()||notesFs()) return;
    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    toggleFsCols();
  }, true);

  function tick(){
    ensureCss();
    hideYt();
    hookFsNotesBtn();
    hookBar();
    syncFsGeom();
    ensureFsColsBtn();
    paintFsCols();
  }
  tick();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", tick);
  window.addEventListener("resize", function(){ syncFsGeom(); paintFsCols(); });
  window.addEventListener("orientationchange", function(){ setTimeout(function(){ syncFsGeom(); paintFsCols(); }, 200); });
  setInterval(tick, 500);
})();
