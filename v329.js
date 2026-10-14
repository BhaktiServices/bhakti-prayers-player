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
/* [Grok-Bot] V3.29: Guru Arati ausgeblendet (nicht geloescht): aus PRAYERS herausgenommen -> fehlt in Weitere, Alle, Vor/Zurueck und Offline-Liste.
   Daten bleiben in listview.js; Objekt liegt in window.BPP_HIDDEN_PRAYERS. Zum Wiedereinblenden die Zeile HIDE leeren. */
(function(){
  var HIDE=["guru-arati"];
  function run(){
    if(typeof PRAYERS==="undefined") return false;
    var ch=false; window.BPP_HIDDEN_PRAYERS=window.BPP_HIDDEN_PRAYERS||{};
    for(var n=PRAYERS.length-1;n>=0;n--){
      var p=PRAYERS[n]; if(HIDE.indexOf(p.id)<0) continue;
      if(typeof i!=="undefined" && i===n) continue; /* gerade offen: nicht unter den Fuessen wegziehen */
      window.BPP_HIDDEN_PRAYERS[p.id]=p; PRAYERS.splice(n,1); ch=true;
      try{ if(typeof i!=="undefined" && i>n) i--; }catch(e){}
    }
    if(ch){ try{ if(typeof window.paintList==="function") window.paintList(); else if(typeof paintList==="function") paintList(); }catch(e){} }
    return ch;
  }
  run(); setTimeout(run,600); setInterval(run,2000);
})();
