/* [Grok-Bot] V3.44: Standardansicht wahlweise 1, 2 oder 3 Spalten (Taste "Spalten" neben den Akkorden, gemerkt in localStorage "bpp-cols").
   Zeilenweises Grid: Strophen nebeneinander, Lesereihenfolge links->rechts, dann naechste Reihe; jede Strophe ein Block (Akkorde, Uebersetzung).
   Unter 700 px immer 1 Spalte, 3 Spalten erst ab 1100 px. Schriftgroesse je Spaltenbreite. Mitlesen scrollt zur Reihe der aktiven Strophe
   (pinStanza nutzt die Oberkante der Strophe). Grossbild unveraendert. */
window.BPP_BUILD="3.47"; window.BPP_SHOW="3.47";
(function(){
  if(window.bppV344) return; window.bppV344=1;
  var KEY="bpp-cols", GAP=22;
  var LAB={de:"Spalten",en:"Columns",fr:"Colonnes",es:"Columnas",ru:"Колонки",hi:"कॉलम"};
  var TIT={de:"Strophen in 1, 2 oder 3 Spalten nebeneinander",en:"Stanzas in 1, 2 or 3 columns side by side",fr:"Strophes sur 1, 2 ou 3 colonnes",es:"Estrofas en 1, 2 o 3 columnas",ru:"Строфы в 1, 2 или 3 колонки",hi:"श्लोक 1, 2 या 3 कॉलम में"};
  function want(){ var v=parseInt(localStorage.getItem(KEY)||"1",10); return v>=1&&v<=3?v:1; }
  function maxCols(){ var w=window.innerWidth||1000; return w<700?1:(w<1100?2:3); }
  function eff(){ return Math.min(want(), maxCols()); }
  function L(o){ var l=(typeof lang!=="undefined"&&lang)||"en"; return o[l]||o.en; }
  var css=document.createElement("style");
  css.textContent="#lyrics.bppC2,#lyrics.bppC3{display:grid!important;column-count:auto!important;column-gap:"+GAP+"px;row-gap:6px;align-items:start}"+
    "#lyrics.bppC2{grid-template-columns:repeat(2,minmax(0,1fr))}#lyrics.bppC3{grid-template-columns:repeat(3,minmax(0,1fr))}"+
    "#lyrics.bppC2>*:not(.stanza),#lyrics.bppC3>*:not(.stanza){grid-column:1/-1}"+
    "#lyrics.bppC2 .stanza,#lyrics.bppC3 .stanza{break-inside:avoid;min-width:0;margin-top:0}"+
    "#btnCols{white-space:nowrap}";
  document.head.appendChild(css);
  function fitCols(n){
    var box=document.getElementById("lyrics"); if(!box) return;
    var cs=getComputedStyle(box), w=(box.clientWidth||0)-parseFloat(cs.paddingLeft||0)-parseFloat(cs.paddingRight||0); if(w<=0) return;
    var colW=(w-GAP*(n-1))/n;
    var pad=0, st=box.querySelector(".stanza"); if(st){ var s2=getComputedStyle(st); pad=parseFloat(s2.paddingLeft||0)+parseFloat(s2.paddingRight||0)+parseFloat(s2.borderLeftWidth||0)+parseFloat(s2.borderRightWidth||0); }
    box.style.setProperty("--sc","1"); box.classList.remove("fitwrap"); box.classList.add("measure");
    var Lm=0; box.querySelectorAll(".rowline .sa .ln").forEach(function(el){ var x=el.getBoundingClientRect().width; if(x>Lm) Lm=x; });
    box.classList.remove("measure"); if(!Lm) return;
    var sc=(colW-pad-16)/Lm; if(sc>2.0) sc=2.0;
    if(sc<0.72){ sc=0.72; box.classList.add("fitwrap"); }
    box.__v344sc=String(Math.floor(sc*1000)/1000); box.style.setProperty("--sc",box.__v344sc);
  }
  function apply(){
    var box=document.getElementById("lyrics"); if(!box) return;
    var n=eff();
    box.classList.toggle("bppC2",n===2); box.classList.toggle("bppC3",n===3);
    if(n>1) fitCols(n);
  }
  function hook(){
    if(typeof layoutLyrics!=="function" || layoutLyrics.__v344) return;
    var orig=layoutLyrics;
    layoutLyrics=function(){ var r=orig.apply(this,arguments); try{ apply(); }catch(e){} return r; };
    layoutLyrics.__v344=1;
  }
  function relayout(){ try{ layoutLyrics(); }catch(e){} try{ if(typeof pinStanza==="function") pinStanza(); }catch(e){} }
  function btn(){
    var b=document.getElementById("btnCols");
    if(!b){
      var ref=document.getElementById("btnCh"); if(!ref||!ref.parentNode) return;
      b=document.createElement("button"); b.id="btnCols"; b.type="button";
      b.addEventListener("click",function(e){ e.preventDefault(); var mx=maxCols(); var v=want(); v=v>=mx?1:v+1; localStorage.setItem(KEY,String(v)); sync(); relayout(); });
      ref.parentNode.insertBefore(b, ref.nextSibling);
    }
    sync();
  }
  function sync(){
    var b=document.getElementById("btnCols"); if(!b) return;
    var mx=maxCols(), n=eff();
    var t=L(LAB)+" "+n; if(b.textContent!==t) b.textContent=t; b.title=L(TIT);
    b.classList.toggle("on", n>1);
    var hide=mx<2; if(b.style.display!==(hide?"none":"")) b.style.display=hide?"none":"";
  }
  var lastMx=maxCols(), rt=null;
  window.addEventListener("resize",function(){ clearTimeout(rt); rt=setTimeout(function(){ var mx=maxCols(); sync(); if(mx!==lastMx){ lastMx=mx; relayout(); } },150); });
  /* layoutLyrics laeuft auch direkt aus einem ResizeObserver (alte Referenz) -> Spaltengroesse danach wieder setzen */
  var mo=null, busy=false;
  function watch(){ var box=document.getElementById("lyrics"); if(!box||box.__v344mo) return; box.__v344mo=1;
    mo=new MutationObserver(function(){ if(busy) return; var n=eff(); if(n<2) return;
      if(box.style.getPropertyValue("--sc")!==box.__v344sc || !box.classList.contains(n===2?"bppC2":"bppC3")){ busy=true; try{ apply(); }catch(e){} busy=false; } });
    mo.observe(box,{attributes:true,attributeFilter:["style","class"]}); }
  hook(); btn(); watch();
  setInterval(function(){ hook(); btn(); watch(); var box=document.getElementById("lyrics"); if(box){ var n=eff(); if(box.classList.contains("bppC2")!==(n===2)||box.classList.contains("bppC3")!==(n===3)) relayout(); } },700);
  window.bppCols=function(v){ localStorage.setItem(KEY,String(v)); sync(); relayout(); };
})();
