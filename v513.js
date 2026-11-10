/* [Grok-Bot] V5.13: Groß-Noten und Lyrics.
   (1) Menü/Bedienung über dem Notenblatt: Bar, Kopf und X liegen im Stacking klar
       über der Stage; das Blatt füllt nur den gemessenen Spalt zwischen Kopf und
       aktueller Steuerleiste (auch bei offenem Menü+), ohne 55%-Deckel.
       v505 applyFsGeom setzt keine Groß-Geometrie mehr.
   (2) Noten↔Lyrics in Groß in beide Richtungen (Klick und Taste E): tearDown
       entfernt die von v508 hinterlassenen inline opacity/pointer-events an
       #bppFsBox und erzwingt draw + 2-Spalten-Fit; der Knopf bleibt sichtbar,
       solange das Gebet Noten hat. Toggle-Owner bleibt v507.
   (3) Noten-Knopf steht still: DOM nur bei echter Änderung (kein wiederholtes
       textContent/aria/insertBefore durch v501/v505/v508/v509-Intervalle).
   (4) Strophenwechsel bleibt sichtbar: Groß-Noten folgen bppFsState/stanzaKey
       direkt; nach dem Verlassen der Noten wird die Lyrics-Box wieder gezeigt;
       eine leer geräumte Box wird neu gezeichnet.
   Owner: Groß-Noten-Chrome / Sync / Knopf-Ruhe v513. critical=false. */
window.BPP_BUILD="5.13"; window.BPP_SHOW="5.13";
(function(){
  if(window.bppV513) return; window.bppV513=1;

  var st=document.createElement("style");
  st.id="bppFsNotes513css";
  st.textContent=
    "#bppFs.bpp-notes-fs #bppFsStage{"+
      "z-index:1!important;"+
      "top:var(--bpp-fs-notes-top,48px)!important;"+
      "bottom:var(--bpp-fs-notes-bot,120px)!important;"+
      "left:8px!important;right:8px!important"+
    "}"+
    "#bppFs.bpp-notes-fs .bppNotesShell503,"+
    "#bppFs.bpp-notes-fs .bppNotesFrame503{z-index:1!important}"+
    "#bppFs.bpp-notes-fs #bppFsBar{"+
      "z-index:400!important;pointer-events:auto!important;"+
      "isolation:isolate!important;opacity:1!important"+
    "}"+
    "#bppFs.bpp-notes-fs #bppFsBar.hid{opacity:1!important;pointer-events:auto!important}"+
    "#bppFs.bpp-notes-fs #bppFsTop{"+
      "z-index:410!important;pointer-events:none!important"+
    "}"+
    "#bppFs.bpp-notes-fs #bppNotesFs508{"+
      "z-index:420!important;pointer-events:auto!important"+
    "}"+
    "#bppFs.bpp-notes-fs #bppFsX{"+
      "z-index:430!important;pointer-events:auto!important"+
    "}";
  document.head.appendChild(st);

  function fsEl(){ return document.getElementById("bppFs"); }
  function fsOn(){ var f=fsEl(); return !!(f&&f.classList.contains("on")); }
  function notesWanted(){
    try{ if(typeof window.bppNotesOn505==="function") return !!window.bppNotesOn505(); }catch(e){}
    try{
      var id=(typeof i==="undefined"||i<0)?"":(PRAYERS[i]&&PRAYERS[i].id)||"";
      if(id && localStorage.getItem("bpp-notes-"+id)==="1") return true;
    }catch(e){}
    return false;
  }
  function hasNotes(){
    try{ if(typeof window.bppHasNotes505==="function") return !!window.bppHasNotes505(); }catch(e){}
    return false;
  }
  function notesFsOn(){ var f=fsEl(); return !!(f&&f.classList.contains("on")&&f.classList.contains("bpp-notes-fs")); }

  function setVar(fs, name, val){
    var cur=fs.style.getPropertyValue(name);
    if(cur!==val) fs.style.setProperty(name, val);
  }

  /* Stage strictly between measured header and measured bar; no 55% cap. */
  function applyGeom(){
    var fs=fsEl();
    if(!fs||!fs.classList.contains("on")||!fs.classList.contains("bpp-notes-fs")) return;
    var top=document.getElementById("bppFsTop");
    var bar=document.getElementById("bppFsBar");
    var stage=document.getElementById("bppFsStage");
    var vh=window.innerHeight||740;
    var topH=48, bot=120;
    try{
      if(top){
        var tr=top.getBoundingClientRect();
        topH=Math.max(32, Math.ceil(tr.bottom+6));
      }
      if(bar){
        if(bar.classList.contains("hid")) bar.classList.remove("hid");
        var br=bar.getBoundingClientRect();
        if(br.height>=16 && br.top>topH+20){
          bot=Math.max(72, Math.ceil(vh-br.top+8));
        }else{
          bot=Math.max(96, Math.min(Math.ceil((bar.offsetHeight||120)+16), Math.floor(vh*0.48)));
        }
        /* Never let the stage cover the bar */
        var maxBot=Math.max(72, vh-(topH+40));
        if(bot>maxBot) bot=maxBot;
      }
    }catch(e){}
    setVar(fs, "--bpp-fs-notes-top", topH+"px");
    setVar(fs, "--bpp-fs-notes-bot", bot+"px");
    if(stage){
      if(stage.style.top||stage.style.bottom||stage.style.left||stage.style.right){
        stage.style.top=""; stage.style.bottom=""; stage.style.left=""; stage.style.right="";
      }
    }
    var shell=fs.querySelector(".bppNotesShell503");
    if(shell && (shell.style.top||shell.style.bottom||shell.style.left||shell.style.right)){
      shell.style.top=""; shell.style.bottom=""; shell.style.left=""; shell.style.right="";
    }
    placeFsBtn();
  }

  function placeFsBtn(){
    var top=document.getElementById("bppFsTop");
    var t1=document.getElementById("bppFsT1");
    var t2=document.getElementById("bppFsT2");
    var b=document.getElementById("bppNotesFs508");
    if(!top||!b) return;
    if(t2 && t2.parentNode===top){
      if(b.nextSibling!==t2) top.insertBefore(b, t2);
    }else if(t1 && t1.parentNode===top){
      if(b.previousSibling!==t1){
        if(t1.nextSibling) top.insertBefore(b, t1.nextSibling);
        else top.appendChild(b);
      }
    }else if(b.parentNode!==top){
      top.appendChild(b);
    }
  }

  function paintBtn(id, show, on, lab, title){
    var b=document.getElementById(id); if(!b) return;
    var disp=show?"inline-flex":"none";
    if(b.style.display!==disp) b.style.display=disp;
    if(!show) return;
    var span=b.querySelector(".lab");
    if(span){
      if(span.textContent!==lab) span.textContent=lab;
    }else if(b.childNodes.length===0 && lab){
      b.textContent=lab;
    }
    if(b.title!==title){
      b.title=title;
      b.setAttribute("aria-label", title);
    }
    var pressed=on?"true":"false";
    if(b.getAttribute("aria-pressed")!==pressed) b.setAttribute("aria-pressed", pressed);
    var wantOn=!!on;
    if(b.classList.contains("on")!==wantOn) b.classList.toggle("on", wantOn);
    if(b.classList.contains("gold")!==wantOn) b.classList.toggle("gold", wantOn);
  }

  function paintFsBtn(){
    var show=fsOn() && hasNotes();
    var on=notesWanted();
    var lang=(typeof window.lang==="string")?window.lang:"de";
    var lab=on?"Text":(lang==="en"?"Notes":"Noten");
    var key=(window.bppNotesKey507||"E");
    var title=(on?"Text/Lyrics anzeigen":"Notation anzeigen")+" ("+key+")";
    paintBtn("bppNotesFs508", show, on, lab, title);
    if(show) placeFsBtn();
  }

  function paintStdBtn(){
    var b=document.getElementById("bppNotes501"); if(!b) return;
    var show=hasNotes();
    var on=notesWanted();
    var lang=(typeof window.lang==="string")?window.lang:"de";
    var lab=on?(lang==="en"?"Text":"Text"):(lang==="en"?"Notes":"Noten");
    var key=(window.bppNotesKey507||"E");
    var title=(on?"Text/Lyrics anzeigen":"Notation anzeigen")+" ("+key+")";
    paintBtn("bppNotes501", show, on, lab, title);
  }

  function restoreBox(){
    var box=document.getElementById("bppFsBox"); if(!box) return false;
    var changed=false;
    ["opacity","pointerEvents","visibility","overflow","zIndex"].forEach(function(k){
      if(box.style[k]){ box.style[k]=""; changed=true; }
    });
    return changed;
  }

  function boxVisibleText(){
    var box=document.getElementById("bppFsBox"); if(!box) return "";
    return String(box.innerText||"").replace(/\s+/g," ").trim();
  }

  function forceDraw(){
    try{
      if(typeof window.bppFsState==="function"){
        /* draw is not exported; bump by toggle-free path: close not allowed.
           Call via known hook if present, else dispatch resize-like refit. */
      }
    }catch(e){}
    try{
      var ev=new Event("resize");
      /* lastKey="" is internal. Use bppFsStep(0) no-op? step(0) may not redraw.
         Expose: many versions set window draw through bppFsOpen path.
         Fallback: temporarily append a space and rely on v183 interval 250ms
         after we clear lastKey via a known hook. */
    }catch(e){}
    try{
      if(typeof window.bppFsNotesSync508==="function"){ /* no draw */ }
    }catch(e){}
  }

  /* v183 keeps draw in a closure. Re-draw by a zero-step when possible,
     otherwise clear last-key via a harmless orientation-style hook:
     bppFsStep(0) returns early without draw; we instead click-free call
     open path is too heavy. Use a custom event some wrappers listen to,
     and also poke fontSize to bust lastKey? Safer: wrap draw from v510. */
  function redrawFs(){
    try{
      if(typeof window.bppFsDraw==="function"){ window.bppFsDraw(true); return; }
    }catch(e){}
    try{
      if(typeof window.bppFsDraw513==="function"){ window.bppFsDraw513(true); return; }
    }catch(e){}
  }

  function curPrayer(){
    try{ if(typeof i!=="undefined"&&i>=0&&PRAYERS[i]) return PRAYERS[i]; }catch(e){}
    return null;
  }

  function fsStanzaKey(){
    try{
      var P=curPrayer(); if(!P) return "";
      var gs=typeof stanzaGroups==="function"?stanzaGroups(P):[];
      if(fsOn() && typeof window.bppFsState==="function"){
        var s=window.bppFsState();
        if(s && typeof s.k==="number" && gs[s.k] && gs[s.k].key) return String(gs[s.k].key);
      }
      var g=(typeof currentGroupIndex==="function")?currentGroupIndex():0;
      if(g<0) g=0;
      if(gs[g]&&gs[g].key) return String(gs[g].key);
    }catch(e){}
    return "";
  }

  var lastFollowKey="";
  function copyNotesToFs(){
    var fs=fsEl(); if(!fs) return;
    var shell=fs.querySelector(".bppNotesShell503"); if(!shell) return;
    var lyrCap=document.querySelector("#lyrics .bppNotesCap503");
    var lyrImg=document.querySelector("#lyrics .bppNotesFrame503 img");
    var cap=shell.querySelector(".bppNotesCap503");
    var img=shell.querySelector(".bppNotesFrame503 img");
    var capTxt=lyrCap?String(lyrCap.textContent||""):"";
    var src=lyrImg?lyrImg.getAttribute("src"):"";
    if(cap && capTxt && cap.textContent!==capTxt) cap.textContent=capTxt;
    if(img && src && img.getAttribute("src")!==src){
      img.setAttribute("src", src);
      img.setAttribute("alt", capTxt||"Notation");
    }
  }

  function followNotes(){
    if(!(fsOn() && hasNotes() && notesWanted())){ lastFollowKey=""; return; }
    var key=fsStanzaKey();
    if(key && key!==lastFollowKey){
      lastFollowKey=key;
      try{ if(typeof window.bppNotesFollow505==="function") window.bppNotesFollow505(key); }catch(e){}
      setTimeout(copyNotesToFs, 30);
      setTimeout(copyNotesToFs, 200);
      setTimeout(copyNotesToFs, 600);
    }else{
      copyNotesToFs();
    }
  }

  function settle(){
    paintFsBtn();
    if(fsOn() && hasNotes() && notesWanted()){
      applyGeom();
      followNotes();
    }else if(fsOn()){
      restoreBox();
      /* Leftover standard-notes flag must not block Groß 2-col lyrics */
      try{
        if(!notesWanted()) document.body.classList.remove("bpp-notes-on503");
      }catch(e){}
      var fs=fsEl();
      if(fs && !notesWanted() && fs.classList.contains("bpp-notes-fs")){
        fs.classList.remove("bpp-notes-fs");
      }
      var txt=boxVisibleText();
      var ended=fs&&fs.classList.contains("end");
      if(!ended && !txt){
        redrawFs();
      }
    }
  }

  function afterToggle(){
    setTimeout(function(){ settle(); if(fsOn() && !notesWanted()){ restoreBox(); redrawFs(); } }, 30);
    setTimeout(function(){ settle(); if(fsOn() && !notesWanted()){ restoreBox(); redrawFs(); } }, 200);
    setTimeout(function(){ settle(); }, 500);
  }

  function wrapToggle(){
    if(typeof window.bppToggleNotes507!=="function" || window.bppToggleNotes507._bpp513) return;
    var o=window.bppToggleNotes507;
    window.bppToggleNotes507=function(){
      var r=o.apply(this, arguments);
      afterToggle();
      return r;
    };
    window.bppToggleNotes507._bpp513=1;
  }

  function wrapSync(){
    if(typeof window.bppFsNotesSync508!=="function" || window.bppFsNotesSync508._bpp513) return;
    var o=window.bppFsNotesSync508;
    window.bppFsNotesSync508=function(){
      var r=o.apply(this, arguments);
      try{
        if(fsOn() && !notesWanted()) restoreBox();
        settle();
      }catch(e){}
      return r;
    };
    window.bppFsNotesSync508._bpp513=1;
  }

  function wrapGeom509(){
    if(typeof window.bppFsNotesGeom509!=="function" || window.bppFsNotesGeom509._bpp513) return;
    window.bppFsNotesGeom509=function(){ return applyGeom(); };
    window.bppFsNotesGeom509._bpp513=1;
  }

  function wrapDraw510(){
    /* v510 already wraps draw; we hook timeupdate / interval instead.
       Try to capture a force-draw by wrapping bppFsOpen after the fact — no.
       Patch: listen for the 250ms v183 loop by observing box childList emptiness. */
  }

  function hookMenu(){
    if(document.documentElement._bpp513menu) return;
    document.documentElement._bpp513menu=1;
    try{
      new MutationObserver(function(){ if(notesFsOn()) applyGeom(); })
        .observe(document.body,{attributes:true,attributeFilter:["class"]});
    }catch(e){}
    document.addEventListener("click", function(e){
      var t=e.target;
      if(!t) return;
      var id=t.id||(t.closest&&t.closest("#bppFsMenu")&&"bppFsMenu");
      if(id==="bppFsMenu" || (t.closest&&t.closest("#bppFsMenu"))){
        setTimeout(applyGeom, 40);
        setTimeout(applyGeom, 200);
      }
    }, true);
  }

  function hookMedia(){
    var a=document.getElementById("a");
    if(!a || a._bpp513tu) return;
    a._bpp513tu=1;
    a.addEventListener("timeupdate", function(){ settle(); }, {passive:true});
  }

  function hookFs(){
    var fs=fsEl(); if(!fs||fs._bpp513mo) return !!fs;
    fs._bpp513mo=1;
    try{
      new MutationObserver(function(){ setTimeout(settle, 30); })
        .observe(fs,{attributes:true,attributeFilter:["class"]});
    }catch(e){}
    return true;
  }

  window.bppRestoreFsBox513=restoreBox;
  window.bppFsNotesGeom513=applyGeom;
  window.bppPaintNotesBtn513=paintFsBtn;
  window.bppPaintStdNotesBtn513=paintStdBtn;
  window.bppSettle513=settle;
  window.bppFollowFsNotes513=followNotes;

  function boot(){
    wrapToggle(); wrapSync(); wrapGeom509(); hookMenu(); hookFs(); hookMedia();
    settle();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(boot, 600); });
  else setTimeout(boot, 600);

  setInterval(function(){
    wrapToggle(); wrapSync(); wrapGeom509(); hookFs(); hookMedia();
    settle();
  }, 400);
})();

/* [Grok-Bot] V5.13: Resume-Seek nur einmal; Watchdog gegen Start-Schleife (critical=true).
   Ursache: index resumeLast() und v491mem restoreFromMem() rufen beide play() auf.
   Der zweite Aufruf (~1 s) macht a.src leer, a.load(), Seek zurück auf die Resume-Zeit.
   _seekQuiet (200/800/1600 ms) setzt currentTime und pausiert, ohne bppResumeOnce504 zu achten;
   loadedmetadata sucht pendingSeek erneut. Nach Src-Reload ist currentTime 0, deshalb lässt
   v504 den Seek zum Boot-Ziel wieder zu (cur < resumeTarget+0.25). */
(function(){
  if(window.bppV513seek) return; window.bppV513seek=1;

  var resumeTarget=0, resumeUsed=false, reachedResume=false, locked=false, allowUntil=0, allowWhy="";
  var backLog=[], t0=Date.now();
  var proto=Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype,"currentTime");
  try{
    var m=JSON.parse(window.bppBootMem||localStorage.getItem("bpp-mem")||"{}")||{};
    var id=m.lastId, st=(m.songs&&id&&m.songs[id])||{};
    resumeTarget=+st.time||0;
  }catch(e){}
  if(!(resumeTarget>=3)) resumeTarget=0;

  function near(a,b,d){ return isFinite(a)&&isFinite(b)&&Math.abs(a-b)<=(d==null?1.6:d); }
  function now(){ return Date.now(); }
  function userOk(){ return now()<allowUntil; }

  window.bppAllowSeek513=function(why, ms){
    allowUntil=now()+(ms==null?2000:ms);
    allowWhy=why||"user";
  };
  window.bppMarkUserPlay513=function(){ window.bppUserPlay513=1; };

  function markResume(){
    resumeUsed=true;
    window.bppResumeOnce504=1;
    window.bppResumeOnce=1;
    try{ if(typeof pendingSeek==="number"&&pendingSeek>=3) pendingSeek=0; }catch(e){}
    try{ if(window.bppV504Api&&typeof window.bppV504Api.mark==="function") window.bppV504Api.mark(); }catch(e){}
  }

  function log(){ try{ console.warn.apply(console, arguments); }catch(e){} }

  var inGuard=false;
  function guardSet(el, setter, v){
    if(inGuard) return setter.call(el,v);
    inGuard=true;
    try{
    v=+v;
    var cur=0;
    try{ cur=proto.get.call(el); }catch(e){}
    if(userOk()){
      if(resumeTarget>=3&&!resumeUsed&&near(v,resumeTarget,2)) markResume();
      return setter.call(el,v);
    }
    /* genau ein automatisches Resume */
    if(!resumeUsed && resumeTarget>=3 && near(v, resumeTarget, 2) && cur < resumeTarget+0.5){
      markResume();
      return setter.call(el,v);
    }
    if(locked){
      log("[BPP V5.13] automatischer Seek blockiert (Watchdog)", {from:cur, to:v, why:allowWhy});
      return cur;
    }
    /* Nach dem einen Resume: keine automatischen Seeks mehr.
       Ausnahme: Src-Reload hat currentTime auf 0 gesetzt, bevor die Resume-Position
       je gehalten wurde – dann den einen Resume-Seek zu Ende führen. */
    if(resumeUsed || window.bppResumeOnce504 || window.bppResumeOnce){
      var stillBefore=resumeTarget>=3 && cur<resumeTarget-0.3 && near(v,resumeTarget,2) && !reachedResume && (now()-t0<12000);
      if(stillBefore){
        return setter.call(el,v);
      }
      if(Math.abs(v-cur)>0.2){
        log("[BPP V5.13] automatischer Seek verworfen", {from:+cur.toFixed(3), to:+v.toFixed(3)});
        if(v < cur-0.2){
          var ts=now();
          backLog.push(ts);
          backLog=backLog.filter(function(x){ return ts-x<=10000; });
          if(backLog.length>2){
            locked=true;
            window.bppSeekWatchdog513=1;
            log("[BPP V5.13] Watchdog: mehr als 2 automatische Rücksprünge in 10 s – weitere automatische Seeks blockiert", backLog.slice());
          }
        }
      }
      return cur;
    }
    /* vor dem Resume: nur Ziel oder harmloses 0->ziel */
    if(resumeTarget>=3 && near(v, resumeTarget, 2)){
      markResume();
      return setter.call(el,v);
    }
    if(Math.abs(v-cur)>0.2){
      log("[BPP V5.13] automatischer Seek vor Resume verworfen", {from:cur, to:v});
    }
    return cur;
    } finally { inGuard=false; }
  }

  if(proto&&proto.get&&proto.set){
    Object.defineProperty(HTMLMediaElement.prototype,"currentTime",{
      configurable:true,
      enumerable:proto.enumerable,
      get:function(){ return proto.get.call(this); },
      set:function(v){ return guardSet(this, proto.set, v); }
    });
  }

  function hookEl(){
    var el=document.getElementById("a"); if(!el||el.__bpp513seek) return;
    el.__bpp513seek=1;
    var d=Object.getOwnPropertyDescriptor(el,"currentTime");
    var setter=(d&&d.set)?d.set:proto.set;
    var getter=(d&&d.get)?d.get:proto.get;
    if(!setter||!getter) return;
    Object.defineProperty(el,"currentTime",{
      configurable:true,
      enumerable:true,
      get:function(){ return getter.call(this); },
      set:function(v){ return guardSet(this, setter, v); }
    });
  }

  function wrapFn(obj, name, why){
    try{
      var f=obj[name]; if(typeof f!=="function"||f.__bpp513s) return;
      var w=function(){ window.bppAllowSeek513(why||name, 2500); return f.apply(this, arguments); };
      w.__bpp513s=1;
      if(typeof bppWrapMarkers489==="function") bppWrapMarkers489(w,f);
      obj[name]=w;
    }catch(e){}
  }

  function wrapKnown(){
    wrapFn(window,"nextLine","nextLine");
    wrapFn(window,"prevLine","prevLine");
    wrapFn(window,"bppFsStep","bppFsStep");
    if(window.bppPrayerNav){
      wrapFn(window.bppPrayerNav,"next","prayerNav");
      wrapFn(window.bppPrayerNav,"prev","prayerNav");
    }
    wrapFn(window,"nextSong","nextSong");
    wrapFn(window,"prevSong","prevSong");
    wrapFn(window,"stepSong","stepSong");
  }

  function wrapPlay(){
    if(typeof window.play!=="function"||window.play.__bpp513seek) return;
    var o=window.play;
    window.play=function(idx, resume, auto){
      /* Prayer-Wechsel durch Nutzer: ein Resume für das neue Stück erlauben */
      try{
        var want=(typeof PRAYERS!=="undefined"&&PRAYERS[idx])?PRAYERS[idx].id:null;
        var curId=(typeof i==="number"&&i>=0&&PRAYERS[i])?PRAYERS[i].id:null;
        if(want && want!==curId && userOk()){
          var st=0;
          try{ st=+((typeof songState==="function"&&songState(want).time)||0); }catch(e){}
          resumeTarget=st>=3?st:0;
          resumeUsed=false;
          window.bppAllowSeek513("play-switch", 2500);
        }
      }catch(e){}
      return o.apply(this, arguments);
    };
    if(typeof bppWrapMarkers489==="function") bppWrapMarkers489(window.play,o);
    window.play.__bpp513seek=1;
  }

  function wrapToggle(){
    if(typeof window.togglePlay!=="function"||window.togglePlay.__bpp513seek) return;
    var o=window.togglePlay;
    window.togglePlay=function(){
      window.bppMarkUserPlay513();
      return o.apply(this, arguments);
    };
    window.togglePlay.__bpp513seek=1;
  }

  document.addEventListener("pointerdown", function(e){
    var t=e.target; if(!t||!t.closest) return;
    if(t.closest("#btnPrev,#btnNext,#btnSeek,#lyrics .stanza,#bppSel,.list .item,input[type=range],#a,#bppFsBar .pn,button.pn")){
      window.bppAllowSeek513("pointer", 2500);
    }
    if(t.closest("#btnPlay,[id^=bppFsPlay]")) window.bppMarkUserPlay513();
  }, true);
  document.addEventListener("keydown", function(e){
    var k=(e.key||"").toLowerCase(), c=e.code||"";
    if(k==="n"||k==="v"||c==="ArrowLeft"||c==="ArrowRight"||c==="Home") window.bppAllowSeek513("key", 2000);
    if(c==="Space"||k===" "||k==="p") window.bppMarkUserPlay513();
  }, true);

  function completeResume(){
    try{
      if(reachedResume) return;
      if(!(resumeTarget>=3)) return;
      if(now()-t0>12000) return;
      var el=document.getElementById("a"); if(!el) return;
      var cur=0; try{ cur=el.currentTime; }catch(e){}
      if(cur>=resumeTarget+0.4){ reachedResume=true; markResume(); return; }
      if(el.readyState<1 || !isFinite(el.duration)) return;
      if(cur < resumeTarget-0.3){
        /* Als Resume-Owner den einen Seek zu Ende führen (nach Src-Reload auf 0). */
        inGuard=true;
        try{ proto.set.call(el, resumeTarget); }finally{ inGuard=false; }
        markResume();
      }
    }catch(e){}
  }
  function tick(){
    hookEl(); wrapKnown(); wrapPlay(); wrapToggle();
    completeResume();
  }
  tick();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", tick);
  window.addEventListener("load", tick);
  [200,600,1200,2500,5000].forEach(function(d){ setTimeout(tick,d); });
  setInterval(tick, 1500);

  window.bppV513SeekApi={
    locked:function(){ return locked; },
    used:function(){ return resumeUsed; },
    target:function(){ return resumeTarget; }
  };
})();

/* [Grok-Bot] V5.13: YT-Schalter, Prayer-Wechsel-Token, Spalten-Label, Hinweis ohne Aufnahme. */
(function(){
  if(window.bppV513misc) return; window.bppV513misc=1;

  var NOREC={
    de:"keine Aufnahme verfügbar",
    en:"no recording available",
    fr:"aucun enregistrement disponible",
    es:"no hay grabación disponible",
    ru:"запись недоступна",
    hi:"कोई रिकॉर्डिंग उपलब्ध नहीं",
    pt:"nenhuma gravação disponível",
    cz:"žádná nahrávka není k dispozici"
  };
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"de"; return NOREC[l]?l:"de"; }

  /* ---- YT aus: src=yt umbiegen, Knopf/iframe nicht laden ---- */
  function ytOff(){ return window.BPP_YT_ENABLED===false; }
  function rewriteYtSrc(){
    if(!ytOff()) return;
    try{
      var u=new URL(location.href);
      if((u.searchParams.get("src")||"").toLowerCase()==="yt"){
        u.searchParams.set("src","mp3");
        history.replaceState(null,"",u.pathname+u.search+u.hash);
      }
    }catch(e){}
    try{
      var m=JSON.parse(localStorage.getItem("bpp-mem")||"{}")||{};
      var ch=false;
      if(m.src==="yt"){ m.src="mp3"; ch=true; }
      if(m.songs){
        Object.keys(m.songs).forEach(function(id){
          if(m.songs[id] && m.songs[id].src==="yt"){ m.songs[id].src="mp3"; ch=true; }
        });
      }
      if(ch) localStorage.setItem("bpp-mem", JSON.stringify(m));
    }catch(e){}
    try{
      var sm=JSON.parse(localStorage.getItem("bpp-src")||"{}")||{};
      var ch2=false;
      Object.keys(sm).forEach(function(k){ if(sm[k]==="yt"){ sm[k]="mp3"; ch2=true; } });
      if(ch2) localStorage.setItem("bpp-src", JSON.stringify(sm));
    }catch(e){}
    try{
      var yt=document.getElementById("yt"); if(yt && yt.getAttribute("src")) yt.removeAttribute("src");
      var box=document.getElementById("ytBox"); if(box){ box.classList.remove("on"); }
      if(typeof ytOn!=="undefined") ytOn=false;
    }catch(e){}
  }

  var st=document.createElement("style");
  st.id="bppV513miscCss";
  st.textContent=
    "body.bpp-yt-off #btnSrc,body.bpp-yt-off #btnSrc189,body.bpp-yt-off #ytBox{display:none!important}"+
    "#bppNoRec513{display:none;margin:6px 12px 0;padding:6px 10px;border-radius:8px;background:#3a2a18;color:#f0d24a;font:600 .9rem/1.3 system-ui,sans-serif}"+
    "#bppNoRec513.on{display:block}";
  document.head.appendChild(st);
  if(ytOff()) document.documentElement.classList.add("bpp-yt-off"), document.addEventListener("DOMContentLoaded", function(){ document.body.classList.add("bpp-yt-off"); });

  function noAudioHint(){
    var el=document.getElementById("bppNoRec513");
    if(!el){
      el=document.createElement("div"); el.id="bppNoRec513"; el.setAttribute("role","status");
      var host=document.getElementById("lyrTitle")||document.getElementById("now")||document.getElementById("stage");
      if(host&&host.parentNode) host.parentNode.insertBefore(el, host.nextSibling);
      else document.body.appendChild(el);
    }
    var P=null; try{ if(typeof i==="number"&&i>=0) P=PRAYERS[i]; }catch(e){}
    var none=!!(P && !P.audio && (ytOff() || !P.youtube));
    el.textContent=NOREC[lg()];
    el.classList.toggle("on", none);
  }
  window.bppNoAudioHint513=noAudioHint;

  /* ---- Prayer-Wechsel: Token, veraltete paintLyrics verwerfen ---- */
  var paintTok=0;
  function curId(){ try{ return (typeof i==="number"&&i>=0&&PRAYERS[i])?PRAYERS[i].id:null; }catch(e){ return null; } }
  function lyricsMatch(id){
    var box=document.getElementById("lyrics"); if(!box||!id) return true;
    if(box.getAttribute("data-bpp-pid")===id) return true;
    try{
      var P=PRAYERS.find(function(p){ return p.id===id; });
      var sa=P&&P.zeilen&&P.zeilen[0]?String(P.zeilen[0].sa||"").replace(/\s+/g," ").slice(0,18):"";
      if(!sa) return true;
      return (box.innerText||"").indexOf(sa)>=0;
    }catch(e){ return true; }
  }
  function ensureLyrics(id, tok){
    if(tok!==paintTok) return;
    if(curId()!==id) return;
    if(lyricsMatch(id)) return;
    try{ if(typeof paintLyrics==="function") paintLyrics(); }catch(e){}
  }
  function wrapPaint(){
    if(typeof window.paintLyrics!=="function"||window.paintLyrics._bpp513tok) return;
    var o=window.paintLyrics;
    window.paintLyrics=function(){
      var id=curId(), tok=paintTok;
      var r=o.apply(this, arguments);
      try{
        if(tok!==paintTok || curId()!==id) return r; /* veraltete Antwort */
        var box=document.getElementById("lyrics");
        if(box && id) box.setAttribute("data-bpp-pid", id);
      }catch(e){}
      return r;
    };
    window.paintLyrics._bpp513tok=1;
  }
  function wrapPlayTok(){
    if(typeof window.play!=="function"||window.play._bpp513tok) return;
    var o=window.play;
    window.play=function(idx){
      var want=(typeof PRAYERS!=="undefined"&&PRAYERS[idx])?PRAYERS[idx].id:null;
      var tok=++paintTok;
      try{
        var box=document.getElementById("lyrics");
        if(box && want){ box.setAttribute("data-bpp-pid",""); }
      }catch(e){}
      var r=o.apply(this, arguments);
      [0,40,120,300,700,1400].forEach(function(d){
        setTimeout(function(){ ensureLyrics(want, tok); noAudioHint(); }, d);
      });
      return r;
    };
    if(typeof bppWrapMarkers489==="function") bppWrapMarkers489(window.play,o);
    window.play._bpp513tok=1;
  }

  function tick(){
    wrapPaint(); wrapPlayTok();
    if(ytOff()){
      rewriteYtSrc();
      try{ document.body.classList.add("bpp-yt-off"); }catch(e){}
      try{ var b=document.getElementById("btnSrc189")||document.getElementById("btnSrc"); if(b) b.style.display="none"; }catch(e){}
    }
    noAudioHint();
  }
  rewriteYtSrc();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(tick, 200); });
  else setTimeout(tick, 200);
  setInterval(tick, 800);
})();
