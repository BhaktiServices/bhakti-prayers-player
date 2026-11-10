/* [Grok-Bot] V5.16: Groß-Akkorde je Zeile (Owner bleibt v250) und echte 2 Spalten.
   Ursache der gesammelten Akkordzeile in den 5.15-Shots: ?p= setzt per v315 Akkorde auf
   „über der Strophe“ (akk), nicht „je Zeile“. v250 teilt nur bei chMode===zeile.
   Ursache der falschen 1-Spalten-Darstellung bei goldenem Spalten-Knopf: v515 setzte
   #bppFsBox{display:inline-block!important} und schlug v511 display:grid!important
   (höhere Spezifität). Grid gilt nur, solange .bppFsC2L existiert, sonst misst v183
   den Fit in einem leeren 2-Spalten-Grid und die Schrift bleibt winzig.
   Hochkant (V5.15-Fehler): bei bpp-fs-cols=2 oder Rest nach Querformat stapelten
   .bppFsC2L/.bppFsC2R untereinander — zwei 2-Zeilen-Blöcke, nicht mittig, springend.
   V5.16: Hochkant immer 1 Spalte, genau eine Strophe, vertikal mittig; keine
   Seiten-Teilung. Quer: nach dem Drehen sofort neu einpassen, sonst bleibt die
   Hochkant-Schrift und overflow:hidden + flex-center schneidet alle Lyrics ab.
   critical=false. */
window.BPP_BUILD="5.16"; window.BPP_SHOW="5.16";
(function(){
  if(window.bppV516) return; window.bppV516=1;
  var css=document.createElement("style");
  css.setAttribute("data-v","516c");
  css.textContent=
    "#bppFs.on:not(.bpp-notes-fs) #bppFsBox:not(.bppFsC2),"+
    "#bppFs.on:not(.bpp-notes-fs) #bppFsBox.bppFsC2:not(:has(.bppFsC2L)){"+
      "display:inline-block!important;overflow:hidden"+
    "}"+
    "#bppFs.on:not(.bpp-notes-fs) #bppFsBox.bppFsC2:has(.bppFsC2L),"+
    "html body #bppFs.on:not(.bpp-notes-fs) #bppFsBox.bppFsC2:has(.bppFsC2L){"+
      "display:grid!important;"+
      "grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;"+
      "column-gap:28px;align-items:start;width:100%!important;max-width:100%!important;"+
      "box-sizing:border-box;justify-items:stretch;overflow:hidden"+
    "}"+
    "#bppFs.on:not(.bpp-notes-fs) #bppFsBox:not(.bppFsC2) .vl:not(.fch){"+
      "white-space:normal!important;overflow-wrap:break-word;word-break:normal"+
    "}";
  function mount(){
    if(css.parentNode) css.parentNode.removeChild(css);
    document.head.appendChild(css);
  }
  mount();
  setInterval(mount, 4000);
  /* Vor v183-Fit auf resize: leere Grid-Klasse entfernen, damit availWH/fit 1-spaltig misst. */
  window.addEventListener("resize", function(){
    var B=document.getElementById("bppFsBox");
    if(B && B.classList.contains("bppFsC2") && !B.querySelector(".bppFsC2L")){
      B.classList.remove("bppFsC2");
    }
  }, true);

  function applySize(B,size){
    B.style.fontSize=size.toFixed(1)+"px";
    var i, el, fchs=B.querySelectorAll(".fch"), ftrs=B.querySelectorAll(".ftr");
    for(i=0;i<ftrs.length;i++) ftrs[i].style.fontSize=Math.max(13, size*0.38).toFixed(1)+"px";
    for(i=0;i<fchs.length;i++){ el=fchs[i]; if(!el.classList.contains("h361")) el.style.fontSize=Math.max(12, size*0.42).toFixed(1)+"px"; }
  }
  function horizOverflow(B){
    if(B.scrollWidth>B.clientWidth+8) return true;
    var nodes=B.querySelectorAll(".vl:not(.fch)"), i, el;
    for(i=0;i<nodes.length;i++){
      el=nodes[i];
      if(el.classList.contains("h361")) continue;
      if(el.scrollWidth>el.clientWidth+1) return true;
    }
    return false;
  }
  function boxOverflowsStage(B,S){
    var br=B.getBoundingClientRect(), sr=S.getBoundingClientRect();
    if(br.top<sr.top-2 || br.bottom>sr.bottom+2) return true;
    var nodes=B.querySelectorAll(".vl:not(.h361),.ftr,.bppFsC2Foot"), i, r;
    for(i=0;i<nodes.length;i++){
      r=nodes[i].getBoundingClientRect();
      if(r.height<2) continue;
      if(r.bottom>sr.bottom+2 || r.top<sr.top-2) return true;
    }
    return false;
  }
  function fixFsSize(){
    var B=document.getElementById("bppFsBox");
    var S=document.getElementById("bppFsStage");
    var fs=document.getElementById("bppFs");
    if(!B||!S||!fs||!fs.classList.contains("on")||fs.classList.contains("bpp-notes-fs")) return;
    if(window.bppFsFitLocked519 && B.classList.contains("bppFsC2")) return; /* V5.19: ein Fit-Owner */
    var size=parseFloat(B.style.fontSize)||parseFloat(getComputedStyle(B).fontSize)||20;
    var g=0;
    /* Zuerst schrumpfen: nach dem Drehen bleibt sonst die Hochkant-Schrift und
       die zentrierte, zu hohe Box wird von overflow:hidden vollständig abgeschnitten. */
    while((B.scrollHeight>S.clientHeight-4 || boxOverflowsStage(B,S)) && size>14 && g++<32){
      size-=1; applySize(B,size);
    }
    var wrapping=B.classList.contains("bpp-fs-wrap") || !B.classList.contains("bppFsC2");
    if(!wrapping && horizOverflow(B)) return;
    g=0;
    while(B.scrollHeight<=S.clientHeight-16 && !boxOverflowsStage(B,S) && size<80 && g++<40){
      if(typeof window.bppFsAllowGrow==="function"){
        try{ if(!window.bppFsAllowGrow(B,S,size+1)) break; }catch(e){}
      }
      size+=1; applySize(B,size);
      if(B.scrollHeight>S.clientHeight-8 || boxOverflowsStage(B,S) || (!wrapping && horizOverflow(B)) ||
         (typeof window.bppFsAllowGrow==="function" && !window.bppFsAllowGrow(B,S,size))){
        size-=1; applySize(B,size); break;
      }
    }
  }
  function scheduleFix(){
    try{ fixFsSize(); }catch(e){}
    setTimeout(fixFsSize, 50);
    setTimeout(fixFsSize, 200);
    setTimeout(fixFsSize, 450);
    setTimeout(fixFsSize, 800);
  }
  function refit183(){
    try{ window.dispatchEvent(new Event("resize")); }catch(e){}
  }
  /* v183 cached den Erst-Fit oft noch mit nowrap oder während requestFullscreen:
     Schrift bleibt ~18 px trotz freier Höhe. Nach dem Setzen der Wrap-CSS
     den Cache leeren (resize) und neu messen. */
  var lastBust="";
  function maybeBustSmallFit(){
    var B=document.getElementById("bppFsBox");
    var S=document.getElementById("bppFsStage");
    var fs=document.getElementById("bppFs");
    if(!B||!S||!fs||!fs.classList.contains("on")||fs.classList.contains("bpp-notes-fs")) return;
    if(B.classList.contains("bppFsC2")) return;
    var size=parseFloat(B.style.fontSize)||0;
    if(!(size>0 && size<22 && S.clientHeight>300 && B.scrollHeight<=S.clientHeight-80)) return;
    var st=""; try{ var t=document.getElementById("bppFsT2"); st=t?t.textContent||"":""; }catch(e){}
    var key=st+"|"+S.clientWidth+"x"+S.clientHeight+"|"+size;
    if(key===lastBust) return;
    lastBust=key;
    refit183();
  }
  function onFsReady(){
    lastBust="";
    setTimeout(refit183, 80);
    setTimeout(refit183, 280);
    setTimeout(refit183, 600);
    setTimeout(fixFsSize, 120);
    setTimeout(fixFsSize, 350);
    setTimeout(fixFsSize, 700);
  }
  setInterval(function(){ fixFsSize(); maybeBustSmallFit(); }, 500);
  window.addEventListener("resize", scheduleFix);
  window.addEventListener("orientationchange", function(){
    lastBust="";
    try{ if(typeof window.bppFsApplyCols==="function") window.bppFsApplyCols(); }catch(e){}
    scheduleFix();
    setTimeout(refit183, 100);
    setTimeout(refit183, 350);
  });
  document.addEventListener("fullscreenchange", function(){ setTimeout(onFsReady, 50); });
  try{
    var fsEl=document.getElementById("bppFs");
    function hookFsOn(){
      var fs=document.getElementById("bppFs");
      if(!fs||fs.__v516on) return;
      fs.__v516on=1;
      try{
        var wasOn=fs.classList.contains("on");
        new MutationObserver(function(){
          var isOn=fs.classList.contains("on");
          if(isOn && !wasOn) onFsReady();
          wasOn=isOn;
        }).observe(fs,{attributes:true,attributeFilter:["class"]});
      }catch(e){}
      if(fs.classList.contains("on")) onFsReady();
    }
    hookFsOn();
    setInterval(hookFsOn, 1000);
  }catch(e){}
  try{
    var Bmo=document.getElementById("bppFsBox");
    function hookMo(){
      var B=document.getElementById("bppFsBox");
      if(!B||B.__v516mo) return;
      B.__v516mo=1;
      try{ new MutationObserver(function(){ setTimeout(fixFsSize, 30); }).observe(B,{childList:true,subtree:false}); }catch(e){}
    }
    hookMo();
    setInterval(hookMo, 1000);
  }catch(e){}
})();
