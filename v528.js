/* [Grok-Bot] V5.28: Mitsingen/Übersetzung/Akkorde zeigen ihren Zustand in allen Themes
   (Gold/Silber schlägt html.th-* button{background:!important}).
   Play umgedreht: während der Wiedergabe Beschriftung „Play“ und Gold,
   sonst „Pause“ und Silber. Gilt auch in Groß. critical=false. */
window.BPP_BUILD="5.28"; window.BPP_SHOW="5.28";
(function(){
  if(window.bppV528) return; window.bppV528=1;

  var PLAY={
    de:{play:"Play",pause:"Pause"},
    en:{play:"Play",pause:"Pause"},
    fr:{play:"Lecture",pause:"Pause"},
    es:{play:"Play",pause:"Pausa"},
    ru:{play:"Play",pause:"Пауза"},
    hi:{play:"चलाएँ",pause:"रोकें"},
    pt:{play:"Play",pause:"Pausa"},
    cz:{play:"Play",pause:"Pauza"}
  };
  var HP={
    de:" <b>Play (V5.28):</b> Während der Wiedergabe „Play“ in Gold, sonst „Pause“ in Silber. Mitsingen, Übersetzung und Akkorde: Gold/Silber gilt in allen Farbschemen. <i>(G+)</i>",
    en:" <b>Play (V5.28):</b> While playing, the label is Play in gold; otherwise Pause in silver. Follow, Translation and Chords: gold/silver now show in every theme. <i>(G+)</i>",
    fr:" <b>Lecture (V5.28) :</b> Pendant la lecture, libellé Lecture en doré ; sinon Pause en argent. Couleurs visibles dans tous les thèmes. <i>(G+)</i>",
    es:" <b>Play (V5.28):</b> En reproducción, la etiqueta es Play en dorado; si no, Pausa en plata. Los colores se ven en todos los temas. <i>(G+)</i>",
    ru:" <b>Play (V5.28):</b> Во время воспроизведения надпись Play золотом, иначе Пауза серебром. Цвета видны во всех темах. <i>(G+)</i>",
    hi:" <b>Play (V5.28):</b> चलते समय सुनहरा Play, अन्यथा चाँदी Pause। सभी थीम में रंग दिखते हैं। <i>(G+)</i>",
    pt:" <b>Play (V5.28):</b> Ao tocar, o texto é Play dourado; senão Pausa prateado. As cores aparecem em todos os temas. <i>(G+)</i>",
    cz:" <b>Play (V5.28):</b> Při přehrávání nápis Play zlatě, jinak Pauza stříbrně. Barvy platí ve všech tématech. <i>(G+)</i>"
  };

  var css=document.createElement("style");
  css.id="bppV528";
  function sel(ids, extra){
    return ids.map(function(id){ return "html body button#"+id+"#"+id+extra; }).join(",");
  }
  function fsSel(ids, extra){
    return ids.map(function(id){ return "html body #bppFs #bppFsBar button#"+id+"#"+id+extra; }).join(",");
  }
  var gold="background:#D6BF90!important;color:#041236!important;border-color:#D6BF90!important;animation:none!important;opacity:1";
  var silver="background:#c5c9d0!important;color:#141820!important;border-color:#e8eaee!important;animation:none!important;opacity:1";
  var autoIds=["btnAuto","btnDe","btnCh"];
  var playIds=["btnPlay","bppFsPlay"];
  var chIds=["btnCh","bppFsCh"];
  css.textContent=
    /* Zustand Gold/Silber schlaegt Theme-Regeln html.th-* button{background:!important}
       und die theme-spezifischen Play-Farben aus V5.27 (gleiche Gold-/Silbertöne überall). */
    sel(autoIds,".act358")+","+sel(autoIds,".act358.on")+","+sel(autoIds,".act358.gold")+","+
    sel(["btnPlay"],".act358")+","+sel(["btnPlay"],".act358.on")+","+sel(["btnPlay"],".act358.gold")+","+
    fsSel(["bppFsPlay","bppFsCh","bppFsTr"],".act358")+","+
    fsSel(["bppFsPlay","bppFsCh","bppFsTr"],".act358.on")+
    "{"+gold+"}"+
    sel(chIds,".s358")+","+sel(chIds,".s358.on")+","+
    fsSel(["bppFsCh"],".s358")+","+fsSel(["bppFsCh"],".s358.on")+","+
    sel(["btnPlay"],":not(.act358)")+","+sel(["btnPlay"],":not(.act358).on")+","+sel(["btnPlay"],":not(.act358).gold")+","+
    sel(["btnPlay"],".s358")+","+sel(["btnPlay"],".bppNoRec")+","+
    fsSel(["bppFsPlay"],":not(.act358)")+","+fsSel(["bppFsPlay"],":not(.act358).on")+","+
    fsSel(["bppFsPlay"],":not(.act358).gold")+","+fsSel(["bppFsPlay"],".s358")+","+fsSel(["bppFsPlay"],".bppNoRec")+
    "{"+silver+"}"+
    /* Gross-Play: Symbol monochrom dunkel auf Gold und auf Silber */
    "html body #bppFs #bppFsBar button#bppFsPlay#bppFsPlay i.pl,"+
    "html body #bppFs #bppFsBar button#bppFsPlay#bppFsPlay.act358 i.pl,"+
    "html body #bppFs #bppFsBar button#bppFsPlay#bppFsPlay:not(.act358) i.pl"+
    "{border-color:transparent transparent transparent #041236!important}"+
    "html body #bppFs #bppFsBar button#bppFsPlay#bppFsPlay i.pa,"+
    "html body #bppFs #bppFsBar button#bppFsPlay#bppFsPlay.act358 i.pa,"+
    "html body #bppFs #bppFsBar button#bppFsPlay#bppFsPlay:not(.act358) i.pa"+
    "{border-left-color:#041236!important;border-right-color:#041236!important}"+
    "html body #bppFs #bppFsBar button#bppFsPlay#bppFsPlay svg,"+
    "html body #bppFs #bppFsBar button#bppFsPlay#bppFsPlay svg *"+
    "{fill:#041236!important;color:#041236!important}";
  document.head.appendChild(css);

  function playing(){
    try{ if(typeof isPlaying==="function") return !!isPlaying(); }catch(e){}
    try{
      var a=document.getElementById("a");
      return !!(a && a.src && !a.paused && !a.ended);
    }catch(e){}
    return false;
  }
  function labs(){
    var l=(typeof lang!=="undefined"&&PLAY[lang])?lang:"en";
    var t=PLAY[l];
    try{
      if(typeof UI==="object"&&UI[l]&&UI[l].play&&UI[l].pause){
        return {play:UI[l].play, pause:UI[l].pause};
      }
    }catch(e){}
    return t;
  }
  function setTxt(b,s){ if(!b||b.textContent===s) return; b.textContent=s; }
  function paintPlay(){
    var on=playing();
    var t=labs();
    var b=document.getElementById("btnPlay");
    if(b){
      setTxt(b, on?t.play:t.pause);
      if(!b.classList.contains("m358")) b.classList.add("m358");
      if(b.classList.contains("act358")!==on) b.classList.toggle("act358", on);
      if(b.classList.contains("s358")===on) b.classList.toggle("s358", !on);
      if(b.classList.contains("on")) b.classList.remove("on");
      if(b.classList.contains("gold")) b.classList.remove("gold");
      var ap=on?"true":"false";
      if(b.getAttribute("aria-pressed")!==ap) b.setAttribute("aria-pressed", ap);
      if(b.getAttribute("aria-label")!==b.textContent) b.setAttribute("aria-label", b.textContent);
    }
    var fs=document.getElementById("bppFsPlay");
    if(fs){
      if(!fs.classList.contains("m358")) fs.classList.add("m358");
      if(fs.classList.contains("act358")!==on) fs.classList.toggle("act358", on);
      if(fs.classList.contains("s358")===on) fs.classList.toggle("s358", !on);
      if(fs.classList.contains("on")) fs.classList.remove("on");
      if(fs.classList.contains("gold")) fs.classList.remove("gold");
    }
  }
  function help(){
    var d=document.getElementById("bppHelp"); if(!d) return;
    var l=(typeof lang!=="undefined"&&HP[lang])?lang:"en";
    var extra=HP[l]||HP.en;
    var ps=d.querySelectorAll(".in>p");
    var target=null;
    for(var i=ps.length-1;i>=0;i--){
      var tx=ps[i].textContent||"";
      if(/V5\.28|Play \(V5\.28\)/.test(tx)){ target=ps[i]; break; }
      if(/Gold\s*=|Or\s*=|Dorado\s*=|Золотой\s*=|सुनहरा\s*=|Dourado\s*=|Zlatá\s*=/.test(tx)){ target=ps[i]; break; }
    }
    if(!target){
      for(var j=ps.length-1;j>=0;j--){
        if(!ps[j].classList.contains("jg") && !ps[j].classList.contains("kb357")){ target=ps[j]; break; }
      }
    }
    if(!target) return;
    if(target.getAttribute("data-h528")===l) return;
    var base=target.getAttribute("data-h528-base");
    if(!base){
      base=target.getAttribute("data-h527-base")||target.innerHTML;
      target.setAttribute("data-h528-base",base);
    }
    /* nicht den V5.27-Hilfesatz verdoppeln: Basis + nur V5.28 */
    var cleaned=base;
    try{
      var tmp=document.createElement("div"); tmp.innerHTML=base;
      /* falls data-h527-base schon ohne 527-Satz ist, ok */
    }catch(e){}
    target.innerHTML=cleaned+extra;
    target.setAttribute("data-h528",l);
  }
  function paint(){
    try{ paintPlay(); }catch(e){}
    try{ help(); }catch(e){}
  }
  function wrap(obj,name){
    try{
      var f=obj[name]; if(typeof f!=="function"||f.__v528) return;
      var w=function(){ var r=f.apply(this,arguments); paint(); return r; };
      w.__v528=1;
      if(typeof bppWrapMarkers489==="function") try{ bppWrapMarkers489(w,f); }catch(e){}
      obj[name]=w;
    }catch(e){}
  }
  function hookAudio(){
    var a=document.getElementById("a"); if(!a||a.__v528) return;
    a.__v528=1;
    ["play","playing","pause","ended","emptied","abort"].forEach(function(ev){
      a.addEventListener(ev, function(){ paint(); });
    });
  }
  function hookAll(){
    wrap(window,"syncPlayBtn");
    wrap(window,"bppV358");
    wrap(window,"bppSync527");
    wrap(window,"togglePlay");
    hookAudio();
  }
  hookAll(); paint();
  setInterval(function(){ hookAll(); paint(); }, 200);
  document.addEventListener("click", function(){ setTimeout(paint,0); setTimeout(paint,80); }, true);
  document.addEventListener("keydown", function(){ setTimeout(paint,0); setTimeout(paint,80); }, true);
  window.bppSync528=paint;
})();
