/* [Grok-Bot] V1.76: Zeitmarken als Abfolge. P.seqFile / P.seqYt = [[Zeit, Strophenindex], ...] (Index 0-basiert, nach stanzaGroups).
   Dieselbe Strophe darf mehrfach und auch rueckwaerts vorkommen; aktiv ist der letzte Eintrag mit Zeit <= Abspielzeit.
   Prayers ohne Abfolge laufen unveraendert ueber marks.js (marksFile / marksYt, gemerkte N-Marken, Schaetzung).
   Taste Auto-Strophe heisst jetzt "Mitlesen" (an: "✓ Mitlesen"), mit Erklaertext.
   Tasten "−"/"+" (Tempo der geschaetzten Strophen, marks.js scrollTempo) nur noch sichtbar, wo sie wirken:
   bei Prayers/Quellen mit Strophen ohne Marke nach der letzten Marke (Schaetzung). Mit Abfolge oder vollstaendigen Marken ausgeblendet. */
(function(){
  if(typeof PRAYERS==="undefined") return;
  function by(id){ return PRAYERS.find(function(p){ return p.id===id; }); }
  /* Sri Nrsimha Prayer (narasimha), 8 Strophen (Index 0-7). Gemessen per Whisper (large-v3-turbo): je 6-s-Fenster (Schritt 2 s) wird jede Verszeile
     gegen die Aufnahme ausgerichtet und bewertet (Token-Wahrscheinlichkeit), dazu Wortzeiten aus drei Transkripten und der Lautstaerkeverlauf.
     Beide Aufnahmen springen nach Strophe 4 (Kesava ... jaya jagadisa hare) zurueck zu Strophe 3 (tava kara kamala) und singen 3 und 4 noch einmal. */
  var n=by("narasimha");
  if(n){
    n.seqFile=[[0,0],[74,1],[149,2],[167,3],[184.5,2],[203,3],[260,4],[278.5,5],[298,6],[314.5,7]];
    n.seqYt=[[0,0],[110.5,1],[203,2],[226.5,3],[247.5,2],[270,3],[325,4],[339.5,5],[357,6],[367.5,7]];
  }
  function seqOf(P){ var s=(typeof ytOn!=="undefined" && ytOn)?P.seqYt:P.seqFile; return (s && s.length)?s:null; }
  window.bppSeqOf=seqOf;
  var base=window.stanzaFromProgress;
  if(typeof base==="function"){
    window.stanzaFromProgress=function(p){
      var P=(typeof i!=="undefined" && i>=0)?PRAYERS[i]:null, s=P?seqOf(P):null;
      if(!s || !p) return base.apply(this, arguments);
      var k=s[0][1];
      for(var j=0;j<s.length;j++){ if(s[j][0]<=p.t+0.05) k=s[j][1]; else break; }
      if(p.gs && k>p.gs.length-1) k=p.gs.length-1;
      return k<0?0:k;
    };
  }
  var LAB={de:["Mitlesen","Mitlesen: Die Strophe folgt der Aufnahme (ein / aus)"],
    en:["Follow","Follow along: the stanza follows the recording (on / off)"],
    fr:["Suivre","Suivre : la strophe suit l'enregistrement (oui / non)"],
    es:["Seguir","Seguir: la estrofa sigue la grabación (sí / no)"],
    ru:["Следить","Следить: строфа следует за записью (вкл / выкл)"],
    hi:["साथ पढ़ें","साथ पढ़ें: पद रिकॉर्डिंग के साथ चलता है (चालू / बंद)"],pt:["Acompanhar","Acompanhar: a estrofe segue a gravação (lig. / desl.)"]};
  function lab(){
    var b=document.getElementById("btnAuto"); if(!b) return;
    var L=LAB[(typeof lang!=="undefined" && LAB[lang])?lang:"en"], on=!!(typeof autoScroll!=="undefined" && autoScroll);
    var t=(on?"\u2713 ":"")+L[0]; if(b.textContent!==t) b.textContent=t;
    b.title=L[1]; b.setAttribute("aria-pressed", on?"true":"false");
  }
  function needTempo(){
    var P=(typeof i!=="undefined" && i>=0)?PRAYERS[i]:null; if(!P) return false;
    if(seqOf(P)) return false;
    try{ var gs=stanzaGroups(P); if(gs.length<2) return false;
      var A=bppAnchors(P, gs), mx=0; Object.keys(A).forEach(function(k){ if(+k>mx) mx=+k; });
      return mx<gs.length-1;
    }catch(e){ return true; }
  }
  window.bppNeedTempo=needTempo;
  function tempoVis(){
    var on=needTempo();
    ["btnScDown","scLab","btnScUp"].forEach(function(id){ var e=document.getElementById(id); if(e){ var d=on?"":"none"; if(e.style.display!==d) e.style.display=d; } });
  }
  document.addEventListener("DOMContentLoaded", function(){
    var ap=window.applyUI; if(typeof ap==="function"){ window.applyUI=function(){ var r=ap.apply(this, arguments); lab(); tempoVis(); return r; }; }
    var tp=window.bppTips; if(typeof tp==="function"){ window.bppTips=function(){ var r=tp.apply(this, arguments); lab(); return r; }; }
    lab(); tempoVis(); setTimeout(lab, 400); setInterval(tempoVis, 700);
    setTimeout(function(){ var v=document.querySelector("h1 .ver"); if(v) v.textContent="V1.76"; document.title="Bhakti Prayers Player V1.76"; }, 350);
  });
})();
