/* [Grok-Bot] V3.33: Aufnahmen aus Telegram "BM Prayers - Waves of love" fuer Arati Saprem und das Abend-Nrsimha-Prayer (MP3 zuerst, YouTube bleibt umschaltbar),
   Strophenanker (marksFile: erster Einsatz und letzte Strophe aus Gesangsspur + Stichproben-Spracherkennung, dazwischen Silbengewicht) fuer Durga Calisa, Panduranga Arati, Saprem, Nrsimha (Abend). Version 3.33. */
window.BPP_BUILD="3.33"; window.BPP_SHOW="3.33";
(function(){
  if(typeof PRAYERS==="undefined") return;
  var CDN="https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/audio/";
  function P(id){ return PRAYERS.find(function(p){ return p.id===id; }); }
  var NEW={"saprem":"Ton: Telegram \u201eBM Prayers \u2013 Waves of love\u201c (Arati Saprem Jai Jai Vitthala Parabrahma, 23.05.2023), bearbeitet","narasimha-abend":"Ton: Telegram \u201eBM Prayers \u2013 Waves of love\u201c (Narasimha Prayer classic, 20.04.2023), bearbeitet"};
  Object.keys(NEW).forEach(function(id){ var p=P(id); if(!p) return;
    p.audio="audio/"+id+".mp3"; p.audioAlt=[CDN+id+".mp3"]; p.preferFile=true;
    if((p.quelle||"").indexOf("Waves of love")<0) p.quelle=(p.quelle?p.quelle+" \u00b7 ":"")+NEW[id]; });
  var M={"durga-chalisa": [37.5, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 711.2], "panduranga-arati": [12.9, null, null, null, null, 320.2], "saprem": [8.8, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 344.5], "narasimha-abend": [2.0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 410.0]};
  Object.keys(M).forEach(function(id){ var p=P(id); if(p) p.marksFile=M[id]; });
  ["sri-suktam","bhu-suktam","nila-suktam","purusa-suktam","vishnu-sahasranama","narayana-suktam"].forEach(function(id){ var p=P(id); if(p){ p.audio=null; p.youtube=null; p.preferFile=false; } });
})();
(function(){ /* [Grok-Bot] V3.33: Prayer ohne Aufnahme (Vedic Chants): alten Ton anhalten und leeren, damit Play nicht die vorige Aufnahme abspielt */
  var orig=window.play; if(typeof orig!=="function") return;
  window.play=function(idx){ var r=orig.apply(this, arguments);
    try{ var P=PRAYERS[idx]; if(P && !P.audio && !P.youtube){ var A=window.a||document.getElementById("a"); if(A){ A.pause(); A.removeAttribute("src"); A.load(); }
      try{ if(window.yt && yt.pauseVideo) yt.pauseVideo(); }catch(e){} } }catch(e){}
    return r; };
})();
