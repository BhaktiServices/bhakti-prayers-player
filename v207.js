/* [Grok-Bot] V2.07: Spultasten ueberall in der Reihenfolge -30 -10 +10 +30 (Leiste war schon so; Grossbild-Menue jetzt -30 -10 Play +10 +30).
   Strophe zurueck/vor (Tasten "V"/"N", Tastatur V/N) mit eigenen einfarbigen Symbolen (Textzeilen mit Pfeil), klar unterscheidbar von
   voriges/naechstes Gebet (Strich mit Dreieck). Im Grossbild stehen die Strophentasten in der unteren Zeile neben Akkorde/Uebersetzung. */
window.BPP_BUILD="2.07";
(function(){
  if(window.bppV207) return; window.bppV207=1;
  var SV='<svg class="bppSt" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
  var IC={prev:SV+'<path d="M7 6.5 3 12l4 5.5"/><path d="M11 7h10M11 12h10M11 17h7"/></svg>',
          next:SV+'<path d="M17 6.5 21 12l-4 5.5"/><path d="M3 7h10M3 12h10M3 17h7"/></svg>'};
  window.bppStanzaIcons=IC;
  var TX={de:["Strophe zur\u00fcck (Taste V)","Strophe vor (Taste N)","Strophe"],en:["Previous stanza (key V)","Next stanza (key N)","Stanza"],
    fr:["Strophe pr\u00e9c\u00e9dente (touche V)","Strophe suivante (touche N)","Strophe"],es:["Estrofa anterior (tecla V)","Estrofa siguiente (tecla N)","Estrofa"],
    ru:["\u041f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0430\u044f \u0441\u0442\u0440\u043e\u0444\u0430 (V)","\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0430\u044f \u0441\u0442\u0440\u043e\u0444\u0430 (N)","\u0421\u0442\u0440\u043e\u0444\u0430"],
    hi:["\u092a\u093f\u091b\u0932\u093e \u092a\u0926 (V)","\u0905\u0917\u0932\u093e \u092a\u0926 (N)","\u092a\u0926"],pt:["Estrofe anterior (tecla V)","Próxima estrofe (tecla N)","Estrofe"]};
  function tx(){ return TX[(typeof lang!=="undefined" && TX[lang])?lang:"en"]; }
  var st=document.createElement("style");
  st.textContent=".bppSt{display:inline-block;width:1.45em;height:1.45em;vertical-align:-.35em}"+
    "#btnPrev.bppStB,#btnNext.bppStB{display:inline-flex;align-items:center;gap:2px;padding-left:7px;padding-right:7px}"+
    "#btnPrev.bppStB small,#btnNext.bppStB small{font-size:.68em;opacity:.8;letter-spacing:.02em}"+
    "#bppFsBar button.bppFsSt{font-size:19px;min-width:52px}#bppFsBar button.bppFsJ{font-size:15px;min-width:50px}"+
    "#bppFsB30,#bppFsF30,#bppFsPrev,#bppFsNext{display:none!important}"+
    "@media(max-width:400px){#bppFsBar button.bppFsJ{min-width:44px;padding:0 5px;font-size:14px}#bppFsBar button.bppFsSt{min-width:46px;padding:0 6px}}";
  document.head.appendChild(st);
  /* Leiste: Strophentasten mit Symbol; Reihenfolge -30 -10 +10 +30 sicherstellen */
  function main(){
    var L=tx();
    [["btnPrev",0,"prev"],["btnNext",1,"next"]].forEach(function(x){ var b=document.getElementById(x[0]); if(!b) return;
      var h=x[1]?IC.next:IC.prev;
      if(b.getAttribute("data-st")!==h || !b.querySelector("svg.bppSt")){ b.setAttribute("data-st", h); b.innerHTML=h; b.classList.add("bppStB"); }
      if(b.getAttribute("aria-label")!==L[x[1]]) b.setAttribute("aria-label", L[x[1]]);
      if(!b.title) b.title=L[x[1]]; });
    var ids=["btnBack30","btnBack10","btnFwd10","btnFwd30"], bs=ids.map(function(id){ return document.getElementById(id); });
    if(bs.every(Boolean)){ var p=bs[0].parentNode; for(var k=1;k<4;k++){ if(bs[k].previousElementSibling!==bs[k-1]) p.insertBefore(bs[k], bs[k-1].nextSibling); } }
  }
  /* Grossbild: -30 -10 Play +10 +30 in der mittleren Zeile, Strophe zurueck/vor unten */
  function skip(d){ try{ if(typeof window.bppSkip==="function") window.bppSkip(d); }catch(e){} }
  function fs(){
    var bar=document.getElementById("bppFsBar"), play=document.getElementById("bppFsPlay"), ch=document.getElementById("bppFsCh"); if(!bar || !play || !ch) return;
    var row=play.parentNode, L=tx();
    function B(id, html, fn, cls){ var b=document.getElementById(id); if(b) return b; b=document.createElement("button"); b.type="button"; b.id=id; b.className=cls; b.innerHTML=html;
      b.onclick=function(e){ e.stopPropagation(); fn(); bar.classList.remove("hid"); }; return b; }
    var m10=null, p10=null; Array.prototype.forEach.call(row.children, function(b){ var t=b.textContent.trim(); if(t==="\u221210") m10=b; if(t==="+10") p10=b; });
    var b30=B("bppFsJ30b","\u221230",function(){ skip(-30); },"bppFsJ"), f30=B("bppFsJ30f","+30",function(){ skip(30); },"bppFsJ");
    if(m10){ m10.classList.add("bppFsJ"); if(b30.nextElementSibling!==m10) row.insertBefore(b30, m10); }
    if(p10){ p10.classList.add("bppFsJ"); if(p10.nextElementSibling!==f30) row.insertBefore(f30, p10.nextSibling); }
    var op=document.getElementById("bppFsPrev"), on=document.getElementById("bppFsNext");
    var sp=B("bppFsStP", IC.prev, function(){ if(op) op.click(); }, "bppFsSt"), sn=B("bppFsStN", IC.next, function(){ if(on) on.click(); }, "bppFsSt");
    var tools=ch.parentNode;
    if(sp.parentNode!==tools || sp.nextElementSibling!==sn){ tools.insertBefore(sp, tools.firstChild); tools.insertBefore(sn, sp.nextSibling); }
    if(sp.title!==L[0]){ sp.title=L[0]; sp.setAttribute("aria-label", L[0]); sn.title=L[1]; sn.setAttribute("aria-label", L[1]); }
  }
  function tick(){ try{ main(); }catch(e){} try{ fs(); }catch(e){} }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", tick); else tick();
  setInterval(tick, 500);
  function showV(){ var v=document.querySelector("h1 .ver"); if(v) v.textContent="V2.07"; document.title="Bhakti Prayers Player V2.07"; }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", showV); else showV();
  setTimeout(showV, 900); setTimeout(showV, 1500); setTimeout(showV, 2500);
})();
