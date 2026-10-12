/* [Grok-Bot] V2.49 (ersetzt V2.46-Muster): Govinda – alle Strophen ab 2 wie Strophe 1 (Nutzer 12.10. 18:02).
   Strophe 1: Zeile 1 D, Zeile 2 D7+, Zeile 3 D7, Zeile 4 G D, Refrain D G D C D.
   Ab Strophe 2 gibt es nur 3 Zeilen vor dem Refrain: Zeile 1 D, Zeile 2 D7+, Zeile 3 D7 am Anfang und G D (Strophe-1-Zeile 4) auf den letzten Wortteilen; Refrain unveraendert. */
window.BPP_BUILD="2.50"; window.BPP_SHOW="2.50";
(function(){
  var PAT=[["D"],["D7+"],["D7","G","D"]];
  function spread(text, chs){
    var t=String(text), n=t.length, st=[0];
    for(var k=1;k<n;k++){ if((t[k-1]===" "||t[k-1]==="-") && t[k]!==" ") st.push(k); }
    var out="", used=-1;
    chs.forEach(function(c,j){
      var m=chs.length, S=st.length, best=(j===0)?0:((S>=m)?st[S-m+j]:Math.round(j*n/m));
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
        var lc=lines.map(function(s,k){ return spread(s, PAT[Math.min(k,PAT.length-1)]); });
        if(z.lineCh && z.lineCh.join("|")===lc.join("|")) return;
        z.lineCh=lc; z.ch="D   D7+   D7   G  D"; ch=true;
      });
    }catch(e){}
    return ch;
  }
  fix();
  setInterval(function(){ try{ if(fix() && typeof i!=="undefined" && PRAYERS[i] && PRAYERS[i].id==="govinda" && typeof paintLyrics==="function") paintLyrics(); }catch(e){} }, 1000);
})();
