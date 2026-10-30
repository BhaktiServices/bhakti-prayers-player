/* [Grok-Bot] V4.21: Aufklappbare "Versions-Historie" unter "Orte letzte 24 h" (#bpp-orte24). Inhalte nur aus den Commit-Messages (git log),
   auch Grok.com-Commits; Texte deutsch. Neueste oben. Knopf zeigt die naechste Aktion, gold = aufgeklappt. */

(function(){
  if(window.bppV421) return; window.bppV421=1;
  var H=[
["4.72","30.10.","Support-Knopf oben links unter dem Hilfe-Knopf (?); Atma Bhog rechts unter Stil (unter Sprachwahl), zweizeilig „Atma“ / „Bhog ↗“; Positionen eine Quelle v472.js (kein Positionskampf); critical=false."],
["4.71","30.10.","Śrī Nṛsiṃha Kavaca Stotram Rec Mtj: Lyrics-Sync neu vermessen (Demucs-Energie; Whisper nur Start-Anker). sync/nrsimha-mtj.json; Str.0 MP3 8,2→9,7 s; YT getrennt (kein konstanter Offset); Pbj unverändert; unsichere Stellen ohne klaren Phrasen-Einsatz alt belassen; critical=false."],
["4.70","29.10.","Offline immer auf MP3: bei navigator.onLine false (Start + offline-Event) oder YouTube-iframe/API-Timeout ~4 s automatisch MP3, YT-Feld aus, Position übernehmen; Nutzerwahl bpp-src (YT) nicht überschreiben – bei online wiederherstellen (nicht während Play, sonst bei Pause); Cache-Miss-Meldung „Offline nicht gespeichert – bitte Prayers runterladen“; eine Stelle v470.js; critical=false."],
["4.69","29.10.","Beim Start (Seitenaufruf/Reload/PWA) immer zum Titel scrollen (scrollRestoration=manual, scrollTo(0,0) nach Laden und ~1,5 s Layout); Auto-Scroll zur aktiven Strophe bis Play oder Nutzer-Scroll unterdrückt; eine Stelle v469.js; critical=false."],
["4.68","29.10.","Media Session: Steuerleiste in Android-Benachrichtigung und iPhone-Sperrbildschirm/Kontrollzentrum (metadata Titel/Aufnahme Pbj·Mtj/Album/Artwork, play·pause·prev·next Prayer, ±30 s, seekto, Position/State); nur MP3, YouTube unverändert; eine Stelle v468.js; critical=false."],
["4.67","29.10.","Hanumān Cālīsā Rec Mtj: Sync neu vermessen (Energie/Pausen + Whisper); zu früher Sprung 2→3 behoben (buddhi @59.8 s, Refrain Rāmajī erstmals @79.4 s); Startzeiten in sync/hanuman-mtj.json, Pbj unverändert; Service Worker cached Sync-Datei; critical=false."],
["4.66","29.10.","Fusszeile: Prayers runterladen / Als App installieren unter Windows wieder klickbar (waren in #bppOff mit pointer-events:none; show() zerstoerte Buttons); Install-Hinweis Chrome/Edge Adressleiste; critical=false."],
["4.65","29.10.","Menue+ ohne Download/Install (nur Fusszeile); Statistik default ein mit Zustand merken, Fusszeilen-Knopf zeigen/ausblenden (kein Auto-Zu beim Scrollen); Trennlinie + Ueberschrift Worldwide Statistik:; critical=false."],
["4.64","28.10.","Hilfe stark gekuerzt (~1/3): Stichsaetze in allen Sprachen; Offline weiter 1. Download, 2. App; lange Zusatz-Hilfe (Wiederholen/Aufnahme/Gross/Statistik) komprimiert; critical=false."],
["4.63","28.10.","Fusszeile: eine Positionsquelle (Offline/Download/Install → Historie/Quellen/Support → Statistik); kein Button-Springen; critical=false."],
["4.62","28.10.","Menü+-Zeile: Download/Install rechts von Menü±; eine Positionsquelle (kein Blinken); Statistik-Knopf wieder unter Fußzeile; critical=false."],
["4.61","28.10.","Menü+: Prayers runterladen / Als App installieren nur solange nötig; Fußzeile „Support“; Support oben neben Hilfe (?); Taste +/=/NumpadAdd Menü+ auch nach Play→Pause; G bleibt Großansicht (nicht Menü); critical=false."],
["4.60","28.10.","Stil-Knopf unter die Sprachwahl (rechtsbündig gestapelt), keine Überlappung mit der Überschrift auf Handy/Desktop; critical=false."],
["4.59","28.10.","Auto-Update: version.json prüfen (Start/Fokus/alle 5 Min); bei neuer Version neu laden (sofort oder nach Pause; critical sofort); SW Cache-Namen APP/AUD repariert."],
["4.58","28.10.","Fix: Lautstärke nicht mehr auf 0 – ungültige/bpp-vol-0-Werte werden gelöscht; auf dem Handy kein Merken (Systemlautstärke); Desktop merkt nur Werte ab 5 %."],
["4.57","28.10.","Statistik (Aufrufe/Orte) standardmäßig verborgen; kleiner Knopf „Statistik zeigen“ darunter, gold wenn offen; beim Wegscrollen wieder zu; Sortierung U unverändert."],
["4.56","28.10.","Hanuman Rec:Pbj wieder Kanaka-MP3+YT+Marken wie V4.52 (nicht hanuman-prabhus); Hilfe Offline-Tipp oben; Lautstärke pro Stück merken."],
["4.55","27.10.","Orte in der Aufrufstatistik: Land immer in Klammern, z.B. Berlin (DE) bzw. (DE); A–Z nach Stadtname; eine Format-Quelle (bppFmtOrt)."],
["4.54","27.10.","Taste „Tagesleiste ein/aus“: Flackern behoben – einzige Beschriftungsquelle in v435 (alle Sprachen); v453-Override entfernt."],
["4.53","27.10.","Śrī Durgā Cālīsā: Sync ab Refrain 17 s; Hanumān Cālīsā: Bhavani als Rec: Mtj neben Pbj in derselben Prayer (Redirect hanuman-bhavani), Strophe 0 Mangala Mūrti + Refrain Rāmaji; Taste „Tagesleiste ein/aus“ mit zweizeiligem Tooltip."],
["4.52","27.10.","Strophen-Navigation (Scrollen/Tipp/Enter) wiederhergestellt: v434 fix() respektiert wieder holdLineUntil und bppSeekPending (Regression V4.50); Flacker-Fix Hanuman Bhavani unverändert."],
["4.51","27.10.","Hanuman Cālīsā Mataji Bhavani: Übersetzungen EN/DE/FR/ES/RU/HI/PT strophengenau nach Prathana (wie V4.33); FR/ES/RU/HI waren leer weil v433 nur id=hanuman anfasste."],
["4.50","27.10.","Aktiver Vers: genau eine Quelle aus der Abspielposition der gewählten Aufnahme (seq vor Marken); Mitsingen aus ohne automatische Markierung; Hanuman Mataji Bhavani: vollständige gemessene Abfolge, kein Flackern Str. 1/2."],
["4.49","27.10.","Hilfe neu geordnet: oben alles zum Lernen der Prayers (Auswahl, Wiedergabe, Mitsingen, Strophen, Wiederholen, Tempo, Akkorde und Übersetzung, Groß, Spalten, Aussprache), darunter die Sonderfunktionen (Menü+, Wochentage, Stil, Offline und App, Teilen, Quellen, Anregungen & Wünsche), Tastenkürzel ganz unten; mit Zwischenüberschriften."],
["4.48","27.10.","„Anregungen & Wünsche“ jetzt auch per Telegram: „Per Telegram senden“ öffnet den Bot @Bhakti1008bot mit vorbereiteter Nachricht (inkl. Version, Gebet, Sprache, Gerät); Absenden in Telegram, Weiterleitung an das Team automatisch. Hilfe ergänzt."],
["4.47","27.10.","Neuer Knopf „Anregungen & Wünsche“ in der Fußzeile: kurzes Formular (Nachricht, Name optional, schließen mit X oder Esc), „Per E-Mail senden“ öffnet das E-Mail-Programm mit vorbereiteter Nachricht an mail@universal-harmonics.com inkl. Version, Gebet, Sprache und Gerät; nichts wird gespeichert. Hilfe ergänzt."],
["4.46","27.10.","„Als App installieren“ steht wieder unter den Liedtexten neben „Prayers runterladen“; „Akkorde an“ nur noch bei Menü+ (Einstellung bleibt wirksam); Wiederholen-Knopf immer sichtbar (auch Großansicht); „Mitlesen“ heißt jetzt „Mitsingen“; Hilfe: Tempo-Taste K und „Quellen zeigen“ (Fußzeile) stehen jetzt über den Tastenkürzeln."],
["4.45","27.10.","Statistik: Knopf unter der Orte-Liste mit drei Zuständen – unsortiert (wie geliefert) → A–Z → nach Häufigkeit. Beschriftung zeigt die nächste Sortierung, gold = sortiert, Einstellung wird gemerkt; Standard nach Häufigkeit."],
["4.44","27.10.","The Govinda Prayer: Sargam (Sa Re Ga) je Zeile – aus der Aufnahme „Rec: Mtj“ gemessen (Sa = D, ? = unsicher, Punkt davor = tiefe Oktave). Knopf „Sa Re Ga“ nur bei Menü+, Standard aus, gold = an. Bei Pbj/YouTube Hinweis „Sargam nur für Mtj gemessen“."],
["4.43","27.10.","Final Prayers, 1. Strophe: Akkorde „C G“ jetzt in allen Ansichten (Standard zeigte durch eine veraltete Zeilenzuordnung „C F G“); Überschrift „Statistik“ über Aufrufe/Hörzeit/Orte; Knopf „A–Z“ an der Orte-Liste (alphabetisch ein/aus, wird gemerkt); „Quellen zeigen“ jetzt in der Fußzeile."],
["4.42","27.10.","Großbild: „Akkorde in Zeile“ richtig (gemeldet bei Hanumān Cālīsā) – je Zeile die eigenen Akkorde statt der ganzen Strophenfolge über Zeile 1; Strophen ohne Zeilenakkorde (z. B. Mukunda Mālā) wie in der Standardansicht auf die Zeilen verteilt."],
["4.41","27.10.","Aṣṭottaram, Aufnahme „Rec: Pbj“: Anzeige lief ab Name 102 nicht mehr mit – fehlende/verschobene Zeitmarken (13, 100–108) aus der Aufnahme neu gemessen. Vishwananda Gāyatrī und Gāyatrī Mantra: „(3×)“ hinter der letzten Zeile. Krishna Suprabhātam: eigene Zeitmarken je Aufnahme (Pbj/Mtj, MP3 und YouTube), Strophenwechsel genau beim ersten gesungenen Ton statt zu früh. Govinda Prayer „Rec: Mtj“: alle Strophenmarken neu gemessen (ab Strophe 15 lief die Anzeige nicht mehr mit). Durchlauf/>|/|<: wechselt der YouTube-Player selbst zum nächsten Video (z. B. Govinda → Nṛsiṃha), folgen Titel, Text und Marken jetzt mit"],
["4.40","26.10.","Pāṇḍuraṅga Āratī: Strophen in der gesungenen Reihenfolge der Aufnahme (Refrain 2×, je Strophe Zeilen 1–2 und 3–4 mit Wiederholung, Schluss-Refrain) und alle Zeitmarken neu gemessen; Taste „Wochentage“ steht jetzt direkt links neben der Spalten-Taste (nur bei Menü+) (von Grok ergänzt)"],
["4.39","26.10.","Menü „Weitere“: zeigt alles, was am gewählten Wochentag nicht im Morgen-/Abendplan steht (z. B. Vishwananda Cālīsā außer donnerstags, Lakṣmī Āratī außer freitags); was im Tagesplan steht, nicht"],
["4.38","26.10.","Vishwananda Cālīsā: Akkorde über den Silben nach Akkordblatt vom Nutzer (Dohā, Refrain, Chowpāī), Refrain „Gurudev Gurudev Srī Vishwananda Gurudev“ nach der Dohā ergänzt, Vers 2 „vāsī / śrī pīṭha nilaya nivāsī“; Alternativ-Akkorde als Hinweis (Quelle: Nutzer, Telegram #evening_prayers)"],
["4.37","26.10.","Desktop: Mausrad über dem Liedtext scrollt zuerst die Seite bis zu Fußzeile und Statistik, erst danach blättert es Strophen; die Seite springt beim Scrollen nicht mehr zur Strophe zurück (von Grok ergänzt)"],
["4.36","26.10.","Hilfe („So funktioniert der Bhakti Prayers Player“) wieder fest einspaltig, unabhängig von 1/2/3 Spalten; Erststart-Link beginnt jetzt bei t=0 (von Grok ergänzt)"],
["4.35","26.10.","Guru Stotram Rec: Pbj beginnt jetzt bei der bisherigen Sekunde 25 (neue Datei, Marken −25 s, YouTube-Start 145 s); Wiederholen-Knopf mit 5 Modi (Strophe, Prayer, Liste, Alle, Aus) – Knopf zeigt den aktuellen Modus, Hover den nächsten, ⇧R rückwärts, Modus im Teilen-Link; eigener ↻ Str.-Knopf entfällt; neuer Knopf „Wochentage“ (nur mit Menü+) blendet die Tagesleiste ein/aus (von Grok ergänzt)"],
["4.34","26.10.","Tagesleiste klein und flach, nur bei Menü+ sichtbar; Hinweis bei |< und >| blinkt nicht mehr; Strophe nach Sprüngen/Tempo allein aus Medienzeit und Marken; neue Taste „↻ Str.“ (⇧R) wiederholt eine Strophe endlos; kein Pendeln beim Scrollen mit Akkorden in der Zeile; Kavacam Pbj Marken Str. 51–55 (1015/1030/1047/1075/1108 s); Orte jetzt letzte 48 h mit Zahl der Länder"],
["4.33","26.10.","Kavacam Mtj: Str. 51 ab 14:51; Kavacam Pbj: Str. 50–51 neu gesetzt; Hanumān Cālīsā: Übersetzungen wieder an der richtigen Strophe; Tagesleiste Mo–So wieder sichtbar; Hinweis bei |< und >| mit Namen des Ziel-Prayers; Taste K / Umschalt+K wechselt die Geschwindigkeit"],
["4.31","26.10.","Akkorde in der Zeile springen nicht mehr beim Strophenwechsel; Nṛsiṁha Kavacam Rec: Pbj beginnt erst ab Sekunde 8 der Aufnahme."],
["4.30","26.10.","Hintergrundbild hinter dem Player entfernt; Anzeige flackert nicht mehr bei Übersetzung an + Akkorde in der Zeile."],
["4.29","25.10.","„Orte letzte 24 h“ nutzt jetzt drei öffentliche Server (EMQX, HiveMQ, Mosquitto) gleichzeitig: fällt einer aus, kommen die Orte über die anderen."],
["4.28","25.10.","Karte entfernt, Orte-Liste auf V4.24-Stand."],
["4.27","25.10.","Geteilter Link startet an der richtigen Stelle (z. B. 0:53) samt passender Liedzeile, für Prabhujis und Mataji; beim allerersten Öffnen startet der BPP mit Guru Stotram (Prabhujis, 10,2 s, 2 Spalten, Akkorde in der Zeile, Übersetzung, MP3); „Orte letzte 24 h“ zählt jetzt je Gerät; die Karte zeigt alle Städte der Orte-Liste (48 h) ohne eigene zweite Server-Verbindung."],
["4.26","25.10.","„Versions-Historie anzeigen“ und „Karte anzeigen“ stehen ruhig nebeneinander in einer Zeile (sprangen auf und ab); ist der Orte-Server nicht erreichbar, steht das jetzt dort statt „noch keine Daten“."],
["4.25","25.10.","Knopf „Karte anzeigen“ unter den Orten: Karte (OpenStreetMap) der Startorte der letzten 48 h, je Ort Anzahl Geräte; neue Starts speichern dazu ungefähre Koordinaten."],
["4.24","25.10.","Seite springt beim Scrollen (Fußzeile) nicht mehr zum Vers zurück, bei Mitsingen aus nie; Gāyatrī und Gaṇeśa Mantra wieder sichtbar; Nārāyaṇa Sūktam übersetzt (EN: shlokam.org)."],
["4.23","25.10.","Übersetzungen für Śrī Sūktam (EN: shlokam.org) und Bhū Sūktam (EN: shreekundli.com), weitere Sprachen von Grok ergänzt."],
["4.22","25.10.","Historie reicht bis zur ersten Version V1.0; klappt beim Wegscrollen oder nach 30 s ohne Aktion wieder zu."],
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
["3.50–3.60","19.–20.10.","Portugiesisch, Tastenkürzel, Purusa Suktam und Vishnu Sahasranama mit Aufnahme, Tasten zeigen die nächste Aktion."],
["3.41–3.49","17.–19.10.","Offline repariert (Service Worker), Hilfe aktualisiert, Atma-Bhog-Knopf, 1/2/3 Spalten, Blättern spult zur Strophe."],
["3.28–3.40","14.–16.10.","Umzug nach BhaktiServices, zentrale Versionsanzeige, Durga Calisa, Panduranga Arati, Vedic Chants, atmabhog-Optik, Ton aller MP3 bearbeitet."],
["3.10–3.27","13.–14.10.","Fortschritt beim Download, Taste P, Direktlinks + Teilen-Knopf, Hilfe-Blase, Menüs nach SVD-Heften, Final Prayers vollständig."],
["3.01–3.09","12.10.","Standardansicht neu geordnet, Hilfe-Overlay, manuelles Strophen-Blättern, Giridhari Arati in 15 Strophen."],
["2.45–2.55","12.10.","Jukebox-Start, MP3 als Standard, Überschrift BHAKTI PRAYERS PLAYER, drei Menüs Morgens/Abends/Weitere."],
["2.21–2.44","10.–11.10.","Jukebox-Zoom, kein Autostart, Play/Pause gold, Tonhöhe in Halbtönen, Arati Saprem, Wischen wechselt die Strophe."],
["2.00–2.20","7.–8.10.","Als App installierbar (PWA), Offline-Modus, Statistik (Aufrufe, Hörzeit, Orte), Android-Benachrichtigung."],
["1.81–1.99","5.–6.10.","Großbild-/Vollbild-Modus zum Mitsingen, Vorschau der nächsten Strophe, Hanuman Chalisa von Pandita Bhavani."],
["1.64–1.80","3.–4.10.","Kavaca-Text nach SNKS, Übersetzungen in 6 Sprachen, Audio ins Repo, Tempo-Auswahl, Vishnu Arati vollständig."],
["1.46–1.63","1.–2.10.","Neue Gebete (Ramanuja Mangalam, Bhajare, Hanuman Chalisa), Sprachen FR/ES/RU/HI, Tagesablauf, Morgen-/Abendgebet nach Heft."],
["1.31–1.45","30.9.–1.10.","Vierzeilige Strophen wie im Prathana-Heft, Strophe markiert, Govinda vollständig, Zeitmarken je Strophe."],
["1.1–1.30","29.–30.9.","Akkorde aus dem Musikerheft, Nrisimha Kavaca, Govinda Prayer, DE/EN, Auto-Scroll, Transposer, Lyrics in Spalten."],
["1.0","29.9.","Erste Version: Startseite, Gebetskatalog, Mukunda Mala mit YouTube und Text."]
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
  function bppRow(o){ var r=document.getElementById("bppFoot426"); if(!r){ r=document.createElement("div"); r.id="bppFoot426"; r.style.cssText="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:6px 10px;padding:0 0 8px"; } if(window.bppFootOrder463){ if(!r.parentNode){ var w=document.getElementById("bppSrcEnd")||(o&&o.parentNode)||document.body; w.appendChild(r); } return r; } /* [Grok-Bot] V4.63 */ if(r.previousSibling!==o) o.parentNode.insertBefore(r,o.nextSibling); return r; } /* [Grok-Bot] V4.26: gemeinsame feste Zeile fuer Historie (links) + Karte (rechts), kein gegenseitiges Umhaengen */
  function paint(){
    var o=document.getElementById("bpp-orte24"); if(!o||!o.parentNode) return;
    var d=document.getElementById("bppHist421");
    if(!d){ d=document.createElement("div"); d.id="bppHist421";
      var b=document.createElement("button"); b.type="button";
      b.addEventListener("click",function(e){ e.stopPropagation(); open=!open; paint(); });
      var l=document.createElement("ol"); l.lang="de";
      l.innerHTML=H.map(function(h){ return "<li><b>V"+esc(h[0])+"</b> <small>"+esc(h[1])+"</small> "+h.slice(2).map(esc).join("<br>")+"</li>"; }).join("");
      d.appendChild(b); d.appendChild(l);
      var tm=null; function arm(){ clearTimeout(tm); if(open) tm=setTimeout(function(){ open=false; paint(); },30000); }
      b.addEventListener("click",arm);
      ["scroll","touchstart","touchmove","wheel","pointerdown"].forEach(function(ev){ l.addEventListener(ev,arm,{passive:true}); });
      if(window.IntersectionObserver){ new IntersectionObserver(function(es){ es.forEach(function(x){ if(!x.isIntersecting&&open){ open=false; clearTimeout(tm); paint(); } }); }).observe(d); }
      window.bppHistClose=function(){ open=false; clearTimeout(tm); paint(); }; }
    var rw=bppRow(o); if(d.parentNode!==rw) rw.insertBefore(d,rw.firstChild); /* [Grok-Bot] V4.26 */ d.style.order="1"; d.style.flex=open?"1 1 100%":"0 1 auto";
    var b=d.firstChild, t=LB[lg()][open?1:0];
    if(b.textContent!==t){ b.textContent=t; b.title=t; }
    b.classList.toggle("on",open); b.setAttribute("aria-expanded",open?"true":"false");
    d.lastChild.style.display=open?"":"none";
  }
  setInterval(paint,500); window.addEventListener("load",paint);
})();
