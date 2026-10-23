/* [Grok-Bot] V4.04: Autoscroll huepfte mit Hintergrundbild (seit V4.00). Ursache: Bild-Ebene lag als position:sticky (100vh, margin-bottom:-100vh)
   IM scrollenden #lyrics, mit live filter:blur(14px)+scale -> bei jedem Scroll-Schritt Neuberechnung/Repaint der unscharfen Flaeche, sticky-Nachfuehrung ruckelt.
   Fix: alte .bg400-Ebene aus (display:none). Neue Ebene .bg404 position:fixed, ausserhalb des Scrollflusses (scrollt nicht mit), pointer-events:none,
   z-index:-1 hinter dem Text, eigene GPU-Ebene (translateZ(0), will-change:opacity), contain:strict. Unschaerfe vorab ins JPG gerechnet (img/bg/blur/, 320x180),
   kein CSS-filter. Nur opacity-Uebergang; Groesse/Lage nur bei resize/Drehung/Seiten-Scroll per transform, kein Reflow der Lyrics. Standard und Gross. */
/* SW-Liste: src="img/bg/blur/ashtotram.jpg" src="img/bg/blur/ashtotram-abend.jpg" src="img/bg/blur/bhajare.jpg" src="img/bg/blur/bhu-suktam.jpg" src="img/bg/blur/durga-chalisa.jpg" src="img/bg/blur/final-prayers.jpg" src="img/bg/blur/ganesha-mantra.jpg" src="img/bg/blur/gayatri.jpg" src="img/bg/blur/giridhari-arati.jpg" src="img/bg/blur/govinda.jpg" src="img/bg/blur/guru-stotram.jpg" src="img/bg/blur/guru-stotram-abend.jpg" src="img/bg/blur/guruji-gayatri.jpg" src="img/bg/blur/hanuman.jpg" src="img/bg/blur/hanuman-bhavani.jpg" src="img/bg/blur/kavacham.jpg" src="img/bg/blur/lakshmi-arati.jpg" src="img/bg/blur/mukunda.jpg" src="img/bg/blur/narasimha.jpg" src="img/bg/blur/narasimha-abend.jpg" src="img/bg/blur/narayana-suktam.jpg" src="img/bg/blur/nila-suktam.jpg" src="img/bg/blur/panduranga-arati.jpg" src="img/bg/blur/purusa-suktam.jpg" src="img/bg/blur/ramanuja.jpg" src="img/bg/blur/saprem.jpg" src="img/bg/blur/sri-suktam.jpg" src="img/bg/blur/suprabhatam.jpg" src="img/bg/blur/vaishnava-mantra.jpg" src="img/bg/blur/vchalisa.jpg" src="img/bg/blur/vishnu-arati.jpg" src="img/bg/blur/vishnu-sahasranama.jpg" */
// build via v405
(function(){
  if(window.bppV404) return; window.bppV404=1;
  var IDS=["ashtotram", "ashtotram-abend", "bhajare", "bhu-suktam", "durga-chalisa", "final-prayers", "ganesha-mantra", "gayatri", "giridhari-arati", "govinda", "guru-stotram", "guru-stotram-abend", "guruji-gayatri", "hanuman", "hanuman-bhavani", "kavacham", "lakshmi-arati", "mukunda", "narasimha", "narasimha-abend", "narayana-suktam", "nila-suktam", "panduranga-arati", "purusa-suktam", "ramanuja", "saprem", "sri-suktam", "suprabhatam", "vaishnava-mantra", "vchalisa", "vishnu-arati", "vishnu-sahasranama"]
;
  var st=document.createElement("style");
  st.textContent=".bg400{display:none!important}"+
   ".bg404{position:fixed;left:0;top:0;width:0;height:0;z-index:-1;pointer-events:none;background:center/cover no-repeat;opacity:0;transition:opacity 1.6s ease;will-change:opacity;transform:translateZ(0);contain:strict;backface-visibility:hidden}"+
   "#bppFs>.bg404{left:0;top:0;width:100%;height:100%;transform:translateZ(0)}"+
   ".bg404.on{opacity:.13}html.th-morgen .bg404.on{opacity:.16}html.th-nacht .bg404.on{opacity:.11}";
  document.head.appendChild(st);
  function pid(){ try{ return (typeof PRAYERS!=="undefined"&&typeof i!=="undefined"&&i>=0&&PRAYERS[i])?PRAYERS[i].id:null; }catch(e){ return null; } }
  function playing(){ var a=document.getElementById("a"); return !!(a&&!a.paused&&!a.ended&&a.currentTime>0); }
  var L={};
  function lay(host){ var d=L[host.id]; if(!d){ d=document.createElement("div"); d.className="bg404"; d.setAttribute("aria-hidden","true"); L[host.id]=d; }
    if(d.parentNode!==host) host.appendChild(d); return d; }
  var lastR="";
  function place(){ var h=document.getElementById("lyrics"), d=L.lyrics; if(!h||!d) return; var r=h.getBoundingClientRect();
    var k=Math.round(r.left)+","+Math.round(r.top)+","+Math.round(r.width)+","+Math.round(r.height); if(k===lastR) return; lastR=k;
    d.style.width=Math.round(r.width)+"px"; d.style.height=Math.round(r.height)+"px";
    d.style.transform="translate3d("+Math.round(r.left)+"px,"+Math.round(r.top)+"px,0)"; }
  var raf=0; function sched(){ if(raf) return; raf=requestAnimationFrame(function(){ raf=0; place(); }); }
  window.addEventListener("scroll",sched,{passive:true}); window.addEventListener("resize",sched);
  window.addEventListener("orientationchange",sched); try{ screen.orientation.addEventListener("change",sched); }catch(e){}
  function tick(){ var id=pid(), ok=id&&IDS.indexOf(id)>=0, on=ok&&playing();
    ["lyrics","bppFs"].forEach(function(n){ var h=document.getElementById(n); if(!h) return; var d=lay(h);
      if(ok&&d.dataset.id!==id){ d.dataset.id=id; d.style.backgroundImage='url("img/bg/blur/'+id+'.jpg")'; }
      if(d.classList.contains("on")!==!!on) d.classList.toggle("on",!!on); });
    sched(); }
  setInterval(tick,500); document.addEventListener("play",tick,true); document.addEventListener("pause",tick,true);
  window.bppBg404=function(){ var d=L.lyrics; return {id:pid(),has:IDS.indexOf(pid())>=0,playing:playing(),on:!!(d&&d.classList.contains("on")),pos:d&&d.style.transform}; };
})();
