/* [Grok-Bot] V3.87: Guru Stotram (morgens) - zweite Aufnahme "Prabhus" (YouTube 4SlArw_x5uI, 1:57-5:49, Morning Prayers LIVE,
   The Ashram - Shree Peetha Nilaya), bearbeitet wie V3.67 (Hochpass 80 Hz, -16 LUFS, mono 56 kbit/s, 44,1 kHz) als audio/guru-stotram-prabhus.mp3.
   Standard bleibt die Frauenstimme. Taste neben dem Titel (zeigt die naechste Aktion, gold = Prabhus aktiv), Wahl in localStorage "bpp-gs-rec".
   Strophenmarken: Chroma-Periode 12,3 s, verankert an Spracherkennung (Str. 3, 9, 10, 13). Ersatz ohne MP3: YouTube ab 120 s. */
window.BPP_BUILD="3.87"; window.BPP_SHOW="3.87";
(function(){
  if(window.bppV387) return; window.bppV387=1;
  var ID="guru-stotram", KEY="bpp-gs-rec", F="audio/guru-stotram-prabhus.mp3";
  var CDN="https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/"+F;
  var SEQ=[[0, 0], [57.4, 1], [69.7, 2], [82.0, 3], [94.3, 4], [106.6, 5], [118.9, 6], [131.2, 7], [143.5, 8], [155.8, 9], [168.1, 10], [180.4, 11], [192.7, 12], [205.0, 13]], SEQYT=[[120, 0], [177.9, 1], [190.2, 2], [202.5, 3], [214.8, 4], [227.1, 5], [239.4, 6], [251.7, 7], [264.0, 8], [276.3, 9], [288.6, 10], [300.9, 11], [313.2, 12], [325.5, 13]];
  function marks(s){ var m=[]; s.forEach(function(e){ if(m[e[1]]==null) m[e[1]]=e[0]; }); return m; }
  var PR={audio:F, audioAlt:[CDN], preferFile:true, youtube:"4SlArw_x5uI", youtubeStart:120, seqFile:SEQ, marksFile:marks(SEQ), seqYt:SEQYT, marksYt:marks(SEQYT)};
  var H={"de": "<b>Guru Stotram (morgens) – Aufnahme:</b> Neben der Taste mit dem Gebetstitel wählt „Aufnahme: Prabhus“ die Aufnahme der Prabhus (Morning Prayers LIVE, The Ashram – Shree Peetha Nilaya, 1:57–5:49); gold = Prabhus aktiv, die Taste zeigt dann „Aufnahme: Frauenstimme“ zum Zurückwechseln. Standard ist die Frauenstimme. Die Wahl bleibt gespeichert, beide Aufnahmen gehen offline. Das Mitlesen der Prabhus-Aufnahme ist gemessen und kann etwas abweichen. <i>(von Grok ergänzt)</i>", "en": "<b>Guru Stotram (morning) – recording:</b> next to the prayer title, “Recording: Prabhus” selects the Prabhus recording (Morning Prayers LIVE, The Ashram – Shree Peetha Nilaya, 1:57–5:49); gold = Prabhus active, the button then shows “Recording: female voice” to switch back. The female voice is the default. The choice is saved, both recordings work offline. Follow-along for the Prabhus recording is measured and may be slightly off. <i>(added by Grok)</i>", "fr": "<b>Guru Stotram (matin) – enregistrement :</b> à côté du titre de la prière, « Enregistrement : Prabhus » choisit l’enregistrement des Prabhus (Morning Prayers LIVE, The Ashram – Shree Peetha Nilaya, 1:57–5:49) ; doré = Prabhus actif, le bouton affiche alors « Enregistrement : voix féminine » pour revenir. La voix féminine est la valeur par défaut. Le choix est mémorisé, les deux enregistrements fonctionnent hors ligne. Le suivi de lecture de l’enregistrement des Prabhus est mesuré et peut être légèrement décalé. <i>(ajouté par Grok)</i>", "es": "<b>Guru Stotram (mañana) – grabación:</b> junto al título de la oración, «Grabación: Prabhus» elige la grabación de los Prabhus (Morning Prayers LIVE, The Ashram – Shree Peetha Nilaya, 1:57–5:49); dorado = Prabhus activo, el botón muestra entonces «Grabación: voz femenina» para volver. La voz femenina es la predeterminada. La elección se guarda, ambas grabaciones funcionan sin conexión. El seguimiento de la grabación de los Prabhus está medido y puede desviarse un poco. <i>(añadido por Grok)</i>", "ru": "<b>Гуру Стотрам (утро) – запись:</b> рядом с названием молитвы кнопка «Запись: Прабху» выбирает запись Прабху (Morning Prayers LIVE, The Ashram – Shree Peetha Nilaya, 1:57–5:49); золото = Прабху включены, тогда кнопка показывает «Запись: женский голос» для возврата. По умолчанию – женский голос. Выбор сохраняется, обе записи работают офлайн. Метки для чтения записи Прабху измерены и могут немного отличаться. <i>(добавлено Grok)</i>", "hi": "<b>गुरु स्तोत्रम (सुबह) – रिकॉर्डिंग:</b> प्रार्थना शीर्षक के पास “रिकॉर्डिंग: प्रभु” प्रभुओं की रिकॉर्डिंग चुनता है (Morning Prayers LIVE, The Ashram – Shree Peetha Nilaya, 1:57–5:49); सुनहरा = प्रभु सक्रिय, तब बटन वापस जाने के लिए “रिकॉर्डिंग: महिला स्वर” दिखाता है। डिफ़ॉल्ट महिला स्वर है। चुनाव सहेजा जाता है, दोनों रिकॉर्डिंग ऑफ़लाइन चलती हैं। प्रभुओं की रिकॉर्डिंग के साथ पढ़ने के चिह्न मापे गए हैं, थोड़ा हट सकते हैं। <i>(Grok द्वारा जोड़ा गया)</i>", "pt": "<b>Guru Stotram (manhã) – gravação:</b> junto ao título da oração, “Gravação: Prabhus” escolhe a gravação dos Prabhus (Morning Prayers LIVE, The Ashram – Shree Peetha Nilaya, 1:57–5:49); dourado = Prabhus ativo, o botão mostra então “Gravação: voz feminina” para voltar. A voz feminina é a predefinida. A escolha fica guardada, ambas as gravações funcionam offline. O acompanhamento da gravação dos Prabhus é medido e pode desviar um pouco. <i>(acrescentado por Grok)</i>"}, B={"de": ["Rec: Pbj","Rec: Mtj"], "en": ["Rec: Pbj","Rec: Mtj"], "fr": ["Rec: Pbj","Rec: Mtj"], "es": ["Rec: Pbj","Rec: Mtj"], "ru": ["Rec: Pbj","Rec: Mtj"], "hi": ["Rec: Pbj","Rec: Mtj"], "pt": ["Rec: Pbj","Rec: Mtj"]};
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
      var t=0; try{ var a=document.getElementById("a"); if(a&&isFinite(a.currentTime)) t=a.currentTime; }catch(e){} try{ putSong(ID,{line:line,time:t}); }catch(e){}
      try{ play(PRAYERS.indexOf(P), true, was); }catch(e){} }
    paint();
  }
  function paint(){
    var P=hook(), c=cur(), b=document.getElementById("bppRec387");
    if(!b){ var now=document.getElementById("now"); if(!now) return;
      b=document.createElement("button"); b.type="button"; b.id="bppRec387";
      b.style.cssText="display:none;margin:4px 0 6px;font-size:.85rem;padding:4px 10px";
      b.addEventListener("click",function(e){ e.stopPropagation(); sw(); });
      now.parentNode.insertBefore(b,now.nextSibling); }
    var show=!!P&&c===P; b.style.display=show?"":"none"; if(!show) return;
    var o=on(), t=B[lg()][o?1:0];
    if(b.textContent!==t){ b.textContent=t; b.title=t; b.setAttribute("aria-label",t); }
    b.classList.toggle("on",o); b.setAttribute("aria-pressed",o?"true":"false");
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
