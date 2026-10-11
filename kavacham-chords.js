/* [Grok.com] Nrsimha Kavacam: Akkorde wie im Heft ueber jeder Zeile. */
(function(){
  if(typeof PRAYERS==="undefined") return;
  var k=PRAYERS.find(function(p){ return p.id==="kavacham"; });
  if(!k||!k.zeilen) return;
  var A=["Dm  Bb  C  Dm","Bb  C  Dm","Bb  C  Dm","Bb  C  Dm"];
  var B=["Bb  C  F","Gm  C  Dm","Bb  C  Dm","Bb  C  Dm"];
  var N=["Dm  Bb  C  Dm","Dm  Bb  C  Dm","Dm  Bb  C  Dm","Dm  Bb  C  Dm"];
  var T=["Dm","F  C","Dm","F  C"];
  var K=["Dm","F  C","Bb  C  Dm","Bb  F  C  F"];
  var M=["Dm","C","Am  Bb  Dm","C"];
  function set(z, arr){
    var lines=String(z.sa||"").split("\n");
    z.lineCh=lines.map(function(_,i){ return arr[Math.min(i, arr.length-1)]; });
    z.ch=arr.join("   ");
  }
  k.zeilen.forEach(function(z){
    var nr=String(z.nr);
    if(nr==="2") set(z, B);
    else if(nr==="Namaste" || nr==="Ito") set(z, N);
    else if(nr==="Tava") set(z, T);
    else if(nr==="Keshava") set(z, K);
    else if(nr==="Mantra") set(z, M);
    else set(z, A);
  });
})();
