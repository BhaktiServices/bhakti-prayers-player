/* [Grok-Bot] V3.95: Hilfeabsatz "Offline / Prayers runterladen" als 2. Absatz direkt nach "Gebet waehlen" (7 Sprachen, Text unveraendert) */
// build via v396
(function(){
  var O=["Offline:","Hors ligne :","Sin conexión:","Офлайн:","ऑफ़लाइन:"];
  var C=["Choose a prayer","Gebet wählen","Choisir une prière","Elegir una oración","Выбор молитвы","प्रार्थना चुनें","Escolha uma oração"];
  function f(d,K){ var ps=d.querySelectorAll("p,li,div"); for(var k=0;k<ps.length;k++){ var b=ps[k].firstElementChild; if(b&&b.tagName==="B"&&K.indexOf(b.textContent.trim())>=0&&ps[k].children.length<=3) return ps[k]; } return null; }
  setInterval(function(){ var d=document.getElementById("bppHelp"); if(!d) return;
    var o=f(d,O), c=f(d,C); if(!o||!c||o.parentNode!==c.parentNode) return;
    if(c.nextElementSibling!==o) c.parentNode.insertBefore(o,c.nextSibling); },300);
})();
