/* [Grok-Bot] V4.36: Hilfe ("So funktioniert der Bhakti Prayers Player") immer einspaltig.
   Ursache: V4.35 haengte seine Hilfe-Absaetze (Wiederholen, Wochentage) direkt an #bppHelp (display:flex, Zeilenrichtung) statt in den Textblock .in –
   dadurch standen Textblock und die zwei Absaetze als drei Spalten nebeneinander. Behoben in v435.js; hier zusaetzlich eine Absicherung:
   verirrte direkte Kinder von #bppHelp werden in .in verschoben, .in ist fest einspaltig (unabhaengig von cols=1/2/3). Scrollen bleibt unveraendert. */
window.BPP_BUILD="4.36"; window.BPP_SHOW="4.36";
(function(){
  if(window.bppV436) return; window.bppV436=1;
  var st=document.createElement("style");
  st.textContent="#bppHelp .in{column-count:1!important;columns:auto!important;display:block!important;flex:0 1 680px}";
  document.head.appendChild(st);
  function fix(){ var d=document.getElementById("bppHelp"); if(!d) return; var i=d.querySelector(".in"); if(!i) return;
    [].slice.call(d.children).forEach(function(c){ if(c!==i&&!c.classList.contains("x")){ var j=i.querySelector("p.jg"); if(j) i.insertBefore(c,j); else i.appendChild(c); } }); }
  new MutationObserver(fix).observe(document.body,{childList:true,subtree:true});
})();
