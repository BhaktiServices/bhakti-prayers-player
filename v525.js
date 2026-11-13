/* [Grok-Bot] V5.25: Nach dem Ende von Shri Krishna Suprabhātam und „Weiter“
   zu The Govinda Prayer bleiben die Lyrics sichtbar (Standard und Groß).
   Ursache: Am Stückende legt v183 in Groß #bppFs.end auf die Lyrics-Box
   (opacity .18, wirkt wie ein leeres Notenblatt). Gleichzeitig zeigt v247
   das Abschieds-Overlay #bppBye auch dann, wenn ein nächstes Prayer wartet
   – entgegen der eigenen Regel „nur wenn danach nichts weiterspielt“.
   #bppBye hat einen höheren z-index als #bppFs und fängt den Klick auf
   „Nächstes Prayer“ / ⏭ ab, ohne den Wechsel auszuführen. Beim Wechsel
   werden Endklasse, Bye, v195/v524-Vorschau und eventuelle Noten-Inline-
   Styles jetzt zuverlässig zurückgesetzt, Lyrics und Groß neu gezeichnet.
   critical=true. */
window.BPP_BUILD="5.25"; window.BPP_SHOW="5.25";
(function(){
  if(window.bppV525) return; window.bppV525=1;

  var st=document.createElement("style");
  st.id="bppV525css";
  /* Bye nie über der Großansicht; in Standard nur, wenn wirklich Schluss ist
     (kein nächstes Prayer). Endzustand: Lyrics wieder voll sichtbar, sobald
     das nächste Prayer geladen ist. */
  st.textContent=
    "#bppFs.on ~ #bppBye, body:has(#bppFs.on) #bppBye{display:none!important;pointer-events:none!important}"+
    "#bppBye{z-index:2147482000!important}"+
    "#bppFs.on:not(.end) #bppFsBox{opacity:1!important}";
  document.head.appendChild(st);

  function fsOn(){
    var f=document.getElementById("bppFs");
    return !!(f && f.classList.contains("on"));
  }
  function hasNext(){
    try{
      var nv=window.bppPrayerNav;
      if(!nv || typeof nv.neighbor!=="function") return false;
      var wrap=false;
      try{ wrap=(typeof nv.rep==="function" && nv.rep()===2); }catch(e){}
      var n=nv.neighbor(1, wrap);
      return !!(n && typeof n.idx==="number");
    }catch(e){}
    return false;
  }
  function closeBye(){
    try{
      var d=document.getElementById("bppBye");
      if(d && d.parentNode) d.parentNode.removeChild(d);
    }catch(e){}
  }
  function closeTap(){
    try{
      var o=document.getElementById("bppTapPlay");
      if(o && o.parentNode) o.parentNode.removeChild(o);
    }catch(e){}
  }
  function clearEnd(){
    try{
      var f=document.getElementById("bppFs");
      if(f) f.classList.remove("end");
    }catch(e){}
    try{
      var box=document.getElementById("bppFsBox");
      if(box){
        /* Altlast aus der Notenansicht / Endzustand: Lyrics nicht unsichtbar lassen */
        if(box.style.opacity==="0" || box.style.opacity==="0.18") box.style.opacity="";
        if(box.style.pointerEvents==="none") box.style.pointerEvents="";
        if(box.style.visibility==="hidden") box.style.visibility="";
      }
    }catch(e){}
  }
  function resetPreview(){
    try{
      var box=document.getElementById("bppFsBox");
      if(box){ box.style.translate=""; box.style.transform=""; }
      var nx=document.getElementById("bppNx195");
      if(nx){ nx.style.opacity="0"; nx.style.visibility="hidden"; nx.style.transform=""; }
    }catch(e){}
  }
  function paint(){
    try{ if(typeof paintLyrics==="function") paintLyrics(); }catch(e){}
    try{ if(typeof layoutLyrics==="function") layoutLyrics(); }catch(e){}
    try{ if(typeof applyUI==="function") applyUI(); }catch(e){}
  }
  function afterNav(){
    closeBye(); closeTap();
    clearEnd();
    resetPreview();
    paint();
    [40,160,400,900].forEach(function(t){
      setTimeout(function(){ closeBye(); closeTap(); clearEnd(); paint(); kickPlay(); }, t);
    });
  }
  function kickPlay(){
    try{
      var a=document.getElementById("a");
      if(!a || !a.src || !a.paused || a.ended) return;
      /* Nach Stückende kann das erste play() verworfen werden */
      var p=a.play();
      if(p && p.catch) p.catch(function(){});
    }catch(e){}
  }

  /* v247: Bye nur, wenn wirklich nichts weitergeht und Groß nicht offen ist */
  function wrapBye(){
    if(typeof window.bppBye!=="function" || window.bppBye.__v525) return;
    var orig=window.bppBye;
    window.bppBye=function(){
      if(fsOn() || hasNext()){ closeBye(); return; }
      return orig.apply(this, arguments);
    };
    window.bppBye.__v525=1;
  }

  function wrapPlay(){
    if(typeof window.play!=="function" || window.play.__v525) return;
    var o=window.play;
    var w=function(){ var r=o.apply(this, arguments); afterNav(); return r; };
    if(typeof bppWrapMarkers489==="function") bppWrapMarkers489(w, o);
    w.__v525=1; window.play=w;
  }
  function wrapNav(){
    var nv=window.bppPrayerNav; if(!nv || nv.__v525) return;
    ["next","prev"].forEach(function(k){
      var o=nv[k]; if(typeof o!=="function") return;
      nv[k]=function(){ closeBye(); clearEnd(); var r=o.apply(this, arguments); afterNav(); return r; };
    });
    nv.__v525=1;
  }

  /* Klick auf Bye: Overlay schließen UND den getroffenen Bedienknopf darunter auslösen */
  function onPointer(e){
    var bye=document.getElementById("bppBye");
    if(!bye) return;
    var x=e.clientX, y=e.clientY;
    closeBye();
    try{
      var el=document.elementFromPoint(x, y);
      if(!el) return;
      var btn=el.closest && el.closest("#btnPNext,#bppFsPNext,#bppFsEndNext,#btnPPrev,#bppFsPPrev,#btnPlay,[id^=bppFsPlay]");
      if(btn){
        e.preventDefault();
        e.stopPropagation();
        try{ btn.click(); }catch(err){}
      }
    }catch(err){}
  }
  document.addEventListener("pointerdown", onPointer, true);

  /* Falls v247 Bye trotzdem einfügt, obwohl ein nächstes Prayer wartet: sofort wieder entfernen */
  function watchBye(){
    if(document.__v525bye) return;
    if(!window.MutationObserver) return;
    document.__v525bye=1;
    try{
      new MutationObserver(function(){
        var d=document.getElementById("bppBye");
        if(!d) return;
        if(fsOn() || hasNext()) closeBye();
      }).observe(document.body, {childList:true});
    }catch(e){}
  }

  function hookPlayTap(){
    var a=document.getElementById("a");
    if(!a || a.__v525tap) return;
    a.__v525tap=1;
    a.addEventListener("play", function(){ closeTap(); closeBye(); clearEnd(); });
  }
  function tick(){
    wrapBye(); wrapPlay(); wrapNav(); watchBye(); hookPlayTap();
    if(fsOn() || hasNext()) closeBye();
    try{
      var a=document.getElementById("a");
      if(a && a.src && !a.paused && !a.ended) closeTap();
    }catch(e){}
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(tick, 200); });
  else setTimeout(tick, 200);
  setInterval(tick, 800);
  window.bppClearEnd525=function(){ closeBye(); clearEnd(); resetPreview(); paint(); };
})();
