/* [Grok-Bot] V4.37: Fusszeile und Statistik am Desktop wieder erreichbar.
   Ursache: v307 faengt das Mausrad ueber dem Lyrics-Fenster ab (preventDefault, blaettert Strophen). Fuellt das Lyrics-Fenster
   das Browserfenster (z. B. Hanuman, 2 Spalten, Akkorde in Zeile, Windows-Desktop), kam man mit dem Rad nie zum Seitenende.
   Fix: Rad nach unten scrollt zuerst die Seite bis ganz unten (Fusszeile/Statistik), erst dann blaettert es Strophen;
   Rad nach oben scrollt zuerst die Seite zurueck, bis der Lyrics-Kopf wieder sichtbar ist, dann Strophen zurueck.
   Zusaetzlich: pinStanza() (autoscroll.js) zog die Seite sofort wieder zur markierten Strophe zurueck; nach eigener
   Seitenbewegung (Rad, Tasten, Ziehen, Wischen) behaelt es 10 s lang die Seitenposition bei (das Lyrics-Fenster wird weiter gesetzt).
   Gross-Ansicht (#bppFs) und Touch/Wischen bleiben unveraendert. */
window.BPP_BUILD="4.37"; window.BPP_SHOW="4.37";
(function(){
  if(window.bppV437) return; window.bppV437=1;
  function barBottom(){ var m=0; [].forEach.call(document.querySelectorAll("body *"),function(e){ var s=getComputedStyle(e).position; if(s!=="fixed"&&s!=="sticky") return; var r=e.getBoundingClientRect(); if(r.height>0&&r.height<260&&r.top<=4&&r.bottom>m&&r.width>innerWidth*0.5) m=r.bottom; }); return m; }
  var bb=0, bt=0;
  window.addEventListener("wheel",function(e){
    var L=document.getElementById("lyrics"); if(!L||!L.contains(e.target)) return;
    if(Math.abs(e.deltaY)<8||Math.abs(e.deltaY)<Math.abs(e.deltaX)) return;
    var de=document.scrollingElement||document.documentElement, max=de.scrollHeight-innerHeight, y=de.scrollTop;
    function pg(){ e.stopPropagation(); e.preventDefault(); var d=e.deltaMode===1?e.deltaY*40:e.deltaY; window.scrollBy(0,d); }
    if(e.deltaY>0){ if(y<max-2) pg(); return; } /* Seite zuerst nach unten (das Lyrics-Fenster wuerde sonst selbst scrollen) */
    if(Date.now()-bt>1000){ bb=barBottom(); bt=Date.now(); }
    if(y>2 && L.getBoundingClientRect().top<bb-2) pg(); /* Seite zuerst zurueck */
  },{capture:true,passive:false});
  var lastUser=0;
  ["wheel","keydown","touchmove","pointerdown"].forEach(function(t){ window.addEventListener(t,function(e){ if(t==="keydown"&&!/^(Arrow|Page|Home|End| )/.test(e.key)) return; if(t==="pointerdown"&&e.target!==document.documentElement) return; lastUser=Date.now(); },{capture:true,passive:true}); });
  function wrap(){ if(typeof window.pinStanza!=="function"||window.pinStanza.__v437) return; var o=window.pinStanza;
    var f=function(){ var sc=document.scrollingElement||document.documentElement, y=sc.scrollTop, r=o.apply(this,arguments); function back(){ if(Date.now()-lastUser<10000&&Math.abs(sc.scrollTop-y)>1) sc.scrollTop=y; } back(); Promise.resolve().then(function(){}).then(back); setTimeout(back,0); return r; }; /* v434 setzt verzoegert (Mikrotask) */
    f.__v437=1; window.pinStanza=f; try{ pinStanza=f; }catch(e){} }
  wrap(); setInterval(wrap,1000);
})();
