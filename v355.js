/* [Grok-Bot] V3.55: Aufnahmen fuer Purusa Suktam und Sri Visnu Sahasranama (Dropbox, Audio-Kette: Stimm-Lift, -16 LUFS 2 Durchgaenge, mono 56 kbit/s, 44,1 kHz).
   Strophenanker gemessen: Demucs-Gesangsspur, Pausenkandidaten + Silbenzahl, je Strophe Whisper-Textabgleich (erste ~12 Silben).
   Dazu: Beim allerersten Start (leerer Speicher) oeffnet sich die Hilfe einmal automatisch; Hinweis "Esc zum Schliessen" oben in der Hilfe. */
window.BPP_BUILD="3.55"; window.BPP_SHOW="3.55";
(function(){
  if(window.bppV355) return; window.bppV355=1;
  var CDN="https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/audio/";
  var M={"purusa-suktam": [1.5, 41.5, 47.5, 62.4, 75.0, 87.4, 100.0, 111.4, 124.3, 136.7, 147.0, 161.0, 174.2, 187.3, 198.2, 210.5, 224.1, 236.1, 251.9, 266.0, 281.5, 296.9, 312.1, 327.1, 339.6, 352.2, 369.4, 392.7], "vishnu-sahasranama": [0.5, 9.2, 20.2, 27.2, 36.3, 44.4, 53.9, 68.6, 81.8, 91.9, 101.1, 110.2, 119.0, 128.0, 137.1, 145.2, 155.2, 163.1, 172.1, 179.3, 189.9, 201.3, 207.9, 302.2, 326.3, 352.8, 365.0, 373.6, 386.9, 396.5, 410.2, 419.4, 426.8, 437.1, 446.4, 452.5, 464.8, 472.5, 481.2, 490.7, 499.4, 508.4, 517.7, 526.5, 534.9, 544.6, 554.1, 562.3, 571.5, 581.2, 589.0, 594.1, 606.4, 615.1, 623.3, 628.7, 641.7, 653.9, 659.4, 668.3, 678.4, 686.1, 691.4, 701.0, 713.6, 720.7, 729.5, 739.2, 748.8, 756.2, 765.0, 773.2, 782.0, 790.3, 799.0, 808.1, 817.0, 826.9, 834.8, 843.7, 853.3, 862.9, 870.5, 878.0, 887.5, 895.8, 904.4, 912.4, 920.8, 930.3, 938.0, 947.1, 956.0, 964.5, 973.3, 982.4, 991.1, 1001.7, 1007.9, 1017.1, 1025.9, 1034.7, 1043.2, 1051.9, 1060.4, 1069.1, 1077.8, 1086.2, 1094.9, 1103.2, 1111.9, 1119.3, 1128.9, 1137.6, 1146.2, 1154.7, 1163.3, 1172.0, 1180.7, 1189.2, 1198.0, 1206.9, 1215.8, 1224.6, 1233.1, 1241.2, 1250.3, 1260.4, 1268.5, 1276.3, 1285.9, 1293.6, 1304.1, 1312.1, 1320.8, 1329.9, 1341.9, 1347.3, 1362.5, 1377.1, 1387.7, 1403.2, 1412.3, 1425.8, 1439.0, 1454.6, 1464.8, 1473.9, 1482.3, 1491.6, 1499.6, 1508.7, 1517.3, 1531.2, 1539.5, 1546.9, 1553.0, 1562.2, 1571.0, 1578.6, 1596.1, 1606.1, 1624.0, 1640.8, 1690.8, 1715.0, 1724.2, 1732.6, 1748.6, 1766.3]};
  var H={
    "purusa-suktam":{de:"Heft S. 47. Aufnahme: Dropbox \u201ePurusha suktam\u201c. Keine \u00dcbersetzung im Prathana-Heft.",en:"Booklet p. 47. Recording: Dropbox \u201cPurusha suktam\u201d. No translation in the Prathana booklet.",fr:"Livret p. 47. Enregistrement : Dropbox \u00ab Purusha suktam \u00bb. Pas de traduction dans le livret Prathana.",es:"Cuadernillo p. 47. Grabaci\u00f3n: Dropbox \u201cPurusha suktam\u201d. Sin traducci\u00f3n en el cuadernillo Prathana.",ru:"\u0411\u0443\u043a\u043b\u0435\u0442, \u0441. 47. \u0417\u0430\u043f\u0438\u0441\u044c: Dropbox \u00abPurusha suktam\u00bb. \u0412 \u0431\u0443\u043a\u043b\u0435\u0442\u0435 Prathana \u043d\u0435\u0442 \u043f\u0435\u0440\u0435\u0432\u043e\u0434\u0430.",hi:"\u092a\u0941\u0938\u094d\u0924\u093f\u0915\u093e \u092a\u0943. 47\u0964 \u0930\u093f\u0915\u0949\u0930\u094d\u0921\u093f\u0902\u0917: Dropbox \u201cPurusha suktam\u201d\u0964 \u092a\u094d\u0930\u093e\u0930\u094d\u0925\u0928\u093e \u092a\u0941\u0938\u094d\u0924\u093f\u0915\u093e \u092e\u0947\u0902 \u0905\u0928\u0941\u0935\u093e\u0926 \u0928\u0939\u0940\u0902\u0964",pt:"Livreto p. 47. Grava\u00e7\u00e3o: Dropbox \u201cPurusha suktam\u201d. Sem tradu\u00e7\u00e3o no livreto Prathana."},
    "vishnu-sahasranama":{de:"Heft S. 62. Aufnahme: Dropbox \u201eOnly Sri Vishnu Sahasranam (from SPN)\u201c. Keine \u00dcbersetzung im Prathana-Heft.",en:"Booklet p. 62. Recording: Dropbox \u201cOnly Sri Vishnu Sahasranam (from SPN)\u201d. No translation in the Prathana booklet.",fr:"Livret p. 62. Enregistrement : Dropbox \u00ab Only Sri Vishnu Sahasranam (from SPN) \u00bb. Pas de traduction dans le livret Prathana.",es:"Cuadernillo p. 62. Grabaci\u00f3n: Dropbox \u201cOnly Sri Vishnu Sahasranam (from SPN)\u201d. Sin traducci\u00f3n en el cuadernillo Prathana.",ru:"\u0411\u0443\u043a\u043b\u0435\u0442, \u0441. 62. \u0417\u0430\u043f\u0438\u0441\u044c: Dropbox \u00abOnly Sri Vishnu Sahasranam (from SPN)\u00bb. \u0412 \u0431\u0443\u043a\u043b\u0435\u0442\u0435 Prathana \u043d\u0435\u0442 \u043f\u0435\u0440\u0435\u0432\u043e\u0434\u0430.",hi:"\u092a\u0941\u0938\u094d\u0924\u093f\u0915\u093e \u092a\u0943. 62\u0964 \u0930\u093f\u0915\u0949\u0930\u094d\u0921\u093f\u0902\u0917: Dropbox \u201cOnly Sri Vishnu Sahasranam (from SPN)\u201d\u0964 \u092a\u094d\u0930\u093e\u0930\u094d\u0925\u0928\u093e \u092a\u0941\u0938\u094d\u0924\u093f\u0915\u093e \u092e\u0947\u0902 \u0905\u0928\u0941\u0935\u093e\u0926 \u0928\u0939\u0940\u0902\u0964",pt:"Livreto p. 62. Grava\u00e7\u00e3o: Dropbox \u201cOnly Sri Vishnu Sahasranam (from SPN)\u201d. Sem tradu\u00e7\u00e3o no livreto Prathana."}};
  function cap(l){ return l.charAt(0).toUpperCase()+l.slice(1); }
  function apply(){
    if(typeof PRAYERS==="undefined") return;
    Object.keys(M).forEach(function(id){
      var P=PRAYERS.find(function(p){ return p.id===id; }); if(!P) return;
      var f="audio/"+id+".mp3";
      if(P.audio!==f){ P.audio=f; P.audioAlt=[CDN+id+".mp3"]; P.preferFile=true; P.noAudio=false; }
      if(P.marksFile!==M[id].m){ P.marksFile=M[id].m; P.seqFile=M[id].s; }
      if(P.quelle&&P.quelle.indexOf("Dropbox")<0) P.quelle+=" \u00b7 Ton: Dropbox (bearbeitet)";
      var h=H[id]; Object.keys(h).forEach(function(l){ var k=l==="de"?"hinweis":"hinweis"+cap(l); if(P[k]!==h[l]) P[k]=h[l]; });
      if(P.hinweisDe!==h.de) P.hinweisDe=h.de;
    });
  }
  M=(function(){ var o={}; Object.keys(M).forEach(function(id){ var m=M[id]; o[id]={m:m, s:m.map(function(t,k){ return [t,k]; })}; }); return o; })();
  apply(); setInterval(apply,1500);
})();
(function(){ /* [Grok-Bot] V3.55: erster Start -> Hilfe einmal automatisch; "Esc zum Schliessen" */
  var ESC={de:"Esc zum Schließen",en:"Esc to close",fr:"Échap pour fermer",es:"Esc para cerrar",ru:"Esc — закрыть",hi:"बंद करने के लिए Esc",pt:"Esc para fechar"};
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return ESC[l]?l:"en"; }
  var st=document.createElement("style"); st.textContent="#bppHelp .esc355{text-align:center;font-size:.85rem;opacity:.75;margin:0 0 8px}"; document.head.appendChild(st);
  setInterval(function(){ var d=document.getElementById("bppHelp"); if(!d) return; var inn=d.querySelector(".in"); if(!inn||inn.querySelector(".esc355")) return;
    var p=document.createElement("p"); p.className="esc355"; p.textContent=ESC[lg()]; inn.insertBefore(p,inn.firstChild); },150);
  var seen=false; try{ seen=localStorage.getItem("bpp-intro-seen")==="1"; }catch(e){}
  var fresh=!!window.bppFresh && !seen;
  try{ localStorage.setItem("bpp-intro-seen","1"); }catch(e){}
  if(!fresh) return;
  var n=0; (function go(){ if(typeof window.bppHelp==="function"&&document.body){ setTimeout(function(){ try{ window.bppHelp(); }catch(e){} },900); return; } if(++n<60) setTimeout(go,200); })();
})();
