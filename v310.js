/* [Grok-Bot] V3.10: Sri Vishwananda Bhajare - anschliessendes "Mhane Chakar Rakho Ji" (Mirabai-Bhajan, Fassung fuer Sri Vishwananda)
   als eigene Strophen 7-9 mit Abschnittsueberschrift. Text und Akkorde wie bisher aus dem Prathana-Heft S. 24 (bhajare.js), Uebersetzung EN/DE dort,
   FR/ES/RU/HI ergaenzt. Sprach-Dropdown gold auf dunkel (nach der Giridhari-Arati-Uebersetzung). Zeiten audio/bhajare.mp3: 214.5 / 229.5 / 237.5 s. */
window.BPP_BUILD="3.10"; window.BPP_SHOW="3.10";
(function(){
  var TR=[
   {fr:"Garde-moi comme Ton serviteur, Sri Vishwananda.",es:"Tenme como Tu servidor, Sri Vishwananda.",ru:"Оставь меня Своим слугой, Шри Вишвананда.",hi:"मुझे अपना चाकर रखो, श्री विश्वानंद।"},
   {fr:"Garde-moi comme serviteur, garde-moi comme serviteur.",es:"Tenme como servidor, tenme como servidor.",ru:"Оставь меня слугой, оставь меня слугой.",hi:"मुझे चाकर रखो, मुझे चाकर रखो।"},
   {fr:"Garde-moi comme Ton serviteur, Sri Vishwananda, Shyam, Gurudeva.",es:"Tenme como Tu servidor, Sri Vishwananda, Shyam, Gurudeva.",ru:"Оставь меня Своим слугой, Шри Вишвананда, Шьям, Гурудева.",hi:"मुझे अपना चाकर रखो, श्री विश्वानंद, श्याम, गुरुदेव।"}];
  var SEQ=[[0,0],[33,1],[52.5,2],[81,3],[110.5,4],[140.5,5],[170,6],[214.5,7],[229.5,8],[237.5,9]];
  var HEAD={de:"Mhane Chākar Rākho Jī · Mīrābāī-Bhajan",en:"Mhane Chākar Rākho Jī · Mīrābāī bhajan"};
  function P(){ return (typeof PRAYERS!=="undefined")&&PRAYERS.find(function(p){ return p.id==="bhajare"; }); }
  function apply(){
    var B=P(); if(!B||!B.zeilen) return;
    var ix=[]; B.zeilen.forEach(function(z,n){ if(/^Chakar/.test(z.nr||"")) ix.push(n); });
    if(ix.length===3){ ix.forEach(function(n,k){ var z=B.zeilen[n]; z.nr=String(7+k); z._chakar=1; for(var l in TR[k]) if(!z[l]) z[l]=TR[k][l]; }); }
    if(!B._v310){ B._v310=1; B.seqFile=SEQ; B.marksFile=SEQ.map(function(e){return e[0];});
      if((B.quelle||"").indexOf("Chākar")<0) B.quelle=(B.quelle||"")+" · danach Mhane Chākar Rākho Jī (Mīrābāī), Text/Akkorde Prathana S. 24"; }
  }
  function head(){
    var B=P(), L=document.getElementById("lyrics"); if(!B||!L||typeof i==="undefined"||PRAYERS[i]!==B) return;
    if(L.querySelector(".v310h")) return;
    var n=-1; B.zeilen.forEach(function(z,k){ if(z._chakar&&n<0) n=k; }); if(n<0) return;
    var st=L.querySelector(".stanza[data-start='"+n+"']"); if(!st) return;
    var h=document.createElement("div"); h.className="v310h"; var l=(typeof lang!=="undefined"&&HEAD[lang])?lang:(lang==="de"?"de":"en");
    h.textContent=HEAD[l]||HEAD.en; st.parentNode.insertBefore(h,st);
  }
  var s=document.createElement("style"); s.textContent=".v310h{color:var(--gold,#e0b45a);font-family:'Gentium Book Plus',Georgia,serif;font-size:1.05rem;margin:18px 4px 4px;border-top:1px solid #4a3a2c;padding-top:10px}"+
    "#langSel{color:#e0b45a!important;background-color:#1a1410!important;border-color:#e0b45a}#langSel option,#langSel option:checked,#langSel option:hover,#langSel option:focus{color:#e0b45a!important;background:#1a1410!important;background-color:#1a1410!important;box-shadow:0 0 0 30px #1a1410 inset}#langSel option:checked{font-weight:700}"+
    "#bppSel option:checked,#bppSel option:hover{background:#1a1410!important;box-shadow:0 0 0 30px #1a1410 inset}";
  document.head.appendChild(s);
  apply(); setInterval(function(){ apply(); head(); },500);
})();
