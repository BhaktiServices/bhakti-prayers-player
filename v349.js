/* [Grok-Bot] V3.49: Standardansicht, "Mitlesen an": Tipp auf eine andere Strophe spult sofort zu ihr (wie Blaettern V3.47/V3.48):
   Strophe nach oben, Aufnahme an ihren Zeitpunkt, Mitlesen laeuft weiter; Pause bleibt Pause. Strophe ohne Zeitmarke: kein Spulen, Hinweis (V3.48).
   Kein Tipp bei Wischen/Scrollen (Bewegung > 10 px, Blaetterschritt kurz davor), langem Druecken (> 600 ms) oder markiertem Text.
   Links/Knoepfe/Eingaben in den Lyrics bleiben unberuehrt. Tipp auf die laufende Strophe: nur nach oben holen (keine Selbstkorrektur-Marke mehr
   bei Mitlesen an). Mitlesen aus: altes Verhalten (el.onclick). Grossbild unveraendert (eigenes Overlay, erster Tipp = Menue). */
window.BPP_BUILD="4.02"; window.BPP_SHOW="4.02";
(function(){
  if(window.bppV349) return; window.bppV349=1;
  var down=null;
  function fsOn(){ var f=document.getElementById("bppFs"); return !!(f && f.classList.contains("on")); }
  function pt(e){ var t=(e.touches&&e.touches[0])||(e.changedTouches&&e.changedTouches[0])||e; return {x:t.clientX, y:t.clientY}; }
  function start(e){ if(!e.target.closest || !e.target.closest("#lyrics")) return; var p=pt(e); down={x:p.x,y:p.y,t:Date.now(),m:window.bppManualAt||0,sc:(document.getElementById("lyrics")||{}).scrollTop||0,moved:false}; }
  function move(e){ if(!down) return; var p=pt(e); if(Math.abs(p.x-down.x)>10 || Math.abs(p.y-down.y)>10) down.moved=true; }
  document.addEventListener("pointerdown", start, true);
  document.addEventListener("touchstart", start, {capture:true, passive:true});
  document.addEventListener("pointermove", move, true);
  document.addEventListener("touchmove", move, {capture:true, passive:true});
  function isTap(e){
    var d=down; if(!d) return false;
    if(d.moved) return false;
    var p=pt(e); if(Math.abs(p.x-d.x)>10 || Math.abs(p.y-d.y)>10) return false;
    if(Date.now()-d.t>600) return false;
    if((window.bppManualAt||0)!==d.m) return false;                 /* Wischschritt dazwischen */
    if(Date.now()-(window.bppManualAt||0)<450) return false;
    var L=document.getElementById("lyrics"); if(L && Math.abs((L.scrollTop||0)-d.sc)>4) return false;
    try{ var s=window.getSelection(); if(s && !s.isCollapsed && String(s).trim()) return false; }catch(x){}
    return true;
  }
  document.addEventListener("click", function(e){
    if(fsOn() || typeof autoScroll==="undefined" || !autoScroll) return;
    var t=e.target; if(!t || !t.closest) return;
    var st=t.closest("#lyrics .stanza"); if(!st) return;
    if(t.closest("a,button,input,select,textarea,label,[role=button],[contenteditable=true],[data-nobpptap]")) return;
    var tap=isTap(e); down=null;
    e.stopImmediatePropagation(); e.preventDefault();   /* altes el.onclick (Selbstkorrektur-Marke) bei Mitlesen an nicht ausfuehren */
    if(!tap) return;
    if(typeof i==="undefined" || i<0) return;
    var all=Array.prototype.slice.call(document.querySelectorAll("#lyrics .stanza")), k=all.indexOf(st); if(k<0) return;
    var n=-1; try{ n=currentGroupIndex(); }catch(x){}
    var tk=null; try{ tk=stanzaFromProgress(songProgress()); }catch(x){}
    if(k===n && k===tk){ try{ pinStanza(); }catch(x){} return; }
    if(k!==n && window.bppStanzaStep){ window.bppStanzaStep(k-n); }
    if(k===tk){ try{ holdLineUntil=0; }catch(x){} return; }
    var has=false; try{ has=window.bppV347Starts(k).length>0; }catch(x){}
    if(!has){ if(window.bppV348Toast) window.bppV348Toast(); return; }
    setTimeout(function(){ if(window.bppV347Fire) window.bppV347Fire(); }, 20);
  }, true);
})();
/* [Grok-Bot] V3.49: Grossbild am Handy/Tablet (Touch) -> Querformat. Mit screen.orientation.lock (Android Chrome, Windows-Tablets):
   nach dem Vollbild (v183 open ruft requestFullscreen) lock('landscape'), beim Schliessen unlock + Vollbild beenden. Ohne lock (iOS) bzw.
   wenn lock abgelehnt wird und das Geraet hochkant ist: Hinweis "Fuer Grossansicht Handy quer drehen" (6 Sprachen, 3 s). Desktop unveraendert. */
(function(){
  if(window.bppV349o) return; window.bppV349o=1;
  var MSG={de:"Für Großansicht Handy quer drehen",en:"Turn your phone sideways for the Big view",fr:"Tournez le téléphone pour la vue Grand",
    es:"Gira el móvil para la vista Grande",ru:"Поверните телефон горизонтально для режима «Крупно»",hi:"बड़ा दृश्य के लिए फ़ोन को तिरछा घुमाएँ",pt:"Vire o celular de lado para a visão Grande"};
  function touchDev(){ try{ return matchMedia("(pointer:coarse)").matches && !matchMedia("(pointer:fine)").matches; }catch(e){ return false; } }
  function portrait(){ return (window.innerHeight||0) > (window.innerWidth||0); }
  function lockFn(){ return !!(screen.orientation && typeof screen.orientation.lock==="function"); }
  var css=document.createElement("style");
  css.textContent="#bppRot{position:absolute;left:0;right:0;margin:auto;top:40%;width:max-content;max-width:86vw;box-sizing:border-box;z-index:20;padding:10px 16px;"+
    "border-radius:12px;border:1px solid #D6BF90;background:#041236;color:#D6BF90;font:500 15px/1.4 Figtree,'Source Sans 3',sans-serif;text-align:center;"+
    "box-shadow:0 6px 22px rgba(0,0,0,.5);pointer-events:none;opacity:0;transition:opacity .25s}#bppRot.on{opacity:1}";
  document.head.appendChild(css);
  var hideT=null, locked=false;
  function hint(){
    var ov=document.getElementById("bppFs"); if(!ov || !portrait()) return;
    var h=document.getElementById("bppRot"); if(!h){ h=document.createElement("div"); h.id="bppRot"; h.setAttribute("role","status"); }
    if(h.parentNode!==ov) ov.appendChild(h);
    var l=(typeof lang!=="undefined"&&MSG[lang])?lang:"en"; h.textContent="⟲ "+MSG[l];
    void h.offsetWidth; h.classList.add("on"); clearTimeout(hideT); hideT=setTimeout(function(){ h.classList.remove("on"); }, 3000);
    window.bppV349Hint=(window.bppV349Hint||0)+1;
  }
  function tryLock(){
    if(!lockFn()){ hint(); return; }
    var go=function(){
      try{ var p=screen.orientation.lock("landscape"); window.bppV349Lock=(window.bppV349Lock||0)+1;
        if(p && p.then) p.then(function(){ locked=true; }, function(){ locked=false; hint(); }); }catch(e){ hint(); }
    };
    if(document.fullscreenElement || document.webkitFullscreenElement) go();
    else {
      var ov=document.getElementById("bppFs");
      try{ var r=ov && ov.requestFullscreen && ov.requestFullscreen(); if(r && r.then) r.then(go, function(){ hint(); }); else go(); }catch(e){ hint(); }
    }
  }
  function opened(){ return; /* [Grok-Bot] V3.73: keine eigene Querformat-Sperre mehr (sperrte nach v372 erneut); Sperre/Freigabe nur noch in v373.js */ }
  function closed(){
    clearTimeout(hideT); var h=document.getElementById("bppRot"); if(h) h.classList.remove("on");
    if(!touchDev()) return;
    try{ if(screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); }catch(e){} locked=false;
    try{ if(document.fullscreenElement && document.exitFullscreen){ var p=document.exitFullscreen(); if(p&&p.catch) p.catch(function(){}); } }catch(e){}
  }
  var was=false;
  function watch(){
    var ov=document.getElementById("bppFs"); if(!ov || ov.__v349o) return; ov.__v349o=1;
    new MutationObserver(function(){ var on=ov.classList.contains("on"); if(on!==was){ was=on; if(on) opened(); else closed(); } })
      .observe(ov,{attributes:true,attributeFilter:["class"]});
    if(ov.classList.contains("on")){ was=true; opened(); }
  }
  watch(); setInterval(watch, 500);
})();
