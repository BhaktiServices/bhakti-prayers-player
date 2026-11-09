/* [Grok-Bot] V5.08: Noten auch in Groß-Ansicht.
   Wenn Noten-Modus (Mukunda/Ramanuja) aktiv und Nutzer „Groß“ öffnet: Notenblatt
   statt Groß-Lyrics, contain so groß wie möglich, Strophen-Follow, Zoom (v507),
   Noten/Text-Knopf in der Groß-UI (ruft v507-Toggle). Verlassen von Groß → normale
   Notenansicht. Owner: Groß-Noten-Shell/Btn = v508; Click/Taste E weiter v507.
   Ursache Lücke: #bppFs wird erst bei Open gebaut → v505-MO hing nie; v506/v507
   banden nur #lyrics. critical=false. */
window.BPP_BUILD="5.08"; window.BPP_SHOW="5.08";
(function(){
  if(window.bppV508) return; window.bppV508=1;

  var mo=null, lastFsOn=false, lastNotes=false, lastSrc="", lastCap="";

  var st=document.createElement("style");
  st.id="bppFsNotes508css";
  st.textContent=
    /* Stage fills available space above bar; no fixed overlay over Android chrome */
    "#bppFs.bpp-notes-fs{"+
      "overflow:hidden!important"+
    "}"+
    /* Keep measurable size: v183 draw() infinite-loops if bppFsBox width/height collapse to 0 */
    "#bppFs.bpp-notes-fs #bppFsBox{"+
      "visibility:hidden!important;position:absolute!important;left:0!important;right:0!important;top:0!important;"+
      "width:100%!important;height:100%!important;max-width:100%!important;"+
      "opacity:0!important;pointer-events:none!important;z-index:0!important;overflow:hidden!important"+
    "}"+
        "#bppFs.bpp-notes-fs #bppFsStage > #bppFsBox{width:100%!important;height:100%!important}"+
"#bppFs.bpp-notes-fs #bppFsStage{"+
      "position:absolute!important;left:2vw!important;right:2vw!important;top:3.2vh!important;bottom:13vh!important;"+
      "display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:stretch!important;"+
      "overflow:hidden!important;z-index:2;box-sizing:border-box;padding:0;margin:0"+
    "}"+
    "#bppFs.bpp-notes-fs .bppNotesShell503{"+
      "position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;"+
      "flex:1 1 auto;display:flex!important;flex-direction:column!important;gap:4px;"+
      "width:100%;height:100%;min-height:0;box-sizing:border-box;z-index:5;overflow:hidden"+
    "}"+
    "#bppFs.bpp-notes-fs .bppNotesTitle503{"+
      "position:static!important;height:auto!important;line-height:1.25!important;"+
      "flex:0 0 auto;color:var(--gold,#e0b45a);font-family:'Gentium Book Plus',Georgia,serif;font-size:1rem;"+
      "padding:2px 4px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"+
      "background:none!important;pointer-events:none;text-shadow:none"+
    "}"+
    "#bppFs.bpp-notes-fs .bppNotesCap503{"+
      "position:static!important;height:auto!important;line-height:1.2!important;"+
      "flex:0 0 auto;text-align:center;font:600 .75rem/1.2 system-ui,sans-serif;color:#e0b45a;"+
      "padding:0 4px 2px;pointer-events:none;text-shadow:none;background:none!important"+
    "}"+
    "#bppFs.bpp-notes-fs .bppNotesFrame503{"+
      "position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;"+
      "flex:1 1 auto;min-height:0;width:100%;height:auto;"+
      "background:#fff;border:2px solid #e0b45a;border-radius:10px;overflow:hidden;"+
      "box-sizing:border-box;padding:6px;touch-action:pan-y"+
    "}"+
    "#bppFs.bpp-notes-fs .bppNotesFrame503.bpp-notes-zoomed{touch-action:none}"+
    "#bppFs.bpp-notes-fs .bppNotesFrame503 img{"+
      "display:block;width:100%;height:100%;object-fit:contain;object-position:center center;"+
      "background:#fff;border:0;pointer-events:none;-webkit-user-drag:none"+
    "}"+
    /* Notes toggle in Groß top bar */
    "#bppFsTop{pointer-events:none}"+
    "#bppFsTop #bppNotesFs508{"+
      "pointer-events:auto;display:inline-flex;align-items:center;gap:4px;"+
      "margin:0 0 0 8px;padding:4px 10px;font:600 .82rem/1.2 system-ui,sans-serif;"+
      "border-radius:8px;border:1px solid #8a7355;background:#2a2118;color:#e8dcc8;"+
      "cursor:pointer;flex:0 0 auto;z-index:6;vertical-align:middle"+
    "}"+
    "#bppFsTop #bppNotesFs508 .sym{font-size:1.05rem;opacity:.9;filter:grayscale(1);margin-right:2px}"+
    "#bppFsTop #bppNotesFs508.on, #bppFsTop #bppNotesFs508.gold{"+
      "background:#e0b45a!important;border-color:#e0b45a!important;color:#1a1208!important"+
    "}"+
    "#bppFsTop #bppNotesFs508.on .sym, #bppFsTop #bppNotesFs508.gold .sym{filter:none;opacity:1}"+
    "#bppFs.bpp-notes-fs #bppFsTop{"+
      "display:flex!important;align-items:center;justify-content:space-between;"+
      "pointer-events:none;z-index:6"+
    "}"+
    "#bppFs.bpp-notes-fs #bppFsT1{display:inline-flex;align-items:center;gap:6px;max-width:70%;overflow:hidden}"+
    "@media(max-width:400px){#bppFsTop #bppNotesFs508{padding:3px 8px;font-size:.78rem}}";
  document.head.appendChild(st);

  function fsEl(){ return document.getElementById("bppFs"); }
  function fsOn(){ var f=fsEl(); return !!(f&&f.classList.contains("on")); }
  function notesOn(){
    try{
      if(typeof window.bppNotesOn507==="function") return !!window.bppNotesOn507();
      if(typeof window.bppNotesOn505==="function") return !!window.bppNotesOn505();
    }catch(e){}
    return false;
  }
  function hasNotes(){
    try{ return !!(typeof window.bppHasNotes505==="function"&&window.bppHasNotes505()); }catch(e){ return false; }
  }
  function curTitle(){
    try{
      if(typeof i!=="undefined"&&i>=0&&PRAYERS[i]) return PRAYERS[i].titel||"";
    }catch(e){}
    var t1=document.getElementById("bppFsT1");
    return t1?(t1.textContent||"").replace(/\s*𝄞.*$/,"").trim():"";
  }

  function wantFsNotes(){ return fsOn() && hasNotes() && notesOn(); }

  function ensureShell(){
    var fs=fsEl(), stage=document.getElementById("bppFsStage");
    if(!fs||!stage) return null;
    if(!wantFsNotes()){
      fs.classList.remove("bpp-notes-fs");
      var old=stage.querySelector(".bppNotesShell503"); if(old) old.remove();
      return null;
    }
    fs.classList.add("bpp-notes-fs");
    try{
      var box=document.getElementById("bppFsBox");
      if(box){
        box.style.width="100%"; box.style.height="100%"; box.style.minWidth="200px";
        box.style.minHeight="200px"; box.style.opacity="0"; box.style.pointerEvents="none";
      }
    }catch(e){}
    var shell=stage.querySelector(".bppNotesShell503");
    if(!shell){
      shell=document.createElement("div");
      shell.className="bppNotesShell503";
      shell.innerHTML="<div class='bppNotesTitle503'></div><div class='bppNotesCap503'></div>"+
        "<div class='bppNotesFrame503'><img alt='' decoding='async'></div>";
      stage.appendChild(shell);
      lastSrc=""; lastCap="";
    }
    var title=shell.querySelector(".bppNotesTitle503");
    if(title) title.textContent=curTitle();
    return shell;
  }

  function syncPage(){
    var shell=ensureShell(); if(!shell) return null;
    var lyrCap=document.querySelector("#lyrics .bppNotesCap503");
    var lyrImg=document.querySelector("#lyrics .bppNotesFrame503 img");
    var cap=shell.querySelector(".bppNotesCap503");
    var img=shell.querySelector(".bppNotesFrame503 img");
    var capTxt=lyrCap?String(lyrCap.textContent||""):(cap?String(cap.textContent||""):"");
    var src=lyrImg?lyrImg.getAttribute("src"):(img?img.getAttribute("src"):"");
    /* Fallback once: if lyrics not yet painted, ask v505 to paint then retry mirror */
    if(!src && typeof window.bppPaintNotes505==="function" && !window.__bpp508painted){
      window.__bpp508painted=1;
      try{ window.bppPaintNotes505(); }catch(e){}
      lyrImg=document.querySelector("#lyrics .bppNotesFrame503 img");
      lyrCap=document.querySelector("#lyrics .bppNotesCap503");
      src=lyrImg?lyrImg.getAttribute("src"):"";
      capTxt=lyrCap?String(lyrCap.textContent||""):capTxt;
      setTimeout(function(){ window.__bpp508painted=0; }, 1500);
    }
    if(cap && capTxt && cap.textContent!==capTxt) cap.textContent=capTxt;
    if(img && src && img.getAttribute("src")!==src){
      img.setAttribute("src", src);
      img.setAttribute("alt", capTxt||"Notation");
    }
    if(capTxt && lastCap && capTxt!==lastCap){
      try{ if(typeof window.bppResetNotesZoom507==="function") window.bppResetNotesZoom507(); }catch(e){}
    }
    if(capTxt) lastCap=capTxt;
    if(src) lastSrc=src;
    try{ if(typeof window.bppBindNotesZoom507==="function") window.bppBindNotesZoom507(); }catch(e){}
    return shell;
  }

  function tearDown(){
    var fs=fsEl();
    if(fs) fs.classList.remove("bpp-notes-fs");
    var stage=document.getElementById("bppFsStage");
    var sh=stage&&stage.querySelector(".bppNotesShell503");
    if(sh) sh.remove();
    lastSrc=""; lastCap="";
  }

  function paintFsBtn(){
    var b=document.getElementById("bppNotesFs508"); if(!b) return;
    var show=fsOn() && hasNotes();
    b.style.display=show?"inline-flex":"none";
    if(!show) return;
    var on=notesOn();
    var lang=(typeof window.lang==="string")?window.lang:"de";
    var lab=on?"Text":(lang==="en"?"Notes":"Noten");
    var span=b.querySelector(".lab"); if(span) span.textContent=lab;
    var key=(window.bppNotesKey507||"E");
    b.title=(on?"Text/Lyrics anzeigen":"Notation anzeigen")+" ("+key+")";
    b.setAttribute("aria-label", b.title);
    b.setAttribute("aria-pressed", on?"true":"false");
    b.classList.toggle("on", on); b.classList.toggle("gold", on);
  }

  function ensureFsBtn(){
    var top=document.getElementById("bppFsTop");
    var t1=document.getElementById("bppFsT1");
    if(!top) return null;
    var b=document.getElementById("bppNotesFs508");
    if(!b){
      b=document.createElement("button");
      b.type="button"; b.id="bppNotesFs508";
      b.innerHTML='<span class="sym" aria-hidden="true">𝄞</span><span class="lab">Noten</span>';
      b.addEventListener("click", function(e){
        e.preventDefault(); e.stopPropagation();
        if(typeof window.bppToggleNotes507==="function"){
          window.bppToggleNotes507(e);
        }
        setTimeout(function(){ sync(); paintFsBtn(); }, 50);
        setTimeout(function(){ sync(); paintFsBtn(); }, 300);
      }, true);
    }
    /* Prefer beside title text inside T1 */
    if(t1){
      if(b.parentNode!==t1) t1.appendChild(b);
    }else if(b.parentNode!==top){
      top.appendChild(b);
    }
    paintFsBtn();
    return b;
  }

  function sync(){
    var onFs=fsOn(), onN=notesOn()&&hasNotes();
    if(onFs) ensureFsBtn();
    if(onFs && onN){
      syncPage();
      paintFsBtn();
    }else if(lastFsOn && lastNotes && (!onFs || !onN)){
      tearDown();
      paintFsBtn();
      /* Leaving notes while still in Groß: lyrics Groß continues via v183 draw */
      /* Leaving Groß while notes on: normal in-flow notes already in #lyrics */
      if(!onFs && onN){
        try{ if(typeof window.bppFitNotes506==="function") window.bppFitNotes506(); }catch(e){}
        try{ if(typeof window.bppBindNotesZoom507==="function") window.bppBindNotesZoom507(); }catch(e){}
      }
    }else{
      paintFsBtn();
    }
    lastFsOn=onFs; lastNotes=onN;
  }

  function hookFs(){
    var fs=fsEl(); if(!fs) return false;
    if(fs._bpp508mo) return true;
    fs._bpp508mo=1;
    try{
      mo=new MutationObserver(function(){ setTimeout(sync, 60); });
      mo.observe(fs,{attributes:true,attributeFilter:["class"]});
    }catch(e){}
    return true;
  }

  function wrapToggle(){
    if(typeof window.bppToggleNotes507!=="function" || window.bppToggleNotes507._bpp508) return;
    var o=window.bppToggleNotes507;
    window.bppToggleNotes507=function(e){
      var r=o.apply(this, arguments);
      setTimeout(sync, 30);
      setTimeout(sync, 200);
      return r;
    };
    window.bppToggleNotes507._bpp508=1;
  }

  function wrapPaint(){
    if(typeof paintLyrics!=="function" || paintLyrics._bpp508) return;
    var o=paintLyrics;
    window.paintLyrics=function(){
      var r=o.apply(this, arguments);
      try{ setTimeout(sync, 40); }catch(e){}
      return r;
    };
    window.paintLyrics._bpp508=1;
  }

  window.bppFsNotesSync508=sync;
  window.bppFsNotesOn508=wantFsNotes;

  function boot(){
    wrapPaint(); wrapToggle(); hookFs(); sync();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(boot, 500); });
  else setTimeout(boot, 500);

  setInterval(function(){
    wrapPaint(); wrapToggle();
    if(!hookFs()){ /* bppFs not built yet */ }
    sync();
  }, 800);
})();
