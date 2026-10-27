/* [Grok-Bot] V2.50: Grossbild – Akkordknopf ♯ schaltet denselben Modus wie die Standardansicht (Aus / ueber der Strophe / je Zeile).
   Im Modus "je Zeile" stehen die Akkorde ueber der jeweiligen Verszeile (z.lineCh, z.B. Kavacam, Govinda, Hanuman), wo vorhanden;
   sonst bleibt die bisherige Akkordzeile. Text, Strophenwechsel und Autoscroll des Grossbilds bleiben unveraendert.
   Standardansicht: Mitlesen scrollt beim Strophenwechsel sanft (Ziel wie bisher berechnet, dann weich hingescrollt) zur aktuellen Strophe oben; manuelles Scrollen bleibt frei. */
window.BPP_BUILD="2.52"; window.BPP_SHOW="2.52";
(function(){
  function mode(){ return typeof chMode!=="undefined"?chMode:"aus"; }
  /* Knopf: globalen Modus weiterschalten, dann den internen Ein/Aus-Zustand des Grossbilds (Kopfzeile = "ueber der Strophe") angleichen */
  function hookBtn(){
    var b=document.getElementById("bppFsCh"); if(!b || b.__v250) return; b.__v250=1;
    var orig=b.onclick;
    b.onclick=function(e){
      if(e) e.stopPropagation();
      try{ toggleCh(); }catch(err){}
      sync(orig);
      try{ var bar=document.getElementById("bppFsBar"); if(bar) bar.classList.remove("hid"); }catch(err){}
    };
    b.__orig=orig;
  }
  function fsCh(){ try{ var o=JSON.parse(localStorage.getItem("bpp-fs")||"{}"); return o.ch===true; }catch(e){ return false; } }
  function sync(orig){
    var b=document.getElementById("bppFsCh"); if(!b) return; orig=orig||b.__orig; if(!orig) return;
    var want=mode()==="akk";
    if(fsCh()!==want){ try{ orig.call(b, {stopPropagation:function(){}}); }catch(err){} }
    b.classList.toggle("line", mode()==="zeile");
    var L={aus:"♯",akk:"♯",zeile:"♯≡"}; if(b.textContent!==L[mode()]) b.textContent=L[mode()];
    if(lastMode!==mode()){ lastMode=mode(); try{ window.dispatchEvent(new Event("resize")); }catch(err){} } /* Grossbild neu einpassen */
  }
  var lastMode=null;
  /* Standardansicht: pinStanza rechnet das Ziel wie bisher, das Lyrics-Fenster gleitet dann weich dorthin */
  (function(){
    if(typeof pinStanza!=="function" || window.__v250pin) return; window.__v250pin=1;
    var orig=pinStanza, red=false; try{ red=matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){}
    var anim=null;
    function stop(){ anim=null; }
    ["wheel","touchstart","keydown","mousedown"].forEach(function(ev){ window.addEventListener(ev, stop, {passive:true, capture:true}); });
    function go(L, from, to){
      if(window.bppManualAt && Date.now()-window.bppManualAt<900){ anim=null; L.scrollTop=to; return; } /* [Grok-Bot] V3.29: manuell sofort */
      if(anim && anim.to===to){ L.scrollTop=anim.cur; return; }
      var t0=performance.now(), D=Math.min(2200, 1300+Math.abs(to-from)*0.6); /* V2.51: lang und gleichmaessig wie im Grossbild */
      anim={to:to, cur:from}; L.scrollTop=from; var me=anim;
      (function step(){ if(anim!==me) return; var x=Math.min(1,(performance.now()-t0)/D), e=-(Math.cos(Math.PI*x)-1)/2;
        me.cur=from+(to-from)*e; L.scrollTop=me.cur; if(x<1) requestAnimationFrame(step); else anim=null; })();
    }
    window.pinStanza=function(){
      var L=document.getElementById("lyrics"); if(!L || red) return orig.apply(this, arguments);
      var from=anim?anim.cur:L.scrollTop, r=orig.apply(this, arguments), to=L.scrollTop;
      if(Math.abs(to-from)>2) go(L, from, to); else if(anim){ anim=null; }
      return r;
    };
  })();
  var css=document.createElement("style"); css.textContent="#bppFsCh.line{outline:2px solid #f0d24a;background:#5a5146}";
  document.head.appendChild(css);
  /* Je-Zeile-Akkorde in Strophe und Vorschau einsetzen */
  function norm(s){ return String(s).replace(/\s+/g," ").trim(); }
  function map(){
    var P=(typeof i!=="undefined" && i>=0)?PRAYERS[i]:null, m={}; if(!P||!P.zeilen) return m;
    P.zeilen.forEach(function(z){ var lc=(function(z){ try{ return window.bppLC442?bppLC442(z):z.lineCh; }catch(e){ return z.lineCh; } })(z); /* [Grok-Bot] V4.42: wie Standardansicht (bppLC442) */ if(!lc) return;
      if(lc.length!==String(z.sa||"").split("\n").length) return;
      var raw=String(z.sa||"").split("\n"); raw.forEach(function(s,k){ var t=norm(s); if(t && m[t]===undefined) m[t]=lc[k]||""; }); });
    return m;
  }
  function sh(c){ try{ return typeof shiftChordLine==="function"?shiftChordLine(c, steps):c; }catch(e){ return c; } }
  /* [Grok-Bot] V4.42: Zeilentext ohne Akkord-Spans von v365 (.k361). Hatte v365 die Zeile schon belegt (Wettlauf der MutationObserver),
     fand die Umwandlung den Text nicht mehr -> ganze Strophen-Akkordzeile blieb ueber Zeile 1 (Hanuman: D C G D in Zeile 1, Rest ohne Farbe). */
  function txt(g){ if(!g.querySelector(".k361")) return norm(g.textContent); var c=g.cloneNode(true); Array.prototype.forEach.call(c.querySelectorAll(".k361"),function(k){ k.remove(); }); return norm(c.textContent); }
  function clean(g){ if(g.querySelector(".k361")){ g.textContent=txt(g); g.classList.remove("c361"); try{ g.__k361=null; }catch(e){} } }
  var busy=false;
  function fix(bx){
    if(!bx || mode()!=="zeile") return;
    var kids=Array.prototype.slice.call(bx.children); if(!kids.length || bx.__v250sig===bx.innerHTML) return;
    var m=map(), changed=false, j=0;
    while(j<kids.length){
      var el=kids[j];
      if(el.classList.contains("fch") && el.classList.contains("vl") && !el.classList.contains("v250")){ /* V3.38: schon umgewandelte nicht erneut */
        var grp=[], q=j+1; while(q<kids.length && kids[q].classList.contains("vl") && !kids[q].classList.contains("fch")){ grp.push(kids[q]); q++; }
        var cs338=window.bppV338Ch?bppV338Ch(grp.map(function(g){ return txt(g); }), bx):null; /* V3.38 je Strophe */
        if(grp.length && (cs338 || grp.every(function(g){ return m[txt(g)]!==undefined; }))){
          el.parentNode.removeChild(el); grp.forEach(clean);
          grp.forEach(function(g,gi){ var c=cs338?cs338[gi]:m[txt(g)]; if(!c) return; var d=document.createElement("div"); d.className="fch vl v250"; d.textContent=sh(c); g.parentNode.insertBefore(d, g); });
          changed=true;
        }
        j=q; continue;
      }
      j++;
    }
    if(changed){
      var st=document.getElementById("bppFsStage");
      if(st && bx.id==="bppFsBox"){ for(var it=0; it<8 && (bx.scrollHeight>st.clientHeight+1 || bx.scrollWidth>st.clientWidth+1); it++){
        var fs=parseFloat(bx.style.fontSize)||0; if(!fs) break; bx.style.fontSize=(fs*0.93).toFixed(1)+"px";
        Array.prototype.forEach.call(bx.querySelectorAll(".ftr,.fch"), function(e){ var f=parseFloat(e.style.fontSize); if(f) e.style.fontSize=(f*0.93).toFixed(1)+"px"; }); } }
    }
    bx.__v250sig=bx.innerHTML;
  }
  function run(){ if(busy) return; busy=true; try{ fix(document.getElementById("bppFsBox")); var n=document.querySelector("#bppNx195 .nbox"); fix(n); }catch(e){} busy=false; }
  var obs=null;
  function attach(){
    hookBtn();
    var st=document.getElementById("bppFsStage"); if(st && !st.__v250){ st.__v250=1; obs=new MutationObserver(run); obs.observe(st,{childList:true,subtree:true}); }
    var b=document.getElementById("bppFsCh"); if(b && b.__orig) sync();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", attach); else attach();
  setInterval(attach, 600);
})();
