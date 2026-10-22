/* [Grok-Bot] V3.88: Final Prayers (Tvam eva mata) - zweite Aufnahme "Sunday Prayers" (YouTube WpcqK0Y7YjE, 2:14:20 bis Ende), bearbeitet wie V3.87,
   als audio/final-prayers-sunday.mp3. Standard bleibt die CD-Aufnahme. Gleiche Taste/Logik wie V3.87 (naechste Aktion, gold = aktiv), Wahl in "bpp-fp-rec".
   Die Aufnahme beginnt mit Om Jai Jagadish Hare (nicht im Text, Strophe 1 bleibt markiert). Marken per Spracherkennung, ungefaehr. */
window.BPP_BUILD="3.88"; window.BPP_SHOW="3.88";
(function(){
  if(window.bppV388) return; window.bppV388=1;
  var ID="final-prayers", KEY="bpp-fp-rec", F="audio/final-prayers-sunday.mp3";
  var CDN="https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/"+F;
  var SEQ=[[0, 0], [293, 1], [305, 2], [313, 3], [320, 4], [325, 5], [354, 6], [378, 7], [390, 8], [406, 9]], SEQYT=[[8060, 0], [8353, 1], [8365, 2], [8373, 3], [8380, 4], [8385, 5], [8414, 6], [8438, 7], [8450, 8], [8466, 9]];
  function marks(s){ var m=[]; s.forEach(function(e){ if(m[e[1]]==null) m[e[1]]=e[0]; }); return m; }
  var PR={audio:F, audioAlt:[CDN], preferFile:true, youtube:"WpcqK0Y7YjE", youtubeStart:8060, seqFile:SEQ, marksFile:marks(SEQ), seqYt:SEQYT, marksYt:marks(SEQYT)};
  var H={"de": "<b>Final Prayers (Tvam eva mātā) – Aufnahme:</b> Unter dem Titel wählt „Aufnahme: Sunday Prayers“ die Aufnahme aus den Sunday Prayers (YouTube, ab 2:14:20 bis zum Ende); gold = Sunday Prayers aktiv, die Taste zeigt dann „Aufnahme: CD (alt)“ zum Zurückwechseln. Standard bleibt die alte CD-Aufnahme. Die Wahl bleibt gespeichert, beide Aufnahmen gehen offline. Die Aufnahme beginnt mit „Om Jai Jagadish Hare“ (nicht im Text); das Mitlesen ist gemessen und kann etwas abweichen. <i>(von Grok ergänzt)</i>", "en": "<b>Final Prayers (Tvam eva mātā) – recording:</b> below the title, “Recording: Sunday Prayers” selects the Sunday Prayers recording (YouTube, from 2:14:20 to the end); gold = Sunday Prayers active, the button then shows “Recording: CD (old)” to switch back. The old CD recording stays the default. The choice is saved, both recordings work offline. The recording begins with “Om Jai Jagadish Hare” (not in the text); follow-along is measured and may be slightly off. <i>(added by Grok)</i>", "fr": "<b>Final Prayers (Tvam eva mātā) – enregistrement :</b> sous le titre, « Enregistrement : Sunday Prayers » choisit l’enregistrement des Sunday Prayers (YouTube, de 2:14:20 jusqu’à la fin) ; doré = Sunday Prayers actif, le bouton affiche alors « Enregistrement : CD (ancien) » pour revenir. L’ancien enregistrement du CD reste la valeur par défaut. Le choix est mémorisé, les deux enregistrements fonctionnent hors ligne. L’enregistrement commence par « Om Jai Jagadish Hare » (absent du texte) ; le suivi de lecture est mesuré et peut être légèrement décalé. <i>(ajouté par Grok)</i>", "es": "<b>Final Prayers (Tvam eva mātā) – grabación:</b> bajo el título, «Grabación: Sunday Prayers» elige la grabación de las Sunday Prayers (YouTube, de 2:14:20 hasta el final); dorado = Sunday Prayers activo, el botón muestra entonces «Grabación: CD (antigua)» para volver. La grabación antigua del CD sigue siendo la predeterminada. La elección se guarda, ambas grabaciones funcionan sin conexión. La grabación empieza con «Om Jai Jagadish Hare» (no está en el texto); el seguimiento está medido y puede desviarse un poco. <i>(añadido por Grok)</i>", "ru": "<b>Final Prayers (Tvam eva mātā) – запись:</b> под названием кнопка «Запись: Sunday Prayers» выбирает запись Sunday Prayers (YouTube, с 2:14:20 до конца); золото = Sunday Prayers включены, тогда кнопка показывает «Запись: CD (старая)» для возврата. По умолчанию – старая запись с CD. Выбор сохраняется, обе записи работают офлайн. Запись начинается с «Om Jai Jagadish Hare» (нет в тексте); метки для чтения измерены и могут немного отличаться. <i>(добавлено Grok)</i>", "hi": "<b>Final Prayers (Tvam eva mātā) – रिकॉर्डिंग:</b> शीर्षक के नीचे “रिकॉर्डिंग: Sunday Prayers” Sunday Prayers की रिकॉर्डिंग चुनता है (YouTube, 2:14:20 से अंत तक); सुनहरा = Sunday Prayers सक्रिय, तब बटन वापस जाने के लिए “रिकॉर्डिंग: CD (पुरानी)” दिखाता है। डिफ़ॉल्ट पुरानी CD रिकॉर्डिंग है। चुनाव सहेजा जाता है, दोनों रिकॉर्डिंग ऑफ़लाइन चलती हैं। रिकॉर्डिंग “Om Jai Jagadish Hare” से शुरू होती है (पाठ में नहीं); साथ पढ़ने के चिह्न मापे गए हैं, थोड़ा हट सकते हैं। <i>(Grok द्वारा जोड़ा गया)</i>", "pt": "<b>Final Prayers (Tvam eva mātā) – gravação:</b> sob o título, “Gravação: Sunday Prayers” escolhe a gravação das Sunday Prayers (YouTube, de 2:14:20 até ao fim); dourado = Sunday Prayers ativo, o botão mostra então “Gravação: CD (antiga)” para voltar. A gravação antiga do CD continua a ser a predefinida. A escolha fica guardada, ambas as gravações funcionam offline. A gravação começa com “Om Jai Jagadish Hare” (não está no texto); o acompanhamento é medido e pode desviar um pouco. <i>(acrescentado por Grok)</i>"}, B={"de": ["Aufnahme: Sunday Prayers", "Aufnahme: CD (alt)"], "en": ["Recording: Sunday Prayers", "Recording: CD (old)"], "fr": ["Enregistrement : Sunday Prayers", "Enregistrement : CD (ancien)"], "es": ["Grabación: Sunday Prayers", "Grabación: CD (antigua)"], "ru": ["Запись: Sunday Prayers", "Запись: CD (старая)"], "hi": ["रिकॉर्डिंग: Sunday Prayers", "रिकॉर्डिंग: CD (पुरानी)"], "pt": ["Gravação: Sunday Prayers", "Gravação: CD (antiga)"]};
  function on(){ try{ return localStorage.getItem(KEY)==="sunday"; }catch(e){ return false; } }
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
    try{ localStorage.setItem(KEY,on()?"cd":"sunday"); }catch(e){}
    var c=cur();
    if(c===P){ var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(e){}
      try{ putSong(ID,{line:0,time:0}); }catch(e){}
      try{ play(PRAYERS.indexOf(P), false, was); }catch(e){} }
    paint();
  }
  function paint(){
    var P=hook(), c=cur(), b=document.getElementById("bppRec388");
    if(!b){ var now=document.getElementById("now"); if(!now) return;
      b=document.createElement("button"); b.type="button"; b.id="bppRec388";
      b.style.cssText="display:none;margin:4px 0 6px;font-size:.85rem;padding:4px 10px";
      b.addEventListener("click",function(e){ e.stopPropagation(); sw(); });
      now.parentNode.insertBefore(b,now.nextSibling); }
    var show=!!P&&c===P; b.style.display=show?"":"none"; if(!show) return;
    var o=on(), t=B[lg()][o?1:0];
    if(b.textContent!==t){ b.textContent=t; b.title=t; b.setAttribute("aria-label",t); }
    b.classList.toggle("on",o); b.setAttribute("aria-pressed",o?"true":"false");
  }
  function pre(){ /* Sunday-MP3 in den Audio-Cache (offline), auch solange die Frauenstimme gewaehlt ist */
    try{ if(!navigator.onLine||!window.caches) return; var u=new URL(F,location.href).href;
      caches.open("bpp-audio-v2").then(function(c){ return c.match(u).then(function(r){ if(!r) return fetch(u,{cache:"no-store"}).then(function(x){ if(x.ok) return c.put(u,x); }); }); }).catch(function(){}); }catch(e){}
  }
  function help(){ var d=document.getElementById("bppHelp"); if(!d) return; var ref=d.querySelector(".h387"); if(!ref) return;
    var p=d.querySelector(".h388"); if(!p){ p=document.createElement("p"); p.className="h388"; }
    var h=H[lg()]; if(p.innerHTML!==h) p.innerHTML=h;
    if(p.parentNode!==ref.parentNode||p.nextSibling!==ref) ref.parentNode.insertBefore(p,ref); }
  hook(); setInterval(function(){ hook(); paint(); help(); },300);
  window.addEventListener("load",function(){ hook(); paint(); setTimeout(pre,8000); });
})();
