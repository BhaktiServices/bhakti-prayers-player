/* [Grok-Bot] V3.48: Blaettern bei den letzten Strophen. Ursache: das Lyrics-Fenster (#lyrics, eigener Scrollbereich) endet mit der letzten
   Strophe; pinStanza kann die letzten 2-5 Strophen (je nach Bildschirm/Spalten) nicht mehr nach oben holen (scrollTop am Anschlag).
   Mitlesen und Spulen (V3.47) liefen zwar richtig mit, aber die Ansicht bewegte sich nicht mehr -> "Scrollen geht nicht".
   Neu: unsichtbarer Leerraum unter der letzten Strophe (#lyrics::after, Hoehe per --bppTail), genau so gross, dass auch die letzte Strophe
   (bzw. letzte Reihe bei 2/3 Spalten) oben im Fenster stehen kann. Dazu ein kurzer Hinweis (6 Sprachen), wenn man bei "Mitlesen an" auf eine
   Strophe ohne Zeitmarke blaettert (nicht in der Aufnahme, z.B. Vishnu-Arati 10-12): dann wird nicht gespult. Grossbild unveraendert (je Strophe). */
window.BPP_BUILD="3.71"; window.BPP_SHOW="3.71";
(function(){
  if(window.bppV348) return; window.bppV348=1;
  var GAP=12;
  var css=document.createElement("style");
  css.textContent="#lyrics::after{content:'';display:block;height:var(--bppTail,0px);grid-column:1/-1;pointer-events:none}"+
    "#bppNoTime{position:fixed;left:0;right:0;margin:auto;bottom:22px;width:max-content;max-width:min(92vw,520px);box-sizing:border-box;z-index:2147483646;"+
    "padding:8px 14px;border-radius:12px;border:1px solid #D6BF90;background:#041236;color:#D6BF90;font:500 14px/1.4 Figtree,'Source Sans 3',sans-serif;"+
    "box-shadow:0 6px 22px rgba(0,0,0,.45);pointer-events:none;opacity:0;transition:opacity .2s;text-align:center}#bppNoTime.on{opacity:1}";
  document.head.appendChild(css);
  function tail(){
    var L=document.getElementById("lyrics"); if(!L || !L.clientHeight) return;
    var st=L.querySelectorAll(".stanza"); if(!st.length) return;
    var last=st[st.length-1];
    var cur=parseFloat(L.style.getPropertyValue("--bppTail"))||0;
    var lr=L.getBoundingClientRect(), r=last.getBoundingClientRect();
    var topIn=r.top-lr.top+L.scrollTop;               /* Oberkante der letzten Strophe/Reihe im Inhalt */
    var S=L.scrollHeight-cur;                           /* Inhaltshoehe ohne Leerraum */
    var need=Math.max(0, Math.ceil(topIn-GAP+L.clientHeight-S)+2);
    if(Math.abs(need-cur)>2) L.style.setProperty("--bppTail", need+"px");
  }
  window.bppV348Tail=tail;
  function hook(){
    if(typeof layoutLyrics==="function" && !layoutLyrics.__v348){
      var o=layoutLyrics; layoutLyrics=function(){ var r=o.apply(this,arguments); try{ tail(); }catch(e){} return r; };
      for(var k in o){ try{ layoutLyrics[k]=o[k]; }catch(e){} } layoutLyrics.__v348=1;
    }
  }
  hook(); setInterval(function(){ hook(); try{ tail(); }catch(e){} }, 400);
  window.addEventListener("resize", function(){ setTimeout(tail, 200); });

  /* Hinweis: Strophe ohne Zeitmarke */
  var MSG={de:"Diese Strophe ist nicht in der Aufnahme – kein Spulen.",en:"This stanza is not in the recording – no seeking.",
    fr:"Cette strophe n’est pas dans l’enregistrement – pas de saut.",es:"Esta estrofa no está en la grabación – sin salto.",
    ru:"Этой строфы нет в записи – перемотки нет.",hi:"यह श्लोक रिकॉर्डिंग में नहीं है – आगे-पीछे नहीं होगा।",pt:"Esta estrofe não está na gravação – sem salto."};
  var lastM=window.bppManualAt||0, tm=null, hideT=null;
  function fsOn(){ var f=document.getElementById("bppFs"); return !!(f && f.classList.contains("on")); }
  function shownK(){ try{ if(fsOn()){ var s=bppFsState(); return s.k; } return currentGroupIndex(); }catch(e){ return -1; } }
  function toast(){
    var l=(typeof lang!=="undefined"&&MSG[lang])?lang:"en", h=document.getElementById("bppNoTime");
    if(!h){ h=document.createElement("div"); h.id="bppNoTime"; h.setAttribute("role","status"); }
    var host=fsOn()?document.getElementById("bppFs"):document.body; if(h.parentNode!==host) host.appendChild(h);
    h.textContent=MSG[l]; void h.offsetWidth; h.classList.add("on");
    clearTimeout(hideT); hideT=setTimeout(function(){ h.classList.remove("on"); }, 2600);
  }
  window.bppV348Toast=toast; /* V3.49 */
  function check(){
    if(typeof autoScroll==="undefined" || !autoScroll || typeof window.bppV347Starts!=="function") return;
    var k=shownK(); if(k==null || k<0) return;
    var tk=null; try{ tk=stanzaFromProgress(songProgress()); }catch(e){}
    if(k===tk) return;
    var has=false; try{ has=window.bppV347Starts(k).length>0; }catch(e){ has=true; }
    if(!has) toast();
  }
  setInterval(function(){ var m=window.bppManualAt||0; if(m!==lastM){ lastM=m; if(window.bppV351 && window.bppExplicitM!==m) return; clearTimeout(tm); tm=setTimeout(check, 900); } }, 60);
})();
