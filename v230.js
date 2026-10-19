/* [Grok.com] Kavacam: die drei Schlussstrophen nicht zusammen, die wiederholte Strophe nicht ueberspringen. */
(function(){
  function apply(){
    if(typeof PRAYERS==="undefined") return;
    var k=PRAYERS.find(function(p){ return p.id==="kavacham"; });
    if(!k) return;
    if(window.bppV351) return; /* [Grok-Bot] V3.54: sonst gewinnen die alten Schaetzzeiten (Str. 4 erst bei 65 s statt 58,3 s) seit V3.52 */
    var seq=[
      [7,0],[27,1],[45,2],[65,3],[85,4],[106,5],[125,6],[145,7],[165,8],[188,9],
      [205,10],[226,11],[245,12],[265,13],[285,14],[305,15],[324,16],[342,17],[358,18],[375,19],
      [392,20],[408,21],[424,22],[440,23],[454,24],[471,25],[485,26],[500,27],[515,28],[529,29],
      [548,30],[590,31],[612,32],[636,33],
      [658,34],[678,34],[698,34],
      [718,35],[736,36],[754,37],[772,38],[790,39],[808,40],[826,41],[844,42],[862,43],[880,44],[898,45],[916,46],[934,47],[952,48],[970,49],[988,50]
    ];
    k.seqYt=seq; k.seqFile=seq;
    var m=[]; seq.forEach(function(e){ if(m[e[1]]==null) m[e[1]]=e[0]; });
    k.marksYt=m; k.marksFile=m;
  }
  apply();
  setTimeout(apply, 600);
})();
