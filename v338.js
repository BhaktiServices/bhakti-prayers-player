/* [Grok-Bot] V3.38: Grossbild, Modus "Akkorde je Zeile": Akkorde wurden per Zeilentext zugeordnet (erstes Vorkommen im ganzen Gebet).
   Gleiche Zeilen in verschiedenen Strophen bekamen dadurch falsche Akkorde, z.B. Kavaca Str. 50 "jaya jagadisa hare" -> F C (aus Keshava)
   statt Dm Bb C Dm / Bb C Dm, Str. 51 "nrsinga dev" (Z. 2+3) -> F F statt F C. Neu: Zuordnung je Strophe (aktuelle Grossbild-Strophe
   bzw. die naechste fuer die Vorschau), Zeilen nach Position; Text-Zuordnung bleibt nur als Rueckfall (v250/v336 rufen bppV338Ch). */
window.BPP_BUILD="3.38"; window.BPP_SHOW="3.38";
(function(){
  function norm(s){ return String(s).replace(/\s+/g," ").trim(); }
  window.bppV338Ch=function(texts, bx){
    try{
      var P=(typeof i!=="undefined" && i>=0)?PRAYERS[i]:null; if(!P||!P.zeilen||!texts.length) return null;
      var st=window.bppFsState?bppFsState():null, k=(st&&st.k>=0)?st.k:-1;
      var nx=bx && bx.closest && bx.closest("#bppNx195");
      var pref=nx?[k+1,k]:[k,k+1];
      var best=null, bd=1e9;
      P.zeilen.forEach(function(z,n){
        var lc=(function(z){ try{ return window.bppLC442?bppLC442(z):z.lineCh; }catch(e){ return z.lineCh; } })(z); /* [Grok-Bot] V4.42 */ if(!lc) return; var L=String(z.sa||"").split("\n"); if(lc.length!==L.length) return;
        L=L.map(norm);
        for(var o=0;o+texts.length<=L.length;o++){
          var ok=true; for(var q=0;q<texts.length;q++){ if(L[o+q]!==texts[q]){ ok=false; break; } }
          if(!ok) continue;
          var p=pref.indexOf(n), d=p>=0?p:(k>=0?2+Math.abs(n-k):2+n);
          if(d<bd){ bd=d; best=lc.slice(o,o+texts.length); }
        }
      });
      return best;
    }catch(e){ return null; }
  };
})();
