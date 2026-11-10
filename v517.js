/* [Grok-Bot] V5.17: Groß-Fit rechnet die Akkordzeile der ersten Verszeile ein
   (k361 steht position:absolute; top:-.95em und ragte in V5.16 in die Kopfzeile
   oder wurde von overflow:hidden angeschnitten). Mindestabstand 12 px unter
   Titel/Noten/✕. Hochkant: text-wrap:balance, eine Verszeile höchstens zwei
   ausgewogene Zeilen; Akkorde bleiben über der Silbe (v365/v250). critical=false. */
window.BPP_BUILD="5.17"; window.BPP_SHOW="5.17";
(function(){
  if(window.bppV517) return; window.bppV517=1;
  var GAP=12;
  var css=document.createElement("style");
  css.setAttribute("data-v","517e");
  css.textContent=
    /* Platz für die erste Akkordzeile innerhalb der Box, damit overflow:hidden sie nicht abschneidet. */
    "#bppFs.on:not(.bpp-notes-fs) #bppFsBox:has(.k361),"+
    "#bppFs.on:not(.bpp-notes-fs) #bppFsBox:has(> .fch),"+
    "#bppFs.on:not(.bpp-notes-fs) #bppFsBox:has(.bppFsC2Head .fch){"+
      "padding-top:1.2em;box-sizing:border-box"+
    "}"+
    "#bppFs.on:not(.bpp-notes-fs) #bppFsBox:not(.bppFsC2) .vl:not(.fch){"+
      "white-space:normal!important;overflow-wrap:break-word;word-break:normal;"+
      "text-wrap:balance;-webkit-text-wrap:balance"+
    "}";
  function mount(){
    if(css.parentNode) css.parentNode.removeChild(css);
    document.head.appendChild(css);
  }
  mount();
  setInterval(mount, 4000);

  function applySize(B,size){
    B.style.fontSize=size.toFixed(1)+"px";
    var i, el, fchs=B.querySelectorAll(".fch"), ftrs=B.querySelectorAll(".ftr");
    for(i=0;i<ftrs.length;i++) ftrs[i].style.fontSize=Math.max(13, size*0.38).toFixed(1)+"px";
    for(i=0;i<fchs.length;i++){ el=fchs[i]; if(!el.classList.contains("h361")) el.style.fontSize=Math.max(12, size*0.42).toFixed(1)+"px"; }
  }
  function headerLimit(){
    var limit=0;
    var top=document.getElementById("bppFsTop");
    if(top){
      var tr=top.getBoundingClientRect();
      if(tr.height>=8) limit=tr.bottom+GAP;
    }
    var S=document.getElementById("bppFsStage");
    if(S){
      var sr=S.getBoundingClientRect();
      if(sr.height>=8) limit=Math.max(limit, sr.top+GAP);
    }
    return limit;
  }
  function topmostContent(B){
    var top=Infinity, nodes=B.querySelectorAll(".k361,.fch:not(.h361),.vl:not(.h361),.ftr"), i, r;
    for(i=0;i<nodes.length;i++){
      r=nodes[i].getBoundingClientRect();
      if(r.height<1 && r.width<1) continue;
      if(r.top<top) top=r.top;
    }
    if(!isFinite(top)){
      r=B.getBoundingClientRect();
      top=r.top;
    }
    return top;
  }
  function chordHitsHeader(B){
    var lim=headerLimit();
    if(!(lim>0)) return false;
    return topmostContent(B)<lim-0.5;
  }
  function visualLines(el){
    /* Nicht el.getClientRects(): ein Block hat oft nur ein Rechteck.
       .s361 allein reicht nicht, wenn nur die erste Silbe einen Akkord hat.
       k361 (absolut) nicht mitzählen. */
    var last=-9999, n=0;
    function add(r){
      if(!r || r.height<2 || r.width<2) return;
      if(Math.abs(r.top-last)>4){ n++; last=r.top; }
    }
    function walk(node){
      var i, child, range, rects;
      if(!node) return;
      if(node.nodeType===3){
        if(!String(node.textContent||"").trim()) return;
        try{
          range=document.createRange();
          range.selectNodeContents(node);
          rects=range.getClientRects();
          for(i=0;i<rects.length;i++) add(rects[i]);
        }catch(e){}
        return;
      }
      if(node.nodeType!==1) return;
      if(node.classList && (node.classList.contains("k361")||node.classList.contains("h361"))) return;
      if(node.classList && node.classList.contains("s361")){
        add(node.getBoundingClientRect());
        /* Text in s361 zählt über dessen Box; Kinder nicht noch einmal */
        return;
      }
      for(child=node.firstChild; child; child=child.nextSibling) walk(child);
    }
    walk(el);
    return n||1;
  }
  function tooManyWraps(B){
    if(B.classList.contains("bppFsC2") && !B.classList.contains("bpp-fs-wrap")) return false;
    var nodes=B.querySelectorAll(".vl:not(.fch):not(.h361)"), i;
    for(i=0;i<nodes.length;i++){
      if(visualLines(nodes[i])>2) return true;
    }
    return false;
  }
  function bottomLimit(S){
    var limit=S.getBoundingClientRect().bottom-2;
    var bar=document.getElementById("bppFsBar");
    if(bar && !bar.classList.contains("hid")){
      var cs=getComputedStyle(bar);
      if(cs.display!=="none" && cs.visibility!=="hidden" && parseFloat(cs.opacity||"1")>=0.2){
        var br=bar.getBoundingClientRect();
        if(br.height>=8) limit=Math.min(limit, br.top-8);
      }
    }
    return limit;
  }
  function overflowsBottom(B,S){
    var limit=bottomLimit(S), nodes=B.querySelectorAll(".vl:not(.h361),.ftr,.fch:not(.h361),.k361"), i, r;
    if(B.scrollHeight>S.clientHeight+4) return true;
    if(B.getBoundingClientRect().bottom>limit) return true;
    for(i=0;i<nodes.length;i++){
      r=nodes[i].getBoundingClientRect();
      if(r.height<1) continue;
      if(r.bottom>limit) return true;
    }
    return false;
  }
  function fix517(){
    var B=document.getElementById("bppFsBox");
    var S=document.getElementById("bppFsStage");
    var fs=document.getElementById("bppFs");
    if(!B||!S||!fs||!fs.classList.contains("on")||fs.classList.contains("bpp-notes-fs")) return;
    if(window.bppFsFitLocked519 && B.classList.contains("bppFsC2")) return; /* V5.19: ein Fit-Owner */
    var size=parseFloat(B.style.fontSize)||parseFloat(getComputedStyle(B).fontSize)||20;
    var g=0;
    while((chordHitsHeader(B) || tooManyWraps(B) || overflowsBottom(B,S)) && size>14 && g++<36){
      size-=1; applySize(B,size);
    }
  }
  window.bppFsAllowGrow=function(B,S,next){
    if(!B||!S) return true;
    if(chordHitsHeader(B)) return false;
    if(tooManyWraps(B)) return false;
    if(overflowsBottom(B,S)) return false;
    return true;
  };
  function schedule(){
    try{ fix517(); }catch(e){}
    setTimeout(fix517, 40);
    setTimeout(fix517, 180);
    setTimeout(fix517, 450);
    setTimeout(fix517, 800);
  }
  setInterval(fix517, 400);
  window.addEventListener("resize", schedule);
  window.addEventListener("orientationchange", schedule);
  document.addEventListener("fullscreenchange", function(){ setTimeout(schedule, 50); });
  function hook(){
    var B=document.getElementById("bppFsBox");
    if(!B||B.__v517mo) return;
    B.__v517mo=1;
    try{ new MutationObserver(function(){ setTimeout(fix517, 30); }).observe(B,{childList:true,subtree:true}); }catch(e){}
  }
  hook();
  setInterval(hook, 1000);
})();
