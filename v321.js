/* [Grok-Bot] V3.21: Kopfzeile ohne Ueberlappung. h1 als Flex-Zeile: [Hilfe-Blase (Pfeil nach rechts zum Titel)] Titel Version [Sprachwahl ganz rechts].
   Linke und rechte Spalte gleich breit (flex:1), so bleibt der Titel mittig. Handy: oben Blase links / Sprachwahl rechts, darunter Titel + Version.
   Keine absolute Positionierung, kein Nachrechnen; Blase wird einmal in die linke Spalte gesetzt (v320 verschiebt nicht mehr). */
window.BPP_BUILD="3.21"; window.BPP_SHOW="3.21";
(function(){
  var st=document.createElement("style");
  st.textContent="header h1{display:flex!important;flex-wrap:wrap;align-items:center;justify-content:center;column-gap:10px;row-gap:4px}"+
    "#bppHelpCol{flex:1 1 0;min-width:max-content;display:flex;justify-content:flex-end;order:-1}#bppBr{display:none}"+
    "header h1 .ver{order:0;flex:0 0 auto;white-space:nowrap}"+
    "header h1 .lang.l307{position:static!important;transform:none!important;top:auto!important;right:auto!important;order:1;flex:1 1 0;min-width:max-content;justify-content:flex-end;margin:0!important;gap:0}"+
    "#bppHelpCol #bppHelpTip{position:relative!important;display:inline-block!important;width:auto!important;margin:0 8px 0 0!important;right:auto!important;top:auto!important}"+
    "#bppHelpCol #bppHelpTip:before{display:block!important;content:''!important;position:absolute;left:auto!important;right:-6px!important;top:50%!important;margin:-4px 0 0 0!important;border:4px solid transparent!important;border-left:6px solid #b8955088!important;border-right:0!important}"+
    "@media(max-width:760px){#bppHelpCol{order:-3;flex:1 0 auto;justify-content:flex-start}header h1 .lang.l307{order:-2;flex:0 0 auto}#bppBr{display:block;order:-1;flex:0 0 100%;height:0}"+
    "#bppHelpCol #bppHelpTip{font-size:.66rem!important;padding:1px 7px!important}#bppHelpCol #bppHelpTip:before{transform:rotate(90deg);right:auto!important;left:14px!important;top:auto!important;bottom:-7px;margin:0!important}}";
  document.head.appendChild(st);
  return; /* [Grok.com] alte Kopfzeile aus */ var n=0,iv=setInterval(function(){
    var h=document.querySelector("header h1"), b=document.getElementById("bppHelpTip"); if(!h||!b){ if(++n>100) clearInterval(iv); return; }
    var c=document.getElementById("bppHelpCol"); if(!c){ c=document.createElement("span"); c.id="bppHelpCol"; h.appendChild(c); var br=document.createElement("span"); br.id="bppBr"; h.appendChild(br); }
    if(b.parentNode!==c) c.appendChild(b);
    b.style.right="";
  },300);
})();
