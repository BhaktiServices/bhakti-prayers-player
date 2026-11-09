/* [Grok-Bot] V5.06: Noten-Modus Android-Fix.
   Ursachen V5.05: #stage/.bar position:fixed → Overlay über Stats/Lyrics, overflow:hidden → kein Touch-Scroll;
   Knopf in #lyrTitle ohne Flex → Umbruch/Hüpfen; Strophen-Follow nur per 500ms-Poll, auf Android oft zu spät.
   Fix: Noten im Dokumentfluss (kein Fixed-Overlay), Lyrics scrollbar (-webkit-overflow-scrolling),
   Titelzeile Flex nowrap + ellipsis, Follow via timeupdate/seeked + Poll; contain bleibt.
   Owner-Layout: bppFitNotes506 / paint via v505-Hooks. critical=false. */
window.BPP_BUILD="5.06"; window.BPP_SHOW="5.06";
(function(){
  if(window.bppV506) return; window.bppV506=1;

  var st=document.createElement("style");
  st.id="bppNotesFit506css";
  st.textContent=
    /* Stable title row: no wrap/jump */
    "#lyrTitle.l301,#lyrTitle{"+
      "display:flex!important;flex-wrap:nowrap!important;align-items:center!important;"+
      "gap:6px!important;max-width:100%;box-sizing:border-box}"+
    "#lyrTitle .bppNotesTitleLab506{"+
      "flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"+
    "#bppNotes501,#bppShare{"+
      "flex:0 0 auto!important;white-space:nowrap!important;align-self:center}"+
    "#bppNotes501{margin-left:0!important}"+
    /* Cancel V5.03/V5.05 fixed overlay – notes stay in document flow */
    "body.bpp-notes-on503 .bar{"+
      "position:static!important;left:auto!important;right:auto!important;bottom:auto!important;"+
      "z-index:auto!important;max-height:none!important;overflow:visible!important;"+
      "background:transparent!important;border-top:0!important;padding:4px 8px!important}"+
    "body.bpp-notes-on503 .bar #now{display:none!important}"+
    "body.bpp-notes-on503 .bar audio{height:28px!important;max-height:28px;width:100%}"+
    "body.bpp-notes-on503 #stage{"+
      "position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;"+
      "z-index:auto!important;margin:8px 10px 12px!important;height:auto!important;max-height:none!important;"+
      "display:block!important;grid-template-columns:none!important}"+
    "body.bpp-notes-on503 #ytBox{display:none!important}"+
    "body.bpp-notes-on503 #lyrTitle{display:flex!important}"+ /* don't hide on short screens */
    "body.bpp-notes-on503 #bppL1{display:flex!important}"+
    "body.bpp-notes-on503 header{max-height:none!important;overflow:visible!important}"+
    /* Scrollable in-flow lyrics / notes host */
    "body.bpp-notes-on503 #lyrics.bpp-notes-mode, body.bpp-notes-on503 #lyrics{"+
      "position:relative!important;display:block!important;"+
      "height:auto!important;max-height:none!important;min-height:0!important;"+
      "overflow-x:hidden!important;overflow-y:auto!important;"+
      "-webkit-overflow-scrolling:touch!important;touch-action:pan-y!important;"+
      "overscroll-behavior:contain;padding:8px!important;box-sizing:border-box!important;"+
      "width:auto!important;margin:0!important;column-count:1!important}"+
    /* Shell in normal flow (not absolute fill) */
    "#lyrics .bppNotesShell503{"+
      "position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;"+
      "display:flex!important;flex-direction:column!important;gap:4px;"+
      "overflow:visible!important;min-height:0;width:100%;box-sizing:border-box}"+
    "#lyrics .bppNotesTitle503,#lyrics .bppNotesCap503{"+
      "position:static!important;height:auto!important;line-height:1.25!important;"+
      "background:none!important;pointer-events:auto;z-index:auto;padding:0 2px;"+
      "text-shadow:none}"+
    "#lyrics .bppNotesTitle503{color:var(--gold);font-family:'Gentium Book Plus',Georgia,serif;font-size:1rem;"+
      "border-bottom:1px solid #6b5340;padding-bottom:4px;margin:0 0 2px}"+
    "#lyrics .bppNotesCap503{text-align:center;font:600 .75rem/1.2 system-ui,sans-serif;color:#e0b45a;margin:0 0 4px}"+
    "#lyrics .bppNotesFrame503{"+
      "position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;"+
      "flex:0 0 auto;width:100%;"+
      "min-height:42vh;height:var(--bpp-notes-frame-h,58vh);max-height:75vh;"+
      "background:#fff;border:2px solid #e0b45a;border-radius:10px;overflow:hidden;"+
      "box-sizing:border-box;padding:6px}"+
    "#lyrics .bppNotesFrame503 img{"+
      "display:block;width:100%;height:100%;object-fit:contain;object-position:center top;"+
      "background:#fff;border:0;pointer-events:auto;-webkit-user-drag:none}"+
    /* Groß: keep absolute fill inside FS stage (already scrollable host) */
    "#bppFs.bpp-notes-fs .bppNotesShell503{display:flex!important;flex-direction:column!important}"+
    "#bppFs.bpp-notes-fs .bppNotesFrame503{flex:1 1 auto;min-height:0;height:auto!important;max-height:none}"+
    "@media(max-width:430px){"+
      "#lyrTitle.l301,#lyrTitle{padding-right:4px}"+
      "#bppNotes501{padding:3px 7px;font-size:.78rem}"+
      "#lyrics .bppNotesFrame503{min-height:48vh;height:var(--bpp-notes-frame-h,55vh)}"+
    "}";
  document.head.appendChild(st);

  function hasNotesOn(){
    try{
      if(typeof window.bppHasNotes505==="function"&&window.bppHasNotes505()){
        return !!(window.bppNotesOn505&&window.bppNotesOn505());
      }
    }catch(e){}
    return false;
  }

  function stabilizeTitle(){
    var t=document.getElementById("lyrTitle"); if(!t) return;
    t.classList.add("l301");
    var lab=t.querySelector(".bppNotesTitleLab506");
    if(!lab){
      lab=document.createElement("span");
      lab.className="bppNotesTitleLab506";
      /* move leading text nodes / non-button nodes into label */
      var move=[];
      Array.prototype.forEach.call(t.childNodes, function(n){
        if(n.nodeType===3){ move.push(n); return; }
        if(n.nodeType===1){
          var id=n.id||"";
          if(id==="bppNotes501"||id==="bppShare") return;
          if(n.tagName==="BUTTON") return;
          move.push(n);
        }
      });
      move.forEach(function(n){ lab.appendChild(n); });
      if(!lab.textContent.trim() && typeof i!=="undefined" && i>=0 && PRAYERS[i]) lab.textContent=PRAYERS[i].titel||"";
      t.insertBefore(lab, t.firstChild);
    }else if(typeof i!=="undefined" && i>=0 && PRAYERS[i]){
      var want=PRAYERS[i].titel||"";
      if(lab.textContent!==want && want) lab.textContent=want;
    }
    /* keep notes btn after label, before share if possible */
    var btn=document.getElementById("bppNotes501");
    var sh=document.getElementById("bppShare");
    if(btn){
      if(sh && sh.parentNode===t){
        if(btn.nextSibling!==sh) t.insertBefore(btn, sh);
      }else if(btn.parentNode!==t){
        t.appendChild(btn);
      }
    }
  }

  function frameHeightPx(){
    var vh=window.innerHeight||640;
    var top=0;
    try{
      var ly=document.getElementById("lyrTitle");
      if(ly) top=ly.getBoundingClientRect().bottom;
      else {
        var bar=document.querySelector(".bar");
        if(bar) top=bar.getBoundingClientRect().bottom;
      }
    }catch(e){}
    var chrome=Math.max(120, top+12);
    /* leave room for transport + a bit of foot; frame fills remaining */
    var h=Math.floor(vh-chrome-56);
    var minH=Math.max(200, Math.floor(vh*0.42));
    var maxH=Math.floor(vh*0.72);
    return Math.max(minH, Math.min(maxH, h));
  }

  function applyGeom506(){
    if(!hasNotesOn()) return null;
    stabilizeTitle();
    /* clear any leftover fixed offsets from v503/v505 */
    var stage=document.getElementById("stage");
    if(stage){
      stage.style.top=""; stage.style.bottom=""; stage.style.left=""; stage.style.right="";
      stage.style.height=""; stage.style.maxHeight=""; stage.style.position="";
    }
    var box=document.getElementById("lyrics");
    if(!box||!box.classList.contains("bpp-notes-mode")) return null;
    box.style.height=""; box.style.maxHeight=""; box.style.minHeight="";
    box.style.overflowY="auto";
    box.style.webkitOverflowScrolling="touch";
    var fh=frameHeightPx();
    box.style.setProperty("--bpp-notes-frame-h", fh+"px");
    var shell=box.querySelector(".bppNotesShell503");
    var frame=box.querySelector(".bppNotesFrame503");
    var img=frame&&frame.querySelector("img");
    if(shell){
      shell.style.position="relative";
      shell.style.left=""; shell.style.right=""; shell.style.top=""; shell.style.bottom="";
    }
    if(frame){
      frame.style.position="relative";
      frame.style.left=""; frame.style.right=""; frame.style.top=""; frame.style.bottom="";
      frame.style.height=fh+"px";
      frame.style.maxHeight="75vh";
    }
    if(img){
      img.style.width="100%"; img.style.height="100%";
      img.style.objectFit="contain"; img.style.objectPosition="center top";
    }
    box.dataset.bppFreeH=String(fh);
    /* FS host still absolute – nudge via v505 apply if present */
    try{
      if(typeof window.bppFitNotes505==="function"){ /* geom overridden below */ }
    }catch(e){}
    return {frameH:fh};
  }

  function followNow(){
    try{
      if(!hasNotesOn()) return;
      if(typeof window.bppNotesFollow505==="function"){
        var k="";
        try{
          var P=(typeof i!=="undefined"&&i>=0)?PRAYERS[i]:null;
          if(P&&typeof stanzaGroups==="function"){
            var gs=stanzaGroups(P);
            var g=(typeof currentGroupIndex==="function")?currentGroupIndex():0;
            if(g<0) g=0;
            if(gs[g]&&gs[g].key) k=String(gs[g].key);
          }
        }catch(e){}
        if(k) window.bppNotesFollow505(k);
      }
    }catch(e){}
  }

  /* Override v505 fit/paint geom */
  var _fit=window.bppFitNotes505;
  window.bppFitNotes505=function(){
    applyGeom506();
    try{ if(typeof _fit==="function"){ /* skip old fixed geom by applying ours after */ } }catch(e){}
    applyGeom506();
  };
  window.bppFitNotes506=window.bppFitNotes505;
  window.bppFitNotes503=window.bppFitNotes505;

  var _paint=window.bppPaintNotes505;
  window.bppPaintNotes505=function(){
    if(typeof _paint==="function") _paint();
    stabilizeTitle();
    requestAnimationFrame(function(){
      applyGeom506();
      requestAnimationFrame(function(){ applyGeom506(); followNow(); });
    });
  };
  window.bppPaintNotes503=window.bppPaintNotes505;
  window.bppPaintNotes502=window.bppPaintNotes505;

  /* Stronger stanza follow */
  var lastFollow="", followT=0;
  function scheduleFollow(){
    clearTimeout(followT);
    followT=setTimeout(function(){
      var k="";
      try{
        var P=(typeof i!=="undefined"&&i>=0)?PRAYERS[i]:null;
        if(P&&typeof stanzaGroups==="function"){
          var gs=stanzaGroups(P);
          var g=(typeof currentGroupIndex==="function")?currentGroupIndex():0;
          if(g<0) g=0;
          if(gs[g]&&gs[g].key) k=String(gs[g].key);
        }
      }catch(e){}
      if(k && k!==lastFollow){ lastFollow=k; followNow(); }
      else if(hasNotesOn()) applyGeom506();
    }, 80);
  }

  function hookMedia(){
    var el=document.getElementById("a");
    if(el && !el.__bpp506follow){
      el.__bpp506follow=1;
      ["timeupdate","seeked","play"].forEach(function(ev){
        el.addEventListener(ev, scheduleFollow);
      });
    }
  }

  /* Wrap paintLyrics to restabilize title after text paints */
  function wrapPaint(){
    if(typeof paintLyrics!=="function" || paintLyrics._bpp506) return;
    var o=paintLyrics;
    window.paintLyrics=function(){
      var r=o.apply(this, arguments);
      try{ if(hasNotesOn()){ stabilizeTitle(); applyGeom506(); } else stabilizeTitle(); }catch(e){}
      return r;
    };
    window.paintLyrics._bpp506=1;
  }

  function boot(){
    wrapPaint();
    hookMedia();
    stabilizeTitle();
    if(hasNotesOn()){
      try{ window.bppPaintNotes505(); }catch(e){ applyGeom506(); }
    }
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(boot, 400); });
  else setTimeout(boot, 400);

  window.addEventListener("resize", function(){ applyGeom506(); });
  window.addEventListener("orientationchange", function(){ setTimeout(applyGeom506, 200); });
  setInterval(function(){ wrapPaint(); hookMedia(); stabilizeTitle(); if(hasNotesOn()){ scheduleFollow(); applyGeom506(); } }, 700);
})();
