/* [Grok-Bot] V5.01: Mukunda Mala Stotram – Notation (Note names in D) statt Lyrics,
   Umschalter Noten/Text (Knopf = nächste Aktion, Gold = Noten aktiv). Ein Besitzer.
   Zuordnung: PDF-Seite 1 = Mangala/Intro, Seiten 2–41 = Strophen 1–40 (gedruckte Nummer).
   Offline: Notation-Bilder + Manifest im App-Cache beim Prayers-Download. Fit/eine Seite: v502. critical=false. */
window.BPP_BUILD="5.02"; window.BPP_SHOW="5.02";
(function(){
  if(window.bppV501) return; window.bppV501=1;
  var PID="mukunda", LS="bpp-mms-notes", MAN="assets/mms-notes/manifest.json";
  var APP_CACHE=null; /* filled from sw VER when possible */
  try{ APP_CACHE="bpp-app-"+(window.BPP_VERSION||"5.01").replace(/\./g,""); }catch(e){ APP_CACHE="bpp-app-5020"; }
  /* Prefer live SW APP name via known VER bump */
  APP_CACHE="bpp-app-5020";

  var LAB={
    de:{notes:"Noten",text:"Text",titleNotes:"Notation anzeigen",titleText:"Text/Lyrics anzeigen",sym:"𝄞"},
    en:{notes:"Notes",text:"Text",titleNotes:"Show notation",titleText:"Show lyrics",sym:"𝄞"},
    fr:{notes:"Notes",text:"Texte",titleNotes:"Afficher la notation",titleText:"Afficher le texte",sym:"𝄞"},
    es:{notes:"Notas",text:"Texto",titleNotes:"Mostrar notación",titleText:"Mostrar letra",sym:"𝄞"},
    ru:{notes:"Ноты",text:"Текст",titleNotes:"Показать ноты",titleText:"Показать текст",sym:"𝄞"},
    hi:{notes:"नोट्स",text:"पाठ",titleNotes:"नोटेशन दिखाएँ",titleText:"बोल दिखाएँ",sym:"𝄞"},
    pt:{notes:"Notas",text:"Texto",titleNotes:"Mostrar notação",titleText:"Mostrar letra",sym:"𝄞"},
    cz:{notes:"Noty",text:"Text",titleNotes:"Zobrazit notaci",titleText:"Zobrazit text",sym:"𝄞"}
  };
  function L(){ var l=(typeof lang!=="undefined"&&LAB[lang])?lang:"en"; return LAB[l]; }
  function on(){ try{ return localStorage.getItem(LS)==="1"; }catch(e){ return false; } }
  function setOn(v){ try{ localStorage.setItem(LS, v?"1":"0"); }catch(e){} }
  function curP(){ try{ return (typeof i!=="undefined"&&i>=0&&PRAYERS[i])?PRAYERS[i]:null; }catch(e){ return null; } }
  function isMms(){ var P=curP(); return !!(P&&P.id===PID); }

  var man=null, manPromise=null, lastStanzaKey="", paintLock=0;
  function loadMan(){
    if(man) return Promise.resolve(man);
    if(manPromise) return manPromise;
    manPromise=fetch(MAN,{cache:"force-cache"}).then(function(r){ return r.ok?r.json():null; }).then(function(j){
      man=j; return man;
    }).catch(function(){ return null; });
    return manPromise;
  }
  function stanzaKeyNow(){
    try{
      if(!isMms()) return "";
      var P=curP(), gs=typeof stanzaGroups==="function"?stanzaGroups(P):[];
      var g=(typeof currentGroupIndex==="function")?currentGroupIndex():0;
      if(g<0) g=0;
      if(gs[g]&&gs[g].key) return String(gs[g].key);
      if(P&&P.zeilen&&P.zeilen[line]) return String(P.zeilen[line].nr||"");
    }catch(e){}
    return "Mangala";
  }
  function pageForStanza(key){
    if(!man||!man.pages) return null;
    var k=String(key||"");
    if(/^Mangala/i.test(k) || k==="0") return man.pages[0];
    var hit=null;
    man.pages.forEach(function(p){ if(String(p.stanza)===k) hit=p; });
    return hit;
  }
  function noteUrls(){
    var u=[MAN];
    if(man&&man.pages) man.pages.forEach(function(p){ if(p.file) u.push(p.file); });
    else { for(var n=1;n<=41;n++){ u.push("assets/mms-notes/p"+String(n).padStart(2,"0")+".webp"); } }
    return u;
  }
  window.bppMmsNoteUrls501=function(){ return loadMan().then(function(){ return noteUrls(); }); };

  /* Offline: put notation into APP cache (alongside prayers download) */
  function cacheNotes(){
    if(!("caches" in window)) return Promise.resolve();
    return loadMan().then(function(){
      var urls=noteUrls();
      return caches.open(APP_CACHE).then(function(c){
        var chain=Promise.resolve();
        urls.forEach(function(path){
          chain=chain.then(function(){
            var abs=new URL(path, location.href).href;
            return c.match(abs).then(function(hit){
              if(hit) return;
              return fetch(path+(path.indexOf("?")>=0?"&":"?")+"bppdl=1",{cache:"no-store",credentials:"same-origin"}).then(function(r){
                if(!r||!r.ok) return;
                return r.blob().then(function(b){
                  var h=new Headers(); h.set("Content-Type", r.headers.get("Content-Type")||"image/webp");
                  h.set("Content-Length", String(b.size));
                  return c.put(abs, new Response(b,{status:200,headers:h}));
                });
              }).catch(function(){});
            });
          });
        });
        return chain;
      });
    });
  }
  window.bppCacheMmsNotes501=cacheNotes;

  /* Hook download owner so notes ride along once */
  function hookDl(){
    var names=["bppOfflineEnsure491","bppOfflineEnsure487","bppOfflineRun"];
    names.forEach(function(n){
      var fn=window[n];
      if(typeof fn!=="function" || fn._bpp501) return;
      window[n]=function(){
        var r=fn.apply(this, arguments);
        Promise.resolve(r).then(function(){ return cacheNotes(); }).catch(function(){});
        return r;
      };
      window[n]._bpp501=1;
    });
  }

  var st=document.createElement("style");
  st.textContent=
    "#bppNotes501{display:none;align-items:center;gap:4px;margin:0 0 0 6px;padding:3px 9px;font:600 .82rem/1.2 system-ui,sans-serif;"+
      "border:1px solid #6b5338;border-radius:8px;background:transparent;color:#cbb89a;cursor:pointer;vertical-align:middle}"+
    "#bppNotes501 .sym{font-size:1.05rem;opacity:.9;filter:grayscale(1);margin-right:2px}"+
    "#bppNotes501.on, #bppNotes501.gold{background:#e0b45a!important;border-color:#e0b45a!important;color:#1a1208!important}"+
    "#bppNotes501.on .sym, #bppNotes501.gold .sym{filter:none;opacity:1}"+
    "#lyrics.bpp-notes-mode{column-count:1!important;columns:auto!important}"+
    "#lyrics .bppNotesWrap501{margin:0;padding:0 0 24px}"+
    "#lyrics .bppNotesWrap501 .songtitle{margin-bottom:8px}"+
    "#lyrics .bppNotesPage501{margin:0 0 14px;padding:0;border:1px solid #3d2f26;border-radius:10px;overflow:hidden;background:#fff}"+
    "#lyrics .bppNotesPage501.active{outline:2px solid #e0b45a;outline-offset:1px}"+
    "#lyrics .bppNotesPage501 img{display:block;width:100%;height:auto;max-width:100%;background:#fff}"+
    "#lyrics .bppNotesCap501{font:600 .75rem/1.2 system-ui,sans-serif;color:#e0b45a;padding:4px 8px;background:#1a120c}"+
    "@media(max-width:400px){#bppNotes501{padding:3px 7px;font-size:.78rem}}"+
    /* Groß-Modus: Notation lesbar */
    "#bppFsBox .bppNotesPage501 img, .bppFs #lyrics .bppNotesPage501 img{width:100%;height:auto}";
  document.head.appendChild(st);

  function ensureBtn(){
    var b=document.getElementById("bppNotes501");
    if(!b){
      b=document.createElement("button"); b.type="button"; b.id="bppNotes501";
      b.innerHTML='<span class="sym" aria-hidden="true">𝄞</span><span class="lab"></span>';
      b.addEventListener("click", function(e){
        e.preventDefault(); e.stopPropagation();
        if(!isMms()) return;
        setOn(!on());
        paintBtn();
        if(typeof paintLyrics==="function") paintLyrics();
        else paintNotesOnly();
      }, true);
    }
    placeBtn(b);
    paintBtn();
    return b;
  }
  function placeBtn(b){
    var host=document.getElementById("lyrTitle")||document.getElementById("now")||document.querySelector("#lyrics .songtitle");
    if(!host) return;
    /* Prefer beside share / title */
    if(b.parentNode!==host){
      var sh=document.getElementById("bppShare");
      if(sh&&sh.parentNode===host) host.insertBefore(b, sh);
      else host.appendChild(b);
    }
  }
  function paintBtn(){
    var b=document.getElementById("bppNotes501"); if(!b) return;
    var show=isMms();
    b.style.display=show?"inline-flex":"none";
    if(!show) return;
    var t=L(), notes=on();
    /* Knopf zeigt nächste Aktion; Gold = Noten aktiv */
    var lab=notes?t.text:t.notes;
    var title=notes?t.titleText:t.titleNotes;
    var span=b.querySelector(".lab"); if(span) span.textContent=lab; else b.textContent=lab;
    b.title=title; b.setAttribute("aria-label", title);
    b.setAttribute("aria-pressed", notes?"true":"false");
    b.classList.toggle("on", notes); b.classList.toggle("gold", notes);
  }

  function paintNotesOnly(){
    var box=document.getElementById("lyrics"); if(!box||!isMms()||!on()) return;
    loadMan().then(function(m){
      if(!m||!m.pages){ box.innerHTML="<div class='songtitle'>"+(curP().titel||"")+"</div><p style='opacity:.7;padding:8px'>Notation nicht geladen.</p>"; return; }
      var key=stanzaKeyNow();
      var html="<div class='bppNotesWrap501'><div class='songtitle'>"+(curP().titel||"Mukunda Mala Stotram")+"</div>";
      m.pages.forEach(function(p){
        var active=(String(p.stanza)===String(key)) || (key==="Mangala"&&p.page===1);
        html+="<div class='bppNotesPage501"+(active?" active":"")+"' data-stanza='"+String(p.stanza).replace(/'/g,"")+"' id='bppNoteSt501-"+p.page+"'>"+
          "<div class='bppNotesCap501'>"+String(p.label||p.stanza)+"</div>"+
          "<img src='"+p.file+"' alt='Notation "+String(p.label||p.stanza)+"' loading='lazy' decoding='async' width='1190' height='840'></div>";
      });
      html+="</div>";
      box.classList.add("bpp-notes-mode");
      box.innerHTML=html;
      scrollToActive();
      try{ if(typeof layoutLyrics==="function") layoutLyrics(); }catch(e){}
    });
  }
  function scrollToActive(){
    try{
      var el=document.querySelector("#lyrics .bppNotesPage501.active");
      if(el) el.scrollIntoView({block:"nearest", behavior:"smooth"});
    }catch(e){}
  }

  /* Wrap paintLyrics – sole view owner when notes mode on MMS */
  function wrapPaint(){
    if(typeof paintLyrics!=="function" || paintLyrics._bpp501) return;
    var orig=paintLyrics;
    window.paintLyrics=function(){
      ensureBtn();
      var box=document.getElementById("lyrics");
      if(isMms()&&on()){
        paintLock=Date.now();
        if(typeof window.bppPaintNotes502==="function"){ window.bppPaintNotes502(); return; }
        paintNotesOnly();
        return;
      }
      if(box) box.classList.remove("bpp-notes-mode");
      return orig.apply(this, arguments);
    };
    window.paintLyrics._bpp501=1;
    window.paintLyrics._orig501=orig;
  }

  /* Follow stanza changes while notes mode */
  function watchStanza(){
    var k=stanzaKeyNow();
    if(k&&k!==lastStanzaKey){
      lastStanzaKey=k;
      if(isMms()&&on()){
        if(typeof window.bppNotesFollow502==="function"){ window.bppNotesFollow502(k); paintBtn(); return; }
        var el=document.querySelector("#lyrics .bppNotesPage501[data-stanza='"+k.replace(/'/g,"\\'")+"']");
        document.querySelectorAll("#lyrics .bppNotesPage501.active").forEach(function(n){ n.classList.remove("active"); });
        if(el){ el.classList.add("active"); el.scrollIntoView({block:"nearest",behavior:"smooth"}); }
        else if(/^Mangala/i.test(k)){
          var m=document.getElementById("bppNoteSt501-1");
          if(m){ m.classList.add("active"); m.scrollIntoView({block:"nearest",behavior:"smooth"}); }
        }
      }
    }
    paintBtn();
  }

  /* Source credit on mukunda prayer object + sources panel enrichment */
  function patchSources(){
    try{
      var P=(PRAYERS||[]).find(function(p){ return p.id===PID; });
      if(!P) return;
      var mark="Notation: Note names in D (Sibelius PDF; Dropbox)";
      if(P.quelle&&P.quelle.indexOf("Note names")<0){
        P.quelle=P.quelle+" · "+mark;
      }else if(!P.quelle){ P.quelle=mark; }
      var addDe="Notation (Note names in D) umschaltbar – PDF Kulashekara Alvar / Sibelius, Dropbox.";
      var addEn="Toggleable notation (note names in D) – PDF Kulashekara Alvar / Sibelius, Dropbox.";
      if(P.hinweis&&P.hinweis.indexOf("Note names")<0) P.hinweis=P.hinweis+" "+addDe;
      if(P.hinweisDe&&P.hinweisDe.indexOf("Note names")<0) P.hinweisDe=P.hinweisDe+" "+addDe;
      if(!P.hinweisDe) P.hinweisDe=(P.hinweis||"")+" "+addDe;
      if(P.hinweisEn&&P.hinweisEn.indexOf("note names")<0) P.hinweisEn=P.hinweisEn+" "+addEn;
      if(!P.hinweisEn) P.hinweisEn=addEn;
    }catch(e){}
  }

  function boot(){
    wrapPaint(); hookDl(); patchSources(); ensureBtn();
    loadMan();
    if(typeof paintLyrics==="function") try{ paintLyrics(); }catch(e){}
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(boot, 200); });
  else setTimeout(boot, 200);
  setInterval(function(){ wrapPaint(); hookDl(); ensureBtn(); watchStanza(); }, 500);
  window.addEventListener("bpp-lang", function(){ paintBtn(); if(isMms()&&on()) paintNotesOnly(); });
  window.bppToggleMmsNotes501=function(){ setOn(!on()); paintBtn(); if(typeof paintLyrics==="function") paintLyrics(); };
  window.bppMmsNotesOn501=on;
})();
