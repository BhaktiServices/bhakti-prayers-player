/* [Grok-Bot] V3.08: Giridhari Arati in Strophen gegliedert, wie gesungen (Refrain nach jeder Mira-Strophe ausgeschrieben),
   durchgehend 1-15; Om am Anfang zaehlt nicht. Zeitmarken audio/giridhari-arati.mp3 (333.5 s): Wechsel an den Atempausen
   (Demucs-Vocals) bzw. am Ende der letzten gesungenen Zeile; Rest aus der V1.80-Messung. Akkorde/Uebersetzung bleiben an ihren Zeilen.
   Ausserdem: Sprachwahl ohne Flaggen (v307l.js?v=2), v233.js nummeriert Giridhari nicht mehr je Zeile. */
window.BPP_BUILD="3.08"; window.BPP_SHOW="3.08";
(function(){
  var PLAN=[["R"],[4,5,6,7],["R"],[8,9,10,11],["R"],[12,13,14,15],["R"],[16,17,18,19],["R"],[20,21,22,23],["R"],[24,25,26],[27,28],[29,30],[31,32]];
  var T=[0,41.8,74,92.8,124.5,142.4,173,190.4,220,237.5,266.5,281.5,294.5,305.5,324.5];
  function cp(z,nr,noTr){ var c={}; for(var k in z) if(Object.prototype.hasOwnProperty.call(z,k)) c[k]=z[k]; c.nr=String(nr); c.x2=false;
    if(noTr) ["en","ue","fr","es","ru","hi","de"].forEach(function(k){ if(k in c) c[k]=""; }); return c; }
  function apply(){
    if(typeof PRAYERS==="undefined") return;
    var G=PRAYERS.find(function(p){ return p.id==="giridhari-arati"; }); if(!G||!G.zeilen) return;
    if(G._v308===G.zeilen) return;
    var Z=G.zeilen; if(Z.length!==33 || !/^chākar rahasūṁ/.test(Z[4].sa||"") || !/^mane chākar/.test(Z[0].sa||"")) return;
    var out=[];
    PLAN.forEach(function(st,k){ var nr=k+1;
      if(st[0]==="R"){ [0,1,2,3].forEach(function(n){ out.push(cp(Z[n],nr,n===3)); }); }  /* Refrain: Uebersetzung einmal */
      else st.forEach(function(n){ out.push(cp(Z[n],nr,false)); }); });
    G.zeilen=out; G._v308=out;
    G.seqFile=T.map(function(t,k){ return [t,k]; }); G.marksFile=T.slice();
    G._bppEstMarks=0; G._bppEstSrc="";
    try{ if(typeof i!=="undefined" && PRAYERS[i]===G && typeof paintLyrics==="function"){ line=0; paintLyrics(); } }catch(e){}
  }
  apply(); setTimeout(apply,500); setInterval(apply,1000);
})();
