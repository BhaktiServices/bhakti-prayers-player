/* [Grok-Bot] V4.45: Statistik, Orte-Liste: Knopf mit drei Zustaenden - unsortiert (wie geliefert) -> A-Z -> nach Haeufigkeit -> unsortiert.
   Umsetzung in v443.js (Knopf #bppAbc443, localStorage "bpp-ortsort445") und v366.js (Sortierung der Liste). Standard: nach Haeufigkeit.
   Tastenkuerzel U ("umsortieren"): naechster Zustand. U war frei (belegt: Leertaste P J L , . N V R M G T A S + B # X 8 9 0 Q O I W Y H ? K, Pfeile, Bild, Esc);
   O (Orte) und S (Sortieren) sind belegt, die Folge S->T haette sofort Spalten umgeschaltet. Nicht in Eingabefeldern, nicht mit Strg/Alt/Cmd/Umschalt.
   Hilfe: Eintrag im Abschnitt "Tastenkuerzel" (p.kb352). */
window.BPP_BUILD="4.45"; window.BPP_SHOW="4.45";
(function(){
  if(window.bppV445) return; window.bppV445=1;
  function typing(t){ t=t||document.activeElement; var n=t&&t.tagName; return n==="INPUT"||n==="TEXTAREA"||n==="SELECT"||(t&&t.isContentEditable); }
  document.addEventListener("keydown",function(e){
    if(e.ctrlKey||e.altKey||e.metaKey||e.shiftKey||typing(e.target)) return;
    if(e.key!=="u"&&e.key!=="U") return; var b=document.getElementById("bppAbc443"); if(!b) return;
    e.preventDefault(); e.stopPropagation(); if(e.repeat) return; b.click(); },true);
  var HK={de:"U Orte-Liste: unsortiert / A–Z / Häufigkeit",en:"U places list: unsorted / A–Z / by count",fr:"U liste des lieux : non trié / A–Z / par fréquence",
    es:"U lista de lugares: sin ordenar / A–Z / por frecuencia",ru:"U список мест: без сортировки / A–Z / по частоте",hi:"U स्थान सूची: बिना क्रम / A–Z / आवृत्ति अनुसार",
    pt:"U lista de locais: sem ordem / A–Z / por frequência",cz:"U seznam míst: neřazeno / A–Z / podle četnosti"};
  function help(){ var p=document.querySelector("#bppHelp p.kb352"); if(!p) return; var l=(typeof lang!=="undefined"&&lang)||"de", t=HK[l]||HK.en;
    var s=p.querySelector(".k445"); if(s&&s.textContent===t) return; if(s){ s.textContent=t; return; }
    s=document.createElement("span"); s.className="k445"; s.textContent=t;
    var w=document.createTreeWalker(p,NodeFilter.SHOW_TEXT), n, hit=null; while((n=w.nextNode())){ var k=n.nodeValue.indexOf(" · H / ?"); if(k>=0){ hit=[n,k]; break; } }
    if(hit){ var r=hit[0].splitText(hit[1]+3); r.parentNode.insertBefore(s,r); r.parentNode.insertBefore(document.createTextNode(" · "),r); }
    else { p.appendChild(document.createTextNode(" · ")); p.appendChild(s); } }
  setInterval(function(){ try{ help(); }catch(e){} },500);
})();
