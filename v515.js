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
    var l=document.createElement("link"); l.rel="stylesheet"; l.href="theme-v515.css?v=8"; document.head.appendChild(l);
  }

  /* [Grok-Bot] V5.21: nur Kopf-Überlappungsfix ≤430px + Platzhalter; kein Groß-Layout, keine Noten */
  var FS_CSS=
    "@media(max-width:430px){"+
      "html body #bppTopRight460{"+
        "position:absolute!important;top:8px!important;right:8px!important;"+
        "z-index:130!important;max-width:96px"+
      "}"+
    "}";

  function ensureCss(){
    var st=document.getElementById("bppV515css");
    if(!st){ st=document.createElement("style"); st.id="bppV515css"; }
    if(st.getAttribute("data-v")!=="521"){
      st.setAttribute("data-v","521");
      st.textContent=FS_CSS;
    }
    (document.head||document.documentElement).appendChild(st);
  }

  function hookFsNotesBtn(){ return;
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
    return; /* V5.21: Groß-Geometrie wie V4.91 (v183 5vh/4vh) */
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
    var reserveBar=false; /* [Grok-Bot] V5.20: keine 2-Spalten-Reserve mehr */
    if(bar && (barVisible(bar) || reserveBar)){
      var br=bar.getBoundingClientRect();
      var barH=br.height>=8?br.height:(bar.offsetHeight||64);
      if(barVisible(bar) && br.height>=8) botPx=Math.max(botPx, Math.round(vh-br.top+18));
      else botPx=Math.max(botPx, Math.round(barH+18));
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
      /* V5.19: bei 2 Spalten kein resize-Dispatch (sonst Pumpen durch Leisten-Hide). */
      geomT=setTimeout(function(){
        try{ window.dispatchEvent(new Event("resize")); }catch(e){}
        setTimeout(clampBoxToGap, 120);
      }, 60);
    }
  }
  function clampBoxToGap(){
    return; /* V5.21 */
    var B=document.getElementById("bppFsBox");
    var bar=document.getElementById("bppFsBar");
    var fs=document.getElementById("bppFs");
    if(!B||!fs||fs.classList.contains("bpp-notes-fs")) return;
    if(window.bppFsFitLocked519 && B.classList.contains("bppFsC2")) return;
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
  function hookBar(){ return; /* V5.21 */ }
  function hookBarOff(){
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
    /* [Grok-Bot] V5.20: kein 2-Spalten-Modus mehr in Groß */
    return;
  }
  window.bppFsColsToggle=toggleFsCols;
  function paintFsCols(){
    var b=document.getElementById("bppFsCols515");
    if(b&&b.parentNode){ try{ b.parentNode.removeChild(b); }catch(e){} return; }
    return;
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
    /* [Grok-Bot] V5.20: Spalten-Knopf in der Groß-Leiste entfernen, nicht neu anlegen */
    var b0=document.getElementById("bppFsCols515");
    if(b0&&b0.parentNode) try{ b0.parentNode.removeChild(b0); }catch(e){}
    return;
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
    /* [Grok-Bot] V5.20: Taste S in Groß ohne Wirkung (nicht Standard-Spalten umschalten) */
    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation) e.stopImmediatePropagation();
  }, true);

  function tick(){
    ensureCss();
    hideYt();
    /* V5.21: kein Groß-Geom, kein Noten-Hook, kein Spalten-Knopf */
  }
  tick();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", tick);
  window.addEventListener("resize", function(){ hideYt(); });
  window.addEventListener("orientationchange", function(){ setTimeout(hideYt, 200); });
  setInterval(tick, 500);
})();
