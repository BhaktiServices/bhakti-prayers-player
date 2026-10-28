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
  var H={"de": "<b>Final Prayers (Tvam eva mātā) – Aufnahme:</b> Taste unter dem Titel: Sunday Prayers ↔ CD alt (Standard); gespeichert, beide offline. Start „Om Jai Jagadish Hare“ (nicht im Text); Mitsingen kann abweichen. <i>(von Grok ergänzt)</i>", "en": "<b>Final Prayers (Tvam eva mātā) – recording:</b> button below title: Sunday Prayers ↔ old CD (default); saved, both offline. Starts “Om Jai Jagadish Hare” (not in text); follow may be off. <i>(added by Grok)</i>", "fr": "<b>Final Prayers (Tvam eva mātā) – enregistrement :</b> bouton sous le titre : Sunday Prayers ↔ ancien CD (défaut) ; mémorisé, les deux hors ligne. Début « Om Jai Jagadish Hare » (hors texte) ; suivi peut décaler. <i>(ajouté par Grok)</i>", "es": "<b>Final Prayers (Tvam eva mātā) – grabación:</b> botón bajo el título: Sunday Prayers ↔ CD antigua (predet.); guardado, ambas sin conexión. Empieza «Om Jai Jagadish Hare» (no en el texto); seguimiento puede desviarse. <i>(añadido por Grok)</i>", "ru": "<b>Final Prayers (Tvam eva mātā) – запись:</b> кнопка под названием: Sunday Prayers ↔ старый CD (по умолч.); сохраняется, обе офлайн. Начало «Om Jai Jagadish Hare» (нет в тексте); метки могут отличаться. <i>(добавлено Grok)</i>", "hi": "<b>Final Prayers (Tvam eva mātā) – रिकॉर्डिंग:</b> शीर्षक के नीचे बटन: Sunday Prayers ↔ पुरानी CD (डिफ़ॉल्ट); सहेजा, दोनों ऑफ़लाइन। शुरू “Om Jai Jagadish Hare” (पाठ में नहीं); साथ-गाना हट सकता है। <i>(Grok द्वारा जोड़ा गया)</i>", "pt": "<b>Final Prayers (Tvam eva mātā) – gravação:</b> botão sob o título: Sunday Prayers ↔ CD antiga (padrão); guardado, ambas offline. Começa “Om Jai Jagadish Hare” (fora do texto); acompanhamento pode desviar. <i>(acrescentado por Grok)</i>"}, B={"de": ["Aufnahme: Sunday Prayers", "Aufnahme: CD (alt)"], "en": ["Recording: Sunday Prayers", "Recording: CD (old)"], "fr": ["Enregistrement : Sunday Prayers", "Enregistrement : CD (ancien)"], "es": ["Grabación: Sunday Prayers", "Grabación: CD (antigua)"], "ru": ["Запись: Sunday Prayers", "Запись: CD (старая)"], "hi": ["रिकॉर्डिंग: Sunday Prayers", "रिकॉर्डिंग: CD (पुरानी)"], "pt": ["Gravação: Sunday Prayers", "Gravação: CD (antiga)"]};
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
