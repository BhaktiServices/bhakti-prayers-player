/* [Grok.com] V4.16: Rec-Button hinter Titel, vor Teilen. Hover: Aufnahme Prabhujis / Matajis.
   Krishna Supra Prabhujis: audio/suprabhatam-prabhus.mp3. Ramanuja: audio/ramanuja-prabhus.mp3 (3:35). */
window.BPP_BUILD="4.17"; window.BPP_SHOW="4.17";
(function(){
  if(window.bppV415) return; window.bppV415=1;
  var TIPS={"de":["Aufnahme Prabhujis","Aufnahme Matajis"],"en":["Recording Prabhujis","Recording Matajis"],"fr":["Enregistrement Prabhujis","Enregistrement Matajis"],"es":["Grabación Prabhujis","Grabación Matajis"],"ru":["Запись Прабхуджис","Запись Матаджис"],"hi":["प्रभुजीस रिकॉर्डिंग","माताजीस रिकॉर्डिंग"],"pt":["Gravação Prabhujis","Gravação Matajis"]};
  function place(){
    var t=document.getElementById("lyrTitle"); if(!t) return;
    var sh=document.getElementById("bppShare");
    var ids=["bppRec387","bppRec388","bppRec405","bppRec408","bppRec415"];
    ids.forEach(function(id){
      var b=document.getElementById(id); if(!b||b.style.display==="none") return;
      var lg=(typeof lang!=="undefined"&&TIPS[lang])?lang:"en"; var o=b.getAttribute("aria-pressed")==="true";
      b.style.cssText="margin-left:.4em;font-size:.7rem;padding:1px 5px;min-height:22px;vertical-align:middle;border-radius:5px;"+
        (o?"background:#3a5a3a;border:1px solid #5a8a5a;color:#c8e6c8":"background:#4a372b;border:1px solid #6b5340;color:var(--text)");
      b.classList.remove("on");
      var tip=TIPS[lg][o?1:0];
      b.title=tip; b.setAttribute("aria-label",tip);
      if(sh&&sh.parentNode===t){ if(b.nextSibling!==sh) t.insertBefore(b,sh); }
      else if(b.parentNode!==t) t.appendChild(b);
    });
  }
  setInterval(place,200);
  /* Supra + Ramanuja audio switch */
  var SUPRA_F="audio/suprabhatam-prabhus.mp3", SUPRA_YT="cvc8K05QqVU";
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
