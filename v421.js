/* [Grok-Bot] V4.21: Aufklappbare "Versions-Historie" unter "Orte letzte 24 h" (#bpp-orte24). Inhalte nur aus den Commit-Messages (git log),
   auch Grok.com-Commits; Texte deutsch. Neueste oben. Knopf zeigt die naechste Aktion, gold = aufgeklappt. */
window.BPP_BUILD="4.21"; window.BPP_SHOW="4.21";
(function(){
  if(window.bppV421) return; window.bppV421=1;
  var H=[
["4.21","25.10.","Versions-Historie unter der Orte-Liste (aufklappbar)."],
["4.20","25.10.","Teilen-Link nimmt alle Einstellungen mit: Position, Tempo, Lautstärke, Aufnahme, Spalten, Akkorde. Sprache nach Browser.","SPN-Taste heißt „Rec: SPN“ und steht neben dem Titel."],
["4.19","25.10.","Rec-Taste schaltet wieder zwischen Mtj und Pbj (Aṣṭottaram, Govinda, Kavacam, Guru Stotram, Suprabhatam)."],
["4.18","25.10.","Sprache und Stil oben rechts (Grok.com). Danach: Stil-Taste flach wie Sprache, Hover erklärt „A“; Vishnu Arati SPN-Timing korrigiert."],
["4.17","24.10.","Rec-Taste hinter dem Titel, zeigt die laufende Aufnahme; Krishna Suprabhatam Rec: Pbj aus RA-MP3 (Grok.com).","Versionsprüfung über BPP_VERSION, Geräte-Zeile aus der Statistik, Hilfe-Symbol links, Titel zentriert."],
["4.16","24.10.","Krishna Suprabhatam Pbj: MP3 56 kbit/s und YouTube; Ramanuja Mangalam Rec: Mtj aus YouTube 2:25:10 (Grok.com)."],
["4.15","24.10.","Aufnahme-Tasten heißen „Rec: Pbj“ / „Rec: Mtj“; Krishna Suprabhatam unter Prabhujis (Grok.com)."],
["4.14","24.10.","Akkorde in Zeile nicht mehr im Liedtext (Groß), einheitliche Akkordgröße."],
["4.13","24.10.","„SPN live“ bei Govinda, Narasimha und Krishna Suprabhatam aus; „bisherige“ heißt jetzt „Matajis“."],
["4.12","24.10.","Groß springt nicht mehr (Hintergrundbild löste ständiges Neu-Aufbauen aus)."],
["4.11","24.10.","Groß dreht mit dem Handy (Lagesensor)."],
["4.10","24.10.","Govinda Prabhus neu geschnitten ab 35:08, ohne Suprabhatam."],
["4.09","24.10.","Quellen-Info springt nicht mehr alle 2 s; Zurückspulen der Prabhus-MP3 ohne Neustart."],
["4.08","24.10.","Prabhus-Aufnahmen für Govinda Prayer und Narasimha Kavacam, MP3 und YT."],
["4.07","23.10.","Orte letzte 24 h: Stadt (Land), Anzahl erst ab 4, je Gerät gezählt."],
["4.06","23.10.","Statistik: Starts und Geräte getrennt."],
["4.05","23.10.","Aṣṭottaram: Zusatz-Aufnahme Prabhus, 100 von 108 Namen markiert, YT-Version."],
["4.04","23.10.","Hintergrundbild ruckelfrei."],
["4.03","23.10.","Datum des SPN-Morgen-Streams korrigiert."],
["4.02","23.10.","SPN live: Zusatz-Aufnahme für 7 Morgengebete und Vishnu Arati."],
["4.01","23.10.","Groß dreht mit dem Handy."],
["4.00","23.10.","Blasses Hintergrundbild hinter den Lyrics während der Wiedergabe."],
["3.99","23.10.","Stil Auto nach Ortszeit (Sonnenauf-/-untergang)."],
["3.98","23.10.","Final Prayers Str. 21/22 Timing; Pfeiltasten im Groß wie Standard."],
["3.96–3.97","23.10.","Groß am Handy quer; Hilfe ohne Farberklärungen."],
["3.87–3.95","22.10.","Guru Stotram Prabhus, Final Prayers Sunday, Vishnu Arati mit Final Prayers, Str. 18 Lobpreisungen, Hilfe umgestellt."],
["3.79–3.86","22.10.","Drei Stile (Morgen, Abend, Nacht), Lesbarkeit, Groß mit Übersetzungs-Taste, Atma Bhog, neue Überschrift."],
["3.71–3.78","21.–22.10.","Handy quer = Groß, Orte letzte 24 h wieder sichtbar, Zeichen ✎ für Texte in Überarbeitung."],
["3.61–3.70","20.–21.10.","Akkorde in Zeile nach Heft, Sūktams mit Aufnahme, Offline-Status, Orte der letzten 24 h."],
["3.50–3.60","19.–20.10.","Portugiesisch, Tastenkürzel, Purusa Suktam und Vishnu Sahasranama mit Aufnahme, Tasten zeigen die nächste Aktion."]
  ];
  var LB={de:["Versions-Historie anzeigen","Versions-Historie ausblenden"],en:["Show version history","Hide version history"],fr:["Afficher l’historique des versions","Masquer l’historique des versions"],es:["Mostrar historial de versiones","Ocultar historial de versiones"],ru:["Показать историю версий","Скрыть историю версий"],hi:["संस्करण इतिहास दिखाएँ","संस्करण इतिहास छिपाएँ"],pt:["Mostrar histórico de versões","Ocultar histórico de versões"]};
  var st=document.createElement("style");
  st.textContent="#bppHist421{font-size:.72rem;line-height:1.4;padding:2px 12px 8px;text-align:left}"+
    "#bppHist421 button{background:transparent;border:1px solid currentColor;color:inherit;border-radius:6px;padding:1px 8px;font:inherit;cursor:pointer;opacity:.9}"+
    "#bppHist421 button.on{background:#e0b45a!important;border-color:#e0b45a!important;color:#222!important;opacity:1}"+
    "#bppHist421 ol{list-style:none;margin:6px 0 0;padding:0;max-height:50vh;overflow:auto}"+
    "#bppHist421 li{margin:0 0 4px}#bppHist421 b{white-space:nowrap}#bppHist421 small{opacity:.75}";
  document.head.appendChild(st);
  var open=false;
  function lg(){ return (typeof lang!=="undefined"&&LB[lang])?lang:"en"; }
  function esc(s){ return String(s).replace(/[&<>]/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c]; }); }
  function paint(){
    var o=document.getElementById("bpp-orte24"); if(!o||!o.parentNode) return;
    var d=document.getElementById("bppHist421");
    if(!d){ d=document.createElement("div"); d.id="bppHist421";
      var b=document.createElement("button"); b.type="button";
      b.addEventListener("click",function(e){ e.stopPropagation(); open=!open; paint(); });
      var l=document.createElement("ol"); l.lang="de";
      l.innerHTML=H.map(function(h){ return "<li><b>V"+esc(h[0])+"</b> <small>"+esc(h[1])+"</small> "+h.slice(2).map(esc).join("<br>")+"</li>"; }).join("");
      d.appendChild(b); d.appendChild(l); }
    if(d.previousSibling!==o) o.parentNode.insertBefore(d,o.nextSibling);
    var b=d.firstChild, t=LB[lg()][open?1:0];
    if(b.textContent!==t){ b.textContent=t; b.title=t; }
    b.classList.toggle("on",open); b.setAttribute("aria-expanded",open?"true":"false");
    d.lastChild.style.display=open?"":"none";
  }
  setInterval(paint,500); window.addEventListener("load",paint);
})();
