/* [Grok-Bot] V3.68: Narayana Suktam – Schlusszeile der Aufnahme ab 3:24 ergaenzt (nicht im Heft, Marke 204 s in v367.js),
   Uebersetzungen von Grok ergaenzt (im Quellenhinweis gekennzeichnet). Deckt auch die Markenkorrektur aus 51185c1 ab. */
window.BPP_BUILD="3.68"; window.BPP_SHOW="3.68";
(function(){
  function apply(){
    if(typeof PRAYERS==="undefined") return;
    var P=PRAYERS.find(function(p){ return p.id==="narayana-suktam"; }); if(!P||!P.zeilen) return;
    if(P.zeilen.some(function(z){ return z.nr==="N\u0101S\u00b7x17"; })) return;
    P.zeilen.push({nr:"N\u0101S\u00b7x17",ch:"",sa:"\u015br\u012b gurubhyo nama\u1e25 hari\u1e25 om ||",
      ue:"Ehrerbietung den verehrten Gurus. Hari Om.",en:"Salutations to the revered Gurus. Hari Om.",
      fr:"Salutations aux v\u00e9n\u00e9r\u00e9s Gurus. Hari Om.",es:"Salutaciones a los venerados Gurus. Hari Om.",
      ru:"\u041f\u043e\u043a\u043b\u043e\u043d \u043f\u043e\u0447\u0438\u0442\u0430\u0435\u043c\u044b\u043c \u0413\u0443\u0440\u0443. \u0425\u0430\u0440\u0438 \u041e\u043c.",
      hi:"\u092a\u0942\u091c\u094d\u092f \u0917\u0941\u0930\u0941\u0913\u0902 \u0915\u094b \u0928\u092e\u0938\u094d\u0915\u093e\u0930\u0964 \u0939\u0930\u093f \u0950\u0964",
      pt:"Sauda\u00e7\u00f5es aos venerados Gurus. Hari Om."});
    if(typeof render==="function" && typeof i!=="undefined" && PRAYERS[i]===P){ try{ render(); }catch(e){} }
  }
  apply(); document.addEventListener("DOMContentLoaded",apply); setTimeout(apply,500);
})();
