/* [Grok-Bot] V5.24: Groß-Mitlesen bleibt auch mit altem Cache ohne Rückblende.
   V5.23 war im Live-Code identisch zur Preview, aber index lud follow.js?v=515 (nicht
   erhöht). Service Worker holt JS ohne cache:no-store; HTTP-Cache (Pages max-age=600)
   und der App-Cache konnten die alte follow.js behalten, die v195.js?v=515 lädt.
   Dann läuft das ungeflickte reset() wieder, obwohl die Leiste V5.23 zeigt; v523.js
   kommt nicht in die Closure von v195. Dieser Patch macht die Naht unabhängig von
   einer frischen v195: sobald die Vorschau steht und reset() die alte Strophe voll
   in die Mitte holt, wird der Endstand der Vorschau wiederhergestellt, bis die neue
   Strophe im Kasten ist. Außerdem follow.js?v=524 und SW-Fetch ohne HTTP-Cache.
   critical=true. */
window.BPP_BUILD="5.24"; window.BPP_SHOW="5.24";
(function(){
  if(window.bppV524) return; window.bppV524=1;

  function norm(s){ return String(s||"").replace(/\s+/g," ").trim(); }
  function shiftPx(tr){
    var m=String(tr||"").match(/-?\d+(?:\.\d+)?/g), n=0, i;
    if(!m) return 0;
    for(i=0;i<m.length;i++){ var a=Math.abs(+m[i]); if(a>n) n=a; }
    return n;
  }
  var saved=null;

  function tick(){
    requestAnimationFrame(tick);
    try{
      var ov=document.getElementById("bppFs");
      var box=document.getElementById("bppFsBox");
      var nx=document.getElementById("bppNx195");
      if(!ov || !ov.classList.contains("on") || !box || !nx){ saved=null; return; }
      var tr=box.style.translate||box.style.transform||"";
      var nxVis=nx.style.visibility||"";
      var nxOp=parseFloat(nx.style.opacity);
      if(!isFinite(nxOp)) nxOp=0;
      var boxTxt=norm(box.textContent), nxTxt=norm(nx.textContent);
      var sh=shiftPx(tr);
      if(sh>20 && nxOp>0.2 && nxVis!=="hidden" && nxTxt && nxTxt!==boxTxt){
        saved={tr:box.style.translate||"", nxOp:String(nx.style.opacity), nxVis:nx.style.visibility||"visible", nxTf:nx.style.transform||"", boxTxt:boxTxt, nxTxt:nxTxt, at:Date.now()};
        return;
      }
      if(saved && boxTxt===saved.nxTxt){ saved=null; return; }
      if(saved && (Date.now()-saved.at)<2500 && boxTxt===saved.boxTxt && boxTxt!==saved.nxTxt){
        if(sh<12 && (nxVis==="hidden" || nxOp<0.08)){
          box.style.translate=saved.tr;
          nx.style.visibility=saved.nxVis||"visible";
          nx.style.opacity=saved.nxOp;
          if(saved.nxTf) nx.style.transform=saved.nxTf;
          try{
            var st=document.getElementById("bppFsStage");
            if(st){
              Array.prototype.forEach.call(st.querySelectorAll(".bppGhost:not(.bppG195)"), function(n){
                if(n.parentNode) n.parentNode.removeChild(n);
              });
            }
            if(box.getAnimations) box.getAnimations().forEach(function(a){ try{ a.cancel(); }catch(e){} });
          }catch(e){}
        }
      }
    }catch(e){}
  }
  requestAnimationFrame(tick);

  /* Wenn die Box auf den neuen Text wechselt, v187-Neustart (von unten) abbrechen */
  function hookBox(){
    var box=document.getElementById("bppFsBox");
    if(!box || box.__bpp524) return;
    box.__bpp524=1;
    try{
      new MutationObserver(function(){
        try{
          if(!saved) return;
          var box=document.getElementById("bppFsBox"); if(!box) return;
          if(norm(box.textContent)!==saved.nxTxt) return;
          if(box.getAnimations) box.getAnimations().forEach(function(a){ try{ a.cancel(); }catch(e){} });
          box.style.transform=""; box.style.translate=""; box.style.opacity="";
          var st=document.getElementById("bppFsStage");
          if(st){
            Array.prototype.forEach.call(st.querySelectorAll(".bppGhost:not(.bppG195)"), function(n){
              if(n.parentNode) n.parentNode.removeChild(n);
            });
          }
          saved=null;
        }catch(e){}
      }).observe(box,{childList:true,subtree:true,characterData:true});
    }catch(e){}
  }
  hookBox();
  setInterval(hookBox, 800);
})();
