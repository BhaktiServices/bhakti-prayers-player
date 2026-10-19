/* [Grok-Bot] V1.53: Vorlauf auf 0,5 s verkuerzt (war 1,5 s, zu frueh). Beim Start eines Prayers springt das Strophenfenster zur Strophe, die zur Abspielstelle passt (Anfang = Strophe 1). */
/* [Grok-Bot] V1.52: Autoscroll wechselt 1,5 s vor dem Strophenanfang, damit man die neue Strophe noch lesen kann.
   YouTube: Autoscroll laeuft nur, solange das Video wirklich spielt (Status vom YouTube-Player), Pause haelt ihn an. */
(function(){
  var LEAD=0.5, inAuto=false;
  var sp=window.songProgress, al=window.autoLineFromTime, sy=window.showYt;
  if(typeof sp==="function"){ window.songProgress=function(){ var p=sp.apply(this, arguments); if(p && inAuto){ p.t=Math.min(p.t+LEAD, Math.max(0, p.dur-0.1)); } return p; }; }
  if(typeof al==="function"){ window.autoLineFromTime=function(){ inAuto=true; try{ return al.apply(this, arguments); } finally { inAuto=false; } }; }
  if(typeof sy==="function"){
    window.showYt=function(){ ytTime=null; ytDur=null; var r=sy.apply(this, arguments); syncPlayBtn(); return r; }; /* [Grok.com] nicht auf Pause zwingen */
  }
  function setState(s){
    if(typeof s!=="number" || typeof ytOn==="undefined" || !ytOn) return;
    var on=(s===1);
    if(on!==ytPlaying){ ytPlaying=on; if(on){ try{ markPlayOrigin(); }catch(e){} } syncPlayBtn(); }
  }
  window.addEventListener("message", function(e){
    var d=e.data;
    if(typeof d==="string"){ try{ d=JSON.parse(d); }catch(err){ return; } }
    if(!d) return;
    if(d.event==="onStateChange") setState(d.info);
    if(d.event==="infoDelivery" && d.info) setState(d.info.playerState);
  });
  function pinNow(){
    var panel=document.getElementById("lyrics"); if(!panel) return;
    var on=panel.querySelector(".stanza.on"); if(!on) return;
    var pr=panel.getBoundingClientRect(), r=on.getBoundingClientRect(), cs=getComputedStyle(panel);
    if(panel.scrollWidth>panel.clientWidth+4) panel.scrollLeft+=r.left-pr.left-parseFloat(cs.paddingLeft||0);
    else panel.scrollTop+=r.top-pr.top-parseFloat(cs.paddingTop||0);
  }
  function syncFromTime(){
    if(typeof ytOn==="undefined" || typeof line==="undefined") return false;
    if(typeof i==="undefined" || i<0) return true;
    if(!ytOn){
      if(!(a.src && isFinite(a.duration) && a.duration>=8)) return false;
      if(pendingSeek>=3 && (a.currentTime||0)<1) return false;
    } else if(typeof ytTime!=="number") return false;
    var p=songProgress(); if(!p || !p.gs || !p.gs.length) return true;
    var k=stanzaFromProgress(p); if(k<0) k=0; if(k>p.gs.length-1) k=p.gs.length-1;
    var start=p.gs[k].start;
    if(start!==line){ line=start; persistNow(); paintLyrics(); }
    pinNow(); return true;
  }
  var timer=null;
  document.addEventListener("DOMContentLoaded", function(){ var pl=window.play; if(typeof pl==="function"){ window.play=function(){
    var r=pl.apply(this, arguments);
    var P=PRAYERS[i];
    if(P && (P.audio || P.youtube) && !(pendingSeek>=3) && line!==0){ line=0; persistNow(); paintLyrics(); }
    [60,400,1200].forEach(function(t){ setTimeout(pinNow, t); });
    if(timer) clearInterval(timer);
    var n=0; timer=setInterval(function(){ n++; if(syncFromTime() || n>30){ clearInterval(timer); timer=null; } }, 300);
    return r;
  }; }
    if(typeof i!=="undefined" && i>=0){ var n0=0, t0=setInterval(function(){ n0++; if(syncFromTime() || n0>30) clearInterval(t0); }, 300); }
  });
  window.addEventListener("load", function(){ setTimeout(pinNow, 300); });
  setInterval(function(){ if(typeof ytOn!=="undefined" && ytOn && typeof yt!=="undefined"){ try{ yt.contentWindow.postMessage(JSON.stringify({event:"listening",id:1}),"*"); }catch(e){} } }, 1500);
})();
/* [Grok-Bot] V1.72: Guru-Stotram-Uebersetzung (Prathana SVD) und Listen-Reihenfolge nach SVD-Inhalt, synchron nachgeladen vor dem Seitenskript. */
if(document.readyState==="loading"){ document.write('<script src="tr-v172.js?v=177"><\/script>'); }
/* [Grok-Bot] V1.73: Morgen-/Abendliste nach dem SVD-Inhaltsverzeichnis (Override der Anordnung aus listview.js). */
if(document.readyState==="loading"){ document.write('<script src="plan-v173.js?v=333"><\/script>'); }
/* [Grok-Bot] V1.74: Suprabhatam- und Govinda-Uebersetzungen nach Prathana SVD, Wochentag-Knoepfe ausgeblendet. */
if(document.readyState==="loading"){ document.write('<script src="tr-v174.js?v=177"><\/script>'); }
/* [Grok-Bot] V1.75: Tempo-Auswahl fuer die MP3-Wiedergabe (je Prayer gemerkt, Tonhoehe bleibt). */
if(document.readyState==="loading"){ document.write('<script src="rate-v175.js?v=177"><\/script>'); }
/* [Grok-Bot] V1.76: Zeitmarken als Abfolge [Zeit, Strophe] (Narasimha mit Ruecksprung 4->3), Taste "Mitlesen", Tasten -/+ nur wo sie wirken. */
if(document.readyState==="loading"){ document.write('<script src="seq-v176.js?v=177"><\/script>'); }
/* [Grok-Bot] V1.77: Schutz gegen Seitenfehler bei langsamer Verbindung: Zeitgeber in autoscroll.js und follow.js warten, bis autoScroll, ytOn, i und line definiert sind.
   Dazu v177.js: Tasten -/+ ueberall aus, Bhajare-Text und -Abfolge, Versionspruefung (version.json). Zusatzdateien mit ?v=177, damit kein alter Stand aus dem Cache kommt. */
if(document.readyState==="loading"){ document.write('<script src="v177.js?v=177"><\/script>'); }
/* [Grok-Bot] V1.78: Akkorde Giridhari Arati und Vishnu Arati Str. 2-9 nach "Morning Prayer SVD with Chords" (v178.js). */
if(document.readyState==="loading"){ document.write('<script src="v178.js?v=178"><\/script>'); }
/* [Grok-Bot] V1.79: Hanuman Chalisa Uebersetzung nach SVD-Heft S. 46-48, Vishnu Arati Str. 1 Akkorde Musikerheft, Giridhari Arati mit Ton (v179.js). */
if(document.readyState==="loading"){ document.write('<script src="v179.js?v=179"><\/script>'); }
/* [Grok-Bot] V1.80: Giridhari Arati mit den Mira-Strophen der Aufnahme, Uebersetzung und Abfolge (v180.js). */
if(document.readyState==="loading"){ document.write('<script src="v180.js?v=180"><\/script>'); }
/* [Grok-Bot] V1.81-V1.83: Ganzseiten-Modus zum Mitlesen (v183.js ersetzt v181/v182: Ende-Bildschirm, voriges/naechstes Prayer, Wiederholen). */
if(document.readyState==="loading"){ document.write('<script src="v183.js?v=347"><\/script>'); }
/* [Grok-Bot] V1.84: Govinda-MP3 (CD, gleiche Melodie wie YouTube) und voriges/naechstes Prayer im Vollbild immer sichtbar (v184.js). */
if(document.readyState==="loading"){ document.write('<script src="v184.js?v=184"><\/script>'); }
/* [Grok-Bot] V1.85-V1.87: Mitlesen (Ashtotram Name fuer Name, geschaetzte Marken je Quelle, alte Strophen-Tipps entschaerft), Vollbild-Menue nur nach Tippen,
   V1.87: Strophenwechsel am Ende des Gesangs (Pausentabelle), gemessene Marken Ashtotram, Vaishnava Mantra, Kavaca (v187.js ersetzt v186.js). */
if(document.readyState==="loading"){ document.write('<script src="v187.js?v=187"><\/script>'); }
/* V1.88: Mitlesen haelt an, solange die MP3 noch laedt (v188.js). */
if(document.readyState==="loading"){ document.write('<script src="v188.js?v=188"><\/script>'); }
/* [Grok-Bot] V1.89: Grossbild-Vorschau der ersten Zeile der naechsten Strophe bzw. des naechsten Teils waehrend der letzten Zeile, Ashtotram im Grossbild als Laufband,
   Tastenfarben einheitlich (gold = an/aktiv) und einfarbige Symbole (v189.js; v183.js?v=189 mit Symbolen und Teilwechsel-Haken). */
if(document.readyState==="loading"){ document.write('<script src="v189.js?v=191"><\/script>'); }
/* [Grok-Bot] V1.90: Grossbild teilt lange Strophen nur, wenn die Schrift dadurch wirklich groesser wird (v190.js; v183.js?v=190 mit Haken bppFsSplitOk). */
if(document.readyState==="loading"){ document.write('<script src="v190.js?v=190"><\/script>'); }
/* [Grok-Bot] V1.91: Grossbild-Vorschau in voller Groesse (65 %), Strophe gleitet waehrend der letzten Zeile hoch, nahtloser Wechsel (v191.js; v189.js?v=191). */
/* V1.95: v191.js wird nicht mehr geladen (ersetzt durch v195.js). */
/* [Grok-Bot] V1.93: Hotfix – v192.js (Klicksperre im Grossbild-Menue) wird nicht mehr geladen, sie blockierte auf echten Handys alle Tasten. Stand wie V1.91 (v193.js setzt nur die Version). */
if(document.readyState==="loading"){ document.write('<script src="v193.js?v=193"><\/script>'); }
/* [Grok-Bot] V1.94: Grossbild-Menue: nur der Klick des Oeffnungs-Tipps wird verworfen, keine Sperre/pointer-events, Leiste bleibt 6 s nach letzter Beruehrung (v194.js; v192.js bleibt aus).
   Vorschauzeile 88 % statt 65 % Deckkraft (v191.js?v=194). */
if(document.readyState==="loading"){ document.write('<script src="v194.js?v=202"><\/script>'); }
/* [Grok-Bot] V1.95: Grossbild – die ganze naechste Strophe faehrt waehrend der letzten Zeile von unten hoch, nahtloser Wechsel (v195.js ersetzt v191.js);
   Quellenwahl als Zweier-Auswahl "YT | MP3". Laufband (v189) und Tastenschutz (v194) unveraendert. */
if(document.readyState==="loading"){ document.write('<script src="v195.js?v=196"><\/script>'); }
/* [Grok-Bot] V1.96: Kavaca Stotram - Strophenzeiten MP3 und YouTube neu gemessen (Abfolge + Pausentabelle), alte Strophen-Tipps ohne Wirkung. */
if(document.readyState==="loading"){ document.write('<script src="v196.js?v=196"><\/script>'); }
/* [Grok.com] V1.98: Hanuman Chalisa spielt die Bhavani-Datei. BPP_BUILD muss nach v196 stehen, sonst setzt v177 die Anzeige wieder auf 1.96. */
if(document.readyState==="loading"){ document.write('<script src="v198.js?v=198"><\/script>'); }
/* [Grok-Bot] V1.99: Hanuman Chalisa - Zeitmarken der neuen MP3 (Pandita Bhavani) gemessen, feste Abfolge mit Refrain, Pausentabelle (v199.js). */
if(document.readyState==="loading"){ document.write('<script src="v199.js?v=199"><\/script>'); }
/* [Grok-Bot] V2.00: Hanuman Chalisa - Refrain "ramaji se rama rama kahiyo" (2x) als eigene Strophe nach jeder 2. Strophe, letzte Zeile jeder 2. Strophe 2x, Abfolge angepasst (v200.js). */
if(document.readyState==="loading"){ document.write('<script src="v200.js?v=203"><\/script>'); }
/* [Grok-Bot] V2.01: App-Installation (manifest.json, sw.js, Symbole), Media Session fuer Benachrichtigung/Sperrbildschirm, Play-Tasten oben in der Leiste (v201.js). */
if(document.readyState==="loading"){ document.write('<script src="v201.js?v=203"><\/script>'); }
/* [Grok-Bot] V2.02: Grossbild-Tippmenue blendet schneller aus: 4 s nach letzter Beruehrung, 1,5 s nach Tastendruck (v194.js?v=202, v202.js). */
if(document.readyState==="loading"){ document.write('<script src="v202.js?v=202"><\/script>'); }
/* [Grok-Bot] V2.03: Offline - App-Dateien und alle MP3 aus audio/ im Cache (Service Worker sw.js?v=203, Range fuer Spulen), Fortschritt "Offline: n/N" (v203.js). */
if(document.readyState==="loading"){ document.write('<script src="v203.js?v=333"><\/script>'); }
/* [Grok-Bot] V2.04: Statistik wie im Tadatmya-Vedanta-Player (Aufrufe, Hoerzeit, Orte, aktiv in TOP 10), Namensraum bpp-clbuerger- (v204.js). */
if(document.readyState==="loading"){ document.write('<script src="v204.js?v=205"><\/script>'); }
/* [Grok-Bot] V2.05: Android-Benachrichtigung/Sperrbildschirm: Media Session mit PNG-Artwork, Status, Position, Handlern, laufend aktualisiert (v205.js). */
if(document.readyState==="loading"){ document.write('<script src="v205.js?v=206"><\/script>'); }
/* [Grok-Bot] V2.06: Wiederholen ganze Liste und Ende-Angebot "Naechstes" laufen durch alle Gebete (v183.js?v=213, v206.js). */
if(document.readyState==="loading"){ document.write('<script src="v206.js?v=206"><\/script>'); }
/* [Grok-Bot] V2.07: Spultasten -30 -10 +10 +30 auch im Grossbild, Strophe zurueck/vor mit eigenen Symbolen, Offline-Fehler mit Dateinamen (v207.js, v203.js?v=207). */
if(document.readyState==="loading"){ document.write('<script src="v207.js?v=207"><\/script>'); }
/* [Grok-Bot] V2.08: Neustart laedt nur fehlende/geaenderte MP3 (Groesse per HEAD statt ETag), Offline-Stand sofort sichtbar (v203.js?v=208, v208.js). */
if(document.readyState==="loading"){ document.write('<script src="v208.js?v=208"><\/script>'); }
/* [Grok-Bot] V2.09: Strophentasten (Leiste und Grossbild) und Tastatur V/N entfernt, keine manuellen Strophen-Overrides mehr (v209.js). */
if(document.readyState==="loading"){ document.write('<script src="v209.js?v=220"><\/script>'); }
/* [Grok.com] V2.10: Guru Stotram Abend, Om am Anfang ist keine Strophe, Autotiming neu (v210.js). */
if(document.readyState==="loading"){ document.write('<script src="v210.js?v=220"><\/script>'); }
/* [Grok-Bot] V2.20: Guru Stotram Abend und Morgen - Om keine Strophe, Strophenzeiten gemessen (Abfolge + Pausentabelle), alte Tipps geloescht; Service Worker repariert (v220.js). */
if(document.readyState==="loading"){ document.write('<script src="v220.js?v=220"><\/script>'); }
