/* [Grok.com] V4.16: Krishna Suprabhatam Prabhujis aus Dropbox SriKrishnaSuprabhatam01.mp3,
   komprimiert auf 56 kbit/s mono (Hochpass 80 Hz, -16 LUFS) als audio/suprabhatam-prabhus.mp3.
   YouTube cvc8K05QqVU bleibt Ersatz. */
window.BPP_BUILD="4.16"; window.BPP_SHOW="4.16";
(function(){
  if(window.bppV415) return; window.bppV415=1;
  var LABELS={"de":["Rec: Pbj","Rec: Mtj"],"en":["Rec: Pbj","Rec: Mtj"],"fr":["Rec: Pbj","Rec: Mtj"],"es":["Rec: Pbj","Rec: Mtj"],"ru":["Rec: Pbj","Rec: Mtj"],"hi":["Rec: Pbj","Rec: Mtj"],"pt":["Rec: Pbj","Rec: Mtj"]};
  function lg(){ return (typeof lang!=="undefined"&&LABELS[lang])?lang:"en"; }
  var YT="cvc8K05QqVU", F="audio/suprabhatam-prabhus.mp3";
  function addSupra(){
    if(typeof PRAYERS==="undefined") return;
    var P=PRAYERS.find(function(p){ return p.id==="suprabhatam"; }); if(!P||P.__v415) return; P.__v415=1;
    var base={audio:P.audio, youtube:P.youtube, youtubeStart:P.youtubeStart||0, preferFile:P.preferFile};
    Object.defineProperty(P,"audio",{configurable:true,enumerable:true,get:function(){ return on()?F:base.audio; },set:function(v){ base.audio=v; }});
    Object.defineProperty(P,"audioAlt",{configurable:true,enumerable:true,get:function(){ return on()?["https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/"+F]:base.audioAlt; },set:function(v){ base.audioAlt=v; }});
    Object.defineProperty(P,"youtube",{configurable:true,enumerable:true,get:function(){ return on()?YT:base.youtube; },set:function(v){ base.youtube=v; }});
    Object.defineProperty(P,"youtubeStart",{configurable:true,enumerable:true,get:function(){ return on()?0:base.youtubeStart; },set:function(v){ base.youtubeStart=v; }});
    Object.defineProperty(P,"preferFile",{configurable:true,enumerable:true,get:function(){ return on()?true:base.preferFile; },set:function(v){ base.preferFile=v; }});
  }
  function on(){ try{ return localStorage.getItem("bpp-prabhus-suprabhatam")==="prabhus"; }catch(e){ return false; } }
  function cur(){ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function paintSupra(){
    var p=cur(), b=document.getElementById("bppRec415");
    if(!p||p.id!=="suprabhatam"){ if(b) b.style.display="none"; return; }
    if(!b){ var now=document.getElementById("now"); if(!now) return;
      b=document.createElement("button"); b.type="button"; b.id="bppRec415"; b.style.cssText="margin:4px 0 6px;font-size:.85rem;padding:4px 10px";
      b.addEventListener("click",function(e){ e.stopPropagation(); sw(); }); now.parentNode.insertBefore(b,now.nextSibling); }
    b.style.display="";
    var o=on(), t=LABELS[lg()][o?1:0];
    if(b.textContent!==t){ b.textContent=t; b.title=t; b.setAttribute("aria-label",t); }
    b.classList.toggle("on",o); b.setAttribute("aria-pressed",o?"true":"false");
  }
  function sw(){
    try{ localStorage.setItem("bpp-prabhus-suprabhatam",on()?"alt":"prabhus"); }catch(e){}
    var p=cur(); if(!p) return;
    var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(e){}
    try{ putSong(p.id,{line:0,time:0}); }catch(e){} try{ play(PRAYERS.indexOf(p),false,was); }catch(e){}
    paintSupra();
  }
  addSupra(); setInterval(function(){ addSupra(); paintSupra(); },300);
  window.addEventListener("load",function(){ addSupra(); paintSupra(); });
})();
/* <audio src="audio/suprabhatam-prabhus.mp3"> */
