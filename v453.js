/* [Grok-Bot] V4.53:
   (1) Śrī Durgā Cālīsā: Refrain/erster Abschnitt ab 17 s (Nutzerangabe); weitere Strophenstarts
       aus Stimmenband-Korrelation der Refrain-Phrase + Silbenfüllung; Schlussanker 711.2 s.
   (2) Hanumān Cālīsā: Bhavani-Aufnahme = Rec: Mtj in id=hanuman, Rec: Pbj = V4.52-Aufnahme audio/hanuman-kanaka.mp3 + YT fBw-BSoZGgM + Marken v306
       (V4.53 hatte fälschlich audio/hanuman-prabhus.mp3). Mtj: Strophe 0 Mangala Mūrti, Refrain „rāmaji se rāma rāma kahiyo“
       (Wortlaut aus follow.js/V2.00; Übersetzungen von Grok ergänzt). seq neu gemappt.
       ?p=hanuman-bhavani → hanuman&rec=mtj; Eintrag nicht mehr unter Weitere.
   (3) Taste „Tagesleiste“: Labels lagen hier kurz parallel zu v435 → Flackern; ab V4.54 nur noch v435. */
window.BPP_BUILD="4.53"; window.BPP_SHOW="4.53";

/* --- Durga Chalisa Sync --- */
(function(){
  if(window.bppV453d) return; window.bppV453d=1;
  var M=[17,32.2,56.8,93.5,140.1,174,196.8,224.4,262.5,307.6,330.9,379.5,408.7,443.5,482,516.5,543,578.5,602.9,646,685,711.2];
  function apply(){
    if(typeof PRAYERS==="undefined") return;
    var P=PRAYERS.find(function(p){ return p.id==="durga-chalisa"; }); if(!P) return;
    P.marksFile=M.slice();
    P._bppEstMarks=0; P._bppEstSrc="";
    try{ delete P.seqFile; }catch(e){}
  }
  apply();
  setInterval(apply, 1500);
  document.addEventListener("DOMContentLoaded", apply);
})();

/* Tagesleiste-Labels: einzige Quelle ab V4.54 in v435.js (dieser Block entfernt, kein Doppel-Paint). */

/* --- Hanuman Mtj/Pbj --- */
(function(){
  if(window.bppV453h) return; window.bppV453h=1;
  var MTJ_SEQ=[[8.7,0],[16,0],[24,0],[32,0],[44.2,1],[52.3,2],[59.8,3],[101.1,4],[115.3,5],[133.3,3],[152.9,6],[166.5,7],[183.4,3],[202.2,8],[215.1,9],[231.5,3],[249.9,10],[262.5,11],[278.5,3],[296.6,12],[309.1,13],[324.9,3],[340.3,14],[352.5,15],[366.2,3],[381.8,16],[392.4,17],[405.7,3],[421,18],[431.3,19],[444.5,3],[459.8,20],[470.1,21],[483.2,3],[494,22],[508.3,23],[521.2,3],[536.2,24],[551.3,25],[583.4,26],[616.6,3],[639.3,27]];
  /* [Grok-Bot] V4.56: Pbj = exakt V4.52 (v224/v306): Kanaka-MP3 + YT fBw-BSoZGgM + gemessene Marken. Nicht hanuman-prabhus.mp3. Mtj unverändert. */
  var PBJ_M=[24.8,46.8,68.9,76.0,99.5,119.8,139.5,159.1,178.4,197.9,217.6,237.1,256.6,275.8,293.4,311.1,328.1,344.9,361.0,377.1,392.3,407.0,421.9,435.9,451.6,481.8,507.6];
  var PBJ_SEQ=PBJ_M.map(function(t,k){ return [t,k]; });
  var MTJ_F="audio/hanuman.mp3", PBJ_F="audio/hanuman-kanaka.mp3?v=234", PBJ_YT="fBw-BSoZGgM";
  var K="bpp-prabhus-hanuman";
  function onPbj(){ try{ return localStorage.getItem(K)==="prabhus"; }catch(e){ return false; } }
  function marksFromSeq(seq){
    var m=[]; (seq||[]).forEach(function(e){ if(e&&typeof e[0]==="number"&&typeof e[1]==="number"&&m[e[1]]==null) m[e[1]]=e[0]; });
    return m;
  }
  var REF_SA="siyā vara rāmacandra pada jai śaraṇam\nrāmaji se rāma rāma kahiyo";
  var REF_UE="Zuflucht zu den Füßen Ramachandras, des Gemahls von Sita. Hanuman, sag Rama unser „Rama, Rama“. (von Grok ergänzt)";
  var REF_EN="Refuge at the feet of Ramachandra, Sita's beloved. Hanuman, tell Rama our \"Rama, Rama\". (added by Grok)";

  var baseZeilen=null, mtjZeilen=null, pbjZeilen=null, hooked=null, baseBag={};

  function cloneZ(z){
    var o={nr:z.nr, ch:z.ch, sa:z.sa, ue:z.ue, en:z.en};
    ["fr","es","ru","hi","pt","cz","lineCh","x2"].forEach(function(k){ if(z[k]!=null) o[k]=z[k]; });
    return o;
  }

  function build(){
    if(typeof PRAYERS==="undefined") return null;
    var P=PRAYERS.find(function(p){ return p.id==="hanuman"; }); if(!P||!P.zeilen) return null;
    if(!baseZeilen){
      /* Zeilen vor unserem Getter einfangen (Übersetzungen v433 bereits geladen) */
      var raw=P.zeilen;
      try{ if(Object.getOwnPropertyDescriptor(P,"zeilen")&&Object.getOwnPropertyDescriptor(P,"zeilen").get) raw=raw; }catch(e){}
      baseZeilen=raw.map(cloneZ);
      pbjZeilen=baseZeilen.map(cloneZ);
      var z=baseZeilen.map(cloneZ).filter(function(x){ return !/siyā vara rāmacandra pada/.test(x.sa||""); });
      z.unshift({
        nr:"0", ch:"D     C     G     D",
        sa:"maṅgala mūrti maruta nandana\nsakala amaṅgala mula nikandana",
        ue:"Dohā. Sohn des Windes, Bild des Segens, der alles Unheil an der Wurzel ausreißt.",
        en:"Doha. Son of the wind, embodiment of blessing, who uproots all misfortune."
      });
      /* 0=Mangala, 1=śrī, 2=buddhi, danach Refrain (Index 3) */
      z.splice(3, 0, {
        nr:"R", ch:"D     C     G     D",
        sa:REF_SA, ue:REF_UE, en:REF_EN, x2:true
      });
      z.forEach(function(x,i){ if(x.nr!=="R" && !/^Kīrtan/i.test(x.nr||"")) x.nr=String(i); });
      mtjZeilen=z;
    }
    return P;
  }

  function applyProps(P){
    if(!P||hooked===P) return;
    baseBag={
      audio:P.audio, audioAlt:P.audioAlt, preferFile:P.preferFile,
      marksFile:P.marksFile&&P.marksFile.slice?P.marksFile.slice():P.marksFile,
      seqFile:P.seqFile, marksYt:P.marksYt, seqYt:P.seqYt, youtube:P.youtube, youtubeStart:P.youtubeStart,
      quelle:P.quelle, hinweis:P.hinweis
    };
    function mtj(){ return !onPbj(); }
    Object.defineProperty(P,"audio",{configurable:true,enumerable:true,get:function(){ return mtj()?MTJ_F:PBJ_F; },set:function(v){ baseBag.audio=v; }});
    Object.defineProperty(P,"audioAlt",{configurable:true,enumerable:true,get:function(){
      return ["https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/"+(mtj()?MTJ_F:PBJ_F)];
    },set:function(v){ baseBag.audioAlt=v; }});
    Object.defineProperty(P,"preferFile",{configurable:true,enumerable:true,get:function(){ return true; },set:function(v){ baseBag.preferFile=v; }});
    function mtjSeq(){ return (window.BPP_MTJ_SEQ&&window.BPP_MTJ_SEQ.length)?window.BPP_MTJ_SEQ:MTJ_SEQ; } /* V4.67: Sync-Datei */
    Object.defineProperty(P,"seqFile",{configurable:true,enumerable:true,get:function(){ return mtj()?mtjSeq().slice().map(function(e){return e.slice();}):PBJ_SEQ.map(function(e){return e.slice();}); },set:function(v){ if(!mtj()) baseBag.seqFile=v; }});
    Object.defineProperty(P,"marksFile",{configurable:true,enumerable:true,get:function(){
      if(mtj()){ this._bppEstMarks=0; this._bppEstSrc=""; return marksFromSeq(mtjSeq()); }
      this._bppEstMarks=0; this._bppEstSrc=""; return PBJ_M.slice();
    },set:function(v){ if(!mtj()) baseBag.marksFile=v; }});
    Object.defineProperty(P,"marksYt",{configurable:true,enumerable:true,get:function(){ return mtj()?(baseBag.marksYt||marksFromSeq(mtjSeq())):PBJ_M.slice(); },set:function(v){ baseBag.marksYt=v; }});
    Object.defineProperty(P,"seqYt",{configurable:true,enumerable:true,get:function(){ return mtj()?(baseBag.seqYt||mtjSeq().slice().map(function(e){return e.slice();})):PBJ_SEQ.map(function(e){return e.slice();}); },set:function(v){ baseBag.seqYt=v; }});
    Object.defineProperty(P,"youtube",{configurable:true,enumerable:true,get:function(){ return mtj()?(baseBag.youtube||"rhSVddEZW88"):PBJ_YT; },set:function(v){ baseBag.youtube=v; }});
    Object.defineProperty(P,"zeilen",{configurable:true,enumerable:true,get:function(){ return mtj()?mtjZeilen:pbjZeilen; },set:function(){ /* Strip von außen ignorieren */ }});
    Object.defineProperty(P,"quelle",{configurable:true,enumerable:true,get:function(){
      return mtj()
        ?"Prathana with chords · Sri Vitthal Dham · Ton: Mataji Bhavani (Rec: Mtj) / Prabhus (Rec: Pbj)"
        :"Prathana with chords · Sri Vitthal Dham · Ton: Hanuman Chalisa – Kanaka Dasananda (Rec: Pbj, wie V4.52)";
    },set:function(v){ baseBag.quelle=v; }});
    Object.defineProperty(P,"hinweis",{configurable:true,enumerable:true,get:function(){
      return mtj()
        ?"Rec: Mtj – Mangala Mūrti mehrmals, danach Śrī Guru; Refrain „rāmaji se rāma rāma kahiyo“ nach je zwei Strophen."
        :"Rec: Pbj – Kanaka-Aufnahme wie V4.52; Text und Akkorde wie im Heft.";
    },set:function(v){ baseBag.hinweis=v; }});
    hooked=P;
  }

  function hideBhavani(){
    if(typeof PRAYERS==="undefined") return;
    var b=PRAYERS.find(function(p){ return p.id==="hanuman-bhavani"; });
    if(b){ b._bppAliasOf="hanuman"; b._bppHide=1; }
    document.querySelectorAll(".list .item").forEach(function(el){
      var di=el.getAttribute("data-i"); if(di==null) return;
      var p=PRAYERS[+di]; if(p&&p.id==="hanuman-bhavani") el.style.display="none";
    });
  }

  /* Redirect alte Links (URL + laufende Auswahl) */
  (function(){
    try{
      var q=new URLSearchParams(location.search), pid=q.get("p");
      if(pid==="hanuman-bhavani"){
        try{ localStorage.setItem(K,"alt"); }catch(e){}
        q.set("p","hanuman"); q.set("rec","mtj");
        history.replaceState(null,"",location.pathname+"?"+q.toString()+location.hash);
      }
      var rec=(q.get("rec")||"").toLowerCase();
      if((q.get("p")==="hanuman"||pid==="hanuman-bhavani") && (rec==="mtj"||rec==="pbj")){
        try{ localStorage.setItem(K, rec==="pbj"?"prabhus":"alt"); }catch(e){}
      }
    }catch(e){}
  })();

  var switched=false;
  function switchAlias(){
    if(switched||typeof PRAYERS==="undefined"||typeof i==="undefined"||i<0) return;
    if(!PRAYERS[i]||PRAYERS[i].id!=="hanuman-bhavani") return;
    switched=true;
    try{ localStorage.setItem(K,"alt"); }catch(e){}
    var idx=PRAYERS.findIndex(function(p){ return p.id==="hanuman"; });
    if(idx<0) return;
    var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(e){}
    try{ play(idx,true,was); }catch(e){}
  }

  var TIPS={"de":["Aufnahme Prabhujis","Aufnahme Matajis"],"en":["Recording Prabhujis","Recording Matajis"],"fr":["Enregistrement Prabhujis","Enregistrement Matajis"],"es":["Grabación Prabhujis","Grabación Matajis"],"ru":["Запись Прабхуджис","Запись Матаджис"],"hi":["प्रभुजीस रिकॉर्डिंग","माताजीस रिकॉर्डिंग"],"pt":["Gravação Prabhujis","Gravação Matajis"],"cz":["Nahrávka Prabhujis","Nahrávka Matajis"]};
  function tipLg(){ return (typeof lang!=="undefined"&&TIPS[lang])?lang:"en"; }
  function cur(){ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function placeBtn(){
    var t=document.getElementById("lyrTitle"); if(!t) return;
    var p=cur(); if(!p||p.id!=="hanuman"){
      var old=document.getElementById("bppRec453"); if(old) old.style.display="none";
      return;
    }
    var sh=document.getElementById("bppShare");
    var b=document.getElementById("bppRec453");
    if(!b){
      b=document.createElement("button"); b.type="button"; b.id="bppRec453"; b.className="bppRec";
      b.addEventListener("click",function(e){
        e.stopPropagation();
        var o=onPbj();
        try{ localStorage.setItem(K, o?"alt":"prabhus"); }catch(err){}
        var P=PRAYERS.find(function(x){ return x.id==="hanuman"; });
        var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(err){}
        try{ putSong("hanuman",{line:0,time:0}); }catch(err){}
        try{ play(PRAYERS.indexOf(P),true,was); }catch(err){}
        try{ if(typeof paintLyrics==="function") paintLyrics(); }catch(err){}
        placeBtn();
      });
    }
    var o=onPbj();
    b.textContent=o?"Rec: Pbj":"Rec: Mtj";
    b.classList.toggle("pbj",o);
    b.title=TIPS[tipLg()][o?0:1];
    b.setAttribute("aria-pressed",o?"true":"false");
    b.style.display="";
    if(sh&&sh.parentNode===t) t.insertBefore(b,sh); else if(b.parentNode!==t) t.appendChild(b);
  }

  function stampMtj(){
    if(!mtjZeilen) return;
    var n=0;
    mtjZeilen.forEach(function(x){
      if(/rāmaji se rāma rāma kahiyo/.test(x.sa||"")){ x.nr="R"; x.x2=true; }
      else if(/^Kīrtan/i.test(String(x.nr||""))){ /* lassen */ }
      else { x.nr=String(n++); x.x2=false; }
    });
  }
  function tick(){
    var P=build(); if(P) applyProps(P);
    stampMtj(); /* v224 setzt sonst alle 1,5 s nr=i+1 und löscht R */
    hideBhavani(); switchAlias(); placeBtn();
  }
  tick();
  setInterval(tick, 500);
  document.addEventListener("DOMContentLoaded", tick);

  window.bppHanuman453=function(){ var P=PRAYERS&&PRAYERS.find(function(p){return p.id==="hanuman";}); return {pbj:onPbj(), audio:P&&P.audio, yt:P&&P.youtube, m6:P&&P.marksFile&&P.marksFile[6], pbjF:PBJ_F, mtjF:MTJ_F, mtjSeq:MTJ_SEQ.length, mtjN:mtjZeilen&&mtjZeilen.length, pbjN:pbjZeilen&&pbjZeilen.length, maxK:Math.max.apply(null,MTJ_SEQ.map(function(e){ return e[1]; }))}; };
})();
