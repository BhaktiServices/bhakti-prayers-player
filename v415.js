/* [Grok.com] V4.16: Krishna Suprabhatam Prabhujis aus Dropbox (56 kbit/s).
   Ramanuja Mangalam Rec: Mtj aus YouTube 2ZKvr7GZej8 ab 2:25:10 (bis 2:27:56). */
window.BPP_BUILD="4.16"; window.BPP_SHOW="4.16";
(function(){
  if(window.bppV415) return; window.bppV415=1;
  var LABELS={"de":["Rec: Pbj","Rec: Mtj"],"en":["Rec: Pbj","Rec: Mtj"],"fr":["Rec: Pbj","Rec: Mtj"],"es":["Rec: Pbj","Rec: Mtj"],"ru":["Rec: Pbj","Rec: Mtj"],"hi":["Rec: Pbj","Rec: Mtj"],"pt":["Rec: Pbj","Rec: Mtj"]};
  function lg(){ return (typeof lang!=="undefined"&&LABELS[lang])?lang:"en"; }
  var SUPRA_F="audio/suprabhatam-prabhus.mp3", SUPRA_YT="cvc8K05QqVU";
  var MANG_YT="2ZKvr7GZej8", MANG_S=8710;
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
    var base={audio:P.audio, youtube:P.youtube, youtubeStart:P.youtubeStart||0, preferFile:P.preferFile};
    Object.defineProperty(P,"audio",{configurable:true,enumerable:true,get:function(){ return onM()?"":base.audio; },set:function(v){ base.audio=v; }});
    Object.defineProperty(P,"youtube",{configurable:true,enumerable:true,get:function(){ return onM()?MANG_YT:base.youtube; },set:function(v){ base.youtube=v; }});
    Object.defineProperty(P,"youtubeStart",{configurable:true,enumerable:true,get:function(){ return onM()?MANG_S:base.youtubeStart; },set:function(v){ base.youtubeStart=v; }});
    Object.defineProperty(P,"preferFile",{configurable:true,enumerable:true,get:function(){ return onM()?false:base.preferFile; },set:function(v){ base.preferFile=v; }});
  }
  function onS(){ try{ return localStorage.getItem("bpp-prabhus-suprabhatam")==="prabhus"; }catch(e){ return false; } }
  function onM(){ try{ return localStorage.getItem("bpp-mtj-ramanuja")==="mtj"; }catch(e){ return false; } }
  function cur(){ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function paint(){
    var p=cur(), b=document.getElementById("bppRec415"), t=document.getElementById("lyrTitle");
    if(!p||(p.id!=="suprabhatam"&&p.id!=="ramanuja")){ if(b) b.style.display="none"; return; }
    if(!t) return;
    if(!b){ b=document.createElement("button"); b.type="button"; b.id="bppRec415"; b.style.cssText="margin-left:.5em;background:none;border:1px solid #6b5338;color:#e0b45a;border-radius:8px;padding:0 .4em;font-size:.75em;line-height:1.5;cursor:pointer;vertical-align:middle";
      b.addEventListener("click",function(e){ e.stopPropagation(); sw(); }); }
    var sh=document.getElementById("bppShare");
    if(sh && sh.parentNode===t) t.insertBefore(b,sh); else t.appendChild(b);
    b.style.display="";
    var o=(p.id==="suprabhatam")?onS():onM(), lab=LABELS[lg()][o?1:0];
    var tip=o?"Aufnahme Matajis":"Aufnahme Prabhujis";
    if(b.textContent!==lab){ b.textContent=lab; b.title=tip; b.setAttribute("aria-label",tip); }
    b.classList.toggle("on",o); b.setAttribute("aria-pressed",o?"true":"false");
  }
  function sw(){
    var p=cur(); if(!p) return;
    var key=(p.id==="suprabhatam")?"bpp-prabhus-suprabhatam":"bpp-mtj-ramanuja";
    var val=(p.id==="suprabhatam")?(onS()?"alt":"prabhus"):(onM()?"alt":"mtj");
    try{ localStorage.setItem(key,val); }catch(e){}
    var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(e){}
    try{ putSong(p.id,{line:0,time:0}); }catch(e){} try{ play(PRAYERS.indexOf(p),false,was); }catch(e){}
    paint();
  }
  addSupra(); addMang(); setInterval(function(){ addSupra(); addMang(); paint(); },300);
  window.addEventListener("load",function(){ addSupra(); addMang(); paint(); });
})();
/* <audio src="audio/suprabhatam-prabhus.mp3"> */
