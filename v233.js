/* [Grok-Bot] V2.33: Giridhārī Āratī – Strophen-Nummerierung durchgehend (wie Prathana SVD S. 28).
   Alte a/b/c-Suffixe entfernt, nr jetzt fortlaufend 1–13, damit Anzeige und Gruppierung linear sind.
   Bestehende Texte und Übersetzungen bleiben unverändert. */
window.BPP_BUILD="3.06"; window.BPP_SHOW="3.06";
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
    if(JSON.stringify(P.zeilen.map(function(z){return z.nr;})) !== JSON.stringify(newZeilen.map(function(z){return z.nr;}))){
      P.zeilen = newZeilen;
    }
    // Clear any old estimated marks so they rebuild if needed
    P._bppEstMarks=0; P._bppEstSrc="";
  }
  apply();
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", apply);
  window.addEventListener("load", apply);
  setInterval(apply, 1000);
  function ver(){
    window.BPP_SHOW="3.06"; window.BPP_BUILD="3.06";
    var v=document.querySelector("h1 .ver"); if(v && v.textContent!=="V3.06") v.textContent="V3.06";
    if(document.title!=="Bhakti Prayers Player V3.06") document.title="Bhakti Prayers Player V3.06";
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", ver); else ver();
  setInterval(ver, 1500);
})();
