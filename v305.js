/* [Grok-Bot] V3.05: Akkorde-Hinweis + "Prayers runterladen" (ex "Alle offline") unter die Lyrics, Ausspracheleiste nur noch in der Hilfe, Zeile 6 entfaellt */
window.BPP_BUILD="3.05"; window.BPP_SHOW="3.05";
(function(){
  var LAB={de:"Prayers runterladen",en:"Download prayers",fr:"Télécharger les prières",es:"Descargar oraciones",ru:"Скачать молитвы",hi:"प्रार्थनाएँ डाउनलोड करें"};
  var TIT={de:"Alle MP3s für die Offline-Nutzung speichern",en:"Save all MP3s for offline use",fr:"Enregistrer tous les MP3 hors ligne",es:"Guardar todos los MP3 sin conexión",ru:"Сохранить все MP3 для офлайн",hi:"सभी MP3 ऑफ़लाइन सहेजें"};
  function L(){var l=(typeof lang!=="undefined"&&lang)||"en";return LAB[l]?l:"en";}
  var st=document.createElement("style");
  st.textContent="#bppL6{display:none!important}#legend{display:none!important}#bppSrcEnd #foot{display:none!important}"+
  "#bppSrcEnd .btns{display:flex;flex-wrap:wrap;gap:8px;align-items:center}#bppSrcEnd #btnOffAll{display:inline-flex!important;margin:0!important;font:inherit!important;font-size:.9rem!important;padding:6px 12px!important;min-height:32px}";
  document.head.appendChild(st);
  function lab(){var b=document.getElementById("btnOffAll");if(!b||b.classList.contains("busy"))return;var l=L();if(b.textContent!==LAB[l])b.textContent=LAB[l];b.title=TIT[l];}
  function build(){
    var w=document.getElementById("bppSrcEnd"), d=document.getElementById("btnDet"), o=document.getElementById("btnOffAll");
    if(!w||!d||!o) return false;
    var row=document.createElement("div"); row.className="btns";
    w.insertBefore(row,w.firstChild); row.appendChild(d); row.appendChild(o);
    ["foot","legend"].forEach(function(id){var e=document.getElementById(id); if(e) w.appendChild(e);});
    lab(); return true;
  }
  var n=0,t=setInterval(function(){ if(build()||++n>100) clearInterval(t); },200);
  setInterval(lab,1000);
})();
