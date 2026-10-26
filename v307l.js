/* [Grok-Bot] V3.07: Sprachwahl (nur Kuerzel, V3.08 ohne Flaggen) oben rechts neben der Versionsanzeige; "Alle" direkt rechts neben den drei Menues */
(function(){
  var F={de:"DE",en:"EN",fr:"FR",es:"ES",ru:"RU",hi:"HI",pt:"PT",cz:"CZ"};
  var st=document.createElement("style");
  st.textContent="h1 .lang.l307{display:inline-flex;vertical-align:middle;margin:0 0 0 10px;cursor:default;font-size:1rem;letter-spacing:0;text-transform:none}"+
  "h1 .lang.l307 select{font-size:.9rem;padding:2px 4px}"+
  "#bppL1{flex-wrap:nowrap!important}#bppL1 #bppSel{flex:1 1 auto!important;min-width:0;flex-wrap:nowrap!important}#bppL1 #bppSel>select{flex:1 1 0!important;min-width:0!important}"+
  "#bppL1 .daybar{flex:0 0 auto}@media(max-width:600px){header{position:relative}h1 .lang.l307{position:absolute;top:4px;right:6px;margin:0}#bppL1 #bppSel>select{font-size:.78rem!important;padding-right:18px!important;background-position:right 3px center!important}h1 .lang.l307 select{font-size:.8rem;padding:1px 2px}#bppL1{gap:4px}}";
  document.head.appendChild(st);
  function flags(){ var s=document.getElementById("langSel"); if(!s) return; [].forEach.call(s.options,function(o){ var v=(o.value||o.textContent).toLowerCase().replace(/[^a-z]/g,"").slice(-2); if(F[v]&&o.textContent!==F[v]) o.textContent=F[v]; }); }
  function build(){
    var s=document.getElementById("langSel"), box=s&&s.closest(".lang"), ver=document.querySelector("header h1 .ver");
    if(!box||!ver) return false;
    if(box.parentNode!==ver.parentNode||box.previousElementSibling!==ver) ver.parentNode.insertBefore(box, ver.nextSibling);
    box.classList.add("l307");
    ["click","pointerdown","touchstart","mousedown"].forEach(function(ev){ box.addEventListener(ev,function(e){ e.stopPropagation(); },{passive:true}); });
    flags(); return true;
  }
  var n=0,t=setInterval(function(){ if(build()||++n>100) clearInterval(t); },200);
  setInterval(function(){ build(); flags(); },1500);
})();
