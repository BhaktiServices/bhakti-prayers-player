/* [Grok-Bot] V3.31: Nrsimha Kavaca startet direkt mit grosser Schrift.
   Ursache: V3.23 setzt bei der Zeile "oṁ namo bhagavate nārasiṁhāya" inline display:block. Beim Messen in layoutLyrics()
   (Klasse .measure = inline-block) war diese Zeile deshalb so breit wie das Fenster -> Faktor --sc blieb 1 (kleine Schrift).
   Erst ein spaeteres Neu-Einpassen (z.B. nach dem Akkord-Knopf) traf den Moment ohne Inline-Stil und vergroesserte.
   Fix: beim Messen gilt fuer diese Zeile immer inline-block; nach dem Einpassen wird sie sofort wieder auf die Fensterbreite verkleinert. */
window.BPP_BUILD="3.31"; window.BPP_SHOW="3.31";
(function(){
  var st=document.createElement("style");
  st.textContent="#lyrics.measure .rowline .sa .ln.bpp1z{display:inline-block!important}";
  document.head.appendChild(st);
  function fit1z(){
    document.querySelectorAll("#lyrics .ln.bpp1z").forEach(function(e){
      e.style.fontSize="";
      var par=e.parentNode, avail=(par&&par.clientWidth)||0; if(!avail) return;
      var w=e.scrollWidth; if(w>avail+1) e.style.fontSize=(Math.floor(100*avail/w*0.98)/100)+"em";
    });
  }
  function hook(){
    if(typeof layoutLyrics!=="function") return setTimeout(hook,100);
    if(layoutLyrics.__v331) return;
    var orig=layoutLyrics;
    layoutLyrics=function(){ var r=orig.apply(this,arguments); try{ fit1z(); }catch(e){} return r; };
    layoutLyrics.__v331=1;
    try{ layoutLyrics(); }catch(e){}
  }
  hook();
})();
