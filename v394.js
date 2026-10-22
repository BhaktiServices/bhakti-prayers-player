/* [Grok-Bot] V3.94: Str. 18 final-prayers umsortiert (Text in v389.js); Hilfeabsatz "Unter den Lyrics: Herkunft, Quellen" ans Ende der Hilfe (Text unveraendert) */
window.BPP_BUILD="3.94"; window.BPP_SHOW="3.94";
(function(){
  var K=["Below the lyrics:", "Unter den Lyrics:", "Sous les paroles :", "Debajo de la letra:", "Под текстом:", "पाठ के नीचे:", "Abaixo da letra:"];
  setInterval(function(){ var d=document.getElementById("bppHelp"); if(!d) return;
    var ps=d.querySelectorAll("p,li,div"), p=null;
    for(var k=0;k<ps.length;k++){ var b=ps[k].firstElementChild; if(b&&b.tagName==="B"&&K.indexOf(b.textContent.trim())>=0&&ps[k].children.length<=2){ p=ps[k]; break; } }
    if(!p) return; var par=p.parentNode, last=par.lastElementChild;
    if(last!==p) par.appendChild(p); },300);
})();
