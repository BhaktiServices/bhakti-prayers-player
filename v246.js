/* [Grok-Bot] V2.46: Govinda Prayer – Akkorde ab Strophe 2 nach Angabe des Nutzers.
   Je Strophe (3 lange Zeilen + Refrain): Zeile 1 "D D7+ D7 G D", Zeile 2 "D G D C D", Zeile 3 wieder wie Zeile 1,
   Refrain bleibt "D G D C D". Die Akkorde einer Zeile stehen gleichmaessig ueber der Zeile verteilt, erster Akkord am Zeilenanfang, letzter ueber dem letzten Wort(teil), dazwischen gleichmaessig auf Wort-/Wortteilanfaengen.
   Strophe 1 und Schluss bleiben wie im Heft (D / D7+ / D7 / G D). */
window.BPP_BUILD="2.46"; window.BPP_SHOW="2.46";
(function(){
  var L1=["D","D7+","D7","G","D"], L2=["D","G","D","C","D"];
  function spread(text, chs){
    var t=String(text), n=t.length, st=[0];
    for(var k=1;k<n;k++){ if((t[k-1]===" "||t[k-1]==="-") && t[k]!==" ") st.push(k); }
    var out="", used=-1;
    chs.forEach(function(c,j){
      var m=chs.length, S=st.length, best=(S>=m)?st[Math.round(j*(S-1)/Math.max(1,m-1))]:Math.round(j*n/m);
      var pos=Math.max(best, out.length+(out.length?1:0));
      while(out.length<pos) out+=" ";
      out+=c;
    });
    return out;
  }
  function fix(){
    var ch=false;
    try{
      var g=PRAYERS.find(function(p){ return p.id==="govinda"; }); if(!g||!g.zeilen) return false;
      g.zeilen.forEach(function(z){
        if(!/^\d+$/.test(String(z.nr)) || +z.nr<2) return;
        var lines=String(z.sa||"").split("\n");
        var lc=lines.map(function(s,k){ return spread(s, k%2===0?L1:L2); });
        if(z.lineCh && z.lineCh.join("|")===lc.join("|")) return;
        z.lineCh=lc; z.ch=L1.join("  ")+"   "+L2.join("  "); ch=true;
      });
    }catch(e){}
    return ch;
  }
  fix();
  setInterval(function(){ try{ if(fix() && typeof i!=="undefined" && PRAYERS[i] && PRAYERS[i].id==="govinda" && typeof paintLyrics==="function") paintLyrics(); }catch(e){} }, 1000);
})();
