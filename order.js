/* [Grok-Bot] V1.52: Suprabhatam Strophe 9: "gopi" an den Anfang der zweiten Zeile */
/* [Grok-Bot] V1.52: Guru Stotram zweimal: Morgen (S. 5, C / G, Morgen-Aufnahme) und Abend (S. 17, ab Am, Abend-Aufnahme) */
/* [Grok-Bot] V1.51: Guru Stotram mit den Abend-Akkorden aus dem Heft S. 17 (Am G / F G / Am G / F E), passend zur Abend-Aufnahme */
/* [Grok-Bot] V1.50: Guru Stotram mit anderer Aufnahme (BM Prayers, Guru Stotram evening) */
/* [Grok-Bot] V1.49: Guru Stotram bekommt Ton (Dropbox Guru-Stotram.mp3); Prayers in der Reihenfolge des Prathana-Hefts: Morgengebet, Abendgebet, weitere, Vedic Chants */
(function(){
  var g = PRAYERS.find(function(p){ return p.id==="guru-stotram"; });
  var DBX = "https://www.dropbox.com/scl/fo/9jrivp0fkl4bfo9t0dejx/";
  var RL = "?rlkey=s8lox2d2652b2i133h1jjty3k&dl=1";
  if(g){
    /* V1.52: Abend-Fassung als eigener Eintrag (Heft S. 17, Abend-Aufnahme); Morgen-Fassung behaelt C / G und die Morgen-Aufnahme */
    var ev = JSON.parse(JSON.stringify(g));
    ev.id = "guru-stotram-abend";
    ev.autor = "Abendgebet · Sri Vitthal Dham";
    ev.audio = DBX + "AGEKF5xxUyuwQnJzfScG7YU/Guru-Stotram-Abend.mp3" + RL;
    ev.preferFile = true;
    ev.quelle = String(ev.quelle||"").replace("Morgengebet","Abendgebet") + " · Ton: BM Prayers · Guru Stotram (evening)";
    var EV = { a:"Am                   G", b:"F                    G", c:"Am                   G", d:"F                    E" };
    ev.zeilen.forEach(function(z){ var k = String(z.nr).slice(-1); if(EV[k]) z.ch = EV[k]; });
    ev.hinweis = ev.hinweisDe = "Abendgebet, Musikerheft Seite 17: Am G / F G / Am G / F E.";
    ev.hinweisEn = "Evening prayers, musicians booklet page 17: Am G / F G / Am G / F E.";
    /* [Grok.com] Om ist aus der Abend-MP3 geschnitten, nicht mehr in den Lyrics. */
    if(!g.audio){
      g.audio = DBX + "AHxwpU6Xttm9wzQ47RfwNiM/Guru-Stotram.mp3" + RL;
      g.preferFile = true;
      g.quelle = (g.quelle ? g.quelle + " · " : "") + "Ton: Morning Prayers CD · Guru Stotram";
    }
    PRAYERS.push(ev);
  }
  var sp = PRAYERS.find(function(p){ return p.id==="suprabhatam"; });
  if(sp){
    var z9a = sp.zeilen.find(function(z){ return z.nr==="9a"; }), z9b = sp.zeilen.find(function(z){ return z.nr==="9b"; });
    if(z9a && z9b && / gopi$/.test(z9a.sa)){ z9a.sa = z9a.sa.replace(/ gopi$/, ""); z9b.sa = "gopi " + z9b.sa; }
  }
  /* [Grok-Bot] V1.53: Tvam eva mātā wird zweimal gesungen, "2x" hinter der letzten Zeile */
  PRAYERS.forEach(function(p){ p.zeilen.forEach(function(z){ if(/^tvam eva sarva/.test(String(z.sa||""))) z.x2 = true; }); });
  var ORDER = ["guru-stotram","guru-stotram-abend","guruji-gayatri","gayatri","ganesha-mantra","suprabhatam","govinda","narasimha","ramanuja","vishnu-arati","final-prayers","kavacham","hanuman","bhajare","lakshmi-arati","saprem","mukunda" /* [Grok.com] Arati Saprem */];
  function rank(p){ var r = ORDER.indexOf(p.id); return r < 0 ? 999 : r; }
  var withPos = PRAYERS.map(function(p, n){ return { p:p, n:n }; });
  withPos.sort(function(x, y){ return (rank(x.p) - rank(y.p)) || (x.n - y.n); });
  PRAYERS.length = 0;
  withPos.forEach(function(o){ PRAYERS.push(o.p); });
})();

/* [Grok.com] Abend-Aufnahme: gespeicherte Datei mit Om nicht abspielen.
   Datei ueber 258 s ist die alte. Dann auf 10,7 s springen. Sonst die gekuerzte Datei. */
(function(){
  var FILE="audio/guru-stotram-abend3.mp3?v=219";
  var CUT=10.7;
  function point(){
    if(typeof PRAYERS==="undefined") return;
    var P=PRAYERS.find(function(x){ return x.id==="guru-stotram-abend"; });
    if(!P) return;
    P.audio=FILE;
    P.audioAlt=[FILE];
    P.preferFile=true;
  }
  function skip(){
    point();
    if(typeof i==="undefined" || i<0 || typeof PRAYERS==="undefined" || !PRAYERS[i] || PRAYERS[i].id!=="guru-stotram-abend") return;
    if(typeof ytOn!=="undefined" && ytOn) return;
    var el=document.getElementById("a"); if(!el) return;
    var src=el.currentSrc||el.src||"";
    if(/Guru-Stotram-Abend|guru-stotram-abend\.mp3/.test(src) && !/abend3/.test(src)){
      try{ el.src=FILE; el.load(); }catch(e){}
      return;
    }
    if(isFinite(el.duration) && el.duration>258 && (el.currentTime||0)<CUT-0.15){
      try{ el.currentTime=CUT; }catch(e){}
    }
  }
  point();
  setInterval(skip, 300);
  document.addEventListener("DOMContentLoaded", function(){
    var el=document.getElementById("a");
    if(!el) return;
    ["loadedmetadata","play","playing","timeupdate","seeked"].forEach(function(ev){ el.addEventListener(ev, skip); });
  });
})();
