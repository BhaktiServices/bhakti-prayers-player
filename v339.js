/* [Grok-Bot] V3.39: Grossbild - Schliessen-X immer sichtbar (oben rechts, dezent in der Farbe der Kopfzeile),
   nicht erst nach Tipp/Menue-Einblendung. Tipp auf das X schliesst sofort; jeder andere erste Tipp zeigt wie bisher nur die Leiste. */
window.BPP_BUILD="4.03"; window.BPP_SHOW="4.03";
(function(){
  var css=document.createElement("style");
  css.textContent="#bppFsX{position:absolute;top:2px;right:4px;z-index:5;width:40px;height:40px;padding:0;border:0;border-radius:50%;"+
    "background:transparent;color:inherit;opacity:.55;font:22px/40px system-ui,sans-serif;cursor:pointer;-webkit-tap-highlight-color:transparent}"+
    "#bppFsX:hover,#bppFsX:focus-visible{opacity:1;background:rgba(128,128,128,.18);outline:none}"+
    "#bppFs #bppFsTop{right:48px}";
  document.head.appendChild(css);
  function add(){
    var ov=document.getElementById("bppFs"); if(!ov || document.getElementById("bppFsX")) return;
    var top=document.getElementById("bppFsTop");
    var x=document.createElement("button"); x.id="bppFsX"; x.type="button"; x.textContent="\u2715";
    x.title=x.ariaLabel=(typeof lang!=="undefined"&&lang!=="de")?"Close":"Schlie\u00dfen";
    if(top) x.style.color=getComputedStyle(top).color;
    function stop(e){ e.stopPropagation(); }
    x.addEventListener("touchstart",stop,{passive:true}); x.addEventListener("touchend",stop,{passive:true});
    x.addEventListener("pointerdown",stop);
    x.addEventListener("click",function(e){ e.stopPropagation(); e.preventDefault(); if(window.bppFsClose) bppFsClose(); });
    ov.appendChild(x);
  }
  add(); setInterval(add,600);
})();
