/* [Grok-Bot] V3.35: Nrsimha Kavaca - Akkord-Wechselmuster der Kavaca-Verse (Strophen 1-33, bis "iti sri brahmanda purane"):
   ungerade = Typ A (Dm Bb C Dm | Bb C Dm | Bb C Dm | Bb C Dm), gerade = Typ B (Bb C F | Gm C Dm | Bb C Dm | Bb C Dm),
   wie Heft (Prathana SVD S. 20: Str. 1 Typ A, Str. 2 Typ B; weitere Strophen ohne Akkorde = Muster wiederholt).
   Bisher hatten 4, 6, 8 ... 32 Typ A. Ausserdem "jaya nrsinga dev" (Str. 51) laut Heft Bb | F | C | F. */
window.BPP_BUILD="3.35"; window.BPP_SHOW="3.35";
(function(){
  var A={ch:"Dm  Bb  C  Dm   Bb  C  Dm   Bb  C  Dm   Bb  C  Dm", lineCh:["Dm  Bb  C  Dm","Bb  C  Dm","Bb  C  Dm","Bb  C  Dm"]};
  var B={ch:"Bb  C  F   Gm  C  Dm   Bb  C  Dm   Bb  C  Dm", lineCh:["Bb  C  F","Gm  C  Dm","Bb  C  Dm","Bb  C  Dm"]};
  var J={ch:"Bb   F   C   F", lineCh:["Bb","F","C","F"]};
  function same(z,t){ return z.ch===t.ch && JSON.stringify(z.lineCh||[])===JSON.stringify(t.lineCh); }
  function set(z,t){ if(same(z,t)) return false; z.ch=t.ch; z.lineCh=t.lineCh.slice(); return true; }
  function run(){
    if(typeof PRAYERS==="undefined") return;
    var P=PRAYERS.find(function(p){ return p.id==="kavacham"; }); if(!P||!P.zeilen) return;
    var ch=false;
    P.zeilen.forEach(function(z){
      var n=parseInt(z.nr,10); if(!n) return;
      if(n>=1 && n<=33 && String(z.sa||"").split("\n").length===4) ch=set(z, n%2?A:B)||ch;
      if(/^jaya n\u1e5b\u015bi\u1e45ga dev/.test(String(z.sa||"")) && String(z.sa).split("\n").length===4) ch=set(z,J)||ch;
    });
    if(ch){ try{ if(typeof i!=="undefined"&&PRAYERS[i]&&PRAYERS[i].id==="kavacham"&&typeof paintLyrics==="function") paintLyrics(); }catch(e){} try{ window.dispatchEvent(new Event("resize")); }catch(e){} }
  }
  run(); setTimeout(run,800); setInterval(run,1500);
})();
