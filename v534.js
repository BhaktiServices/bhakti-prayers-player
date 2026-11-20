/* [Grok-Bot] V5.34: Groß bleibt bei der Aufnahme und passt in die Breite (Meldung: Nṛsiṁha Kavaca, Groß, Handy –
   „Synch bleibt einfach stehen“, Zeilen rechts abgeschnitten).
   Befund: Timings beider Aufnahmen vollständig (55/55), am Desktop und in der Handy-Nachstellung (412×915, 478×1024,
   360×780, 915×412, Drehen/Lagesensor) lief Groß über Strophe 10 hinaus. Das Bild vom Handy zeigt eine Schrift, die für
   Querformat berechnet war, im Hochformat – also eine Groß-Darstellung, die nach dem Drehen nicht neu gezeichnet wurde.
   Sicherheitsnetz (ohne Daten, Timings, Layout oder Knopffarben zu ändern):
   - Strophe: Zeigt Groß beim Abspielen mit Mitlesen länger als 1,5 s eine andere Strophe als die zur Medienzeit
     (bppStanzaNow) und gibt es keine frische Handbedienung, wird Groß neu gezeichnet; hilft das nicht, neu eingepasst.
   - Breite/Höhe: Ragt der Groß-Text über die Bühne hinaus (z. B. nach dem Drehen), wird einmal neu eingepasst.
   - Fehler beim Zeichnen werden in window.bppFsErr534 vermerkt (Diagnose). critical=true. */
window.BPP_BUILD="5.34"; window.BPP_SHOW="5.34";
(function(){
  if(window.bppV534) return; window.bppV534=1;
  var misSince=0, misTries=0, lastRefit=0, fitDone={}, manualSeen=0, manualK=null;
  function now(){ return Date.now(); }
  function fsOn(){ try{ var s=window.bppFsState&&window.bppFsState(); return s&&s.on?s:null; }catch(e){ return null; } }
  function playing(){ try{ return typeof isPlaying==="function"&&!!isPlaying(); }catch(e){ return false; } }
  function autoOn(){ try{ return typeof autoScroll!=="undefined"&&!!autoScroll; }catch(e){ return false; } }
  function note(e){ try{ window.bppFsErr534={at:now(), msg:String(e&&e.message||e).slice(0,200)}; }catch(x){} }
  function draw(){ try{ if(typeof window.bppFsDraw==="function") window.bppFsDraw(true); }catch(e){ note(e); } }
  /* Neu einpassen: v183 leert seinen Schriftgrößen-Cache nur bei resize */
  function refit(){ if(now()-lastRefit<1500) return false; lastRefit=now(); try{ window.dispatchEvent(new Event("resize")); }catch(e){ note(e); } return true; }
  function manualActive(tk){
    var m=+window.bppManualAt||0;
    if(m && m!==manualSeen){ manualSeen=m; manualK=tk; }
    if(!m) return false;
    if(now()-m<4000) return true;
    return manualK!=null && tk===manualK && now()-m<120000; /* manuell geblättert: Vorrang bis zum nächsten Zeitwechsel (V3.07) */
  }
  function checkStanza(s){
    var ov=document.getElementById("bppFs");
    if(!s.timed||!playing()||!autoOn()||window.bppSeekPending||(ov&&ov.classList.contains("end"))){ misSince=0; misTries=0; return; }
    var tg=null; try{ tg=window.bppStanzaNow&&window.bppStanzaNow(); }catch(e){}
    if(!tg){ misSince=0; return; }
    if(s.k===tg.k){ misSince=0; misTries=0; return; }
    if(manualActive(tg.k)){ misSince=0; return; }
    if(!misSince){ misSince=now(); return; }
    if(now()-misSince<1500) return;
    misSince=now(); misTries++;
    try{ if(window.bppFsRelease) window.bppFsRelease(); }catch(e){ note(e); }
    draw();
    if(misTries>=2) refit();
    window.bppFsFix534={why:"stanza", at:now(), shown:s.k, want:tg.k, tries:misTries};
  }
  function checkFit(s){
    var st=document.getElementById("bppFsStage"), box=document.getElementById("bppFsBox"); if(!st||!box) return;
    var W=st.clientWidth, H=st.clientHeight; if(!W||!H) return;
    var over=box.scrollWidth>W+2 || box.scrollHeight>H+2;
    if(!over) return;
    var key=s.k+"|"+s.page+"|"+W+"x"+H+"|"+s.fs;
    if(fitDone[key]) return; /* je Strophe/Bühne/Größe nur einmal – passt es nicht kleiner, kein Dauerschleife */
    if(refit()){ fitDone[key]=1; window.bppFsFix534={why:"fit", at:now(), k:s.k, fs:s.fs, w:W, h:H, sw:box.scrollWidth, sh:box.scrollHeight}; }
  }
  setInterval(function(){
    var s=fsOn(); if(!s){ misSince=0; misTries=0; return; }
    try{ checkStanza(s); }catch(e){ note(e); }
    try{ checkFit(s); }catch(e){ note(e); }
  }, 500);
})();
