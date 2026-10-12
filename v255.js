/* [Grok-Bot] V2.55: Gebetstitel nur einmal: die Ueberschrift ueber dem Lyrics-Kasten (Titel + Morgen-/Abendgebet) bleibt,
   die Wiederholung im Kasten (.songtitle) wird in der Standardansicht ausgeblendet. Grossbild unveraendert. */
window.BPP_BUILD="2.55"; window.BPP_SHOW="2.55";
(function(){
  var st=document.createElement("style");
  st.textContent="#lyrics .songtitle{display:none!important}";
  document.head.appendChild(st);
})();
