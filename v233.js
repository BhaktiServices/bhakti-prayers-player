/* [Grok-Bot] V2.33: Giridhārī Āratī – Strophen-Nummerierung durchgehend (wie Prathana SVD S. 28).
   Alte a/b/c-Suffixe entfernt, nr jetzt fortlaufend 1–13, damit Anzeige und Gruppierung linear sind.
   Bestehende Texte und Übersetzungen bleiben unverändert. */
window.BPP_BUILD="3.10"; window.BPP_SHOW="3.10";
(function(){
  if(window.bppV233) return; window.bppV233=1;
  function apply(){
    if(typeof PRAYERS==="undefined") return;
    var P=PRAYERS.find(function(p){ return p.id==="giridhari-arati"; });
    if(!P || !P.zeilen) return;
    // Renumber to continuous
    var newZeilen = P.zeilen.map(function(z, idx){
      var n = String(idx+1);
      var copy = {};
      for(var k in z) if(z.hasOwnProperty(k)) copy[k]=z[k];
      copy.nr = n;
      return copy;
    });
    /* [Grok-Bot] V3.10: Umnummerieren je Zeile abgeschaltet (zerlegte jede Zeile in eine eigene Strophe); Gliederung jetzt in v308.js */
    if(false) P.zeilen = newZeilen;
    // Clear any old estimated marks so they rebuild if needed
    P._bppEstMarks=0; P._bppEstSrc="";
  }
  apply();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", apply);
  window.addEventListener("load", apply);
  setInterval(apply, 1000);
  function ver(){
    window.BPP_SHOW="3.10"; window.BPP_BUILD="3.10";
    var v=document.querySelector("h1 .ver"); if(v && v.textContent!=="V3.10") v.textContent="V3.10";
    if(document.title!=="Bhakti Prayers Player V3.10") document.title="Bhakti Prayers Player V3.10";
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", ver); else ver();
  setInterval(ver, 1500);
})();
