/* [Grok-Bot] V3.97: Gross am Handy quer auch ohne screen.orientation.lock (z.B. DuckDuckGo/WebView auf Android, iPhone).
   Ist 0,9 s nach dem Tipp auf "Groß" die Ansicht noch hochkant (lock fehlt oder wurde abgelehnt), wird #bppFs per CSS um 90 Grad gedreht
   (Breite = 100vh, Hoehe = 100vw). Haelt man das Handy wirklich quer: keine CSS-Drehung. Beim Verlassen von Gross zurueckgesetzt.
   Mit funktionierendem lock() (Chrome) ist die Ansicht dann schon quer -> keine Aenderung. */
// build via v398
(function(){
  if(window.bppV397) return; window.bppV397=1;
  var coarse=window.matchMedia("(pointer:coarse)"), R="rot397";
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
  /* [Grok-Bot] V4.11: Drehen in Gross (S21/DuckDuckGo). Ursache: die CSS-Drehung (Erst-Ansicht, V4.01) endete nur, wenn sich der Viewport aenderte.
     Ist am Handy die Auto-Drehung aus bzw. dreht der Browser (WebView) im Vollbild nicht mit, aendert sich der Viewport nie -> Ansicht blieb
     fest (quer gedreht oder hochkant). Neu: keine erzwungene Erst-Drehung. Massgeblich ist die echte Lage:
     - Viewport quer (Browser dreht mit) -> Querformat, keine CSS-Drehung.
     - Viewport hochkant: Lagesensor (devicemotion, Schwerkraft) entscheidet; Handy seitlich (>= 1 s stabil, damit ein mitdrehender Browser zuerst dran ist) -> CSS-Drehung 90 Grad passend
       zur Seite (links/rechts), Handy aufrecht -> Hochformat. Ohne Sensordaten: Hochformat.
     Neu bewertet bei resize, visualViewport-resize, matchMedia(orientation), orientationchange, screen.orientation change und alle 400 ms. */
  var sens=null, cand=null, since=0, seenAt=0;
  function onM(e){ var g=e.accelerationIncludingGravity; if(!g||g.x==null||g.y==null) return; var x=g.x, y=g.y, ax=Math.abs(x), ay=Math.abs(y);
    var v=ax>6&&ax>ay*1.5?(x>0?"l":"r"):(ay>6&&ay>ax*1.5?"p":null); seenAt=Date.now(); if(!v) return;
    if(v===sens){ cand=null; return; } if(cand!==v){ cand=v; since=Date.now(); return; } if(Date.now()-since>=1000){ cand=null; sens=v; sync(); } }
  addEventListener("devicemotion",onM);
  var st2=document.createElement("style"); st2.textContent="html.rotL411 #bppRot397{transform:rotate(-90deg) translateX(-100%)}"; document.head.appendChild(st2);
  function sync(){ var h=document.documentElement;
    if(!on()||!phone()||!portrait()){ set(false); h.classList.remove("rotL411"); return; }
    var side=(Date.now()-seenAt<3000)&&(sens==="l"||sens==="r")?sens:null;
    h.classList.toggle("rotL411",side==="r"); set(!!side); }
  window.bppRot411=function(){ return {on:on(),phone:phone(),portrait:portrait(),sens:sens,rot:document.documentElement.classList.contains(R),left:document.documentElement.classList.contains("rotL411")}; };
  function later(){ setTimeout(sync,80); setTimeout(sync,400); }
  addEventListener("resize",later); addEventListener("orientationchange",later);
  try{ screen.orientation.addEventListener("change",later); }catch(e){}
  try{ visualViewport.addEventListener("resize",later); }catch(e){}
  try{ matchMedia("(orientation: portrait)").addEventListener("change",later); }catch(e){}
  document.addEventListener("fullscreenchange",later); setInterval(sync,400);
})();
