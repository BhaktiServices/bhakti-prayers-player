/* [Grok-Bot] V5.35: Neue Studio-Aufnahmen "Samstag SVD" (Dropbox 03 Bhakti Marga/05 Prayers Bhajan Vedic Chants/Samstag SVD, WAV 48 kHz 16 Bit stereo),
   als MP3 mit 192 kbit/s (CBR, 48 kHz, stereo) - nichts unter 160 kbit/s, nichts gequetscht. Die bisherigen Aufnahmen bleiben unveraendert und bleiben Standard.
   (1) Gleiche Darbietung, nur bessere Datei (belegt, siehe unten): Die Zeitmarken bleiben gueltig, es wird nur die Datei getauscht.
       - Krishna Suprabhatam, Rec: Pbj (audio/suprabhatam-ra.mp3) -> audio/svd-suprabhatam.mp3 (aus 04_Ganesha+Gayatri+Krishna ab 70,0209 s).
       - Hanuman Chalisa, Rec: Pbj (audio/hanuman-kanaka.mp3) -> audio/svd-hanuman-1.mp3 (13_Hanuman Chalisa V1, 116,4 ms Vorlauf, damit die Zeitachse gleich ist).
       Beleg: Wellenform-Kreuzkorrelation (8 kHz, 100-3000 Hz) an drei Stellen je Datei mit gleichem Versatz (Suprabhatam 70,0209 s, Hanuman -0,1164 s), Kontrolle nach dem Schnitt: Versatz 0,0000 s.
   (2) Andere Darbietung (Zeitmarken NICHT uebertragbar): zusaetzliche Taste "Rec: SVD" unter dem Titel, Standard AUS. Solange es keine gepruefte Zeitmarken gibt,
       gibt es dort keine Synchronisation (keine Marken, keine Schaetzung, kein YouTube), dazu der Hinweis "Timing folgt". Wahl in localStorage "bpp-svd-<id>" (1/2 = Fassung).
       Guru Stotram (01), Guruji Gayatri (03), Govinda (05 V1/V2), Vishnu Sahasranama (06), Narasimha (07 V1/V2), Vishnu Arati (09), Hanuman (13 V2).
   Die neuen Dateien stehen nicht in den Offline-Listen (Groesse), sie werden beim Abspielen geladen. */
window.BPP_BUILD="5.35"; window.BPP_SHOW="5.35";
(function(){
  if(window.bppV535) return; window.bppV535=1;
  var UP={"audio/suprabhatam-ra.mp3":"audio/svd-suprabhatam.mp3","audio/hanuman-kanaka.mp3":"audio/svd-hanuman-1.mp3"};
  var CF={
    "guru-stotram":["audio/svd-guru-stotram.mp3"],
    "guruji-gayatri":["audio/svd-guruji-gayatri.mp3"],
    "govinda":["audio/svd-govinda-1.mp3","audio/svd-govinda-2.mp3"],
    "vishnu-sahasranama":["audio/svd-vishnu-sahasranama.mp3"],
    "narasimha":["audio/svd-narasimha-1.mp3","audio/svd-narasimha-2.mp3"],
    "vishnu-arati":["audio/svd-vishnu-arati.mp3"],
    "hanuman":["audio/svd-hanuman-2.mp3"]
  };
  var TAG={"de":"Timing folgt","en":"Timing follows","fr":"Minutage à venir","es":"Tiempos pendientes","ru":"Тайминг будет позже","hi":"टाइमिंग जल्द","pt":"Tempos em breve"};
  var TIP={"de":"Neue Studio-Aufnahme Samstag SVD (192 kbit/s). Noch ohne Zeitmarken. Nochmal tippen: nächste Fassung bzw. zurück.",
           "en":"New studio recording Saturday SVD (192 kbit/s). No timings yet. Tap again: next version or back.",
           "fr":"Nouvel enregistrement studio samedi SVD (192 kbit/s). Pas encore de minutage. Toucher à nouveau : version suivante ou retour.",
           "es":"Nueva grabación de estudio sábado SVD (192 kbit/s). Aún sin tiempos. Toca otra vez: siguiente versión o volver.",
           "ru":"Новая студийная запись суббота SVD (192 кбит/с). Тайминга пока нет. Нажмите ещё раз: следующая версия или назад.",
           "hi":"नई स्टूडियो रिकॉर्डिंग शनिवार SVD (192 kbit/s)। अभी टाइमिंग नहीं। फिर दबाएँ: अगला संस्करण या वापस।",
           "pt":"Nova gravação de estúdio sábado SVD (192 kbit/s). Ainda sem tempos. Toque de novo: próxima versão ou voltar."};
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
        ["marksFile","seqFile","marksYt","seqYt"].forEach(function(k){ chain(P,k,function(v){ return S()?[]:v; }); });
      }
      if(id==="suprabhatam"||id==="hanuman"){
        chain(P,"audio",function(v){ var u=typeof v==="string"?UP[strip(v)]:null; return u?u:v; },"u");
      }
    });
    var c=cur(); if(c&&CF[c.id]&&sel(c.id)){ c._bppEstMarks=0; c._bppEstYt=0; c._bppEstSrc=""; } }
  function cur(){ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function many(p){ try{ var g=(typeof stanzaGroups==="function")?stanzaGroups(p):null; return !g||g.length>=2; }catch(e){ return true; } }
  function place(){
    var t=document.getElementById("lyrTitle"), p=cur(); var b=document.getElementById("bppSvd535"), tg=document.getElementById("bppSvdTag535");
    if(!t||!p||!CF[p.id]){ if(b) b.style.display="none"; if(tg) tg.style.display="none"; return; }
    if(!b){ b=document.createElement("button"); b.type="button"; b.id="bppSvd535"; b.className="bppRec svd535";
      b.style.cssText="background:#2f5a4a;border:1px solid #4f8a74;color:#d4f0e4";
      b.addEventListener("click",function(e){ e.stopPropagation(); var q=cur(); if(!q||!CF[q.id]) return;
        var s=sel(q.id), n=CF[q.id].length; setSel(q.id,s>=n?0:s+1);
        var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(x){}
        try{ putSong(q.id,{line:0,time:0}); }catch(x){} try{ play(PRAYERS.indexOf(q),true,was); }catch(x){} }); }
    if(!tg){ tg=document.createElement("span"); tg.id="bppSvdTag535"; tg.style.cssText="margin-left:.4em;font-size:.7rem;color:#e8c98a;white-space:nowrap"; }
    var s=sel(p.id), n=CF[p.id].length;
    b.textContent="Rec: SVD"+(s&&n>1?" "+s:""); b.setAttribute("aria-pressed",s?"true":"false"); b.title=TIP[lg()];
    b.style.opacity=s?"1":".75"; b.style.display="";
    tg.textContent=TAG[lg()]; tg.style.display=(s&&many(p))?"":"none";
    if(b.parentNode!==t){ var sh=document.getElementById("bppShare"); if(sh&&sh.parentNode===t) t.insertBefore(b,sh); else t.appendChild(b); }
    if(tg.parentNode!==t||tg.previousSibling!==b) t.insertBefore(tg,b.nextSibling); }
  document.addEventListener("click",function(e){ /* andere Rec-Tasten (Mtj/Pbj/SPN) schalten SVD aus */
    try{ var el=e.target&&e.target.closest?e.target.closest(".bppRec,#bppRec402,#bppRec408"):null; if(!el||el.id==="bppSvd535") return;
      var p=cur(); if(p&&CF[p.id]&&sel(p.id)) setSel(p.id,0); }catch(x){} },true);
  window.bppSvd535=function(){ var p=cur(); return {id:p&&p.id,sel:p?sel(p.id):0,audio:p&&p.audio,marks:p&&p.marksFile,seq:p&&p.seqFile,yt:p&&p.youtube}; };
  function wrapS(){ /* Rec: SVD ohne gepruefte Marken: keine geschaetzte Strophenfolge (Anzeige bleibt bei Strophe 1). Tippen (N/Klick auf Strophe) setzt weiterhin eigene Zeiten. */
    var f=window.bppStarts; if(typeof f!=="function"||f.__v535) return;
    var w=function(p){ var st=f.apply(this,arguments); try{ var c=cur(); if(c&&CF[c.id]&&sel(c.id)&&Array.isArray(st)){ var u=(typeof bppUserMarks==="function")?bppUserMarks(c.id):{}; if(!Object.keys(u).length) return st.map(function(x,g){ return g?1e7+g:0; }); } }catch(e){} return st; };
    Object.keys(f).forEach(function(k){ w[k]=f[k]; }); w.__v535=1; window.bppStarts=w; try{ bppStarts=w; }catch(e){} }
  hook(); wrapS(); setInterval(function(){ hook(); wrapS(); place(); },300);
  window.addEventListener("load",function(){ hook(); place(); });
})();
