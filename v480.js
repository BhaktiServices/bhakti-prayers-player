/* [Grok-Bot] V4.80: Vaiṣṇava Mantra Rec: Mtj aus SPN-Daily-Livestream (YouTube qJodjtIyxM4,
   Schnitt 17:39–18:22 = 43 s; Nutzerangabe 26:11–27:01 war an diesem Archiv nicht Vaishnava –
   Tag/DVR-abhängig). Bearbeitet wie V3.67 (HP 80 Hz, −16 LUFS, mono 56 kbit/s).
   audio/vaishnava-mantra-mtj.mp3; Sync sync/vaishnava-mtj.json (Energie-Pausen + Whisper-Anker;
   Str. 0–2 ohne klares Whisper-„ato“ → (G+)). Lyrics unverändert aus vaishnava.js
   (nichts erfunden). Rec: Pbj = bisherige Heftaufnahme audio/vaishnava-mantra.mp3 + seqFile.
   Standard = Mtj. Taste wie Hanuman (eigene Stelle, nicht v415-Map). critical=false. */
window.BPP_BUILD="4.80"; window.BPP_SHOW="4.80";
(function(){
  if(window.bppV480) return; window.bppV480=1;
  var ID="vaishnava-mantra", K="bpp-prabhus-"+ID;
  var MTJ_F="audio/vaishnava-mantra-mtj.mp3", PBJ_F="audio/vaishnava-mantra.mp3";
  var MTJ_YT="qJodjtIyxM4", MTJ_YT_S=1059;
  var URL_SYNC="sync/vaishnava-mtj.json?v=480";
  var MTJ_SEQ=[[0.5,0],[6.9,1],[10.7,2],[17.3,3],[24.5,4],[31.3,5]];
  var PBJ_SEQ=[[1.7,0],[11.0,1],[19.8,2],[29.1,3],[38.6,4],[48.6,5]];
  var TIPS={"de":["Aufnahme Prabhujis","Aufnahme Matajis"],"en":["Recording Prabhujis","Recording Matajis"],"fr":["Enregistrement Prabhujis","Enregistrement Matajis"],"es":["Grabación Prabhujis","Grabación Matajis"],"ru":["Запись Прабхуджис","Запись Матаджис"],"hi":["प्रभुजीस रिकॉर्डिंग","माताजीस रिकॉर्डिंग"],"pt":["Gravação Prabhujis","Gravação Matajis"],"cz":["Nahrávka Prabhujis","Nahrávka Matajis"]};
  function tipLg(){ return (typeof lang!=="undefined"&&TIPS[lang])?lang:"en"; }
  function onPbj(){ try{ return localStorage.getItem(K)==="prabhus"; }catch(e){ return false; } }
  function marksFromSeq(seq){
    var m=[]; (seq||[]).forEach(function(e){ if(e&&typeof e[0]==="number"&&typeof e[1]==="number"&&m[e[1]]==null) m[e[1]]=e[0]; });
    return m;
  }
  function loadSync(){
    try{
      fetch(URL_SYNC,{cache:"no-store"}).then(function(r){ return r.ok?r.json():null; }).then(function(j){
        if(!j||!j.length) return;
        var s=[]; j.forEach(function(e){ var t=+e.start, v=+e.verse; if(isFinite(t)&&isFinite(v)) s.push([t,v|0]); });
        s.sort(function(a,b){ return a[0]-b[0]; });
        if(s.length){ MTJ_SEQ=s; window.BPP_VAISH_MTJ_SEQ=s; }
      }).catch(function(){});
    }catch(e){}
  }
  loadSync();
  var hooked=null, baseBag={}, pbjSeqSaved=null;
  function applyProps(P){
    if(!P||hooked===P) return;
    if(!pbjSeqSaved){
      pbjSeqSaved=(P.seqFile&&P.seqFile.length)?P.seqFile.map(function(e){ return e.slice(); }):PBJ_SEQ.map(function(e){ return e.slice(); });
    }
    baseBag={
      audio:P.audio, audioAlt:P.audioAlt, preferFile:P.preferFile,
      marksFile:P.marksFile, seqFile:P.seqFile, youtube:P.youtube, youtubeStart:P.youtubeStart,
      quelle:P.quelle, hinweis:P.hinweis, marksYt:P.marksYt, seqYt:P.seqYt
    };
    function mtj(){ return !onPbj(); }
    function mtjSeq(){ return (window.BPP_VAISH_MTJ_SEQ&&window.BPP_VAISH_MTJ_SEQ.length)?window.BPP_VAISH_MTJ_SEQ:MTJ_SEQ; }
    Object.defineProperty(P,"audio",{configurable:true,enumerable:true,get:function(){ return mtj()?MTJ_F:PBJ_F; },set:function(v){ baseBag.audio=v; }});
    Object.defineProperty(P,"audioAlt",{configurable:true,enumerable:true,get:function(){
      var f=mtj()?MTJ_F:PBJ_F;
      return ["https://cdn.jsdelivr.net/gh/BhaktiServices/bhakti-prayers-player@main/"+f];
    },set:function(v){ baseBag.audioAlt=v; }});
    Object.defineProperty(P,"preferFile",{configurable:true,enumerable:true,get:function(){ return true; },set:function(v){ baseBag.preferFile=v; }});
    Object.defineProperty(P,"seqFile",{configurable:true,enumerable:true,get:function(){
      return mtj()?mtjSeq().map(function(e){return e.slice();}):pbjSeqSaved.map(function(e){return e.slice();});
    },set:function(v){ if(!mtj()) pbjSeqSaved=v; }});
    Object.defineProperty(P,"marksFile",{configurable:true,enumerable:true,get:function(){
      this._bppEstMarks=0; this._bppEstSrc="";
      return marksFromSeq(mtj()?mtjSeq():pbjSeqSaved);
    },set:function(v){ if(!mtj()) baseBag.marksFile=v; }});
    Object.defineProperty(P,"youtube",{configurable:true,enumerable:true,get:function(){ return mtj()?MTJ_YT:(baseBag.youtube||"QjYfK3u6rbs"); },set:function(v){ baseBag.youtube=v; }});
    Object.defineProperty(P,"youtubeStart",{configurable:true,enumerable:true,get:function(){ return mtj()?MTJ_YT_S:(baseBag.youtubeStart||0); },set:function(v){ baseBag.youtubeStart=v; }});
    Object.defineProperty(P,"seqYt",{configurable:true,enumerable:true,get:function(){
      var o=mtj()?MTJ_YT_S:0, seq=mtj()?mtjSeq():pbjSeqSaved;
      return seq.map(function(e){ return [Math.round((e[0]+o)*10)/10, e[1]]; });
    },set:function(v){ baseBag.seqYt=v; }});
    Object.defineProperty(P,"marksYt",{configurable:true,enumerable:true,get:function(){
      return marksFromSeq(this.seqYt);
    },set:function(v){ baseBag.marksYt=v; }});
    Object.defineProperty(P,"quelle",{configurable:true,enumerable:true,get:function(){
      return mtj()
        ?"SPN Daily Livestream · YouTube qJodjtIyxM4 · 17:39–18:22 (Rec: Mtj) / Heft Sri Vitthal Dham (Rec: Pbj)"
        :(baseBag.quelle||"Prathana with chords · Sri Vitthal Dham · S. 10");
    },set:function(v){ baseBag.quelle=v; }});
    Object.defineProperty(P,"hinweis",{configurable:true,enumerable:true,get:function(){
      return mtj()
        ?"Rec: Mtj – Livestream-Schnitt; Sync Str. 0–2 aus Energie (G+), Str. 3–5 Whisper-Anker."
        :(baseBag.hinweis||"Capo 0 bis +2. Zeilen wie in der Heftvorlage.");
    },set:function(v){ baseBag.hinweis=v; }});
    hooked=P;
  }
  function cur(){ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function placeBtn(){
    var t=document.getElementById("lyrTitle"); if(!t) return;
    var p=cur();
    if(!p||p.id!==ID){
      var old=document.getElementById("bppRec480"); if(old) old.style.display="none";
      return;
    }
    var sh=document.getElementById("bppShare");
    var b=document.getElementById("bppRec480");
    if(!b){
      b=document.createElement("button"); b.type="button"; b.id="bppRec480"; b.className="bppRec";
      b.addEventListener("click",function(e){
        e.stopPropagation();
        var o=onPbj();
        try{ localStorage.setItem(K, o?"alt":"prabhus"); }catch(err){}
        var P=PRAYERS.find(function(x){ return x.id===ID; });
        var was=false; try{ was=(typeof isPlaying==="function")&&isPlaying(); }catch(err){}
        try{ putSong(ID,{line:0,time:0}); }catch(err){}
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
  function tick(){
    if(typeof PRAYERS==="undefined") return;
    var P=PRAYERS.find(function(p){ return p.id===ID; });
    if(P) applyProps(P);
    placeBtn();
  }
  tick();
  setInterval(tick, 400);
  document.addEventListener("DOMContentLoaded", tick);
  window.bppVaish480=function(){ var P=PRAYERS&&PRAYERS.find(function(p){return p.id===ID;}); return {pbj:onPbj(), audio:P&&P.audio, mtjF:MTJ_F, pbjF:PBJ_F, seq:(P&&P.seqFile)||null}; };
})();
/* <audio src="audio/vaishnava-mantra-mtj.mp3"> */
