/* [Grok.com] V4.17: Rec-Button hinter Titel. Krishna Supra Rec: Pbj = audio/suprabhatam-ra.mp3. */
window.BPP_BUILD="4.18"; window.BPP_SHOW="4.18";
(function(){
  if(window.bppV415) return; window.bppV415=1;
  var TIPS={"de":["Aufnahme Prabhujis","Aufnahme Matajis"],"en":["Recording Prabhujis","Recording Matajis"],"fr":["Enregistrement Prabhujis","Enregistrement Matajis"],"es":["Grabación Prabhujis","Grabación Matajis"],"ru":["Запись Прабхуджис","Запись Матаджис"],"hi":["प्रभुजीस रिकॉर्डिंग","माताजीस रिकॉर्डिंग"],"pt":["Gravação Prabhujis","Gravação Matajis"]};
  var st=document.createElement("style");
  st.textContent=".bppRec{margin-left:.4em;font-size:.7rem;padding:1px 5px;min-height:22px;vertical-align:middle;border-radius:5px;background:#6a3a5a;border:1px solid #9a5a7a;color:#f0d0e0;cursor:pointer}"+
    ".bppRec.pbj{background:#3a4a6a;border:1px solid #5a6a9a;color:#d0d8f0}";
  document.head.appendChild(st);
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
  function cur(){ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function lg(){ return (typeof lang!=="undefined"&&TIPS[lang])?lang:"en"; }
  function place(){
    var t=document.getElementById("lyrTitle"); if(!t) return;
    var p=cur(); if(!p) return;
    var sh=document.getElementById("bppShare");
    var map={"guru-stotram":"bppRec387","ashtotram":"bppRec405","govinda":"bppRec408","kavacham":"bppRec408","suprabhatam":"bppRec415"};
    var id=map[p.id]; if(!id) return;
    var b=document.getElementById(id);
    if(!b){ b=document.createElement("button"); b.type="button"; b.id=id; b.className="bppRec";
      b.addEventListener("click",function(e){ e.stopPropagation(); 
        if(id==="bppRec415"){ var o=onS(); try{ localStorage.setItem("bpp-prabhus-suprabhatam",o?"alt":"prabhus"); }catch(e){} }
        else if(typeof window["sw"+id.slice(6)]==="function") window["sw"+id.slice(6)]();
        var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(e){}
        try{ putSong(p.id,{line:0,time:0}); }catch(e){} try{ play(PRAYERS.indexOf(p),true,was); }catch(e){}
      }); }
    var o=(id==="bppRec415")?onS():b.getAttribute("aria-pressed")==="true";
    b.textContent=o?"Rec: Pbj":"Rec: Mtj";
    b.classList.toggle("pbj",o);
    b.title=TIPS[lg()][o?0:1];
    b.style.display="";
    if(sh&&sh.parentNode===t) t.insertBefore(b,sh); else if(b.parentNode!==t) t.appendChild(b);
    /* andere Buttons nicht verstecken */
  }
  addSupra(); addMang(); setInterval(function(){ addSupra(); addMang(); place(); },300);
  window.addEventListener("load",function(){ addSupra(); addMang(); place(); });
})();
/* <audio src="audio/suprabhatam-ra.mp3"> */
/* <audio src="audio/ramanuja-prabhus.mp3"> */
