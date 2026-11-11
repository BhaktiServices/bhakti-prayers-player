/* [Grok-Bot] V5.23: Groß-Mitlesen – beim Strophenwechsel keine Rückblende der alten Strophe.
   Ursache (schon in V4.91): v195 schiebt die nächste Strophe während der letzten Zeile hoch;
   endet die Phase (Hold 0,8 s), ruft frame() reset() auf, obwohl #bppFsBox noch den alten Text
   hat – die alte Strophe springt voll in die Mitte, die Vorschau verschwindet. Anschließend
   startet v187 eine zweite Slide-Animation (Geist der alten Strophe bei translateY(0)).
   Fix: Vorschau stehen lassen, bis die Box den neuen Text hat, dann nur die v195-Naht;
   v187 bleibt in diesem Fall aus (ein Owner). Layout/Fit unverändert. critical=true. */
window.BPP_BUILD="5.23"; window.BPP_SHOW="5.23";
(function(){
  if(window.bppV523) return; window.bppV523=1;

  function killV187Ghosts(){
    try{
      var st=document.getElementById("bppFsStage"); if(!st) return;
      Array.prototype.forEach.call(st.querySelectorAll(".bppGhost:not(.bppG195)"), function(n){
        try{
          var pv=window.bppPreviewInfo&&window.bppPreviewInfo();
          if(pv && (pv.on || (typeof pv.e==="number" && pv.e>0.2))){
            if(n.parentNode) n.parentNode.removeChild(n);
          }
        }catch(e){}
      });
    }catch(e){}
  }
  function hook(){
    var st=document.getElementById("bppFsStage"); if(!st||st.__bpp523g) return;
    st.__bpp523g=1;
    try{ new MutationObserver(killV187Ghosts).observe(st,{childList:true}); }catch(e){}
  }
  hook();
  setInterval(hook, 800);
})();
