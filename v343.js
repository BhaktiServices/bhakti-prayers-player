/* [Grok-Bot] V3.43: Knopf "Atma Bhog" (Link https://www.atmabhog.org, neuer Tab) in der linken Kopfspalte neben der Hilfe-Blase,
   AtmaBhog-Stil (Navy, Gold #D6BF90, Figtree), nur Text (kein fremdes Logo). Tooltip je Sprache. Rechte Spalte (Version, Sprache) bleibt frei. */
window.BPP_BUILD="3.46"; window.BPP_SHOW="3.46";
(function(){
  if(window.bppV343) return; window.bppV343=1;
  var T={
    de:"Im Atma Bhog findet Ihr gut sortiert mit feiner Bedienoberfläche alle Kirtans, Abhangs, Bhajans und Prayers von Bhakti Marga … enjoy.",
    en:"In Atma Bhog you will find all the kirtans, abhangs, bhajans and prayers of Bhakti Marga, well sorted with a fine interface … enjoy.",
    fr:"Dans Atma Bhog, vous trouverez tous les kirtans, abhangs, bhajans et prières de Bhakti Marga, bien classés avec une interface soignée … enjoy.",
    es:"En Atma Bhog encontraréis todos los kirtans, abhangs, bhajans y oraciones de Bhakti Marga, bien ordenados y con una interfaz cuidada … enjoy.",
    ru:"В Atma Bhog вы найдёте все киртаны, абханги, бхаджаны и молитвы Бхакти Марги — удобно рассортированные, с красивым интерфейсом … enjoy.",
    hi:"आत्म भोग में भक्ति मार्ग के सभी कीर्तन, अभंग, भजन और प्रार्थनाएँ सुव्यवस्थित और सुंदर इंटरफ़ेस के साथ मिलेंगी … enjoy."
  };
  var css=document.createElement("style");
  css.textContent="#bppAtma{order:-1;display:inline-flex;align-items:center;gap:5px;margin:0 12px 0 0;padding:3px 11px 3px 10px;border:1px solid #D6BF90;border-radius:9999px;"+
    "background:#041236;color:#D6BF90!important;font:600 .72rem/1.3 Figtree,'Source Sans 3',sans-serif;letter-spacing:.06em;text-transform:uppercase;text-decoration:none!important;white-space:nowrap;vertical-align:middle;"+
    "transition:background .15s,color .15s;-webkit-tap-highlight-color:transparent}"+
    "#bppAtma:hover,#bppAtma:focus-visible{background:#D6BF90;color:#041236!important;outline:none}"+
    "#bppAtma svg{width:.9em;height:.9em;flex:0 0 auto}"+
    "#bppHelpCol{align-items:center}"+
    "@media(max-width:760px){#bppAtma{order:1;margin:0 0 0 10px;font-size:.62rem;padding:2px 8px}}"+
    "@media(max-width:360px){#bppAtma .t2{display:none}}";
  document.head.appendChild(css);
  function L(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return T[l]?l:"en"; }
  function build(){
    var c=document.getElementById("bppHelpCol"); if(!c) return;
    var a=document.getElementById("bppAtma");
    if(!a){
      a=document.createElement("a"); a.id="bppAtma"; a.href="https://www.atmabhog.org"; a.target="_blank"; a.rel="noopener";
      a.innerHTML="<span>Atma</span><span class='t2'>Bhog</span><svg viewBox='0 0 12 12' aria-hidden='true'><path d='M4 2h6v6M10 2 3 9' fill='none' stroke='currentColor' stroke-width='1.4'/></svg>";
      ["click","pointerdown","touchstart"].forEach(function(ev){ a.addEventListener(ev,function(e){ e.stopPropagation(); },{passive:true}); });
    }
    if(a.parentNode!==c) c.insertBefore(a,c.firstChild);
    var t=T[L()]; if(window.bppV345){ if(a.title) a.removeAttribute("title"); if(a.getAttribute("aria-label")!=="Atma Bhog – "+t) a.setAttribute("aria-label","Atma Bhog – "+t); } else if(a.title!==t){ a.title=t; a.setAttribute("aria-label","Atma Bhog – "+t); } /* V3.45: eigener Tooltip statt title */
  }
  build(); setInterval(build,500);
})();
