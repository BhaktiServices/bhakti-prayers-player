/* [Grok-Bot] V5.09: Groß-Noten Layout-Fix.
   V5.08-Probleme: (a) Doppel-Titel bppFsT1 + .bppNotesTitle503;
   (b) Text-Knopf in #bppFsT1 → draw() textContent wischte ihn weg / overflow schnitt ab,
   Überlappung mit #bppFsT2; (c) Stage bottom zu knapp → Notenblatt über Play-Leiste;
   weißer Leerraum im Frame.
   Fix: eine Kopfzeile [Titel… | Text | Strophe], Titel nur in T1, Shell-Titel aus;
   Stage zwischen Kopf und gemessener Bar; Bar z-index oben; Frame-Hintergrund dunkel.
   Owner: Groß-Noten-Chrome v509 (baut auf v508 Shell/Sync). critical=false. */
window.BPP_BUILD="5.09"; window.BPP_SHOW="5.09";
(function(){
  if(window.bppV509) return; window.bppV509=1;

  var st=document.createElement("style");
  st.id="bppFsNotes509css";
  st.textContent=
    /* Header: three zones, nothing overlaps */
    "#bppFs.bpp-notes-fs #bppFsTop{"+
      "display:flex!important;flex-direction:row!important;align-items:center!important;"+
      "justify-content:flex-start!important;gap:8px!important;"+
      "left:8px!important;right:58px!important;top:6px!important;"+
      "height:40px!important;max-height:40px!important;"+
      "box-sizing:border-box!important;z-index:20!important;"+
      "pointer-events:none!important;overflow:visible!important"+
    "}"+
    "#bppFs.bpp-notes-fs #bppFsT1{"+
      "display:block!important;flex:1 1 auto!important;min-width:0!important;max-width:none!important;"+
      "overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important;"+
      "color:#e0b45a!important;font:600 0.95rem/1.2 'Gentium Book Plus',Georgia,serif!important;"+
      "pointer-events:none!important"+
    "}"+
    "#bppFs.bpp-notes-fs #bppFsT2{"+
      "display:block!important;flex:0 1 auto!important;max-width:28%!important;min-width:0!important;"+
      "overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important;"+
      "color:#a9a39a!important;font:600 .75rem/1.2 system-ui,sans-serif!important;"+
      "pointer-events:none!important;text-align:right!important"+
    "}"+
    "#bppFs.bpp-notes-fs #bppNotesFs508{"+
      "pointer-events:auto!important;display:inline-flex!important;align-items:center!important;gap:4px!important;"+
      "flex:0 0 auto!important;margin:0!important;padding:5px 10px!important;"+
      "font:600 .82rem/1.15 system-ui,sans-serif!important;white-space:nowrap!important;"+
      "border-radius:8px!important;border:1px solid #8a7355!important;"+
      "background:#2a2118!important;color:#e8dcc8!important;cursor:pointer!important;"+
      "z-index:21!important;max-width:none!important;overflow:visible!important"+
    "}"+
    "#bppFs.bpp-notes-fs #bppNotesFs508 .lab{overflow:visible!important;text-overflow:clip!important}"+
    "#bppFs.bpp-notes-fs #bppNotesFs508.on,"+
    "#bppFs.bpp-notes-fs #bppNotesFs508.gold{"+
      "background:#e0b45a!important;border-color:#e0b45a!important;color:#1a1208!important"+
    "}"+
    /* Single title: hide shell title (T1 owns it) */
    "#bppFs.bpp-notes-fs .bppNotesTitle503{display:none!important;height:0!important;margin:0!important;padding:0!important;overflow:hidden!important}"+
    /* Stage between header and bar */
    "#bppFs.bpp-notes-fs #bppFsStage{"+
      "position:absolute!important;left:8px!important;right:8px!important;"+
      "top:var(--bpp-fs-notes-top,48px)!important;"+
      "bottom:var(--bpp-fs-notes-bot,120px)!important;"+
      "display:flex!important;flex-direction:column!important;"+
      "align-items:stretch!important;justify-content:flex-start!important;"+
      "overflow:hidden!important;z-index:2!important;"+
      "box-sizing:border-box!important;padding:0!important;margin:0!important"+
    "}"+
    "#bppFs.bpp-notes-fs .bppNotesShell503{"+
      "position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;"+
      "flex:1 1 auto!important;display:flex!important;flex-direction:column!important;gap:4px!important;"+
      "width:100%!important;height:100%!important;min-height:0!important;"+
      "box-sizing:border-box!important;z-index:5!important;overflow:hidden!important"+
    "}"+
    "#bppFs.bpp-notes-fs .bppNotesCap503{"+
      "position:static!important;flex:0 0 auto!important;text-align:center!important;"+
      "font:600 .72rem/1.2 system-ui,sans-serif!important;color:#e0b45a!important;"+
      "padding:0 4px 2px!important;background:none!important"+
    "}"+
    "#bppFs.bpp-notes-fs .bppNotesFrame503{"+
      "position:relative!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;"+
      "flex:1 1 auto!important;min-height:0!important;width:100%!important;"+
      "background:#1a1410!important;border:2px solid #e0b45a!important;border-radius:10px!important;"+
      "overflow:hidden!important;box-sizing:border-box!important;padding:4px!important;"+
      "touch-action:pan-y"+
    "}"+
    "#bppFs.bpp-notes-fs .bppNotesFrame503 img{"+
      "display:block!important;width:100%!important;height:100%!important;"+
      "object-fit:contain!important;object-position:center center!important;"+
      "background:transparent!important;border:0!important"+
    "}"+
    /* Bar always above notes */
    "#bppFs.bpp-notes-fs #bppFsBar{"+
      "z-index:30!important;pointer-events:auto!important;"+
      "opacity:1!important;bottom:8px!important"+
    "}"+
    "#bppFs.bpp-notes-fs #bppFsBar.hid{opacity:1!important;pointer-events:auto!important}"+
    "#bppFs.bpp-notes-fs #bppFsX{z-index:40!important;pointer-events:auto!important}"+
    "@media(max-width:400px){"+
      "#bppFs.bpp-notes-fs #bppFsTop{height:36px!important;gap:6px!important}"+
      "#bppFs.bpp-notes-fs #bppNotesFs508{padding:4px 8px!important;font-size:.78rem!important}"+
      "#bppFs.bpp-notes-fs #bppFsT1{font-size:.88rem!important}"+
      "#bppFs.bpp-notes-fs #bppFsStage{top:var(--bpp-fs-notes-top,44px)!important}"+
    "}"+
    "@media(orientation:landscape) and (max-height:480px){"+
      "#bppFs.bpp-notes-fs #bppFsTop{height:32px!important;top:4px!important}"+
      "#bppFs.bpp-notes-fs #bppFsStage{top:var(--bpp-fs-notes-top,38px)!important}"+
      "#bppFs.bpp-notes-fs #bppFsBar{transform:translateX(-50%) scale(.92);transform-origin:bottom center}"+
    "}";
  document.head.appendChild(st);

  function fsEl(){ return document.getElementById("bppFs"); }
  function fsOn(){ var f=fsEl(); return !!(f&&f.classList.contains("on")&&f.classList.contains("bpp-notes-fs")); }

  function placeBtn(){
    var top=document.getElementById("bppFsTop");
    var t1=document.getElementById("bppFsT1");
    var t2=document.getElementById("bppFsT2");
    var b=document.getElementById("bppNotesFs508");
    if(!top||!b) return;
    /* Must NOT live inside T1: draw() does top1.textContent=… and would wipe it */
    if(t2 && t2.parentNode===top){
      if(b.nextSibling!==t2) top.insertBefore(b, t2);
    }else if(t1 && t1.parentNode===top){
      if(b.previousSibling!==t1){
        if(t1.nextSibling) top.insertBefore(b, t1.nextSibling);
        else top.appendChild(b);
      }
    }else if(b.parentNode!==top){
      top.appendChild(b);
    }
  }

  function applyGeom(){
    var fs=fsEl(); if(!fs||!fs.classList.contains("on")||!fs.classList.contains("bpp-notes-fs")) return;
    var top=document.getElementById("bppFsTop");
    var bar=document.getElementById("bppFsBar");
    var vh=window.innerHeight||740;
    var topH=48, bot=120;
    try{
      if(top){
        var tr=top.getBoundingClientRect();
        topH=Math.max(36, Math.ceil(tr.bottom+6));
      }
      if(bar){
        bar.classList.remove("hid");
        var br=bar.getBoundingClientRect();
        var need=Math.max(72, Math.ceil(vh-br.top+8));
        /* If bar not laid out yet, estimate — do not cap so low that the stage covers the bar */
        if(br.height<16 || br.top<=0) need=Math.max(96, Math.min(Math.ceil((bar.offsetHeight||120)+16), Math.floor(vh*0.48)));
        bot=need;
        var maxBot=Math.max(72, vh-(topH+40));
        if(bot>maxBot) bot=maxBot;
      }
    }catch(e){}
    /* V5.13: owner may replace this; still dirty-write vars */
    if(typeof window.bppFsNotesGeom513==="function"){ window.bppFsNotesGeom513(); return; }
    if(fs.style.getPropertyValue("--bpp-fs-notes-top")!==topH+"px") fs.style.setProperty("--bpp-fs-notes-top", topH+"px");
    if(fs.style.getPropertyValue("--bpp-fs-notes-bot")!==bot+"px") fs.style.setProperty("--bpp-fs-notes-bot", bot+"px");
    placeBtn();
  }

  function hook(){
    var fs=fsEl(); if(!fs||fs._bpp509mo) return !!fs;
    fs._bpp509mo=1;
    try{
      new MutationObserver(function(){ setTimeout(function(){ placeBtn(); applyGeom(); }, 40); })
        .observe(fs,{attributes:true,attributeFilter:["class"]});
    }catch(e){}
    return true;
  }

  function wrapSync(){
    if(typeof window.bppFsNotesSync508!=="function" || window.bppFsNotesSync508._bpp509) return;
    var o=window.bppFsNotesSync508;
    window.bppFsNotesSync508=function(){
      var r=o.apply(this, arguments);
      try{ placeBtn(); applyGeom(); }catch(e){}
      return r;
    };
    window.bppFsNotesSync508._bpp509=1;
  }

  function boot(){
    wrapSync(); hook(); placeBtn(); applyGeom();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(boot, 550); });
  else setTimeout(boot, 550);

  window.addEventListener("resize", function(){ applyGeom(); });
  window.addEventListener("orientationchange", function(){ setTimeout(applyGeom, 200); });
  setInterval(function(){
    wrapSync(); hook();
    if(fsOn()){ placeBtn(); applyGeom(); }
  }, 700);

  window.bppFsNotesGeom509=applyGeom;
})();
