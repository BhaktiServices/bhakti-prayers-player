/* [Grok-Bot] V4.43: (1) final-prayers: Standardansicht nahm veraltete Akkord-Positionen (v365.js POS, Zeilennummern von vor V3.90)
   -> "om jaya jagadisa hare" zeigte C F G statt C G; jetzt per Zeilentext wie in der Grossansicht (Aenderung in v365.js).
   (2) Ueberschrift "Statistik" ueber Aufrufe/Hoerzeit/Orte (8 Sprachen), als ::before von #bpp-stats -> gleiche Farbe/Hintergrund wie die Box in jedem Stil.
   (3) Knopf "A–Z" unter der Orte-Liste: Orte alphabetisch ein/aus (aus = bisher: nach Anzahl Geraete, dann alphabetisch).
       Beschriftung = Aktion des naechsten Drucks, gold = alphabetisch aktiv, gemerkt in localStorage "bpp-abc443".
   (4) Schalter "Quellen zeigen" (btnDet, Herkunft/Quellen) aus der Knopfzeile unter den Lyrics in die Fusszeile (#bppFoot426, neben
       "Versions-Historie"), Quellenbereich (#bppSrcInfo) direkt darunter. Funktion unveraendert, Standard aus. */
/* [Grok-Bot] V4.45: Knopf (3) hat jetzt drei Zustaende: unsortiert (wie geliefert) -> A-Z -> nach Haeufigkeit -> unsortiert.
   Beschriftung = Sortierung, zu der der naechste Druck wechselt; gold = eine Sortierung ist aktiv (unsortiert = nicht gold).
   Gemerkt in localStorage "bpp-ortsort445" (none/abc/count), Standard: count (bisheriges Verhalten); alter Wert "bpp-abc443"=1 wird zu abc. */
window.BPP_BUILD="4.43"; window.BPP_SHOW="4.43";
(function(){
  if(window.bppV443) return; window.bppV443=1;
  var K="bpp-abc443";
  var HD={de:"Statistik",en:"Statistics",fr:"Statistiques",es:"Estadísticas",ru:"Статистика",hi:"आँकड़े",pt:"Estatísticas",cz:"Statistiky"};
  /* [Grok-Bot] V4.45: je Sprache [Beschriftung unsortiert, A-Z, Haeufigkeit] und [Tooltip ...] */
  var MD=["none","abc","count"], K5="bpp-ortsort445";
  var AB={de:[["Unsortiert","A–Z","Häufigkeit"],["Orte unsortiert zeigen (Reihenfolge wie geliefert)","Orte alphabetisch sortieren","Orte nach Häufigkeit sortieren"]],
    en:[["Unsorted","A–Z","By count"],["Show places unsorted (order as received)","Sort places alphabetically","Sort places by frequency"]],
    fr:[["Non trié","A–Z","Par fréquence"],["Afficher les lieux sans tri (ordre de réception)","Trier les lieux par ordre alphabétique","Trier les lieux par fréquence"]],
    es:[["Sin ordenar","A–Z","Por frecuencia"],["Mostrar los lugares sin ordenar (orden de llegada)","Ordenar los lugares alfabéticamente","Ordenar los lugares por frecuencia"]],
    ru:[["Без сортировки","A–Z","По частоте"],["Показать места без сортировки (в порядке поступления)","Сортировать места по алфавиту","Сортировать места по частоте"]],
    hi:[["बिना क्रम","A–Z","आवृत्ति अनुसार"],["स्थान बिना क्रम के दिखाएँ (जैसे मिले)","स्थान वर्णानुक्रम में लगाएँ","स्थान आवृत्ति के अनुसार लगाएँ"]],
    pt:[["Sem ordem","A–Z","Por frequência"],["Mostrar os locais sem ordenação (ordem de chegada)","Ordenar os locais por ordem alfabética","Ordenar os locais por frequência"]],
    cz:[["Neřazeno","A–Z","Podle četnosti"],["Zobrazit místa neřazená (v pořadí příchodu)","Seřadit místa abecedně","Seřadit místa podle četnosti"]]};
  function mode(){ var m=null; try{ m=localStorage.getItem(K5); if(MD.indexOf(m)<0) m=(localStorage.getItem(K)==="1")?"abc":"count"; }catch(e){ m="count"; } return m; }
  window.bppOrtSort445=mode;
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
      b.addEventListener("click",function(e){ e.stopPropagation(); var nx=MD[(MD.indexOf(mode())+1)%3]; try{ localStorage.setItem(K5,nx); localStorage.setItem(K,nx==="abc"?"1":"0"); }catch(x){} paint(); try{ window.bppPaint366&&bppPaint366(); }catch(x){} }); }
    if(!window.bppFootOrder463){ if(b.parentNode!==r) r.appendChild(b); } /* [Grok-Bot] V4.63: Abc/Det-Platz in v463 */
    var m=mode(), nx=(MD.indexOf(m)+1)%3, t=AB[l]||AB.en, on=m!=="none"; /* [Grok-Bot] V4.45 */
    if(b.textContent!==t[0][nx]) b.textContent=t[0][nx];
    var tt=t[1][nx]+" (U)"; /* V4.45: Taste U (v445.js); einheitlicher Tastenhinweis, sonst haelt v359 einen Titel mit "(A–Z)" fest */ if(b.title!==tt) b.title=tt; b.classList.toggle("on",on); b.setAttribute("aria-pressed",on?"true":"false"); b.setAttribute("data-mode445",m);
    var d=document.getElementById("btnDet"), inf=document.getElementById("bppSrcInfo");
    if(!window.bppFootOrder463){
      if(d&&d.parentNode!==r){ var h=document.getElementById("bppHist421"); if(h&&h.parentNode===r) r.insertBefore(d,h.nextSibling); else r.appendChild(d); }
      if(inf&&inf.parentNode!==r) r.appendChild(inf);
    }
  }
  setInterval(paint,500); window.addEventListener("load",paint);
})();
