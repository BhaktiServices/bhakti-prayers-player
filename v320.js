/* [Grok-Bot] V3.20: Hilfe-Blase fest links neben der Sprachwahl: sitzt INNERHALB des Sprach-Containers (.lang) vor dem Select,
   daher kein Konflikt mit v307l.js (verschiebt nur den Container). Sprachwahl fest am rechten Rand, Pfeil der Blase zeigt nach links zum Titel, keine Neuberechnung von Positionen. */
window.BPP_BUILD="3.20"; window.BPP_SHOW="3.20";
(function(){
  var st=document.createElement("style");
  st.textContent="h1 .lang.l307{display:inline-flex!important;align-items:center;gap:8px;flex-wrap:nowrap;white-space:nowrap}"+
    "h1 .lang #bppHelpTip{position:static!important;display:inline-block!important;width:auto!important;margin:0!important;transition:none!important;right:auto!important;top:auto!important}"+
    "header{position:relative}h1 .lang.l307{position:absolute!important;right:10px!important;top:50%!important;transform:translateY(-50%);margin:0!important}"+"h1 .lang #bppHelpTip{position:relative!important}h1 .lang #bppHelpTip:before{display:block!important;content:\"\"!important;position:absolute;left:-6px!important;right:auto!important;top:50%!important;margin:-4px 0 0 0!important;border:4px solid transparent!important;border-right:6px solid #b8955088!important;border-left:0!important}"+
    "@media(max-width:600px){h1 .lang.l307{top:4px!important;right:6px!important;transform:none}h1 .lang #bppHelpTip{font-size:.66rem!important;padding:1px 7px!important}}";
  document.head.appendChild(st);
  function fix(){
    var b=document.getElementById("bppHelpTip"), s=document.getElementById("langSel"), box=s&&s.closest(".lang"); if(!b||!box) return;
    if(b.parentNode!==box||b.nextElementSibling!==s){ box.insertBefore(b,s); }
    b.style.right="";
  }
  /* V3.21: Blase sitzt jetzt links vom Titel (v321.js); hier nicht mehr verschieben */
})();
