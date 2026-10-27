/* [Grok-Bot] V4.43: (1) final-prayers: Standardansicht nahm veraltete Akkord-Positionen (v365.js POS, Zeilennummern von vor V3.90)
   -> "om jaya jagadisa hare" zeigte C F G statt C G; jetzt per Zeilentext wie in der Grossansicht (Aenderung in v365.js).
   (2) Ueberschrift "Statistik" ueber Aufrufe/Hoerzeit/Orte (8 Sprachen), als ::before von #bpp-stats -> gleiche Farbe/Hintergrund wie die Box in jedem Stil.
   (3) Knopf "A–Z" unter der Orte-Liste: Orte alphabetisch ein/aus (aus = bisher: nach Anzahl Geraete, dann alphabetisch).
       Beschriftung = Aktion des naechsten Drucks, gold = alphabetisch aktiv, gemerkt in localStorage "bpp-abc443".
   (4) Schalter "Quellen zeigen" (btnDet, Herkunft/Quellen) aus der Knopfzeile unter den Lyrics in die Fusszeile (#bppFoot426, neben
       "Versions-Historie"), Quellenbereich (#bppSrcInfo) direkt darunter. Funktion unveraendert, Standard aus. */
window.BPP_BUILD="4.43"; window.BPP_SHOW="4.43";
(function(){
  if(window.bppV443) return; window.bppV443=1;
  var K="bpp-abc443";
  var HD={de:"Statistik",en:"Statistics",fr:"Statistiques",es:"Estadísticas",ru:"Статистика",hi:"आँकड़े",pt:"Estatísticas",cz:"Statistiky"};
  var AB={de:["A–Z ein","A–Z aus","Orte alphabetisch sortieren","Orte wieder nach Anzahl sortieren"],
    en:["A–Z on","A–Z off","Sort places alphabetically","Sort places by count again"],
    fr:["A–Z : activer","A–Z : désactiver","Trier les lieux par ordre alphabétique","Trier à nouveau les lieux par nombre"],
    es:["A–Z: activar","A–Z: desactivar","Ordenar los lugares alfabéticamente","Ordenar de nuevo los lugares por cantidad"],
    ru:["A–Z: вкл.","A–Z: выкл.","Сортировать места по алфавиту","Снова сортировать места по количеству"],
    hi:["A–Z चालू","A–Z बंद","स्थान वर्णानुक्रम में लगाएँ","स्थान फिर से संख्या के अनुसार लगाएँ"],
    pt:["A–Z: ativar","A–Z: desativar","Ordenar os locais por ordem alfabética","Ordenar de novo os locais por número"],
    cz:["A–Z zapnout","A–Z vypnout","Seřadit místa abecedně","Seřadit místa opět podle počtu"]};
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"de"; return HD[l]?l:"en"; }
  function abc(){ try{ return localStorage.getItem(K)==="1"; }catch(e){ return false; } }
  var st=document.createElement("style");
  st.textContent="#bpp-stats::before{content:attr(data-h443);display:block;text-align:left;font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;opacity:.72;margin:0 0 3px}"+
    "#bppAbc443,#bppFoot426 #btnDet{font-size:.72rem!important;font-weight:inherit!important;line-height:1.4;cursor:pointer}"+
    "#bppAbc443.on,#bppFoot426 #btnDet[aria-pressed=true]{background:#e0b45a!important;border-color:#e0b45a!important;color:#222!important}"+
    "#bppFoot426 #btnDet{display:inline-flex!important;align-items:center;order:2;margin:2px 0 0 0!important}#bppAbc443{order:3;margin:2px 12px 0 auto!important}"+
    "#bppFoot426 #bppSrcInfo{order:9;flex:1 1 100%;margin:0 12px}";
  document.head.appendChild(st);
  function paint(){
    var s=document.getElementById("bpp-stats"), l=lg();
    if(s&&s.getAttribute("data-h443")!==HD[l]) s.setAttribute("data-h443",HD[l]);
    var r=document.getElementById("bppFoot426"); if(!r) return;
    var b=document.getElementById("bppAbc443");
    if(!b){ b=document.createElement("button"); b.type="button"; b.id="bppAbc443";
      b.addEventListener("click",function(e){ e.stopPropagation(); try{ localStorage.setItem(K,abc()?"0":"1"); }catch(x){} paint(); try{ window.bppPaint366&&bppPaint366(); }catch(x){} }); }
    if(b.parentNode!==r) r.appendChild(b);
    var on=abc(), t=AB[l]||AB.en;
    if(b.textContent!==t[on?1:0]) b.textContent=t[on?1:0];
    b.title=t[on?3:2]; b.classList.toggle("on",on); b.setAttribute("aria-pressed",on?"true":"false");
    var d=document.getElementById("btnDet"), inf=document.getElementById("bppSrcInfo");
    if(d&&d.parentNode!==r){ var h=document.getElementById("bppHist421"); if(h&&h.parentNode===r) r.insertBefore(d,h.nextSibling); else r.appendChild(d); }
    if(inf&&inf.parentNode!==r) r.appendChild(inf);
  }
  setInterval(paint,500); window.addEventListener("load",paint);
})();
