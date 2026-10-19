/* [Grok-Bot] V1.81: Ganzseiten-Modus zum Mitlesen ("⛶ Groß" neben Mitlesen).
   - Vollbild (Fullscreen-API, sonst festes Overlay), dunkler Hintergrund, Wake-Lock.
   - Zeigt nur die aktuelle Strophe. Folgt der Abfolge (seqFile/seqYt) bzw. den Zeitmarken (marksFile/marksYt);
     ohne Zeitmarken folgt es dem Mitlesen, sonst blaettert man von Hand (Tasten, Wischen, Pfeiltasten).
   - Schriftgroesse je Strophe per Binaersuche (scrollWidth/scrollHeight): so gross wie moeglich, jede Verszeile bleibt eine Zeile.
     Unter der Mindestgroesse wird an einer Versgrenze auf zwei Seiten geteilt; Seitenwechsel nach dem Zeitanteil (Silbenlaenge) der Zeilen.
   - Akkorde ein/aus, Uebersetzung klein darunter oder aus. Leiste: vorige/naechste, Play/Pause, -10/+10 s, Schliessen; blendet nach 3 s aus. */
window.BPP_BUILD="1.81";
(function(){
  if(typeof PRAYERS==="undefined") return;
  var LS="bpp-fs", opt={ch:false, tr:true}; try{ var o=JSON.parse(localStorage.getItem(LS)||"{}"); if(typeof o.ch==="boolean") opt.ch=o.ch; if(typeof o.tr==="boolean") opt.tr=o.tr; }catch(e){}
  function save(){ try{ localStorage.setItem(LS, JSON.stringify(opt)); }catch(e){} }
  var L={de:["⛶ Groß","Ganzseiten-Ansicht: nur die aktuelle Strophe, sehr groß","Akkorde","Übersetzung","Schließen"],
    en:["⛶ Big","Full-screen view: only the current stanza, very large","Chords","Translation","Close"],
    fr:["⛶ Grand","Plein écran : seulement la strophe actuelle, très grande","Accords","Traduction","Fermer"],
    es:["⛶ Grande","Pantalla completa: solo la estrofa actual, muy grande","Acordes","Traducción","Cerrar"],
    ru:["⛶ Крупно","Полный экран: только текущая строфа, очень крупно","Аккорды","Перевод","Закрыть"],
    hi:["⛶ बड़ा","पूर्ण स्क्रीन: केवल वर्तमान पद, बहुत बड़ा","कॉर्ड","अनुवाद","बंद करें"],pt:["⛶ Grande","Tela cheia: só a estrofe atual, bem grande","Acordes","Tradução","Fechar"]};
  function T(k){ var l=(typeof lang!=="undefined" && L[lang])?L[lang]:L.en; return l[k]; }
  var css=document.createElement("style");
  css.textContent="#bppFs{position:fixed;inset:0;z-index:2147483000;background:#0b0b0d;color:#f3eee2;display:none;overflow:hidden;font-family:inherit;touch-action:pan-y;user-select:none;-webkit-user-select:none}"+
    "#bppFs.on{display:block}#bppFsStage{position:absolute;left:3vw;right:3vw;top:5vh;bottom:4vh;display:flex;align-items:center;justify-content:center}"+
    "#bppFsBox{display:inline-block;text-align:center;line-height:1.22;max-width:100%}#bppFsBox .vl{white-space:nowrap}"+
    "#bppFsBox .fch{white-space:nowrap;color:#e0b45a;font-size:.42em;margin-bottom:.25em;letter-spacing:.04em}"+
    "#bppFsBox .ftr{white-space:normal;color:#a9a39a;font-size:.36em;line-height:1.3;margin:.7em auto 0;font-style:italic}"+
    "#bppFsTop{position:absolute;left:10px;right:10px;top:6px;font-size:13px;color:#8d877c;display:flex;justify-content:space-between;pointer-events:none}"+
    "#bppFsBar{position:absolute;left:50%;bottom:12px;transform:translateX(-50%);display:flex;gap:6px;flex-wrap:wrap;justify-content:center;background:rgba(40,38,34,.92);padding:7px 9px;border-radius:12px;transition:opacity .4s;max-width:96vw}"+
    "#bppFsBar.hid{opacity:0;pointer-events:none}#bppFsBar button{font-size:17px;min-width:44px;min-height:40px;border:0;border-radius:8px;background:#5a5146;color:#fff;padding:0 10px;cursor:pointer}"+
    "#bppFsBar button.on{background:#a8792c}@media(max-width:480px){#bppFsBar{gap:4px;padding:6px}#bppFsBar button{min-width:38px;padding:0 6px;font-size:16px}}";
  document.head.appendChild(css);
  var ov, stage, box, top1, top2, bar, bPlay, bCh, bTr, wl=null, usedApi=false, isOn=false;
  var manualK=0, page=0, holdUntil=0, lastKey="", curK=-1, hideT=null, fitCache={};
  function P(){ return (typeof i!=="undefined" && i>=0)?PRAYERS[i]:null; }
  function groups(){ var p=P(); return p?stanzaGroups(p):[]; }
  function playing(){ return (typeof ytOn!=="undefined" && ytOn)?!!ytPlaying:!!(a && a.src && !a.paused); }
  function nowT(){ return (typeof ytOn!=="undefined" && ytOn)?(typeof ytTime==="number"?ytTime:0):(a.currentTime||0); }
  function durT(){ return (typeof ytOn!=="undefined" && ytOn)?(typeof ytDur==="number"?ytDur:0):(isFinite(a.duration)?a.duration:0); }
  function seqOf(p){ return window.bppSeqOf?window.bppSeqOf(p):null; }
  function marksOf(p){ var m=(typeof ytOn!=="undefined" && ytOn)?p.marksYt:p.marksFile; return (m && m.filter(function(x){ return typeof x==="number"; }).length>=2)?m:null; }
  function timed(){ var p=P(); return p && (seqOf(p) || marksOf(p)); }
  /* Zeitspanne der Strophe k um die Zeit t */
  function span(k,t){
    var p=P(), s=seqOf(p), d=durT();
    if(s){ var ts=null, te=null; for(var j=0;j<s.length;j++){ if(s[j][0]<=t+0.05){ if(s[j][1]===k) ts=s[j][0]; } } for(var j2=0;j2<s.length;j2++){ if(s[j2][0]>t+0.05){ te=s[j2][0]; break; } }
      return (ts!==null)?[ts, te!==null?te:d]:null; }
    var m=marksOf(p); if(!m || typeof m[k]!=="number") return null;
    var e=null; for(var q=k+1;q<m.length;q++){ if(typeof m[q]==="number"){ e=m[q]; break; } }
    return [m[k], e!==null?e:d];
  }
  function startOf(k){
    var p=P(), s=seqOf(p), t=nowT();
    if(s){ for(var j=0;j<s.length;j++){ if(s[j][1]===k && s[j][0]>t-1) return s[j][0]; } for(var j2=0;j2<s.length;j2++){ if(s[j2][1]===k) return s[j2][0]; } return null; }
    var m=marksOf(p); return (m && typeof m[k]==="number")?m[k]:null;
  }
  function autoK(){
    var gs=groups(); if(!gs.length) return 0;
    if(Date.now()<holdUntil) return manualK;
    if(timed() && playing()){
      try{ var pr=songProgress(); if(pr && pr.gs){ var k=stanzaFromProgress(pr); return Math.max(0, Math.min(gs.length-1, k)); } }catch(e){}
    }
    if(autoScroll && playing()){ var c=currentGroupIndex(); if(c>=0) return c; }
    return manualK;
  }
  /* Inhalt einer Strophe: Verszeilen, Akkorde, Uebersetzung */
  function content(k){
    var p=P(), g=groups()[k]; if(!g) return {lines:[],ch:"",tr:""};
    var lines=[], chs=[], trs=[];
    g.idx.forEach(function(n){ var z=p.zeilen[n];
      String(z.sa||"").split("\n").forEach(function(s){ s=s.trim(); if(s) lines.push(s); });
      if(z.ch) chs.push(typeof shiftChordLine==="function"?shiftChordLine(z.ch, steps):z.ch);
      var t=""; try{ t=(window.lineText||function(x){ return x.ue||x.en||""; })(z); }catch(e){} if(t) trs.push(t); });
    var ch=(typeof uniqueChords==="function"?uniqueChords(chs):chs).join("   ");
    return {lines:lines, ch:ch, tr:trs.join(" ")};
  }
  function wlen(s){ return String(s).replace(/[\s()0-9·.,;:!?'"–—-]/g,"").length||1; }
  function availWH(){ return [stage.clientWidth, stage.clientHeight]; }
  function render(lines, ch, tr, fs){
    var h="";
    if(opt.ch && ch) h+="<div class='fch'>"+esc(ch)+"</div>";
    h+=lines.map(function(s){ return "<div class='vl'>"+esc(s)+"</div>"; }).join("");
    if(opt.tr && tr) h+="<div class='ftr'>"+esc(tr)+"</div>";
    box.innerHTML=h; box.style.fontSize=fs+"px";
    var tE=box.querySelector(".ftr"); if(tE){ tE.style.maxWidth=Math.max(200, stage.clientWidth*0.92)+"px"; var tf=Math.max(14, Math.min(fs*0.36, 34)); tE.style.fontSize=tf+"px"; }
    var cE=box.querySelector(".fch"); if(cE){ cE.style.fontSize=Math.max(13, fs*0.42)+"px"; }
  }
  function esc(s){ return String(s).replace(/[&<>]/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c]; }); }
  function fits(){ var w=availWH(); return box.scrollWidth<=w[0]+0.5 && box.scrollHeight<=w[1]+0.5 && box.offsetWidth<=w[0]+0.5; }
  function fitSize(lines, ch, tr){
    var lo=8, hi=Math.min(420, Math.max(40, stage.clientHeight)), best=lo;
    for(var it=0; it<16 && hi-lo>0.5; it++){ var mid=(lo+hi)/2; render(lines, ch, tr, mid); if(fits()){ best=mid; lo=mid; } else hi=mid; }
    return Math.floor(best*10)/10;
  }
  function minFs(){ return Math.max(22, Math.min(window.innerWidth, window.innerHeight)*0.055); }
  /* Seiten einer Strophe: eine oder zwei (Teilung an der Versgrenze mit moeglichst gleicher Laenge) */
  function pages(k){
    var c=content(k), key=k+"|"+opt.ch+"|"+opt.tr+"|"+stage.clientWidth+"x"+stage.clientHeight+"|"+(typeof lang!=="undefined"?lang:"")+"|"+steps+"|"+(P()?P().id:"");
    if(fitCache[key]) return fitCache[key];
    var f=fitSize(c.lines, c.ch, c.tr), res;
    if(f>=minFs() || c.lines.length<2){ res=[{lines:c.lines, fs:f, share:1}]; }
    else {
      var tot=c.lines.reduce(function(s,x){ return s+wlen(x); },0), acc=0, cut=1, bestD=1e9;
      for(var j=1;j<c.lines.length;j++){ acc+=wlen(c.lines[j-1]); var d=Math.abs(acc-tot/2); if(d<bestD){ bestD=d; cut=j; } }
      var A=c.lines.slice(0,cut), B=c.lines.slice(cut), sa=A.reduce(function(s,x){ return s+wlen(x); },0)/tot;
      var fa=fitSize(A, c.ch, ""), fb=fitSize(B, "", c.tr);
      res=[{lines:A, fs:fa, share:sa, ch:c.ch, tr:""},{lines:B, fs:fb, share:1-sa, ch:"", tr:c.tr}];
    }
    res.forEach(function(r){ if(r.ch===undefined){ r.ch=c.ch; r.tr=c.tr; } });
    fitCache[key]=res; return res;
  }
  function autoPage(k, pg){
    if(pg.length<2) return 0;
    if(Date.now()<holdUntil || !playing()) return Math.min(page, pg.length-1);
    var t=nowT(), sp=span(k,t); if(!sp || !(sp[1]>sp[0])) return Math.min(page, pg.length-1);
    return ((t-sp[0])/(sp[1]-sp[0])>=pg[0].share)?1:0;
  }
  function draw(force){
    if(!isOn) return;
    var gs=groups(); if(!gs.length){ box.innerHTML=""; return; }
    var k=autoK(); if(k!==curK){ if(!(Date.now()<holdUntil)) page=0; curK=k; manualK=k; }
    var pg=pages(k); page=autoPage(k, pg);
    var key=k+"/"+page+"/"+JSON.stringify(pg[page].fs)+"/"+opt.ch+opt.tr;
    var p=P(); top1.textContent=p?p.titel:""; var g=gs[k]; var nr=/^\d+$/.test(g.key)?g.key:String(p.zeilen[g.start].nr||"");
    top2.textContent=nr+"  ·  "+(k+1)+"/"+gs.length+(pg.length>1?"  ·  "+(page+1)+"/2":"");
    bPlay.textContent=playing()?"⏸":"▶";
    if(key===lastKey && !force) return; lastKey=key;
    var pp=pg[page]; render(pp.lines, pp.ch, pp.tr, pp.fs);
    /* App-Ansicht mitziehen */
    try{ if(line!==g.start && g.idx.indexOf(line)<0){ line=g.start; } }catch(e){}
  }
  function showBar(){ bar.classList.remove("hid"); clearTimeout(hideT); hideT=setTimeout(function(){ bar.classList.add("hid"); }, 3000); }
  function go(d){
    var gs=groups(), pg=pages(curK<0?0:curK);
    if(d>0 && page<pg.length-1 && !(timed() && playing())){ page++; holdUntil=Date.now()+20000; lastKey=""; draw(); return; }
    if(d<0 && page>0 && !(timed() && playing())){ page--; holdUntil=Date.now()+20000; lastKey=""; draw(); return; }
    var k=Math.max(0, Math.min(gs.length-1, (curK<0?0:curK)+d)); if(k===curK && d!==0){ return; }
    var st=(timed() && playing())?startOf(k):null;
    if(st!==null){ seekTo(st+0.6); holdUntil=0; }
    else { holdUntil=Date.now()+20000; }
    manualK=k; curK=k; page=(d<0 && st===null)?Math.max(0,pages(k).length-1):0; lastKey=""; draw(); showBar();
  }
  function seekTo(t){
    t=Math.max(0,t);
    if(typeof ytOn!=="undefined" && ytOn){ try{ yt.contentWindow.postMessage(JSON.stringify({event:"command",func:"seekTo",args:[t,true]}),"*"); }catch(e){} ytTime=t; }
    else { try{ a.currentTime=t; }catch(e){} }
  }
  function build(){
    ov=document.createElement("div"); ov.id="bppFs";
    ov.innerHTML="<div id='bppFsTop'><span id='bppFsT1'></span><span id='bppFsT2'></span></div><div id='bppFsStage'><div id='bppFsBox'></div></div><div id='bppFsBar'></div>";
    document.body.appendChild(ov);
    stage=ov.querySelector("#bppFsStage"); box=ov.querySelector("#bppFsBox"); top1=ov.querySelector("#bppFsT1"); top2=ov.querySelector("#bppFsT2"); bar=ov.querySelector("#bppFsBar");
    function B(txt, fn, id){ var b=document.createElement("button"); b.type="button"; b.textContent=txt; if(id) b.id=id; b.onclick=function(e){ e.stopPropagation(); fn(); showBar(); }; bar.appendChild(b); return b; }
    B("⏮", function(){ go(-1); }, "bppFsPrev");
    B("−10", function(){ seekTo(nowT()-10); holdUntil=0; });
    bPlay=B("▶", function(){ try{ togglePlay(); }catch(e){} holdUntil=0; setTimeout(function(){ draw(); },300); }, "bppFsPlay");
    B("+10", function(){ seekTo(nowT()+10); holdUntil=0; });
    B("⏭", function(){ go(1); }, "bppFsNext");
    bCh=B("", function(){ opt.ch=!opt.ch; save(); syncOpt(); lastKey=""; draw(true); }, "bppFsCh");
    bTr=B("", function(){ opt.tr=!opt.tr; save(); syncOpt(); lastKey=""; draw(true); }, "bppFsTr");
    B("✕", close, "bppFsClose");
    ov.addEventListener("click", function(){ showBar(); });
    var x0=null, y0=null;
    ov.addEventListener("touchstart", function(e){ var t=e.touches[0]; x0=t.clientX; y0=t.clientY; }, {passive:true});
    ov.addEventListener("touchend", function(e){ if(x0===null) return; var t=e.changedTouches[0], dx=t.clientX-x0, dy=t.clientY-y0; x0=null;
      if(Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)*1.3){ go(dx<0?1:-1); } else showBar(); }, {passive:true});
    document.addEventListener("keydown", function(e){ if(!isOn) return;
      if(e.key==="Escape"){ close(); } else if(e.key==="ArrowRight"||e.key==="PageDown"){ go(1); e.preventDefault(); } else if(e.key==="ArrowLeft"||e.key==="PageUp"){ go(-1); e.preventDefault(); }
      else if(e.key===" "){ try{ togglePlay(); }catch(x){} e.preventDefault(); } showBar(); }, true);
    window.addEventListener("resize", function(){ if(isOn){ fitCache={}; lastKey=""; draw(true); } });
    window.addEventListener("orientationchange", function(){ setTimeout(function(){ if(isOn){ fitCache={}; lastKey=""; draw(true); } }, 300); });
    document.addEventListener("fullscreenchange", function(){ if(isOn && usedApi && !document.fullscreenElement) close(true); else if(isOn){ fitCache={}; lastKey=""; setTimeout(function(){ draw(true); },100); } });
    document.addEventListener("visibilitychange", function(){ if(isOn && document.visibilityState==="visible") lock(); });
    setInterval(function(){ if(isOn) draw(); }, 250);
  }
  function syncOpt(){ bCh.textContent="♯"; bCh.title=T(2); bCh.classList.toggle("on", opt.ch); bTr.textContent="Aa"; bTr.title=T(3); bTr.classList.toggle("on", opt.tr); bar.querySelector("#bppFsClose").title=T(4); }
  function lock(){ try{ if(navigator.wakeLock && navigator.wakeLock.request) navigator.wakeLock.request("screen").then(function(w){ wl=w; }).catch(function(){}); }catch(e){} }
  function open(){
    if(!P()) return; if(!ov) build();
    isOn=true; ov.classList.add("on"); syncOpt(); fitCache={}; lastKey=""; curK=-1; holdUntil=0;
    try{ var c=currentGroupIndex(); manualK=c>=0?c:0; }catch(e){ manualK=0; }
    usedApi=false;
    try{ if(ov.requestFullscreen){ var pr=ov.requestFullscreen(); usedApi=true; if(pr && pr.catch) pr.catch(function(){ usedApi=false; }); } else if(ov.webkitRequestFullscreen){ ov.webkitRequestFullscreen(); usedApi=true; } }catch(e){ usedApi=false; }
    lock(); draw(true); showBar();
  }
  function close(fromEvent){
    if(!isOn) return; isOn=false; ov.classList.remove("on");
    try{ if(wl){ wl.release(); wl=null; } }catch(e){}
    if(!fromEvent){ try{ if(document.fullscreenElement && document.exitFullscreen) document.exitFullscreen(); }catch(e){} }
    try{ persistNow(); paintLyrics(); }catch(e){}
  }
  window.bppFsOpen=open; window.bppFsClose=close; window.bppFsState=function(){ return {on:isOn, k:curK, page:page, pages:curK>=0?pages(curK).length:0, fs:box?parseFloat(box.style.fontSize):0, timed:!!timed()}; };
  function addBtn(){
    var ba=document.getElementById("btnAuto"); if(!ba || document.getElementById("btnFs")) return;
    var b=document.createElement("button"); b.type="button"; b.id="btnFs"; b.onclick=open; ba.parentNode.insertBefore(b, ba.nextSibling);
    label();
  }
  function label(){ var b=document.getElementById("btnFs"); if(!b) return; if(b.textContent!==T(0)) b.textContent=T(0); b.title=T(1); b.disabled=!P(); }
  document.addEventListener("DOMContentLoaded", function(){ addBtn(); setInterval(label, 1000); });
})();
