/* [Grok-Bot] V5.04: Resume-Seek nur EINMAL pro Seitenstart.
   Ursache: pendingSeek blieb / wurde von v491mem erneut gesetzt; v477 ließ Seeks auf das
   Boot-Ziel zu, solange currentTime < resumeTarget+2 – Media-Session-seekto / ensureAudioAt
   zogen daher alle ~1 s zurück (Endlosschleife). Fix: Flag bppResumeOnce504; nach erstem
   erfolgreichen Resume jeden Seek zurück zum Boot-Ziel verwerfen; pendingSeek leeren;
   v491mem/v362-Nachzieher stoppen. Ein Besitzer. critical=true. */
window.BPP_BUILD="5.04"; window.BPP_SHOW="5.04";
(function(){
  if(window.bppV504) return; window.bppV504=1;

  var resumeTarget=0, applied=false, blocked=0, t0=Date.now();
  try{
    var m=JSON.parse(window.bppBootMem||localStorage.getItem("bpp-mem")||"{}")||{};
    var id=m.lastId;
    var st=(m.songs&&id&&m.songs[id])||{};
    resumeTarget=+st.time||0;
  }catch(e){}
  if(!(resumeTarget>=3)) resumeTarget=0;

  function audioEl(){
    try{ if(typeof a!=="undefined"&&a) return a; }catch(e){}
    return document.getElementById("a");
  }
  function near(x,y,d){ return isFinite(x)&&isFinite(y)&&Math.abs(x-y)<=(d==null?1.5:d); }

  function markApplied(){
    if(applied) return;
    applied=true;
    window.bppResumeOnce504=1;
    window.bppResumeOnce=1;
    try{ if(typeof pendingSeek==="number"&&pendingSeek>=3) pendingSeek=0; }catch(e){}
    try{ if(window.bppV477Api&&typeof window.bppV477Api.mark==="function") window.bppV477Api.mark(); }catch(e){}
  }

  /* Nach Apply: Seek zurück zum Boot-Ziel verwerfen, sobald Playback auch nur leicht weiter ist */
  function isStaleResumeSeek(to, from){
    if(!applied || !(resumeTarget>=3)) return false;
    if(!isFinite(to)) return false;
    var cur=isFinite(from)?from:0;
    if(cur < resumeTarget+0.25) return false; /* noch am Ziel / Settling */
    if(!near(to, resumeTarget, 1.6)) return false;
    if(!(to < cur-0.2)) return false;
    return true;
  }

  function maybeClearPending(el){
    try{
      if(typeof pendingSeek==="number"&&pendingSeek>=3){
        if(el&&isFinite(el.duration)&&near(el.currentTime, pendingSeek, 1.5)){
          if(!(resumeTarget>=3)) resumeTarget=pendingSeek;
          markApplied();
        }
      }else if(!applied&&resumeTarget>=3&&el&&near(el.currentTime, resumeTarget, 1.5)){
        markApplied();
      }
    }catch(e){}
  }

  function hookAudio(){
    var el=audioEl();
    if(!el||el.__bpp504) return;
    el.__bpp504=1;

    el.addEventListener("seeked", function(){ maybeClearPending(el); });
    el.addEventListener("playing", function(){ maybeClearPending(el); });
    el.addEventListener("loadedmetadata", function(){
      setTimeout(function(){ maybeClearPending(el); },0);
      setTimeout(function(){ maybeClearPending(el); },150);
    });

    var desc=Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype,"currentTime");
    if(!desc||!desc.get||!desc.set) return;
    Object.defineProperty(el,"currentTime",{
      configurable:true,
      enumerable:desc.enumerable,
      get:function(){ return desc.get.call(this); },
      set:function(v){
        v=+v;
        var cur=0;
        try{ cur=desc.get.call(this); }catch(e){}
        if(isStaleResumeSeek(v, cur)){
          blocked++;
          window.bppV504Blocked=blocked;
          return cur;
        }
        var r=desc.set.call(this,v);
        if(!applied){
          if(resumeTarget>=3&&near(v,resumeTarget,1.5)){
            setTimeout(function(){ maybeClearPending(el); },0);
          }else if(!(resumeTarget>=3)&&v>=3&&typeof pendingSeek==="number"&&near(v,pendingSeek,1.5)){
            resumeTarget=pendingSeek;
            setTimeout(function(){ maybeClearPending(el); },0);
          }
        }else{
          /* Nach Apply pendingSeek nie wieder „frisch“ halten */
          try{ if(typeof pendingSeek==="number"&&pendingSeek>=3&&near(pendingSeek,resumeTarget,1.6)) pendingSeek=0; }catch(e){}
        }
        return r;
      }
    });
  }

  function wrapSeekto(){
    try{
      if(!window.bppMS468||!window.bppMS468.handlers) return;
      var h=window.bppMS468.handlers;
      if(!h.seekto||h.seekto.__bpp504) return;
      var prev=h.seekto;
      var wrapped=function(d){
        if(d&&typeof d.seekTime==="number"){
          var el=audioEl();
          var cur=el?el.currentTime:0;
          if(isStaleResumeSeek(d.seekTime, cur)){
            blocked++;
            window.bppV504Blocked=blocked;
            return;
          }
        }
        return prev.apply(this, arguments);
      };
      wrapped.__bpp504=1;
      h.seekto=wrapped;
      try{ navigator.mediaSession.setActionHandler("seekto", wrapped); }catch(e){}
    }catch(e){}
  }

  /* v491mem: wiederholte ensureAudioAt-Seeks nach erstem Apply unterbinden */
  function patchMem(){
    try{
      if(window.bppResume491 && !window.bppResume491.__bpp504){
        var orig=window.bppResume491;
        window.bppResume491=function(){
          if(applied||window.bppResumeOnce504) return;
          return orig.apply(this, arguments);
        };
        window.bppResume491.__bpp504=1;
      }
    }catch(e){}
  }

  /* pendingSeek nach Apply dauerhaft leeren (v491mem setzt ihn sonst erneut) */
  function guardPending(){
    try{
      if(applied && typeof pendingSeek==="number" && pendingSeek>=3){
        if(!(resumeTarget>=3) || near(pendingSeek, resumeTarget, 2)) pendingSeek=0;
      }
    }catch(e){}
  }

  function tick(){
    hookAudio();
    wrapSeekto();
    patchMem();
    guardPending();
    var el=audioEl();
    if(el) maybeClearPending(el);
    /* Spätestens nach 6 s als erledigt werten, wenn Playback läuft */
    if(!applied && Date.now()-t0>6000){
      try{
        var el2=audioEl();
        if(el2 && el2.currentTime>=2) markApplied();
        else if(Date.now()-t0>15000) markApplied();
      }catch(e){}
    }
  }

  hookAudio();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ hookAudio(); tick(); });
  window.addEventListener("load", function(){ hookAudio(); tick(); });
  setTimeout(tick, 100);
  setTimeout(tick, 500);
  setTimeout(tick, 1200);
  setTimeout(tick, 2500);
  setTimeout(tick, 5000);
  setInterval(tick, 800);

  window.bppV504Api={
    target:function(){ return resumeTarget; },
    applied:function(){ return applied; },
    blocked:function(){ return blocked; },
    mark:markApplied
  };
})();
