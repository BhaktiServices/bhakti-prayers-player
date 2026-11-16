/* [Grok-Bot] V5.27: Play-Knopf ist gold, solange wirklich wiedergegeben wird;
   bei Pause, Stopp oder Stückende dunkler als die normalen Tasten.
   Gilt für #btnPlay und Groß #bppFsPlay. Farbe folgt dem echten Audiostatus
   (play/pause/ended, Leiste, Tastatur, Media Session, Groß).
   Beschriftung unverändert: „Pause“ während der Wiedergabe, „Play“ wenn nicht.
   critical=false. */
window.BPP_BUILD="5.27"; window.BPP_SHOW="5.27";
(function(){
  if(window.bppV527) return; window.bppV527=1;

  var HP={
    de:" <b>Play:</b> Gold während der Wiedergabe; bei Pause dunkler als die anderen Tasten. Die Beschriftung bleibt Pause beim Spielen und Play im Stillstand. <i>(G+)</i>",
    en:" <b>Play:</b> Gold while playing; when paused, darker than the other buttons. The label stays Pause while playing and Play when idle. <i>(G+)</i>",
    fr:" <b>Lecture :</b> Doré pendant la lecture ; en pause, plus foncé que les autres boutons. Le libellé reste Pause en lecture et Play à l’arrêt. <i>(G+)</i>",
    es:" <b>Play:</b> Dorado durante la reproducción; en pausa, más oscuro que los demás botones. La etiqueta sigue siendo Pausa al reproducir y Play en reposo. <i>(G+)</i>",
    ru:" <b>Play:</b> Золотой во время воспроизведения; на паузе темнее остальных кнопок. Надпись по-прежнему «Пауза» при игре и «Play» в простое. <i>(G+)</i>",
    hi:" <b>Play:</b> चलते समय सुनहरा; रोकने पर अन्य बटनों से गहरा। लेबल चलते समय Pause और रुकने पर Play रहता है। <i>(G+)</i>",
    pt:" <b>Play:</b> Dourado durante a reprodução; em pausa, mais escuro que os outros botões. O texto continua Pausa ao tocar e Play parado. <i>(G+)</i>",
    cz:" <b>Play:</b> Zlatá během přehrávání; při pauze tmavší než ostatní tlačítka. Popisek zůstává Pauza při hře a Play v klidu. <i>(G+)</i>"
  };

  var css=document.createElement("style");
  css.id="bppV527";
  var G=["html body button#btnPlay","html body button#bppFsPlay","html body #bppFs #bppFsBar button#bppFsPlay"];
  function all(extra){ return G.map(function(s){ return s+extra; }).join(","); }
  var gold="background:#D6BF90!important;color:#041236!important;border-color:#D6BF90!important;animation:none!important";
  var dim="background:#171e33!important;color:#c5cadd!important;border-color:rgba(197,202,221,.28)!important;animation:none!important;opacity:1";
  function th(sel,bg,fg,bd){ return sel+"{background:"+bg+"!important;color:"+fg+"!important;border-color:"+bd+"!important;animation:none!important}"; }
  function thAll(thn,extra,bg,fg,bd){ return th(all(extra).replace(/html body /g,"html."+thn+" body "),bg,fg,bd); }
  css.textContent=
    /* Pause/Stop: dunkler als die normalen Tasten, schlaegt #btnPlay/#bppFsPlay immer-gold */
    all(":not(.act358)")+","+all(":not(.act358).gold")+","+all(":not(.act358).on")+","+all(".bppNoRec")+
    "{"+dim+"}"+
    all(".act358")+","+all(".act358.gold")+","+all(".act358.on")+"{"+gold+"}"+
    /* Gross: Symbol hell auf dunkel (Pause), dunkel auf Gold (Play) */
    "html body #bppFs #bppFsBar button#bppFsPlay:not(.act358) i.pl,"+
    "html body #bppFs #bppFsBar button#bppFsPlay:not(.act358) i.pl"+
    "{border-color:transparent transparent transparent #e8edf8!important}"+
    "html body #bppFs #bppFsBar button#bppFsPlay:not(.act358) i.pa"+
    "{border-left-color:#e8edf8!important;border-right-color:#e8edf8!important}"+
    "html body #bppFs #bppFsBar button#bppFsPlay.act358 i.pl"+
    "{border-color:transparent transparent transparent #041236!important}"+
    "html body #bppFs #bppFsBar button#bppFsPlay.act358 i.pa"+
    "{border-left-color:#041236!important;border-right-color:#041236!important}"+
    "html body #bppFs #bppFsBar button#bppFsPlay:not(.act358) svg,html body #bppFs #bppFsBar button#bppFsPlay:not(.act358) svg *"+
    "{fill:#e8edf8!important;color:#e8edf8!important}"+
    "html body #bppFs #bppFsBar button#bppFsPlay.act358 svg,html body #bppFs #bppFsBar button#bppFsPlay.act358 svg *"+
    "{fill:#041236!important;color:#041236!important}"+
    /* Stile */
    thAll("th-morgen",":not(.act358)","#9a8d72","#1e2340","#7a6e56")+
    thAll("th-morgen",".bppNoRec","#9a8d72","#1e2340","#7a6e56")+
    thAll("th-morgen",".act358","#C9A35A","#1A1405","#8A6420")+
    thAll("th-abend",":not(.act358)","#2a1c12","#e6d2b4","#4a3220")+
    thAll("th-abend",".bppNoRec","#2a1c12","#e6d2b4","#4a3220")+
    thAll("th-abend",".act358","#E2B864","#1E130B","#E2B864")+
    thAll("th-swami",":not(.act358)","#a87a4e","#1f1208","#7a5530")+
    thAll("th-swami",".bppNoRec","#a87a4e","#1f1208","#7a5530")+
    thAll("th-swami",".act358","#9A2E00","#FFF8F0","#7A1F00")+
    thAll("th-rishi",":not(.act358)","#3a1018","#fdecec","#5a1e28")+
    thAll("th-rishi",".bppNoRec","#3a1018","#fdecec","#5a1e28")+
    thAll("th-rishi",".act358","#E8C070","#2C0B12","#E8C070")+
    thAll("th-brahmachari",":not(.act358)","#8a6a08","#fff4c8","#6b4a00")+
    thAll("th-brahmachari",".bppNoRec","#8a6a08","#fff4c8","#6b4a00")+
    thAll("th-brahmachari",".act358","#1F1840","#FFD84A","#1F1840");
  document.head.appendChild(css);

  function playing(){
    try{
      if(typeof isPlaying==="function") return !!isPlaying();
    }catch(e){}
    try{
      var a=document.getElementById("a");
      return !!(a && a.src && !a.paused && !a.ended);
    }catch(e){}
    return false;
  }
  function noRec(){
    try{
      if(typeof i==="undefined"||i<0||typeof PRAYERS==="undefined") return false;
      var P=PRAYERS[i]; return !!P&&!P.audio&&!P.youtube;
    }catch(e){}
    return false;
  }
  function paintBtn(b, on){
    if(!b) return;
    if(!b.classList.contains("m358")) b.classList.add("m358");
    if(b.classList.contains("act358")!==on) b.classList.toggle("act358", on);
    if(b.classList.contains("s358")) b.classList.remove("s358");
    /* .on/.gold wuerden Theme-Regeln wieder immer gold faerben */
    if(b.classList.contains("on")) b.classList.remove("on");
    if(b.classList.contains("gold")) b.classList.remove("gold");
    var ap=on?"true":"false";
    if(b.getAttribute("aria-pressed")!==ap) b.setAttribute("aria-pressed", ap);
  }
  function help(){
    var d=document.getElementById("bppHelp"); if(!d) return;
    var l=(typeof lang!=="undefined"&&HP[lang])?lang:"en";
    var extra=HP[l]||HP.en;
    var ps=d.querySelectorAll(".in>p");
    var target=null;
    for(var i=ps.length-1;i>=0;i--){
      var tx=ps[i].textContent||"";
      if(/Gold\s*=|Or\s*=|Dorado\s*=|Золотой\s*=|सुनहरा\s*=|Dourado\s*=|Zlatá\s*=/.test(tx)){ target=ps[i]; break; }
    }
    if(!target){
      for(var j=ps.length-1;j>=0;j--){ if(!ps[j].classList.contains("jg") && !ps[j].classList.contains("kb357")){ target=ps[j]; break; } }
    }
    if(!target) return;
    if(target.getAttribute("data-h527")===l) return;
    var base=target.getAttribute("data-h527-base");
    if(!base){ base=target.innerHTML; target.setAttribute("data-h527-base",base); }
    target.innerHTML=base+extra;
    target.setAttribute("data-h527",l);
  }
  function paint(){
    var on=playing() && !noRec();
    paintBtn(document.getElementById("btnPlay"), on);
    paintBtn(document.getElementById("bppFsPlay"), on);
    try{ help(); }catch(e){}
  }
  function wrap(obj, name){
    try{
      var f=obj[name]; if(typeof f!=="function"||f.__v527) return;
      var w=function(){ var r=f.apply(this,arguments); paint(); return r; };
      w.__v527=1;
      if(typeof bppWrapMarkers489==="function") try{ bppWrapMarkers489(w,f); }catch(e){}
      obj[name]=w;
    }catch(e){}
  }
  function hookAudio(){
    var a=document.getElementById("a"); if(!a||a.__v527) return;
    a.__v527=1;
    ["play","playing","pause","ended","emptied","abort"].forEach(function(ev){
      a.addEventListener(ev, function(){ paint(); });
    });
  }
  function hookAll(){
    wrap(window,"syncPlayBtn");
    wrap(window,"bppV358");
    wrap(window,"togglePlay");
    hookAudio();
  }
  hookAll(); paint();
  setInterval(function(){ hookAll(); paint(); }, 200);
  document.addEventListener("click", function(){ setTimeout(paint,0); setTimeout(paint,80); }, true);
  document.addEventListener("keydown", function(){ setTimeout(paint,0); setTimeout(paint,80); }, true);
  if(navigator.mediaSession){
    try{
      var old=navigator.mediaSession;
      /* events on the audio element already cover Media Session play/pause */
    }catch(e){}
  }
  window.bppSync527=paint;
})();
