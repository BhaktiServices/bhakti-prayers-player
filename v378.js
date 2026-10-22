/* [Grok-Bot] V3.78: (1) Zeichen ✎ hinter neuen Stotras/Sūktams in allen Menues (+ Hover "in Überarbeitung", 7 Sprachen) – Liste WIP unten,
   zum Entfernen einfach die ID aus WIP streichen (oder WIP leeren). (2) Hilfe: Erklaerung des Zeichens (von Grok ergaenzt).
   (3) Hilfe: Tastenkuerzel (Block .kb357 aus v357 und Zeile .kb352 aus v352) ans Ende verschoben, direkt vor "Jai Gurudev". */
window.BPP_BUILD="3.78"; window.BPP_SHOW="3.78";
(function(){
  if(window.bppV378) return; window.bppV378=1;
  var WIP=["sri-suktam","bhu-suktam","nila-suktam","purusa-suktam","narayana-suktam","vishnu-sahasranama"];
  var SYM="\u270e"; /* ✎ */
  var TIP={de:"in Überarbeitung",en:"work in progress",fr:"en cours de révision",es:"en revisión",ru:"в доработке",hi:"संशोधन जारी है",pt:"em revisão"};
  var HLP={de:"<b>✎ hinter dem Namen</b> = dieses Prayer ist neu und noch in Überarbeitung (Text, Übersetzung oder Mitlesen können sich noch ändern). <i>(von Grok ergänzt)</i>",
    en:"<b>✎ after the name</b> = this prayer is new and still being revised (text, translation or follow-along may still change). <i>(added by Grok)</i>",
    fr:"<b>✎ après le nom</b> = cette prière est nouvelle et encore en cours de révision (texte, traduction ou suivi peuvent encore changer). <i>(ajouté par Grok)</i>",
    es:"<b>✎ tras el nombre</b> = esta oración es nueva y aún está en revisión (texto, traducción o seguimiento pueden cambiar). <i>(añadido por Grok)</i>",
    ru:"<b>✎ после названия</b> = эта молитва новая и ещё дорабатывается (текст, перевод или «Следить» могут измениться). <i>(добавлено Grok)</i>",
    hi:"<b>नाम के बाद ✎</b> = यह प्रार्थना नई है और अभी संशोधित हो रही है (पाठ, अनुवाद या साथ पढ़ना अभी बदल सकते हैं)। <i>(Grok द्वारा जोड़ा गया)</i>",
    pt:"<b>✎ após o nome</b> = esta oração é nova e ainda está em revisão (texto, tradução ou acompanhamento ainda podem mudar). <i>(acrescentado por Grok)</i>"};
  window.bppWip=WIP;
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return TIP[l]?l:"en"; }
  function wip(k){ var P=(typeof PRAYERS!=="undefined")&&PRAYERS[+k]; return !!P && WIP.indexOf(P.id)>=0; }
  function add(t){ return t.indexOf(" "+SYM)>=0?t:t+" "+SYM; }
  var st=document.createElement("style"); st.textContent=".bpp378{display:inline-block;margin-left:.45em;opacity:.85;font-family:system-ui,sans-serif}"; document.head.appendChild(st);
  function marks(){
    var tip=TIP[lg()], box=document.getElementById("bppSel");
    if(box) [].forEach.call(box.querySelectorAll("select"),function(se){ var g=se._g; if(!g) return;
      g.items.forEach(function(x,k){ if(x.i===null||!wip(x.i)) return; x.t=add(x.t);
        var o=se.options[k+1]; if(!o) return; var nt=add(o.textContent); if(o.textContent!==nt) o.textContent=nt;
        var tt=(o.title&&o.title.indexOf(tip)<0)?o.title+" · "+tip:(o.title||tip); if(o.title!==tt) o.title=tt; }); });
    var L=document.getElementById("list");
    if(L) [].forEach.call(L.querySelectorAll(".item[data-i]"),function(el){ var on=wip(el.getAttribute("data-i")), s=el.querySelector(".bpp378");
      if(on&&!s){ s=document.createElement("span"); s.className="bpp378"; s.textContent=SYM; s.title=tip; el.appendChild(s); }
      if(!on&&s) s.remove(); });
  }
  function help(){ var d=document.getElementById("bppHelp"); if(!d) return; var jg=d.querySelector(".jg"); if(!jg) return;
    if(!d.querySelector(".h378")){ var p=document.createElement("p"); p.className="h378"; p.innerHTML=HLP[lg()]; jg.parentNode.insertBefore(p,jg); }
    [".kb357",".kb352"].forEach(function(c){ var e=d.querySelector(c); if(!e) return;
      var want=c===".kb357"?(d.querySelector(".kb352")||jg):jg;
      if(e.nextElementSibling!==want) jg.parentNode.insertBefore(e,want); });
  }
  function tick(){ try{ marks(); }catch(e){} try{ help(); }catch(e){} }
  tick(); setInterval(tick,300);
})();
