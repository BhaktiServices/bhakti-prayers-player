/* [Grok-Bot] V4.46: (1) "Als App installieren" wieder an der alten Stelle aus V3.41: unter den Lyrics direkt neben "Prayers runterladen" (#bppSrcEnd .btns).
   Ursache: v341.js setzt den Knopf einmalig hinter #btnOffAll, egal wo der gerade steht. Laeuft v341 vor dem Umbau von v301.js (Intervall 150 ms),
   steht #btnOffAll noch in ".bar .row"; v301 holt #btnOffAll danach heraus und schiebt den Rest der alten Zeile (also #btnInstall) nach #bppL5
   (Zeile Mitlesen | Gross | Akkorde | ... | Menue+). Hier: sobald #btnOffAll in #bppSrcEnd steht, #btnInstall direkt dahinter ziehen.
   (2) "Akkorde an" (#btnCh) nur bei Menue+ (body.menu-full); Akkord-Einstellung bleibt wirksam, Taste A schaltet weiter. Grossansicht #bppFsCh: schon v384.js.
   (3) Wiederholen (#btnRep, Grossansicht #bppFsRep) immer sichtbar, auch bei Menue-; hebt nur das Verstecken aus v302m.js bzw. index.html (Grossansicht) auf.
   (5) Hilfe: K/⇧K und Quellen-Absatz ueber "Tastenkuerzel" (siehe unten).
   (4) "Mitlesen" heisst jetzt "Mitsingen" (Texte direkt in v358/seq-v176/v302h/v352/v353/v357/v367/v378/v387/v388/v389/v421; Hindi "साथ पढ़ें" -> "साथ गाएँ"). */
window.BPP_BUILD="4.46"; window.BPP_SHOW="4.46";
(function(){
  if(window.bppV446) return; window.bppV446=1;
  var st=document.createElement("style");
  st.textContent="html body:not(.menu-full) #btnCh#btnCh#btnCh#btnCh{display:none!important}"+
    "html body:not(.menu-full) .bar .r301>#btnRep#btnRep#btnRep{display:inline-flex!important}"+
    "html body:not(.menu-full) #bppFs #bppFsBar .row>#bppFsRep#bppFsRep#bppFsRep#bppFsRep#bppFsRep#bppFsRep#bppFsRep#bppFsRep#bppFsRep#bppFsRep{display:inline-flex!important;align-items:center;justify-content:center}";
  document.head.appendChild(st);
  function place(){
    var b=document.getElementById("btnInstall"), o=document.getElementById("btnOffAll"), w=document.getElementById("bppSrcEnd");
    if(!b||!o||!w||!w.contains(o)) return;
    if(o.nextElementSibling!==b) o.parentNode.insertBefore(b,o.nextSibling);
  }
  place(); setInterval(place,500);

  /* [Grok-Bot] V4.46: Hilfe - "K / ⇧K Tempo" (p.k433, v433.js) und den Quellen-Absatz aus dem Ende der Hilfe in den normalen Hilfetext direkt
     UEBER den Abschnitt "Tastenkuerzel" (div.kb357 bzw. p.kb352) setzen. Quellen-Absatz sachlich neu: Knopf "Quellen zeigen" sitzt seit V4.43 in der Fusszeile.
     Neuer Anfang "<b>In der Fußzeile:</b>" ist nicht in der Liste von v394.js, daher schiebt v394 ihn nicht mehr ans Ende. */
  var OLDQ=["Below the lyrics:","Unter den Lyrics:","Sous les paroles :","Debajo de la letra:","Под текстом:","पाठ के नीचे:","Abaixo da letra:","Pod textem:"];
  var Q={de:"<b>In der Fußzeile:</b> „Quellen zeigen“ blendet ein, woher Text und MP3 stammen (Musikheft-Hinweis).",
    en:"<b>In the footer:</b> “Show sources” shows where the text and MP3 come from (songbook note).",
    fr:"<b>Dans le pied de page :</b> « Afficher les sources » indique l’origine du texte et du MP3 (référence du carnet de chants).",
    es:"<b>En el pie de página:</b> «Mostrar fuentes» muestra de dónde proceden el texto y el MP3 (referencia del cancionero).",
    ru:"<b>Внизу страницы:</b> «Показать источники» показывает, откуда текст и MP3 (ссылка на сборник песен).",
    hi:"<b>फ़ुटर में:</b> “स्रोत दिखाएँ” बताता है कि पाठ और MP3 कहाँ से हैं (गीत-पुस्तिका संदर्भ)।",
    pt:"<b>No rodapé:</b> «Mostrar fontes» mostra de onde vêm o texto e o MP3 (referência do caderno de cantos).",
    cz:"<b>V zápatí:</b> „Ukázat zdroje“ ukáže, odkud pochází text a MP3 (odkaz na zpěvník)."};
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return Q[l]?l:"en"; }
  function help(){
    var h=document.querySelector("#bppHelp .in"); if(!h) return;
    var kb=h.querySelector(":scope>.kb357")||h.querySelector(":scope>.kb352"); if(!kb) return;
    var q=h.querySelector(":scope>p.q446");
    if(!q){ var ps=h.querySelectorAll(":scope>p"); for(var i=0;i<ps.length;i++){ var b=ps[i].firstElementChild; if(b&&b.tagName==="B"&&OLDQ.indexOf(b.textContent.trim())>=0){ q=ps[i]; q.classList.add("q446"); break; } } }
    if(q){ var t=Q[lg()]; if(q.innerHTML!==t) q.innerHTML=t; }
    /* Anker: vor h381/h379 (v381/v379 halten sich selbst direkt vor dem Tastenkuerzel-Abschnitt; so kein Hin- und Herschieben) */
    var a=h.querySelector(":scope>p.h381")||h.querySelector(":scope>p.h379")||kb;
    var k=h.querySelector(":scope>p.k433");
    if(q&&q.nextElementSibling!==a) h.insertBefore(q,a);
    if(k&&k.nextElementSibling!==(q||a)) h.insertBefore(k,q||a);
  }
  setInterval(help,250);
})();
