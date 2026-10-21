/* [Grok-Bot] V3.69: Hinweis "Noch keine Uebersetzung vorhanden" in der Oberflaechensprache, wo eine Strophe keine Uebersetzung hat (Render in index.html). */
window.BPP_BUILD="3.69"; window.BPP_SHOW="3.69";
/* Prayers ganz ohne Uebersetzung (Uebersetzung wird dort seit V3.56 automatisch ausgeblendet): eine sichtbare Hinweiszeile oben im Text. */
(function(){
  var NT={de:"Noch keine Übersetzung vorhanden",en:"No translation available yet",fr:"Pas encore de traduction",es:"Todavía no hay traducción",ru:"Перевода пока нет",hi:"अभी अनुवाद उपलब्ध नहीं है",pt:"Ainda não há tradução"};
  function tick(){
    var box=document.getElementById("lyrics"); if(!box||typeof window.bppHasTr!=="function") return;
    var P=(typeof i!=="undefined"&&i>=0&&typeof PRAYERS!=="undefined")?PRAYERS[i]:null;
    var h=document.getElementById("bppNoTr369"), need=!!P&&!window.bppHasTr();
    if(!need){ if(h) h.remove(); return; }
    var t=NT[(typeof lang!=="undefined"&&NT[lang])?lang:"en"];
    if(!h||h.parentNode!==box||box.firstChild!==h){ if(h) h.remove(); h=document.createElement("div"); h.id="bppNoTr369"; h.setAttribute("role","note");
      h.style.cssText="font-style:italic;opacity:.7;padding:4px 10px 8px;font-size:.95em"; box.insertBefore(h,box.firstChild); }
    if(h.textContent!==t) h.textContent=t;
  }
  setInterval(tick,500);
})();
