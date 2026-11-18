/* [Grok-Bot] V5.29: Beim automatischen Weiter (Liste/Alle) bleibt Mitsingen
   im Sitzungszustand erhalten; die Lyrics laufen weiter mit. Play/Pause
   (Knopf, Leertaste/P, Media Session, Groß) steuert die eine laufende
   Aufnahme, keine verwaiste zweite Audio-Quelle. critical=false. */
window.BPP_BUILD="5.29"; window.BPP_SHOW="5.29";
(function(){
  if(window.bppV529) return; window.bppV529=1;

  var HP={
    de:" <b>Mitsingen (V5.29):</b> Bleibt beim automatischen Weiter der Liste an, wenn es an war; die Lyrics laufen mit. <i>(G+)</i>",
    en:" <b>Follow (V5.29):</b> Stays on when the list advances automatically, and the lyrics keep following. <i>(G+)</i>",
    fr:" <b>Suivre (V5.29) :</b> Reste activé lors du passage automatique au morceau suivant ; les paroles suivent. <i>(G+)</i>",
    es:" <b>Seguir (V5.29):</b> Sigue activo al avanzar automáticamente la lista; la letra acompaña. <i>(G+)</i>",
    ru:" <b>Следить (V5.29):</b> Остаётся включённым при автоматическом переходе дальше; текст идёт вместе. <i>(G+)</i>",
    hi:" <b>साथ गाएँ (V5.29):</b> सूची अपने आप आगे बढ़े तो चालू रहता है; बोल साथ चलते हैं। <i>(G+)</i>",
    pt:" <b>Acompanhar (V5.29):</b> Permanece ligado no avanço automático da lista; a letra acompanha. <i>(G+)</i>",
    cz:" <b>Sledovat (V5.29):</b> Při automatickém postupu seznamu zůstává zapnuté; text jde s ním. <i>(G+)</i>"
  };

  function onlyAudio(){
    try{
      var main=document.getElementById("a");
      var list=document.querySelectorAll("audio");
      for(var k=0;k<list.length;k++){
        if(list[k]!==main){
          try{ list[k].pause(); }catch(e){}
        }
      }
    }catch(e){}
  }
  function paintAuto(){
    try{ if(typeof applyUI==="function") applyUI(); }catch(e){}
    try{ if(typeof window.bppV526==="function"){} }catch(e){}
    try{ if(typeof window.bppSync526==="function") window.bppSync526(); }catch(e){}
    try{ if(typeof window.bppSync528==="function") window.bppSync528(); }catch(e){}
    try{
      if(autoScroll && typeof isPlaying==="function" && isPlaying() && typeof pinStanza==="function") pinStanza();
    }catch(e){}
  }
  function afterPlay(){
    onlyAudio();
    paintAuto();
  }
  function wrapPlay(){
    try{
      var f=window.play; if(typeof f!=="function"||f.__v529) return;
      var w=function(idx, resume, auto){
        var prevI=i, prevAuto=!!(typeof autoScroll!=="undefined"&&autoScroll);
        var r=f.apply(this, arguments);
        try{
          if(typeof prevI==="number" && prevI>=0 && prevI!==idx){
            autoScroll=prevAuto;
            try{ if(typeof rememberTempo==="function") rememberTempo(); }catch(e){}
            try{ if(typeof persistNow==="function") persistNow(); }catch(e){}
          }
        }catch(e){}
        afterPlay();
        setTimeout(afterPlay, 80);
        setTimeout(afterPlay, 400);
        return r;
      };
      w.__v529=1;
      if(typeof bppWrapMarkers489==="function") try{ bppWrapMarkers489(w,f); }catch(e){}
      window.play=w;
    }catch(e){}
  }
  function wrapToggle(){
    try{
      var f=window.togglePlay; if(typeof f!=="function"||f.__v529) return;
      var w=function(){ onlyAudio(); var r=f.apply(this, arguments); onlyAudio();
        try{ if(typeof window.bppSync528==="function") window.bppSync528(); }catch(e){}
        return r; };
      w.__v529=1;
      if(typeof bppWrapMarkers489==="function") try{ bppWrapMarkers489(w,f); }catch(e){}
      window.togglePlay=w;
    }catch(e){}
  }
  function help(){
    var d=document.getElementById("bppHelp"); if(!d) return;
    var l=(typeof lang!=="undefined"&&HP[lang])?lang:"en";
    var extra=HP[l]||HP.en;
    var ps=d.querySelectorAll(".in>p");
    var target=null;
    for(var i=0;i<ps.length;i++){
      if(ps[i].getAttribute("data-h529")===l) return;
    }
    for(var j=ps.length-1;j>=0;j--){
      var tx=ps[j].textContent||"";
      if(/V5\.29|Mitsingen \(V5\.29\)|Follow \(V5\.29\)/.test(tx)){ target=ps[j]; break; }
      if(/Gold\s*=|Or\s*=|Dorado\s*=|Золотой\s*=|सुनहरा\s*=|Dourado\s*=|Zlatá\s*=/.test(tx)){ target=ps[j]; break; }
    }
    if(!target){
      for(var k=ps.length-1;k>=0;k--){
        if(!ps[k].classList.contains("jg") && !ps[k].classList.contains("kb357")){ target=ps[k]; break; }
      }
    }
    if(!target) return;
    if(target.getAttribute("data-h529")===l) return;
    var base=target.getAttribute("data-h529-base");
    if(!base){ base=target.innerHTML; target.setAttribute("data-h529-base",base); }
    target.innerHTML=base+extra;
    target.setAttribute("data-h529",l);
  }
  function hookAll(){ wrapPlay(); wrapToggle(); try{ help(); }catch(e){} }
  hookAll();
  setInterval(hookAll, 800);
  window.bppSync529=afterPlay;
})();
