/* [Grok-Bot] V1.89: Grossbild – Vorschau der naechsten Strophe.
   Waehrend die letzte Zeile einer Strophe (bzw. des ersten Teils einer langen Strophe) gesungen wird, scrollt die erste Zeile
   der naechsten Strophe (bzw. des naechsten Teils) unten herein, kleiner und gedimmt. Am bisherigen Wechselzeitpunkt (Ende des
   Gesangs) gleitet dann die ganze neue Strophe hoch (Animation aus V1.87). Nicht bei der letzten Strophe.
   Beginn der letzten Zeile: Silbenanteil an der gesungenen Zeit der Strophe (Pausen herausgerechnet), eingerastet auf eine
   gemessene Pause innerhalb der Strophe, wo es eine gibt (BPP_PAUSES). Alles in Medienzeit, stimmt bei jedem Tempo.
   Die Schriftgroesse der Strophe bleibt; reicht der Platz unten nicht, rueckt sie weich hoch (notfalls leicht verkleinert).
   V1.91: Vorschau und Hochgleiten macht v191.js (window.bppPv191); hier bleiben Zeitplan (bppLineSched) und Teilwechsel-Haken. */
window.BPP_BUILD="1.89";
(function(){
  if(window.bppV189) return; window.bppV189=1;
  var EASE="cubic-bezier(.45,0,.2,1)";
  var css=document.createElement("style");
  css.textContent="#bppFsBox{transform-origin:50% 0;transition:translate .45s "+EASE+",scale .45s "+EASE+"}"+
    "#bppFsPv{position:absolute;left:0;right:0;bottom:0;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.25;"+
    "color:inherit;opacity:0;pointer-events:none;transform:translateY(110%);transition:transform .45s "+EASE+",opacity .45s "+EASE+";z-index:1}"+
    "#bppFsPv.on{opacity:.45;transform:none}"+
    "#bppFsPv.out{opacity:0;transform:translateY(-60%);transition:transform .3s "+EASE+",opacity .25s linear}"+
    "#bppFs.end #bppFsPv{display:none}"+
    "@media (prefers-reduced-motion: reduce){#bppFsBox{transition:none}#bppFsPv,#bppFsPv.out{transform:none!important;transition:opacity .2s linear}}";
  document.head.appendChild(css);

  function yt(){ return typeof ytOn!=="undefined" && !!ytOn; }
  function P(){ return (typeof i!=="undefined" && i>=0)?PRAYERS[i]:null; }
  function mediaT(){ try{ if(yt()) return (typeof ytTime==="number")?ytTime:null; if(a && a.src && isFinite(a.duration) && a.duration>=8) return a.currentTime||0; }catch(e){} return null; }
  function durT(){ try{ return yt()?((typeof ytDur==="number")?ytDur:0):(isFinite(a.duration)?a.duration:0); }catch(e){ return 0; } }
  function pauses(p){
    var R=window.BPP_PAUSES && window.BPP_PAUSES[p.id+"|"+(yt()?"yt":"file")]; if(!R || !R.length) return [];
    var d=durT(); if(!(d>0) || Math.abs(d-R[0]/10)>1.5) return [];
    var out=[]; for(var q=1;q+1<R.length;q+=2) out.push([R[q]/10, R[q+1]/10]); return out;
  }
  function linesOf(p, k){
    var g=stanzaGroups(p)[k], L=[]; if(!g) return L;
    g.idx.forEach(function(n){ String((p.zeilen[n]||{}).sa||"").split("\n").forEach(function(s){ s=s.trim(); if(s) L.push(s); }); });
    return L;
  }
  function syl(s){
    var m=String(s).normalize("NFC").toLowerCase().match(/[aāiīuūṛṝḷḹeoéèêáàíóúäöüæœ\u0900-\u097f]+/g);
    if(m && m.length) return m.length;
    return Math.max(1, String(s).replace(/[\s()0-9·.,;:!?'"–—\-\/]/g,"").length/3);
  }
  /* Zeitplan einer Strophen-Instanz: Beginn jeder Zeile und Gesangsende vor jeder Zeile */
  var schedC={};
  function sched(p, j, info, nLines, lines){
    var s=info.B[j].t, e=(j+1<info.E.length)?info.E[j+1]-0.1:null;
    if(e===null){ var d=durT(), ps0=pauses(p); e=d>0?d-0.5:s+30; for(var q0=ps0.length-1;q0>=0;q0--){ if(ps0[q0][1]>=d-1.6 && ps0[q0][0]>s+2){ e=ps0[q0][0]; break; } } }
    var key=p.id+"|"+yt()+"|"+j+"|"+s.toFixed(2)+"|"+e.toFixed(2)+"|"+nLines;
    if(schedC[key]) return schedC[key];
    var res={s:s, e:e, start:[s], end:[]};
    if(!(e>s+0.5) || nLines<2){ res.start=[s]; res.end=[e]; schedC[key]=res; return res; }
    /* Pausen innerhalb der gesungenen Strecke */
    var ps=pauses(p).filter(function(x){ return x[0]>s+0.3 && x[1]<e-0.3; });
    var V=e-s; ps.forEach(function(x){ V-=x[1]-x[0]; }); if(V<0.5) V=0.5;
    function v2t(v){ var t=s, left=v; for(var q=0;q<ps.length;q++){ var seg=ps[q][0]-t; if(left<=seg) return t+left; left-=seg; t=ps[q][1]; } return t+left; }
    var w=lines.map(syl), tot=w.reduce(function(x,y){ return x+y; },0), acc=0, avg=V/nLines;
    var used={};
    for(var b=1;b<nLines;b++){
      acc+=w[b-1]; var est=v2t(V*acc/tot), win=Math.max(0.8, 0.4*avg), best=-1, bd=1e9;
      for(var q=0;q<ps.length;q++){ if(used[q]) continue; var x=ps[q], dd=(x[0]<=est && est<=x[1])?0:Math.min(Math.abs(x[0]-est), Math.abs(x[1]-est)); if(dd<=win && dd<bd){ bd=dd; best=q; } }
      if(best>=0){ used[best]=1; res.end.push(ps[best][0]); res.start.push(ps[best][1]); }
      else { var ld=Math.min(0.6, 0.15*avg); res.end.push(est-ld); res.start.push(est); }
    }
    res.end.push(e);
    for(var c=1;c<res.start.length;c++){ if(res.start[c]<res.start[c-1]+0.3) res.start[c]=res.start[c-1]+0.3; if(res.end[c-1]>res.start[c]) res.end[c-1]=res.start[c]; }
    schedC[key]=res; return res;
  }
  function active(info, t){ var j=0; for(var q=0;q<info.E.length;q++){ if(info.E[q]<=t+0.05) j=q; else break; } return j; }
  function infoNow(){ try{ var x=window.bppSwitchInfo?window.bppSwitchInfo():null; return (x && x.B && x.B.length && x.E && x.E.length===x.B.length)?x:null; }catch(e){ return null; } }
  /* Haken fuer v183: Zeitpunkt des Teilwechsels (Ende des Gesangs der letzten Zeile von Teil 1) */
  window.bppPageSwitchAt=function(k, cut, t){
    var p=P(); if(!p || !(cut>0)) return null;
    var info=infoNow(); if(!info) return null;
    var j=active(info, t); if(info.B[j].k!==k) return null;
    var L=linesOf(p, k); if(cut>=L.length) return null;
    var sc=sched(p, j, info, L.length, L);
    return (sc.end[cut-1]!=null)?sc.end[cut-1]+0.1:null;
  };
  window.bppLineSched=function(j, info, L){ var p=P(); return p?sched(p, j, info, L.length, L):null; };
  /* ---------- Vorschau ---------- */
  var pv=null, stage=null, box=null, cur=null, lastSt="", shift=null;
  function ensure(){
    var st=document.getElementById("bppFsStage"), bx=document.getElementById("bppFsBox"); if(!st || !bx) return false;
    if(st!==stage || bx!==box){ stage=st; box=bx; pv=document.createElement("div"); pv.id="bppFsPv"; pv.setAttribute("aria-hidden","true"); stage.appendChild(pv);
      new MutationObserver(onBoxChange).observe(box,{childList:true, subtree:true, characterData:true}); }
    return true;
  }
  function fsOn(){ var s=null; try{ s=window.bppFsState?window.bppFsState():null; }catch(e){} return s; }
  function setShift(dy, sc, instant){
    if(!box) return;
    if(instant){ box.style.transition="none"; }
    box.style.translate=dy?("0 "+(-dy)+"px"):""; box.style.scale=(sc && sc<0.999)?String(sc):"";
    if(instant){ void box.offsetHeight; box.style.transition=""; }
    shift=(dy||(sc&&sc<0.999))?{dy:dy, sc:sc||1}:null;
  }
  function hide(out){
    if(!pv) return; cur=null;
    if(out && pv.classList.contains("on")){ pv.classList.remove("on"); pv.classList.add("out"); setTimeout(function(){ if(pv && !cur){ pv.style.transition="none"; pv.classList.remove("out"); void pv.offsetHeight; pv.style.transition=""; } }, 320); }
    else pv.classList.remove("on");
  }
  function onBoxChange(){
    if(window.bppPv191) return;
    /* Wechsel (Strophe/Teil): neue Strophe ohne Verschiebung, Geist der alten an der verschobenen Stelle lassen */
    var old=shift; var had=pv && pv.classList.contains("on");
    var stNow=fsOn(), sk=stNow?(stNow.k+"/"+stNow.page):"";
    if(sk===lastSt){ if(cur) layout(cur.text, true); return; }
    lastSt=sk;
    setShift(0, 1, true); hide(had);
    if(old){ var fix=function(){ var g=stage && stage.querySelector(".bppGhost .gbox"); if(g){ g.style.transformOrigin="50% 0"; g.style.translate="0 "+(-old.dy)+"px"; if(old.sc<0.999) g.style.scale=String(old.sc); } };
      fix(); if(window.queueMicrotask) queueMicrotask(fix); requestAnimationFrame(fix); }
  }
  function layout(text, keep){
    var H=stage.clientHeight, W=stage.clientWidth, fs=parseFloat(box.style.fontSize)||24;
    var pf=Math.max(14, Math.min(fs*0.55, H*0.1));
    pv.textContent=text; pv.style.fontSize=pf+"px";
    var sw=pv.scrollWidth; if(sw>W*0.96){ pf=Math.max(12, pf*W*0.96/sw); pv.style.fontSize=pf+"px"; }
    var ph=pf*1.25, gap=Math.max(6, pf*0.3);
    var top=box.offsetTop, bh=box.offsetHeight, over=top+bh+gap-(H-ph);
    var dy=0, sc=1;
    if(over>0){ dy=Math.min(over, Math.max(0, top)); if(over-dy>0.5){ dy=Math.max(0, top); sc=Math.max(0.6, (H-ph-gap)/Math.max(1, bh)); } }
    setShift(dy, sc, false);
  }
  function tick(){
    if(window.bppPv191) return;
    var s=fsOn(), ovl=document.getElementById("bppFs");
    if(!s || !s.on || !ensure() || (ovl && ovl.classList.contains("scr"))){ if(pv && cur){ setShift(0,1,true); hide(false); } return; }
    var want=null;
    try{
      var p=P(), t=mediaT(), info=(p && s.timed && t!==null)?infoNow():null;
      if(info && !document.getElementById("bppFs").classList.contains("end")){
        var j=active(info, t), k=info.B[j].k;
        /* Wechselzeit erreicht, v183 hat aber noch nicht neu gezeichnet: Vorschau bis zum Hochgleiten stehen lassen */
        if(k!==s.k && j>0 && info.B[j-1].k===s.k && t<info.E[j]+0.8){ j=j-1; k=s.k; }
        var pageNow=s.page||0, pages=s.pages||1, L=linesOf(p, k);
        if(k===s.k && L.length){
          var cut=(pages>1)?(s.cut||0):0;
          var onFirst=(pages>1 && pageNow===0 && cut>0 && cut<L.length);
          var lastIdx=onFirst?cut-1:L.length-1;
          var nextText=null;
          if(onFirst) nextText=L[cut];
          else if(j+1<info.B.length){ var L2=linesOf(p, info.B[j+1].k); nextText=L2[0]||null; }
          if(nextText){
            var sc=sched(p, j, info, L.length, L), from=sc.start[lastIdx];
            var endT=onFirst?(sc.end[cut-1]+0.1):info.E[j+1];
            /* einzeilige Strophe/Teil: Vorschau ab der Mitte der Zeile */
            var firstIdx=onFirst?0:(pages>1?cut:0);
            if(lastIdx===firstIdx){ var e0=onFirst?sc.end[cut-1]:sc.e; from=from+0.5*Math.max(0, e0-from); }
            if(from!=null && t>=from-0.05 && t<endT+0.8) want=nextText;
          }
        }
      }
    }catch(e){ want=null; }
    if(want){
      var stK=s.k+"/"+s.page; if(lastSt==="") lastSt=stK;
      if(!cur || cur.text!==want || cur.st!==stK){ cur={text:want, st:stK}; pv.style.transition=""; pv.classList.remove("out"); layout(want); void pv.offsetHeight; pv.classList.add("on"); }
    } else if(cur){ hide(false); setShift(0,1,false); }
  }
  setInterval(tick, 120);
  window.addEventListener("resize", function(){ if(cur && box){ setTimeout(function(){ if(cur) layout(cur.text, true); }, 350); } });
  window.bppPreviewInfo=function(){ return {text:cur?cur.text:null, on:!!(pv && pv.classList.contains("on")), shift:shift, pvFs:pv?pv.style.fontSize:null}; };
})();

/* [Grok-Bot] V1.89: Tastenfarben einheitlich im normalen Player: gold = an/aktiv, sonst Standard.
   Play gold nur waehrend der Wiedergabe, Uebersetzung/Akkorde gold wenn an, Quelle als Schalter "YT" (gold = YouTube aktiv, Standard = MP3). */
(function(){
  if(window.bppUi189) return; window.bppUi189=1;
  var css=document.createElement("style");
  css.textContent="#btnSrc189 .bppI{width:1.05em;height:1.05em;vertical-align:-.15em;margin-right:3px}"+
    "select#selRate{background:#4a372b;border:1px solid #6b5340;color:var(--text,#fff6e8);font-weight:400;border-radius:7px}"+
    "select#selRate.off1{background:#8b6914;border-color:var(--gold,#c9a36a);color:var(--text,#fff6e8)}";
  document.head.appendChild(css);
  var PLAY='<svg class="bppI" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 4.5v15L19.5 12z"/></svg>';
  var my=null;
  function de(){ return typeof lang!=="undefined" && lang==="de"; }
  function srcBtn(){
    var orig=document.getElementById("btnSrc");
    if(!my && orig && orig.parentNode){
      my=document.createElement("button"); my.type="button"; my.id="btnSrc189"; my.style.cssText="font-size:.78rem;padding:2px 7px";
      my.innerHTML=PLAY+"YT";
      my.onclick=function(){ if(typeof i==="undefined"||i<0) return; var P=PRAYERS[i]; if(!P||!P.audio||!P.youtube) return;
        window.bppSetSrc(P, ytOn?"file":"yt"); play(i,false); setTimeout(sync, 50); };
      orig.parentNode.insertBefore(my, orig); orig.parentNode.removeChild(orig); /* tr-hi.js pflegt die alte Taste weiter, aber unsichtbar */
    }
    if(my){ var P=(typeof i!=="undefined"&&i>=0)?PRAYERS[i]:null, show=!!(P&&P.youtube&&P.audio), on=(typeof ytOn!=="undefined" && !!ytOn);
      my.style.display=show?"":"none"; my.classList.toggle("on", on);
      var t=on?(de()?"YouTube ist an (Tippen: MP3)":"YouTube is on (tap: MP3)"):(de()?"MP3 spielt (Tippen: YouTube)":"MP3 is playing (tap: YouTube)");
      if(typeof lang!=="undefined"&&lang==="pt") t=on?"YouTube ligado (toque: MP3)":"MP3 tocando (toque: YouTube)"; /* [Grok-Bot] V3.54 */
      if(my.title!==t){ my.title=t; my.setAttribute("aria-label", t); my.setAttribute("aria-pressed", on?"true":"false"); } }
  }
  function sync(){
    var bp=document.getElementById("btnPlay"); if(bp && bp.classList.contains("gold")){ bp.classList.remove("gold"); try{ syncPlayBtn(); }catch(e){} }
    var d=document.getElementById("btnDe"); if(d && typeof showDe!=="undefined") (d.classList.contains("m358")||d.classList.toggle("on", !!showDe));
    var c=document.getElementById("btnCh"); if(c && typeof showCh!=="undefined") (c.classList.contains("m358")||c.classList.toggle("on", !!showCh));
    var au=document.getElementById("btnAuto"); if(au && typeof autoScroll!=="undefined") (au.classList.contains("m358")||au.classList.toggle("on", !!autoScroll));
    srcBtn();
  }
  /* [Grok-Bot] V4.30: "on" nicht mehr an Knoepfe haengen, die v358 (.m358) fuehrt - v358 entfernte es sofort wieder -> Flackern (Ue + Akk in Zeile) */
  function boot(){ sync(); setInterval(sync, 400); document.addEventListener("click", function(){ setTimeout(sync, 30); }, true); }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();

/* [Grok-Bot] V1.89: Grossbild als Laufband (zuerst nur Ashtotram, 108 Namen).
   Statt Strophe fuer Strophe scrollt der Text gleichmaessig nach oben; der gerade gesungene Name ist hervorgehoben und steht
   etwa in der Bildmitte. Position = Medienzeit, zwischen den gemessenen Marken linear interpoliert (stimmt bei jedem Tempo);
   bei Pause steht das Band. Einschaltbar je Prayer: P.fsScroll=true oder window.BPP_FS_SCROLL[id]=true. */
(function(){
  if(window.bppScroll189) return; window.bppScroll189=1;
  window.BPP_FS_SCROLL=window.BPP_FS_SCROLL||{}; if(window.BPP_FS_SCROLL.ashtotram===undefined) window.BPP_FS_SCROLL.ashtotram=true;
  var css=document.createElement("style");
  css.textContent="#bppFs.scr #bppFsBox,#bppFs.scr .bppGhost,#bppFs.scr #bppFsPv{visibility:hidden!important}"+
    "#bppFsScr{position:absolute;inset:0;overflow:hidden;display:none;-webkit-mask-image:linear-gradient(transparent,#000 16%,#000 84%,transparent);mask-image:linear-gradient(transparent,#000 16%,#000 84%,transparent)}"+
    "#bppFs.scr #bppFsScr{display:block}"+
    "#bppFsScr .rail{position:absolute;left:0;right:0;top:0;will-change:transform}"+
    "#bppFsScr .it{text-align:center;padding:.12em 0 .18em;line-height:1.2}"+
    "#bppFsScr .nm{white-space:normal;text-wrap:balance;max-width:96%;margin:0 auto;color:rgba(243,238,226,.38);transition:color .35s}#bppFsScr .rail.meas .nm{white-space:nowrap;max-width:none}"+
    "#bppFsScr .tr{white-space:normal;font-size:max(12px,.4em);line-height:1.3;color:rgba(169,163,154,.45);font-style:italic;max-width:92%;margin:.1em auto 0;transition:color .35s}"+
    "#bppFsScr .it.on .nm{color:#fff6e8;text-shadow:0 0 .5em rgba(201,163,106,.35)}#bppFsScr .it.on .tr{color:#c9c2b6}"+
    "#bppFsScr .it.on{background:linear-gradient(90deg,transparent,rgba(139,105,20,.28) 18%,rgba(139,105,20,.28) 82%,transparent);border-radius:10px}";
  document.head.appendChild(css);
  function P(){ return (typeof i!=="undefined" && i>=0)?PRAYERS[i]:null; }
  function yt(){ return typeof ytOn!=="undefined" && !!ytOn; }
  function enabled(p){ return !!(p && (p.fsScroll || window.BPP_FS_SCROLL[p.id])); }
  function playing(){ try{ return yt()?!!ytPlaying:!!(a && a.src && !a.paused && !a.ended); }catch(e){ return false; } }
  var lastYt=null, lastYtAt=0;
  function mediaT(){
    try{
      if(yt()){ if(typeof ytTime!=="number") return null; var now=performance.now();
        if(ytTime!==lastYt){ lastYt=ytTime; lastYtAt=now; }
        return (ytPlaying && now-lastYtAt<1500)?ytTime+(now-lastYtAt)/1000:ytTime; }
      if(a && a.src && isFinite(a.duration) && a.duration>=8) return a.currentTime||0;
    }catch(e){}
    return null;
  }
  var ov=null, stage=null, wrap=null, rail=null, items=[], key="", info=null, infoAt=0, cy=[], H=0, onK=-1, curY=null, manual=false;
  function trOn(){ var b=document.getElementById("bppFsTr"); return !!(b && b.classList.contains("on")); }
  function esc(s){ return String(s).replace(/[&<>]/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c]; }); }
  function build(p){
    var gs=stanzaGroups(p), tr=trOn(), h="";
    gs.forEach(function(g,k){
      var L=[], T=[];
      g.idx.forEach(function(n){ var z=p.zeilen[n]; String(z.sa||"").split("\n").forEach(function(s){ s=s.trim(); if(s) L.push(s); });
        if(tr){ var t=""; try{ t=(window.lineText||function(x){ return x.ue||x.en||""; })(z); }catch(e){} if(t) T.push(t); } });
      h+="<div class='it' data-k='"+k+"'>"+L.map(function(s){ return "<div class='nm'>"+esc(s)+"</div>"; }).join("")+(T.length?"<div class='tr'>"+esc(T.join(" "))+"</div>":"")+"</div>";
    });
    rail.innerHTML=h; items=Array.prototype.slice.call(rail.children);
    /* Schriftgroesse: laengster Name passt in die Breite, hoechstens ca. 1/7 der Hoehe */
    var W=stage.clientWidth; H=stage.clientHeight; rail.style.fontSize="100px";
    /* Breite der Namen bei 100px; Massstab ist der 85-%-Wert, laengere Namen brechen um */
    rail.classList.add("meas"); var ws=[]; rail.querySelectorAll(".nm").forEach(function(e){ ws.push(e.scrollWidth); }); rail.classList.remove("meas");
    ws.sort(function(x,y){ return x-y; }); var mw=Math.max(1, ws[Math.min(ws.length-1, Math.floor(ws.length*0.85))]||1);
    var fs=Math.max(18, Math.min(H/8.5, 100*W*0.94/mw, 60)); rail.style.fontSize=fs.toFixed(1)+"px";
    cy=items.map(function(e){ var n=e.querySelector(".nm")||e; return n.offsetTop+n.offsetHeight/2; });
    onK=-1; curY=null;
  }
  function ensure(p){
    ov=document.getElementById("bppFs"); stage=document.getElementById("bppFsStage"); if(!ov || !stage) return false;
    if(!wrap || wrap.parentNode!==stage){ wrap=document.createElement("div"); wrap.id="bppFsScr"; wrap.setAttribute("aria-hidden","true"); rail=document.createElement("div"); rail.className="rail"; wrap.appendChild(rail); stage.appendChild(wrap); key=""; }
    var k=p.id+"|"+(typeof lang!=="undefined"?lang:"")+"|"+trOn()+"|"+stage.clientWidth+"x"+stage.clientHeight+"|"+stanzaGroups(p).length;
    if(k!==key){ key=k; build(p); }
    return true;
  }
  function getInfo(){ var now=performance.now(); if(!info || now-infoAt>1000){ infoAt=now; try{ info=window.bppSwitchInfo?window.bppSwitchInfo():null; }catch(e){ info=null; } } return info; }
  function setY(y, smooth){
    if(curY!==null && Math.abs(y-curY)<0.05) return; curY=y;
    rail.style.transition=smooth?"transform .5s cubic-bezier(.45,0,.2,1)":"none";
    rail.style.transform="translate3d(0,"+(H/2-y).toFixed(1)+"px,0)";
  }
  function mark(k){ if(k===onK) return; if(items[onK]) items[onK].classList.remove("on"); onK=k; if(items[k]) items[k].classList.add("on"); }
  function off(){ if(ov && ov.classList.contains("scr")) ov.classList.remove("scr"); info=null; }
  function frame(){
    requestAnimationFrame(frame);
    var p=P(), st=null; try{ st=window.bppFsState?window.bppFsState():null; }catch(e){}
    if(!st || !st.on || !enabled(p) || !st.timed){ off(); return; }
    var t=mediaT(), inf=(t!==null)?getInfo():null;
    if(!inf || !inf.B || inf.B.length<2){ off(); return; }
    ov=document.getElementById("bppFs"); if(!ov) return;
    if(!ov.classList.contains("scr")){ ov.classList.add("scr"); curY=null; key=""; }
    if(!ensure(p)){ off(); return; }
    var B=inf.B, E=inf.E, n=B.length;
    var j=0; for(var q=0;q<n;q++){ if(B[q].t<=t) j=q; else break; }
    var a0=B[j].k, y;
    if(t<B[0].t) y=cy[B[0].k];
    else if(j+1<n){ var f=(t-B[j].t)/Math.max(0.1, B[j+1].t-B[j].t); y=cy[a0]+Math.max(0,Math.min(1,f))*(cy[B[j+1].k]-cy[a0]); }
    else y=cy[a0];
    var ja=0; for(var r=0;r<E.length;r++){ if(E[r]<=t+0.05) ja=r; else break; }
    var kAct=B[ja].k;
    /* von Hand geblaettert (ohne Wiedergabe): zur gewaehlten Strophe gleiten */
    if(!playing() && st.k>=0 && st.k!==kAct){ mark(st.k); setY(cy[st.k], true); manual=true; return; }
    if(manual){ manual=false; mark(kAct); setY(y, true); return; }
    mark(kAct); setY(y, false);
  }
  window.addEventListener("resize", function(){ key=""; });
  requestAnimationFrame(frame);
  window.bppScrollInfo=function(){ return {on:!!(ov && ov.classList.contains("scr")), k:onK, y:curY, H:H, fs:rail?rail.style.fontSize:null}; };
})();
