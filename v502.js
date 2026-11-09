/* [Grok-Bot] V5.02: MMS-Notation – aktive Strophenseite contain-skaliert in den
   verfügbaren Lyrics-Bereich (Breite+Höhe), eine Seite pro Ansicht, ResizeObserver.
   Nachfolger/Owner für Noten-Darstellung (v501 weicht via bppPaintNotes502). critical=false. */
window.BPP_BUILD="5.02"; window.BPP_SHOW="5.02";
(function(){
  if(window.bppV502) return; window.bppV502=1;
  var PID="mukunda", LS="bpp-mms-notes", MAN="assets/mms-notes/manifest.json";
  var man=null, manP=null, ro=null, fitT=0, lastKey="", pagesEls=[];

  function on(){ try{ return localStorage.getItem(LS)==="1"; }catch(e){ return false; } }
  function curP(){ try{ return (typeof i!=="undefined"&&i>=0&&PRAYERS[i])?PRAYERS[i]:null; }catch(e){ return null; } }
  function isMms(){ var P=curP(); return !!(P&&P.id===PID); }
  function loadMan(){
    if(man) return Promise.resolve(man);
    if(manP) return manP;
    manP=fetch(MAN,{cache:"force-cache"}).then(function(r){ return r.ok?r.json():null; }).then(function(j){ man=j; return j; }).catch(function(){ return null; });
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
  function pageIndexForKey(key){
    if(!man||!man.pages) return 0;
    var k=String(key||"Mangala");
    if(/^Mangala/i.test(k)||k==="0") return 0;
    for(var i=0;i<man.pages.length;i++){ if(String(man.pages[i].stanza)===k) return i; }
    return 0;
  }

  var st=document.createElement("style");
  st.id="bppNotesFit502css";
  st.textContent=
    "#lyrics.bpp-notes-mode{column-count:1!important;columns:auto!important;display:flex!important;flex-direction:column!important;"+
      "overflow:hidden!important;padding:8px!important;box-sizing:border-box!important}"+
    "#lyrics.bpp-notes-mode .bppNotesFit502{flex:1 1 auto;min-height:0;min-width:0;width:100%;height:100%;"+
      "display:flex;flex-direction:column;overflow:hidden}"+
    "#lyrics.bpp-notes-mode .bppNotesFitTitle502{flex:0 0 auto;color:var(--gold);font-family:'Gentium Book Plus',Georgia,serif;"+
      "font-size:1.05rem;line-height:1.2;margin:0 0 6px;padding:0 0 4px;border-bottom:1px solid #6b5340}"+
    "#lyrics.bpp-notes-mode .bppNotesViewport502{flex:1 1 auto;min-height:0;min-width:0;position:relative;overflow:hidden;"+
      "scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;display:flex;align-items:stretch}"+
    "#lyrics.bpp-notes-mode .bppNotesSlide502{flex:0 0 100%;width:100%;height:100%;scroll-snap-align:center;scroll-snap-stop:always;"+
      "display:flex;flex-direction:column;align-items:center;justify-content:center;box-sizing:border-box;padding:2px;overflow:hidden;background:#1a120c}"+
    "#lyrics.bpp-notes-mode .bppNotesSlide502 .cap{flex:0 0 auto;font:600 .72rem/1.2 system-ui,sans-serif;color:#e0b45a;margin:0 0 4px;text-align:center}"+
    "#lyrics.bpp-notes-mode .bppNotesSlide502 .frame{flex:1 1 auto;min-height:0;min-width:0;width:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;"+
      "background:#fff;border-radius:8px;border:1px solid #3d2f26}"+
    "#lyrics.bpp-notes-mode .bppNotesSlide502.active .frame{outline:2px solid #e0b45a;outline-offset:0}"+
    "#lyrics.bpp-notes-mode .bppNotesSlide502 img{display:block;width:100%;height:100%;max-width:100%;max-height:100%;object-fit:contain;object-position:center;background:#fff}"+
    /* Groß-Modus: gleiche Contain-Logik im Fs-Container */
    "#bppFsBox.bpp-notes-mode, #bppFsStage .bpp-notes-mode{overflow:hidden!important}"+
    "body.bpp-fs #lyrics.bpp-notes-mode, #bppFsBox #lyrics.bpp-notes-mode{max-height:none!important;height:100%!important}";
  document.head.appendChild(st);

  function hostBox(){
    /* Prefer visible lyrics panel; in Groß sometimes content is mirrored – still #lyrics owner */
    return document.getElementById("lyrics");
  }

  function parseMaxH(cs, box){
    var mh=cs.maxHeight;
    if(!mh || mh==="none") return 0;
    if(/%$/.test(mh)) return (parseFloat(mh)/100)*(window.innerHeight||800);
    if(/vh$/.test(mh)) return (parseFloat(mh)/100)*(window.innerHeight||800);
    var n=parseFloat(mh); return isFinite(n)?n:0;
  }
  function availSize(box){
    if(!box) return {w:300,h:200};
    var cs=getComputedStyle(box);
    var padX=(parseFloat(cs.paddingLeft)||0)+(parseFloat(cs.paddingRight)||0);
    var padY=(parseFloat(cs.paddingTop)||0)+(parseFloat(cs.paddingBottom)||0);
    var vh=window.innerHeight||800;
    var landscape=(window.innerWidth||0)>(window.innerHeight||0);
    var maxH=Math.max(parseMaxH(cs, box)||0, Math.floor(vh*(landscape?0.72:0.82)));
    /* Concrete height so flex contain works; claim a large share of the viewport for notation */
    var top=box.getBoundingClientRect().top;
    var bottomReserve=landscape?Math.max(36, Math.floor(vh*0.08)):Math.max(44, Math.floor(vh*0.10));
    var byViewport=Math.floor(vh-top-bottomReserve);
    var minNotes=landscape?Math.max(160, Math.floor(vh*0.55)):Math.max(220, Math.floor(vh*0.42));
    var target=Math.max(minNotes, Math.min(maxH, Math.max(byViewport, minNotes)));
    /* If list pushes lyrics down, still prefer minNotes (may overlap slightly less chrome) */
    if(byViewport<minNotes) target=minNotes;
    try{
      var fsBox=document.getElementById("bppFsBox");
      var fsOn=fsBox && (fsBox.classList.contains("on") || getComputedStyle(fsBox).display!=="none") && fsBox.getBoundingClientRect().height>100;
      if(fsOn){
        var fs=document.getElementById("bppFsStage")||fsBox;
        var fr=fs.getBoundingClientRect();
        if(fr.height>120) target=Math.max(minNotes, Math.floor(fr.height-24));
      }
    }catch(e){}
    box.style.height=target+"px";
    box.style.maxHeight=target+"px";
    var w=Math.max(40, (box.clientWidth||box.getBoundingClientRect().width)-padX);
    var h=Math.max(40, target-padY);
    return {w:w,h:h};
  }

  function fitActive(){
    var box=hostBox(); if(!box||!box.classList.contains("bpp-notes-mode")) return;
    var fit=box.querySelector(".bppNotesFit502"); if(!fit) return;
    var title=fit.querySelector(".bppNotesFitTitle502");
    var vp=fit.querySelector(".bppNotesViewport502"); if(!vp) return;
    var sz=availSize(box);
    var titleH=title?(title.getBoundingClientRect().height+8):0;
    var innerH=Math.max(60, sz.h-titleH);
    fit.style.height=sz.h+"px";
    vp.style.height=innerH+"px";
    /* each slide already 100% of vp; imgs use max-width/height 100% + object-fit contain */
    var slides=vp.querySelectorAll(".bppNotesSlide502");
    slides.forEach(function(sl){
      sl.style.height=innerH+"px";
      var frame=sl.querySelector(".frame");
      var cap=sl.querySelector(".cap");
      var capH=cap?(cap.getBoundingClientRect().height+6):0;
      if(frame){ frame.style.height=Math.max(40, innerH-capH)+"px"; frame.style.width="100%"; }
      var img=sl.querySelector("img");
      if(img){
        img.style.width="100%";
        img.style.height="100%";
        img.style.maxWidth="100%";
        img.style.maxHeight="100%";
        img.style.objectFit="contain";
        img.style.objectPosition="center";
      }
    });
  }

  function goToKey(key, smooth){
    if(!man||!man.pages) return;
    var idx=pageIndexForKey(key);
    var vp=document.querySelector("#lyrics .bppNotesViewport502");
    if(!vp) return;
    var slides=vp.querySelectorAll(".bppNotesSlide502");
    slides.forEach(function(sl,n){ sl.classList.toggle("active", n===idx); });
    var target=slides[idx];
    if(target){
      try{ vp.scrollTo({left:target.offsetLeft, behavior:smooth?"smooth":"auto"}); }
      catch(e){ vp.scrollLeft=target.offsetLeft; }
    }
    lastKey=String(key||"");
    requestAnimationFrame(function(){ fitActive(); });
  }

  function paint(){
    var box=hostBox(); if(!box||!isMms()||!on()) return;
    loadMan().then(function(m){
      if(!m||!m.pages||!isMms()||!on()) return;
      var key=stanzaKeyNow();
      var html="<div class='bppNotesFit502'>"+
        "<div class='bppNotesFitTitle502'>"+(curP()&&curP().titel?curP().titel:"Mukunda Mala Stotram")+"</div>"+
        "<div class='bppNotesViewport502' id='bppNotesVp502'>";
      m.pages.forEach(function(p,n){
        var active=(n===pageIndexForKey(key));
        html+="<div class='bppNotesSlide502"+(active?" active":"")+"' data-stanza='"+String(p.stanza).replace(/'/g,"")+"' data-i='"+n+"'>"+
          "<div class='cap'>"+String(p.label||p.stanza)+"</div>"+
          "<div class='frame'><img src='"+p.file+"' alt='"+String(p.label||p.stanza)+"' decoding='async' "+(active?"":"loading='lazy'")+"></div></div>";
      });
      html+="</div></div>";
      box.classList.add("bpp-notes-mode");
      box.innerHTML=html;
      /* prevent column/layoutLyrics from fighting */
      try{ box.classList.remove("cols-2","cols-3","fitwrap"); }catch(e){}
      var vp=box.querySelector(".bppNotesViewport502");
      if(vp && !vp._bpp502snap){
        vp._bpp502snap=1;
        var snapT=0;
        vp.addEventListener("scroll", function(){
          clearTimeout(snapT);
          snapT=setTimeout(function(){
            var slides=[].slice.call(vp.querySelectorAll(".bppNotesSlide502"));
            if(!slides.length) return;
            var mid=vp.scrollLeft+vp.clientWidth/2;
            var best=0, bd=1e9;
            slides.forEach(function(sl,n){
              var c=sl.offsetLeft+sl.offsetWidth/2, d=Math.abs(c-mid);
              if(d<bd){ bd=d; best=n; }
            });
            slides.forEach(function(sl,n){ sl.classList.toggle("active", n===best); });
            lastKey=String(man.pages[best].stanza);
          }, 80);
        }, {passive:true});
      }
      ensureRO(box);
      requestAnimationFrame(function(){
        fitActive();
        goToKey(key, false);
        /* images may load late */
        box.querySelectorAll("img").forEach(function(img){
          if(img.complete) return;
          img.addEventListener("load", function(){ scheduleFit(); }, {once:true});
        });
      });
    });
  }

  function scheduleFit(){
    clearTimeout(fitT);
    fitT=setTimeout(function(){ fitActive(); }, 50);
  }

  function ensureRO(box){
    if(!box) return;
    if(typeof ResizeObserver==="undefined"){
      if(!window._bpp502win){
        window._bpp502win=1;
        var t=0;
        window.addEventListener("resize", function(){ clearTimeout(t); t=setTimeout(scheduleFit, 80); });
        window.addEventListener("orientationchange", function(){ setTimeout(scheduleFit, 200); });
      }
      return;
    }
    if(ro){ try{ ro.disconnect(); }catch(e){} }
    ro=new ResizeObserver(function(){ scheduleFit(); });
    ro.observe(box);
    var stage=document.getElementById("stage");
    if(stage) ro.observe(stage);
    var fs=document.getElementById("bppFsBox")||document.getElementById("bppFsStage");
    if(fs) ro.observe(fs);
  }

  window.bppPaintNotes502=paint;
  window.bppNotesFollow502=function(k){ goToKey(k, true); scheduleFit(); };
  window.bppFitNotes502=scheduleFit;
  window.bppClearNotesFit502=function(){
    var box=hostBox(); if(!box) return;
    box.style.height=""; box.style.maxHeight="";
    box.classList.remove("bpp-notes-mode");
  };

  /* Fs / Groß-Modus class toggles – re-fit */
  var mo=null;
  function watchFs(){
    if(mo) return;
    mo=new MutationObserver(function(){ if(isMms()&&on()) scheduleFit(); });
    if(document.body) mo.observe(document.body,{attributes:true,attributeFilter:["class"]});
  }

    function wrapClear(){
    if(typeof paintLyrics!=="function" || paintLyrics._bpp502clear) return;
    var o=paintLyrics;
    window.paintLyrics=function(){
      var r=o.apply(this, arguments);
      try{
        if(!(isMms()&&on())){
          var box=hostBox();
          if(box){ box.style.height=""; box.style.maxHeight=""; }
        }
      }catch(e){}
      return r;
    };
    window.paintLyrics._bpp502clear=1;
  }
  function boot(){
    watchFs(); wrapClear();
    if(isMms()&&on()&&typeof paintLyrics==="function") try{ paintLyrics(); }catch(e){}
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(boot,300); });
  else setTimeout(boot,300);

  /* single throttled resize fallback */
  var rt=0;
  window.addEventListener("resize", function(){ clearTimeout(rt); rt=setTimeout(scheduleFit, 80); });
  window.addEventListener("orientationchange", function(){ setTimeout(scheduleFit, 180); });
})();
