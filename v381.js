/* [Grok-Bot] V3.81: Grossansicht – (1) eigener Knopf Uebersetzung ein/aus oben rechts neben dem X, immer sichtbar, synchron mit der normalen Ansicht
   (showDe/toggleDe, Zustand bleibt ueber localStorage "bpp-de" gemerkt). Gold = an; Hover-Text nennt die naechste Aktion. (2) Schliessen-X immer sichtbar:
   fest oben rechts (auch Hoch-/Querformat, Notch-Abstand), volle Deckkraft, fester Grund in jedem Stil, nie ausgeblendet. */
window.BPP_BUILD="3.81"; window.BPP_SHOW="3.81";
(function(){
  if(window.bppV381) return; window.bppV381=1;
  var T={de:["Übersetzung einblenden","Übersetzung ausblenden"],en:["Show translation","Hide translation"],fr:["Afficher la traduction","Masquer la traduction"],
    es:["Mostrar traducción","Ocultar traducción"],ru:["Показать перевод","Скрыть перевод"],hi:["अनुवाद दिखाएँ","अनुवाद छिपाएँ"],pt:["Mostrar tradução","Ocultar tradução"]};
  var CL={de:"Schließen",en:"Close",fr:"Fermer",es:"Cerrar",ru:"Закрыть",hi:"बंद करें",pt:"Fechar"};
  var HLP={"de": "<b>Groß – Übersetzung:</b> „Aa“ in der Groß-Leiste (nur Menü+) schaltet die Übersetzung; Zustand bleibt. ✕ immer sichtbar. <i>(von Grok ergänzt)</i>", "en": "<b>Big – translation:</b> “Aa” in Big bar (Menu+ only) toggles translation; state kept. ✕ always visible. <i>(added by Grok)</i>", "fr": "<b>Grand – traduction :</b> « Aa » dans la barre Grand (Menu+ seulement) bascule la traduction ; état conservé. ✕ toujours visible. <i>(ajouté par Grok)</i>", "es": "<b>Grande – traducción:</b> «Aa» en la barra Grande (solo Menú+) alterna la traducción; se mantiene. ✕ siempre visible. <i>(añadido por Grok)</i>", "ru": "<b>Крупно – перевод:</b> «Aa» в панели «Крупно» (только Меню+) включает перевод; состояние сохраняется. ✕ всегда видна. <i>(добавлено Grok)</i>", "hi": "<b>बड़ा – अनुवाद:</b> बड़े दृश्य में “Aa” (केवल मेनू+) अनुवाद टॉगल करता है; स्थिति बनी रहती है। ✕ हमेशा दिखता है। <i>(Grok द्वारा जोड़ा गया)</i>", "pt": "<b>Grande – tradução:</b> “Aa” na barra Grande (só Menu+) alterna a tradução; estado mantido. ✕ sempre visível. <i>(acrescentado por Grok)</i>"};
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return T[l]?l:"en"; }
  var css=document.createElement("style");
  css.textContent=
    "#bppFs #bppFsX,#bppFs #bppFsTr381{position:fixed!important;top:calc(6px + env(safe-area-inset-top,0px))!important;z-index:2147483600!important;opacity:1!important;visibility:visible!important;display:block!important;"+
      "width:42px!important;height:42px!important;padding:0!important;border-radius:50%!important;font:700 20px/40px system-ui,'Segoe UI Symbol',sans-serif!important;text-align:center;cursor:pointer;"+
      "background:#2F3C5F!important;color:#FFFFFF!important;border:2px solid #FFFFFF!important;box-shadow:0 2px 8px rgba(0,0,0,.45)!important;transition:none!important;animation:none!important}"+
    "#bppFs #bppFsX{right:calc(6px + env(safe-area-inset-right,0px))!important}"+
    "#bppFs #bppFsTr381{right:calc(56px + env(safe-area-inset-right,0px))!important;font-size:16px!important}"+
    "#bppFs #bppFsTr381.on{background:#D6BF90!important;color:#041236!important;border-color:#D6BF90!important}"+
    "#bppFs #bppFsTop{right:58px!important}"+
    "html.th-abend #bppFs #bppFsX,html.th-abend #bppFs #bppFsTr381{background:#4A3220!important}"+
    "html.th-abend #bppFs #bppFsTr381.on{background:#E2B864!important;color:#1E130B!important;border-color:#E2B864!important}"+
    "html.th-morgen #bppFs #bppFsX,html.th-morgen #bppFs #bppFsTr381{background:#FFFFFF!important;color:#141A33!important;border-color:#141A33!important}"+
    "html.th-morgen #bppFs #bppFsTr381.on{background:#5E420C!important;color:#FFFFFF!important;border-color:#5E420C!important}";
  document.head.appendChild(css);
  function de(){ return typeof showDe!=="undefined" && !!showDe; }
  function fsTr(){ var b=document.getElementById("bppFsTr"); return b?b.classList.contains("on"):null; }
  /* [Grok-Bot] V3.83: oberer Knopf "Aa" entfernt; nur der untere Uebersetzungs-Knopf der Grossansicht (#bppFsTr, v183) bleibt.
     Er wird in beide Richtungen mit der normalen Ansicht (showDe, gemerkt in localStorage "bpp-de") abgeglichen. */
  var lastF=null, lastD=null;
  function sync(){
    var ov=document.getElementById("bppFs"); if(!ov) return;
    var old=document.getElementById("bppFsTr381"); if(old) old.remove();
    var x=document.getElementById("bppFsX"); if(x){ x.style.removeProperty("color"); var c=CL[lg()]; if(x.title!==c){ x.title=c; x.setAttribute("aria-label",c); } }
    var ib=document.getElementById("bppFsTr"); if(!ib) return;
    var d=de(), f=ib.classList.contains("on");
    if(lastF!==null && f!==lastF && f!==d){ /* unten in Gross umgeschaltet -> normale Ansicht nachziehen */
      try{ if(typeof toggleDe==="function") toggleDe(); }catch(e){} d=de();
      if(d!==f){ ib.click(); f=ib.classList.contains("on"); } }
    else if(f!==d){ ib.click(); f=ib.classList.contains("on"); }
    lastF=f; lastD=d;
    var t=T[lg()][f?1:0]; if(ib.title!==t){ ib.title=t; ib.setAttribute("aria-label",t); }
  }
  setInterval(sync,300);
  setInterval(function(){ var d=document.getElementById("bppHelp"); if(!d) return; var ref=d.querySelector(".h379")||d.querySelector(".kb357")||d.querySelector(".jg"); if(!ref) return;
    var p=d.querySelector(".h381"); if(!p){ p=document.createElement("p"); p.className="h381"; p.innerHTML=HLP[lg()]; }
    if(!p.parentNode||p.nextSibling!==ref) ref.parentNode.insertBefore(p,ref); },300);
})();
