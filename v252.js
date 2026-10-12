/* [Grok-Bot] V2.52: Hauptueberschrift gross und deutlich: "Bhakti Prayers Player" (Grossbuchstaben per CSS), Versionsnummer klein daneben. */
window.BPP_BUILD="2.52"; window.BPP_SHOW="2.52";
(function(){
  var st=document.createElement("style");
  st.textContent="header h1{font-size:clamp(1.7rem,6.4vw,3.1rem)!important;line-height:1.1;text-transform:uppercase;letter-spacing:.06em;font-weight:700!important;color:var(--gold);text-shadow:0 1px 0 rgba(0,0,0,.35);margin:.15em 0 .2em!important}"+
    "header h1 .ver{text-transform:none;letter-spacing:0;font-weight:normal;font-size:.36em!important;vertical-align:middle;white-space:nowrap}";
  document.head.appendChild(st);
  function fix(){
    var h=document.querySelector("header h1"); if(!h) return;
    var t=h.firstChild; if(t && t.nodeType===3){ if(t.nodeValue!=="Bhakti Prayers Player ") t.nodeValue="Bhakti Prayers Player "; }
    else h.insertBefore(document.createTextNode("Bhakti Prayers Player "), h.firstChild);
  }
  fix(); document.addEventListener("DOMContentLoaded", fix); setTimeout(fix, 1500);
})();
