/* [Grok-Bot] V3.18: Hilfe-Blase direkt links neben der Sprachwahl (Sprachwahl bleibt ganz rechts), auch in Handybreite in einer Zeile */
window.BPP_BUILD="3.18"; window.BPP_SHOW="3.18";
(function(){
  var st=document.createElement("style");
  st.textContent="h1 #bppHelpTip.v318{margin:0 8px 0 10px!important}h1 #bppHelpTip.v318:before{left:auto!important;right:-6px!important;top:50%!important;margin:-4px 0 0 0!important;border:4px solid transparent!important;border-left:6px solid #b8955088!important;border-right:0!important}"+
    "@media(max-width:600px){h1 #bppHelpTip.v318{position:absolute!important;display:inline-block!important;width:auto!important;margin:0!important;top:7px;font-size:.66rem!important;padding:1px 7px!important}}";
  document.head.appendChild(st);
  setInterval(function(){
    var b=document.getElementById("bppHelpTip"), l=document.querySelector("h1 .lang"); if(!b||!l) return;
    if(!b.classList.contains("v318")) b.classList.add("v318");
    if(b.nextSibling!==l) l.parentNode.insertBefore(b,l);
    if(window.matchMedia("(max-width:600px)").matches){ var r=parseFloat(getComputedStyle(l).right)||6; b.style.right=(r+l.offsetWidth+10)+"px"; }
    else b.style.right="";
  },400);
})();
