/* [Grok-Bot] V5.05: Notation multi-Prayer (Mukunda + Ramanuja Mangalam).
   Gleicher Knopf 𝄞 Noten/Text, Zustand pro Prayer, contain-Rahmen (v503-Layout),
   Manifeste assets/mms-notes + assets/ramanuja-notes; Offline-Cache; Quelle.
   Ramanuja: 1 handschriftliche PDF-Seite = ganzes Stück (mapping single-page).
   Owner: bppPaintNotes505 (v501/v503 weichen). critical=false. */
window.BPP_BUILD="5.05"; window.BPP_SHOW="5.05";
(function(){
  if(window.bppV505) return; window.bppV505=1;

  var REG={
    mukunda:{manifest:"assets/mms-notes/manifest.json", ls:"bpp-notes-mukunda", legacyLs:"bpp-mms-notes", label:"Mukunda Mala Stotram"},
    ramanuja:{manifest:"assets/ramanuja-notes/manifest.json", ls:"bpp-notes-ramanuja", label:"Ramanuja Mangalam"}
  };
  try{
    /* optional live registry */
    fetch("assets/notes-registry.json",{cache:"force-cache"}).then(function(r){ return r.ok?r.json():null; }).then(function(j){
      if(j&&j.prayers){ Object.keys(j.prayers).forEach(function(k){ REG[k]=Object.assign({}, REG[k]||{}, j.prayers[k]); }); }
    }).catch(function(){});
  }catch(e){}

  var mans={}, manPs={}, ro=null, fitT=0, pageIdx=0, curNotesId="";
  var APP_CACHE="bpp-app-5050";

  var LAB={
    de:{notes:"Noten",text:"Text",titleNotes:"Notation anzeigen",titleText:"Text/Lyrics anzeigen"},
    en:{notes:"Notes",text:"Text",titleNotes:"Show notation",titleText:"Show lyrics"},
    fr:{notes:"Notes",text:"Texte",titleNotes:"Afficher la notation",titleText:"Afficher le texte"},
    es:{notes:"Notas",text:"Texto",titleNotes:"Mostrar notación",titleText:"Mostrar letra"},
    ru:{notes:"Ноты",text:"Текст",titleNotes:"Показать ноты",titleText:"Показать текст"},
    hi:{notes:"नोट्स",text:"पाठ",titleNotes:"नोटेशन दिखाएँ",titleText:"बोल दिखाएँ"},
    pt:{notes:"Notas",text:"Texto",titleNotes:"Mostrar notação",titleText:"Mostrar letra"},
    cz:{notes:"Noty",text:"Text",titleNotes:"Zobrazit notaci",titleText:"Zobrazit text"}
  };
  function L(){ var l=(typeof lang!=="undefined"&&LAB[lang])?lang:"en"; return LAB[l]; }
  function curP(){ try{ return (typeof i!=="undefined"&&i>=0&&PRAYERS[i])?PRAYERS[i]:null; }catch(e){ return null; } }
  function cfg(){ var P=curP(); return (P&&REG[P.id])?REG[P.id]:null; }
  function hasNotes(){ return !!cfg(); }
  function notesId(){ var P=curP(); return (P&&REG[P.id])?P.id:""; }
  function lsKey(){
    var c=cfg(); if(!c) return "";
    if(c.legacyLs){
      try{
        if(localStorage.getItem(c.ls)==null && localStorage.getItem(c.legacyLs)!=null){
          localStorage.setItem(c.ls, localStorage.getItem(c.legacyLs));
        }
      }catch(e){}
    }
    return c.ls;
  }
  function on(){ try{ var k=lsKey(); return k?localStorage.getItem(k)==="1":false; }catch(e){ return false; } }
  function setOn(v){ try{ var k=lsKey(); if(k) localStorage.setItem(k, v?"1":"0"); }catch(e){} }

  function loadMan(id){
    id=id||notesId();
    var c=REG[id]; if(!c) return Promise.resolve(null);
    if(mans[id]) return Promise.resolve(mans[id]);
    if(manPs[id]) return manPs[id];
    manPs[id]=fetch(c.manifest,{cache:"force-cache"}).then(function(r){ return r.ok?r.json():null; })
      .then(function(j){ mans[id]=j; return j; }).catch(function(){ return null; });
    return manPs[id];
  }

  function stanzaKeyNow(){
    try{
      if(!hasNotes()) return "";
      var P=curP(), gs=typeof stanzaGroups==="function"?stanzaGroups(P):[];
      var g=(typeof currentGroupIndex==="function")?currentGroupIndex():0;
      if(g<0) g=0;
      if(gs[g]&&gs[g].key) return String(gs[g].key);
      if(P&&P.zeilen&&typeof line!=="undefined"&&P.zeilen[line]) return String(P.zeilen[line].nr||"");
    }catch(e){}
    return "";
  }

  function idxForKey(man, key){
    if(!man||!man.pages||!man.pages.length) return 0;
    var k=String(key||"");
    /* wildcard / single-page */
    for(var n=0;n<man.pages.length;n++){
      var p=man.pages[n];
      if(String(p.stanza)==="*") return n;
      if(p.covers&&p.covers.map(String).indexOf(k)>=0) return n;
    }
    if(/^Mangala/i.test(k)||k==="0") return 0;
    for(var n=0;n<man.pages.length;n++) if(String(man.pages[n].stanza)===k) return n;
    /* prefix match e.g. 1a → 1 */
    var m=k.match(/^(\d+)/);
    if(m){
      for(var n=0;n<man.pages.length;n++) if(String(man.pages[n].stanza)===m[1]) return n;
    }
    return 0;
  }

  /* ---- CSS: reuse v503 layout classes ---- */
  var st=document.createElement("style");
  st.id="bppNotesFit505css";
  st.textContent=
    "#bppNotes501{display:none;align-items:center;gap:4px;margin:0 0 0 6px;padding:3px 9px;font:600 .82rem/1.2 system-ui,sans-serif;"+
      "border:1px solid #6b5338;border-radius:8px;background:transparent;color:#cbb89a;cursor:pointer;vertical-align:middle}"+
    "#bppNotes501 .sym{font-size:1.05rem;opacity:.9;filter:grayscale(1);margin-right:2px}"+
    "#bppNotes501.on, #bppNotes501.gold{background:#e0b45a!important;border-color:#e0b45a!important;color:#1a1208!important}"+
    "#bppNotes501.on .sym, #bppNotes501.gold .sym{filter:none;opacity:1}"+
    "body.bpp-notes-on503 #list, body.bpp-notes-on503 .listbar, body.bpp-notes-on503 #hint{display:none!important}"+
    "body.bpp-notes-on503 #lyrTitle{margin:4px 12px 2px!important}"+
    "@media (max-height:520px){"+
      "body.bpp-notes-on503 #lyrTitle,body.bpp-notes-on503 #bppL1{display:none!important}"+
      "body.bpp-notes-on503 header{max-height:72px;overflow:hidden}"+
      "body.bpp-notes-on503 header .legend{display:none!important}"+
      "body.bpp-notes-on503 .bar{max-height:56px}"+
      "body.bpp-notes-on503 .bar audio{display:none!important}"+
    "}"+
    "@media (max-height:400px){"+
      "body.bpp-notes-on503 header{max-height:52px}"+
      "body.bpp-notes-on503 .bar{max-height:48px;padding:2px 6px 4px!important}"+
    "}"+
    "body.bpp-notes-on503 .bar{position:fixed!important;left:0;right:0;bottom:0;z-index:60;"+
      "margin:0!important;padding:4px 8px 6px!important;max-height:64px;overflow:hidden;"+
      "background:rgba(26,18,12,.96)!important;border-top:1px solid #6b5340;box-sizing:border-box}"+
    "body.bpp-notes-on503 .bar #now{display:none!important}"+
    "body.bpp-notes-on503 .bar audio{height:28px!important;max-height:28px;width:100%;margin:0 0 2px}"+
    "body.bpp-notes-on503 .bar .row{margin:0!important;gap:4px!important}"+
    "body.bpp-notes-on503 #stage{position:fixed!important;left:6px;right:6px;z-index:55;"+
      "margin:0!important;padding:0!important;height:auto!important;max-height:none!important;"+
      "display:block!important;grid-template-columns:none!important;gap:0!important}"+
    "body.bpp-notes-on503 #ytBox{display:none!important}"+
    "body.bpp-notes-on503 #lyrics.bpp-notes-mode, body.bpp-notes-on503 #lyrics{"+
      "position:relative!important;column-count:1!important;columns:auto!important;"+
      "overflow:hidden!important;padding:6px!important;box-sizing:border-box!important;"+
      "max-height:none!important;height:100%!important;width:100%!important;margin:0!important}"+
    "#lyrics .bppNotesShell503{position:absolute;left:6px;right:6px;top:6px;bottom:6px;display:block;overflow:hidden;box-sizing:border-box}"+
    "#lyrics .bppNotesTitle503{position:absolute;left:0;right:0;top:0;height:22px;line-height:22px;z-index:2;"+
      "color:var(--gold);font-family:'Gentium Book Plus',Georgia,serif;font-size:.95rem;"+
      "padding:0 6px;box-sizing:border-box;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"+
      "background:linear-gradient(180deg,rgba(26,18,12,.92),rgba(26,18,12,.55) 70%,transparent);pointer-events:none}"+
    "#lyrics .bppNotesCap503{position:absolute;left:0;right:0;top:22px;height:16px;line-height:16px;text-align:center;z-index:2;"+
      "font:600 .7rem/16px system-ui,sans-serif;color:#e0b45a;pointer-events:none;text-shadow:0 1px 2px #1a120c}"+
    "#lyrics .bppNotesFrame503{position:absolute;left:0;right:0;top:0;bottom:0;"+
      "background:#fff;border:2px solid #e0b45a;border-radius:10px;overflow:hidden;box-sizing:border-box;padding:4px}"+
    "#lyrics .bppNotesFrame503 img{display:block;width:100%;height:100%;object-fit:contain;object-position:center;background:#fff;border:0}"+
    "#bppFs.bpp-notes-fs #bppFsBox{visibility:hidden!important;position:absolute!important;width:0!important;height:0!important;overflow:hidden!important}"+
    "#bppFs.bpp-notes-fs #bppFsStage{position:absolute!important;left:2vw!important;right:2vw!important;top:4vh!important;bottom:12vh!important;"+
      "display:block!important;overflow:hidden!important;z-index:2}"+
    "#bppFs.bpp-notes-fs .bppNotesShell503{position:absolute!important;left:8px!important;right:8px!important;top:8px!important;bottom:8px!important;z-index:5}"+
    "#bppFs .bppNotesTitle503{position:absolute;left:0;right:0;top:0;height:22px;line-height:22px;z-index:2;"+
      "color:var(--gold);font-family:'Gentium Book Plus',Georgia,serif;font-size:.95rem;padding:0 6px;box-sizing:border-box;"+
      "overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"+
      "background:linear-gradient(180deg,rgba(26,18,12,.92),rgba(26,18,12,.55) 70%,transparent);pointer-events:none}"+
    "#bppFs .bppNotesCap503{position:absolute;left:0;right:0;top:22px;height:16px;line-height:16px;text-align:center;z-index:2;"+
      "font:600 .7rem/16px system-ui,sans-serif;color:#e0b45a;pointer-events:none;text-shadow:0 1px 2px #1a120c}"+
    "#bppFs .bppNotesFrame503{position:absolute;left:0;right:0;top:0;bottom:0;background:#fff;border:2px solid #e0b45a;border-radius:10px;overflow:hidden;box-sizing:border-box;padding:4px}"+
    "#bppFs .bppNotesFrame503 img{display:block;width:100%;height:100%;object-fit:contain;object-position:center;background:#fff;border:0}"+
    "@media(max-width:400px){#bppNotes501{padding:3px 7px;font-size:.78rem}}";
  document.head.appendChild(st);

  function barReserve(){
    var vh=window.innerHeight||800;
    if(vh<=400) return 48;
    if(vh<=520) return 56;
    return 64;
  }
  function notesTop(){
    var vh=window.innerHeight||800, top=8;
    try{
      function visibleBottom(el){
        if(!el) return 0;
        var cs=getComputedStyle(el);
        if(cs.display==="none"||cs.visibility==="hidden") return 0;
        var r=el.getBoundingClientRect();
        return r.height>2?r.bottom:0;
      }
      var bHdr=visibleBottom(document.querySelector("header"));
      var bL1=visibleBottom(document.getElementById("bppL1"));
      var bLy=visibleBottom(document.getElementById("lyrTitle"));
      var reserve=barReserve();
      var need=vh<=400?150:(vh<=520?180:240);
      if(bLy>20) top=Math.ceil(bLy+4);
      else if(bL1>20) top=Math.ceil(bL1+4);
      else if(bHdr>20) top=Math.ceil(bHdr+4);
      if((vh-top-reserve)<need){
        if(bL1>20 && (vh-Math.ceil(bL1+4)-reserve)>=need) top=Math.ceil(bL1+4);
        else if(bHdr>20) top=Math.ceil(bHdr+4);
        else top=8;
      }
      if(vh<=520) top=Math.min(top, Math.floor(vh*0.28));
    }catch(e){}
    return Math.max(4, top);
  }
  function freeGeom(){
    var vh=window.innerHeight||800;
    var top=notesTop();
    var bot=vh-barReserve();
    try{
      ["bppSrcEnd","bppOffBar466","bppFoot426","foot"].forEach(function(id){
        var el=document.getElementById(id); if(!el) return;
        var cs=getComputedStyle(el);
        if(cs.display==="none"||cs.visibility==="hidden") return;
        var fr=el.getBoundingClientRect();
        if(fr.height<8) return;
        if(fr.top>top+60 && fr.top>vh*0.55 && fr.top<bot) bot=Math.min(bot, Math.floor(fr.top-4));
      });
    }catch(e){}
    return {top:top,bot:bot,w:Math.max(80, Math.floor((window.innerWidth||360)-12)), h:Math.max(120, Math.floor(bot-top)), freeH:Math.max(120, Math.floor(bot-top))};
  }
  function setListHidden(hide){
    try{ document.body.classList.toggle("bpp-notes-on503", !!hide); }catch(e){}
  }
  function clearStagePos(){
    var stage=document.getElementById("stage");
    if(stage){ stage.style.top=""; stage.style.bottom=""; stage.style.left=""; stage.style.right=""; stage.style.height=""; stage.style.maxHeight=""; }
  }

  function fsOn(){ var f=document.getElementById("bppFs"); return !!(f&&f.classList.contains("on")); }
  function ensureFsNotes(){
    var fs=document.getElementById("bppFs"), stage=document.getElementById("bppFsStage");
    if(!fs||!stage) return null;
    if(!(hasNotes()&&on())){
      fs.classList.remove("bpp-notes-fs");
      var old=stage.querySelector(".bppNotesShell503"); if(old) old.remove();
      return null;
    }
    fs.classList.add("bpp-notes-fs");
    var shell=stage.querySelector(".bppNotesShell503");
    if(!shell){
      shell=document.createElement("div"); shell.className="bppNotesShell503";
      shell.innerHTML="<div class='bppNotesTitle503'></div><div class='bppNotesCap503'></div><div class='bppNotesFrame503'><img alt='' decoding='async'></div>";
      stage.appendChild(shell);
      var img=shell.querySelector("img");
      if(img) img.addEventListener("load", function(){ schedule(); });
    }
    var title=shell.querySelector(".bppNotesTitle503");
    if(title) title.textContent=(curP()&&curP().titel)||(cfg()&&cfg().label)||"";
    return shell;
  }
  function applyFsGeom(){
    if(!fsOn()) return null;
    var shell=ensureFsNotes(); if(!shell) return null;
    var stage=document.getElementById("bppFsStage");
    if(stage){ stage.style.left="2vw"; stage.style.right="2vw"; stage.style.top="4vh"; stage.style.bottom="12vh"; stage.style.display="block"; }
    shell.style.left="8px"; shell.style.right="8px"; shell.style.top="8px"; shell.style.bottom="8px";
    var id=notesId();
    var man=mans[id];
    if(man&&man.pages&&man.pages[pageIdx]){
      var p=man.pages[pageIdx];
      var cap=shell.querySelector(".bppNotesCap503");
      var img=shell.querySelector(".bppNotesFrame503 img");
      if(cap) cap.textContent=String(p.label||p.stanza);
      if(img && img.getAttribute("src")!==p.file){ img.setAttribute("src", p.file); img.setAttribute("alt", String(p.label||p.stanza)); }
    }
    return true;
  }

  function applyGeom(){
    if(window.bppV506) return null; /* V5.06 owns in-flow geom */
    var box=document.getElementById("lyrics");
    var stage=document.getElementById("stage");
    if(!box||!box.classList.contains("bpp-notes-mode")) return null;
    var g=freeGeom();
    if(stage){
      stage.style.top=g.top+"px"; stage.style.bottom=(window.innerHeight-g.bot)+"px";
      stage.style.left="6px"; stage.style.right="6px"; stage.style.height="auto"; stage.style.maxHeight="none";
    }
    box.style.height="100%"; box.style.maxHeight="none"; box.style.minHeight="0";
    var shell=box.querySelector(".bppNotesShell503");
    var frame=box.querySelector(".bppNotesFrame503");
    var img=frame&&frame.querySelector("img");
    if(shell){ shell.style.left="6px"; shell.style.right="6px"; shell.style.top="6px"; shell.style.bottom="6px"; }
    if(frame){ frame.style.top="0"; frame.style.bottom="0"; frame.style.left="0"; frame.style.right="0"; }
    if(img){ img.style.width="100%"; img.style.height="100%"; img.style.objectFit="contain"; img.style.objectPosition="center"; }
    box.dataset.bppFreeH=String(g.h);
    try{ applyFsGeom(); }catch(e){}
    return g;
  }

  function showPage(idx){
    var id=notesId(); var man=mans[id];
    if(!man||!man.pages||!man.pages.length) return;
    idx=Math.max(0, Math.min(man.pages.length-1, idx|0));
    pageIdx=idx;
    var p=man.pages[idx];
    var box=document.getElementById("lyrics"); if(!box) return;
    var cap=box.querySelector(".bppNotesCap503");
    var img=box.querySelector(".bppNotesFrame503 img");
    if(cap) cap.textContent=String(p.label||p.stanza);
    if(img){
      if(img.getAttribute("src")!==p.file){ img.setAttribute("src", p.file); img.setAttribute("alt", String(p.label||p.stanza)); }
    }
    applyGeom();
  }

  function paint(){
    var box=document.getElementById("lyrics");
    if(!box||!hasNotes()||!on()){ setListHidden(false); clearStagePos(); return; }
    setListHidden(true);
    curNotesId=notesId();
    loadMan(curNotesId).then(function(m){
      if(!m||!m.pages||!hasNotes()||!on()||notesId()!==curNotesId) return;
      pageIdx=idxForKey(m, stanzaKeyNow());
      box.classList.add("bpp-notes-mode");
      box.classList.remove("cols-2","cols-3","fitwrap");
      box.innerHTML="<div class='bppNotesShell503'>"+
        "<div class='bppNotesTitle503'></div><div class='bppNotesCap503'></div>"+
        "<div class='bppNotesFrame503'><img alt='' decoding='async'></div></div>";
      var title=box.querySelector(".bppNotesTitle503");
      if(title) title.textContent=(curP()&&curP().titel)||(cfg()&&cfg().label)||"";
      var img=box.querySelector(".bppNotesFrame503 img");
      if(img) img.addEventListener("load", function(){ schedule(); });
      showPage(pageIdx);
      ensureRO(box);
      requestAnimationFrame(function(){
        applyGeom();
        requestAnimationFrame(function(){ applyGeom(); showPage(pageIdx); });
      });
    });
  }

  function schedule(){
    clearTimeout(fitT);
    fitT=setTimeout(function(){ if(window.bppV506){ try{ window.bppFitNotes506&&window.bppFitNotes506(); }catch(e){} return; } if(hasNotes()&&on()) applyGeom(); }, 40);
  }
  function ensureRO(box){
    if(typeof ResizeObserver==="undefined") return;
    if(ro) try{ ro.disconnect(); }catch(e){}
    ro=new ResizeObserver(function(){ schedule(); });
    if(box) ro.observe(box);
    if(document.body) ro.observe(document.body);
    var stage=document.getElementById("stage"); if(stage) ro.observe(stage);
  }
  function follow(k){
    var id=notesId();
    loadMan(id).then(function(m){ if(m) showPage(idxForKey(m, k)); });
  }
  function clear(){
    setListHidden(false); clearStagePos();
    var box=document.getElementById("lyrics");
    if(box){
      box.style.height=""; box.style.maxHeight=""; box.style.minHeight="";
      box.classList.remove("bpp-notes-mode");
      delete box.dataset.bppFreeH;
    }
    try{
      var fs=document.getElementById("bppFs"); if(fs) fs.classList.remove("bpp-notes-fs");
      var stage=document.getElementById("bppFsStage");
      var sh=stage&&stage.querySelector(".bppNotesShell503"); if(sh) sh.remove();
    }catch(e){}
  }

  /* Button */
  function ensureBtn(){
    var b=document.getElementById("bppNotes501");
    if(!b){
      b=document.createElement("button"); b.type="button"; b.id="bppNotes501";
      b.innerHTML='<span class="sym" aria-hidden="true">𝄞</span><span class="lab"></span>';
      b.addEventListener("click", function(e){
        e.preventDefault(); e.stopPropagation();
        if(!hasNotes()) return;
        setOn(!on());
        paintBtn();
        if(typeof paintLyrics==="function") paintLyrics();
        else if(on()) paint(); else clear();
      }, true);
    }
    var host=document.getElementById("lyrTitle")||document.getElementById("now")||document.querySelector("#lyrics .songtitle");
    if(host && b.parentNode!==host){
      var sh=document.getElementById("bppShare");
      if(sh&&sh.parentNode===host) host.insertBefore(b, sh); else host.appendChild(b);
    }
    paintBtn();
    return b;
  }
  function paintBtn(){
    var b=document.getElementById("bppNotes501"); if(!b) return;
    var show=hasNotes();
    b.style.display=show?"inline-flex":"none";
    if(!show) return;
    var t=L(), notes=on();
    var span=b.querySelector(".lab"); if(span) span.textContent=notes?t.text:t.notes;
    b.title=notes?t.titleText:t.titleNotes;
    b.setAttribute("aria-label", b.title);
    b.setAttribute("aria-pressed", notes?"true":"false");
    b.classList.toggle("on", notes); b.classList.toggle("gold", notes);
  }

  /* Offline */
  function noteUrlsFor(id){
    var c=REG[id]; if(!c) return [];
    var u=[c.manifest];
    var m=mans[id];
    if(m&&m.pages) m.pages.forEach(function(p){ if(p.file) u.push(p.file); });
    else if(id==="mukunda"){ for(var n=1;n<=41;n++) u.push("assets/mms-notes/p"+String(n).padStart(2,"0")+".webp"); }
    else if(id==="ramanuja") u.push("assets/ramanuja-notes/p01.webp");
    return u;
  }
  function cacheAllNotes(){
    if(!("caches" in window)) return Promise.resolve();
    var ids=Object.keys(REG);
    return Promise.all(ids.map(function(id){ return loadMan(id); })).then(function(){
      var urls=[];
      ids.forEach(function(id){ noteUrlsFor(id).forEach(function(u){ if(urls.indexOf(u)<0) urls.push(u); }); });
      urls.push("assets/notes-registry.json");
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
                  var h=new Headers(); h.set("Content-Type", r.headers.get("Content-Type")||"application/octet-stream");
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
  window.bppCacheNotes505=cacheAllNotes;
  window.bppCacheMmsNotes501=cacheAllNotes; /* legacy hook name */
  function hookDl(){
    ["bppOfflineEnsure491","bppOfflineEnsure487","bppOfflineRun"].forEach(function(n){
      var fn=window[n];
      if(typeof fn!=="function"||fn._bpp505) return;
      window[n]=function(){
        var r=fn.apply(this, arguments);
        Promise.resolve(r).then(function(){ return cacheAllNotes(); }).catch(function(){});
        return r;
      };
      window[n]._bpp505=1;
    });
  }

  function patchSources(){
    try{
      var P=(PRAYERS||[]).find(function(p){ return p.id==="ramanuja"; });
      if(P){
        var mark="Notation: handschriftliche Noten (Telegram-PDF Ramanuja Mangalam.pdf)";
        if(!P.quelle) P.quelle=mark;
        else if(P.quelle.indexOf("handschriftlich")<0 && P.quelle.indexOf("Telegram")<0) P.quelle=P.quelle+" · "+mark;
        var addDe="Noten (handschriftlich, Telegram-PDF) umschaltbar – 1 Seite gesamtes Stück.";
        var addEn="Toggleable handwritten notation (Telegram PDF) – 1 page for the whole piece.";
        if(P.hinweis&&P.hinweis.indexOf("handschriftlich")<0) P.hinweis=P.hinweis+" "+addDe;
        if(P.hinweisDe&&P.hinweisDe.indexOf("handschriftlich")<0) P.hinweisDe=P.hinweisDe+" "+addDe;
        if(!P.hinweisDe) P.hinweisDe=(P.hinweis||"")+" "+addDe;
        if(P.hinweisEn&&P.hinweisEn.indexOf("handwritten")<0) P.hinweisEn=P.hinweisEn+" "+addEn;
        if(!P.hinweisEn) P.hinweisEn=addEn;
      }
      var M=(PRAYERS||[]).find(function(p){ return p.id==="mukunda"; });
      if(M){
        var mark2="Notation: Note names in D (Sibelius PDF; Dropbox)";
        if(M.quelle&&M.quelle.indexOf("Note names")<0) M.quelle=M.quelle+" · "+mark2;
      }
    }catch(e){}
  }

  function wrapPaint(){
    if(typeof paintLyrics!=="function"||paintLyrics._bpp505) return;
    var o=paintLyrics;
    window.paintLyrics=function(){
      ensureBtn();
      if(hasNotes()&&on()){ paint(); return; }
      try{ clear(); }catch(e){}
      return o.apply(this, arguments);
    };
    window.paintLyrics._bpp505=1;
  }

  var lastKey="";
  function watch(){
    ensureBtn(); paintBtn();
    var k=stanzaKeyNow();
    if(hasNotes()&&on()&&k&&k!==lastKey){ lastKey=k; follow(k); }
    else lastKey=k;
  }

  window.bppPaintNotes505=paint;
  window.bppNotesFollow505=follow;
  window.bppFitNotes505=schedule;
  window.bppClearNotes505=clear;
  window.bppHasNotes505=hasNotes;
  window.bppNotesOn505=on;
  /* Prefer over 503/502 */
  window.bppPaintNotes503=function(){ return paint(); };
  window.bppNotesFollow503=function(k){ return follow(k); };
  window.bppFitNotes503=function(){ return schedule(); };
  window.bppClearNotes503=function(){ return clear(); };
  window.bppPaintNotes502=function(){ return paint(); };
  window.bppNotesFollow502=function(k){ return follow(k); };

  function boot(){
    wrapPaint(); hookDl(); patchSources(); ensureBtn();
    Object.keys(REG).forEach(function(id){ loadMan(id); });
    if(hasNotes()&&on()) paint();
    try{
      var fs=document.getElementById("bppFs");
      if(fs && !fs._bpp505mo){
        fs._bpp505mo=1;
        new MutationObserver(function(){ schedule(); if(fsOn()&&hasNotes()&&on()) applyFsGeom(); }).observe(fs,{attributes:true,attributeFilter:["class"]});
      }
    }catch(e){}
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", function(){ setTimeout(boot, 350); });
  else setTimeout(boot, 350);
  setInterval(function(){ wrapPaint(); hookDl(); watch(); }, 500);
  window.addEventListener("resize", function(){ schedule(); });
  window.addEventListener("orientationchange", function(){ setTimeout(schedule, 200); });
  window.addEventListener("bpp-lang", function(){ paintBtn(); if(hasNotes()&&on()) paint(); });
})();
