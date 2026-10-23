/* [Grok-Bot] V3.97: Gross am Handy quer auch ohne screen.orientation.lock (z.B. DuckDuckGo/WebView auf Android, iPhone).
   Ist 0,9 s nach dem Tipp auf "Groß" die Ansicht noch hochkant (lock fehlt oder wurde abgelehnt), wird #bppFs per CSS um 90 Grad gedreht
   (Breite = 100vh, Hoehe = 100vw). Haelt man das Handy wirklich quer: keine CSS-Drehung. Beim Verlassen von Gross zurueckgesetzt.
   Mit funktionierendem lock() (Chrome) ist die Ansicht dann schon quer -> keine Aenderung. */
window.BPP_BUILD="3.97"; window.BPP_SHOW="3.97";
(function(){
  if(window.bppV397) return; window.bppV397=1;
  var coarse=window.matchMedia("(pointer:coarse)"), R="rot397", want=false;
  function phone(){ return coarse.matches && Math.min(screen.width||9999, screen.height||9999)<=600; }
  /* Gedreht wird ein innerer Rahmen (#bppRot397), nicht #bppFs selbst: das Vollbild-Element erzwingt transform:none. */
  var st=document.createElement("style");
  st.textContent="#bppRot397{position:absolute;top:0;left:0;width:100vh;height:100vw;overflow:hidden;transform-origin:top left;transform:rotate(90deg) translateY(-100%)}"+
    "html."+R+",html."+R+" body{overflow:hidden!important}";
  document.head.appendChild(st);
  function on(){ var S=window.bppFsState&&window.bppFsState(); return !!(S&&S.on); }
  function portrait(){ return window.innerHeight>window.innerWidth; }
  function set(x){ var h=document.documentElement, ov=document.getElementById("bppFs"); if(!ov) return;
    var w=document.getElementById("bppRot397");
    if(x){ if(!w){ w=document.createElement("div"); w.id="bppRot397"; ov.appendChild(w); }
      var moved=false; [].slice.call(ov.childNodes).forEach(function(n){ if(n!==w){ w.appendChild(n); moved=true; } });
      if(!h.classList.contains(R)||moved){ h.classList.add(R); setTimeout(function(){ dispatchEvent(new Event("resize")); },30); } }
    else if(w||h.classList.contains(R)){ if(w){ while(w.firstChild) ov.insertBefore(w.firstChild,w); w.remove(); } h.classList.remove(R);
      setTimeout(function(){ dispatchEvent(new Event("resize")); },30); } }
  function sync(){ if(!on()){ want=false; set(false); return; } set(want&&portrait()); }
  document.addEventListener("click",function(e){ if(!(e.target&&e.target.closest&&e.target.closest("#btnFs"))||!phone()) return;
    setTimeout(function(){ if(on()&&portrait()){ want=true; sync(); } },900); },true);
  addEventListener("resize",function(){ setTimeout(sync,80); }); setInterval(sync,400);
})();
