/* [Grok-Bot] V3.81: Grossansicht – (1) eigener Knopf Uebersetzung ein/aus oben rechts neben dem X, immer sichtbar, synchron mit der normalen Ansicht
   (showDe/toggleDe, Zustand bleibt ueber localStorage "bpp-de" gemerkt). Gold = an; Hover-Text nennt die naechste Aktion. (2) Schliessen-X immer sichtbar:
   fest oben rechts (auch Hoch-/Querformat, Notch-Abstand), volle Deckkraft, fester Grund in jedem Stil, nie ausgeblendet. */
window.BPP_BUILD="3.81"; window.BPP_SHOW="3.81";
(function(){
  if(window.bppV381) return; window.bppV381=1;
  var T={de:["Übersetzung einblenden","Übersetzung ausblenden"],en:["Show translation","Hide translation"],fr:["Afficher la traduction","Masquer la traduction"],
    es:["Mostrar traducción","Ocultar traducción"],ru:["Показать перевод","Скрыть перевод"],hi:["अनुवाद दिखाएँ","अनुवाद छिपाएँ"],pt:["Mostrar tradução","Ocultar tradução"]};
  var CL={de:"Schließen",en:"Close",fr:"Fermer",es:"Cerrar",ru:"Закрыть",hi:"बंद करें",pt:"Fechar"};
  var HLP={de:"<b>Groß – Übersetzung:</b> Der Knopf „Aa“ oben rechts neben dem ✕ blendet die Übersetzung ein oder aus (gold = an), gleich wie in der normalen Ansicht. Das ✕ ist immer sichtbar. <i>(von Grok ergänzt)</i>",
    en:"<b>Big – translation:</b> the “Aa” button at the top right next to ✕ shows or hides the translation (gold = on), same as in the normal view. The ✕ is always visible. <i>(added by Grok)</i>",
    fr:"<b>Grand – traduction :</b> le bouton « Aa » en haut à droite à côté du ✕ affiche ou masque la traduction (doré = activé), comme dans la vue normale. Le ✕ est toujours visible. <i>(ajouté par Grok)</i>",
    es:"<b>Grande – traducción:</b> el botón «Aa» arriba a la derecha junto a ✕ muestra u oculta la traducción (dorado = activo), igual que en la vista normal. La ✕ siempre está visible. <i>(añadido por Grok)</i>",
    ru:"<b>Крупно – перевод:</b> кнопка «Aa» вверху справа рядом с ✕ показывает или скрывает перевод (золото = вкл.), как и в обычном виде. ✕ всегда видна. <i>(добавлено Grok)</i>",
    hi:"<b>बड़ा – अनुवाद:</b> ऊपर दाईं ओर ✕ के पास “Aa” बटन अनुवाद दिखाता या छिपाता है (सुनहरा = चालू), सामान्य दृश्य की तरह। ✕ हमेशा दिखता है। <i>(Grok द्वारा जोड़ा गया)</i>",
    pt:"<b>Grande – tradução:</b> o botão “Aa” no canto superior direito ao lado do ✕ mostra ou oculta a tradução (dourado = ligado), como na vista normal. O ✕ está sempre visível. <i>(acrescentado por Grok)</i>"};
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return T[l]?l:"en"; }
  var css=document.createElement("style");
  css.textContent=
    "#bppFs #bppFsX,#bppFs #bppFsTr381{position:fixed!important;top:calc(6px + env(safe-area-inset-top,0px))!important;z-index:2147483600!important;opacity:1!important;visibility:visible!important;display:block!important;"+
      "width:42px!important;height:42px!important;padding:0!important;border-radius:50%!important;font:700 20px/40px system-ui,'Segoe UI Symbol',sans-serif!important;text-align:center;cursor:pointer;"+
      "background:#2F3C5F!important;color:#FFFFFF!important;border:2px solid #FFFFFF!important;box-shadow:0 2px 8px rgba(0,0,0,.45)!important;transition:none!important;animation:none!important}"+
    "#bppFs #bppFsX{right:calc(6px + env(safe-area-inset-right,0px))!important}"+
    "#bppFs #bppFsTr381{right:calc(56px + env(safe-area-inset-right,0px))!important;font-size:16px!important}"+
    "#bppFs #bppFsTr381.on{background:#D6BF90!important;color:#041236!important;border-color:#D6BF90!important}"+
    "#bppFs #bppFsTop{right:108px!important}"+
    "html.th-abend #bppFs #bppFsX,html.th-abend #bppFs #bppFsTr381{background:#4A3220!important}"+
    "html.th-abend #bppFs #bppFsTr381.on{background:#E2B864!important;color:#1E130B!important;border-color:#E2B864!important}"+
    "html.th-morgen #bppFs #bppFsX,html.th-morgen #bppFs #bppFsTr381{background:#FFFFFF!important;color:#141A33!important;border-color:#141A33!important}"+
    "html.th-morgen #bppFs #bppFsTr381.on{background:#5E420C!important;color:#FFFFFF!important;border-color:#5E420C!important}";
  document.head.appendChild(css);
  function de(){ return typeof showDe!=="undefined" && !!showDe; }
  function fsTr(){ var b=document.getElementById("bppFsTr"); return b?b.classList.contains("on"):null; }
  function sync(){
    var ov=document.getElementById("bppFs"); if(!ov) return;
    var x=document.getElementById("bppFsX"); if(x){ x.style.removeProperty("color"); var c=CL[lg()]; if(x.title!==c){ x.title=c; x.setAttribute("aria-label",c); } }
    var b=document.getElementById("bppFsTr381");
    if(!b){ b=document.createElement("button"); b.type="button"; b.id="bppFsTr381"; b.textContent="Aa";
      function stop(e){ e.stopPropagation(); }
      b.addEventListener("touchstart",stop,{passive:true}); b.addEventListener("touchend",stop,{passive:true}); b.addEventListener("pointerdown",stop);
      b.addEventListener("click",function(e){ e.stopPropagation(); e.preventDefault();
        var want=!de(); try{ if(typeof toggleDe==="function") toggleDe(); }catch(err){}
        if(de()!==want){ try{ if(window.bppV356NoTr) window.bppV356NoTr(); }catch(err){} }
        sync(); });
      ov.appendChild(b); }
    var on=de();
    /* Grossansicht-eigene Option (v183 opt.tr) an die normale Ansicht angleichen */
    var f=fsTr(); if(f!==null && f!==on){ var ib=document.getElementById("bppFsTr"); if(ib) ib.click(); }
    b.classList.toggle("on",on); b.setAttribute("aria-pressed",on?"true":"false");
    var t=T[lg()][on?1:0]; if(b.title!==t){ b.title=t; b.setAttribute("aria-label",t); }
  }
  setInterval(sync,300);
  setInterval(function(){ var d=document.getElementById("bppHelp"); if(!d) return; var ref=d.querySelector(".h379")||d.querySelector(".kb357")||d.querySelector(".jg"); if(!ref) return;
    var p=d.querySelector(".h381"); if(!p){ p=document.createElement("p"); p.className="h381"; p.innerHTML=HLP[lg()]; }
    if(!p.parentNode||p.nextSibling!==ref) ref.parentNode.insertBefore(p,ref); },300);
})();
