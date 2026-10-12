/* [Grok-Bot] V2.45: Akkord-Knopf zeichnet die Liedzeilen neu. Vorher setzte toggleCh nur CSS-Klassen;
   die Zeilenakkorde (lineCh, z.B. Nrsimha Kavacam aus kavacham-chords.js) entstehen aber nur in paintLyrics -> im Modus "AkkZe" fehlten sie. */
window.BPP_BUILD="2.51"; window.BPP_SHOW="2.51";
(function(){
  if(typeof toggleCh!=="function") return;
  var orig=toggleCh;
  window.toggleCh=function(){ var r=orig.apply(this,arguments); try{ if(typeof paintLyrics==="function") paintLyrics(); }catch(e){} return r; };
})();
