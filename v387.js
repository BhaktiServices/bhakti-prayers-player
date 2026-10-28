/* [Grok-Bot] V3.87: Guru Stotram (morgens) - zweite Aufnahme "Prabhus" (YouTube 4SlArw_x5uI, 1:57-5:49, Morning Prayers LIVE,
   The Ashram - Shree Peetha Nilaya), bearbeitet wie V3.67 (Hochpass 80 Hz, -16 LUFS, mono 56 kbit/s, 44,1 kHz) als audio/guru-stotram-prabhus.mp3.
   Standard bleibt die Frauenstimme. Taste neben dem Titel (zeigt die naechste Aktion, gold = Prabhus aktiv), Wahl in localStorage "bpp-gs-rec".
   Strophenmarken: Chroma-Periode 12,3 s, verankert an Spracherkennung (Str. 3, 9, 10, 13). Ersatz ohne MP3: YouTube ab 120 s. */
window.BPP_BUILD="3.87"; window.BPP_SHOW="3.87";
(function(){
  if(window.bppV387) return; window.bppV387=1;
  var ID="guru-stotram", KEY="bpp-gs-rec", F="audio/guru-stotram-prabhus2.mp3"; /* [Grok-Bot] V4.35: erste 25 s abgeschnitten (alte Datei guru-stotram-prabhus.mp3 bleibt liegen, wird nicht geladen) */
  var CDN="https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/"+F;
  /* [Grok-Bot] V4.35: Marken -25 s (alt: 57.4, 69.7 ... 205.0), YT-Start 120 -> 145 */ var SEQ=[[0, 0], [32.4, 1], [44.7, 2], [57.0, 3], [69.3, 4], [81.6, 5], [93.9, 6], [106.2, 7], [118.5, 8], [130.8, 9], [143.1, 10], [155.4, 11], [167.7, 12], [180.0, 13]], SEQYT=[[145, 0], [177.9, 1], [190.2, 2], [202.5, 3], [214.8, 4], [227.1, 5], [239.4, 6], [251.7, 7], [264.0, 8], [276.3, 9], [288.6, 10], [300.9, 11], [313.2, 12], [325.5, 13]];
  function marks(s){ var m=[]; s.forEach(function(e){ if(m[e[1]]==null) m[e[1]]=e[0]; }); return m; }
  var PR={audio:F, audioAlt:[CDN], preferFile:true, youtube:"4SlArw_x5uI", youtubeStart:145, seqFile:SEQ, marksFile:marks(SEQ), seqYt:SEQYT, marksYt:marks(SEQYT)};
  var H={"de": "<b>Guru Stotram (morgens) – Aufnahme:</b> Taste neben dem Titel: Prabhus ↔ Frauenstimme (Standard); gespeichert, beide offline. Mitsingen Prabhus kann leicht abweichen. <i>(von Grok ergänzt)</i>", "en": "<b>Guru Stotram (morning) – recording:</b> button by title: Prabhus ↔ female (default); saved, both offline. Follow for Prabhus may be slightly off. <i>(added by Grok)</i>", "fr": "<b>Guru Stotram (matin) – enregistrement :</b> bouton près du titre : Prabhus ↔ voix féminine (défaut) ; mémorisé, les deux hors ligne. Suivi Prabhus peut légèrement décaler. <i>(ajouté par Grok)</i>", "es": "<b>Guru Stotram (mañana) – grabación:</b> botón junto al título: Prabhus ↔ voz femenina (predet.); guardado, ambas sin conexión. Seguimiento Prabhus puede desviarse un poco. <i>(añadido por Grok)</i>", "ru": "<b>Гуру Стотрам (утро) – запись:</b> кнопка у названия: Прабху ↔ женский (по умолч.); сохраняется, обе офлайн. Метки Прабху могут чуть отличаться. <i>(добавлено Grok)</i>", "hi": "<b>गुरु स्तोत्रम (सुबह) – रिकॉर्डिंग:</b> शीर्षक के पास बटन: प्रभु ↔ महिला (डिफ़ॉल्ट); सहेजा, दोनों ऑफ़लाइन। प्रभु साथ-गाना थोड़ा हट सकता है। <i>(Grok द्वारा जोड़ा गया)</i>", "pt": "<b>Guru Stotram (manhã) – gravação:</b> botão junto ao título: Prabhus ↔ voz feminina (padrão); guardado, ambas offline. Acompanhar Prabhus pode desviar um pouco. <i>(acrescentado por Grok)</i>"}, B={"de": ["Rec: Pbj","Rec: Mtj"], "en": ["Rec: Pbj","Rec: Mtj"], "fr": ["Rec: Pbj","Rec: Mtj"], "es": ["Rec: Pbj","Rec: Mtj"], "ru": ["Rec: Pbj","Rec: Mtj"], "hi": ["Rec: Pbj","Rec: Mtj"], "pt": ["Rec: Pbj","Rec: Mtj"]};
  function on(){ try{ return localStorage.getItem(KEY)==="prabhus"; }catch(e){ return false; } }
  function lg(){ return (typeof lang!=="undefined"&&B[lang])?lang:"en"; }
  var hooked=null;
  function hook(){
    if(typeof PRAYERS==="undefined") return null;
    var P=PRAYERS.find(function(p){ return p.id===ID; }); if(!P) return null;
    if(hooked===P) return P;
    Object.keys(PR).forEach(function(k){ var base=P[k];
      Object.defineProperty(P,k,{configurable:true,enumerable:true,
        get:function(){ return on()?PR[k]:base; }, set:function(v){ base=v; }}); });
    hooked=P; return P;
  }
  function cur(){ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function sw(){
    var P=hook(); if(!P) return;
    try{ localStorage.setItem(KEY,on()?"frau":"prabhus"); }catch(e){}
    var c=cur();
    if(c===P){ var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(e){}
      
      try{ play(PRAYERS.indexOf(P), true, was); }catch(e){} }
    paint();
  }
  function paint(){ return; /* [Grok.com] Button von v415 */ 
    var P=hook(), c=cur(), b=document.getElementById("bppRec387");
    if(!b){ var now=document.getElementById("now"); if(!now) return;
      b=document.createElement("button"); b.type="button"; b.id="bppRec387";
      b.style.cssText="display:none;margin:4px 0 6px;font-size:.85rem;padding:4px 10px";
      b.addEventListener("click",function(e){ e.stopPropagation(); sw(); });
      now.parentNode.insertBefore(b,now.nextSibling); }
    var show=!!P&&c===P; b.style.display=show?"":"none"; if(!show) return;
    var o=on();
    b.classList.remove("on"); b.setAttribute("aria-pressed",o?"true":"false");
  }
  function pre(){ /* Prabhus-MP3 in den Audio-Cache (offline), auch solange die Frauenstimme gewaehlt ist */
    try{ if(!navigator.onLine||!window.caches) return; var u=new URL(F,location.href).href;
      caches.open("bpp-audio-v2").then(function(c){ return c.match(u).then(function(r){ if(!r) return fetch(u,{cache:"no-store"}).then(function(x){ if(x.ok) return c.put(u,x); }); }); }).catch(function(){}); }catch(e){}
  }
  function help(){ /* [Grok-Bot] V3.94: Hilfeabsatz entfernt */ var d=document.getElementById("bppHelp"); var q=d&&d.querySelector(".h387"); if(q) q.remove(); }
  function help_alt(){ var d=document.getElementById("bppHelp"); if(!d) return; var ref=d.querySelector(".h381"); if(!ref) return;
    var p=d.querySelector(".h387"); if(!p){ p=document.createElement("p"); p.className="h387"; }
    var h=H[lg()]; if(p.innerHTML!==h) p.innerHTML=h;
    if(p.parentNode!==ref.parentNode||p.nextSibling!==ref) ref.parentNode.insertBefore(p,ref); }
  hook(); setInterval(function(){ hook(); paint(); help(); },300);
  window.addEventListener("load",function(){ hook(); paint(); setTimeout(pre,8000); });
})();
