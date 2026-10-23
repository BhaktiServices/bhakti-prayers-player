/* [Grok-Bot] V4.00: Zartes Hintergrundbild hinter den Lyrics (Standard und Gross), nur waehrend der Wiedergabe, weich ein/aus, sehr blass und unscharf.
   Bild = Vorschaubild des YouTube-Videos des Gebets (Bhakti Marga), sonst des passenden SPN-Livestreams (Morning Prayers 9bXeGlXplEA, Evening Arati H9sil1er-xs).
   Ohne Bild: nichts. Offline: die Bilder werden vom Service Worker mitgespeichert (Liste unten). */
/* SW-Liste: src="img/bg/ashtotram.jpg" src="img/bg/ashtotram-abend.jpg" src="img/bg/bhajare.jpg" src="img/bg/bhu-suktam.jpg" src="img/bg/durga-chalisa.jpg" src="img/bg/final-prayers.jpg" src="img/bg/ganesha-mantra.jpg" src="img/bg/gayatri.jpg" src="img/bg/giridhari-arati.jpg" src="img/bg/govinda.jpg" src="img/bg/guru-stotram.jpg" src="img/bg/guru-stotram-abend.jpg" src="img/bg/guruji-gayatri.jpg" src="img/bg/hanuman.jpg" src="img/bg/hanuman-bhavani.jpg" src="img/bg/kavacham.jpg" src="img/bg/lakshmi-arati.jpg" src="img/bg/mukunda.jpg" src="img/bg/narasimha.jpg" src="img/bg/narasimha-abend.jpg" src="img/bg/narayana-suktam.jpg" src="img/bg/nila-suktam.jpg" src="img/bg/panduranga-arati.jpg" src="img/bg/purusa-suktam.jpg" src="img/bg/ramanuja.jpg" src="img/bg/saprem.jpg" src="img/bg/sri-suktam.jpg" src="img/bg/suprabhatam.jpg" src="img/bg/vaishnava-mantra.jpg" src="img/bg/vchalisa.jpg" src="img/bg/vishnu-arati.jpg" src="img/bg/vishnu-sahasranama.jpg" */
// build via v401
(function(){
  if(window.bppV400) return; window.bppV400=1;
  var IDS=["ashtotram", "ashtotram-abend", "bhajare", "bhu-suktam", "durga-chalisa", "final-prayers", "ganesha-mantra", "gayatri", "giridhari-arati", "govinda", "guru-stotram", "guru-stotram-abend", "guruji-gayatri", "hanuman", "hanuman-bhavani", "kavacham", "lakshmi-arati", "mukunda", "narasimha", "narasimha-abend", "narayana-suktam", "nila-suktam", "panduranga-arati", "purusa-suktam", "ramanuja", "saprem", "sri-suktam", "suprabhatam", "vaishnava-mantra", "vchalisa", "vishnu-arati", "vishnu-sahasranama"];
  var st=document.createElement("style");
  st.textContent="#lyrics,#bppFs{isolation:isolate}"+
   ".bg400{position:sticky;top:0;left:0;width:100%;height:100vh;margin-bottom:-100vh;z-index:-1;pointer-events:none;background:center/cover no-repeat;filter:blur(14px) saturate(.8);opacity:0;transition:opacity 1.6s ease;transform:scale(1.08)}"+
   "#bppFs>.bg400{position:absolute;inset:0;height:auto;margin:0}"+
   ".bg400.on{opacity:.13}html.th-morgen .bg400.on{opacity:.16}html.th-nacht .bg400.on{opacity:.11}";
  document.head.appendChild(st);
  function pid(){ try{ return (typeof PRAYERS!=="undefined"&&typeof i!=="undefined"&&i>=0&&PRAYERS[i])?PRAYERS[i].id:null; }catch(e){ return null; } }
  function playing(){ var a=document.getElementById("a"); return !!(a&&!a.paused&&!a.ended&&a.currentTime>0); }
  function lay(host){ if(!host) return null; var d=host.querySelector(":scope>.bg400"); if(!d){ d=document.createElement("div"); d.className="bg400"; host.insertBefore(d,host.firstChild); } return d; }
  function tick(){ var id=pid(), ok=id&&IDS.indexOf(id)>=0, on=ok&&playing();
    [document.getElementById("lyrics"),document.getElementById("bppFs")].forEach(function(h){ if(!h) return; var d=lay(h);
      if(ok){ var u='url("img/bg/'+id+'.jpg")'; if(d.dataset.id!==id){ d.dataset.id=id; d.style.backgroundImage=u; } }
      d.classList.toggle("on",!!on); }); }
  setInterval(tick,500); document.addEventListener("play",tick,true); document.addEventListener("pause",tick,true);
  var HB={de:"Hintergrundbild",en:"Background image",fr:"Image de fond",es:"Imagen de fondo",ru:"Фоновое изображение",hi:"पृष्ठभूमि चित्र",pt:"Imagem de fundo"};
  setInterval(function(){ var b=document.getElementById("bppSrcInfo"); if(!b||!b.innerHTML) return; var id=pid(); if(!id||IDS.indexOf(id)<0) return;
    if(b.querySelector(".hb400")) return; var l=(typeof lang!=="undefined"&&HB[lang])?lang:"en";
    b.insertAdjacentHTML("beforeend",'<br><span class="hb400"><b>'+HB[l]+':</b> Bhakti Marga (YouTube)</span>'); },400);
  window.bppBg400=function(){ return {id:pid(),has:IDS.indexOf(pid())>=0,playing:playing()}; };
})();
