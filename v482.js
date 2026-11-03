/* [Grok-Bot] V4.82: (1) sync/vaishnava-mtj.json – Strophenwechsel ab Str. 1 um +0,75 s.
   (2) Vaiṣṇava Mantra: Mtj-Aufnahme (audio/vaishnava-mantra-mtj.mp3) ersetzt die Heft-/Pbj-Version
   als einzige Aufnahme; Rec-Mtj/Pbj-Taste entfernen, localStorage-Wahl löschen.
   Lyrics unverändert (nichts erfunden). Sync aus JSON (?v=482). critical=false. */
window.BPP_BUILD="4.82"; window.BPP_SHOW="4.82";
(function(){
  if(window.bppV482) return; window.bppV482=1;
  var st=document.createElement("style");
  st.id="bppV482css";
  st.textContent="#bppRec480{display:none!important;visibility:hidden!important;pointer-events:none!important;width:0!important;height:0!important;overflow:hidden!important;position:absolute!important;left:-9999px!important;opacity:0!important;margin:0!important;padding:0!important;border:0!important}";
  (document.head||document.documentElement).appendChild(st);

  var ID="vaishnava-mantra", K="bpp-prabhus-"+ID;
  var MTJ_F="audio/vaishnava-mantra-mtj.mp3";
  var MTJ_YT="qJodjtIyxM4", MTJ_YT_S=1059;
  var URL_SYNC="sync/vaishnava-mtj.json?v=482";
  /* Fallback = JSON nach +0,75 ab Str.1 */
  var MTJ_SEQ=[[0.5,0],[7.65,1],[11.45,2],[18.05,3],[25.25,4],[32.05,5]];
  try{ localStorage.removeItem(K); }catch(e){}

  function marksFromSeq(seq){
    var m=[]; (seq||[]).forEach(function(e){ if(e&&typeof e[0]==="number"&&typeof e[1]==="number"&&m[e[1]]==null) m[e[1]]=e[0]; });
    return m;
  }
  function seqNow(){ return (window.BPP_VAISH_MTJ_SEQ&&window.BPP_VAISH_MTJ_SEQ.length)?window.BPP_VAISH_MTJ_SEQ:MTJ_SEQ; }

  function loadSync(){
    try{
      fetch(URL_SYNC,{cache:"no-store"}).then(function(r){ return r.ok?r.json():null; }).then(function(j){
        if(!j||!j.length) return;
        var s=[]; j.forEach(function(e){ var t=+e.start, v=+e.verse; if(isFinite(t)&&isFinite(v)) s.push([t,v|0]); });
        s.sort(function(a,b){ return a[0]-b[0]; });
        if(s.length){ MTJ_SEQ=s; window.BPP_VAISH_MTJ_SEQ=s; }
      }).catch(function(){});
    }catch(e){}
  }
  loadSync();

  var hooked=null;
  function applyProps(P){
    if(!P) return;
    function force(){
      Object.defineProperty(P,"audio",{configurable:true,enumerable:true,get:function(){ return MTJ_F; },set:function(){}});
      Object.defineProperty(P,"audioAlt",{configurable:true,enumerable:true,get:function(){
        return ["https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/"+MTJ_F];
      },set:function(){}});
      Object.defineProperty(P,"preferFile",{configurable:true,enumerable:true,get:function(){ return true; },set:function(){}});
      Object.defineProperty(P,"seqFile",{configurable:true,enumerable:true,get:function(){ return seqNow().map(function(e){return e.slice();}); },set:function(){}});
      Object.defineProperty(P,"marksFile",{configurable:true,enumerable:true,get:function(){
        this._bppEstMarks=0; this._bppEstSrc="";
        return marksFromSeq(seqNow());
      },set:function(){}});
      Object.defineProperty(P,"youtube",{configurable:true,enumerable:true,get:function(){ return MTJ_YT; },set:function(){}});
      Object.defineProperty(P,"youtubeStart",{configurable:true,enumerable:true,get:function(){ return MTJ_YT_S; },set:function(){}});
      Object.defineProperty(P,"seqYt",{configurable:true,enumerable:true,get:function(){
        return seqNow().map(function(e){ return [Math.round((e[0]+MTJ_YT_S)*10)/10, e[1]]; });
      },set:function(){}});
      Object.defineProperty(P,"marksYt",{configurable:true,enumerable:true,get:function(){ return marksFromSeq(this.seqYt); },set:function(){}});
      Object.defineProperty(P,"quelle",{configurable:true,enumerable:true,get:function(){
        return "SPN Daily Livestream · YouTube qJodjtIyxM4 · 17:39–18:22 (Mtj, einzige Aufnahme)";
      },set:function(){}});
      Object.defineProperty(P,"hinweis",{configurable:true,enumerable:true,get:function(){
        return "Einzige Aufnahme: Mtj (Livestream). Sync ab Str. 1 um +0,75 s (V4.82). Pbj-Auswahl entfernt.";
      },set:function(){}});
      hooked=P;
    }
    if(hooked!==P) force(); else {
      /* Re-assert if v480 redefined later */
      try{ if(P.audio!==MTJ_F) force(); }catch(e){ force(); }
    }
  }

  function killRec(){
    try{ localStorage.removeItem(K); }catch(e){}
    var b=document.getElementById("bppRec480");
    if(b){
      try{ b.onclick=null; b.ontouchstart=null; }catch(e){}
      try{ b.replaceWith(b.cloneNode(false)); b=document.getElementById("bppRec480"); }catch(e){}
      b=document.getElementById("bppRec480");
      if(b){ try{ b.remove(); }catch(e){ try{ b.style.cssText="display:none!important"; b.hidden=true; b.setAttribute("aria-hidden","true"); }catch(x){} } }
    }
    /* v480 placeBtn no-op: Marker am Title */
    try{
      var t=document.getElementById("lyrTitle");
      if(t && !t._bpp482obs){
        t._bpp482obs=1;
        var mo=new MutationObserver(function(){
          var x=document.getElementById("bppRec480");
          if(x){ try{ x.remove(); }catch(e){ x.style.display="none"; x.hidden=true; } }
        });
        mo.observe(t,{childList:true,subtree:true});
      }
    }catch(e){}
  }

  function tick(){
    if(typeof PRAYERS==="undefined") return;
    var P=PRAYERS.find(function(p){ return p.id===ID; });
    if(P) applyProps(P);
    killRec();
  }
  tick();
  setInterval(tick, 350);
  document.addEventListener("DOMContentLoaded", tick);

  window.bppVaish482=function(){
    var P=PRAYERS&&PRAYERS.find(function(p){return p.id===ID;});
    return {audio:P&&P.audio, mtjOnly:true, seq:(P&&P.seqFile)||null, recBtn:!!document.getElementById("bppRec480")};
  };
})();
/* <audio src="audio/vaishnava-mantra-mtj.mp3"> */
