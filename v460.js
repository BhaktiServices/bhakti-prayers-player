/* [Grok-Bot] V4.60: Stil-Knopf (#bppTheme) unter die Sprachwahl, rechtsbuendig gestapelt – eine Positionsquelle.
   Kein Nebeneinander mehr (kollidierte auf schmalen Displays mit der Ueberschrift). Desktop + Handy (S9+/360px),
   alle Stile/Sprachen. Hilfe-Text zur Lage angepasst (hier, nicht parallel in v379). */
window.BPP_BUILD="4.60"; window.BPP_SHOW="4.60";
(function(){
  if(window.bppV460) return; window.bppV460=1;
  var st=document.createElement("style");
  st.id="bppSt460";
  st.textContent=
    "#bppTopRight460{position:fixed;top:8px;right:8px;z-index:110;display:flex;flex-direction:column;align-items:flex-end;gap:4px;pointer-events:none}"+
    "#bppTopRight460>*{pointer-events:auto}"+
    "#bppTopRight460 .lang.l307,#bppTopRight460 .lang{position:static!important;top:auto!important;right:auto!important;left:auto!important;transform:none!important;margin:0!important;display:flex!important;flex-direction:row!important;align-items:center!important;gap:6px!important;order:0!important}"+
    "#bppTopRight460 #bppTheme,#bppTheme{position:static!important;top:auto!important;right:auto!important;left:auto!important;transform:none!important;order:1!important;"+
      "display:inline-flex!important;align-items:center;align-self:flex-end;"+
      "background:transparent!important;border:1px solid #e0b45a!important;color:#e0b45a!important;"+
      "border-radius:6px!important;padding:0 5px!important;font-size:.72rem!important;line-height:1.25!important;"+
      "min-height:auto!important;cursor:pointer;z-index:110}"+
    "html.th-morgen #bppTheme{border-color:#5e420c!important;color:#5e420c!important}"+
    "html.th-abend #bppTheme{border-color:#e0b45a!important;color:#e0b45a!important}"+
    "@media(max-width:400px){#bppTopRight460{top:6px;right:6px;gap:3px}#bppTheme{font-size:.68rem!important;padding:0 4px!important}}header h1{padding-right:var(--bpp-tr460,56px)!important;box-sizing:border-box}@media(max-width:420px){header h1{padding-right:var(--bpp-tr460,56px)!important}}";
  document.head.appendChild(st);

  var HLP={
    de:"<b>Stil</b> (Knopf unter der Sprachwahl oben rechts): Auto, Morgen, Abend oder Nacht. <i>(von Grok ergänzt)</i>",
    en:"<b>Style</b> (button under the language selector, top right): Auto, Morning, Evening or Night. <i>(added by Grok)</i>",
    fr:"<b>Style</b> (bouton sous le sélecteur de langue, en haut à droite) : Auto, Matin, Soir ou Nuit. <i>(ajouté par Grok)</i>",
    es:"<b>Estilo</b> (botón bajo el selector de idioma, arriba a la derecha): Auto, Mañana, Tarde o Noche. <i>(añadido por Grok)</i>",
    ru:"<b>Стиль</b> (кнопка под выбором языка, вверху справа): Авто, Утро, Вечер или Ночь. <i>(добавлено Grok)</i>",
    hi:"<b>शैली</b> (भाषा चयन के नीचे, ऊपर दाईं ओर बटन): स्वतः, सुबह, शाम या रात। <i>(Grok द्वारा जोड़ा गया)</i>",
    pt:"<b>Estilo</b> (botão sob o seletor de idioma, canto superior direito): Auto, Manhã, Noite cedo ou Noite. <i>(acrescentado por Grok)</i>",
    cz:"<b>Styl</b> (tlačítko pod výběrem jazyka vpravo nahoře): Auto, Ráno, Večer nebo Noc. <i>(doplnil Grok)</i>"
  };
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"de"; return HLP[l]?l:"en"; }

  function paint(){
    var theme=document.getElementById("bppTheme");
    var langBox=document.querySelector("header .lang")||document.querySelector(".lang.l307");
    if(!theme||!langBox) return;
    var wrap=document.getElementById("bppTopRight460");
    if(!wrap){
      wrap=document.createElement("div"); wrap.id="bppTopRight460";
      (document.body||document.documentElement).appendChild(wrap);
    }
    /* Reihenfolge fest: 1) Sprachwahl oben, 2) Stil darunter (eine Quelle) */
    if(langBox.parentNode!==wrap || wrap.firstElementChild!==langBox){
      wrap.insertBefore(langBox, wrap.firstChild);
    }
    if(theme.parentNode!==wrap || wrap.lastElementChild!==theme){
      wrap.appendChild(theme);
    }
    /* Inline-Styles von aelteren Versionen (v316/v379) neutralisieren */
    theme.style.cssText="position:static;top:auto;right:auto;left:auto;transform:none;"+
      "background:transparent;border:1px solid #e0b45a;border-radius:6px;padding:0 5px;"+
      "font-size:.72rem;line-height:1.25;min-height:auto;color:#e0b45a;cursor:pointer;display:inline-flex;align-self:flex-end";
    langBox.style.setProperty("position","static","important");
    langBox.style.setProperty("top","auto","important");
    langBox.style.setProperty("right","auto","important");
    langBox.style.setProperty("transform","none","important");
    langBox.style.setProperty("order","0","important");
    theme.style.setProperty("order","1","important");
    /* Platz rechts fuer Stack, damit Ueberschrift nicht unter Stil/Sprache laeuft */
    var w=Math.ceil(wrap.getBoundingClientRect().width)+14;
    if(w<56) w=56;
    document.documentElement.style.setProperty("--bpp-tr460", w+"px");
  }

  function help(){
    var d=document.getElementById("bppHelp"); if(!d) return;
    var p=d.querySelector(".h379")||d.querySelector(".h460");
    var t=HLP[lg()];
    if(p){ if(p.innerHTML!==t){ p.className="h379 h460"; p.innerHTML=t; } return; }
    var ref=d.querySelector(".kb357")||d.querySelector(".kb352")||d.querySelector(".jg");
    p=document.createElement("p"); p.className="h379 h460"; p.innerHTML=t;
    if(ref&&ref.parentNode) ref.parentNode.insertBefore(p,ref); else { var box=d.querySelector("div.in")||d; box.appendChild(p); }
  }

  setInterval(function(){ try{ paint(); help(); }catch(e){} },200);
  window.addEventListener("load", function(){ try{ paint(); help(); }catch(e){} });
})();
