/* [Grok-Bot] V3.53: Prayers ohne MP3-Aufnahme: Zeichen ∅ hinter dem Namen in allen Menues (+ Hover "ohne Aufnahme", 6 Sprachen),
   kurzer Hinweis (ca. 3 s, Stil V3.48) bei Play / Leertaste / P / Mitlesen / M, eine Zeile in der Hilfe. */
window.BPP_BUILD="3.85"; window.BPP_SHOW="3.85";
(function(){
  if(window.bppV353) return; window.bppV353=1;
  var SYM="\u2205"; /* ∅ */
  var TIP={de:"ohne Aufnahme",en:"no recording",fr:"sans enregistrement",es:"sin grabación",ru:"без записи",hi:"रिकॉर्डिंग नहीं",pt:"sem gravação"};
  var MSG={de:"Für dieses Prayer gibt es noch keine Aufnahme",en:"There is no recording for this prayer yet",fr:"Il n’y a pas encore d’enregistrement pour cette prière",
    es:"Todavía no hay grabación para esta oración",ru:"Для этой молитвы пока нет записи",hi:"इस प्रार्थना की अभी कोई रिकॉर्डिंग नहीं है",pt:"Para esta oração ainda não há gravação"};
  var HLP={de:"<b>∅ hinter dem Namen</b> = für dieses Prayer gibt es noch keine Aufnahme (MP3); Text und Akkorde sind da, Play und Mitlesen zeigen nur einen Hinweis.",
    en:"<b>∅ after the name</b> = there is no recording (MP3) for this prayer yet; text and chords are there, Play and Follow only show a short note.",
    fr:"<b>∅ après le nom</b> = pas encore d’enregistrement (MP3) pour cette prière ; texte et accords sont là, Lecture et Suivre affichent seulement un avis.",
    es:"<b>∅ tras el nombre</b> = todavía no hay grabación (MP3) de esta oración; texto y acordes están, Reproducir y Seguir solo muestran un aviso.",
    ru:"<b>∅ после названия</b> = для этой молитвы пока нет записи (MP3); текст и аккорды есть, «Пуск» и «Следить» показывают только подсказку.",
    hi:"<b>नाम के बाद ∅</b> = इस प्रार्थना की अभी कोई रिकॉर्डिंग (MP3) नहीं है; पाठ और कॉर्ड हैं, Play और साथ पढ़ें केवल एक सूचना दिखाते हैं।",pt:"<b>∅ depois do nome</b> = ainda não há gravação (MP3) desta oração; texto e acordes estão lá, Tocar e Acompanhar só mostram um breve aviso."};
  function lg(){ var l=(typeof lang!=="undefined"&&lang)||"en"; return TIP[l]?l:"en"; }
  /* Entscheidung: zaehlt nur MP3 (P.audio). Nur-YouTube gaebe es auch ein Zeichen - derzeit hat aber kein Prayer ohne MP3 YouTube. */
  function noRec(k){ var P=(typeof PRAYERS!=="undefined")&&PRAYERS[+k]; return !!P && !P.audio; }
  function curNo(){ return typeof i!=="undefined" && i>=0 && noRec(i); }
  var st=document.createElement("style");
  st.textContent=".bpp353{display:inline-block;margin-left:.45em;font-weight:700;opacity:.9;font-family:system-ui,sans-serif}";
  document.head.appendChild(st);
  function marks(){
    var l=lg(), tip=TIP[l];
    var box=document.getElementById("bppSel");
    if(box) [].forEach.call(box.querySelectorAll("select"),function(se){ var g=se._g; if(!g) return;
      g.items.forEach(function(x,k){ if(x.i===null||!noRec(x.i)) return;
        if(x.t.slice(-2)!==" "+SYM) x.t=x.t+" "+SYM;
        var o=se.options[k+1]; if(!o) return;
        if(o.textContent.slice(-2)!==" "+SYM) o.textContent=o.textContent+" "+SYM;
        if(o.title!==tip) o.title=tip; }); });
    var L=document.getElementById("list");
    if(L) [].forEach.call(L.querySelectorAll(".item[data-i]"),function(el){ var on=noRec(el.getAttribute("data-i")), s=el.querySelector(".bpp353");
      if(on&&!s){ s=document.createElement("span"); s.className="bpp353"; s.textContent=SYM; el.appendChild(s); }
      if(!on&&s) s.remove();
      if(s&&on){ if(s.title!==tip) s.title=tip; if(el.title!==tip) el.title=tip; } });
  }
  var tt=null, last=0;
  function toast(){
    var n=Date.now(); if(n-last<400) return; last=n;
    var h=document.getElementById("bppNoTime");
    if(!h){ h=document.createElement("div"); h.id="bppNoTime"; h.setAttribute("role","status"); }
    if(h.parentNode!==document.body) document.body.appendChild(h);
    h.textContent=MSG[lg()];
    void h.offsetWidth; h.classList.add("on");
    clearTimeout(tt); tt=setTimeout(function(){ h.classList.remove("on"); },3000);
  }
  window.bppV353Toast=toast;
  function wrap(){
    if(typeof togglePlay==="function" && !togglePlay.__v353){
      var o=togglePlay; togglePlay=function(){ if(curNo()) toast(); return o.apply(this,arguments); }; togglePlay.__v353=1; window.togglePlay=togglePlay; }
  }
  document.addEventListener("click",function(e){ var b=e.target&&e.target.closest&&e.target.closest("#btnAuto,#btnPlay,[id^=bppFsPlay]"); if(b&&curNo()) toast(); },true);
  document.addEventListener("keydown",function(e){ if(e.ctrlKey||e.altKey||e.metaKey) return; var t=e.target&&e.target.tagName;
    if(t==="INPUT"||t==="TEXTAREA"||t==="SELECT") return; var k=(e.key||"").toLowerCase();
    if((k===" "||k==="p"||k==="m")&&curNo()) toast(); },true);
  function help(){ var d=document.getElementById("bppHelp"); if(!d||d.__k353) return; var jg=d.querySelector(".jg"); if(!jg) return; d.__k353=1;
    var p=document.createElement("p"); p.innerHTML=HLP[lg()]; jg.parentNode.insertBefore(p,jg); }
  function tick(){ try{ wrap(); }catch(e){} try{ marks(); }catch(e){} try{ help(); }catch(e){} }
  tick(); setInterval(tick,300);
})();
