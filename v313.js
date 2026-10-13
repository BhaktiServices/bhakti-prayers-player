/* [Grok-Bot] V3.13: Taste p/P = Play/Pause (Standardansicht + Grossbild, MP3 + YT), nicht in Eingabefeld/Select */
window.BPP_BUILD="3.13"; window.BPP_SHOW="3.13";
(function(){
  document.addEventListener("keydown",function(e){
    if(e.key!=="p"&&e.key!=="P") return;
    if(e.ctrlKey||e.metaKey||e.altKey||e.repeat) return;
    var a=document.activeElement, t=a&&a.tagName;
    if(t==="INPUT"||t==="SELECT"||t==="TEXTAREA"||(a&&a.isContentEditable)) return;
    var b=document.getElementById("btnPlay"); if(!b) return;
    e.preventDefault(); e.stopPropagation(); b.click();
  },true);
})();
