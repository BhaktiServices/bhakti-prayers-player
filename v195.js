/* [Grok-Bot] V1.95: Grossbild - die ganze naechste Strophe faehrt waehrend der letzten Zeile von unten hoch (ersetzt v191.js).
   - Die naechste Strophe (bzw. der naechste Teil einer langen Strophe) steht genau so da, wie sie nach dem Wechsel aussieht
     (gleiche Schriftgroesse, Akkorde/Uebersetzung wie eingestellt), nur ganz wenig dunkler (88 %).
   - Aktuelle und naechste Strophe bewegen sich zusammen in einer durchgehenden, gleichmaessigen Bewegung nach Medienzeit nach oben;
     die aktuelle laeuft oben hinaus. Die gerade gesungene letzte Zeile wandert dabei ins obere Drittel (nie ueberlappend). Braucht
     die neue Strophe fast den ganzen Bildschirm (oft quer), rueckt die letzte Zeile hoechstens bis an den oberen Rand und bleibt bis
     zum Wechsel ganz lesbar; den Rest des Weges gleitet die neue Strophe dann direkt nach dem Wechsel weiter (0,55-1,4 s).
   - Die Uebersetzung der aktuellen Strophe blendet zu Beginn aus. Bei Pause steht alles. Nicht bei der letzten Strophe.
   - Am Wechselzeitpunkt steht die neue Strophe an ihrem Platz und geht auf volle Helligkeit, ohne Sprung; der Rest der alten
     Strophe gleitet oben hinaus. Das Ashtotram-Laufband (v189) und der Tastenschutz (v194) bleiben unveraendert. */
window.BPP_BUILD="1.95";
window.bppPv191=1; /* schaltet die alte Vorschau in v189.js ab */
(function(){
  if(window.bppV195) return; window.bppV195=1;
  var EASE="cubic-bezier(.45,0,.2,1)", DUR=550, OP=0.88, RAMP=0.6, UPPER=0.3;
  var css=document.createElement("style");
  css.textContent="#bppFsBox{transition:none!important;transform-origin:50% 0}"+
    "#bppNx195{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:0;visibility:hidden;will-change:transform,opacity;z-index:1}"+
    "#bppNx195 .nbox{display:inline-block;text-align:center;line-height:1.22;max-width:100%}#bppNx195 .vl{white-space:nowrap}"+
    "#bppNx195 .fch{white-space:nowrap;color:#f0d24a;font-size:.42em;margin-bottom:.25em;letter-spacing:.04em}"+
    "#bppNx195 .ftr{white-space:normal;color:#a9a39a;font-size:.36em;line-height:1.3;margin:.7em auto 0;font-style:italic}"+
    "#bppFs.end #bppNx195,#bppFs.scr #bppNx195{display:none}"+
    ".bppG195 .gbox{transform-origin:50% 0}";
  document.head.appendChild(css);
  function yt(){ return typeof ytOn!=="undefined" && !!ytOn; }
  function P(){ return (typeof i!=="undefined" && i>=0)?PRAYERS[i]:null; }
  function clamp(x){ return x<0?0:(x>1?1:x); }
  function smooth(x){ x=clamp(x); return x*x*(3-2*x); }
  function ease(x){ x=clamp(x); return 0.45*x+0.55*smooth(x); } /* gleichmaessig, nur weich an den Enden */
  function reduced(){ try{ return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){ return false; } }
  function esc(s){ return String(s).replace(/[&<>]/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c]; }); }
  function norm(s){ return String(s||"").replace(/\s+/g," ").trim(); }
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
  var info=null, infoAt=0;
  function infoNow(){ var now=performance.now(); if(!info || now-infoAt>400){ infoAt=now; try{ var x=window.bppSwitchInfo?window.bppSwitchInfo():null; info=(x && x.B && x.B.length && x.E && x.E.length===x.B.length)?x:null; }catch(e){ info=null; } } return info; }
  function activeJ(inf, t){ var j=0; for(var q=0;q<inf.E.length;q++){ if(inf.E[q]<=t+0.05) j=q; else break; } return j; }
  function linesOf(p, k){
    var g=stanzaGroups(p)[k], L=[]; if(!g) return L;
    g.idx.forEach(function(n){ String((p.zeilen[n]||{}).sa||"").split("\n").forEach(function(s){ s=s.trim(); if(s) L.push(s); }); });
    return L;
  }
  function fsState(){ try{ return window.bppFsState?window.bppFsState():null; }catch(e){ return null; } }
  function optOn(id){ var b=document.getElementById(id); return !!(b && b.classList.contains("on")); }
  /* Phase "letzte Zeile": was kommt (Strophe k2/Teil), Beginn (Medienzeit) und Wechselzeitpunkt */
  function phase(s, t){
    var p=P(); if(!p || !s.timed || t===null || !window.bppLineSched) return null;
    var inf=infoNow(); if(!inf) return null;
    var j=activeJ(inf, t), k=inf.B[j].k;
    if(k!==s.k && j>0 && inf.B[j-1].k===s.k && t<inf.E[j]+0.8){ j=j-1; k=s.k; }
    if(k!==s.k) return null;
    var L=linesOf(p, k); if(!L.length) return null;
    var pages=s.pages||1, pg=s.page||0, cut=(pages>1)?(s.cut||0):0;
    var onFirst=(pages>1 && pg===0 && cut>0 && cut<L.length), lastIdx=onFirst?cut-1:L.length-1, nk=null, npg=0;
    if(onFirst){ nk=k; npg=1; } else if(j+1<inf.B.length){ nk=inf.B[j+1].k; npg=0; }
    if(nk===null) return null;
    var sc=window.bppLineSched(j, inf, L); if(!sc) return null;
    var from=sc.start[lastIdx], endT=onFirst?(sc.end[cut-1]+0.1):inf.E[j+1];
    var firstIdx=onFirst?0:(pages>1?cut:0);
    if(lastIdx===firstIdx){ var e0=onFirst?sc.end[cut-1]:sc.e; from=from+0.5*Math.max(0, e0-from); }
    if(from==null || !(endT>0) || !(t>=from-0.05 && t<endT+0.8)) return null;
    return {nk:nk, npg:npg, from:from, endT:endT, j:j};
  }
  var stage=null, box=null, nx=null, nbox=null, geo=null, live=null, dirty=false, snap=null, busy=false, pgC={};
  function relTop(el, root){ var y=0; while(el && el!==root){ y+=el.offsetTop; el=el.offsetParent; } return y; }
  function take(){ var s=fsState(), p=P(); return {html:box.innerHTML, fs:box.style.fontSize, st:(s?s.k+"/"+s.page:"")+"/"+(p?p.id:""), txt:box.textContent}; }
  function ensure(){
    var st=document.getElementById("bppFsStage"), bx=document.getElementById("bppFsBox"); if(!st || !bx) return false;
    if(st!==stage || bx!==box){ stage=st; box=bx; geo=null; live=null;
      nx=document.createElement("div"); nx.id="bppNx195"; nx.setAttribute("aria-hidden","true"); nbox=document.createElement("div"); nbox.className="nbox"; nx.appendChild(nbox); stage.appendChild(nx);
      new MutationObserver(onMut).observe(box,{childList:true, subtree:true, characterData:true}); snap=take(); }
    if(nx.parentNode!==stage) stage.appendChild(nx);
    return true;
  }
  /* Seiten der naechsten Strophe genau wie v183 (bppFsPages). Ist sie noch nicht berechnet, misst v183 im echten Feld;
     danach wird der Inhalt sofort (vor dem Zeichnen) wiederhergestellt. */
  function pageOf(nk, npg){
    var p=P(), key=(p?p.id:"")+"|"+nk+"|"+optOn("bppFsCh")+optOn("bppFsTr")+"|"+stage.clientWidth+"x"+stage.clientHeight+"|"+(typeof lang!=="undefined"?lang:"")+"|"+(typeof steps!=="undefined"?steps:"");
    if(!pgC[key]){
      if(typeof window.bppFsPages!=="function") return null;
      var h=box.innerHTML, f=box.style.fontSize, r=null;
      busy=true; try{ r=window.bppFsPages(nk); }catch(e){ r=null; }
      if(box.innerHTML!==h) box.innerHTML=h; if(box.style.fontSize!==f) box.style.fontSize=f; busy=false;
      if(!r || !r.length) return null; pgC[key]=r;
    }
    var r2=pgC[key]; return r2[Math.min(npg, r2.length-1)];
  }
  function renderNext(pp){
    var fs=pp.fs, h="", chOn=optOn("bppFsCh"), trOn=optOn("bppFsTr");
    if(chOn && pp.ch) h+="<div class='fch'>"+esc(pp.ch)+"</div>";
    h+=pp.lines.map(function(s){ var c=String(s).charAt(0)==="\u00a7"; return "<div class='"+(c?"fch vl":"vl")+"'>"+esc(c?String(s).slice(1):s)+"</div>"; }).join("");
    if(trOn && pp.tr) h+="<div class='ftr'>"+esc(pp.tr)+"</div>";
    nbox.innerHTML=h; nbox.style.fontSize=fs+"px";
    var tE=nbox.querySelector(".ftr"); if(tE){ tE.style.maxWidth=Math.max(200, stage.clientWidth*0.92)+"px"; tE.style.fontSize=Math.max(14, Math.min(fs*0.36, 34))+"px"; }
    var cE=nbox.querySelector(".fch"); if(cE){ cE.style.fontSize=Math.max(13, fs*0.42)+"px"; }
  }
  /* Masse: Gesamtweg S der gemeinsamen Bewegung */
  function geom(ph){
    var fs=parseFloat(box.style.fontSize)||24, W=stage.clientWidth, H=stage.clientHeight;
    var key=ph.nk+"/"+ph.npg+"|"+fs+"|"+W+"x"+H+"|"+box.innerHTML.length+"|"+optOn("bppFsCh")+optOn("bppFsTr");
    if(geo && geo.key===key) return geo;
    var pp=pageOf(ph.nk, ph.npg); if(!pp || !pp.lines || !pp.lines.length) return null; /* vor dem Messen: pageOf kann den Inhalt neu setzen */
    var vls=box.querySelectorAll(".vl"), last=vls[vls.length-1]; if(!last) return null;
    renderNext(pp);
    var bt=relTop(box, stage), yLt=relTop(last, stage)-bt, yLb=yLt+last.offsetHeight;
    var nt=relTop(nbox, stage), gap=fs*0.45;
    var dFree=bt+(yLt+yLb)/2-H*UPPER, dNeed=bt+yLb+gap-nt;
    var S=Math.max(0, dFree, dNeed);
    /* Die letzte Zeile bleibt bis zum Wechsel ganz im Bild: braucht die neue Strophe den ganzen Bildschirm, legt sie den
       restlichen Weg R erst nach dem Wechsel zurueck (die Bewegung laeuft danach weiter, ohne Halt) */
    var Sm=Math.min(S, Math.max(0, dFree, bt+yLt-H*0.02)), R=S-Sm;
    geo={key:key, S:Sm, R:R, bt:bt, yLt:yLt, yLb:yLb, nt:nt, H:H, text:norm(nbox.textContent), html:nbox.innerHTML, nfs:nbox.style.fontSize, push:dNeed>dFree};
    return geo;
  }
  function ftrOp(v){ var f=box.querySelector(".ftr"); if(f) f.style.opacity=v; }
  function hideNx(){ if(nx){ nx.style.opacity="0"; nx.style.visibility="hidden"; nx.style.transform=""; } }
  function reset(){
    if(!dirty) return; dirty=false; live=null;
    if(box){ box.style.translate=""; ftrOp(""); }
    hideNx();
  }
  function frame(){
    requestAnimationFrame(frame);
    var s=fsState(), ov=document.getElementById("bppFs");
    if(!s || !s.on || !ov || ov.classList.contains("scr") || ov.classList.contains("end") || !ensure() || reduced()){ reset(); return; }
    var t=mediaT(), ph=null; try{ ph=phase(s, t); }catch(e){ ph=null; }
    if(!ph){
      /* Wiederholung derselben Strophe: v183 zeichnet nicht neu - den Wechsel trotzdem nahtlos machen */
      if(live && live.e>0.9 && norm(box.textContent)===live.text){ var lv=live; seam(take(), lv); return; }
      reset(); return;
    }
    var g=null; try{ g=geom(ph); }catch(e){ g=null; }
    if(!g){ reset(); return; }
    var x=(t-ph.from)/Math.max(0.3, ph.endT-ph.from), e=g.R>0.5?(0.8*clamp(x)+0.2*smooth(x)):ease(x), er=smooth((t-ph.from)/RAMP);
    var d=g.S*e, off=g.R+g.S*(1-e), op=OP*er;
    box.style.translate=d>0.05?("0 "+(-d).toFixed(2)+"px"):"";
    ftrOp(String(1-er));
    nx.style.visibility="visible"; nx.style.transform=off>0.05?("translateY("+off.toFixed(2)+"px)"):""; nx.style.opacity=op.toFixed(3);
    live={text:g.text, d:d, off:off, op:op, e:e, S:g.S, R:g.R, st:s.k+"/"+s.page, push:g.push}; dirty=true;
  }
  function onMut(){
    if(busy) return;
    var prev=snap, lv=live; snap=take(); geo=null;
    if(!prev || prev.st===snap.st || prev.txt===snap.txt) return;
    var run=function(){ afterSwitch(prev, lv); };
    if(window.queueMicrotask) queueMicrotask(run); else Promise.resolve().then(run);
  }
  /* nach allen MutationObservern (auch v187): nahtlos aus der hochgefahrenen Strophe, sonst v187-Animation mit verschobener alter Strophe */
  function afterSwitch(prev, lv){
    var first=box.querySelector(".vl");
    var ok=!!(lv && lv.op>0.05 && first && norm(box.textContent)===lv.text && box.animate);
    if(!ok){
      box.style.translate=""; hideNx(); live=null; dirty=false;
      if(lv){ var g0=stage.querySelector(".bppGhost:not(.bppG195) .gbox"); if(g0){ g0.style.transformOrigin="50% 0"; if(lv.d>0.05) g0.style.translate="0 "+(-lv.d)+"px"; var f0=g0.querySelector(".ftr"); if(f0) f0.style.opacity="0"; } }
      return;
    }
    seam(prev, lv);
  }
  function seam(prev, lv){
    var off=lv.off, d=lv.d, op=lv.op;
    box.style.translate=""; hideNx(); live=null; dirty=false;
    box.getAnimations().forEach(function(x){ try{ x.cancel(); }catch(e){} });
    Array.prototype.forEach.call(box.querySelectorAll("*"), function(c){ c.getAnimations && c.getAnimations().forEach(function(x){ try{ x.cancel(); }catch(e){} }); });
    Array.prototype.forEach.call(stage.querySelectorAll(".bppGhost"), function(n){ n.parentNode.removeChild(n); });
    /* Rest der alten Strophe an ihrer verschobenen Stelle, gleitet weiter hoch und blendet aus */
    var gh=document.createElement("div"); gh.className="bppGhost bppG195"; gh.setAttribute("aria-hidden","true");
    var gb=document.createElement("div"); gb.className="gbox"; gb.innerHTML=prev.html; gb.style.fontSize=prev.fs;
    if(d>0.05) gb.style.translate="0 "+(-d)+"px";
    var gf=gb.querySelector(".ftr"); if(gf) gf.style.opacity="0";
    gh.appendChild(gb); stage.appendChild(gh);
    var H=stage.clientHeight, gd=Math.round(Math.min(1400, Math.max(DUR, off*10))); /* Restweg nicht zu schnell */
    var ga=gh.animate([{transform:"translateY(0)", opacity:1},{transform:"translateY("+(-(off+0.18*H)).toFixed(1)+"px)", opacity:0}],{duration:gd, easing:off>0.5?"cubic-bezier(.3,.5,.4,1)":EASE, fill:"forwards"});
    ga.onfinish=function(){ if(gh.parentNode) gh.parentNode.removeChild(gh); };
    if(off>0.5) box.animate([{transform:"translateY("+off.toFixed(2)+"px)"},{transform:"translateY(0)"}],{duration:gd, easing:"cubic-bezier(.3,.5,.4,1)"});
    box.animate([{opacity:op},{opacity:1}],{duration:DUR, easing:"ease-out"});
    window.bppLastSeam={off:off, d:d, op:op, t:mediaT()};
  }
  requestAnimationFrame(frame);
  window.addEventListener("resize", function(){ geo=null; pgC={}; });
  window.bppPreviewInfo=function(){ return {text:live?live.text:null, on:!!(live && live.op>0.3), op:live?live.op:0, e:live?live.e:null, d:live?live.d:null, off:live?live.off:null, S:live?live.S:null, R:live?live.R:null, push:live?live.push:null}; };
  window.bppNextRect=function(){ if(!nbox || !box) return null; var a1=nbox.getBoundingClientRect(), b1=box.getBoundingClientRect(); return {nx:{x:a1.x,y:a1.y,w:a1.width,h:a1.height}, box:{x:b1.x,y:b1.y,w:b1.width,h:b1.height}, nfs:nbox.style.fontSize, bfs:box.style.fontSize}; };
})();

/* [Grok-Bot] V1.95: Quellenwahl als zusammenhaengende Zweier-Auswahl "YT" | "MP3" (ersetzt den Schalter aus v189.js).
   Aktive Quelle gold, die andere Standard; Tipp auf die andere schaltet um. Fehlt eine Quelle, ist sie ausgegraut und nicht tippbar.
   (Im Grossbild-Menue gibt es keine Quellenwahl.) */
(function(){
  if(window.bppSrc195) return; window.bppSrc195=1;
  var css=document.createElement("style");
  css.textContent="#btnSrc189,#btnSrc{display:none!important}"+
    "#bppSrc195{display:inline-flex;vertical-align:middle;white-space:nowrap;border-radius:7px}"+
    "#bppSrc195 button{font-size:.78rem;padding:2px 8px;margin:0!important;border-radius:0}"+
    "#bppSrc195 button:first-child{border-radius:7px 0 0 7px}#bppSrc195 button:last-child{border-radius:0 7px 7px 0;border-left:0}"+
    "#bppSrc195 button.gold{background:#8b6914;border-color:var(--gold,#c9a36a);color:var(--text,#fff6e8)}"+
    "#bppSrc195 button:disabled{opacity:.35;cursor:default}";
  document.head.appendChild(css);
  var grp=null, bY=null, bM=null;
  function de(){ return typeof lang!=="undefined" && lang==="de"; }
  function cur(){ return (typeof i!=="undefined" && i>=0)?PRAYERS[i]:null; }
  function pick(src){
    var p=cur(); if(!p) return;
    if(src==="yt" && !p.youtube) return; if(src==="file" && !p.audio) return;
    var isYt=(typeof ytOn!=="undefined" && !!ytOn); if((src==="yt")===isYt) return;
    try{ window.bppSetSrc(p, src); play(i,false); }catch(e){}
    setTimeout(sync, 50); setTimeout(sync, 400);
  }
  function mk(txt, src){ var b=document.createElement("button"); b.type="button"; b.textContent=txt; b.onclick=function(e){ e.stopPropagation(); pick(src); }; return b; }
  function build(){
    if(grp && grp.parentNode) return true;
    var anchor=document.getElementById("btnSrc189")||document.getElementById("btnSrc"); if(!anchor || !anchor.parentNode) return false;
    grp=document.createElement("span"); grp.id="bppSrc195"; grp.setAttribute("role","group");
    bY=mk("\u25b6 YT","yt"); bY.id="btnSrcYt"; bM=mk("\u266a MP3","file"); bM.id="btnSrcMp3";
    grp.appendChild(bY); grp.appendChild(bM); anchor.parentNode.insertBefore(grp, anchor);
    return true;
  }
  function set(b, has, on, tOn, tOff, tNo){
    if(b.disabled!==!has) b.disabled=!has;
    b.classList.toggle("gold", !!(has && on)); b.setAttribute("aria-pressed", (has && on)?"true":"false");
    var t=!has?tNo:(on?tOn:tOff); if(b.title!==t){ b.title=t; b.setAttribute("aria-label", t); }
  }
  function sync(){
    if(!build()) return;
    var p=cur(), hasY=!!(p && p.youtube), hasM=!!(p && p.audio), isYt=(typeof ytOn!=="undefined" && !!ytOn);
    grp.style.display=(hasY || hasM)?"":"none"; if(!(hasY || hasM)) return;
    var d=de();
    var q=(typeof lang!=="undefined"&&lang==="pt"); /* [Grok-Bot] V3.54 Portugues */
    if(q){ set(bY, hasY, isYt, "YouTube tocando", "Mudar para YouTube", "Sem YouTube para esta oração"); set(bM, hasM, !isYt, "MP3 tocando", "Mudar para MP3", "Sem MP3 para esta oração"); return; }
    set(bY, hasY, isYt, d?"YouTube spielt":"YouTube is playing", d?"Auf YouTube umschalten":"Switch to YouTube", d?"Kein YouTube fuer dieses Prayer":"No YouTube for this prayer");
    set(bM, hasM, !isYt, d?"MP3 spielt":"MP3 is playing", d?"Auf MP3 umschalten":"Switch to MP3", d?"Keine MP3 fuer dieses Prayer":"No MP3 for this prayer");
  }
  function boot(){ sync(); setInterval(sync, 400); document.addEventListener("click", function(){ setTimeout(sync, 30); }, true); }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  window.bppSrcInfo=function(){ return grp?{shown:grp.style.display!=="none", yt:{dis:bY.disabled, gold:bY.classList.contains("gold")}, mp3:{dis:bM.disabled, gold:bM.classList.contains("gold")}}:null; };
})();
