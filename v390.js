/* [Grok-Bot] V3.90: Separater Menueeintrag "Śrī Viṣṇu Bhagavān Āratī" (vishnu-arati, CD 13) aus dem Menue genommen.
   Daten/Text bleiben (genutzt von V3.89 "Viṣṇu Bhagavān Āratī mit Final Prayers"). Direktlink ?p=vishnu-arati -> final-prayers (Inline-Skript im Kopf). */
window.BPP_BUILD="3.90"; window.BPP_SHOW="3.90";
(function(){
  if(window.bppV390) return; window.bppV390=1;
  function k(){ return (typeof PRAYERS==="undefined")?-1:PRAYERS.findIndex(function(p){ return p.id==="vishnu-arati"; }); }
  function hide(){ var n=k(); if(n<0) return;
    document.querySelectorAll('[data-i="'+n+'"]').forEach(function(e){ if(e.style.display!=="none") e.style.display="none"; }); }
  hide(); setInterval(hide,300);
})();
