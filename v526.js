/* [Grok-Bot] V5.26: Mitsingen, Übersetzung, Akkorde und Tagesleiste behalten ihren Namen;
   der Zustand steht nur in der Farbe (Gold = an; Akkorde: aus = Standard, über der Strophe = Silber,
   in der Zeile = Gold). Reihenfolge Akkorde unverändert: aus → über der Strophe → in der Zeile → aus.
   Standardansicht, Groß (Menü+) und Hilfe. critical=false. */
window.BPP_BUILD="5.26"; window.BPP_SHOW="5.26";
(function(){
  if(window.bppV526) return; window.bppV526=1;

  var LAB={
    de:{auto:"Mitsingen",tr:"Übersetzung",ch:"Akkorde",day:"Tagesleiste"},
    en:{auto:"Follow",tr:"Translation",ch:"Chords",day:"Day bar"},
    fr:{auto:"Suivre",tr:"Traduction",ch:"Accords",day:"Barre du jour"},
    es:{auto:"Seguir",tr:"Traducción",ch:"Acordes",day:"Barra del día"},
    ru:{auto:"Следить",tr:"Перевод",ch:"Аккорды",day:"Лента дня"},
    hi:{auto:"साथ गाएँ",tr:"अनुवाद",ch:"कॉर्ड",day:"दिन पट्टी"},
    pt:{auto:"Acompanhar",tr:"Tradução",ch:"Acordes",day:"Barra do dia"},
    cz:{auto:"Sledovat",tr:"Překlad",ch:"Akordy",day:"Lišta dne"}
  };
  /* neue Hilfesätze (G+); Namen der Knöpfe aus bestehenden UI-Texten */
  var HP={
    de:" <b>Mitsingen, Übersetzung, Akkorde, Tagesleiste:</b> Der Name bleibt; Gold = an. Bei Akkorde: Silber = über der Strophe, Gold = in der Zeile. <i>(G+)</i>",
    en:" <b>Follow, Translation, Chords, Day bar:</b> The name stays; gold = on. For Chords: silver = above the stanza, gold = in the line. <i>(G+)</i>",
    fr:" <b>Suivre, Traduction, Accords, Barre du jour :</b> Le nom reste ; doré = activé. Accords : argent = au-dessus de la strophe, doré = dans la ligne. <i>(G+)</i>",
    es:" <b>Seguir, Traducción, Acordes, Barra del día:</b> El nombre no cambia; dorado = activado. Acordes: plata = sobre la estrofa, dorado = en la línea. <i>(G+)</i>",
    ru:" <b>Следить, Перевод, Аккорды, Лента дня:</b> Название остаётся; золото = вкл. Для аккордов: серебро = над строфой, золото = в строке. <i>(G+)</i>",
    hi:" <b>साथ गाएँ, अनुवाद, कॉर्ड, दिन पट्टी:</b> नाम वही रहता है; सुनहरा = चालू। कॉर्ड: चाँदी = श्लोक के ऊपर, सुनहरा = पंक्ति में। <i>(G+)</i>",
    pt:" <b>Acompanhar, Tradução, Acordes, Barra do dia:</b> O nome permanece; dourado = ligado. Acordes: prata = acima da estrofe, dourado = na linha. <i>(G+)</i>",
    cz:" <b>Sledovat, Překlad, Akordy, Lišta dne:</b> Název zůstává; zlatá = zapnuto. Akordy: stříbrná = nad slokou, zlatá = v řádku. <i>(G+)</i>"
  };

  var css=document.createElement("style");
  css.id="bppV526";
  var C="#bppFsCh#bppFsCh#bppFsCh#bppFsCh#bppFsCh#bppFsCh#bppFsCh#bppFsCh", X="#bppFsTr#bppFsTr#bppFsTr#bppFsTr#bppFsTr#bppFsTr#bppFsTr#bppFsTr";
  function sel(id, cls){ return "html body #bppFs #bppFsBar .row>"+id+cls; }
  css.textContent=
    sel(C,".line")+","+sel(C,".on.line")+
    "{outline:none!important}"+
    sel(C,".act358")+","+sel(C,".act358.on")+","+sel(C,".act358.line")+","+sel(C,".act358.on.line")+","+
    sel(X,".act358")+","+sel(X,".act358.on")+
    "{background:#D6BF90!important;color:#041236!important;border-color:#D6BF90!important;outline:none!important;animation:none!important}"+
    sel(C,".s358")+","+sel(C,".s358.on")+","+sel(C,".s358.line")+
    "{background:#c5c9d0!important;color:#141820!important;border-color:#e8eaee!important;outline:none!important;animation:none!important}";
  document.head.appendChild(css);

  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return LAB[l]?l:"en"; }
  function $(id){ return document.getElementById(id); }
  function setTxt(b,s){ if(!b||b.textContent===s) return; b.textContent=s; }
  function lv(b,n){
    if(!b) return;
    if(!b.classList.contains("m358")) b.classList.add("m358");
    if(b.classList.contains("act358")!==(n===2)) b.classList.toggle("act358",n===2);
    if(b.classList.contains("s358")!==(n===1)) b.classList.toggle("s358",n===1);
    if(n){ if(b.classList.contains("on")) b.classList.remove("on"); if(b.classList.contains("gold")&&b.id!=="btnWd435") b.classList.remove("gold"); }
    var ap=n?"true":"false"; if(b.getAttribute("aria-pressed")!==ap) b.setAttribute("aria-pressed",ap);
  }

  function paintBtns(){
    var t=LAB[lg()], cm=(typeof chMode!=="undefined")?chMode:"aus";
    var au=typeof autoScroll!=="undefined"&&!!autoScroll;
    var de=typeof showDe!=="undefined"&&!!showDe;
    var chLv=cm==="akk"?1:(cm==="zeile"?2:0);

    var ba=$("btnAuto"); if(ba){ setTxt(ba,t.auto); lv(ba,au?2:0); if(ba.getAttribute("aria-label")!==t.auto) ba.setAttribute("aria-label",t.auto); }
    var bd=$("btnDe"); if(bd){ setTxt(bd,t.tr); lv(bd,de?2:0); if(bd.getAttribute("aria-label")!==t.tr) bd.setAttribute("aria-label",t.tr); }
    var bc=$("btnCh"); if(bc){ setTxt(bc,t.ch); lv(bc,chLv); if(bc.getAttribute("aria-label")!==t.ch) bc.setAttribute("aria-label",t.ch); }

    var wd=$("btnWd435");
    if(wd){
      setTxt(wd,t.day);
      if(wd.getAttribute("aria-label")!==t.day) wd.setAttribute("aria-label",t.day);
      /* Gold bleibt über v435 (.gold); Label fest */
    }

    /* Groß: dieselben Namen und Farben, statt ♯ / Aa */
    var fc=$("bppFsCh");
    if(fc){
      setTxt(fc,t.ch);
      if(!fc.classList.contains("m358")) fc.classList.add("m358");
      if(fc.classList.contains("act358")!==(chLv===2)) fc.classList.toggle("act358",chLv===2);
      if(fc.classList.contains("s358")!==(chLv===1)) fc.classList.toggle("s358",chLv===1);
      if(fc.getAttribute("aria-label")!==t.ch) fc.setAttribute("aria-label",t.ch);
      if(fc.title!==t.ch) fc.title=t.ch;
    }
    var ft=$("bppFsTr");
    if(ft){
      var on=!!(typeof showDe!=="undefined"&&showDe);
      setTxt(ft,t.tr);
      if(!ft.classList.contains("m358")) ft.classList.add("m358");
      if(ft.classList.contains("act358")!==on) ft.classList.toggle("act358",on);
      if(ft.classList.contains("s358")) ft.classList.remove("s358");
      if(ft.getAttribute("aria-label")!==t.tr) ft.setAttribute("aria-label",t.tr);
      if(ft.title!==t.tr) ft.title=t.tr;
    }
  }

  function help(){
    var d=$("bppHelp"); if(!d) return;
    var l=lg(), extra=HP[l]||HP.en;
    var ps=d.querySelectorAll(".in>p");
    var target=null;
    for(var i=ps.length-1;i>=0;i--){
      var tx=ps[i].textContent||"";
      if(/Gold\s*=|Or\s*=|Dorado\s*=|Золотой\s*=|सुनहरा\s*=|Dourado\s*=|Zlatá\s*=/.test(tx) || /\(G\+\)\s*=/.test(tx) && /Gold|Or|Dorado|Zlatá/.test(tx)){
        target=ps[i]; break;
      }
    }
    if(!target){
      for(var j=ps.length-1;j>=0;j--){ if(!ps[j].classList.contains("jg") && !ps[j].classList.contains("wd435") && !ps[j].classList.contains("kb357")){ target=ps[j]; break; } }
    }
    if(!target) return;
    if(target.getAttribute("data-h526")===l) return;
    var base=target.getAttribute("data-h526-base");
    if(!base){ base=target.innerHTML; target.setAttribute("data-h526-base",base); }
    target.innerHTML=base+extra;
    target.setAttribute("data-h526",l);
  }

  function paint(){ try{ paintBtns(); help(); }catch(e){} }

  function wrap(obj,name){
    try{
      var f=obj[name]; if(typeof f!=="function"||f.__v526) return;
      var w=function(){ var r=f.apply(this,arguments); paint(); return r; };
      w.__v526=1;
      if(typeof bppWrapMarkers489==="function") try{ bppWrapMarkers489(w,f); }catch(e){}
      obj[name]=w;
    }catch(e){}
  }
  function wrapAll(){
    wrap(window,"bppV358");
    wrap(window,"applyUI");
    wrap(window,"toggleCh");
    wrap(window,"toggleDe");
    wrap(window,"toggleAuto");
  }

  wrapAll(); paint();
  setInterval(function(){ wrapAll(); paint(); }, 200);
  document.addEventListener("click",function(){ setTimeout(paint,0); setTimeout(paint,80); },true);
})();
