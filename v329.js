/* [Grok-Bot] V3.29: Manuelles Blaettern (Wischen, Mausrad, Pfeil-/Bildtasten aus V3.07) springt sofort ohne Soft-Scroll,
   in Standardansicht (v250-Gleiten) und Grossansicht (Ghost-/Gleit-Animation).
   Automatisches Mitscrollen beim Abspielen bleibt weich. */
window.BPP_BUILD="3.29"; window.BPP_SHOW="3.29";
(function(){
  function mark(){ window.bppManualAt=Date.now(); }
  function killFs(){
    var f=document.getElementById("bppFs"); if(!f) return;
    Array.prototype.forEach.call(f.querySelectorAll(".bppGhost"), function(n){ if(n.parentNode) n.parentNode.removeChild(n); });
    try{ f.getAnimations({subtree:true}).forEach(function(a){ try{ a.finish(); }catch(e){ try{ a.cancel(); }catch(e2){} } }); }catch(e){}
    var box=document.getElementById("bppFsBox"); if(box){ box.style.transform=""; box.style.opacity=""; box.style.translate=""; }
  }
  function wrap(name){
    var f=window[name]; if(typeof f!=="function" || f._v329) return;
    var w=function(){
      mark();
      var r=f.apply(this, arguments);
      if(name==="bppFsStep" || name==="bppStanzaStep"){ killFs(); requestAnimationFrame(killFs); setTimeout(killFs,0); }
      return r;
    }; w._v329=1; window[name]=w;
  }
  function hook(){ wrap("bppStanzaStep"); wrap("bppFsStep"); }
  hook(); setInterval(hook,400);
})();
