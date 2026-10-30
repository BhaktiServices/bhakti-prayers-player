/* [Grok-Bot] V4.65: Statistik standardmaessig EINGEBLENDET (localStorage "bpp-st457", Default 1).
   Knopf #bppStats457 in der Fusszeile (#bppFoot426): Beschriftung = naechste Aktion
   ("Statistik ausblenden" / "Statistik zeigen"); Zustand merken. Kein Auto-Zu beim Wegscrollen.
   Styling: dezente Trennlinie oberhalb, Ueberschrift "Worldwide Statistik:", darunter die Werte.
   Positionsquelle Fusszeile bleibt v463. */
window.BPP_BUILD="4.65"; window.BPP_SHOW="4.65";
(function(){
  if(window.bppV457) return; window.bppV457=1;
  var KEY="bpp-st457";
  function loadOpen(){
    try{ var v=localStorage.getItem(KEY); if(v===null||v==="") return true; return v!=="0"; }
    catch(e){ return true; }
  }
  function saveOpen(on){ try{ localStorage.setItem(KEY, on?"1":"0"); }catch(e){} }
  var open=loadOpen();
  var LAB={
    de:["Statistik zeigen","Statistik ausblenden"],
    en:["Show statistics","Hide statistics"],
    fr:["Afficher les statistiques","Masquer les statistiques"],
    es:["Mostrar estadísticas","Ocultar estadísticas"],
    ru:["Показать статистику","Скрыть статистику"],
    hi:["आँकड़े दिखाएँ","आँकड़े छिपाएँ"],
    pt:["Mostrar estatísticas","Ocultar estatísticas"],
    cz:["Zobrazit statistiku","Skrýt statistiku"]
  };
  var HD={
    de:"Worldwide Statistik:",
    en:"Worldwide Statistics:",
    fr:"Worldwide Statistiques :",
    es:"Worldwide Estadísticas:",
    ru:"Worldwide Статистика:",
    hi:"Worldwide आँकड़े:",
    pt:"Worldwide Estatísticas:",
    cz:"Worldwide Statistiky:"
  };
  var HP={
    de:"<b>Statistik:</b> Knopf in der Fußzeile zeigt/ausblendet Aufrufe, Hörzeit, Orte; Zustand bleibt gemerkt. <i>(von Grok ergänzt)</i>",
    en:"<b>Stats:</b> footer button shows/hides views, listen time, places; state remembered. <i>(added by Grok)</i>",
    fr:"<b>Statistiques :</b> bouton pied de page affiche/masque vues, écoute, lieux ; état mémorisé. <i>(ajouté par Grok)</i>",
    es:"<b>Estadísticas:</b> botón del pie muestra/oculta visitas, escucha, lugares; estado recordado. <i>(añadido por Grok)</i>",
    ru:"<b>Статистика:</b> кнопка в подвале показывает/скрывает просмотры, время, места; состояние сохраняется. <i>(добавлено Grok)</i>",
    hi:"<b>आँकड़े:</b> फ़ुटर बटन दिखाता/छिपाता है; स्थिति याद रहती है। <i>(Grok द्वारा जोड़ा गया)</i>",
    pt:"<b>Estatísticas:</b> botão no rodapé mostra/oculta visitas, tempo, lugares; estado lembrado. <i>(acrescentado pelo Grok)</i>",
    cz:"<b>Statistika:</b> tlačítko v zápatí zobrazí/skryje návštěvy, poslech, místa; stav se pamatuje. <i>(doplněno Grokem)</i>"
  };
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"de"; return LAB[l]?l:"en"; }
  var st=document.createElement("style");
  st.id="bppSt457";
  st.textContent=
    "#bppStatsBox457{padding:0;margin:0;border-top:1px solid rgba(176,144,96,.38);margin-top:6px;padding-top:6px}"+
    "#bppStats457{font-size:.72rem;font-weight:inherit;line-height:1.4;cursor:pointer;"+
      "display:inline-flex!important;align-items:center;gap:4px;margin:2px 0 0 0!important;order:4}"+
    "#bppStats457:before{content:\"▥\";opacity:.75;font-size:.85em}"+
    "#bppStats457.on{background:#e0b45a!important;border-color:#e0b45a!important;color:#222!important;opacity:1}"+
    "body:not(.bpp-st-on) #bpp-stats,body:not(.bpp-st-on) #bpp-orte24,body:not(.bpp-st-on) #bppAbc443,body:not(.bpp-st-on) #bppStatsBox457{display:none!important}"+
    "body.bpp-st-on #bppStatsBox457{display:block!important}"+
    /* V4.65: Worldwide-Ueberschrift statt altem "Statistik" (v443); ohne UPPERCASE */
    "#bpp-stats::before{content:attr(data-h465)!important;display:block!important;text-align:left!important;"+
      "font-size:.82rem!important;font-weight:700!important;letter-spacing:.02em!important;"+
      "text-transform:none!important;opacity:.9!important;margin:0 0 4px!important;color:inherit}"+
    "#bpp-stats{text-align:left!important}";
  document.head.appendChild(st);

  function ensure(){
    var s=document.getElementById("bpp-stats"); if(!s||!s.parentNode) return;
    var box=document.getElementById("bppStatsBox457");
    if(!box){
      box=document.createElement("div"); box.id="bppStatsBox457";
      var foot=document.getElementById("bppFoot426");
      if(foot&&foot.parentNode) foot.parentNode.insertBefore(box, foot.nextSibling);
      else s.parentNode.insertBefore(box, s);
    }
    if(s.parentNode!==box) box.appendChild(s);
    var o=document.getElementById("bpp-orte24"); if(o&&o.parentNode!==box) box.appendChild(o);
    var a=document.getElementById("bppAbc443"); if(a&&a.parentNode!==box) box.appendChild(a);

    var b=document.getElementById("bppStats457");
    if(!b){
      b=document.createElement("button"); b.type="button"; b.id="bppStats457";
      b.addEventListener("click",function(e){
        e.preventDefault(); e.stopPropagation();
        open=!open; saveOpen(open); apply();
      });
    }
    /* Knopf-Platz: v475 (Nachfolger v463) ist Positionsquelle; sonst Fusszeile.
       Bei v475: Knopf trotzdem in DOM haengen (body, vor Box), sonst bleibt er Waise. */
    if(!window.bppFootOrder475){
      var foot=document.getElementById("bppFoot426");
      if(foot){
        if(b.parentNode!==foot) foot.appendChild(b);
      } else if(!b.parentNode && box){
        box.insertBefore(b, box.firstChild);
      }
    } else if(!b.parentNode){
      if(box && box.parentNode) box.parentNode.insertBefore(b, box);
      else document.body.appendChild(b);
    }
  }

  function apply(){
    ensure();
    document.body.classList.toggle("bpp-st-on", !!open);
    var b=document.getElementById("bppStats457");
    var l=lg(), labs=LAB[l]||LAB.en;
    if(b){
      var txt=open?labs[1]:labs[0]; /* naechste Aktion */
      if(b.textContent!==txt) b.textContent=txt;
      b.classList.toggle("on", !!open);
      b.setAttribute("aria-pressed", open?"true":"false");
      b.title=txt;
    }
    var s=document.getElementById("bpp-stats");
    if(s){
      var h=HD[l]||HD.en;
      if(s.getAttribute("data-h465")!==h) s.setAttribute("data-h465", h);
      /* alte v443-Ueberschrift neutralisieren */
      if(s.getAttribute("data-h443")!==h) s.setAttribute("data-h443", h);
    }
  }

  function injectHelp(){
    try{
      if(typeof H!=="object"||!H) return;
      var l, t;
      for(l in HP){ if(!H[l]||H[l].indexOf("bppH457")>=0) continue;
        t=HP[l]; H[l]+=(/\n\n|\n$/.test(H[l])?"":"\n\n")+"<span data-bpp=\"bppH457\">"+t+"</span>"; }
    }catch(e){}
  }

  window.bppStatsClose457=function(){ /* no-op: kein Auto-Zu mehr */ };
  window.bppStatsOpen457=function(){ open=true; saveOpen(true); apply(); };
  window.bppStatsIsOpen457=function(){ return !!open; };

  setInterval(function(){ try{ apply(); injectHelp(); }catch(e){} }, 400);
  window.addEventListener("load", function(){ open=loadOpen(); apply(); });
  if(document.body) apply();
})();
