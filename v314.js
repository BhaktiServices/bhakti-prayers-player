/* [Grok-Bot] V3.14: Quellenbereich (Herkunft, Quellen) zeigt bei allen Gebeten die allgemeine Quelle Telegram "Waves of Love Prayers" als Link (neuer Tab) */
window.BPP_BUILD="3.14"; window.BPP_SHOW="3.14";
(function(){
  var U="https://t.me/wavesoflove_prayers";
  var T={de:"Allgemeine Quelle",en:"General source",fr:"Source générale",es:"Fuente general",ru:"Общий источник",hi:"सामान्य स्रोत"};
  var st=document.createElement("style");
  st.textContent="#bppTg a{color:#e0b45a;text-decoration:underline}";
  document.head.appendChild(st);
  function add(box){
    if(box.querySelector("#bppTg")) return;
    var l=(typeof lang!=="undefined"&&T[lang])?lang:"en";
    var d=document.createElement("span"); d.id="bppTg";
    d.innerHTML=(box.childNodes.length?"<br>":"")+"<b>"+T[l]+":</b> <a href=\""+U+"\" target=\"_blank\" rel=\"noopener\">Telegram: Waves of Love Prayers</a>";
    box.appendChild(d);
  }
  var mo=new MutationObserver(function(){ var b=document.getElementById("bppSrcInfo"); if(b) add(b); });
  var n=0,iv=setInterval(function(){ var b=document.getElementById("bppSrcInfo");
    if(b){ clearInterval(iv); mo.observe(b,{childList:true}); add(b); } else if(++n>100) clearInterval(iv); },300);
  window.addEventListener("bpp-lang",function(){ var b=document.getElementById("bppSrcInfo"), t=b&&b.querySelector("#bppTg"); if(t){ t.remove(); add(b); } });
})();
