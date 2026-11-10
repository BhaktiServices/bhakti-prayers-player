/* [Grok-Bot] V4.91: Letzte Position merken (Prayer, Rec, Zeit; Sprache/Ansicht schon via bpp-*) in bpp-mem;
   gedrosselt (timeupdate ≤5 s + pause/visibilitychange/pagehide). Start-Besitzer mit vorhandener Logik:
   ?p= (v315/v420) > bpp-mem Resume > Erststart-Default (index first-run → guru-stotram).
   Autoplay nur wenn Browser erlaubt, sonst bereit an Position. critical=false. */
window.BPP_BUILD="4.91"; window.BPP_SHOW="4.91";
(function(){
  if(window.bppV491mem) return; window.bppV491mem=1;
  var RECS={"guru-stotram":1,"ashtotram":1,"ashtotram-abend":1,"govinda":1,"kavacham":1,"suprabhatam":1,"hanuman":1};
  var freezePersist=false, boot=null;
  try{ boot=JSON.parse(window.bppBootMem||localStorage.getItem("bpp-mem")||"{}")||{}; }catch(e){ boot={}; }

  function ls(k,v){ try{ if(v===undefined) return localStorage.getItem(k); localStorage.setItem(k,v); }catch(e){ return null; } }
  function recOf(id){
    if(ls("bpp-spn-"+id)==="spn") return "spn";
    if(RECS[id]) return ls(id==="guru-stotram"?"bpp-gs-rec":"bpp-prabhus-"+id)==="prabhus"?"pbj":"mtj";
    return "";
  }
  window.bppRecOf491=recOf;

  function applyRec(id, rec){
    if(!rec||!id) return;
    rec=String(rec).toLowerCase();
    if(rec==="spn"){ ls("bpp-spn-"+id,"spn"); return; }
    ls("bpp-spn-"+id,"alt");
    if(!RECS[id]) return;
    var key=id==="guru-stotram"?"bpp-gs-rec":"bpp-prabhus-"+id;
    ls(key, rec==="pbj"?"prabhus":(id==="guru-stotram"?"frau":"alt"));
  }

  /* Guard: while restoring, do not let pause/timeupdate overwrite saved time with 0 */
  if(typeof window.putSong==="function" && !window.putSong._bpp491){
    var _ps=window.putSong;
    window.putSong=function(id, patch){
      if(freezePersist && patch && typeof patch.time==="number" && patch.time<1){
        try{
          var st=(boot&&boot.songs&&boot.songs[id])||{};
          if(+st.time>=3){ patch=Object.assign({}, patch, {time:+st.time}); }
        }catch(e){}
      }
      return _ps.call(this, id, patch);
    };
    window.putSong._bpp491=1;
  }
  if(typeof window.persistNow==="function" && !window.persistNow._bpp491){
    var _pn=window.persistNow;
    window.persistNow=function(){
      if(freezePersist) return;
      return _pn.apply(this, arguments);
    };
    window.persistNow._bpp491=1;
  }

  function softAutoplay(){
    try{
      if(typeof ytOn!=="undefined"&&ytOn) return;
      var A=document.getElementById("a"); if(!A||!A.src) return;
      if(!A.paused) return;
      var p=A.play();
      if(p&&p.then) p.then(function(){ try{ syncPlayBtn(); }catch(e){} }).catch(function(){ try{ A.pause(); syncPlayBtn(); }catch(e){} });
    }catch(e){}
  }

  function ensureAudioAt(id, t){
    try{
      if(window.bppResumeOnce504 || window.bppResumeOnce) return;
      var A=document.getElementById("a"); if(!A) return;
      var P=(typeof PRAYERS!=="undefined")?PRAYERS.find(function(p){ return p.id===id; }):null;
      if(!P||!P.audio) return;
      if(!A.src || A.getAttribute("data-prayer")!==id){
        try{
          if(typeof ytOn!=="undefined") ytOn=false;
          A.style.display="block";
          A.src=P.audio;
          A.setAttribute("data-prayer", id);
          A.preload="auto";
          A.load();
        }catch(e){}
      }
      function seek(){
        if(!(t>=3)) return;
        if(window.bppResumeOnce504 || window.bppResumeOnce) return;
        try{
          if(isFinite(A.duration) && t>=A.duration-4) return;
          if(Math.abs((A.currentTime||0)-t)>0.75) A.currentTime=t;
          try{
            if(!(window.bppResumeOnce504 || window.bppResumeOnce)) pendingSeek=t;
          }catch(e){}
          /* nach erstem erfolgreichen Seek: Flag – keine weiteren Mem-Seeks */
          if(Math.abs((A.currentTime||0)-t)<=1.5){
            window.bppResumeOnce504=1; window.bppResumeOnce=1;
            try{ pendingSeek=0; }catch(e){}
          }
        }catch(e){}
      }
      if(A.readyState>=1 && isFinite(A.duration)) seek();
      else A.addEventListener("loadedmetadata", function once(){ A.removeEventListener("loadedmetadata", once); seek(); try{ A.pause(); }catch(e){} }, {once:true});
      try{ A.pause(); }catch(e){}
    }catch(e){}
  }

  function rewriteMemTime(id, t){
    try{
      var m=JSON.parse(ls("bpp-mem")||"{}")||{};
      if(!m.songs) m.songs={};
      var s=m.songs[id]||{};
      s.time=t; s.at=Date.now();
      m.songs[id]=s; m.lastId=id;
      ls("bpp-mem", JSON.stringify(m));
    }catch(e){}
  }

  function restoreFromMem(){
    if(window.bppStartOwner==="url") return;
    if(/[?&]p=/.test(location.search||"")){ window.bppStartOwner="url"; return; }
    var m=boot&&boot.lastId?boot:null;
    if(!m){ try{ m=JSON.parse(ls("bpp-mem")||"{}")||{}; }catch(e){ m={}; } }
    var id=m.lastId; if(!id||typeof PRAYERS==="undefined") return;
    var st=(m.songs&&m.songs[id])||{};
    var t=+st.time||0;
    freezePersist=true;
    if(st.rec) applyRec(id, st.rec);
    if(st.lang && typeof setLang==="function" && typeof lang!=="undefined" && lang!==st.lang){ try{ setLang(st.lang); }catch(e){} }
    if(st.chMode && typeof chMode!=="undefined" && chMode!==st.chMode){
      try{ var n=0; while(chMode!==st.chMode && n++<3) toggleCh(); }catch(e){}
    }
    /* V5.13: play() nicht ein zweites Mal – resumeLast() hat das Prayer schon gesetzt.
       Ein erneutes play() leert a.src, lädt neu und springt zur Resume-Zeit zurück. */
    if(window.bppStartOwner==="mem" && typeof i==="number"&&i>=0&&PRAYERS[i]&&PRAYERS[i].id===id){
      /* schon ausgewählt */
    }else if(typeof i==="undefined"||i<0||!PRAYERS[i]||PRAYERS[i].id!==id){
      var idx=PRAYERS.findIndex(function(p){ return p.id===id; });
      if(idx>=0 && typeof play==="function") play(idx, true, false);
    }
    if(t>=3){
      try{ pendingSeek=t; }catch(e){}
      ensureAudioAt(id, t);
      rewriteMemTime(id, t); /* undo accidental 0 writes during load */
    }
    setTimeout(function(){ if(!(window.bppResumeOnce504||window.bppResumeOnce)) ensureAudioAt(id, t); }, 400);
    setTimeout(function(){ if(!(window.bppResumeOnce504||window.bppResumeOnce)) ensureAudioAt(id, t); softAutoplay(); }, 1200);
    setTimeout(function(){
      /* Kein erneutes Seek auf Boot-Zeit – nur Persist-Freeze lösen + Autoplay */
      freezePersist=false;
      softAutoplay();
      try{ if(typeof syncPlayBtn==="function") syncPlayBtn(); }catch(e){}
      try{ if(t>=3) pendingSeek=0; }catch(e){}
    }, 2800);
    window.bppStartOwner=window.bppStartOwner||"mem";
  }

  try{
    var A0=document.getElementById("a");
    if(A0){
      var _ls=0;
      A0.addEventListener("timeupdate", function(){
        if(freezePersist) return;
        var now=Date.now(); if(now-_ls<5000) return; _ls=now;
        try{ if(typeof persistNow==="function") persistNow(); }catch(e){}
      });
    }
  }catch(e){}

  function bootRun(){ try{ restoreFromMem(); }catch(e){ freezePersist=false; } }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(bootRun, 500); });
  else setTimeout(bootRun, 500);
  window.bppResume491=restoreFromMem;
})();
