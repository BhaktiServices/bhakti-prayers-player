/* [Grok-Bot] V5.35: Neue Studio-Aufnahmen "HQ" (Dropbox 03 Bhakti Marga/05 Prayers Bhajan Vedic Chants/HQ, WAV 48 kHz 16 Bit stereo),
   als MP3 mit 192 kbit/s (CBR, 48 kHz, stereo) - nichts unter 160 kbit/s, nichts gequetscht. Die bisherigen Aufnahmen bleiben unveraendert und bleiben Standard.
   (1) Gleiche Darbietung, nur bessere Datei (belegt, siehe unten): Die Zeitmarken bleiben gueltig, es wird nur die Datei getauscht.
       - Krishna Suprabhatam, Rec: Pbj (audio/suprabhatam-ra.mp3) -> audio/svd-suprabhatam.mp3 (aus 04_Ganesha+Gayatri+Krishna ab 70,0209 s).
       - Hanuman Chalisa, Rec: Pbj (audio/hanuman-kanaka.mp3) -> audio/svd-hanuman-1.mp3 (13_Hanuman Chalisa V1, 116,4 ms Vorlauf, damit die Zeitachse gleich ist).
       Beleg: Wellenform-Kreuzkorrelation (8 kHz, 100-3000 Hz) an drei Stellen je Datei mit gleichem Versatz (Suprabhatam 70,0209 s, Hanuman -0,1164 s), Kontrolle nach dem Schnitt: Versatz 0,0000 s.
   (2) Andere Darbietung (Zeitmarken NICHT uebertragbar): zusaetzliche Taste "Rec: SVD" unter dem Titel, Standard AUS. Solange es keine gepruefte Zeitmarken gibt,
       gibt es dort keine Synchronisation (keine Marken, keine Schaetzung, kein YouTube), dazu der Hinweis "Timing folgt". Wahl in localStorage "bpp-svd-<id>" (1/2 = Fassung).
       Guru Stotram (01), Guruji Gayatri (03), Govinda (05 V1/V2), Vishnu Sahasranama (06), Narasimha (07 V1/V2), Vishnu Arati (09), Hanuman (13 V2).
   (3) V5.35 Zeit-VORSCHLAEGE (proposed, per Pausenmessung, von Claus zu pruefen): Guru Stotram, Vishnu Arati (Str. 1-9), Govinda V1/V2, Vishnu Sahasranama (Rec: SVD).
       Methode: Gesang mit Demucs getrennt, Pausen im Gesangs-Pegel gemessen, Zeilenraster (Zeilen = Zeilen der BPP-Texte, bei Luecken gleichmaessig aufgefuellt),
       Strophenanfang = Zeilenzaehlung aus dem BPP-Text. Nichts erfunden: Narasimha V1/V2 und Hanuman V2 bleiben ohne Marken ("Timing folgt").
   (4) Gebete mit neuer SVD-Aufnahme tragen in der Liste einen kleinen goldenen Punkt (#D6BF90, nur Zierde per CSS, Beschriftungen unveraendert).
   (5) Weitere reine Audio-Eintraege (kein Text im Player, keine Zeiten) unter "Weitere": Sammeldateien und Lieder aus HQ (audio/svd/, MP3 192 kbit/s).
   Die neuen Dateien stehen nicht in den Offline-Listen (Groesse), sie werden beim Abspielen geladen. */
window.BPP_BUILD="5.37"; window.BPP_SHOW="5.37";
(function(){
  if(window.bppV535) return; window.bppV535=1;
  var UP={"audio/hanuman-kanaka.mp3":"audio/svd-hanuman-1.mp3"}; /* V5.37: Suprabhatam-Pbj bleibt die alte Datei, die bessere Datei hat jetzt den eigenen Knopf Rec: HQ */
  var SAME={"suprabhatam":1}; /* gleiche Darbietung wie Pbj: HQ nutzt die Pbj-Zeiten unveraendert */
  var CF={
    "guru-stotram":["audio/svd-guru-stotram.mp3"],
    "guruji-gayatri":["audio/svd-guruji-gayatri.mp3"],
    "govinda":["audio/svd-govinda-1.mp3","audio/svd-govinda-2.mp3"],
    "vishnu-sahasranama":["audio/svd-vishnu-sahasranama.mp3"],
    "narasimha":["audio/svd-narasimha-1.mp3","audio/svd-narasimha-2.mp3"],
    "vishnu-arati":["audio/svd-vishnu-arati.mp3"],
    "hanuman":["audio/svd-hanuman-2.mp3"],
    "suprabhatam":["audio/svd-suprabhatam.mp3"]
  };
  var PROP={"hanuman":{"1":[6.8, 30.6, 49.4, 58.6, 84.4, 107.9, 131.6, 154.4, 177.6, 200.6, 223.4, 246.0, 267.3, 288.2, 308.9, 329.6, 349.9, 370.0, 386.1, 402.0, 417.9, 433.6, 448.5, 463.1, 478.1, 507.0, 540.2]},"guru-stotram":{"1":[27.0,43.3,60.7,78.9,96.8,114.7,132.8,150.9,169.1,187.1,205.4,223.3,241.7,260.6]},"vishnu-arati":{"1":[1.2,24.0,47.1,70.1,93.2,116.3,139.2,161.9,184.6,null,null,null]},"govinda":{"1":[null,34.6,61.6,88.3,115.0,141.9,168.9,195.8,222.7,249.6,276.5,302.4,328.1,353.7,379.2,404.7,429.9,455.1,480.1,505.1,530.2,555.3,580.2,605.1,629.7,654.5,679.1,703.9,730.5],"2":[null,25.2,49.7,73.2,97.0,120.6,144.2,167.9,191.4,215.3,239.5,263.6,288.0,312.4,336.8,360.8,384.7,408.7,432.8,456.9,481.0,505.0,528.9,552.8,576.6,600.7,624.8,649.0,674.8]},"vishnu-sahasranama":{"1":[5.2,14.0,23.1,31.7,40.6,49.3,58.3,74.9,86.6,95.7,106.3,114.7,123.3,132.4,141.5,149.8,158.6,167.4,176.2,185.4,194.6,203.6,212.6,308.7,328.4,363.3,374.8,393.0,406.3,421.2,429.7,446.3,455.0,463.7,472.4,480.9,489.2,497.7,506.2,515.0,523.7,532.2,540.6,549.4,558.1,566.6,574.9,583.4,592.0,600.5,608.8,617.4,626.0,634.4,643.1,651.8,660.2,668.7,681.6,694.3,703.0,711.5,720.0,728.7,737.5,745.9,754.5,763.5,772.0,780.5,789.2,798.1,806.7,815.1,823.9,832.1,840.9,849.6,858.4,866.9,875.4,884.0,892.5,901.3,909.9,918.0,926.7,935.0,943.7,952.7,961.2,969.6,977.9,986.6,995.2,1004.0,1012.4,1020.7,1028.8,1037.6,1046.4,1054.8,1063.7,1072.4,1081.4,1090.2,1098.7,1107.3,1115.6,1124.1,1132.6,1141.3,1150.1,1158.6,1167.1,1175.7,1184.1,1192.5,1200.6,1209.0,1217.4,1225.9,1234.0,1242.4,1250.6,1259.1,1267.5,1275.9,1284.4,1292.8,1301.4,1309.9,1318.3,1327.2,1336.5,1343.5,1352.2,1360.8,1391.0,1399.2,1407.5,1415.6,1424.2,1432.7,1441.2,1450.0,1458.7,1467.0,1475.5,1483.9,1492.3,1500.9,1509.6,1518.2,1526.2,1534.4,1540.8,1548.6,1556.5,1562.2,1577.3,1588.5,1605.6,1620.8,1650.3,1666.0,1677.4,1687.0,1693.3,1701.0]}}; /* proposed: Zeitvorschlag (Sekunden je Strophe, null = ohne Marke) */
  var TAG={"de":"Timing folgt","en":"Timing follows","fr":"Minutage à venir","es":"Tiempos pendientes","ru":"Тайминг будет позже","hi":"टाइमिंग जल्द","pt":"Tempos em breve"};
  var TIP2={"de":"Neue Studio-Aufnahme HQ (192 kbit/s). Zeiten: automatischer Vorschlag aus der Pausenmessung, bitte anhören und prüfen. Nochmal tippen: nächste Fassung bzw. zurück.",
           "en":"New studio recording HQ (192 kbit/s). Timings: automatic suggestion from pause measurement, please listen and check. Tap again: next version or back.",
           "fr":"Nouvel enregistrement studio HQ (192 kbit/s). Minutage : suggestion automatique (mesure des pauses), à vérifier à l'écoute.",
           "es":"Nueva grabación de estudio HQ (192 kbit/s). Tiempos: sugerencia automática por medición de pausas, escucha y comprueba.",
           "ru":"Новая студийная запись HQ (192 кбит/с). Тайминг: автоматическое предложение по паузам, проверьте на слух.",
           "hi":"नई स्टूडियो रिकॉर्डिंग HQ (192 kbit/s)। टाइमिंग: विराम मापन से स्वचालित सुझाव, सुनकर जाँचें।",
           "pt":"Nova gravação de estúdio HQ (192 kbit/s). Tempos: sugestão automática pela medição das pausas, ouça e confira."};
  var TIP3={"de":"Dieselbe Darbietung wie Rec: Pbj, in besserer Klangqualität (MP3 192 kbit/s). Zeiten wie bei Pbj. Nochmal tippen: zurück.",
           "en":"Same performance as Rec: Pbj, in better sound quality (MP3 192 kbit/s). Timings as for Pbj. Tap again: back.",
           "fr":"Même interprétation que Rec: Pbj, meilleure qualité sonore (MP3 192 kbit/s). Minutage comme Pbj.",
           "es":"Misma interpretación que Rec: Pbj, con mejor calidad de sonido (MP3 192 kbit/s). Tiempos como en Pbj.",
           "ru":"То же исполнение, что Rec: Pbj, но лучшее качество звука (MP3 192 кбит/с). Тайминг как у Pbj.",
           "hi":"Rec: Pbj जैसी ही प्रस्तुति, बेहतर ध्वनि गुणवत्ता (MP3 192 kbit/s)। टाइमिंग Pbj जैसी।",
           "pt":"Mesma interpretação de Rec: Pbj, com melhor qualidade de som (MP3 192 kbit/s). Tempos como no Pbj."};
  var TIP={"de":"Neue Studio-Aufnahme HQ (192 kbit/s). Noch ohne Zeitmarken. Nochmal tippen: nächste Fassung bzw. zurück.",
           "en":"New studio recording HQ (192 kbit/s). No timings yet. Tap again: next version or back.",
           "fr":"Nouvel enregistrement studio HQ (192 kbit/s). Pas encore de minutage. Toucher à nouveau : version suivante ou retour.",
           "es":"Nueva grabación de estudio HQ (192 kbit/s). Aún sin tiempos. Toca otra vez: siguiente versión o volver.",
           "ru":"Новая студийная запись HQ (192 кбит/с). Тайминга пока нет. Нажмите ещё раз: следующая версия или назад.",
           "hi":"नई स्टूडियो रिकॉर्डिंग HQ (192 kbit/s)। अभी टाइमिंग नहीं। फिर दबाएँ: अगला संस्करण या वापस।",
           "pt":"Nova gravação de estúdio HQ (192 kbit/s). Ainda sem tempos. Toque de novo: próxima versão ou voltar."};
  var CDN="https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/";
  function lg(){ return (typeof lang!=="undefined"&&TAG[lang])?lang:"en"; }
  function K(id){ return "bpp-svd-"+id; }
  function sel(id){ try{ var v=parseInt(localStorage.getItem(K(id)),10); var n=(CF[id]||[]).length; return (v>=1&&v<=n)?v:0; }catch(e){ return 0; } }
  function setSel(id,v){ try{ if(v) localStorage.setItem(K(id),String(v)); else localStorage.removeItem(K(id)); }catch(e){} }
  function strip(u){ return String(u||"").split("?")[0]; }
  var hooked={};
  function chain(P,k,fn,tag){ tag=tag||"c"; /* fn(prevValue, sel) -> Wert; vorhandene Zugriffe bleiben darunter erhalten */
    var d=Object.getOwnPropertyDescriptor(P,k)||{}; if(d.get&&d.get.__v535&&d.get.__v535[tag]) return;
    var prev=d.get||null, base=d.get?undefined:P[k], ps=d.set||null;
    var g=function(){ return fn(prev?prev.call(P):base); }; var pt=(prev&&prev.__v535)||{}; g.__v535={}; for(var q in pt) g.__v535[q]=pt[q]; g.__v535[tag]=1; if(prev) Object.keys(prev).forEach(function(q){ if(q!=="__v535") g[q]=prev[q]; });
    Object.defineProperty(P,k,{configurable:true,enumerable:true,get:g,set:function(v){ if(ps) ps.call(P,v); else base=v; }}); }
  function hook(){ if(typeof PRAYERS==="undefined") return;
    PRAYERS.forEach(function(P){ var id=P.id; if(!id) return;
      if(CF[id]){
        var S=function(){ return sel(id); };
        chain(P,"audio",function(v){ var s=S(); return s?CF[id][s-1]:v; });
        chain(P,"audioAlt",function(v){ var s=S(); return s?[CDN+CF[id][s-1]]:v; });
        chain(P,"youtube",function(v){ return S()?null:v; });
        chain(P,"youtubeStart",function(v){ return S()?0:v; });
        chain(P,"preferFile",function(v){ return S()?true:v; });
        ["marksFile","seqFile","marksYt","seqYt"].forEach(function(k){ chain(P,k,function(v){ var s=S(); if(!s||SAME[id]) return v; var pr=proposed(id,s); return (k==="marksFile"&&pr)?pr.slice():[]; }); });
      }
      if(id==="hanuman"){
        chain(P,"audio",function(v){ var u=typeof v==="string"?UP[strip(v)]:null; return u?u:v; },"u");
      }
    });
    var c=cur(); if(c&&CF[c.id]&&sel(c.id)){ c._bppEstMarks=0; c._bppEstYt=0; c._bppEstSrc=""; } }
  function proposed(id,s){ var r=(PROP[id]&&PROP[id][String(s)])||null; if(r&&id==="hanuman"){ var P=null; try{ P=PRAYERS.find(function(p){ return p.id==="hanuman"; }); }catch(e){}
      var n=P&&P.zeilen?P.zeilen.length:r.length; if(n===r.length+1) r=[null].concat(r); } return r; } /* V5.36: Hanuman-Vorschlag gilt fuer die Pbj-Anordnung (1,2,Refrain,4..27); in der Mtj-Anordnung (mit Intro-Doha) bleibt das Intro ohne Marke */
  function cur(){ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function many(p){ try{ var g=(typeof stanzaGroups==="function")?stanzaGroups(p):null; return !g||g.length>=2; }catch(e){ return true; } }
  /* V5.36: genau ein Rec-Knopf hervorgehoben. Aktiv SVD = Gold, die anderen Rec-Knoepfe (Mtj/Pbj/...) dann Silber; ohne SVD behalten Mtj/Pbj ihre Farbe und SVD ist Silber. */
  (function(){ var st=document.createElement("style"); st.id="bppSvdRecCss536";
    st.textContent="#bppSvd535{background:#c5c9d0!important;border:1px solid rgba(30,35,64,.25)!important;color:#141a33!important;opacity:.85}"+
      "html.bppSvdOn536 #bppSvd535{background:#D6BF90!important;border:1px solid #9a7b34!important;color:#1a1410!important;opacity:1}"+
      "html.bppSvdOn536 .bppRec:not(.svd535),html.bppSvdOn536 button[id^=bppRec][data-rec]:not(.svd535),html.bppSvdOn536 button[id^=bppRec][data-rec]:not(.svd535).on,html.bppSvdOn536 button[id^=bppRec][data-rec]:not(.svd535).spnOn,html.bppSvdOn536 button[id^=bppRec][data-rec]:not(.svd535).pbj{background:#c5c9d0!important;border:1px solid rgba(30,35,64,.25)!important;color:#141a33!important;box-shadow:none!important;opacity:.85}";
    (document.head||document.documentElement).appendChild(st); })();
  function recMark(on){ var h=document.documentElement; if(on&&!h.classList.contains("bppSvdOn536")) h.classList.add("bppSvdOn536"); else if(!on&&h.classList.contains("bppSvdOn536")) h.classList.remove("bppSvdOn536"); }
  /* V5.37: Beschriftung "Rec: HQ" (vorher SVD; intern unveraendert). ?rec=svd oder ?rec=hq (auch svd1/svd2/hq1/hq2) im Link startet die SVD-Aufnahme des Gebets p= (nur beim Laden) */
  (function(){ try{ var q=new URLSearchParams(location.search), r=(q.get("rec")||"").toLowerCase(), p=q.get("p"); var m=/^(?:svd|hq)([12]?)$/.exec(r);
    if(m&&p&&CF[p]){ var n=m[1]?parseInt(m[1],10):1; if(n>=1&&n<=CF[p].length) setSel(p,n); } else if(r&&p&&CF[p]) setSel(p,0); }catch(e){} })();
  function place(){
    var t=document.getElementById("lyrTitle"), p=cur(); var b=document.getElementById("bppSvd535"), tg=document.getElementById("bppSvdTag535");
    if(!t||!p||!CF[p.id]){ if(b) b.style.display="none"; if(tg) tg.style.display="none"; var mm=document.getElementById("bppRecMtj537"); if(mm) mm.style.display="none"; recMark(false); return; }
    if(!b){ b=document.createElement("button"); b.type="button"; b.id="bppSvd535"; b.className="bppRec svd535";
      
      b.addEventListener("click",function(e){ e.stopPropagation(); var q=cur(); if(!q||!CF[q.id]) return;
        var s=sel(q.id), n=CF[q.id].length; if(SAME[q.id]&&!s){ try{ localStorage.setItem("bpp-prabhus-"+q.id,"prabhus"); }catch(x){} } setSel(q.id,s>=n?0:s+1);
        var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(x){}
        try{ putSong(q.id,{line:0,time:0}); }catch(x){} try{ play(PRAYERS.indexOf(q),true,was); }catch(x){} }); }
    if(!tg){ tg=document.createElement("span"); tg.id="bppSvdTag535"; tg.style.cssText="margin-left:.4em;font-size:.7rem;color:#e8c98a;white-space:nowrap"; }
    var s=sel(p.id), n=CF[p.id].length;
    b.textContent="Rec: HQ"+(s&&n>1?" "+s:""); b.setAttribute("aria-pressed",s?"true":"false"); b.title=TIP[lg()];
    b.style.display=""; recMark(!!s);
    var pr=s?proposed(p.id,s):null; tg.textContent=TAG[lg()]; tg.style.display=(s&&!pr&&!SAME[p.id]&&many(p))?"":"none"; if(pr) b.title=TIP2[lg()]; if(SAME[p.id]) b.title=TIP3[lg()];
    if(b.parentNode!==t){ var sh=document.getElementById("bppShare"); if(sh&&sh.parentNode===t) t.insertBefore(b,sh); else t.appendChild(b); }
    if(tg.parentNode!==t||tg.previousSibling!==b) t.insertBefore(tg,b.nextSibling);
    mtjBtn(t,p,b,tg,s); }
  /* V5.37: Gayatri (Guruji): die bisherige Aufnahme (hohe Frauenstimme) bekommt den Knopf "Rec: Mtj" wie die anderen Gebete; "Rec: HQ" daneben. Keine neue Aufnahme, keine Zeiten. */
  var MTJ_ONLY={"guruji-gayatri":1};
  var MTJ_TIP={"de":"Aufnahme Matajis","en":"Recording Matajis","fr":"Enregistrement Matajis","es":"Grabación Matajis","ru":"Запись Матаджис","hi":"माताजीस रिकॉर्डिंग","pt":"Gravação Matajis"};
  function mtjBtn(t,p,b,tg,s){ var m=document.getElementById("bppRecMtj537");
    if(!MTJ_ONLY[p.id]){ if(m) m.style.display="none"; return; }
    if(!m){ m=document.createElement("button"); m.type="button"; m.id="bppRecMtj537"; m.className="bppRec"; m.textContent="Rec: Mtj";
      m.addEventListener("click",function(e){ e.stopPropagation(); var q=cur(); if(!q||!MTJ_ONLY[q.id]) return; if(!sel(q.id)) return; setSel(q.id,0);
        var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(x){}
        try{ putSong(q.id,{line:0,time:0}); }catch(x){} try{ play(PRAYERS.indexOf(q),true,was); }catch(x){} }); }
    m.title=MTJ_TIP[lg()]||MTJ_TIP.en; m.setAttribute("aria-pressed",s?"false":"true"); m.style.display="";
    if(m.parentNode!==t||m.previousSibling!==tg) t.insertBefore(m,tg.nextSibling); }
  document.addEventListener("click",function(e){ /* andere Rec-Tasten (Mtj/Pbj/SPN) schalten SVD aus */
    try{ var el=e.target&&e.target.closest?e.target.closest(".bppRec,#bppRec402,#bppRec408"):null; if(!el||el.id==="bppSvd535"||el.id==="bppRecMtj537") return;
      var p=cur(); if(p&&CF[p.id]&&sel(p.id)){ setSel(p.id,0);
        if(SAME[p.id]){ e.stopPropagation(); e.preventDefault(); /* HQ aus: auf Rec: Pbj zurueck (nicht weiterschalten) */
          var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(x){} try{ putSong(p.id,{line:0,time:0}); }catch(x){} try{ play(PRAYERS.indexOf(p),true,was); }catch(x){} } } }catch(x){} },true);
  window.bppSvd535=function(){ var p=cur(); return {id:p&&p.id,sel:p?sel(p.id):0,audio:p&&p.audio,marks:p&&p.marksFile,seq:p&&p.seqFile,yt:p&&p.youtube}; };
  function wrapS(){ /* Rec: SVD: ohne Zeitvorschlag keine geschaetzte Strophenfolge (Anzeige bleibt bei Strophe 1); mit Vorschlag: nach der letzten Marke keine Schaetzung. Eigene Zeiten (N/Klick auf Strophe) gelten weiter. */
    var f=window.bppStarts; if(typeof f!=="function"||f.__v535) return;
    var w=function(p){ var st=f.apply(this,arguments); try{ var c=cur(); if(c&&CF[c.id]&&!SAME[c.id]&&sel(c.id)&&Array.isArray(st)){
        var u=(typeof bppUserMarks==="function")?bppUserMarks(c.id):{}; if(Object.keys(u).length) return st;
        var pr=proposed(c.id,sel(c.id)), last=-1; if(pr) pr.forEach(function(x,g){ if(typeof x==="number") last=g; });
        return st.map(function(x,g){ return g<=last?x:(g?1e7+g:0); }); } }catch(e){} return st; };
    Object.keys(f).forEach(function(k){ w[k]=f[k]; }); w.__v535=1; window.bppStarts=w; try{ bppStarts=w; }catch(e){} }

  /* (5) Weitere reine Audio-Eintraege unter "Weitere" (kein Text, keine Zeiten) */
  var EX=[["svd-names-vaishnava","Names + Vaishnava (HQ)","names-vaishnava"],
    ["svd-ramanuja-vishnu-arati","Ramanuja + Vishnu Arati (HQ)","ramanuja-vishnu-arati"],
    ["svd-om-stotram-names-arati","Om + Stotram + Names + Arati (HQ)","om-stotram-names-arati"],
    ["svd-ganesha-gayatri-narasimha-1","Ganesha + Gayatri + Narasimha V1 (HQ)","ganesha-gayatri-narasimha-1"],
    ["svd-ganesha-gayatri-narasimha-2","Ganesha + Gayatri + Narasimha V2 (HQ)","ganesha-gayatri-narasimha-2"],
    ["svd-shayan-arati","Shayan Arati (HQ)","shayan-arati"],
    ["svd-bhajo-guru-vishwananda","Bhajo Guru Vishwananda (HQ)","bhajo-guru-vishwananda"],
    ["svd-sri-gurudev-satgurudev","Sri Gurudev Satgurudev (HQ)","sri-gurudev-satgurudev"],
    ["svd-svgpn-guruji","SVGPN Guruji (HQ)","svgpn-guruji"]];
  var NOTXT={"ue":"Nur Aufnahme – noch kein Text im Player.","en":"Recording only – no text in the player yet.","pt":"Só a gravação – ainda sem texto no player."};
  var DOT={"suprabhatam":1,"hanuman":1}; Object.keys(CF).forEach(function(k){ DOT[k]=1; }); EX.forEach(function(e){ DOT[e[0]]=1; });
  function addExtras(){ if(window.bppExtras535||typeof PRAYERS==="undefined"||typeof window.paintList!=="function") return;
    if(!document.querySelector("button.item")) return; window.bppExtras535=1;
    EX.forEach(function(e){ if(PRAYERS.some(function(p){ return p.id===e[0]; })) return;
      PRAYERS.push({id:e[0],titel:e[1],autor:"",quelle:"Aufnahme: HQ (Dropbox), MP3 192 kbit/s. Nur Audio, ohne Text und ohne Zeiten.",hinweis:"",
        zeilen:[{nr:"",sa:"\u266a",ue:NOTXT.ue,en:NOTXT.en,pt:NOTXT.pt}],audio:"audio/svd/"+e[2]+".mp3",preferFile:true}); });
    try{ window.paintList(); }catch(x){} }
  /* Menue = <select>-Optionen (reiner Text, wie schon "✎"): goldener Punkt als Suffix; Farbe wirkt in Desktop-Listen, mobil zeigt das System-Menue den Punkt in Textfarbe. Zusaetzlich Punkt an button.item, falls die Listenansicht genutzt wird. */
  (function(){ var st=document.createElement("style"); st.id="bppSvdDotCss535";
    st.textContent="button.item[data-svd]::after{content:'';display:inline-block;width:.55em;height:.55em;margin-left:.5em;border-radius:50%;background:#D6BF90;box-shadow:0 0 0 1px rgba(70,48,22,.65);vertical-align:middle}";
    (document.head||document.documentElement).appendChild(st); })();
  function dots(){ if(typeof PRAYERS==="undefined") return;
    document.querySelectorAll("button.item[data-i]").forEach(function(b){ var P=PRAYERS[+b.getAttribute("data-i")]; var on=!!(P&&DOT[P.id]);
      if(on&&!b.hasAttribute("data-svd")) b.setAttribute("data-svd","1"); else if(!on&&b.hasAttribute("data-svd")) b.removeAttribute("data-svd"); });
    var box=document.getElementById("bppSel");
    if(box) [].forEach.call(box.querySelectorAll("select"),function(se){ var g=se._g; if(!g) return;
      g.items.forEach(function(x,k){ if(x.i===null||x.i===undefined) return; var P=PRAYERS[+x.i]; if(!P||!DOT[P.id]) return;
        if(!/ \u25CF$/.test(x.t)) x.t=x.t+" \u25CF"; var o=se.options[k+1]; if(!o) return;
        if(!o.hasAttribute("data-svd")) o.setAttribute("data-svd","1"); if(!/ \u25CF$/.test(o.textContent)) o.textContent=o.textContent+" \u25CF"; }); }); }
  hook(); wrapS(); setInterval(function(){ hook(); wrapS(); place(); addExtras(); dots(); },300);
  window.addEventListener("load",function(){ hook(); place(); });
})();
