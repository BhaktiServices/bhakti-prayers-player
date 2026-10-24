/* [Grok.com] V4.16: Rec-Button hinter Titel, vor Teilen. Hover: Aufnahme Prabhujis / Matajis.
   Krishna Supra Prabhujis: audio/suprabhatam-prabhus.mp3. Ramanuja: audio/ramanuja-prabhus.mp3 (3:35). */
window.BPP_BUILD="4.17"; window.BPP_SHOW="4.17";
(function(){
  if(window.bppV415) return; window.bppV415=1;
  var TIPS={"de":["Aufnahme Prabhujis","Aufnahme Matajis"],"en":["Recording Prabhujis","Recording Matajis"],"fr":["Enregistrement Prabhujis","Enregistrement Matajis"],"es":["Grabación Prabhujis","Grabación Matajis"],"ru":["Запись Прабхуджис","Запись Матаджис"],"hi":["प्रभुजीस रिकॉर्डिंग","माताजीस रिकॉर्डिंग"],"pt":["Gravação Prabhujis","Gravação Matajis"]};
  var st=document.createElement("style");
  st.textContent="#bppRec387,#bppRec388,#bppRec405,#bppRec408,#bppRec415{margin-left:.4em;font-size:.7rem;padding:1px 5px;min-height:22px;vertical-align:middle;border-radius:5px;background:#6a3a5a;border:1px solid #9a5a7a;color:#f0d0e0}"+
    "#bppRec387.pbj,#bppRec388.pbj,#bppRec405.pbj,#bppRec408.pbj,#bppRec415.pbj{background:#3a4a6a;border:1px solid #5a6a9a;color:#d0d8f0}";
  document.head.appendChild(st);
  function ensureSupraBtn(){
    var b=document.getElementById("bppRec415"); if(b) return;
    var p=cur(); if(!p||p.id!=="suprabhatam") return;
    var now=document.getElementById("now"); if(!now) return;
    b=document.createElement("button"); b.type="button"; b.id="bppRec415";
    b.addEventListener("click",function(e){ e.stopPropagation(); swSupra(); });
    now.parentNode.insertBefore(b,now.nextSibling);
  }
  function swSupra(){
    var o=onS(); try{ localStorage.setItem("bpp-prabhus-suprabhatam",o?"alt":"prabhus"); }catch(e){}
    var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(e){}
    try{ putSong("suprabhatam",{line:0,time:0}); }catch(e){}
    var p=cur(); if(p) try{ play(PRAYERS.indexOf(p),true,was); }catch(e){}
  }
  function place(){
    ensureSupraBtn();
    var t=document.getElementById("lyrTitle"); if(!t) return;
    var sh=document.getElementById("bppShare");
    var ids=["bppRec387","bppRec388","bppRec405","bppRec408","bppRec415"];
    ids.forEach(function(id){
      var b=document.getElementById(id); if(!b) return;
      var p=cur(); if(!p) return;
      var show=(id==="bppRec387"&&p.id==="guru-stotram")||(id==="bppRec405"&&p.id==="ashtotram")||(id==="bppRec408"&&(p.id==="govinda"||p.id==="kavacham"))||(id==="bppRec415"&&p.id==="suprabhatam");
      if(!show){ b.style.display="none"; return; }
      b.style.display="";
      var lg=(typeof lang!=="undefined"&&TIPS[lang])?lang:"en"; var o=(id==="bppRec415")?onS():b.getAttribute("aria-pressed")==="true"; if(id==="bppRec415") b.setAttribute("aria-pressed",o?"true":"false");
      var cur=o?"Rec: Pbj":"Rec: Mtj";
      if(b.textContent!==cur) b.textContent=cur;
      b.classList.toggle("pbj",o); b.classList.remove("on");
      var tip=TIPS[lg][o?1:0];
      b.title=tip; b.setAttribute("aria-label",tip);
      if(sh&&sh.parentNode===t){ if(b.nextSibling!==sh) t.insertBefore(b,sh); }
      else if(b.parentNode!==t) t.appendChild(b);
    });
  }
  setInterval(place,200);
  /* Supra + Ramanuja audio switch */
  var SUPRA_F="audio/suprabhatam-ra.mp3", SUPRA_YT="cvc8K05QqVU";
  var MANG_F="audio/ramanuja-prabhus.mp3";
  function addSupra(){
    if(typeof PRAYERS==="undefined") return;
    var P=PRAYERS.find(function(p){ return p.id==="suprabhatam"; }); if(!P||P.__v415) return; P.__v415=1;
    var base={audio:P.audio, youtube:P.youtube, youtubeStart:P.youtubeStart||0, preferFile:P.preferFile, audioAlt:P.audioAlt};
    Object.defineProperty(P,"audio",{configurable:true,enumerable:true,get:function(){ return onS()?SUPRA_F:base.audio; },set:function(v){ base.audio=v; }});
    Object.defineProperty(P,"audioAlt",{configurable:true,enumerable:true,get:function(){ return onS()?["https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/"+SUPRA_F]:base.audioAlt; },set:function(v){ base.audioAlt=v; }});
    Object.defineProperty(P,"youtube",{configurable:true,enumerable:true,get:function(){ return onS()?SUPRA_YT:base.youtube; },set:function(v){ base.youtube=v; }});
    Object.defineProperty(P,"youtubeStart",{configurable:true,enumerable:true,get:function(){ return onS()?0:base.youtubeStart; },set:function(v){ base.youtubeStart=v; }});
    Object.defineProperty(P,"preferFile",{configurable:true,enumerable:true,get:function(){ return onS()?true:base.preferFile; },set:function(v){ base.preferFile=v; }});
  }
  function addMang(){
    if(typeof PRAYERS==="undefined") return;
    var P=PRAYERS.find(function(p){ return p.id==="ramanuja"; }); if(!P||P.__v415m) return; P.__v415m=1;
    var base={audio:P.audio, youtube:P.youtube, preferFile:P.preferFile, audioAlt:P.audioAlt};
    Object.defineProperty(P,"audio",{configurable:true,enumerable:true,get:function(){ return MANG_F; },set:function(v){ base.audio=v; }});
    Object.defineProperty(P,"audioAlt",{configurable:true,enumerable:true,get:function(){ return ["https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/"+MANG_F]; },set:function(v){ base.audioAlt=v; }});
    Object.defineProperty(P,"preferFile",{configurable:true,enumerable:true,get:function(){ return true; },set:function(v){ base.preferFile=v; }});
  }
  function onS(){ try{ return localStorage.getItem("bpp-prabhus-suprabhatam")==="prabhus"; }catch(e){ return false; } }
  addSupra(); addMang(); setInterval(function(){ addSupra(); addMang(); },300);
  window.addEventListener("load",function(){ addSupra(); addMang(); });
})();
/* <audio src="audio/suprabhatam-prabhus.mp3"> */
/* <audio src="audio/ramanuja-prabhus.mp3"> */
