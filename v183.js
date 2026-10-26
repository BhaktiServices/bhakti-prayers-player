/* [Grok-Bot] V1.81: Ganzseiten-Modus zum Mitlesen ("⛶ Groß" neben Mitlesen).
   - Vollbild (Fullscreen-API, sonst festes Overlay), dunkler Hintergrund, Wake-Lock.
   - Zeigt nur die aktuelle Strophe. Folgt der Abfolge (seqFile/seqYt) bzw. den Zeitmarken (marksFile/marksYt);
     ohne Zeitmarken folgt es dem Mitlesen, sonst blaettert man von Hand (Tasten, Wischen, Pfeiltasten).
   - Schriftgroesse je Strophe per Binaersuche (scrollWidth/scrollHeight): so gross wie moeglich, jede Verszeile bleibt eine Zeile.
     Unter der Mindestgroesse wird an einer Versgrenze auf zwei Seiten geteilt; Seitenwechsel nach dem Zeitanteil (Silbenlaenge) der Zeilen.
   - Akkorde ein/aus, Uebersetzung klein darunter oder aus. Leiste: vorige/naechste, Play/Pause, -10/+10 s, Schliessen; blendet nach 3 s aus. */
/* [Grok-Bot] V1.82: Play/Pause gross und mittig in der Leiste, Symbol als CSS-Form (keine Schriftabhaengigkeit, ▶/⏸ fehlten auf manchen Handys bzw. waren winzig),
   Leiste zweizeilig (Steuerung oben, ♯ Aa ✕ darunter), Tippen zeigt die Leiste, Doppeltippen pausiert/spielt. Ersetzt v181.js. */
/* [Grok-Bot] V1.83: Ende-Bildschirm (Leiste bleibt sichtbar, grosse Taste "Naechstes: <Titel>"), voriges/naechstes Prayer in der Leiste und im normalen Player
   (Reihenfolge der aktiven Liste, Eintraege ohne Ton uebersprungen), Wiederholen-Schalter aus / 🔂 dieses Prayer / 🔁 ganze Liste (gespeichert, MP3 und YouTube).
   Ohne Wiederholen kein automatisches Weiterspielen. Ersetzt v182.js. */
/* [Grok-Bot] V1.89: einfarbige SVG-Symbole statt Emoji (voriges/naechstes Prayer, Wiederholen), Wiederholen groesser:
   aus = Standard, dieses Prayer = gold mit "1", ganze Liste = gold. Tasten gold nur wenn an/aktiv (auch Play), sonst Standard.
   Haken bppPageSwitchAt fuer den Teilwechsel langer Strophen (v189.js).
   V1.90: Haken bppFsSplitOk (v190.js): keine Teilung, wenn die Zeilen breitenbegrenzt sind und die Teile nicht groesser wuerden. */
window.BPP_BUILD="1.83";
(function(){
  if(typeof PRAYERS==="undefined" || window.bppFsV183) return; window.bppFsV183=1;
  var LS="bpp-fs", opt={ch:false, tr:true}; try{ var o=JSON.parse(localStorage.getItem(LS)||"{}"); if(typeof o.ch==="boolean") opt.ch=o.ch; if(typeof o.tr==="boolean") opt.tr=o.tr; }catch(e){}
  function save(){ try{ localStorage.setItem(LS, JSON.stringify(opt)); }catch(e){} }
  var L={de:["⛶ Groß","Ganzseiten-Ansicht: nur die aktuelle Strophe, sehr groß","Akkorde","Übersetzung","Schließen","Voriges Prayer","Nächstes Prayer","Nächstes","Wiederholen: aus","Wiederholen: dieses Prayer","Wiederholen: ganze Liste der Reihe nach","Strophe zurück","Strophe vor","Zu Ende","Nochmal"],
    en:["⛶ Big","Full-screen view: only the current stanza, very large","Chords","Translation","Close","Previous prayer","Next prayer","Next","Repeat: off","Repeat: this prayer","Repeat: whole list in order","Previous stanza","Next stanza","Finished","Again"],
    fr:["⛶ Grand","Plein écran : seulement la strophe actuelle, très grande","Accords","Traduction","Fermer","Prière précédente","Prière suivante","Suivante","Répéter : non","Répéter : cette prière","Répéter : toute la liste","Strophe précédente","Strophe suivante","Terminé","Encore"],
    es:["⛶ Grande","Pantalla completa: solo la estrofa actual, muy grande","Acordes","Traducción","Cerrar","Oración anterior","Oración siguiente","Siguiente","Repetir: no","Repetir: esta oración","Repetir: toda la lista","Estrofa anterior","Estrofa siguiente","Terminado","Otra vez"],
    ru:["⛶ Крупно","Полный экран: только текущая строфа, очень крупно","Аккорды","Перевод","Закрыть","Предыдущая молитва","Следующая молитва","Далее","Повтор: выкл.","Повтор: эта молитва","Повтор: весь список","Предыдущая строфа","Следующая строфа","Конец","Ещё раз"],
    hi:["⛶ बड़ा","पूर्ण स्क्रीन: केवल वर्तमान पद, बहुत बड़ा","कॉर्ड","अनुवाद","बंद करें","पिछली प्रार्थना","अगली प्रार्थना","अगली","दोहराएँ: बंद","दोहराएँ: यह प्रार्थना","दोहराएँ: पूरी सूची","पिछला पद","अगला पद","समाप्त","फिर से"],pt:["⛶ Grande","Tela cheia: só a estrofe atual, bem grande","Acordes","Tradução","Fechar","Oração anterior","Próxima oração","Próxima","Repetir: desligado","Repetir: esta oração","Repetir: a lista inteira em ordem","Estrofe anterior","Próxima estrofe","Concluído","De novo"],cz:["⛶ Velké","Celá obrazovka: jen aktuální sloka, velmi velká","Akordy","Překlad","Zavřít","Předchozí modlitba","Další modlitba","Další","Opakovat: vyp.","Opakovat: tato modlitba","Opakovat: celý seznam po pořadě","Předchozí sloka","Další sloka","Hotovo","Znovu"]};
  function T(k){ var l=(typeof lang!=="undefined" && L[lang])?L[lang]:L.en; return l[k]; }
  var RP='<path d="M4 11.5V9.5A3.5 3.5 0 0 1 7.5 6H19"/><path d="M15.5 2.5L19 6l-3.5 3.5"/><path d="M20 12.5v2a3.5 3.5 0 0 1-3.5 3.5H5"/><path d="M8.5 21.5L5 18l3.5-3.5"/>';
  var ICO={prev:'<svg class="bppI" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 5h2.8v14H5zM19.5 5v14L9 12z"/></svg>',
    next:'<svg class="bppI" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.2 5H19v14h-2.8zM4.5 5v14L15 12z"/></svg>',
    rep:'<svg class="bppI bppIR" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+RP+'</svg>',
    rep1:'<svg class="bppI bppIR" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+RP+'</svg><b class="bppR1">1</b>'};
  window.bppIcons=ICO;
  var css=document.createElement("style");
  css.textContent="#bppFs{position:fixed;inset:0;z-index:2147483000;background:#0b0b0d;color:#f3eee2;display:none;overflow:hidden;font-family:inherit;touch-action:manipulation;user-select:none;-webkit-user-select:none}"+
    "#bppFs.on{display:block}#bppFsStage{position:absolute;left:3vw;right:3vw;top:5vh;bottom:4vh;display:flex;align-items:center;justify-content:center}"+
    "#bppFsBox{display:inline-block;text-align:center;line-height:1.22;max-width:100%}#bppFsBox .vl{white-space:nowrap}"+
    "#bppFsBox .fch{white-space:nowrap;color:#f0d24a; /* [Grok.com] Akkorde immer gelb */font-size:.42em;margin-bottom:.25em;letter-spacing:.04em}"+
    "#bppFsBox .ftr{white-space:normal;color:#a9a39a;font-size:.36em;line-height:1.3;margin:.7em auto 0;font-style:italic}"+
    "#bppFsTop{position:absolute;left:10px;right:10px;top:6px;font-size:13px;color:#8d877c;display:flex;justify-content:space-between;pointer-events:none}"+
    "#bppFsBar{position:absolute;left:50%;bottom:12px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;width:max-content;background:rgba(40,38,34,.92);padding:7px 9px;border-radius:12px;transition:opacity .4s;max-width:96vw}"+
    "#bppFsBar.hid{opacity:0;pointer-events:none}#bppFsBar button{font-size:17px;min-width:44px;min-height:40px;border:0;border-radius:8px;background:#5a5146;color:#fff;padding:0 10px;cursor:pointer}"+
    "#bppFsBar button.on{background:#8b6914;box-shadow:inset 0 0 0 1px #c9a36a}#bppFsBar .row{display:flex;flex-wrap:nowrap;gap:8px;align-items:center;justify-content:center}"+
    "#bppFsBar button#bppFsPlay{width:72px;height:72px;min-width:72px;border-radius:50%;background:#5a5146;padding:0;display:flex;align-items:center;justify-content:center}#bppFsBar button#bppFsPlay.on{background:#8b6914;box-shadow:inset 0 0 0 2px #c9a36a}"+
    "#bppFsPlay i{display:block;box-sizing:border-box}#bppFsPlay i.pl{width:0;height:0;border-style:solid;border-width:16px 0 16px 27px;border-color:transparent transparent transparent #fff6e8;margin-left:7px}"+
    "#bppFsPlay i.pa{width:26px;height:30px;border-left:9px solid #fff6e8;border-right:9px solid #fff6e8}"+
    "#bppFsBar button:disabled{opacity:.3;cursor:default}#bppFsBar button.pn{font-size:13px;max-width:36vw;overflow:hidden;white-space:nowrap;display:inline-flex;align-items:center;gap:6px}#bppFsBar button.pn span{overflow:hidden;text-overflow:ellipsis;min-width:0}"+
    "#bppFsBar button.str{font-size:26px;line-height:1}#bppFsBar button.rep{font-size:18px;min-width:56px}"+
    "#bppFsEnd{position:absolute;left:0;right:0;top:12vh;display:none;flex-direction:column;align-items:center;gap:14px;padding:0 5vw;text-align:center}#bppFs.end #bppFsEnd{display:flex}#bppFs.end #bppFsBox{opacity:.18}"+
    "#bppFsEnd .et{font-size:15px;color:#a9a39a;letter-spacing:.08em;text-transform:uppercase}"+
    "#bppFsEnd button{border:0;border-radius:14px;cursor:pointer;font-family:inherit}#bppFsEnd .en{background:#8b6914;color:#fff6e8;box-shadow:inset 0 0 0 1px #c9a36a;font-size:22px;font-weight:600;padding:16px 22px;max-width:90vw;line-height:1.25}#bppFsEnd .en small{display:block;font-size:13px;font-weight:400;letter-spacing:.06em;text-transform:uppercase;opacity:.75}"+
    "#bppFsEnd .ea{background:#5a5146;color:#fff;font-size:16px;padding:10px 18px}"+
    ".bppPn{min-width:2.4em}.bppI{display:inline-block;width:1.3em;height:1.3em;vertical-align:-.25em;flex:none}.bppI.bppIR{width:1.75em;height:1.75em;vertical-align:-.5em}"+
    ".bppRep{min-width:3em;padding-top:2px!important;padding-bottom:2px!important;white-space:nowrap}.bppR1{font-weight:700;font-size:1.05em;margin-left:3px;vertical-align:-.05em;line-height:1}"+
    "@media(max-width:400px){#bppFsBar .row{gap:6px}#bppFsBar button{min-width:44px;padding:0 6px;font-size:16px}}";
  document.head.appendChild(css);
  /* ---- Prayer-Navigation (aktive Liste) und Wiederholen ---- */
  var RL="bpp-rep", rep=0; try{ rep=+(localStorage.getItem(RL)||0); }catch(e){} if(!(rep===1 || rep===2)) rep=0;
  var lastHead=null, endFor=-1;
  try{ lastHead=sessionStorage.getItem("bpp-head"); }catch(e){}
  function setHead(h){ lastHead=h; try{ sessionStorage.setItem("bpp-head", h||""); }catch(e){} }
  function hasSound(k){ var q=PRAYERS[k]; return !!(q && (q.audio || q.youtube) && (window.bppHidden||[]).indexOf(q.id)<0); }
  function sections(){
    var list=document.getElementById("list"), out=[], cur=null; if(!list) return out;
    Array.prototype.forEach.call(list.children, function(el){
      if(el.classList.contains("grp")){ cur={head:el.textContent, items:[]}; out.push(cur); return; }
      if(el.tagName==="BUTTON" && el.hasAttribute("data-i") && !el.classList.contains("miss") && !el.classList.contains("noaud")){
        var k=+el.getAttribute("data-i"); if(!hasSound(k)) return; if(!cur){ cur={head:"", items:[]}; out.push(cur); } if(cur.items.indexOf(k)<0) cur.items.push(k); }
    });
    return out;
  }
  function curSec(){
    var ss=sections().filter(function(s){ return s.items.indexOf(i)>=0; });
    if(!ss.length){ var all=[]; PRAYERS.forEach(function(q,k){ if(hasSound(k)) all.push(k); }); return {head:"", items:all}; }
    for(var q=0;q<ss.length;q++) if(ss[q].head===lastHead) return ss[q];
    return (ss.length>1 && new Date().getHours()>=14)?ss[1]:ss[0];
  }
  function neighbor(d, wrap){
    /* V2.06: Vor/Zurueck, Wiederholen ganze Liste und Ende-Angebot laufen durch ALLE Gebete (v205.js: bppAllNb, Ansicht "Alle", ohne Doppelte, ohne Ton uebersprungen) */
    if(typeof window.bppAllNb==="function"){ try{ return window.bppAllNb(d, wrap, hasSound); }catch(e){} }
    if(typeof i==="undefined" || i<0) return null; var s=curSec(), pos=s.items.indexOf(i); if(pos<0) return null;
    var n=pos+d; if(n<0 || n>=s.items.length){ if(!wrap || s.items.length<2) return null; n=(n+s.items.length)%s.items.length; }
    return {idx:s.items[n], head:s.head};
  }
  function startPrayer(nb){
    if(!nb) return; setHead(nb.head); endFor=-1;
    try{ putSong(PRAYERS[nb.idx].id, {time:0, line:0}); }catch(e){}
    play(nb.idx, true); endOff();
  }
  function repLabel(){ return rep===1?ICO.rep1:ICO.rep; }
  function repTitle(){ return T(rep===1?9:(rep===2?10:8)); }
  function cycleRep(){ rep=(rep+1)%3; try{ localStorage.setItem(RL, String(rep)); }catch(e){} syncNav(); }
  function onEnded(){
    if(typeof i==="undefined" || i<0 || endFor===i) return; endFor=i;
    if(rep===1){ setTimeout(function(){
        if(typeof ytOn!=="undefined" && ytOn){ startPrayer({idx:i, head:curSec().head}); }
        else { endFor=-1; try{ a.currentTime=0; markPlayOrigin(); a.play().then(syncPlayBtn).catch(function(){ syncPlayBtn(); }); }catch(e){} }
      }, 500); return; }
    if(rep===2){ var nb=neighbor(1, true); if(nb){ setTimeout(function(){ startPrayer(nb); }, 900); return; } }
    endOn();
  }
  document.addEventListener("DOMContentLoaded", function(){ var au=document.getElementById("a"); if(!au) return;
    au.addEventListener("ended", onEnded); au.addEventListener("play", function(){ endFor=-1; endOff(); }); });
  window.addEventListener("message", function(e){
    if(typeof ytOn==="undefined" || !ytOn) return; var d=e.data;
    if(typeof d==="string"){ try{ d=JSON.parse(d); }catch(x){ return; } }
    if(!d) return; var st=(d.event==="onStateChange")?d.info:((d.event==="infoDelivery" && d.info)?d.info.playerState:undefined);
    if(st===0) onEnded(); else if(st===1){ endFor=-1; endOff(); }
  });
  document.addEventListener("click", function(e){
    var b=e.target && e.target.closest && e.target.closest("#list button.item[data-i]"); if(!b) return;
    var h=null, el=b; while((el=el.previousElementSibling)){ if(el.classList.contains("grp")){ h=el.textContent; break; } } setHead(h);
  }, true);
  window.bppPrayerNav={ next:function(){ startPrayer(neighbor(1, rep===2)); }, prev:function(){ startPrayer(neighbor(-1, rep===2)); },
    neighbor:neighbor, sections:sections, rep:function(){ return rep; }, setRep:function(r){ rep=(r===1||r===2)?r:0; try{ localStorage.setItem(RL, String(rep)); }catch(e){} syncNav(); }, ended:onEnded };
  var mPrev=null, mNext=null, mRep=null, bPP=null, bNP=null, bRep=null, endBox=null, endIs=false, lastPid=null;
  function ttl(nb){ return nb?String(PRAYERS[nb.idx].titel||""):""; }
  function syncNav(){
    var w=(rep===2), np=neighbor(-1, w), nn=neighbor(1, w);
    [[mPrev,np,5,"p"],[mNext,nn,6,"n"],[bPP,np,5,null],[bNP,nn,6,null]].forEach(function(x){ var b=x[0]; if(!b) return;
      b.disabled=!x[1]; var t=T(x[2])+(x[1]?": "+ttl(x[1]):""); if(b.title!==t){ b.title=t; b.setAttribute("aria-label", t); }
      var nm=(x[3]===null)?(x[1]?ttl(x[1]):""):"", key=(x[3]||(b===bPP?"P":"N"))+"|"+nm;
      if(b.getAttribute("data-k")!==key){ b.setAttribute("data-k", key);
        b.innerHTML=(x[3]==="p")?ICO.prev:(x[3]==="n")?ICO.next:(b===bPP)?ICO.prev+"<span>"+esc(nm)+"</span>":"<span>"+esc(nm)+"</span>"+ICO.next; } });
    [mRep,bRep].forEach(function(b){ if(!b) return; if(b.getAttribute("data-r")!==String(rep)){ b.setAttribute("data-r", String(rep)); b.innerHTML=repLabel(); } b.title=repTitle(); b.setAttribute("aria-label", b.title); b.classList.toggle("off", rep===0); b.classList.toggle("on", rep!==0); });
  }
  function endOn(){
    if(!isOn || !endBox) return; endIs=true; ov.classList.add("end");
    var nn=neighbor(1, true), p=P();
    var h="<div class='et'>"+esc(T(13))+" · "+esc(p?p.titel:"")+"</div>";
    if(nn) h+="<button type='button' class='en' id='bppFsEndNext'><small>"+esc(T(7))+"</small>"+esc(ttl(nn))+" "+ICO.next+"</button>";
    h+="<button type='button' class='ea' id='bppFsEndAgain'>↺ "+esc(T(14))+"</button>";
    endBox.innerHTML=h;
    var bn=endBox.querySelector("#bppFsEndNext"); if(bn) bn.onclick=function(e){ e.stopPropagation(); startPrayer(nn); };
    endBox.querySelector("#bppFsEndAgain").onclick=function(e){ e.stopPropagation(); startPrayer({idx:i, head:curSec().head}); };
    bar.classList.remove("hid"); clearTimeout(hideT);
  }
  function endOff(){ if(!endIs) return; endIs=false; if(ov) ov.classList.remove("end"); if(isOn) showBar(); }
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
      var isR=/^Refrain/i.test(z.nr||"");
      var sa=String(z.sa||"").split("\n").map(function(s){ return s.trim(); }).filter(Boolean);
      var ze=document.body.classList.contains("ch-line");
      if(ze && z.ch){ lines.push("\u00a7"+(typeof shiftChordLine==="function"?shiftChordLine(z.ch, steps):z.ch)); }
      else if(isR && z.ch && document.body.classList.contains("show-ch")){ lines.push("\u00a7"+(typeof shiftChordLine==="function"?shiftChordLine(z.ch, steps):z.ch)); }
      sa.forEach(function(s){ lines.push(s); });
      if(z.ch && !isR && !ze) chs.push(typeof shiftChordLine==="function"?shiftChordLine(z.ch, steps):z.ch);
      var t=""; try{ t=(window.lineText||function(x){ return x.ue||x.en||""; })(z); }catch(e){} if(t) trs.push(t); });
    var ch=(typeof uniqueChords==="function"?uniqueChords(chs):chs).join("   ");
    if(p && (p.id==="ashtotram" || p.id==="ashtotram-abend") && lines.length){ var nn=k+1, ton=nn>=100?"E":(nn>=54?"D":""), ix=0; while(ix<lines.length && String(lines[ix]).charAt(0)==="\u00a7") ix++; if(lines[ix]) lines[ix]=nn+".  "+lines[ix]+(ton?"   "+ton:""); } /* [Grok.com] Nummer, ab 54 D, ab 100 E */
    return {lines:lines, ch:ch, tr:trs.join(" ")};
  }
  function wlen(s){ return String(s).replace(/[\s()0-9·.,;:!?'"–—-]/g,"").length||1; }
  function availWH(){ return [stage.clientWidth, stage.clientHeight]; }
  function render(lines, ch, tr, fs){
    var h="";
    if(opt.ch && ch) h+="<div class='fch'>"+esc(ch)+"</div>";
    h+=lines.map(function(s){ var c=String(s).charAt(0)==="\u00a7"; return "<div class='"+(c?"fch vl":"vl")+"'>"+esc(c?String(s).slice(1):s)+"</div>"; }).join("");
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
      /* V1.90: Teilung nur, wenn sie die Schrift wirklich vergroessert (Regel in v190.js: window.bppFsSplitOk) */
      if(typeof window.bppFsSplitOk==="function"){ try{ if(!window.bppFsSplitOk(f, fa, fb, c.lines.length, cut)) res=[{lines:c.lines, fs:f, share:1}]; }catch(e){} }
    }
    res.forEach(function(r){ if(r.ch===undefined){ r.ch=c.ch; r.tr=c.tr; } });
    fitCache[key]=res; return res;
  }
  function autoPage(k, pg){
    if(pg.length<2) return 0;
    if(Date.now()<holdUntil || !playing()) return Math.min(page, pg.length-1);
    var t=nowT();
    /* V1.89: Teilwechsel langer Strophen am Ende der letzten Zeile des ersten Teils (v189.js, Medienzeit) */
    if(typeof window.bppPageSwitchAt==="function"){ try{ var ps=window.bppPageSwitchAt(k, pg[0].lines.length, t); if(typeof ps==="number") return t>=ps?1:0; }catch(e){} }
    var sp=span(k,t); if(!sp || !(sp[1]>sp[0])) return Math.min(page, pg.length-1);
    return ((t-sp[0])/(sp[1]-sp[0])>=pg[0].share)?1:0;
  }
  function draw(force){
    if(!isOn) return;
    var pid=P()?P().id:null; if(pid!==lastPid){ lastPid=pid; manualK=0; curK=-1; page=0; holdUntil=0; lastKey=""; endOff(); }
    syncNav();
    var gs=groups(); if(!gs.length){ box.innerHTML=""; return; }
    var k=autoK(); if(k!==curK){ if(!(Date.now()<holdUntil)) page=0; curK=k; manualK=k; }
    var pg=pages(k); page=autoPage(k, pg);
    var key=k+"/"+page+"/"+JSON.stringify(pg[page].fs)+"/"+opt.ch+opt.tr;
    var p=P(); top1.textContent=p?p.titel:""; var g=gs[k]; var nr=(p.id==="mukunda" || p.id==="ashtotram" || p.id==="ashtotram-abend")?String(k+1):(/^[\d]+$/.test(g.key)?g.key:String(p.zeilen[g.start].nr||"")); /* [Grok.com] MMS durchzaehlen */
    top2.textContent=nr+"  ·  "+(k+1)+"/"+gs.length+(pg.length>1?"  ·  "+(page+1)+"/2":"");
    syncPlay();
    if(key===lastKey && !force) return; lastKey=key;
    var pp=pg[page]; render(pp.lines, pp.ch, pp.tr, pp.fs);
    /* App-Ansicht mitziehen */
    try{ if(line!==g.start && g.idx.indexOf(line)<0){ line=g.start; } }catch(e){}
  }
  function syncPlay(){ if(!bPlay) return; var on=playing(), c=on?"pa":"pl"; bPlay.classList.toggle("on", on); var ic=bPlay.firstChild; if(!ic || ic.className!==c) bPlay.innerHTML="<i class='"+c+"'></i>"; bPlay.title=on?"Pause":"Play"; bPlay.setAttribute("aria-label", bPlay.title); }
  function doToggle(){ try{ togglePlay(); }catch(e){} holdUntil=0; syncPlay(); [150,400,900].forEach(function(t){ setTimeout(function(){ syncPlay(); draw(); }, t); }); }
  function showBar(){ bar.classList.remove("hid"); clearTimeout(hideT); if(endIs) return; hideT=setTimeout(function(){ if(!endIs) bar.classList.add("hid"); }, 3000); }
  function go(d,how){
    var gs=groups(), pg=pages(curK<0?0:curK);
    /* [Grok-Bot] V3.47: bei Mitlesen an wie manuelles Blaettern -> Spulen erst nach 800 ms (v347.js) */
    if(window.bppV347 && typeof autoScroll!=="undefined" && autoScroll && timed() && window.bppFsStep){ window.bppFsStep(d); window.bppManualAt=Date.now(); if(how!=="swipe") window.bppExplicitM=window.bppManualAt; showBar(); return; } /* V3.51: Knoepfe/Pfeile = expliziter Klick */
    if(d>0 && page<pg.length-1 && !(timed() && playing())){ page++; holdUntil=Date.now()+20000; lastKey=""; draw(); return; }
    if(d<0 && page>0 && !(timed() && playing())){ page--; holdUntil=Date.now()+20000; lastKey=""; draw(); return; }
    var k=Math.max(0, Math.min(gs.length-1, (curK<0?0:curK)+d)); if(k===curK && d!==0){ return; }
    var st=(timed() && playing())?startOf(k):null;
    if(st!==null){ seekTo(st+0.6); holdUntil=0; }
    else { holdUntil=Date.now()+20000; }
    manualK=k; curK=k; page=(d<0 && st===null)?Math.max(0,pages(k).length-1):0; lastKey=""; draw(); showBar();
  }
  /* [Grok-Bot] V3.07: manueller Strophenschritt ohne Spulen (Wischen/Rad/Pfeile); Automatik erst beim naechsten Zeitwechsel wieder (bppFsRelease) */
  window.bppFsStep=function(d){ if(!isOn) return false; var gs=groups(); if(!gs.length) return true; var pg=pages(curK<0?0:curK);
    if(d>0 && page<pg.length-1){ page++; } else if(d<0 && page>0){ page--; }
    else { var k=Math.max(0, Math.min(gs.length-1, (curK<0?0:curK)+d)); if(k===curK) return true; manualK=k; curK=k; page=(d<0)?Math.max(0,pages(k).length-1):0; }
    holdUntil=Date.now()+864e5; lastKey=""; draw(); return true; };
  window.bppFsRelease=function(){ if(holdUntil>Date.now()+3e5){ holdUntil=0; lastKey=""; draw(); } };
  function seekTo(t){
    t=Math.max(0,t);
    if(typeof ytOn!=="undefined" && ytOn){ try{ yt.contentWindow.postMessage(JSON.stringify({event:"command",func:"seekTo",args:[t,true]}),"*"); }catch(e){} ytTime=t; }
    else { try{ a.currentTime=t; }catch(e){} }
  }
  function build(){
    ov=document.createElement("div"); ov.id="bppFs";
    ov.innerHTML="<div id='bppFsTop'><span id='bppFsT1'></span><span id='bppFsT2'></span></div><div id='bppFsStage'><div id='bppFsBox'></div></div><div id='bppFsEnd'></div><div id='bppFsBar'></div>";
    document.body.appendChild(ov);
    stage=ov.querySelector("#bppFsStage"); box=ov.querySelector("#bppFsBox"); top1=ov.querySelector("#bppFsT1"); top2=ov.querySelector("#bppFsT2"); bar=ov.querySelector("#bppFsBar"); endBox=ov.querySelector("#bppFsEnd");
    var r0=document.createElement("div"); r0.className="row"; bar.appendChild(r0);
    var r1=document.createElement("div"), r2=document.createElement("div"); r1.className=r2.className="row"; bar.appendChild(r1); bar.appendChild(r2); var tgt=r1;
    function B(txt, fn, id){ var b=document.createElement("button"); b.type="button"; b.textContent=txt; if(id) b.id=id; b.onclick=function(e){ e.stopPropagation(); fn(); showBar(); }; tgt.appendChild(b); return b; }
    tgt=r0;
    bPP=B("", function(){ window.bppPrayerNav.prev(); }, "bppFsPPrev"); bPP.className="pn";
    bRep=B("", cycleRep, "bppFsRep"); bRep.classList.add("rep");
    bNP=B("", function(){ window.bppPrayerNav.next(); }, "bppFsPNext"); bNP.className="pn";
    tgt=r1;
    B("‹", function(){ go(-1); }, "bppFsPrev").className="str";
    B("−10", function(){ seekTo(nowT()-10); holdUntil=0; });
    bPlay=B("", doToggle, "bppFsPlay"); bPlay.innerHTML="<i class='pl'></i>";
    B("+10", function(){ seekTo(nowT()+10); holdUntil=0; });
    B("›", function(){ go(1); }, "bppFsNext").className="str"; tgt=r2;
    bCh=B("", function(){ opt.ch=!opt.ch; save(); syncOpt(); lastKey=""; draw(true); }, "bppFsCh");
    bTr=B("", function(){ opt.tr=!opt.tr; save(); syncOpt(); lastKey=""; draw(true); }, "bppFsTr");
    B("✕", close, "bppFsClose");
    var bm=document.createElement("button"); bm.type="button"; bm.id="bppFsMenu"; bm.className="gold"; bm.textContent="Menü+"; bm.style.background="#e6c07b"; bm.style.color="#1a1208"; bm.style.fontWeight="700";
    bm.onclick=function(e){ e.stopPropagation(); if(typeof toggleMenu==="function") toggleMenu(); bm.textContent=document.body.classList.contains("menu-full")?"Menü−":"Menü+"; }; /* [Grok.com] */
    r2.appendChild(bm);
    var lastTouchEnd=0, lastTap=0;
    ov.addEventListener("click", function(e){ if(Date.now()-lastTouchEnd<700) return; if(endIs && !(e.target.closest && e.target.closest("button"))){ endOff(); return; } showBar(); });
    ov.addEventListener("dblclick", function(e){ if(Date.now()-lastTouchEnd<700) return; if(bar.contains(e.target)) return; doToggle(); showBar(); });
    var x0=null, y0=null;
    ov.addEventListener("touchstart", function(e){ var t=e.touches[0]; x0=t.clientX; y0=t.clientY; }, {passive:true});
    ov.addEventListener("touchend", function(e){ if(x0===null) return; var t=e.changedTouches[0], dx=t.clientX-x0, dy=t.clientY-y0; x0=null;
      lastTouchEnd=Date.now(); if(bar.contains(e.target) || (endBox && endBox.contains(e.target))) return;
      if(endIs && Math.abs(dx)<20 && Math.abs(dy)<20){ endOff(); lastTap=0; return; }
      if(Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)*1.3){ go(dx<0?1:-1,"swipe"); lastTap=0; }
      else if(Math.abs(dx)<20 && Math.abs(dy)<20){ if(lastTouchEnd-lastTap<350){ lastTap=0; doToggle(); } else lastTap=lastTouchEnd; showBar(); } }, {passive:true});
    document.addEventListener("keydown", function(e){ if(!isOn) return;
      if(e.key==="Escape"){ close(); } else if(e.key==="ArrowRight"||e.key==="PageDown"){ go(1); e.preventDefault(); } else if(e.key==="ArrowLeft"||e.key==="PageUp"){ go(-1); e.preventDefault(); }
      else if(e.key===" "){ doToggle(); e.preventDefault(); } showBar(); }, true);
    window.addEventListener("resize", function(){ if(isOn){ fitCache={}; lastKey=""; draw(true); } });
    window.addEventListener("orientationchange", function(){ setTimeout(function(){ if(isOn){ fitCache={}; lastKey=""; draw(true); } }, 300); });
    document.addEventListener("fullscreenchange", function(){ if(isOn && usedApi && !document.fullscreenElement) close(true); else if(isOn){ fitCache={}; lastKey=""; setTimeout(function(){ draw(true); },100); } });
    document.addEventListener("visibilitychange", function(){ if(isOn && document.visibilityState==="visible") lock(); });
    setInterval(function(){ if(isOn) draw(); }, 250);
  }
  function syncOpt(){ bCh.textContent="♯"; bCh.title=T(2); bCh.classList.toggle("on", opt.ch); bTr.textContent="Aa"; bTr.title=T(3); bTr.classList.toggle("on", opt.tr); bar.querySelector("#bppFsClose").title=T(4); bar.querySelector("#bppFsPrev").title=T(11); bar.querySelector("#bppFsNext").title=T(12); syncNav(); }
  function lock(){ try{ if(navigator.wakeLock && navigator.wakeLock.request) navigator.wakeLock.request("screen").then(function(w){ wl=w; }).catch(function(){}); }catch(e){} }
  function open(){
    if(!P()) return; if(!ov) build();
    isOn=true; ov.classList.add("on"); syncOpt(); fitCache={}; lastKey=""; curK=-1; holdUntil=0; lastPid=P().id; endIs=false; ov.classList.remove("end");
    try{ var c=currentGroupIndex(); manualK=c>=0?c:0; }catch(e){ manualK=0; }
    usedApi=false;
    try{ if(ov.requestFullscreen){ var pr=ov.requestFullscreen(); usedApi=true; if(pr && pr.catch) pr.catch(function(){ usedApi=false; }); } else if(ov.webkitRequestFullscreen){ ov.webkitRequestFullscreen(); usedApi=true; } }catch(e){ usedApi=false; }
    lock(); draw(true); showBar();
  }
  function close(fromEvent){
    if(!isOn) return; isOn=false; endIs=false; ov.classList.remove("on"); ov.classList.remove("end");
    try{ if(wl){ wl.release(); wl=null; } }catch(e){}
    if(!fromEvent){ try{ if(document.fullscreenElement && document.exitFullscreen) document.exitFullscreen(); }catch(e){} }
    try{ persistNow(); paintLyrics(); }catch(e){}
  }
  window.bppFsPages=function(k){ return (isOn && stage)?pages(k):null; };
  window.bppFsOpen=open; window.bppFsClose=close; window.bppFsState=function(){ return {on:isOn, k:curK, page:page, pages:curK>=0?pages(curK).length:0, fs:box?parseFloat(box.style.fontSize):0, timed:!!timed(), cut:(curK>=0 && pages(curK).length>1)?pages(curK)[0].lines.length:0}; };
  function addBtn(){
    var ba=document.getElementById("btnAuto"); if(!ba || document.getElementById("btnFs")) return;
    var b=document.createElement("button"); b.type="button"; b.id="btnFs"; b.onclick=open; ba.parentNode.insertBefore(b, ba.nextSibling);
    label();
  }
  function addMain(){
    var bp=document.getElementById("btnPlay"); if(!bp || document.getElementById("btnPPrev")) return;
    function mk(id, txt, fn, cls){ var b=document.createElement("button"); b.type="button"; b.id=id; b.textContent=txt; b.className=cls; b.onclick=fn; return b; }
    mPrev=mk("btnPPrev","",function(){ window.bppPrayerNav.prev(); },"bppPn");
    mNext=mk("btnPNext","",function(){ window.bppPrayerNav.next(); },"bppPn");
    mRep=mk("btnRep","",cycleRep,"bppRep");
    bp.parentNode.insertBefore(mPrev, bp); bp.parentNode.insertBefore(mNext, bp.nextSibling); mNext.parentNode.insertBefore(mRep, mNext.nextSibling);
    syncNav();
  }
  function label(){ var b=document.getElementById("btnFs"); if(!b) return; if(b.textContent!==T(0)) b.textContent=T(0); b.title=T(1); b.disabled=!P(); }
  document.addEventListener("DOMContentLoaded", function(){ addBtn(); addMain(); setInterval(function(){ label(); if(!isOn) syncNav(); }, 1000); });
})();
