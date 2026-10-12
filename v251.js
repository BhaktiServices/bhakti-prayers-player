/* [Grok-Bot] V2.51: Nrsimha Kavacam – "Garjantam" (bisher eine Strophe 30 mit 12 Zeilen) in drei Strophen 30, 31, 32 zu je 4 Zeilen getrennt;
   alle folgenden Teile (Iti, Namaste, Ito, Tava, Keshava, Mantra ... Gurudev) durchgehend nummeriert (33-53).
   Zeiten: aus den in V1.96 gemessenen Zeilenpausen (Demucs/Whisper, BPP_PAUSES) – je 4. Zeile beginnt eine neue Strophe.
   MP3: 473.8 / 489.2 / 504.4 s, YouTube: 530.5 / 544.7 / 558.9 s; alle uebrigen Zeiten unveraendert (nur Index +2).
   Zeilenakkorde wie bisher (Bb C Dm, erste Zeile Dm Bb C Dm). Uebersetzung des ganzen Abschnitts steht bei Strophe 30. */
window.BPP_BUILD="2.51"; window.BPP_SHOW="2.51";
(function(){
  if(typeof PRAYERS==="undefined") return;
  var SPLIT={file:[473.8,489.2,504.4], yt:[530.5,544.7,558.9]};
  function P(){ return PRAYERS.find(function(p){ return p.id==="kavacham"; }); }
  function splitZ(k){
    var Z=k.zeilen, n=-1;
    for(var q=0;q<Z.length;q++){ if(String(Z[q].nr)==="30" && String(Z[q].sa||"").split("\n").length===12){ n=q; break; } }
    if(n<0) return false;
    var z=Z[n], L=String(z.sa).split("\n"), lc=z.lineCh||[], out=[];
    for(var s=0;s<3;s++){
      var y={}; Object.keys(z).forEach(function(key){ y[key]=z[key]; });
      if(s>0) Object.keys(y).forEach(function(key){ if(/^(ue|en|fr|es|ru|hi|de)$/.test(key)) y[key]=""; });
      y.nr=String(30+s); y.sa=L.slice(4*s,4*s+4).join("\n");
      var c=lc.slice(4*s,4*s+4); if(s>0 && c.length) c[0]=lc[0]; /* erste Zeile jeder Strophe wie ueblich Dm Bb C Dm */
      y.lineCh=c.length===4?c:undefined; y.ch=(y.lineCh||[]).join("   ")||z.ch;
      out.push(y);
    }
    Z.splice.apply(Z, [n,1].concat(out));
    var num=33; for(var r=n+3;r<Z.length;r++){ if(!/^\d+$/.test(String(Z[r].nr))){ Z[r].nrOld=Z[r].nr; } Z[r].nr=String(num++); }
    k.__v251n=n; return true;
  }
  function seq(old, t3, n){
    var o=[]; old.forEach(function(e){ if(e[1]<n) o.push(e); else if(e[1]===n){ o.push([t3[0],n],[t3[1],n+1],[t3[2],n+2]); } else o.push([e[0],e[1]+2]); });
    return o;
  }
  function marks(s){ var m=[]; s.forEach(function(e){ if(m[e[1]]==null) m[e[1]]=e[0]; }); return m; }
  function apply(){
    var k=P(); if(!k||!k.zeilen) return;
    if(k.__v251n===undefined && !splitZ(k)) return;
    var n=k.__v251n, N=k.zeilen.length;
    ["File","Yt"].forEach(function(w){
      var s=k["seq"+w]; if(!s||!s.length) return;
      var mx=0; s.forEach(function(e){ if(e[1]>mx) mx=e[1]; });
      if(mx===N-1) return; /* schon angepasst */
      k["seq"+w]=seq(s, w==="File"?SPLIT.file:SPLIT.yt, n); k["marks"+w]=marks(k["seq"+w]);
    });
    k._bppEstMarks=0; k._bppEstYt=0; k._bppEstSrc="";
  }
  apply();
  document.addEventListener("DOMContentLoaded", apply);
  [500,1000,2200,3500].forEach(function(t){ setTimeout(function(){ apply(); try{ var k=P(); if(typeof i!=="undefined" && PRAYERS[i]===k && typeof paintLyrics==="function") paintLyrics(); }catch(e){} }, t); });
  setInterval(apply, 1500);
})();
