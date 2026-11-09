/* [Grok-Bot] V5.07: Noten-Toggle Fix + Notenblatt-Zoom.
   Ursache Toggle: v501 hing Capture-Click an #bppNotes501 (nur MMS / bpp-mms-notes);
   v505 fand den Knopf und hing keinen eigenen Handler → Ramanuja no-op; Mukunda
   togglte nur Legacy-Key während bpp-notes-mukunda an blieb → paintLyrics blieb Noten.
   Fix: v507 = alleiniger Click-Owner; schreibt bpp-notes-<id> + Legacy bpp-mms-notes
   für Mukunda; v501/v505 weichen. Zoom: Pinch, Doppeltipp, Pan; Desktop +/−;
   Zoom bei Strophenwechsel zurücksetzen (Follow bleibt lesbar). V5.08: Zoom auch in Groß (#bppFs). critical=false. */
window.BPP_BUILD="5.07"; window.BPP_SHOW="5.07";
(function(){
  if(window.bppV507) return; window.bppV507=1;

  var REG_IDS={mukunda:1, ramanuja:1};
  var zScale=1, zTx=0, zTy=0;
  var pinch=null; /* {d0,s0,cx,cy,tx0,ty0} */
  var pan=null;   /* {x0,y0,tx0,ty0,id} */
  var lastTap=0, lastTapX=0, lastTapY=0;
  var lastCap="";
  var MIN_Z=1, MAX_Z=4, DBL_Z=2.4;

  var st=document.createElement("style");
  st.id="bppNotesZoom507css";
  st.textContent=
    "#lyrics .bppNotesFrame503{"+
      "touch-action:pan-y;"+
      "position:relative;"+
      "-webkit-user-select:none;user-select:none"+
    "}"+
    "#lyrics .bppNotesFrame503.bpp-notes-zoomed{"+
      "touch-action:none;overflow:hidden"+
    "}"+
    "#lyrics .bppNotesFrame503 img.bppNotesZoomImg507{"+
      "transform-origin:0 0;"+
      "will-change:transform;"+
      "pointer-events:none;"+
      "-webkit-user-drag:none;user-drag:none"+
    "}"+
    "#bppNotesZoomBar507,.bppNotesZoomBar507{"+
      "display:none;position:absolute;right:8px;bottom:8px;z-index:6;"+
      "flex-direction:row;gap:4px;pointer-events:auto"+
    "}"+
    "#lyrics .bppNotesFrame503:hover #bppNotesZoomBar507,"+
    "#lyrics .bppNotesFrame503.bpp-notes-zoomed #bppNotesZoomBar507,"+
    "body.bpp-notes-zoomdesk #bppNotesZoomBar507{display:flex}"+
    "#bppNotesZoomBar507 button{"+
      "width:28px;height:28px;border-radius:6px;cursor:pointer;"+
      "border:1px solid #8a7355;background:#2a2118;color:#c4b49a;"+
      "font:700 16px/1 system-ui,sans-serif;padding:0;opacity:.85"+
    "}"+
    "#bppNotesZoomBar507 button.on,"+
    "#bppNotesZoomBar507 button.gold{"+
      "border-color:#e0b45a;color:#e0b45a;opacity:1"+
    "}"+
    "@media(pointer:coarse){"+
      "#bppNotesZoomBar507{display:none!important}"+
    "}";
  document.head.appendChild(st);

  function curP(){
    try{ return (typeof i!=="undefined"&&i>=0&&PRAYERS[i])?PRAYERS[i]:null; }catch(e){ return null; }
  }
  function notesId(){ var P=curP(); return (P&&REG_IDS[P.id])?P.id:""; }
  function hasNotes(){ return !!notesId(); }
  function on(){
    try{
      var id=notesId(); if(!id) return false;
      return localStorage.getItem("bpp-notes-"+id)==="1";
    }catch(e){ return false; }
  }
  function setOn(v){
    try{
      var id=notesId(); if(!id) return;
      localStorage.setItem("bpp-notes-"+id, v?"1":"0");
      if(id==="mukunda") localStorage.setItem("bpp-mms-notes", v?"1":"0");
    }catch(e){}
  }

  function paintBtnSafe(){
    try{
      var b=document.getElementById("bppNotes501"); if(!b) return;
      var show=hasNotes();
      b.style.display=show?"inline-flex":"none";
      if(!show) return;
      var notes=on();
      /* Labels: v505 paintBtn (i18n). Here only keep pressed/gold consistent with per-prayer LS. */
      var span=b.querySelector(".lab");
      if(span){
        var cur=(span.textContent||"").trim().toLowerCase();
        var wantNotes=notes; /* gold+Text when notes on */
        if(wantNotes && (cur==="noten"||cur==="notes"||cur==="notas"||cur==="ноты"||cur==="noty"||cur==="नोट्स")){
          /* stale "show notes" label while notes are on – force Text */
          span.textContent=(typeof lang!=="undefined"&&lang==="en")?"Text":"Text";
        }else if(!wantNotes && (cur==="text"||cur==="texte"||cur==="texto"||cur==="текст"||cur==="पाठ")){
          span.textContent=(typeof lang!=="undefined"&&lang==="en")?"Notes":"Noten";
        }
      }
      b.setAttribute("aria-pressed", notes?"true":"false");
      b.classList.toggle("on", notes); b.classList.toggle("gold", notes);
    }catch(e){}
  }

  function toggleNotes(e){
    if(e){ e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation(); }
    if(!hasNotes()) return;
    setOn(!on());
    resetZoom();
    paintBtnSafe();
    if(typeof paintLyrics==="function") paintLyrics();
    else if(on() && typeof window.bppPaintNotes505==="function") window.bppPaintNotes505();
    else if(!on() && typeof window.bppClearNotes505==="function") window.bppClearNotes505();
    paintBtnSafe();
  }

  function claimBtn(){
    var b=document.getElementById("bppNotes501");
    if(!b) return null;
    if(b.getAttribute("data-bpp-notes-click")==="507" && b._bpp507bound) return b;
    var nb=b.cloneNode(true);
    if(b.parentNode) b.parentNode.replaceChild(nb, b);
    b=nb;
    b.setAttribute("data-bpp-notes-click","507");
    b._bpp507bound=1;
    b.addEventListener("click", toggleNotes, true);
    return b;
  }

  /* ---- Zoom ---- */
  function frameEl(){
    /* Prefer Groß-Noten frame when visible */
    var fs=document.querySelector("#bppFs.on.bpp-notes-fs .bppNotesFrame503");
    if(fs) return fs;
    return document.querySelector("#lyrics .bppNotesFrame503");
  }
  function allFrames(){
    var out=[], seen={};
    function add(sel){
      document.querySelectorAll(sel).forEach(function(f){
        if(seen[f]) return; seen[f]=1; out.push(f);
      });
    }
    add("#bppFs.on.bpp-notes-fs .bppNotesFrame503");
    add("#lyrics .bppNotesFrame503");
    return out;
  }
  function imgEl(frame){ frame=frame||frameEl(); return frame?frame.querySelector("img"):null; }

  function applyZoom(){
    if(zScale<=1.001){ zScale=1; zTx=0; zTy=0; }
    var frames=allFrames();
    if(!frames.length){
      var one=frameEl(); if(one) frames=[one];
    }
    frames.forEach(function(frame){
      var img=imgEl(frame); if(!img) return;
      img.classList.add("bppNotesZoomImg507");
      img.style.transform="translate("+zTx+"px,"+zTy+"px) scale("+zScale+")";
      frame.classList.toggle("bpp-notes-zoomed", zScale>1.001);
      ensureZoomBar(frame);
    });
    paintZoomBtns();
  }
  function clampPan(){
    var frame=frameEl(); if(!frame) return;
    var r=frame.getBoundingClientRect();
    var maxX=(zScale-1)*r.width;
    var maxY=(zScale-1)*r.height;
    if(maxX<0) maxX=0; if(maxY<0) maxY=0;
    /* transform-origin 0 0: translate in [-(scale-1)*w, 0] roughly with contain image – soft clamp */
    zTx=Math.min(r.width*0.15, Math.max(-maxX-r.width*0.15, zTx));
    zTy=Math.min(r.height*0.15, Math.max(-maxY-r.height*0.15, zTy));
  }
  function resetZoom(){
    zScale=1; zTx=0; zTy=0; pinch=null; pan=null;
    applyZoom();
  }
  function zoomAt(cx, cy, next){
    var frame=frameEl(); if(!frame) return;
    var r=frame.getBoundingClientRect();
    var lx=cx-r.left, ly=cy-r.top;
    var prev=zScale;
    next=Math.max(MIN_Z, Math.min(MAX_Z, next));
    if(next<=1.001){ resetZoom(); return; }
    /* keep point under fingers: world = (local - t)/s */
    var wx=(lx-zTx)/prev, wy=(ly-zTy)/prev;
    zScale=next;
    zTx=lx-wx*zScale;
    zTy=ly-wy*zScale;
    clampPan();
    applyZoom();
  }

  function ensureZoomBar(frame){
    if(!frame) return;
    var bar=frame.querySelector(".bppNotesZoomBar507");
    if(bar) return bar;
    bar=document.createElement("div");
    bar.className="bppNotesZoomBar507"; bar.id="bppNotesZoomBar507";
    bar.innerHTML='<button type="button" data-z="in" aria-label="Zoom in" title="Zoom +">+</button>'+
      '<button type="button" data-z="out" aria-label="Zoom out" title="Zoom −">−</button>';
    frame.appendChild(bar);
    bar.addEventListener("click", function(e){
      e.preventDefault(); e.stopPropagation();
      var t=e.target.closest("button"); if(!t) return;
      var r=frame.getBoundingClientRect();
      var cx=r.left+r.width/2, cy=r.top+r.height/2;
      if(t.getAttribute("data-z")==="in") zoomAt(cx, cy, zScale*1.35);
      else zoomAt(cx, cy, zScale/1.35);
    });
    return bar;
  }
  function paintZoomBtns(){
    document.querySelectorAll(".bppNotesZoomBar507").forEach(function(bar){
      var inn=bar.querySelector('[data-z="in"]');
      var out=bar.querySelector('[data-z="out"]');
      if(inn){ inn.classList.toggle("gold", zScale<MAX_Z-0.01); inn.classList.toggle("on", zScale<MAX_Z-0.01); }
      if(out){ out.classList.toggle("gold", zScale>1.01); out.classList.toggle("on", zScale>1.01); }
    });
  }

  function dist(a,b){ var dx=a.clientX-b.clientX, dy=a.clientY-b.clientY; return Math.sqrt(dx*dx+dy*dy); }
  function mid(a,b){ return {x:(a.clientX+b.clientX)/2, y:(a.clientY+b.clientY)/2}; }

  function onTouchStart(e){
    var frame=frameEl(); if(!frame||!frame.contains(e.target) && e.target!==frame) return;
    if(e.touches.length===2){
      e.preventDefault(); if(e.stopPropagation) e.stopPropagation();
      pan=null;
      var d=dist(e.touches[0], e.touches[1]);
      var m=mid(e.touches[0], e.touches[1]);
      pinch={d0:Math.max(1,d), s0:zScale, cx:m.x, cy:m.y, tx0:zTx, ty0:zTy};
      return;
    }
    if(e.touches.length===1){
      var now=Date.now();
      var t=e.touches[0];
      if(now-lastTap<280 && Math.abs(t.clientX-lastTapX)<28 && Math.abs(t.clientY-lastTapY)<28){
        e.preventDefault(); if(e.stopPropagation) e.stopPropagation();
        lastTap=0;
        if(zScale>1.05) resetZoom();
        else zoomAt(t.clientX, t.clientY, DBL_Z);
        return;
      }
      lastTap=now; lastTapX=t.clientX; lastTapY=t.clientY;
      if(zScale>1.001){
        pan={x0:t.clientX, y0:t.clientY, tx0:zTx, ty0:zTy, id:t.identifier};
      }
    }
  }
  function onTouchMove(e){
    if(pinch && e.touches.length>=2){
      e.preventDefault(); if(e.stopPropagation) e.stopPropagation();
      var d=dist(e.touches[0], e.touches[1]);
      var m=mid(e.touches[0], e.touches[1]);
      var next=Math.max(MIN_Z, Math.min(MAX_Z, pinch.s0*(d/pinch.d0)));
      zoomAt(m.x, m.y, next);
      return;
    }
    if(pan && e.touches.length===1 && zScale>1.001){
      e.preventDefault(); if(e.stopPropagation) e.stopPropagation();
      var t=e.touches[0];
      zTx=pan.tx0+(t.clientX-pan.x0);
      zTy=pan.ty0+(t.clientY-pan.y0);
      clampPan();
      applyZoom();
    }
  }
  function onTouchEnd(e){
    if(e.touches.length<2) pinch=null;
    if(e.touches.length===0) pan=null;
    if(e.touches.length===1 && zScale>1.001){
      var t=e.touches[0];
      pan={x0:t.clientX, y0:t.clientY, tx0:zTx, ty0:zTy, id:t.identifier};
    }
  }

  function onWheel(e){
    var frame=frameEl(); if(!frame) return;
    if(!frame.contains(e.target) && e.target!==frame) return;
    if(!(e.ctrlKey||e.metaKey)) return;
    e.preventDefault();
    var factor=e.deltaY<0?1.12:1/1.12;
    zoomAt(e.clientX, e.clientY, zScale*factor);
  }

  function bindOneFrame(frame){
    if(!frame) return;
    if(frame._bpp507zoom) return;
    frame._bpp507zoom=1;
    frame.addEventListener("touchstart", onTouchStart, {passive:false});
    frame.addEventListener("touchmove", onTouchMove, {passive:false});
    frame.addEventListener("touchend", onTouchEnd, {passive:true});
    frame.addEventListener("touchcancel", onTouchEnd, {passive:true});
    frame.addEventListener("wheel", onWheel, {passive:false});
    ensureZoomBar(frame);
  }
  function bindFrame(){
    var frames=allFrames();
    if(!frames.length){ var one=frameEl(); if(one) frames=[one]; }
    frames.forEach(bindOneFrame);
    applyZoom();
  }

  function watchStanzaReset(){
    if(!on()||!hasNotes()){ lastCap=""; return; }
    var cap=document.querySelector("#bppFs.on.bpp-notes-fs .bppNotesCap503")||document.querySelector("#lyrics .bppNotesCap503");
    var txt=cap?String(cap.textContent||""):"";
    if(txt && lastCap && txt!==lastCap){ resetZoom(); }
    lastCap=txt;
  }

  function wrapPaint(){
    if(typeof paintLyrics!=="function" || paintLyrics._bpp507) return;
    var o=paintLyrics;
    window.paintLyrics=function(){
      claimBtn();
      var r=o.apply(this, arguments);
      try{
        claimBtn(); paintBtnSafe();
        if(on()&&hasNotes()){
          requestAnimationFrame(function(){ bindFrame(); watchStanzaReset(); });
        }else{
          resetZoom();
        }
      }catch(e){}
      return r;
    };
    window.paintLyrics._bpp507=1;
  }

  /* Prefer fine pointer = show zoom desk buttons on hover */
  try{
    if(window.matchMedia && window.matchMedia("(hover:hover) and (pointer:fine)").matches){
      document.body.classList.add("bpp-notes-zoomdesk");
    }
  }catch(e){}

  window.bppToggleNotes507=toggleNotes;
  window.bppResetNotesZoom507=resetZoom;
  window.bppBindNotesZoom507=bindFrame;
  window.bppNotesOn507=on;

  function boot(){
    wrapPaint();
    claimBtn();
    paintBtnSafe();
    if(on()&&hasNotes()){
      try{ if(typeof window.bppPaintNotes505==="function") window.bppPaintNotes505(); }catch(e){}
      setTimeout(bindFrame, 200);
    }
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(boot, 450); });
  else setTimeout(boot, 450);

  setInterval(function(){
    wrapPaint(); claimBtn(); paintBtnSafe();
    if(on()&&hasNotes()){ bindFrame(); watchStanzaReset(); }
  }, 600);
})();
