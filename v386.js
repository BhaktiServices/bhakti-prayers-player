/* [Grok-Bot] V3.86: Akkorde-Knopf - hat das aktuelle Gebet keine Akkorde (bzw. im Modus "Akkorde in Zeile" keine Zeilenakkorde),
   erscheint ein kurzer Hinweis in der Oberflaechensprache und der Knopf springt sofort auf "aus". Standard- und Grossansicht, auch beim Gebetswechsel. */
window.BPP_BUILD="3.86"; window.BPP_SHOW="3.86";
(function(){
  if(window.bppV386) return; window.bppV386=1;
  var M={
   de:["Für dieses Gebet sind noch keine Akkorde hinterlegt.","Für dieses Gebet sind noch keine Akkorde je Zeile hinterlegt."],
   en:["No chords are available for this prayer yet.","No chords per line are available for this prayer yet."],
   fr:["Aucun accord n’est encore disponible pour cette prière.","Aucun accord par ligne n’est encore disponible pour cette prière."],
   es:["Todavía no hay acordes para esta oración.","Todavía no hay acordes por línea para esta oración."],
   ru:["Для этой молитвы аккорды пока не добавлены.","Для этой молитвы аккорды по строкам пока не добавлены."],
   hi:["इस प्रार्थना के लिए अभी कॉर्ड उपलब्ध नहीं हैं।","इस प्रार्थना के लिए अभी प्रति पंक्ति कॉर्ड उपलब्ध नहीं हैं।"],
   pt:["Ainda não há acordes para esta oração.","Ainda não há acordes por linha para esta oração."]};
  var st=document.createElement("style");
  /* dunkler Grund, weisse Schrift: Kontrast ca. 17:1 in allen Stilen */
  st.textContent="#bppNoCh386{position:fixed;left:50%;bottom:calc(84px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:2147483000;max-width:min(92vw,520px);"+
    "background:#16130e;color:#fff;border:1px solid #c9a24a;border-radius:10px;padding:10px 14px;font:600 15px/1.35 'Nunito Sans','Figtree',system-ui,sans-serif;text-align:center;"+
    "box-shadow:0 4px 18px rgba(0,0,0,.45);opacity:0;transition:opacity .2s;pointer-events:none}#bppNoCh386.on{opacity:1}";
  document.head.appendChild(st);
  var tm=0;
  function toast(k){
    var L=(typeof lang!=="undefined"&&M[lang])?lang:"en", t=M[L][k], h=document.getElementById("bppNoCh386");
    if(!h){ h=document.createElement("div"); h.id="bppNoCh386"; h.setAttribute("role","status"); h.setAttribute("aria-live","polite"); document.body.appendChild(h); }
    h.textContent=t; h.classList.add("on"); clearTimeout(tm); tm=setTimeout(function(){ h.classList.remove("on"); },3500);
  }
  function cur(){ return (typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null; }
  function hasCh(P){ return !!P&&P.zeilen.some(function(z){ return (z.ch&&String(z.ch).trim())||(z.lineCh&&z.lineCh.some(Boolean)); }); }
  function hasLine(){ return [].some.call(document.querySelectorAll("#lyrics .lch"),function(e){ return e.textContent.trim(); }); }
  function off(k){
    chMode="aus"; applyCh(); try{ localStorage.setItem("bpp-chmode","aus"); }catch(e){}
    try{ paintLyrics(); }catch(e){} try{ applyUI(); }catch(e){} try{ persistNow(); }catch(e){}
    ["btnCh","bppFsCh"].forEach(function(id){ var b=document.getElementById(id); if(b) b.classList.remove("on","act358","s358"); });
    toast(k);
  }
  function check(){
    if(typeof chMode==="undefined"||chMode==="aus") return; var P=cur(); if(!P) return;
    if(!hasCh(P)) return off(0);
    if(chMode==="zeile"&&document.getElementById("lyrics")&&!hasLine()) return off(1);
  }
  window.bppChCheck386=check;
  if(typeof toggleCh==="function"){ var o=toggleCh; window.toggleCh=toggleCh=function(){ var r=o.apply(this,arguments); check(); return r; }; }
  document.addEventListener("click",function(e){ if(e.target.closest&&e.target.closest("#btnCh,#bppFsCh")) setTimeout(check,0); },true);
  setInterval(check,250);
})();
/* [Grok-Bot] V3.86: Versionsnummer klein (ca. 0.45em) direkt hinter dem Titel in derselben Zeile. Titel bleibt zentriert (Nummer absolut daneben).
   Die urspruengliche .ver bleibt unsichtbar als Platzhalter-Zeile, damit Atma Bhog (v382.js) weiter rechtsbuendig darunter steht. */
(function(){
  if(window.bppV386v) return; window.bppV386v=1;
  var st=document.createElement("style");
  st.textContent="html body header h1 .ver{visibility:hidden!important}"+
    "html body header h1 #bppVer386{position:absolute;font-size:.45em;line-height:1;font-weight:700;letter-spacing:.03em;white-space:nowrap;pointer-events:none;z-index:2;"+
    "font-family:'Nunito Sans','Figtree',system-ui,sans-serif!important;color:#C4CADB}"+
    "html.th-morgen body header h1 #bppVer386{color:#1E2340}html.th-abend body header h1 #bppVer386{color:#F3E3C8}";
  document.head.appendChild(st);
  function place(){
    var h=document.querySelector("header h1"), v=h&&h.querySelector(".ver"); if(!v) return;
    var c=document.getElementById("bppVer386"); if(!c){ c=document.createElement("span"); c.id="bppVer386"; c.setAttribute("aria-hidden","true"); h.appendChild(c); }
    if(c.textContent!==v.textContent) c.textContent=v.textContent;
    var last=null; [].forEach.call(h.childNodes,function(n){ if(n.nodeType===3&&/Bhakti/i.test(n.nodeValue)){ var g=document.createRange(); g.selectNodeContents(n); var rs=g.getClientRects(); if(rs.length) last=rs[rs.length-1]; } });
    if(!last) return; var hr=h.getBoundingClientRect();
    var L=Math.round(last.right-hr.left+5), T=Math.round(last.bottom-hr.top-c.offsetHeight-last.height*0.2);
    if(L+c.offsetWidth>hr.width) L=Math.max(0,Math.round(hr.width-c.offsetWidth));
    if(c.style.left!==L+"px") c.style.left=L+"px"; if(c.style.top!==T+"px") c.style.top=T+"px";
  }
  addEventListener("resize",function(){ setTimeout(place,60); }); setInterval(place,400);
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(place);
})();
/* [Grok-Bot] V3.86: Titel des gewaehlten Gebets ca. 22 % groesser (Standard: 1.35rem -> 1.65rem, Listenkopf 1.15rem -> 1.4rem; Grossansicht 13px -> 16px), sauber umbrechend. */
(function(){ var st=document.createElement("style");
  st.textContent="html body #lyrics .songtitle{font-size:1.65rem!important;line-height:1.2!important;text-wrap:balance;overflow-wrap:anywhere}"+
    "html body #lyrTitle{font-size:1.4rem!important;text-wrap:balance;overflow-wrap:anywhere}"+
    "html body #bppFsTop #bppFsT1{font-size:16px!important;line-height:1.2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}";
  document.head.appendChild(st); })();
