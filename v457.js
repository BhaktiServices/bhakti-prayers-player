/* [Grok-Bot] V4.57/V4.62: Gesamte Statistik (Aufrufe, Hoerzeit, Orte/TOP10-Liste) standardmaessig verborgen.
   Kleiner Knopf #bppStats457 unter der Fusszeile (#foot), vor #bpp-stats: Beschriftung = naechste Aktion
   ("Statistik zeigen" / "Statistik verbergen", 8 Sprachen), gold wenn offen; Zustand nur im Speicher
   (kein localStorage, Start immer zu). Beim Wegscrollen (Box #bppStatsBox457 verlaesst Viewport) wieder zu
   via IntersectionObserver. Sortier-Knopf #bppAbc443 und Taste U bleiben; Hilfe-Tipp nur hier (eine Quelle). */
window.BPP_BUILD="4.62"; window.BPP_SHOW="4.62";
(function(){
  if(window.bppV457) return; window.bppV457=1;
  var open=false;
  var LB={
    de:["Statistik zeigen","Statistik verbergen"],
    en:["Show statistics","Hide statistics"],
    fr:["Afficher les statistiques","Masquer les statistiques"],
    es:["Mostrar estadísticas","Ocultar estadísticas"],
    ru:["Показать статистику","Скрыть статистику"],
    hi:["आँकड़े दिखाएँ","आँकड़े छिपाएँ"],
    pt:["Mostrar estatísticas","Ocultar estatísticas"],
    cz:["Zobrazit statistiky","Skrýt statistiky"]
  };
  var HP={de:"<b>Statistik:</b> Knopf unter der Fußzeile = Aufrufe, Hörzeit, Orte; Wegscrollen schließt. <i>(von Grok ergänzt)</i>",en:"<b>Stats:</b> footer button = views, listen time, places; scroll away closes. <i>(added by Grok)</i>",fr:"<b>Statistiques :</b> bouton sous le pied = vues, écoute, lieux ; défiler ferme. <i>(ajouté par Grok)</i>",es:"<b>Estadísticas:</b> botón bajo el pie = visitas, escucha, lugares; al alejarse se cierra. <i>(añadido por Grok)</i>",ru:"<b>Статистика:</b> кнопка под подвалом = просмотры, время, места; уход закрывает. <i>(добавлено Grok)</i>",hi:"<b>आँकड़े:</b> फ़ुटर बटन = विज़िट, सुनना, स्थान; दूर स्क्रॉल = बंद। <i>(Grok द्वारा जोड़ा गया)</i>",pt:"<b>Estatísticas:</b> botão no rodapé = visitas, tempo, lugares; rolar para longe fecha. <i>(acrescentado pelo Grok)</i>",cz:"<b>Statistika:</b> tlačítko pod zápatím = návštěvy, poslech, místa; odscrollování zavře. <i>(doplněno Grokem)</i>"};
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"de"; return LB[l]?l:"en"; }
  var st=document.createElement("style");
  st.textContent=
    "#bppStatsBox457{padding:0;margin:0}"+
    "#bppStats457{font-size:.72rem;font-weight:inherit;line-height:1.4;cursor:pointer;"+
      "background:transparent;border:1px solid currentColor;color:inherit;border-radius:6px;"+
      "padding:1px 8px;margin:2px 12px 4px;display:inline-flex;align-items:center;gap:4px;opacity:.9}"+
    "#bppStats457:before{content:\"▥\";opacity:.75;font-size:.85em}"+
    "#bppStats457.on{background:#e0b45a!important;border-color:#e0b45a!important;color:#222!important;opacity:1}"+
    "body:not(.bpp-st-on) #bpp-stats,body:not(.bpp-st-on) #bpp-orte24,body:not(.bpp-st-on) #bppAbc443{display:none!important}"+
    "#bppHelp>div.in>p.s457{order:116}";
  document.head.appendChild(st);
  function close(){ if(!open) return; open=false; document.body.classList.remove("bpp-st-on"); paint(); }
  function paint(){
    var s=document.getElementById("bpp-stats"); if(!s||!s.parentNode) return;
    var box=document.getElementById("bppStatsBox457");
    var foot=document.getElementById("bppFoot426");
    var host=(foot&&foot.parentNode)||s.parentNode;
    if(!box){
      box=document.createElement("div"); box.id="bppStatsBox457";
      /* unter der Fusszeile: direkt nach #bppFoot426, sonst vor #bpp-stats */
      if(foot&&foot.parentNode){
        if(foot.nextSibling) foot.parentNode.insertBefore(box, foot.nextSibling);
        else foot.parentNode.appendChild(box);
      } else {
        s.parentNode.insertBefore(box,s);
      }
      var b0=document.createElement("button"); b0.type="button"; b0.id="bppStats457";
      b0.addEventListener("click",function(e){
        e.stopPropagation(); open=!open;
        document.body.classList.toggle("bpp-st-on",open);
        paint();
      });
      box.appendChild(b0);
      if(window.IntersectionObserver){
        new IntersectionObserver(function(es){
          es.forEach(function(x){ if(!x.isIntersecting) close(); });
        },{threshold:0,rootMargin:"0px"}).observe(box);
      }
      if(!window.bppStats457Scroll){
        window.bppStats457Scroll=1;
        window.addEventListener("scroll",function(){
          if(!open) return;
          var bx=document.getElementById("bppStatsBox457"); if(!bx) return;
          var rr=bx.getBoundingClientRect(), vh=window.innerHeight||0;
          if(rr.bottom<=0||rr.top>=vh) close();
        },{passive:true});
      }
    }
    /* V4.62/V4.63: strukturelle Platzierung – bei bppFootOrder463 macht das v463.js allein */
    if(!window.bppFootOrder463){
      if(foot){
        if(foot.parentNode===box){
          var par=box.parentNode;
          if(par) par.insertBefore(foot, box);
        }
        if(foot.parentNode && (box.parentNode!==foot.parentNode || foot.nextSibling!==box)){
          if(foot.nextSibling) foot.parentNode.insertBefore(box, foot.nextSibling);
          else foot.parentNode.appendChild(box);
        }
      }
      var b=document.getElementById("bppStats457");
      if(b.parentNode!==box) box.insertBefore(b,box.firstChild);
      if(s.parentNode!==box) box.appendChild(s);
      var o=document.getElementById("bpp-orte24");
      if(o&&o.parentNode!==box) box.appendChild(o);
      var abc=document.getElementById("bppAbc443");
      if(abc&&o&&abc.parentNode!==box) box.appendChild(abc);
    }
    var b=document.getElementById("bppStats457");
    if(!b) return;
    if(open){ var rr=box.getBoundingClientRect(), vh=window.innerHeight||0;
      if(rr.bottom<=0||rr.top>=vh) open=false; }
    document.body.classList.toggle("bpp-st-on",open);
    var t=(LB[lg()]||LB.en)[open?1:0];
    if(b.textContent!==t) b.textContent=t;
    if(b.title!==t) b.title=t;
    b.classList.toggle("on",open);
    b.setAttribute("aria-expanded",open?"true":"false");
  }
  function help(){
    var box=document.querySelector("#bppHelp>div.in"); if(!box) return;
    var l=lg(), t=HP[l]||HP.en;
    var p=box.querySelector("p.s457");
    if(p){ if(p.innerHTML!==t) p.innerHTML=t; return; }
    p=document.createElement("p"); p.className="s457"; p.innerHTML=t;
    box.appendChild(p);
  }
  setInterval(function(){ try{ paint(); help(); }catch(e){} },500);
  window.addEventListener("load",function(){ try{ paint(); help(); }catch(e){} });
  window.bppStatsClose457=close;
})();
